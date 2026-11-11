import { describe, expect, it } from "vitest";
import { WAZNOSC_TOKENU_MS, sprawdzToken, wystawToken } from "./token";

const DEAL = "3f2b6a10-5c1e-4d2a-9b7e-1a2b3c4d5e6f";
const SEKRET = "sekret-serwera-testowy";
const TERAZ = 1_800_000_000_000;

describe("token rezerwacji", () => {
  it("zwraca identyfikator szansy dla własnego, świeżego tokenu", () => {
    expect(sprawdzToken(wystawToken(DEAL, TERAZ, SEKRET), TERAZ + 1000, SEKRET)).toBe(DEAL);
  });

  it("odrzuca token podpisany innym sekretem, bo inaczej każdy mógłby dopisać termin do cudzej szansy", () => {
    expect(sprawdzToken(wystawToken(DEAL, TERAZ, "inny"), TERAZ, SEKRET)).toBeNull();
  });

  it("odrzuca podmieniony identyfikator szansy przy starym podpisie", () => {
    const [, wygasa, podpis] = wystawToken(DEAL, TERAZ, SEKRET).split(".");
    const inny = "00000000-0000-4000-8000-000000000000";
    expect(sprawdzToken(`${inny}.${wygasa}.${podpis}`, TERAZ, SEKRET)).toBeNull();
  });

  it("odrzuca przedłużony czas ważności przy starym podpisie", () => {
    const [id, , podpis] = wystawToken(DEAL, TERAZ, SEKRET).split(".");
    expect(sprawdzToken(`${id}.${TERAZ + 10 * WAZNOSC_TOKENU_MS}.${podpis}`, TERAZ, SEKRET)).toBeNull();
  });

  it("odrzuca token po 24 godzinach", () => {
    const token = wystawToken(DEAL, TERAZ, SEKRET);
    expect(sprawdzToken(token, TERAZ + WAZNOSC_TOKENU_MS + 1, SEKRET)).toBeNull();
  });

  it("odrzuca śmieci: brak, zły typ, złe części, nie-UUID", () => {
    for (const zly of [undefined, null, 5, "", "a.b", "a.b.c.d", `${"x".repeat(300)}`, "nie-uuid.123.abc"]) {
      expect(sprawdzToken(zly, TERAZ, SEKRET)).toBeNull();
    }
  });
});
