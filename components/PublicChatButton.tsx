"use client";

import { usePathname } from "next/navigation";
import WhatsAppButton from "./WhatsAppButton";

export default function PublicChatButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  return <WhatsAppButton />;
}
