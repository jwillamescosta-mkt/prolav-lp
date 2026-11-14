// Última dobra: CTA final, as dúvidas que mais travam o fechamento e rodapé.
// As respostas vêm de CLOSING.faq (fonte única), escolhidas por LP_CLOSING.faqPick.
// Dúvidas em <details> nativo: mesmo comportamento do acordeão, acessível por padrão e
// sem os ~58 KB de JavaScript do componente Radix nesta página.
import { ChevronDown } from "lucide-react";
import { CLOSING } from "@/data/closing";
import { LP_CLOSING } from "@/data/lp";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "@/components/prolav/WhatsAppIcon";

export function LpClosing() {
  const faq = LP_CLOSING.faqPick
    .map((i) => CLOSING.faq[i])
    .filter((f): f is (typeof CLOSING.faq)[number] => Boolean(f));

  return (
    <section aria-labelledby="lp-final-title" className="grain bg-navy-deep text-ice">
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-28">
        <div>
          <h2 id="lp-final-title" className="text-5xl font-semibold leading-[0.95] sm:text-6xl">
            <span className="em-serif text-brand-green">{LP_CLOSING.finalTitle}</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ice/80">
            {LP_CLOSING.finalText}
          </p>
          <button
            onClick={() => openWhatsApp("lp-final", LP_CLOSING.ctaMessage)}
            className="btn-whatsapp mt-9 min-h-16 w-full px-8 py-3 text-lg sm:w-auto"
          >
            <WhatsAppIcon className="h-6 w-6 shrink-0" />
            {LP_CLOSING.cta}
          </button>
          <p className="label-mono mt-5 text-ice/70">{LP_CLOSING.microproof}</p>
        </div>

        <div>
          <h3 className="label-mono font-normal text-ice/70">{LP_CLOSING.kicker}</h3>
          <div className="mt-4 border-t border-ice/25">
            {faq.map((f) => (
              <details key={f.q} className="lp-faq group border-b border-ice/15">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium sm:text-lg">
                  {f.q}
                  <ChevronDown
                    className="h-4 w-4 shrink-0 text-ice/70 transition-transform duration-200 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="pb-5 text-base leading-relaxed text-ice/75">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* pb extra: o botão flutuante não cobre o rodapé no celular */}
      <footer className="border-t border-ice/15 px-5 pb-24 pt-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-sm text-ice/70 sm:flex-row sm:items-center sm:justify-between">
          <p>{CLOSING.footer}</p>
          <a
            href={CLOSING.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow self-start text-ice"
          >
            Instagram {CLOSING.instagram.handle}
          </a>
        </div>
      </footer>
    </section>
  );
}
