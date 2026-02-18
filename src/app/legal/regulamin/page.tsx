import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Regulamin | LessManual.ai",
  description:
    "Regulamin swiadczenia uslug automatyzacji biznesowej przez LessManual.ai.",
  alternates: {
    canonical: "https://lessmanual.ai/legal/regulamin",
  },
};

export default function RegulaminPage() {
  return (
    <LegalPageContent title="Regulamin" filename="regulamin.md" />
  );
}
