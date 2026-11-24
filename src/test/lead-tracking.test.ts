import { beforeEach, describe, expect, it } from "vitest";
import { buildWhatsAppUrl, detectSource, getLeadCode } from "@/lib/tracking";
import { composeQualifiedMessage, scoreLead, startLead, QUALIFY_EVENT } from "@/lib/qualification";

describe("detectSource", () => {
  it("prioriza UTM, depois cliques de anúncio, depois o site de origem", () => {
    expect(detectSource({ utm_source: "meta", utm_medium: "paid" }, "", "x.com")).toBe("meta/paid");
    expect(detectSource({ gclid: "abc" }, "", "x.com")).toBe("google/ads");
    expect(detectSource({ fbclid: "abc" }, "", "x.com")).toBe("meta/ads");
    expect(detectSource({}, "https://www.google.com.br/", "x.com")).toBe("google/organico");
    expect(detectSource({}, "https://l.instagram.com/?u=1", "x.com")).toBe("meta/organico");
    expect(detectSource({}, "https://blog.exemplo.com/post", "x.com")).toBe("site/blog.exemplo.com");
    expect(detectSource({}, "", "x.com")).toBe("direto");
  });
});

describe("código do lead e link do WhatsApp", () => {
  beforeEach(() => sessionStorage.clear());

  it("gera um código curto estável na sessão e o coloca na mensagem", () => {
    const code = getLeadCode();
    expect(code).toMatch(/^PRL-[A-Z0-9]{4}$/);
    expect(getLeadCode()).toBe(code);
    const text = decodeURIComponent(buildWhatsAppUrl("Olá!").split("text=")[1] ?? "");
    expect(text).toContain(`[ref: ${code} | origem=`);
  });

  it("anexa as UTMs guardadas", () => {
    sessionStorage.setItem("prolav_utms", JSON.stringify({ utm_campaign: "teste" }));
    const text = decodeURIComponent(buildWhatsAppUrl("Olá!").split("text=")[1] ?? "");
    expect(text).toContain("utm_campaign=teste");
  });
});

describe("qualificação", () => {
  it("classifica hot, warm e cold", () => {
    const base = { items: ["Sofá"], area: "Maceió" };
    expect(scoreLead({ ...base, when: "Esta semana" })).toBe("hot");
    expect(scoreLead({ ...base, when: "Próximos 15 dias" })).toBe("warm");
    expect(scoreLead({ ...base, when: "Só pesquisando preço" })).toBe("cold");
    expect(scoreLead({ items: [], area: "Maceió", when: "Esta semana" })).toBe("cold");
  });

  it("compõe a mensagem com o pedido resumido", () => {
    const msg = composeQualifiedMessage("Olá, PROLAV!", { items: ["Sofá", "Colchão"], area: "Maceió", when: "Esta semana" });
    expect(msg).toContain("Sofá, Colchão");
    expect(msg).toContain("Local: Maceió");
    expect(msg).toContain("Prazo: Esta semana");
  });

  it("sem o modal na página, o clique cai direto no WhatsApp", () => {
    const calls: string[] = [];
    startLead("float", "Olá", (o) => calls.push(o));
    expect(calls).toEqual(["float"]);
  });

  it("com o modal na página, o clique é entregue a ele", () => {
    const calls: string[] = [];
    const on = (e: Event) => ((e as CustomEvent).detail.handled = true);
    window.addEventListener(QUALIFY_EVENT, on);
    startLead("lp-hero", "Olá", (o) => calls.push(o));
    window.removeEventListener(QUALIFY_EVENT, on);
    expect(calls).toEqual([]);
  });
});
