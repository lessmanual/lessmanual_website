// Token rezerwacji: dowód, że wywołujący `/api/formularz/termin` dostał go od `/api/formularz`
// po zapisie konkretnej szansy. Odpowiedź formularza nie zdradza identyfikatorów CRM jako takich
// (zasada z QA), a dopisanie daty do szansy po `id` bez podpisu pozwoliłoby każdemu nadpisać
// cudzy wiersz. Sekretem HMAC jest klucz serwerowy, który i tak istnieje tylko na serwerze.

import { createHmac, timingSafeEqual } from "node:crypto";

export const WAZNOSC_TOKENU_MS = 24 * 60 * 60 * 1000;

const WZORZEC_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function podpisz(tresc: string, sekret: string): string {
  return createHmac("sha256", sekret).update(tresc).digest("base64url");
}

/** Format: `dealId.wygasaMs.podpis`. */
export function wystawToken(dealId: string, terazMs: number, sekret: string): string {
  const tresc = `${dealId}.${terazMs + WAZNOSC_TOKENU_MS}`;
  return `${tresc}.${podpisz(tresc, sekret)}`;
}

/** Zwraca `dealId` przy poprawnym podpisie i niewygasłym tokenie, inaczej null. */
export function sprawdzToken(token: unknown, terazMs: number, sekret: string): string | null {
  if (typeof token !== "string" || token.length > 200) {
    return null;
  }
  const czesci = token.split(".");
  const [dealId, wygasa, podpis] = czesci;
  if (czesci.length !== 3 || dealId === undefined || wygasa === undefined || podpis === undefined) {
    return null;
  }
  if (!WZORZEC_UUID.test(dealId) || !/^\d{1,15}$/.test(wygasa)) {
    return null;
  }
  const oczekiwany = Buffer.from(podpisz(`${dealId}.${wygasa}`, sekret));
  const otrzymany = Buffer.from(podpis);
  if (oczekiwany.length !== otrzymany.length || !timingSafeEqual(oczekiwany, otrzymany)) {
    return null;
  }
  return Number(wygasa) > terazMs ? dealId : null;
}
