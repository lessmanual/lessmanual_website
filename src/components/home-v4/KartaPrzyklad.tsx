"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import type { DzialId, KartaPrzyklad as DaneKarty } from "@/content/home-v4";
import type { PrzykladDane } from "@/content/home-v4-przyklady";
import { podzielEtykiete } from "@/lib/home/ruch";
import styles from "./Karty.module.css";

type Nr = 0 | 1 | 2;
const NUMERY: readonly Nr[] = [0, 1, 2];

// Czasy z s4.js selectExample: skan 1000 ms, wynik po 650 ms, wiersze co 120 ms, każdy świeci do 900 ms.
const START_WYNIKU_MS = 650;
const KROK_WIERSZA_MS = 120;
const GASNIE_PO_MS = 900;
const KONIEC_SKANU_MS = 1000;

/** Dzieli tekst na zwykłe kawałki i zaznaczenia; zaznaczenie i świeci razem z wierszem wyniku i. */
function zZaznaczeniami(tekst: string, zaznaczenia: readonly string[], swieci: readonly number[]): ReactNode[] {
  const wynik: ReactNode[] = [];
  let reszta = tekst;
  let klucz = 0;
  while (reszta.length > 0) {
    const trafienia = zaznaczenia
      .map((z, i) => ({ i, z, gdzie: reszta.indexOf(z) }))
      // Pusty napis trafia zawsze w pozycję 0 i nie skraca reszty: pętla nigdy by się nie skończyła.
      .filter((t) => t.z.length > 0 && t.gdzie >= 0)
      .sort((a, b) => a.gdzie - b.gdzie);
    const pierwsze = trafienia[0];
    if (!pierwsze) {
      wynik.push(reszta);
      break;
    }
    if (pierwsze.gdzie > 0) wynik.push(reszta.slice(0, pierwsze.gdzie));
    wynik.push(
      <mark key={klucz++} className={styles.zaznaczenie} data-swieci={swieci.includes(pierwsze.i) ? "true" : undefined}>
        {pierwsze.z}
      </mark>,
    );
    reszta = reszta.slice(pierwsze.gdzie + pierwsze.z.length);
  }
  return wynik;
}

// Źródło w wyglądzie dokumentu, SMS-a, maila, rozmowy albo wycinka. Linie „Etykieta: treść” dostają etykietę.
function Zrodlo({ dane, swieci }: { dane: PrzykladDane; swieci: readonly number[] }) {
  const { wyglad, zrodlo } = dane;
  return (
    <div className={`${styles.zrodlo} ${styles[`wyglad_${wyglad}`]}`}>
      {zrodlo.naglowek ? <p className={styles.zrodloNaglowek}>{zrodlo.naglowek}</p> : null}
      {zrodlo.linie.map((linia, i) => {
        const podzial = podzielEtykiete(linia);
        // W SMS-ie i wycinku cała linia to treść (dwukropek bywa w zdaniu).
        const zEtykieta = podzial.etykieta !== null && wyglad !== "sms" && wyglad !== "wycinek";
        return (
          <p key={`${i}-${linia}`} className={styles.zrodloLinia}>
            {zEtykieta ? <span className={styles.zrodloEtykieta}>{podzial.etykieta}</span> : null}
            <span>{zZaznaczeniami(zEtykieta ? podzial.reszta : linia, zrodlo.zaznaczenia, swieci)}</span>
          </p>
        );
      })}
      <span className={styles.skan} aria-hidden="true" />
    </div>
  );
}

function bezRuchu(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Karta 2: przykład działania z trzema zakładkami. Wybór zakładki skanuje źródło i zapala wiersze wyniku
// (selectExample z s4.js); pierwszy przebieg rusza, gdy karta pierwszy raz wejdzie w widok. Przy reduce bez ruchu.
export function KartaPrzyklad({ karta, dzial }: { karta: DaneKarty; dzial: DzialId }) {
  const [wybrana, setWybrana] = useState<Nr>(0);
  const [skanuje, setSkanuje] = useState(false);
  const [prep, setPrep] = useState(false);
  const [swieci, setSwieci] = useState<readonly number[]>([]);
  // Lista w obiekcie: sprzątanie efektu czyta listę z chwili sprzątania, nie z chwili montażu.
  const timery = useRef<{ lista: number[] }>({ lista: [] });
  const kartaRef = useRef<HTMLElement>(null);
  const zakladkiRef = useRef<HTMLDivElement>(null);

  const wybierz = (nr: Nr, animuj: boolean) => {
    timery.current.lista.forEach((t) => window.clearTimeout(t));
    timery.current.lista = [];
    setWybrana(nr);
    setSwieci([]);
    if (!animuj || bezRuchu()) {
      setSkanuje(false);
      setPrep(false);
      return;
    }
    const po = (ms: number, fn: () => void) => timery.current.lista.push(window.setTimeout(fn, ms));
    setPrep(true);
    setSkanuje(true);
    po(START_WYNIKU_MS, () => {
      setPrep(false);
      karta.zakladki[nr].dane.wynik.wiersze.forEach((_, i) => {
        po(i * KROK_WIERSZA_MS + KROK_WIERSZA_MS, () => setSwieci((s) => [...s, i]));
        po(i * KROK_WIERSZA_MS + GASNIE_PO_MS, () => setSwieci((s) => s.filter((x) => x !== i)));
      });
    });
    po(KONIEC_SKANU_MS, () => setSkanuje(false));
  };
  const wybierzRef = useRef(wybierz);
  useEffect(() => {
    wybierzRef.current = wybierz;
  });

  useEffect(() => {
    const el = kartaRef.current;
    if (!el) return;
    const obserwator = new IntersectionObserver(
      ([wpis]) => {
        if (!wpis?.isIntersecting) return;
        obserwator.disconnect();
        wybierzRef.current(0, true);
      },
      { threshold: 0.5 },
    );
    obserwator.observe(el);
    const magazyn = timery.current;
    return () => {
      obserwator.disconnect();
      magazyn.lista.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const naKlawisz = (zdarzenie: KeyboardEvent<HTMLButtonElement>) => {
    if (zdarzenie.altKey || zdarzenie.metaKey || zdarzenie.ctrlKey) return;
    const przesuniecie: Record<string, number> = { ArrowRight: wybrana + 1, ArrowLeft: wybrana + 2, Home: 0, End: 2 };
    const surowy = przesuniecie[zdarzenie.key];
    if (surowy === undefined) return;
    zdarzenie.preventDefault();
    const cel = NUMERY[surowy % 3] ?? 0;
    wybierz(cel, true);
    const pasek = zakladkiRef.current;
    const zakladka = pasek?.querySelector<HTMLElement>(`[data-nr="${cel}"]`);
    if (!pasek || !zakladka) return;
    // Fokus bez przewijania strony; pasek (na 390 przewijany w bok, position: relative) dosuwamy sam, jak w ZakladkiDzialow.
    zakladka.focus({ preventScroll: true });
    const lewa = zakladka.offsetLeft;
    const widac = lewa >= pasek.scrollLeft && lewa + zakladka.offsetWidth <= pasek.scrollLeft + pasek.clientWidth;
    if (!widac) pasek.scrollTo({ left: Math.max(0, lewa - 8), behavior: bezRuchu() ? "instant" : "smooth" });
  };

  const id = (nr: number) => `przyklad-${dzial}-${nr}`;
  return (
    <article className={styles.przyklad} ref={kartaRef}>
      <h3 className={styles.tytul}>{karta.tytul}</h3>
      <p className={styles.opis}>{karta.opis}</p>
      <div className={styles.zakladkiPrzykladu} role="tablist" aria-label={karta.tytul} ref={zakladkiRef}>
        {karta.zakladki.map((z, nr) => (
          <button
            key={z.etykieta}
            type="button"
            role="tab"
            id={id(nr)}
            aria-selected={nr === wybrana}
            aria-controls={`${id(nr)}-panel`}
            tabIndex={nr === wybrana ? 0 : -1}
            className={styles.zakladkaPrzykladu}
            data-qa="zakladka-przykladu"
            data-nr={nr}
            onClick={() => wybierz(NUMERY[nr] ?? 0, true)}
            onKeyDown={naKlawisz}
          >
            {z.etykietaKrotka ? (
              <>
                <span className={styles.pelna}>{z.etykieta}</span>
                <span className={styles.krotka}>{z.etykietaKrotka}</span>
              </>
            ) : (
              z.etykieta
            )}
          </button>
        ))}
      </div>
      {/* Wszystkie trzy panele leżą w jednej komórce siatki; widoczny jest wybrany, pozostałe mają visibility: hidden.
          Wysokość karty to więc wysokość najwyższej zakładki i zmiana zakładki nie przesuwa strony. */}
      <div className={styles.panele}>
        {karta.zakladki.map((z, nr) => {
          const wybrany = nr === wybrana;
          return (
            <div
              key={z.etykieta}
              className={styles.demo}
              role="tabpanel"
              id={`${id(nr)}-panel`}
              aria-labelledby={id(nr)}
              tabIndex={wybrany ? 0 : -1}
              data-wybrany={wybrany ? "true" : "false"}
              data-skanuje={wybrany && skanuje ? "true" : undefined}
            >
              <div className={styles.demoUklad}>
                <Zrodlo dane={z.dane} swieci={wybrany ? swieci : []} />
                <table className={styles.wynik} data-prep={wybrany && prep ? "true" : undefined}>
                  <caption>{z.dane.wynik.podpis}</caption>
                  <tbody>
                    {z.dane.wynik.wiersze.map(([etykieta, wartosc], i) => (
                      <tr
                        key={etykieta}
                        data-swieci={wybrany && swieci.includes(i) ? "true" : undefined}
                        style={{ transitionDelay: `${i * KROK_WIERSZA_MS}ms` }}
                      >
                        <th scope="row">{etykieta}</th>
                        <td>{wartosc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className={styles.plakietka}>{z.plakietka}</p>
            </div>
          );
        })}
      </div>
      <p className={styles.plakietkaWspolna}>{karta.plakietkaWspolna}</p>
      {karta.drugiDowod ? <p className={styles.drugiDowod}>{karta.drugiDowod}</p> : null}
    </article>
  );
}
