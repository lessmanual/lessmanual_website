import { BellRing, FileText, KeyRound, Server } from "lucide-react";
import { HOME_V4 } from "@/content/home-v4";
import styles from "./Bezpieczenstwo.module.css";

// Kolejność ikon odpowiada kolejności czterech wierszy w tekstach v4.
const IKONY = [Server, FileText, KeyRound, BellRing] as const;

// Sekcja Bezpieczeństwo i technologia: tekst z lewej, cztery wiersze z ikoną z prawej. Bez logo dostawców.
export function Bezpieczenstwo() {
  const b = HOME_V4.bezpieczenstwo;
  return (
    <section
      id="bezpieczenstwo"
      data-qa="bezpieczenstwo"
      className={styles.sekcja}
      aria-labelledby="bezpieczenstwo-title"
    >
      <div className={`lm-container ${styles.uklad}`}>
        <div className={styles.tekst} data-qa="bezpieczenstwo-tekst">
          <h2 id="bezpieczenstwo-title" className={styles.h2}>
            {b.h2}
          </h2>
          <p className={styles.akapit}>{b.akapit1}</p>
          <p className={styles.akapit}>{b.modeleUE}</p>
          <p className={styles.akapit}>{b.akapit2}</p>
        </div>
        <ul className={styles.wiersze} data-qa="bezpieczenstwo-wiersze">
          {b.wiersze.map((wiersz, i) => {
            const Ikona = IKONY[i];
            return (
              <li key={wiersz} className={styles.wiersz} data-qa="wiersz-bezpieczenstwa">
                <span className={styles.ikona} aria-hidden="true">
                  <Ikona size={24} strokeWidth={1.75} />
                </span>
                <span className={styles.etykieta}>{wiersz}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
