import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QUIZ } from "@/data/content";
import { calculatePriority, diagnosisMessage, toggleSign } from "@/lib/diagnosis";
import { openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function DiagnosisQuiz() {
  const [step, setStep] = useState(0);
  const [items, setItems] = useState<string[]>([]);
  const [period, setPeriod] = useState("");
  const [signs, setSigns] = useState<string[]>([]);
  const [neighborhood, setNeighborhood] = useState("");
  const reduced = useReducedMotion();
  const priority = calculatePriority(period, signs);
  const valid = step === 0 ? items.length > 0 : step === 1 ? Boolean(period) : step === 2 ? signs.length > 0 : true;
  const complete = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "quiz_complete", prioridade: priority });
    setStep(4);
  };
  const reset = () => { setStep(0); setItems([]); setPeriod(""); setSigns([]); setNeighborhood(""); };
  const options = step === 0 ? QUIZ.items : step === 1 ? QUIZ.periods : QUIZ.signs;
  const selected = step === 0 ? items : step === 1 ? [period] : signs;
  const choose = (option: string) => {
    if (step === 0) setItems(items.includes(option) ? items.filter((item) => item !== option) : [...items, option]);
    if (step === 1) setPeriod(option);
    if (step === 2) setSigns(toggleSign(signs, option));
  };
  return <section className="border-t border-ice/10 px-5 py-20 lg:py-24" aria-labelledby="quiz-title"><div className="mx-auto max-w-3xl">
    <p className="section-kicker">{QUIZ.kicker}</p><h2 id="quiz-title" className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">{QUIZ.title}</h2>
    <div className="quiz-glass mt-8 overflow-hidden rounded-lg border border-ice/15">
      <div className="h-1 bg-ice/10" role="progressbar" aria-label={QUIZ.kicker} aria-valuemin={0} aria-valuemax={4} aria-valuenow={Math.min(step + 1, 4)}><motion.div className="h-full origin-left bg-brand-green" animate={{ scaleX: Math.min(step + 1, 4) / 4 }} transition={{ duration: reduced ? 0 : 0.4 }} /></div>
      <div className="p-6 sm:p-9"><AnimatePresence mode="wait"><motion.div key={step} initial={reduced ? false : { opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: reduced ? 0 : 0.18 }}>
        {step < 4 ? <><div className="mb-6 flex items-start justify-between gap-4"><h3 className="text-xl font-semibold" id="quiz-question">{QUIZ.questions[step]}</h3><span className="shrink-0 font-mono text-xs text-cyan-soft">0{step + 1} / 04</span></div>
          <div className="quiz-answers" role={step === 1 ? "radiogroup" : "group"} aria-labelledby="quiz-question">
            {step < 3 ? options.map((option) => <Button key={option} variant="ghost" role={step === 1 ? "radio" : "checkbox"} aria-checked={selected.includes(option)} className={`quiz-option ${selected.includes(option) ? "quiz-option-selected" : ""}`} onClick={() => choose(option)}><span className={`quiz-check ${step === 1 ? "quiz-radio" : ""}`}>{selected.includes(option) && <Check aria-hidden="true" />}</span>{option}</Button>) : <div className="w-full"><label className="mb-3 block text-sm text-ice/60" htmlFor="quiz-neighborhood">{QUIZ.optional}</label><input id="quiz-neighborhood" value={neighborhood} onChange={(e) => setNeighborhood(e.target.value)} maxLength={80} autoComplete="address-level3" className="quiz-input" /></div>}
          </div>
          <div className="mt-7 flex items-center justify-between gap-4"><Button variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)} className="text-ice/70 hover:bg-ice/5 hover:text-ice"><ArrowLeft />{QUIZ.back}</Button><Button disabled={!valid} onClick={() => step === 3 ? complete() : setStep(step + 1)} className="bg-brand-green text-navy shadow-none hover:bg-brand-green/90">{step === 3 ? QUIZ.finish : QUIZ.next}<ArrowRight /></Button></div>
        </> : <div className="text-center" aria-live="polite"><p className="mb-5 text-sm text-ice/65">{QUIZ.resultTitle}</p><div className={`priority-meter priority-${priority.toLowerCase()}`}><svg viewBox="0 0 140 140" aria-hidden="true"><circle className="meter-track" cx="70" cy="70" r="62" /><motion.circle className="meter-fill" cx="70" cy="70" r="62" pathLength={1} initial={{ pathLength: reduced ? 1 : 0 }} animate={{ pathLength: priority === "Alta" ? 0.93 : priority === "Média" ? 0.6 : 0.3 }} transition={{ duration: reduced ? 0 : 1.2 }} /></svg><div><strong className="text-2xl font-bold">{priority}</strong><span className="mt-1 block text-xs text-ice/65">{QUIZ.priority}</span></div></div><p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ice/80">{QUIZ.results[priority]}</p><Button variant="whatsapp" onClick={() => openWhatsApp("quiz", diagnosisMessage({ items, period, signs, neighborhood }))} className="mt-7 h-auto min-h-12 w-full whitespace-normal px-4 py-3 text-sm font-bold shadow-none sm:text-base"><WhatsAppIcon />{QUIZ.cta}</Button><Button variant="ghost" onClick={reset} className="mt-4 text-ice/60 hover:bg-ice/5 hover:text-ice"><RotateCcw />{QUIZ.restart}</Button></div>}
      </motion.div></AnimatePresence></div>
    </div><p className="mx-auto mt-5 max-w-xl text-center text-xs leading-relaxed text-ice/55">{QUIZ.microproof}</p>
  </div></section>;
}