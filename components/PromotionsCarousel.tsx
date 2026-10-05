"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Item = {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  image_alt: string | null;
};

export default function PromotionsCarousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % items.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [items.length]);

  if (!items.length) return null;

  const item = items[index];

  return (
    <section className="bg-slate-50 py-14 md:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-7 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-mida-primary">CONTPAQi</p>
          <h2 className="mt-2 text-3xl font-bold text-mida-deep md:text-4xl">Promociones y novedades</h2>
        </div>

        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-md">
          <Link
            href={`/promociones/${item.slug}`}
            aria-label={`Ver información de ${item.title}`}
            className="block"
          >
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={item.image_alt || item.title}
                className="h-auto max-h-[560px] w-full object-contain"
              />
            ) : (
              <div className="flex aspect-[16/7] items-center justify-center bg-gradient-to-br from-slate-100 to-white px-10 text-center">
                <span className="text-3xl font-bold text-mida-deep md:text-5xl">{item.title}</span>
              </div>
            )}
          </Link>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Promoción anterior"
                onClick={() => setIndex((index - 1 + items.length) % items.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl shadow-md transition hover:bg-white md:left-5"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Siguiente promoción"
                onClick={() => setIndex((index + 1) % items.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl shadow-md transition hover:bg-white md:right-5"
              >
                ›
              </button>
            </>
          )}
        </div>

        {items.length > 1 && (
          <div className="mt-5 flex justify-center gap-2">
            {items.map((item, itemIndex) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Mostrar ${item.title}`}
                onClick={() => setIndex(itemIndex)}
                className={`h-2.5 rounded-full transition-all ${
                  itemIndex === index ? "w-8 bg-mida-primary" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
