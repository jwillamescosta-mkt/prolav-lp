// Header fixo translúcido.
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { openWhatsApp } from "@/lib/tracking";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-navy/60 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#topo" aria-label="PROLAV – início" className="text-ice">
          <Logo />
        </a>
        <button onClick={() => openWhatsApp("header")} className="btn-whatsapp h-10 px-4 text-sm">
          <WhatsAppIcon className="h-4 w-4" />
          Orçar no WhatsApp
        </button>
      </div>
    </header>
  );
}
