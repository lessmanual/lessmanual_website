import type { RewriteModelPort, RewriteModelResponse } from "../core/rewrite-model-port";

export function createFakeRewriteModelPort(): RewriteModelPort {
  return {
    async rewrite(): Promise<RewriteModelResponse> {
      return {
        provider: "fake",
        model_id: "fake-rewrite-model-v0",
        latency_ms: 0,
        estimated_cost_usd: 0,
        raw_output: JSON.stringify({
          rewritten_text:
            "Dzięki za kontekst. Proponuję podejść do tego prosto: sprawdzić jeden proces, policzyć obecny koszt ręcznej pracy i dopiero wtedy zdecydować, czy automatyzacja ma sens.",
          public_status: "Wymaga ręcznego review",
          internal_status: "NEEDS_REVIEW",
          confidence: 0.84,
          removed_ai_tells: ["w dzisiejszym dynamicznym świecie", "kompleksowo"],
          manual_review_reasons: ["Fake adapter nie ocenia realnej zgodności faktów."],
          unchanged_facts: [],
          risk_flags: [
            {
              category: "scope",
              severity: "review",
              message: "Fake output requires human review before use.",
            },
          ],
          one_sentence_summary: "Fake rewrite for local SafeDraft public v0 integration.",
        }),
      };
    },
  };
}
