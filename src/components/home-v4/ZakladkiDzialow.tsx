"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { Bzyk } from "@/components/site/Bzyk";
import { useDzial } from "@/components/home-v4/DzialProvider";
import { DZIALY, HOME_V4, type DzialId } from "@/content/home-v4";
import styles from "./ModulDzialow.module.css";

function sasiad(id: DzialId, klawisz: string): DzialId | null {
  const i = DZIALY.indexOf(id);
  if (klawisz === "ArrowRight") return DZIALY[(i + 1) % DZIALY.length] ?? null;
  if (klawisz === "ArrowLeft") return DZIALY[(i - 1 + DZIALY.length) % DZIALY.length] ?? null;
  if (klawisz === "Home") return DZIALY[0] ?? null;
  if (klawisz === "End") return DZIALY[DZIALY.length - 1] ?? null;
  return null;
}

const bezSubskrypcji = () => () => {};

/** false w SSR i w czasie hydratacji, true po niej. Testy i skrypt QA czekają na data-gotowe, bo klik przed
 *  hydratacją przepada (React nie ma jeszcze podpiętych zdarzeń). */
function useZhydratowane(): boolean {
  return useSyncExternalStore(bezSubskrypcji, () => true, () => false);
}

// Zakładki działów (role="tablist", aktywacja automatyczna). Na 390 pasek przewija się w bok we własnym kontenerze:
// aktywną zakładkę dosuwamy przewinięciem paska, nigdy scrollIntoView, bo to ruszyłoby stronę.
export function ZakladkiDzialow() {
  const { stan, wybierz } = useDzial();
  const pasekRef = useRef<HTMLDivElement>(null);
  const gotowe = useZhydratowane();

  useEffect(() => {
    const pasek = pasekRef.current;
    const zakladka = pasek?.querySelector<HTMLElement>(`[data-dzial="${stan.aktywny}"]`);
    if (!pasek || !zakladka) return;
    // Pasek ma position: relative, więc offsetLeft zakładki liczy się od jego krawędzi.
    const lewa = zakladka.offsetLeft;
    const widac = lewa >= pasek.scrollLeft && lewa + zakladka.offsetWidth <= pasek.scrollLeft + pasek.clientWidth;
    if (widac) return;
    const bezRuchu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pasek.scrollTo({ left: Math.max(0, lewa - 16), behavior: bezRuchu ? "instant" : "smooth" });
  }, [stan.aktywny]);

  const naKlawisz = (zdarzenie: KeyboardEvent<HTMLButtonElement>) => {
    // Alt/Cmd/Ctrl + strzałka to skróty przeglądarki (np. wstecz); nie przejmujemy ich.
    if (zdarzenie.altKey || zdarzenie.metaKey || zdarzenie.ctrlKey) return;
    const cel = sasiad(stan.aktywny, zdarzenie.key);
    if (!cel) return;
    zdarzenie.preventDefault();
    wybierz(cel, "zakladka");
    pasekRef.current?.querySelector<HTMLElement>(`[data-dzial="${cel}"]`)?.focus({ preventScroll: true });
  };

  return (
    <div
      ref={pasekRef}
      id="dzialy-zakladki"
      className={styles.zakladki}
      role="tablist"
      aria-labelledby="dzialy-title"
      data-gotowe={gotowe ? "true" : undefined}
    >
      {DZIALY.map((id) => {
        const aktywna = stan.aktywny === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            id={`zakladka-${id}`}
            aria-controls={`panel-${id}`}
            aria-selected={aktywna}
            tabIndex={aktywna ? 0 : -1}
            className={styles.zakladka}
            data-qa="zakladka-dzialu"
            data-dzial={id}
            onClick={() => wybierz(id, "zakladka")}
            onKeyDown={naKlawisz}
          >
            {HOME_V4.dzialy.lista[id].zakladka}
          </button>
        );
      })}
    </div>
  );
}

// Dymek Bzyka nad kartami: przy wejściu sekcji podpowiada strzałki, po zmianie działu mówi tekst działu.
export function DymekDzialow() {
  const { stan } = useDzial();
  const { dzialy } = HOME_V4;
  const dymekRef = useRef<HTMLDivElement>(null);
  const [widziany, setWidziany] = useState(false);
  const [poprzedni, setPoprzedni] = useState(stan.aktywny);
  const [mowiODziale, setMowiODziale] = useState(false);

  // Zmiana działu po tym, jak czytelnik zobaczył sekcję (wybór w hero przed wejściem zostawia tekst wejścia).
  if (poprzedni !== stan.aktywny) {
    setPoprzedni(stan.aktywny);
    if (widziany) setMowiODziale(true);
  }

  useEffect(() => {
    const el = dymekRef.current;
    if (!el) return;
    const obserwator = new IntersectionObserver(([wpis]) => {
      if (!wpis?.isIntersecting) return;
      setWidziany(true);
      obserwator.disconnect();
    });
    obserwator.observe(el);
    return () => obserwator.disconnect();
  }, []);

  return (
    <div className={styles.dymekRzad} ref={dymekRef}>
      <Bzyk width={36} mood={mowiODziale ? "happy" : "neutral"} />
      <p className={styles.dymek} data-qa="dymek-dzialy" aria-live="polite">
        {mowiODziale ? dzialy.lista[stan.aktywny].bzyk : dzialy.bzykWejscie}
      </p>
    </div>
  );
}
