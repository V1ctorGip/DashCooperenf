import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts";
import { formatarMoeda, formatarPercentual } from "./mockData";

type Item = { nome: string; valor: number };

const CORES = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
  "#14B8A6",
  "#A855F7",
];

type Props = {
  titulo: string;
  subtitulo?: string;
  dados: Item[];
  total: number;
  destaquePrimeiro?: boolean;
};

export default function PieChartCard({ titulo, subtitulo, dados, total, destaquePrimeiro = false }: Props) {
  const chartData = dados.map((item, index) => ({
    ...item,
    fill: CORES[index % CORES.length],
  }));

  function CustomTooltip({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload: Item & { fill: string } }>;
  }) {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200 max-w-xs">
          <p className="font-semibold text-slate-800 text-sm mb-1 truncate">{data.nome}</p>
          <p className="text-lg font-bold text-slate-900">{formatarMoeda(data.valor)}</p>
          <p className="text-sm text-slate-500">{formatarPercentual(data.valor, total)} do total</p>
        </div>
      );
    }
    return null;
  }

  const legendPayload = chartData.map((item, index) => ({
    value: item.nome,
    color: CORES[index % CORES.length],
    payload: item,
  }));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm h-full">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-800">{titulo}</h3>
        {subtitulo && <p className="text-sm text-slate-500">{subtitulo}</p>}
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="valor"
              nameKey="nome"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.fill}
                  stroke={destaquePrimeiro && index === 0 ? "#1E40AF" : "transparent"}
                  strokeWidth={destaquePrimeiro && index === 0 ? 3 : 0}
                />
              ))}
            </Pie>
            <RechartsTooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="text-center -mt-4">
        <p className="text-2xl font-bold text-slate-900">{formatarMoeda(total)}</p>
        <p className="text-sm text-slate-500">Total</p>
      </div>

      <div className="grid grid-cols-1 gap-2 mt-4 max-h-48 overflow-y-auto pr-2">
        {legendPayload.slice(0, 6).map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: entry.color }} />
            <span className="truncate text-slate-600 flex-1">{entry.value}</span>
            <span className="text-slate-800 font-medium tabular-nums">
              {formatarPercentual(entry.payload.valor, total)}
            </span>
          </div>
        ))}
        {legendPayload.length > 6 && (
          <p className="text-xs text-slate-400 text-center mt-2">+{legendPayload.length - 6} outros Beneficiários</p>
        )}
      </div>
    </div>
  );
}
