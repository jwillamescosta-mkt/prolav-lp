// Botão flutuante de WhatsApp (montado no layout raiz → todas as páginas).
import { useEffect } from "react";
import { captureUtms, openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  useEffect(() => captureUtms(), []);
  return (
    <button
      onClick={() => openWhatsApp("float")}
      aria-label="Falar com a PROLAV no WhatsApp"
      className="btn-whatsapp fixed bottom-4 right-4 z-50 h-14 !rounded-full px-5 text-sm shadow-[var(--shadow-wa)]"
    >
      <WhatsAppIcon className="h-6 w-6" />
      {/* Rótulo visível: botão só com ícone converte menos */}
      <span aria-hidden="true">Orçamento grátis</span>
    </button>
  );
}
