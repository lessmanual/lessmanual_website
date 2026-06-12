import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import {
  createAnthropicRewriteModelPort,
  SafeDraftProviderError,
  type GenerateStructuredForSafeDraft,
} from "./anthropic-rewrite-model.server";
import { SAFEDRAFT_ANTHROPIC_MODEL_ID } from "../server/safedraft-provider-config.server";

const STRUCTURED_OUTPUT = {
  rewritten_text: "Dzięki za rozmowę. Proponuję sprawdzić jeden proces i policzyć koszt ręcznej pracy.",
  public_status: "Wymaga ręcznego review",
  internal_status: "NEEDS_REVIEW",
  confidence: 0.82,
  removed_ai_tells: ["kompleksowo"],
  manual_review_reasons: ["Anthropic adapter test uses mocked generation."],
  unchanged_facts: [],
  risk_flags: [],
  one_sentence_summary: "Mocked Anthropic SafeDraft rewrite.",
};

describe("createAnthropicRewriteModelPort", () => {
  it("maps generated structured object into RewriteModelResponse metadata", async () => {
    let capturedPrompt = "";
    const generateStructuredForSafeDraft: GenerateStructuredForSafeDraft = async ({ prompt }) => {
      capturedPrompt = prompt;
      return {
        output: STRUCTURED_OUTPUT,
        usage: {
          inputTokens: 1000,
          outputTokens: 500,
        },
      };
    };
    const port = createAnthropicRewriteModelPort({
      apiKey: "test-anthropic-key",
      generateStructuredForSafeDraft,
      now: createNowSequence([100, 137]),
    });

    const response = await port.rewrite({ prompt: "UNIQUE_SAFE_PROMPT_20260611" });

    expect(capturedPrompt).toBe("UNIQUE_SAFE_PROMPT_20260611");
    expect(response).toEqual({
      provider: "anthropic",
      model_id: SAFEDRAFT_ANTHROPIC_MODEL_ID,
      latency_ms: 37,
      estimated_cost_usd: 0.0105,
      raw_output: JSON.stringify(STRUCTURED_OUTPUT),
    });
  });

  it("fails with generic error without leaking raw prompt text", async () => {
    const rawPrompt = "UNIQUE_RAW_DRAFT_PROMPT_20260611 do not leak this text";
    const generateStructuredForSafeDraft: GenerateStructuredForSafeDraft = async () => {
      throw new Error(`provider failure included ${rawPrompt}`);
    };
    const port = createAnthropicRewriteModelPort({
      apiKey: "test-anthropic-key",
      generateStructuredForSafeDraft,
      now: createNowSequence([100, 130]),
    });

    let thrownError: unknown;
    try {
      await port.rewrite({ prompt: rawPrompt });
    } catch (error) {
      thrownError = error;
    }

    expect(thrownError).toBeInstanceOf(SafeDraftProviderError);
    expect(thrownError).toMatchObject({
      message: "SafeDraft provider call failed",
      code: "safedraft_provider_failed",
    });
    expect(String(thrownError)).not.toContain(rawPrompt);
    expect(JSON.stringify(thrownError)).not.toContain(rawPrompt);
  });
});

describe("SafeDraft server-only provider boundary", () => {
  it("marks provider config and Anthropic adapter as server-only", () => {
    expect(readProjectFile("src/features/safedraft/server/safedraft-provider-config.server.ts")).toContain(
      'import "server-only";'
    );
    expect(readProjectFile("src/features/safedraft/adapters/anthropic-rewrite-model.server.ts")).toContain(
      'import "server-only";'
    );
  });

  it("does not import the Anthropic adapter or provider config from client modules", () => {
    const clientFiles = [
      ...collectFiles("src/app/safedraft"),
      ...collectFiles("src/features/safedraft/components"),
      ...collectFiles("src/features/safedraft/browser"),
    ];

    for (const filePath of clientFiles) {
      const source = readProjectFile(filePath);
      if (source.startsWith('"use client";') || source.startsWith("'use client';")) {
        expect(source).not.toContain("anthropic-rewrite-model.server");
        expect(source).not.toContain("safedraft-provider-config.server");
        expect(source).not.toContain("@ai-sdk/anthropic");
        expect(source).not.toContain("ANTHROPIC_API_KEY");
      }
    }
  });
});

function createNowSequence(values: number[]): () => number {
  let index = 0;
  return () => {
    const value = values[index];
    index += 1;
    return value === undefined ? values[values.length - 1] ?? 0 : value;
  };
}

function readProjectFile(relativePath: string): string {
  return readFileSync(join(process.cwd(), relativePath), "utf8");
}

function collectFiles(relativePath: string): string[] {
  const absolutePath = join(process.cwd(), relativePath);
  if (!existsSync(absolutePath)) {
    return [];
  }

  const stats = statSync(absolutePath);
  if (stats.isFile()) {
    return [relativePath];
  }

  const files: string[] = [];
  for (const entry of readdirSync(absolutePath)) {
    files.push(...collectFiles(join(relativePath, entry)));
  }
  return files.filter((filePath) => filePath.endsWith(".ts") || filePath.endsWith(".tsx"));
}
