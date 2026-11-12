"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, type ReactNode } from "react";
import type { DzialId, NrKarty } from "@/content/home-v4";
import { trackEvent } from "@/lib/analytics";
import {
  dzialZHasha,
  stanPoczatkowy,
  zdarzenieRoomOpen,
  zmienStan,
  type SposobZmiany,
  type StanDzialu,
} from "@/lib/home/dzial-stan";

type Wartosc = {
  stan: StanDzialu;
  wybierz(dzial: DzialId, z: SposobZmiany): void;
  ustawKarte(nr: NrKarty): void;
  zaliczPrzejscie(): void;
};

const Kontekst = createContext<Wartosc | null>(null);

function przewinDoDzialow() {
  const cel = document.getElementById("dzialy");
  if (!cel) return;
  const bezRuchu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  cel.scrollIntoView({ block: "start", behavior: bezRuchu ? "auto" : "smooth" });
}

export function DzialProvider({ children }: { children: ReactNode }) {
  // Serwer i pierwszy render klienta: stan bez hasha, hash czyta dopiero efekt (brak niezgodności hydratacji).
  const [stan, dispatch] = useReducer(zmienStan, "", stanPoczatkowy);
  const poprzedni = useRef(stan);
  const ostatnieZ = useRef<SposobZmiany>("kotwica");

  // room_open wysyłamy po faktycznej zmianie stanu, nie w handlerze: zdarzenie nie zależy od tego, kto wywołał wybierz.
  useEffect(() => {
    const zdarzenie = zdarzenieRoomOpen(poprzedni.current, stan, ostatnieZ.current);
    poprzedni.current = stan;
    if (zdarzenie) trackEvent(zdarzenie.nazwa, zdarzenie.params);
  }, [stan]);

  const wybierz = useCallback((dzial: DzialId, z: SposobZmiany) => {
    ostatnieZ.current = z;
    dispatch({ typ: "wybierz", dzial, z });
  }, []);

  const ustawKarte = useCallback((nr: NrKarty) => dispatch({ typ: "karta", nr }), []);
  const zaliczPrzejscie = useCallback(() => dispatch({ typ: "przejscie_zaliczone" }), []);

  useEffect(() => {
    const naKotwice = () => {
      const dzial = dzialZHasha(window.location.hash);
      if (!dzial) return;
      wybierz(dzial, "kotwica");
      przewinDoDzialow();
    };
    naKotwice();
    window.addEventListener("hashchange", naKotwice);
    return () => window.removeEventListener("hashchange", naKotwice);
  }, [wybierz]);

  const wartosc = useMemo(
    () => ({ stan, wybierz, ustawKarte, zaliczPrzejscie }),
    [stan, wybierz, ustawKarte, zaliczPrzejscie],
  );
  return <Kontekst.Provider value={wartosc}>{children}</Kontekst.Provider>;
}

export function useDzial(): Wartosc {
  const wartosc = useContext(Kontekst);
  if (!wartosc) throw new Error("useDzial wymaga DzialProvider");
  return wartosc;
}
