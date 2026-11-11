import { describe, expect, it } from "vitest";
import { opisTerminu, parsujTermin } from "./termin";

const TERAZ = new Date("2026-11-11T10:00:00.000Z");

describe("parsujTermin", () => {
  it("przyjmuje ISO ze strefą w przyszłości", () => {
    const wynik = parsujTermin("2026-11-16T09:00:00.000Z", TERAZ);
    expect(wynik.ok).toBe(true);
  });

  it("odrzuca datę bez strefy, bo serwer zgadywałby ją i przesunął rozmowę o godziny", () => {
    expect(parsujTermin("2026-11-16T10:00:00", TERAZ).ok).toBe(false);
    expect(parsujTermin("2026-11-16", TERAZ).ok).toBe(false);
  });

  it("odrzuca przeszłość i termin dalej niż 120 dni", () => {
    expect(parsujTermin("2026-11-10T09:00:00Z", TERAZ).ok).toBe(false);
    expect(parsujTermin("2027-03-11T10:00:01Z", TERAZ).ok).toBe(false);
    expect(parsujTermin("2027-03-10T10:00:00Z", TERAZ).ok).toBe(true);
  });

  it("odrzuca nie-teksty i nieistniejące daty", () => {
    expect(parsujTermin(123, TERAZ).ok).toBe(false);
    expect(parsujTermin(null, TERAZ).ok).toBe(false);
    expect(parsujTermin("2026-13-45T10:00:00Z", TERAZ).ok).toBe(false);
  });
});

describe("opisTerminu", () => {
  it("podaje czas warszawski: zimą UTC+1, latem UTC+2", () => {
    expect(opisTerminu(new Date("2026-11-16T09:00:00Z"))).toBe(
      "Rozmowa z kalendarza Cal.com: 2026-11-16 10:00 (Europe/Warsaw)",
    );
    expect(opisTerminu(new Date("2026-07-16T08:00:00Z"))).toBe(
      "Rozmowa z kalendarza Cal.com: 2026-07-16 10:00 (Europe/Warsaw)",
    );
  });
});
