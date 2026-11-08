import { describe, expect, it } from "vitest";
import { calculatePriority, diagnosisMessage, toggleSign } from "./diagnosis";

describe("Regras de diagnóstico PROLAV", () => {
  it.each(["Mais de 1 ano", "Nunca fiz"])("%s com qualquer sinal real tem Alta prioridade", (period) => {
    for (const sign of ["Manchas", "Odor/cheiro de mofo", "Pets em casa", "Crianças ou alérgicos"]) {
      expect(calculatePriority(period, [sign])).toBe("Alta");
    }
  });
  it("não considera Nenhum um sinal", () => {
    expect(calculatePriority("Nunca fiz", ["Nenhum"])).toBe("Média");
    expect(calculatePriority("Menos de 6 meses", ["Nenhum"])).toBe("Baixa");
  });
  it("considera intervalo de seis a doze meses ou sinais recentes prioridade Média", () => {
    expect(calculatePriority("6 a 12 meses", ["Nenhum"])).toBe("Média");
    expect(calculatePriority("Menos de 6 meses", ["Manchas"])).toBe("Média");
  });
  it("Nenhum é exclusivo e sinais podem ser desmarcados", () => {
    expect(toggleSign(["Manchas"], "Nenhum")).toEqual(["Nenhum"]);
    expect(toggleSign(["Nenhum"], "Pets em casa")).toEqual(["Pets em casa"]);
    expect(toggleSign(["Manchas", "Pets em casa"], "Manchas")).toEqual(["Pets em casa"]);
  });
  it("inclui todos os itens e aceita bairro opcional", () => {
    const message = diagnosisMessage({ items: ["Sofá", "Colchão"], period: "Nunca fiz", signs: ["Pets em casa"], neighborhood: "" });
    expect(message).toContain("Itens: Sofá, Colchão");
    expect(message).toContain("Última higienização: Nunca fiz");
    expect(message).toContain("Sinais: Pets em casa");
    expect(message).toContain("Bairro: Não informado");
  });
});