// Conteúdo editável da landing PROLAV. Altere números e textos aqui.

/** Número único de WhatsApp (DDI + DDD + número, só dígitos). */
export const WHATSAPP_NUMBER = "5582999999999";

/** Mensagem base enviada no WhatsApp (UTMs são anexadas automaticamente). */
export const WHATSAPP_MESSAGE =
  "Olá, PROLAV! Quero um orçamento grátis de higienização/blindagem de estofados.";

export const HERO = {
  badge: "Higienização & blindagem de estofados — Maceió/AL",
  title: "Seu sofá parece limpo. Mas é lá dentro que mora o problema.",
  /** Trecho do título destacado em serifa itálica. */
  titleEmphasis: "lá dentro",
  subtitle:
    "A extração profunda remove ácaros, fungos e odores que a aspiração não alcança. A blindagem têxtil protege contra manchas e líquidos por muito mais tempo. Estofado limpo de verdade, família respirando melhor.",
  ctaPrimary: "Quero meu orçamento grátis no WhatsApp",
  ctaSecondary: "Ver como funciona ↓",
  microproof: ["Resposta em minutos", "Técnicos uniformizados", "Pontualidade garantida"],
};

/** Provas rápidas — fatos do playbook da PROLAV. */
export const STATS: { prefix?: string; value?: number; suffix?: string; label: string; note: string }[] = [
  { prefix: "+", value: 500, label: "estofados higienizados", note: "em Maceió e região" },
  { value: 5, suffix: " anos", label: "de atuação", note: "desde 2021" },
  { label: "Prêmio Oscar Alagoano", note: "10ª edição · destaque em serviços" },
];

/** Etiqueta do vídeo real exibido no hero. */
export const HERO_MEDIA = {
  caption: "Extração profunda · registro real",
  place: "Maceió/AL",
};

// ETAPA 3 — Método: extração profunda + blindagem.
export const METHOD = {
  index: "03",
  kicker: "O método PROLAV",
  title: ["Extração profunda.", "Sem encharcar."],
  lead: "Sabão e água em excesso empurram a sujeira para dentro da espuma — e, com a umidade de Maceió, isso vira mofo. A PROLAV faz o contrário: solta a sujeira da fibra e puxa tudo para fora.",
  steps: [
    { n: "01", title: "Avaliação do tecido", text: "Identificamos a fibra — linho, suede, veludo, couro — e testamos em área escondida. Cada tecido pede um cuidado diferente.", media: "pretratamento" },
    { n: "02", title: "Pré-tratamento por fibra", text: "Produtos certificados e hipoalergênicos, escolhidos para o tipo de mancha e de tecido. Nada de receita caseira que espalha a mancha.", media: "pretratamento" },
    { n: "03", title: "Extração de alto vácuo", text: "A extratora profissional injeta e suga ao mesmo tempo. A sujeira sai junto com a água, e o estofado não fica encharcado.", media: "extracao" },
    { n: "04", title: "Blindagem têxtil", text: "Uma resina à base de água envolve cada fio. Líquido derramado vira gota na superfície, em vez de entrar na espuma.", media: "gotas" },
  ],
  lab: {
    kicker: "Teste da gota",
    title: "Toque no tecido e derrame.",
    text: "À esquerda, tecido comum. À direita, tecido com blindagem PROLAV. É o mesmo princípio dos vídeos abaixo — só que aqui você testa.",
    left: "Sem blindagem",
    right: "Com blindagem",
    hint: "Clique ou toque para pingar",
  },
  proofTitle: "Café, vinho, suco. Escorre — não entra.",
  proofs: [
    { media: "gotas", caption: "Isotônico sobre linho blindado" },
    { media: "vinho", caption: "Vinho sobre estofado de clínica" },
  ],
  safety: [
    { title: "Base água, não inflamável", text: "Seguro para aplicar dentro do apartamento." },
    { title: "Perto de crianças e pets", text: "Produtos hipoalergênicos e certificados." },
    { title: "Cor e toque preservados", text: "O tecido continua com a mesma aparência." },
  ],
  compare: {
    title: "Por que não é só uma lavagem",
    them: { label: "Limpeza informal", items: ["Sabão comum e água em excesso", "Sujeira empurrada para a espuma", "Risco de mofo e mau cheiro", "Sem garantia sobre o tecido"] },
    us: { label: "PROLAV", items: ["Extratora profissional de alto vácuo", "Sujeira extraída, não espalhada", "Secagem sem encharcar a espuma", "Garantia de integridade do tecido"] },
  },
  cta: "Quero higienizar e blindar meu estofado",
  ctaMessage: "Olá, PROLAV! Vi o método no site e quero orçamento de higienização + blindagem.",
  microproof: "Orçamento sem compromisso · Técnicos uniformizados · Pontualidade",
};

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
