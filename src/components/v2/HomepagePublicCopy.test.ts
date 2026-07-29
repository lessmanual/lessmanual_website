import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const pageSource = readSource("src/app/page.tsx");
const heroSource = readSource("src/components/v2/HeroV2.tsx");
const productsSource = readSource("src/components/v2/ProductsV2.tsx");
const processSource = readSource("src/components/v2/ProcessV2.tsx");
const pricingSource = readSource("src/components/v2/PricingV2.tsx");
const finalCtaSource = readSource("src/components/v2/FinalCTAV2.tsx");
const schemaSource = readSource("src/lib/schema.ts");
const robotsSource = readSource("src/app/robots.ts");
const sitemapSource = readSource("src/app/sitemap.ts");

const homepageSource = [
  pageSource,
  heroSource,
  productsSource,
  processSource,
  pricingSource,
  finalCtaSource,
].join("\n");

describe("homepage public copy and SEO contract", () => {
  it("targets the language buyers use and leads with the business outcome", () => {
    expect(pageSource).toContain("Automatyzacja AI dla firm B2B | LessManual");
    expect(heroSource).toContain("Automatyzacja AI dla firm B2B");
    expect(heroSource).toContain("Zdejmujemy ręczną pracę ze sprzedaży, contentu");
    expect(heroSource).toContain("obsługi klienta.");
    expect(heroSource).toContain("pracuje na zatwierdzonych danych");
    expect(heroSource).toContain("przekazuje wyjątki człowiekowi");
  });

  it("uses the opportunity map as the primary homepage action", () => {
    const mapPosition = heroSource.indexOf('href={AI_GROWTH_MAP_URL}');
    const callPosition = heroSource.indexOf('href={CALENDLY_URL}');

    expect(mapPosition).toBeGreaterThan(-1);
    expect(callPosition).toBeGreaterThan(-1);
    expect(mapPosition).toBeLessThan(callPosition);
    expect(heroSource).toContain("Sprawdź pierwszy proces do automatyzacji");
    expect(heroSource).toContain("Porozmawiaj o wdrożeniu");
  });

  it("explains a controlled four-stage system instead of a prompt demo", () => {
    expect(pageSource).not.toContain("LiveEmailGenerator");
    expect(pageSource).toContain("ControlledWorkflowV2");

    for (const stage of ["Źródła", "Reguły", "Kontrola", "Człowiek"]) {
      expect(readSource("src/components/v2/ControlledWorkflowV2.tsx")).toContain(stage);
    }

    for (const step of ["01", "02", "03", "04"]) {
      expect(processSource).toContain(`num: "${step}"`);
    }
  });

  it("separates the delivered implementation from monthly care and scope changes", () => {
    for (const implementationItem of [
      "Audyt procesu i KPI",
      "Źródła i baza wiedzy",
      "Narzędzia i integracje",
      "Budowa systemu",
      "Testy na realnych danych",
      "Uruchomienie i dokumentacja",
    ]) {
      expect(homepageSource).toContain(implementationItem);
    }

    for (const careItem of [
      "Monitoring i naprawy",
      "Aktualizacje wiedzy",
      "Zmiany w API",
      "Kontrola jakości i wyjątków",
      "Optymalizacja i raport",
    ]) {
      expect(homepageSource).toContain(careItem);
    }

    expect(homepageSource).toContain(
      "Nowe funkcje, kanały, integracje, migracje i większe przebudowy wyceniamy osobno.",
    );
    expect(homepageSource).toContain(
      "Dokładną częstotliwość monitoringu i raportowania, czas reakcji, limity narzędzi oraz zakres zmian zapisujemy w indywidualnej ofercie i umowie.",
    );
    expect(homepageSource).toContain(
      "Próbkę testową, progi jakości, wolumen i definicję błędu krytycznego ustalamy przed startem.",
    );
    expect(pricingSource).toContain(
      "Po wdrożeniu bierzemy odpowiedzialność za działanie i rozwój rozwiązania.",
    );
    expect(pricingSource).toContain(
      "Utrzymujemy hosting oraz uzgodnione narzędzia",
    );
    expect(pricingSource).toContain(
      "Nowy moduł, kanał lub integracja dostaje osobny zakres i wycenę.",
    );
  });

  it("fills both desktop rows in the implementation-area grid", () => {
    expect(productsSource).toContain('i === 0 ? "lg:col-span-2" : ""');
    expect(productsSource).toContain('group md:p-10 lg:col-span-2"');
    expect(productsSource).not.toContain("lg:col-span-3");
  });

  it("removes dated scarcity, internal jargon and mixed-language sales copy", () => {
    for (const phrase of [
      "w lipcu",
      "Lipiec:",
      "Premium AI workflows",
      "Agentic workflows premium",
      "research-backed",
      "quality gate",
      "Exact pricing",
      "business case",
      "AI slopu",
      "Trzy kroki",
      "Trzy główne ścieżki",
      "—",
    ]) {
      expect(homepageSource).not.toContain(phrase);
    }
  });

  it("shows useful homepage FAQs and emits matching structured data", () => {
    expect(pageSource).toContain("HomepageFAQV2");
    expect(pageSource).toContain("generateFAQSchema");

    const faqSource = readSource("src/lib/homepage-faq.ts");
    for (const question of [
      "Ile kosztuje wdrożenie AI w firmie?",
      "Od którego procesu zacząć automatyzację?",
      "Czy agent AI może pracować na danych naszej firmy?",
      "Co dzieje się, gdy AI nie zna odpowiedzi?",
      "Ile czasu zespół musi poświęcić na wdrożenie?",
      "Co obejmuje miesięczna opieka po wdrożeniu?",
    ]) {
      expect(faqSource).toContain(question);
    }
    expect(faqSource).toContain(
      "Po wdrożeniu bierzemy odpowiedzialność za działanie i rozwój rozwiązania.",
    );
    expect(faqSource).toContain(
      "Koszty mieszczą się w miesięcznej opiece do limitów zapisanych w ofercie.",
    );
  });

  it("keeps crawl and entity signals consistent", () => {
    expect(schemaSource).toContain("https://www.lessmanual.ai/logo-icon.png");
    expect(schemaSource).toContain('"@type": "WebSite"');
    expect(schemaSource).not.toContain("https://linkedin.com/company/lessmanual");
    expect(robotsSource).not.toContain('"/_next/"');
    expect(sitemapSource).toContain("`${base}/ai-growth-opportunity-map`");
    expect(sitemapSource).toContain('"2026-07-27"');
  });
});

function readSource(filePath: string): string {
  return readFileSync(join(process.cwd(), filePath), "utf-8");
}
