import { DZIALY, HOME_V4, type Karta } from "@/content/home-v4";
import { Karuzela } from "./Karuzela";
import { RzutFirmy } from "./RzutFirmy";
import { DymekDzialow, ZakladkiDzialow } from "./ZakladkiDzialow";
import styles from "./ModulDzialow.module.css";

// Tytuł karty-zaślepki; pełną treść kart dostarcza kolejny etap (film, przykład, opinia, pomysły).
function tytulKarty(karta: Karta): string {
  switch (karta.rodzaj) {
    case "film":
    case "przyklad":
      return karta.tytul;
    case "opinia":
      return karta.opinia.podpis;
    case "pomysly":
      return HOME_V4.dzialy.naglowekPomyslow;
  }
}

function Zaslepka({ karta }: { karta: Karta }) {
  return (
    <div className={styles.zaslepka} data-rodzaj={karta.rodzaj}>
      <h3 className={styles.zaslepkaTytul}>{tytulKarty(karta)}</h3>
    </div>
  );
}

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
                  <Zaslepka key="film" karta={film} />,
                  <Zaslepka key="przyklad" karta={przyklad} />,
                  <Zaslepka key="opinia" karta={opinia} />,
                  <Zaslepka key="pomysly" karta={pomysly} />,
                ]}
              </Karuzela>
            );
          })}
        </div>
      </div>
    </section>
  );
}
