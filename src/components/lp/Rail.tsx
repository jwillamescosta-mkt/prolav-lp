// Galeria horizontal: deslize no celular, setas no desktop, barra de progresso fina.
// Rolagem nativa com scroll-snap (leve, acessível ao teclado e ao leitor de tela).
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = { label: string; title?: ReactNode; count: number; children: ReactNode };

export function Rail({ label, title, count, children }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
      setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft > max - 8 });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    el.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on, { passive: true });
    return () => {
      el.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="label-mono text-ice/60">
            {label} · {String(count).padStart(2, "0")}
          </p>
          {title && <h3 className="mt-2 text-xl font-semibold sm:text-2xl">{title}</h3>}
        </div>
        <div className="hidden shrink-0 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={edges.start}
            aria-label={`${label}: anteriores`}
            className="rail-arrow"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={edges.end}
            aria-label={`${label}: próximos`}
            className="rail-arrow"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="rail -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 lg:mx-0 lg:scroll-px-0 lg:gap-6 lg:px-0"
        style={
          {
            "--fade-l": edges.start ? "0%" : "6%",
            "--fade-r": edges.end ? "0%" : "10%",
          } as CSSProperties
        }
      >
        {children}
      </div>

      {/* Progresso da rolagem: linha fina, sem pontos (escala melhor com muitos itens) */}
      <div aria-hidden="true" className="mt-5 h-px w-full bg-ice/15">
        <div
          className="h-px bg-brand-green transition-[width] duration-150"
          style={{ width: `${Math.max(12, progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
