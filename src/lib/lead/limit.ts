// Okno przesuwne w pamięci instancji. Na serverless to ochrona per instancja (każda instancja
// ma własną mapę), więc nie zatrzyma rozproszonego ataku, tylko pojedynczego klienta, który
// wysyła zgłoszenia seriami. Drugą linią są honeypot i minimalny czas wypełnienia w route.

export type StanLimitu = Map<string, number[]>;

export const LIMIT_ZGLOSZEN = { maks: 5, oknoMs: 10 * 60 * 1000 } as const;

/** Zwraca true, gdy zgłoszenie mieści się w limicie, i wtedy je zapisuje. */
export function zajmijMiejsce(
  stan: StanLimitu,
  klucz: string,
  terazMs: number,
  maks: number = LIMIT_ZGLOSZEN.maks,
  oknoMs: number = LIMIT_ZGLOSZEN.oknoMs,
): boolean {
  const aktualne = (stan.get(klucz) ?? []).filter((czas) => terazMs - czas < oknoMs);
  if (aktualne.length >= maks) {
    stan.set(klucz, aktualne);
    return false;
  }
  stan.set(klucz, [...aktualne, terazMs]);
  return true;
}

/** Sprzątanie kluczy z wygasłym oknem, żeby mapa nie rosła bez końca. */
export function wyczyscWygasle(stan: StanLimitu, terazMs: number, oknoMs: number = LIMIT_ZGLOSZEN.oknoMs): void {
  for (const [klucz, czasy] of stan) {
    if (czasy.every((czas) => terazMs - czas >= oknoMs)) {
      stan.delete(klucz);
    }
  }
}
