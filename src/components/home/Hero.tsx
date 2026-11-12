import { Bzyk } from "@/components/site/Bzyk";
import { ArrowRight, Star } from "@/components/site/Icons";
import { BZYK_LINES, HERO, LINKS, PROOF, opinieLabel } from "@/content/site";
import { HeroScene } from "./HeroScene";
import styles from "./Hero.module.css";

// Pierwszy ekran: H1 i opis są w HTML z serwera i widoczne od pierwszej klatki (element LCP).
// Jeden Bzyk w pierwszym ekranie (uwaga Bartka 12.11): stoi przy przycisku od pierwszej klatki
// i mówi jedno zdanie, bo prowadzi do formularza; ze sceny obok został usunięty.
// Nagłówek łamany ręcznie (lista anty-slop, pkt 15), tak jak w projekcie v3.
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`lm-container ${styles.grid}`}>
        <div className={styles.copy}>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.line}>
              {HERO.titleBefore} <span className="lm-accent">{HERO.titleAccent}</span>
            </span>{" "}
            <span className={styles.line}>pracy,</span>{" "}
            <span className={styles.line}>więcej kontroli</span>{" "}
            <span className={styles.line}>nad firmą.</span>
          </h1>
          <p className={`lm-lead ${styles.subtitle}`}>{HERO.subtitle}</p>
          <div className={styles.ctaRow}>
            <a href={LINKS.form} className={`lm-btn lm-btn--primary ${styles.cta}`}>
              {HERO.cta}
              <ArrowRight className="lm-btn__arrow" />
            </a>
            <p className={styles.note}>{HERO.ctaNote}</p>
            <div className={styles.guide}>
              <div className={styles.guideBzyk}>
                <Bzyk width={54} mood="happy" />
              </div>
              <p className={`lm-bubble ${styles.bubble}`}>
                <span className="lm-bubble__who">Bzyk</span>
                {BZYK_LINES.hero}
              </p>
            </div>
          </div>
          {/* Kolejność i format jak w projekcie v3: gwiazdki i ocena Google z linkiem, potem liczby. */}
          <p className={styles.proof}>
            {PROOF.google !== null ? (
              <a href={LINKS.googleProfile} className={styles.rating} target="_blank" rel="noopener">
                <span className={styles.stars} aria-hidden="true">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </span>
                <strong>{PROOF.google.rating}</strong>
                <span className={styles.ratingLabel}>{opinieLabel(PROOF.google.reviews)} w Google</span>
              </a>
            ) : null}
            <span>{PROOF.bar}</span>
          </p>
        </div>
        <div className={styles.visual}>
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
