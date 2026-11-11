import { sanitizeBlogHtml } from "@/lib/sanitize-blog-html";
import { normalizePublicProse } from "@/lib/public-prose";

// Prose v3: nagłówki Inter 600, linki morskie, tekst #0A0A0A / #3F3F46, 18 px (prose-lg).
const PROSE_CLASSES = [
  "prose prose-lg max-w-none",
  "prose-headings:font-semibold prose-headings:text-ink prose-headings:tracking-tight",
  "prose-p:text-ink-2 prose-p:leading-[1.7]",
  "prose-a:text-sea prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-sea-hover",
  "prose-strong:text-ink prose-li:text-ink-2",
  "prose-blockquote:border-copper prose-blockquote:text-ink-2",
  "prose-th:text-ink prose-td:text-ink-2 prose-img:rounded-xl",
].join(" ");

export function BlogContent({ html }: { html: string }) {
  const safeHtml = normalizePublicProse(sanitizeBlogHtml(html));

  return (
    <div className={PROSE_CLASSES} dangerouslySetInnerHTML={{ __html: safeHtml }} />
  );
}
