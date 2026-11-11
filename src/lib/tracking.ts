// Rastreamento de UTM + eventos de conversão (GTM / Meta Pixel).
import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from "@/data/content";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
  }
}

// gclid/fbclid: identificam o clique do anúncio mesmo quando a campanha não tem UTM
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;
const STORAGE_KEY = "prolav_utms";

/** Lê UTMs da URL e salva no sessionStorage (chamar em useEffect). */
export function captureUtms() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  UTM_KEYS.forEach((k) => {
    const v = params.get(k);
    if (v) found[k] = v;
  });
  if (Object.keys(found).length) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
}

function getUtms(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

/** Monta o link do WhatsApp com UTMs anexadas ao texto. */
export function buildWhatsAppUrl(message = WHATSAPP_MESSAGE) {
  const utms = getUtms();
  const tail = Object.entries(utms).map(([k, v]) => `${k}=${v}`).join(" | ");
  const text = tail ? `${message}\n\n[ref: ${tail}]` : message;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Dispara eventos e abre o WhatsApp. */
export function openWhatsApp(origin: string, message = WHATSAPP_MESSAGE) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "Contact", origin });
  window.dataLayer.push({ event: "Lead", origin });
  if (typeof window.fbq === "function") window.fbq("track", "Lead");
  // Navegadores embutidos (Instagram/Facebook) costumam bloquear nova aba: nesse caso abre na mesma.
  const url = buildWhatsAppUrl(message);
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  else window.location.href = url;
}
