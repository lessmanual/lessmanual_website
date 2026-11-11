import Link from "next/link";
import { Bzyk } from "@/components/site/Bzyk";
import { ArrowRight, Check, Plus } from "@/components/site/Icons";
import {
  BZYK_LINES,
  FAQ,
  FOR_WHOM,
  GUARANTEE,
  LINKS,
  MEDIA_FLAGS,
  PATHS,
  PRICING,
  PROOF,
  SCOPE_CARD,
  SYSTEMS,
  TESTIMONIALS,
  formHref,
} from "@/content/site";
import styles from "./Sections.module.css";

// Sekcje strony głównej bez ruchu (PLAN_BUDOWY pkt 3: „pozostałe sekcje bez ruchu”).
// Kolejność według TEKSTY_STRONY.md v3, z kartą „Spisany zakres” (3a) po „Jak współpracujemy”.

export function ForWhom() {
  return (
    <section className="lm-section lm-section--white" aria-labelledby="dla-kogo-title">
      <div className={`lm-container ${styles.split}`}>
        <h2 id="dla-kogo-title" className={styles.splitTitle}>
          {FOR_WHOM.title}
        </h2>
        <div>
          <h3 className={styles.listTitle}>{FOR_WHOM.yesTitle}</h3>
          <ul className="lm-check-list">
            {FOR_WHOM.yes.map((item) => (
              <li key={item}>
                <Check size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className={styles.notFor}>
            <h3 className={styles.listTitleSmall}>{FOR_WHOM.noTitle}</h3>
            <ul className={styles.dashList}>
              {FOR_WHOM.no.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ScopeCard() {
  return (
    <section className={styles.scopeSection} aria-labelledby="zakres-title">
      <div className="lm-container">
        <article className={`lm-card ${styles.scopeCard}`}>
          <h2 id="zakres-title" className={styles.scopeTitle}>
            {SCOPE_CARD.title}
          </h2>
          <div>
            <ul className="lm-check-list">
              {SCOPE_CARD.items.map((item) => (
                <li key={item}>
                  <Check size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={styles.scopeNote}>{SCOPE_CARD.note}</p>
          </div>
        </article>
      </div>
    </section>
  );
}

export function Systems() {
  const cards = SYSTEMS.cards.filter((card) => card.visible);
  return (
    <section id="systemy" className="lm-section lm-section--white" aria-labelledby="systemy-title">
      <div className="lm-container">
        <h2 id="systemy-title" className={styles.narrowTitle}>
          {SYSTEMS.title}
        </h2>
        <p className={`lm-lead ${styles.sectionIntro}`}>{SYSTEMS.intro}</p>
        <ul className={styles.cards}>
          {cards.map((card) => (
            <li key={card.slug} className={`lm-card ${styles.systemCard}`}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardMeta}>{card.company}</p>
              <p className={styles.cardEffect}>{card.effect}</p>
              {card.pageHref ? (
                <Link href={card.pageHref} className={styles.cardLink}>
                  Zobacz, jak działa
                  <ArrowRight size={16} />
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Paths() {
  return (
    <section id="drogi" className="lm-section" aria-labelledby="drogi-title">
      <div className="lm-container">
        <h2 id="drogi-title" className={styles.narrowTitle}>
          {PATHS.title}
        </h2>
        <p className={`lm-lead ${styles.sectionIntro}`}>{PATHS.intro}</p>
        <ul className={styles.paths}>
          {PATHS.items.map((path) => (
            <li key={path.id} className={`lm-card ${styles.pathCard}`}>
              <p className={styles.pathLabel}>{path.label}</p>
              <h3 className={styles.cardTitle}>{path.title}</h3>
              <dl className={styles.pathFacts}>
                <dt>{PATHS.labels.forWhom}</dt>
                <dd>{path.forWhom}</dd>
                <dt>{PATHS.labels.how}</dt>
                <dd>{path.how}</dd>
                <dt>{PATHS.labels.gets}</dt>
                <dd>{path.gets}</dd>
                <dt>{PATHS.labels.cost}</dt>
                <dd className={styles.pathCost}>{path.cost}</dd>
              </dl>
              <a
                href={formHref(path.id)}
                className={`lm-btn ${path.primary ? "lm-btn--primary" : "lm-btn--secondary"} ${styles.pathCta}`}
              >
                {path.cta}
                <ArrowRight className="lm-btn__arrow" />
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.sectionBzyk}>
          <Bzyk width={48} mood="neutral" />
          <p className="lm-bubble">
            <span className="lm-bubble__who">Bzyk</span>
            {BZYK_LINES.paths}
          </p>
        </div>
      </div>
    </section>
  );
}

export function Guarantee() {
  return (
    <section className="lm-section lm-section--white" aria-labelledby="gwarancja-title">
      <div className="lm-container">
        <h2 id="gwarancja-title" className={styles.narrowTitle}>
          {GUARANTEE.title}
        </h2>
        <ul className={styles.ruled}>
          {GUARANTEE.items.map((item) => (
            <li key={item.title}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>
        <p className={styles.afterNote}>
          <a href={GUARANTEE.limitsLink.href} className="lm-link">
            {GUARANTEE.limitsLink.label}
          </a>
        </p>
      </div>
    </section>
  );
}

export function Pricing() {
  return (
    <section id="ceny" className="lm-section" aria-labelledby="ceny-title">
      <div className={`lm-container ${styles.split}`}>
        <h2 id="ceny-title" className={styles.splitTitle}>
          {PRICING.title}
        </h2>
        <dl className={styles.priceList}>
          {PRICING.items.map((item) => (
            <div key={item.title}>
              <dt>{item.title}</dt>
              <dd>{item.body}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/** Sekcja 8: ukryta do pierwszego nagrania (TEKSTY v3). Pasek liczb jest w hero od startu. */
export function Testimonials() {
  if (!MEDIA_FLAGS.testimonialsSection) {
    return null;
  }
  return (
    <section id="opinie" className="lm-section lm-section--white" aria-labelledby="opinie-title">
      <div className="lm-container">
        <h2 id="opinie-title" className={styles.narrowTitle}>
          {TESTIMONIALS.title}
        </h2>
        <p className={styles.statsBar}>{PROOF.bar}</p>
        <p className={styles.afterNote}>{PROOF.oneClient}</p>
        <figure className={styles.quote}>
          <blockquote lang="en">
            <p>„{TESTIMONIALS.arekQuote}”</p>
          </blockquote>
          <figcaption>
            <strong>{TESTIMONIALS.arekName}</strong>, {TESTIMONIALS.arekRole} ·{" "}
            <a href={LINKS.linkedinRecommendations} className="lm-link" target="_blank" rel="noopener">
              Zobacz na LinkedIn
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export function Faq() {
  return (
    <section id="faq" className="lm-section" aria-labelledby="faq-title">
      <div className={`lm-container ${styles.split}`}>
        <h2 id="faq-title" className={styles.splitTitle}>
          {FAQ.title}
        </h2>
        <div className={styles.faq}>
          {FAQ.items.map((item, i) => (
            <details key={item.q} id={`faq-${i + 1}`} open={i === 0}>
              <summary>
                <span>{item.q}</span>
                <Plus />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
