import "server-only";

import { createAnthropic } from "@ai-sdk/anthropic";
import { generateObject, jsonSchema, type LanguageModel, type LanguageModelUsage } from "ai";

import type { RewriteModelPort, RewriteModelResponse } from "../core/rewrite-model-port";
import { parseStructuredModelOutput, type StructuredModelOutput } from "../core/structured-output";
import { SAFEDRAFT_ANTHROPIC_MODEL_ID } from "../server/safedraft-provider-config.server";

const SONNET_4_6_INPUT_USD_PER_TOKEN = 3 / 1_000_000;
const SONNET_4_6_OUTPUT_USD_PER_TOKEN = 15 / 1_000_000;

export type GenerateStructuredForSafeDraftRequest = {
  model: LanguageModel;
  prompt: string;
};

export type GenerateStructuredForSafeDraftResult = {
  output: StructuredModelOutput;
  usage: Pick<LanguageModelUsage, "inputTokens" | "outputTokens">;
};

type GenerateObjectRuntimeResult = {
  output?: unknown;
  object?: unknown;
  usage: Pick<LanguageModelUsage, "inputTokens" | "outputTokens">;
};

export type GenerateStructuredForSafeDraft = (
  request: GenerateStructuredForSafeDraftRequest
) => Promise<GenerateStructuredForSafeDraftResult>;

export type AnthropicRewriteModelPortOptions = {
  apiKey: string;
  modelId?: string;
  now?: () => number;
  generateStructuredForSafeDraft?: GenerateStructuredForSafeDraft;
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
  const generate = options.generateStructuredForSafeDraft ?? defaultGenerateStructuredForSafeDraft;

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
          raw_output: JSON.stringify(result.output),
        };
      } catch {
        throw new SafeDraftProviderError();
      }
    },
  };
}

async function defaultGenerateStructuredForSafeDraft({
  model,
  prompt,
}: GenerateStructuredForSafeDraftRequest): Promise<GenerateStructuredForSafeDraftResult> {
  const result: GenerateObjectRuntimeResult = await generateObject({
    model,
    prompt,
    schema: SAFE_DRAFT_STRUCTURED_OUTPUT_SCHEMA,
    schemaName: "SafeDraftRewriteResult",
    schemaDescription: "Structured SafeDraft rewrite result with public status and metadata-safe review flags.",
    maxRetries: 0,
    maxOutputTokens: 1200,
    timeout: 20_000,
  });

  return {
    output: readStructuredOutputFromGenerateObject(result),
    usage: {
      inputTokens: result.usage.inputTokens,
      outputTokens: result.usage.outputTokens,
    },
  };
}

function readStructuredOutputFromGenerateObject(result: GenerateObjectRuntimeResult): StructuredModelOutput {
  const generatedOutput = result.output ?? result.object;
  const serialisedOutput = JSON.stringify(generatedOutput);

  if (typeof serialisedOutput !== "string") {
    throw new Error("SafeDraft structured generation returned no object");
  }

  const parsedOutput = parseStructuredModelOutput(serialisedOutput);
  if (!parsedOutput.ok) {
    throw new Error("SafeDraft structured generation returned invalid object");
  }

  return parsedOutput.value;
}

function estimateSonnet46CostUsd(usage: Pick<LanguageModelUsage, "inputTokens" | "outputTokens">): number {
  const inputCost = (usage.inputTokens ?? 0) * SONNET_4_6_INPUT_USD_PER_TOKEN;
  const outputCost = (usage.outputTokens ?? 0) * SONNET_4_6_OUTPUT_USD_PER_TOKEN;
  return roundUsd(inputCost + outputCost);
}

function roundUsd(value: number): number {
  return Math.round(value * 1_000_000) / 1_000_000;
}

const SAFE_DRAFT_STRUCTURED_OUTPUT_SCHEMA = jsonSchema<StructuredModelOutput>({
  type: "object",
  additionalProperties: false,
  required: [
    "rewritten_text",
    "public_status",
    "internal_status",
    "confidence",
    "removed_ai_tells",
    "manual_review_reasons",
    "unchanged_facts",
    "risk_flags",
    "one_sentence_summary",
  ],
  properties: {
    rewritten_text: { type: "string" },
    public_status: {
      type: "string",
      enum: ["Gotowe do wysłania", "Wymaga ręcznego review", "Zatrzymane ze względów bezpieczeństwa"],
    },
    internal_status: {
      type: "string",
      enum: ["READY_TO_SEND", "NEEDS_REVIEW", "BLOCKED_SAFETY"],
    },
    confidence: {
      type: "number",
    },
    removed_ai_tells: {
      type: "array",
      items: { type: "string" },
    },
    manual_review_reasons: {
      type: "array",
      items: { type: "string" },
    },
    unchanged_facts: {
      type: "array",
      items: { type: "string" },
    },
    risk_flags: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["category", "severity", "message"],
        properties: {
          category: {
            type: "string",
            enum: ["tone", "fact_change", "claim", "privacy", "safety", "scope"],
          },
          severity: {
            type: "string",
            enum: ["info", "review", "block"],
          },
          message: { type: "string" },
        },
      },
    },
    one_sentence_summary: { type: "string" },
  },
});
