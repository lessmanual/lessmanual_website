import { OpenDetailsOnHash } from "@/components/home/OpenDetailsOnHash";
import { Plus } from "@/components/site/Icons";
import { HOME_V4 } from "@/content/home-v4";
import styles from "./FaqV4.module.css";

// FAQ v4: akordeon na <details> (działa bez JS). Id `pytanie-<id>` to kotwice z innych sekcji,
// np. link Gwarancji z Współpracy; OpenDetailsOnHash rozwija pytanie po wejściu na kotwicę.
export function FaqV4() {
  const f = HOME_V4.faq;
  return (
    <section id="pytania" data-qa="faq" className={styles.sekcja} aria-labelledby="pytania-title">
      <div className="lm-container">
        <h2 id="pytania-title" className={styles.h2}>
          {f.h2}
        </h2>
        <div className={styles.lista}>
          <OpenDetailsOnHash />
          {f.pytania.map((p) => (
            <details key={p.id} id={`pytanie-${p.id}`} className={styles.pytanie}>
              <summary className={styles.summary}>
                <span>{p.q}</span>
                <Plus />
              </summary>
              <p className={styles.odpowiedz}>{p.a}</p>
            </details>
          ))}
        </div>
        <a className={styles.powrot} href="#formularz">
          {f.powrot}
        </a>
      </div>
    </section>
  );
}
