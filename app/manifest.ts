import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "WEBOOKING",
    short_name: "WEBOOKING",
    description: "Marketplace B2B per il booking musicale. Trova artisti, gestisci disponibilità e semplifica il booking tra locali e management.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#f8fafc",
    theme_color: "#7c3aed",
    orientation: "portrait",
    scope: "/",
    icons: [
      {
        src: "/icon-192x192.svg",
        sizes: "192x192",
        type: "image/svg+xml",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.svg",
        sizes: "512x512",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
