import "server-only";

import type { SafeDraftLeadCapturePort, SafeDraftLeadCaptureRecord } from "../core/lead-capture-port";

export type SafeDraftMemoryLeadCapture = SafeDraftLeadCapturePort & {
  records(): SafeDraftLeadCaptureRecord[];
  clear(): void;
};

export function createMemorySafeDraftLeadCapture(
  initialRecords: SafeDraftLeadCaptureRecord[] = []
): SafeDraftMemoryLeadCapture {
  const savedRecords = initialRecords.map(copyLeadCaptureRecord);

  return {
    async save(record) {
      savedRecords.push(copyLeadCaptureRecord(record));
    },
    records() {
      return savedRecords.map(copyLeadCaptureRecord);
    },
    clear() {
      savedRecords.splice(0, savedRecords.length);
    },
  };
}

function copyLeadCaptureRecord(record: SafeDraftLeadCaptureRecord): SafeDraftLeadCaptureRecord {
  return {
    submission_id: record.submission_id,
    created_at: record.created_at,
    email: record.email,
    email_domain: record.email_domain,
    email_hash: record.email_hash,
    privacy_terms_accepted: record.privacy_terms_accepted,
    processing_consent_accepted: record.processing_consent_accepted,
    marketing_consent: record.marketing_consent,
    consent_version: record.consent_version,
    consent_timestamp: record.consent_timestamp,
    utm_source: record.utm_source,
    utm_campaign: record.utm_campaign,
    utm_content: record.utm_content,
    ad_click_id_hash: record.ad_click_id_hash,
    channel: record.channel,
    tone: record.tone,
    input_sha256: record.input_sha256,
    input_length: record.input_length,
    output_sha256: record.output_sha256,
    output_length: record.output_length,
    provider: record.provider,
    model_id: record.model_id,
    estimated_cost_usd: record.estimated_cost_usd,
    public_status: record.public_status,
    internal_status: record.internal_status,
  };
}
