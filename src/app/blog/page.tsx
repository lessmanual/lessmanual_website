import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCTABar } from "@/components/layout/MobileCTABar";
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
    <>
      <Header />
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
              Praktyczna wiedza o automatyzacji biznesu z AI. Bez teorii — same
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
      <Footer />
      <MobileCTABar />
    </>
  );
}
