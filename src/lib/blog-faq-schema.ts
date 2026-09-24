type FaqQuestion = {
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
};

export type FaqPageSchema = {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: FaqQuestion[];
};

const JSON_LD_SCRIPT = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseJson(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function toQuestion(entry: unknown): FaqQuestion | null {
  if (!isRecord(entry) || typeof entry.name !== "string") return null;
  const answer = entry.acceptedAnswer;
  if (!isRecord(answer) || typeof answer.text !== "string") return null;
  const name = entry.name.trim();
  const text = answer.text.trim();
  if (!name || !text) return null;
  return {
    "@type": "Question",
    name,
    acceptedAnswer: { "@type": "Answer", text },
  };
}

/**
 * Wyciąga FAQPage z JSON-LD zapisanego w treści posta (blog_posts.content_pl).
 *
 * Posty są pełnymi dokumentami HTML z FAQPage w <head>. sanitizeBlogHtml wycina
 * <script>, więc znacznik ginął. Nie przepuszczamy go w sanitizerze: budujemy
 * schemat od nowa tylko z par pytanie-odpowiedź, żeby żadne inne pole z bazy
 * nie trafiło na stronę. Zepsuty JSON albo brak FAQ = null, strona renderuje się dalej.
 */
export function extractFaqSchema(html: string): FaqPageSchema | null {
  for (const match of html.matchAll(JSON_LD_SCRIPT)) {
    const parsed = parseJson(match[1]);
    if (!isRecord(parsed) || parsed["@type"] !== "FAQPage") continue;
    if (!Array.isArray(parsed.mainEntity)) continue;

    const questions = parsed.mainEntity
      .map(toQuestion)
      .filter((question): question is FaqQuestion => question !== null);
    if (questions.length === 0) continue;

    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: questions,
    };
  }
  return null;
}
