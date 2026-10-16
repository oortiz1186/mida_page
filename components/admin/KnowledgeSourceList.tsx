"use client";

import { useState } from "react";

export type KnowledgeSourceRow = {
  id: string;
  title: string;
  source_type: "official_url" | "manual" | "internal" | "faq";
  url: string | null;
  product: string | null;
  version: string | null;
  reviewed_at: string | null;
};

type Props = {
  sources: KnowledgeSourceRow[];
  onNew: () => void;
  onEdit: (id: string) => void;
};

const SOURCE_TYPES: Record<KnowledgeSourceRow["source_type"], string> = {
  official_url: "Sitio oficial",
  manual: "Manual",
  internal: "Documentación interna",
  faq: "Preguntas frecuentes",
};

/** UI only. Authentication and data access are the responsibility of its server-side parent. */
export default function KnowledgeSourceList({ sources, onNew, onEdit }: Props) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all");
  const filtered = sources.filter(source => {
    if (type !== "all" && source.source_type !== type) return false;
    return `${source.title} ${source.product ?? ""} ${source.version ?? ""}`
      .toLowerCase().includes(search.trim().toLowerCase());
  });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Conocimientos IA · Fuentes</h2>
        <button type="button" onClick={onNew} className="rounded bg-blue-700 px-4 py-2 text-white">
          Nueva fuente
        </button>
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">Buscar fuente
          <input type="search" value={search} onChange={event => setSearch(event.target.value)}
            className="mt-1 w-full rounded border p-2" placeholder="Título, producto o versión" />
        </label>
        <label className="text-sm">Tipo
          <select value={type} onChange={event => setType(event.target.value)}
            className="mt-1 w-full rounded border p-2">
            <option value="all">Todos</option>
            {Object.entries(SOURCE_TYPES).map(([key, label]) =>
              <option key={key} value={key}>{label}</option>)}
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead><tr className="border-b">
            <th className="p-2">Fuente</th><th className="p-2">Producto</th>
            <th className="p-2">Tipo</th><th className="p-2">Revisión</th>
            <th className="p-2">Acciones</th>
          </tr></thead>
          <tbody>{filtered.map(source => <tr key={source.id} className="border-b">
            <td className="p-2">
              {source.url?.startsWith("https://")
                ? <a href={source.url} target="_blank" rel="noopener noreferrer"
                    className="text-blue-700 underline">{source.title}</a>
                : source.title}
            </td>
            <td className="p-2">{source.product ?? "—"}</td>
            <td className="p-2">{SOURCE_TYPES[source.source_type]}</td>
            <td className="p-2">{source.reviewed_at?.slice(0, 10) ?? "Sin revisar"}</td>
            <td className="p-2">
              <button type="button" onClick={() => onEdit(source.id)}
                className="text-blue-700 underline">Editar</button>
            </td>
          </tr>)}</tbody>
        </table>
        {filtered.length === 0 &&
          <p className="p-5 text-center text-sm text-slate-600">No hay fuentes con estos filtros.</p>}
      </div>
    </section>
  );
}
