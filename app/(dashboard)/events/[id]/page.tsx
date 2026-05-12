"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, MapPin, Music, Building2, Euro, CreditCard } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatCurrency } from "@/lib/utils";

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      });
  }, [id]);

  if (loading || !event) return <div className="text-sm text-slate-500">Caricamento...</div>;

  return (
    <div>
      <PageHeader title={event.name} description="Dettaglio evento" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-3">
                <Music className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="text-xs text-slate-500">Artista</p>
                  <p className="text-sm font-medium text-slate-900">{event.artist.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="text-xs text-slate-500">Venue</p>
                  <p className="text-sm font-medium text-slate-900">{event.venue.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="text-xs text-slate-500">Data</p>
                  <p className="text-sm font-medium text-slate-900">{formatDate(event.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="text-xs text-slate-500">Città</p>
                  <p className="text-sm font-medium text-slate-900">{event.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Euro className="w-5 h-5 text-violet-600" />
                <div>
                  <p className="text-xs text-slate-500">Cachet</p>
                  <p className="text-sm font-medium text-slate-900">{formatCurrency(event.fee)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={event.status} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="w-4 h-4" /> Pagamenti
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {event.payments?.length === 0 ? (
                <p className="text-sm text-slate-500">Nessun pagamento registrato</p>
              ) : (
                event.payments.map((p: any) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                    <span className="text-sm text-slate-700">{formatCurrency(p.amount)}</span>
                    <StatusBadge status={p.status} />
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
