export const runtime = "edge";
export const dynamic = "force-dynamic";

import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { createClient } from "@supabase/supabase-js";

const MONTHLY_TOKEN_CAP = 100000;

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Service-role client - bypasses RLS, used only server-side for rate limiting
const supabase =
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

// In-memory fallback for monthly token tracking (reset on cold start, NOT multi-instance safe)
let fallbackMonthlyTokenUsage = 0;
let fallbackMonth = new Date().getMonth();

const INPUT_ALLOWLIST = /^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-,.()\/\&@:;!?%+'"]+$/;

const INJECTION_SUBSTRINGS = ["</system>", "<instruction>", "```", "<|", "|>"];

function sanitiseInput(raw: string): string {
  // NFKC normalize: collapse visually-equivalent unicode forms (defence against homoglyph attacks)
  let s = raw.normalize("NFKC");
  // Strip zero-width and bidi-override chars (prompt injection via invisible separators)
  s = s.replace(/[​-‏‪-‮﻿]/g, "");
  for (const needle of INJECTION_SUBSTRINGS) {
    while (s.includes(needle)) {
      s = s.replaceAll(needle, "");
    }
  }
  // Strip HTML tags
  s = s.replace(/<[^>]+>/g, "");
  return s;
}

// Monthly token budget - in-memory only (per-instance, resets on cold start)
// Acceptable for soft cap: protects against runaway spend, not exact across instances
async function getMonthlyTokenUsage(): Promise<number> {
  const nowMonth = new Date().getMonth();
  if (nowMonth !== fallbackMonth) {
    fallbackMonth = nowMonth;
    fallbackMonthlyTokenUsage = 0;
  }
  return fallbackMonthlyTokenUsage;
}

async function addMonthlyTokenUsage(delta: number): Promise<void> {
  fallbackMonthlyTokenUsage += delta;
}

// Rate limit: 3 requests per 24h per identifier, backed by Supabase Postgres RPC
// Falls back to allow-on-error (fail-open) to avoid blocking legit users on DB hiccups
async function checkRateLimit(
  identifier: string,
): Promise<{ success: boolean }> {
  if (!supabase) {
    // Supabase not configured (missing env vars) - allow with warning
    console.warn("[rate-limit] Supabase client not configured, allowing request");
    return { success: true };
  }
  const { data, error } = await supabase.rpc("check_and_increment_rate_limit", {
    p_identifier: identifier,
    p_window_seconds: 86400,
    p_max: 3,
  });
  if (error) {
    console.error("[rate-limit] Supabase RPC error:", error.message);
    // Fail-open: allow request to avoid blocking users on transient DB errors
    return { success: true };
  }
  return { success: data.allowed };
}

export async function POST(request: Request): Promise<Response> {
  try {
    // Token budget check
    const currentUsage = await getMonthlyTokenUsage();
    if (currentUsage >= MONTHLY_TOKEN_CAP) {
      return Response.json(
        { error: "Agent offline do końca miesiąca." },
        { status: 503 },
      );
    }

    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
    const { success: allowed } = await checkRateLimit(ip);
    if (!allowed) {
      return Response.json(
        { error: "Limit 3 generacji na dobę osiągnięty." },
        { status: 429 },
      );
    }

    // Parse body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Nieprawidłowe żądanie." }, { status: 400 });
    }

    if (
      typeof body !== "object" ||
      body === null ||
      !("industry" in body) ||
      !("icp" in body)
    ) {
      return Response.json({ error: "Brakujące pola." }, { status: 400 });
    }

    const rawIndustry = String((body as Record<string, unknown>).industry ?? "");
    const rawIcp = String((body as Record<string, unknown>).icp ?? "");

    const industry = sanitiseInput(rawIndustry).trim();
    const icp = sanitiseInput(rawIcp).trim();

    if (!industry || !icp) {
      return Response.json(
        { error: "Branża i ICP nie mogą być puste." },
        { status: 400 },
      );
    }

    if (industry.length > 100 || icp.length > 100) {
      return Response.json(
        { error: "Wartości mogą mieć maks. 100 znaków." },
        { status: 400 },
      );
    }

    if (!INPUT_ALLOWLIST.test(industry) || !INPUT_ALLOWLIST.test(icp)) {
      return Response.json(
        { error: "Niedozwolone znaki w danych wejściowych." },
        { status: 400 },
      );
    }

    const anthropic = createAnthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const result = streamText({
      model: anthropic("claude-sonnet-4-6"),
      maxOutputTokens: 800,
      temperature: 0.7,
      system: `Jesteś ekspertem cold email B2B. Piszesz KRÓTKIE cold emaile po POLSKU z polskimi znakami (ą ć ę ł ń ó ś ź ż).

ZAKAZ: em-dashów, AI-slop (revolutionary, unleash, synergy, leverage, przełomowy, wiodący), terminologii EN (SDR, BDR).

FORMAT:
Subject: [1 linia, max 60 znaków, personalny, konkretny]
---
[Body: max 3 krótkie akapity, max 150 słów]
[CTA: 15-minutowa rozmowa]

TON: konkretny, personalny, B2B, zero fluffu, po polsku potocznym ale profesjonalnym.`,
      messages: [
        {
          role: "user",
          content: `Branża: ${industry}. ICP (kogo sprzedajemy): ${icp}. Wygeneruj 1 cold email w formacie subject + body.`,
        },
      ],
      async onFinish({ usage }) {
        const output = usage.outputTokens ?? 0;
        if (output > 0) {
          await addMonthlyTokenUsage(output);
        }
      },
    });

    return result.toTextStreamResponse();
  } catch (err) {
    console.error("[generate-email]", err);
    return Response.json(
      { error: "Agent chwilowo niedostępny." },
      { status: 500 },
    );
  }
}
