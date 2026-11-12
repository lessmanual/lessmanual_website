import Link from "next/link";
import { Logo } from "./Logo";
import { Menu } from "./Icons";
import { SiteHeaderMenu } from "./SiteHeaderMenu";
import { LINKS, NAV } from "@/content/site";
import { HOME_V4 } from "@/content/home-v4";
import styles from "./SiteHeader.module.css";

// Nagłówek: menu mobilne na <details> (działa przed hydratacją); mały klient zamyka je po kliknięciu pozycji.
// Na telefonie przycisk rozmowy stoi obok Menu, bo to główna akcja strony (nie chowamy jej w liście).
export function SiteHeader() {
  const przycisk = HOME_V4.nav.przycisk;
  return (
    <header className={styles.header}>
      <div className={`lm-container ${styles.inner}`}>
        <Link href="/" className={styles.logo} aria-label="LessManual.ai, strona główna">
          <Logo height={30} />
        </Link>
        <nav aria-label="Główna nawigacja" className={styles.nav}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
          <a href={LINKS.form} className="lm-btn lm-btn--secondary lm-btn--sm">
            {przycisk}
          </a>
        </nav>
        <div className={styles.mobileGroup}>
          <a href={LINKS.form} className={`lm-btn lm-btn--primary ${styles.mobileCta}`} data-qa="naglowek-umow">
            {przycisk}
          </a>
          <SiteHeaderMenu
            burger={
              <summary className={styles.burger} aria-label="Menu" data-qa="menu">
                <Menu />
              </summary>
            }
          >
            <div className={styles.sheet} data-qa="menu-lista">
              {NAV.map((item) => (
                <a key={item.href} href={item.href} className={styles.sheetLink}>
                  {item.label}
                </a>
              ))}
            </div>
          </SiteHeaderMenu>
        </div>
      </div>
    </header>
  );
}
