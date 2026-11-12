import { expect, test } from "@playwright/test";

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  test.describe(`strona główna v4 ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: vp.width === 390 });

    test("sekcje w kolejności z projektu", async ({ page }) => {
      await page.goto("/");
      const ids = await page.locator("main > section[id]").evaluateAll((els) => els.map((el) => el.id));
      // Hero i przejście nie mają id sekcji; od działów w dół kolejność jest stała.
      expect(ids).toEqual(["dzialy", "wspolpraca", "bezpieczenstwo", "opinie", "formularz", "pytania", "wezwanie"]);
      const pierwsza = await page.locator("main > :first-child").evaluate((el) => el.getAttribute("aria-labelledby"));
      expect(pierwsza).toBe("hero-title");
    });

    test("starych sekcji i pływającego przewodnika nie ma, id się nie powtarzają", async ({ page }) => {
      await page.goto("/");
      for (const stare of ["#drogi", "#ceny", "#systemy", "#faq", "#dla-kogo", "#gwarancja"]) {
        await expect(page.locator(stare)).toHaveCount(0);
      }
      await expect(page.locator('[data-qa="bzyk-guide"], [aria-label*="Bzyk" i]')).toHaveCount(0);
      const powtorzone = await page.evaluate(() => {
        const widziane = new Set<string>();
        const dubel: string[] = [];
        for (const el of Array.from(document.querySelectorAll("[id]"))) {
          if (widziane.has(el.id)) dubel.push(el.id);
          widziane.add(el.id);
        }
        return dubel;
      });
      expect(powtorzone).toEqual([]);
    });

    test("dokładnie jeden schemat FAQPage i jeden Service", async ({ page }) => {
      await page.goto("/");
      const typy = await page
        .locator('script[type="application/ld+json"]')
        .evaluateAll((els) => els.map((el) => JSON.parse(el.textContent ?? "null")?.["@type"]));
      expect(typy.filter((t) => t === "FAQPage")).toHaveLength(1);
      expect(typy.filter((t) => t === "Service")).toHaveLength(1);
    });

    test("bez naruszeń CSP i błędów konsoli na /", async ({ page }) => {
      const bledy: string[] = [];
      page.on("console", (m) => {
        if (m.type() === "error") bledy.push(m.text());
      });
      page.on("pageerror", (e) => bledy.push(e.message));
      const odpowiedz = await page.goto("/");
      expect(odpowiedz?.headers()["content-security-policy"]).toContain("default-src 'self'");
      await page.waitForLoadState("networkidle");
      expect(bledy).toEqual([]);
    });
  });
}
