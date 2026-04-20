export const runtime = "edge";
export const dynamic = "force-dynamic";

import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const MONTHLY_TOKEN_CAP = 100000;
const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;
const hasRedis = Boolean(REDIS_URL && REDIS_TOKEN);

// Upstash path (preferred: works across Edge instances)
const redis = hasRedis
  ? new Redis({ url: REDIS_URL!, token: REDIS_TOKEN! })
  : null;
const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "24 h"),
      prefix: "lm:email-gen",
      analytics: false,
    })
  : null;

// In-memory fallback (preview/dev only: reset on cold start, NOT multi-instance safe)
const requestTracker = new Map<string, number[]>();
let fallbackMonthlyTokenUsage = 0;
let fallbackMonth = new Date().getMonth();

const INPUT_ALLOWLIST = /^[a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ\s\-,.()\/\&@:;!?%+'"]+$/;

const INJECTION_SUBSTRINGS = ["</system>", "<instruction>", "```", "<|", "|>"];

function sanitiseInput(raw: string): string {
  // NFKC normalize: collapse visually-equivalent unicode forms (defence against homoglyph attacks)
  let s = raw.normalize("NFKC");
  // Strip zero-width and bidi-override chars (prompt injection via invisible separators)
  s = s.replace(/[\u200B-\u200F\u202A-\u202E\uFEFF]/g, "");
  for (const needle of INJECTION_SUBSTRINGS) {
    while (s.includes(needle)) {
      s = s.replaceAll(needle, "");
    }
  }
  // Strip HTML tags
  s = s.replace(/<[^>]+>/g, "");
  return s;
}

async function getMonthlyTokenUsage(): Promise<number> {
  if (redis) {
    const key = `lm:email-gen:tokens:${new Date().toISOString().slice(0, 7)}`;
    const value = await redis.get<number>(key);
    return value ?? 0;
  }
  const nowMonth = new Date().getMonth();
  if (nowMonth !== fallbackMonth) {
    fallbackMonth = nowMonth;
    fallbackMonthlyTokenUsage = 0;
  }
  return fallbackMonthlyTokenUsage;
}

async function addMonthlyTokenUsage(delta: number): Promise<void> {
  if (redis) {
    const key = `lm:email-gen:tokens:${new Date().toISOString().slice(0, 7)}`;
    await redis.incrby(key, delta);
    await redis.expire(key, 60 * 60 * 24 * 40); // ~40d rolling TTL
    return;
  }
  fallbackMonthlyTokenUsage += delta;
}

async function checkRateLimit(ip: string): Promise<boolean> {
  if (ratelimit) {
    const { success } = await ratelimit.limit(ip);
    return success;
  }
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000;
  const existing = (requestTracker.get(ip) ?? []).filter(
    (ts) => now - ts < windowMs,
  );
  if (existing.length >= 3) return false;
  requestTracker.set(ip, [...existing, now]);
  return true;
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
    const allowed = await checkRateLimit(ip);
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
