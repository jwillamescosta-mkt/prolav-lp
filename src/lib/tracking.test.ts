import { beforeEach, describe, expect, it, vi } from "vitest";
import { buildWhatsAppUrl, captureUtms, openWhatsApp } from "./tracking";

describe("WhatsApp com diagnóstico e origem", () => {
  beforeEach(() => { sessionStorage.clear(); window.dataLayer = []; });
  it("preserva a mensagem específica e adiciona UTMs", () => {
    window.history.replaceState({}, "", "/?utm_source=teste&utm_campaign=sofa");
    captureUtms();
    const url = new URL(buildWhatsAppUrl("Olá! Meu estofado tem manchas e quero um orçamento."));
    expect(url.searchParams.get("text")).toBe("Olá! Meu estofado tem manchas e quero um orçamento.\n\n[ref: utm_source=teste | utm_campaign=sofa]");
  });
  it("dispara Contact e Lead apenas no clique de orçamento", () => {
    const open = vi.spyOn(window, "open").mockReturnValue({} as Window);
    expect(window.dataLayer).toEqual([]);
    openWhatsApp("quiz", "Diagnóstico revisado");
    expect(window.dataLayer).toEqual([{ event: "Contact", origin: "quiz" }, { event: "Lead", origin: "quiz" }]);
    expect(new URL(String(open.mock.calls[0]?.[0])).searchParams.get("text")).toBe("Diagnóstico revisado");
    open.mockRestore();
  });
});