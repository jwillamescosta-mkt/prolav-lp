// Rastreamento de UTM + eventos de conversão (GTM / Meta Pixel).
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/data/content";
import { GOOGLE_ADS_ID, GOOGLE_ADS_LEAD_LABEL } from "@/data/analytics";
// Reexporta a constante única para os dados estruturados, sem alterar o rastreamento.
export { WHATSAPP_NUMBER };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

// gclid/fbclid: identificam o clique do anúncio mesmo quando a campanha não tem UTM
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;
const STORAGE_KEY = "prolav_utms";

// Cópia de 30 dias no localStorage: o navegador do Instagram reabre o link em nova sessão e o sessionStorage se perde
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** Lê UTMs da URL e salva na sessão + 30 dias (chamar em useEffect). */
export function captureUtms() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) found[k] = v;
  });
  if (Object.keys(found).length) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ t: Date.now(), utms: found }));
    } catch {
      /* armazenamento bloqueado: fica só a sessão */
    }
  }
  captureSource();
}

function getUtms(): Record<string, string> {
  try {
    const session = sessionStorage.getItem(STORAGE_KEY);
    if (session) return JSON.parse(session);
    const saved = JSON.parse(window.localStorage?.getItem(STORAGE_KEY) || "{}");
    return saved.t && Date.now() - saved.t < MAX_AGE_MS ? saved.utms : {};
  } catch {
    return {};
  }
}

const SOURCE_KEY = "prolav_src";
const CODE_KEY = "prolav_lead_code";

/** Origem do visitante: UTM > clique de anúncio (gclid/fbclid) > site de onde veio > direto. */
export function detectSource(
  utms: Record<string, string>,
  referrer: string,
  ownHost: string,
): string {
  const source = utms["utm_source"];
  if (source) return utms["utm_medium"] ? `${source}/${utms["utm_medium"]}` : source;
  if (utms["gclid"]) return "google/ads";
  if (utms["fbclid"]) return "meta/ads";
  if (!referrer) return "direto";
  let host = "";
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return "direto";
  }
  if (!host || host === ownHost) return "direto";
  if (/(^|\.)google\./.test(host)) return "google/organico";
  if (/(^|\.)(instagram|facebook|fb|l\.facebook|lm\.facebook)\./.test(host) || host === "l.instagram.com")
    return "meta/organico";
  return `site/${host}`;
}

/** Guarda a origem da primeira visita (antes de o visitante navegar pelo site). */
export function captureSource() {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(SOURCE_KEY)) return;
    sessionStorage.setItem(
      SOURCE_KEY,
      detectSource(getUtms(), document.referrer, window.location.hostname.replace(/^www\./, "")),
    );
  } catch {
    /* sessionStorage indisponível: segue sem origem guardada */
  }
}

function getSource(): string {
  try {
    return sessionStorage.getItem(SOURCE_KEY) || "direto";
  } catch {
    return "direto";
  }
}

/** Código curto do lead (ex.: PRL-7K2Q): aparece na mensagem e nos eventos, para casar lead e venda. */
export function getLeadCode(): string {
  try {
    const saved = sessionStorage.getItem(CODE_KEY);
    if (saved) return saved;
    const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const bytes = new Uint8Array(4);
    crypto.getRandomValues(bytes);
    const code = "PRL-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
    sessionStorage.setItem(CODE_KEY, code);
    return code;
  } catch {
    return "PRL-" + Math.random().toString(36).slice(2, 6).toUpperCase();
  }
}

/** Monta o link do WhatsApp com código do lead, origem e UTMs anexados ao texto. */
export function buildWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  const utms = getUtms();
  const parts = [getLeadCode(), `origem=${getSource()}`];
  Object.entries(utms).forEach(([k, v]) => parts.push(`${k}=${v}`));
  const text = `${message}\n\n[ref: ${parts.join(" | ")}]`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export interface LeadExtras {
  quality?: "hot" | "warm" | "cold";
  items?: string[];
  area?: string;
  when?: string;
}

/** Dispara eventos (GTM/GA4/Meta Pixel) e abre o WhatsApp. */
export function openWhatsApp(origin: string, message = WHATSAPP_MESSAGE, extras: LeadExtras = {}) {
  const code = getLeadCode();
  const params = {
    content_name: origin,
    lead_code: code,
    lead_source: getSource(),
    ...(extras.quality ? { lead_quality: extras.quality } : {}),
    ...(extras.area ? { lead_area: extras.area } : {}),
    ...(extras.when ? { lead_when: extras.when } : {}),
    ...(extras.items?.length ? { lead_items: extras.items.join(",") } : {}),
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "Contact", origin });
  window.dataLayer.push({ event: "Lead", origin, ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", params);
    // Conversão do Google Ads (só dispara quando o ID e o rótulo estiverem preenchidos)
    if (GOOGLE_ADS_ID && GOOGLE_ADS_LEAD_LABEL)
      window.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LEAD_LABEL}`, transaction_id: code });
  }
  if (typeof window.fbq === "function") {
    window.fbq("track", "Lead", params, { eventID: code });
    window.fbq("track", "Contact");
    // Evento próprio: só leads com pedido claro e prazo. Dá para otimizar anúncios por ele.
    if (extras.quality && extras.quality !== "cold") window.fbq("trackCustom", "LeadQualificado", params);
  }
  // Navegadores embutidos (Instagram/Facebook) costumam bloquear nova aba: nesse caso abre na mesma.
  const url = buildWhatsAppUrl(message);
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
}
