"use client";

import { Star } from "@/components/site/Icons";
import { HOME_V4, inicjal, type DzialId, type Opinia } from "@/content/home-v4";
import { LINKS } from "@/content/site";
import { trackEvent } from "@/lib/analytics";
import styles from "./Karty.module.css";

type Miejsce = DzialId | "opinie";

function LinkOpinii({ href, tekst, dzial }: { href: string; tekst: string; dzial: Miejsce }) {
  return (
    <a
      className={styles.linkOpinii}
      href={href}
      target="_blank"
      rel="noopener"
      data-qa="link-opinii"
      onClick={() => trackEvent("review_click", { dzial })}
    >
      {tekst}
    </a>
  );
}

// Karta opinii w wyglądzie swojego źródła: Google (inicjał, gwiazdki, link do wizytówki, bez logo G),
// referencja (papier i podpis, bez linku), LinkedIn (oryginał, tłumaczenie, link do rekomendacji).
// Używana w karuzeli działu (karta 3) i w sekcji Opinie; `dzial` trafia do zdarzenia review_click.
export function KartaOpinia({ opinia, dzial }: { opinia: Opinia; dzial: Miejsce }) {
  const { opinie, hero } = HOME_V4;
  switch (opinia.zrodlo) {
    case "google":
      return (
        <figure className={`${styles.opinia} ${styles.opiniaGoogle}`} data-qa="opinia" data-zrodlo="google">
          <figcaption className={styles.opiniaGlowa}>
            <span className={styles.inicjal} aria-hidden="true">
              {inicjal(opinia.podpis)}
            </span>
            <span className={styles.podpis}>{opinia.podpis}</span>
          </figcaption>
          <span className={styles.gwiazdki} role="img" aria-label={hero.cytat.etykietaOceny}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} size={18} />
            ))}
          </span>
          <blockquote className={styles.cytat}>{opinia.tekst}</blockquote>
          <LinkOpinii href={LINKS.googleProfile} tekst={opinie.linkGoogle} dzial={dzial} />
        </figure>
      );
    case "referencja":
      return (
        <figure className={`${styles.opinia} ${styles.opiniaReferencja}`} data-qa="opinia" data-zrodlo="referencja">
          <blockquote className={styles.cytat}>{opinia.tekst}</blockquote>
          <figcaption className={styles.podpisPapier}>{opinia.podpis}</figcaption>
        </figure>
      );
    case "linkedin":
      return (
        <figure className={`${styles.opinia} ${styles.opiniaLinkedin}`} data-qa="opinia" data-zrodlo="linkedin">
          <blockquote className={styles.cytat} lang="en">
            {opinia.oryginal}
          </blockquote>
          <p className={styles.tlumaczenie}>
            <span className={styles.tlumaczenieEtykieta}>{opinie.etykietaTlumaczenia}</span> {opinia.tlumaczenie}
          </p>
          <figcaption className={styles.podpis}>{opinia.podpis}</figcaption>
          <LinkOpinii href={LINKS.linkedinRecommendations} tekst={opinie.linkLinkedin} dzial={dzial} />
        </figure>
      );
    default: {
      const nieznane: never = opinia;
      return nieznane;
    }
  }
}
