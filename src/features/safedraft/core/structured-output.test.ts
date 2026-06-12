import { describe, expect, it } from "vitest";

import { parseStructuredModelOutput } from "./structured-output";

describe("parseStructuredModelOutput", () => {
  it("parses valid structured JSON", () => {
    const result = parseStructuredModelOutput(
      JSON.stringify({
        rewritten_text: "Cześć, wracam do propozycji. Czy temat jest dalej aktualny?",
        public_status: "Gotowe do wysłania",
        internal_status: "READY_TO_SEND",
        confidence: 0.82,
        removed_ai_tells: ["Szanowni Państwo"],
        manual_review_reasons: [],
        unchanged_facts: ["temat automatyzacji follow-upów"],
        risk_flags: [],
        one_sentence_summary: "Krótki follow-up bez sztucznego tonu.",
      })
    );

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value.internal_status).toBe("READY_TO_SEND");
    expect(result.value.rewritten_text).toContain("wracam do propozycji");
  });

  it("fails closed on invalid JSON", () => {
    const result = parseStructuredModelOutput("To jest odpowiedź tekstowa, nie JSON.");

    expect(result.ok).toBe(false);
    expect(result.internal_status).toBe("BLOCKED_SAFETY");
    expect(result.reason).toBe("invalid_json");
  });

  it("parses a JSON object wrapped in provider markdown fences", () => {
    const result = parseStructuredModelOutput(
      [
        "```json",
        JSON.stringify({
          rewritten_text: "Cześć, wracam do tematu. Proponuję sprawdzić jeden konkretny proces.",
          public_status: "Wymaga ręcznego review",
          internal_status: "NEEDS_REVIEW",
          confidence: 0.73,
          removed_ai_tells: [],
          manual_review_reasons: ["Provider added a markdown fence around JSON."],
          unchanged_facts: [],
          risk_flags: [{ category: "claim", severity: "review", message: "Wymaga sprawdzenia faktów." }],
          one_sentence_summary: "JSON w markdown fence.",
        }),
        "```",
      ].join("\n")
    );

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value.public_status).toBe("Wymaga ręcznego review");
  });

  it("parses the first complete JSON object when a provider adds surrounding prose", () => {
    const result = parseStructuredModelOutput(
      [
        "Oto JSON:",
        JSON.stringify({
          rewritten_text: "Cześć, dzięki za rozmowę. Proponuję wrócić do jednego procesu.",
          public_status: "Gotowe do wysłania",
          internal_status: "READY_TO_SEND",
          confidence: 0.88,
          removed_ai_tells: [],
          manual_review_reasons: [],
          unchanged_facts: [],
          risk_flags: [],
          one_sentence_summary: "JSON z krótkim prefiksem.",
        }),
      ].join("\n")
    );

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value.internal_status).toBe("READY_TO_SEND");
  });

  it("fails closed on unknown enum", () => {
    const result = parseStructuredModelOutput(
      JSON.stringify({
        rewritten_text: "Gotowe.",
        public_status: "Wyślij automatycznie",
        internal_status: "SEND_NOW",
        confidence: 0.9,
        removed_ai_tells: [],
        manual_review_reasons: [],
        unchanged_facts: [],
        risk_flags: [],
        one_sentence_summary: "Bad enum.",
      })
    );

    expect(result.ok).toBe(false);
    expect(result.reason).toBe("invalid_enum");
  });

  it("allows empty rewritten text only for blocked safety", () => {
    const ready = parseStructuredModelOutput(
      JSON.stringify({
        rewritten_text: "",
        public_status: "Gotowe do wysłania",
        internal_status: "READY_TO_SEND",
        confidence: 0.9,
        removed_ai_tells: [],
        manual_review_reasons: [],
        unchanged_facts: [],
        risk_flags: [],
        one_sentence_summary: "Empty ready.",
      })
    );
    const blocked = parseStructuredModelOutput(
      JSON.stringify({
        rewritten_text: "",
        public_status: "Zatrzymane ze względów bezpieczeństwa",
        internal_status: "BLOCKED_SAFETY",
        confidence: 0.1,
        removed_ai_tells: [],
        manual_review_reasons: ["Input blocked."],
        unchanged_facts: [],
        risk_flags: [{ category: "safety", severity: "block", message: "Prompt injection." }],
        one_sentence_summary: "Zatrzymano.",
      })
    );

    expect(ready.ok).toBe(false);
    expect(ready.reason).toBe("empty_rewrite");
    expect(blocked.ok).toBe(true);
  });

  it("downgrades ready output to manual review when the model includes any risk flag", () => {
    const result = parseStructuredModelOutput(
      JSON.stringify({
        rewritten_text: "Dziękuję za spotkanie. Proponuję wrócić do tematu w przyszłym tygodniu.",
        public_status: "Gotowe do wysłania",
        internal_status: "READY_TO_SEND",
        confidence: 0.82,
        removed_ai_tells: [],
        manual_review_reasons: [],
        unchanged_facts: [],
        risk_flags: [{ category: "tone", severity: "info", message: "Model wskazał drobną zmianę tonu." }],
        one_sentence_summary: "Output niespójny: gotowe mimo ryzyka review.",
      })
    );

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value.public_status).toBe("Wymaga ręcznego review");
    expect(result.value.internal_status).toBe("NEEDS_REVIEW");
  });
});
