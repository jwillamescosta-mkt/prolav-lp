// Segunda dobra: antes e depois em fotos reais.
// Mobile first: carrossel com deslize lateral (scroll-snap), um card por vez com ~86% da largura;
// no desktop, grade de 3 colunas. Cada card troca entre Antes / (Durante) / Depois no mesmo quadro.
// As fotos de cada par não têm o mesmo enquadramento, por isso a troca é por botão (crossfade),
// não por régua de sobreposição. Ao entrar na tela, o card mostra o "Depois" sozinho uma vez
// (exceto com movimento reduzido ou se a pessoa já tocou).
import { useEffect, useRef, useState } from "react";
import { BEFORE_AFTER, LP_HERO, LP_RESULTS, LP_VIDEOS, type BeforeAfterCase } from "@/data/lp";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/prolav/WhatsAppIcon";
import { ViewportVideo } from "@/components/prolav/ViewportVideo";
import { Rail } from "./Rail";

const src = (file: string, w: 480 | 720 | 1200) => `/media/antes-depois/${file}-${w}.webp`;

function BeforeAfterCard({ item }: { item: BeforeAfterCase }) {
  const last = item.stages.length - 1;
  const [active, setActive] = useState(0);
  // Até o card chegar perto da tela, só a primeira foto existe na página (economiza ~400 KB)
  const [near, setNear] = useState(false);
  const touched = useRef(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "50% 50%" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Revela o "Depois" uma vez quando o card fica bem visível
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setActive(last);
        }, 1400);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [last]);

  const pick = (i: number) => {
    touched.current = true;
    setNear(true);
    setActive(i);
  };

  return (
    <article
      ref={ref}
      aria-labelledby={`ba-${item.key}`}
      className="flex w-[86%] shrink-0 snap-start flex-col sm:w-[60%] lg:w-[44%]"
    >
      <figure className="relative aspect-[3/2] overflow-hidden bg-navy">
        {item.stages.map((s, i) =>
          i !== 0 && !near ? null : (
            <img
              key={s.file}
              src={src(s.file, 720)}
              srcSet={`${src(s.file, 480)} 480w, ${src(s.file, 720)} 720w, ${src(s.file, 1200)} 1200w`}
              sizes="(min-width: 1024px) 44vw, (min-width: 640px) 60vw, 86vw"
              width={1200}
              height={800}
              alt={s.alt}
              loading="lazy"
              decoding="async"
              aria-hidden={i !== active}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ),
        )}
        <figcaption
          aria-live="polite"
          className={`label-mono absolute left-3 top-3 px-2.5 py-1.5 ${active === last ? "bg-brand-green text-navy-deep" : "bg-navy-deep/85 text-ice"}`}
        >
          {item.stages[active]?.label}
        </figcaption>
      </figure>

      {/* Alternador Antes / Depois: alvos de 44px, estado anunciado com aria-pressed */}
      <div
        role="group"
        aria-label={`Comparar ${item.title}`}
        className="grid border-x border-b border-ice/15"
        style={{ gridTemplateColumns: `repeat(${item.stages.length}, minmax(0, 1fr))` }}
      >
        {item.stages.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => pick(i)}
            className={`min-h-11 text-sm font-semibold transition-colors ${i > 0 ? "border-l border-ice/15" : ""} ${
              i === active
                ? i === last
                  ? "bg-brand-green text-navy-deep"
                  : "bg-ice text-navy-deep"
                : "text-ice/75 hover:text-ice"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="pt-5">
        <p className="label-mono text-ice/65">{item.tag}</p>
        <h3 id={`ba-${item.key}`} className="mt-2 text-xl font-semibold">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ice/75">{item.text}</p>
      </div>
    </article>
  );
}

export function LpResults() {
  return (
    <section
      id="resultados"
      aria-labelledby="lp-resultados-title"
      className="grain scroll-mt-16 overflow-hidden bg-navy-deep text-ice"
    >
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:py-20 lg:px-8 lg:py-28">
        <p className="label-mono text-brand-green">{LP_RESULTS.kicker}</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <h2
            id="lp-resultados-title"
            className="text-[2.1rem] font-semibold leading-[1.02] sm:text-5xl lg:text-6xl"
          >
            {LP_RESULTS.title}{" "}
            <span className="em-serif block text-brand-green">{LP_RESULTS.titleEmphasis}</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ice/75 sm:text-lg">
            {LP_RESULTS.lead}
          </p>
        </div>

        <div className="mt-8 space-y-12 sm:mt-12 lg:mt-16 lg:space-y-20">
          <Rail label={LP_RESULTS.photosKicker} count={BEFORE_AFTER.length}>
            {BEFORE_AFTER.map((c) => (
              <BeforeAfterCard key={c.key} item={c} />
            ))}
          </Rail>

          <Rail label={LP_VIDEOS.kicker} title={LP_VIDEOS.title} count={LP_VIDEOS.items.length}>
            {LP_VIDEOS.items.map((v) => (
              <figure key={v.key} className="w-[62%] shrink-0 snap-start sm:w-[36%] lg:w-[22%]">
                <div className="aspect-[9/16] overflow-hidden bg-navy">
                  <ViewportVideo
                    src={v.src}
                    poster={v.poster}
                    label={v.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <figcaption className="mt-3 text-sm leading-snug text-ice/80">{v.title}</figcaption>
              </figure>
            ))}
          </Rail>
        </div>

        <div className="mt-10 border-t border-ice/15 pt-8 lg:mt-14">
          <button
            onClick={() => openWhatsApp("lp-resultados", LP_HERO.ctaMessage)}
            className="btn-whatsapp min-h-14 w-full px-6 text-base sm:w-auto"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            {LP_RESULTS.cta}
          </button>
        </div>
      </div>
    </section>
  );
}
