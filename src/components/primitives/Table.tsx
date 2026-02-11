import React from "react";
import { cn } from "@/lib/cn";

export function Table(props: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      {...props}
      className={cn("w-full text-sm", props.className)}
    />
  );
}

export function TableHead(props: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th {...props} className={cn("px-4 py-3 text-left text-slate-700", props.className)} />;
}

export function TableCell(props: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td {...props} className={cn("px-4 py-3 align-middle", props.className)} />;
}

export function TableRow(props: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} className={cn("border-b border-slate-100", props.className)} />;
}

export function TableHeader(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead {...props} className={cn("bg-slate-50", props.className)} />;
}

export function TableBody(props: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody {...props} className={cn("bg-white", props.className)} />;
}
