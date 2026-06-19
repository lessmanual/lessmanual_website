import type { SafeDraftSubmission } from "./input-schema";
import type { SafeDraftMetadataRecord } from "./metadata-record";

export type SafeDraftLeadCaptureRecord = {
  submission_id: string;
  created_at: string;
  email: string;
  email_domain: string;
  email_hash: string;
  privacy_terms_accepted: true;
  processing_consent_accepted: true;
  marketing_consent: boolean;
  consent_version: string;
  consent_timestamp: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_content?: string;
  ad_click_id_hash: string | null;
  channel: SafeDraftSubmission["channel"];
  tone: SafeDraftSubmission["tone"];
  input_sha256: string;
  input_length: number;
  output_sha256: string;
  output_length: number;
  provider: string;
  model_id: string;
  estimated_cost_usd: number;
  public_status: SafeDraftMetadataRecord["public_status"];
  internal_status: SafeDraftMetadataRecord["internal_status"];
};

export type SafeDraftLeadCapturePort = {
  save(record: SafeDraftLeadCaptureRecord): Promise<void>;
};

export function buildSafeDraftLeadCaptureRecord(input: {
  submission: SafeDraftSubmission;
  metadataRecord: SafeDraftMetadataRecord;
}): SafeDraftLeadCaptureRecord {
  return {
    submission_id: input.metadataRecord.submission_id,
    created_at: input.metadataRecord.created_at,
    email: input.submission.email.trim().toLowerCase(),
    email_domain: input.metadataRecord.email_domain,
    email_hash: input.metadataRecord.email_hash,
    privacy_terms_accepted: input.submission.privacy_terms_accepted,
    processing_consent_accepted: input.submission.processing_consent_accepted,
    marketing_consent: input.submission.marketing_consent,
    consent_version: input.submission.consent_version,
    consent_timestamp: input.metadataRecord.consent_timestamp,
    utm_source: input.submission.utm_source,
    utm_campaign: input.submission.utm_campaign,
    utm_content: input.submission.utm_content,
    ad_click_id_hash: input.metadataRecord.ad_click_id_hash,
    channel: input.submission.channel,
    tone: input.submission.tone,
    input_sha256: input.metadataRecord.input_sha256,
    input_length: input.metadataRecord.input_length,
    output_sha256: input.metadataRecord.output_sha256,
    output_length: input.metadataRecord.output_length,
    provider: input.metadataRecord.provider,
    model_id: input.metadataRecord.model_id,
    estimated_cost_usd: input.metadataRecord.estimated_cost_usd,
    public_status: input.metadataRecord.public_status,
    internal_status: input.metadataRecord.internal_status,
  };
}
