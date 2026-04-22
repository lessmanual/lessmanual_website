import type { Metadata } from "next";
import Link from "next/link";
import { HeaderV2 } from "@/components/v2/HeaderV2";
import { FooterV2 } from "@/components/v2/FooterV2";
import { BlogCard } from "@/components/sections/blog/BlogCard";
import { getPublishedPosts } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog | LessManual.ai",
  description:
    "Praktyczna wiedza o automatyzacji biznesu z AI. Poradniki, case studies i strategie wdrażania systemów AI w firmach B2B.",
  openGraph: {
    title: "Blog | LessManual.ai",
    description:
      "Praktyczna wiedza o automatyzacji biznesu z AI. Poradniki, case studies i strategie wdrażania systemów AI w firmach B2B.",
    url: "https://lessmanual.ai/blog",
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
    canonical: "https://lessmanual.ai/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="v2-scope">
      <style>{`
        .v2-scope {
          background: #FAFAFA;
          color: #0A0A0A;
          font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
          min-height: 100vh;
        }
        .v2-scope h1 {
          font-family: var(--font-inter), system-ui, sans-serif;
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: #0A0A0A;
          font-size: clamp(2.75rem, 6vw, 4.75rem);
        }
        .v2-scope h2 {
          font-family: var(--font-instrument-serif), Georgia, serif;
          font-weight: 400;
          letter-spacing: -0.01em;
          line-height: 1.35;
          color: #0A0A0A;
        }
        .v2-scope article h2 {
          font-size: 1.125rem;
        }
        .v2-scope .font-mono { font-family: var(--font-jetbrains-mono), ui-monospace, monospace; }
        .v2-scope .v2-link { color: #0A0A0A; transition: color 150ms ease; }
        .v2-scope .v2-link:hover { color: #B87333; }
      `}</style>
      <HeaderV2 />
      <main className="pt-16 pb-16 md:pb-0">
        <section className="py-20 md:py-28">
          <div className="max-w-[1240px] mx-auto px-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-text-muted hover:text-accent transition-colors mb-8"
            >
              &larr; Strona glowna
            </Link>

            <h1 className="font-serif text-text mb-4">Blog</h1>
            <p className="text-text-secondary text-lg max-w-[680px] mb-12">
              Praktyczna wiedza o automatyzacji biznesu z AI. Bez teorii, same
              konkretne rozwiazania.
            </p>

            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-text-muted text-lg">
                  Wkrotce pojawia sie artykuly.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <FooterV2 />
    </div>
  );
}
