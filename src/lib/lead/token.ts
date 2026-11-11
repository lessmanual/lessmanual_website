// Token rezerwacji: dowód, że wywołujący `/api/formularz/termin` dostał go od `/api/formularz`
// po zapisie konkretnej szansy. Delta QA 11.11: token nie może nieść ID szansy jawnym tekstem i nie
// może opierać się na kluczu service role. Dlatego treść (ID szansy + termin ważności) jest
// szyfrowana AES-256-GCM (szyfrowanie z uwierzytelnieniem: podmiana dowolnego bajtu = odrzucenie),
// kluczem z osobnego sekretu `FORMULARZ_TOKEN_SECRET`, który istnieje tylko na serwerze.

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

export const WAZNOSC_TOKENU_MS = 24 * 60 * 60 * 1000;
export const ZMIENNA_SEKRETU_TOKENU = "FORMULARZ_TOKEN_SECRET";

const WZORZEC_UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DLUGOSC_IV = 12;
const DLUGOSC_TAGU = 16;

/** Sekret tokenu z env albo null (wtedy formularz działa, ale bez zapisu terminu). */
export function czytajSekretTokenu(env: Readonly<Record<string, string | undefined>> = process.env): string | null {
  const wartosc = env[ZMIENNA_SEKRETU_TOKENU];
  return wartosc !== undefined && wartosc.length >= 32 ? wartosc : null;
}

function klucz(sekret: string): Buffer {
  return createHash("sha256").update(sekret).digest();
}

/** Token: base64url(iv | szyfrogram `dealId.wygasaMs` | tag GCM). */
export function wystawToken(dealId: string, terazMs: number, sekret: string): string {
  const iv = randomBytes(DLUGOSC_IV);
  const szyfr = createCipheriv("aes-256-gcm", klucz(sekret), iv);
  const tresc = Buffer.concat([szyfr.update(`${dealId}.${terazMs + WAZNOSC_TOKENU_MS}`, "utf8"), szyfr.final()]);
  return Buffer.concat([iv, tresc, szyfr.getAuthTag()]).toString("base64url");
}

/** Zwraca `dealId` przy poprawnym, niewygasłym tokenie od tego serwera, inaczej null. */
export function sprawdzToken(token: unknown, terazMs: number, sekret: string): string | null {
  if (typeof token !== "string" || token.length === 0 || token.length > 200 || !/^[A-Za-z0-9_-]+$/.test(token)) {
    return null;
  }
  const bajty = Buffer.from(token, "base64url");
  if (bajty.length <= DLUGOSC_IV + DLUGOSC_TAGU) {
    return null;
  }
  const iv = bajty.subarray(0, DLUGOSC_IV);
  const tag = bajty.subarray(bajty.length - DLUGOSC_TAGU);
  const szyfrogram = bajty.subarray(DLUGOSC_IV, bajty.length - DLUGOSC_TAGU);
  let jawny: string;
  try {
    const deszyfr = createDecipheriv("aes-256-gcm", klucz(sekret), iv);
    deszyfr.setAuthTag(tag);
    jawny = Buffer.concat([deszyfr.update(szyfrogram), deszyfr.final()]).toString("utf8");
  } catch {
    // Zły klucz albo zmieniony bajt: GCM odrzuca uwierzytelnienie.
    return null;
  }
  const [dealId, wygasa, nadmiar] = jawny.split(".");
  if (nadmiar !== undefined || dealId === undefined || wygasa === undefined) {
    return null;
  }
  if (!WZORZEC_UUID.test(dealId) || !/^\d{1,15}$/.test(wygasa)) {
    return null;
  }
  return Number(wygasa) > terazMs ? dealId : null;
}
