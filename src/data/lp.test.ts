// Protege os pares de antes e depois contra troca de fotos entre móveis.
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { BEFORE_AFTER, LP_VIDEOS } from "./lp";

const media = (file: string, w: number) =>
  resolve(__dirname, "../../public/media/antes-depois", `${file}-${w}.webp`);

describe("BEFORE_AFTER", () => {
  it("has unique cases and unique original photos", () => {
    const keys = BEFORE_AFTER.map((c) => c.key);
    expect(new Set(keys).size).toBe(keys.length);
    const sources = BEFORE_AFTER.flatMap((c) => c.stages.map((s) => s.source));
    expect(new Set(sources).size).toBe(sources.length);
  });

  it.each(BEFORE_AFTER)("$key: starts at Antes, ends at Depois, in order", (c) => {
    const labels = c.stages.map((s) => s.label);
    expect(labels.at(0)).toBe("Antes");
    expect(labels.at(-1)).toBe("Depois");
    expect(labels).toEqual(
      ["Antes", "Durante", "Depois"].filter((l) => labels.includes(l as never)),
    );
  });

  it.each(BEFORE_AFTER)("$key: every photo belongs to this piece and exists in both sizes", (c) => {
    for (const s of c.stages) {
      expect(s.file).toBe(`${c.key}-${s.label.toLowerCase()}`);
      expect(existsSync(media(s.file, 480))).toBe(true);
      expect(existsSync(media(s.file, 720))).toBe(true);
      expect(existsSync(media(s.file, 1200))).toBe(true);
      expect(s.alt.length).toBeGreaterThan(20);
    }
  });
});

describe("LP_VIDEOS", () => {
  it.each(LP_VIDEOS.items)("$key: video and poster exist and stay light (≤ 1.5 MB)", (v) => {
    const file = (p: string) => resolve(__dirname, "../../public", p.replace(/^\//, ""));
    expect(existsSync(file(v.src))).toBe(true);
    expect(existsSync(file(v.poster))).toBe(true);
    expect(statSync(file(v.src)).size).toBeLessThanOrEqual(1.5 * 1024 * 1024);
  });
});
