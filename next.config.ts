import type { NextConfig } from "next";

// Static export for GitHub Pages (see .github/workflows/deploy-pages.yml). Off by default,
// so `npm run build` / Vercel keep the full server build (admin, API routes, proxy).
// NEXT_PUBLIC_BASE_PATH is the repo subpath on <user>.github.io (e.g. "/portfolio");
// it's empty for a custom domain or a <user>.github.io repo.
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  output: isStaticExport ? "export" : undefined,
  basePath: (isStaticExport && process.env.NEXT_PUBLIC_BASE_PATH) || undefined,
  images: {
    // The default image optimizer needs a server; a static export serves images as-is.
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "*.supabase.in",
      },
    ],
  },
  // Allows loading the dev server from other devices/networks (LAN, VPN, hotspot, etc.)
  // without Next.js blocking cross-origin dev asset requests. Dev-only — never affects
  // the production build. "*" wildcards one hostname label, so these cover the entire
  // private IP ranges (RFC 1918) regardless of which specific address gets assigned.
  allowedDevOrigins: [
    "10.*.*.*",
    "172.16.*.*",
    "172.17.*.*",
    "172.18.*.*",
    "172.19.*.*",
    "172.20.*.*",
    "172.21.*.*",
    "172.22.*.*",
    "172.23.*.*",
    "172.24.*.*",
    "172.25.*.*",
    "172.26.*.*",
    "172.27.*.*",
    "172.28.*.*",
    "172.29.*.*",
    "172.30.*.*",
    "172.31.*.*",
    "192.168.*.*",
  ],
};

export default nextConfig;
