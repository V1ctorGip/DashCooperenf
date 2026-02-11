import React from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/cn";
import { Tooltip } from "@/components/primitives/Tooltip";

type Tipo = "positivo" | "negativo" | "alerta" | "neutro";

type Props = {
  titulo: string;
  valor: string;
  subtitulo?: string;
  icone?: React.ComponentType<{ className?: string }>;
  tipo?: Tipo;
  tooltip?: string;
  destaque?: boolean;
};

export default function KPICard({
  titulo,
  valor,
  subtitulo,
  icone: Icone,
  tipo = "neutro",
  tooltip,
  destaque = false,
}: Props) {
  const cores: Record<Tipo, any> = {
    positivo: {
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      borda: "border-emerald-200",
      icone: "text-emerald-600 bg-emerald-100",
      valor: "text-emerald-700",
      indicador: <TrendingUp className="w-4 h-4 text-emerald-500" />,
    },
    negativo: {
      bg: "bg-gradient-to-br from-rose-50 to-rose-100/50",
      borda: "border-rose-200",
      icone: "text-rose-600 bg-rose-100",
      valor: "text-rose-700",
      indicador: <TrendingDown className="w-4 h-4 text-rose-500" />,
    },
    alerta: {
      bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      borda: "border-amber-200",
      icone: "text-amber-600 bg-amber-100",
      valor: "text-amber-700",
      indicador: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    },
    neutro: {
      bg: "bg-gradient-to-br from-slate-50 to-slate-100/50",
      borda: "border-slate-200",
      icone: "text-slate-600 bg-slate-100",
      valor: "text-slate-800",
      indicador: null,
    },
  };

  const estilo = cores[tipo];

  return (
    <div
      className={cn(
        "relative rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        estilo.bg,
        estilo.borda,
        destaque && "ring-2 ring-offset-2 ring-blue-500"
      )}
    >
      {destaque && (
        <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded-full">
          Principal
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", estilo.icone)}>
          {Icone && <Icone className="w-5 h-5" />}
        </div>

        <div className="flex items-center gap-2">
          {estilo.indicador}
          {tooltip && (
            <Tooltip text={tooltip}>
              <Info className="w-4 h-4 text-slate-400 hover:text-slate-600 cursor-help" />
            </Tooltip>
          )}
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{titulo}</p>
        <p className={cn("text-2xl lg:text-3xl font-bold tracking-tight", estilo.valor)}>{valor}</p>
        {subtitulo && <p className="text-sm text-slate-500 mt-2">{subtitulo}</p>}
      </div>
    </div>
  );
}
