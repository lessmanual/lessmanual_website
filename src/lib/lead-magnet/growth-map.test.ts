import { describe, expect, it } from "vitest";
import {
  buildCloudCsoGrowthMapPayload,
  parseGrowthMapSubmission,
} from "./growth-map";

const baseSubmission = {
  name: "Bartek",
  email: "bartek@example.com",
  company: "Example SA",
  website: "example.com",
  industry: "Usługi B2B",
  currentSystems: "ClickUp, Google Sheets, ChatGPT, Google Docs, Asana",
  productMode: "not_sure",
  priority: "relieve_team_now",
  bottleneck: "Zespół nie ma czasu na nowych klientów i obsługę zapytań.",
  weeklyProcessVolume: 125,
  minutesPerOccurrence: 12,
  notes: "Chcemy sprawdzić pierwszy proces.",
  privacyConsent: true,
  researchConsent: true,
};

describe("Growth Map lead magnet contract V10", () => {
  it("fixes product mode to not_sure instead of trusting a public selection", () => {
    for (const submission of [
      { ...baseSubmission, productMode: undefined },
      { ...baseSubmission, productMode: "customer_operations_ai" },
    ]) {
      const result = parseGrowthMapSubmission(submission);

      if (!result.ok) {
        throw new Error("Expected product mode to be set internally");
      }

      expect(result.value.productMode).toBe("not_sure");
    }
  });

  it("normalises the company website before passing it to CloudCSO", () => {
    const result = parseGrowthMapSubmission(baseSubmission);

    if (!result.ok) {
      throw new Error("Expected base submission to be valid");
    }

    expect(result.value.website).toBe("https://example.com/");
  });

  it("requires consent for email contact and checking public company sources", () => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      privacyConsent: false,
      researchConsent: false,
    });

    if (result.ok) {
      throw new Error("Expected missing consents to be rejected");
    }

    expect(result.fieldErrors.privacyConsent).toContain("zgodę");
    expect(result.fieldErrors.researchConsent).toContain("publicznych źródeł");
  });

  it("requires the systems currently used by the company", () => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      currentSystems: "",
    });

    if (result.ok) {
      throw new Error("Expected missing systems to be rejected");
    }

    expect(result.fieldErrors.currentSystems).toContain("systemy");
  });

  it.each([
    ["weeklyProcessVolume", 0],
    ["weeklyProcessVolume", -1],
    ["weeklyProcessVolume", 1.5],
    ["weeklyProcessVolume", 1_000_001],
    ["minutesPerOccurrence", 0],
    ["minutesPerOccurrence", -1],
    ["minutesPerOccurrence", 1.5],
    ["minutesPerOccurrence", 1_441],
  ])("rejects an invalid numeric baseline for %s", (field, value) => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      [field]: value,
    });

    if (result.ok) {
      throw new Error(`Expected ${field}=${value} to be rejected`);
    }

    expect(result.fieldErrors[field]).toBeTruthy();
  });

  it("accepts positive integer baseline values at their upper bounds", () => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      weeklyProcessVolume: 1_000_000,
      minutesPerOccurrence: 1_440,
    });

    if (!result.ok) {
      throw new Error("Expected bounded integer baseline values to be valid");
    }

    expect(result.value.weeklyProcessVolume).toBe(1_000_000);
    expect(result.value.minutesPerOccurrence).toBe(1_440);
  });

  it("rejects secrets and sensitive values in free text", () => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      notes: "Nasz token API to abc123.",
    });

    if (result.ok) {
      throw new Error("Expected sensitive notes to be rejected");
    }

    expect(result.fieldErrors.notes).toContain("haseł");
  });

  it("builds the V10 payload expected by the automation layer", () => {
    const parsed = parseGrowthMapSubmission({
      ...baseSubmission,
      productMode: "custom_agentic_workflow",
      priority: "custom_project",
    });

    if (!parsed.ok) {
      throw new Error("Expected submission to be valid");
    }

    const payload = buildCloudCsoGrowthMapPayload(parsed.value, "req-123", "2026-07-10T10:00:00.000Z");

    expect(payload.version).toBe("2026-07-10-v10");
    expect(payload.recordType).toBe("cloudcso_lead_magnet_request");
    expect(payload.request.productMode).toBe("not_sure");
    expect(payload.request.currentSystems).toEqual([
      "ClickUp",
      "Google Sheets",
      "ChatGPT",
      "Google Docs",
      "Asana",
    ]);
    expect(payload.request.weeklyProcessVolume).toBe(125);
    expect(payload.request.minutesPerOccurrence).toBe(12);
    expect(payload.delivery.expectedDocument).toBe("branded_pdf");
    expect(payload.delivery.cta).toBe("cal_com_button_inside_pdf");
  });
});
