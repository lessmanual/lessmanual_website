import { describe, expect, it } from "vitest";
import { WERSJA_ZGODY_COOKIES, parsujZgodeCookies } from "@/lib/consent";

const TERAZ = new Date("2026-11-11T12:00:00.000Z");

function zapis(zmiany: Record<string, unknown> = {}): string {
  return JSON.stringify({
    wersja: WERSJA_ZGODY_COOKIES,
    czas: "2026-11-01T10:00:00.000Z",
    analityczne: true,
    kalendarz: false,
    ...zmiany,
  });
}

describe("parsujZgodeCookies", () => {
  it("accepts a current, fresh record", () => {
    expect(parsujZgodeCookies(zapis(), TERAZ)).toEqual({
      wersja: WERSJA_ZGODY_COOKIES,
      czas: "2026-11-01T10:00:00.000Z",
      analityczne: true,
      kalendarz: false,
    });
  });

  it("treats a missing record as no consent", () => {
    expect(parsujZgodeCookies(null, TERAZ)).toBeNull();
  });

  // Stary baner zapisywał {necessary, functional, analytics, marketing}: nie dowodzi zgody na obecne kategorie.
  it("treats the legacy format as no consent", () => {
    const stary = JSON.stringify({ necessary: true, functional: true, analytics: true, marketing: true });
    expect(parsujZgodeCookies(stary, TERAZ)).toBeNull();
  });

  it("survives corrupted and non-object storage", () => {
    expect(parsujZgodeCookies("{nie json", TERAZ)).toBeNull();
    expect(parsujZgodeCookies("42", TERAZ)).toBeNull();
    expect(parsujZgodeCookies("null", TERAZ)).toBeNull();
    expect(parsujZgodeCookies("[]", TERAZ)).toBeNull();
  });

  it("rejects wrong field types and invalid dates", () => {
    expect(parsujZgodeCookies(zapis({ analityczne: "tak" }), TERAZ)).toBeNull();
    expect(parsujZgodeCookies(zapis({ czas: "wczoraj" }), TERAZ)).toBeNull();
  });

  it("asks again after the consent text version changes", () => {
    expect(parsujZgodeCookies(zapis({ wersja: "2026-01-01" }), TERAZ)).toBeNull();
  });

  it("expires after 12 months and not before", () => {
    const prawieRok = zapis({ czas: "2025-11-12T00:00:00.000Z" });
    const rok = zapis({ czas: "2025-11-11T12:00:00.000Z" });
    expect(parsujZgodeCookies(prawieRok, TERAZ)).not.toBeNull();
    expect(parsujZgodeCookies(rok, TERAZ)).toBeNull();
  });
});
