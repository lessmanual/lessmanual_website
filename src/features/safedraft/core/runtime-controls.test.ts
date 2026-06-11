import { describe, expect, it } from "vitest";

import { runSafeDraftBotGuard } from "./bot-guard";
import { createMemorySafeDraftCostCap } from "./cost-cap";
import { isSafeDraftKillSwitchEnvEnabled } from "./kill-switch";
import { createMemorySafeDraftRateLimiter } from "./rate-limit";

describe("SafeDraft runtime control core", () => {
  it("blocks filled honeypot fields and ignores empty honeypot fields", () => {
    expect(runSafeDraftBotGuard({ website: "   " })).toEqual({ ok: true });
    expect(runSafeDraftBotGuard({ website: "https://spam.example" })).toEqual({
      ok: false,
      reason: "honeypot_filled",
    });
  });

  it("parses kill switch env values fail-closed only for explicit truthy values", () => {
    expect(isSafeDraftKillSwitchEnvEnabled(undefined)).toBe(false);
    expect(isSafeDraftKillSwitchEnvEnabled("false")).toBe(false);
    expect(isSafeDraftKillSwitchEnvEnabled("true")).toBe(true);
    expect(isSafeDraftKillSwitchEnvEnabled("1")).toBe(true);
  });

  it("allows a rate-limited key again after the configured window", async () => {
    const limiter = createMemorySafeDraftRateLimiter({
      windowMs: 1_000,
      maxPerIp: 1,
      maxPerEmail: 1,
      maxPerSession: 1,
    });

    await expect(
      limiter.check({
        nowMs: 1_000,
        ipHash: "ip",
        emailHash: "email",
        sessionHash: "session",
      })
    ).resolves.toEqual({ ok: true });
    await expect(
      limiter.check({
        nowMs: 1_500,
        ipHash: "ip",
        emailHash: "email",
        sessionHash: "session",
      })
    ).resolves.toMatchObject({ ok: false, scope: "email" });
    await expect(
      limiter.check({
        nowMs: 2_001,
        ipHash: "ip",
        emailHash: "email",
        sessionHash: "session",
      })
    ).resolves.toEqual({ ok: true });
  });

  it("resets daily cost while keeping monthly cap active", async () => {
    const cap = createMemorySafeDraftCostCap({
      dailyLimitUsd: 1,
      monthlyLimitUsd: 1.5,
    });

    await cap.record({ now: new Date("2026-06-11T10:00:00.000Z"), estimatedCostUsd: 0.9 });
    await expect(
      cap.check({ now: new Date("2026-06-11T11:00:00.000Z"), estimatedRunCostUsd: 0.2 })
    ).resolves.toMatchObject({ ok: false, scope: "daily" });
    await expect(
      cap.check({ now: new Date("2026-06-12T11:00:00.000Z"), estimatedRunCostUsd: 0.2 })
    ).resolves.toEqual({ ok: true });

    await cap.record({ now: new Date("2026-06-12T11:01:00.000Z"), estimatedCostUsd: 0.7 });
    await expect(
      cap.check({ now: new Date("2026-06-12T11:02:00.000Z"), estimatedRunCostUsd: 0.01 })
    ).resolves.toMatchObject({ ok: false, scope: "monthly" });
  });
});
