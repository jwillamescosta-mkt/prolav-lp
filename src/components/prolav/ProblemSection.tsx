import { ArrowDown } from "lucide-react";
import { PROBLEM } from "@/data/content";
import { SofaXray } from "./SofaXray";
import { Personas } from "./Personas";
import { DiagnosisQuiz } from "./DiagnosisQuiz";

// Blocos independentes: raio-X imersivo, histórias reais e diagnóstico revisável.
export function ProblemSection() {
  return <section id="problema" className="grain bg-navy-deep" aria-label="O que se acumula no seu estofado">
    <SofaXray /><Personas /><DiagnosisQuiz />
    {/* Passagem para a etapa 3: frase grande, sem seta saltitante */}
    <div className="border-t border-ice/10 px-5 py-16 lg:py-20">
      <a href="#tecnologia" className="group mx-auto flex max-w-7xl items-end justify-between gap-8 lg:px-3">
        <span className="max-w-3xl font-display text-2xl font-medium leading-tight text-ice/90 transition-colors group-hover:text-ice sm:text-4xl">{PROBLEM.transition}</span>
        <ArrowDown className="h-8 w-8 shrink-0 text-brand-green transition-transform group-hover:translate-y-1" aria-hidden="true" />
      </a>
    </div>
  </section>;
}
