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
      className="btn-whatsapp fixed bottom-5 right-5 z-50 h-14 w-14 !rounded-full shadow-[var(--shadow-wa)]"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </button>
  );
}
