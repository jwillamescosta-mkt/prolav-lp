export type Priority = "Baixa" | "Média" | "Alta";
export type Diagnosis = { items: string[]; period: string; signs: string[]; neighborhood: string };

// "Nenhum" não é um sinal; limpeza antiga sem sinais fica na faixa intermediária.
export function calculatePriority(period: string, signs: string[]): Priority {
  const old = period === "Mais de 1 ano" || period === "Nunca fiz";
  const hasSigns = signs.some((sign) => sign !== "Nenhum");
  if (old && hasSigns) return "Alta";
  if (old || hasSigns || period === "6 a 12 meses") return "Média";
  return "Baixa";
}

export function toggleSign(current: string[], sign: string) {
  if (sign === "Nenhum") return current.includes(sign) ? [] : [sign];
  const filtered = current.filter((value) => value !== "Nenhum");
  return filtered.includes(sign) ? filtered.filter((value) => value !== sign) : [...filtered, sign];
}

export function diagnosisMessage(data: Diagnosis) {
  return `Olá, PROLAV! Fiz o diagnóstico no site: Itens: ${data.items.join(", ")} | Última higienização: ${data.period} | Sinais: ${data.signs.join(", ")} | Bairro: ${data.neighborhood.trim() || "Não informado"} Gostaria de um orçamento.`;
}