// Entrevista dos sócios (YouTube) com carregamento sob demanda:
// mostra só a capa; o player (youtube-nocookie, sem cookies até o play) entra no clique.
// Evita ~1 MB de JavaScript do YouTube no carregamento e respeita a privacidade (LGPD).
import { useState } from "react";
import { Play } from "lucide-react";
import { INTERVIEW } from "@/data/closing";
import { openWhatsApp } from "@/lib/tracking";

export function InterviewSection() {
  const [playing, setPlaying] = useState(false);
  const id = INTERVIEW.youtubeId;

  const start = () => {
    setPlaying(true);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "video_entrevista_play" });
  };

  return (
    <section id="entrevista" aria-labelledby="entrevista-title" className="grain bg-navy-deep text-ice">
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16 lg:px-8 lg:pb-32">
        <div className="specimen aspect-video w-full">
          {playing ? (
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Entrevista com Handerson Lima e Ruana Clemente, sócios da PROLAV"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <button type="button" onClick={start} className="group absolute inset-0 h-full w-full" aria-label={`${INTERVIEW.play}: Handerson Lima e Ruana Clemente, sócios da PROLAV`}>
              <img
                src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-85 transition-opacity group-hover:opacity-100"
              />
              <span className="absolute bottom-4 left-4 flex items-center gap-3 bg-ice px-5 py-3 font-semibold text-navy-deep transition-colors group-hover:bg-brand-green">
                <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                {INTERVIEW.play}
              </span>
              <span className="specimen-corners" />
            </button>
          )}
        </div>

        <div>
          <p className="section-index label-mono text-ice/70"><span>{INTERVIEW.kicker}</span></p>
          <h2 id="entrevista-title" className="mt-6 text-4xl font-semibold leading-none sm:text-5xl">
            {INTERVIEW.title}<br />
            <span className="em-serif text-brand-green">{INTERVIEW.titleEmphasis}</span>
          </h2>
          <p className="mt-6 leading-relaxed text-ice/75">{INTERVIEW.text}</p>
          <button type="button" onClick={() => openWhatsApp("entrevista", INTERVIEW.ctaMessage)} className="link-arrow mt-8 text-ice hover:text-brand-green">
            {INTERVIEW.cta} →
          </button>
        </div>
      </div>
    </section>
  );
}
