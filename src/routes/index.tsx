import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/prolav/Header";
import { Hero } from "@/components/prolav/Hero";
import { StatsBar } from "@/components/prolav/StatsBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PROLAV – Higienização e Blindagem de Estofados em Maceió" },
      { name: "description", content: "Extração profunda contra ácaros, fungos e odores + blindagem têxtil. Orçamento grátis no WhatsApp. Ponta Verde, Pajuçara, Jatiúca e região." },
      { property: "og:title", content: "PROLAV – Higienização e Blindagem de Estofados em Maceió" },
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
        {/* ETAPA 2 – seção "problema" (placeholder) */}
        <section id="problema" aria-label="Etapa 2" className="min-h-[60vh] bg-navy" />
      </main>
    </>
  );
}
