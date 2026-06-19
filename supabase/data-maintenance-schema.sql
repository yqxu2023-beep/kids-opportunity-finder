-- Safe, additive schema for the weekly data-maintenance workflow.
-- This script does not change opportunity statuses or existing field values.

begin;

create extension if not exists pgcrypto;

alter table public.opportunities
  add column if not exists last_checked_at timestamptz,
  add column if not exists last_verified_at timestamptz,
  add column if not exists content_hash text,
  add column if not exists review_note text;

create table if not exists public.sources (
  id uuid primary key default gen_random_uuid(),
  provider_name text not null,
  website_url text,
  facebook_url text,
  perfectmind_url text,
  contact_email text,
  source_type text,
  check_frequency text default 'weekly',
  last_checked_at timestamptz,
  active boolean default true,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists sources_provider_name_key
  on public.sources (provider_name);

create index if not exists sources_weekly_active_idx
  on public.sources (check_frequency, active);

create table if not exists public.import_batches (
  id uuid primary key default gen_random_uuid(),
  file_name text,
  imported_at timestamptz default now(),
  total_rows integer default 0,
  inserted_count integer default 0,
  updated_count integer default 0,
  skipped_count integer default 0,
  notes text
);

commit;
