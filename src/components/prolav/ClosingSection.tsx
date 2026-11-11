// ETAPA 5 — Fecha a página: dúvidas (objeções), área atendida, CTA final e rodapé.
// Antes a página terminava nos resultados, sem responder objeções nem pedir a ação.
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CLOSING } from "@/data/closing";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ClosingSection() {
  return (
    <>
      <section id="duvidas" aria-labelledby="duvidas-title" className="grain bg-paper text-ink">
        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-8 lg:py-28">
          <div>
            <p className="section-index label-mono text-ink/70">{CLOSING.index} <span>{CLOSING.kicker}</span></p>
            <h2 id="duvidas-title" className="mt-8 text-4xl font-semibold leading-none sm:text-5xl">{CLOSING.title}</h2>
            <h3 className="mt-12 text-lg font-semibold">{CLOSING.areaTitle}</h3>
            <p className="mt-3 leading-relaxed text-ink/70">{CLOSING.areas.join(" · ")}</p>
          </div>
          <Accordion type="single" collapsible className="border-t border-ink">
            {CLOSING.faq.map((f, i) => (
              <AccordionItem key={f.q} value={`f${i}`} className="border-rule">
                <AccordionTrigger className="min-h-14 text-left text-lg font-medium hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="max-w-2xl text-base leading-relaxed text-ink/75">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section aria-labelledby="final-title" className="grain bg-navy-deep text-ice">
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-36">
          <h2 id="final-title" className="max-w-4xl text-5xl font-semibold leading-[0.95] sm:text-7xl">
            {CLOSING.finalTitle}<br />
            <span className="em-serif text-brand-green">{CLOSING.finalEmphasis}</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ice/75">{CLOSING.finalText}</p>
          <button onClick={() => openWhatsApp("final", CLOSING.ctaMessage)} className="btn-whatsapp mt-10 min-h-16 w-full px-8 py-3 text-lg sm:w-auto">
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            {CLOSING.cta}
          </button>
          <p className="label-mono mt-6 text-ice/70">{CLOSING.microproof}</p>
        </div>
        {/* pb extra: o botão flutuante não cobre o rodapé no celular */}
        <footer className="border-t border-ice/15 px-5 pb-24 pt-8 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-ice/70 sm:flex-row sm:items-center sm:justify-between">
            <p>{CLOSING.footer}</p>
            <a href={CLOSING.instagram.url} target="_blank" rel="noopener noreferrer" className="link-arrow self-start text-ice">
              Instagram {CLOSING.instagram.handle}
            </a>
          </div>
        </footer>
      </section>
    </>
  );
}
