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
            const karty = dzialy.lista[id].karty;
            return (
              <Karuzela key={id} dzial={id} rodzaje={karty.map((k) => k.rodzaj)}>
                {karty.map((k) => {
                  switch (k.rodzaj) {
                    case "film":
                      return <KartaSystem key="film" karta={k} etykiety={dzialy.etykiety} />;
                    case "przyklad":
                      return <KartaPrzyklad key="przyklad" karta={k} dzial={id} />;
                    case "opinia":
                      return <KartaOpinia key="opinia" opinia={k.opinia} dzial={id} />;
                    case "pomysly":
                      return <KartaPomysly key="pomysly" karta={k} />;
                  }
                })}
              </Karuzela>
            );
          })}
        </div>
      </div>
    </section>
  );
}
