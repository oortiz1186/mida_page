"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

const portal = "51341002";
const formId = "6cd98886-d87e-4dbe-bd9f-b32b03324164";
const targetId = "hubspot-quote-form";

type HubSpotWindow = Window & {
  hbspt?: {
    forms?: {
      create: (options: {
        region: string;
        portalId: string;
        formId: string;
        target: string;
        onFormReady?: () => void;
      }) => void;
    };
  };
};

export default function HubSpotQuoteForm({ product }: { product: string }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const renderedRef = useRef(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("producto_de_interes", product);
    window.history.replaceState({}, "", url.toString());
  }, [product]);

  useEffect(() => {
    if (status !== "loading") return;

    const timeout = window.setTimeout(() => {
      if (!renderedRef.current) setStatus("error");
    }, 10000);

    return () => window.clearTimeout(timeout);
  }, [status]);

  const renderForm = useCallback(() => {
    if (renderedRef.current) return;

    const hubspot = (window as HubSpotWindow).hbspt;
    const target = document.getElementById(targetId);

    if (!hubspot?.forms?.create || !target) {
      setStatus("error");
      return;
    }

    target.innerHTML = "";
    renderedRef.current = true;

    hubspot.forms.create({
      region: "na1",
      portalId: portal,
      formId,
      target: `#${targetId}`,
      onFormReady: () => setStatus("ready"),
    });
  }, []);

  return (
    <section id="cotizacion" className="py-20 px-6 bg-white border-t border-gray-100 scroll-mt-28">
      <Script
        id="hubspot-forms-script"
        src="https://js.hsforms.net/forms/embed/v2.js"
        strategy="afterInteractive"
        onLoad={renderForm}
        onReady={renderForm}
        onError={() => setStatus("error")}
      />

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Atención personalizada</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-mida-deep">Solicita tu cotización</h2>
        </div>

        {status === "loading" && (
          <div className="min-h-[180px] flex items-center justify-center text-center text-sm text-gray-500" role="status">
            Cargando formulario de cotización...
          </div>
        )}

        <div id={targetId} className={status === "loading" ? "min-h-[1px]" : "min-h-[560px]"} />

        {status === "error" && (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 text-center">
            <p className="font-bold text-mida-deep">No pudimos cargar el formulario de cotización.</p>
            <p className="mt-2 text-sm text-gray-600">
              Tu navegador puede estar bloqueando recursos externos. Puedes continuar desde nuestro formulario de contacto.
            </p>
            <a
              href={`/contacto?interes=${encodeURIComponent(product)}&accion=cotizacion`}
              className="mt-5 inline-flex rounded-xl bg-mida-primary px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-mida-deep"
            >
              Abrir formulario de contacto
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
