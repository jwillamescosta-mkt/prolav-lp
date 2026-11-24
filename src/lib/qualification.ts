// Qualificação rápida antes do WhatsApp (landing /orcamento).
// Três perguntas de um toque: o lead chega ao WhatsApp já com o pedido claro e a PROLAV
// ganha um sinal de qualidade (hot/warm/cold) para medir e otimizar os anúncios.

export const QUALIFY_EVENT = "prolav:qualify";

export const ITEM_OPTIONS = ["Sofá", "Colchão", "Cadeiras / poltronas", "Tapete", "Carro ou outro"] as const;
export const AREA_OPTIONS = ["Maceió", "Grande Maceió", "Outra cidade de Alagoas"] as const;
export const WHEN_OPTIONS = ["Esta semana", "Próximos 15 dias", "Só pesquisando preço"] as const;

export type LeadQuality = "hot" | "warm" | "cold";

export interface Qualification {
  items: string[];
  area: string;
  when: string;
}

/** hot: quer ainda esta semana; warm: tem pedido claro e prazo; cold: sem item ou só pesquisando. */
export function scoreLead(q: Qualification): LeadQuality {
  if (!q.items.length || !q.area || q.when === "Só pesquisando preço") return "cold";
  return q.when === "Esta semana" ? "hot" : "warm";
}

/** Mensagem do WhatsApp com o pedido resumido (a PROLAV já sabe o que cotar). */
export function composeQualifiedMessage(base: string, q: Qualification): string {
  const lines = [base.trim()];
  if (q.items.length) lines.push(`• Quero higienizar: ${q.items.join(", ")}`);
  if (q.area) lines.push(`• Local: ${q.area}`);
  if (q.when) lines.push(`• Prazo: ${q.when}`);
  return lines.join("\n");
}

export interface QualifyDetail {
  origin: string;
  message: string;
  /** O ouvinte (modal) marca como tratado; sem ele o clique cai direto no WhatsApp. */
  handled: boolean;
}

/**
 * Ponto de entrada dos CTAs: abre a pergunta de qualificação se a página tiver o modal;
 * em qualquer outra página (ou sem JS do modal) abre o WhatsApp direto, sem perder o clique.
 */
export function startLead(origin: string, message: string, fallback: (origin: string, message: string) => void) {
  if (typeof window === "undefined") return;
  const detail: QualifyDetail = { origin, message, handled: false };
  window.dispatchEvent(new CustomEvent<QualifyDetail>(QUALIFY_EVENT, { detail }));
  if (!detail.handled) fallback(origin, message);
}
