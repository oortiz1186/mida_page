"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { trackEvent } from "../lib/analytics";

type Item = {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  image_alt: string | null;
};

export default function PromotionsCarousel({ items }: { items: Item[] }) {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (maxIndex === 0) return;
    const timer = window.setInterval(
      () => setIndex((current) => (current >= maxIndex ? 0 : current + 1)),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [maxIndex]);

  if (!items.length) return null;

  const previous = () => setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const next = () => setIndex((current) => (current >= maxIndex ? 0 : current + 1));

  return (
    <section className="bg-mida-deep py-12 text-white md:py-14">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mb-7 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-white/70">CONTPAQi</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-4xl">Promociones y novedades</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">Conoce nuestras promociones vigentes y descubre la opción ideal para tu empresa.</p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-full shrink-0 pr-0 sm:w-1/2 sm:pr-5 lg:w-1/3"
                >
                  <Link
                    href={`/promociones/${item.slug}`}
                    aria-label={`Ver información de ${item.title}`}
                    onClick={() => trackEvent("promotion_click", { promotion_id: item.id, promotion_name: item.title, promotion_slug: item.slug, page_path: window.location.pathname })}
                    className="group block overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-white/10"
                  >
                    <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-white">
                      {item.image_url ? (
                        <Image
                          src={item.image_url}
                          alt={item.image_alt || item.title}
                          width={1600}
                          height={900}
                          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                          className="block h-auto max-h-full w-auto max-w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-100 to-white p-7 text-center">
                          <span className="text-xl font-black text-mida-deep">{item.title}</span>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {maxIndex > 0 && (
            <>
              <button type="button" aria-label="Promoción anterior" onClick={previous}
                className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-3.5 py-2 text-2xl font-bold text-mida-deep shadow-lg transition hover:scale-105 md:-left-5">‹</button>
              <button type="button" aria-label="Siguiente promoción" onClick={next}
                className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-3.5 py-2 text-2xl font-bold text-mida-deep shadow-lg transition hover:scale-105 md:-right-5">›</button>
            </>
          )}
        </div>

        {maxIndex > 0 && (
          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, itemIndex) => (
              <button key={itemIndex} type="button" aria-label={`Mostrar grupo ${itemIndex + 1}`} onClick={() => setIndex(itemIndex)}
                className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-white/10"><span aria-hidden="true" className={`h-2.5 rounded-full transition-all ${itemIndex === index ? "w-8 bg-white" : "w-2.5 bg-white/50"}`} /></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
