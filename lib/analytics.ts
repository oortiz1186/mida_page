export type AnalyticsParams = Record<string, string | number | boolean | undefined | null>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;

  const payload = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""),
  );

  if (typeof window.fbq === "function") {
    if (name === "generate_lead") window.fbq("track", "Lead", { content_name: String(payload.product || "Cotización"), content_category: "cotizacion" });
    if (name === "chat_open") window.fbq("track", "Contact", { content_name: "Chat MIDA" });
    if (name === "view_product" || name === "view_promotion") window.fbq("track", "ViewContent", { content_name: String(payload.product || payload.promotion_name || ""), content_category: name === "view_product" ? "producto" : "promocion" });
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: name, ...payload });
}
