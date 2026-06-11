import { describe, expect, it } from "vitest";

import { parseSafeDraftSubmission } from "./input-schema";
import { buildRewritePrompt } from "./rewrite-prompt";

describe("buildRewritePrompt", () => {
  it("wraps user draft in an untrusted input boundary and includes tone/channel", () => {
    const parsed = parseSafeDraftSubmission({
      draft_text:
        "Szanowni Państwo, pragnę serdecznie podziękować za zainteresowanie automatyzacją follow-upów w CRM.",
      email: "lead@example.com",
      privacy_terms_accepted: true,
      processing_consent_accepted: true,
      consent_version: "safedraft-public-v0-2026-06-11",
      tone: "direct_founder",
      channel: "follow_up",
    });

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) {
      return;
    }

    const prompt = buildRewritePrompt(parsed.value);

    expect(prompt).toContain("<untrusted_user_draft>");
    expect(prompt).toContain("</untrusted_user_draft>");
    expect(prompt).toContain("tone: direct_founder");
    expect(prompt).toContain("channel: follow_up");
  });

  it("forbids new facts, prices, case studies and legal safety claims", () => {
    const parsed = parseSafeDraftSubmission({
      draft_text:
        "Cześć, wracam do tematu automatyzacji sprzedaży. Chcę odpisać krótko i bez sztucznego tonu.",
      email: "lead@example.com",
      privacy_terms_accepted: true,
      processing_consent_accepted: true,
      consent_version: "safedraft-public-v0-2026-06-11",
      tone: "calm_advisor",
      channel: "email",
    });

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) {
      return;
    }

    const prompt = buildRewritePrompt(parsed.value);

    expect(prompt).toContain("Do not invent facts, prices, client names, case studies, deadlines or metrics.");
    expect(prompt).toContain("Do not claim the message is legally safe.");
  });

  it("does not include email, UTM, consent metadata or ad identifiers", () => {
    const parsed = parseSafeDraftSubmission({
      draft_text:
        "Cześć, czy temat wdrożenia automatyzacji follow-upów jest dalej aktualny w tym kwartale?",
      email: "secret.lead@example.com",
      privacy_terms_accepted: true,
      processing_consent_accepted: true,
      consent_version: "safedraft-public-v0-2026-06-11",
      tone: "c_level_brief",
      channel: "linkedin_dm",
      utm_source: "linkedin-ads",
      utm_campaign: "safedraft-public-v0",
      utm_content: "variant-a",
      ad_click_id: "click-123-secret",
      marketing_consent: true,
    });

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) {
      return;
    }

    const prompt = buildRewritePrompt(parsed.value);

    expect(prompt).not.toContain("secret.lead@example.com");
    expect(prompt).not.toContain("linkedin-ads");
    expect(prompt).not.toContain("safedraft-public-v0");
    expect(prompt).not.toContain("variant-a");
    expect(prompt).not.toContain("click-123-secret");
    expect(prompt).not.toContain("marketing_consent");
    expect(prompt).not.toContain("privacy_terms_accepted");
  });
});
