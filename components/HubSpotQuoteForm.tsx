"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import { trackEvent } from "../lib/analytics";

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
        onFormSubmitted?: () => void;
      }) => void;
    };
  };
};

export default function HubSpotQuoteForm({ product, source = "hubspot_quote" }: { product: string; source?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [shouldLoad, setShouldLoad] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const renderedRef = useRef(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("producto_de_interes", product);
    window.history.replaceState({}, "", url.toString());
  }, [product, source]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      setShouldLoad(true);
      setStatus("loading");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        setStatus("loading");
        observer.disconnect();
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoad]);

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
      onFormReady: () => {
        setStatus("ready");
        trackEvent("quote_form_view", { product, source, page_path: window.location.pathname, page_location: window.location.href });
      },
      onFormSubmitted: () => {
        trackEvent("generate_lead", { form_name: "hubspot_quote", product, source, page_path: window.location.pathname, page_location: window.location.href });
      },
    });
  }, [product]);

  return (
    <section ref={sectionRef} id="cotizacion" className="py-20 px-6 bg-white border-t border-gray-100 scroll-mt-28">
      {shouldLoad && (
        <Script
          id="hubspot-forms-script"
          src="https://js.hsforms.net/forms/embed/v2.js"
          strategy="afterInteractive"
          onLoad={renderForm}
          onReady={renderForm}
          onError={() => setStatus("error")}
        />
      )}

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-mida-primary font-bold text-xs uppercase tracking-widest">Atención personalizada</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-black text-mida-deep">Solicita tu cotización</h2>
        </div>

        {(status === "idle" || (status === "loading" && !renderedRef.current)) && (
          <div className="min-h-[180px] flex items-center justify-center text-center text-sm text-gray-500" role="status">
            {status === "idle" ? "El formulario se cargará al acercarte a esta sección..." : "Cargando formulario de cotización..."}
          </div>
        )}

        <div id={targetId} className={status === "ready" ? "min-h-[560px]" : "min-h-[1px]"} />
        <p className="mt-5 text-center text-xs leading-5 text-gray-500">
          Al enviar este formulario, tus datos serán tratados para atender tu solicitud de cotización y dar seguimiento comercial. Consulta nuestro{" "}
          <a href="/aviso-de-privacidad" className="font-semibold text-mida-primary underline underline-offset-2">Aviso de Privacidad</a>.
        </p>

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
