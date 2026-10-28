-- Execute in Supabase SQL Editor before deploying the chat route.
create table if not exists public.web_chat_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  notified_at timestamptz,
  customer_name text,
  company_name text,
  phone text not null,
  description text,
  category text not null check (category in ('sales','support')),
  destination text not null,
  status text not null default 'pending' check (status in ('pending','accepted','failed')),
  transcript jsonb not null default '[]'::jsonb
);
create index if not exists web_chat_requests_status_created_idx on public.web_chat_requests (status, created_at desc);
create index if not exists web_chat_requests_phone_created_idx on public.web_chat_requests (phone, created_at desc);
alter table public.web_chat_requests enable row level security;
-- Deliberately no anon/authenticated policies. Use the server-side service-role
-- Supabase client in the API; do not expose the service key to the browser.
