import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { saveSuccessStory } from "../actions";
export default async function EditStory({params}: {params:Promise<{id:string}>}) {
 const {id}=await params;
 const client=await createClient();
 const {data:{user}}=await client.auth.getUser();
 if(!user)redirect("/admin/login");
 const {data:profile}=await client.from("blog_profiles").select("role,is_active").eq("user_id",user.id).maybeSingle();
 if(!profile?.is_active||profile.role!=="admin")redirect("/admin?error=forbidden");
 const {data:s}=await client.from("mida_success_stories").select("*").eq("id",id).maybeSingle();
 if(!s)notFound();
 const input="w-full rounded-xl border border-slate-300 px-4 py-3";
 return <main className="min-h-screen bg-slate-50 px-6 py-10"><div className="mx-auto max-w-4xl">
 <Link href="/admin/casos-de-exito" className="font-semibold text-mida-primary">← Casos de éxito</Link>
 <h1 className="mt-4 text-3xl font-black text-mida-deep">Editar caso</h1>
 <form action={saveSuccessStory} className="mt-8 grid gap-4 rounded-2xl border bg-white p-7 md:grid-cols-2">
 <input type="hidden" name="id" value={s.id}/>
 <label>Título *<input name="title" required defaultValue={s.title} className={input}/></label>
 <label>Slug<input name="slug" defaultValue={s.slug} className={input}/></label>
 <label>Cliente<input name="client_name" defaultValue={s.client_name??""} className={input}/></label>
 <label>Sector<input name="sector" defaultValue={s.sector??""} className={input}/></label>
 <label className="md:col-span-2">URL del logotipo<input name="client_logo_url" type="url" defaultValue={s.client_logo_url??""} className={input}/></label>
 {(["challenge","solution","results","testimonial"] as const).map(key=><label key={key} className="md:col-span-2 capitalize">{({challenge:"Reto",solution:"Solución",results:"Resultados",testimonial:"Testimonio"})[key]}<textarea name={key} defaultValue={s[key]??""} rows={3} className={input}/></label>)}
 <label>Estado<select name="status" defaultValue={s.status} className={input}><option value="draft">Borrador</option><option value="published">Publicado</option><option value="archived">Archivado</option></select></label>
 <label className="flex items-center gap-2"><input name="consent_confirmed" type="checkbox" defaultChecked={s.consent_confirmed}/> Autorización confirmada</label>
 <button className="rounded-xl bg-mida-primary px-6 py-3 font-bold text-white md:col-span-2">Guardar cambios</button>
 </form></div></main>;
}
