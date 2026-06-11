import { describe, expect, it } from "vitest";

import { parseSafeDraftSubmission } from "./input-schema";

const validSubmission = {
  draft_text:
    "Cześć, wracam do propozycji automatyzacji follow-upów. Czy temat jest dalej aktualny w tym kwartale?",
  email: "bartek@example.com",
  privacy_terms_accepted: true,
  processing_consent_accepted: true,
  consent_version: "safedraft-public-v0-2026-06-11",
  tone: "direct_founder",
  channel: "follow_up",
};

describe("parseSafeDraftSubmission", () => {
  it("rejects missing email before any model work", () => {
    const result = parseSafeDraftSubmission({
      ...validSubmission,
      email: "",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("email_required");
  });

  it("rejects invalid email", () => {
    const result = parseSafeDraftSubmission({
      ...validSubmission,
      email: "not-an-email",
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("email_invalid");
  });

  it("rejects missing privacy and processing consent separately", () => {
    const result = parseSafeDraftSubmission({
      ...validSubmission,
      privacy_terms_accepted: false,
      processing_consent_accepted: false,
    });

    expect(result.ok).toBe(false);
    expect(result.errors).toContain("privacy_terms_required");
    expect(result.errors).toContain("processing_consent_required");
  });

  it("defaults marketing consent to false and keeps it separate from privacy consent", () => {
    const result = parseSafeDraftSubmission(validSubmission);

    expect(result.ok).toBe(true);
    if (!result.ok) {
      return;
    }
    expect(result.value.marketing_consent).toBe(false);
    expect(result.value.privacy_terms_accepted).toBe(true);
    expect(result.value.processing_consent_accepted).toBe(true);
  });
});
