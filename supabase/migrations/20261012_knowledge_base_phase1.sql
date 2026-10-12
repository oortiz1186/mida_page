-- MIDA Conocimientos IA - fase 1. No modifica tablas existentes.
create extension if not exists pgcrypto;
create table if not exists public.knowledge_sources (
 id uuid primary key default gen_random_uuid(),
 title text not null,
 source_type text not null check (source_type in ('official_url','manual','internal','faq')),
 url text,
 product text,
 version text,
 reviewed_at timestamptz,
 created_at timestamptz not null default now()
);
create table if not exists public.knowledge_articles (
 id uuid primary key default gen_random_uuid(),
 source_id uuid references public.knowledge_sources(id) on delete set null,
 title text not null,
 slug text not null unique,
 category text not null check (category in ('producto','comparativa','licenciamiento','precio','promocion','faq','soporte')),
 product text,
 product_version text,
 content text not null default '',
 status text not null default 'draft' check (status in ('draft','published','archived')),
 reviewed_at timestamptz,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists idx_knowledge_articles_status_category on public.knowledge_articles(status,category);
create table if not exists public.knowledge_chunks (
 id uuid primary key default gen_random_uuid(),
 article_id uuid not null references public.knowledge_articles(id) on delete cascade,
 chunk_index integer not null check (chunk_index >= 0),
 content text not null,
 created_at timestamptz not null default now(),
 unique(article_id,chunk_index)
);
create table if not exists public.knowledge_search_logs (
 id uuid primary key default gen_random_uuid(),
 query text not null,
 matched_article_ids uuid[] not null default '{}',
 answered boolean not null default false,
 created_at timestamptz not null default now()
);
create table if not exists public.knowledge_feedback (
 id uuid primary key default gen_random_uuid(),
 search_log_id uuid references public.knowledge_search_logs(id) on delete set null,
 helpful boolean not null,
 comment text,
 created_at timestamptz not null default now()
);
-- Deny client-side access by default. Admin access must be via server-side
-- authorization checks, never directly through the browser/service role key.
alter table public.knowledge_sources enable row level security;
alter table public.knowledge_articles enable row level security;
alter table public.knowledge_chunks enable row level security;
alter table public.knowledge_search_logs enable row level security;
alter table public.knowledge_feedback enable row level security;
revoke all on public.knowledge_sources, public.knowledge_articles, public.knowledge_chunks, public.knowledge_search_logs, public.knowledge_feedback from anon, authenticated;
