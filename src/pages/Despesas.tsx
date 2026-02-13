import React from "react";
import { Building2, Users2, FileText, PartyPopper, Stethoscope } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import PieChartCard from "@/components/dashboard/PieChartCard";
import BarChartCard from "@/components/dashboard/BarChartCard";
import KPICard from "@/components/dashboard/KPICard";
import { DADOS_COOPERATIVA, formatarMoeda } from "@/components/dashboard/mockData";

export default function Despesas() {
  const dados = DADOS_COOPERATIVA;
  const despesas = dados.despesasAdministrativas;
  const totalReceita = dados.receitaOperacionalBruta;

  const icones: Record<string, any> = {
    Administrativas: FileText,
    Pessoal: Users2,
    Eventos: PartyPopper,
    "Assistência médica": Stethoscope,
  };

  const cores: Record<string, string> = {
    Administrativas: "from-blue-400 to-blue-500",
    Pessoal: "from-purple-400 to-purple-500",
    Eventos: "from-amber-400 to-amber-500",
    "Assistência médica": "from-emerald-400 to-emerald-500",
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-w-0">
      <PageHeader
        titulo="Despesas Administrativas"
        subtitulo="Detalhamento dos gastos com estrutura administrativa, pessoal e eventos"
        icone={Building2}
        badges={[
          { texto: `${despesas.items.length} Categorias`, className: "bg-indigo-100 text-indigo-700 border-indigo-200" },
        ]}
      />

      {/* 4 colunas só no XL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <div className="min-w-0">
          <KPICard
            titulo="Total Despesas Admin."
            valor={formatarMoeda(despesas.total)}
            subtitulo={`${((despesas.total / totalReceita) * 100).toFixed(2)}% da receita`}
            icone={Building2}
            tipo="neutro"
            destaque={true}
          />
        </div>

        <div className="min-w-0">
          <KPICard
            titulo="Despesas Administrativas"
            valor={formatarMoeda(391920.06)}
            subtitulo={`${((391920.06 / despesas.total) * 100).toFixed(1)}% do total`}
            icone={FileText}
            tipo="neutro"
          />
        </div>

        <div className="min-w-0">
          <KPICard
            titulo="Despesas com Pessoal"
            valor={formatarMoeda(198362.01)}
            subtitulo={`${((198362.01 / despesas.total) * 100).toFixed(1)}% do total`}
            icone={Users2}
            tipo="neutro"
          />
        </div>

        <div className="min-w-0">
          <KPICard
            titulo="Eventos + Assistência"
            valor={formatarMoeda(31145.79)}
            subtitulo="Benefícios e integração"
            icone={PartyPopper}
            tipo="neutro"
          />
        </div>
      </div>

      {/* cards por categoria — 4 só no XL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {despesas.items.map((item, index) => {
          const Icone = icones[item.nome] || FileText;
          const cor = cores[item.nome] || "from-slate-400 to-slate-500";
          const percentual = (item.valor / despesas.total) * 100;

          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow min-w-0 overflow-hidden"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cor} flex items-center justify-center mb-4 flex-shrink-0`}>
                <Icone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-1 break-words">{item.nome}</h4>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 tabular-nums break-words">
                {formatarMoeda(item.valor)}
              </p>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${cor} rounded-full`} style={{ width: `${percentual}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-2 break-words">{percentual.toFixed(1)}% das despesas administrativas</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        <div className="min-w-0">
          <PieChartCard titulo="Composição das Despesas" subtitulo="Distribuição por categoria" dados={despesas.items} total={despesas.total} />
        </div>
        <div className="min-w-0">
          <BarChartCard
            titulo="Comparativo de Despesas"
            subtitulo="Valores por categoria (em R$)"
            dados={despesas.items}
            horizontal={false}
          />
        </div>
      </div>

      <DataTable
        dados={despesas.items}
        colunas={[
          { titulo: "Categoria" },
          { titulo: "Valor (R$)", alinhamento: "direita" },
          { titulo: "% do Total", alinhamento: "direita" },
          { titulo: "Status", alinhamento: "centro" },
        ]}
        total={despesas.total}
        totalLabel="Total de Despesas Administrativas"
        mostrarPercentual={true}
        valorReferencia={despesas.total}
      />

      <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 sm:p-6 overflow-hidden">
        <h4 className="font-semibold text-indigo-800 mb-2 break-words">📊 Análise de Eficiência</h4>
        <p className="text-indigo-700 text-sm sm:text-base break-words">
          As despesas administrativas representam <strong>{((despesas.total / totalReceita) * 100).toFixed(2)}%</strong> da receita bruta.
        </p>
      </div>
    </div>
  );
}
