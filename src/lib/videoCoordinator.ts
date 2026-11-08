// Coordenador único de vídeos da página (roda só no navegador).
// 1) Pré-carrega o vídeo quando ele está a até 1 tela de distância (chega com buffer pronto).
// 2) Deixa tocar só os N vídeos mais visíveis (N depende do aparelho e da conexão).
// 3) Pausa tudo quando a aba fica oculta. Respeita pausa manual e "tocar uma vez".
import { pickPlaying, playbackBudget, type Candidate } from "./playback";

type Entry = {
  id: number;
  el: HTMLVideoElement;
  ratio: number;
  userPaused: boolean;
  /** Play manual: tem prioridade sobre o orçamento enquanto estiver na tela. */
  pinned: boolean;
  /** false = o componente pediu para não tocar (ex.: passo inativo). */
  enabled: boolean;
  once: boolean;
  done: boolean;
  onNear: () => void;
  near: boolean;
};

let seq = 0;
const entries = new Map<HTMLVideoElement, Entry>();
let visibleIO: IntersectionObserver | null = null;
let nearIO: IntersectionObserver | null = null;
let raf = 0;
let budget = 0;

function computeBudget() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } };
  budget = playbackBudget({
    width: window.innerWidth,
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    connection: nav.connection,
    cores: navigator.hardwareConcurrency,
  });
}

function schedule() {
  if (raf) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    if (document.hidden) { entries.forEach((e) => e.el.pause()); return; }
    const mid = window.innerHeight / 2;
    const candidates: Candidate[] = [];
    const pinned = new Set<number>();
    entries.forEach((e) => {
      if (e.ratio <= 0 || !e.enabled) { e.pinned = false; return; }
      if (e.pinned) { pinned.add(e.id); return; }
      const r = e.el.getBoundingClientRect();
      candidates.push({ id: e.id, ratio: e.ratio, distance: Math.abs(r.top + r.height / 2 - mid), userPaused: e.userPaused || (e.once && e.done) });
    });
    const allowed = pickPlaying(candidates, Math.max(0, budget - pinned.size));
    pinned.forEach((id) => allowed.add(id));
    entries.forEach((e) => {
      if (allowed.has(e.id)) {
        if (e.el.paused && e.el.getAttribute("src")) void e.el.play().catch(() => {});
      } else if (!e.el.paused) {
        e.el.pause();
      }
    });
  });
}

function ensureObservers() {
  if (visibleIO) return;
  computeBudget();
  visibleIO = new IntersectionObserver((list) => {
    list.forEach((it) => { const e = entries.get(it.target as HTMLVideoElement); if (e) e.ratio = it.isIntersecting ? it.intersectionRatio : 0; });
    schedule();
  }, { threshold: [0, 0.2, 0.35, 0.5, 0.75, 1] });
  nearIO = new IntersectionObserver((list) => {
    list.forEach((it) => {
      const e = entries.get(it.target as HTMLVideoElement);
      if (e && it.isIntersecting && !e.near) { e.near = true; e.onNear(); nearIO?.unobserve(e.el); }
    });
  }, { rootMargin: "100% 0px 100% 0px" });
  document.addEventListener("visibilitychange", schedule);
  window.addEventListener("resize", () => { computeBudget(); schedule(); }, { passive: true });
  window.addEventListener("scroll", schedule, { passive: true });
  window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", () => { computeBudget(); schedule(); });
}

export type VideoHandle = {
  /** Botão da pessoa: true = pausar (não volta sozinho); false = tocar agora (prioridade). */
  setUserPaused: (paused: boolean) => void;
  setEnabled: (on: boolean) => void;
  /** Avisar que o src foi anexado (permite tocar). */
  refresh: () => void;
  unregister: () => void;
};

export function registerVideo(el: HTMLVideoElement, opts: { onNear: () => void; once?: boolean }): VideoHandle {
  ensureObservers();
  const entry: Entry = { id: ++seq, el, ratio: 0, userPaused: false, pinned: false, enabled: true, once: Boolean(opts.once), done: false, onNear: opts.onNear, near: false };
  entries.set(el, entry);
  const onEnded = () => { entry.done = true; schedule(); };
  el.addEventListener("ended", onEnded);
  el.addEventListener("loadeddata", schedule);
  visibleIO!.observe(el);
  nearIO!.observe(el);
  return {
    setUserPaused: (p) => {
      entry.userPaused = p;
      entry.pinned = !p;
      if (p) el.pause();
      else { entry.done = false; if (el.getAttribute("src")) void el.play().catch(() => {}); }
      schedule();
    },
    refresh: schedule,
    setEnabled: (on) => { entry.enabled = on; if (!on) el.pause(); schedule(); },
    unregister: () => {
      el.removeEventListener("ended", onEnded);
      el.removeEventListener("loadeddata", schedule);
      visibleIO?.unobserve(el); nearIO?.unobserve(el);
      entries.delete(el);
      el.pause();
    },
  };
}

/** Orçamento atual (0 = sem reprodução automática). */
export function currentBudget() { return budget; }
