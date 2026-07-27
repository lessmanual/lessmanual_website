import type { Metadata } from "next";
import KontaktContent from "./_content";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Porozmawiajmy o procesie, który zabiera czas Twojemu zespołowi. Zarezerwuj rozmowę lub napisz na kontakt@lessmanual.ai.",
  alternates: {
    canonical: "/kontakt",
  },
  openGraph: {
    title: "Kontakt | LessManual",
    description:
      "Zarezerwuj rozmowę z Bartkiem. Sprawdzimy, czy automatyzacja ma sens w wybranym procesie.",
    url: "/kontakt",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt | LessManual",
    description:
      "Rozmowa o procesie, danych, wyniku i możliwym zakresie wdrożenia.",
  },
};

export default function KontaktPage() {
  return <KontaktContent />;
}
