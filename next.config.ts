import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"} https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://static.cloudflareinsights.com https://js.hsforms.net https://*.hsforms.net https://*.hsforms.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://formspree.io https://www.google-analytics.com https://region1.google-analytics.com https://www.google.com https://cloudflareinsights.com https://*.hubspot.com https://*.hsforms.com https://*.hsforms.net",
  "frame-src https://www.google.com https://recaptcha.google.com https://www.youtube.com https://www.youtube-nocookie.com https://*.hsforms.com https://*.hsforms.net https://*.hubspot.com",
  "form-action 'self' https://formspree.io https://*.hsforms.com https://*.hubspot.com",
  "base-uri 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          ...(isProduction ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }] : []),
        ],
      },
    ];
  },
};

export default nextConfig;
