// Entrevista dos sócios no TH Entrevista (Tribuna Hoje).
// Prova de autoridade entre os resultados e as dúvidas: imprensa local + falas dos sócios
// + o checklist "antes de contratar" da própria matéria, que conduz ao WhatsApp.
// Player sob demanda: só a capa carrega; o YouTube (youtube-nocookie) entra no clique.
import { useState } from "react";
import { Check, Play } from "lucide-react";
import { INTERVIEW } from "@/data/closing";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function InterviewSection() {
  const [playing, setPlaying] = useState(false);
  const id = INTERVIEW.youtubeId;

  const start = () => {
    setPlaying(true);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "video_entrevista_play" });
  };

  return (
    <section id="entrevista" aria-labelledby="entrevista-title" className="grain border-t border-rule bg-paper text-ink">
      <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="section-index label-mono text-ink/70"><span>{INTERVIEW.kicker} · {INTERVIEW.source}</span></p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <h2 id="entrevista-title" className="text-4xl font-semibold leading-[0.98] sm:text-5xl lg:text-6xl">
            {INTERVIEW.title} <span className="em-serif">{INTERVIEW.titleEmphasis}</span>
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">{INTERVIEW.lead}</p>
        </div>

        {/* Vídeo */}
        <figure className="mt-12">
          <div className="specimen aspect-video w-full">
            {playing ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title="TH Entrevista: Handerson Lima e Ruana Clemente, sócios da PROLAV"
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <button type="button" onClick={start} className="group absolute inset-0 h-full w-full" aria-label={`${INTERVIEW.play}: ${INTERVIEW.source}, com Handerson Lima e Ruana Clemente`}>
                <img
                  src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                  onError={(e) => { e.currentTarget.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }}
                  alt="Handerson Lima e Ruana Clemente, sócios da PROLAV, no TH Entrevista da Tribuna Hoje"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="absolute inset-0 bg-navy-deep/25 transition-colors group-hover:bg-navy-deep/10" />
                <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 bg-ice px-5 py-3.5 font-semibold text-navy-deep shadow-lg transition-colors group-hover:bg-brand-green sm:px-7 sm:py-4 sm:text-lg">
                  <Play className="h-5 w-5 fill-current" aria-hidden="true" />
                  {INTERVIEW.play}
                </span>
                <span className="specimen-corners" />
              </button>
            )}
          </div>
          <figcaption className="specimen-caption label-mono text-ink/70">
            <span>{INTERVIEW.source} · {INTERVIEW.date}</span>
            <span className="hidden sm:inline">{INTERVIEW.credit}</span>
          </figcaption>
        </figure>

        {/* Falas dos sócios + checklist da matéria */}
        <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-10">
          {INTERVIEW.quotes.map((q) => (
            <blockquote key={q.name} className="border-t border-ink pt-6">
              <p className="em-serif text-2xl leading-snug sm:text-[1.7rem]">“{q.text}”</p>
              <footer className="mt-5 text-sm"><strong className="font-semibold">{q.name}</strong> <span className="text-ink/70">· {q.role}</span></footer>
            </blockquote>
          ))}
          <div className="bg-navy-deep p-6 text-ice sm:p-8">
            <h3 className="text-xl font-semibold">{INTERVIEW.checklistTitle}</h3>
            <ul className="mt-5 space-y-3">
              {INTERVIEW.checklist.map((c) => (
                <li key={c} className="flex gap-3 text-ice/90"><Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" aria-hidden="true" />{c}</li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-ice/75">{INTERVIEW.checklistNote}</p>
            <button type="button" onClick={() => openWhatsApp("entrevista", INTERVIEW.ctaMessage)} className="btn-whatsapp mt-6 min-h-12 w-full px-4 py-3 text-sm sm:text-base">
              <WhatsAppIcon className="h-5 w-5 shrink-0" />
              {INTERVIEW.cta}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
