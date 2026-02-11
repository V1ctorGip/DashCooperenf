// src/App.tsx
import React, { useState } from "react";
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

  // ✅ Respiro entre sidebar e conteúdo (evita "colado na parede")
  const contentGap = collapsed ? 12 : 16;

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar paginaAtual={pathname} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Área do conteúdo */}
      <main
        className="min-h-screen"
        // ✅ margin-left = largura sidebar + gap
        style={{ marginLeft: sidebarWidth + contentGap }}
      >
        <div className="p-6 lg:p-8">
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
