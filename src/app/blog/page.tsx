import type { Metadata } from "next";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { FormCta } from "@/components/pages/FormCta";
import styles from "@/components/pages/pages.module.css";
import { BlogCard } from "@/components/sections/blog/BlogCard";
import { getPublishedPosts } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Praktyczna wiedza o automatyzacji biznesu z AI. Poradniki, case studies i strategie wdrażania systemów AI w firmach B2B.",
  openGraph: {
    title: "Blog | LessManual.ai",
    description:
      "Praktyczna wiedza o automatyzacji biznesu z AI. Poradniki, case studies i strategie wdrażania systemów AI w firmach B2B.",
    url: "https://www.lessmanual.ai/blog",
    siteName: "LessManual.ai",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | LessManual.ai",
    description:
      "Praktyczna wiedza o automatyzacji biznesu z AI. Poradniki, case studies i strategie wdrażania systemów AI w firmach B2B.",
  },
  alternates: {
    canonical: "https://www.lessmanual.ai/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <>
      <SiteHeader />
      <main className={styles.main}>
        <div className={`lm-container ${styles.head}`}>
          <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Blog" }]} />
          <h1 className={styles.title}>Blog</h1>
          <p className="lm-lead">
            Praktyczna wiedza o automatyzacji biznesu z AI. Bez teorii, same
            konkretne rozwiązania.
          </p>
        </div>

        <section className={`lm-section ${styles.section}`}>
          <div className="lm-container">
            {posts.length > 0 ? (
              <div className={styles.postGrid}>
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <p className="lm-lead">Wkrótce pojawią się artykuły.</p>
            )}
            <FormCta />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
