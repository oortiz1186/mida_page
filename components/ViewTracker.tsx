"use client";

import { useEffect } from "react";
import { trackEvent } from "../lib/analytics";

export default function ViewTracker({
  eventName,
  params,
}: {
  eventName: string;
  params?: Record<string, string | number | boolean | undefined | null>;
}) {
  useEffect(() => {
    trackEvent(eventName, { ...params, page_path: window.location.pathname });
  }, [eventName, params]);

  return null;
}
