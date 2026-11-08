// HERO — composição editorial em duas colunas: texto à esquerda, registro real à direita.
// O texto renderiza no servidor (LCP); a cena 3D entra depois, só no navegador e bem discreta.
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { HERO, HERO_MEDIA } from "@/data/content";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { ViewportVideo } from "./ViewportVideo";

const HeroScene = lazy(() => import("./HeroScene"));

/** Quebra o título para destacar um trecho em serifa itálica. */
function Title() {
  const [before, after] = HERO.title.split(HERO.titleEmphasis);
  return (
    <h1 className="text-[2.6rem] font-semibold leading-[0.98] text-ice sm:text-6xl lg:text-[4.6rem]">
      {before}
      <span className="em-serif text-brand-green">{HERO.titleEmphasis}</span>
      {after}
    </h1>
  );
}

export function Hero({ media }: { media?: ReactNode }) {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState<{ count: number; lite: boolean } | null>(null);

  // Decide se e como carregar o 3D (após hidratação, sem bloquear o LCP)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const id = window.setTimeout(() => setScene({ count: mobile ? 30 : 90, lite: mobile }), 400);
    return () => window.clearTimeout(id);
  }, []);

  const rise = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <section id="topo" className="grain relative isolate overflow-hidden bg-hero">
      {/* Cena 3D atrás de tudo, com opacidade baixa — textura, não protagonista */}
      <div className="absolute inset-0 -z-10 opacity-50" aria-hidden="true">
        {media ??
          (scene && (
            <Suspense fallback={null}>
              <div className="h-full w-full motion-safe:animate-[fade-in_1.6s_ease-out]">
                <HeroScene {...scene} />
              </div>
            </Suspense>
          ))}
        <div className="absolute inset-0 bg-hero-veil" />
      </div>

      <div className="mx-auto grid min-h-[100svh] w-full max-w-7xl grid-cols-1 items-end gap-12 px-5 pb-16 pt-28 lg:grid-cols-[1.35fr_0.65fr] lg:items-center lg:gap-16 lg:px-8 lg:pb-20">
        <div className="relative z-10">
          <motion.p {...rise(0)} className="label-mono text-ice/70">
            {HERO.badge}
          </motion.p>
          <motion.div {...rise(0.05)} className="mt-7">
            <Title />
          </motion.div>
          <motion.p {...rise(0.15)} className="mt-8 max-w-xl text-base leading-relaxed text-ice/75 sm:text-lg">
            {HERO.subtitle}
          </motion.p>
          <motion.div {...rise(0.25)} className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <button onClick={() => openWhatsApp("hero")} className="btn-whatsapp h-14 px-7 text-base">
              <WhatsAppIcon className="h-5 w-5" />
              {HERO.ctaPrimary}
            </button>
            <a href="#problema" className="link-arrow text-sm text-ice/80 hover:text-ice">
              {HERO.ctaSecondary.replace(" ↓", "")}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.div>
          <motion.ul {...rise(0.32)} className="mt-10 grid max-w-xl grid-cols-1 gap-y-2 border-t border-ice/15 pt-5 text-sm text-ice/65 sm:grid-cols-3">
            {HERO.microproof.map((m) => (
              <li key={m} className="flex items-center gap-2">
                <span aria-hidden="true" className="h-px w-3 bg-brand-green" />
                {m}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Registro real em moldura de "amostra" — prova visual acima da dobra */}
        <motion.figure {...rise(0.2)} className="relative z-10 mx-auto hidden w-full max-w-[340px] lg:block">
          <div className="specimen aspect-[9/14]">
            <ViewportVideo src="/media/tec-extracao.mp4" poster="/media/tec-extracao.webp" label="Técnico da PROLAV fazendo extração profunda em sofá" className="h-full w-full object-cover" />
            <div className="specimen-corners" />
          </div>
          <figcaption className="specimen-caption label-mono text-ice/70">
            <span>{HERO_MEDIA.caption}</span>
            <span>{HERO_MEDIA.place}</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
