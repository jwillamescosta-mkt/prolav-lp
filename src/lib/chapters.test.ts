import { describe, expect, it } from "vitest";
import { chapterAt, stepToTime, timeToStep, valueText } from "./chapters";

const ch = [{ label: "Antes", at: 0 }, { label: "Durante", at: 4 }, { label: "Depois", at: 7 }];

describe("linha do tempo antes/durante/depois", () => {
  it("encontra o capítulo ativo", () => {
    expect(chapterAt(0, ch)).toBe(0);
    expect(chapterAt(3.99, ch)).toBe(0);
    expect(chapterAt(4, ch)).toBe(1);
    expect(chapterAt(10, ch)).toBe(2);
  });
  it("converte tempo ↔ posição com limites", () => {
    expect(timeToStep(5.5, 11)).toBe(500);
    expect(timeToStep(20, 11)).toBe(1000);
    expect(timeToStep(3, 0)).toBe(0);
    expect(stepToTime(500, 11)).toBe(5.5);
    expect(stepToTime(-10, 11)).toBe(0);
  });
  it("gera texto acessível", () => {
    expect(valueText(7.2, 11, ch)).toBe("Depois — 7 de 11 segundos");
  });
});
