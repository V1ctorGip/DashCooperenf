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

  const receitasOrdenadas = [...dados.receitasPorBeneficiário].sort((a, b) => b.valor - a.valor);

  const maiorBeneficiário = receitasOrdenadas[0];
  const top3 = receitasOrdenadas.slice(0, 3);
  const top3Total = top3.reduce((acc, item) => acc + item.valor, 0);
  const mediaReceita = totalReceita / dados.receitasPorBeneficiário.length;

  return (
    <div className="space-y-8">
      <PageHeader
        titulo="Receitas por Beneficiário"
        subtitulo="Detalhamento das receitas por fonte pagadora - serviços prestados em 2025"
        icone={Receipt}
        badges={[
          { texto: `${dados.receitasPorBeneficiário.length} Beneficiários`, className: "bg-blue-100 text-blue-700 border-blue-200" },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          titulo="Receita Total"
          valor={formatarMoeda(totalReceita)}
          subtitulo="Receita operacional bruta"
          icone={Receipt}
          tipo="positivo"
          destaque={true}
        />
        <KPICard
          titulo="Maior Beneficiário"
          valor={formatarMoeda(maiorBeneficiário.valor)}
          subtitulo={`${((maiorBeneficiário.valor / totalReceita) * 100).toFixed(1)}% do total`}
          icone={Building2}
          tipo="neutro"
        />
        <KPICard
          titulo="Top 3 Beneficiários"
          valor={formatarMoeda(top3Total)}
          subtitulo={`${((top3Total / totalReceita) * 100).toFixed(1)}% do total`}
          icone={Building2}
          tipo="neutro"
        />
        <KPICard
          titulo="Média por Beneficiário"
          valor={formatarMoeda(mediaReceita)}
          subtitulo={`${dados.receitasPorBeneficiário.length} fontes pagadoras`}
          icone={Building2}
          tipo="neutro"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChartCard
          titulo="Composição da Receita"
          subtitulo="Participação de cada Beneficiário na receita total"
          dados={receitasOrdenadas}
          total={totalReceita}
          destaquePrimeiro={true}
        />
        <BarChartCard
          titulo="Ranking de Beneficiários"
          subtitulo="Valores por fonte pagadora (em R$)"
          dados={receitasOrdenadas}
          horizontal={true}
        />
      </div>

      <DataTable
        dados={receitasOrdenadas}
        colunas={[
          { titulo: "Beneficiário de Serviço" },
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

      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-semibold text-blue-800 mb-2">📊 Análise de Concentração</h4>
        <p className="text-blue-700">
          Os 3 maiores Beneficiários representam <strong>{((top3Total / totalReceita) * 100).toFixed(1)}%</strong> da receita total.
          O Instituto Sinai (somando S.A. e LTDA) é responsável por aproximadamente <strong>56,7%</strong> de toda a receita,
          indicando alta concentração em um único grupo econômico.
        </p>
      </div>
    </div>
  );
}
