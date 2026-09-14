import { NextRequest, NextResponse } from "next/server";

type RateEntry = {
  count: number;
  resetAt: number;
};

const globalRateStore = globalThis as typeof globalThis & {
  __midaRateLimit?: Map<string, RateEntry>;
};

const rateStore =
  globalRateStore.__midaRateLimit ??
  (globalRateStore.__midaRateLimit = new Map<string, RateEntry>());

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

function allowRequest(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const current = rateStore.get(key);

  if (!current || current.resetAt <= now) {
    rateStore.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (current.count >= limit) {
    return { allowed: false, remaining: 0, resetAt: current.resetAt };
  }

  current.count += 1;
  rateStore.set(key, current);
  return {
    allowed: true,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
  };
}

function tooManyRequests(resetAt: number) {
  const retryAfter = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));

  return NextResponse.json(
    { error: "Demasiadas solicitudes. Intenta nuevamente en unos momentos." },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
        "Cache-Control": "no-store",
      },
    },
  );
}

function getFirstForwardedValue(value: string | null) {
  return value?.split(",")[0]?.trim().toLowerCase() || null;
}

function isTrustedChatOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host.toLowerCase();
    const forwardedHost = getFirstForwardedValue(
      request.headers.get("x-forwarded-host"),
    );
    const host = request.headers.get("host")?.toLowerCase() || null;
    const nextHost = request.nextUrl.host.toLowerCase();

    // Cloudflare Tunnel puede entregar la petición a Next como localhost:3001,
    // aunque el navegador realmente venga de https://mida.mx. Por eso se toma
    // también X-Forwarded-Host y se permiten explícitamente los hosts públicos.
    const allowedHosts = new Set(
      [
        forwardedHost,
        host,
        nextHost,
        "mida.mx",
        "www.mida.mx",
        "localhost:3000",
        "localhost:3001",
        "127.0.0.1:3000",
        "127.0.0.1:3001",
      ].filter((value): value is string => Boolean(value)),
    );

    return allowedHosts.has(originHost);
  } catch {
    return false;
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = getClientIp(request);

  if (pathname === "/api/webhook/whatsapp") {
    const secret = process.env.EVOLUTION_WEBHOOK_SECRET;

    if (!secret) {
      console.error("EVOLUTION_WEBHOOK_SECRET no está configurado.");
      return NextResponse.json(
        { error: "Webhook no configurado." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }

    // Evolution API 2.3.7 no expone headers personalizados desde su panel.
    // Se autentica el webhook mediante un token aleatorio incluido en la URL:
    // https://mida.mx/api/webhook/whatsapp?token=<secreto>
    const receivedSecret = request.nextUrl.searchParams.get("token");
    if (!receivedSecret || receivedSecret !== secret) {
      return NextResponse.json(
        { error: "No autorizado." },
        { status: 401, headers: { "Cache-Control": "no-store" } },
      );
    }

    const webhookLimit = allowRequest(`webhook:${ip}`, 120, 60_000);
    if (!webhookLimit.allowed) {
      return tooManyRequests(webhookLimit.resetAt);
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  if (pathname === "/api/chat") {
    if (request.method !== "POST") {
      return NextResponse.next();
    }

    if (!isTrustedChatOrigin(request)) {
      return NextResponse.json(
        { error: "Origen no permitido." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }

    const contentLength = Number(request.headers.get("content-length") || "0");
    if (contentLength > 16_384) {
      return NextResponse.json(
        { error: "Solicitud demasiado grande." },
        { status: 413, headers: { "Cache-Control": "no-store" } },
      );
    }

    const chatLimit = allowRequest(`chat:${ip}`, 12, 60_000);
    if (!chatLimit.allowed) {
      return tooManyRequests(chatLimit.resetAt);
    }

    const response = NextResponse.next();
    response.headers.set("X-RateLimit-Limit", "12");
    response.headers.set("X-RateLimit-Remaining", String(chatLimit.remaining));
    response.headers.set("Cache-Control", "no-store");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/chat", "/api/webhook/whatsapp"],
};
