"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Music, Star, CalendarCheck, Calendar, ArrowLeft,
  Globe, Mail, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import BookingDialog from "@/components/shared/BookingDialog";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function ArtistDetailPage() {
  const { id } = useParams();
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/artists/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setArtist(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-80 w-full rounded-2xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold text-slate-900">Artista non trovato</h2>
        <Link href="/explore" className="text-violet-600 hover:underline text-sm mt-2 inline-block">
          Torna al marketplace
        </Link>
      </div>
    );
  }

  const availabilityPreview = artist.availability?.slice(0, 14) || [];
  const upcomingEvents = artist.events?.filter((e: any) => new Date(e.date) >= new Date()) || [];

  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/explore" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Torna al marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero */}
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
            {artist.imageUrl ? (
              <Image src={artist.imageUrl} alt={artist.name} fill className="object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Music className="w-16 h-16 text-slate-300" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  {artist.genre}
                </Badge>
                <Badge className={artist.available ? "bg-emerald-500/90 text-white border-0" : "bg-slate-500/90 text-white border-0"}>
                  {artist.available ? "Disponibile" : "Non disponibile"}
                </Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-1">{artist.name}</h1>
              <div className="flex items-center gap-4 text-white/80 text-sm">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {artist.city}</span>
                {artist.rating > 0 && (
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {artist.rating.toFixed(1)}</span>
                )}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Biografia</h2>
            <p className="text-slate-600 leading-relaxed">{artist.bio || "Nessuna biografia disponibile."}</p>
          </div>

          {/* Event types */}
          {artist.eventTypes && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Tipologie evento</h2>
              <div className="flex flex-wrap gap-2">
                {artist.eventTypes.split(",").map((et: string) => (
                  <Badge key={et} variant="secondary" className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 hover:bg-slate-200">
                    {et.trim()}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Availability */}
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Disponibilità prossime</h2>
            {availabilityPreview.length > 0 ? (
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {availabilityPreview.map((a: any) => {
                  const date = new Date(a.date);
                  const dayName = date.toLocaleDateString("it-IT", { weekday: "narrow" });
                  const dayNum = date.getDate();
                  return (
                    <div
                      key={a.id}
                      className={`text-center p-2 rounded-xl border ${
                        a.available
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-slate-50 border-slate-200 text-slate-400"
                      }`}
                    >
                      <p className="text-[10px] uppercase font-medium">{dayName}</p>
                      <p className="text-sm font-bold">{dayNum}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-400">Nessuna disponibilità caricata.</p>
            )}
          </div>

          {/* Recent events */}
          {upcomingEvents.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-slate-900 mb-3">Prossimi eventi</h2>
              <div className="space-y-3">
                {upcomingEvents.map((evt: any) => (
                  <Card key={evt.id} className="border-slate-200">
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-violet-50">
                          <Calendar className="w-4 h-4 text-violet-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{evt.name}</p>
                          <p className="text-xs text-slate-500">{evt.venue?.name} • {formatDate(evt.date)}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-slate-900">{formatCurrency(evt.fee)}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 space-y-4">
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6 space-y-5">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">Cachet indicativo</p>
                  <p className="text-3xl font-bold text-slate-900 mt-1">{formatCurrency(artist.fee)}</p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Music className="w-4 h-4 text-violet-600" />
                    <span className="text-slate-600">{artist.genre}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-violet-600" />
                    <span className="text-slate-600">{artist.city}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CalendarCheck className="w-4 h-4 text-violet-600" />
                    <span className={artist.available ? "text-emerald-600 font-medium" : "text-slate-400"}>
                      {artist.available ? "Attualmente disponibile" : "Non disponibile"}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full bg-violet-600 hover:bg-violet-700 h-11"
                  disabled={!artist.available}
                  onClick={() => setBookingOpen(true)}
                >
                  {artist.available ? "Invia richiesta booking" : "Artista non disponibile"}
                </Button>
                <p className="text-[11px] text-slate-400 text-center">
                  La richiesta sarà gestita dal booking agent in 24h
                </p>
              </CardContent>
            </Card>

            {/* Social links placeholder */}
            <Card className="border-slate-200 shadow-sm">
              <CardContent className="p-6">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-3">Social</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Globe className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <BookingDialog
        artistId={artist.id}
        artistName={artist.name}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
    </div>
  );
}
