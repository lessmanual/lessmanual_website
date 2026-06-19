import "server-only";

import { createClient } from "@supabase/supabase-js";

import type { SafeDraftLeadCapturePort, SafeDraftLeadCaptureRecord } from "../core/lead-capture-port";

const DEFAULT_TABLE_NAME = "safedraft_leads";

export type SupabaseSafeDraftLeadCaptureEnv = {
  [key: string]: string | undefined;
  SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  SAFEDRAFT_LEAD_CAPTURE_TABLE?: string;
};

export type SupabaseSafeDraftLeadCaptureConfig =
  | {
      ok: true;
      port: SafeDraftLeadCapturePort;
    }
  | {
      ok: false;
      error: "supabase_url_missing" | "supabase_service_role_key_missing";
    };

export function createSupabaseSafeDraftLeadCapture(input: {
  supabaseUrl: string;
  serviceRoleKey: string;
  tableName?: string;
}): SafeDraftLeadCapturePort {
  const client = createClient(input.supabaseUrl, input.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  const tableName = input.tableName?.trim() || DEFAULT_TABLE_NAME;

  return {
    async save(record) {
      const { error } = await client.from(tableName).insert(toSupabaseRow(record));
      if (error) {
        throw new Error("safedraft_lead_capture_failed");
      }
    },
  };
}

export function createSupabaseSafeDraftLeadCaptureFromEnv(
  env: SupabaseSafeDraftLeadCaptureEnv = process.env
): SupabaseSafeDraftLeadCaptureConfig {
  const supabaseUrl = env.SUPABASE_URL?.trim() || env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) {
    return { ok: false, error: "supabase_url_missing" };
  }

  const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!serviceRoleKey) {
    return { ok: false, error: "supabase_service_role_key_missing" };
  }

  return {
    ok: true,
    port: createSupabaseSafeDraftLeadCapture({
      supabaseUrl,
      serviceRoleKey,
      tableName: env.SAFEDRAFT_LEAD_CAPTURE_TABLE,
    }),
  };
}

function toSupabaseRow(record: SafeDraftLeadCaptureRecord): Record<string, unknown> {
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
    utm_source: record.utm_source ?? null,
    utm_campaign: record.utm_campaign ?? null,
    utm_content: record.utm_content ?? null,
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
