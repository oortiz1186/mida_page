"use client";

import type { MouseEvent, ReactNode } from "react";

export default function QuoteLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href !== "#cotizacion") return;
    event.preventDefault();
    const target = document.getElementById("cotizacion");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#cotizacion");
  };

  return <a href={href} className={className} onClick={handleClick}>{children}</a>;
}
