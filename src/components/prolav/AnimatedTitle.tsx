import { motion, useReducedMotion } from "framer-motion";

export function AnimatedTitle({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.h2 className={`font-display font-bold ${className}`} aria-label={text} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
    {text.split(" ").map((word, index) => <motion.span key={`${index}-${word}`} aria-hidden="true" className="inline-block" variants={{ hidden: reduced ? {} : { opacity: 0, filter: "blur(5px)", y: 8 }, visible: { opacity: 1, filter: "blur(0px)", y: 0 } }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.025 }}>{word}<span className="whitespace-pre"> </span></motion.span>)}
  </motion.h2>;
}