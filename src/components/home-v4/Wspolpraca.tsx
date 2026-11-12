import { HOME_V4, type Film } from "@/content/home-v4";
import { podzielEtykiete } from "@/lib/home/ruch";
import { OsKrokow } from "./OsKrokow";
import styles from "./Wspolpraca.module.css";

// Miniatura filmu o współpracy przy H2: bez pliku (null) nie renderujemy nic, a film startuje dopiero kliknięciem.
function SlotFilmu({ film }: { film: Film | null }) {
  if (film === null) return null;
  return (
    <video
      className={styles.film}
      data-qa="film-wspolpracy"
      src={film.src}
      poster={film.poster}
      preload="none"
      controls
      playsInline
    >
      {film.napisy ? <track kind="captions" src={film.napisy} srcLang="pl" default /> : null}
    </video>
  );
}

// Sekcja Współpraca: oś kroków z półką systemów (klient), dowód i trzy karty (serwer).
export function Wspolpraca() {
  const w = HOME_V4.wspolpraca;
  return (
    <section id="wspolpraca" className={styles.sekcja} aria-labelledby="wspolpraca-title">
      <div className="lm-container">
        <div className={styles.naglowek}>
          <div className={styles.naglowekTekst}>
            <h2 id="wspolpraca-title" className={styles.h2}>
              {w.h2}
            </h2>
            <p className={`lm-lead ${styles.lead}`}>{w.lead}</p>
          </div>
          <SlotFilmu film={w.film} />
        </div>

        <OsKrokow />

        <p className={styles.dowod} data-qa="dowod">
          {w.dowod.zdanie1} {w.dowod.zdanie2}
        </p>

        <div className={styles.karty}>
          <article className={styles.kartaInfo} data-qa="karta-ceny">
            <h3 className={styles.kartaH3}>{w.ceny.naglowek}</h3>
            <ul className={styles.ceny}>
              {w.ceny.wiersze.map((wiersz) => {
                const { etykieta, reszta } = podzielEtykiete(wiersz);
                return (
                  <li key={wiersz} className={styles.cena}>
                    {etykieta !== null ? (
                      <>
                        <strong data-qa="cena-etykieta">{etykieta}</strong>
                        <span>{reszta}</span>
                      </>
                    ) : (
                      <span>{reszta}</span>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className={styles.drobnyDruk}>{w.ceny.drobnyDruk}</p>
          </article>

          <article className={styles.kartaInfo} data-qa="karta-gwarancja">
            <h3 className={styles.kartaH3}>{w.gwarancja.naglowek}</h3>
            <p className={styles.kartaTekst}>{w.gwarancja.tekst}</p>
            <a className={styles.link} href="#pytanie-obietnica">
              {w.gwarancja.link}
            </a>
          </article>

          <article className={styles.kartaInfo} data-qa="karta-dane-kod">
            <h3 className={styles.kartaH3}>{w.daneKod.naglowek}</h3>
            <p className={styles.kartaTekst}>{w.daneKod.tekst}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
