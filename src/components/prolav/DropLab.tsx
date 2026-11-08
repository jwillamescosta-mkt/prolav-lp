// Bloco do "Teste da gota": monta a cena 3D só quando está na tela e desmonta ao sair (poupa GPU).
// Com movimento reduzido, mostra o registro real estático no lugar da simulação.
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { METHOD } from "@/data/content";

const Scene = lazy(() => import("./DropLabScene"));

export function DropLab() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [lite, setLite] = useState(false);
  const [pour, setPour] = useState<{ side: -1 | 1; n: number }>({ side: 1, n: 0 });

  useEffect(() => {
    setLite(window.matchMedia("(max-width: 768px)").matches);
    const node = ref.current;
    if (!node || reduced) return;
    const io = new IntersectionObserver(([e]) => setVisible(Boolean(e?.isIntersecting)), { rootMargin: "120px" });
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <div className="grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:items-end lg:gap-16">
      <div>
        <p className="label-mono text-brand-green">{METHOD.lab.kicker}</p>
        <h3 className="mt-5 text-3xl font-semibold leading-tight text-ice sm:text-4xl">{METHOD.lab.title}</h3>
        <p className="mt-5 max-w-sm leading-relaxed text-ice/70">{METHOD.lab.text}</p>
      </div>

      <div>
      <div
        ref={ref}
        role="img"
        aria-label="Simulação: à esquerda, a gota entra no tecido comum e vira mancha; à direita, no tecido blindado, a gota fica na superfície."
        className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-[#cfc4b2] sm:aspect-[16/9]"
      >
        {reduced ? (
          <img src="/media/tec-gotas.webp" alt="" className="h-full w-full object-cover" loading="lazy" />
        ) : (
          visible && (
            <Suspense fallback={null}>
              <Scene lite={lite} pour={pour} />
            </Suspense>
          )
        )}
        {/* Rótulos das duas metades */}
        <div className="pointer-events-none absolute inset-x-0 top-0 grid grid-cols-2 text-navy">
          <span className="label-mono px-4 py-3">{METHOD.lab.left}</span>
          <span className="label-mono border-l border-navy/30 px-4 py-3">{METHOD.lab.right}</span>
        </div>
        {!reduced && (
          <p className="label-mono pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-navy-deep px-3 py-2 text-ice/85">
            {METHOD.lab.hint}
          </p>
        )}
      </div>
      {/* WCAG 2.1.1: alternativa por teclado/toque ao clique no canvas */}
      {!reduced && (
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button type="button" onClick={() => setPour((p) => ({ side: -1, n: p.n + 1 }))} className="min-h-11 border border-ice/25 px-3 text-sm text-ice transition-colors hover:border-ice/60">
            Pingar no tecido comum
          </button>
          <button type="button" onClick={() => setPour((p) => ({ side: 1, n: p.n + 1 }))} className="min-h-11 border border-ice/25 px-3 text-sm text-ice transition-colors hover:border-ice/60">
            Pingar no tecido blindado
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
