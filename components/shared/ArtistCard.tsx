"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Music, Star, CalendarCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface ArtistCardProps {
  artist: {
    id: string;
    slug: string;
    name: string;
    genre: string;
    city: string;
    fee: number;
    available: boolean;
    imageUrl: string | null;
    rating?: number;
    eventTypes?: string | null;
  };
  showActions?: boolean;
}

export default function ArtistCard({ artist, showActions = true }: ArtistCardProps) {
  return (
    <Card className="overflow-hidden border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group bg-white">
      <div className="relative h-56 bg-slate-100 overflow-hidden">
        {artist.imageUrl ? (
          <Image
            src={artist.imageUrl}
            alt={artist.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Music className="w-12 h-12 text-slate-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge
            className={
              artist.available
                ? "bg-emerald-500/90 text-white border-0 backdrop-blur-sm"
                : "bg-slate-600/90 text-white border-0 backdrop-blur-sm"
            }
          >
            {artist.available ? (
              <span className="flex items-center gap-1"><CalendarCheck className="w-3 h-3" /> Disponibile</span>
            ) : (
              "Non disponibile"
            )}
          </Badge>
        </div>
        {artist.rating && artist.rating > 0 && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-amber-400/90 text-amber-950 border-0 backdrop-blur-sm font-semibold">
              <Star className="w-3 h-3 fill-current mr-1" />
              {artist.rating.toFixed(1)}
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">
            {artist.name}
          </h3>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1.5">
            <Music className="w-3.5 h-3.5 text-violet-500" /> {artist.genre}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-violet-500" /> {artist.city}
          </span>
        </div>
        {artist.eventTypes && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {artist.eventTypes.split(",").slice(0, 3).map((et) => (
              <span key={et} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-medium">
                {et.trim()}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            <p className="text-xs text-slate-400">Da</p>
            <p className="text-sm font-bold text-slate-900">{formatCurrency(artist.fee)}</p>
          </div>
          {showActions && (
            <Link href={`/artists/${artist.id}`}>
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 shadow-sm hover:shadow-md transition-all">
                Richiedi Booking
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
