import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const pageSource = readSource("src/app/ai-growth-opportunity-map/page.tsx");
const formSource = readSource("src/components/lead-magnet/AIGrowthOpportunityMapForm.tsx");
const combinedSource = `${pageSource}\n${formSource}`;

const forbiddenPublicPhrases = [
  "CloudCSO",
  "Lead magnet premium",
  "publiczny research firmy",
  "PDF w brandingu",
  "Cal.com",
  "CTA",
  "webhook",
  "Przekazuję do CloudCSO",
  "brief",
  "produkt pudełkowy",
  "produkty pudełkowe",
  "custom route",
  "custom agentic workflow",
  "Inne / custom",
  "quality gate",
  "pierwszy workflow",
  "workflow AI",
  "outboundu",
  "pipeline",
  "Zobacz ofertę",
  "odblokuj",
  "unlock",
  "Gotowy PDF",
  "Raport wyślemy",
  "otrzymanie PDF",
  "—",
];

describe("AI Growth Opportunity Map public copy V11", () => {
  it("states the core promise and delivery without internal jargon", () => {
    expect(pageSource).toContain(
      "Znajdź pierwszy proces, w którym AI może zdjąć ręczną pracę z zespołu."
    );
    expect(pageSource).toContain("spersonalizowaną mapę pierwszego wdrożenia");
    expect(pageSource).toContain("formularza oraz publicznych źródeł firmy");
    expect(pageSource).toContain("Po wysłaniu formularza");
    expect(pageSource).toContain("od razu zobaczysz status analizy.");
    expect(formSource).toContain(
      "Po wysłaniu formularza zobaczysz status analizy."
    );
    expect(formSource).toContain("Uruchom analizę procesu");
    expect(formSource).not.toContain("2-stronicowy PDF");
    expect(formSource).not.toContain("Raport będzie miał 2 strony");
    expect(pageSource).not.toContain("2-stronicowy");
    expect(pageSource).not.toContain("2 strony");
    expect(combinedSource).not.toContain("raport PDF");

    for (const phrase of forbiddenPublicPhrases) {
      expect(combinedSource).not.toContain(phrase);
    }
  });

  it("shows a truthful preview of the four report contents", () => {
    expect(pageSource).toContain('aria-label="Podgląd czterech stron mapy"');
    for (const pageNumber of ["01 / 04", "02 / 04", "03 / 04", "04 / 04"]) {
      expect(pageSource).toContain(pageNumber);
    }

    for (const section of [
      "Punkt wyjścia firmy",
      "Fakty z publicznych źródeł",
      "Pierwszy system do wdrożenia",
      "Kontrolowane wdrożenie",
    ]) {
      expect(pageSource).toContain(section);
    }
  });

  it("keeps one primary hero action and removes the competing offer action", () => {
    expect(pageSource.match(/href="#formularz"/g)).toHaveLength(1);
    expect(pageSource).not.toContain('href="/oferta"');
  });

  it("keeps product routing hidden and presents a two-step accessible form", () => {
    expect(formSource).toContain('productMode: "not_sure"');
    expect(formSource).not.toContain("GROWTH_MAP_PRODUCT_OPTIONS");
    expect(formSource).not.toContain('name="productMode"');
    expect(formSource).toContain("Krok 1 z 2");
    expect(formSource).toContain("Krok 2 z 2");
    expect(formSource).toContain("Dalej");
    expect(formSource).toContain("Wstecz");
    expect(formSource).toContain('name="weeklyProcessVolume"');
    expect(formSource).toContain('name="minutesPerOccurrence"');
    expect(formSource).toContain('type="number"');
    expect(formSource).toContain('aria-live="polite"');
    expect(formSource).toContain("min-h-[18px]");
  });

  it("shows an accessible after-hours call question only for a telephone bottleneck", () => {
    expect(formSource).toContain("requiresAfterHoursCallHandling(values.bottleneck)");
    expect(formSource).toContain("Co dzieje się z telefonami poza godzinami pracy?");
    expect(formSource).toContain('name="afterHoursCallHandling"');

    for (const option of [
      "Odbiera właściciel lub zespół",
      "Zwykle pozostają nieodebrane",
      "Część jest odbierana, część pozostaje nieodebrana",
      "Nie wiem, chcę to zmierzyć",
    ]) {
      expect(formSource).toContain(option);
    }
  });

  it("frames progress as the journey to a measurable first implementation", () => {
    expect(pageSource).toContain("Droga do pierwszego mierzalnego wdrożenia");
    for (const stage of ["Analiza", "Mapa", "Decyzja", "Pilotaż", "Wynik"]) {
      expect(pageSource).toContain(stage);
    }
    expect(formSource).toContain("analiza, mapa, decyzja, pilotaż i wynik");
    expect(combinedSource).not.toContain("zgłoszenie, analiza, mapa, decyzja i pierwsze wdrożenie");
  });

  it("shows who designed the method without implying manual review of every report", () => {
    expect(pageSource).toContain("Bartłomiej Chudzik");
    expect(pageSource).toContain("CEO &amp; Solution Architect, LessManual");
    expect(pageSource).toContain("Projekt i kryteria tej mapy");
    expect(pageSource).not.toContain("osobiście sprawdza każdy raport");
  });
});

function readSource(filePath: string): string {
  return readFileSync(join(process.cwd(), filePath), "utf-8");
}
