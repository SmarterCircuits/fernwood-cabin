import type { NextConfig } from "next";

// Static-first: `next build` writes a fully static site to ./out that can be
// deployed to Vercel, Netlify, Cloudflare Pages, or any static host.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
