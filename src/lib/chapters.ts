// Regras puras da linha do tempo "antes → durante → depois" (sem DOM, fáceis de testar).

export type Chapter = { label: string; at: number };

/** Índice do capítulo ativo para um instante do vídeo. */
export function chapterAt(time: number, chapters: readonly Chapter[]): number {
  let idx = 0;
  chapters.forEach((c, i) => {
    if (time >= c.at) idx = i;
  });
  return idx;
}

/** Converte tempo em posição do controle (0–1000, inteiro para o input range). */
export function timeToStep(time: number, duration: number): number {
  if (!duration || duration <= 0) return 0;
  return Math.round(Math.min(1, Math.max(0, time / duration)) * 1000);
}

/** Converte a posição do controle (0–1000) em tempo do vídeo. */
export function stepToTime(step: number, duration: number): number {
  if (!duration || duration <= 0) return 0;
  return (Math.min(1000, Math.max(0, step)) / 1000) * duration;
}

/** Texto lido pelo leitor de tela: "Durante — 4 de 11 segundos". */
export function valueText(time: number, duration: number, chapters: readonly Chapter[]): string {
  const label = chapters[chapterAt(time, chapters)]?.label ?? "";
  return `${label} — ${Math.round(time)} de ${Math.round(duration)} segundos`;
}
