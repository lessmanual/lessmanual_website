import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Polityka Prywatnosci | LessManual.ai",
  description:
    "Polityka Prywatnosci LessManual.ai zgodna z RODO i polskim prawem ochrony danych osobowych.",
  alternates: {
    canonical: "https://lessmanual.ai/legal/polityka-prywatnosci",
  },
};

export default function PolitykaPrywatnosciPage() {
  return (
    <LegalPageContent
      title="Polityka Prywatnosci"
      filename="polityka-prywatnosci.md"
    />
  );
}
