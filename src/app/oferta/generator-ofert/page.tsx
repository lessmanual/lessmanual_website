import type { Metadata } from "next";
import { PremiumOfferPage } from "@/components/sections/PremiumOfferPage";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";

export const metadata: Metadata = {
  title: "Generator ofert AI na danych i cenniku firmy",
  description:
    "System zbiera dane, porządkuje zakres i przygotowuje draft oferty do sprawdzenia. Ceny pochodzą z zatwierdzonego cennika firmy.",
  alternates: {
    canonical: "/oferta/generator-ofert",
  },
  openGraph: {
    title: "Generator ofert AI na danych firmy | LessManual",
    description:
      "Szybsze ofertowanie, mniej ręcznego przepisywania i bardziej spójny standard propozycji dla klienta.",
    url: "/oferta/generator-ofert",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generator ofert AI na danych firmy | LessManual",
    description:
      "Zbieranie danych, przygotowanie oferty i kontrola przed wysyłką.",
  },
};

export default function GeneratorOfertPage() {
  return <PremiumOfferPage {...PREMIUM_OFFERS.generatorOfert} />;
}
