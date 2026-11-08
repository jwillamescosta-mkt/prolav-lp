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

// ETAPA 2 — textos centralizados para facilitar revisões sem alterar os componentes.
export const PROBLEM = {
  kicker: "RAIO-X DO SEU SOFÁ",
  stages: [
    { label: "Superfície", title: "Visto de fora, parece limpo.", text: "É o que quase todo mundo pensa antes da primeira higienização profunda." },
    { label: "Dentro", title: "Mas é dentro da espuma que tudo se acumula.", text: "Em Maceió, o calor, a umidade e a maresia aceleram a proliferação de ácaros e fungos. A aspiração e o pano úmido só alcançam a superfície." },
    { label: "Prova", title: "Isso saiu de um sofá que parecia limpo.", text: "Água real extraída pela PROLAV. Sem filtro, sem truque." },
  ],
  contaminants: ["Ácaros", "Fungos", "Pele morta", "Resíduos de pet", "Odores"],
  proofBadge: "Vídeo real • Cliente em Maceió",
  personasKicker: "QUAL É A SUA HISTÓRIA?",
  personasTitle: "Cada casa tem um motivo para não esperar mais.",
  personaLink: "Quero resolver isso",
  transition: "Agora veja como a PROLAV tira tudo isso — sem encharcar o seu sofá.",
};

export const PERSONAS = [
  { key: "familia", title: "Crianças e alergias", text: "Rinite que não passa, criança que brinca no sofá e dorme no colchão. Higienização profunda ajuda a reduzir ácaros e fungos onde sua família mais encosta.", message: "Olá! Tenho crianças/alérgicos em casa e quero higienizar meus estofados." },
  { key: "pet", title: "Tutores de pets", text: "Pelo encravado, marca de patinha, xixi acidental, aquele cheiro que volta. Removemos com produtos seguros para seu pet.", message: "Olá! Tenho pet e quero tirar manchas e odor do meu estofado." },
  { key: "manchas", title: "Manchas e visitas", text: "Aquela mancha que você esconde com uma almofada antes da visita chegar. Tratamento técnico por tipo de tecido, sem receita caseira que espalha a mancha.", message: "Olá! Meu estofado tem manchas e quero um orçamento." },
  { key: "empresa", title: "Clínicas e escritórios", text: "Recepção manchada fala pela sua empresa antes de você. Atendimento pontual, fora do horário de pico e com nota fiscal.", message: "Olá! Quero orçamento de higienização para minha empresa." },
] as const;

export const QUIZ = {
  kicker: "DIAGNÓSTICO EM 15 SEGUNDOS",
  title: "Seu estofado precisa de higienização? Descubra em 15 segundos.",
  questions: ["O que você quer tratar?", "Quando foi a última higienização profissional?", "Algum desses sinais?", "Seu bairro"],
  items: ["Sofá", "Colchão", "Poltronas/cadeiras", "Tapete", "Estofado do carro/lancha"],
  periods: ["Menos de 6 meses", "6 a 12 meses", "Mais de 1 ano", "Nunca fiz"],
  signs: ["Manchas", "Odor/cheiro de mofo", "Pets em casa", "Crianças ou alérgicos", "Nenhum"],
  optional: "Opcional", next: "Continuar", back: "Voltar", finish: "Ver meu diagnóstico", restart: "Refazer diagnóstico",
  resultTitle: "Seu diagnóstico", priority: "prioridade",
  results: {
    Baixa: "Seu estofado está com a manutenção em dia. Uma avaliação pode ajudar a planejar a próxima higienização.",
    Média: "Seu estofado merece atenção. Uma avaliação profissional ajuda a identificar o melhor momento para higienizar.",
    Alta: "Seu estofado está no grupo que mais se beneficia de uma higienização profunda agora.",
  },
  cta: "Receber meu orçamento com esse diagnóstico",
  microproof: "Orçamento sem compromisso • Resposta em minutos • Mande uma foto do estofado e agilizamos",
};
