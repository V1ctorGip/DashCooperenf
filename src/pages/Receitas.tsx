import React from "react";
import { Receipt, Building2 } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import DataTable from "@/components/dashboard/DataTable";
import PieChartCard from "@/components/dashboard/PieChartCard";
import BarChartCard from "@/components/dashboard/BarChartCard";
import KPICard from "@/components/dashboard/KPICard";
import { DADOS_COOPERATIVA, formatarMoeda } from "@/components/dashboard/mockData";

export default function Receitas() {
  const dados = DADOS_COOPERATIVA;
  const totalReceita = dados.receitaOperacionalBruta;

  const receitasOrdenadas = [...dados.receitasPorContratante].sort((a, b) => b.valor - a.valor);

  const maiorContratante = receitasOrdenadas[0];
  const top3 = receitasOrdenadas.slice(0, 3);
  const top3Total = top3.reduce((acc, item) => acc + item.valor, 0);
  const mediaReceita = totalReceita / dados.receitasPorContratante.length;

  return (
    <div className="space-y-6 sm:space-y-8 min-w-0">
      <PageHeader
        titulo="Receitas por Contratante"
        subtitulo="Detalhamento das receitas por fonte pagadora - serviços prestados em 2025"
        icone={Receipt}
        badges={[
          { texto: `${dados.receitasPorContratante.length} Contratantes`, className: "bg-blue-100 text-blue-700 border-blue-200" },
        ]}
      />

      {/* 4 colunas só no XL (resolve notebook com sidebar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        <div className="min-w-0">
          <KPICard
            titulo="Receita Total"
            valor={formatarMoeda(totalReceita)}
            subtitulo="Receita operacional bruta"
            icone={Receipt}
            tipo="positivo"
            destaque={true}
          />
        </div>
        <div className="min-w-0">
          <KPICard
            titulo="Maior Contratante"
            valor={formatarMoeda(maiorContratante.valor)}
            subtitulo={`${((maiorContratante.valor / totalReceita) * 100).toFixed(1)}% do total`}
            icone={Building2}
            tipo="neutro"
          />
        </div>
        <div className="min-w-0">
          <KPICard
            titulo="Top 3 Contratantes"
            valor={formatarMoeda(top3Total)}
            subtitulo={`${((top3Total / totalReceita) * 100).toFixed(1)}% do total`}
            icone={Building2}
            tipo="neutro"
          />
        </div>
        <div className="min-w-0">
          <KPICard
            titulo="Média por Contratante"
            valor={formatarMoeda(mediaReceita)}
            subtitulo={`${dados.receitasPorContratante.length} fontes pagadoras`}
            icone={Building2}
            tipo="neutro"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">
        <div className="min-w-0">
          <PieChartCard
            titulo="Composição da Receita"
            subtitulo="Participação de cada Contratante na receita total"
            dados={receitasOrdenadas}
            total={totalReceita}
            destaquePrimeiro={true}
          />
        </div>
        <div className="min-w-0">
          <BarChartCard
            titulo="Ranking de Contratantes"
            subtitulo="Valores por fonte pagadora (em R$)"
            dados={receitasOrdenadas}
            horizontal={true}
          />
        </div>
      </div>

      <DataTable
        dados={receitasOrdenadas}
        colunas={[
          { titulo: "Contratante de Serviço" },
          { titulo: "Valor (R$)", alinhamento: "direita" },
          { titulo: "% do Total", alinhamento: "direita" },
          { titulo: "Status", alinhamento: "centro" },
        ]}
        total={totalReceita}
        totalLabel="Receita Operacional Bruta"
        mostrarPercentual={true}
        valorReferencia={totalReceita}
        destaquePrimeiro={true}
      />

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 sm:p-6 overflow-hidden">
        <h4 className="font-semibold text-blue-800 mb-2 break-words">📊 Análise de Concentração</h4>
        <p className="text-blue-700 text-sm sm:text-base break-words">
          Os 3 maiores Contratantes representam <strong>{((top3Total / totalReceita) * 100).toFixed(1)}%</strong> da receita total.
          O Instituto Sinai (somando S.A. e LTDA) é responsável por aproximadamente <strong>56,7%</strong> de toda a receita,
          indicando alta concentração em um único grupo econômico.
        </p>
      </div>
    </div>
  );
}
