import { ArrowDown } from "lucide-react";
import { PROBLEM } from "@/data/content";
import { SofaXray } from "./SofaXray";
import { Personas } from "./Personas";
import { DiagnosisQuiz } from "./DiagnosisQuiz";

// Blocos independentes: raio-X imersivo, histórias reais e diagnóstico revisável.
export function ProblemSection() {
  return <section id="problema" className="bg-navy" aria-label="O que se acumula no seu estofado">
    <SofaXray /><Personas /><DiagnosisQuiz />
    <div className="border-t border-ice/10 px-5 py-12"><a href="#tecnologia" className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center text-lg font-medium text-ice/85 hover:text-cyan-soft"><span>{PROBLEM.transition}</span><ArrowDown className="h-6 w-6 text-cyan-soft motion-safe:animate-bounce" /></a></div>
  </section>;
}