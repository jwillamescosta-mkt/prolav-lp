// ETAPA 4 — Resultados reais. Mobile first: uma coluna; a partir de md, duas colunas lado a lado.
import { motion, useReducedMotion } from "framer-motion";
import { RESULTS } from "@/data/content";
import { openWhatsApp } from "@/lib/tracking";
import { ResultScrubber } from "./ResultScrubber";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function ResultsSection() {
  const reduced = useReducedMotion();
  const rise = (delay = 0) =>
    reduced ? {} : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section id="resultados" aria-labelledby="resultados-title" className="grain bg-navy-deep text-ice">
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:py-24 lg:px-8 lg:py-32">
        <p className="section-index label-mono text-ice/70">{RESULTS.index} <span>{RESULTS.kicker}</span></p>

        <motion.div {...rise()} className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h2 id="resultados-title" className="text-4xl font-semibold leading-[0.98] sm:text-6xl lg:text-7xl">
            {RESULTS.title}<br />
            <span className="em-serif text-brand-green">{RESULTS.titleEmphasis}</span>
          </h2>
          <div>
            <p className="max-w-md text-base leading-relaxed text-ice/75 sm:text-lg">{RESULTS.lead}</p>
            <p className="label-mono mt-5 text-ice/70">{RESULTS.hint}</p>
          </div>
        </motion.div>

        <div className="mt-12 grid gap-16 sm:mt-16 md:grid-cols-2 md:gap-10 lg:gap-16">
          {RESULTS.cases.map((c, i) => (
            <motion.div key={c.key} {...rise(i * 0.08)}>
              <ResultScrubber item={c} index={i} />
            </motion.div>
          ))}
        </div>

        <motion.div {...rise()} className="mt-16 flex flex-col gap-5 border-t border-ice/15 pt-8 sm:mt-20 lg:flex-row lg:items-center lg:justify-between">
          <p className="label-mono text-ice/70">{RESULTS.microproof}</p>
          <button onClick={() => openWhatsApp("resultados", RESULTS.ctaMessage)} className="btn-whatsapp min-h-14 w-full px-6 py-3 text-base sm:w-auto">
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            {RESULTS.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
