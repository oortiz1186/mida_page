"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
const v=(f:FormData,n:string)=>String(f.get(n)??"").trim();
const slugify=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,160);
async function auth(){
 const supabase=await createClient(); const {data:{user}}=await supabase.auth.getUser(); if(!user) redirect("/admin/login");
 const {data:profile}=await supabase.from("blog_profiles").select("role,is_active").eq("user_id",user.id).maybeSingle();
 if(!profile?.is_active) redirect("/admin/login?error=unauthorized"); return {supabase,user,profile};
}
export async function savePromotion(f:FormData){
 const {supabase,user}=await auth(); const id=v(f,"id"), title=v(f,"title"), slug=slugify(v(f,"slug")||title), status=v(f,"status")||"draft";
 if(!title||!slug||!["draft","published","archived"].includes(status)) redirect(id?`/admin/promociones/${id}?error=invalid`:"/admin/promociones/nueva?error=invalid");
 const related_products=f.getAll("related_products").map(String).filter(Boolean);
 const payload={title,slug,related_products,summary:v(f,"summary")||null,content:v(f,"content"),image_url:v(f,"featured_image_url")||null,image_alt:v(f,"featured_image_alt")||null,type:v(f,"type")||"promotion",status,start_at:v(f,"start_at")||null,end_at:v(f,"end_at")||null,sort_order:Number(v(f,"sort_order")||"0"),cta_label:v(f,"cta_label")||"Solicitar información",seo_title:v(f,"seo_title")||null,seo_description:v(f,"seo_description")||null,updated_at:new Date().toISOString(),created_by:user.id,published_at:status==="published"?new Date().toISOString():null};
 const saved=id||crypto.randomUUID(); const {error}=id?await supabase.from("commercial_notices").update(payload).eq("id",id):await supabase.from("commercial_notices").insert({id:saved,...payload});
 if(error){console.error(error);redirect(id?`/admin/promociones/${id}?error=save`:"/admin/promociones/nueva?error=save");}
 revalidatePath("/");related_products.forEach((p)=>revalidatePath(`/${p}`));revalidatePath("/promociones");revalidatePath("/admin");revalidatePath("/admin/promociones");revalidatePath(`/promociones/${slug}`);
 redirect(`/admin/promociones/${saved}?saved=1`);
}
export async function deletePromotion(f:FormData){
 const {supabase,profile}=await auth(); if(profile.role!=="admin") redirect("/admin/promociones?error=forbidden");
 const id=v(f,"id"); if(id) await supabase.from("commercial_notices").delete().eq("id",id);
 revalidatePath("/");revalidatePath("/promociones");revalidatePath("/admin/promociones");redirect("/admin/promociones?deleted=1");
}