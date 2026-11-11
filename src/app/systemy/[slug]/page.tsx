import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ArrowRight, Plus } from "@/components/site/Icons";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { JsonLd } from "@/components/pages/JsonLd";
import styles from "@/components/pages/pages.module.css";
import { PATHS, SITE_URL, formHref } from "@/content/site";
import {
  SYSTEM_PAGES,
  SYSTEM_PAGE_LABELS,
  SYSTEMS_INDEX,
  getSystemPage,
} from "@/content/systemy";
import {
  generateBreadcrumbSchema,
  generateFaqPageSchema,
  generateServiceSchema,
} from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return SYSTEM_PAGES.map((page) => ({ slug: page.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSystemPage(slug);
  if (!page) return { title: "Nie znaleziono strony" };

  return {
    title: { absolute: page.metaTitle },
    description: page.metaDescription,
    alternates: { canonical: page.url },
    openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
      title: page.metaTitle,
      description: page.metaDescription,
      url: page.url,
      siteName: "LessManual.ai",
      locale: "pl_PL",
      type: "website",
    },
  };
}

export default async function SystemPageRoute({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const page = getSystemPage(slug);
  if (!page) notFound();

  const service = generateServiceSchema({
    name: page.h1,
    description: page.metaDescription,
    url: page.url,
  });
  const faqSchema = generateFaqPageSchema(page.faq);
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Strona główna", url: SITE_URL },
    { name: "Systemy", url: SYSTEMS_INDEX.url },
    { name: page.h1, url: page.url },
  ]);
  const others = SYSTEM_PAGES.filter((item) => item.slug !== page.slug);
  const labels = SYSTEM_PAGE_LABELS;

  return (
    <>
      <JsonLd data={service} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumb} />
      <SiteHeader />
      <main className={styles.main}>
        <div className={`lm-container ${styles.head}`}>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Systemy", href: "/systemy" },
              { label: page.card.title },
            ]}
          />
          <h1 className={`${styles.title} ${styles.titleWide}`}>{page.h1}</h1>
          <p className="lm-lead">{page.lead}</p>
        </div>

        <section className={`lm-section ${styles.section}`} aria-labelledby="problem">
          <div className="lm-container">
            <h2 id="problem" className={styles.h2}>
              {labels.problem}
            </h2>
            <p className="lm-lead">{page.problem}</p>
          </div>
        </section>

        <section className={`lm-section ${styles.section}`} aria-labelledby="jak-dziala">
          <div className="lm-container">
            <h2 id="jak-dziala" className={styles.h2}>
              {labels.howItWorks}
            </h2>
            <ul className={styles.steps}>
              {page.howItWorks.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
            {page.afterList ? <p className={styles.afterList}>{page.afterList}</p> : null}
          </div>
        </section>

        <section className={`lm-section ${styles.section}`} aria-labelledby="efekt">
          <div className="lm-container">
            <h2 id="efekt" className={styles.h2}>
              {labels.effect}
            </h2>
            <div className={styles.card}>
              <p className={styles.effectText}>{page.effect}</p>
            </div>
          </div>
        </section>

        <section className={`lm-section ${styles.section}`} aria-labelledby="pytania">
          <div className="lm-container">
            <h2 id="pytania" className={styles.h2}>
              {labels.faqTitle}
            </h2>
            <div className={styles.faq}>
              {page.faq.map((item) => (
                <details key={item.q} className={styles.faqItem}>
                  <summary>
                    <span>{item.q}</span>
                    <Plus className={styles.faqIcon} />
                  </summary>
                  <p className={styles.faqAnswer}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={`lm-section lm-section--white ${styles.section}`} aria-labelledby="start">
          <div className="lm-container">
            <h2 id="start" className={styles.h2}>
              {labels.startTitle}
            </h2>
            <div className={styles.paths}>
              {PATHS.items.map((path) => (
                <div key={path.id} className={styles.path}>
                  <span className={styles.pathLabel}>{path.label}</span>
                  <h3>{path.title}</h3>
                  <p>{path.cost}</p>
                  <a
                    href={formHref(path.id)}
                    className={`lm-btn ${path.primary ? "lm-btn--primary" : "lm-btn--secondary"} ${styles.pathButton}`}
                  >
                    {path.cta}
                    <ArrowRight className="lm-btn__arrow" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`lm-section ${styles.section}`} aria-labelledby="inne">
          <div className="lm-container">
            <h2 id="inne" className={styles.h2}>
              {labels.otherTitle}
            </h2>
            <ul className={styles.linkList}>
              {others.map((item) => (
                <li key={item.slug}>
                  <Link href={item.path} className="lm-link">
                    {item.card.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/systemy" className="lm-link">
                  Wszystkie systemy
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
