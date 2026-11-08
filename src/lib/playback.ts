// Regras puras do coordenador de vídeos (sem DOM, testáveis).
// Ideia: decodificar vídeo custa CPU/GPU. Só os vídeos mais visíveis tocam;
// o resto mostra o pôster/último quadro. Assim a rolagem e os vídeos ficam fluidos.

export type Candidate = {
  id: number;
  /** Fração visível do vídeo (0–1). */
  ratio: number;
  /** Distância do centro do vídeo ao centro da tela, em px. */
  distance: number;
  /** Pausado pela pessoa (botão) — nunca volta a tocar sozinho. */
  userPaused: boolean;
};

/** Visibilidade mínima para um vídeo poder tocar. */
export const MIN_RATIO = 0.35;

/** Escolhe quais vídeos tocam: mais visíveis primeiro, depois os mais centrais. */
export function pickPlaying(candidates: readonly Candidate[], max: number): Set<number> {
  const eligible = candidates
    .filter((c) => !c.userPaused && c.ratio >= MIN_RATIO)
    .sort((a, b) => (Math.abs(b.ratio - a.ratio) > 0.1 ? b.ratio - a.ratio : a.distance - b.distance));
  return new Set(eligible.slice(0, Math.max(0, max)).map((c) => c.id));
}

type ConnectionLike = { saveData?: boolean; effectiveType?: string };

/** Quantos vídeos podem tocar juntos neste aparelho. 0 = não tocar sozinho (economia de dados). */
export function playbackBudget(opts: { width: number; reducedMotion: boolean; connection?: ConnectionLike | undefined; cores?: number | undefined }): number {
  if (opts.reducedMotion) return 0;
  const c = opts.connection;
  if (c?.saveData || (c?.effectiveType && ["slow-2g", "2g", "3g"].includes(c.effectiveType))) return 0;
  const weak = (opts.cores ?? 8) <= 4;
  if (opts.width < 768) return 1;
  return weak ? 2 : 3;
}
