import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/prolav/Header";
import { Hero } from "@/components/prolav/Hero";
import { StatsBar } from "@/components/prolav/StatsBar";
import { ProblemSection } from "@/components/prolav/ProblemSection";

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
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <ProblemSection />
        {/* ETAPA 3 — espaço reservado, sem conteúdo antecipado. */}
        <section id="tecnologia" aria-label="Etapa 3" className="bg-navy" />
      </main>
    </>
  );
}
