import { describe, expect, it } from "vitest";
import { extractFaqSchema } from "./blog-faq-schema";

// Posty w blog_posts.content_pl to pełne dokumenty HTML z FAQPage w <head>.
// sanitizeBlogHtml słusznie wycina <script>, więc bez tej funkcji znacznik FAQ
// nigdy nie trafiał na stronę (wykryte 24.09.2026 na wszystkich postach).
const faqScript = (json: string) =>
  `<html><head><script type="application/ld+json">${json}</script></head><body><h1>Post</h1></body></html>`;

describe("extractFaqSchema", () => {
  it("returns the FAQPage questions and answers embedded in the post", () => {
    const html = faqScript(
      JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Czy Subiekt GT sam odczyta zamówienie z maila?",
            acceptedAnswer: { "@type": "Answer", text: "Nie. Subiekt przyjmuje plik EPP." },
          },
        ],
      }),
    );

    expect(extractFaqSchema(html)).toEqual({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Czy Subiekt GT sam odczyta zamówienie z maila?",
          acceptedAnswer: { "@type": "Answer", text: "Nie. Subiekt przyjmuje plik EPP." },
        },
      ],
    });
  });

  it("rebuilds the schema from questions only, so extra fields from the database never reach the page", () => {
    const html = faqScript(
      JSON.stringify({
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Pytanie?",
            url: "javascript:alert(1)",
            acceptedAnswer: { "@type": "Answer", text: "Odpowiedź.", onclick: "x" },
          },
        ],
        sameAs: "https://evil.example",
      }),
    );

    const result = JSON.stringify(extractFaqSchema(html));

    expect(result).not.toContain("javascript");
    expect(result).not.toContain("onclick");
    expect(result).not.toContain("evil");
  });

  it("skips questions without an answer text and returns null when nothing valid is left", () => {
    const html = faqScript(
      JSON.stringify({
        "@type": "FAQPage",
        mainEntity: [{ "@type": "Question", name: "Bez odpowiedzi?" }],
      }),
    );

    expect(extractFaqSchema(html)).toBeNull();
  });

  it("ignores other JSON-LD types and broken JSON instead of breaking the page", () => {
    expect(extractFaqSchema(faqScript('{"@type":"BlogPosting","headline":"x"}'))).toBeNull();
    expect(extractFaqSchema(faqScript("{to nie jest json"))).toBeNull();
    expect(extractFaqSchema("<p>Post bez head</p>")).toBeNull();
  });
});
