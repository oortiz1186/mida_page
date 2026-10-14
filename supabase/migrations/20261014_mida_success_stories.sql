-- Run only after reviewing the existing Supabase production schema and taking a backup.
create table if not exists public.mida_success_stories (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 slug text not null unique,
 client_name text,
 client_logo_url text,
 sector text,
 challenge text,
 solution text,
 results text,
 testimonial text,
 consent_confirmed boolean not null default false,
 status text not null default 'draft' check (status in ('draft','published','archived')),
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists mida_success_stories_status_idx on public.mida_success_stories(status);
alter table public.mida_success_stories enable row level security;
-- No anonymous policies: public reads go through server code with explicit published + consent filter.
