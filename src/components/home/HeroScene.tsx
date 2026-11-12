import { Check } from "@/components/site/Icons";
import { HERO_SCENE } from "@/content/site";
import { ScenePauseButton } from "./ScenePauseButton";
import styles from "./HeroScene.module.css";

// Scena „ręczna robota znika”: prawdziwy system z karty 2 (215 dokumentów, 0 błędów).
// Cały ruch w CSS (transform i opacity, pętla 5,5 s), bez JS poza przyciskiem pauzy.
// Stan końcowy (215, wszystko „wpisano”) jest pierwszą klatką i stanem bez ruchu,
// więc czytnik ekranu, Google i prefers-reduced-motion widzą ten sam przekaz.
// Bez Bzyka w scenie (uwaga Bartka 12.11): w pierwszym ekranie jest jeden Bzyk, przy przycisku.
export function HeroScene() {
  const counters = Array.from(
    { length: HERO_SCENE.counterTo - HERO_SCENE.counterFrom + 1 },
    (_, i) => HERO_SCENE.counterFrom + i,
  );
  return (
    <figure className={styles.scene} data-scene>
      <div className={styles.stage}>
        <ScenePauseButton className={styles.pause} />
        <ul className={styles.docs} aria-hidden="true">
          {HERO_SCENE.docs.map((doc, i) => (
            <li key={doc} className={styles.doc} data-i={i}>
              <span className={styles.docIcon} />
              <span className={styles.docName}>{doc}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.sheet}>
        <p className={styles.sheetTitle}>{HERO_SCENE.title}</p>
        <p className={styles.sheetSub}>{HERO_SCENE.subtitle}</p>
        <div className={styles.counterBlock}>
          <span className={styles.counter} aria-hidden="true">
            {counters.map((n, i) => (
              <span key={n} data-i={i}>
                {n}
              </span>
            ))}
          </span>
          <span className="lm-sr">{HERO_SCENE.counterTo}</span>
          <span className={styles.counterLabel}>{HERO_SCENE.counterLabel}</span>
          <span className={styles.errors}>
            <Check size={16} />
            {HERO_SCENE.errors}
          </span>
        </div>
        <ul className={styles.rows}>
          {HERO_SCENE.rows.map((row, i) => (
            <li key={row} className={styles.row} data-i={i}>
              <span>{row}</span>
              <span className={styles.status}>
                <span className={styles.waiting} aria-hidden="true">
                  czeka
                </span>
                <span className={styles.done}>
                  <Check size={15} />
                  wpisano
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className={styles.caption}>{HERO_SCENE.caption}</figcaption>
    </figure>
  );
}
