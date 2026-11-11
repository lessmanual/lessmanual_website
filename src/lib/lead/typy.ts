// Typy zgłoszenia z formularza. Zgłoszenie po `parsujZgloszenie` jest już poprawne:
// dalszy kod (decyzja, CRM, mail) nie sprawdza go ponownie.

export type WybranaOdpowiedz = {
  ids: readonly string[];
  /** Teksty z pól „inne” i nazw programów, kluczem jest id odpowiedzi. */
  teksty: Readonly<Record<string, string>>;
};

export type OdpowiedziZgloszenia = Readonly<Record<string, WybranaOdpowiedz>>;

export type DaneKontaktowe = {
  imie: string;
  firma: string;
  /** Znormalizowany adres z `https://`. */
  strona: string;
  /** Małymi literami. */
  email: string;
  telefon: string | null;
};

export type ZgloszeniePelne = {
  rodzaj: "zgloszenie";
  wersja: string;
  odpowiedzi: OdpowiedziZgloszenia;
  kontakt: DaneKontaktowe;
};

export type ZgloszenieOdsiew = {
  rodzaj: "odsiew";
  wersja: string;
  odpowiedzi: OdpowiedziZgloszenia;
  email: string;
};

export type Zgloszenie = ZgloszeniePelne | ZgloszenieOdsiew;

export type Wynik<T> = { ok: true; wartosc: T } | { ok: false; blad: string };

export type PoleKontaktu = "imie" | "firma" | "strona" | "email" | "telefon";
