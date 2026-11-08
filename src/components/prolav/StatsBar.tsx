// Faixa de provas em papel claro: números grandes em mono, legenda curta, sem ícones genéricos.
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { STATS } from "@/data/content";

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(to); // SSR mostra o valor final (sem layout shift)
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduce, to]);
  return <span ref={ref} className="tabular-nums">{n}</span>;
}

export function StatsBar() {
  return (
    <section aria-label="Provas rápidas" className="bg-paper text-ink">
      <ul className="mx-auto grid max-w-7xl grid-cols-1 px-5 sm:grid-cols-3 lg:px-8">
        {STATS.map((s, i) => (
          <li key={s.label} className={`flex flex-col gap-2 py-8 sm:px-8 sm:py-10 ${i > 0 ? "border-t border-rule sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
            {s.value !== undefined ? (
              <span className="font-display text-5xl font-semibold tracking-tight lg:text-6xl">
                {s.prefix}<Counter to={s.value} />{s.suffix}
              </span>
            ) : (
              <span className="em-serif text-4xl leading-none lg:text-5xl">{s.label}</span>
            )}
            {s.value !== undefined && <span className="text-sm font-medium">{s.label}</span>}
            <span className="label-mono text-ink/55">{s.note}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
