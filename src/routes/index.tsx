import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/prolav/Header";
import { Hero } from "@/components/prolav/Hero";
import { StatsBar } from "@/components/prolav/StatsBar";
import { ProblemSection } from "@/components/prolav/ProblemSection";
import { MethodSection } from "@/components/prolav/MethodSection";
import { ResultsSection } from "@/components/prolav/ResultsSection";
import { ClosingSection } from "@/components/prolav/ClosingSection";
import { InterviewSection } from "@/components/prolav/InterviewSection";
import { CLOSING } from "@/data/closing";
import { SITE_URL } from "@/data/lp";
import { WHATSAPP_NUMBER } from "@/lib/tracking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PROLAV | Higienização & Blindagem de Estofados em Maceió" },
      { name: "description", content: "Extração profunda contra ácaros, fungos e odores + blindagem têxtil. Orçamento grátis no WhatsApp. Ponta Verde, Pajuçara, Jatiúca e região." },
      { property: "og:title", content: "PROLAV | Higienização & Blindagem de Estofados em Maceió" },
      { property: "og:description", content: "Seu sofá limpo de verdade, sua família respirando melhor. Orçamento grátis no WhatsApp." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:site_name", content: "PROLAV" },
      { property: "og:image", content: `${SITE_URL}/og-orcamento.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Técnicos da PROLAV higienizando um sofá em apartamento" },
      { name: "robots", content: "index, follow" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "PROLAV | Higienização & Blindagem de Estofados em Maceió" },
      { name: "twitter:description", content: "Seu sofá limpo de verdade, sua família respirando melhor. Orçamento grátis no WhatsApp." },
      { name: "twitter:image", content: `${SITE_URL}/og-orcamento.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
    // Dados estruturados: negócio local + perguntas frequentes (resultado rico no Google)
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
              url: SITE_URL,
              image: `${SITE_URL}/og-orcamento.jpg`,
              telephone: `+${WHATSAPP_NUMBER}`,
              areaServed: [
                { "@type": "City", name: "Maceió" },
                { "@type": "AdministrativeArea", name: "Alagoas" },
                ...CLOSING.areas.map((name) => ({ "@type": "Place", name: `${name}, Maceió - AL` })),
              ],
              address: { "@type": "PostalAddress", addressLocality: "Maceió", addressRegion: "AL", addressCountry: "BR" },
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
            { "@type": "FAQPage", mainEntity: CLOSING.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* WCAG 2.4.1: atalho para pular o cabeçalho (visível ao receber foco pelo teclado) */}
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <StatsBar />
        <ProblemSection />
        <MethodSection />
        <ResultsSection />
        <InterviewSection />
        <ClosingSection />
      </main>
    </>
  );
}
