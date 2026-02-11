import React from "react";
import { Badge } from "@/components/primitives/Badge";
import { cn } from "@/lib/cn";
import { formatarMoeda, formatarPercentual } from "./mockData";
import { AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/primitives/Table";

type Coluna = {
  titulo: string;
  alinhamento?: "direita" | "centro";
};

type Item = {
  nome: string;
  valor: number;
  tipo?: string;
  destaque?: boolean;
};

type Props = {
  dados: Item[];
  colunas: Coluna[];
  total?: number;
  totalLabel?: string;
  mostrarPercentual?: boolean;
  valorReferencia?: number;
  destaquePrimeiro?: boolean;
  alertas?: string[];
};

export default function DataTable({
  dados,
  colunas,
  total,
  totalLabel = "Total",
  mostrarPercentual = false,
  valorReferencia = 1,
  destaquePrimeiro = false,
  alertas = [],
}: Props) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
              {colunas.map((coluna, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "font-semibold text-slate-700 py-4",
                    coluna.alinhamento === "direita" && "text-right",
                    coluna.alinhamento === "centro" && "text-center",
                    index === 0 && "pl-6"
                  )}
                >
                  {coluna.titulo}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {dados.map((item, index) => {
              const temAlerta = alertas.includes(item.nome);
              const ehDestaque = destaquePrimeiro && index === 0;

              return (
                <TableRow
                  key={index}
                  className={cn(
                    "transition-colors",
                    temAlerta && "bg-amber-50 hover:bg-amber-100/80",
                    ehDestaque && "bg-blue-50/50 hover:bg-blue-50"
                  )}
                >
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3">
                      {temAlerta && (
                        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                      )}
                      {item.destaque && (
                        <TrendingUp className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                      <span className={cn("font-medium text-slate-800", ehDestaque && "text-blue-700")}>
                        {item.nome}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-right font-semibold text-slate-800 tabular-nums">
                    {formatarMoeda(item.valor)}
                  </TableCell>

                  {mostrarPercentual && (
                    <TableCell className="text-right">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "font-medium tabular-nums",
                          valorReferencia > 0 && item.valor / valorReferencia > 0.1
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        )}
                      >
                        {formatarPercentual(item.valor, valorReferencia)}
                      </Badge>
                    </TableCell>
                  )}

                  {item.tipo && (
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {item.tipo}
                      </Badge>
                    </TableCell>
                  )}

                  <TableCell className="text-center">
                    {temAlerta ? (
                      <Badge variant="destructive" className="bg-amber-500 border-amber-500">
                        Verificar
                      </Badge>
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mx-auto" />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}

            {total !== undefined && (
              <TableRow className="bg-slate-900 hover:bg-slate-900">
                <TableCell className="pl-6 py-4 font-bold text-white">{totalLabel}</TableCell>
                <TableCell className="text-right font-bold text-white text-lg tabular-nums">
                  {formatarMoeda(total)}
                </TableCell>

                {mostrarPercentual && (
                  <TableCell className="text-right">
                    <Badge className="bg-black text-slate-900 font-bold border-white">100%</Badge>
                  </TableCell>
                )}

                {dados[0]?.tipo && <TableCell />}
                <TableCell />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
