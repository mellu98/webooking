import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/layout/ClerkOrMock";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WEBOOKING — Marketplace B2B per il Booking Musicale",
  description: "Trova artisti, gestisci disponibilità e semplifica il booking tra locali e management.",
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
        </body>
      </html>
    </AuthProvider>
  );
}
