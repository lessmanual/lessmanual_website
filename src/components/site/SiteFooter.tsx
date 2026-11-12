import Link from "next/link";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "@/components/legal/CookieSettingsButton";
import { HOME_V4 } from "@/content/home-v4";
import { LINKS } from "@/content/site";
import styles from "./SiteFooter.module.css";

// Linki Współpracy w kolejności tekstów v4; kotwice `/#...` działają też z /blog i podstron prawnych.
const HREFY_WSPOLPRACY = ["/#wejscie-mapa", "/#wejscie-pilot", "/#pytania", "/o-nas", "/blog"] as const;

// Ciemna stopka jako jedyny ciemny pas (brief marki: „ciemna może być co najwyżej stopka”). Wspólna dla wszystkich stron.
export function SiteFooter() {
  const s = HOME_V4.stopka;
  const kontakt = [
    { href: LINKS.form, zewnetrzny: false },
    { href: `mailto:${LINKS.email}`, zewnetrzny: false },
    { href: LINKS.linkedinBartek, zewnetrzny: true },
    { href: LINKS.googleProfile, zewnetrzny: true },
  ] as const;
  return (
    <footer className={styles.footer}>
      <div className={`lm-container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo variant="dark" height={30} />
          <p>{s.zdanie}</p>
        </div>
        <div>
          <h2 className={styles.heading}>{s.naglowki.dzialy}</h2>
          <ul className={styles.list}>
            {s.dzialy.map((d) => (
              <li key={d.dzial}>
                {/* Zwykły <a>, nie <Link>: nawigacja Next na tę samą stronę zmienia hash przez pushState i nie wywołuje
                    hashchange, na którym DzialProvider przełącza dział. Z /blog to pełne wejście na / z hashem. */}
                <a href={`/#dzial-${d.dzial}`}>{d.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>{s.naglowki.wspolpraca}</h2>
          <ul className={styles.list}>
            {s.wspolpraca.map((etykieta, i) => (
              <li key={etykieta}>
                <Link href={HREFY_WSPOLPRACY[i]}>{etykieta}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>{s.naglowki.kontakt}</h2>
          <ul className={styles.list}>
            {s.kontakt.map((etykieta, i) => (
              <li key={etykieta}>
                {kontakt[i].zewnetrzny ? (
                  <a href={kontakt[i].href} rel="noopener" target="_blank">
                    {etykieta}
                  </a>
                ) : (
                  <a href={kontakt[i].href}>{etykieta}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={`lm-container ${styles.bottom}`}>
        <ul className={styles.prawne}>
          <li>
            <Link href={LINKS.privacy}>{s.prawne[0]}</Link>
          </li>
          <li>
            <Link href="/legal/polityka-cookies">{s.prawne[1]}</Link>
          </li>
          <li>
            <Link href="/legal/regulamin">{s.prawne[2]}</Link>
          </li>
          <li>
            <CookieSettingsButton className={styles.linkButton} />
          </li>
        </ul>
        <p className={styles.dane}>{s.dane}</p>
        <p className={styles.dane}>{s.znakiTowarowe}</p>
      </div>
    </footer>
  );
}
