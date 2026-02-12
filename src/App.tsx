import React, { useMemo, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Sidebar from "./components/dashboard/Sidebar";

import Home from "./pages/Home";
import Receitas from "./pages/Receitas";
import Impostos from "./pages/Impostos";
import Custos from "./pages/Custos";
import Despesas from "./pages/Despesas";
import Resultado from "./pages/Resultado";
import Detalhamento from "./pages/Detalhamento";
import Glossario from "./pages/Glossario";
import NotFound from "./pages/NotFound";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  // Sidebar: w-72 (288px) ou w-20 (80px)
  const sidebarWidth = collapsed ? 80 : 288;

  // CSS var p/ usar no Tailwind (lg:ml-[var(--sidebar-w)])
  const shellStyle = useMemo(
    () => ({ ["--sidebar-w" as any]: `${sidebarWidth}px` }),
    [sidebarWidth]
  );

  return (
    <div className="min-h-screen bg-slate-50" style={shellStyle}>
      <Sidebar paginaAtual={pathname} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Área do conteúdo: no MOBILE não aplica margem; no DESKTOP aplica */}
      <main className="min-h-screen lg:ml-[var(--sidebar-w)]">
        <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home />} />

            {/* Páginas */}
            <Route path="/receitas" element={<Receitas />} />
            <Route path="/impostos" element={<Impostos />} />
            <Route path="/custos" element={<Custos />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/resultado" element={<Resultado />} />
            <Route path="/detalhamento" element={<Detalhamento />} />
            <Route path="/glossario" element={<Glossario />} />

            {/* Se alguém entrar em /home, redireciona pra / */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* Not found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
