import React from "react";
import { LayoutDashboard, DollarSign, Receipt, TrendingDown, Percent, Users } from "lucide-react";
import KPICard from "@/components/dashboard/KPICard";
import PageHeader from "@/components/dashboard/PageHeader";
import WaterfallChart from "@/components/dashboard/WaterfallChart";
import RankingList from "@/components/dashboard/RankingList";
import { DADOS_COOPERATIVA, formatarMoeda, calcularTotais } from "@/components/dashboard/mockData";

export default function Home() {
  const totais = calcularTotais();
  const dados = DADOS_COOPERATIVA;

  const percentualRepasse = (dados.custosAtosCooperados.items[0].valor / dados.receitaOperacionalBruta) * 100;

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        titulo="Visão Geral"
        subtitulo="Dashboard consolidado com os principais indicadores financeiros no ano de 2025"
        icone={LayoutDashboard}
        alerta={dados.resultadoReservas.inconsistencia.existe}
        alertaTexto="Inconsistência no período"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          titulo="Receita Bruta"
          valor={formatarMoeda(dados.receitaOperacionalBruta)}
          subtitulo="12 Contratantes de serviço"
          icone={DollarSign}
          tipo="positivo"
          destaque={true}
          tooltip="Total de receitas obtidas pela prestação de serviços no período"
        />
        <KPICard
          titulo="Impostos e Incidências"
          valor={formatarMoeda(dados.impostosIncidencias.total)}
          subtitulo={`${((dados.impostosIncidencias.total / dados.receitaOperacionalBruta) * 100).toFixed(1)}% da receita`}
          icone={Percent}
          tipo="negativo"
          tooltip="Soma de ISS, PIS, COFINS e outras despesas tributárias"
        />
        <KPICard
          titulo="Custos Cooperados"
          valor={formatarMoeda(dados.custosAtosCooperados.total)}
          subtitulo="Inclui repasse aos cooperados"
          icone={Users}
          tipo="neutro"
          tooltip="Custos relacionados aos atos cooperados, incluindo repasses"
        />
        <KPICard
          titulo="Perdas do Período"
          valor={formatarMoeda(dados.resultadoReservas.perdasPeriodo)}
          subtitulo="Após reservas obrigatórias"
          icone={TrendingDown}
          tipo="alerta"
          tooltip="Resultado final após dedução do Fundo de Reserva e FATES"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <KPICard
          titulo="Repasse aos Cooperados"
          valor={formatarMoeda(dados.custosAtosCooperados.items[0].valor)}
          subtitulo={`${percentualRepasse.toFixed(1)}% da receita bruta`}
          icone={Users}
          tipo="positivo"
          tooltip="Valor total distribuído aos profissionais cooperados"
        />
        <KPICard
          titulo="Despesas Administrativas"
          valor={formatarMoeda(dados.despesasAdministrativas.total)}
          subtitulo={`${((dados.despesasAdministrativas.total / dados.receitaOperacionalBruta) * 100).toFixed(1)}% da receita`}
          icone={Receipt}
          tipo="neutro"
          tooltip="Gastos com pessoal, administrativos, eventos e assistência médica"
        />
        <KPICard
          titulo="FATES + Fundo Reserva"
          valor={formatarMoeda(dados.resultadoReservas.fates.valor + dados.resultadoReservas.fundoReserva.valor)}
          subtitulo="Reservas obrigatórias (20%)"
          icone={Receipt}
          tipo="neutro"
          tooltip="Reservas legais: 15% Fundo de Reserva + 5% FATES"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-w-0">
          <WaterfallChart dados={totais} />
        </div>
        <div className="min-w-0">
          <RankingList dados={dados.receitasPorContratante} total={dados.receitaOperacionalBruta} limite={5} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 sm:p-6 lg:p-8 text-white">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Resumo Executivo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          <div className="min-w-0">
            <p className="text-slate-400 text-sm mb-1">Receita Total</p>
            <p className="text-xl sm:text-2xl font-bold text-emerald-400 break-words">{formatarMoeda(dados.receitaOperacionalBruta)}</p>
          </div>
          <div className="min-w-0">
            <p className="text-slate-400 text-sm mb-1">Total Deduções</p>
            <p className="text-xl sm:text-2xl font-bold text-rose-400 break-words">
              {formatarMoeda(dados.impostosIncidencias.total + dados.custosAtosCooperados.total + dados.despesasAdministrativas.total)}
            </p>
          </div>
          <div>
            <p className="text-slate-400 text-sm mb-1">% Retido Cooperados</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-400">{percentualRepasse.toFixed(1)}%</p>
          </div>
          <div className="min-w-0">
            <p className="text-slate-400 text-sm mb-1">Resultado Final</p>
            <p className="text-xl sm:text-2xl font-bold text-amber-400 break-words">-{formatarMoeda(dados.resultadoReservas.perdasPeriodo)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
