// POST /api/formularz/termin: dopisuje datę rozmowy z kalendarza Cal.com do szansy w CRM
// (`next_step`, `next_step_due`). Wywołuje ją przeglądarka po zdarzeniu rezerwacji z ramki.
// Autoryzacja: token rezerwacji z /api/formularz (AES-256-GCM, sekret FORMULARZ_TOKEN_SECRET), bez jawnych ID z CRM.
// Kontrakt: { rezerwacja: string, termin: string (ISO ze strefą) } -> { ok: true } albo { ok: false }.

import { LIMIT_ZGLOSZEN, wyczyscWygasle, zajmijMiejsce, type StanLimitu } from "@/lib/lead/limit";
import { opisTerminu, parsujTermin } from "@/lib/lead/termin";
import { czytajSekretTokenu, sprawdzToken } from "@/lib/lead/token";
import { BladCrm, czytajKonfiguracjeCrm, zapiszTerminSzansy } from "../crm-klient";
import { czyZadanieZWlasnejStrony, kluczKlienta } from "../zadanie";

export const runtime = "nodejs";
export const preferredRegion = "fra1";

const MAKSYMALNY_ROZMIAR_CIALA = 2_000;

// Limit per instancja jak w głównej trasie; osobna mapa, bo moduły tras nie współdzielą stanu.
const stanLimitu: StanLimitu = new Map();

function blad(status: number): Response {
  return Response.json({ ok: false }, { status });
}

function jestObiektem(wartosc: unknown): wartosc is Record<string, unknown> {
  return typeof wartosc === "object" && wartosc !== null && !Array.isArray(wartosc);
}

export async function POST(zadanie: Request): Promise<Response> {
  const teraz = Date.now();
  wyczyscWygasle(stanLimitu, teraz);
  if (!zajmijMiejsce(stanLimitu, kluczKlienta(zadanie), teraz)) {
    console.info(`[formularz/termin] Limit przekroczony (${LIMIT_ZGLOSZEN.maks} na okno)`);
    return blad(429);
  }
  const kontrola = czyZadanieZWlasnejStrony(zadanie);
  if (kontrola === "typ") {
    return blad(415);
  }
  if (kontrola === "origin") {
    console.info("[formularz/termin] Odrzucone: obcy Origin");
    return blad(403);
  }

  const tekstCiala = await zadanie.text();
  if (tekstCiala.length > MAKSYMALNY_ROZMIAR_CIALA) {
    return blad(413);
  }
  let surowe: unknown;
  try {
    surowe = JSON.parse(tekstCiala);
  } catch {
    return blad(400);
  }
  if (!jestObiektem(surowe)) {
    return blad(400);
  }

  const konfiguracja = czytajKonfiguracjeCrm();
  if (konfiguracja === null) {
    console.error("[formularz/termin] Brak konfiguracji zapisu (zmienne środowiskowe serwera)");
    return blad(503);
  }
  const sekretTokenu = czytajSekretTokenu();
  if (sekretTokenu === null) {
    console.error("[formularz/termin] Brak sekretu tokenu rezerwacji (zmienna środowiskowa serwera)");
    return blad(503);
  }
  // Token przed parsowaniem daty: bez ważnego tokenu nic więcej nie jest sprawdzane.
  const dealId = sprawdzToken(surowe.rezerwacja, teraz, sekretTokenu);
  if (dealId === null) {
    console.info("[formularz/termin] Odrzucone: nieprawidłowy token rezerwacji");
    return blad(403);
  }
  const termin = parsujTermin(surowe.termin, new Date(teraz));
  if (!termin.ok) {
    return blad(400);
  }

  try {
    const zapisano = await zapiszTerminSzansy(
      konfiguracja,
      dealId,
      opisTerminu(termin.wartosc),
      termin.wartosc.toISOString(),
    );
    if (!zapisano) {
      console.error("[formularz/termin] Szansa z tokenu nie istnieje w CRM");
      return blad(404);
    }
  } catch (przyczyna) {
    const kod = przyczyna instanceof BladCrm ? `HTTP ${przyczyna.status}` : "błąd sieci";
    console.error(`[formularz/termin] Zapis terminu nie powiódł się: ${kod}`);
    return blad(502);
  }
  console.info("[formularz/termin] Zapisano termin rozmowy");
  return Response.json({ ok: true });
}
