export type SafeDraftTone = "direct_founder" | "calm_advisor" | "c_level_brief";

export type SafeDraftChannel = "email" | "linkedin_dm" | "follow_up" | "price_objection" | "other";

export type SafeDraftSubmission = {
  draft_text: string;
  email: string;
  privacy_terms_accepted: true;
  processing_consent_accepted: true;
  consent_version: string;
  tone: SafeDraftTone;
  channel: SafeDraftChannel;
  marketing_consent: boolean;
  company_type?: string;
  role?: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  ad_click_id?: string;
};

export type SafeDraftParseResult =
  | {
      ok: true;
      value: SafeDraftSubmission;
      errors: [];
    }
  | {
      ok: false;
      errors: string[];
      value?: undefined;
    };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_DRAFT_LENGTH = 40;
const MAX_DRAFT_LENGTH = 4000;
export function parseSafeDraftSubmission(input: unknown): SafeDraftParseResult {
  if (!isRecord(input)) {
    return { ok: false, errors: ["payload_invalid"] };
  }

  const errors: string[] = [];
  const draftText = readTrimmedString(input, "draft_text");
  const email = readTrimmedString(input, "email");
  const consentVersion = readTrimmedString(input, "consent_version");
  const tone = readTrimmedString(input, "tone");
  const channel = readTrimmedString(input, "channel");
  const privacyTermsAccepted = input.privacy_terms_accepted === true;
  const processingConsentAccepted = input.processing_consent_accepted === true;
  const marketingConsent = input.marketing_consent === true;

  if (!draftText) {
    errors.push("draft_text_required");
  } else if (draftText.length < MIN_DRAFT_LENGTH) {
    errors.push("draft_text_too_short");
  } else if (draftText.length > MAX_DRAFT_LENGTH) {
    errors.push("draft_text_too_long");
  }

  if (!email) {
    errors.push("email_required");
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.push("email_invalid");
  }

  if (!privacyTermsAccepted) {
    errors.push("privacy_terms_required");
  }

  if (!processingConsentAccepted) {
    errors.push("processing_consent_required");
  }

  if (!consentVersion) {
    errors.push("consent_version_required");
  }

  if (!isSafeDraftTone(tone)) {
    errors.push("tone_invalid");
  }

  if (!isSafeDraftChannel(channel)) {
    errors.push("channel_invalid");
  }

  if (errors.length > 0 || !isSafeDraftTone(tone) || !isSafeDraftChannel(channel)) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: [],
    value: {
      draft_text: draftText,
      email,
      privacy_terms_accepted: true,
      processing_consent_accepted: true,
      consent_version: consentVersion,
      tone,
      channel,
      marketing_consent: marketingConsent,
      company_type: optionalString(input, "company_type"),
      role: optionalString(input, "role"),
      utm_source: optionalString(input, "utm_source"),
      utm_campaign: optionalString(input, "utm_campaign"),
      utm_content: optionalString(input, "utm_content"),
      ad_click_id: optionalString(input, "ad_click_id"),
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readTrimmedString(record: Record<string, unknown>, key: string): string {
  const value = record[key];
  return typeof value === "string" ? value.trim() : "";
}

function optionalString(record: Record<string, unknown>, key: string): string | undefined {
  const value = readTrimmedString(record, key);
  return value ? value : undefined;
}

function isSafeDraftTone(value: string): value is SafeDraftTone {
  switch (value) {
    case "direct_founder":
    case "calm_advisor":
    case "c_level_brief":
      return true;
    default:
      return false;
  }
}

function isSafeDraftChannel(value: string): value is SafeDraftChannel {
  switch (value) {
    case "email":
    case "linkedin_dm":
    case "follow_up":
    case "price_objection":
    case "other":
      return true;
    default:
      return false;
  }
}
