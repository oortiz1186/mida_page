-- Blog MIDA - esquema inicial
-- Ejecutar en Supabase SQL Editor después de revisar el proyecto correcto.

create extension if not exists pgcrypto;

create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  role text not null default 'editor' check (role in ('admin','editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null default '',
  featured_image_url text,
  featured_image_alt text,
  category_id uuid references public.blog_categories(id) on delete set null,
  author_id uuid references public.blog_profiles(user_id) on delete set null,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  seo_title text,
  seo_description text,
  related_service_slug text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_status_published_at_idx
  on public.blog_posts (status, published_at desc);
create index if not exists blog_posts_category_id_idx
  on public.blog_posts (category_id);

alter table public.blog_categories enable row level security;
alter table public.blog_profiles enable row level security;
alter table public.blog_posts enable row level security;

-- Helpers SECURITY DEFINER: evitan políticas recursivas sobre blog_profiles.
create or replace function public.is_blog_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.blog_profiles
    where user_id = (select auth.uid())
      and is_active
  );
$$;

create or replace function public.is_blog_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.blog_profiles
    where user_id = (select auth.uid())
      and is_active
      and role = 'admin'
  );
$$;

revoke all on function public.is_blog_staff() from public;
revoke all on function public.is_blog_admin() from public;
grant execute on function public.is_blog_staff() to authenticated;
grant execute on function public.is_blog_admin() to authenticated;

-- El script es repetible: elimina únicamente las políticas del Blog que administra.
drop policy if exists "Public can read active blog categories" on public.blog_categories;
drop policy if exists "Authenticated blog staff can read categories" on public.blog_categories;
drop policy if exists "Authenticated blog staff can manage categories" on public.blog_categories;
drop policy if exists "Blog staff can read own profile" on public.blog_profiles;
drop policy if exists "Blog admins can read profiles" on public.blog_profiles;
drop policy if exists "Blog admins can manage profiles" on public.blog_profiles;
drop policy if exists "Public can read published blog posts" on public.blog_posts;
drop policy if exists "Blog staff can read all posts" on public.blog_posts;
drop policy if exists "Blog staff can create posts" on public.blog_posts;
drop policy if exists "Blog staff can update posts" on public.blog_posts;
drop policy if exists "Blog admins can delete posts" on public.blog_posts;

create policy "Public can read active blog categories"
on public.blog_categories for select
using (is_active = true);

create policy "Authenticated blog staff can read categories"
on public.blog_categories for select to authenticated
using ((select public.is_blog_staff()));

create policy "Authenticated blog staff can manage categories"
on public.blog_categories for all to authenticated
using ((select public.is_blog_staff()))
with check ((select public.is_blog_staff()));

create policy "Blog staff can read own profile"
on public.blog_profiles for select to authenticated
using (user_id = (select auth.uid()));

create policy "Blog admins can read profiles"
on public.blog_profiles for select to authenticated
using ((select public.is_blog_admin()));

create policy "Blog admins can manage profiles"
on public.blog_profiles for all to authenticated
using ((select public.is_blog_admin()))
with check ((select public.is_blog_admin()));

create policy "Public can read published blog posts"
on public.blog_posts for select
using (
  status = 'published'
  and published_at is not null
  and published_at <= now()
);

create policy "Blog staff can read all posts"
on public.blog_posts for select to authenticated
using ((select public.is_blog_staff()));

create policy "Blog staff can create posts"
on public.blog_posts for insert to authenticated
with check ((select public.is_blog_staff()));

create policy "Blog staff can update posts"
on public.blog_posts for update to authenticated
using ((select public.is_blog_staff()))
with check ((select public.is_blog_staff()));

create policy "Blog admins can delete posts"
on public.blog_posts for delete to authenticated
using ((select public.is_blog_admin()));

-- Mantiene updated_at automáticamente aunque el cambio no venga desde el formulario.
create or replace function public.set_blog_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists blog_categories_set_updated_at on public.blog_categories;
create trigger blog_categories_set_updated_at
before update on public.blog_categories
for each row execute function public.set_blog_updated_at();

drop trigger if exists blog_profiles_set_updated_at on public.blog_profiles;
create trigger blog_profiles_set_updated_at
before update on public.blog_profiles
for each row execute function public.set_blog_updated_at();

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_blog_updated_at();

insert into public.blog_categories (name, slug, description)
values
  ('CONTPAQi', 'contpaqi', 'Guías, novedades y soluciones relacionadas con CONTPAQi.'),
  ('Facturación', 'facturacion', 'Contenido sobre facturación electrónica y CFDI.'),
  ('Nóminas', 'nominas', 'Guías y recomendaciones para procesos de nómina.'),
  ('SQL Server', 'sql-server', 'Bases de datos, mantenimiento y solución de problemas.'),
  ('Servidores e infraestructura', 'servidores-infraestructura', 'Servidores, redes e infraestructura empresarial.'),
  ('Soporte TI', 'soporte-ti', 'Consejos y soluciones de soporte tecnológico.')
on conflict (slug) do nothing;

-- Storage: el bucket público "blog-images" debe existir.
-- INSERT/UPDATE: personal activo del Blog.
-- DELETE: administradores. La aplicación también elimina imágenes huérfanas cuando el rol lo permite.
