import { expect, test, type Page } from "@playwright/test";
import { EKRAN_PROBA_NIEUDANA, KONTAKT, PYTANIA, START, WERSJA_FORMULARZA } from "../../../content/formularz";
import { HOME_V4 } from "../../../content/home-v4";

const KROK = '[data-qa="krok-formularza"]';
const DYMEK = '#formularz .lm-bubble[aria-live="polite"]';

// Etykiety odpowiedzi do kliknięcia w kolejności pytań; reszta pytań dostaje etykietę wskazaną tutaj,
// żeby żadna odpowiedź nie uruchomiła odsiewu ani dużej firmy.
const WYBORY: Readonly<Record<string, string>> = {
  rola: "Właściciel albo prezes",
  wielkosc: "10-30",
  decyzja: "Decyduję ja",
  bol: "Przepisywanie dokumentów i faktur",
  programy: "Excel albo arkusze",
  etap: "Próbowaliśmy, ale nie wyszło",
  powod: "Konkurencja już to robi",
  budzet: "15-25 tys. zł netto",
  termin: "W ciągu 3 miesięcy",
  zrodlo: "ChatGPT",
};

type Zgloszenie = { wersja: string; odpowiedzi: Record<string, { ids: string[] }> };

function jestZgloszeniem(x: unknown): x is Zgloszenie {
  if (typeof x !== "object" || x === null) return false;
  return "wersja" in x && typeof x.wersja === "string" && "odpowiedzi" in x && typeof x.odpowiedzi === "object";
}

async function przejdzDoPierwszegoPytania(page: Page) {
  await page.goto("/#formularz");
  // Klik przed hydratacją przepada: powtarzamy „Zaczynamy”, aż pojawi się pierwsze pytanie.
  await expect(async () => {
    await page.getByRole("button", { name: new RegExp(START.przycisk) }).click({ timeout: 1000 });
    await expect(page.locator(`${KROK}[data-krok="rola"]`)).toBeVisible({ timeout: 1000 });
  }).toPass();
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  test.describe(`formularz: nieudana próba ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: vp.width === 390 });

    test("opis osoby i linia pod H2 pochodzą z tekstów v4", async ({ page }) => {
      await page.goto("/");
      const f = HOME_V4.formularz;
      await expect(page.locator("#formularz-title")).toHaveText(f.h2);
      await expect(page.locator('[data-qa="formularz-osoba"]')).toContainText(f.imie);
      await expect(page.locator('[data-qa="formularz-osoba"]')).toContainText(f.rola);
      await expect(page.locator('[data-qa="formularz-osoba"]')).toContainText(f.opis);
      await expect(page.locator("#formularz")).not.toContainText("Dane i kod są Twoje");
    });

    test("odpowiedź „Próbowaliśmy, ale nie wyszło” daje ekran pilota z własnym tekstem i żądanie z nową wersją", async ({
      page,
    }) => {
      const wyslane: unknown[] = [];
      // Zapisu do CRM nie ma: żądanie przechwytujemy i zwracamy odpowiedź jak z serwera.
      await page.route("**/api/formularz", async (route) => {
        wyslane.push(route.request().postDataJSON());
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, route: "C" }) });
      });
      await przejdzDoPierwszegoPytania(page);

      for (const pytanie of PYTANIA) {
        await expect(page.locator(`${KROK}[data-krok="${pytanie.id}"]`)).toBeVisible();
        await page.locator(`${KROK} label`, { hasText: new RegExp(`^\\s*${WYBORY[pytanie.id]}\\s*$`) }).first().click();
        await page.getByRole("button", { name: /Dalej/ }).click();
      }

      await expect(page.locator(`${KROK}[data-krok="kontakt"]`)).toBeVisible();
      await page.getByLabel(KONTAKT.pola.imie).fill("Test Testowy");
      await page.getByLabel(KONTAKT.pola.firma).fill("Testowa Firma");
      await page.getByLabel(KONTAKT.pola.strona).fill("testowa-firma.example");
      await page.getByLabel(KONTAKT.pola.email).fill("test@testowa-firma.example");
      await page.getByLabel(KONTAKT.zgoda).check();
      await page.getByRole("button", { name: new RegExp(KONTAKT.przycisk) }).click();

      await expect(page.locator(KROK)).toContainText(EKRAN_PROBA_NIEUDANA.tekst);
      await expect(page.locator(DYMEK)).toContainText(EKRAN_PROBA_NIEUDANA.bzyk);

      expect(wyslane).toHaveLength(1);
      const tresc = wyslane[0];
      expect(jestZgloszeniem(tresc)).toBe(true);
      if (!jestZgloszeniem(tresc)) return;
      expect(tresc.wersja).toBe("2026-11-12-proba-nieudana");
      expect(tresc.wersja).toBe(WERSJA_FORMULARZA);
      expect(tresc.odpowiedzi.etap.ids).toEqual(["proba_nieudana"]);
    });
  });
}
