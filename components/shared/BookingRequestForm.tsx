"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingRequestSchema, BookingRequestFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface BookingRequestFormProps {
  artistId?: string;
  venues: { id: string; name: string }[];
  artists: { id: string; name: string }[];
  onSuccess?: () => void;
}

export default function BookingRequestForm({ artistId, venues, artists, onSuccess }: BookingRequestFormProps) {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingRequestFormData>({
    resolver: zodResolver(bookingRequestSchema),
    defaultValues: { artistId: artistId || "" },
  });

  const onSubmit = async (data: BookingRequestFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Richiesta inviata con successo!");
        onSuccess?.();
      } else {
        toast.error("Errore nell'invio della richiesta");
      }
    } catch {
      toast.error("Errore di rete");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label>Artista</Label>
        <select
          {...register("artistId")}
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          disabled={!!artistId}
        >
          <option value="">Seleziona artista</option>
          {artists.map((a) => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
        {errors.artistId && <p className="text-xs text-rose-600 mt-1">{errors.artistId.message}</p>}
      </div>
      <div>
        <Label>Locale</Label>
        <select
          {...register("venueId")}
          className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">Seleziona locale</option>
          {venues.map((v) => (
            <option key={v.id} value={v.id}>{v.name}</option>
          ))}
        </select>
        {errors.venueId && <p className="text-xs text-rose-600 mt-1">{errors.venueId.message}</p>}
      </div>
      <div>
        <Label>Data Evento</Label>
        <Input type="date" {...register("eventDate")} />
        {errors.eventDate && <p className="text-xs text-rose-600 mt-1">{errors.eventDate.message}</p>}
      </div>
      <div>
        <Label>Offerta (€)</Label>
        <Input type="number" {...register("offerAmount")} placeholder="Es. 2500" />
      </div>
      <div>
        <Label>Note</Label>
        <Textarea {...register("notes")} placeholder="Dettagli aggiuntivi..." />
      </div>
      <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700" disabled={submitting}>
        {submitting ? "Invio in corso..." : "Invia Richiesta"}
      </Button>
    </form>
  );
}
