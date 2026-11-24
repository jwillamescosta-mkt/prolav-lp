// Pergunta rápida (3 toques) antes de abrir o WhatsApp na landing /orcamento.
// Quem não quer responder pula e vai direto: o clique nunca é perdido.
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { WhatsAppIcon } from "@/components/prolav/WhatsAppIcon";
import { openWhatsApp } from "@/lib/tracking";
import {
  AREA_OPTIONS,
  ITEM_OPTIONS,
  QUALIFY_EVENT,
  WHEN_OPTIONS,
  composeQualifiedMessage,
  scoreLead,
  type QualifyDetail,
} from "@/lib/qualification";

const chip =
  "min-h-11 rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green";
const chipOff = "border-ice/25 bg-transparent text-ice/85 hover:border-ice/50";
const chipOn = "border-brand-green bg-brand-green/15 font-semibold text-ice";

export function LeadQualifier() {
  const [pending, setPending] = useState<QualifyDetail | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [area, setArea] = useState("");
  const [when, setWhen] = useState("");

  useEffect(() => {
    const onQualify = (e: Event) => {
      const detail = (e as CustomEvent<QualifyDetail>).detail;
      detail.handled = true;
      setPending(detail);
    };
    window.addEventListener(QUALIFY_EVENT, onQualify);
    return () => window.removeEventListener(QUALIFY_EVENT, onQualify);
  }, []);

  const close = () => setPending(null);

  const skip = () => {
    if (pending) openWhatsApp(pending.origin, pending.message);
    close();
  };

  const send = () => {
    if (!pending) return;
    const q = { items, area, when };
    openWhatsApp(pending.origin, composeQualifiedMessage(pending.message, q), {
      quality: scoreLead(q),
      items,
      area,
      when,
    });
    close();
  };

  const toggleItem = (item: string) =>
    setItems((cur) => (cur.includes(item) ? cur.filter((i) => i !== item) : [...cur, item]));

  return (
    <Dialog open={pending !== null} onOpenChange={(open) => !open && skip()}>
      <DialogContent className="max-h-[92svh] overflow-y-auto border-ice/15 bg-navy-deep text-ice sm:max-w-md">
        <DialogTitle className="text-xl font-semibold">Para o orçamento sair certo</DialogTitle>
        <DialogDescription className="text-sm text-ice/75">
          Três toques e sua mensagem já vai pronta para o WhatsApp.
        </DialogDescription>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">O que você quer higienizar?</legend>
          <div className="flex flex-wrap gap-2">
            {ITEM_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={items.includes(o)}
                onClick={() => toggleItem(o)}
                className={`${chip} ${items.includes(o) ? chipOn : chipOff}`}
              >
                {o}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">Onde fica?</legend>
          <div className="flex flex-wrap gap-2">
            {AREA_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={area === o}
                onClick={() => setArea(o)}
                className={`${chip} ${area === o ? chipOn : chipOff}`}
              >
                {o}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-sm font-semibold">Para quando?</legend>
          <div className="flex flex-wrap gap-2">
            {WHEN_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                aria-pressed={when === o}
                onClick={() => setWhen(o)}
                className={`${chip} ${when === o ? chipOn : chipOff}`}
              >
                {o}
              </button>
            ))}
          </div>
        </fieldset>

        <button type="button" onClick={send} className="btn-whatsapp min-h-14 w-full px-6 text-base">
          <WhatsAppIcon className="h-5 w-5 shrink-0" />
          Enviar pedido no WhatsApp
        </button>
        <button
          type="button"
          onClick={skip}
          className="min-h-11 text-sm text-ice/75 underline underline-offset-4 hover:text-ice"
        >
          Pular e falar agora
        </button>
      </DialogContent>
    </Dialog>
  );
}
