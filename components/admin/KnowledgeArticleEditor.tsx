"use client";

import { useState, type FormEvent } from "react";

export type KnowledgeArticleDraft = {
  title: string;
  slug: string;
  category: "producto" | "comparativa" | "licenciamiento" | "precio" | "promocion" | "faq" | "soporte";
  product: string;
  product_version: string;
  content: string;
  status: "draft" | "published" | "archived";
  source_id: string;
  reviewed_at: string;
};

const EMPTY: KnowledgeArticleDraft = {
  title: "", slug: "", category: "producto", product: "", product_version: "",
  content: "", status: "draft", source_id: "", reviewed_at: "",
};
const CATEGORIES: KnowledgeArticleDraft["category"][] = [
  "producto", "comparativa", "licenciamiento", "precio", "promocion", "faq", "soporte",
];

type Props = {
  initialValue?: Partial<KnowledgeArticleDraft>;
  sources: { id: string; title: string; reviewed_at: string | null }[];
  onSave: (article: KnowledgeArticleDraft) => Promise<{ ok: boolean; errors?: string[] }>;
};

/**
 * Presentation-only editor: no API endpoints, tokens or credentials.
 * Mount only inside the existing authenticated administrator layout.
 * The server must independently re-check session, role and validation.
 */
export default function KnowledgeArticleEditor({ initialValue, sources, onSave }: Props) {
  const [form, setForm] = useState<KnowledgeArticleDraft>({ ...EMPTY, ...initialValue });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const update = <K extends keyof KnowledgeArticleDraft>(key: K, value: KnowledgeArticleDraft[K]) =>
    setForm(previous => ({ ...previous, [key]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setErrors([]);
    setSuccess(false);
    if (form.status === "published" && (!form.source_id || !form.reviewed_at)) {
      setErrors(["Para publicar selecciona una fuente revisada y registra la fecha de revisión."]);
      return;
    }
    setSaving(true);
    try {
      const result = await onSave(form);
      if (result.ok) setSuccess(true);
      else setErrors(result.errors?.length ? result.errors : ["No se pudo guardar."]);
    } catch {
      setErrors(["Ocurrió un error al guardar."]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 text-slate-900">
      <h2 className="text-xl font-semibold">Conocimientos IA · Artículo</h2>
      <label className="block text-sm font-medium">Título
        <input required minLength={5} maxLength={180} value={form.title}
          onChange={e => update("title", e.target.value)}
          className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block text-sm font-medium">Slug
        <input required pattern="[a-z0-9]+(-[a-z0-9]+)*" value={form.slug}
          onChange={e => update("slug", e.target.value)}
          className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block text-sm font-medium">Categoría
        <select value={form.category} onChange={e => update("category", e.target.value as KnowledgeArticleDraft["category"])}
          className="mt-1 w-full rounded border p-2">
          {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">Producto
          <input value={form.product} onChange={e => update("product", e.target.value)} className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm font-medium">Versión
          <input value={form.product_version} onChange={e => update("product_version", e.target.value)} className="mt-1 w-full rounded border p-2" />
        </label>
      </div>
      <label className="block text-sm font-medium">Contenido
        <textarea required minLength={30} maxLength={50000} rows={12} value={form.content}
          onChange={e => update("content", e.target.value)} className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block text-sm font-medium">Fuente revisada
        <select value={form.source_id} onChange={e => update("source_id", e.target.value)}
          className="mt-1 w-full rounded border p-2">
          <option value="">Sin fuente (solo borrador)</option>
          {sources.filter(source => source.reviewed_at).map(source =>
            <option key={source.id} value={source.id}>{source.title}</option>)}
        </select>
      </label>
      <label className="block text-sm font-medium">Fecha de revisión
        <input type="date" value={form.reviewed_at.slice(0, 10)}
          onChange={e => update("reviewed_at", e.target.value)}
          className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block text-sm font-medium">Estado
        <select value={form.status} onChange={e => update("status", e.target.value as KnowledgeArticleDraft["status"])}
          className="mt-1 w-full rounded border p-2">
          <option value="draft">Borrador</option>
          <option value="published">Publicado</option>
          <option value="archived">Archivado</option>
        </select>
      </label>
      {errors.length > 0 && <div role="alert" className="rounded bg-red-50 p-3 text-sm text-red-800">
        {errors.map(error => <p key={error}>{error}</p>)}
      </div>}
      {success && <p role="status" className="text-sm text-green-700">Artículo guardado.</p>}
      <button disabled={saving} type="submit"
        className="rounded bg-blue-700 px-5 py-2 font-medium text-white disabled:opacity-50">
        {saving ? "Guardando…" : "Guardar artículo"}
      </button>
    </form>
  );
}
