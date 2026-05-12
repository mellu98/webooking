"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  const columns = [
    { key: "name", header: "Evento" },
    { key: "artist", header: "Artista", render: (e: any) => e.artist.name },
    { key: "venue", header: "Locale", render: (e: any) => e.venue.name },
    { key: "date", header: "Data", render: (e: any) => formatDate(e.date) },
    { key: "city", header: "Città" },
    { key: "fee", header: "Cachet", render: (e: any) => formatCurrency(e.fee) },
    { key: "status", header: "Stato", render: (e: any) => <StatusBadge status={e.status} /> },
    {
      key: "actions",
      header: "",
      render: (e: any) => (
        <Link href={`/events/${e.id}`} className="text-sm text-violet-600 hover:underline flex items-center gap-1">
          Dettagli <ArrowRight className="w-3 h-3" />
        </Link>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Eventi" description="Tutti gli eventi programmati e completati" />

      {events.length === 0 && !loading ? (
        <EmptyState icon={CalendarDays} title="Nessun evento" description="Conferma una richiesta per creare un evento." />
      ) : (
        <DataTable columns={columns} data={events} keyExtractor={(e) => e.id} loading={loading} />
      )}
    </div>
  );
}
