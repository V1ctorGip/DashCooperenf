import React from "react";
import { AlertTriangle, Info, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

type Tipo = "info" | "alerta" | "sucesso" | "erro";

type Props = {
  tipo?: Tipo;
  titulo: string;
  descricao: string;
  detalhes?: string[];
};

export default function AlertCard({
  tipo = "info",
  titulo,
  descricao,
  detalhes = [],
}: Props) {
  const estilos = {
    info: {
      bg: "bg-blue-50 border-blue-200",
      icone: Info,
      iconeCor: "text-blue-600 bg-blue-100",
      tituloCor: "text-blue-800",
      descricaoCor: "text-blue-700",
    },
    alerta: {
      bg: "bg-amber-50 border-amber-200",
      icone: AlertTriangle,
      iconeCor: "text-amber-600 bg-amber-100",
      tituloCor: "text-amber-800",
      descricaoCor: "text-amber-700",
    },
    sucesso: {
      bg: "bg-emerald-50 border-emerald-200",
      icone: CheckCircle2,
      iconeCor: "text-emerald-600 bg-emerald-100",
      tituloCor: "text-emerald-800",
      descricaoCor: "text-emerald-700",
    },
    erro: {
      bg: "bg-rose-50 border-rose-200",
      icone: XCircle,
      iconeCor: "text-rose-600 bg-rose-100",
      tituloCor: "text-rose-800",
      descricaoCor: "text-rose-700",
    },
  } as const;

  const estilo = estilos[tipo];
  const Icone = estilo.icone;

  return (
    <div className={cn("rounded-2xl border-2 p-5 transition-all duration-300", estilo.bg)}>
      <div className="flex gap-4">
        <div className={cn("p-2.5 rounded-xl h-fit", estilo.iconeCor)}>
          <Icone className="w-5 h-5" />
        </div>

        <div className="flex-1">
          <h4 className={cn("font-semibold text-lg", estilo.tituloCor)}>{titulo}</h4>
          <p className={cn("mt-1", estilo.descricaoCor)}>{descricao}</p>

          {detalhes.length > 0 && (
            <ul className="mt-3 space-y-1">
              {detalhes.map((detalhe, index) => (
                <li
                  key={index}
                  className={cn("flex items-start gap-2 text-sm", estilo.descricaoCor)}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
                  {detalhe}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
