// Terceira dobra: serviços + "como funciona" em 3 passos (os números já estão na hero). Cada serviço abre o WhatsApp com a mensagem
// do próprio serviço (o atendimento já sabe o que o lead quer, e a origem fica rastreada).
import { ArrowRight } from "lucide-react";
import { LP_SERVICES, LP_STEPS } from "@/data/lp";
import { openWhatsApp } from "@/lib/tracking";

export function LpServices() {
  return (
    <section id="servicos" aria-labelledby="lp-servicos-title" className="grain bg-paper text-ink">
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="label-mono text-ink/70">{LP_SERVICES.kicker}</p>
            <h2
              id="lp-servicos-title"
              className="mt-4 text-4xl font-semibold leading-none sm:text-5xl"
            >
              {LP_SERVICES.title}
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
            {LP_SERVICES.lead}
          </p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden border border-rule bg-[var(--rule)] sm:grid-cols-2">
          {LP_SERVICES.items.map((s) => (
            <li key={s.key} className="flex flex-col bg-paper p-6 sm:p-8">
              <p className="label-mono text-ink/65">{s.tag}</p>
              <h3 className="mt-3 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink/75">{s.text}</p>
              <button
                onClick={() => openWhatsApp(`lp-servico-${s.key}`, s.message)}
                className="link-arrow mt-6 min-h-11 self-start text-ink"
              >
                {LP_SERVICES.cta}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-ink/70">{LP_SERVICES.combo}</p>

        {/* Como funciona: 3 passos até o atendimento */}
        <div className="mt-14 border-t border-ink pt-8 lg:mt-20">
          <p className="label-mono text-ink/70">{LP_STEPS.kicker}</p>
          <ol className="mt-6 grid gap-8 sm:grid-cols-3 sm:gap-10">
            {LP_STEPS.items.map((st) => (
              <li key={st.n} className="flex gap-4 sm:flex-col sm:gap-3">
                <span className="font-display text-3xl font-semibold leading-none text-ink/30 tabular-nums">
                  {st.n}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{st.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink/75">{st.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
