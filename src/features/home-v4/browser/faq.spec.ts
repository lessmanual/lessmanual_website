import { expect, test, type Page } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";

const SEKCJA = "section#pytania";

async function zdarzenia(page: Page) {
  return page.evaluate(() =>
    (window.dataLayer ?? []).flatMap((a) => {
      if (!Array.isArray(a) || a[0] !== "event" || typeof a[1] !== "string") return [];
      const params: unknown = a[2];
      return [{ nazwa: a[1], params: typeof params === "object" && params !== null ? { ...params } : {} }];
    }),
  );
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  test.describe(`faq ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: vp.width === 390 });

    test("jest dokładnie jeden JSON-LD FAQPage z 7 pytaniami v4", async ({ page }) => {
      await page.goto("/");
      const faq = await page.locator('script[type="application/ld+json"]').evaluateAll((els) =>
        els.map((el) => JSON.parse(el.textContent ?? "null")).filter((j) => j?.["@type"] === "FAQPage"),
      );
      expect(faq).toHaveLength(1);
      expect(faq[0].mainEntity.map((e: { name: string }) => e.name)).toEqual(HOME_V4.faq.pytania.map((p) => p.q));
    });

    test("sekcja ma H2, 7 pytań w details, link powrotu do formularza", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator(`${SEKCJA} h2`)).toHaveText(HOME_V4.faq.h2);
      await expect(page.locator(`${SEKCJA} details`)).toHaveCount(7);
      await expect(page.locator(`${SEKCJA} details#pytanie-obietnica`)).toBeAttached();
      await expect(page.locator(`${SEKCJA} a[href="#formularz"]`)).toHaveText(HOME_V4.faq.powrot);
    });

    test("link Gwarancji z Współpracy otwiera pytanie o obietnicę", async ({ page }) => {
      await page.goto("/");
      const link = page.locator(`#wspolpraca a[href="#pytanie-obietnica"]`);
      await link.scrollIntoViewIfNeeded();
      await link.click();
      await expect(page.locator("details#pytanie-obietnica")).toHaveAttribute("open", "");
      await expect(page.locator("details#pytanie-obietnica")).toContainText(
        HOME_V4.faq.pytania.find((p) => p.id === "obietnica")?.a ?? "brak",
      );
    });

    test("najdłuższe pytanie otwarte: strona nie przewija się w bok", async ({ page }) => {
      await page.goto("/");
      const najdluzsze = HOME_V4.faq.pytania.reduce((a, b) => (b.a.length > a.a.length ? b : a));
      await page.locator(`details#pytanie-${najdluzsze.id} summary`).click();
      await expect(page.locator(`details#pytanie-${najdluzsze.id}`)).toHaveAttribute("open", "");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });

    test("Zobacz w Google w rzędzie opinii wysyła review_click z dzial opinie", async ({ page }) => {
      await page.addInitScript(() => {
        window.dataLayer = window.dataLayer ?? [];
        window.gtag = (...a: unknown[]) => {
          window.dataLayer.push(a);
        };
      });
      await page.goto("/");
      await expect(page.locator("section#opinie")).toBeAttached();
      // Link otwiera nową kartę: blokujemy nawigację, zdarzenie leci z handlera kliknięcia.
      await page.evaluate(() => document.addEventListener("click", (e) => e.preventDefault(), { capture: true }));
      const link = page.locator('section#opinie [data-zrodlo="google"] [data-qa="link-opinii"]').first();
      await link.scrollIntoViewIfNeeded();
      await link.click();
      expect((await zdarzenia(page)).filter((z) => z.nazwa === "review_click")).toEqual([
        { nazwa: "review_click", params: { dzial: "opinie" } },
      ]);
    });
  });
}
