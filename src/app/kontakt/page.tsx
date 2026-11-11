import type { Metadata } from "next";
import { LeadForm } from "@/components/form/LeadForm";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import styles from "./kontakt.module.css";

const OPIS =
  "Odpowiedz na 10 krótkich pytań o firmę i wybierz termin rozmowy z Bartkiem. Formularz zajmuje około 2 minut.";

export const metadata: Metadata = {
  title: "Umów rozmowę",
  description: OPIS,
  alternates: { canonical: "https://www.lessmanual.ai/kontakt" },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: "Umów rozmowę",
    description: OPIS,
    url: "https://www.lessmanual.ai/kontakt",
    siteName: "LessManual",
    locale: "pl_PL",
    type: "website",
  },
};

export default function KontaktPage() {
  return (
    <>
      <SiteHeader />
      <main className={`lm-container ${styles.strona}`}>
        <h1 className={styles.naglowek}>Umów rozmowę</h1>
        <LeadForm />
      </main>
      <SiteFooter />
    </>
  );
}
