"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// The base Pixel in app/layout.tsx already tracks the initial PageView.
// Track only subsequent client-side pathname changes to avoid duplicates.
export default function MetaPageTracker() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  }, [pathname]);

  return null;
}
