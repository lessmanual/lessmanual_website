export type GrowthMapDeliveryMode = "manual_email" | "cloudcso";

type GrowthMapAnalyticsEventName =
  | "growth_map_validation_failed"
  | "growth_map_form_started"
  | "growth_map_step_completed"
  | "growth_map_submission_prepared"
  | "growth_map_email_draft_link_clicked"
  | "growth_map_submission_accepted"
  | "growth_map_submission_failed";

type GrowthMapAnalyticsEventParams = Record<string, string | number>;

export type GrowthMapAnalyticsEvent = {
  name: GrowthMapAnalyticsEventName;
  params: GrowthMapAnalyticsEventParams;
};

type ValidationDetails = {
  stepNumber: 1 | 2;
  errorCount: number;
};

type StepDetails = {
  stepNumber: 1;
};

type OutcomeEventKind =
  | "form_started"
  | "submission_prepared"
  | "email_draft_link_clicked"
  | "submission_accepted"
  | "submission_failed";

type GrowthMapAnalyticsDetails = {
  stepNumber?: 1 | 2;
  errorCount?: number;
};

const FORM_NAME = "ai_growth_opportunity_map";

export function buildGrowthMapAnalyticsEvent(
  kind: "validation_failed",
  deliveryMode: GrowthMapDeliveryMode,
  details: ValidationDetails,
): GrowthMapAnalyticsEvent;
export function buildGrowthMapAnalyticsEvent(
  kind: "step_completed",
  deliveryMode: GrowthMapDeliveryMode,
  details: StepDetails,
): GrowthMapAnalyticsEvent;
export function buildGrowthMapAnalyticsEvent(
  kind: OutcomeEventKind,
  deliveryMode: GrowthMapDeliveryMode,
): GrowthMapAnalyticsEvent;
export function buildGrowthMapAnalyticsEvent(
  kind: "validation_failed" | "step_completed" | OutcomeEventKind,
  deliveryMode: GrowthMapDeliveryMode,
  details: GrowthMapAnalyticsDetails = {},
): GrowthMapAnalyticsEvent {
  const commonParams = {
    delivery_mode: deliveryMode,
    form_name: FORM_NAME,
  };

  if (kind === "validation_failed") {
    if (details.stepNumber === undefined || details.errorCount === undefined) {
      throw new Error("Growth Map validation analytics require a step number and error count.");
    }

    return {
      name: "growth_map_validation_failed",
      params: {
        ...commonParams,
        error_count: details.errorCount,
        step_number: details.stepNumber,
      },
    };
  }

  if (kind === "step_completed") {
    if (details.stepNumber !== 1) {
      throw new Error("Growth Map step analytics require the completed first step.");
    }

    return {
      name: "growth_map_step_completed",
      params: {
        ...commonParams,
        step_number: details.stepNumber,
      },
    };
  }

  const outcomeEventNames: Record<OutcomeEventKind, GrowthMapAnalyticsEventName> = {
    email_draft_link_clicked: "growth_map_email_draft_link_clicked",
    form_started: "growth_map_form_started",
    submission_accepted: "growth_map_submission_accepted",
    submission_failed: "growth_map_submission_failed",
    submission_prepared: "growth_map_submission_prepared",
  };

  return {
    name: outcomeEventNames[kind],
    params: commonParams,
  };
}
