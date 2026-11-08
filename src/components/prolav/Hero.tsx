// HERO full-screen. O texto renderiza no servidor; a cena 3D carrega depois, só no navegador.
// Preparado para receber foto/vídeo real via prop `media` nas próximas etapas.
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ShieldCheck } from "lucide-react";
import { HERO } from "@/data/content";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "./WhatsAppIcon";

const HeroScene = lazy(() => import("./HeroScene"));

export function Hero({ media }: { media?: ReactNode }) {
  const reduce = useReducedMotion();
  const [scene, setScene] = useState<{ count: number; lite: boolean } | null>(null);

  // Decide se e como carregar o 3D (após hidratação, sem bloquear o LCP)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const id = window.setTimeout(() => setScene({ count: mobile ? 40 : 140, lite: mobile }), 300);
    return () => window.clearTimeout(id);
  }, []);

  const fade = (d: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: d } };

  return (
    <section id="topo" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-hero">
      {/* Camada de mídia: cena 3D agora, foto/vídeo real depois */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {media ??
          (scene && (
            <Suspense fallback={null}>
              <div className="h-full w-full motion-safe:animate-[fade-in_1.2s_ease-out]">
                <HeroScene {...scene} />
              </div>
            </Suspense>
          ))}
        <div className="absolute inset-0 bg-hero-veil" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-28">
        <div className="max-w-3xl">
          <motion.p {...fade(0)} className="inline-flex items-center gap-2 rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-medium text-cyan-soft sm:text-sm">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            {HERO.badge}
          </motion.p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ice sm:text-5xl lg:text-6xl">
            {HERO.title}
          </h1>
          <motion.p {...fade(0.1)} className="mt-6 max-w-2xl text-base leading-relaxed text-ice/80 sm:text-lg">
            {HERO.subtitle}
          </motion.p>
          <motion.div {...fade(0.2)} className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <button onClick={() => openWhatsApp("hero")} className="btn-whatsapp h-14 px-6 text-base">
              <WhatsAppIcon className="h-5 w-5" />
              {HERO.ctaPrimary}
            </button>
            <a href="#problema" className="text-sm font-semibold text-ice/85 underline-offset-4 hover:text-cyan-soft hover:underline">
              {HERO.ctaSecondary}
            </a>
          </motion.div>
          <motion.ul {...fade(0.3)} className="mt-5 flex flex-wrap gap-x-3 gap-y-1 text-sm text-ice/70">
            {HERO.microproof.map((m, i) => (
              <li key={m} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="text-cyan">•</span>}
                {m}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      <a href="#problema" aria-label="Rolar para a próxima seção" className="absolute bottom-6 left-1/2 -translate-x-1/2 text-ice/70 hover:text-cyan-soft">
        <ChevronDown className="h-7 w-7 motion-safe:animate-bounce" />
      </a>
    </section>
  );
}
