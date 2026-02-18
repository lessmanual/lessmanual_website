import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
import { BlogContent } from "@/components/sections/blog/BlogContent";
import { getPostBySlug, getAllSlugs } from "@/lib/supabase";

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
    return { title: "Post nie znaleziony | LessManual.ai" };
  }

  const title = `${post.title_pl} | LessManual.ai`;
  const description = post.meta_description_pl || post.description_pl || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://lessmanual.ai/blog/${post.slug}`,
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
      title,
      description,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    },
    alternates: {
      canonical: `https://lessmanual.ai/blog/${post.slug}`,
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

  return (
    <>
      <Header />
      <main className="pt-16 pb-16 md:pb-0">
        <article className="py-20 md:py-28">
          <div className="max-w-[760px] mx-auto px-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors mb-8"
            >
              &larr; Blog
            </Link>

            <header className="mb-12">
              {post.category && (
                <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-4">
                  {post.category}
                </span>
              )}

              <h1 className="font-serif text-text mb-6">{post.title_pl}</h1>

              <div className="flex flex-wrap items-center gap-3 text-sm text-text-muted">
                {post.author && <span>{post.author}</span>}
                {post.author && post.published_at && (
                  <span aria-hidden="true">·</span>
                )}
                {post.published_at && (
                  <time dateTime={post.published_at}>
                    {formatDate(post.published_at)}
                  </time>
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
              <div className="mb-12 rounded-[6px] overflow-hidden">
                <img
                  src={post.featured_image}
                  alt={post.title_pl}
                  className="w-full"
                />
              </div>
            )}

            {post.content_pl && <BlogContent html={post.content_pl} />}
          </div>
        </article>
      </main>
      <Footer />
      <MobileCTABar />
    </>
  );
}
