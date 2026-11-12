import { expect, test, type Page } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";

const SEKCJA = "section#opinie";
const RZAD = `${SEKCJA} [data-qa="opinie-rzad"]`;
const KARTA = `${RZAD} [data-qa="opinia"]`;

async function doRzedu(page: Page) {
  await page.goto("/");
  await expect(page.locator(RZAD)).toBeAttached();
  await page.locator(SEKCJA).evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`opinie ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: telefon });

    test("7 kart w kolejności z tekstów, każda w wyglądzie swojego źródła", async ({ page }) => {
      await doRzedu(page);
      await expect(page.locator(`${SEKCJA} h2`)).toHaveText(HOME_V4.opinie.h2);
      await expect(page.locator(SEKCJA)).toContainText(HOME_V4.opinie.tabliczka);
      const zrodla = await page.locator(KARTA).evaluateAll((els) => els.map((el) => el.getAttribute("data-zrodlo")));
      expect(zrodla).toEqual(["google", "google", "google", "referencja", "google", "google", "linkedin"]);
      expect(zrodla).toEqual(HOME_V4.opinie.karty.map((k) => k.zrodlo));
      // Kolejność z tekstów: pierwsza karta zaczyna się od tekstu pierwszej opinii.
      const pierwsza = HOME_V4.opinie.karty[0];
      if (pierwsza?.zrodlo === "google") {
        await expect(page.locator(KARTA).first()).toContainText(pierwsza.tekst.slice(0, 40));
      }
    });

    test("strona nie przewija się w bok", async ({ page }) => {
      await doRzedu(page);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });

    test("żadna opinia nie jest ucięta, karty mają równą wysokość", async ({ page }) => {
      await doRzedu(page);
      const wynik = await page.locator(KARTA).evaluateAll((els) =>
        els.map((el) => {
          const tekst = el.querySelector("blockquote");
          return {
            kartaUcieta: el.scrollHeight > el.clientHeight + 1,
            tekstUciety: tekst ? tekst.scrollHeight > tekst.clientHeight + 1 : true,
            h: Math.round(el.getBoundingClientRect().height),
          };
        }),
      );
      expect(wynik).toHaveLength(7);
      for (const w of wynik) {
        expect(w.kartaUcieta).toBe(false);
        expect(w.tekstUciety).toBe(false);
      }
      expect(new Set(wynik.map((w) => w.h)).size).toBe(1);
    });

    if (telefon) {
      test("390: rząd przewija się w bok w swoim kontenerze, karta ma 88% szerokości", async ({ page }) => {
        await doRzedu(page);
        const m = await page.locator(RZAD).evaluate((el) => ({
          szer: el.scrollWidth,
          klient: el.clientWidth,
          kartaW: el.firstElementChild?.getBoundingClientRect().width ?? 0,
          snap: getComputedStyle(el).scrollSnapType,
        }));
        expect(m.szer).toBeGreaterThan(m.klient);
        expect(m.snap).toContain("x");
        expect(m.kartaW / m.klient).toBeGreaterThan(0.84);
        expect(m.kartaW / m.klient).toBeLessThan(0.92);
        await expect(page.locator(`${SEKCJA} [data-qa="opinie-nastepna"]`)).toBeHidden();
      });
    } else {
      test("1440: trzy karty w całości widoczne, strzałka przesuwa o jedną", async ({ page }) => {
        await doRzedu(page);
        const widoczne = async () =>
          page.locator(RZAD).evaluate((rzad) => {
            const r = rzad.getBoundingClientRect();
            return Array.from(rzad.children).filter((k) => {
              const b = k.getBoundingClientRect();
              return b.left >= r.left - 1 && b.right <= r.right + 1;
            }).length;
          });
        expect(await widoczne()).toBe(3);
        const poprzednia = page.locator(`${SEKCJA} [data-qa="opinie-poprzednia"]`);
        const nastepna = page.locator(`${SEKCJA} [data-qa="opinie-nastepna"]`);
        await expect(poprzednia).toHaveAttribute("aria-disabled", "true");
        const krok = await page.locator(KARTA).evaluateAll((els) => {
          const a = els[0]?.getBoundingClientRect();
          const b = els[1]?.getBoundingClientRect();
          return a && b ? b.left - a.left : 0;
        });
        await nastepna.click();
        await expect.poll(async () => Math.round(await page.locator(RZAD).evaluate((el) => el.scrollLeft))).toBe(
          Math.round(krok),
        );
        await expect(poprzednia).toHaveAttribute("aria-disabled", "false");
        // Na końcu strzałka jest aria-disabled, nie disabled, więc fokus nie ginie.
        for (let i = 0; i < 6; i++) await nastepna.click();
        await expect(nastepna).toHaveAttribute("aria-disabled", "true");
        // toBeEnabled liczy aria-disabled jako wyłączenie, więc sprawdzamy brak natywnego atrybutu.
        expect(await nastepna.evaluate((el) => el.hasAttribute("disabled"))).toBe(false);
      });
    }
  });
}
