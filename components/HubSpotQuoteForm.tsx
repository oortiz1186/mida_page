"use client";

import Script from "next/script";
import { useEffect } from "react";

const portal = "51341002";
const formId = "6cd98886-d87e-4dbe-bd9f-b32b03324164";

export default function HubSpotQuoteForm({ product }: { product: string }) {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("producto_de_interes", product);
    window.history.replaceState({}, "", url.toString());
  }, [product]);

  return (
    <section id="cotizacion" className="py-20 px-6 bg-white border-t border-gray-100 scroll-mt-28">
      <Script src={"https://js.hsforms.net/forms/embed/" + portal + ".js"} strategy="afterInteractive" />
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Atención personalizada</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-mida-deep">Solicita tu cotización</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">Déjanos tus datos y un asesor de MIDA se pondrá en contacto contigo para ayudarte con {product}.</p>
        </div>
        <div className="hs-form-frame min-h-[560px]" data-region="na1" data-form-id={formId} data-portal-id={portal} />
      </div>
    </section>
  );
}
