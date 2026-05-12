"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Filters {
  genre: string;
  city: string;
  eventType: string;
  minFee: string;
  maxFee: string;
  available: string;
}

interface ExploreFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const genres = ["all", "Indie Pop", "Rock", "Jazz", "Elettronica", "Pop", "Folk", "R&B", "Indie Rock", "Techno", "Jazz Fusion", "Latino", "Classica"];
const cities = ["all", "Milano", "Roma", "Torino", "Bologna", "Napoli", "Verona"];
const eventTypes = ["all", "Concerto", "Festival", "Club", "Private party", "Corporate", "Aperitivo"];

export default function ExploreFilters({ filters, onChange }: ExploreFiltersProps) {
  const [open, setOpen] = useState(false);

  const update = (key: keyof Filters, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  const clear = () => {
    onChange({ genre: "all", city: "all", eventType: "all", minFee: "", maxFee: "", available: "all" });
  };

  const activeCount = [
    filters.genre !== "all",
    filters.city !== "all",
    filters.eventType !== "all",
    filters.minFee !== "",
    filters.maxFee !== "",
    filters.available !== "all",
  ].filter(Boolean).length;

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-slate-900 mb-2 block">Genere</label>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => (
            <button
              key={g}
              onClick={() => update("genre", g)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.genre === g
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {g === "all" ? "Tutti" : g}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 mb-2 block">Città</label>
        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <button
              key={c}
              onClick={() => update("city", c)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.city === c
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c === "all" ? "Tutte" : c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 mb-2 block">Tipologia evento</label>
        <div className="flex flex-wrap gap-2">
          {eventTypes.map((et) => (
            <button
              key={et}
              onClick={() => update("eventType", et)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.eventType === et
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {et === "all" ? "Tutte" : et}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 mb-2 block">Budget (€)</label>
        <div className="flex items-center gap-3">
          <Input
            type="number"
            placeholder="Min"
            value={filters.minFee}
            onChange={(e) => update("minFee", e.target.value)}
            className="text-sm"
          />
          <span className="text-slate-400">—</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.maxFee}
            onChange={(e) => update("maxFee", e.target.value)}
            className="text-sm"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-900 mb-2 block">Disponibilità</label>
        <div className="flex flex-wrap gap-2">
          {["all", "true", "false"].map((v) => (
            <button
              key={v}
              onClick={() => update("available", v)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                filters.available === v
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {v === "all" ? "Tutti" : v === "true" ? "Disponibili" : "Occupati"}
            </button>
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <Button variant="outline" className="w-full gap-2" onClick={clear}>
          <X className="w-4 h-4" /> Cancella filtri ({activeCount})
        </Button>
      )}
    </div>
  );

  return (
    <div className="flex items-center gap-3">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger className="inline-flex items-center justify-center rounded-lg border border-border bg-background hover:bg-muted hover:text-foreground transition-colors h-8 px-2.5 gap-2 relative text-sm font-medium">
          <SlidersHorizontal className="w-4 h-4" />
          Filtri
          {activeCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] flex items-center justify-center font-bold">
              {activeCount}
            </span>
          )}
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-left">Filtri avanzati</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
