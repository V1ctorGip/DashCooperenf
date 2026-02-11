import React from "react";

/**
 * Tooltip simples sem libs externas:
 * Usa title nativo + wrapper pra ícone/hover.
 */
type TooltipProps = {
  text: string;
  children: React.ReactNode;
};

export function Tooltip({ text, children }: TooltipProps) {
  return (
    <span title={text} className="inline-flex items-center">
      {children}
    </span>
  );
}
