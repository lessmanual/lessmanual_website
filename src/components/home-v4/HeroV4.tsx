import { Star } from "@/components/site/Icons";
import { HOME_V4, type Film } from "@/content/home-v4";
import { LINKS } from "@/content/site";
import { HeroKlawisze } from "./HeroKlawisze";
import styles from "./HeroV4.module.css";

function rolkaZTekstow(): Film | null {
  return HOME_V4.hero.rolka;
}

// Pierwszy ekran v4. H1 jest elementem LCP: nic nad nim nie ładuje obrazów ani nie jest lazy.
// Teksty wyłącznie z HOME_V4.hero (cytat i pasek liczb 1:1).
export function HeroV4() {
  const { hero } = HOME_V4;
  // Funkcja z jawnym typem: bez niej TS zawęża `rolka` do `null` (dziś w tekstach jest null) i gałąź z filmem staje się `never`.
  const rolka = rolkaZTekstow();
  const [imie = "", zrodlo = "", ocena = ""] = hero.cytat.podpis.split(" · ");

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`lm-container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.nadtytul}>{hero.nadtytul}</p>
          <h1 id="hero-title" className={styles.h1}>
            {hero.h1}
          </h1>
          <p className={`lm-lead ${styles.podtytul}`}>{hero.podtytul}</p>
          <HeroKlawisze />
          <div className={styles.cta}>
            <a href={LINKS.form} className="lm-btn lm-btn--primary" data-qa="hero-umow">
              {hero.przyciskGlowny}
            </a>
            <p className={styles.linia}>{hero.liniaPodPrzyciskiem}</p>
          </div>
          <figure className={styles.cytat} data-qa="hero-cytat">
            <blockquote>
              <p>{hero.cytat.tekst}</p>
            </blockquote>
            <figcaption className={styles.autor}>
              <span className={styles.inicjal} aria-hidden="true">
                {imie.charAt(0)}
              </span>
              <span className={styles.imie}>{imie}</span>
              <span className={styles.gwiazdki} role="img" aria-label={`${ocena.length} z 5`}>
                {Array.from(ocena, (_, i) => (
                  <Star key={i} size={14} />
                ))}
              </span>
              <span className={styles.zrodlo}>{zrodlo}</span>
            </figcaption>
          </figure>
          <p className={styles.pasek}>{hero.paskLiczb}</p>
        </div>
        {rolka ? (
          <div className={styles.rolka}>
            <video src={rolka.src} poster={rolka.poster} preload="none" controls playsInline />
          </div>
        ) : null}
      </div>
    </section>
  );
}
