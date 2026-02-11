import React from "react";
import { PiggyBank, TrendingDown, BookOpen, Shield } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import KPICard from "@/components/dashboard/KPICard";
import { DADOS_COOPERATIVA, formatarMoeda } from "@/components/dashboard/mockData";

export default function Resultado() {
  const dados = DADOS_COOPERATIVA;
  const resultado = dados.resultadoReservas;
  const totalReceita = dados.receitaOperacionalBruta;

  const totalDeducoes = dados.impostosIncidencias.total + dados.custosAtosCooperados.total + dados.despesasAdministrativas.total;
  const totalReservas = resultado.fundoReserva.valor + resultado.fates.valor;

  return (
    <div className="space-y-8">
      <PageHeader
        titulo="Resultado e Reservas"
        subtitulo="Demonstrativo do resultado do exercício e destinação para reservas obrigatórias"
        icone={PiggyBank}
        alerta={resultado.inconsistencia.existe}
        alertaTexto="Verificar período"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          titulo="Perdas Antes IRPJ/CSLL"
          valor={formatarMoeda(resultado.perdasAntesIRPJ)}
          subtitulo="Resultado antes das reservas"
          icone={TrendingDown}
          tipo="alerta"
          destaque={true}
        />
        <KPICard
          titulo="Fundo de Reserva (15%)"
          valor={formatarMoeda(resultado.fundoReserva.valor)}
          subtitulo="Reserva obrigatória"
          icone={Shield}
          tipo="neutro"
        />
        <KPICard
          titulo="FATES (5%)"
          valor={formatarMoeda(resultado.fates.valor)}
          subtitulo="Assistência técnica e social"
          icone={BookOpen}
          tipo="neutro"
        />
        <KPICard
          titulo="Perdas do Período"
          valor={formatarMoeda(resultado.perdasPeriodo)}
          subtitulo="Resultado final"
          icone={TrendingDown}
          tipo="negativo"
        />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Fluxo de Apuração do Resultado</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                1
              </div>
              <span className="font-medium text-emerald-800">Receita Operacional Bruta</span>
            </div>
            <span className="text-xl font-bold text-emerald-700">{formatarMoeda(totalReceita)}</span>
          </div>

          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>

          <div className="flex items-center justify-between p-4 bg-rose-50 rounded-xl border border-rose-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                2
              </div>
              <div>
                <span className="font-medium text-rose-800">(-) Total de Deduções</span>
                <p className="text-xs text-rose-600">Impostos + Custos + Despesas</p>
              </div>
            </div>
            <span className="text-xl font-bold text-rose-700">-{formatarMoeda(totalDeducoes)}</span>
          </div>

          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>

          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                3
              </div>
              <span className="font-medium text-amber-800">Perdas Antes IRPJ/CSLL</span>
            </div>
            <span className="text-xl font-bold text-amber-700">-{formatarMoeda(resultado.perdasAntesIRPJ)}</span>
          </div>

          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4a
                </div>
                <div>
                  <span className="font-medium text-blue-800">Fundo de Reserva</span>
                  <p className="text-xs text-blue-600">{resultado.fundoReserva.percentual}% das perdas</p>
                </div>
              </div>
              <span className="font-bold text-blue-700">-{formatarMoeda(resultado.fundoReserva.valor)}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl border border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  4b
                </div>
                <div>
                  <span className="font-medium text-purple-800">FATES</span>
                  <p className="text-xs text-purple-600">{resultado.fates.percentual}% das perdas</p>
                </div>
              </div>
              <span className="font-bold text-purple-700">-{formatarMoeda(resultado.fates.valor)}</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-slate-300" />
          </div>

          <div className="flex items-center justify-between p-6 bg-slate-900 rounded-xl text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-slate-900 font-bold">
                5
              </div>
              <div>
                <span className="font-bold text-lg">PERDAS DO PERÍODO</span>
                <p className="text-xs text-slate-400">Resultado final após reservas</p>
              </div>
            </div>
            <span className="text-3xl font-bold text-rose-400">-{formatarMoeda(resultado.perdasPeriodo)}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Fundo de Reserva</h4>
              <p className="text-blue-200 text-sm">{resultado.fundoReserva.percentual}% das perdas</p>
            </div>
          </div>
          <p className="text-3xl font-bold mb-4">{formatarMoeda(resultado.fundoReserva.valor)}</p>
          <p className="text-blue-100 text-sm">
            Reserva legal obrigatória destinada a cobrir possíveis perdas futuras e ao desenvolvimento das atividades da cooperativa.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-purple-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-lg">FATES</h4>
              <p className="text-purple-200 text-sm">{resultado.fates.percentual}% das perdas</p>
            </div>
          </div>
          <p className="text-3xl font-bold mb-4">{formatarMoeda(resultado.fates.valor)}</p>
          <p className="text-purple-100 text-sm">
            Fundo de Assistência Técnica, Educacional e Social, destinado a programas de capacitação e assistência aos cooperados.
          </p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
        <h4 className="font-semibold text-amber-800 mb-2">📊 Análise do Resultado</h4>
        <p className="text-amber-700">
          O exercício de 2025 encerrou com perdas de <strong>{formatarMoeda(resultado.perdasPeriodo)}</strong>. Apesar do resultado negativo,
          a cooperativa manteve suas obrigações com as reservas legais (Fundo de Reserva e FATES), totalizando{" "}
          <strong>{formatarMoeda(totalReservas)}</strong>. O resultado representa apenas{" "}
          <strong>{((resultado.perdasPeriodo / totalReceita) * 100).toFixed(3)}%</strong> da receita bruta.
        </p>
      </div>
    </div>
  );
}
