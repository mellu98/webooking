"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Calendar, MapPin, User, Euro, Mail, Phone, FileText, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

const bookingSchema = z.object({
  artistId: z.string().min(1, "Seleziona un artista"),
  venueName: z.string().min(1, "Nome venue obbligatorio"),
  contactName: z.string().min(1, "Nome referente obbligatorio"),
  contactEmail: z.string().email("Email non valida"),
  contactPhone: z.string().optional(),
  eventDate: z.string().min(1, "Data obbligatoria"),
  eventCity: z.string().min(1, "Città obbligatoria"),
  budget: z.string().min(1, "Budget obbligatorio"),
  eventType: z.string().min(1, "Tipologia evento obbligatoria"),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface BookingDialogProps {
  artistId: string;
  artistName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function BookingDialog({ artistId, artistName, open, onOpenChange, onSuccess }: BookingDialogProps) {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      artistId,
      eventType: "Concerto",
    },
  });

  const budget = watch("budget");

  const onSubmit = async (data: BookingFormData) => {
    setSubmitting(true);
    try {
      // Create a venue first (simplified flow: create venue from form data)
      const venueRes = await fetch("/api/venues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.venueName,
          city: data.eventCity,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
        }),
      });
      const venue = await venueRes.json();

      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          artistId: data.artistId,
          venueId: venue.id,
          eventDate: new Date(data.eventDate).toISOString(),
          eventCity: data.eventCity,
          budget: Number(data.budget),
          offerAmount: Number(data.budget),
          eventType: data.eventType,
          notes: data.notes,
          contactName: data.contactName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,
          status: "NEW",
        }),
      });

      if (res.ok) {
        setDone(true);
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

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setStep(1);
      setDone(false);
      reset();
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {done ? "Richiesta Inviata!" : `Richiedi Booking — ${artistName}`}
          </DialogTitle>
        </DialogHeader>

        {done ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto">
              <PartyPopper className="w-8 h-8 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Richiesta inviata!</h3>
              <p className="text-sm text-slate-500 mt-1">
                Il booking agent riceverà la tua richiesta e ti contatterà al più presto.
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2 text-sm">
              <p className="flex items-center gap-2"><User className="w-4 h-4 text-violet-600" /> {watch("contactName")}</p>
              <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-violet-600" /> {watch("contactEmail")}</p>
              <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-violet-600" /> {watch("eventDate")}</p>
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-violet-600" /> {watch("eventCity")}</p>
              <p className="flex items-center gap-2"><Euro className="w-4 h-4 text-violet-600" /> {Number(watch("budget") || 0).toLocaleString("it-IT")} €</p>
            </div>
            <Button onClick={handleClose} className="bg-violet-600 hover:bg-violet-700 w-full">
              Chiudi
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <Label className="flex items-center gap-2"><User className="w-3.5 h-3.5" /> Nome referente *</Label>
                  <Input {...register("contactName")} placeholder="Mario Rossi" />
                  {errors.contactName && <p className="text-xs text-rose-600 mt-1">{errors.contactName.message}</p>}
                </div>
                <div>
                  <Label className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Email *</Label>
                  <Input type="email" {...register("contactEmail")} placeholder="mario@locale.it" />
                  {errors.contactEmail && <p className="text-xs text-rose-600 mt-1">{errors.contactEmail.message}</p>}
                </div>
                <div>
                  <Label className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> Telefono</Label>
                  <Input {...register("contactPhone")} placeholder="+39 333 1234567" />
                </div>
                <div>
                  <Label className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Nome Venue / Locale *</Label>
                  <Input {...register("venueName")} placeholder="Lanificio 159" />
                  {errors.venueName && <p className="text-xs text-rose-600 mt-1">{errors.venueName.message}</p>}
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <Label className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Data evento *</Label>
                  <Input type="date" {...register("eventDate")} />
                  {errors.eventDate && <p className="text-xs text-rose-600 mt-1">{errors.eventDate.message}</p>}
                </div>
                <div>
                  <Label className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Città evento *</Label>
                  <Input {...register("eventCity")} placeholder="Roma" />
                  {errors.eventCity && <p className="text-xs text-rose-600 mt-1">{errors.eventCity.message}</p>}
                </div>
                <div>
                  <Label className="flex items-center gap-2"><Euro className="w-3.5 h-3.5" /> Budget (€) *</Label>
                  <Input type="number" {...register("budget")} placeholder="2500" />
                  {errors.budget && <p className="text-xs text-rose-600 mt-1">{errors.budget.message}</p>}
                </div>
                <div>
                  <Label>Tipologia evento *</Label>
                  <select
                    {...register("eventType")}
                    className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="Concerto">Concerto</option>
                    <option value="Festival">Festival</option>
                    <option value="Club">Club</option>
                    <option value="Private party">Private party</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Aperitivo">Aperitivo</option>
                  </select>
                  {errors.eventType && <p className="text-xs text-rose-600 mt-1">{errors.eventType.message}</p>}
                </div>
                <div>
                  <Label className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> Note aggiuntive</Label>
                  <Textarea {...register("notes")} placeholder="Dettagli sul evento, richieste tecniche..." />
                </div>
              </>
            )}

            <div className="flex items-center justify-between pt-2">
              {step === 2 && (
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Indietro
                </Button>
              )}
              {step === 1 && <div />}
              {step === 1 ? (
                <Button
                  type="button"
                  className="bg-violet-600 hover:bg-violet-700 gap-2"
                  onClick={() => setStep(2)}
                >
                  Avanti <Check className="w-4 h-4" />
                </Button>
              ) : (
                <Button type="submit" className="bg-violet-600 hover:bg-violet-700 gap-2" disabled={submitting}>
                  {submitting ? "Invio in corso..." : "Invia Richiesta"}
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2 justify-center pt-2">
              {[1, 2].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all ${
                    s === step ? "w-6 bg-violet-600" : "w-1.5 bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
