import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-slate-900">Página não encontrada</h1>
        <p className="text-slate-600 mt-2">Verifique o endereço ou volte para o início.</p>
        <Link
          to="/"
          className="inline-flex mt-6 px-4 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
        >
          Ir para Home
        </Link>
      </div>
    </div>
  );
}
