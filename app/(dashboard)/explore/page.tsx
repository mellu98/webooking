"use client";

import { useEffect, useState, useCallback } from "react";
import ArtistCard from "@/components/shared/ArtistCard";
import MarketplaceHero from "@/components/shared/MarketplaceHero";
import ExploreFilters from "@/components/shared/ExploreFilters";
import EmptyState from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Music, SlidersHorizontal } from "lucide-react";

interface Filters {
  genre: string;
  city: string;
  eventType: string;
  minFee: string;
  maxFee: string;
  available: string;
}

export default function ExplorePage() {
  const [artists, setArtists] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filters>({
    genre: "all",
    city: "all",
    eventType: "all",
    minFee: "",
    maxFee: "",
    available: "all",
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/artists")
      .then((r) => r.json())
      .then((data) => {
        setArtists(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

  const applyFilters = useCallback(() => {
    let result = [...artists];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.genre.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          (a.bio && a.bio.toLowerCase().includes(q))
      );
    }

    if (filters.genre !== "all") result = result.filter((a) => a.genre === filters.genre);
    if (filters.city !== "all") result = result.filter((a) => a.city === filters.city);
    if (filters.eventType !== "all") {
      result = result.filter((a) => a.eventTypes?.includes(filters.eventType));
    }
    if (filters.minFee) result = result.filter((a) => a.fee >= Number(filters.minFee));
    if (filters.maxFee) result = result.filter((a) => a.fee <= Number(filters.maxFee));
    if (filters.available !== "all") result = result.filter((a) => String(a.available) === filters.available);

    setFiltered(result);
  }, [artists, search, filters]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return (
    <div>
      <MarketplaceHero search={search} onSearchChange={setSearch} resultCount={filtered.length} />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <ExploreFilters filters={filters} onChange={setFilters} />
        </div>
        <p className="text-sm text-slate-400 hidden sm:block">
          {filtered.length} artist{filtered.length === 1 ? "a" : "i"}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-56 w-full rounded-xl" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Music}
          title="Nessun artista trovato"
          description="Prova a modificare i filtri di ricerca o i criteri di budget."
          actionLabel="Cancella filtri"
          onAction={() => {
            setSearch("");
            setFilters({ genre: "all", city: "all", eventType: "all", minFee: "", maxFee: "", available: "all" });
          }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {filtered.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}
