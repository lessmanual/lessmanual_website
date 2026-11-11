import Link from "next/link";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "@/components/legal/CookieSettingsButton";
import { FOOTER, LINKS, SYSTEMS } from "@/content/site";
import styles from "./SiteFooter.module.css";

// Ciemna stopka jako jedyny ciemny pas (brief marki: „ciemna może być co najwyżej stopka”).
export function SiteFooter() {
  const systemLinks = SYSTEMS.cards.filter((card) => card.visible && card.pageHref);
  return (
    <footer className={styles.footer}>
      <div className={`lm-container ${styles.grid}`}>
        <div className={styles.brand}>
          <Logo variant="dark" height={30} />
          <p>{FOOTER.about}</p>
        </div>
        <div>
          <h2 className={styles.heading}>Systemy</h2>
          <ul className={styles.list}>
            {systemLinks.map((card) => (
              <li key={card.slug}>
                <Link href={card.pageHref ?? "/systemy"}>{card.title}</Link>
              </li>
            ))}
            <li>
              <Link href="/systemy">Wszystkie systemy</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>Współpraca</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/#wspolpraca">Jak współpracujemy</Link>
            </li>
            <li>
              <Link href="/#drogi">Mapa AI firmy</Link>
            </li>
            <li>
              <Link href="/#drogi">Szybki pilot</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/o-nas">Kim jesteśmy</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className={styles.heading}>Kontakt</h2>
          <ul className={styles.list}>
            <li>
              <a href={LINKS.form}>Umów rozmowę</a>
            </li>
            <li>
              <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            </li>
            <li>
              <a href={LINKS.linkedinBartek} rel="noopener" target="_blank">
                LinkedIn
              </a>
            </li>
            <li>
              <Link href={LINKS.privacy}>Polityka prywatności</Link>
            </li>
            <li>
              <Link href="/legal/polityka-cookies">Polityka cookies</Link>
            </li>
            <li>
              <Link href="/legal/regulamin">Regulamin</Link>
            </li>
            <li>
              <CookieSettingsButton className={styles.linkButton} />
            </li>
          </ul>
        </div>
      </div>
      <div className={`lm-container ${styles.bottom}`}>
        <span>© 2026 LessManual.ai</span>
        <span>{FOOTER.note}</span>
        <span className={styles.provider}>
          LessManual Bartłomiej Chudzik, ul. Długa 33, 05-530 Cendrowice, NIP 1231589909
        </span>
      </div>
    </footer>
  );
}
