import { Bzyk } from "@/components/site/Bzyk";
import { MEDIA_FLAGS, PROCESS } from "@/content/site";
import styles from "./ProcessLine.module.css";

// Jedyna kulminacja ruchu na stronie: miedziana linia współpracy.
// Bzyk jest przyklejony (position: sticky) do toru linii, więc zjeżdża po krokach
// razem z przewijaniem i zostaje przy kroku 5. Zero JS: kropki i patynowa kreska
// aktywnego kroku idą z CSS scroll-driven animations (view()), z fallbackiem w @supports.
// Desktop: tabela (kroki w wierszach), telefon: lista.
export function ProcessLine() {
  return (
    <section id="wspolpraca" className="lm-section" aria-labelledby="wspolpraca-title">
      <div className="lm-container">
        <div className={styles.head}>
          <div>
            <h2 id="wspolpraca-title">{PROCESS.title}</h2>
            <p className={`lm-lead ${styles.intro}`}>{PROCESS.intro}</p>
          </div>
          {MEDIA_FLAGS.processVideo ? <div className={styles.video} /> : null}
        </div>

        <div className={styles.table} role="table" aria-label={PROCESS.title}>
          <div className={styles.headerRow} role="row">
            <span role="columnheader" className={styles.lineCell} />
            <span role="columnheader">{PROCESS.colStep}</span>
            <span role="columnheader" className={styles.oursHead}>
              {PROCESS.colOurs}
            </span>
            <span role="columnheader">{PROCESS.colYours}</span>
          </div>
          <div className={styles.body} role="rowgroup">
            <div className={styles.track} aria-hidden="true">
              <span className={styles.rail} />
              <span className={styles.fill} />
              <span className={styles.rider}>
                <Bzyk width={52} mood="happy" />
              </span>
            </div>
            {PROCESS.steps.map((step, i) => (
              <div key={step.title} className={styles.row} role="row" data-step={i + 1}>
                <span className={styles.lineCell} role="cell" aria-hidden="true">
                  <span className={styles.dot} />
                </span>
                <div role="rowheader" className={styles.step}>
                  <span className={styles.num}>{i + 1}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                </div>
                <div role="cell" className={styles.cell}>
                  <span className={styles.bar} aria-hidden="true" />
                  <span className={styles.label}>{PROCESS.colOurs}</span>
                  <p>{step.ours}</p>
                </div>
                <div role="cell" className={styles.cell}>
                  <span className={styles.bar} aria-hidden="true" />
                  <span className={styles.label}>{PROCESS.colYours}</span>
                  <p>{step.yours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
