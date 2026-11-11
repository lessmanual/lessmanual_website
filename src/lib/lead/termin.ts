import type { Wynik } from "./typy";

export const MAKSYMALNY_WYPRZEDZENIE_DNI = 120;
const STREFA = "Europe/Warsaw";
const DZIEN_MS = 24 * 60 * 60 * 1000;

// ISO 8601 z jawnym przesunięciem (Z albo +hh:mm): bez strefy `Date.parse` zgadywałby ją po
// stronie serwera i termin mógłby się przesunąć o godziny.
const WZORZEC_ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d{1,3})?)?(Z|[+-]\d{2}:\d{2})$/;

/** Data startu rozmowy: ISO ze strefą, nie w przeszłości, najdalej za 120 dni. */
export function parsujTermin(surowa: unknown, teraz: Date): Wynik<Date> {
  if (typeof surowa !== "string" || surowa.length > 40 || !WZORZEC_ISO.test(surowa)) {
    return { ok: false, blad: "Nieprawidłowa data terminu." };
  }
  const data = new Date(surowa);
  if (Number.isNaN(data.getTime())) {
    return { ok: false, blad: "Nieprawidłowa data terminu." };
  }
  if (data.getTime() < teraz.getTime()) {
    return { ok: false, blad: "Termin jest w przeszłości." };
  }
  if (data.getTime() > teraz.getTime() + MAKSYMALNY_WYPRZEDZENIE_DNI * DZIEN_MS) {
    return { ok: false, blad: "Termin jest za daleko." };
  }
  return { ok: true, wartosc: data };
}

/** Tekst do `crm_deals.next_step`: czas ścienny w Warszawie, bo Bartek czyta go w kalendarzu. */
export function opisTerminu(data: Date): string {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: STREFA,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  // Szwedzki format daje „2026-11-16 10:00”, czyli dokładnie układ z CRM.
  return `Rozmowa z kalendarza Cal.com: ${formatter.format(data)} (${STREFA})`;
}
