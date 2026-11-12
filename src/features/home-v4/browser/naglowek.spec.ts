import { expect, test } from "@playwright/test";

const POZYCJE = ["Działy", "Współpraca", "Opinie", "Pytania", "Blog"];

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`nagłówek ${vp.width}`, () => {
    test.use({ viewport: vp });

    test("ma pięć pozycji z Blogiem i przycisk Umów rozmowę", async ({ page }) => {
      await page.goto("/");
      if (telefon) await page.locator('[data-qa="menu"]').click();
      const lista = page.locator(
        telefon ? '[data-qa="menu-lista"] a' : 'nav[aria-label="Główna nawigacja"] a',
      );
      await expect(lista).toHaveText(telefon ? POZYCJE : [...POZYCJE, "Umów rozmowę"]);
      const blog = page.locator(telefon ? '[data-qa="menu-lista"] a' : 'nav[aria-label="Główna nawigacja"] a', {
        hasText: "Blog",
      });
      await expect(blog).toHaveAttribute("href", "/blog");
    });

    test("na 390 logo, Umów rozmowę i Menu w jednym rzędzie, Menu co najmniej 44 × 44 px", async ({ page }) => {
      test.skip(!telefon, "dotyczy tylko telefonu");
      await page.goto("/");
      const menu = page.locator('[data-qa="menu"]');
      const przycisk = page.locator('[data-qa="naglowek-umow"]');
      const logo = page.getByRole("link", { name: /strona główna/ });
      await expect(przycisk).toBeVisible();
      const [m, p, l] = await Promise.all([menu.boundingBox(), przycisk.boundingBox(), logo.boundingBox()]);
      if (!m || !p || !l) throw new Error("brak boundingBox");
      expect(m.width).toBeGreaterThanOrEqual(44);
      expect(m.height).toBeGreaterThanOrEqual(44);
      expect(p.height).toBeGreaterThanOrEqual(44);
      expect(Math.abs(m.y + m.height / 2 - (p.y + p.height / 2))).toBeLessThan(4);
      expect(Math.abs(l.y + l.height / 2 - (p.y + p.height / 2))).toBeLessThan(4);
      const szerokosc = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(szerokosc).toBe(390);
    });
  });
}

test.describe("nagłówek 360", () => {
  test.use({ viewport: { width: 360, height: 780 } });

  test("mieści się w 360 px bez przewijania w bok", async ({ page }) => {
    await page.goto("/");
    const menu = await page.locator('[data-qa="menu"]').boundingBox();
    if (!menu) throw new Error("brak boundingBox");
    expect(menu.right ?? menu.x + menu.width).toBeLessThanOrEqual(340);
    expect(menu.width).toBeGreaterThanOrEqual(44);
    const szerokosc = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(szerokosc).toBeLessThanOrEqual(360);
  });
});
