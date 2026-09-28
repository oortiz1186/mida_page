import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "./actions";

export const metadata: Metadata = {
  title: "Panel del Blog | MIDA",
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

  const { count: postsCount } = await supabase
    .from("blog_posts")
    .select("id", { count: "exact", head: true });

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-sm font-bold text-mida-primary">MIDA</p>
            <h1 className="text-xl font-bold text-mida-deep">Administración del Blog</h1>
          </div>
          <form action={signOut}>
            <button className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Cerrar sesión</button>
          </form>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-slate-600">Bienvenido, <strong>{profile.display_name}</strong>.</p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Artículos</p>
            <p className="mt-2 text-4xl font-bold text-mida-deep">{postsCount ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Rol</p>
            <p className="mt-2 text-xl font-bold capitalize text-mida-deep">{profile.role}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100">
            <p className="text-sm text-slate-500">Siguiente etapa</p>
            <Link href="/admin/blog" className="mt-2 inline-block font-semibold text-mida-primary hover:underline">Abrir editor de artículos →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
