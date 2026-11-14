// Vídeo de fundo em tela cheia para a hero da landing /orcamento.
// Usa o coordenador de vídeos da página (pré-carrega perto da tela, toca só dentro do orçamento
// do aparelho, pausa com a aba oculta). Sem orçamento (economia de dados / movimento reduzido),
// fica o poster. WCAG 2.2.2: botão de pausar de 44×44px, no canto esquerdo para não
// disputar espaço com o botão flutuante do WhatsApp.
// Desempenho: o vídeo só começa a baixar depois que a página terminou de carregar e o navegador
// ficou ocioso. Até lá aparece a imagem de capa — o título e o botão chegam primeiro (LCP).
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { registerVideo, type VideoHandle } from "@/lib/videoCoordinator";

type Props = {
  src: string;
  poster: string;
  desktopSrc?: string;
  desktopPoster?: string;
  label: string;
};

/** Tela larga em paisagem usa o recorte 16:9 (mais nítido que ampliar o vertical). */
const WIDE = "(min-width: 1024px) and (orientation: landscape)";

export function BackgroundVideo({ src, poster, desktopSrc, desktopPoster, label }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const handle = useRef<VideoHandle | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [wide, setWide] = useState(false);
  const [idle, setIdle] = useState(false);

  // Libera o vídeo só após o evento load + navegador ocioso (máx. 2,5 s de espera)
  useEffect(() => {
    let id = 0;
    // Conexão lenta ou economia de dados: fica só a imagem de capa (o botão ▶ ainda carrega o vídeo)
    const net = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (net?.saveData || /(^|-)2g|3g/.test(net?.effectiveType ?? "")) return;
    const later = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      };
      if (w.requestIdleCallback) id = w.requestIdleCallback(() => setIdle(true), { timeout: 2500 });
      else id = window.setTimeout(() => setIdle(true), 1200);
    };
    if (document.readyState === "complete") later();
    else window.addEventListener("load", later, { once: true });
    return () => {
      window.removeEventListener("load", later);
      const w = window as Window & { cancelIdleCallback?: (id: number) => void };
      if (w.cancelIdleCallback) w.cancelIdleCallback(id);
      window.clearTimeout(id);
    };
  }, []);

  // Escolhe a versão do vídeo depois da hidratação (o servidor não conhece a tela)
  useEffect(() => {
    if (!desktopSrc) return;
    const mq = window.matchMedia(WIDE);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [desktopSrc]);
  const attached = loaded && idle;
  useEffect(() => {
    if (attached) handle.current?.refresh();
  }, [wide, attached]);

  const currentSrc = wide && desktopSrc ? desktopSrc : src;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    handle.current = registerVideo(el, { onNear: () => setLoaded(true) });
    return () => {
      handle.current?.unregister();
      handle.current = null;
    };
  }, []);
  const toggle = () => {
    setLoaded(true);
    setIdle(true);
    handle.current?.setUserPaused(Boolean(ref.current && !ref.current.paused));
  };

  return (
    <>
      {/* Capa escolhida pelo navegador já no HTML do servidor (sem esperar o JavaScript) */}
      <picture>
        {desktopPoster && <source media={WIDE} srcSet={desktopPoster} type="image/webp" />}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </picture>
      <video
        ref={ref}
        src={attached ? currentSrc : undefined}
        muted
        loop
        playsInline
        preload={attached ? "auto" : "none"}
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pausar" : "Reproduzir"} vídeo de fundo`}
        className="absolute bottom-5 left-5 z-20 grid h-11 w-11 place-items-center border border-ice/20 bg-navy-deep/60 text-ice transition-colors hover:bg-navy-deep lg:left-8"
      >
        {playing ? (
          <Pause className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Play className="h-4 w-4" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
