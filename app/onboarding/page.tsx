"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Building2, Mic2, ArrowRight, Check, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RoleOption = "BOOKING_AGENT" | "VENUE" | "ARTIST";

const roles = [
  {
    id: "BOOKING_AGENT" as RoleOption,
    title: "Booking Agent",
    subtitle: "Management",
    description: "Gestisci artisti, disponibilità e trattative. Ricevi richieste dai locali.",
    icon: Briefcase,
    features: ["Crea profili artisti", "Gestisci richieste", "Pipeline booking", "Revenue tracking"],
    color: "violet",
  },
  {
    id: "VENUE" as RoleOption,
    title: "Locale / Venue",
    subtitle: "Promotore",
    description: "Trova artisti, filtra per genere e budget. Invia richieste booking.",
    icon: Building2,
    features: ["Esplora artisti", "Filtri avanzati", "Invia richieste", "Storico eventi"],
    color: "emerald",
  },
  {
    id: "ARTIST" as RoleOption,
    title: "Artista",
    subtitle: "Performer",
    description: "Gestisci il tuo profilo, disponibilità e richieste in arrivo.",
    icon: Mic2,
    features: ["Profilo pubblico", "Disponibilità", "Richieste", "Eventi"],
    color: "amber",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<RoleOption | null>(null);

  const handleContinue = () => {
    if (selected) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="flex items-center gap-2 px-6 py-4">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <Music className="w-4 h-4 text-white" />
        </div>
        <span className="text-lg font-bold text-slate-900 tracking-tight">WEBOOKING</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Benvenuto su WEBOOKING
            </h1>
            <p className="text-base text-slate-500 max-w-md mx-auto">
              Seleziona il tuo ruolo per personalizzare la tua esperienza sulla piattaforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = selected === role.id;

              return (
                <button
                  key={role.id}
                  onClick={() => setSelected(role.id)}
                  className={cn(
                    "relative text-left rounded-2xl border-2 p-6 transition-all duration-300 group",
                    isSelected
                      ? "border-violet-600 bg-violet-50/50 shadow-lg shadow-violet-100"
                      : "border-slate-200 bg-white hover:border-violet-300 hover:shadow-md"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}

                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors",
                      isSelected
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">
                    {role.subtitle}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{role.title}</h3>
                  <p className="text-sm text-slate-500 mb-4 leading-relaxed">{role.description}</p>

                  <div className="space-y-2">
                    {role.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-slate-500">
                        <div className={cn("w-1 h-1 rounded-full", isSelected ? "bg-violet-500" : "bg-slate-300")} />
                        {f}
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-700 gap-2 px-8 h-12 text-base disabled:opacity-50"
              disabled={!selected}
              onClick={handleContinue}
            >
              Inizia <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
