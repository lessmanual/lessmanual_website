"use client";

import { HOME_V4 } from "@/content/home-v4";
import { przejdzDoFormularza } from "./przejdzDoFormularza";
import styles from "./WezwanieKoncowe.module.css";

// Wezwanie końcowe przed formularzem: jedno pytanie, jeden przycisk, jedno ograniczenie.
export function WezwanieKoncowe() {
  const c = HOME_V4.cta;
  return (
    <section id="wezwanie" data-qa="wezwanie" className={styles.sekcja} aria-labelledby="wezwanie-title">
      <div className={`lm-container ${styles.srodek}`}>
        <h2 id="wezwanie-title" className={styles.h2}>
          {c.h2}
        </h2>
        <p className={styles.tekst}>{c.tekst}</p>
        <button type="button" className="lm-btn lm-btn--primary" onClick={przejdzDoFormularza}>
          {c.przycisk}
        </button>
        <p className={styles.drobnyDruk}>{c.drobnyDruk}</p>
      </div>
    </section>
  );
}
