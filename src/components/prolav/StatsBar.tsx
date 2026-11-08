// Barra de provas rápidas com contadores animados ao entrar na tela.
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { STATS } from "@/data/content";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to); // SSR mostra o valor final (sem layout shift)
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref} className="inline-block min-w-[3ch] text-right tabular-nums">{n}</span>;
}

export function StatsBar() {
  return (
    <section aria-label="Provas rápidas" className="border-y border-white/10 bg-slate-deep">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/10 px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s) => (
          <li key={s.label} className="flex items-center justify-center gap-3 py-6">
            {s.value !== undefined ? (
              <span className="font-mono text-3xl font-bold text-cyan-soft">
                {s.prefix}<Counter to={s.value} />{s.suffix}
              </span>
            ) : (
              <BadgeCheck className="h-8 w-8 text-gold" aria-hidden="true" />
            )}
            <span className="text-sm font-medium text-ice/85">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
