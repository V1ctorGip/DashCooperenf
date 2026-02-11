export function createPageUrl(pageName: string): string {
  // Mantém compatibilidade com seu Sidebar atual:
  // Home -> /
  // Receitas -> /receitas
  // etc.
  if (pageName === "Home") return "/";
  return `/${pageName.toLowerCase()}`;
}
