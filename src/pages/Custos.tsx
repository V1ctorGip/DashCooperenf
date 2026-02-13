import React from "react";
import { Users, HandCoins, Utensils, Shield, Shirt, Briefcase } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import PieChartCard from "@/components/dashboard/PieChartCard";
import KPICard from "@/components/dashboard/KPICard";
import { DADOS_COOPERATIVA, formatarMoeda } from "@/components/dashboard/mockData";

export default function Custos() {
  const dados = DADOS_COOPERATIVA;
  const custos = dados.custosAtosCooperados;
  const totalReceita = dados.receitaOperacionalBruta;

  const repasse = custos.items[0];
  const outrosCustos = custos.items.slice(1);
  const totalOutros = outrosCustos.reduce((acc, i) => acc + i.valor, 0);

  const icones: Record<string, any> = {
    "Repasse aos cooperados": HandCoins,
    Alimentação: Utensils,
    "Seguro de vida": Shield,
    "Uniformes e EPIs": Shirt,
    "Serviços PJ (treinamentos, assessorias etc.)": Briefcase,
  };

  return (
    <div className="space-y-6 sm:space-y-8 min-w-0">
      <PageHeader
        titulo="Custos – Atos Cooperados"
        subtitulo="Detalhamento dos custos relacionados às operações cooperativas e benefícios aos profissionais"
        icone={Users}
        badges={[
          { texto: `${custos.items.length} Categorias`, className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
        ]}
      />

      {/* 4 colunas só no XL (melhor para notebook com sidebar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <div className="min-w-0">
          <KPICard
            titulo="Total Custos Cooperados"
            valor={formatarMoeda(custos.total)}
            subtitulo={`${((custos.total / totalReceita) * 100).toFixed(1)}% da receita`}
            icone={Users}
            tipo="neutro"
            destaque={true}
          />
        </div>

        <div className="min-w-0">
          <KPICard
            titulo="Repasse aos Cooperados"
            valor={formatarMoeda(repasse.valor)}
            subtitulo={`${((repasse.valor / custos.total) * 100).toFixed(1)}% dos custos`}
            icone={HandCoins}
            tipo="positivo"
          />
        </div>

        <div className="min-w-0">
          <KPICard
            titulo="Benefícios e Serviços"
            valor={formatarMoeda(totalOutros)}
            subtitulo="Alimentação, seguro, EPIs, PJ"
            icone={Shield}
            tipo="neutro"
          />
        </div>

        <div className="min-w-0">
          <KPICard
            titulo="% Retido Cooperados"
            valor={`${((repasse.valor / totalReceita) * 100).toFixed(1)}%`}
            subtitulo="Da receita bruta total"
            icone={Users}
            tipo="positivo"
          />
        </div>
      </div>

      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 sm:p-6 lg:p-8 text-white shadow-lg shadow-emerald-500/20 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-white/20 rounded-xl flex-shrink-0">
                <HandCoins className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold break-words">Repasse aos Cooperados</h3>
            </div>
            <p className="text-emerald-100 max-w-xl text-sm sm:text-base break-words">
              Valor total distribuído diretamente aos profissionais enfermeiros cooperados pelos serviços prestados através da cooperativa.
            </p>
          </div>

          <div className="min-w-0 text-left lg:text-right">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-bold break-words">
              {formatarMoeda(repasse.valor)}
            </p>
            <p className="text-emerald-200 mt-2 text-sm sm:text-base break-words">
              {((repasse.valor / totalReceita) * 100).toFixed(1)}% da receita bruta
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        <div className="min-w-0">
          <PieChartCard
            titulo="Composição dos Custos"
            subtitulo="Distribuição por categoria"
            dados={custos.items}
            total={custos.total}
            destaquePrimeiro={true}
          />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-6 break-words">Outros Custos Cooperados</h3>

          <div className="space-y-4">
            {outrosCustos.map((item, index) => {
              const Icone = icones[item.nome] || Briefcase;
              const percentual = totalOutros > 0 ? (item.valor / totalOutros) * 100 : 0;

              return (
                <div key={index} className="p-4 bg-slate-50 rounded-xl overflow-hidden">
                  <div className="flex items-start sm:items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-white rounded-lg shadow-sm flex-shrink-0">
                        <Icone className="w-4 h-4 text-slate-600" />
                      </div>
                      <span className="font-medium text-slate-800 break-words min-w-0">
                        {item.nome}
                      </span>
                    </div>
                    <span className="font-bold text-slate-900 tabular-nums whitespace-nowrap flex-shrink-0">
                      {formatarMoeda(item.valor)}
                    </span>
                  </div>

                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                      style={{ width: `${Math.min(100, Math.max(0, percentual))}%` }}
                    />
                  </div>

                  <div className="mt-2 flex flex-col sm:flex-row sm:justify-between gap-1 text-xs text-slate-500">
                    <span className="break-words">{percentual.toFixed(1)}% dos outros custos</span>
                    <span className="break-words">{((item.valor / custos.total) * 100).toFixed(2)}% do total</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <DataTable
        dados={custos.items}
        colunas={[
          { titulo: "Descrição" },
          { titulo: "Valor (R$)", alinhamento: "direita" },
          { titulo: "% do Total", alinhamento: "direita" },
          { titulo: "Status", alinhamento: "centro" },
        ]}
        total={custos.total}
        totalLabel="Total de Custos Cooperados"
        mostrarPercentual={true}
        valorReferencia={custos.total}
        destaquePrimeiro={true}
      />

      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 sm:p-6 overflow-hidden">
        <h4 className="font-semibold text-emerald-800 mb-2 break-words">📊 Análise de Distribuição</h4>
        <p className="text-emerald-700 text-sm sm:text-base break-words">
          A cooperativa destina <strong>{((repasse.valor / custos.total) * 100).toFixed(1)}%</strong> dos custos cooperados diretamente aos profissionais.
          Os benefícios complementares representam <strong> {((totalOutros / custos.total) * 100).toFixed(1)}%</strong> dos custos.
        </p>
      </div>
    </div>
  );
}
