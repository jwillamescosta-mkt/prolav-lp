// Header fixo: começa transparente sobre o hero e ganha fundo sólido ao rolar.
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { openWhatsApp } from "@/lib/tracking";

const NAV = [
  { href: "#problema", label: "O problema" },
  { href: "#tecnologia", label: "Método" },
  { href: "#resultados", label: "Resultados" },
  { href: "#duvidas", label: "Dúvidas" },
];

export function Header() {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${solid ? "border-b border-ice/10 bg-navy-deep" : "bg-transparent"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#topo" aria-label="PROLAV – início" className="text-ice">
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Seções">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-ice/70 transition-colors hover:text-ice">
              {n.label}
            </a>
          ))}
        </nav>
        <button onClick={() => openWhatsApp("header")} className="btn-whatsapp h-10 px-4 text-sm">
          <WhatsAppIcon className="h-4 w-4" />
          <span className="hidden sm:inline">Orçar no WhatsApp</span>
          <span className="sm:hidden">Orçar</span>
        </button>
      </div>
    </header>
  );
}
