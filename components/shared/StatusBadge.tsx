"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { RequestStatus, EventStatus, PaymentStatus } from "@prisma/client";

interface StatusBadgeProps {
  status: RequestStatus | EventStatus | PaymentStatus;
}

const statusStyles: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700 border-blue-200",
  IN_NEGOTIATION: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  REJECTED: "bg-rose-50 text-rose-700 border-rose-200",
  PLANNED: "bg-violet-50 text-violet-700 border-violet-200",
  COMPLETED: "bg-slate-100 text-slate-700 border-slate-200",
  CANCELLED: "bg-rose-50 text-rose-700 border-rose-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const statusLabels: Record<string, string> = {
  NEW: "Nuova",
  IN_NEGOTIATION: "In trattativa",
  CONFIRMED: "Confermata",
  REJECTED: "Rifiutata",
  PLANNED: "Pianificato",
  COMPLETED: "Completato",
  CANCELLED: "Annullato",
  PENDING: "In attesa",
  PAID: "Pagato",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className={cn("text-xs font-medium", statusStyles[status] || "bg-slate-100 text-slate-700")}>
      {statusLabels[status] || status}
    </Badge>
  );
}
