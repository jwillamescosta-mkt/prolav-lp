// Landing de conversão para tráfego pago (Meta e Google Ads).
// Curta e direta: hero com vídeo real + CTA → resultados → serviços → dúvidas e CTA final.
// A página institucional continua em "/".
import { createFileRoute } from "@tanstack/react-router";
import { LpHeader } from "@/components/lp/LpHeader";
import { LpHero } from "@/components/lp/LpHero";
import { LpResults } from "@/components/lp/LpResults";
import { LpServices } from "@/components/lp/LpServices";
import { LpClosing } from "@/components/lp/LpClosing";
import { SITE_URL } from "@/data/lp";
// Fontes do título (LCP): pré-carregadas para o H1 não esperar o CSS descobrir o arquivo.
// Vite deduplica pelo conteúdo, então é o mesmo arquivo que o @fontsource referencia.
import fontTitle from "@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff2?url";
import fontEmphasis from "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2?url";

export const Route = createFileRoute("/orcamento")({
  head: () => ({
    meta: [
      { title: "Orçamento | PROLAV Higienização & Blindagem de Estofados em Maceió" },
      {
        name: "description",
        content:
          "Higienização profunda e blindagem de sofás, colchões e tapetes em domicílio em Maceió. Envie uma foto do estofado no WhatsApp e receba o orçamento.",
      },
      // Página de anúncio: fora do Google para não competir com a página principal
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: "PROLAV | Seu conforto tratado com excelência" },
      {
        property: "og:description",
        content:
          "Higienização e blindagem de estofados em domicílio em Maceió. Orçamento pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/orcamento` },
      // Prévia do link no WhatsApp, Instagram e Facebook (1200×630)
      { property: "og:image", content: `${SITE_URL}/og-orcamento.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Técnicos da PROLAV higienizando um sofá em apartamento",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE_URL}/og-orcamento.jpg` },
    ],
    links: [
      { rel: "preload", as: "font", type: "font/woff2", href: fontTitle, crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "font",
        type: "font/woff2",
        href: fontEmphasis,
        crossOrigin: "anonymous",
      },
      // Capa do vídeo da hero carregada cedo (celular e desktop usam capas diferentes)
      {
        rel: "preload",
        as: "image",
        href: "/media/hero-lp.webp",
        type: "image/webp",
        media: "(max-width: 1023px)",
      },
      {
        rel: "preload",
        as: "image",
        href: "/media/hero-lp-desktop.webp",
        type: "image/webp",
        media: "(min-width: 1024px) and (orientation: landscape)",
      },
    ],
  }),
  component: Orcamento,
});

function Orcamento() {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <LpHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <LpHero />
        <LpResults />
        <LpServices />
        <LpClosing />
      </main>
    </>
  );
}
