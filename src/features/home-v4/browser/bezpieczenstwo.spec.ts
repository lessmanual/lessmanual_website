import { expect, test } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";

const SEKCJA = '[data-qa="bezpieczenstwo"]';

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`bezpieczeństwo ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: telefon });

    test("sekcja ma H2, oba akapity, zdania o modelach w UE i cztery wiersze", async ({ page }) => {
      await page.goto("/");
      const b = HOME_V4.bezpieczenstwo;
      await expect(page.locator("section#bezpieczenstwo")).toHaveAttribute("data-qa", "bezpieczenstwo");
      await expect(page.locator(`${SEKCJA} h2`)).toHaveText(b.h2);
      await expect(page.locator(SEKCJA)).toContainText(b.akapit1);
      await expect(page.locator(SEKCJA)).toContainText(b.modeleUE);
      await expect(page.locator(SEKCJA)).toContainText(b.akapit2);
      for (const wiersz of b.wiersze) await expect(page.locator(SEKCJA)).toContainText(wiersz);
      await expect(page.locator(`${SEKCJA} [data-qa="wiersz-bezpieczenstwa"]`)).toHaveCount(4);
    });

    test("stoi zaraz po Współpracy, bez obrazów i logo, strona nie przewija się w bok", async ({ page }) => {
      await page.goto("/");
      const nastepna = await page.locator("#wspolpraca").evaluate((el) => el.nextElementSibling?.id ?? "");
      expect(nastepna).toBe("bezpieczenstwo");
      await expect(page.locator(`${SEKCJA} img`)).toHaveCount(0);
      await expect(page.locator(`${SEKCJA} svg[aria-label*="logo" i]`)).toHaveCount(0);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });

    test(telefon ? "jedna kolumna: tekst nad wierszami" : "dwie kolumny: tekst obok wierszy", async ({ page }) => {
      await page.goto("/");
      const ramka = async (qa: string) =>
        page.locator(`${SEKCJA} [data-qa="${qa}"]`).evaluate((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y + window.scrollY, h: r.height };
        });
      const tekst = await ramka("bezpieczenstwo-tekst");
      const wiersze = await ramka("bezpieczenstwo-wiersze");
      if (telefon) {
        expect(wiersze.x).toBeCloseTo(tekst.x, 0);
        expect(wiersze.y).toBeGreaterThan(tekst.y + tekst.h - 1);
      } else {
        expect(wiersze.x).toBeGreaterThan(tekst.x + 200);
        expect(Math.abs(wiersze.y - tekst.y)).toBeLessThan(80);
      }
    });

    if (telefon) {
      test("tekst ma co najmniej 16 px", async ({ page }) => {
        await page.goto("/");
        const rozmiary = await page
          .locator(`${SEKCJA} p, ${SEKCJA} li`)
          .evaluateAll((els) => els.map((el) => parseFloat(getComputedStyle(el).fontSize)));
        expect(Math.min(...rozmiary)).toBeGreaterThanOrEqual(16);
      });
    }
  });
}
