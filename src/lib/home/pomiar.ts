// Stałe i rejestr pomiaru kart (zdarzenie GA4 karta_view). Czyste, bez DOM: obserwację widoczności robi Karuzela.
import type { DzialId, NrKarty } from "@/content/home-v4";

export type SposobKarty = "strzalka" | "palec" | "klawiatura" | "wejscie";

export const NAZWA_KARTY: Readonly<
  Record<NrKarty, "film" | "przyklad" | "opinia" | "pomysly">
> = {
  0: "film",
  1: "przyklad",
  2: "opinia",
  3: "pomysly",
};

/** Karta liczy się jako obejrzana po 1 s nieprzerwanej widoczności co najmniej w 60 procentach. */
export const PROG_WIDOCZNOSCI = 0.6;
export const CZAS_WIDOCZNOSCI_MS = 1000;

/** Rejestr jednego widoku strony: każda para dział + karta przechodzi raz (bez licznika wielokrotnych wejść). */
export function utworzRejestrWidokow(): {
  pierwszyRaz(dzial: DzialId, nr: NrKarty): boolean;
} {
  const widziane = new Set<string>();
  return {
    pierwszyRaz(dzial, nr) {
      const klucz = `${dzial}:${nr}`;
      if (widziane.has(klucz)) return false;
      widziane.add(klucz);
      return true;
    },
  };
}
