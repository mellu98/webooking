import { prisma } from "../lib/prisma";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  await prisma.payment.deleteMany();
  await prisma.event.deleteMany();
  await prisma.bookingRequest.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.artist.deleteMany();
  await prisma.venue.deleteMany();
  await prisma.user.deleteMany();

  const agent = await prisma.user.create({
    data: {
      clerkId: "agent_clerk_1",
      email: "agent@webooking.it",
      name: "Marco Rossi",
      role: "BOOKING_AGENT",
    },
  });

  const venueUsers = await prisma.user.createMany({
    data: [
      { clerkId: "venue_clerk_1", email: "lanificio@webooking.it", name: "Lanificio 159", role: "VENUE" },
      { clerkId: "venue_clerk_2", email: "circolo@webooking.it", name: "Circolo degli Artisti", role: "VENUE" },
      { clerkId: "venue_clerk_3", email: "magazzini@webooking.it", name: "Magazzini Generali", role: "VENUE" },
      { clerkId: "venue_clerk_4", email: "covo@webooking.it", name: "Covo Club", role: "VENUE" },
    ],
  });

  const artistUsers = await prisma.user.createMany({
    data: [
      { clerkId: "artist_clerk_1", email: "giulia@webooking.it", name: "Giulia Bianchi", role: "ARTIST" },
      { clerkId: "artist_clerk_2", email: "luca@webooking.it", name: "Luca Verdi", role: "ARTIST" },
      { clerkId: "artist_clerk_3", email: "sofia@webooking.it", name: "Sofia Marino", role: "ARTIST" },
    ],
  });

  const allUsers = await prisma.user.findMany();
  const venueUserList = allUsers.filter((u) => u.role === "VENUE");
  const artistUserList = allUsers.filter((u) => u.role === "ARTIST");

  const artistData = [
    { name: "Giulia Bianchi", genre: "Indie Pop", city: "Milano", bio: "Cantautrice milanese con voce soul e arrangiamenti elettronici. Ha aperto i concerti di Dua Lipa e Calvin Harris.", fee: 2500, available: true, imageUrl: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?w=800&h=800&fit=crop", rating: 4.8, eventTypes: "Concerto, Festival, Private party" },
    { name: "Luca Verdi", genre: "Rock", city: "Roma", bio: "Band rock romana con energia da stadio. 3 album all'attivo e tour in tutta Italia.", fee: 3000, available: true, imageUrl: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800&h=800&fit=crop", rating: 4.6, eventTypes: "Concerto, Festival" },
    { name: "Sofia Marino", genre: "Jazz", city: "Torino", bio: "Trio jazz torinese che reinterpreta standard con un tocco contemporaneo. Perfetta per eventi esclusivi.", fee: 1800, available: true, imageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&h=800&fit=crop", rating: 4.9, eventTypes: "Private party, Aperitivo, Corporate" },
    { name: "Marco Neri", genre: "Elettronica", city: "Bologna", bio: "DJ/producer bolognese specializzato in house e techno. Resident ai Magazzini Generali.", fee: 2200, available: false, imageUrl: "https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=800&h=800&fit=crop", rating: 4.5, eventTypes: "Club, Festival, Afterparty" },
    { name: "Elena Russo", genre: "Pop", city: "Napoli", bio: "Cantante pop napoletana con oltre 500k ascoltatori mensili. Show ad alto impatto visivo.", fee: 3500, available: true, imageUrl: "https://images.unsplash.com/photo-1526218626217-dc65a29bb444?w=800&h=800&fit=crop", rating: 4.7, eventTypes: "Concerto, Festival, Corporate" },
    { name: "Davide Gallo", genre: "Folk", city: "Milano", bio: "Cantautore folk acustico con testi in italiano. Atmosfera intima e coinvolgente.", fee: 1500, available: true, imageUrl: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&h=800&fit=crop", rating: 4.3, eventTypes: "Aperitivo, Private party, Concerto" },
    { name: "Anna Costa", genre: "R&B", city: "Roma", bio: "Voce R&B soulful con influenze neosoul e hip-hop. Band completa di 5 elementi.", fee: 2800, available: true, imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=800&fit=crop", rating: 4.6, eventTypes: "Club, Concerto, Private party" },
    { name: "Matteo Ferrari", genre: "Indie Rock", city: "Bologna", bio: "Band indie bolognese con sound british e testi in inglese. Appena tornati dal tour europeo.", fee: 2000, available: true, imageUrl: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=800&h=800&fit=crop", rating: 4.4, eventTypes: "Concerto, Festival, Club" },
    { name: "Chiara Benedetti", genre: "Techno", city: "Milano", bio: "DJ techno con set ipnotici e percussivi. Ha suonato a Movement Torino e Awakenings.", fee: 2600, available: true, imageUrl: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&h=800&fit=crop", rating: 4.7, eventTypes: "Club, Festival, Afterparty" },
    { name: "Francesco Leone", genre: "Jazz Fusion", city: "Roma", bio: "Quartetto jazz-fusion che mescola improvvisazione e groove elettronico. Ideale per eventi di classe.", fee: 3200, available: true, imageUrl: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=800&fit=crop", rating: 4.8, eventTypes: "Corporate, Private party, Festival" },
    { name: "Marta Esposito", genre: "Latino", city: "Napoli", bio: "Cantante latino-pop con band di 8 elementi. Salsa, bachata e reggaeton per serate infuocate.", fee: 3800, available: true, imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=800&fit=crop", rating: 4.5, eventTypes: "Festival, Club, Private party" },
    { name: "Alessandro Ricci", genre: "Classica", city: "Torino", bio: "Pianista classico e compositore. Repertorio da Bach a Einaudi, arrangiamenti personali.", fee: 1800, available: true, imageUrl: "https://images.unsplash.com/photo-1552422535-c45813c61732?w=800&h=800&fit=crop", rating: 4.9, eventTypes: "Corporate, Private party, Matrimonio" },
  ];

  const artists = await prisma.artist.createMany({
    data: artistData.map((a, i) => ({
      ...a,
      slug: slugify(a.name),
      userId: i < 3 ? artistUserList[i]?.id : undefined,
    })),
  });

  const allArtists = await prisma.artist.findMany();

  const venueData = [
    { name: "Lanificio 159", city: "Roma", address: "Via di Pietralata 159", capacity: 800, imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=500&fit=crop", type: "Club", contactName: "Paolo Rossi", contactEmail: "booking@lanificio159.it", contactPhone: "+39 06 1234567", userId: venueUserList[0]?.id },
    { name: "Circolo degli Artisti", city: "Roma", address: "Via Casilina Vecchia 42", capacity: 600, imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop", type: "Club", contactName: "Laura Bianchi", contactEmail: "info@circoloartisti.it", contactPhone: "+39 06 7654321", userId: venueUserList[1]?.id },
    { name: "Magazzini Generali", city: "Milano", address: "Via Pietrasanta 14", capacity: 1200, imageUrl: "https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=500&fit=crop", type: "Discoteca", contactName: "Andrea Neri", contactEmail: "events@magazzinigenerali.it", contactPhone: "+39 02 9876543", userId: venueUserList[2]?.id },
    { name: "Covo Club", city: "Bologna", address: "Viale Zagabria 1", capacity: 400, imageUrl: "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&h=500&fit=crop", type: "Club", contactName: "Silvia Verdi", contactEmail: "booking@covoclub.it", contactPhone: "+39 051 1122334" },
    { name: "Hiroshima Mon Amour", city: "Torino", address: "Via Bossoli 83", capacity: 500, imageUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=800&h=500&fit=crop", type: "Club", contactName: "Marco Gialli", contactEmail: "eventi@hiroshima.to.it", contactPhone: "+39 011 5566778" },
    { name: "Teatro Romano", city: "Verona", address: "Via Teatro Romano 1", capacity: 2000, imageUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800&h=500&fit=crop", type: "Teatro", contactName: "Giulia Rossi", contactEmail: "booking@teatroromano.it", contactPhone: "+39 045 3344556" },
    { name: "Arena Fiera", city: "Bologna", address: "Viale della Fiera 20", capacity: 5000, imageUrl: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&h=500&fit=crop", type: "Arena", contactName: "Roberto Bianchi", contactEmail: "events@arenafiera.it", contactPhone: "+39 051 9988776" },
  ];

  const venues = await prisma.venue.createMany({ data: venueData });
  const allVenues = await prisma.venue.findMany();

  // Create availability for some artists
  const today = new Date();
  const availabilityData: any[] = [];
  allArtists.forEach((artist) => {
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      const isAvailable = Math.random() > 0.3;
      availabilityData.push({
        date,
        available: isAvailable,
        note: isAvailable ? undefined : "Già impegnato",
        artistId: artist.id,
      });
    }
  });
  await prisma.availability.createMany({ data: availabilityData });

  const requestsData = [
    { status: "NEW" as const, eventDate: new Date("2025-06-15"), offerAmount: 2500, budget: 3000, notes: "Concerto estivo all'aperto, attesi 500 ospiti. Serve impianto audio proprio.", eventType: "Concerto", eventCity: "Roma", contactName: "Paolo Rossi", contactEmail: "booking@lanificio159.it", contactPhone: "+39 06 1234567", artistId: allArtists[0].id, venueId: allVenues[0].id, sentById: venueUserList[0]?.id, managedById: agent.id },
    { status: "IN_NEGOTIATION" as const, eventDate: new Date("2025-07-20"), offerAmount: 3000, budget: 3500, notes: "Festa privata per azienda tech. Richiesta scaletta personalizzata.", eventType: "Private party", eventCity: "Roma", contactName: "Laura Bianchi", contactEmail: "info@circoloartisti.it", contactPhone: "+39 06 7654321", artistId: allArtists[1].id, venueId: allVenues[1].id, sentById: venueUserList[1]?.id, managedById: agent.id },
    { status: "CONFIRMED" as const, eventDate: new Date("2025-05-10"), offerAmount: 1800, budget: 2000, notes: "Serata jazz per evento esclusivo. Menu gourmet incluso.", eventType: "Private party", eventCity: "Torino", contactName: "Marco Gialli", contactEmail: "eventi@hiroshima.to.it", contactPhone: "+39 011 5566778", artistId: allArtists[2].id, venueId: allVenues[4].id, sentById: venueUserList[0]?.id, managedById: agent.id },
    { status: "REJECTED" as const, eventDate: new Date("2025-08-05"), offerAmount: 2200, budget: 2500, notes: "Evento elettronico in piazza. Budget troppo basso per l'artista.", eventType: "Festival", eventCity: "Milano", contactName: "Andrea Neri", contactEmail: "events@magazzinigenerali.it", contactPhone: "+39 02 9876543", artistId: allArtists[3].id, venueId: allVenues[2].id, sentById: venueUserList[1]?.id, managedById: agent.id },
    { status: "NEW" as const, eventDate: new Date("2025-09-12"), offerAmount: 3500, budget: 4000, notes: "Concerto principale della stagione. Richiesta presenza ore 20:00.", eventType: "Concerto", eventCity: "Bologna", contactName: "Silvia Verdi", contactEmail: "booking@covoclub.it", contactPhone: "+39 051 1122334", artistId: allArtists[4].id, venueId: allVenues[3].id, sentById: venueUserList[0]?.id, managedById: agent.id },
    { status: "IN_NEGOTIATION" as const, eventDate: new Date("2025-06-22"), offerAmount: 1500, budget: 1800, notes: "Acoustic night intima. Capacità 100 persone.", eventType: "Concerto", eventCity: "Roma", contactName: "Paolo Rossi", contactEmail: "booking@lanificio159.it", contactPhone: "+39 06 1234567", artistId: allArtists[5].id, venueId: allVenues[0].id, sentById: venueUserList[1]?.id, managedById: agent.id },
    { status: "CONFIRMED" as const, eventDate: new Date("2025-07-08"), offerAmount: 2800, budget: 3000, notes: "Soul night con cena inclusa. Evento ricorrente mensile.", eventType: "Club", eventCity: "Roma", contactName: "Laura Bianchi", contactEmail: "info@circoloartisti.it", contactPhone: "+39 06 7654321", artistId: allArtists[6].id, venueId: allVenues[1].id, sentById: venueUserList[0]?.id, managedById: agent.id },
    { status: "NEW" as const, eventDate: new Date("2025-10-01"), offerAmount: 2000, budget: 2200, notes: "Indie festival con 5 band. Backline condiviso.", eventType: "Festival", eventCity: "Milano", contactName: "Andrea Neri", contactEmail: "events@magazzinigenerali.it", contactPhone: "+39 02 9876543", artistId: allArtists[7].id, venueId: allVenues[2].id, sentById: venueUserList[1]?.id, managedById: agent.id },
    { status: "IN_NEGOTIATION" as const, eventDate: new Date("2025-11-15"), offerAmount: 3200, budget: 3500, notes: "Special event per lancio prodotto. Brand activation richiesta.", eventType: "Corporate", eventCity: "Bologna", contactName: "Roberto Bianchi", contactEmail: "events@arenafiera.it", contactPhone: "+39 051 9988776", artistId: allArtists[0].id, venueId: allVenues[6].id, sentById: venueUserList[0]?.id, managedById: agent.id },
    { status: "CONFIRMED" as const, eventDate: new Date("2025-05-25"), offerAmount: 2600, budget: 2800, notes: "Spring party con tema floreale. Attesi 300 ospiti.", eventType: "Private party", eventCity: "Torino", contactName: "Marco Gialli", contactEmail: "eventi@hiroshima.to.it", contactPhone: "+39 011 5566778", artistId: allArtists[1].id, venueId: allVenues[4].id, sentById: venueUserList[1]?.id, managedById: agent.id },
    { status: "NEW" as const, eventDate: new Date("2025-08-20"), offerAmount: 4000, budget: 4500, notes: "Concerto in arena per 2000 persone. Supporto tecnico completo.", eventType: "Concerto", eventCity: "Verona", contactName: "Giulia Rossi", contactEmail: "booking@teatroromano.it", contactPhone: "+39 045 3344556", artistId: allArtists[10].id, venueId: allVenues[5].id, sentById: venueUserList[0]?.id, managedById: agent.id },
    { status: "IN_NEGOTIATION" as const, eventDate: new Date("2025-09-05"), offerAmount: 1900, budget: 2200, notes: "Piano solo per cena di gala aziendale. Repertorio personalizzabile.", eventType: "Corporate", eventCity: "Torino", contactName: "Marco Gialli", contactEmail: "eventi@hiroshima.to.it", contactPhone: "+39 011 5566778", artistId: allArtists[11].id, venueId: allVenues[4].id, sentById: venueUserList[1]?.id, managedById: agent.id },
  ];

  await prisma.bookingRequest.createMany({ data: requestsData });

  const confirmedRequests = await prisma.bookingRequest.findMany({ where: { status: "CONFIRMED" } });

  const eventsData = confirmedRequests.map((req, i) => ({
    name: `${req.eventType} — ${req.eventCity}`,
    date: req.eventDate,
    city: req.eventCity || "Italia",
    fee: req.offerAmount || 0,
    status: i === 2 ? "COMPLETED" as const : "PLANNED" as const,
    requestId: req.id,
    artistId: req.artistId,
    venueId: req.venueId,
  }));

  await prisma.event.createMany({ data: eventsData });

  const allEvents = await prisma.event.findMany();

  await prisma.payment.createMany({
    data: [
      { amount: 1800, status: "PAID", paidAt: new Date("2025-04-01"), eventId: allEvents[0].id },
      { amount: 2800, status: "PENDING", eventId: allEvents[1].id },
      { amount: 2600, status: "PAID", paidAt: new Date("2025-05-01"), eventId: allEvents[2].id },
    ],
  });

  console.log("Seed completato!");
  console.log(`- ${allArtists.length} artisti`);
  console.log(`- ${allVenues.length} venue`);
  console.log(`- ${requestsData.length} richieste`);
  console.log(`- ${allEvents.length} eventi`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
