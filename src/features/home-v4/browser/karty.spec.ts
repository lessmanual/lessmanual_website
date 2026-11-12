import { expect, test, type Page } from "@playwright/test";
import { DZIALY, HOME_V4, type DzialId } from "../../../content/home-v4";
import { LINKS } from "../../../content/site";

const KARUZELA = '[data-qa="karuzela"]:visible';

// Dział zmieniamy kliknięciem zakładki (przez DOM, bez przewijania), kartę strzałką karuzeli.
async function pokazKarte(page: Page, dzial: DzialId, nr: 1 | 2 | 3 | 4) {
  await page.locator(`[data-qa="zakladka-dzialu"][data-dzial="${dzial}"]`).evaluate((el) => {
    if (el instanceof HTMLElement) el.click();
  });
  await expect(page.locator(KARUZELA)).toHaveAttribute("data-dzial", dzial);
  for (let i = 1; i < nr; i++) await page.locator(`${KARUZELA} [data-karuzela-next]`).click();
  const karta = page.locator(`${KARUZELA} [data-qa="karta"]:not([inert])`);
  await expect(karta).toHaveAttribute("aria-label", `${nr} z 4`);
  return karta;
}

async function doDzialow(page: Page) {
  await page.goto("/");
  // Klik przed hydratacją przepada; data-gotowe pojawia się po niej.
  await expect(page.locator('#dzialy-zakladki[data-gotowe="true"]')).toBeAttached();
  await page.locator("#dzialy").evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`karty ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: telefon });

    test("karta 1 bez filmu nie ma przycisku odtwarzania", async ({ page }) => {
      await doDzialow(page);
      const karta = await pokazKarte(page, "telefony", 1);
      await expect(karta.locator('[data-qa="poster"]')).toContainText(HOME_V4.dzialy.lista.telefony.karty[0].tytul);
      await expect(karta.locator('[data-qa="odtworz"]')).toHaveCount(0);
      await expect(karta.locator("video")).toHaveCount(0);
      await expect(karta).toContainText(HOME_V4.dzialy.lista.telefony.karty[0].wyroznienie.tekst);
    });

    test("karta 1: 16 px od filmu do krawędzi karty z obu stron", async ({ page }) => {
      await doDzialow(page);
      const karta = await pokazKarte(page, "marketing", 1);
      const [k, f] = await Promise.all([
        karta.evaluate((el) => el.getBoundingClientRect().toJSON()),
        karta.locator('[data-qa="film"]').evaluate((el) => el.getBoundingClientRect().toJSON()),
      ]);
      expect(Math.abs(f.left - k.left - 16)).toBeLessThanOrEqual(1);
      // 390: film nad tekstem, więc 16 px z prawej; 1440: film obok tekstu, więc 16 px od góry.
      if (telefon) expect(Math.abs(k.right - f.right - 16)).toBeLessThanOrEqual(1);
      else expect(Math.abs(f.top - k.top - 16)).toBeLessThanOrEqual(1);
      const liczba = karta.locator('[data-qa="liczba"]');
      await expect(liczba).toHaveText("2 906");
      expect(await liczba.evaluate((el) => getComputedStyle(el).fontSize)).toBe("56px");
    });

    test(`Logistyka na 390 pokazuje PZ / Faktura / Zlecenie, na 1440 pełne nazwy`, async ({ page }) => {
      await doDzialow(page);
      const karta = await pokazKarte(page, "logistyka", 2);
      const napisy = await karta
        .locator('[data-qa="zakladka-przykladu"]')
        .evaluateAll((els) => els.map((el) => (el instanceof HTMLElement ? el.innerText.trim() : "")));
      expect(napisy).toEqual(telefon ? ["PZ", "Faktura", "Zlecenie"] : ["Dokument przyjęcia", "Faktura", "Zlecenie transportowe"]);
    });

    test("opinia Google ma link do wizytówki w nowym oknie i nie ma obrazka logo", async ({ page }) => {
      await doDzialow(page);
      const karta = await pokazKarte(page, "marketing", 3);
      await expect(karta.locator('[data-qa="opinia"]')).toHaveAttribute("data-zrodlo", "google");
      const link = karta.locator('[data-qa="link-opinii"]');
      await expect(link).toHaveAttribute("href", LINKS.googleProfile);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveText(HOME_V4.opinie.linkGoogle);
      await expect(karta.locator("img, svg[data-logo]")).toHaveCount(0);
    });

    test("Telefony karta 3 to referencja bez linku, Sprzedaż karta 3 to LinkedIn z tłumaczeniem", async ({ page }) => {
      await doDzialow(page);
      const telefony = await pokazKarte(page, "telefony", 3);
      await expect(telefony.locator('[data-qa="opinia"]')).toHaveAttribute("data-zrodlo", "referencja");
      await expect(telefony.locator('[data-qa="link-opinii"]')).toHaveCount(0);
      const sprzedaz = await pokazKarte(page, "sprzedaz", 3);
      const opinia = HOME_V4.dzialy.lista.sprzedaz.karty[2].opinia;
      await expect(sprzedaz.locator('[data-qa="opinia"]')).toHaveAttribute("data-zrodlo", "linkedin");
      if (opinia.zrodlo === "linkedin") await expect(sprzedaz).toContainText(opinia.tlumaczenie);
      await expect(sprzedaz.locator('[data-qa="link-opinii"]')).toHaveAttribute("href", LINKS.linkedinRecommendations);
    });

    test("każda zakładka przykładu każdego działu mieści się bez uciętego tekstu", async ({ page }) => {
      await doDzialow(page);
      for (const dzial of DZIALY) {
        const karta = await pokazKarte(page, dzial, 2);
        const wysokosci = new Set<number>();
        for (const nr of [0, 1, 2]) {
          const zakladka = karta.locator(`[data-qa="zakladka-przykladu"][data-nr="${nr}"]`);
          await zakladka.evaluate((el) => {
            if (el instanceof HTMLElement) el.click();
          });
          await expect(zakladka).toHaveAttribute("aria-selected", "true");
          // Kontener przewijany w bok (pasek zakładek na 390) nie ucina tekstu, tylko go przewija; pomijamy go.
          const uciete = await karta.evaluate((root) =>
            [root, ...root.querySelectorAll("*")]
              .filter((el) => el instanceof HTMLElement && el.offsetParent !== null)
              .filter((el) => !["auto", "scroll"].includes(getComputedStyle(el).overflowX))
              .filter((el) => el.scrollWidth > el.clientWidth + 1 || (el === root && el.scrollHeight > el.clientHeight + 1))
              .map((el) => `${el.tagName}.${el.className}: ${(el.textContent ?? "").slice(0, 40)}`),
          );
          expect(uciete, `${dzial} zakładka ${nr}`).toEqual([]);
          wysokosci.add(await page.locator(`${KARUZELA} > [data-qa="tor"]`).evaluate((el) => Math.round(el.getBoundingClientRect().height)));
        }
        // R12: wysokość może się zmienić przy zmianie działu (klik), ale nie przy zmianie zakładki przykładu.
        expect([...wysokosci], dzial).toHaveLength(1);
      }
      const [szer, okno] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      expect(szer).toBeLessThanOrEqual(okno);
    });

    test("zakładki przykładu: wszystkie w całości w pasku (łamią się, bez przewijania), ≥ 44 px, Home/End, aria-controls wskazuje istniejący panel", async ({ page }) => {
      await doDzialow(page);
      for (const dzial of DZIALY) {
        const karta = await pokazKarte(page, dzial, 2);
        const boxy = await karta
          .locator('[data-qa="zakladka-przykladu"]')
          .evaluateAll((els) =>
            els.map((el) => {
              const z = el.getBoundingClientRect();
              const p = el.parentElement?.getBoundingClientRect();
              // Zakładka w całości w pasku: wcześniej pasek przewijał się i trzecia zakładka była ucięta (QA 390 px).
              return { h: z.height, wPasku: p !== undefined && z.left >= p.left - 1 && z.right <= p.right + 1 };
            }),
          );
        for (const b of boxy) {
          expect(b.h).toBeGreaterThanOrEqual(44);
          expect(b.wPasku, dzial).toBe(true);
        }
        const kontrolowane = await karta
          .locator('[data-qa="zakladka-przykladu"]')
          .evaluateAll((els) => els.map((el) => document.getElementById(el.getAttribute("aria-controls") ?? "") !== null));
        expect(kontrolowane).toEqual([true, true, true]);
      }
      const karta = await pokazKarte(page, "telefony", 2);
      await karta.locator('[data-qa="zakladka-przykladu"][data-nr="0"]').focus();
      await page.keyboard.press("End");
      await expect(karta.locator('[data-qa="zakladka-przykladu"][data-nr="2"]')).toHaveAttribute("aria-selected", "true");
      await expect(karta.locator('[data-qa="zakladka-przykladu"][data-nr="2"]')).toBeFocused();
      await page.keyboard.press("Home");
      await expect(karta.locator('[data-qa="zakladka-przykladu"][data-nr="0"]')).toHaveAttribute("aria-selected", "true");
      const [szer, okno] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
      expect(szer).toBeLessThanOrEqual(okno);
    });

    test("wczytanie: zero przesunięć układu w sekcji działów", async ({ page }) => {
      // R12: bez stałej rezerwy wysokość daje treść kart z SSR; po hydratacji nic w sekcji nie może się przesunąć.
      await page.addInitScript(() => {
        const okno: Window & { przesuniecia?: number } = window;
        okno.przesuniecia = 0;
        new PerformanceObserver((lista) => {
          for (const wpis of lista.getEntries()) {
            const zrodla: readonly { node?: Node | null }[] = Reflect.get(wpis, "sources") ?? [];
            const wartosc = Number(Reflect.get(wpis, "value") ?? 0);
            const wDzialach = zrodla.some((z) => z.node instanceof Element && z.node.closest("#dzialy") !== null);
            if (wDzialach && !Reflect.get(wpis, "hadRecentInput")) okno.przesuniecia = (okno.przesuniecia ?? 0) + wartosc;
          }
        }).observe({ type: "layout-shift", buffered: true });
      });
      await doDzialow(page);
      await page.waitForTimeout(2000);
      expect(await page.evaluate(() => Number(Reflect.get(window, "przesuniecia") ?? 0))).toBe(0);
    });

    test("karta 4: nagłówek, plakietka, 5 pomysłów i dymek z tekstów", async ({ page }) => {
      await doDzialow(page);
      const karta = await pokazKarte(page, "zamowienia", 4);
      const { dzialy } = HOME_V4;
      await expect(karta.locator("h3")).toHaveText(dzialy.naglowekPomyslow);
      await expect(karta.locator("li")).toHaveCount(5);
      await expect(karta).toContainText(dzialy.plakietkaPomyslow);
      await expect(karta).toContainText(dzialy.bzykPomyslow);
      await expect(karta).toContainText(dzialy.liniaPomyslow);
    });
  });
}
