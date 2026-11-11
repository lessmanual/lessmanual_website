import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArrowRight } from "@/components/site/Icons";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { FormCta } from "@/components/pages/FormCta";
import { JsonLd } from "@/components/pages/JsonLd";
import styles from "@/components/pages/pages.module.css";
import { FINAL_CTA, SITE_URL } from "@/content/site";
import { SYSTEMS_INDEX, SYSTEM_PAGES, VISIBLE_CARDS } from "@/content/systemy";
import { generateBreadcrumbSchema, generateItemListSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: SYSTEMS_INDEX.metaTitle },
  description: SYSTEMS_INDEX.metaDescription,
  alternates: { canonical: SYSTEMS_INDEX.url },
  openGraph: {
    title: SYSTEMS_INDEX.metaTitle,
    description: SYSTEMS_INDEX.metaDescription,
    url: SYSTEMS_INDEX.url,
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
};

export default function SystemyPage() {
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Strona główna", url: SITE_URL },
    { name: "Systemy", url: SYSTEMS_INDEX.url },
  ]);
  const itemList = generateItemListSchema(
    SYSTEM_PAGES.map((page) => ({
      name: page.h1,
      url: page.url,
      description: page.metaDescription,
    })),
  );

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />
      <SiteHeader />
      <main className={styles.main}>
        <div className={`lm-container ${styles.head}`}>
          <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Systemy" }]} />
          <h1 className={`${styles.title} ${styles.titleWide}`}>{SYSTEMS_INDEX.h1}</h1>
          <p className="lm-lead">{SYSTEMS_INDEX.intro}</p>
        </div>

        <section className={`lm-section ${styles.section}`} aria-labelledby="lista-systemow">
          <div className="lm-container">
            <h2 id="lista-systemow" className={styles.h2}>
              Przykłady systemów
            </h2>
            <ul className={styles.linkCards}>
              {VISIBLE_CARDS.map((card) => (
                <li key={card.slug}>
                  <article className={styles.systemCard}>
                    <h3>
                      {card.pageHref ? <Link href={card.pageHref}>{card.title}</Link> : card.title}
                    </h3>
                    <p>
                      {card.company}. {card.effect}
                    </p>
                    {card.pageHref ? (
                      <Link href={card.pageHref} className={styles.cardLink}>
                        Zobacz, jak działa
                        <ArrowRight />
                      </Link>
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={`lm-section lm-section--white ${styles.section}`}>
          <div className="lm-container">
            <h2 className={styles.h2}>{FINAL_CTA.title}</h2>
            <p className="lm-lead">{FINAL_CTA.body}</p>
            <FormCta />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
