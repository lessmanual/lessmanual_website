import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Plus } from "@/components/site/Icons";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { FormCta } from "@/components/pages/FormCta";
import { JsonLd } from "@/components/pages/JsonLd";
import styles from "@/components/pages/pages.module.css";
import { FAQ, SITE_URL } from "@/content/site";
import { generateBreadcrumbSchema, generateFaqPageSchema } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}/faq`;
const TITLE = "Najczęstsze pytania o systemy AI dla firm";
const DESCRIPTION =
  "Ile kosztuje system AI, co jeśli nie zadziała, co z danymi i RODO oraz ile zajmie uruchomienie. Odpowiedzi na pytania, które słyszymy od właścicieli firm.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    title: `${TITLE} | LessManual`,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
};

export default function FaqPage() {
  const faqSchema = generateFaqPageSchema(FAQ.items);
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Strona główna", url: SITE_URL },
    { name: "FAQ", url: PAGE_URL },
  ]);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumb} />
      <SiteHeader />
      <main className={styles.main}>
        <div className={`lm-container ${styles.head}`}>
          <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "FAQ" }]} />
          <h1 className={`${styles.title} ${styles.titleWide}`}>{FAQ.title}</h1>
          <div className={styles.faq}>
            {FAQ.items.map((item, index) => (
              <details key={item.q} id={`faq-${index + 1}`} className={styles.faqItem}>
                <summary>
                  <span>{item.q}</span>
                  <Plus className={styles.faqIcon} />
                </summary>
                <p className={styles.faqAnswer}>{item.a}</p>
              </details>
            ))}
          </div>
          <FormCta />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
