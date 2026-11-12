import { expect, test, type Page } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";
import { KLUCZ_ZGODY_COOKIES, WERSJA_ZGODY_COOKIES } from "../../../lib/consent";

const PASEK = '[data-qa="pasek-mobilny"]';

// Ważna decyzja o cookies zapisana przed załadowaniem strony (baner schowany, pasek wolno pokazać).
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

async function przewinDo(page: Page, selektor: string) {
  await page.locator(selektor).first().evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
}

test.describe("pasek 390", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true });

  test("pasek ukryty na hero, widoczny po hero, ukryty przy formularzu", async ({ page }) => {
    await zDecyzjaOCookies(page);
    await page.goto("/");
    const pasek = page.locator(PASEK);
    await expect(pasek).toHaveAttribute("data-widoczny", "false");
    await przewinDo(page, "#dzialy");
    await expect(pasek).toHaveAttribute("data-widoczny", "true");
    await expect(pasek.locator("button")).toHaveText(HOME_V4.cta.pasek);
    const przycisk = await pasek.locator("button").boundingBox();
    expect(przycisk?.height ?? 0).toBeGreaterThanOrEqual(44);
    await przewinDo(page, "#formularz");
    await expect(pasek).toHaveAttribute("data-widoczny", "false");
    await przewinDo(page, "#pytania");
    await expect(pasek).toHaveAttribute("data-widoczny", "true");
  });

  test("fokus z klawiatury nie chowa się za paskiem (scroll-padding-bottom)", async ({ page }) => {
    await zDecyzjaOCookies(page);
    await page.goto("/");
    await expect(page.locator("details#pytanie-czas summary")).toBeAttached();
    // Kontrolka tuż pod dolną krawędzią ekranu: Tab przewija ją do widoku, ale nie pod pasek.
    await page.evaluate(() => {
      const spisy = Array.from(document.querySelectorAll("section#pytania summary"));
      const cel = spisy[4];
      const poprzedni = spisy[3];
      if (!(cel instanceof HTMLElement) || !(poprzedni instanceof HTMLElement)) throw new Error("brak pytań");
      // Kontrolka wystaje 30 px nad dolną krawędź: Chromium przewija wtedy minimalnie (do krawędzi), a nie na środek.
      window.scrollTo({ top: cel.getBoundingClientRect().top + window.scrollY - window.innerHeight + 30, behavior: "instant" });
      poprzedni.focus({ preventScroll: true });
    });
    await expect(page.locator(PASEK)).toHaveAttribute("data-widoczny", "true");
    await page.keyboard.press("Tab");
    // Przewijanie do fokusu jest płynne (scroll-behavior: smooth), więc czekamy, aż kontrolka dojedzie nad pasek.
    const odstepOdPaska = () =>
      page.evaluate(() => {
        const aktywny = document.activeElement;
        const pasek = document.querySelector('[data-qa="pasek-mobilny"]');
        if (!aktywny || !pasek) return -9999;
        return pasek.getBoundingClientRect().top - aktywny.getBoundingClientRect().bottom;
      });
    await expect.poll(odstepOdPaska, { timeout: 5000 }).toBeGreaterThanOrEqual(0);
  });

  test("ponownie otwarty baner zgody chowa pasek, po zamknięciu pasek wraca", async ({ page }) => {
    await zDecyzjaOCookies(page);
    await page.goto("/");
    await przewinDo(page, "#pytania");
    await expect(page.locator(PASEK)).toHaveAttribute("data-widoczny", "true");
    await page.evaluate(() => window.dispatchEvent(new Event("open-cookie-settings")));
    await expect(page.locator('[role="region"].lm-cookie-banner')).toBeVisible();
    await expect(page.locator(PASEK)).toHaveAttribute("data-widoczny", "false");
    // „Wstecz” zamyka baner bez zapisu, więc pasek musi wrócić bez zdarzenia zgody.
    await page.getByRole("button", { name: "Wstecz" }).click();
    await expect(page.locator('[role="region"].lm-cookie-banner')).toBeHidden();
    await expect(page.locator(PASEK)).toHaveAttribute("data-widoczny", "true");
  });

  test("pasek nie przykrywa banera zgody", async ({ page }) => {
    await page.goto("/");
    await przewinDo(page, "#dzialy");
    await expect(page.locator('[role="region"].lm-cookie-banner')).toBeVisible();
    await expect(page.locator(PASEK)).toHaveAttribute("data-widoczny", "false");
  });

  test("po decyzji w banerze pasek się pojawia, a pod stopką jest miejsce na pasek", async ({ page }) => {
    await page.goto("/");
    await przewinDo(page, "#dzialy");
    await expect(page.locator(PASEK)).toHaveAttribute("data-widoczny", "false");
    await page.getByRole("button", { name: /akceptuj/i }).first().click();
    await expect(page.locator(PASEK)).toHaveAttribute("data-widoczny", "true");
    const luka = await page.evaluate(() => {
      const stopka = document.querySelector("footer");
      const dol = stopka ? stopka.getBoundingClientRect().bottom + window.scrollY : 0;
      return document.documentElement.scrollHeight - dol;
    });
    const wysokoscPaska = (await page.locator(PASEK).boundingBox())?.height ?? 999;
    expect(luka).toBeGreaterThanOrEqual(wysokoscPaska - 1);
  });

  test("wezwanie końcowe prowadzi do #formularz", async ({ page }) => {
    await zDecyzjaOCookies(page);
    await page.goto("/");
    const w = page.locator("section#wezwanie");
    await expect(w.locator("h2")).toHaveText(HOME_V4.cta.h2);
    await expect(w).toContainText(HOME_V4.cta.tekst);
    await expect(w).toContainText(HOME_V4.cta.drobnyDruk);
    await w.scrollIntoViewIfNeeded();
    await w.getByRole("button", { name: HOME_V4.cta.przycisk }).click();
    await expect(page.locator("#formularz-title")).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
});

test.describe("pasek 1440", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("paska nie ma", async ({ page }) => {
    await zDecyzjaOCookies(page);
    await page.goto("/");
    await przewinDo(page, "#dzialy");
    // Pasek istnieje w DOM (komponent jest zamontowany), ale od 1024 px CSS go nie pokazuje.
    await expect(page.locator(PASEK)).toBeAttached();
    await expect(page.locator(PASEK)).toBeHidden();
    await przewinDo(page, "#pytania");
    await expect(page.locator(PASEK)).toBeHidden();
  });

  test("wezwanie końcowe prowadzi do #formularz", async ({ page }) => {
    await zDecyzjaOCookies(page);
    await page.goto("/");
    const w = page.locator("section#wezwanie");
    await w.scrollIntoViewIfNeeded();
    await w.getByRole("button", { name: HOME_V4.cta.przycisk }).click();
    await expect(page.locator("#formularz-title")).toBeFocused();
  });
});
