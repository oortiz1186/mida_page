"use client";
import {useState, type FormEvent} from "react";
import {uploadKnowledgePdf} from "@/app/admin/conocimientos/pdf/actions";
export default function KnowledgePdfUpload() {
 const [busy,setBusy]=useState(false);
 const [message,setMessage]=useState("");
 const [ok,setOk]=useState(false);
 async function submit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault(); if(busy)return;
  setBusy(true);setMessage("");
  try {const result=await uploadKnowledgePdf(new FormData(e.currentTarget));setOk(result.ok);setMessage(result.message);}
  catch {setOk(false);setMessage("No se pudo procesar el PDF.");}
  finally {setBusy(false);}
 }
 return <form onSubmit={submit} className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
  <h2 className="text-xl font-bold">Agregar fuente desde PDF</h2>
  <p className="text-sm text-slate-600">Extraemos el texto y lo guardamos como borrador privado. No se publica automáticamente ni se almacena el archivo original. Máximo 4 MB y 80 páginas.</p>
  <label className="block text-sm font-medium">Título del documento<input required name="title" minLength={5} maxLength={180} className="mt-1 w-full rounded border p-2"/></label>
  <label className="block text-sm font-medium">Producto (opcional)<input name="product" maxLength={120} className="mt-1 w-full rounded border p-2"/></label>
  <label className="block text-sm font-medium">Archivo PDF<input required name="file" type="file" accept=".pdf,application/pdf" className="mt-1 block w-full rounded border p-2"/></label>
  <button type="submit" disabled={busy} className="rounded bg-blue-700 px-5 py-2 font-semibold text-white disabled:opacity-50">{busy?"Procesando PDF…":"Subir y extraer texto"}</button>
  {message && <p role="status" className={ok?"text-green-700":"text-red-700"}>{message}</p>}
 </form>;
}
