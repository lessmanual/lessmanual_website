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
  return wrapTables(rewriteCalLinks(sanitizedHtml));
}
