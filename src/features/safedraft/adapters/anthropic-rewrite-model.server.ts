import "server-only";

import { createAnthropic } from "@ai-sdk/anthropic";
import { generateText, type LanguageModel, type LanguageModelUsage } from "ai";

import type { RewriteModelPort, RewriteModelResponse } from "../core/rewrite-model-port";
import { SAFEDRAFT_ANTHROPIC_MODEL_ID } from "../server/safedraft-provider-config.server";

const SONNET_4_6_INPUT_USD_PER_TOKEN = 3 / 1_000_000;
const SONNET_4_6_OUTPUT_USD_PER_TOKEN = 15 / 1_000_000;

export type GenerateTextForSafeDraftRequest = {
  model: LanguageModel;
  prompt: string;
};

export type GenerateTextForSafeDraftResult = {
  text: string;
  usage: Pick<LanguageModelUsage, "inputTokens" | "outputTokens">;
};

export type GenerateTextForSafeDraft = (
  request: GenerateTextForSafeDraftRequest
) => Promise<GenerateTextForSafeDraftResult>;

export type AnthropicRewriteModelPortOptions = {
  apiKey: string;
  modelId?: string;
  now?: () => number;
  generateTextForSafeDraft?: GenerateTextForSafeDraft;
};

export class SafeDraftProviderError extends Error {
  readonly code = "safedraft_provider_failed";

  constructor() {
    super("SafeDraft provider call failed");
    this.name = "SafeDraftProviderError";
  }
}

export function createAnthropicRewriteModelPort(options: AnthropicRewriteModelPortOptions): RewriteModelPort {
  const modelId = options.modelId ?? SAFEDRAFT_ANTHROPIC_MODEL_ID;
  const provider = createAnthropic({ apiKey: options.apiKey });
  const model = provider(modelId);
  const now = options.now ?? Date.now;
  const generate = options.generateTextForSafeDraft ?? defaultGenerateTextForSafeDraft;

  return {
    async rewrite(request): Promise<RewriteModelResponse> {
      const startedAt = now();

      try {
        const result = await generate({
          model,
          prompt: request.prompt,
        });

        return {
          provider: "anthropic",
          model_id: modelId,
          latency_ms: Math.max(0, now() - startedAt),
          estimated_cost_usd: estimateSonnet46CostUsd(result.usage),
          raw_output: result.text,
        };
      } catch {
        throw new SafeDraftProviderError();
      }
    },
  };
}

async function defaultGenerateTextForSafeDraft({
  model,
  prompt,
}: GenerateTextForSafeDraftRequest): Promise<GenerateTextForSafeDraftResult> {
  const result = await generateText({
    model,
    prompt,
    maxRetries: 0,
    maxOutputTokens: 1200,
    timeout: 20_000,
  });

  return {
    text: result.text,
    usage: {
      inputTokens: result.usage.inputTokens,
      outputTokens: result.usage.outputTokens,
    },
  };
}

function estimateSonnet46CostUsd(usage: Pick<LanguageModelUsage, "inputTokens" | "outputTokens">): number {
  const inputCost = (usage.inputTokens ?? 0) * SONNET_4_6_INPUT_USD_PER_TOKEN;
  const outputCost = (usage.outputTokens ?? 0) * SONNET_4_6_OUTPUT_USD_PER_TOKEN;
  return roundUsd(inputCost + outputCost);
}

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}
