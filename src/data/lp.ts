// Conteúdo da landing de conversão (/orcamento), usada no tráfego pago.
// Página curta: o lead resolve na primeira dobra; quem rola encontra prova, resultados e serviços.
// Fatos e números vêm do playbook da PROLAV — altere aqui, não nos componentes.

/** Endereço público do site (usado na imagem de compartilhamento). Troque se mudar de domínio. */
export const SITE_URL = "https://prolav.lovable.app";

export const LP_HERO = {
  badge: "Higienização & blindagem de estofados · Maceió",
  /** H1 em duas linhas: a segunda em serifa itálica verde. Frase da marca. */
  title: "Seu conforto",
  titleEmphasis: "tratado com excelência.",
  subtitle: "Sofás, colchões e cadeiras limpos, higienizados e blindados, sem sair de casa.",
  cta: "Pedir orçamento no WhatsApp",
  ctaMessage: "Olá, PROLAV! Quero um orçamento. Vou enviar uma foto do meu estofado. [LP]",
  ctaHint: "Envie uma foto do estofado e receba o valor.",
  proofs: ["5 anos de experiência", "+500 estofados higienizados", "Prêmio Oscar Alagoano"],
  scrollCue: "Veja resultados reais",
  /** Vídeo real de fundo: vertical 9:16 no celular, recorte 16:9 do mesmo clipe no desktop. */
  video: {
    src: "/media/hero-lp.mp4",
    poster: "/media/hero-lp.webp",
    desktopSrc: "/media/hero-lp-desktop.mp4",
    desktopPoster: "/media/hero-lp-desktop.webp",
    label: "Técnicos uniformizados da PROLAV higienizando um sofá retrátil em apartamento",
  },
};

export const LP_RESULTS = {
  kicker: "Resultados reais",
  title: "O mesmo estofado,",
  titleEmphasis: "antes e depois da PROLAV.",
  lead: "Fotos e vídeos de atendimentos reais em Maceió. Toque em Antes e Depois para comparar.",
  photosKicker: "Antes e depois",
  cta: "Quero esse resultado",
};

/** Como funciona: tira a dúvida de quem ainda não chamou no WhatsApp. */
export const LP_STEPS = {
  kicker: "Como funciona",
  items: [
    { n: "01", title: "Mande uma foto", text: "Pelo WhatsApp, do estofado que você quer tratar." },
    {
      n: "02",
      title: "Receba o valor",
      text: "Orçamento sem compromisso, com a data mais próxima da sua região.",
    },
    {
      n: "03",
      title: "A equipe vai até você",
      text: "No dia combinado, com técnicos uniformizados e o piso protegido.",
    },
  ],
};

/** Faixa "Em ação": vídeos verticais curtos (9:16), já no padrão de /public/media. */
export const LP_VIDEOS = {
  kicker: "Em ação",
  title: "O trabalho, do jeito que acontece.",
  items: [
    {
      key: "agua-suja",
      title: "A sujeira que sai do estofado",
      src: "/media/problema-agua-suja.mp4",
      poster: "/media/problema-agua-suja.webp",
    },
    {
      key: "manchas",
      title: "Manchas antigas, do antes ao depois",
      src: "/media/ba-sofa-manchas.mp4",
      poster: "/media/ba-sofa-manchas.webp",
    },
    {
      key: "gotas",
      title: "Blindagem: o líquido vira gota",
      src: "/media/tec-gotas.mp4",
      poster: "/media/tec-gotas.webp",
    },
    {
      key: "vinho",
      title: "Vinho sobre tecido blindado",
      src: "/media/tec-vinho.mp4",
      poster: "/media/tec-vinho.webp",
    },
    {
      key: "sofa-pronto",
      title: "Equipamento profissional, sofá pronto",
      src: "/media/acao-sofa-pronto.mp4",
      poster: "/media/acao-sofa-pronto.webp",
    },
    {
      key: "cadeiras",
      title: "Cadeiras de área externa",
      src: "/media/acao-cadeiras-area-externa.mp4",
      poster: "/media/acao-cadeiras-area-externa.webp",
    },
  ],
};

export type BeforeAfterStage = "Antes" | "Durante" | "Depois";

export type BeforeAfterCase = {
  key: string;
  title: string;
  tag: string;
  text: string;
  /** Ordem cronológica. Cada foto: /media/antes-depois/<key>-<etapa>-{720|1200}.webp (3:2). */
  stages: {
    label: BeforeAfterStage;
    file: string;
    alt: string;
    /** Foto original no Drive */ source: string;
  }[];
};

/**
 * Pares conferidos foto a foto (arquivos originais do Drive em "PROLAV/Fotos/antes e depois").
 * Cada par é o MESMO móvel, identificado pelo cenário: tecido, estampa, tomadas, piso e objetos.
 * Ao trocar uma foto, mantenha o par e a ordem — nunca misture móveis diferentes.
 */
export const BEFORE_AFTER: BeforeAfterCase[] = [
  {
    key: "colchao",
    title: "Colchão de casal",
    tag: "Sanitização de colchão",
    text: "Manchas amareladas espalhadas pela superfície. Depois, tecido uniforme e o bordado preservado.",
    stages: [
      {
        label: "Antes",
        file: "colchao-antes",
        alt: "Colchão de casal com manchas amareladas antes da higienização",
        source: "IMG_5962.JPG",
      },
      {
        label: "Depois",
        file: "colchao-depois",
        alt: "O mesmo colchão, limpo e uniforme, depois da higienização",
        source: "IMG_5963.JPG",
      },
    ],
  },
  {
    key: "sofa-linho",
    title: "Sofá retrátil de linho",
    tag: "Higienização de sofá",
    text: "Encosto escurecido pelo contato diário e assento manchado. Depois, o linho claro de volta.",
    stages: [
      {
        label: "Antes",
        file: "sofa-linho-antes",
        alt: "Sofá retrátil de linho bege com encosto escurecido e assento manchado",
        source: "IMG_5952.JPG",
      },
      {
        label: "Depois",
        file: "sofa-linho-depois",
        alt: "O mesmo sofá retrátil, limpo, depois da higienização",
        source: "IMG_5954.JPG",
      },
    ],
  },
  {
    key: "cadeiras-ondas",
    title: "Cadeiras de jantar",
    tag: "Higienização de cadeiras",
    text: "Respingos e manchas no assento das três cadeiras. Depois, tecido limpo e por igual.",
    stages: [
      {
        label: "Antes",
        file: "cadeiras-ondas-antes",
        alt: "Três cadeiras de jantar com costura em ondas e assentos manchados",
        source: "IMG_5955.JPG",
      },
      {
        label: "Depois",
        file: "cadeiras-ondas-depois",
        alt: "As mesmas três cadeiras de ondas, limpas, depois da higienização",
        source: "IMG_5960.JPG",
      },
    ],
  },
  {
    key: "cadeiras-losango",
    title: "Cadeiras e poltrona",
    tag: "Higienização de cadeiras",
    text: "Encosto e assento encardidos em duas cadeiras e uma poltrona do mesmo ambiente.",
    stages: [
      {
        label: "Antes",
        file: "cadeiras-losango-antes",
        alt: "Duas cadeiras com costura em losango e uma poltrona, encardidas",
        source: "IMG_5956.JPG",
      },
      {
        label: "Depois",
        file: "cadeiras-losango-depois",
        alt: "As mesmas duas cadeiras de losango e a poltrona, limpas",
        source: "IMG_5958.JPG",
      },
    ],
  },
  {
    key: "sofa-boucle",
    title: "Sofá orgânico de bouclé",
    tag: "Tecido delicado",
    text: "Bouclé claro com marcas de uso. A foto do meio mostra o assento com metade já higienizada.",
    stages: [
      {
        label: "Antes",
        file: "sofa-boucle-antes",
        alt: "Sofá orgânico de bouclé branco com marcas acinzentadas na base, antes",
        source: "IMG_5966.JPG",
      },
      {
        label: "Durante",
        file: "sofa-boucle-durante",
        alt: "Assento do mesmo sofá de bouclé com metade higienizada e metade ainda suja",
        source: "IMG_5964.JPG",
      },
      {
        label: "Depois",
        file: "sofa-boucle-depois",
        alt: "O mesmo sofá de bouclé, branco e limpo, depois da higienização",
        source: "IMG_5968.JPG",
      },
    ],
  },
];

export type LpService = { key: string; title: string; text: string; tag: string; message: string };

export const LP_SERVICES = {
  kicker: "Serviços",
  title: "Um cuidado para cada estofado.",
  lead: "Tudo em domicílio, com técnicos uniformizados, piso protegido e produtos escolhidos para o seu tecido.",
  cta: "Orçar este serviço",
  items: [
    {
      key: "sofa",
      title: "Sofás e poltronas",
      text: "Extração profunda que remove manchas e odores sem encharcar. O tecido é avaliado e testado antes de começar.",
      tag: "Linho · suede · veludo · couro",
      message: "Olá, PROLAV! Quero orçamento de higienização de sofá/poltrona. [LP-sofa]",
    },
    {
      key: "blindagem",
      title: "Blindagem têxtil",
      text: "Resina à base d'água que faz café, vinho e suco virarem gota na superfície. Não inflamável e sem alterar cor nem toque.",
      tag: "Proteção contra líquidos e manchas",
      message: "Olá, PROLAV! Quero orçamento de blindagem do meu estofado. [LP-blindagem]",
    },
    {
      key: "colchao",
      title: "Colchões",
      text: "Sanitização com produtos hipoalergênicos e biodegradáveis no lugar onde a família passa a noite.",
      tag: "Solteiro · casal · queen · king",
      message: "Olá, PROLAV! Quero orçamento de higienização de colchão. [LP-colchao]",
    },
    {
      key: "tapetes",
      title: "Tapetes e cadeiras",
      text: "Tratamento por tipo de fibra para tapetes, cadeiras de jantar e estofados de escritório ou clínica, com nota fiscal.",
      tag: "Residencial e empresas",
      message: "Olá, PROLAV! Quero orçamento de higienização de tapete/cadeiras. [LP-tapetes]",
    },
  ] satisfies LpService[],
  combo: "Sofá, colchão e blindagem podem ser feitos na mesma visita.",
};

export const LP_CLOSING = {
  kicker: "Dúvidas rápidas",
  /** Índices das perguntas de CLOSING.faq mostradas aqui (as mais decisivas para fechar). */
  faqPick: [2, 0, 3, 5],
  finalTitle: "Comece com uma foto.",
  finalText: "A agenda é montada por região. Quanto antes você chamar, mais perto fica a sua data.",
  cta: "Enviar foto no WhatsApp",
  ctaMessage: "Olá, PROLAV! Quero um orçamento. Vou enviar uma foto do meu estofado. [LP-final]",
  microproof: "Grátis e sem compromisso · Resposta em minutos · Técnicos uniformizados",
};
