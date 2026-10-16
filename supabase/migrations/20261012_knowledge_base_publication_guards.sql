-- Migration 2: additional database-side publication safeguards.
-- Run only after 20261012_knowledge_base_phase1.sql in a test environment.
-- No production deployment is performed by adding this file.

alter table public.knowledge_articles
  add constraint knowledge_published_requires_review
  check (
    status <> 'published'
    or (source_id is not null and reviewed_at is not null)
  );

alter table public.knowledge_articles
  add constraint knowledge_review_not_in_future
  check (reviewed_at is null or reviewed_at <= now());

create or replace function public.knowledge_validate_publication()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = 'published' then
    if not exists (
      select 1 from public.knowledge_sources s
      where s.id = new.source_id
        and s.reviewed_at is not null
    ) then
      raise exception 'Cannot publish without a reviewed knowledge source';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_knowledge_validate_publication on public.knowledge_articles;
create trigger trg_knowledge_validate_publication
before insert or update of status, source_id, reviewed_at
on public.knowledge_articles
for each row execute function public.knowledge_validate_publication();

-- Ensure no role other than privileged backend can invoke the helper directly.
revoke all on function public.knowledge_validate_publication() from public, anon, authenticated;
