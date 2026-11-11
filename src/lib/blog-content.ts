// Przepisywanie treści wpisów po sanityzacji. Czyste funkcje, bez zapisu do bazy.

const FORM_HREF = "/#formularz";

// Linki do Cal.com (dowolna subdomena i ścieżka) w treści wpisów: CTA bloga prowadzi
// do formularza na stronie głównej (decyzja Bartka 11.11.2026).
const CAL_HREF = /href="https?:\/\/(?:[a-z0-9-]+\.)*cal\.com(?:[/?#][^"]*)?"/gi;

export function rewriteCalLinks(html: string): string {
  return html.replace(CAL_HREF, `href="${FORM_HREF}"`);
}

// Tabela w kontenerze z przewijaniem poziomym: szeroka tabela nie rozpycha strony na mobile.
export function wrapTables(html: string): string {
  return html
    .replace(/<table\b/gi, '<div class="lm-table-scroll" tabindex="0" role="region" aria-label="Tabela, przewiń w bok"><table')
    .replace(/<\/table>/gi, "</table></div>");
}

export function prepareBlogHtml(sanitizedHtml: string): string {
  return optimizeContentImages(wrapTables(rewriteCalLinks(sanitizedHtml)));
}

// Obrazy w treści wpisów to PNG z Supabase Storage po ok. 7 MB. Przy renderowaniu kierujemy je
// przez optymalizację obrazów Next (WebP, szerokość 828 px, mieści kolumnę 760 px), bez zmian w bazie.
const SUPABASE_IMG_SRC =
  /src="(https:\/\/mpshzmbgsupznnyhpyyl\.supabase\.co\/storage\/v1\/object\/public\/[^"]+)"/gi;

export function optimizeContentImages(html: string): string {
  return html.replace(SUPABASE_IMG_SRC, (_match, url: string) => {
    const decoded = url.replace(/&amp;/g, "&");
    return `src="/_next/image?url=${encodeURIComponent(decoded)}&amp;w=828&amp;q=75"`;
  });
}
