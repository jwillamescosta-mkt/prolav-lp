import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { registerVideo, type VideoHandle } from "@/lib/videoCoordinator";

type Props = { src: string; poster: string; label: string; className?: string; active?: boolean };

// Vídeo em loop gerenciado pelo coordenador da página:
// - a fonte é anexada quando o vídeo está a até 1 tela de distância (já chega com buffer);
// - só toca se estiver entre os mais visíveis (limite por aparelho/conexão);
// - WCAG 2.2.2: botão de pausar/reproduzir de 44×44px; a pausa manual é respeitada.
export function ViewportVideo({ src, poster, label, className = "", active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const handle = useRef<VideoHandle | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    handle.current = registerVideo(el, { onNear: () => setLoaded(true) });
    return () => { handle.current?.unregister(); handle.current = null; };
  }, []);

  // Fonte anexada → coordenador pode decidir tocar
  useEffect(() => { if (loaded) handle.current?.refresh(); }, [loaded]);
  useEffect(() => { handle.current?.setEnabled(active); }, [active]);

  const toggle = () => {
    setLoaded(true);
    handle.current?.setUserPaused(Boolean(ref.current && !ref.current.paused));
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
        preload={loaded ? "auto" : "none"}
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
