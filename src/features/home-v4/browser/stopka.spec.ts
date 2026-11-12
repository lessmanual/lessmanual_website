import { expect, test, type Page } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";
import { LINKS } from "../../../content/site";
import { KLUCZ_ZGODY_COOKIES, WERSJA_ZGODY_COOKIES } from "../../../lib/consent";

const STOPKA = "footer";
const logistyka = HOME_V4.stopka.dzialy.find((d) => d.dzial === "logistyka");

// Ważna decyzja o cookies: baner nie zasłania stopki podczas klikania.
async function zDecyzjaOCookies(page: Page) {
  await page.addInitScript(
    ({ klucz, wersja }) => {
      window.localStorage.setItem(
        klucz,
        JSON.stringify({ wersja, czas: new Date().toISOString(), analityczne: false, kalendarz: false }),
      );
    },
    { klucz: KLUCZ_ZGODY_COOKIES, wersja: WERSJA_ZGODY_COOKIES },
  );
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`stopka ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: telefon });

    test("na / klik w Logistyka i dokumenty przełącza dział bez przeładowania", async ({ page }) => {
      await zDecyzjaOCookies(page);
      let zaladowania = 0;
      page.on("load", () => {
        zaladowania += 1;
      });
      await page.goto("/");
      await expect(page.locator('#dzialy-zakladki[data-gotowe="true"]')).toBeAttached();
      expect(logistyka).toBeDefined();
      const link = page.locator(STOPKA).getByRole("link", { name: logistyka?.label ?? "brak" });
      await expect(link).toHaveAttribute("href", "/#dzial-logistyka");
      await link.click();
      await expect(page.locator('[data-qa="zakladka-dzialu"][data-dzial="logistyka"]')).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(zaladowania).toBe(1);
    });

    test("ten sam link działu działa drugi raz po zmianie działu zakładką", async ({ page }) => {
      await zDecyzjaOCookies(page);
      await page.goto("/");
      await expect(page.locator('#dzialy-zakladki[data-gotowe="true"]')).toBeAttached();
      const link = page.locator(STOPKA).getByRole("link", { name: logistyka?.label ?? "brak" });
      const zakladka = (dzial: string) => page.locator(`[data-qa="zakladka-dzialu"][data-dzial="${dzial}"]`);
      await link.click();
      await expect(zakladka("logistyka")).toHaveAttribute("aria-selected", "true");
      // Hash zostaje #dzial-logistyka, więc kolejny klik nie wywoła hashchange: obsługuje go klik.
      await zakladka("marketing").evaluate((el) => {
        if (el instanceof HTMLElement) el.click();
      });
      await expect(zakladka("marketing")).toHaveAttribute("aria-selected", "true");
      await link.click();
      await expect(zakladka("logistyka")).toHaveAttribute("aria-selected", "true");
      await expect(page).toHaveURL(/\/#dzial-logistyka$/);
    });

    test("z /blog link działu otwiera / z tym działem", async ({ page }) => {
      await zDecyzjaOCookies(page);
      await page.goto("/blog");
      await page.locator(STOPKA).getByRole("link", { name: logistyka?.label ?? "brak" }).click();
      await expect(page).toHaveURL(/\/#dzial-logistyka$/);
      await expect(page.locator('[data-qa="zakladka-dzialu"][data-dzial="logistyka"]')).toHaveAttribute(
        "aria-selected",
        "true",
      );
    });

    test("kolumny, teksty 1:1, hrefy i zewnętrzne linki z noopener", async ({ page }) => {
      await zDecyzjaOCookies(page);
      await page.goto("/");
      const s = HOME_V4.stopka;
      const stopka = page.locator(STOPKA);
      await expect(stopka).toContainText(s.zdanie);
      await expect(stopka).toContainText(s.znakiTowarowe);
      await expect(stopka).toContainText(s.dane);
      await expect(stopka).not.toContainText("Partner technologiczny");
      for (const d of s.dzialy) {
        await expect(stopka.getByRole("link", { name: d.label })).toHaveAttribute("href", `/#dzial-${d.dzial}`);
      }
      const wsp = ["/#wejscie-mapa", "/#wejscie-pilot", "/#pytania", "/o-nas", "/blog"];
      for (const [i, href] of wsp.entries()) {
        await expect(stopka.getByRole("link", { name: s.wspolpraca[i].label, exact: true })).toHaveAttribute("href", href);
      }
      const kontakt = ["/#formularz", `mailto:${LINKS.email}`, LINKS.linkedinBartek, LINKS.googleProfile];
      for (const [i, href] of kontakt.entries()) {
        const link = stopka.getByRole("link", { name: s.kontakt[i].label, exact: true });
        await expect(link).toHaveAttribute("href", href);
        if (href.startsWith("https://")) {
          await expect(link).toHaveAttribute("target", "_blank");
          await expect(link).toHaveAttribute("rel", /noopener/);
        }
      }
      await expect(stopka.getByRole("link", { name: "Polityka prywatności" })).toHaveAttribute("href", LINKS.privacy);
      await expect(stopka.getByRole("link", { name: "Polityka cookies" })).toHaveAttribute(
        "href",
        "/legal/polityka-cookies",
      );
      await expect(stopka.getByRole("link", { name: "Regulamin" })).toHaveAttribute("href", "/legal/regulamin");
      await expect(stopka.getByRole("button", { name: "Ustawienia cookies" })).toBeVisible();
    });

    test(telefon ? "390: kolumny jedna pod drugą, cele dotyku 44 px, bez przewijania w bok" : "1440: kolumny obok siebie", async ({ page }) => {
      await zDecyzjaOCookies(page);
      await page.goto("/");
      const naglowki = await page.locator(`${STOPKA} h2`).evaluateAll((els) =>
        els.map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y + window.scrollY };
        }),
      );
      expect(naglowki.length).toBeGreaterThanOrEqual(3);
      if (telefon) {
        for (let i = 1; i < naglowki.length; i++) {
          expect(naglowki[i].x).toBeCloseTo(naglowki[0].x, 0);
          expect(naglowki[i].y).toBeGreaterThan(naglowki[i - 1].y);
        }
        const wysokosci = await page
          .locator(`${STOPKA} a, ${STOPKA} button`)
          .evaluateAll((els) => els.map((el) => Math.round(el.getBoundingClientRect().height)));
        expect(Math.min(...wysokosci)).toBeGreaterThanOrEqual(44);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      } else {
        for (let i = 1; i < naglowki.length; i++) {
          expect(naglowki[i].x).toBeGreaterThan(naglowki[i - 1].x + 100);
          expect(Math.abs(naglowki[i].y - naglowki[0].y)).toBeLessThan(4);
        }
      }
    });
  });
}
