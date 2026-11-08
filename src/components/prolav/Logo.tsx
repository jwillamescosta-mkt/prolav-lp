// Logo oficial PROLAV (versão negativa, para fundos escuros).
// Regras: área de respiro = altura da letra L (~35% da altura), largura mínima 120px,
// sem distorção, sombra ou contorno.
import logoNegativo from "@/assets/prolav-horizontal-negativo.svg";

export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <span className="inline-block p-[0.35em]">
      <img
        src={logoNegativo}
        alt="PROLAV – Higienização & Blindagem de Estofados"
        width={2115}
        height={588}
        className={`${className} w-auto min-w-[120px] object-contain`}
      />
    </span>
  );
}
