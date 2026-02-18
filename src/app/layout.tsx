import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { CookieBanner } from "@/components/legal/CookieBanner";
import ChatWidget from "@/components/chat/ChatWidget";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lessmanual.ai"),
  title: "LessManual.ai — Systemy AI dla firm B2B | Automatyzacja pod klucz",
  description:
    "Budujemy systemy AI które oszczędzają 20-40h miesięcznie. AI SDR, SEO Content, Chatbot 24/7, Generator Ofert. Gwarancja wyników lub pełny zwrot kosztów.",
  keywords: [
    "automatyzacja AI",
    "AI SDR",
    "chatbot AI",
    "SEO automatyzacja",
    "generator ofert AI",
    "LessManual",
    "systemy AI dla firm",
    "automatyzacja B2B",
  ],
  openGraph: {
    title: "LessManual.ai — Systemy AI dla firm B2B",
    description:
      "Budujemy systemy AI które oszczędzają 20-40h miesięcznie. Gwarancja wyników lub pełny zwrot kosztów.",
    url: "https://lessmanual.ai",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LessManual.ai — Systemy AI dla firm B2B",
    description:
      "Budujemy systemy AI które oszczędzają 20-40h miesięcznie. Gwarancja wyników lub pełny zwrot kosztów.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://lessmanual.ai",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <CookieBanner />
        <ScrollToTop />
        <ChatWidget />
      </body>
    </html>
  );
}
