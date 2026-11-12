import Link from "next/link";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "@/components/legal/CookieSettingsButton";
import { HOME_V4 } from "@/content/home-v4";
import { LINKS } from "@/content/site";
import styles from "./SiteFooter.module.css";

type CelKontaktu = (typeof HOME_V4.stopka.kontakt)[number]["cel"];

// Adres i rodzaj linku dla klucza z tekstów v4; kotwice `/#...` działają też z /blog i podstron prawnych.
function celKontaktu(cel: CelKontaktu): { href: string; zewnetrzny: boolean } {
  switch (cel) {
    case "formularz":
      return { href: LINKS.form, zewnetrzny: false };
    case "email":
      return { href: `mailto:${LINKS.email}`, zewnetrzny: false };
    case "linkedin":
      return { href: LINKS.linkedinBartek, zewnetrzny: true };
    case "google":
      return { href: LINKS.googleProfile, zewnetrzny: true };
  }
}

// Ciemna stopka jako jedyny ciemny pas (brief marki: „ciemna może być co najwyżej stopka”). Wspólna dla wszystkich stron.
export function SiteFooter() {
  const s = HOME_V4.stopka;
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
            {s.wspolpraca.map((pozycja) => (
              <li key={pozycja.label}>
                <Link href={pozycja.href}>{pozycja.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>{s.naglowki.kontakt}</h2>
          <ul className={styles.list}>
            {s.kontakt.map((pozycja) => {
              const { href, zewnetrzny } = celKontaktu(pozycja.cel);
              return (
                <li key={pozycja.label}>
                  {zewnetrzny ? (
                    <a href={href} rel="noopener" target="_blank">
                      {pozycja.label}
                    </a>
                  ) : (
                    <a href={href}>{pozycja.label}</a>
                  )}
                </li>
              );
            })}
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
