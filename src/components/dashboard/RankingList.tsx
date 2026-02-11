import React from "react";
import { formatarMoeda } from "./mockData";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";

type Item = { nome: string; valor: number };

type Props = {
  dados: Item[];
  total: number;
  limite?: number;
};

export default function RankingList({ dados, total, limite = 5 }: Props) {
  const dadosLimitados = dados.slice(0, limite);

  const getPosicaoIcone = (posicao: number) => {
    switch (posicao) {
      case 0:
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-slate-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-700" />;
      default:
        return (
          <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-slate-400">
            {posicao + 1}
          </span>
        );
    }
  };

  const getCorBarra = (posicao: number) => {
    switch (posicao) {
      case 0:
        return "bg-gradient-to-r from-amber-400 to-amber-500";
      case 1:
        return "bg-gradient-to-r from-slate-300 to-slate-400";
      case 2:
        return "bg-gradient-to-r from-amber-600 to-amber-700";
      default:
        return "bg-gradient-to-r from-blue-400 to-blue-500";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Top Beneficiários</h3>
          <p className="text-sm text-slate-500">Principais fontes de receita</p>
        </div>
        <div className="p-2 bg-amber-100 rounded-xl">
          <TrendingUp className="w-5 h-5 text-amber-600" />
        </div>
      </div>

      <div className="space-y-4">
        {dadosLimitados.map((item, index) => {
          const percentual = (item.valor / total) * 100;

          return (
            <div key={index} className="group">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    index < 3 ? "bg-slate-100" : "bg-slate-50"
                  )}
                >
                  {getPosicaoIcone(index)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                    {item.nome}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900 tabular-nums">{formatarMoeda(item.valor)}</p>
                  <p className="text-xs text-slate-500 tabular-nums">{percentual.toFixed(1)}%</p>
                </div>
              </div>

              <div className="ml-11 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-500", getCorBarra(index))}
                  style={{ width: `${percentual}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {dados.length > limite && (
        <p className="text-center text-sm text-slate-400 mt-4 pt-4 border-t border-slate-100">
          +{dados.length - limite} outros Beneficiários
        </p>
      )}
    </div>
  );
}
