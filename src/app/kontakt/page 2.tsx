import type { Metadata } from "next";
import KontaktContent from "./_content";

export const metadata: Metadata = {
  title: "Kontakt | LessManual",
  description:
    "Porozmawiajmy o Twoim projekcie. Zarezerwuj 15-minutową rozmowę lub napisz na kontakt@lessmanual.ai. Średni czas odpowiedzi: 4h w dni robocze.",
  alternates: {
    canonical: "/kontakt",
  },
  openGraph: {
    title: "Kontakt | LessManual",
    description:
      "Zarezerwuj 15-minutową rozmowę z Bartkiem. Sprawdzimy czy agenci AI pasują do Twojego biznesu.",
    url: "/kontakt",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | LessManual",
    description:
      "15 minut rozmowy. Konkretna propozycja. Zero stawki godzinowej.",
  },
};

export default function KontaktPage() {
  return <KontaktContent />;
}
