import { describe, expect, it } from "vitest";
import {
  buildGrowthMapManualEmail,
  buildCloudCsoGrowthMapPayload,
  GROWTH_MAP_TEXT_LIMITS,
  parseGrowthMapSubmission,
  requiresAfterHoursCallHandling,
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

describe("Growth Map lead magnet contract V11", () => {
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

  it.each([
    ["name", GROWTH_MAP_TEXT_LIMITS.name + 1],
    ["email", GROWTH_MAP_TEXT_LIMITS.email + 1],
    ["company", GROWTH_MAP_TEXT_LIMITS.company + 1],
    ["website", GROWTH_MAP_TEXT_LIMITS.website + 1],
    ["industry", GROWTH_MAP_TEXT_LIMITS.industry + 1],
    ["currentSystems", GROWTH_MAP_TEXT_LIMITS.currentSystems + 1],
    ["bottleneck", GROWTH_MAP_TEXT_LIMITS.bottleneck + 1],
    ["notes", GROWTH_MAP_TEXT_LIMITS.notes + 1],
  ])("rejects an overlong %s value", (field, length) => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      [field]: "x".repeat(length),
    });

    if (result.ok) {
      throw new Error(`Expected overlong ${field} to be rejected`);
    }

    expect(result.fieldErrors[field]).toContain("maksymalnie");
  });

  it.each([
    ["telefon", "Telefony po zamknięciu recepcji często nie mają obsługi."],
    ["połączenie", "Każde połączenie po zamknięciu recepcji może przepaść."],
    ["dzwonienie", "Dzwonienie po zamknięciu recepcji nie ma jasnej obsługi."],
  ])("requires after-hours call handling for a bottleneck containing %s", (_keyword, bottleneck) => {
    expect(requiresAfterHoursCallHandling(bottleneck)).toBe(true);

    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      bottleneck,
      afterHoursCallHandling: "",
    });

    if (result.ok) {
      throw new Error("Expected missing after-hours call handling to be rejected");
    }

    expect(result.fieldErrors.afterHoursCallHandling).toContain("poza godzinami pracy");
  });

  it.each(["not_applicable", "owner_answers", 123])(
    "rejects unsupported after-hours call handling %s for a telephone bottleneck",
    (afterHoursCallHandling) => {
      const result = parseGrowthMapSubmission({
        ...baseSubmission,
        bottleneck: "Telefony po zamknięciu recepcji często nie mają obsługi.",
        afterHoursCallHandling,
      });

      if (result.ok) {
        throw new Error("Expected unsupported after-hours call handling to be rejected");
      }

      expect(result.fieldErrors.afterHoursCallHandling).toBeTruthy();
    },
  );

  it.each([
    "answered_by_owner_or_team",
    "mostly_missed",
    "mixed",
    "unknown",
  ])("accepts %s for a telephone bottleneck", (afterHoursCallHandling) => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      bottleneck: "Telefony po zamknięciu recepcji często nie mają obsługi.",
      afterHoursCallHandling,
    });

    if (!result.ok) {
      throw new Error(`Expected ${afterHoursCallHandling} to be valid`);
    }

    expect(result.value.afterHoursCallHandling).toBe(afterHoursCallHandling);
  });

  it("sets after-hours call handling to not_applicable for a non-telephone bottleneck", () => {
    const result = parseGrowthMapSubmission({
      ...baseSubmission,
      afterHoursCallHandling: "mostly_missed",
    });

    if (!result.ok) {
      throw new Error("Expected a non-telephone bottleneck to be valid");
    }

    expect(result.value.afterHoursCallHandling).toBe("not_applicable");
  });

  it("builds the V11 payload expected by the automation layer", () => {
    const parsed = parseGrowthMapSubmission({
      ...baseSubmission,
      productMode: "custom_agentic_workflow",
      priority: "custom_project",
      bottleneck: "Telefony po zamknięciu recepcji często nie mają obsługi.",
      afterHoursCallHandling: "mostly_missed",
    });

    if (!parsed.ok) {
      throw new Error("Expected submission to be valid");
    }

    const payload = buildCloudCsoGrowthMapPayload(parsed.value, "req-123", "2026-07-12T10:00:00.000Z");

    expect(payload.version).toBe("2026-07-12-v11");
    expect(payload.recordType).toBe("cloudcso_lead_magnet_request");
    expect(payload.request.productMode).toBe("not_sure");
    expect(payload.request.currentSystems).toEqual([
      "ClickUp",
      "Google Sheets",
      "ChatGPT",
      "Google Docs",
      "Asana",
    ]);
    expect(payload.request.afterHoursCallHandling).toBe("mostly_missed");
    expect(payload.request.weeklyProcessVolume).toBe(125);
    expect(payload.request.minutesPerOccurrence).toBe(12);
    expect(payload.delivery.expectedDocument).toBe("branded_pdf");
    expect(payload.delivery.cta).toBe("cal_com_button_inside_pdf");
  });

  it("builds a bounded manual email fallback from a validated submission", () => {
    const parsed = parseGrowthMapSubmission({
      ...baseSubmission,
      priority: "systemise_content",
    });

    if (!parsed.ok) {
      throw new Error("Expected submission to be valid");
    }

    const email = buildGrowthMapManualEmail(parsed.value);

    expect(email.subject).toBe("Mapa pierwszego procesu AI: Example SA");
    expect(email.body).toContain("Adres kontaktowy: bartek@example.com");
    expect(email.body).toContain("Priorytet: Uporządkować tworzenie treści");
    expect(email.body).toContain("Systemy: ClickUp, Google Sheets, ChatGPT, Google Docs, Asana");
    expect(email.body).toContain("Skala tygodniowa: 125");
    expect(email.body).toContain("Czas jednego przypadku: 12 min");
    expect(email.body).not.toContain("undefined");
  });
});
