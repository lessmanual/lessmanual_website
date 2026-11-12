import { DZIALY, HOME_V4 } from "@/content/home-v4";
import { KartaOpinia } from "./KartaOpinia";
import { KartaPomysly } from "./KartaPomysly";
import { KartaPrzyklad } from "./KartaPrzyklad";
import { KartaSystem } from "./KartaSystem";
import { Karuzela } from "./Karuzela";
import { RzutFirmy } from "./RzutFirmy";
import { DymekDzialow, ZakladkiDzialow } from "./ZakladkiDzialow";
import styles from "./ModulDzialow.module.css";

// Sekcja Działy: H2, lead, rzut firmy, zakładki, dymek i pięć karuzel. Wszystkie 5 × 4 kart są w HTML po SSR;
// karuzele nieaktywnych działów mają `hidden` (indeksowanie, CLS 0).
export function ModulDzialow() {
  const { dzialy } = HOME_V4;
  return (
    <section id="dzialy" className={styles.sekcja} aria-labelledby="dzialy-title">
      <div className="lm-container">
        <h2 id="dzialy-title" className={styles.h2}>
          {dzialy.h2}
        </h2>
        <p className={`lm-lead ${styles.lead}`}>{dzialy.lead}</p>
        <RzutFirmy />
        <ZakladkiDzialow />
        <DymekDzialow />
        <div className={styles.karuzele}>
          {DZIALY.map((id) => {
            const [film, przyklad, opinia, pomysly] = dzialy.lista[id].karty;
            return (
              <Karuzela key={id} dzial={id}>
                {[
                  <KartaSystem key="film" karta={film} etykiety={dzialy.etykiety} />,
                  <KartaPrzyklad key="przyklad" karta={przyklad} dzial={id} />,
                  <KartaOpinia key="opinia" opinia={opinia.opinia} dzial={id} />,
                  <KartaPomysly key="pomysly" karta={pomysly} />,
                ]}
              </Karuzela>
            );
          })}
        </div>
      </div>
    </section>
  );
}
