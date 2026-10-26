import type { NextConfig } from "next";

/**
 * Static export: `next build` writes plain HTML/CSS/JS to `out/`,
 * which Cloudflare Pages serves for free. The signup API lives in
 * `functions/` (Cloudflare Pages Functions), not in Next.js.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
