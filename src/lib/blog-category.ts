// Czytelne nazwy kategorii bloga zamiast surowych slugów z bazy. Bez nazw starych produktów.
const CATEGORY_LABELS: Readonly<Record<string, string>> = {
  "ai-automation": "Automatyzacja z AI",
  "ai-agents": "Agenci AI",
  "ai-content": "Treści i SEO",
  "content-machine": "Treści i SEO",
  seo: "Treści i SEO",
  "pipeline-machine": "Sprzedaż B2B",
  "lead-generation": "Sprzedaż B2B",
  sales: "Sprzedaż B2B",
  outbound: "Sprzedaż B2B",
  "case-study": "Studia przypadków",
  "case-studies": "Studia przypadków",
  strategy: "Strategia",
  pricing: "Koszty i wycena",
  tools: "Narzędzia",
  tutorial: "Poradniki",
  guide: "Poradniki",
  // Kategorie odczytane z blog_posts 11.11.2026 (opublikowane wpisy).
  "chatbot-ai": "Chatboty AI",
  "offer-generator": "Oferty i wyceny",
  "ai-sprzedaz-b2b": "Sprzedaż B2B",
  "ai-w-sprzedazy-b2b": "Sprzedaż B2B",
  "hot-lead-catcher": "Sprzedaż B2B",
  "pipeline machine": "Sprzedaż B2B",
  "ai w marketingu": "AI w marketingu",
};

export function categoryLabel(slug: string): string {
  const key = slug.trim().toLowerCase();
  const known = CATEGORY_LABELS[key];
  if (known) return known;
  const spaced = key.replace(/[-_]+/g, " ").trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
