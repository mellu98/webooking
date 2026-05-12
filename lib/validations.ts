import { z } from "zod";

export const artistSchema = z.object({
  name: z.string().min(1, "Nome obbligatorio"),
  genre: z.string().min(1, "Genere obbligatorio"),
  city: z.string().min(1, "Città obbligatoria"),
  bio: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal("")),
  fee: z.coerce.number().min(0, "Cachet non valido"),
  available: z.boolean().default(true),
});

export type ArtistFormData = z.infer<typeof artistSchema>;

export const bookingRequestSchema = z.object({
  artistId: z.string().min(1, "Seleziona un artista"),
  venueId: z.string().min(1, "Seleziona un venue"),
  eventDate: z.string().min(1, "Data obbligatoria"),
  offerAmount: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export type BookingRequestFormData = z.infer<typeof bookingRequestSchema>;

export const requestStatusSchema = z.object({
  status: z.enum(["NEW", "IN_NEGOTIATION", "CONFIRMED", "REJECTED"]),
});
