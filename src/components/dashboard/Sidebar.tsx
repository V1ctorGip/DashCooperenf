import React, { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Receipt,
  Landmark,
  Users,
  Building2,
  PiggyBank,
  Table2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

type SidebarProps = {
  paginaAtual?: string;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const BRAND = {
  primary: "#18546E",   // fundo principal
  secondary: "#58C8B4", // item ativo
  gold: "#C1AC48",      // ponto ativo
};

const LOGO_URL = "https://www.cooperenf.com/assets/logo_transparente-CZ96UEyf.png";

type MenuItem = {
  id: string;
  nome: string;
  icone: LucideIcon;
  path: string;
};

export default function Sidebar({ paginaAtual, collapsed, setCollapsed }: SidebarProps) {
  const location = useLocation();
  const pathname = paginaAtual ?? location.pathname;

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Fecha drawer ao trocar rota (mobile)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Bloqueia scroll do body quando drawer aberto
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      { id: "visao-geral", nome: "Visão Geral", icone: LayoutDashboard, path: "/" },
      { id: "receitas", nome: "Receitas por Beneficiário", icone: Receipt, path: "/receitas" },
      { id: "impostos", nome: "Impostos e Incidências", icone: Landmark, path: "/impostos" },
      { id: "custos", nome: "Custos Cooperados", icone: Users, path: "/custos" },
      { id: "despesas", nome: "Despesas Administrativas", icone: Building2, path: "/despesas" },
      { id: "resultado", nome: "Resultado e Reservas", icone: PiggyBank, path: "/resultado" },
      { id: "detalhamento", nome: "Detalhamento Geral", icone: Table2, path: "/detalhamento" },
      { id: "glossario", nome: "Glossário", icone: BookOpen, path: "/glossario" },
    ],
    []
  );

  const desktopWidthClass = collapsed ? "w-20" : "w-72";

  // Overlay mobile
  const overlayClass = `fixed inset-0 z-30 bg-black/50 lg:hidden transition-opacity ${
    mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`;

  // Botão flutuante mobile
  const MobileOpenButton = () => (
    <button
      type="button"
      className="lg:hidden fixed left-4 top-4 z-50 rounded-xl shadow-lg px-3 py-3 text-white"
      style={{ backgroundColor: BRAND.secondary }}
      onClick={() => setMobileOpen(true)}
      aria-label="Abrir menu"
    >
      <Menu className="w-5 h-5" />
    </button>
  );

  const Header = ({ showClose }: { showClose: boolean }) => (
  <div className="p-6 border-b border-white/10">
    <div
      className={
        collapsed
          ? "flex flex-col items-center justify-center gap-3"
          : "flex items-center gap-4"
      }
    >
      {/* LOGO (centralizada de verdade no colapsado) */}
<div className={collapsed ? "w-full flex justify-center" : ""}>
  <div
    className={
      collapsed
        ? "w-14 h-14 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-sm"
        : "w-14 h-14 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm"
    }
  >
    <img
      src={LOGO_URL}
      alt="Cooperenf"
      className={collapsed ? "w-11 h-11 object-contain" : "w-12 h-12 object-contain"}
      loading="eager"
    />
  </div>
</div>

      {/* Texto (some no colapsado) */}
      {!collapsed && (
        <div className="overflow-hidden">
          <h1 className="font-extrabold text-lg leading-tight tracking-tight text-white">
            COOPERENF
          </h1>
          <p className="text-xs text-white/75">Cooperativa de Enfermeiros</p>
        </div>
      )}

      {/* Botão fechar (mobile drawer) */}
      {showClose && (
        <button
          type="button"
          className={collapsed ? "rounded-xl p-2 hover:bg-white/10" : "ml-auto rounded-xl p-2 hover:bg-white/10"}
          onClick={() => setMobileOpen(false)}
          aria-label="Fechar menu"
          title="Fechar"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      )}
    </div>
  </div>
);


  const MenuLink = ({ item }: { item: MenuItem }) => {
    const Icon = item.icone;
    const isHome = item.path === "/";
    const ativo = isHome ? pathname === "/" : pathname.startsWith(item.path);

    // no desktop colapsado, escondemos texto; no mobile sempre mostra
    const showTextClass = collapsed ? "lg:hidden" : "";

    return (
      <NavLink
        to={item.path}
        className={`flex items-center ${collapsed ? "justify-center" : ""} gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
        ativo ? "shadow-lg" : "hover:bg-white/10"
        }`}

        style={{
          backgroundColor: ativo ? BRAND.secondary : "transparent",
          color: ativo ? BRAND.primary : "rgba(255,255,255,0.85)",
        }}
      >
        <Icon
          className="w-5 h-5 flex-shrink-0"
          color={ativo ? BRAND.primary : "rgba(255,255,255,0.55)"}
        />

        <span className={`text-sm font-semibold truncate ${showTextClass}`}>
          {item.nome}
        </span>

        {ativo && (
          <span
            className={`ml-auto w-2.5 h-2.5 rounded-full ${showTextClass}`}
            style={{ backgroundColor: BRAND.gold }}
          />
        )}
      </NavLink>
    );
  };

  const Footer = ({ showCollapse }: { showCollapse: boolean }) => (
    <div className="p-4 border-t border-white/10">
      {/* Ano base (mobile sempre / desktop só quando não colapsado) */}
      <div className={`${collapsed ? "hidden lg:hidden" : "block"} lg:block mb-4`}>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/70 mb-1">Ano Base</p>
          <p className="text-lg font-extrabold text-white">2025</p>
          <p className="text-xs text-white/60 mt-1">01/01 a 31/12/2025</p>
        </div>
      </div>

      {/* Collapse apenas desktop */}
      {showCollapse && (
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex w-full h-11 rounded-2xl items-center justify-center transition hover:bg-white/10"
          style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          title={collapsed ? "Expandir" : "Recolher"}
          aria-label={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5 text-white/80" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-white/80" />
          )}
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile open */}
      <MobileOpenButton />

      {/* Overlay */}
      <div className={overlayClass} onClick={() => setMobileOpen(false)} />

      {/* MOBILE DRAWER */}
      <aside
        className={`fixed left-0 top-0 h-screen z-40 flex flex-col w-72 lg:hidden transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: BRAND.primary }}
      >
        <Header showClose={true} />

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <p className="text-xs font-bold text-white/50 uppercase tracking-wider px-3 mb-3">
            Navegação
          </p>

          {menuItems.map((item) => (
            <MenuLink key={item.id} item={item} />
          ))}
        </nav>

        <Footer showCollapse={false} />
      </aside>

      {/* DESKTOP FIXA */}
      <aside
        className={`fixed left-0 top-0 h-screen z-40 hidden lg:flex flex-col ${desktopWidthClass}`}
        style={{ backgroundColor: BRAND.primary }}
      >
        <Header showClose={false} />

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider px-3 mb-3">
              Navegação
            </p>
          )}

          {menuItems.map((item) => (
            <MenuLink key={item.id} item={item} />
          ))}
        </nav>

        <Footer showCollapse={true} />
      </aside>
    </>
  );
}
