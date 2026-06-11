import type { SafeDraftChannel, SafeDraftSubmission, SafeDraftTone } from "./input-schema";
import type { SafeDraftInternalStatus, SafeDraftPublicStatus } from "./status";

export type SafeDraftHashText = (value: string) => string;

export type SafeDraftMetadataRecordResult = {
  output_text: string;
  public_status: SafeDraftPublicStatus;
  internal_status: SafeDraftInternalStatus;
  risk_count: number;
  removed_ai_tells_count: number;
};

export type SafeDraftRequestMetadata = {
  submission_id: string;
  created_at: string;
  consent_timestamp: string;
  ip_address?: string;
  user_agent?: string;
};

export type SafeDraftModelMetadata = {
  provider: string;
  model_id: string;
  latency_ms: number;
  estimated_cost_usd: number;
};

export type SafeDraftMetadataRecord = {
  submission_id: string;
  created_at: string;
  email_hash: string;
  email_domain: string;
  privacy_terms_accepted: true;
  processing_consent_accepted: true;
  marketing_consent: boolean;
  consent_version: string;
  consent_timestamp: string;
  ip_hash: string | null;
  user_agent_hash: string | null;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  ad_click_id_hash: string | null;
  channel: SafeDraftChannel;
  tone: SafeDraftTone;
  input_sha256: string;
  input_length: number;
  output_sha256: string;
  output_length: number;
  provider: string;
  model_id: string;
  latency_ms: number;
  estimated_cost_usd: number;
  public_status: SafeDraftPublicStatus;
  internal_status: SafeDraftInternalStatus;
  risk_count: number;
  removed_ai_tells_count: number;
};

export type BuildSafeDraftMetadataRecordInput = {
  submission: SafeDraftSubmission;
  result: SafeDraftMetadataRecordResult;
  request: SafeDraftRequestMetadata;
  model: SafeDraftModelMetadata;
  hashText: SafeDraftHashText;
};

export function buildSafeDraftMetadataRecord(input: BuildSafeDraftMetadataRecordInput): SafeDraftMetadataRecord {
  const normalisedEmail = input.submission.email.trim().toLowerCase();

  return {
    submission_id: input.request.submission_id,
    created_at: input.request.created_at,
    email_hash: input.hashText(normalisedEmail),
    email_domain: emailDomain(normalisedEmail),
    privacy_terms_accepted: input.submission.privacy_terms_accepted,
    processing_consent_accepted: input.submission.processing_consent_accepted,
    marketing_consent: input.submission.marketing_consent,
    consent_version: input.submission.consent_version,
    consent_timestamp: input.request.consent_timestamp,
    ip_hash: optionalHash(input.request.ip_address, input.hashText),
    user_agent_hash: optionalHash(input.request.user_agent, input.hashText),
    utm_source: input.submission.utm_source,
    utm_campaign: input.submission.utm_campaign,
    utm_content: input.submission.utm_content,
    ad_click_id_hash: optionalHash(input.submission.ad_click_id, input.hashText),
    channel: input.submission.channel,
    tone: input.submission.tone,
    input_sha256: input.hashText(input.submission.draft_text),
    input_length: input.submission.draft_text.length,
    output_sha256: input.hashText(input.result.output_text),
    output_length: input.result.output_text.length,
    provider: input.model.provider,
    model_id: input.model.model_id,
    latency_ms: input.model.latency_ms,
    estimated_cost_usd: input.model.estimated_cost_usd,
    public_status: input.result.public_status,
    internal_status: input.result.internal_status,
    risk_count: input.result.risk_count,
    removed_ai_tells_count: input.result.removed_ai_tells_count,
  };
}

function emailDomain(normalisedEmail: string): string {
  const atIndex = normalisedEmail.lastIndexOf("@");
  if (atIndex < 0 || atIndex === normalisedEmail.length - 1) {
    return "";
  }
  return normalisedEmail.slice(atIndex + 1);
}

function optionalHash(value: string | undefined, hashText: SafeDraftHashText): string | null {
  const trimmedValue = value?.trim();
  return trimmedValue ? hashText(trimmedValue) : null;
}
