create table if not exists public.safedraft_leads (
  submission_id text primary key,
  created_at timestamptz not null,
  email text not null,
  email_domain text not null,
  email_hash text not null,
  privacy_terms_accepted boolean not null,
  processing_consent_accepted boolean not null,
  marketing_consent boolean not null default false,
  consent_version text not null,
  consent_timestamp timestamptz not null,
  utm_source text,
  utm_campaign text,
  utm_content text,
  ad_click_id_hash text,
  channel text not null,
  tone text not null,
  input_sha256 text not null,
  input_length integer not null,
  output_sha256 text not null,
  output_length integer not null,
  provider text not null,
  model_id text not null,
  estimated_cost_usd numeric(10, 6) not null default 0,
  public_status text not null,
  internal_status text not null,
  inserted_at timestamptz not null default now(),
  constraint safedraft_leads_email_lowercase check (email = lower(email)),
  constraint safedraft_leads_input_length_non_negative check (input_length >= 0),
  constraint safedraft_leads_output_length_non_negative check (output_length >= 0),
  constraint safedraft_leads_estimated_cost_non_negative check (estimated_cost_usd >= 0)
);

create index if not exists safedraft_leads_created_at_idx on public.safedraft_leads (created_at desc);
create index if not exists safedraft_leads_email_idx on public.safedraft_leads (email);
create index if not exists safedraft_leads_email_domain_idx on public.safedraft_leads (email_domain);
create index if not exists safedraft_leads_marketing_consent_idx on public.safedraft_leads (marketing_consent);

alter table public.safedraft_leads enable row level security;

comment on table public.safedraft_leads is
  'SafeDraft public v0 lead capture. Stores email and consent state, but no raw draft text, rewritten output, IP, or user-agent.';
