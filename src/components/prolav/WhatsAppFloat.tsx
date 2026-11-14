// Botão flutuante de WhatsApp (montado no layout raiz → todas as páginas).
// Some enquanto algum botão marcado com data-hide-wa-float estiver na tela (ex.: o CTA da hero
// da landing /orcamento), para não haver dois botões verdes iguais disputando o mesmo clique.
// Páginas sem essa marca continuam com o botão sempre visível.
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { captureUtms, openWhatsApp } from "@/lib/tracking";
import { WhatsAppIcon } from "./WhatsAppIcon";

export function WhatsAppFloat() {
  const [hidden, setHidden] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => captureUtms(), []);

  useEffect(() => {
    setHidden(false);
    const targets = document.querySelectorAll("[data-hide-wa-float]");
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setHidden(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <button
      onClick={() => openWhatsApp("float")}
      // Nome acessível contém o texto visível (WCAG 2.5.3)
      aria-label="Orçamento grátis pelo WhatsApp"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={`btn-whatsapp fixed bottom-4 right-4 z-50 h-14 !rounded-full px-5 text-sm shadow-[var(--shadow-wa)] transition-[opacity,transform] duration-300 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppIcon className="h-6 w-6" />
      {/* Rótulo visível: botão só com ícone converte menos */}
      <span aria-hidden="true">Orçamento grátis</span>
    </button>
  );
}
