// Header enxuto da landing /orcamento: só a marca e um botão de orçamento.
// Sem menu — em página de anúncio, cada link extra é uma saída a menos para o WhatsApp.
import { useEffect, useState } from "react";
import { Logo } from "@/components/prolav/Logo";
import { WhatsAppIcon } from "@/components/prolav/WhatsAppIcon";
import { openWhatsApp } from "@/lib/tracking";
import { LP_HERO } from "@/data/lp";

export function LpHeader() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid ? "border-b border-ice/10 bg-navy-deep" : "bg-transparent"}`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#topo" aria-label="PROLAV – início" className="text-ice">
          <Logo />
        </a>
        <button
          onClick={() => openWhatsApp("lp-header", LP_HERO.ctaMessage)}
          className="btn-whatsapp h-10 px-4 text-sm"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Orçamento
        </button>
      </div>
    </header>
  );
}
