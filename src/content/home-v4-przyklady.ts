// Zakładki przykładów na kartach 2 działów. Etykiety i plakietki są z pliku tekstów v4 (sekcja 4).
// Dane przykładów (źródło i wynik) dochodzą w Task 7; do tego czasu każda zakładka ma pusty zapis.

export type DzialId = "telefony" | "marketing" | "sprzedaz" | "zamowienia" | "logistyka";

export type PrzykladDane = {
  wyglad: "dokument" | "sms" | "mail" | "rozmowa" | "wycinek";
  zrodlo: { naglowek: string | null; linie: readonly string[]; zaznaczenia: readonly string[] };
  wynik: { podpis: string; wiersze: readonly (readonly [string, string])[] };
};

export type ZakladkaPrzykladu = {
  etykieta: string;
  // Krótsza etykieta na 390 px; null = ta sama co etykieta.
  etykietaKrotka: string | null;
  plakietka: string;
  dane: PrzykladDane;
};

type TrzyZakladki = readonly [ZakladkaPrzykladu, ZakladkaPrzykladu, ZakladkaPrzykladu];

const DO_UZUPELNIENIA: PrzykladDane = {
  wyglad: "dokument",
  zrodlo: { naglowek: null, linie: [], zaznaczenia: [] },
  wynik: { podpis: "", wiersze: [] },
};

function zakladka(etykieta: string, etykietaKrotka: string | null, plakietka: string): ZakladkaPrzykladu {
  return { etykieta, etykietaKrotka, plakietka, dane: DO_UZUPELNIENIA };
}

const PLAKIETKA_WIZYTY = "Zbudowany dla poradni medycznej, oddany 21.09.2026";
const PLAKIETKA_SKLEPY = "Działa w dwóch sklepach, w pierwszym od grudnia 2025";
const PLAKIETKA_NDA = "Działa codziennie u klienta pod NDA od 12.10.2026";
const PLAKIETKA_NAPOJE = "Uruchomiony u dystrybutora napojów 15.10.2026";
const PLAKIETKA_MECHANIZM = "Ten sam mechanizm, przykład możliwości";

export const PRZYKLADY: Readonly<Record<DzialId, TrzyZakladki>> = {
  telefony: [
    zakladka("Umówienie wizyty", null, PLAKIETKA_WIZYTY),
    zakladka("Przełożenie wizyty", null, PLAKIETKA_WIZYTY),
    zakladka("Status zamówienia", null, "W budowie dla sklepu internetowego"),
  ],
  marketing: [
    zakladka("Pytanie klienta", "Pytanie", PLAKIETKA_SKLEPY),
    zakladka("Nowy produkt", "Produkt", PLAKIETKA_SKLEPY),
    zakladka("Stary wpis do odświeżenia", "Odświeżenie", PLAKIETKA_SKLEPY),
  ],
  sprzedaz: [
    zakladka("Wiadomość z rynku", null, PLAKIETKA_NDA),
    zakladka("Rejestr firm", null, PLAKIETKA_NDA),
    zakladka("Ogłoszenie o pracę", null, PLAKIETKA_NDA),
  ],
  zamowienia: [
    zakladka("SMS", null, PLAKIETKA_NAPOJE),
    zakladka("Mail", null, PLAKIETKA_NAPOJE),
    zakladka("PDF", null, "Zbudowany dla hurtowni blach, przekazany 04.09.2026"),
  ],
  logistyka: [
    zakladka("Dokument przyjęcia", "PZ", "Działa u klienta od kwietnia 2026"),
    zakladka("Faktura", "Faktura", PLAKIETKA_MECHANIZM),
    zakladka("Zlecenie transportowe", "Zlecenie", PLAKIETKA_MECHANIZM),
  ],
};
