"use server";
import { revalidatePath } from "next/cache";
import { requireKnowledgeAdmin } from "@/lib/knowledge-admin-auth";
import { supabase } from "@/lib/supabase";

const MAX_PDF_BYTES = 4 * 1024 * 1024;
const MAX_TEXT_CHARS = 45000;
const slug = (value: string) => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-+$/g, "").slice(0, 80);

export async function uploadKnowledgePdf(form: FormData): Promise<{ok:boolean; message:string}> {
  await requireKnowledgeAdmin();
  const file = form.get("file");
  const title = String(form.get("title") ?? "").trim();
  const product = String(form.get("product") ?? "").trim();
  if (!(file instanceof File) || !file.name.toLowerCase().endsWith(".pdf") ||
    (file.type && file.type !== "application/pdf") || file.size === 0 || file.size > MAX_PDF_BYTES)
    return {ok:false,message:"Selecciona un PDF válido de hasta 4 MB."};
  if (title.length < 5 || title.length > 180 || product.length > 120)
    return {ok:false,message:"Revisa el título (5-180 caracteres) y el producto (máximo 120)."};
  const bytes = new Uint8Array(await file.arrayBuffer());
  if (new TextDecoder().decode(bytes.slice(0,5)) !== "%PDF-")
    return {ok:false,message:"El archivo no tiene una cabecera PDF válida."};
  let extracted = "";
  try {
    const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const task = getDocument({data:bytes, useSystemFonts:true, disableFontFace:true, isEvalSupported:false});
    const pdf = await task.promise;
    try {
      if (pdf.numPages > 80) return {ok:false,message:"El PDF supera el máximo de 80 páginas."};
      for (let n=1;n<=pdf.numPages;n++) {
        const page = await pdf.getPage(n);
        const content = await page.getTextContent();
        const text = content.items.map(item => "str" in item ? String(item.str) : "").join(" ");
        extracted += "\n" + text;
        if (extracted.length > MAX_TEXT_CHARS) return {ok:false,message:"El texto supera el máximo de 45,000 caracteres. Divide el PDF."};
      }
    } finally { await pdf.destroy(); }
  } catch {
    return {ok:false,message:"No se pudo leer el PDF. Verifica que no esté cifrado o dañado."};
  }
  extracted = extracted.replace(/\s+/g," ").trim();
  if (extracted.length < 100)
    return {ok:false,message:"El PDF no contiene suficiente texto seleccionable. Los documentos escaneados necesitan OCR."};

  // Only extracted text is stored; original PDF bytes are never uploaded or published.
  const {data:source,error:sourceError} = await supabase.from("knowledge_sources")
    .insert({title,source_type:"manual",url:null,product:product||null,version:null,reviewed_at:null})
    .select("id").single();
  if(sourceError || !source) return {ok:false,message:"No se pudo registrar la fuente PDF."};
  const uniqueSlug = `pdf-${slug(title)||"documento"}-${crypto.randomUUID().slice(0,8)}`;
  const {error:articleError} = await supabase.from("knowledge_articles").insert({
    title,slug:uniqueSlug,category:"faq",product:product||null,product_version:null,
    content:extracted,status:"draft",source_id:source.id,reviewed_at:null,
  });
  if(articleError) {
    await supabase.from("knowledge_sources").delete().eq("id",source.id);
    return {ok:false,message:"No se pudo guardar el texto extraído. No se publicó contenido."};
  }
  revalidatePath("/admin/conocimientos");
  return {ok:true,message:"PDF procesado y guardado como borrador. Revísalo y publícalo desde Artículos IA para que el chatbot pueda utilizarlo."};
}
