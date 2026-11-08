import { describe, expect, it } from "vitest";
import { pickPlaying, playbackBudget } from "./playback";

const c = (id: number, ratio: number, distance = 0, userPaused = false) => ({ id, ratio, distance, userPaused });

describe("coordenador de vídeos", () => {
  it("toca só os mais visíveis, até o limite", () => {
    expect([...pickPlaying([c(1, 0.5), c(2, 1), c(3, 0.9), c(4, 0.2)], 2)].sort()).toEqual([2, 3]);
  });
  it("em visibilidade parecida, prefere o mais central", () => {
    expect([...pickPlaying([c(1, 1, 300), c(2, 0.95, 20)], 1)]).toEqual([2]);
  });
  it("respeita a pausa manual e a visibilidade mínima", () => {
    expect(pickPlaying([c(1, 1, 0, true), c(2, 0.3)], 3).size).toBe(0);
  });
  it("define o orçamento por aparelho e conexão", () => {
    expect(playbackBudget({ width: 375, reducedMotion: false })).toBe(1);
    expect(playbackBudget({ width: 1440, reducedMotion: false })).toBe(3);
    expect(playbackBudget({ width: 1440, reducedMotion: false, cores: 4 })).toBe(2);
    expect(playbackBudget({ width: 1440, reducedMotion: true })).toBe(0);
    expect(playbackBudget({ width: 1440, reducedMotion: false, connection: { saveData: true } })).toBe(0);
    expect(playbackBudget({ width: 1440, reducedMotion: false, connection: { effectiveType: "3g" } })).toBe(0);
  });
});
