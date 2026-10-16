"use client";

import { useState, type FormEvent } from "react";

export type KnowledgeSourceDraft = {
  title: string;
  source_type: "official_url" | "manual" | "internal" | "faq";
  url: string;
  product: string;
  version: string;
  reviewed_at: string;
};

const EMPTY: KnowledgeSourceDraft = {
  title: "", source_type: "official_url", url: "", product: "",
  version: "", reviewed_at: "",
};

type Props = {
  initialValue?: Partial<KnowledgeSourceDraft>;
  onSave: (source: KnowledgeSourceDraft) => Promise<{ ok: boolean; errors?: string[] }>;
};

/** Formulario visual. La autenticación y la autorización deben verificarse en el servidor. */
export default function KnowledgeSourceEditor({ initialValue, onSave }: Props) {
  const [form, setForm] = useState<KnowledgeSourceDraft>({ ...EMPTY, ...initialValue });
  const [errors, setErrors] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  function update<K extends keyof KnowledgeSourceDraft>(field: K, value: KnowledgeSourceDraft[K]) {
    setForm(previous => ({ ...previous, [field]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSuccess(false);
    setErrors([]);
    if (form.source_type === "official_url" && !form.url.trim()) {
      setErrors(["Una fuente oficial requiere un enlace HTTPS."]);
      return;
    }
    setSaving(true);
    try {
      const result = await onSave(form);
      if (result.ok) setSuccess(true);
      else setErrors(result.errors?.length ? result.errors : ["No se pudo guardar la fuente."]);
    } catch {
      setErrors(["Ocurrió un error al guardar la fuente."]);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 text-slate-900">
      <h2 className="text-xl font-semibold">Conocimientos IA · Fuente</h2>
      <label className="block text-sm font-medium">Título
        <input required minLength={5} maxLength={180} value={form.title}
          onChange={e => update("title", e.target.value)}
          className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block text-sm font-medium">Tipo de fuente
        <select value={form.source_type}
          onChange={e => update("source_type", e.target.value as KnowledgeSourceDraft["source_type"])}
          className="mt-1 w-full rounded border p-2">
          <option value="official_url">Sitio oficial</option>
          <option value="manual">Manual</option>
          <option value="internal">Documentación interna</option>
          <option value="faq">Preguntas frecuentes</option>
        </select>
      </label>
      <label className="block text-sm font-medium">URL de referencia (HTTPS)
        <input type="url" pattern="https://.*" required={form.source_type === "official_url"}
          value={form.url} onChange={e => update("url", e.target.value)}
          className="mt-1 w-full rounded border p-2" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium">Producto
          <input maxLength={120} value={form.product}
            onChange={e => update("product", e.target.value)}
            className="mt-1 w-full rounded border p-2" />
        </label>
        <label className="block text-sm font-medium">Versión
          <input maxLength={120} value={form.version}
            onChange={e => update("version", e.target.value)}
            className="mt-1 w-full rounded border p-2" />
        </label>
      </div>
      <label className="block text-sm font-medium">Fecha de revisión
        <input type="date" value={form.reviewed_at.slice(0, 10)}
          max={new Date().toISOString().slice(0, 10)}
          onChange={e => update("reviewed_at", e.target.value)}
          className="mt-1 w-full rounded border p-2" />
      </label>
      <p className="text-sm text-slate-600">Solo una fuente revisada puede respaldar un artículo publicado.</p>
      {errors.length > 0 && <div role="alert" className="rounded bg-red-50 p-3 text-sm text-red-800">
        {errors.map(error => <p key={error}>{error}</p>)}
      </div>}
      {success && <p role="status" className="text-sm text-green-700">Fuente guardada.</p>}
      <button type="submit" disabled={saving}
        className="rounded bg-blue-700 px-5 py-2 font-medium text-white disabled:opacity-50">
        {saving ? "Guardando…" : "Guardar fuente"}
      </button>
    </form>
  );
}
