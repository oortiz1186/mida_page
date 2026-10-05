import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Panel de Administración | MIDA",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("blog_profiles")
    .select("display_name, role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_active) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  const [{ count: postsCount }, { count: promotionsCount }] = await Promise.all([
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("commercial_notices").select("id", { count: "exact", head: true }),
  ]);

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-black tracking-widest text-mida-primary">MIDA</p>
            <h1 className="text-xl font-bold text-mida-deep">Panel de Administración</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-slate-500 md:inline">Hola, <strong className="text-slate-700">{profile.display_name}</strong></span>
            <form action={signOut}>
              <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cerrar sesión</button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-black text-mida-deep">Administrar contenido</h2>
          <p className="mt-2 text-slate-600">Desde aquí puedes crear y editar artículos del blog y promociones que aparecen en el carrusel de la página principal.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mida-primary">Blog</span>
                  <h3 className="mt-4 text-2xl font-black text-mida-deep">Artículos</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Crea noticias, guías y contenido informativo para el Blog MIDA.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-5 py-3 text-center">
                  <p className="text-3xl font-black text-mida-deep">{postsCount ?? 0}</p>
                  <p className="text-xs text-slate-500">artículos</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 p-7">
              <Link href="/admin/blog/nuevo" className="rounded-xl bg-mida-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-mida-deep">+ Nuevo artículo</Link>
              <Link href="/admin/blog" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Administrar artículos</Link>
            </div>
          </article>

          <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-mida-primary">Página principal</span>
                  <h3 className="mt-4 text-2xl font-black text-mida-deep">Promociones y novedades</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">Administra las promociones del carrusel, sus imágenes, vigencias y páginas de detalle.</p>
                </div>
                <div className="rounded-2xl bg-slate-50 px-5 py-3 text-center">
                  <p className="text-3xl font-black text-mida-deep">{promotionsCount ?? 0}</p>
                  <p className="text-xs text-slate-500">promociones</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 p-7">
              <Link href="/admin/promociones/nueva" className="rounded-xl bg-mida-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-mida-deep">+ Nueva promoción</Link>
              <Link href="/admin/promociones" className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">Administrar promociones</Link>
            </div>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm text-slate-500">
          Sesión activa como <strong className="capitalize text-slate-700">{profile.role}</strong>.
        </div>
      </section>
    </main>
  );
}
