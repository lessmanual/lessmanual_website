import {
  PYTANIA,
  PYTANIE_ZRODLO,
  type Decyzja,
  type Trasa,
  type TrasaZKalendarzem,
} from "@/content/formularz";
import type { OdpowiedziZgloszenia, Zgloszenie, ZgloszeniePelne } from "./typy";

// Rekordy w kształcie realnych kolumn tabel crm_* (odczyt schematu 11.11.2026, bez migracji).
// Wartości stałe (`tenant_id`, `direction`, `link_status`, `confidence`) zgodne z istniejącymi danymi.

export const TENANT_ID = "lessmanual";
export const NASTEPNY_KROK = "Rozmowa z kalendarza Cal.com (termin wybiera klient)";

export type MetadataZgloszenia = {
  wersja_formularza: string;
  rodzaj: Zgloszenie["rodzaj"];
  droga: Trasa;
  znaczniki: readonly string[];
  odpowiedzi: Readonly<
    Record<string, { ids: readonly string[]; etykiety: readonly string[]; teksty: Readonly<Record<string, string>> }>
  >;
  user_agent: string;
};

export type FirmaDoZapisu = {
  tenant_id: string;
  name: string;
  website: string;
  size: string | null;
  source: string;
};

export type KontaktDoZapisu = {
  tenant_id: string;
  company_id: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  role: string | null;
  is_decision_maker: boolean;
  source: string;
  confidence: number;
  is_primary: boolean;
};

export type SzansaDoZapisu = {
  tenant_id: string;
  company_id: string | null;
  contact_id: string;
  title: string;
  product: string;
  stage: string;
  source: string;
  next_step: string;
  notes: string | null;
  metadata: MetadataZgloszenia;
};

export type InterakcjaDoZapisu = {
  tenant_id: string;
  company_id: string | null;
  contact_id: string;
  deal_id: string;
  type: string;
  channel: string;
  direction: string;
  link_status: string;
  title: string;
  summary: string;
  occurred_at: string;
  metadata: MetadataZgloszenia & { resend_id?: string };
};

function etykietaOdpowiedzi(pytanieId: string, odpowiedzi: OdpowiedziZgloszenia): string | null {
  const pytanie = PYTANIA.find((kandydat) => kandydat.id === pytanieId);
  const id = odpowiedzi[pytanieId]?.ids[0];
  return pytanie?.odpowiedzi.find((odpowiedz) => odpowiedz.id === id)?.etykieta ?? null;
}

/** Źródło do `source`: `formularz_www:<id odpowiedzi z pytania „Skąd o nas wiesz?”>`. */
export function zrodloZgloszenia(odpowiedzi: OdpowiedziZgloszenia): string {
  const id = odpowiedzi[PYTANIE_ZRODLO]?.ids[0];
  return id === undefined ? "formularz_www" : `formularz_www:${id}`;
}

const PRODUKTY: Readonly<Record<TrasaZKalendarzem, string>> = {
  A: "droga_A",
  duza_firma: "droga_A",
  B: "mapa_ai",
  C: "pilot",
};

export function produktDlaTrasy(trasa: Trasa): string {
  return trasa === "odsiew" ? "odsiew" : PRODUKTY[trasa];
}

/** User agent skrócony do 120 znaków; IP nie trafia do CRM. */
export function zbudujMetadata(zgloszenie: Zgloszenie, decyzja: Decyzja, userAgent: string): MetadataZgloszenia {
  return {
    wersja_formularza: zgloszenie.wersja,
    rodzaj: zgloszenie.rodzaj,
    droga: decyzja.trasa,
    znaczniki: decyzja.znaczniki,
    odpowiedzi: Object.fromEntries(
      PYTANIA.map((pytanie) => {
        const wybrane = zgloszenie.odpowiedzi[pytanie.id];
        const etykiety = (wybrane?.ids ?? []).map(
          (id) => pytanie.odpowiedzi.find((odpowiedz) => odpowiedz.id === id)?.etykieta ?? id,
        );
        return [pytanie.id, { ids: wybrane?.ids ?? [], etykiety, teksty: wybrane?.teksty ?? {} }];
      }),
    ),
    user_agent: userAgent.slice(0, 120),
  };
}

export function zbudujFirme(zgloszenie: ZgloszeniePelne): FirmaDoZapisu {
  return {
    tenant_id: TENANT_ID,
    name: zgloszenie.kontakt.firma,
    website: zgloszenie.kontakt.strona,
    size: etykietaOdpowiedzi("wielkosc", zgloszenie.odpowiedzi),
    source: zrodloZgloszenia(zgloszenie.odpowiedzi),
  };
}

function rolaKlienta(odpowiedzi: OdpowiedziZgloszenia): string | null {
  const wybrane = odpowiedzi.rola;
  const etykieta = etykietaOdpowiedzi("rola", odpowiedzi);
  const wpis = wybrane?.teksty[wybrane.ids[0] ?? ""];
  return wpis !== undefined ? wpis : etykieta;
}

export function zbudujKontakt(
  zgloszenie: Zgloszenie,
  decyzja: Decyzja,
  companyId: string | null,
): KontaktDoZapisu {
  if (zgloszenie.rodzaj === "odsiew") {
    // Brak imienia na ekranie „Nie teraz”, więc w `full_name` ląduje adres e-mail.
    return {
      tenant_id: TENANT_ID,
      company_id: companyId,
      full_name: zgloszenie.email,
      email: zgloszenie.email,
      phone: null,
      role: rolaKlienta(zgloszenie.odpowiedzi),
      is_decision_maker: decyzja.decydent,
      source: "formularz_www",
      confidence: 1,
      is_primary: true,
    };
  }
  return {
    tenant_id: TENANT_ID,
    company_id: companyId,
    full_name: zgloszenie.kontakt.imie,
    email: zgloszenie.kontakt.email,
    phone: zgloszenie.kontakt.telefon,
    role: rolaKlienta(zgloszenie.odpowiedzi),
    is_decision_maker: decyzja.decydent,
    source: "formularz_www",
    confidence: 1,
    is_primary: true,
  };
}

export function zbudujSzanse(
  zgloszenie: Zgloszenie,
  decyzja: Decyzja,
  companyId: string | null,
  contactId: string,
  userAgent: string,
): SzansaDoZapisu {
  const metadata = zbudujMetadata(zgloszenie, decyzja, userAgent);
  const source = zrodloZgloszenia(zgloszenie.odpowiedzi);
  if (zgloszenie.rodzaj === "odsiew") {
    return {
      tenant_id: TENANT_ID,
      company_id: companyId,
      contact_id: contactId,
      title: `${zgloszenie.email}: odsiew, prośba o przykłady`,
      product: produktDlaTrasy("odsiew"),
      stage: "formularz_odsiew",
      source,
      next_step: "Wysłać przykłady (filmiki z systemami)",
      notes: null,
      metadata,
    };
  }
  const opisTrasy = decyzja.trasa === "duza_firma" ? "duża firma, droga A" : `droga ${decyzja.trasa}`;
  return {
    tenant_id: TENANT_ID,
    company_id: companyId,
    contact_id: contactId,
    title: `${zgloszenie.kontakt.firma}: ${opisTrasy}`,
    product: produktDlaTrasy(decyzja.trasa),
    stage: "formularz",
    source,
    next_step: NASTEPNY_KROK,
    notes: decyzja.trasa === "duza_firma" ? "duża firma, decyzja po 1. rozmowie" : null,
    metadata,
  };
}

export function zbudujInterakcje(
  zgloszenie: Zgloszenie,
  decyzja: Decyzja,
  ids: { companyId: string | null; contactId: string; dealId: string },
  podsumowanie: string,
  terazIso: string,
  userAgent: string,
): InterakcjaDoZapisu {
  return {
    tenant_id: TENANT_ID,
    company_id: ids.companyId,
    contact_id: ids.contactId,
    deal_id: ids.dealId,
    type: "formularz",
    channel: "strona",
    direction: "inbound",
    link_status: "linked",
    title: "Formularz www",
    summary: podsumowanie,
    occurred_at: terazIso,
    metadata: zbudujMetadata(zgloszenie, decyzja, userAgent),
  };
}
