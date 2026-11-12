import { describe, expect, it } from "vitest";
import { CZAS_WIDOCZNOSCI_MS, NAZWA_KARTY, PROG_WIDOCZNOSCI, utworzRejestrWidokow } from "./pomiar";

describe("rejestr widoków kart", () => {
  it("przepuszcza kartę raz na widok strony", () => {
    const r = utworzRejestrWidokow();
    expect([r.pierwszyRaz("telefony", 1), r.pierwszyRaz("telefony", 1)]).toEqual([true, false]);
  });

  it("ta sama karta w innym dziale i inna karta w tym samym dziale liczą się osobno", () => {
    const r = utworzRejestrWidokow();
    expect([r.pierwszyRaz("telefony", 1), r.pierwszyRaz("marketing", 1), r.pierwszyRaz("telefony", 2)]).toEqual([true, true, true]);
  });

  it("dwa rejestry nie dzielą stanu", () => {
    expect(utworzRejestrWidokow().pierwszyRaz("telefony", 0)).toBe(true);
    expect(utworzRejestrWidokow().pierwszyRaz("telefony", 0)).toBe(true);
  });
});

describe("stałe pomiaru", () => {
  it("karta liczy się po 1 s widoczności co najmniej w 60 procentach", () => {
    expect(PROG_WIDOCZNOSCI).toBe(0.6);
    expect(CZAS_WIDOCZNOSCI_MS).toBe(1000);
  });

  it("nazwy kart zgadzają się z kolejnością karuzeli", () => {
    expect(NAZWA_KARTY).toEqual({ 0: "film", 1: "przyklad", 2: "opinia", 3: "pomysly" });
  });
});
