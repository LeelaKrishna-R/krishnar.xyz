/** @type {import('next').NextConfig} */
// Security headers on every response (2026-11-15 audit). The pages are
// prerendered, so inline scripts (Next's flight data, the theme boot script,
// JSON-LD) can't carry nonces: script-src keeps 'unsafe-inline' but nothing
// from other origins can load. frame-ancestors/X-Frame-Options stop the site
// being framed (clickjacking). Preview deployments also allow the Vercel
// toolbar.
const prod = process.env.VERCEL_ENV === "production";
const dev = process.env.NODE_ENV === "development";
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""}${prod ? "" : " https://vercel.live"}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${prod ? "" : " https://vercel.live wss://ws-us3.pusher.com"}`,
  `frame-src ${prod ? "'none'" : "https://vercel.live"}`,
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // production only: the live site is https anyway (HSTS), and on a local
  // http server WebKit would upgrade every request and load nothing
  ...(prod ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig = {
  poweredByHeader: false,
  // the stylesheet goes inline in each page: no render-blocking request before
  // the first paint (Lighthouse measured ~1.1 s of it on mobile)
  experimental: { inlineCss: false },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
  async redirects() {
    return [
      // The site moved to ravuri.dev; the old domain sends every path there
      // so search engines see one site, not two copies.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?krishnar\\.xyz" }],
        destination: "https://www.ravuri.dev/:path*",
        permanent: true,
      },
      // Routes the old site had that no longer exist.
      { source: "/github", destination: "/about", permanent: true },
      { source: "/forbidden", destination: "/", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
      // Old resume files (removed: they carried a phone number and were out of date).
      // The resume PDF is now Leelakrishna-Ravuri-Resume.pdf (printed by scripts/resume-pdf.mjs).
      { source: "/resume/Leelakrishna-Ravuri-ATS.pdf", destination: "/resume/Leelakrishna-Ravuri-Resume.pdf", permanent: true },
      { source: "/resume/Krishna-Ravuri-Resume.pdf", destination: "/resume/Leelakrishna-Ravuri-Resume.pdf", permanent: true },
      { source: "/resume/Leelakrishna_Ravuri_Original.pdf", destination: "/resume/Leelakrishna-Ravuri-Resume.pdf", permanent: true },
      { source: "/resume/resume-ats.txt", destination: "/resume.txt", permanent: true },
    ];
  },
};

export default nextConfig;
