import { describe, expect, it } from "vitest";
import {
  DROGI,
  EKRAN_PROBA_NIEUDANA,
  ODPOWIEDZ_DLA_DROGI,
  PYTANIE_DROGA,
  ekranWynikuDrogi,
  odpowiedzDlaDrogi,
  slugKalendarza,
  znajdzPytanie,
} from "./formularz";

describe("odpowiedzDlaDrogi", () => {
  it("mapuje A, B, C na odpowiedzi pytania 6, bo przyciski strony wysyłają ?droga=X", () => {
    expect(odpowiedzDlaDrogi("A")).toBe("wiem_co_boli");
    expect(odpowiedzDlaDrogi("B")).toBe("nie_wiem_od_czego");
    expect(odpowiedzDlaDrogi("C")).toBe("najpierw_zobaczyc");
  });

  it("nieznana wartość i brak parametru nie zaznaczają niczego", () => {
    expect(odpowiedzDlaDrogi("D")).toBeNull();
    expect(odpowiedzDlaDrogi("b")).toBeNull();
    expect(odpowiedzDlaDrogi("")).toBeNull();
    expect(odpowiedzDlaDrogi(null)).toBeNull();
  });

  it("każde zaznaczone id istnieje w pytaniu 6 i prowadzi do tej samej drogi", () => {
    const pytanie = znajdzPytanie(PYTANIE_DROGA);
    for (const [droga, id] of Object.entries(ODPOWIEDZ_DLA_DROGI)) {
      expect(pytanie?.odpowiedzi.find((o) => o.id === id)?.droga).toBe(droga);
    }
  });
});

describe("odpowiedź o nieudanej próbie", () => {
  it("stoi zaraz po „Już coś wdrożyliśmy i chcemy iść dalej”, bo to najbliższe jej etapy", () => {
    const odpowiedzi = znajdzPytanie(PYTANIE_DROGA)?.odpowiedzi ?? [];
    const ids = odpowiedzi.map((o) => o.id);
    expect(ids[ids.indexOf("juz_wdrozylismy") + 1]).toBe("proba_nieudana");
    expect(odpowiedzi.find((o) => o.id === "proba_nieudana")?.etykieta).toBe("Próbowaliśmy, ale nie wyszło");
  });

  it("ekran wyniku ma własny dymek i tekst, a kalendarz to pilot 30 minut", () => {
    expect(ekranWynikuDrogi("C", ["wczesniejsza_proba_nieudana"])).toBe(EKRAN_PROBA_NIEUDANA);
    expect(slugKalendarza("C", ["wczesniejsza_proba_nieudana"])).toBe("pilot-30min");
  });

  it("zwykła droga C bez znacznika ma dotychczasowy ekran", () => {
    expect(ekranWynikuDrogi("C", [])).toBe(DROGI.C);
  });

  it("duża firma ze znacznikiem zostaje przy ekranie dużej firmy, bo kalendarz jest jak droga A", () => {
    expect(ekranWynikuDrogi("duza_firma", ["wczesniejsza_proba_nieudana"])).toBe(DROGI.duza_firma);
  });
});
