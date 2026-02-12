import React, { useMemo, useState } from "react";
import { Table2, Search, Filter, CheckCircle2, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { DADOS_COOPERATIVA, formatarMoeda } from "@/components/dashboard/mockData";

type Categoria = "Receita" | "Impostos" | "Custos" | "Despesas" | "Resultado";
type TipoLinha = "positivo" | "negativo" | "resultado";
type StatusLinha = "ok" | "alerta";

type Linha = {
  categoria: Categoria;
  subcategoria: string;
  descricao: string;
  valor: number;
  tipo: TipoLinha;
  status: StatusLinha;
};

export default function Detalhamento() {
  const [filtro, setFiltro] = useState<"todos" | "receita" | "impostos" | "custos" | "despesas" | "resultado">("todos");
  const [busca, setBusca] = useState<string>("");

  const dados = DADOS_COOPERATIVA;

  const todosOsDados: Linha[] = useMemo(() => {
    const linhas: Linha[] = [
      ...dados.receitasPorContratante.map((item) => ({
        categoria: "Receita" as const,
        subcategoria: "Receita por Contratante",
        descricao: item.nome,
        valor: item.valor,
        tipo: "positivo" as const,
        status: "ok" as const,
      })),
      ...dados.impostosIncidencias.items.map((item) => ({
        categoria: "Impostos" as const,
        subcategoria:
          item.tipo === "imposto" ? "Tributos" : item.tipo === "financeiro" ? "Despesas Financeiras" : "Despesas Tributárias",
        descricao: item.nome,
        valor: item.valor,
        tipo: "negativo" as const,
        status: "ok" as const,
      })),
      ...dados.custosAtosCooperados.items.map((item) => ({
        categoria: "Custos" as const,
        subcategoria: "Atos Cooperados",
        descricao: item.nome,
        valor: item.valor,
        tipo: "negativo" as const,
        status: "ok" as const,
      })),
      ...dados.despesasAdministrativas.items.map((item) => ({
        categoria: "Despesas" as const,
        subcategoria: "Administrativas",
        descricao: item.nome,
        valor: item.valor,
        tipo: "negativo" as const,
        status: "ok" as const,
      })),
      {
        categoria: "Resultado" as const,
        subcategoria: "Apuração",
        descricao: "Perdas antes IRPJ/CSLL",
        valor: dados.resultadoReservas.perdasAntesIRPJ,
        tipo: "resultado" as const,
        status: dados.resultadoReservas.inconsistencia.existe ? ("alerta" as const) : ("ok" as const),
      },
      {
        categoria: "Resultado" as const,
        subcategoria: "Reservas",
        descricao: "Fundo de Reserva (15%)",
        valor: dados.resultadoReservas.fundoReserva.valor,
        tipo: "negativo" as const,
        status: "ok" as const,
      },
      {
        categoria: "Resultado" as const,
        subcategoria: "Reservas",
        descricao: "FATES (5%)",
        valor: dados.resultadoReservas.fates.valor,
        tipo: "negativo" as const,
        status: "ok" as const,
      },
      {
        categoria: "Resultado" as const,
        subcategoria: "Final",
        descricao: "Perdas do Período",
        valor: dados.resultadoReservas.perdasPeriodo,
        tipo: "resultado" as const,
        status: "ok" as const,
      },
    ];

    return linhas;
  }, [dados]);

  const dadosFiltrados = useMemo(() => {
    const filtroLower = filtro.toLowerCase();

    return todosOsDados.filter((item) => {
      const matchCategoria = filtro === "todos" || item.categoria.toLowerCase() === filtroLower;

      const textoBusca = busca.trim().toLowerCase();
      const matchBusca =
        textoBusca.length === 0 ||
        item.descricao.toLowerCase().includes(textoBusca) ||
        item.categoria.toLowerCase().includes(textoBusca) ||
        item.subcategoria.toLowerCase().includes(textoBusca);

      return matchCategoria && matchBusca;
    });
  }, [todosOsDados, filtro, busca]);

  const totaisPorCategoria = useMemo(() => {
    return {
      receita: todosOsDados.filter((i) => i.categoria === "Receita").reduce((acc, i) => acc + i.valor, 0),
      impostos: todosOsDados.filter((i) => i.categoria === "Impostos").reduce((acc, i) => acc + i.valor, 0),
      custos: todosOsDados.filter((i) => i.categoria === "Custos").reduce((acc, i) => acc + i.valor, 0),
      despesas: todosOsDados.filter((i) => i.categoria === "Despesas").reduce((acc, i) => acc + i.valor, 0),
    };
  }, [todosOsDados]);

  const categoriaCores: Record<Categoria, string> = {
    Receita: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Impostos: "bg-rose-100 text-rose-700 border-rose-200",
    Custos: "bg-blue-100 text-blue-700 border-blue-200",
    Despesas: "bg-purple-100 text-purple-700 border-purple-200",
    Resultado: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        titulo="Detalhamento Geral"
        subtitulo="Visão consolidada de todas as movimentações financeiras do exercício 2025"
        icone={Table2}
        badges={[{ texto: `${todosOsDados.length} Registros`, className: "bg-slate-100 text-slate-700" }]}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 sm:p-4 text-center">
          <p className="text-[10px] sm:text-xs text-emerald-600 font-medium uppercase">Receitas</p>
          <p className="text-base sm:text-xl font-bold text-emerald-700 break-words">{formatarMoeda(totaisPorCategoria.receita)}</p>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 sm:p-4 text-center">
          <p className="text-[10px] sm:text-xs text-rose-600 font-medium uppercase">Impostos</p>
          <p className="text-base sm:text-xl font-bold text-rose-700 break-words">{formatarMoeda(totaisPorCategoria.impostos)}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 sm:p-4 text-center">
          <p className="text-[10px] sm:text-xs text-blue-600 font-medium uppercase">Custos</p>
          <p className="text-base sm:text-xl font-bold text-blue-700 break-words">{formatarMoeda(totaisPorCategoria.custos)}</p>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 sm:p-4 text-center">
          <p className="text-[10px] sm:text-xs text-purple-600 font-medium uppercase">Despesas</p>
          <p className="text-base sm:text-xl font-bold text-purple-700 break-words">{formatarMoeda(totaisPorCategoria.despesas)}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              placeholder="Buscar por descrição, categoria..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-10 h-10 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value as any)}
              className="h-10 w-full md:w-auto rounded-lg border border-slate-200 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="todos">Todas</option>
              <option value="receita">Receitas</option>
              <option value="impostos">Impostos</option>
              <option value="custos">Custos</option>
              <option value="despesas">Despesas</option>
              <option value="resultado">Resultado</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left font-semibold p-4">Categoria</th>
                <th className="text-left font-semibold p-4">Subcategoria</th>
                <th className="text-left font-semibold p-4">Descrição</th>
                <th className="text-right font-semibold p-4">Valor (R$)</th>
                <th className="text-center font-semibold p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {dadosFiltrados.map((item, index) => (
                <tr key={index} className={`border-t border-slate-100 ${item.status === "alerta" ? "bg-amber-50" : "bg-white"}`}>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${categoriaCores[item.categoria]}`}>
                      {item.categoria}
                    </span>
                  </td>

                  <td className="p-4 text-slate-600">{item.subcategoria}</td>

                  <td className="p-4 font-medium text-slate-800 max-w-md">
                    <div className="flex items-center gap-2">
                      {item.status === "alerta" && <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />}
                      <span className="truncate">{item.descricao}</span>
                    </div>
                  </td>

                  <td
                    className={`p-4 text-right font-semibold tabular-nums ${
                      item.tipo === "positivo" ? "text-emerald-600" : item.tipo === "negativo" ? "text-rose-600" : "text-amber-600"
                    }`}
                  >
                    {item.tipo === "positivo" ? "" : "-"}
                    {formatarMoeda(item.valor)}
                  </td>

                  <td className="p-4 text-center">
                    {item.status === "alerta" ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500 text-white text-xs font-semibold">
                        Verificar
                      </span>
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <p className="text-sm text-slate-500">
            Exibindo <strong>{dadosFiltrados.length}</strong> de <strong>{todosOsDados.length}</strong> registros
            {filtro !== "todos" && ` • Filtrado por: ${filtro}`}
            {busca && ` • Busca: "${busca}"`}
          </p>
        </div>
      </div>
    </div>
  );
}
