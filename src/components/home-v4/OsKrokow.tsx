"use client";

import { Clock, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { DrogaWejscia } from "@/content/formularz";
import { HOME_V4 } from "@/content/home-v4";
import { zglosPrefill } from "@/lib/home/prefill";
import { przejdzDoFormularza } from "./przejdzDoFormularza";
import styles from "./Wspolpraca.module.css";

const LICZBA_KROKOW = HOME_V4.wspolpraca.kroki.length;
const ODSTEP_ZAPALANIA_MS = 180;
// Kafle B i C są celami linków stopki.
const ID_KAFLA: Readonly<Record<DrogaWejscia, string | undefined>> = {
  A: undefined,
  B: "wejscie-mapa",
  C: "wejscie-pilot",
};

// Pierwsze zdanie kafla to odpowiedź z pytania 6 (pogrubiona), reszta opisuje rozmowę.
function podzielKafel(tekst: string): { odpowiedz: string; reszta: string } {
  const miejsce = tekst.indexOf(". ");
  if (miejsce < 0) return { odpowiedz: tekst, reszta: "" };
  return { odpowiedz: tekst.slice(0, miejsce + 1), reszta: tekst.slice(miejsce + 2) };
}

function naKafel(zdarzenie: MouseEvent<HTMLAnchorElement>, droga: DrogaWejscia) {
  // Kliknięcia z modyfikatorem zostają zwykłym linkiem (nowa karta); reszta zaznacza odpowiedź i idzie do formularza.
  if (zdarzenie.button !== 0 || zdarzenie.metaKey || zdarzenie.ctrlKey || zdarzenie.shiftKey || zdarzenie.altKey) return;
  zdarzenie.preventDefault();
  zglosPrefill({ rodzaj: "droga", droga });
  przejdzDoFormularza();
}

// Linie wachlarza krok 0 -> krok 1: każda komórka kafla rysuje swój odcinek (kreska od środka kafla i szyna w górę).
// Wysokość komórki jest nieznana, więc rysunek używa proporcji (preserveAspectRatio none) i stałej grubości linii.
function Lacznik({ ostatni }: { ostatni: boolean }) {
  // Szyna idzie od środka komórki w górę; poza ostatnią komórką schodzi też w dół do następnego kafla.
  const szyna = ostatni ? "M14 50 V0" : "M14 100 V0";
  return (
    <svg className={styles.lacznik} viewBox="0 0 28 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={szyna} vectorEffect="non-scaling-stroke" />
      <path d="M0 50 H14" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

// Górny odcinek szyny: z kafli w górę do osi i strzałka do kroku 1 (wysokość wiersza węzła = 36 px).
// Druga szyna biegnie obok tekstu kroku 0 (nagłówek, My, Ty) i łączy kafle z odcinkiem górnym.
function LacznikGora() {
  return (
    <>
      <svg className={styles.lacznikGora} viewBox="0 0 28 36" aria-hidden="true" focusable="false">
        <path d="M14 36 V18 H22" />
        <path d="M21 13 L28 18 L21 23 Z" className={styles.grot} />
      </svg>
      <svg className={styles.szynaTekst} viewBox="0 0 28 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M14 100 V0" vectorEffect="non-scaling-stroke" />
      </svg>
    </>
  );
}

export function OsKrokow() {
  const w = HOME_V4.wspolpraca;
  const korzen = useRef<HTMLDivElement>(null);
  const [gotowe, setGotowe] = useState(false);
  const [zapalone, setZapalone] = useState<readonly boolean[]>(() => Array.from({ length: LICZBA_KROKOW }, () => false));

  useEffect(() => {
    const bezRuchu = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (bezRuchu || typeof IntersectionObserver === "undefined") {
      setZapalone(Array.from({ length: LICZBA_KROKOW }, () => true));
      setGotowe(true);
      return;
    }
    const kroki = Array.from(korzen.current?.querySelectorAll<HTMLElement>('[data-qa="krok-osi"]') ?? []);
    const czasomierze: number[] = [];
    // Węzły zapalają się kolejno: kroki wchodzące w ekran razem dostają rosnące opóźnienie.
    const obserwator = new IntersectionObserver(
      (wpisy) => {
        let kolejnosc = 0;
        for (const wpis of wpisy) {
          if (!wpis.isIntersecting) continue;
          const nr = Number(wpis.target.getAttribute("data-nr"));
          obserwator.unobserve(wpis.target);
          czasomierze.push(
            window.setTimeout(() => setZapalone((poprzednie) => poprzednie.map((z, i) => z || i === nr)), kolejnosc * ODSTEP_ZAPALANIA_MS),
          );
          kolejnosc += 1;
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.15 },
    );
    kroki.forEach((krok) => obserwator.observe(krok));
    setGotowe(true);
    return () => {
      obserwator.disconnect();
      czasomierze.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const [torMy, torTy] = w.etykietyTorow;
  const polkaZapalona = zapalone[4] === true;

  return (
    <div ref={korzen} className={styles.os} data-qa="os-krokow" data-gotowe={gotowe ? "true" : "false"}>
      <ol className={styles.kroki}>
        <li className={styles.luk} data-qa="luk-powrotu">
          <RotateCcw className={styles.lukIkona} aria-hidden="true" size={18} />
          <span className={styles.lukNapis}>{w.strzalkaPowrotu}</span>
        </li>
        {w.kroki.map((krok) => (
          <li key={krok.nr} className={styles.krok} data-qa="krok-osi" data-nr={krok.nr} data-zapalony={zapalone[krok.nr] === true ? "true" : "false"}>
            <span className={styles.wezel} aria-hidden="true">
              {krok.nr}
            </span>
            <div className={styles.karta}>
              {krok.nr === 0 ? <LacznikGora /> : null}
              <h3 className={styles.krokNaglowek}>{krok.naglowek}</h3>
              <div className={styles.my}>
                <span className={styles.tor}>{torMy}</span>
                <p>{krok.my}</p>
              </div>
              <div className={styles.ty}>
                <span className={styles.tor}>{torTy}</span>
                <Clock className={styles.zegar} aria-hidden="true" size={16} />
                <p>{krok.ty}</p>
              </div>
              {krok.nr === 0 ? (
                <ul className={styles.kafle} role="list">
                  {w.kafle.map((kafel, i) => {
                    const { odpowiedz, reszta } = podzielKafel(kafel.tekst);
                    return (
                      <li key={kafel.droga} className={styles.kafelKomorka}>
                        <a
                          href={`/?droga=${kafel.droga}#formularz`}
                          id={ID_KAFLA[kafel.droga]}
                          className={styles.kafel}
                          data-qa="kafel-drogi"
                          data-droga={kafel.droga}
                          onClick={(zdarzenie) => naKafel(zdarzenie, kafel.droga)}
                        >
                          <strong>{odpowiedz}</strong> {reszta}
                        </a>
                        <Lacznik ostatni={i === w.kafle.length - 1} />
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      <div className={styles.polka} data-qa="polka" data-zapalona={polkaZapalona ? "true" : "false"}>
        <ul className={styles.polkaKafelki} role="list">
          {w.polka.kafelki.map((nazwa, i) => (
            <li
              key={nazwa}
              className={styles.system}
              data-qa="polka-system"
              data-pod-opieka={polkaZapalona ? "true" : "false"}
              style={{ transitionDelay: polkaZapalona ? `${i * ODSTEP_ZAPALANIA_MS}ms` : "0ms" }}
            >
              <span className={styles.systemNazwa}>{nazwa}</span>
              <span className={styles.systemOpieka}>
                <span className={styles.kropka} aria-hidden="true" />
                {w.polka.podpisKafelka}
              </span>
            </li>
          ))}
        </ul>
        <div className={styles.klamra} aria-hidden="true" />
        <p className={styles.klamraNapis}>{w.polka.klamra}</p>
      </div>
    </div>
  );
}
