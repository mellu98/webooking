"use client";

import { Search, Music, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MarketplaceHeroProps {
  search: string;
  onSearchChange: (value: string) => void;
  resultCount: number;
}

export default function MarketplaceHero({ search, onSearchChange, resultCount }: MarketplaceHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-950 text-white mb-8">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-slate-950 to-slate-950" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

      <div className="relative px-6 py-10 sm:px-10 sm:py-14">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 rounded-lg bg-violet-500/20">
              <Music className="w-4 h-4 text-violet-400" />
            </div>
            <span className="text-xs font-medium text-violet-300 uppercase tracking-wider">Marketplace</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Trova l'artista perfetto
          </h1>
          <p className="text-sm text-slate-400 mb-6 max-w-md">
            Esplora roster di artisti verificati, filtra per genere, budget e disponibilità. Invia richieste booking in pochi click.
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Cerca artista, genere, città..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-violet-500 focus:ring-violet-500/20"
            />
            {search && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 text-slate-400 hover:text-white"
                onClick={() => onSearchChange("")}
              >
                Cancella
              </Button>
            )}
          </div>

          {search && (
            <p className="text-xs text-slate-500 mt-3">
              {resultCount} risultat{resultCount === 1 ? "o" : "i"} trovat{resultCount === 1 ? "o" : "i"}
            </p>
          )}
        </div>

        <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 gap-3">
          {["Indie Pop", "Rock", "Jazz", "Elettronica"].map((g) => (
            <button
              key={g}
              onClick={() => onSearchChange(g)}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
            >
              {g}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
