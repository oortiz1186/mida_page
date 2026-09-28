"use client";

import { ChangeEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const MAX_SOURCE_BYTES = 10 * 1024 * 1024;
const MAX_WIDTH = 1600;
const MAX_OPTIMIZED_BYTES = 1024 * 1024;
const WEBP_QUALITY = 0.8;

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function optimizeImage(file: File) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("No se pudo preparar la imagen.");

  context.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => result ? resolve(result) : reject(new Error("No se pudo convertir la imagen a WebP.")),
      "image/webp",
      WEBP_QUALITY,
    );
  });

  return { blob, width, height };
}

export default function FeaturedImageUpload({
  initialUrl = "",
  initialAlt = "",
}: {
  initialUrl?: string | null;
  initialAlt?: string | null;
}) {
  const [url, setUrl] = useState(initialUrl ?? "");
  const [alt, setAlt] = useState(initialAlt ?? "");
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [optimizedSize, setOptimizedSize] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  async function onFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setMessage("");
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setMessage("Usa una imagen JPG, PNG o WebP.");
      event.target.value = "";
      return;
    }
    if (file.size > MAX_SOURCE_BYTES) {
      setMessage("La imagen original no puede superar 10 MB.");
      event.target.value = "";
      return;
    }

    try {
      setBusy(true);
      setOriginalSize(file.size);
      const optimized = await optimizeImage(file);

      if (optimized.blob.size > MAX_OPTIMIZED_BYTES) {
        throw new Error("La imagen optimizada supera 1 MB. Prueba con otra imagen.");
      }

      const supabase = createClient();
      const name = `${crypto.randomUUID()}.webp`;
      const path = `featured/${new Date().getFullYear()}/${name}`;
      const { error } = await supabase.storage.from("blog-images").upload(path, optimized.blob, {
        contentType: "image/webp",
        cacheControl: "31536000",
        upsert: false,
      });
      if (error) throw error;

      const { data } = supabase.storage.from("blog-images").getPublicUrl(path);
      setUrl(data.publicUrl);
      setOptimizedSize(optimized.blob.size);
      setDimensions(`${optimized.width} × ${optimized.height}px`);
      setMessage("Imagen optimizada y subida correctamente.");
    } catch (error) {
      console.error(error);
      setMessage(error instanceof Error ? error.message : "No se pudo subir la imagen.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  }

  return (
    <div className="md:col-span-2">
      <input type="hidden" name="featured_image_url" value={url} />
      <p className="text-sm font-semibold text-slate-700">Imagen destacada</p>
      <div className="mt-2 rounded-xl border border-slate-300 bg-slate-50 p-4">
        {url && (
          <div className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
            <img src={url} alt={alt || "Vista previa de imagen destacada"} className="max-h-80 w-full object-cover" />
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer rounded-xl bg-mida-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-mida-deep">
            {busy ? "Optimizando..." : url ? "Cambiar imagen" : "Seleccionar imagen"}
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={busy} onChange={onFileChange} />
          </label>
          {url && (
            <button type="button" onClick={() => { setUrl(""); setOptimizedSize(null); setDimensions(""); setMessage("Imagen retirada del artículo. Guarda para aplicar el cambio."); }} className="text-sm font-semibold text-red-700">
              Quitar imagen
            </button>
          )}
        </div>
        <p className="mt-3 text-xs text-slate-500">JPG, PNG o WebP · máximo original 10 MB · se convierte a WebP · ancho máximo 1600 px · máximo final 1 MB.</p>
        {(originalSize || optimizedSize || dimensions) && (
          <p className="mt-2 text-xs font-medium text-slate-600">
            {originalSize ? `Original: ${formatBytes(originalSize)}` : ""}
            {optimizedSize ? ` · Optimizada: ${formatBytes(optimizedSize)}` : ""}
            {dimensions ? ` · ${dimensions}` : ""}
          </p>
        )}
        {message && <p className="mt-2 text-sm text-slate-700">{message}</p>}
      </div>
      <label className="mt-4 block text-sm font-semibold text-slate-700">Texto ALT de la imagen
        <input name="featured_image_alt" value={alt} onChange={(event) => setAlt(event.target.value)} maxLength={180} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal" placeholder="Describe brevemente lo que muestra la imagen" />
      </label>
    </div>
  );
}
