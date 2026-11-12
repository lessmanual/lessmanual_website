"use client";

import { useEffect, useState } from "react";
import { HOME_V4 } from "@/content/home-v4";
import { czytajZapisZgodyCookies, ZDARZENIE_ZGODY_COOKIES } from "@/lib/consent";
import { przejdzDoFormularza } from "./przejdzDoFormularza";
import styles from "./PasekMobilny.module.css";

// Pasek przyklejony na telefonie (< 1024 px, szerokość pilnuje CSS). Pokazuje się, gdy hero wyszło z ekranu,
// chowa się przy formularzu, a do czasu decyzji o cookies ustępuje miejsca banerowi zgody.
export function PasekMobilny() {
  const [decyzja, setDecyzja] = useState(false);
  const [heroWidoczne, setHeroWidoczne] = useState(true);
  const [formularzWidoczny, setFormularzWidoczny] = useState(false);
  const [banerOtwarty, setBanerOtwarty] = useState(false);
  const [waskiEkran, setWaskiEkran] = useState(false);

  useEffect(() => {
    const odczytaj = () => setDecyzja(czytajZapisZgodyCookies() !== null);
    odczytaj();
    window.addEventListener(ZDARZENIE_ZGODY_COOKIES, odczytaj);
    return () => window.removeEventListener(ZDARZENIE_ZGODY_COOKIES, odczytaj);
  }, []);

  useEffect(() => {
    const hero = document.querySelector('[aria-labelledby="hero-title"]');
    const formularz = document.getElementById("formularz");
    const obserwator = new IntersectionObserver((wpisy) => {
      for (const wpis of wpisy) {
        if (wpis.target === hero) setHeroWidoczne(wpis.isIntersecting);
        if (wpis.target === formularz) setFormularzWidoczny(wpis.isIntersecting);
      }
    });
    if (hero) obserwator.observe(hero);
    if (formularz) obserwator.observe(formularz);
    return () => obserwator.disconnect();
  }, []);

  // Baner otwarty ponownie z „Ustawień cookies” leży przy dolnej krawędzi tak samo jak pasek, więc pasek ustępuje.
  // Obserwujemy DOM, bo baner zamyka się też bez zapisu (Wstecz), a wtedy nie ma zdarzenia zgody.
  useEffect(() => {
    const sprawdz = () => {
      const baner = document.querySelector(".lm-cookie-banner");
      setBanerOtwarty(baner instanceof HTMLElement && baner.getClientRects().length > 0);
    };
    sprawdz();
    // Baner jest bezpośrednim dzieckiem <body> (layout), więc wystarczy childList bez subtree;
    // atrybut z <head> chowa go bez zmiany drzewa, stąd drugi, wąski obserwator.
    const drzewo = new MutationObserver(sprawdz);
    drzewo.observe(document.body, { childList: true });
    const atrybut = new MutationObserver(sprawdz);
    atrybut.observe(document.documentElement, { attributes: true, attributeFilter: ["data-zgoda-cookies"] });
    return () => {
      drzewo.disconnect();
      atrybut.disconnect();
    };
  }, []);

  // Pasek istnieje tylko poniżej 1024 px; przejście szerokości przez tę granicę przelicza odstęp przewijania.
  useEffect(() => {
    const zapytanie = window.matchMedia("(max-width: 1023px)");
    const odczytaj = () => setWaskiEkran(zapytanie.matches);
    odczytaj();
    zapytanie.addEventListener("change", odczytaj);
    return () => zapytanie.removeEventListener("change", odczytaj);
  }, []);

  const widoczny = decyzja && !heroWidoczne && !formularzWidoczny && !banerOtwarty;

  // WCAG 2.4.11: element z fokusem klawiatury nie może zostać pod paskiem, więc przy widocznym pasku
  // przewijanie do fokusu zostawia mu miejsce równe wysokości paska (12 + 48 + 12 + strefa bezpieczna).
  useEffect(() => {
    // Od 1024 px pasek jest ukryty w CSS, więc odstęp byłby pusty.
    if (!widoczny || !waskiEkran) return;
    const html = document.documentElement;
    html.style.scrollPaddingBottom = "calc(72px + env(safe-area-inset-bottom, 0px))";
    return () => {
      html.style.removeProperty("scroll-padding-bottom");
    };
  }, [widoczny, waskiEkran]);

  return (
    <>
      <div
        className={styles.pasek}
        data-qa="pasek-mobilny"
        data-widoczny={widoczny ? "true" : "false"}
        inert={!widoczny}
      >
        <button type="button" className={`lm-btn lm-btn--primary ${styles.przycisk}`} onClick={przejdzDoFormularza}>
          {HOME_V4.cta.pasek}
        </button>
      </div>
      {/* Miejsce pod stopką równe wysokości paska, żeby pasek nie zasłaniał ostatnich linii strony. */}
      <div className={styles.miejsce} aria-hidden="true" />
    </>
  );
}
