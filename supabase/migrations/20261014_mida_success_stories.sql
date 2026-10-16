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
-- Public visitors may read only authorized published cases.
create policy "Public can read authorized success stories"
on public.mida_success_stories for select
to anon, authenticated
using (status = 'published' and consent_confirmed = true);

-- Active blog administrators can manage all stories, including drafts.
create policy "Active admins can read all success stories"
on public.mida_success_stories for select
to authenticated
using ((select public.is_blog_admin()));

create policy "Active admins can create success stories"
on public.mida_success_stories for insert
to authenticated
with check ((select public.is_blog_admin()));

create policy "Active admins can update success stories"
on public.mida_success_stories for update
to authenticated
using ((select public.is_blog_admin()))
with check ((select public.is_blog_admin()));

-- No delete policy: archived stories remain recoverable.

