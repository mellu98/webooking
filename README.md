# WEBOOKING

**Marketplace B2B per il booking musicale.** Piattaforma che connette booking agent, artisti e locali in un unico workflow semplice e trasparente. Costruito con Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma e SQLite.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **Prisma ORM**
- **SQLite** (sviluppo)
- **Clerk** (auth — mock in dev)
- **Recharts** (grafici)

## Funzionalità

### Marketplace
- **Landing page** — Hero premium, stats, come funziona, CTA
- **Esplora artisti** — Grid responsive con ricerca full-text, filtri avanzati (genere, città, budget, tipologia evento, disponibilità)
- **Dettaglio artista** — Hero con immagine, bio, calendario disponibilità, eventi recenti, sidebar sticky con CTA booking
- **Card artista premium** — Foto, badge disponibilità, rating, cachet, tipologie evento, hover animation

### Booking Flow
- **Richiesta booking** — Dialog a 2 step con dati referente, venue, data, budget, tipologia evento
- **Pipeline richieste** — Vista kanban con 4 colonne (Nuove, In trattativa, Confermate, Rifiutate) + vista lista
- **Dettaglio richiesta** — Drawer con info venue/artista, budget, cronologia, azioni rapide (conferma/rifiuta)

### Dashboard
- **Dashboard Agent** — KPI (richieste nuove, eventi confermati, artisti attivi, revenue), grafico revenue, richieste recenti, prossimi eventi
- **Dashboard Venue** — KPI mirati per i locali (richieste inviate, booking confermati, artisti salvati, spesa)
- **Onboarding** — Scelta ruolo (Booking Agent / Venue / Artista) con UI moderna

### Ruoli
- **BOOKING_AGENT** — Gestisce artisti, disponibilità, riceve richieste, approva/rifiuta, vede pipeline
- **VENUE** — Esplora artisti, filtra, invia richieste, monitora stato, vede storico
- **ARTIST** — Profilo pubblico, gestisce disponibilità, vede richieste in arrivo

## Installazione

```bash
# 1. Clona il repo e entra nella cartella
cd webooking

# 2. Installa le dipendenze
npm install

# 3. Crea il file .env e configura le variabili
cp .env.example .env

# 4. Setup database SQLite
npx prisma migrate dev --name init
npx prisma generate

# 5. Popola il database con dati demo
npm run db:seed

# 6. Avvia il server di sviluppo
npm run dev
```

L'app è disponibile su [http://localhost:3000](http://localhost:3000).

## Variabili d'ambiente

| Variabile | Descrizione |
|-----------|-------------|
| `DATABASE_URL` | URL di connessione database (`file:./dev.db`) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Publishable key di Clerk (opzionale in dev) |
| `CLERK_SECRET_KEY` | Secret key di Clerk (opzionale in dev) |

## Script utili

```bash
npm run dev          # Avvia in modalità sviluppo
npm run build        # Build di produzione (include prisma generate)
npm run start        # Avvia il server di produzione
npm run db:migrate   # Crea ed applica migrazioni Prisma
npm run db:deploy    # Deploy migrazioni su production
npm run db:seed      # Popola il DB con dati demo
npm run db:generate  # Genera il client Prisma
```

## Routing

| Route | Descrizione | Ruoli |
|-------|-------------|-------|
| `/` | Landing page marketplace | Tutti |
| `/onboarding` | Scelta ruolo iniziale | Tutti |
| `/dashboard` | Dashboard con KPI | Tutti |
| `/explore` | Marketplace artisti | Tutti |
| `/artists` | Gestione artisti (CRUD) | BOOKING_AGENT |
| `/artists/[id]` | Dettaglio artista pubblico | Tutti |
| `/requests` | Pipeline richieste booking | Tutti |
| `/events` | Lista eventi | Tutti |
| `/profile` | Profilo utente | Tutti |
| `/settings` | Impostazioni | Tutti |

## API Routes

| Endpoint | Metodi | Descrizione |
|----------|--------|-------------|
| `/api/artists` | GET, POST | Lista artisti con filtri; crea artista |
| `/api/artists/[id]` | GET, PUT, DELETE | Dettaglio artista con availability ed eventi |
| `/api/venues` | GET, POST | Lista venue; crea venue |
| `/api/requests` | GET, POST | Lista richieste con filtri; crea richiesta |
| `/api/requests/[id]` | GET, PUT | Dettaglio richiesta; aggiorna stato |
| `/api/events` | GET, POST | Lista eventi; crea evento |
| `/api/payments` | GET, POST | Lista pagamenti; crea pagamento |

## Seed dati demo

```bash
npm run db:seed
```

Crea:
- 12 artisti realistici (generi vari, città italiane, rating, tipologie evento)
- 7 venue (locali noti con tipologia)
- 12 richieste booking in vari stati
- 3 eventi confermati
- 3 pagamenti demo
- Disponibilità calendario per 30 giorni

## Schema Database

```prisma
User              → clerkId, email, name, role (BOOKING_AGENT | VENUE | ARTIST)
Artist            → name, slug, genre, city, bio, imageUrl, gallery, social, rating, eventTypes, fee, available
Venue             → name, city, address, capacity, type, imageUrl, contactName, contactEmail, contactPhone
BookingRequest    → status, eventDate, eventCity, offerAmount, budget, notes, contactName, contactEmail, contactPhone, eventType
Event             → name, date, city, fee, status (PLANNED | COMPLETED | CANCELLED)
Payment           → amount, status, paidAt
Availability      → date, available, note
```

## Componenti nuovi

- `ArtistCard` — Card artista premium con badge, rating, CTA
- `MarketplaceHero` — Hero section dark per /explore
- `ExploreFilters` — Filtri avanzati in sheet laterale
- `BookingDialog` — Dialog booking a 2 step con conferma
- `RequestKanban` — Vista kanban pipeline richieste
- `AvailabilityCalendar` — Calendario disponibilità (integrato in artist detail)

## Design System

- **Colori**: slate + violet accent
- **Dark sidebar**: `bg-slate-950`
- **Cards**: `border-slate-200`, `shadow-sm`, `hover:shadow-md`
- **Badges**: color-coded per stato
- **Tipografia**: Inter, tracking-tight
- **Icone**: Lucide React
- **UI Framework**: shadcn/ui + Tailwind CSS v4

## Struttura progetto

```
app/
  page.tsx                 → Landing page marketplace
  onboarding/page.tsx      → Scelta ruolo
  layout.tsx               → Root layout con auth provider
  (auth)/login/            → Pagina login
  (dashboard)/
    layout.tsx             → Layout con sidebar + topbar
    dashboard/page.tsx     → Dashboard KPI
    artists/page.tsx       → CRUD artisti
    artists/[id]/page.tsx  → Dettaglio artista pubblico
    explore/page.tsx       → Marketplace artisti
    requests/page.tsx      → Pipeline richieste (kanban + lista)
    events/page.tsx        → Lista eventi
    profile/page.tsx       → Profilo utente
    settings/page.tsx      → Impostazioni
  api/                     → Route handlers
components/
  layout/                  → AppSidebar, Topbar, ClerkOrMock
  shared/                  → ArtistCard, BookingDialog, ExploreFilters, MarketplaceHero, etc.
  ui/                      → Componenti shadcn/ui
lib/                       → prisma.ts, utils.ts, validations.ts
prisma/                    → schema.prisma, seed.ts
```

## Note

- In modalità sviluppo l'auth è mockata (`ClerkOrMock.tsx`). L'utente ha sempre ruolo `BOOKING_AGENT`.
- Per attivare Clerk reale, configura le variabili d'ambiente e aggiorna `middleware.ts`.
- Le immagini usano URL esterni (Unsplash) per semplicità. `next.config.ts` ha `images: { unoptimized: true }`.
- Il database è SQLite per semplicità MVP. Per produzione passare a PostgreSQL aggiornando `datasource db` in `schema.prisma`.
