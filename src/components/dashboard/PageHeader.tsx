import React from "react";
import { Badge } from "@/components/primitives/Badge";
import { AlertTriangle, CheckCircle2, Calendar } from "lucide-react";

type BadgeItem = {
  texto: string;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
  icone?: React.ComponentType<{ className?: string }>;
};

type Props = {
  titulo: string;
  subtitulo?: string;
  icone?: React.ComponentType<{ className?: string }>;
  alerta?: boolean;
  alertaTexto?: string;
  badges?: BadgeItem[];
};

export default function PageHeader({
  titulo,
  subtitulo,
  icone: Icone,
  alerta = false,
  alertaTexto = "",
  badges = [],
}: Props) {
  return (
    <div className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          {Icone && (
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20">
              <Icone className="w-6 h-6 text-white" />
            </div>
          )}
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">{titulo}</h1>
            {subtitulo && <p className="text-slate-500 mt-1 max-w-2xl">{subtitulo}</p>}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="bg-white border-slate-200 text-slate-600">
            <Calendar className="w-3 h-3 mr-1" />
            Ano Base 2025
          </Badge>

          {badges.map((badge, index) => {
            const Icon = badge.icone;
            return (
              <Badge key={index} variant={badge.variant || "secondary"} className={badge.className}>
                {Icon && <Icon className="w-3 h-3 mr-1" />}
                {badge.texto}
              </Badge>
            );
          })}

          {alerta ? (
            <Badge variant="destructive" className="bg-amber-500 hover:bg-amber-600 border-amber-500">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {alertaTexto || "Inconsistência Detectada"}
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Dados Verificados
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
