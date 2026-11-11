import { KALENDARZ_BAZA, slugKalendarza, type Znacznik, type TrasaZKalendarzem } from "@/content/formularz";

export type OsobaDoPrefillu = { imie: string; email: string; firma: string };

/**
 * Adres osadzenia Cal.com. Dane osoby (`name`, `email`, `notes`) dopisujemy dopiero na prośbę
 * wywołującego: wolno to zrobić po kliknięciu „Pokaż kalendarz” albo przy zapisanej zgodzie na
 * kategorię „kalendarz” (audyt P1, art. 399 PKE). Bez `osoba` adres nie zawiera żadnych danych.
 */
export function adresKalendarza(
  trasa: TrasaZKalendarzem,
  znaczniki: readonly Znacznik[],
  osoba: OsobaDoPrefillu | null,
): string {
  const parametry = ["embed=true"];
  if (osoba !== null) {
    const opisTrasy = trasa === "duza_firma" ? "duża firma, droga A" : `droga ${trasa}`;
    const notatka = `${opisTrasy}, ${osoba.firma}`.slice(0, 200);
    parametry.push(
      `name=${encodeURIComponent(osoba.imie)}`,
      `email=${encodeURIComponent(osoba.email)}`,
      `notes=${encodeURIComponent(notatka)}`,
    );
  }
  return `${KALENDARZ_BAZA}/${slugKalendarza(trasa, znaczniki)}?${parametry.join("&")}`;
}

/** Początek bezpiecznego Origin komunikatów z ramki: domeny, z których Cal.com serwuje embed. */
const ZAUFANE_ORIGINY = ["https://cal.com", "https://app.cal.com"] as const;

function jestObiektem(wartosc: unknown): wartosc is Record<string, unknown> {
  return typeof wartosc === "object" && wartosc !== null && !Array.isArray(wartosc);
}

/**
 * Wyciąga datę startu z komunikatu `postMessage` ramki Cal.com po udanej rezerwacji.
 * Format (kod Cal.com, embed-iframe.ts: `parent.postMessage({ originator: "CAL", ...detail })`,
 * detail = `{ type, namespace, fullType, data }`): `type` to `bookingSuccessfulV2` (`data.startTime`)
 * albo stary `bookingSuccessful` (`data.date`). Wszystko inne, w tym obcy Origin, daje null.
 */
export function terminZKomunikatu(origin: string, dane: unknown): string | null {
  if (!ZAUFANE_ORIGINY.some((zaufany) => zaufany === origin)) {
    return null;
  }
  if (!jestObiektem(dane) || dane.originator !== "CAL") {
    return null;
  }
  if (dane.type !== "bookingSuccessfulV2" && dane.type !== "bookingSuccessful") {
    return null;
  }
  const szczegoly = dane.data;
  if (!jestObiektem(szczegoly)) {
    return null;
  }
  const start = typeof szczegoly.startTime === "string" ? szczegoly.startTime : szczegoly.date;
  return typeof start === "string" && start.length > 0 ? start : null;
}
