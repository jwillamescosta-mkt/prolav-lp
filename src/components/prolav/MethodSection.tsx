// ETAPA 3 — Método: extração profunda + blindagem.
// Ritmo: papel (método) → navy (teste da gota + prova real) → papel (comparação + CTA).
import { motion, useReducedMotion } from "framer-motion";
import { Check, Minus } from "lucide-react";
import { METHOD } from "@/data/content";
import { openWhatsApp } from "@/lib/tracking";
import { MethodSteps } from "./MethodSteps";
import { DropLab } from "./DropLab";
import { ViewportVideo } from "./ViewportVideo";
import { WhatsAppIcon } from "./WhatsAppIcon";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MethodSection() {
  const { compare } = METHOD;
  return (
    <section id="tecnologia" aria-labelledby="metodo-title">
      {/* ── Papel: abertura + passo a passo ── */}
      <div className="grain bg-paper text-ink">
        <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-24 lg:px-8 lg:pt-32">
          <p className="section-index label-mono text-ink/60">{METHOD.index} <span>{METHOD.kicker}</span></p>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-end">
            <Reveal>
              <h2 id="metodo-title" className="text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-[6.5rem]">
                {METHOD.title[0]}<br />
                <span className="em-serif">{METHOD.title[1]}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-md text-lg leading-relaxed text-ink/75">{METHOD.lead}</p>
            </Reveal>
          </div>
          <div className="mt-20 lg:mt-24"><MethodSteps /></div>
        </div>
      </div>

      {/* ── Navy: laboratório interativo + prova real ── */}
      <div className="grain bg-navy-deep text-ice">
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <DropLab />

          <Reveal className="mt-28 lg:mt-36">
            <h3 className="max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
              {METHOD.proofTitle.split(".")[0]}.{" "}
              <span className="em-serif text-brand-green">{METHOD.proofTitle.split(".").slice(1).join(".").trim()}</span>
            </h3>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.1fr] lg:gap-8">
            {METHOD.proofs.map((p, i) => (
              <Reveal key={p.media} delay={i * 0.08}>
                <figure>
                  <div className="specimen aspect-[4/5]">
                    <ViewportVideo src={`/media/tec-${p.media}.mp4`} poster={`/media/tec-${p.media}.webp`} label={p.caption} className="h-full w-full object-cover" />
                    <div className="specimen-corners" />
                  </div>
                  <figcaption className="specimen-caption label-mono text-ice/55"><span>{p.caption}</span><span>0{i + 1}</span></figcaption>
                </figure>
              </Reveal>
            ))}
            {/* Segurança: o medo nº 1 sobre impermeabilização */}
            <Reveal delay={0.16} className="flex flex-col justify-end sm:col-span-2 lg:col-span-1">
              <ul className="divide-y divide-ice/15 border-y border-ice/15">
                {METHOD.safety.map((s) => (
                  <li key={s.title} className="py-6">
                    <p className="font-display text-xl font-semibold">{s.title}</p>
                    <p className="mt-2 text-sm text-ice/65">{s.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Papel: comparação + CTA ── */}
      <div className="grain bg-paper text-ink">
        <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <Reveal><h3 className="text-4xl font-semibold leading-tight sm:text-5xl">{compare.title}</h3></Reveal>
          <div className="mt-12 grid border-t border-ink md:grid-cols-2">
            <Reveal className="border-b border-rule py-8 md:border-b-0 md:border-r md:pr-10">
              <p className="label-mono text-ink/50">{compare.them.label}</p>
              <ul className="mt-6 space-y-4">
                {compare.them.items.map((t) => (
                  <li key={t} className="flex gap-3 text-lg text-ink/55"><Minus className="mt-1.5 h-4 w-4 shrink-0" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="py-8 md:pl-10">
              <p className="label-mono text-ink">{compare.us.label}</p>
              <ul className="mt-6 space-y-4">
                {compare.us.items.map((t) => (
                  <li key={t} className="flex gap-3 text-lg font-medium"><Check className="mt-1 h-5 w-5 shrink-0 text-[#00a56d]" aria-hidden="true" />{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-20 flex flex-col gap-6 border-t border-rule pt-10 lg:flex-row lg:items-center lg:justify-between">
            <p className="label-mono text-ink/55">{METHOD.microproof}</p>
            <button onClick={() => openWhatsApp("metodo", METHOD.ctaMessage)} className="btn-whatsapp h-14 px-7 text-base">
              <WhatsAppIcon className="h-5 w-5" />
              {METHOD.cta}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
