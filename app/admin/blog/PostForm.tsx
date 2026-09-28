import Link from "next/link";
import { deletePost, savePost } from "./actions";
import RichTextEditor from "./RichTextEditor";
import FeaturedImageUpload from "./FeaturedImageUpload";

type Category = { id: string; name: string };
type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category_id: string | null;
  status: string;
  seo_title: string | null;
  seo_description: string | null;
  related_service_slug: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
};

export default function PostForm({
  post,
  categories,
  isAdmin,
  saved,
  error,
}: {
  post?: Post;
  categories: Category[];
  isAdmin: boolean;
  saved?: boolean;
  error?: string;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-7 flex items-center justify-between gap-4">
        <div>
          <Link href="/admin/blog" className="text-sm font-semibold text-mida-primary">← Volver a artículos</Link>
          <h1 className="mt-2 text-3xl font-bold text-mida-deep">{post ? "Editar artículo" : "Nuevo artículo"}</h1>
        </div>
      </div>

      {saved && <p className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-800">Artículo guardado correctamente.</p>}
      {error && <p className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">No fue posible guardar el artículo. Revisa los datos e intenta nuevamente.</p>}

      <form action={savePost} className="space-y-6">
        {post && <input type="hidden" name="id" value={post.id} />}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="md:col-span-2 text-sm font-semibold text-slate-700">Título
              <input name="title" required defaultValue={post?.title} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="Ej. Cómo respaldar CONTPAQi correctamente" />
            </label>
            <label className="text-sm font-semibold text-slate-700">Slug
              <input name="slug" defaultValue={post?.slug} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="Se genera desde el título si lo dejas vacío" />
            </label>
            <label className="text-sm font-semibold text-slate-700">Categoría
              <select name="category_id" defaultValue={post?.category_id ?? ""} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal">
                <option value="">Sin categoría</option>
                {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
              </select>
            </label>
            <label className="md:col-span-2 text-sm font-semibold text-slate-700">Resumen
              <textarea name="excerpt" rows={3} defaultValue={post?.excerpt ?? ""} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="Resumen corto para el listado del blog." />
            </label>
            <FeaturedImageUpload initialUrl={post?.featured_image_url} initialAlt={post?.featured_image_alt} />
            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-slate-700">Contenido</p>
              <RichTextEditor initialContent={post?.content ?? ""} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-mida-deep">Publicación y SEO</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="text-sm font-semibold text-slate-700">Estado
              <select name="status" defaultValue={post?.status ?? "draft"} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal">
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
                <option value="archived">Archivado</option>
              </select>
            </label>
            <label className="text-sm font-semibold text-slate-700">Servicio relacionado
              <input name="related_service_slug" defaultValue={post?.related_service_slug ?? ""} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" placeholder="Ej. contpaqi-nominas" />
            </label>
            <label className="text-sm font-semibold text-slate-700">Título SEO
              <input name="seo_title" maxLength={70} defaultValue={post?.seo_title ?? ""} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" />
            </label>
            <label className="text-sm font-semibold text-slate-700">Descripción SEO
              <textarea name="seo_description" maxLength={170} rows={3} defaultValue={post?.seo_description ?? ""} className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-normal" />
            </label>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/admin/blog" className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700">Cancelar</Link>
          <button type="submit" className="rounded-xl bg-mida-primary px-6 py-3 font-bold text-white hover:bg-mida-deep">Guardar artículo</button>
        </div>
      </form>

      {post && isAdmin && (
        <form action={deletePost} className="mt-10 border-t border-slate-200 pt-6">
          <input type="hidden" name="id" value={post.id} />
          <button className="text-sm font-semibold text-red-700">Eliminar artículo</button>
        </form>
      )}
    </div>
  );
}
