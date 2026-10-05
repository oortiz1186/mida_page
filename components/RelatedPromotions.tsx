import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "@/lib/supabase";

type Promotion={id:string;title:string;slug:string;summary:string|null;image_url:string|null;image_alt:string|null;end_at:string|null;cta_label:string|null};

export default async function RelatedPromotions({productSlug}:{productSlug:string}){
 noStore();
 const today=new Date().toISOString().slice(0,10);
 const {data}=await supabase.from("commercial_notices")
  .select("id,title,slug,summary,image_url,image_alt,end_at,cta_label")
  .eq("status","published")
  .contains("related_products",[productSlug])
  .or(`start_at.is.null,start_at.lte.${today}`)
  .or(`end_at.is.null,end_at.gte.${today}`)
  .order("sort_order",{ascending:true})
  .limit(3);
 const items=(data??[]) as Promotion[];
 const single=items.length===1;
 if(!items.length)return null;
 return <section className="border-y border-amber-100 bg-amber-50/60 px-6 py-16">
  <div className="mx-auto max-w-6xl">
   <div className="max-w-3xl"><span className="text-xs font-bold uppercase tracking-widest text-mida-primary">Promoción vigente</span><h2 className="mt-3 text-3xl font-black text-mida-deep">Promociones disponibles para este producto</h2><p className="mt-3 text-gray-600">Consulta las condiciones vigentes y solicita una cotización para validar si aplican a tu empresa.</p></div>
   <div className={single?"mt-8 max-w-4xl":"mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3"}>{items.map((item)=><article key={item.id} className={single?"overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm md:grid md:grid-cols-[minmax(280px,42%)_1fr] md:items-stretch":"overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm"}>
    {item.image_url&&<div className={single?"flex aspect-[16/9] items-center justify-center overflow-hidden bg-white md:aspect-auto md:min-h-72":"flex aspect-[16/9] items-center justify-center overflow-hidden bg-white"}><img src={item.image_url} alt={item.image_alt||item.title} className="h-auto max-h-full w-auto max-w-full object-contain"/></div>}
    <div className="p-6"><h3 className="text-xl font-black text-mida-deep">{item.title}</h3>{item.summary&&<p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">{item.summary}</p>}{item.end_at&&<p className="mt-3 text-xs font-semibold text-gray-500">Vigencia hasta {new Date(item.end_at+"T12:00:00").toLocaleDateString("es-MX",{day:"numeric",month:"long",year:"numeric"})}</p>}<Link href={`/promociones/${item.slug}`} className="mt-5 inline-flex rounded-xl bg-mida-primary px-5 py-3 text-sm font-bold text-white">{item.cta_label||"Ver promoción"}</Link></div>
   </article>)}</div>
  </div>
 </section>
}