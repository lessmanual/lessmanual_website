import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Informacja dla osób, z którymi kontaktujemy się w sprawach B2B",
  description:
    "Informacja z art. 14 RODO: kto jest administratorem danych, skąd mamy dane służbowe, w jakim celu je przetwarzamy i jak zgłosić sprzeciw.",
  alternates: {
    canonical: "https://www.lessmanual.ai/informacja-kontakt-b2b",
  },
};

export default function InformacjaKontaktB2BPage() {
  return (
    <LegalPageContent
      title="Informacja dla osób, z którymi kontaktujemy się w sprawach B2B"
      filename="informacja-kontakt-b2b.md"
    />
  );
}
