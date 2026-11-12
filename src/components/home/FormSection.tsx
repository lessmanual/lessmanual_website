import { Bzyk } from "@/components/site/Bzyk";
import { BZYK_LINES, FINAL_CTA } from "@/content/site";
import { LeadFormLazy } from "./LeadFormLazy";
import styles from "./FormSection.module.css";

// Koniec strony: formularz kwalifikujący (TEKSTY v3, sekcje 10 i 13).
export function FormSection() {
  return (
    <section id="formularz" className="lm-section" aria-labelledby="formularz-title">
      <div className={`lm-container ${styles.grid}`}>
        <div className={styles.copy}>
          {/* tabIndex -1: cel fokusu po „Tak, to u nas” i kaflach dróg (przejdzDoFormularza). */}
          <h2 id="formularz-title" tabIndex={-1}>{FINAL_CTA.title}</h2>
          <p className="lm-lead">{FINAL_CTA.body}</p>
          <p className="lm-small">{FINAL_CTA.note}</p>
          <div className={styles.bzyk}>
            <Bzyk width={48} mood="happy" />
            <p className="lm-bubble">
              <span className="lm-bubble__who">Bzyk</span>
              {BZYK_LINES.end}
            </p>
          </div>
        </div>
        <div>
          <LeadFormLazy />
        </div>
      </div>
    </section>
  );
}
