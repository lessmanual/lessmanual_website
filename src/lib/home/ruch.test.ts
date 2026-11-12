import { describe, expect, it } from "vitest";
import { katObrotu, kartaZPrzewiniecia, parametryObiektu, podzielEtykiete, zapaloneSlowa } from "./ruch";

describe("zapaloneSlowa", () => {
  it.each([
    [0, 0],
    [1, 19],
    [-0.2, 0],
    [1.3, 19],
    [0.5, 9],
  ])("zapaloneSlowa(%f, 19) = %i", (p, n) => {
    expect(zapaloneSlowa(p, 19)).toBe(n);
  });

  it("nie maleje przy rosnącym postępie, bo słowa raz zapalone nie gasną przy przewijaniu w dół", () => {
    let poprzednie = 0;
    for (let i = 0; i <= 100; i += 1) {
      const n = zapaloneSlowa(i / 100, 19);
      expect(n).toBeGreaterThanOrEqual(poprzednie);
      poprzednie = n;
    }
  });
});

describe("katObrotu i parametryObiektu", () => {
  it("obrót idzie od -26 do 30 stopni i jest przycięty do 0..1", () => {
    expect(katObrotu(0)).toBe(-26);
    expect(katObrotu(1)).toBe(30);
    expect(katObrotu(-3)).toBe(-26);
    expect(katObrotu(7)).toBe(30);
  });

  it("parametry obiektu na początku i końcu zgadzają się ze szkicem s4", () => {
    expect(parametryObiektu(0)).toEqual({ rot: -26, sweep: -60, skala: 0.94, poswiataKrycie: 0.7, poswiataSkala: 0.9 });
    expect(parametryObiektu(1)).toEqual({ rot: 30, sweep: 70, skala: 1.1, poswiataKrycie: 1.2, poswiataSkala: 1.15 });
  });
});

describe("kartaZPrzewiniecia", () => {
  it("zaokrągla do najbliższej karty i mieści się w 0..3", () => {
    expect(kartaZPrzewiniecia(0, 343, 12)).toBe(0);
    expect(kartaZPrzewiniecia(355 * 1.6, 343, 12)).toBe(2);
    expect(kartaZPrzewiniecia(99999, 343, 12)).toBe(3);
    expect(kartaZPrzewiniecia(-50, 343, 12)).toBe(0);
  });
});

describe("podzielEtykiete", () => {
  it("wycina etykietę wiersza ceny", () => {
    expect(podzielEtykiete("Rozmowa z Bartkiem: bez opłat.")).toEqual({ etykieta: "Rozmowa z Bartkiem", reszta: "bez opłat." });
  });

  it("wiersz bez dwukropka zostaje w całości", () => {
    expect(podzielEtykiete("Bez opłat.")).toEqual({ etykieta: null, reszta: "Bez opłat." });
  });

  it("dzieli tylko po pierwszym \": \"", () => {
    expect(podzielEtykiete("A: b: c")).toEqual({ etykieta: "A", reszta: "b: c" });
  });
});
