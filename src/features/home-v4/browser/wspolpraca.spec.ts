import { expect, test, type Page } from "@playwright/test";
import { HOME_V4 } from "../../../content/home-v4";

const SEKCJA = "#wspolpraca";
const KROK = '[data-qa="krok-osi"]';
const KROK_FORM = '[data-qa="krok-formularza"]';

async function doOsi(page: Page) {
  await page.goto("/");
  // Klik i obserwatory działają dopiero po hydratacji; data-gotowe pojawia się po niej.
  await expect(page.locator(`${SEKCJA} [data-qa="os-krokow"][data-gotowe="true"]`)).toBeAttached();
  await page.locator(SEKCJA).evaluate((el) => el.scrollIntoView({ block: "start", behavior: "instant" }));
}

async function ramki(page: Page, selektor: string) {
  const wynik = await page.locator(selektor).evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y + window.scrollY, w: r.width, h: r.height };
    }),
  );
  return wynik;
}

for (const vp of [
  { width: 390, height: 844 },
  { width: 1440, height: 900 },
]) {
  const telefon = vp.width === 390;
  test.describe(`współpraca ${vp.width}`, () => {
    test.use({ viewport: vp, hasTouch: telefon });

    test("sekcja ma H2 i lead z tekstów v4, a strona nie przewija się w bok", async ({ page }) => {
      await doOsi(page);
      await expect(page.locator(`${SEKCJA} h2`)).toHaveText(HOME_V4.wspolpraca.h2);
      await expect(page.locator(SEKCJA)).toContainText(HOME_V4.wspolpraca.lead);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    });

    if (telefon) {
      test("390: kroki jeden pod drugim przy lewej krawędzi, karta na pełną szerokość", async ({ page }) => {
        await doOsi(page);
        const kroki = await ramki(page, KROK);
        expect(kroki).toHaveLength(6);
        const kontener = await ramki(page, `${SEKCJA} .lm-container`);
        for (const k of kroki) {
          expect(k.x).toBeCloseTo(kroki[0].x, 0);
          expect(k.w).toBeGreaterThanOrEqual(0.9 * (kontener[0].w - 2 * 20));
        }
        for (let i = 1; i < kroki.length; i++) expect(kroki[i].y).toBeGreaterThan(kroki[i - 1].y);
        // Krok 0: trzy kafle jeden pod drugim.
        const kafle = await ramki(page, '[data-qa="kafel-drogi"]');
        expect(kafle).toHaveLength(3);
        expect(kafle[1].y).toBeGreaterThan(kafle[0].y + kafle[0].h - 1);
        expect(kafle[2].y).toBeGreaterThan(kafle[1].y + kafle[1].h - 1);
        // Cel dotyku min. 44 px.
        for (const k of kafle) expect(k.h).toBeGreaterThanOrEqual(44);
      });
    } else {
      test("1440: kroki 1-5 w jednym rzędzie, łuk z napisem widoczny", async ({ page }) => {
        await doOsi(page);
        const kroki = await ramki(page, KROK);
        expect(kroki).toHaveLength(6);
        for (let i = 1; i < kroki.length; i++) {
          expect(Math.abs(kroki[i].y - kroki[0].y)).toBeLessThan(2);
          expect(kroki[i].x).toBeGreaterThan(kroki[i - 1].x + 50);
        }
        const luk = page.locator('[data-qa="luk-powrotu"]');
        await expect(luk).toBeVisible();
        await expect(luk).toContainText(HOME_V4.wspolpraca.strzalkaPowrotu);
        // Łuk stoi nad osią, od kroku 5 do kroku 2.
        const [l] = await ramki(page, '[data-qa="luk-powrotu"]');
        expect(l.y + l.h).toBeLessThanOrEqual(kroki[0].y + 40);
        expect(l.x).toBeLessThan(kroki[2].x + kroki[2].w);
        expect(l.x + l.w).toBeGreaterThan(kroki[5].x);
        // Trzy kafle wachlarza widoczne obok siebie w jednej kolumnie kroku 0.
        await expect(page.locator('[data-qa="kafel-drogi"]')).toHaveCount(3);
        for (const k of await ramki(page, '[data-qa="kafel-drogi"]')) expect(k.x).toBeLessThan(kroki[1].x);
      });

      test("1440: tory wyrównane w poprzek kolumn, My gruby miedziany, Ty cienki, półka pod krokami 4 i 5", async ({
        page,
      }) => {
        await doOsi(page);
        // Jeden pomiar naraz (względem osi), bo układ strony może się jeszcze przesunąć między osobnymi odczytami.
        const { my, ty } = await page.locator('[data-qa="os-krokow"]').evaluate((os) => {
          const baza = os.getBoundingClientRect();
          const zmierz = (sel: string) =>
            Array.from(os.querySelectorAll(sel)).map((el) => {
              const r = el.getBoundingClientRect();
              return { x: r.x - baza.x, y: r.y - baza.y, w: r.width, h: r.height };
            });
          return { my: zmierz('[data-qa="tor-my"]'), ty: zmierz('[data-qa="tor-ty"]') };
        });
        expect(my).toHaveLength(6);
        expect(ty).toHaveLength(6);
        for (const b of my) expect(Math.abs(b.y - my[0].y)).toBeLessThanOrEqual(2);
        for (const b of ty) expect(Math.abs(b.y - ty[0].y)).toBeLessThanOrEqual(2);
        // Tor Ty leży pod torem My.
        expect(ty[0].y).toBeGreaterThan(my[0].y + 20);
        // Gruby pas miedzi pod blokami My: 6 px; cienkie obramowanie bloków Ty: 1 px.
        const grubosc = await page.locator('[class*="kroki"]').evaluate((el) => getComputedStyle(el, "::after").borderTopWidth);
        expect(grubosc).toBe("6px");
        const cienki = await page.locator('[data-qa="tor-ty"]').first().evaluate((el) => getComputedStyle(el).borderTopWidth);
        expect(cienki).toBe("1px");
        // Półka stoi pod kolumnami kroków 4 i 5 (zapala się od kroku 4), nie pod 0-2.
        const kroki = await ramki(page, KROK);
        const [polka] = await ramki(page, '[data-qa="polka"]');
        expect(polka.x).toBeGreaterThanOrEqual(kroki[4].x - 2);
        expect(polka.x + polka.w).toBeLessThanOrEqual(kroki[5].x + kroki[5].w + 2);
      });
    }

    test("łuk powrotu leży poza listą kroków i ma min. 16 px", async ({ page }) => {
      await doOsi(page);
      await expect(page.locator(`${SEKCJA} ol [data-qa="luk-powrotu"]`)).toHaveCount(0);
      await expect(page.locator(`${SEKCJA} [data-qa="luk-powrotu"]`)).toHaveCount(1);
      const px = await page.locator('[data-qa="luk-powrotu"] span').evaluate((el) => parseFloat(getComputedStyle(el).fontSize));
      expect(px).toBeGreaterThanOrEqual(16);
    });

    test("skok od razu do kroku 5 zapala też wcześniejsze kroki i półkę", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator(`${SEKCJA} [data-qa="os-krokow"][data-gotowe="true"]`)).toBeAttached();
      await page.locator(`${KROK}[data-nr="5"]`).evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
      for (const nr of [0, 1, 2, 3, 4, 5]) {
        await expect(page.locator(`${KROK}[data-nr="${nr}"]`)).toHaveAttribute("data-zapalony", "true");
      }
      await expect(page.locator('[data-qa="polka-system"]').first()).toHaveAttribute("data-pod-opieka", "true");
    });

    test("półka zapala się od kroku 4: trzy kafelki pod opieką", async ({ page }) => {
      await doOsi(page);
      await expect(page.locator('[data-qa="polka-system"]')).toHaveCount(3);
      for (const k of await page.locator('[data-qa="polka-system"]').all()) {
        await expect(k).toHaveAttribute("data-pod-opieka", "false");
      }
      await page.locator('[data-qa="polka"]').evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
      await expect(page.locator(`${KROK}[data-nr="4"]`)).toHaveAttribute("data-zapalony", "true");
      for (const k of await page.locator('[data-qa="polka-system"]').all()) {
        await expect(k).toHaveAttribute("data-pod-opieka", "true");
      }
      await expect(page.locator('[data-qa="polka"]')).toContainText(HOME_V4.wspolpraca.polka.klamra);
    });

    test("kafel Mapa AI prowadzi do formularza z zaznaczoną odpowiedzią Nie wiem, od czego zacząć w pytaniu 6", async ({
      page,
    }) => {
      await doOsi(page);
      const kafel = page.locator('[data-qa="kafel-drogi"][data-droga="B"]');
      await expect(kafel).toHaveAttribute("href", "/?droga=B#formularz");
      await expect(kafel).toHaveAttribute("id", "wejscie-mapa");
      await expect(page.locator('[data-qa="kafel-drogi"][data-droga="C"]')).toHaveAttribute("id", "wejscie-pilot");
      await kafel.click();
      await expect(page.locator("#formularz")).toBeInViewport();
      await expect(page.locator("#formularz-title")).toBeFocused();
      await expect(async () => {
        await page.getByRole("button", { name: /Zaczynamy/ }).click({ timeout: 1000 });
        await expect(page.locator(`${KROK_FORM}[data-krok="rola"]`)).toBeVisible({ timeout: 1000 });
      }).toPass();
      for (const krok of ["rola", "wielkosc", "decyzja", "bol", "programy"]) {
        await expect(page.locator(`${KROK_FORM}[data-krok="${krok}"]`)).toBeVisible();
        await page.locator(`${KROK_FORM} label`).first().click();
        await page.getByRole("button", { name: /Dalej/ }).click();
      }
      await expect(page.locator(`${KROK_FORM}[data-krok="etap"]`)).toBeVisible();
      await expect(page.getByLabel("Nie wiem, od czego zacząć")).toBeChecked();
    });

    test("link Gwarancji prowadzi do pytania 7 w FAQ", async ({ page }) => {
      await doOsi(page);
      const link = page.locator(`${SEKCJA} a`, { hasText: HOME_V4.wspolpraca.gwarancja.link });
      await expect(link).toHaveAttribute("href", "#pytanie-obietnica");
    });

    test("jedyna kwota w sekcji to 6 900 zł netto", async ({ page }) => {
      await doOsi(page);
      const tekst = await page.locator(SEKCJA).evaluate((el) => el.textContent ?? "");
      const kwoty = (tekst.match(/\d[\d\s ]*\s?zł/g) ?? []).map((k) => k.replace(/[\s ]+/g, " "));
      expect(kwoty).toEqual(["6 900 zł"]);
    });

    test("karty Ceny, Gwarancja i Dane i kod mają teksty z v4, etykiety cen pogrubione", async ({ page }) => {
      await doOsi(page);
      const w = HOME_V4.wspolpraca;
      await expect(page.locator(SEKCJA)).toContainText(w.dowod.zdanie1);
      await expect(page.locator(SEKCJA)).toContainText(w.dowod.zdanie2);
      await expect(page.locator(SEKCJA)).toContainText(w.ceny.drobnyDruk);
      await expect(page.locator(SEKCJA)).toContainText(w.gwarancja.tekst);
      await expect(page.locator(SEKCJA)).toContainText(w.daneKod.tekst);
      await expect(page.locator(`${SEKCJA} [data-qa="cena-etykieta"]`)).toHaveText([
        "Rozmowa z Bartkiem",
        "Mapa AI firmy",
        "Szybki pilot",
        "Wdrożenie",
        "Opieka",
      ]);
      // Film o współpracy: bez pliku nie ma miniatury ani przycisku.
      await expect(page.locator(`${SEKCJA} [data-qa="film-wspolpracy"]`)).toHaveCount(0);
    });
  });
}

test.describe("współpraca: ograniczony ruch", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("wszystkie węzły zapalone od razu, bez przewijania", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(`${SEKCJA} [data-qa="os-krokow"][data-gotowe="true"]`)).toBeAttached();
    for (const nr of [0, 1, 2, 3, 4, 5]) {
      await expect(page.locator(`${KROK}[data-nr="${nr}"]`)).toHaveAttribute("data-zapalony", "true");
    }
    await expect(page.locator('[data-qa="polka-system"]').first()).toHaveAttribute("data-pod-opieka", "true");
  });
});
