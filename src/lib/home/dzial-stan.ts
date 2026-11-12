// Czysty stan modułu działu (hero, zakładki, rzut, kotwice). Bez I/O: zdarzenia i przewijanie robi DzialProvider.
import { DZIALY, type DzialId, type NrKarty } from "@/content/home-v4";

export type SposobZmiany = "hero" | "zakladka" | "rzut" | "kotwica";

export type StanDzialu = {
  aktywny: DzialId;
  karta: NrKarty;
  /** Dział wybrany w hero; inne źródła go nie ruszają. */
  wybranyWHero: DzialId | null;
  /** Przybliżenie pokoju dzieje się tylko przy pierwszym wyborze. */
  byloPierwszeWybranie: boolean;
  przejscieZaliczone: boolean;
};

export type AkcjaDzialu =
  | { typ: "wybierz"; dzial: DzialId; z: SposobZmiany }
  | { typ: "karta"; nr: NrKarty }
  | { typ: "przejscie_zaliczone" };

const KOTWICA = /^#dzial-([a-z]+)$/;

export function dzialZHasha(hash: string): DzialId | null {
  const id = KOTWICA.exec(hash)?.[1];
  return DZIALY.find((dzial) => dzial === id) ?? null;
}

export function stanPoczatkowy(hash: string): StanDzialu {
  return {
    aktywny: dzialZHasha(hash) ?? "telefony",
    karta: 0,
    wybranyWHero: null,
    byloPierwszeWybranie: false,
    przejscieZaliczone: false,
  };
}

export function zmienStan(stan: StanDzialu, akcja: AkcjaDzialu): StanDzialu {
  switch (akcja.typ) {
    case "wybierz":
      return {
        ...stan,
        aktywny: akcja.dzial,
        // Ten sam dział nie cofa karty; zmiana zaczyna od karty 1.
        karta: akcja.dzial === stan.aktywny ? stan.karta : 0,
        wybranyWHero: akcja.z === "hero" ? akcja.dzial : stan.wybranyWHero,
        byloPierwszeWybranie: true,
      };
    case "karta":
      return { ...stan, karta: akcja.nr };
    case "przejscie_zaliczone":
      return { ...stan, przejscieZaliczone: true };
  }
}

export function zdarzenieRoomOpen(
  przed: StanDzialu,
  po: StanDzialu,
  z: SposobZmiany,
): { nazwa: "room_open"; params: { dzial: DzialId; z: SposobZmiany } } | null {
  if (przed.aktywny === po.aktywny) return null;
  return { nazwa: "room_open", params: { dzial: po.aktywny, z } };
}

export function przewinOdRazuPoKlawiszu(stan: StanDzialu): boolean {
  return stan.przejscieZaliczone;
}
