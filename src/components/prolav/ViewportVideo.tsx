import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster: string; label: string; className?: string; active?: boolean };

// Sem download antecipado: a fonte só é anexada quando o vídeo entra na tela.
export function ViewportVideo({ src, poster, label, className = "", active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (!visible || !active || reduced.matches || document.hidden) { video.pause(); return; }
      setLoaded(true);
      // load/play têm efeito apenas quando a fonte estiver anexada.
      if (video.getAttribute("src")) void video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => { visible = Boolean(entry?.isIntersecting); sync(); }, { threshold: 0.25 });
    observer.observe(video);
    reduced.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); video.pause(); reduced.removeEventListener("change", sync); document.removeEventListener("visibilitychange", sync); };
  }, [active, loaded]);
  return <video ref={ref} src={loaded ? src : undefined} poster={poster} muted loop playsInline preload="none" aria-label={label} className={className} />;
}