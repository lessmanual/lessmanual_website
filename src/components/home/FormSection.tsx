import { HOME_V4 } from "@/content/home-v4";
import { LeadFormLazy } from "./LeadFormLazy";
import styles from "./FormSection.module.css";

// Koniec strony: formularz kwalifikujący. Teksty z HOME_V4.formularz (strona v4, sekcja formularza).
export function FormSection() {
  const { h2, linia, imie, rola, opis } = HOME_V4.formularz;
  return (
    <section id="formularz" className="lm-section" aria-labelledby="formularz-title">
      <div className={`lm-container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* tabIndex -1: cel fokusu po „Tak, to u nas” i kaflach dróg (przejdzDoFormularza). */}
          <h2 id="formularz-title" tabIndex={-1}>{h2}</h2>
          <p className="lm-lead">{linia}</p>
          <div className={styles.osoba} data-qa="formularz-osoba">
            <p className={styles.imie}>{imie}</p>
            <p className={`lm-small ${styles.rola}`}>{rola}</p>
            <p className={styles.opis}>{opis}</p>
          </div>
        </div>
        <div>
          <LeadFormLazy />
        </div>
      </div>
    </section>
  );
}
