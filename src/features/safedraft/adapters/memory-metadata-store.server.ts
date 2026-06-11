import "server-only";

import type { SafeDraftMetadataRecord } from "../core/metadata-record";
import type { SafeDraftMetadataStorePort } from "../core/metadata-store-port";

export type SafeDraftMemoryMetadataStore = SafeDraftMetadataStorePort & {
  records(): SafeDraftMetadataRecord[];
  clear(): void;
};

export function createMemorySafeDraftMetadataStore(
  initialRecords: SafeDraftMetadataRecord[] = []
): SafeDraftMemoryMetadataStore {
  const savedRecords = initialRecords.map(copyMetadataRecord);

  return {
    async save(record) {
      savedRecords.push(copyMetadataRecord(record));
    },
    records() {
      return savedRecords.map(copyMetadataRecord);
    },
    clear() {
      savedRecords.splice(0, savedRecords.length);
    },
  };
}

function copyMetadataRecord(record: SafeDraftMetadataRecord): SafeDraftMetadataRecord {
  const metadataOnlyRecord: SafeDraftMetadataRecord = {
    submission_id: record.submission_id,
    created_at: record.created_at,
    email_hash: record.email_hash,
    email_domain: record.email_domain,
    privacy_terms_accepted: record.privacy_terms_accepted,
    processing_consent_accepted: record.processing_consent_accepted,
    marketing_consent: record.marketing_consent,
    consent_version: record.consent_version,
    consent_timestamp: record.consent_timestamp,
    ip_hash: record.ip_hash,
    user_agent_hash: record.user_agent_hash,
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
    latency_ms: record.latency_ms,
    estimated_cost_usd: record.estimated_cost_usd,
    public_status: record.public_status,
    internal_status: record.internal_status,
    risk_count: record.risk_count,
    removed_ai_tells_count: record.removed_ai_tells_count,
  };

  return metadataOnlyRecord;
}
