import { expect, test } from "@playwright/test";
import { bzykPoWyborze } from "../../../content/home-v4";

const KLAWISZ = '[data-qa="hero-klawisz"]';

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`hero ${vp.width}`, () => {
    test.use({ viewport: vp });

    test("klawisze: 390 piąty na całą szerokość, 1440 jeden rząd", async ({ page }) => {
      await page.goto("/");
      const boxy = await page.locator(KLAWISZ).evaluateAll((els) =>
        els.map((el) => {
          const b = el.getBoundingClientRect();
          return { x: b.x, y: b.y, width: b.width };
        }),
      );
      expect(boxy).toHaveLength(5);
      if (telefon) {
        const kontener = await page.locator("h1").evaluate((el) => el.getBoundingClientRect().width);
        expect(Math.abs(boxy[4].width - kontener)).toBeLessThanOrEqual(2);
        expect(boxy[0].y).toBe(boxy[1].y);
        expect(boxy[2].y).toBeGreaterThan(boxy[0].y);
      } else {
        expect(new Set(boxy.map((b) => Math.round(b.y))).size).toBe(1);
      }
    });

    test("wybór Marketingu zaznacza tylko jeden klawisz i zmienia dymek", async ({ page }) => {
      await page.goto("/");
      await page.locator(`${KLAWISZ}[data-dzial="marketing"]`).click();
      await expect(page.locator(`${KLAWISZ}[aria-pressed="true"]`)).toHaveCount(1);
      await expect(page.locator('[data-qa="hero-dymek"]')).toHaveText(bzykPoWyborze("Marketing"));
      await page.locator(`${KLAWISZ}[data-dzial="marketing"]`).click();
      await expect(page.locator(`${KLAWISZ}[aria-pressed="true"]`)).toHaveCount(1);
    });

    test("Pokaż bez wyboru przewija do działów z Telefonami", async ({ page }) => {
      await page.goto("/");
      await page.locator('[data-qa="hero-pokaz"]').click();
      await expect(page.locator("#dzialy-zakladki")).toBeInViewport();
      await expect(page.locator('[role="tab"][aria-selected="true"]')).toContainText("Telefony");
    });

    test(`cytat: ${telefon ? 22 : 26} px, bez kursywy`, async ({ page }) => {
      await page.goto("/");
      const styl = await page.locator('[data-qa="hero-cytat"] p').evaluate((el) => {
        const s = getComputedStyle(el);
        return { rozmiar: s.fontSize, styl: s.fontStyle };
      });
      expect(styl.rozmiar).toBe(telefon ? "22px" : "26px");
      expect(styl.styl).toBe("normal");
    });

    test("bez przewijania w bok", async ({ page }) => {
      await page.goto("/");
      const [szer, okno] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      expect(szer).toBeLessThanOrEqual(okno);
    });
  });
}
