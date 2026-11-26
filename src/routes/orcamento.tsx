// Landing de conversão para tráfego pago (Meta e Google Ads).
// Curta e direta: hero com vídeo real + CTA → resultados → serviços → dúvidas e CTA final.
// A página institucional continua em "/".
import { createFileRoute } from "@tanstack/react-router";
import { LpHeader } from "@/components/lp/LpHeader";
import { LpHero } from "@/components/lp/LpHero";
import { LpResults } from "@/components/lp/LpResults";
import { LpServices } from "@/components/lp/LpServices";
import { LpClosing } from "@/components/lp/LpClosing";
import { LeadQualifier } from "@/components/lp/LeadQualifier";
import { InterviewSection } from "@/components/prolav/InterviewSection";
import { SITE_URL, LP_CLOSING } from "@/data/lp";
import { CLOSING } from "@/data/closing";
import { WHATSAPP_NUMBER } from "@/data/content";
// Fontes do título (LCP): pré-carregadas para o H1 não esperar o CSS descobrir o arquivo.
// Vite deduplica pelo conteúdo, então é o mesmo arquivo que o @fontsource referencia.
import fontTitle from "@fontsource/inter-tight/files/inter-tight-latin-600-normal.woff2?url";
import fontEmphasis from "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2?url";

export const Route = createFileRoute("/orcamento")({
  head: () => ({
    meta: [
      { title: "Higienização de Estofados em Maceió | Orçamento PROLAV" },
      {
        name: "description",
        content:
          "Higienização e blindagem de sofás, colchões, tapetes e cadeiras em domicílio em Maceió e Alagoas. Envie uma foto no WhatsApp e receba o orçamento.",
      },
      // Página principal para o Google (e também a landing dos anúncios)
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Higienização de Estofados em Maceió | PROLAV" },
      {
        property: "og:description",
        content:
          "Higienização e blindagem de estofados em domicílio em Maceió e Alagoas. Orçamento pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/orcamento` },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "PROLAV" },
      // Prévia do link no WhatsApp, Instagram e Facebook (1200×630)
      { property: "og:image", content: `${SITE_URL}/og-orcamento.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content: "Técnicos da PROLAV higienizando um sofá em apartamento",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Higienização de Estofados em Maceió | PROLAV" },
      {
        name: "twitter:description",
        content:
          "Higienização e blindagem de estofados em domicílio em Maceió e Alagoas. Orçamento pelo WhatsApp.",
      },
      { name: "twitter:image", content: `${SITE_URL}/og-orcamento.jpg` },
    ],
    // Dados estruturados no HTML do servidor: negócio local + as dúvidas visíveis na página
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              name: "PROLAV Higienização & Estética",
              description: "Higienização e blindagem de estofados em domicílio.",
              url: `${SITE_URL}/orcamento`,
              image: `${SITE_URL}/og-orcamento.jpg`,
              telephone: `+${WHATSAPP_NUMBER}`,
              areaServed: [
                { "@type": "City", name: "Maceió" },
                { "@type": "AdministrativeArea", name: "Alagoas" },
                ...CLOSING.areas.map((name) => ({ "@type": "Place", name: `${name}, Maceió - AL` })),
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Maceió",
                addressRegion: "AL",
                addressCountry: "BR",
              },
              sameAs: [CLOSING.instagram.url],
              priceRange: "$$$",
              foundingDate: "2021",
              geo: { "@type": "GeoCoordinates", latitude: -9.6658, longitude: -35.7353 },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Serviços PROLAV",
                itemListElement: [
                  "Higienização de sofás e poltronas",
                  "Blindagem têxtil",
                  "Higienização de colchões",
                  "Higienização de tapetes e cadeiras",
                ].map((name) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name },
                })),
              },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "PROLAV", item: `${SITE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Orçamento", item: `${SITE_URL}/orcamento` },
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: LP_CLOSING.faqPick
                .map((i) => CLOSING.faq[i])
                .filter((f): f is (typeof CLOSING.faq)[number] => Boolean(f))
                .map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
            },
          ],
        }),
      },
    ],
    links: [
      { rel: "canonical", href: `${SITE_URL}/orcamento` },
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
        media: "not all and (min-width: 1024px) and (orientation: landscape)",
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
        {/* Autoridade de imprensa logo antes das dúvidas e do CTA final */}
        <InterviewSection />
        <LpClosing />
      </main>
      <LeadQualifier />
    </>
  );
}
