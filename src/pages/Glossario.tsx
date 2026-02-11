import React, { useMemo, useState } from "react";
import { BookOpen, Search, Info } from "lucide-react";
import PageHeader from "@/components/dashboard/PageHeader";
import { Input } from "@/components/primitives/Input";
import { GLOSSARIO } from "@/components/dashboard/mockData";

export default function Glossario() {
  const [busca, setBusca] = useState("");

  const termosFiltrados = useMemo(() => {
    const term = busca.toLowerCase();
    return GLOSSARIO.filter(
      (item) => item.termo.toLowerCase().includes(term) || item.definicao.toLowerCase().includes(term)
    );
  }, [busca]);

  const termosAgrupados = useMemo(() => {
    return termosFiltrados.reduce<Record<string, typeof GLOSSARIO>>((acc, item) => {
      const letra = item.termo[0].toUpperCase();
      if (!acc[letra]) acc[letra] = [];
      acc[letra].push(item);
      return acc;
    }, {});
  }, [termosFiltrados]);

  const letras = useMemo(() => Object.keys(termosAgrupados).sort(), [termosAgrupados]);

  return (
    <div className="space-y-8">
      <PageHeader
        titulo="Glossário Financeiro"
        subtitulo="Explicações simples dos termos técnicos utilizados neste dashboard"
        icone={BookOpen}
        badges={[{ texto: `${GLOSSARIO.length} Termos`, className: "bg-teal-100 text-teal-700 border-teal-200" }]}
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            placeholder="Buscar termos ou definições..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-12 h-12 text-lg rounded-xl"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {letras.map((letra) => (
          <a
            key={letra}
            href={`#letra-${letra}`}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-600 font-semibold text-slate-600 transition-colors"
          >
            {letra}
          </a>
        ))}
      </div>

      <div className="space-y-8">
        {letras.map((letra) => (
          <div key={letra} id={`letra-${letra}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {letra}
              </div>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {termosAgrupados[letra].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all hover:border-blue-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <Info className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-blue-600 transition-colors">
                        {item.termo}
                      </h4>
                      <p className="text-slate-600 leading-relaxed">{item.definicao}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {termosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhum termo encontrado</h3>
          <p className="text-slate-500">Tente buscar por outras palavras-chave</p>
        </div>
      )}

      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6">
        <h4 className="font-semibold text-teal-800 mb-2">💡 Dica</h4>
        <p className="text-teal-700">
          Passe o mouse sobre os ícones de informação (ℹ️) nos KPIs do dashboard para ver explicações rápidas de cada indicador.
          Este glossário complementa essas informações com definições mais detalhadas.
        </p>
      </div>
    </div>
  );
}
