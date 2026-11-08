// Conteúdo editável da landing PROLAV. Altere números e textos aqui.

/** Número único de WhatsApp (DDI + DDD + número, só dígitos). */
export const WHATSAPP_NUMBER = "5582999999999";

/** Mensagem base enviada no WhatsApp (UTMs são anexadas automaticamente). */
export const WHATSAPP_MESSAGE =
  "Olá, PROLAV! Quero um orçamento grátis de higienização/blindagem de estofados.";

export const HERO = {
  badge: "Higienização & Blindagem de Estofados • Maceió",
  title: "Seu sofá parece limpo. Mas é lá dentro que mora o problema.",
  subtitle:
    "Extração profunda elimina ácaros, fungos e odores que a aspiração não alcança. A blindagem têxtil protege contra manchas e líquidos por muito mais tempo. Seu estofado limpo de verdade, sua família respirando melhor.",
  ctaPrimary: "Quero meu orçamento grátis no WhatsApp",
  ctaSecondary: "Ver como funciona ↓",
  microproof: ["Resposta em minutos", "Técnicos uniformizados", "Pontualidade garantida"],
};

/** Provas rápidas (números provisórios). */
export const STATS: { prefix?: string; value?: number; suffix?: string; label: string }[] = [
  { prefix: "+", value: 500, label: "estofados higienizados" },
  { value: 100, suffix: "%", label: "produtos certificados" },
  { label: "Garantia de satisfação" },
];
