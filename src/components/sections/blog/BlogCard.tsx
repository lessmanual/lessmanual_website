import Link from "next/link";
import type { BlogPost } from "@/lib/supabase";

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
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="h-full bg-white border border-border rounded-[6px] overflow-hidden transition-all duration-300 hover:border-accent hover:scale-[1.01]">
        {post.featured_image ? (
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={post.featured_image}
              alt={post.title_pl}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="aspect-[16/9] bg-gradient-to-br from-accent/10 via-accent/5 to-bg" />
        )}

        <div className="p-6">
          {post.category && (
            <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full mb-3">
              {post.category}
            </span>
          )}

          <h2 className="font-serif text-xl text-text leading-snug mb-2 group-hover:text-accent transition-colors duration-300">
            {post.title_pl}
          </h2>

          {post.description_pl && (
            <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
              {post.description_pl}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-text-muted">
            {post.published_at && (
              <time dateTime={post.published_at}>
                {formatDate(post.published_at)}
              </time>
            )}
            {post.published_at && post.reading_time_minutes && (
              <span aria-hidden="true">·</span>
            )}
            {post.reading_time_minutes && (
              <span>{post.reading_time_minutes} min czytania</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
