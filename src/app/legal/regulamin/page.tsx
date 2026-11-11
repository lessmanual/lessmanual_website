import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/LegalPageContent";

export const metadata: Metadata = {
  title: "Regulamin",
  description: "Regulamin serwisu lessmanual.ai i usług LessManual.",
  alternates: {
    canonical: "https://www.lessmanual.ai/legal/regulamin",
  },
};

export default function RegulaminPage() {
  return <LegalPageContent title="Regulamin" filename="regulamin.md" />;
}
