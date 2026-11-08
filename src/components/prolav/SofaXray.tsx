import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { PROBLEM } from "@/data/content";
import { proofMedia } from "./ProblemMedia";
import { ViewportVideo } from "./ViewportVideo";
import { AnimatedTitle } from "./AnimatedTitle";

const Scene = lazy(() => import("./SofaXrayScene"));

function LazyScene({ progress, stage, lite = false }: { progress?: MotionValue<number>; stage?: number; lite?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), { rootMargin: "100px" });
    observer.observe(node); return () => observer.disconnect();
  }, [reduced]);
  return <div ref={ref} className={`absolute inset-0 ${stage === 1 ? "xray-inside" : "xray-fabric"}`} aria-hidden="true">
    {!reduced && visible && <Suspense fallback={null}><Scene progress={progress} stage={stage} lite={lite} /></Suspense>}
    {reduced && stage === 1 && <div className="xray-static-labels">{PROBLEM.contaminants.map((label) => <span className="xray-label" key={label}>{label}</span>)}</div>}
  </div>;
}

function Proof({ active = true }: { active?: boolean }) {
  return <figure className="xray-proof"><ViewportVideo {...proofMedia} label={PROBLEM.stages[2]?.title ?? PROBLEM.proofBadge} active={active} className="h-full w-full object-cover" /><figcaption className="proof-caption"><ShieldCheck className="h-3.5 w-3.5" />{PROBLEM.proofBadge}</figcaption></figure>;
}

function StageText({ index }: { index: number }) {
  const stage = PROBLEM.stages[index];
  if (!stage) return null;
  return <div className="xray-copy"><p className="section-kicker">{PROBLEM.kicker}</p><AnimatedTitle text={stage.title} className="mt-5 text-3xl leading-tight sm:text-4xl lg:text-5xl" /><p className="mt-6 max-w-xl text-base leading-relaxed text-ice/75 sm:text-lg">{stage.text}</p></div>;
}

function DesktopXray() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [stage, setStage] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => scrollYProgress.on("change", (p) => setStage(Math.min(2, Math.floor(p * 3)))), [scrollYProgress]);
  return <div ref={ref} className="xray-scroll hidden md:block"><div className="xray-pin">
    <div className={`absolute inset-0 transition-opacity duration-700 ${stage === 2 ? "opacity-10" : "opacity-100"}`}><LazyScene progress={scrollYProgress} stage={stage} /></div>
    <div className={`xray-veil absolute inset-0 ${stage === 0 ? "xray-surface-veil" : ""}`} />
    <div className="relative mx-auto flex h-full w-full max-w-7xl items-center px-8 pr-28">
      <motion.div key={stage} className={`relative z-10 ${stage === 2 ? "w-[55%]" : "max-w-[57%]"}`} initial={reduced ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.25 }}><StageText index={stage} /></motion.div>
      <div className={`absolute right-28 top-1/2 -translate-y-1/2 transition-opacity duration-500 ${stage === 2 ? "opacity-100" : "pointer-events-none invisible opacity-0"}`}><Proof active={stage === 2} /></div>
    </div>
    <nav className="xray-progress" aria-label="Progresso do raio-X"><div className="xray-progress-track"><motion.div className="h-full origin-top bg-brand-green" style={{ scaleY: fill }} /></div>{PROBLEM.stages.map((s, i) => <div key={s.label} className={`xray-marker ${i === stage ? "text-cyan-soft" : "text-ice/70"}`} aria-current={stage === i ? "step" : undefined}><span className={i <= stage ? "bg-brand-green" : "bg-ice/30"} /><span>{s.label}</span></div>)}</nav>
  </div></div>;
}

export function SofaXray() {
  return <><DesktopXray /><div className="md:hidden">{PROBLEM.stages.map((stage, i) => <div key={stage.label} className={`xray-mobile relative isolate overflow-hidden ${i === 2 ? "bg-slate-deep" : ""}`}>
    {i < 2 && <><LazyScene stage={i} lite /><div className="xray-veil absolute inset-0" /></>}
    <motion.div className="relative z-10 mx-auto w-full max-w-xl px-5 py-16" initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><p className="mb-8 font-mono text-xs text-cyan-soft">0{i + 1} / 03 — {stage.label}</p><StageText index={i} />{i === 2 && <div className="mt-8 flex justify-center"><Proof /></div>}</motion.div>
  </div>)}</div></>;
}