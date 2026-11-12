// Czyste funkcje ruchu strony v4 (przejście z obiektem, karuzela kart, wiersze z etykietą).
// Wzory z szkicu public/szkice/s4/s4.js (applySys), bez I/O.
import type { NrKarty } from "@/content/home-v4";

const przytnij01 = (v: number) => Math.max(0, Math.min(1, v));

/** Ile słów jest zapalonych przy postępie 0..1; zaokrąglamy w dół, więc ostatnie słowo gaśnie do końca przewijania. */
export function zapaloneSlowa(postep: number, liczbaSlow: number): number {
  return Math.floor(przytnij01(postep) * liczbaSlow);
}

/** Kąt obrotu obiektu w stopniach: od -26 do 30. */
export function katObrotu(postep: number): number {
  return -26 + 56 * przytnij01(postep);
}

export type ParametryObiektu = {
  rot: number;
  sweep: number;
  skala: number;
  poswiataKrycie: number;
  poswiataSkala: number;
};

/** Wszystkie wartości zmiennych CSS obiektu dla postępu 0..1 (te same współczynniki co w s4.js). */
export function parametryObiektu(postep: number): ParametryObiektu {
  const p = przytnij01(postep);
  const zaokraglij = (v: number, miejsca: number) => Number(v.toFixed(miejsca));
  return {
    rot: katObrotu(p),
    sweep: zaokraglij(-60 + 130 * p, 1),
    skala: zaokraglij(0.94 + 0.16 * p, 3),
    poswiataKrycie: zaokraglij(0.7 + 0.5 * p, 3),
    poswiataSkala: zaokraglij(0.9 + 0.25 * p, 3),
  };
}

/** Numer karty (0..3) najbliższej aktualnemu przewinięciu karuzeli. */
export function kartaZPrzewiniecia(scrollLeft: number, szerokoscKarty: number, odstep: number): NrKarty {
  const surowa = Math.round(scrollLeft / (szerokoscKarty + odstep));
  if (surowa <= 0) return 0;
  if (surowa === 1) return 1;
  if (surowa === 2) return 2;
  return 3;
}

/** Dzieli wiersz „Etykieta: reszta” po pierwszym „: ”. */
export function podzielEtykiete(
  wiersz: string,
): { etykieta: string; reszta: string } | { etykieta: null; reszta: string } {
  const miejsce = wiersz.indexOf(": ");
  if (miejsce < 0) return { etykieta: null, reszta: wiersz };
  return { etykieta: wiersz.slice(0, miejsce), reszta: wiersz.slice(miejsce + 2) };
}
