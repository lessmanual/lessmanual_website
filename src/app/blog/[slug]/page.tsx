import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Breadcrumbs } from "@/components/pages/Breadcrumbs";
import { FormCta } from "@/components/pages/FormCta";
import styles from "@/components/pages/pages.module.css";
import { BlogContent } from "@/components/sections/blog/BlogContent";
import { getPostBySlug, getAllSlugs } from "@/lib/supabase";
import {
  generateBlogPostSchema,
  generateBreadcrumbSchema,
  serializeJsonLd,
} from "@/lib/schema";
import { extractFaqSchema } from "@/lib/blog-faq-schema";
import { normalizePublicProse } from "@/lib/public-prose";
import { categoryLabel } from "@/lib/blog-category";
import { isNoindexBlogSlug } from "@/lib/blog-noindex";

export const revalidate = 60;

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post nie znaleziony" };
  }

  const title = normalizePublicProse(post.title_pl);
  const socialTitle = `${title} | LessManual.ai`;
  const description = normalizePublicProse(
    post.meta_description_pl || post.description_pl || "",
  );

  return {
    title,
    description,
    ...(isNoindexBlogSlug(post.slug) ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: socialTitle,
      description,
      url: `https://www.lessmanual.ai/blog/${post.slug}`,
      siteName: "LessManual.ai",
      locale: "pl_PL",
      type: "article",
      publishedTime: post.published_at || undefined,
      authors: post.author ? [post.author] : undefined,
      ...(post.featured_image
        ? {
            images: [
              {
                url: post.featured_image,
                width: 1200,
                height: 630,
                alt: post.title_pl,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
    alternates: {
      canonical: `https://www.lessmanual.ai/blog/${post.slug}`,
    },
  };
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const blogSchema = generateBlogPostSchema(post);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Strona główna", url: "https://www.lessmanual.ai" },
    { name: "Blog", url: "https://www.lessmanual.ai/blog" },
    {
      name: normalizePublicProse(post.title_pl),
      url: `https://www.lessmanual.ai/blog/${post.slug}`,
    },
  ]);
  // FAQPage siedzi w <head> treści posta, którego sanitizer nie przepuszcza.
  const faqSchema = post.content_pl ? extractFaqSchema(post.content_pl) : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
        />
      )}
      <SiteHeader />
      <main className={styles.main}>
        <article className={`lm-container ${styles.head}`}>
          <div className={styles.narrow}>
            <Breadcrumbs
              items={[
                { label: "Strona główna", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: normalizePublicProse(post.title_pl) },
              ]}
            />

            <header className={styles.articleHead}>
              {post.category && <span className={styles.category}>{categoryLabel(post.category)}</span>}

              <h1>{normalizePublicProse(post.title_pl)}</h1>

              <div className={styles.meta}>
                <span>Redaktor: Bartłomiej Chudzik</span>
                <span aria-hidden="true">·</span>
                <span>Founder &amp; CTO, LessManual.ai</span>
                {post.published_at && (
                  <>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                  </>
                )}
                {post.updated_at && post.updated_at !== post.published_at && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>Zaktualizowano: {formatDate(post.updated_at)}</span>
                  </>
                )}
                {post.reading_time_minutes && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{post.reading_time_minutes} min czytania</span>
                  </>
                )}
              </div>
            </header>

            {post.featured_image && (
              <div className={styles.cover}>
                {/* Okładki w Supabase mają ok. 7 MB (PNG); next/image zmniejsza je do WebP pod szerokość
                    ekranu, a wymiary 16:9 rezerwują miejsce (bez skoku treści). Lighthouse 11.11: LCP 60 s. */}
                <Image
                  src={post.featured_image}
                  alt={normalizePublicProse(post.title_pl)}
                  width={1600}
                  height={900}
                  sizes="(min-width: 800px) 760px, 100vw"
                  loading="eager"
                  fetchPriority="high"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}

            {post.content_pl && <BlogContent html={post.content_pl} />}

            <aside className={styles.ctaBox} aria-labelledby="blog-cta">
              <h2 id="blog-cta">Umów rozmowę</h2>
              <p>
                Opowiedz nam, jakie programy i procesy masz w firmie. Po rozmowie dostajesz spisany zakres: efekt, etapy i cenę każdego etapu.
              </p>
              <FormCta />
            </aside>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
