import React from "react";
import { cn } from "@/lib/cn";

type BadgeVariant = "default" | "secondary" | "outline" | "destructive";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold border";

  const variants: Record<BadgeVariant, string> = {
    default: "bg-slate-900 text-white border-slate-900",
    secondary: "bg-slate-100 text-slate-700 border-slate-200",
    outline: "bg-white text-slate-700 border-slate-200",
    destructive: "bg-rose-600 text-white border-rose-600",
  };

  return <span className={cn(base, variants[variant], className)} {...props} />;
}
