import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PREMIUM_OFFERS } from "@/lib/premium-offers";
import { PROOF_COMPACT } from "@/lib/social-proof";

const offerGridSource = readSource("src/components/sections/OfertaGrid.tsx");
const offerPageSource = readSource("src/components/sections/PremiumOfferPage.tsx");
const constantsSource = readSource("src/lib/constants.ts");
const premiumOffersSource = readSource("src/lib/premium-offers.ts");
const markdownGeneratorSource = readSource("scripts/generate-md-variants.mjs");
const publicOfferSource = [
  offerGridSource,
  offerPageSource,
  constantsSource,
  premiumOffersSource,
].join("\n");

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

  it("shows the implementation, monthly care and scope boundary on every product page", () => {
    for (const heading of [
      "Co dostajesz we wdrożeniu",
      "Co obejmuje miesięczna opieka",
      "Co rozliczamy osobno",
      "Kryteria odbioru",
    ]) {
      expect(offerPageSource).toContain(heading);
    }

    const offers = Object.values(PREMIUM_OFFERS);
    expect(offers).toHaveLength(6);

    for (const offer of offers) {
      expect(offer.implementationItems.length).toBeGreaterThanOrEqual(5);
      expect(offer.monthlyCareItems.length).toBeGreaterThanOrEqual(4);
      expect(offer.acceptanceCriteria.length).toBeGreaterThanOrEqual(3);
      expect(offer.scopeBoundary.length).toBeGreaterThan(40);
    }

    expect(new Set(offers.map((offer) => offer.scopeBoundary)).size).toBe(6);
  });

  it("defines the commercial detail that belongs in each signed scope", () => {
    const commonTerms =
      "Dokładną częstotliwość monitoringu i raportowania, czas reakcji, limity narzędzi oraz zakres zmian zapisujemy w indywidualnej ofercie i umowie.";
    const acceptanceTerms =
      "Próbkę testową, progi jakości, wolumen i definicję błędu krytycznego ustalamy przed startem.";

    expect(offerGridSource).toContain(commonTerms);
    expect(offerPageSource).toContain(commonTerms);
    expect(offerPageSource).toContain(acceptanceTerms);
    expect(offerPageSource).toContain("Kontrola wyniku i kryteria odbioru");
  });

  it("makes the first verified outbound dataset part of delivery and care", () => {
    const outbound = PREMIUM_OFFERS.premiumColdEmail;

    expect(outbound.implementationItems).toContain(
      "Pierwszy zweryfikowany zestaw firm i kontaktów gotowych do zatwierdzenia.",
    );
    expect(outbound.monthlyCareItems).toContain(
      "Odświeżanie i uzupełnianie zatwierdzonego zestawu firm w uzgodnionym wolumenie.",
    );
    expect(outbound.scopeBoundary).toContain("Dodatkowy wolumen");
    expect(outbound.scopeBoundary).toContain("nowy rynek");
  });

  it("does not promise open-ended development inside monthly care", () => {
    expect(publicOfferSource).not.toContain("jak rozwijamy system");
    expect(publicOfferSource).not.toContain("rozwijamy go wraz ze zmianą procesu");
  });

  it("uses a tailored diagnosis CTA and source-backed proof on all product pages", () => {
    const offers = Object.values(PREMIUM_OFFERS);
    const calendlyPosition = offerPageSource.indexOf("href={CALENDLY_URL}");
    const mapPosition = offerPageSource.indexOf("href={AI_GROWTH_MAP_URL}");

    expect(calendlyPosition).toBeGreaterThan(-1);
    expect(mapPosition).toBeGreaterThan(-1);
    expect(calendlyPosition).toBeLessThan(mapPosition);
    expect(new Set(offers.map((offer) => offer.diagnosisTitle)).size).toBe(6);
    expect(new Set(offers.map((offer) => offer.diagnosisCtaLabel)).size).toBe(6);
    expect(offerPageSource).toContain("{diagnosisTitle}");
    expect(offerPageSource).toContain("{diagnosisCtaLabel}");
    expect(offerPageSource).toContain("PROOF_COMPACT");
    expect(offerGridSource).toContain("PROOF_COMPACT");
    expect(offerPageSource).toContain(
      "Jeśli diagnoza nie potwierdzi sensu tego rozwiązania, powiemy to wprost.",
    );
    expect(PROOF_COMPACT).toContain("24 wdrożenia");
  });

  it("generates the markdown variant for every active product route", () => {
    for (const route of Object.values(PREMIUM_OFFERS).map((offer) => offer.path)) {
      expect(markdownGeneratorSource).toContain(`"${route}"`);
      expect(readSource(`public/md${route}.txt`)).not.toMatch(/\]\([^)]+\)\[/);
    }
  });
});

function readSource(filePath: string): string {
  return readFileSync(join(process.cwd(), filePath), "utf-8");
}
