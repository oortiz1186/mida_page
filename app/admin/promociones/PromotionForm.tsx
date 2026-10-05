import Link from "next/link";
import {deletePromotion,savePromotion} from "./actions";
import RichTextEditor from "../blog/RichTextEditor";
import FeaturedImageUpload from "../blog/FeaturedImageUpload";
type P={id:string;title:string;slug:string;summary:string|null;content:string;image_url:string|null;image_alt:string|null;type:string;status:string;start_at:string|null;end_at:string|null;sort_order:number;cta_label:string|null;seo_title:string|null;seo_description:string|null};
export default function PromotionForm({promotion,isAdmin,saved,error}:{promotion?:P;isAdmin:boolean;saved?:boolean;error?:string}){
 return <div className="mx-auto max-w-5xl px-6 py-10">
  <Link href="/admin/promociones" className="text-sm font-semibold text-mida-primary">← Volver a promociones</Link>
  <h1 className="mt-2 text-3xl font-bold text-mida-deep">{promotion?"Editar promoción o aviso":"Nueva promoción o aviso"}</h1>
  {saved&&<p className="mt-5 rounded-xl bg-green-50 p-3 text-green-800">Guardado correctamente.</p>}{error&&<p className="mt-5 rounded-xl bg-red-50 p-3 text-red-700">No fue posible guardar. Revisa los datos.</p>}
  <form action={savePromotion} className="mt-7 space-y-6">{promotion&&<input type="hidden" name="id" value={promotion.id}/>}
   <section className="rounded-2xl border bg-white p-6 shadow-sm"><div className="grid gap-5 md:grid-cols-2">
    <label className="md:col-span-2 text-sm font-semibold">Título<input name="title" required defaultValue={promotion?.title} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <label className="text-sm font-semibold">Slug<input name="slug" defaultValue={promotion?.slug} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <label className="text-sm font-semibold">Tipo<select name="type" defaultValue={promotion?.type??"promotion"} className="mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal"><option value="promotion">Promoción</option><option value="notice">Aviso</option><option value="news">Novedad</option><option value="event">Evento</option></select></label>
    <label className="md:col-span-2 text-sm font-semibold">Resumen<textarea name="summary" rows={3} defaultValue={promotion?.summary??""} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <FeaturedImageUpload initialUrl={promotion?.image_url} initialAlt={promotion?.image_alt}/>
    <div className="md:col-span-2"><p className="text-sm font-semibold">Contenido completo</p><RichTextEditor initialContent={promotion?.content??""}/></div>
   </div></section>
   <section className="rounded-2xl border bg-white p-6 shadow-sm"><div className="grid gap-5 md:grid-cols-2">
    <label className="text-sm font-semibold">Estado<select name="status" defaultValue={promotion?.status??"draft"} className="mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal"><option value="draft">Borrador</option><option value="published">Publicado</option><option value="archived">Archivado</option></select></label>
    <label className="text-sm font-semibold">Orden<input name="sort_order" type="number" defaultValue={promotion?.sort_order??0} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <label className="text-sm font-semibold">Inicio<input name="start_at" type="date" defaultValue={promotion?.start_at?.slice(0,10)??""} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <label className="text-sm font-semibold">Fin<input name="end_at" type="date" defaultValue={promotion?.end_at?.slice(0,10)??""} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <label className="text-sm font-semibold">Texto del botón<input name="cta_label" defaultValue={promotion?.cta_label??"Solicitar información"} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <label className="text-sm font-semibold">Título SEO<input name="seo_title" maxLength={70} defaultValue={promotion?.seo_title??""} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
    <label className="md:col-span-2 text-sm font-semibold">Descripción SEO<textarea name="seo_description" maxLength={170} rows={2} defaultValue={promotion?.seo_description??""} className="mt-2 w-full rounded-xl border px-4 py-3 font-normal"/></label>
   </div></section>
   <div className="flex justify-between"><Link href="/admin/promociones" className="rounded-xl border px-5 py-3 font-semibold">Cancelar</Link><button className="rounded-xl bg-mida-primary px-6 py-3 font-bold text-white">Guardar</button></div>
  </form>
  {promotion&&isAdmin&&<form action={deletePromotion} className="mt-8 border-t pt-5"><input type="hidden" name="id" value={promotion.id}/><button className="text-sm font-semibold text-red-700">Eliminar promoción</button></form>}
 </div>
}