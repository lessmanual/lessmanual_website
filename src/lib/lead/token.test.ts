import { describe, expect, it } from "vitest";
import { WAZNOSC_TOKENU_MS, czytajSekretTokenu, sprawdzToken, wystawToken } from "./token";

const DEAL = "3f2b6a10-5c1e-4d2a-9b7e-1a2b3c4d5e6f";
const SEKRET = "sekret-tokenu-testowy-dlugi-na-32-znaki-minimum";
const TERAZ = 1_800_000_000_000;

describe("token rezerwacji", () => {
  it("zwraca identyfikator szansy dla własnego, świeżego tokenu", () => {
    expect(sprawdzToken(wystawToken(DEAL, TERAZ, SEKRET), TERAZ + 1000, SEKRET)).toBe(DEAL);
  });

  // Delta QA 11.11: ID szansy nie może być czytelne w tokenie, który widzi przeglądarka.
  it("nie zawiera identyfikatora szansy jawnym tekstem ani po zdekodowaniu base64url", () => {
    const token = wystawToken(DEAL, TERAZ, SEKRET);
    expect(token).not.toContain(DEAL);
    expect(Buffer.from(token, "base64url").toString("utf8")).not.toContain(DEAL);
  });

  it("odrzuca token zaszyfrowany innym sekretem, bo inaczej każdy mógłby dopisać termin do cudzej szansy", () => {
    expect(sprawdzToken(wystawToken(DEAL, TERAZ, "inny-sekret-tez-dlugi-na-32-znaki-x"), TERAZ, SEKRET)).toBeNull();
  });

  it("odrzuca token ze zmienionym bajtem (uwierzytelnienie GCM)", () => {
    const bajty = Buffer.from(wystawToken(DEAL, TERAZ, SEKRET), "base64url");
    bajty[14] = bajty[14] === undefined ? 0 : bajty[14] ^ 0xff;
    expect(sprawdzToken(bajty.toString("base64url"), TERAZ, SEKRET)).toBeNull();
  });

  it("odrzuca token po 24 godzinach", () => {
    const token = wystawToken(DEAL, TERAZ, SEKRET);
    expect(sprawdzToken(token, TERAZ + WAZNOSC_TOKENU_MS + 1, SEKRET)).toBeNull();
  });

  it("odrzuca śmieci: brak, zły typ, za krótki, znaki spoza base64url", () => {
    for (const zly of [undefined, null, 5, "", "abc", "a.b.c", "x".repeat(300), "!!!!"]) {
      expect(sprawdzToken(zly, TERAZ, SEKRET)).toBeNull();
    }
  });

  it("bez sekretu albo z za krótkim sekretem zapis terminu jest wyłączony", () => {
    expect(czytajSekretTokenu({})).toBeNull();
    expect(czytajSekretTokenu({ FORMULARZ_TOKEN_SECRET: "krotki" })).toBeNull();
    expect(czytajSekretTokenu({ FORMULARZ_TOKEN_SECRET: SEKRET })).toBe(SEKRET);
  });
});
