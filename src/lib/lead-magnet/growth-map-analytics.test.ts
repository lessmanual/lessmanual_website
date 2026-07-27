import { describe, expect, it } from "vitest";
import { buildGrowthMapAnalyticsEvent } from "@/lib/lead-magnet/growth-map-analytics";

describe("Growth Map analytics events", () => {
  it("describes the manual funnel without copying form values or URL data into custom parameters", () => {
    const events = [
      buildGrowthMapAnalyticsEvent("form_started", "manual_email"),
      buildGrowthMapAnalyticsEvent("validation_failed", "manual_email", {
        stepNumber: 1,
        errorCount: 3,
      }),
      buildGrowthMapAnalyticsEvent("step_completed", "manual_email", {
        stepNumber: 1,
      }),
      buildGrowthMapAnalyticsEvent("submission_prepared", "manual_email"),
      buildGrowthMapAnalyticsEvent("email_draft_link_clicked", "manual_email"),
    ];

    expect(events).toEqual([
      {
        name: "growth_map_form_started",
        params: {
          delivery_mode: "manual_email",
          form_name: "ai_growth_opportunity_map",
        },
      },
      {
        name: "growth_map_validation_failed",
        params: {
          delivery_mode: "manual_email",
          error_count: 3,
          form_name: "ai_growth_opportunity_map",
          step_number: 1,
        },
      },
      {
        name: "growth_map_step_completed",
        params: {
          delivery_mode: "manual_email",
          form_name: "ai_growth_opportunity_map",
          step_number: 1,
        },
      },
      {
        name: "growth_map_submission_prepared",
        params: {
          delivery_mode: "manual_email",
          form_name: "ai_growth_opportunity_map",
        },
      },
      {
        name: "growth_map_email_draft_link_clicked",
        params: {
          delivery_mode: "manual_email",
          form_name: "ai_growth_opportunity_map",
        },
      },
    ]);

    const serializedParams = JSON.stringify(events.map((event) => event.params));
    for (const forbiddenKey of [
      "name",
      "email",
      "company",
      "website",
      "industry",
      "bottleneck",
      "notes",
      "utm_",
      "page_location",
    ]) {
      expect(serializedParams).not.toContain(`"${forbiddenKey}"`);
    }
  });

  it("reports CloudCSO outcomes without response bodies or user input", () => {
    expect(buildGrowthMapAnalyticsEvent("submission_accepted", "cloudcso")).toEqual({
      name: "growth_map_submission_accepted",
      params: {
        delivery_mode: "cloudcso",
        form_name: "ai_growth_opportunity_map",
      },
    });
    expect(buildGrowthMapAnalyticsEvent("submission_failed", "cloudcso")).toEqual({
      name: "growth_map_submission_failed",
      params: {
        delivery_mode: "cloudcso",
        form_name: "ai_growth_opportunity_map",
      },
    });
  });
});
