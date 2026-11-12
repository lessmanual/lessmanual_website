import { expect, test } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";

const SEKCJA = '[data-qa="przejscie"]';
const SLOWA = `${SEKCJA} [data-zapalone]`;

test.describe("przejście 390", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("płasko, bez przyklejenia, ze zdaniem z tekstów", async ({ page }) => {
    await page.goto("/");
    const sekcja = page.locator(SEKCJA);
    await expect(sekcja).toBeAttached();
    const pozycje = await sekcja.evaluate((el) =>
      [el, ...el.querySelectorAll("*")].map((n) => getComputedStyle(n).position),
    );
    expect(pozycje).not.toContain("sticky");
    await expect(sekcja).toContainText(HOME_V4.przejscie.zdanie);
    const szer = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    expect(szer[0]).toBeLessThanOrEqual(szer[1]);
  });

  test("słowa zapalają się przy wejściu w ekran", async ({ page }) => {
    await page.goto("/");
    await page.locator(SEKCJA).scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 300);
    await expect(page.locator(`${SLOWA}[data-zapalone="true"]`).first()).toBeVisible();
  });
});

test.describe("przejście 1440", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("po pierwszym przejściu sekcja jest zwykłym pasem", async ({ page }, testInfo) => {
    // Obrót wymaga wskaźnika pointer: fine; projekt mobilny ma dotyk, więc tu go nie ma.
    test.skip(testInfo.project.name === "chromium-mobile", "obrót tylko z myszą");
    await page.goto("/");
    const sekcja = page.locator(SEKCJA);
    await expect(sekcja).toHaveAttribute("data-tryb", "obrot");
    const pozycja = await sekcja.evaluate((el) => getComputedStyle(el.firstElementChild ?? el).position);
    expect(pozycja).toBe("sticky");
    await sekcja.scrollIntoViewIfNeeded();
    const dol = await sekcja.evaluate((el) => el.getBoundingClientRect().bottom + window.scrollY);
    await page.evaluate((y) => window.scrollTo({ top: y + 400, behavior: "instant" }), dol);
    await expect(sekcja).toHaveAttribute("data-tryb", "pas");
    // Skrócenie sekcji nad ekranem nie może przesunąć treści czytelnika: następna sekcja nadal ok. 400 px nad dolną krawędzią.
    const nastepna = await sekcja.evaluate((el) => el.nextElementSibling?.getBoundingClientRect().top ?? 0);
    expect(Math.abs(nastepna + 400)).toBeLessThan(60);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(sekcja).toHaveAttribute("data-tryb", "pas");
    const wysokosc = await sekcja.evaluate((el) => el.getBoundingClientRect().height);
    expect(wysokosc).toBeLessThanOrEqual(900 + 1);
    await expect(page.locator(`${SLOWA}[data-zapalone="false"]`)).toHaveCount(0);
  });

  test("pętla ruchu nie zostawia przewijania w bok", async ({ page }) => {
    await page.goto("/");
    const szer = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
    expect(szer[0]).toBeLessThanOrEqual(szer[1]);
  });
});

test.describe("przejście, ograniczony ruch", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("wszystkie słowa zapalone od razu", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(SLOWA).first()).toBeAttached();
    await expect(page.locator(`${SLOWA}[data-zapalone="false"]`)).toHaveCount(0);
    const pozycja = await page.locator(SEKCJA).evaluate((el) => getComputedStyle(el.firstElementChild ?? el).position);
    expect(pozycja).not.toBe("sticky");
  });
});
