// POST /api/formularz: imperatywna powłoka formularza kwalifikującego.
// Kolejność: limit -> honeypot -> minimalny czas -> parsowanie -> konfiguracja -> zapis CRM -> mail.
// Logika decyzji i budowa rekordów są w czystym rdzeniu (src/lib/lead, src/content/formularz.ts).

import { zdecyduj, type Decyzja } from "@/content/formularz";
import {
  zbudujFirme,
  zbudujInterakcje,
  zbudujKontakt,
  zbudujSzanse,
  type InterakcjaDoZapisu,
} from "@/lib/lead/crm";
import { LIMIT_ZGLOSZEN, wyczyscWygasle, zajmijMiejsce, type StanLimitu } from "@/lib/lead/limit";
import { odczytajZnacznikiBota, parsujZgloszenie } from "@/lib/lead/parsuj";
import { zbudujMail, zbudujPodsumowanie, type IdentyfikatoryCrm } from "@/lib/lead/podsumowanie";
import { czytajSekretTokenu, wystawToken } from "@/lib/lead/token";
import type { Zgloszenie } from "@/lib/lead/typy";
import {
  BladCrm,
  czytajKonfiguracjeCrm,
  wstaw,
  zaktualizujMetadata,
  znajdzKontakt,
  type KonfiguracjaCrm,
} from "./crm-klient";
import { wyslijMail } from "./poczta";
import { ADRES_AWARYJNY, czyZadanieZWlasnejStrony, kluczKlienta } from "./zadanie";

export const runtime = "nodejs";
// Dane formularza zostają w UE (audyt P9). Uwaga: dokumentacja Next dla Vercel wymienia tę opcję
// przy runtime edge; dla funkcji Node region ustawia też projekt Vercel (Settings, Functions).
export const preferredRegion = "fra1";

const MINIMALNY_CZAS_WYPELNIENIA_MS = 4000;
const MAKSYMALNY_ROZMIAR_CIALA = 20_000;

// Limit w pamięci instancji: ochrona per instancja serverless, nie globalna (patrz lib/lead/limit.ts).
const stanLimitu: StanLimitu = new Map();

type OdpowiedzBledu = { ok: false; blad: string; mailto?: string };

function blad(status: number, komunikat: string, zMailto = false): Response {
  const tresc: OdpowiedzBledu = zMailto
    ? { ok: false, blad: komunikat, mailto: `mailto:${ADRES_AWARYJNY}` }
    : { ok: false, blad: komunikat };
  return Response.json(tresc, { status });
}

type ZapisCrm = {
  identyfikatory: IdentyfikatoryCrm;
  interakcja: InterakcjaDoZapisu;
};

/**
 * Kontakt już w CRM: używamy jego `id` i `company_id` (bez nowej firmy i kontaktu), a szansa
 * i interakcja zawsze są nowe. Przy awarii w środku zostają osierocone rekordy; to lepsze niż
 * utrata zgłoszenia, a mail z identyfikatorami pozwala je odnaleźć.
 */
async function zapiszWCrm(
  konfiguracja: KonfiguracjaCrm,
  zgloszenie: Zgloszenie,
  decyzja: Decyzja,
  podsumowanie: string,
  userAgent: string,
  terazIso: string,
): Promise<ZapisCrm> {
  const email = zgloszenie.rodzaj === "odsiew" ? zgloszenie.email : zgloszenie.kontakt.email;
  const istniejacy = await znajdzKontakt(konfiguracja, email);
  let companyId = istniejacy?.companyId ?? null;
  let contactId = istniejacy?.contactId ?? null;
  if (contactId === null) {
    if (zgloszenie.rodzaj === "zgloszenie") {
      companyId = await wstaw(konfiguracja, "crm_companies", zbudujFirme(zgloszenie));
    }
    contactId = await wstaw(konfiguracja, "crm_contacts", zbudujKontakt(zgloszenie, decyzja, companyId));
  }
  const dealId = await wstaw(
    konfiguracja,
    "crm_deals",
    zbudujSzanse(zgloszenie, decyzja, companyId, contactId, userAgent, terazIso),
  );
  const interakcja = zbudujInterakcje(
    zgloszenie,
    decyzja,
    { companyId, contactId, dealId },
    podsumowanie,
    terazIso,
    userAgent,
  );
  const interactionId = await wstaw(konfiguracja, "crm_interactions", interakcja);
  return { identyfikatory: { companyId, contactId, dealId, interactionId }, interakcja };
}

export async function POST(zadanie: Request): Promise<Response> {
  const teraz = Date.now();
  wyczyscWygasle(stanLimitu, teraz);
  if (!zajmijMiejsce(stanLimitu, kluczKlienta(zadanie), teraz)) {
    console.info(`[formularz] Limit przekroczony (${LIMIT_ZGLOSZEN.maks} zgłoszeń na okno)`);
    return blad(429, "Za dużo zgłoszeń z tego adresu. Spróbuj za kilka minut albo napisz na kontakt@lessmanual.ai");
  }

  const kontrola = czyZadanieZWlasnejStrony(zadanie);
  if (kontrola === "typ") {
    return blad(415, "Nieprawidłowe zgłoszenie.");
  }
  if (kontrola === "origin") {
    console.info("[formularz] Odrzucone: obcy Origin");
    return blad(403, "Nieprawidłowe zgłoszenie.");
  }

  const tekstCiala = await zadanie.text();
  if (tekstCiala.length > MAKSYMALNY_ROZMIAR_CIALA) {
    return blad(413, "Zgłoszenie jest za duże.");
  }
  let surowe: unknown;
  try {
    surowe = JSON.parse(tekstCiala);
  } catch {
    return blad(400, "Nieprawidłowe zgłoszenie.");
  }

  const znaczniki = odczytajZnacznikiBota(surowe);
  if (znaczniki.pulapka.length > 0) {
    // Bot wypełnił ukryte pole: odpowiadamy sukcesem, żeby nie uczyć go, co go zdradza.
    console.info("[formularz] Honeypot: zgłoszenie odrzucone bez zapisu");
    return Response.json({ ok: true, route: "A" });
  }
  if (znaczniki.wypelnianieMs === null || znaczniki.wypelnianieMs < MINIMALNY_CZAS_WYPELNIENIA_MS) {
    console.info("[formularz] Zbyt szybkie wypełnienie: odrzucone bez zapisu");
    return blad(400, "Spróbuj jeszcze raz za chwilę.");
  }

  const wynik = parsujZgloszenie(surowe);
  if (!wynik.ok) {
    return blad(400, "Sprawdź wypełnione pola i spróbuj jeszcze raz.");
  }
  const zgloszenie = wynik.wartosc;
  const decyzja = zdecyduj(zgloszenie.odpowiedzi);
  // Rodzaj zgłoszenia musi zgadzać się z regułami: „Nie teraz” tylko dla odsiewu i odwrotnie.
  if ((zgloszenie.rodzaj === "odsiew") !== (decyzja.trasa === "odsiew")) {
    return blad(422, "Odpowiedzi nie pasują do tego zgłoszenia. Zacznij formularz od nowa.");
  }

  const konfiguracja = czytajKonfiguracjeCrm();
  if (konfiguracja === null) {
    console.error("[formularz] Brak konfiguracji zapisu (zmienne środowiskowe serwera)");
    return blad(503, `Formularz chwilowo nie działa. Napisz na ${ADRES_AWARYJNY}`, true);
  }

  const userAgent = zadanie.headers.get("user-agent") ?? "";
  const email = zgloszenie.rodzaj === "odsiew" ? zgloszenie.email : zgloszenie.kontakt.email;
  const podsumowanie = zbudujPodsumowanie(zgloszenie, decyzja);

  let zapis: ZapisCrm;
  try {
    zapis = await zapiszWCrm(konfiguracja, zgloszenie, decyzja, podsumowanie, userAgent, new Date(teraz).toISOString());
  } catch (przyczyna) {
    const kod = przyczyna instanceof BladCrm ? `${przyczyna.tabela} HTTP ${przyczyna.status}` : "błąd sieci";
    console.error(`[formularz] Zapis do CRM nie powiódł się: ${kod}`);
    // Zgłoszenie nie może zginąć: mail z odpowiedziami idzie mimo braku zapisu.
    const mailAwaryjny = await wyslijMail(zbudujMail(zgloszenie, decyzja, podsumowanie, null), email);
    console.info(`[formularz] Mail awaryjny bez zapisu w CRM: ${mailAwaryjny === null ? "nie" : "tak"}`);
    return blad(502, `Nie udało się zapisać zgłoszenia. Napisz na ${ADRES_AWARYJNY}`, true);
  }

  const mailId = await wyslijMail(zbudujMail(zgloszenie, decyzja, podsumowanie, zapis.identyfikatory), email);
  if (mailId !== null) {
    const zapisano = await zaktualizujMetadata(konfiguracja, "crm_interactions", zapis.identyfikatory.interactionId, {
      ...zapis.interakcja.metadata,
      resend_id: mailId,
    }).catch(() => false);
    if (!zapisano) {
      console.error("[formularz] Nie udało się dopisać resend_id do interakcji");
    }
  }

  console.info(`[formularz] Zapisano zgłoszenie: droga ${decyzja.trasa}, mail ${mailId === null ? "nie" : "tak"}`);
  // Identyfikatory CRM idą tylko w mailu do Bartka. Odpowiedź zawiera co najwyżej token rezerwacji
  // (zaszyfrowany AES-GCM osobnym sekretem, ważny 24 h) do dopisania terminu w /api/formularz/termin. Token
  // dotyczy zawsze świeżo utworzonej szansy, więc nie pozwala sprawdzić, czy adres był już w CRM.
  const sekretTokenu = czytajSekretTokenu();
  if (sekretTokenu === null && zgloszenie.rodzaj === "zgloszenie") {
    // Bez sekretu zgłoszenie jest zapisane, ale termin z kalendarza nie trafi do CRM: to błąd konfiguracji.
    console.error("[formularz] Brak FORMULARZ_TOKEN_SECRET (min. 32 znaki): termin rozmowy nie zostanie zapisany w CRM");
  }
  if (zgloszenie.rodzaj === "zgloszenie") {
    return Response.json({
      ok: true,
      route: decyzja.trasa,
      rezerwacja: sekretTokenu === null ? null : wystawToken(zapis.identyfikatory.dealId, teraz, sekretTokenu),
    });
  }
  return Response.json({ ok: true, route: decyzja.trasa });
}
