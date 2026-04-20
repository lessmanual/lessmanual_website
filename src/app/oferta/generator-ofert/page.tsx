import type { Metadata } from "next";
import GeneratorOfertContent from "./_content";

export const metadata: Metadata = {
  title: "Generator Ofert AI · klient sam wycenia, PDF w 5 minut · LessManual",
  description:
    "Self-service konfigurator wycen. Klient podaje dane przez chat lub formularz, system generuje PDF z Twoim logo i wysyła mailem w 5 minut. Auto follow-up D3+D7. Win rate +25-40%. Od 5 000 PLN setup + 800 PLN/mies.",
  alternates: {
    canonical: "/oferta/generator-ofert",
  },
  openGraph: {
    title: "Generator Ofert AI · klient sam wycenia, PDF w 5 minut",
    description:
      "Klient wycenia się sam. PDF z logo Twojej firmy w 5 minut. Auto follow-up. Win rate +25-40%. Wdrożenie w 14 dni.",
    url: "/oferta/generator-ofert",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generator Ofert AI · LessManual",
    description:
      "Klient podaje dane w chacie, dostaje PDF z Twoim logo w 5 minut. 2h ręcznej roboty → zero. Win rate +25-40%.",
  },
};

export default function GeneratorOfertPage() {
  return <GeneratorOfertContent />;
}
