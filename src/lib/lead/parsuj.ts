import { PYTANIA, type PytanieKonfig } from "@/content/formularz";
import type {
  DaneKontaktowe,
  OdpowiedziZgloszenia,
  PoleKontaktu,
  WybranaOdpowiedz,
  Wynik,
  Zgloszenie,
} from "./typy";

export const LIMITY = {
  tekstPola: 200,
  imie: 120,
  firma: 200,
  strona: 200,
  email: 254,
  telefon: 30,
  wersja: 40,
} as const;

// Bez `*`, `%`, `,` i nawiasów: te znaki mają znaczenie w filtrach PostgREST (ilike, in, or).
const WZORZEC_EMAIL = /^[^\s@*%,()]+@[^\s@*%,()]+\.[^\s@*%,()]{2,}$/;
const WZORZEC_TELEFON = /^[0-9+()\-\s]{6,30}$/;

function jestObiektem(wartosc: unknown): wartosc is Record<string, unknown> {
  return typeof wartosc === "object" && wartosc !== null && !Array.isArray(wartosc);
}

function tekst(wartosc: unknown): string | null {
  return typeof wartosc === "string" ? wartosc.trim() : null;
}

function niepuste(wartosc: unknown, maks: number): string | null {
  const wynik = tekst(wartosc);
  return wynik !== null && wynik.length > 0 && wynik.length <= maks ? wynik : null;
}

/** Dopisuje `https://`, gdy użytkownik wpisał samą domenę; zwraca null dla adresu bez domeny. */
export function normalizujStrone(surowa: string): string | null {
  const wpis = surowa.trim();
  if (wpis.length === 0 || wpis.length > LIMITY.strona || /\s/.test(wpis)) {
    return null;
  }
  const zSchematem = /^https?:\/\//i.test(wpis) ? wpis : `https://${wpis}`;
  try {
    const adres = new URL(zSchematem);
    return adres.hostname.includes(".") ? zSchematem : null;
  } catch {
    return null;
  }
}

export function jestPoprawnymEmailem(wpis: string): boolean {
  return wpis.length <= LIMITY.email && WZORZEC_EMAIL.test(wpis);
}

export type SurowyKontakt = {
  imie: string;
  firma: string;
  strona: string;
  email: string;
  telefon: string;
};

/** Wspólna walidacja dla przeglądarki (komunikaty przy polach) i serwera (ta sama reguła). */
export function sprawdzKontakt(kontakt: SurowyKontakt): Partial<Record<PoleKontaktu, string>> {
  const bledy: Partial<Record<PoleKontaktu, string>> = {};
  const imie = kontakt.imie.trim();
  if (imie.length < 2 || imie.length > LIMITY.imie) {
    bledy.imie = "Wpisz imię i nazwisko.";
  }
  const firma = kontakt.firma.trim();
  if (firma.length < 1 || firma.length > LIMITY.firma) {
    bledy.firma = "Wpisz nazwę firmy.";
  }
  if (normalizujStrone(kontakt.strona) === null) {
    bledy.strona = "Wpisz adres strony, np. firma.pl.";
  }
  if (!jestPoprawnymEmailem(kontakt.email.trim())) {
    bledy.email = "Wpisz pełny adres, np. jan@firma.pl.";
  }
  const telefon = kontakt.telefon.trim();
  if (telefon.length > 0 && !WZORZEC_TELEFON.test(telefon)) {
    bledy.telefon = "Wpisz numer telefonu albo zostaw pole puste.";
  }
  return bledy;
}

function parsujOdpowiedzNaPytanie(pytanie: PytanieKonfig, surowa: unknown): Wynik<WybranaOdpowiedz> {
  if (!jestObiektem(surowa) || !Array.isArray(surowa.ids)) {
    return { ok: false, blad: `Brak odpowiedzi na pytanie ${pytanie.id}.` };
  }
  const ids: string[] = [];
  for (const id of surowa.ids) {
    if (typeof id !== "string") {
      return { ok: false, blad: `Nieprawidłowa odpowiedź na pytanie ${pytanie.id}.` };
    }
    if (!pytanie.odpowiedzi.some((odpowiedz) => odpowiedz.id === id)) {
      return { ok: false, blad: `Nieznana odpowiedź ${id} na pytanie ${pytanie.id}.` };
    }
    if (!ids.includes(id)) {
      ids.push(id);
    }
  }
  if (ids.length === 0) {
    return { ok: false, blad: `Brak odpowiedzi na pytanie ${pytanie.id}.` };
  }
  if (pytanie.typ === "single" && ids.length !== 1) {
    return { ok: false, blad: `Pytanie ${pytanie.id} przyjmuje jedną odpowiedź.` };
  }

  const surowyTeksty = jestObiektem(surowa.teksty) ? surowa.teksty : {};
  const teksty: Record<string, string> = {};
  for (const id of ids) {
    const odpowiedz = pytanie.odpowiedzi.find((kandydat) => kandydat.id === id);
    if (odpowiedz?.pole === undefined) {
      continue;
    }
    const wartosc = tekst(surowyTeksty[id]) ?? "";
    if (wartosc.length > LIMITY.tekstPola) {
      return { ok: false, blad: `Za długi tekst przy pytaniu ${pytanie.id}.` };
    }
    if (odpowiedz.pole.wymagane && wartosc.length === 0) {
      return { ok: false, blad: `Brak dopisku przy pytaniu ${pytanie.id}.` };
    }
    if (wartosc.length > 0) {
      teksty[id] = wartosc;
    }
  }
  return { ok: true, wartosc: { ids, teksty } };
}

function parsujOdpowiedzi(surowe: unknown): Wynik<OdpowiedziZgloszenia> {
  if (!jestObiektem(surowe)) {
    return { ok: false, blad: "Brak odpowiedzi." };
  }
  const wynik: Record<string, WybranaOdpowiedz> = {};
  for (const pytanie of PYTANIA) {
    const odpowiedz = parsujOdpowiedzNaPytanie(pytanie, surowe[pytanie.id]);
    if (!odpowiedz.ok) {
      return odpowiedz;
    }
    wynik[pytanie.id] = odpowiedz.wartosc;
  }
  return { ok: true, wartosc: wynik };
}

function parsujKontakt(surowy: unknown): Wynik<DaneKontaktowe> {
  if (!jestObiektem(surowy)) {
    return { ok: false, blad: "Brak danych kontaktowych." };
  }
  const pola: SurowyKontakt = {
    imie: tekst(surowy.imie) ?? "",
    firma: tekst(surowy.firma) ?? "",
    strona: tekst(surowy.strona) ?? "",
    email: tekst(surowy.email) ?? "",
    telefon: tekst(surowy.telefon) ?? "",
  };
  if (Object.keys(sprawdzKontakt(pola)).length > 0) {
    return { ok: false, blad: "Nieprawidłowe dane kontaktowe." };
  }
  const strona = normalizujStrone(pola.strona);
  if (strona === null) {
    return { ok: false, blad: "Nieprawidłowy adres strony." };
  }
  return {
    ok: true,
    wartosc: {
      imie: pola.imie,
      firma: pola.firma,
      strona,
      email: pola.email.toLowerCase(),
      telefon: pola.telefon.length > 0 ? pola.telefon : null,
    },
  };
}

/**
 * Parse, don't validate: z nieznanego JSON-a robimy typ, którego reszta kodu nie musi
 * już sprawdzać. Zgoda jest wymagana w obu rodzajach zgłoszeń, bo zapis do CRM bez niej
 * byłby przetwarzaniem danych bez podstawy.
 */
export function parsujZgloszenie(surowe: unknown): Wynik<Zgloszenie> {
  if (!jestObiektem(surowe)) {
    return { ok: false, blad: "Nieprawidłowe zgłoszenie." };
  }
  if (surowe.zgoda !== true) {
    return { ok: false, blad: "Brak zgody na kontakt." };
  }
  const wersja = niepuste(surowe.wersja, LIMITY.wersja);
  if (wersja === null) {
    return { ok: false, blad: "Brak wersji formularza." };
  }
  const odpowiedzi = parsujOdpowiedzi(surowe.odpowiedzi);
  if (!odpowiedzi.ok) {
    return odpowiedzi;
  }

  if (surowe.rodzaj === "odsiew") {
    const email = tekst(surowe.email);
    if (email === null || !jestPoprawnymEmailem(email)) {
      return { ok: false, blad: "Nieprawidłowy adres e-mail." };
    }
    return {
      ok: true,
      wartosc: { rodzaj: "odsiew", wersja, odpowiedzi: odpowiedzi.wartosc, email: email.toLowerCase() },
    };
  }
  if (surowe.rodzaj === "zgloszenie") {
    const kontakt = parsujKontakt(surowe.kontakt);
    if (!kontakt.ok) {
      return kontakt;
    }
    return {
      ok: true,
      wartosc: { rodzaj: "zgloszenie", wersja, odpowiedzi: odpowiedzi.wartosc, kontakt: kontakt.wartosc },
    };
  }
  return { ok: false, blad: "Nieznany rodzaj zgłoszenia." };
}

export type ZnacznikiBota = {
  pulapka: string;
  wypelnianieMs: number | null;
};

/** Odczyt pól antyspamowych jeszcze przed pełną walidacją (honeypot i czas wypełnienia). */
export function odczytajZnacznikiBota(surowe: unknown): ZnacznikiBota {
  if (!jestObiektem(surowe)) {
    return { pulapka: "", wypelnianieMs: null };
  }
  const pulapka = typeof surowe.pole_kontrolne === "string" ? surowe.pole_kontrolne : "";
  const wypelnianieMs =
    typeof surowe.wypelnianieMs === "number" && Number.isFinite(surowe.wypelnianieMs) ? surowe.wypelnianieMs : null;
  return { pulapka, wypelnianieMs };
}
