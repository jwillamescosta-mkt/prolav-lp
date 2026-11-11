import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/prolav/Header";
import { Hero } from "@/components/prolav/Hero";
import { StatsBar } from "@/components/prolav/StatsBar";
import { ProblemSection } from "@/components/prolav/ProblemSection";
import { MethodSection } from "@/components/prolav/MethodSection";
import { ResultsSection } from "@/components/prolav/ResultsSection";
import { ClosingSection } from "@/components/prolav/ClosingSection";
import { CLOSING } from "@/data/closing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PROLAV | Higienização & Blindagem de Estofados em Maceió" },
      { name: "description", content: "Extração profunda contra ácaros, fungos e odores + blindagem têxtil. Orçamento grátis no WhatsApp. Ponta Verde, Pajuçara, Jatiúca e região." },
      { property: "og:title", content: "PROLAV | Higienização & Blindagem de Estofados em Maceió" },
      { property: "og:description", content: "Seu sofá limpo de verdade, sua família respirando melhor. Orçamento grátis no WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    // Dados estruturados: negócio local + perguntas frequentes (resultado rico no Google)
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "LocalBusiness", name: "PROLAV Higienização & Estética", description: "Higienização e blindagem de estofados em domicílio.", areaServed: "Maceió, AL", address: { "@type": "PostalAddress", addressLocality: "Maceió", addressRegion: "AL", addressCountry: "BR" }, sameAs: [CLOSING.instagram.url] },
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
        <ClosingSection />
      </main>
    </>
  );
}
