import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { formatarMoeda } from "./mockData";

type DadoBarra = {
  nome: string;
  valor: number;
  [key: string]: any;
};

type Props = {
  titulo: string;
  subtitulo?: string;
  dados: DadoBarra[];
  horizontal?: boolean;
};

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

// Tick customizado para permitir rotação (substitui tick={{ angle: -45 }} que quebra no TS)
function XAxisTickAngulado(props: any) {
  const { x, y, payload } = props;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#64748B"
        fontSize={10}
        transform="rotate(-45)"
      >
        {payload?.value}
      </text>
    </g>
  );
}

type TooltipProps = {
  active?: boolean;
  payload?: any[];
};

export default function BarChartCard({
  titulo,
  subtitulo,
  dados,
  horizontal = true,
}: Props) {
  const chartData = dados.map((item, index) => ({
    ...item,
    nomeAbrev:
      item.nome.length > 25 ? item.nome.substring(0, 25) + "..." : item.nome,
    fill: CORES[index % CORES.length],
  }));

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0]?.payload;
      if (!data) return null;

      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-slate-200 max-w-sm">
          <p className="font-semibold text-slate-800 text-sm mb-2">
            {data.nome}
          </p>
          <p className="text-xl font-bold text-blue-600">
            {formatarMoeda(data.valor)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800">{titulo}</h3>
        {subtitulo && <p className="text-sm text-slate-500">{subtitulo}</p>}
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          {horizontal ? (
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E2E8F0"
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                tickFormatter={(value: number) => `${(value / 1000000).toFixed(1)}M`}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="nomeAbrev"
                width={150}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" radius={[0, 6, 6, 0]} maxBarSize={30}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          ) : (
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
              <XAxis
                dataKey="nomeAbrev"
                axisLine={false}
                tickLine={false}
                height={80}
                tick={<XAxisTickAngulado />}
              />
              <YAxis
                tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}K`}
                tick={{ fill: "#64748B", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valor" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
