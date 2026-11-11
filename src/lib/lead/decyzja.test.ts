import { describe, expect, it } from "vitest";
import { zdecyduj } from "@/content/formularz";
import { odpowiedz, odpowiedziPodstawowe } from "./przyklady";

// Reguły z FORMULARZ.md sekcja 2. Każdy test opisuje, czemu dana firma ma trafić na dany ekran.

describe("odsiew twardy", () => {
  it("odsiewa firmę 1-9 osób z budżetem do 5 tys. zł, bo projekty zaczynają się od kilkunastu tysięcy", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ wielkosc: odpowiedz("os_1_9"), budzet: odpowiedz("do_5k") }),
    );
    expect(decyzja.trasa).toBe("odsiew");
  });

  it("odsiewa budżet do 5 tys. zł z „Na razie się rozglądam”, bo brak budżetu i pilności to strata kalendarza", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ budzet: odpowiedz("do_5k"), termin: odpowiedz("rozgladam_sie") }),
    );
    expect(decyzja.trasa).toBe("odsiew");
  });

  it("nie odsiewa samego budżetu do 5 tys. zł, bo twardy odsiew wymaga obu warunków", () => {
    const decyzja = zdecyduj(odpowiedziPodstawowe({ budzet: odpowiedz("do_5k") }));
    expect(decyzja.trasa).toBe("A");
  });

  it("nie odsiewa samej firmy 1-9 osób z większym budżetem", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ wielkosc: odpowiedz("os_1_9"), budzet: odpowiedz("15_25k") }),
    );
    expect(decyzja.trasa).toBe("A");
  });

  it("nie odsiewa samego „Na razie się rozglądam” przy budżecie 5-15 tys. zł", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ budzet: odpowiedz("5_15k"), termin: odpowiedz("rozgladam_sie") }),
    );
    expect(decyzja.trasa).not.toBe("odsiew");
  });

  it("odsiew wygrywa z dużą firmą: kolejność reguł to najpierw odsiew, potem droga", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({
        wielkosc: odpowiedz("os_250_plus"),
        budzet: odpowiedz("do_5k"),
        termin: odpowiedz("rozgladam_sie"),
      }),
    );
    expect(decyzja.trasa).toBe("odsiew");
  });

  it("odsiew nie niesie znaczników, bo nie ma rozmowy, którą trzeba przygotować", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ wielkosc: odpowiedz("os_1_9"), budzet: odpowiedz("do_5k") }),
    );
    expect(decyzja.znaczniki).toEqual([]);
  });
});

describe("duża firma", () => {
  it("firma ponad 250 osób dostaje kalendarz dużej firmy, bo decyzja zapada po pierwszej rozmowie", () => {
    expect(zdecyduj(odpowiedziPodstawowe({ wielkosc: odpowiedz("os_250_plus") })).trasa).toBe("duza_firma");
  });

  it("decyzja przez dział zakupów albo przetarg oznacza dużą firmę", () => {
    expect(zdecyduj(odpowiedziPodstawowe({ decyzja: odpowiedz("zakupy_przetarg") })).trasa).toBe("duza_firma");
  });

  it("rola „Zbieram oferty dla zarządu” oznacza dużą firmę", () => {
    expect(zdecyduj(odpowiedziPodstawowe({ rola: odpowiedz("zbieram_oferty") })).trasa).toBe("duza_firma");
  });

  it("decyzja „Zarząd po zebraniu ofert” oznacza dużą firmę", () => {
    expect(zdecyduj(odpowiedziPodstawowe({ decyzja: odpowiedz("zarzad_oferty") })).trasa).toBe("duza_firma");
  });

  it("duża firma wygrywa z drogą B, bo kalendarz dużej firmy ma 45 minut jak droga A", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ wielkosc: odpowiedz("os_250_plus"), etap: odpowiedz("nie_wiem_od_czego") }),
    );
    expect(decyzja.trasa).toBe("duza_firma");
  });
});

describe("droga A, B, C", () => {
  it.each([
    ["wiem_co_boli", "A"],
    ["lista_pomyslow", "A"],
    // Nowa odpowiedź zatwierdzona 11.11: firma z pierwszym wdrożeniem idzie na rozmowę 45 min (A).
    ["juz_wdrozylismy", "A"],
    ["nie_wiem_od_czego", "B"],
    ["najpierw_zobaczyc", "C"],
  ])("odpowiedź %s prowadzi do drogi %s, bo tak mapuje pytanie 6 o etap wdrażania AI", (etap, droga) => {
    expect(zdecyduj(odpowiedziPodstawowe({ etap: odpowiedz(etap) })).trasa).toBe(droga);
  });
});

describe("znaczniki", () => {
  it("budżet 5-15 tys. zł przy drodze A zostaje drogą A ze znacznikiem, żeby Bartek zaproponował Mapę albo pilota", () => {
    const decyzja = zdecyduj(odpowiedziPodstawowe({ budzet: odpowiedz("5_15k") }));
    expect(decyzja.trasa).toBe("A");
    expect(decyzja.znaczniki).toContain("budzet_ponizej_S");
  });

  it("budżet 5-15 tys. zł przy drodze B nie dostaje znacznika, bo Mapa jest już właściwym krokiem", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ budzet: odpowiedz("5_15k"), etap: odpowiedz("nie_wiem_od_czego") }),
    );
    expect(decyzja.znaczniki).not.toContain("budzet_ponizej_S");
  });

  it("budżet „Jeszcze nie wiem” nie zmienia drogi i nie dodaje znacznika", () => {
    const decyzja = zdecyduj(odpowiedziPodstawowe({ budzet: odpowiedz("nie_wiem") }));
    expect(decyzja.trasa).toBe("A");
    expect(decyzja.znaczniki).toEqual([]);
  });

  it("„W tym miesiącu” z budżetem od 15 tys. zł dostaje priorytet (najbliższe 3 dni robocze)", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ termin: odpowiedz("w_tym_miesiacu"), budzet: odpowiedz("25_50k") }),
    );
    expect(decyzja.znaczniki).toContain("priorytet");
  });

  it("„W tym miesiącu” z budżetem 5-15 tys. zł nie dostaje priorytetu", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ termin: odpowiedz("w_tym_miesiacu"), budzet: odpowiedz("5_15k") }),
    );
    expect(decyzja.znaczniki).not.toContain("priorytet");
  });

  it("budżet od 15 tys. zł bez pilnego terminu nie dostaje priorytetu", () => {
    const decyzja = zdecyduj(odpowiedziPodstawowe({ budzet: odpowiedz("ponad_50k") }));
    expect(decyzja.znaczniki).not.toContain("priorytet");
  });
});

describe("osoba decyzyjna", () => {
  it("właściciel decydujący sam jest decydentem", () => {
    expect(zdecyduj(odpowiedziPodstawowe()).decydent).toBe(true);
  });

  it("wspólnik decydujący ze wspólnikiem jest decydentem", () => {
    const decyzja = zdecyduj(
      odpowiedziPodstawowe({ rola: odpowiedz("wspolnik"), decyzja: odpowiedz("ze_wspolnikiem") }),
    );
    expect(decyzja.decydent).toBe(true);
  });

  it("właściciel z decyzją „Jeszcze nie wiem” nie jest oznaczony jako decydent: reguła wymaga obu warunków", () => {
    expect(zdecyduj(odpowiedziPodstawowe({ decyzja: odpowiedz("nie_wiem") })).decydent).toBe(false);
  });

  it("dyrektor nie jest decydentem nawet przy „Ja sam”", () => {
    expect(zdecyduj(odpowiedziPodstawowe({ rola: odpowiedz("dyrektor") })).decydent).toBe(false);
  });
});
