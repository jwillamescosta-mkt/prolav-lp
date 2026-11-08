import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

type Props = { src: string; poster: string; label: string; className?: string; active?: boolean };

// Sem download antecipado: a fonte só é anexada quando o vídeo entra na tela.
// WCAG 2.2.2: todo vídeo que toca sozinho em loop tem botão de pausar (44×44px).
// A pausa manual é respeitada mesmo quando o vídeo sai e volta para a tela.
export function ViewportVideo({ src, poster, label, className = "", active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || !active || reduced.matches || document.hidden || userPaused) { video.pause(); return; }
      setLoaded(true);
      // load/play têm efeito apenas quando a fonte estiver anexada.
      if (video.getAttribute("src")) void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); sync(); }, { threshold: 0.25 });
    observer.observe(video);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); video.pause(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [active, loaded, userPaused]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) { setUserPaused(false); setLoaded(true); void video.play().catch(() => {}); }
    else { setUserPaused(true); video.pause(); }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        src={loaded ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className={className}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pausar" : "Reproduzir"} vídeo: ${label}`}
        className="absolute bottom-3 right-3 z-[3] grid h-11 w-11 place-items-center bg-navy-deep/90 text-ice transition-colors hover:bg-navy-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ice"
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
