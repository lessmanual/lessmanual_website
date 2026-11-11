import type { Metadata } from "next";
import Image from "next/image";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { FormCta } from "@/components/pages/FormCta";
import { JsonLd } from "@/components/pages/JsonLd";
import styles from "@/components/pages/pages.module.css";
import { ABOUT, LINKS, META, SITE_URL } from "@/content/site";
import { generateAboutPageSchema, generateBreadcrumbSchema } from "@/lib/schema";

const PAGE_URL = `${SITE_URL}/o-nas`;
const DESCRIPTION =
  "LessManual to partner technologiczny dla firm prowadzonych przez właściciela. Firmę prowadzi Bartłomiej Chudzik. Budujemy systemy AI i opiekujemy się nimi po wdrożeniu.";

export const metadata: Metadata = {
  title: { absolute: "Kim jesteśmy | LessManual.ai" },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Kim jesteśmy | LessManual.ai",
    description: META.ogDescription,
    url: PAGE_URL,
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
};

export default function ONasPage() {
  const aboutSchema = generateAboutPageSchema({
    name: ABOUT.title,
    description: DESCRIPTION,
    url: PAGE_URL,
  });
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Strona główna", url: SITE_URL },
    { name: ABOUT.title, url: PAGE_URL },
  ]);

  return (
    <>
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumb} />
      <SiteHeader />
      <main className={styles.main}>
        <div className={`lm-container ${styles.head}`}>
          <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: ABOUT.title }]} />
          <h1 className={styles.title}>{ABOUT.title}</h1>
          <div className={styles.about}>
            <div className={styles.aboutText}>
              {ABOUT.paragraphs.map((paragraph) => (
                <p key={paragraph} className="lm-lead">
                  {paragraph}
                </p>
              ))}
              <p>
                <a
                  href={LINKS.linkedinBartek}
                  className="lm-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bartłomiej Chudzik na LinkedIn
                </a>
              </p>
              <FormCta />
            </div>
            <figure className={styles.photo}>
              <Image
                src="/bartek.jpg"
                alt="Bartłomiej Chudzik, założyciel LessManual"
                width={640}
                height={960}
                sizes="(min-width: 900px) 320px, 100vw"
                priority
              />
            </figure>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
