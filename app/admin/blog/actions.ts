"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function value(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function storagePathFromPublicUrl(url: string) {
  const marker = "/storage/v1/object/public/blog-images/";
  const index = url.indexOf(marker);
  if (index === -1) return null;
  const path = url.slice(index + marker.length);
  return path ? decodeURIComponent(path) : null;
}

async function removeBlogImage(supabase: Awaited<ReturnType<typeof createClient>>, url: string | null | undefined) {
  if (!url) return;
  const path = storagePathFromPublicUrl(url);
  if (!path) return;
  const { error } = await supabase.storage.from("blog-images").remove([path]);
  if (error) console.error("No se pudo eliminar la imagen anterior del blog:", error);
}

function normalizeSlug(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}

async function getAuthorizedUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: profile } = await supabase
    .from("blog_profiles")
    .select("role, is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!profile?.is_active) redirect("/admin/login?error=unauthorized");
  return { supabase, user, profile };
}

export async function savePost(formData: FormData) {
  const { supabase, user } = await getAuthorizedUser();
  const id = value(formData, "id");
  const title = value(formData, "title");
  const slug = normalizeSlug(value(formData, "slug") || title);
  const status = value(formData, "status") || "draft";

  if (!title || !slug || !["draft", "published", "archived"].includes(status)) {
    redirect(id ? `/admin/blog/${id}?error=invalid` : "/admin/blog/nuevo?error=invalid");
  }

  let currentPost: {
    featured_image_url: string | null;
    author_id: string;
    published_at: string | null;
    status: string;
    slug: string;
  } | null = null;

  if (id) {
    const { data } = await supabase
      .from("blog_posts")
      .select("featured_image_url,author_id,published_at,status,slug")
      .eq("id", id)
      .maybeSingle();
    currentPost = data;
  }

  const previousImageUrl = currentPost?.featured_image_url ?? null;

  const newImageUrl = value(formData, "featured_image_url") || null;

  const payload = {
    title,
    slug,
    excerpt: value(formData, "excerpt") || null,
    content: value(formData, "content"),
    category_id: value(formData, "category_id") || null,
    featured_image_url: newImageUrl,
    featured_image_alt: value(formData, "featured_image_alt") || null,
    seo_title: value(formData, "seo_title") || null,
    seo_description: value(formData, "seo_description") || null,
    related_service_slug: value(formData, "related_service_slug") || null,
    status,
    author_id: currentPost?.author_id ?? user.id,
    published_at:
      status === "published"
        ? currentPost?.published_at ?? new Date().toISOString()
        : currentPost?.published_at ?? null,
    updated_at: new Date().toISOString(),
  };

  // En una alta, usar un ID generado antes del INSERT evita depender de
  // INSERT ... RETURNING. Con RLS, el INSERT puede completarse correctamente
  // y la lectura de retorno fallar, provocando un falso error y duplicados
  // si el usuario vuelve a pulsar Guardar.
  const savedId = id || crypto.randomUUID();
  const { error } = id
    ? await supabase.from("blog_posts").update(payload).eq("id", id)
    : await supabase.from("blog_posts").insert({ id: savedId, ...payload });

  if (error) {
    console.error("No se pudo guardar el artículo:", error);
    redirect(id ? `/admin/blog/${id}?error=save` : "/admin/blog/nuevo?error=save");
  }

  if (previousImageUrl && previousImageUrl !== newImageUrl) {
    await removeBlogImage(supabase, previousImageUrl);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (currentPost?.slug && currentPost.slug !== slug) {
    revalidatePath(`/blog/${currentPost.slug}`);
  }
  revalidatePath(`/blog/${slug}`);
  redirect(`/admin/blog/${savedId}?saved=1`);
}

export async function deletePost(formData: FormData) {
  const { supabase, profile } = await getAuthorizedUser();
  if (profile.role !== "admin") redirect("/admin/blog?error=forbidden");

  const id = value(formData, "id");
  if (!id) redirect("/admin/blog");

  const { data: currentPost } = await supabase
    .from("blog_posts")
    .select("featured_image_url,slug")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    console.error("No se pudo eliminar el artículo:", error);
    redirect(`/admin/blog/${id}?error=delete`);
  }

  await removeBlogImage(supabase, currentPost?.featured_image_url);

  revalidatePath("/admin");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  if (currentPost?.slug) revalidatePath(`/blog/${currentPost.slug}`);
  redirect("/admin/blog?deleted=1");
}
