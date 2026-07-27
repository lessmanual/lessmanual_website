import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const offerGridSource = readSource("src/components/sections/OfertaGrid.tsx");
const constantsSource = readSource("src/lib/constants.ts");
const publicOfferSource = `${offerGridSource}\n${constantsSource}`;

describe("offer overview public copy", () => {
  it("explains the services in buyer language", () => {
    for (const phrase of [
      "Jakość sprawdza człowiek.",
      "Zespół dostaje tylko sprawy wymagające decyzji",
      "Kampania sprzedażowa B2B oparta na sprawdzonych danych",
      "Każdą wiadomość sprawdzamy przed wysyłką.",
    ]) {
      expect(publicOfferSource).toContain(phrase);
    }
  });

  it("keeps internal delivery jargon out of the visible product cards", () => {
    const productsBlock = constantsSource.slice(
      constantsSource.indexOf("export const PRODUCTS"),
      constantsSource.indexOf("export const COST_TABLE"),
    );

    for (const phrase of [
      "agentic workflow",
      "research pack",
      "setup + MRR",
      "quality gate",
      "GEO",
      "CTA",
      "—",
    ]) {
      expect(productsBlock.toLowerCase()).not.toContain(phrase.toLowerCase());
    }
  });
});

function readSource(filePath: string): string {
  return readFileSync(join(process.cwd(), filePath), "utf-8");
}
