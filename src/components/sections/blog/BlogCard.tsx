import Link from "next/link";
import type { BlogPost } from "@/lib/supabase";
import { normalizePublicProse } from "@/lib/public-prose";
import { categoryLabel } from "@/lib/blog-category";

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-[var(--shadow-card)] transition-shadow duration-150 group-hover:shadow-[0_0_0_1px_var(--ink)]">
        {post.featured_image && (
          <div className="aspect-[16/9] overflow-hidden bg-sunken">
            {/* eslint-disable-next-line @next/next/no-img-element -- adres z Supabase Storage, wymiary nieznane */}
            <img
              src={post.featured_image}
              alt={normalizePublicProse(post.title_pl)}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-3 p-6">
          {post.category && (
            <span className="text-[15px] font-semibold text-copper-strong">{categoryLabel(post.category)}</span>
          )}

          <h2 className="text-[20px] font-semibold leading-snug text-ink group-hover:text-sea">
            {normalizePublicProse(post.title_pl)}
          </h2>

          {post.description_pl && (
            <p className="line-clamp-3 text-[15px] leading-relaxed text-ink-2">
              {normalizePublicProse(post.description_pl)}
            </p>
          )}

          <div className="mt-auto flex items-center gap-3 pt-2 text-[15px] text-ink-3">
            {post.published_at && (
              <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
            )}
            {post.published_at && post.reading_time_minutes && (
              <span aria-hidden="true">·</span>
            )}
            {post.reading_time_minutes && <span>{post.reading_time_minutes} min czytania</span>}
          </div>
        </div>
      </article>
    </Link>
  );
}
