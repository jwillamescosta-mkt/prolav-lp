import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PERSONAS, PROBLEM } from "@/data/content";
import { openWhatsApp } from "@/lib/tracking";
import { personaMedia } from "./ProblemMedia";
import { ViewportVideo } from "./ViewportVideo";
import { AnimatedTitle } from "./AnimatedTitle";

export function Personas() {
  const reduced = useReducedMotion();
  return <section className="border-t border-ice/10 py-20 lg:py-24" aria-labelledby="personas-heading"><div className="mx-auto max-w-6xl px-5">
    <p id="personas-heading" className="section-kicker">{PROBLEM.personasKicker}</p><AnimatedTitle text={PROBLEM.personasTitle} className="mt-4 max-w-3xl text-3xl leading-tight sm:text-4xl" />
    <div className="persona-grid mt-10">{PERSONAS.map((persona, i) => <motion.article key={persona.key} className="persona-card" initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: reduced ? 0 : i * 0.07 }} onPointerMove={(event) => {
      if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(min-width: 768px)").matches) return;
      const box = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--tilt-x", `${(0.5 - (event.clientY - box.top) / box.height) * 4}deg`);
      event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - box.left) / box.width - 0.5) * 4}deg`);
    }} onPointerLeave={(event) => { event.currentTarget.style.setProperty("--tilt-x", "0deg"); event.currentTarget.style.setProperty("--tilt-y", "0deg"); }}>
      <div className="relative aspect-[9/16] overflow-hidden"><ViewportVideo {...personaMedia[persona.key]} label={persona.title} className="h-full w-full object-cover" /><span className="persona-number font-mono">0{i + 1}</span></div>
      <div className="flex flex-1 flex-col p-5"><h3 className="text-lg font-bold">{persona.title}</h3><p className="mt-3 flex-1 text-sm leading-relaxed text-ice/70">{persona.text}</p><Button variant="ghost" className="mt-6 h-auto justify-start whitespace-normal p-0 text-sm font-semibold text-cyan-soft hover:bg-transparent hover:text-ice" onClick={() => openWhatsApp(`persona_${persona.key}`, persona.message)}>{PROBLEM.personaLink}<ArrowRight /></Button></div>
    </motion.article>)}</div>
  </div></section>;
}