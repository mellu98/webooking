import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Music, Search, CalendarCheck, Shield, Zap, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">WEBOOKING</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <a href="#come-funziona" className="hidden sm:inline text-sm text-slate-500 hover:text-slate-900 transition-colors">Come funziona</a>
            <a href="#per-chi" className="hidden sm:inline text-sm text-slate-500 hover:text-slate-900 transition-colors">Per chi è</a>
            <Link href="/explore">
              <Button variant="outline" size="sm" className="gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9">
                <Search className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Esplora</span>
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="bg-violet-600 hover:bg-violet-700 gap-1.5 sm:gap-2 text-xs sm:text-sm h-8 sm:h-9">
                <span className="hidden sm:inline">Accedi</span> <span className="sm:hidden">Entra</span> <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
                <span className="text-xs font-medium text-violet-700">Marketplace B2B per il booking musicale</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.1] mb-6">
                Connetti artisti <br />
                <span className="text-violet-600">e locali</span> in un click
              </h1>
              <p className="text-base sm:text-lg text-slate-500 mb-8 max-w-md leading-relaxed">
                WEBOOKING è la piattaforma dove i booking agent gestiscono artisti, i locali trovano talenti e le trattative diventano semplici.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/explore">
                  <Button size="lg" className="bg-violet-600 hover:bg-violet-700 gap-2 h-12 px-6">
                    <Search className="w-4 h-4" /> Esplora artisti
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="gap-2 h-12 px-6">
                    Dashboard <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-10 text-sm text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> Artisti verificati
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-4 h-4" /> Richieste immediate
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4" /> Tutta Italia
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-200/50 to-slate-200/30 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative">
                    <Image src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=530&fit=crop" alt="Artista" fill className="object-cover" />
                  </div>
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative">
                    <Image src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop" alt="Locale" fill className="object-cover" />
                  </div>
                </div>
                <div className="space-y-3 pt-8">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 relative">
                    <Image src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400&h=400&fit=crop" alt="Band" fill className="object-cover" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 relative">
                    <Image src="https://images.unsplash.com/photo-1545128485-c400e7702796?w=400&h=530&fit=crop" alt="Concerto" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: "250+", label: "Artisti" },
              { value: "120+", label: "Locali" },
              { value: "1.5K", label: "Booking" },
              { value: "€3M+", label: "Transato" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="come-funziona" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Come funziona</h2>
            <p className="text-slate-500 max-w-md mx-auto">Un workflow semplice e trasparente per connettere artisti e locali.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Esplora",
                description: "Sfoglia il marketplace, filtra per genere, budget e città. Trova l'artista perfetto per il tuo evento.",
                icon: Search,
              },
              {
                step: "02",
                title: "Richiedi",
                description: "Invia una richiesta booking con data, budget e dettagli. Ricevi una risposta in 24h.",
                icon: CalendarCheck,
              },
              {
                step: "03",
                title: "Conferma",
                description: "Il booking agent gestisce la trattativa. Una volta confermato, l'evento viene pianificato.",
                icon: Shield,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.step} className="relative">
                  <div className="text-5xl font-bold text-slate-100 absolute -top-4 left-0 select-none">{item.step}</div>
                  <div className="relative pt-8">
                    <div className="w-10 h-10 rounded-lg bg-violet-50 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-violet-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For who */}
      <section id="per-chi" className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Per chi è WEBOOKING</h2>
            <p className="text-slate-500 max-w-md mx-auto">Tre ruoli, un'unica piattaforma per semplificare il booking.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Booking Agent", desc: "Gestisci il roster, le disponibilità e la pipeline delle richieste. Massimizza il revenue dei tuoi artisti.", color: "violet" },
              { title: "Locali & Venue", desc: "Trova artisti verificati, confronta cachet e disponibilità. Invia richieste e monitora lo stato.", color: "emerald" },
              { title: "Artisti", desc: "Aumenta la tua visibilità, gestisci il calendario e ricevi richieste da locali di tutta Italia.", color: "amber" },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-10 h-10 rounded-lg bg-${item.color}-50 flex items-center justify-center mb-4`}>
                  <Music className={`w-5 h-5 text-${item.color}-600`} />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Pronto a trasformare il tuo booking?</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Entra nella piattaforma e scopri come semplificare il workflow tra artisti e locali.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/explore">
              <Button size="lg" className="bg-violet-600 hover:bg-violet-700 gap-2 h-12 px-8">
                Esplora Artisti <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="gap-2 h-12 px-8">
                Vai alla Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
              <Music className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold text-slate-900">WEBOOKING</span>
          </div>
          <p className="text-xs text-slate-400">© 2025 WEBOOKING. Marketplace B2B per il booking musicale.</p>
        </div>
      </footer>
    </div>
  );
}
