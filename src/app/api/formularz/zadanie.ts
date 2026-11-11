// Wspólne zabezpieczenia tras /api/formularz i /api/formularz/termin: ten sam klucz limitu,
// kontrola Content-Type i Origin, żeby podtrasa nie była słabsza od głównej.

export const ADRES_AWARYJNY = "kontakt@lessmanual.ai";

export function kluczKlienta(zadanie: Request): string {
  const przekazane = zadanie.headers.get("x-forwarded-for");
  const pierwszy = przekazane?.split(",")[0]?.trim();
  return pierwszy && pierwszy.length > 0 ? pierwszy : "nieznany";
}

export function zTejSamejStrony(zrodlo: string, zadanie: Request): boolean {
  try {
    const host = zadanie.headers.get("x-forwarded-host") ?? zadanie.headers.get("host") ?? new URL(zadanie.url).host;
    return new URL(zrodlo).host === host;
  } catch {
    return false;
  }
}

/** Tylko JSON z własnej strony: obca strona nie wyśle „prostego” POST text/plain bez preflight CORS. */
export function czyZadanieZWlasnejStrony(zadanie: Request): "ok" | "typ" | "origin" {
  if (!(zadanie.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return "typ";
  }
  const zrodlo = zadanie.headers.get("origin");
  if (zrodlo !== null && !zTejSamejStrony(zrodlo, zadanie)) {
    return "origin";
  }
  return "ok";
}
