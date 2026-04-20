import type { Metadata } from "next";
import HotLeadCatcherContent from "./_content";

export const metadata: Metadata = {
  title: "Hot Lead Catcher · agent AI łapie gorące leady · LessManual",
  description:
    "Agent AI monitoruje 4 źródła sygnałów zakupowych (newsy, oferty pracy, recenzje, wzmianki). Scoring intent, alert na Telegram, draft maila w Instantly. 24h od sygnału do kontaktu. Cennik: STARTER, GROWTH, SCALE.",
  alternates: {
    canonical: "/oferta/hot-lead-catcher",
  },
  openGraph: {
    title: "Hot Lead Catcher · agent AI łapie gorące leady",
    description:
      "Monitoring 4 źródeł sygnałów zakupowych. Scoring intent. Alert na Telegram + draft maila w Instantly. 24h od sygnału do kontaktu.",
    url: "/oferta/hot-lead-catcher",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hot Lead Catcher · LessManual",
    description:
      "Agent AI łapie gorące leady zanim konkurencja je zauważy. 4 źródła, scoring intent, 24h od sygnału do kontaktu.",
  },
};

export default function HotLeadCatcherPage() {
  return <HotLeadCatcherContent />;
}
