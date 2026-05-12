import { prisma } from "@/lib/prisma";
import StatCard from "@/components/shared/StatCard";
import PageHeader from "@/components/shared/PageHeader";
import StatusBadge from "@/components/shared/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Plus, CalendarCheck, Users, Compass, Inbox, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";
import { formatDate, formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // In real app, get role from auth. Here we simulate both views.
  const role = "BOOKING_AGENT";

  const [newRequestsCount, confirmedEvents, activeArtists, pendingPayments, recentRequests, upcomingEvents, totalRevenue] =
    await Promise.all([
      prisma.bookingRequest.count({ where: { status: "NEW" } }),
      prisma.event.count({ where: { status: "PLANNED" } }),
      prisma.artist.count({ where: { available: true } }),
      prisma.payment.count({ where: { status: "PENDING" } }),
      prisma.bookingRequest.findMany({
        where: { status: "NEW" },
        include: { artist: true, venue: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.event.findMany({
        where: { date: { gte: new Date() } },
        include: { artist: true, venue: true },
        orderBy: { date: "asc" },
        take: 5,
      }),
      prisma.event.aggregate({
        where: { status: { in: ["PLANNED", "COMPLETED"] } },
        _sum: { fee: true },
      }),
    ]);

  const revenueData = [
    { name: "Gen", revenue: 4200 },
    { name: "Feb", revenue: 5800 },
    { name: "Mar", revenue: 3500 },
    { name: "Apr", revenue: 7200 },
    { name: "Mag", revenue: 6100 },
    { name: "Giu", revenue: 8400 },
  ];

  const isAgent = true;
  const isVenue = false;

  return (
    <div>
      <PageHeader
        title={isAgent ? "Dashboard Agent" : "Dashboard"}
        description={
          isAgent
            ? "Panoramica della tua attività di booking e pipeline richieste"
            : "Panoramica delle tue richieste e booking confermati"
        }
        action={
          <div className="flex gap-2">
            <Link href="/explore">
              <Button variant="outline" className="gap-2">
                <Compass className="w-4 h-4" /> Esplora
              </Button>
            </Link>
            <Link href="/requests">
              <Button className="bg-violet-600 hover:bg-violet-700 gap-2">
                <Plus className="w-4 h-4" /> Nuova Richiesta
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {isAgent ? (
          <>
            <StatCard
              title="Richieste Nuove"
              value={newRequestsCount}
              iconName="Inbox"
              trend="12% vs mese scorso"
              trendUp
            />
            <StatCard
              title="Eventi Confermati"
              value={confirmedEvents}
              iconName="CalendarCheck"
              trend="8% vs mese scorso"
              trendUp
            />
            <StatCard
              title="Artisti Attivi"
              value={activeArtists}
              iconName="Users"
              trend="2% vs mese scorso"
              trendUp={false}
            />
            <StatCard
              title="Revenue Stimata"
              value={formatCurrency(totalRevenue._sum.fee || 0)}
              iconName="TrendingUp"
              trend="+15% vs mese scorso"
              trendUp
            />
          </>
        ) : (
          <>
            <StatCard
              title="Richieste Inviate"
              value={newRequestsCount}
              iconName="Inbox"
              trend="3 nuove questa settimana"
              trendUp
            />
            <StatCard
              title="Booking Confermati"
              value={confirmedEvents}
              iconName="CalendarCheck"
              trend="2 in programma"
              trendUp
            />
            <StatCard
              title="Artisti Salvati"
              value={activeArtists}
              iconName="Users"
              trend="5 nuovi"
              trendUp
            />
            <StatCard
              title="Spesa Stimata"
              value={formatCurrency(totalRevenue._sum.fee || 0)}
              iconName="TrendingUp"
              trend="Budget sotto controllo"
              trendUp
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Revenue / Eventi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end gap-2">
              {revenueData.map((d) => {
                const max = Math.max(...revenueData.map((x) => x.revenue));
                const height = (d.revenue / max) * 100;
                return (
                  <div key={d.name} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full max-w-[60px] rounded-t-lg bg-violet-100 hover:bg-violet-200 transition-colors relative group"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                        {formatCurrency(d.revenue)}
                      </div>
                    </div>
                    <span className="text-xs text-slate-500">{d.name}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold">Richieste Recenti</CardTitle>
            <Link href="/requests" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
              Vedi tutte <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRequests.length === 0 ? (
              <p className="text-sm text-slate-500">Nessuna richiesta nuova</p>
            ) : (
              recentRequests.map((req) => (
                <div key={req.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{req.artist.name}</p>
                    <p className="text-xs text-slate-500">{req.venue.name} • {formatDate(req.eventDate)}</p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-slate-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Prossimi Eventi</CardTitle>
          <Link href="/events" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
            Vedi tutti <ArrowRight className="w-3 h-3" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-4">
          {upcomingEvents.length === 0 ? (
            <p className="text-sm text-slate-500">Nessun evento in programma</p>
          ) : (
            upcomingEvents.map((evt) => (
              <div key={evt.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-violet-50">
                    <CalendarCheck className="w-4 h-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{evt.name}</p>
                    <p className="text-xs text-slate-500">{evt.artist.name} @ {evt.venue.name} • {formatDate(evt.date)}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-slate-900">{formatCurrency(evt.fee)}</span>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
