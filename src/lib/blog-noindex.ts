// Wpisy ukryte przed Google (lista CMO, 11.11.2026): adresy działają, ale mają
// robots noindex i nie ma ich w sitemapie.
export const NOINDEX_BLOG_SLUGS: readonly string[] = [
  "hot-lead-catcher-wykrywanie-goracych-leadow",
  "content-machine-ai-30-artykulow-miesiecznie",
  "pipeline-sprzedazowy-ai-maszyna-spotkan",
  "pay-per-meeting-nowy-model-pozyskiwania-klientow",
  "ile-kosztuje-handlowiec-ai-polska",
];

export function isNoindexBlogSlug(slug: string): boolean {
  return NOINDEX_BLOG_SLUGS.includes(slug);
}
