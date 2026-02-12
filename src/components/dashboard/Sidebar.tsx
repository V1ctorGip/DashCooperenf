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
  primary: "#18546E",
  secondary: "#58C8B4",
  gold: "#C1AC48",
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

  // Mobile menu state
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

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
      { id: "receitas", nome: "Receitas por Contratante", icone: Receipt, path: "/receitas" },
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

  const isPathActive = (itemPath: string) => {
    const isHome = itemPath === "/";
    return isHome ? pathname === "/" : pathname.startsWith(itemPath);
  };

  const MobileNavbar = () => (
    <header className="lg:hidden sticky top-0 z-50 w-full border-b border-slate-200 bg-white">
      <div className="h-16 px-4 flex items-center justify-between">
        {/* Logo + marca (como navbar de site) */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center overflow-hidden shadow-sm border border-slate-200 flex-shrink-0">
            <img
              src={LOGO_URL}
              alt="Cooperenf"
              className="w-8 h-8 object-contain"
              loading="eager"
            />
          </div>
          <div className="min-w-0">
            <p className="font-extrabold text-slate-900 leading-tight truncate">COOPERENF</p>
            <p className="text-xs text-slate-500 truncate">Dashboard 2025</p>
          </div>
        </div>

        {/* Botão menu (não flutua por cima de nada) */}
        <button
          type="button"
          className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-sm border border-slate-200"
          style={{ backgroundColor: BRAND.secondary }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Menu dropdown tipo site (como seu exemplo) */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div
            className="fixed left-0 right-0 top-16 z-50 max-h-[calc(100vh-4rem)] overflow-y-auto"
            style={{ backgroundColor: BRAND.primary }}
          >
            <div className="px-5 pt-5 pb-4">
              <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
                Navegação
              </p>

              <div className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icone;
                  const ativo = isPathActive(item.path);

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl transition"
                      style={{
                        backgroundColor: ativo ? BRAND.secondary : "transparent",
                        color: ativo ? BRAND.primary : "rgba(255,255,255,0.92)",
                      }}
                    >
                      <Icon
                        className="w-5 h-5 flex-shrink-0"
                        color={ativo ? BRAND.primary : "rgba(255,255,255,0.65)"}
                      />
                      <span className="text-sm font-semibold min-w-0 break-words">
                        {item.nome}
                      </span>

                      {ativo && (
                        <span
                          className="ml-auto w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: BRAND.gold }}
                        />
                      )}
                    </NavLink>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <p className="text-xs text-white/70 mb-1">Ano Base</p>
                  <p className="text-lg font-extrabold text-white">2025</p>
                  <p className="text-xs text-white/60 mt-1">01/01 a 31/12/2025</p>
                </div>
              </div>

              <div className="pb-3" />
            </div>
          </div>
        </>
      )}
    </header>
  );

  const DesktopHeader = () => (
    <div className="p-6 border-b border-white/10">
      <div className={collapsed ? "flex flex-col items-center justify-center gap-3" : "flex items-center gap-4"}>
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

        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-extrabold text-lg leading-tight tracking-tight text-white">
              COOPERENF
            </h1>
            <p className="text-xs text-white/75">Cooperativa de Enfermeiros</p>
          </div>
        )}
      </div>
    </div>
  );

  const DesktopMenuLink = ({ item }: { item: MenuItem }) => {
    const Icon = item.icone;
    const ativo = isPathActive(item.path);
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

  const DesktopFooter = () => (
    <div className="p-4 border-t border-white/10">
      <div className={`${collapsed ? "hidden lg:hidden" : "block"} lg:block mb-4`}>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-xs text-white/70 mb-1">Ano Base</p>
          <p className="text-lg font-extrabold text-white">2025</p>
          <p className="text-xs text-white/60 mt-1">01/01 a 31/12/2025</p>
        </div>
      </div>

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
    </div>
  );

  return (
    <>
      {/* MOBILE: Navbar */}
      <MobileNavbar />

      {/* DESKTOP: Sidebar fixa */}
      <aside
        className={`fixed left-0 top-0 h-screen z-40 hidden lg:flex flex-col ${desktopWidthClass}`}
        style={{ backgroundColor: BRAND.primary }}
      >
        <DesktopHeader />

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {!collapsed && (
            <p className="text-xs font-bold text-white/50 uppercase tracking-wider px-3 mb-3">
              Navegação
            </p>
          )}

          {menuItems.map((item) => (
            <DesktopMenuLink key={item.id} item={item} />
          ))}
        </nav>

        <DesktopFooter />
      </aside>
    </>
  );
}
