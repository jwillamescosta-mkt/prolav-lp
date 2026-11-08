// Passo a passo do método. Desktop: lista à esquerda e vídeo real fixo à direita,
// que troca conforme o passo ativo na rolagem. Celular: cada passo com o próprio vídeo.
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { METHOD } from "@/data/content";
import { ViewportVideo } from "./ViewportVideo";

const media = (key: string) => ({ src: `/media/tec-${key}.mp4`, poster: `/media/tec-${key}.webp` });

export function MethodSteps() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const reduced = useReducedMotion();

  // Passo ativo = o que cruza o meio da tela
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset["i"])); }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);

  const current = METHOD.steps[active] ?? METHOD.steps[0]!;

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_0.75fr] lg:gap-20">
      <ol>
        {METHOD.steps.map((s, i) => (
          <li
            key={s.n}
            ref={(el) => { refs.current[i] = el; }}
            data-i={i}
            className={`border-t border-rule py-10 transition-opacity duration-500 lg:flex lg:min-h-[62vh] lg:flex-col lg:justify-center lg:py-0 ${i === active ? "lg:opacity-100" : "lg:opacity-30"}`}
          >
            <span className="font-mono text-sm text-ink/50">{s.n} / 04</span>
            <h3 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{s.title}</h3>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">{s.text}</p>
            {/* Vídeo inline só no celular */}
            <div className="specimen mt-8 aspect-[4/5] w-full max-w-sm lg:hidden">
              <ViewportVideo {...media(s.media)} label={s.title} className="h-full w-full object-cover" />
              <div className="specimen-corners" />
            </div>
          </li>
        ))}
      </ol>

      {/* Vídeo fixo (desktop) */}
      <div className="hidden lg:block">
        <figure className="sticky top-24">
          <div className="specimen aspect-[9/14] w-full">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={current.media}
                className="absolute inset-0"
                initial={reduced ? false : { opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: reduced ? 1 : 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <ViewportVideo {...media(current.media)} label={current.title} className="h-full w-full object-cover" />
              </motion.div>
            </AnimatePresence>
            <div className="specimen-corners" />
          </div>
          <figcaption className="specimen-caption label-mono text-ink/55">
            <span>{current.n} — {current.title}</span>
            <span>Registro real</span>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
