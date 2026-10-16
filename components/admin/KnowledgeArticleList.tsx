"use client";

import { useState } from "react";

type KnowledgeRow = {
  id: string;
  title: string;
  category: string;
  product: string | null;
  status: "draft" | "published" | "archived";
  reviewed_at: string | null;
  updated_at: string;
};

type Props = {
  articles: KnowledgeRow[];
  onEdit: (id: string) => void;
  onNew: () => void;
};

/** Presentational list; parent must be mounted under authenticated admin. */
export default function KnowledgeArticleList({ articles, onEdit, onNew }: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = articles.filter(article => {
    if (status !== "all" && article.status !== status) return false;
    const haystack = `${article.title} ${article.product ?? ""} ${article.category}`.toLowerCase();
    return haystack.includes(search.toLowerCase().trim());
  });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Conocimientos IA · Artículos</h2>
        <button type="button" onClick={onNew} className="rounded bg-blue-700 px-4 py-2 text-white">
          Nuevo artículo
        </button>
      </div>
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        <label className="text-sm">Buscar artículo
          <input type="search" value={search} onChange={event => setSearch(event.target.value)}
            className="mt-1 w-full rounded border p-2" placeholder="Producto, título o categoría" />
        </label>
        <label className="text-sm">Estado
          <select value={status} onChange={event => setStatus(event.target.value)}
            className="mt-1 w-full rounded border p-2">
            <option value="all">Todos</option>
            <option value="draft">Borradores</option>
            <option value="published">Publicados</option>
            <option value="archived">Archivados</option>
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead><tr className="border-b">
            <th className="p-2">Artículo</th><th className="p-2">Producto</th>
            <th className="p-2">Estado</th><th className="p-2">Revisión</th>
            <th className="p-2">Acciones</th>
          </tr></thead>
          <tbody>
            {filtered.map(article => <tr key={article.id} className="border-b">
              <td className="p-2">{article.title}</td>
              <td className="p-2">{article.product ?? "—"}</td>
              <td className="p-2">{article.status === "published" ? "Publicado" : article.status === "archived" ? "Archivado" : "Borrador"}</td>
              <td className="p-2">{article.reviewed_at?.slice(0, 10) ?? "Sin revisar"}</td>
              <td className="p-2"><button type="button" onClick={() => onEdit(article.id)}
                className="text-blue-700 underline">Editar</button></td>
            </tr>)}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="p-5 text-center text-sm text-slate-600">No hay artículos con estos filtros.</p>}
      </div>
    </section>
  );
}
