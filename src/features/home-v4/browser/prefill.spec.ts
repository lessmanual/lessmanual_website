import { expect, test, type Page } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";

declare global {
  interface Window {
    ustawUkryta: (v: boolean) => void;
  }
}

const KARUZELA ='[data-qa="karuzela"]:visible';
const KROK = '[data-qa="krok-formularza"]';

async function doDzialow(page: Page) {
  await page.goto("/");
  // Klik przed hydratacją przepada; data-gotowe pojawia się po niej.
  await expect(page.locator('#dzialy-zakladki[data-gotowe="true"]')).toBeAttached();
  await page.locator("#dzialy").evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
}

async function wybierzDzial(page: Page, dzial: string) {
  await page.locator(`[data-qa="zakladka-dzialu"][data-dzial="${dzial}"]`).evaluate((el) => {
    if (el instanceof HTMLElement) el.click();
  });
  await expect(page.locator(KARUZELA)).toHaveAttribute("data-dzial", dzial);
}

type Wpis = { nazwa: string; params: Record<string, unknown> };

async function zdarzenia(page: Page): Promise<Wpis[]> {
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
  const telefon = vp.width === 390;
  test.describe(`prefill i pomiar ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: telefon });

    test("Tak, to u nas w Logistyce przewija do formularza i zaznacza Przepisywanie dokumentów w pytaniu 4", async ({
      page,
    }) => {
      await doDzialow(page);
      await wybierzDzial(page, "logistyka");
      await page.locator(`${KARUZELA} [data-qa="tak-to-u-nas"]`).click();
      await expect(page.locator("#formularz")).toBeInViewport();
      // Fokus ląduje w formularzu (nagłówek sekcji), nie na przycisku, który został w karuzeli.
      await expect(page.locator("#formularz-title")).toBeFocused();
      expect(await page.evaluate(() => document.activeElement?.id)).toBe("formularz-title");
      // Formularz może nie być jeszcze zhydratowany: powtarzamy klik „Zaczynamy”, aż pojawi się pierwsze pytanie.
      await expect(async () => {
        await page.getByRole("button", { name: /Zaczynamy/ }).click({ timeout: 1000 });
        await expect(page.locator(`${KROK}[data-krok="rola"]`)).toBeVisible({ timeout: 1000 });
      }).toPass();
      for (const krok of ["rola", "wielkosc", "decyzja"]) {
        await expect(page.locator(`${KROK}[data-krok="${krok}"]`)).toBeVisible();
        await page.locator(`${KROK} label`).first().click();
        await page.getByRole("button", { name: /Dalej/ }).click();
      }
      await expect(page.locator(`${KROK}[data-krok="bol"]`)).toBeVisible();
      await expect(page.getByLabel("Przepisywanie dokumentów i faktur")).toBeChecked();
      await expect(page.locator(`${KROK}[data-krok="bol"] input:checked`)).toHaveCount(1);
    });

    test("zdarzenia GA4: room_open z = zakladka, karta_view po 1 s, review_click", async ({ page }) => {
      await page.addInitScript(() => {
        window.dataLayer = window.dataLayer ?? [];
        window.gtag = (...a: unknown[]) => {
          window.dataLayer.push(a);
        };
      });
      await page.goto("/");
      await expect(page.locator('#dzialy-zakladki[data-gotowe="true"]')).toBeAttached();
      // Karuzela poza ekranem nie zgłasza karta_view przy montażu.
      await page.waitForTimeout(1500);
      expect((await zdarzenia(page)).filter((z) => z.nazwa === "karta_view")).toEqual([]);

      await page.locator("#dzialy").evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
      await wybierzDzial(page, "marketing");
      await expect.poll(async () => (await zdarzenia(page)).filter((z) => z.nazwa === "room_open")).toEqual([
        { nazwa: "room_open", params: { dzial: "marketing", z: "zakladka" } },
      ]);
      // Karuzela musi być w oknie: karta_view liczy się dopiero przy prawdziwej widoczności.
      await page.locator(KARUZELA).evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
      await page.waitForTimeout(1300);
      await page.locator(`${KARUZELA} [data-karuzela-next]`).click();
      await expect(page.locator(`${KARUZELA} [data-qa="karta"]:not([inert])`)).toHaveAttribute("aria-label", "2 z 4");
      // Strzałka leży pod kartą, więc klik przesunął stronę: wracamy do góry karuzeli, jak czytelnik czytający kartę.
      await page.locator(KARUZELA).evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
      // 1 s widoczności po zakończeniu płynnego przewijania: dajemy czas ponad próg.
      await expect
        .poll(async () => (await zdarzenia(page)).filter((z) => z.nazwa === "karta_view" && z.params.nr === 2), {
          timeout: 6000,
        })
        .toEqual([
          { nazwa: "karta_view", params: { dzial: "marketing", karta: "przyklad", nr: 2, sposob: "strzalka" } },
        ]);
      await page.locator(`${KARUZELA} [data-karuzela-next]`).click();
      await expect(page.locator(`${KARUZELA} [data-qa="karta"]:not([inert])`)).toHaveAttribute("aria-label", "3 z 4");

      const widoki = (await zdarzenia(page)).filter((z) => z.nazwa === "karta_view");
      expect(widoki.map((w) => `${w.params.dzial}:${w.params.nr}`)).toEqual([...new Set(widoki.map((w) => `${w.params.dzial}:${w.params.nr}`))]);

      // Link opinii otwiera nową kartę: blokujemy nawigację, zdarzenie leci z handlera kliknięcia.
      await page.evaluate(() =>
        document.addEventListener("click", (e) => e.preventDefault(), { capture: true }),
      );
      await page.locator(`${KARUZELA} [data-qa="link-opinii"]`).click();
      expect((await zdarzenia(page)).filter((z) => z.nazwa === "review_click")).toEqual([
        { nazwa: "review_click", params: { dzial: "marketing" } },
      ]);
      expect(HOME_V4.dzialy.lista.marketing.karty[2].opinia.zrodlo).toBe("google");
    });

    test("karta_view nie liczy czasu, gdy karta przeglądarki jest ukryta", async ({ page }) => {
      await page.addInitScript(() => {
        window.dataLayer = window.dataLayer ?? [];
        window.gtag = (...a: unknown[]) => {
          window.dataLayer.push(a);
        };
        let ukryta = false;
        Object.defineProperty(document, "visibilityState", { get: () => (ukryta ? "hidden" : "visible") });
        window.ustawUkryta = (v: boolean) => {
          ukryta = v;
          document.dispatchEvent(new Event("visibilitychange"));
        };
      });
      await doDzialow(page);
      await page.evaluate(() => window.ustawUkryta(true));
      await wybierzDzial(page, "marketing");
      await page.locator(KARUZELA).evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
      await page.waitForTimeout(1600);
      expect((await zdarzenia(page)).filter((z) => z.nazwa === "karta_view")).toEqual([]);
      await page.evaluate(() => window.ustawUkryta(false));
      await expect
        .poll(async () => (await zdarzenia(page)).filter((z) => z.nazwa === "karta_view").length, { timeout: 4000 })
        .toBe(1);
    });
  });
}
