"use client";

import { useEffect, useState } from "react";
import { LayoutList, Columns3, Plus, Filter, Clock } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import RequestDrawer from "@/components/shared/RequestDrawer";
import BookingRequestForm from "@/components/shared/BookingRequestForm";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { formatDate, formatCurrency } from "@/lib/utils";

const statuses = ["NEW", "IN_NEGOTIATION", "CONFIRMED", "REJECTED"];

const statusLabels: Record<string, string> = {
  NEW: "Nuove",
  IN_NEGOTIATION: "In trattativa",
  CONFIRMED: "Confermate",
  REJECTED: "Rifiutate",
};

const statusColors: Record<string, string> = {
  NEW: "bg-blue-500",
  IN_NEGOTIATION: "bg-amber-500",
  CONFIRMED: "bg-emerald-500",
  REJECTED: "bg-rose-500",
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [venues, setVenues] = useState<any[]>([]);
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"list" | "kanban">("kanban");
  const [selected, setSelected] = useState<any>(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchAll = async () => {
    setLoading(true);
    const [r, v, a] = await Promise.all([
      fetch("/api/requests").then((x) => x.json()),
      fetch("/api/venues").then((x) => x.json()),
      fetch("/api/artists").then((x) => x.json()),
    ]);
    setRequests(r);
    setVenues(v);
    setArtists(a);
    setLoading(false);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const filteredRequests = statusFilter === "all" ? requests : requests.filter((r) => r.status === statusFilter);

  const columns = [
    { key: "artist", header: "Artista", render: (r: any) => r.artist.name },
    { key: "venue", header: "Locale", render: (r: any) => r.venue.name },
    { key: "eventDate", header: "Data", render: (r: any) => formatDate(r.eventDate) },
    { key: "offerAmount", header: "Offerta", render: (r: any) => (r.offerAmount ? formatCurrency(r.offerAmount) : "-") },
    { key: "status", header: "Stato", render: (r: any) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div>
      <PageHeader
        title="Richieste Booking"
        description="Gestisci la pipeline delle richieste di booking"
        action={
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <Toggle pressed={view === "list"} onPressedChange={() => setView("list")} className="h-8 px-2">
                <LayoutList className="w-4 h-4" />
              </Toggle>
              <Toggle pressed={view === "kanban"} onPressedChange={() => setView("kanban")} className="h-8 px-2">
                <Columns3 className="w-4 h-4" />
              </Toggle>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger className="inline-flex items-center justify-center rounded-lg border border-transparent bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium h-8 px-2.5 gap-2 transition-colors">
                <Plus className="w-4 h-4" /> Nuova
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Nuova Richiesta</DialogTitle>
                </DialogHeader>
                <BookingRequestForm venues={venues} artists={artists} onSuccess={() => { setOpenDialog(false); fetchAll(); }} />
              </DialogContent>
            </Dialog>
          </div>
        }
      />

      {view === "list" ? (
        <DataTable
          columns={columns}
          data={filteredRequests}
          keyExtractor={(r) => r.id}
          loading={loading}
          onRowClick={(r) => { setSelected(r); setOpenDrawer(true); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {statuses.map((status) => {
            const statusRequests = requests.filter((r) => r.status === status);
            return (
              <div key={status} className="bg-slate-50/80 rounded-xl p-4 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                  <h3 className="text-sm font-semibold text-slate-700">
                    {statusLabels[status]}
                  </h3>
                  <Badge variant="secondary" className="text-[10px] ml-auto bg-white">
                    {statusRequests.length}
                  </Badge>
                </div>
                <div className="space-y-3 min-h-[100px]">
                  {statusRequests.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-xs text-slate-400">Nessuna richiesta</p>
                    </div>
                  ) : (
                    statusRequests.map((r) => (
                      <div
                        key={r.id}
                        className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-all border border-slate-100 group"
                        onClick={() => { setSelected(r); setOpenDrawer(true); }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <p className="text-sm font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
                            {r.artist.name}
                          </p>
                          <span className="text-xs font-medium text-slate-500">
                            {r.offerAmount ? formatCurrency(r.offerAmount) : "-"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mb-2">{r.venue.name}</p>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <Clock className="w-3 h-3" />
                          {formatDate(r.eventDate)}
                        </div>
                        {r.eventType && (
                          <Badge variant="outline" className="mt-2 text-[10px] bg-slate-50">
                            {r.eventType}
                          </Badge>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <RequestDrawer
        request={selected}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onUpdate={fetchAll}
      />
    </div>
  );
}
