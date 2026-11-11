// Zgoda na cookies (art. 399 PKE, art. 7 RODO). Jedno miejsce prawdy dla banera, Google Analytics
// i ramki kalendarza Cal.com. Zapis w localStorage pod kluczem `cookie-consent`; stary format
// (`analytics`, `marketing`, bez wersji) traktujemy jako brak zgody, bo nie dowodzi, na co zgodzono się.

// Zmień przy każdej zmianie treści banera albo Polityki cookies: baner wróci wszystkim użytkownikom.
export const WERSJA_ZGODY_COOKIES = "2026-11-11";

export const KLUCZ_ZGODY_COOKIES = "cookie-consent";
export const ZDARZENIE_ZGODY_COOKIES = "cookie-consent-updated";
export const ZDARZENIE_USTAWIEN_COOKIES = "open-cookie-settings";

// Po tylu miesiącach pytamy o zgodę ponownie (Polityka cookies, § 4.1).
export const WAZNOSC_ZGODY_MIESIECY = 12;

export type WyborCookies = {
  readonly analityczne: boolean;
  readonly kalendarz: boolean;
};

export type ZgodaCookies = WyborCookies & {
  readonly wersja: string;
  readonly czas: string;
};

export const BRAK_ZGODY: WyborCookies = { analityczne: false, kalendarz: false };

function jestObiektem(wartosc: unknown): wartosc is object {
  return typeof wartosc === "object" && wartosc !== null;
}

function dodajMiesiace(data: Date, miesiace: number): Date {
  const wynik = new Date(data.getTime());
  wynik.setUTCMonth(wynik.getUTCMonth() + miesiace);
  return wynik;
}

// Czysta funkcja: surowy tekst z localStorage -> ważny zapis albo null (brak, uszkodzony, stary
// format, inna wersja, starszy niż 12 miesięcy).
export function parsujZgodeCookies(surowy: string | null, teraz: Date): ZgodaCookies | null {
  if (surowy === null) return null;
  let dane: unknown;
  try {
    dane = JSON.parse(surowy);
  } catch {
    return null;
  }
  if (!jestObiektem(dane)) return null;
  if (!("wersja" in dane) || !("czas" in dane) || !("analityczne" in dane) || !("kalendarz" in dane)) {
    return null;
  }
  const { wersja, czas, analityczne, kalendarz } = dane;
  if (
    typeof wersja !== "string" ||
    typeof czas !== "string" ||
    typeof analityczne !== "boolean" ||
    typeof kalendarz !== "boolean"
  ) {
    return null;
  }
  if (wersja !== WERSJA_ZGODY_COOKIES) return null;
  const zapisano = new Date(czas);
  if (Number.isNaN(zapisano.getTime())) return null;
  if (dodajMiesiace(zapisano, WAZNOSC_ZGODY_MIESIECY).getTime() <= teraz.getTime()) return null;
  return { wersja, czas, analityczne, kalendarz };
}

// Ważny zapis zgody albo null (wtedy baner musi się pokazać).
export function czytajZapisZgodyCookies(): ZgodaCookies | null {
  try {
    return parsujZgodeCookies(window.localStorage.getItem(KLUCZ_ZGODY_COOKIES), new Date());
  } catch {
    return null;
  }
}

// Aktualny wybór użytkownika; bez ważnego zapisu wszystko opcjonalne jest wyłączone.
export function czytajZgodeCookies(): WyborCookies {
  const zapis = czytajZapisZgodyCookies();
  return zapis === null ? BRAK_ZGODY : { analityczne: zapis.analityczne, kalendarz: zapis.kalendarz };
}

// Zapisuje wybór z wersją i czasem, potem rozgłasza `cookie-consent-updated`.
// Gdy localStorage jest zablokowany, zgoda nie zostaje zapisana (zwracamy ją mimo to,
// żeby wywołujący mógł ją zastosować do bieżącej wizyty).
export function zapiszZgodeCookies(wybor: WyborCookies): ZgodaCookies {
  const zgoda: ZgodaCookies = {
    wersja: WERSJA_ZGODY_COOKIES,
    czas: new Date().toISOString(),
    analityczne: wybor.analityczne,
    kalendarz: wybor.kalendarz,
  };
  try {
    window.localStorage.setItem(KLUCZ_ZGODY_COOKIES, JSON.stringify(zgoda));
  } catch {
    // Zablokowany localStorage: wybór obowiązuje tylko do końca wizyty.
  }
  window.dispatchEvent(new Event(ZDARZENIE_ZGODY_COOKIES));
  return zgoda;
}
