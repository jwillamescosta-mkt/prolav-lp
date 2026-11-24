import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildWhatsAppUrl, captureUtms, getLeadCode, openWhatsApp } from "./tracking";

describe("WhatsApp com diagnóstico e origem", () => {
  beforeEach(() => { sessionStorage.clear(); window.dataLayer = []; });
  it("preserva a mensagem específica e adiciona código do lead, origem e UTMs", () => {
    window.history.replaceState({}, "", "/?utm_source=teste&utm_campaign=sofa");
    captureUtms();
    const code = getLeadCode();
    const url = new URL(buildWhatsAppUrl("Olá! Meu estofado tem manchas e quero um orçamento."));
    expect(url.searchParams.get("text")).toBe(
      `Olá! Meu estofado tem manchas e quero um orçamento.\n\n[ref: ${code} | origem=teste | utm_source=teste | utm_campaign=sofa]`,
    );
  });
  it("dispara Contact e Lead apenas no clique de orçamento", () => {
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    expect(window.dataLayer).toEqual([]);
    openWhatsApp("quiz", "Diagnóstico revisado");
    const code = getLeadCode();
    expect(window.dataLayer).toEqual([
      { event: "Contact", origin: "quiz" },
      { event: "Lead", origin: "quiz", content_name: "quiz", lead_code: code, lead_source: "direto" },
    ]);
    expect(new URL(String(open.mock.calls[0]?.[0])).searchParams.get("text")).toContain("Diagnóstico revisado\n\n[ref: " + code);
    open.mockRestore();
  });
  it("dispara fbq Lead com origem, código e qualidade, mais Contact", () => {
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    const fbq = vi.fn();
    window.fbq = fbq;
    openWhatsApp("persona-pet", "Olá! Tenho pet.");
    const code = getLeadCode();
    expect(fbq).toHaveBeenNthCalledWith(1, "track", "Lead", { content_name: "persona-pet", lead_code: code, lead_source: "direto" }, { eventID: code });
    expect(fbq).toHaveBeenNthCalledWith(2, "track", "Contact");
    expect(fbq).toHaveBeenCalledTimes(2);
    delete window.fbq;
    open.mockRestore();
  });
  it("só dispara LeadQualificado para lead hot ou warm", () => {
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    const fbq = vi.fn();
    window.fbq = fbq;
    openWhatsApp("lp-hero", "Olá", { quality: "cold" });
    expect(fbq.mock.calls.some((c) => c[1] === "LeadQualificado")).toBe(false);
    openWhatsApp("lp-hero", "Olá", { quality: "hot", area: "Maceió", when: "Esta semana", items: ["Sofá"] });
    expect(fbq.mock.calls.some((c) => c[0] === "trackCustom" && c[1] === "LeadQualificado")).toBe(true);
    delete window.fbq;
    open.mockRestore();
  });
});
