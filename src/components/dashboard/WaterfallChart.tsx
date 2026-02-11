import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import { formatarMoeda } from "./mockData";

type Totais = {
  receita: number;
  impostos: number;
  custos: number;
  despesas: number;
  resultado: number;
};

type Props = { dados: Totais };

export default function WaterfallChart({ dados }: Props) {
  const chartData = [
    {
      nome: "Receita Bruta",
      valor: dados.receita,
      tipo: "positivo",
      acumulado: dados.receita,
    },
    {
      nome: "Impostos",
      valor: -dados.impostos,
      tipo: "negativo",
      acumulado: dados.receita - dados.impostos,
    },
    {
      nome: "Custos",
      valor: -dados.custos,
      tipo: "negativo",
      acumulado: dados.receita - dados.impostos - dados.custos,
    },
    {
      nome: "Despesas",
      valor: -dados.despesas,
      tipo: "negativo",
      acumulado: dados.receita - dados.impostos - dados.custos - dados.despesas,
    },
    {
      nome: "Resultado",
      valor: -dados.resultado,
      tipo: "resultado",
      acumulado: -dados.resultado,
    },
  ];

  function CustomTooltip({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: any }>;
  }) {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200">
          <p className="font-semibold text-slate-800 mb-1">{data.nome}</p>
          <p className={`text-lg font-bold ${data.valor >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
            {formatarMoeda(Math.abs(data.valor))}
          </p>
          <p className="text-xs text-slate-500 mt-1">Acumulado: {formatarMoeda(data.acumulado)}</p>
        </div>
      );
    }
    return null;
  }

  const getBarColor = (tipo: string) => {
    switch (tipo) {
      case "positivo":
        return "#10B981";
      case "negativo":
        return "#F43F5E";
      case "resultado":
        return "#F59E0B";
      default:
        return "#64748B";
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">Fluxo Financeiro</h3>
        <p className="text-sm text-slate-500">Da receita bruta ao resultado final</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
            <XAxis
              dataKey="nome"
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={{ stroke: "#E2E8F0" }}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value: number) => `${(value / 1000000).toFixed(1)}M`}
              tick={{ fill: "#64748B", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <RechartsTooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#94A3B8" strokeWidth={2} />
            <Bar dataKey="valor" radius={[8, 8, 0, 0]} maxBarSize={80}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.tipo)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-sm text-slate-600">Receita</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-500" />
          <span className="text-sm text-slate-600">Deduções</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-amber-500" />
          <span className="text-sm text-slate-600">Resultado</span>
        </div>
      </div>
    </div>
  );
}
