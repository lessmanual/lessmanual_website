"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { KartaOpinia } from "@/components/home-v4/KartaOpinia";
import { HOME_V4 } from "@/content/home-v4";
import styles from "./OpinieRzad.module.css";

function bezRuchu(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Rząd opinii: natywny scroll-snap (telefon: karta 88%, komputer: trzy kolumny) i strzałki o jedną kartę.
// Strzałki mają aria-disabled zamiast disabled, więc na krańcach nie gubią fokusu klawiatury.
export function OpinieRzad() {
  const { opinie, dzialy } = HOME_V4;
  const rzadRef = useRef<HTMLUListElement>(null);
  // Cel płynnego przewijania w pikselach: szybki drugi klik liczy się od celu, nie od połowy ruchu.
  const celRef = useRef<number | null>(null);
  const [naPoczatku, setNaPoczatku] = useState(true);
  const [naKoncu, setNaKoncu] = useState(false);

  const odswiez = useCallback(() => {
    const rzad = rzadRef.current;
    if (!rzad) return;
    if (celRef.current !== null && Math.abs(rzad.scrollLeft - celRef.current) <= 1) celRef.current = null;
    setNaPoczatku(rzad.scrollLeft <= 1);
    setNaKoncu(rzad.scrollLeft + rzad.clientWidth >= rzad.scrollWidth - 1);
  }, []);

  useEffect(() => {
    odswiez();
    window.addEventListener("resize", odswiez);
    return () => window.removeEventListener("resize", odswiez);
  }, [odswiez]);

  const przewin = (krok: -1 | 1) => {
    const rzad = rzadRef.current;
    const pierwsza = rzad?.firstElementChild;
    if (!rzad || !(pierwsza instanceof HTMLElement)) return;
    const odstep = Number.parseFloat(getComputedStyle(rzad).columnGap) || 0;
    const dlugosc = pierwsza.offsetWidth + odstep;
    const maks = rzad.scrollWidth - rzad.clientWidth;
    const start = celRef.current ?? rzad.scrollLeft;
    const cel = Math.max(0, Math.min(maks, (Math.round(start / dlugosc) + krok) * dlugosc));
    // Na krańcu klik nic nie robi (strzałka jest aria-disabled, nie disabled).
    if (Math.abs(cel - start) <= 1) return;
    celRef.current = cel;
    rzad.scrollTo({ left: cel, behavior: bezRuchu() ? "instant" : "smooth" });
  };

  return (
    <section id="opinie" data-qa="opinie" className={styles.sekcja} aria-labelledby="opinie-title">
      <div className="lm-container">
        <h2 id="opinie-title" className={styles.h2}>
          {opinie.h2}
        </h2>
        <p className={styles.tabliczka} data-qa="opinie-tabliczka">
          {opinie.tabliczka}
        </p>
        <ul
          className={styles.rzad}
          data-qa="opinie-rzad"
          ref={rzadRef}
          onScroll={odswiez}
          // Przewijany obszar musi dać się obsłużyć klawiaturą.
          tabIndex={0}
          aria-labelledby="opinie-title"
        >
          {opinie.karty.map((opinia, i) => (
            <li key={i} className={styles.karta}>
              <KartaOpinia opinia={opinia} dzial="opinie" />
            </li>
          ))}
        </ul>
        <div className={styles.strzalki}>
          <button
            type="button"
            className={styles.strzalka}
            data-qa="opinie-poprzednia"
            aria-label={dzialy.dostepnosc.poprzedniaKarta}
            aria-disabled={naPoczatku}
            onClick={() => przewin(-1)}
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.strzalka}
            data-qa="opinie-nastepna"
            aria-label={dzialy.dostepnosc.nastepnaKarta}
            aria-disabled={naKoncu}
            onClick={() => przewin(1)}
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
