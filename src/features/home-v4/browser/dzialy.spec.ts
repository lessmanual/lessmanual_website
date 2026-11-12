import { expect, test, type Page } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";

const KARUZELA = '[data-qa="karuzela"]:visible';
const KARTA = `${KARUZELA} [data-qa="karta"]`;
const NASTEPNA = `${KARUZELA} [data-karuzela-next]`;
// Zawężone do paska działów: karty przykładów mają własne zakładki role="tab".
const ZAKLADKA_AKTYWNA = '#dzialy-zakladki [role="tab"][aria-selected="true"]';

// html ma scroll-behavior: smooth, więc przewijamy „instant”. Po minięciu przejścia (Task 5) sekcja nad działami
// skraca się do pasa i kompensuje przewinięcie; czekamy na ten stan i przewijamy drugi raz, żeby pomiar był stabilny.
async function doDzialow(page: Page) {
  await page.goto("/");
  // Klik przed hydratacją przepada; data-gotowe pojawia się po niej.
  await expect(page.locator('#dzialy-zakladki[data-gotowe="true"]')).toBeAttached();
  const naSekcje = () =>
    page.locator("#dzialy").evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
  await naSekcje();
  // Na 390 przejście jest płaskie (bez przyklejenia), więc nie zmienia wysokości i nie ma na co czekać.
  const szerokosc = page.viewportSize()?.width ?? 0;
  if (szerokosc < 768) return;
  // Przejście zalicza się, gdy jego dół jest ponad 200 px nad ekranem (rootMargin), więc schodzimy niżej i wracamy.
  await page.evaluate(() => window.scrollBy({ top: 800, behavior: "instant" }));
  await expect(page.locator('[data-qa="przejscie"]')).toHaveAttribute("data-tryb", "pas");
  await naSekcje();
}

// Różnica scrollY w ciągu dwóch klatek; 0 = strona stoi (żadne płynne przewijanie nie trwa).
function ruchStrony(page: Page) {
  return page.evaluate(
    () =>
      new Promise<number>((gotowe) => {
        const przed = window.scrollY;
        requestAnimationFrame(() => requestAnimationFrame(() => gotowe(window.scrollY - przed)));
      }),
  );
}

// Karta nieobjęta `inert` to ta, którą widzi czytelnik; czekamy na nią, bo przewijanie jest płynne.
async function widocznaKarta(page: Page) {
  return page.locator(`${KARTA}:not([inert])`);
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`działy ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: telefon });

    test("bez JS: 20 kart w HTML, widoczny Telefony", async ({ browser }) => {
      // Indeksowanie i CLS 0: wszystkie karty są w HTML po SSR, nieaktywne działy ukryte atrybutem `hidden`.
      const kontekst = await browser.newContext({ javaScriptEnabled: false, viewport: vp });
      const page = await kontekst.newPage();
      await page.goto("/");
      await expect(page.locator('[data-qa="karta"]')).toHaveCount(20);
      await expect(page.locator(KARUZELA)).toHaveCount(1);
      await expect(page.locator(KARUZELA)).toHaveAttribute("data-dzial", "telefony");
      await kontekst.close();
    });

    test("zmiana działu nie przewija strony i wraca na kartę 1", async ({ page }) => {
      await doDzialow(page);
      await page.locator(NASTEPNA).click();
      await expect(await widocznaKarta(page)).toHaveAttribute("aria-label", "2 z 4");
      await page.locator(NASTEPNA).click();
      await expect(await widocznaKarta(page)).toHaveAttribute("aria-label", "3 z 4");
      await expect.poll(() => ruchStrony(page)).toBe(0);
      const przed = await page.evaluate(() => window.scrollY);
      // Klik przez DOM: Playwright przewinąłby stronę do zakładki, a sprawdzamy, że nie robi tego kod strony.
      await page.locator('[data-qa="zakladka-dzialu"][data-dzial="logistyka"]').evaluate((el) => {
        if (el instanceof HTMLElement) el.click();
      });
      await expect(page.locator(KARUZELA)).toHaveAttribute("data-dzial", "logistyka");
      await expect(await widocznaKarta(page)).toHaveAttribute("aria-label", "1 z 4");
      expect(await page.evaluate(() => window.scrollY)).toBe(przed);
      expect(await page.locator(`${KARUZELA} > [data-qa="tor"]`).evaluate((el) => el.scrollLeft)).toBe(0);
    });

    test("strzałka przesuwa o jedną kartę, kropka i inert się zgadzają", async ({ page }) => {
      await doDzialow(page);
      await page.locator(NASTEPNA).click();
      await expect(await widocznaKarta(page)).toHaveCount(1);
      await expect(await widocznaKarta(page)).toHaveAttribute("aria-label", "2 z 4");
      await expect(page.locator(`${KARTA}[inert]`)).toHaveCount(3);
      const kropki = page.locator(`${KARUZELA} [data-qa="kropka"]`);
      await expect(kropki).toHaveCount(4);
      await expect(kropki.nth(1)).toHaveAttribute("data-aktywna", "true");
      await expect(page.locator(`${KARUZELA} [data-qa="kropka"][data-aktywna="true"]`)).toHaveCount(1);
      // Poll: kolor kropki dochodzi przejściem 0,2 s.
      await expect.poll(() => kropki.nth(1).evaluate((el) => getComputedStyle(el).backgroundColor)).toBe("rgb(63, 208, 194)");
      await page.locator(`${KARUZELA} [data-qa="strzalka-poprzednia"]`).click();
      await expect(await widocznaKarta(page)).toHaveAttribute("aria-label", "1 z 4");
    });

    if (telefon) {
      test("390: karta ma 88% szerokości karuzeli (±1 px), zakładki ≥ 44 px wysokości, strona bez przewijania w bok", async ({
        page,
      }) => {
        await doDzialow(page);
        const tor = await page.locator(`${KARUZELA} > [data-qa="tor"]`).evaluate((el) => el.clientWidth);
        const karta = await page.locator(KARTA).first().evaluate((el) => el.getBoundingClientRect().width);
        expect(Math.abs(karta - tor * 0.88)).toBeLessThanOrEqual(1);
        const wysokosci = await page
          .locator('[data-qa="zakladka-dzialu"]')
          .evaluateAll((els) => els.map((el) => el.getBoundingClientRect().height));
        expect(wysokosci).toHaveLength(5);
        for (const h of wysokosci) expect(h).toBeGreaterThanOrEqual(44);
        const rzut = await page.locator('[data-qa="rzut"]').evaluate((el) => el.getBoundingClientRect().height);
        expect(Math.abs(rzut - 120)).toBeLessThanOrEqual(2);
        const [szer, okno] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
        expect(szer).toBeLessThanOrEqual(okno);
      });
    } else {
      test("1440: rzut ok. 420 px, klik w pokój Sprzedaż ustawia zakładkę Sprzedaż", async ({ page }) => {
        await doDzialow(page);
        const rzut = await page.locator('[data-qa="rzut"]').evaluate((el) => el.getBoundingClientRect().height);
        expect(Math.abs(rzut - 420)).toBeLessThanOrEqual(10);
        const karta = await page.locator(KARTA).first().evaluate((el) => el.getBoundingClientRect().width);
        expect(Math.abs(karta - 920)).toBeLessThanOrEqual(2);
        await page.locator('[data-qa="pokoj"][data-dzial="sprzedaz"]:visible').click();
        await expect(page.locator(ZAKLADKA_AKTYWNA)).toHaveAttribute("data-dzial", "sprzedaz");
        await expect(page.locator(KARUZELA)).toHaveAttribute("data-dzial", "sprzedaz");
        const [szer, okno] = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth]);
        expect(szer).toBeLessThanOrEqual(okno);
      });
    }

    test("dymek: przy wejściu tekst o strzałkach, po zmianie działu tekst działu", async ({ page }) => {
      await doDzialow(page);
      const dymek = page.locator('[data-qa="dymek-dzialy"]');
      await expect(dymek).toHaveText(HOME_V4.dzialy.bzykWejscie);
      await page.locator('[data-qa="zakladka-dzialu"][data-dzial="marketing"]').click();
      await expect(dymek).toHaveText(HOME_V4.dzialy.lista.marketing.bzyk);
    });

    test("strzałki klawiatury przechodzą między zakładkami", async ({ page }) => {
      await doDzialow(page);
      await page.locator('[data-qa="zakladka-dzialu"][data-dzial="telefony"]').focus();
      await page.keyboard.press("ArrowRight");
      await expect(page.locator(ZAKLADKA_AKTYWNA)).toHaveAttribute("data-dzial", "marketing");
      await expect(page.locator('[data-qa="zakladka-dzialu"][data-dzial="marketing"]')).toBeFocused();
      // Poll: wypełnienie zakładki dochodzi przejściem 0,15 s.
      await expect
        .poll(() => page.locator(ZAKLADKA_AKTYWNA).evaluate((el) => getComputedStyle(el).backgroundColor))
        .toBe("rgb(63, 208, 194)");
      // Alt+strzałka to „wstecz” w przeglądarce; zakładki nie mogą jej przejąć.
      await page.keyboard.press("Alt+ArrowRight");
      await expect(page.locator(ZAKLADKA_AKTYWNA)).toHaveAttribute("data-dzial", "marketing");
    });

    test("klawiatura: strzałka do ostatniej karty zostaje w fokusie", async ({ page }) => {
      // Strzałka wyłączona atrybutem `disabled` zrzucała fokus na body; na krańcu ma być tylko aria-disabled.
      await doDzialow(page);
      const nastepna = page.locator(NASTEPNA);
      await nastepna.focus();
      for (const etykieta of ["2 z 4", "3 z 4", "4 z 4"]) {
        await page.keyboard.press("Enter");
        await expect(await widocznaKarta(page)).toHaveAttribute("aria-label", etykieta);
      }
      await expect(nastepna).toHaveAttribute("aria-disabled", "true");
      await page.keyboard.press("Enter");
      await expect(await widocznaKarta(page)).toHaveAttribute("aria-label", "4 z 4");
      const fokus = await page.evaluate(() => {
        const el = document.activeElement;
        return el?.closest('[data-qa="karuzela"]') !== null && el?.matches("[data-karuzela-next], [data-qa='strzalka-poprzednia']");
      });
      expect(fokus).toBe(true);
    });
  });
}
