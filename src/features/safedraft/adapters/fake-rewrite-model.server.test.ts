import { describe, expect, it } from "vitest";

import { parseStructuredModelOutput } from "../core/structured-output";
import { createFakeRewriteModelPort } from "./fake-rewrite-model.server";

describe("createFakeRewriteModelPort", () => {
  it("returns parseable structured output without network or raw prompt echo", async () => {
    const port = createFakeRewriteModelPort();
    const uniquePrompt = "UNIQUE_PROMPT_TEXT_20260611 popraw moj follow-up po rozmowie o AI automation.";

    const response = await port.rewrite({ prompt: uniquePrompt });
    const parsed = parseStructuredModelOutput(response.raw_output);

    expect(response).toMatchObject({
      provider: "fake",
      model_id: "fake-rewrite-model-v0",
      estimated_cost_usd: 0,
    });
    expect(response.latency_ms).toBeGreaterThanOrEqual(0);
    expect(response.raw_output).not.toContain(uniquePrompt);
    expect(parsed.ok).toBe(true);
    expect(parsed.ok && parsed.value.rewritten_text).toContain("Dzięki za kontekst");
  });
});
