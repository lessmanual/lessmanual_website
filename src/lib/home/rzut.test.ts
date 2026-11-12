import { describe, expect, it } from "vitest";
import { DZIALY } from "@/content/home-v4";
import { kameraPokoju, kameraSpoczynku, PLAN, srodekPokojuNaEkranie, transformKamery } from "./rzut";

describe("rzut firmy", () => {
  it("ma pokój dla każdego działu, bo klik w pokój ustawia zakładkę tego działu", () => {
    expect(PLAN.map((p) => p.id).sort()).toEqual([...DZIALY].sort());
  });

  it("pokoje wypełniają plan 960 × 600 bez nakładania, jak w szkicu", () => {
    const pole = PLAN.reduce((suma, p) => suma + p.w * p.d, 0);
    expect(pole).toBe(960 * 600);
  });

  it("w spoczynku cały budynek mieści się w scenie 420 px na 1440, bo rzut nie może być ucięty", () => {
    const k = kameraSpoczynku(1120, 420);
    expect(k.s).toBeGreaterThan(0.3);
    expect(k.s).toBeLessThanOrEqual(1.05);
    for (const pokoj of PLAN) {
      const { X, Y } = srodekPokojuNaEkranie(k, pokoj);
      expect(Math.abs(X)).toBeLessThan(1120 / 2);
      expect(Math.abs(Y)).toBeLessThan(420 / 2);
    }
  });

  // Wcześniej pokój siedział nisko (ty = +10% wysokości ze szkicu, gdzie robiło to miejsce na panel boczny).
  it("przybliżenie powiększa i stawia wybrany pokój na środku sceny", () => {
    const spoczynek = kameraSpoczynku(1120, 420);
    for (const pokoj of PLAN) {
      const k = kameraPokoju(1120, 420, pokoj);
      expect(k.s).toBeGreaterThan(spoczynek.s);
      const { X, Y } = srodekPokojuNaEkranie(k, pokoj);
      expect(Math.abs(X)).toBeLessThan(1);
      expect(Math.abs(Y)).toBeLessThan(1);
    }
  });

  it("transform ma ten sam porządek co .world w szkicu", () => {
    expect(transformKamery({ tx: 1, ty: 2, s: 0.5, cx: 3, cy: 4 })).toBe(
      "translate(1px, 2px) scale(0.5) rotateX(56deg) rotateZ(-40deg) translate(3px, 4px)",
    );
  });
});
