import { describe, expect, it } from "vitest";
import { ODPOWIEDZ_DLA_DROGI, PYTANIE_DROGA, odpowiedzDlaDrogi, znajdzPytanie } from "./formularz";

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
