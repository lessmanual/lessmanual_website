import Link from "next/link";
import { Logo } from "./Logo";
import { Menu } from "./Icons";
import { SiteHeaderMenu } from "./SiteHeaderMenu";
import { LINKS, NAV } from "@/content/site";
import styles from "./SiteHeader.module.css";

// Nagłówek: menu mobilne na <details> (działa przed hydratacją); mały klient zamyka je po kliknięciu pozycji.
export function SiteHeader() {
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
            Umów rozmowę
          </a>
        </nav>
        <SiteHeaderMenu
          burger={
            <summary className={styles.burger} aria-label="Menu">
              <Menu />
            </summary>
          }
        >
          <div className={styles.sheet}>
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className={styles.sheetLink}>
                {item.label}
              </a>
            ))}
            <Link href="/blog" className={styles.sheetLink}>
              Blog
            </Link>
            <a href={LINKS.form} className="lm-btn lm-btn--primary">
              Umów rozmowę
            </a>
          </div>
        </SiteHeaderMenu>
      </div>
    </header>
  );
}
