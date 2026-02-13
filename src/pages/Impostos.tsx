import React from "react";
import { Landmark, Percent, Calculator, FileText } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import PieChartCard from "@/components/dashboard/PieChartCard";
import KPICard from "@/components/dashboard/KPICard";
import { DADOS_COOPERATIVA, formatarMoeda } from "@/components/dashboard/mockData";

export default function Impostos() {
  const dados = DADOS_COOPERATIVA;
  const impostos = dados.impostosIncidencias;
  const totalReceita = dados.receitaOperacionalBruta;

  const tributos = impostos.items.filter((i) => i.tipo === "imposto");
  const despesasFinanceiras = impostos.items.filter((i) => i.tipo === "financeiro");
  const despesasTributarias = impostos.items.filter((i) => i.tipo === "tributario");

  const totalTributos = tributos.reduce((acc, i) => acc + i.valor, 0);
  const totalFinanceiras = despesasFinanceiras.reduce((acc, i) => acc + i.valor, 0);
  const totalTributarias = despesasTributarias.reduce((acc, i) => acc + i.valor, 0);

  return (
    <div className="space-y-6 sm:space-y-8 min-w-0">
      <PageHeader
        titulo="Impostos e Incidências"
        subtitulo="Detalhamento dos tributos, despesas financeiras e tributárias incidentes sobre a operação"
        icone={Landmark}
        badges={[{ texto: `${impostos.items.length} Categorias`, className: "bg-purple-100 text-purple-700 border-purple-200" }]}
      />

      {/* 4 colunas só no XL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <div className="min-w-0">
          <KPICard
            titulo="Total Impostos"
            valor={formatarMoeda(impostos.total)}
            subtitulo={`${((impostos.total / totalReceita) * 100).toFixed(2)}% da receita`}
            icone={Landmark}
            tipo="negativo"
            destaque={true}
          />
        </div>
        <div className="min-w-0">
          <KPICard
            titulo="Tributos (ISS, PIS, COFINS)"
            valor={formatarMoeda(totalTributos)}
            subtitulo={`${((totalTributos / impostos.total) * 100).toFixed(1)}% do total`}
            icone={Percent}
            tipo="negativo"
          />
        </div>
        <div className="min-w-0">
          <KPICard titulo="Despesas Financeiras" valor={formatarMoeda(totalFinanceiras)} subtitulo="IOF, juros e multas" icone={Calculator} tipo="neutro" />
        </div>
        <div className="min-w-0">
          <KPICard
            titulo="Despesas Tributárias"
            valor={formatarMoeda(totalTributarias)}
            subtitulo="IPTU, JUCETINS, alvará"
            icone={FileText}
            tipo="neutro"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        <div className="min-w-0">
          <PieChartCard titulo="Composição das Incidências" subtitulo="Distribuição por categoria de despesa" dados={impostos.items} total={impostos.total} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4 break-words">Detalhamento por Tipo</h3>

          <div className="space-y-6">
            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-3 min-w-0">
                <span className="text-sm font-medium text-slate-600 break-words min-w-0">
                  Tributos Federais e Municipais
                </span>
                <span className="text-sm font-bold text-slate-900 tabular-nums sm:whitespace-nowrap break-words">
                  {formatarMoeda(totalTributos)}
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full" style={{ width: `${(totalTributos / impostos.total) * 100}%` }} />
              </div>
              <div className="mt-2 text-xs text-slate-500 break-words">
                ISS: {formatarMoeda(132351.48)} | PIS: {formatarMoeda(9879.22)} | COFINS: {formatarMoeda(45596.25)}
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-3 min-w-0">
                <span className="text-sm font-medium text-slate-600 break-words min-w-0">Despesas Financeiras</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums sm:whitespace-nowrap break-words">
                  {formatarMoeda(totalFinanceiras)}
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" style={{ width: `${(totalFinanceiras / impostos.total) * 100}%` }} />
              </div>
              <div className="mt-2 text-xs text-slate-500 break-words">Inclui IOF, juros bancários e multas contratuais</div>
            </div>

            <div className="min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2 sm:gap-3 min-w-0">
                <span className="text-sm font-medium text-slate-600 break-words min-w-0">Despesas Tributárias</span>
                <span className="text-sm font-bold text-slate-900 tabular-nums sm:whitespace-nowrap break-words">
                  {formatarMoeda(totalTributarias)}
                </span>
              </div>
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full" style={{ width: `${(totalTributarias / impostos.total) * 100}%` }} />
              </div>
              <div className="mt-2 text-xs text-slate-500 break-words">IPTU, taxas JUCETINS e renovação de alvará</div>
            </div>
          </div>
        </div>
      </div>

      <DataTable
        dados={impostos.items}
        colunas={[
          { titulo: "Descrição" },
          { titulo: "Valor (R$)", alinhamento: "direita" },
          { titulo: "% do Total", alinhamento: "direita" },
          { titulo: "Tipo" },
          { titulo: "Status", alinhamento: "centro" },
        ]}
        total={impostos.total}
        totalLabel="Total de Impostos e Incidências"
        mostrarPercentual={true}
        valorReferencia={impostos.total}
      />

      <div className="bg-purple-50 border border-purple-200 rounded-2xl p-5 sm:p-6 overflow-hidden">
        <h4 className="font-semibold text-purple-800 mb-2 break-words">📊 Análise Tributária</h4>
        <p className="text-purple-700 text-sm sm:text-base break-words">
          A carga tributária total representa <strong>{((impostos.total / totalReceita) * 100).toFixed(2)}%</strong> da receita bruta.
        </p>
      </div>
    </div>
  );
}
