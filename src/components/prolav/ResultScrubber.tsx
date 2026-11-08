// Antes → durante → depois em um vídeo real, controlado por uma linha do tempo arrastável.
// Acessibilidade: input range nativo (teclado/leitor de tela), aria-valuetext com o capítulo,
// botões de capítulo com aria-pressed, botão de pausar (WCAG 2.2.2) e alvos de toque ≥ 44px.
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { RESULTS, type ResultCase } from "@/data/content";
import { chapterAt, stepToTime, timeToStep, valueText } from "@/lib/chapters";

export function ResultScrubber({ item, index }: { item: ResultCase; index: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const autoplayed = useRef(false);
  const active = chapterAt(time, item.chapters);
  const rangeId = `scrub-${item.key}`;

  // Carrega só quando entra na tela; toca uma vez sozinho (sem loop) e pausa ao sair.
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) {
        setLoaded(true);
        if (!autoplayed.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          autoplayed.current = true;
          window.setTimeout(() => void v.play().catch(() => {}), 150);
        }
      } else v.pause();
    }, { threshold: 0.5 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  // Atualização suave do controle enquanto toca
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    const tick = () => { if (video.current) setTime(video.current.currentTime); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const seek = (t: number) => {
    const v = video.current;
    if (!v) return;
    setLoaded(true);
    v.pause();
    v.currentTime = t;
    setTime(t);
  };

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    setLoaded(true);
    if (v.paused) {
      if (v.ended || v.currentTime >= (duration || v.duration) - 0.05) v.currentTime = 0;
      void v.play().catch(() => {});
    } else v.pause();
  };

  const pct = duration ? (time / duration) * 100 : 0;

  return (
    <article className="flex flex-col" aria-labelledby={`${rangeId}-title`}>
      <figure className="specimen aspect-[4/5]">
        <video
          ref={video}
          src={loaded ? item.src : undefined}
          poster={item.poster}
          muted
          playsInline
          preload={loaded ? "auto" : "none"}
          className="h-full w-full object-cover"
          aria-label={`Vídeo real: ${item.title}`}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onEnded={(e) => { setPlaying(false); setTime(e.currentTarget.duration); }}
        />
        <div className="specimen-corners" />
        {/* Capítulo atual em destaque (decorativo: o leitor de tela recebe pelo aria-valuetext) */}
        <p aria-hidden="true" className="absolute left-4 top-4 z-[3] bg-navy-deep px-2.5 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-ice">
          {item.chapters[active]?.label}
        </p>
        <button
          type="button"
          onClick={toggle}
          aria-label={`${playing ? RESULTS.pause : RESULTS.play} vídeo: ${item.title}`}
          className="absolute bottom-3 right-3 z-[3] grid h-11 w-11 place-items-center bg-navy-deep text-ice transition-colors hover:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        </button>
      </figure>

      {/* Linha do tempo arrastável */}
      <div className="scrub mt-4" style={{ ["--pct" as string]: `${pct}%` }}>
        <label htmlFor={rangeId} className="sr-only">{`${RESULTS.scrubLabel}: ${item.title}`}</label>
        <input
          id={rangeId}
          type="range"
          min={0}
          max={1000}
          step={5}
          value={timeToStep(time, duration)}
          aria-valuetext={valueText(time, duration, item.chapters)}
          onChange={(e) => seek(stepToTime(Number(e.currentTarget.value), duration || video.current?.duration || 0))}
          onPointerDown={() => { setLoaded(true); video.current?.pause(); }}
        />
      </div>
      <div className="grid grid-cols-3" role="group" aria-label={`Capítulos: ${item.title}`}>
        {item.chapters.map((c, i) => (
          <button
            key={c.label}
            type="button"
            aria-pressed={i === active}
            onClick={() => seek(c.at + 0.05)}
            className={`min-h-11 border-t-2 pt-2 text-left font-mono text-xs uppercase tracking-[0.08em] transition-colors ${i === active ? "border-brand-green text-ice" : "border-transparent text-ice/70 hover:text-ice"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <p className="label-mono mt-6 text-ice/70">{String(index + 1).padStart(2, "0")} · {item.tag}</p>
      <h3 id={`${rangeId}-title`} className="mt-3 text-2xl font-semibold leading-tight text-ice sm:text-3xl">{item.title}</h3>
      <p className="mt-3 max-w-md leading-relaxed text-ice/75">{item.text}</p>
    </article>
  );
}
