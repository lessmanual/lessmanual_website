import "server-only";
// Adapter PostgREST do tabel crm_*. Klucz service role istnieje wyłącznie po stronie serwera
// (zmienne środowiskowe bez prefiksu NEXT_PUBLIC). Bez zależności npm: zwykły fetch.

import { TENANT_ID } from "@/lib/lead/crm";

export type KonfiguracjaCrm = {
  url: string;
  klucz: string;
};

const LIMIT_CZASU_MS = 8000;

function czytajKonfiguracje(): KonfiguracjaCrm | null {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const klucz = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !klucz) {
    return null;
  }
  return { url: url.replace(/\/+$/, ""), klucz };
}

export { czytajKonfiguracje as czytajKonfiguracjeCrm };

function naglowki(konfiguracja: KonfiguracjaCrm, zwrotReprezentacji: boolean): Record<string, string> {
  return {
    apikey: konfiguracja.klucz,
    Authorization: `Bearer ${konfiguracja.klucz}`,
    "Content-Type": "application/json",
    ...(zwrotReprezentacji ? { Prefer: "return=representation" } : {}),
  };
}

function jestObiektem(wartosc: unknown): wartosc is Record<string, unknown> {
  return typeof wartosc === "object" && wartosc !== null && !Array.isArray(wartosc);
}

function pierwszyWiersz(json: unknown): Record<string, unknown> | null {
  if (Array.isArray(json) && jestObiektem(json[0])) {
    return json[0];
  }
  return null;
}

export class BladCrm extends Error {
  constructor(
    readonly tabela: string,
    readonly status: number,
  ) {
    super(`Zapis do ${tabela} nie powiódł się (HTTP ${status})`);
    this.name = "BladCrm";
  }
}

/** Wstawia wiersz i zwraca jego `id` (nagłówek `Prefer: return=representation`). */
export async function wstaw(konfiguracja: KonfiguracjaCrm, tabela: string, wiersz: object): Promise<string> {
  const odpowiedz = await fetch(`${konfiguracja.url}/rest/v1/${tabela}`, {
    method: "POST",
    headers: naglowki(konfiguracja, true),
    body: JSON.stringify(wiersz),
    signal: AbortSignal.timeout(LIMIT_CZASU_MS),
  });
  if (!odpowiedz.ok) {
    throw new BladCrm(tabela, odpowiedz.status);
  }
  const wiersze: unknown = await odpowiedz.json();
  const id = pierwszyWiersz(wiersze)?.id;
  if (typeof id !== "string") {
    throw new BladCrm(tabela, odpowiedz.status);
  }
  return id;
}

export type IstniejacyKontakt = {
  contactId: string;
  companyId: string | null;
};

/**
 * Szuka kontaktu po e-mailu. `ilike` traktuje `_` jak znak wieloznaczny, więc wynik
 * porównujemy jeszcze dokładnie po stronie kodu.
 */
export async function znajdzKontakt(
  konfiguracja: KonfiguracjaCrm,
  email: string,
): Promise<IstniejacyKontakt | null> {
  const zapytanie =
    `tenant_id=eq.${TENANT_ID}&email=ilike.${encodeURIComponent(email)}` + "&select=id,company_id,email&limit=5";
  const odpowiedz = await fetch(`${konfiguracja.url}/rest/v1/crm_contacts?${zapytanie}`, {
    headers: naglowki(konfiguracja, false),
    signal: AbortSignal.timeout(LIMIT_CZASU_MS),
  });
  if (!odpowiedz.ok) {
    throw new BladCrm("crm_contacts", odpowiedz.status);
  }
  const wiersze: unknown = await odpowiedz.json();
  if (!Array.isArray(wiersze)) {
    return null;
  }
  for (const wiersz of wiersze) {
    if (
      jestObiektem(wiersz) &&
      typeof wiersz.id === "string" &&
      typeof wiersz.email === "string" &&
      wiersz.email.toLowerCase() === email
    ) {
      return { contactId: wiersz.id, companyId: typeof wiersz.company_id === "string" ? wiersz.company_id : null };
    }
  }
  return null;
}

/**
 * Dopisuje termin rozmowy do jednej szansy (PATCH po `id` i `tenant_id`). Zwraca true tylko, gdy
 * zmieniono dokładnie jeden wiersz, więc nieistniejące `id` nie daje fałszywego sukcesu.
 */
export async function zapiszTerminSzansy(
  konfiguracja: KonfiguracjaCrm,
  dealId: string,
  nextStep: string,
  nextStepDue: string,
): Promise<boolean> {
  const zapytanie = `id=eq.${encodeURIComponent(dealId)}&tenant_id=eq.${TENANT_ID}`;
  const odpowiedz = await fetch(`${konfiguracja.url}/rest/v1/crm_deals?${zapytanie}`, {
    method: "PATCH",
    headers: naglowki(konfiguracja, true),
    body: JSON.stringify({ next_step: nextStep, next_step_due: nextStepDue }),
    signal: AbortSignal.timeout(LIMIT_CZASU_MS),
  });
  if (!odpowiedz.ok) {
    throw new BladCrm("crm_deals", odpowiedz.status);
  }
  const wiersze: unknown = await odpowiedz.json();
  return Array.isArray(wiersze) && wiersze.length === 1;
}

/** Dopisuje `resend_id` do metadata interakcji (PATCH po `id=eq.<uuid>`, całe metadata, bo kolumna to jsonb). */
export async function zaktualizujMetadata(
  konfiguracja: KonfiguracjaCrm,
  tabela: string,
  id: string,
  metadata: object,
): Promise<boolean> {
  const odpowiedz = await fetch(`${konfiguracja.url}/rest/v1/${tabela}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: naglowki(konfiguracja, false),
    body: JSON.stringify({ metadata }),
    signal: AbortSignal.timeout(LIMIT_CZASU_MS),
  });
  return odpowiedz.ok;
}
