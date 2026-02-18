export function BlogContent({ html }: { html: string }) {
  return (
    <div
      className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-text prose-headings:font-normal prose-p:text-text-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-blockquote:border-accent prose-blockquote:text-text-secondary prose-li:text-text-secondary prose-img:rounded-[6px]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
