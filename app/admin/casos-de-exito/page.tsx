import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { saveSuccessStory } from "./actions";
export const metadata = { title: "Administrar casos de éxito | MIDA", robots: { index: false, follow: false } };
export default async function SuccessAdmin({ searchParams }: { searchParams: Promise<{ error?: string; saved?: string }> }) {
 const client = await createClient();
 const { data: { user } } = await client.auth.getUser();
 if (!user) redirect("/admin/login");
 const { data: profile } = await client.from("blog_profiles").select("role,is_active").eq("user_id",user.id).maybeSingle();
 if (!profile?.is_active || profile.role !== "admin") redirect("/admin?error=forbidden");
 const { data: stories, error } = await client.from("mida_success_stories").select("*").order("updated_at",{ascending:false});
 const params = await searchParams;
 const input = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3";
 return <main className="min-h-screen bg-slate-50 px-6 py-10"><div className="mx-auto max-w-5xl">
 <Link href="/admin" className="text-sm font-bold text-mida-primary">← Panel de administración</Link>
 <h1 className="mt-4 text-3xl font-black text-mida-deep">Casos de éxito</h1>
 <p className="mt-2 text-slate-600">Guarda borradores y publica únicamente casos documentados con autorización del cliente. No se publicará información de borradores.</p>
 {params.saved && <p className="mt-4 text-green-700">Caso guardado correctamente.</p>}
 {params.error && <p className="mt-4 text-red-700">No se pudo guardar. Para publicar necesitas autorización, cliente, reto, solución y resultados.</p>}
 {error && <p className="mt-4 text-amber-800">La tabla de casos de éxito aún no está disponible. Revisa la migración SQL antes de guardar.</p>}
 <form action={saveSuccessStory} className="mt-8 grid gap-4 rounded-2xl border bg-white p-7 md:grid-cols-2">
 <h2 className="text-xl font-bold text-mida-deep md:col-span-2">Nuevo caso</h2>
 <label className="text-sm font-semibold">Título *<input name="title" required maxLength={180} className={input}/></label>
 <label className="text-sm font-semibold">Slug (opcional)<input name="slug" maxLength={120} className={input}/></label>
 <label className="text-sm font-semibold">Cliente<input name="client_name" maxLength={180} className={input}/></label>
 <label className="text-sm font-semibold">Sector<input name="sector" maxLength={120} className={input}/></label>
 <label className="text-sm font-semibold md:col-span-2">URL del logotipo autorizado (opcional)<input name="client_logo_url" type="url" className={input}/></label>
 <label className="text-sm font-semibold md:col-span-2">Reto<textarea name="challenge" rows={3} className={input}/></label>
 <label className="text-sm font-semibold md:col-span-2">Solución implementada<textarea name="solution" rows={3} className={input}/></label>
 <label className="text-sm font-semibold md:col-span-2">Resultados verificables<textarea name="results" rows={3} className={input}/></label>
 <label className="text-sm font-semibold md:col-span-2">Testimonio autorizado (opcional)<textarea name="testimonial" rows={3} className={input}/></label>
 <label className="text-sm font-semibold">Estado<select name="status" className={input}><option value="draft">Borrador</option><option value="published">Publicado</option><option value="archived">Archivado</option></select></label>
 <label className="flex items-center gap-2 text-sm font-semibold"><input type="checkbox" name="consent_confirmed"/> Confirmo autorización del cliente para publicar</label>
 <button className="rounded-xl bg-mida-primary px-6 py-3 font-bold text-white md:col-span-2">Guardar caso</button>
 </form>
 <h2 className="mt-10 text-2xl font-bold text-mida-deep">Casos registrados</h2>
 <div className="mt-4 space-y-3">{stories?.length ? stories.map(story=><div key={story.id} className="rounded-xl border bg-white p-5"><div className="font-bold">{story.title}</div><p className="text-sm text-slate-500">{story.client_name || "Cliente pendiente"} · {story.status}</p><Link href={`/admin/casos-de-exito/${story.id}`} className="mt-2 inline-block text-sm font-bold text-mida-primary">Editar caso →</Link></div>) : <p className="text-slate-600">Aún no hay casos registrados.</p>}</div>
 </div></main>;
}
