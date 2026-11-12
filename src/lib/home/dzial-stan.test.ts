import { describe, expect, it } from "vitest";
import {
  dzialZHasha,
  przewinOdRazuPoKlawiszu,
  stanPoczatkowy,
  zdarzenieRoomOpen,
  zmienStan,
} from "./dzial-stan";

describe("stan modułu działu", () => {
  it("bez wyboru aktywny jest Telefony, bo to dział 1", () => {
    expect(stanPoczatkowy("").aktywny).toBe("telefony");
  });

  it("kotwica #dzial-logistyka ustawia Logistykę", () => {
    expect(stanPoczatkowy("#dzial-logistyka").aktywny).toBe("logistyka");
  });

  it.each(["#dzial-", "#dzial-LOGISTYKA", "#dzial-xyz", "#dzialy", "#"])(
    "zła kotwica %s nie zmienia działu",
    (h) => {
      expect(dzialZHasha(h)).toBeNull();
    },
  );

  it("zmiana działu wraca na kartę 1", () => {
    const s = zmienStan({ ...stanPoczatkowy(""), karta: 3 }, { typ: "wybierz", dzial: "marketing", z: "zakladka" });
    expect([s.aktywny, s.karta]).toEqual(["marketing", 0]);
  });

  it("wybór w hero zapamiętuje dział hero, inne źródła go nie ruszają", () => {
    const hero = zmienStan(stanPoczatkowy(""), { typ: "wybierz", dzial: "sprzedaz", z: "hero" });
    expect(hero.wybranyWHero).toBe("sprzedaz");
    const potem = zmienStan(hero, { typ: "wybierz", dzial: "logistyka", z: "zakladka" });
    expect(potem.wybranyWHero).toBe("sprzedaz");
  });

  it("byloPierwszeWybranie przełącza się raz, bo przybliżenie pokoju jest tylko przy pierwszym wyborze", () => {
    const start = stanPoczatkowy("");
    expect(start.byloPierwszeWybranie).toBe(false);
    const jeden = zmienStan(start, { typ: "wybierz", dzial: "marketing", z: "hero" });
    expect(jeden.byloPierwszeWybranie).toBe(true);
    const dwa = zmienStan(jeden, { typ: "wybierz", dzial: "logistyka", z: "rzut" });
    expect(dwa.byloPierwszeWybranie).toBe(true);
  });

  it("room_open tylko przy faktycznej zmianie działu", () => {
    const s = stanPoczatkowy("");
    expect(zdarzenieRoomOpen(s, s, "hero")).toBeNull();
    const po = zmienStan(s, { typ: "wybierz", dzial: "marketing", z: "rzut" });
    expect(zdarzenieRoomOpen(s, po, "rzut")).toEqual({
      nazwa: "room_open",
      params: { dzial: "marketing", z: "rzut" },
    });
  });

  it("klawisz w hero przewija od razu dopiero po zaliczonym przejściu", () => {
    const s = stanPoczatkowy("");
    expect(przewinOdRazuPoKlawiszu(s)).toBe(false);
    expect(przewinOdRazuPoKlawiszu(zmienStan(s, { typ: "przejscie_zaliczone" }))).toBe(true);
  });

  it("akcja karta zmienia tylko kartę", () => {
    const s = zmienStan(stanPoczatkowy(""), { typ: "karta", nr: 2 });
    expect([s.aktywny, s.karta]).toEqual(["telefony", 2]);
  });
});
