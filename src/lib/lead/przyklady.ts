import type { OdpowiedziZgloszenia, WybranaOdpowiedz } from "./typy";

// Wspólne dane do testów: poprawny komplet odpowiedzi (właściciel firmy 31-100 osób, droga A).

export function odpowiedz(...ids: string[]): WybranaOdpowiedz {
  return { ids, teksty: {} };
}

export function odpowiedziPodstawowe(
  zmiany: Readonly<Record<string, WybranaOdpowiedz>> = {},
): OdpowiedziZgloszenia {
  return {
    rola: odpowiedz("wlasciciel"),
    wielkosc: odpowiedz("os_31_100"),
    decyzja: odpowiedz("ja_sam"),
    bol: odpowiedz("dokumenty", "zamowienia"),
    programy: { ids: ["erp"], teksty: { erp: "Subiekt" } },
    etap: odpowiedz("wiem_co_boli"),
    powod: odpowiedz("konkurencja"),
    budzet: odpowiedz("15_30k"),
    termin: odpowiedz("3_miesiace"),
    zrodlo: odpowiedz("chatgpt"),
    ...zmiany,
  };
}

export const KONTAKT_PRZYKLADOWY = {
  imie: "Jan Kowalski",
  firma: "Kowalski Logistyka",
  strona: "kowalski-logistyka.pl",
  email: "Jan@Kowalski-Logistyka.pl",
  telefon: "",
} as const;
