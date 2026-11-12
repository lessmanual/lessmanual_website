import { describe, expect, it } from "vitest";
import { odczytajZnacznikiBota, parsujZgloszenie, sprawdzKontakt } from "./parsuj";
import { KONTAKT_PRZYKLADOWY, odpowiedz, odpowiedziPodstawowe } from "./przyklady";

function poprawneZgloszenie(zmiany: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    rodzaj: "zgloszenie",
    wersja: "2026-11-11-v1",
    zgoda: true,
    odpowiedzi: odpowiedziPodstawowe(),
    kontakt: { ...KONTAKT_PRZYKLADOWY },
    ...zmiany,
  };
}

describe("parsujZgloszenie", () => {
  it("serwer przyjmuje proba_nieudana w pytaniu etap, bo to nowa odpowiedź formularza", () => {
    const odpowiedzi = odpowiedziPodstawowe({ etap: odpowiedz("proba_nieudana") });
    expect(parsujZgloszenie(poprawneZgloszenie({ odpowiedzi })).ok).toBe(true);
  });

  it("przyjmuje poprawne zgłoszenie i normalizuje e-mail oraz stronę, bo CRM szuka kontaktu po małych literach", () => {
    const wynik = parsujZgloszenie(poprawneZgloszenie());
    expect(wynik.ok).toBe(true);
    if (wynik.ok && wynik.wartosc.rodzaj === "zgloszenie") {
      expect(wynik.wartosc.kontakt.email).toBe("jan@kowalski-logistyka.pl");
      expect(wynik.wartosc.kontakt.strona).toBe("https://kowalski-logistyka.pl");
      expect(wynik.wartosc.kontakt.telefon).toBeNull();
    }
  });

  it("odrzuca zgłoszenie bez zgody, bo zapis danych osobowych wymaga zgody z ekranu kontaktowego", () => {
    expect(parsujZgloszenie(poprawneZgloszenie({ zgoda: false })).ok).toBe(false);
    expect(parsujZgloszenie(poprawneZgloszenie({ zgoda: "true" })).ok).toBe(false);
  });

  it("odrzuca zły adres e-mail, bo bez niego nie ma jak odpisać", () => {
    const kontakt = { ...KONTAKT_PRZYKLADOWY, email: "jan@firma" };
    expect(parsujZgloszenie(poprawneZgloszenie({ kontakt })).ok).toBe(false);
  });

  it("odrzuca e-mail ze znakami filtrów PostgREST, bo trafia do zapytania ilike", () => {
    const kontakt = { ...KONTAKT_PRZYKLADOWY, email: "a*b@firma.pl" };
    expect(parsujZgloszenie(poprawneZgloszenie({ kontakt })).ok).toBe(false);
  });

  it("odrzuca nadmiernie długie pola, bo nic w formularzu nie wymaga tysięcy znaków", () => {
    const kontakt = { ...KONTAKT_PRZYKLADOWY, firma: "x".repeat(201) };
    expect(parsujZgloszenie(poprawneZgloszenie({ kontakt })).ok).toBe(false);
    const odpowiedzi = odpowiedziPodstawowe({
      rola: { ids: ["inna"], teksty: { inna: "y".repeat(201) } },
    });
    expect(parsujZgloszenie(poprawneZgloszenie({ odpowiedzi })).ok).toBe(false);
  });

  it("odrzuca nieznane id odpowiedzi, bo metadata w CRM ma zawierać tylko znane klucze", () => {
    const odpowiedzi = odpowiedziPodstawowe({ budzet: odpowiedz("miliard") });
    expect(parsujZgloszenie(poprawneZgloszenie({ odpowiedzi })).ok).toBe(false);
  });

  it("odrzuca kilka odpowiedzi na pytanie jednokrotnego wyboru", () => {
    const odpowiedzi = odpowiedziPodstawowe({ budzet: odpowiedz("5_15k", "15_25k") });
    expect(parsujZgloszenie(poprawneZgloszenie({ odpowiedzi })).ok).toBe(false);
  });

  it("odrzuca brak odpowiedzi na któreś z pytań", () => {
    const bezBudzetu = Object.fromEntries(
      Object.entries(odpowiedziPodstawowe()).filter(([pytanie]) => pytanie !== "budzet"),
    );
    expect(parsujZgloszenie(poprawneZgloszenie({ odpowiedzi: bezBudzetu })).ok).toBe(false);
  });

  it("odrzuca „inną” rolę bez dopisku, bo bez niego odpowiedź nic nie mówi", () => {
    const odpowiedzi = odpowiedziPodstawowe({ rola: odpowiedz("inna") });
    expect(parsujZgloszenie(poprawneZgloszenie({ odpowiedzi })).ok).toBe(false);
  });

  it("przyjmuje nazwę programu księgowego bez dopisku, bo to pole opcjonalne", () => {
    const odpowiedzi = odpowiedziPodstawowe({ programy: odpowiedz("erp") });
    expect(parsujZgloszenie(poprawneZgloszenie({ odpowiedzi })).ok).toBe(true);
  });

  it("odrzuca nieznany rodzaj zgłoszenia i nie-obiekt", () => {
    expect(parsujZgloszenie(poprawneZgloszenie({ rodzaj: "inny" })).ok).toBe(false);
    expect(parsujZgloszenie("tekst").ok).toBe(false);
    expect(parsujZgloszenie(null).ok).toBe(false);
  });

  it("przyjmuje zgłoszenie „Nie teraz” z samym e-mailem i zgodą", () => {
    const wynik = parsujZgloszenie({
      rodzaj: "odsiew",
      wersja: "2026-11-11-v1",
      zgoda: true,
      email: "Ola@Firma.pl",
      odpowiedzi: odpowiedziPodstawowe(),
    });
    expect(wynik.ok).toBe(true);
    if (wynik.ok && wynik.wartosc.rodzaj === "odsiew") {
      expect(wynik.wartosc.email).toBe("ola@firma.pl");
    }
  });

  it("odrzuca „Nie teraz” bez zgody", () => {
    const wynik = parsujZgloszenie({
      rodzaj: "odsiew",
      wersja: "2026-11-11-v1",
      zgoda: false,
      email: "ola@firma.pl",
      odpowiedzi: odpowiedziPodstawowe(),
    });
    expect(wynik.ok).toBe(false);
  });
});

describe("sprawdzKontakt", () => {
  it("zgłasza błędy przy właściwych polach, żeby formularz pokazał je obok pola", () => {
    const bledy = sprawdzKontakt({ imie: "J", firma: "", strona: "bez kropki", email: "jan@", telefon: "abc" });
    expect(Object.keys(bledy).sort()).toEqual(["email", "firma", "imie", "strona", "telefon"]);
  });

  it("nie zgłasza błędów dla poprawnych danych z pustym telefonem", () => {
    expect(sprawdzKontakt(KONTAKT_PRZYKLADOWY)).toEqual({});
  });
});

describe("odczytajZnacznikiBota", () => {
  it("czyta pole pułapki i czas startu jeszcze przed pełną walidacją", () => {
    expect(odczytajZnacznikiBota({ pole_kontrolne: "http://spam", wypelnianieMs: 12000 })).toEqual({
      pulapka: "http://spam",
      wypelnianieMs: 12000,
    });
  });

  it("brak czasu startu zwraca null, żeby route mógł go potraktować jak zbyt szybkie wypełnienie", () => {
    expect(odczytajZnacznikiBota({}).wypelnianieMs).toBeNull();
  });
});

describe("zgoda marketingowa", () => {
  it("jest dobrowolna: brak pola albo wartość inna niż true daje false, bo domyślnie nie ma zgody", () => {
    for (const surowe of [poprawneZgloszenie(), poprawneZgloszenie({ zgodaMarketing: "true" }), poprawneZgloszenie({ zgodaMarketing: false })]) {
      const wynik = parsujZgloszenie(surowe);
      expect(wynik.ok && wynik.wartosc.zgodaMarketing).toBe(false);
    }
  });

  it("zaznaczona jest przekazywana dalej i nie jest warunkiem wysłania", () => {
    const wynik = parsujZgloszenie(poprawneZgloszenie({ zgodaMarketing: true }));
    expect(wynik.ok && wynik.wartosc.zgodaMarketing).toBe(true);
  });
});
