import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/layout/ClerkOrMock";
import { ServiceWorkerRegistration } from "@/components/layout/ServiceWorkerRegistration";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEBOOKING — Marketplace B2B per il Booking Musicale",
  description: "Trova artisti, gestisci disponibilità e semplifica il booking tra locali e management.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WEBOOKING",
  },
  icons: {
    apple: "/icon-192x192.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="it">
        <body className={`${inter.className} antialiased bg-slate-50`}>
          {children}
          <Toaster position="top-right" />
          <ServiceWorkerRegistration />
        </body>
      </html>
    </AuthProvider>
  );
}
