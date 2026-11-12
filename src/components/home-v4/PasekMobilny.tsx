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

  const widoczny = decyzja && !heroWidoczne && !formularzWidoczny;
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
