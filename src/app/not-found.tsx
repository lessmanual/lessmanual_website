import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { FormCta } from "@/components/pages/FormCta";
import styles from "@/components/pages/pages.module.css";

export const metadata: Metadata = {
  title: "Nie znaleziono strony",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <div className={`lm-container ${styles.head}`}>
          <h1 className={styles.title}>Nie ma takiej strony</h1>
          <p className="lm-lead">
            Adres mógł się zmienić albo został wpisany z błędem. Wróć na stronę główną albo zobacz, jakie systemy budujemy.
          </p>
          <ul className={styles.linkList}>
            <li>
              <Link href="/" className="lm-link">
                Strona główna
              </Link>
            </li>
            <li>
              <Link href="/systemy" className="lm-link">
                Systemy
              </Link>
            </li>
            <li>
              <Link href="/blog" className="lm-link">
                Blog
              </Link>
            </li>
          </ul>
          <FormCta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
