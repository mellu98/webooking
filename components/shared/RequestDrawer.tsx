"use client";

import { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import StatusBadge from "./StatusBadge";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Calendar, MapPin, User, Euro, FileText } from "lucide-react";
import { toast } from "sonner";

interface RequestDrawerProps {
  request: any;
  open: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export default function RequestDrawer({ request, open, onClose, onUpdate }: RequestDrawerProps) {
  const [loading, setLoading] = useState(false);

  if (!request) return null;

  const updateStatus = async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/requests/${request.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success(`Richiesta ${status === "CONFIRMED" ? "confermata" : status === "REJECTED" ? "rifiutata" : "aggiornata"}`);
        if (status === "CONFIRMED") {
          await fetch("/api/events", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: `${request.artist.name} @ ${request.venue.name}`,
              date: request.eventDate,
              city: request.venue.city,
              fee: request.offerAmount || request.artist.fee,
              requestId: request.id,
              artistId: request.artistId,
              venueId: request.venueId,
            }),
          });
          toast.success("Evento creato automaticamente");
        }
        onUpdate?.();
        onClose();
      }
    } catch (e) {
      toast.error("Errore durante l'aggiornamento");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="sm:max-w-lg">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-semibold">Dettaglio Richiesta</DrawerTitle>
        </DrawerHeader>
        <div className="px-6 py-4 space-y-5">
          <div className="flex items-center justify-between">
            <StatusBadge status={request.status} />
            <span className="text-sm text-slate-500">{formatDate(request.createdAt)}</span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-violet-600" />
              <div>
                <p className="text-xs text-slate-500">Artista</p>
                <p className="text-sm font-medium text-slate-900">{request.artist.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-violet-600" />
              <div>
                <p className="text-xs text-slate-500">Venue</p>
                <p className="text-sm font-medium text-slate-900">{request.venue.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-violet-600" />
              <div>
                <p className="text-xs text-slate-500">Data Evento</p>
                <p className="text-sm font-medium text-slate-900">{formatDate(request.eventDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Euro className="w-4 h-4 text-violet-600" />
              <div>
                <p className="text-xs text-slate-500">Offerta</p>
                <p className="text-sm font-medium text-slate-900">{request.offerAmount ? formatCurrency(request.offerAmount) : "Non specificata"}</p>
              </div>
            </div>
            {request.notes && (
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 text-violet-600 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-500">Note</p>
                  <p className="text-sm text-slate-700">{request.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <DrawerFooter className="flex-col sm:flex-row gap-3">
          {request.status === "NEW" || request.status === "IN_NEGOTIATION" ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => updateStatus("REJECTED")}
                disabled={loading}
              >
                Rifiuta
              </Button>
              <Button
                className="flex-1 bg-violet-600 hover:bg-violet-700"
                onClick={() => updateStatus("CONFIRMED")}
                disabled={loading}
              >
                Conferma
              </Button>
            </>
          ) : (
            <Button variant="outline" className="w-full" onClick={onClose}>
              Chiudi
            </Button>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
