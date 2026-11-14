// Primeira dobra da landing /orcamento: vídeo real em tela cheia, texto curto e um único CTA.
// Título, CTA e provas sem animação de entrada: saem no HTML do servidor (LCP rápido).
import { ArrowDown } from "lucide-react";
import { LP_HERO } from "@/data/lp";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/prolav/WhatsAppIcon";
import { BackgroundVideo } from "./BackgroundVideo";

export function LpHero() {
  return (
    <section
      id="topo"
      aria-labelledby="lp-title"
      className="relative isolate flex min-h-[100svh] overflow-hidden bg-navy-deep text-ice"
    >
      <div className="absolute inset-0 -z-10">
        <BackgroundVideo {...LP_HERO.video} />
        {/* Véu navy: garante contraste AA do texto sobre qualquer quadro do vídeo */}
        <div aria-hidden="true" className="lp-hero-veil absolute inset-0" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col justify-end px-5 pb-24 pt-28 sm:pb-28 lg:justify-center lg:px-8 lg:pb-20">
        <p className="label-mono text-ice/80">{LP_HERO.badge}</p>

        <h1
          id="lp-title"
          className="mt-6 max-w-3xl text-[2.75rem] font-semibold leading-[0.98] sm:text-6xl lg:text-[5.25rem]"
        >
          {LP_HERO.title}{" "}
          <span className="em-serif mt-2 block text-brand-green">{LP_HERO.titleEmphasis}</span>
        </h1>

        <p className="mt-6 max-w-md text-lg leading-snug text-ice/85 sm:text-xl">
          {LP_HERO.subtitle}
        </p>

        <div className="mt-9 flex flex-col items-stretch gap-3 sm:items-start">
          <button
            data-hide-wa-float
            onClick={() => openWhatsApp("lp-hero", LP_HERO.ctaMessage)}
            className="btn-whatsapp min-h-14 px-7 text-base sm:text-lg"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            {LP_HERO.cta}
          </button>
          <p className="text-sm text-ice/75">{LP_HERO.ctaHint}</p>
        </div>

        <ul className="mt-10 flex max-w-2xl flex-col gap-2 border-t border-ice/20 pt-5 text-sm text-ice/80 sm:flex-row sm:gap-8">
          {LP_HERO.proofs.map((p) => (
            <li key={p} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-px w-3 bg-brand-green" />
              {p}
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#resultados"
        className="label-mono absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-ice/75 transition-colors hover:text-ice sm:flex"
      >
        {LP_HERO.scrollCue}
        <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
