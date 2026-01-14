import type { NextConfig } from "next";
import withPWA from "next-pwa";
import path from "path";
import type { Configuration } from "webpack";

const isDev = process.env.NODE_ENV !== "production";

const pwa = withPWA({
  dest: "public",
  disable: isDev,
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(gstatic|googleapis)\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "google-font-stylesheets",
        expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    {
      urlPattern: ({ request }: { request: Request }) =>
        request.destination === "image",
      handler: "CacheFirst",
      options: {
        cacheName: "images",
        expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
    {
      urlPattern: ({ request }: { request: Request }) =>
        request.destination === "document" || request.destination === "script",
      handler: "NetworkFirst",
      options: {
        cacheName: "pages",
        networkTimeoutSeconds: 5,
        expiration: { maxEntries: 50, maxAgeSeconds: 60 * 60 * 24 * 7 },
      },
    },
    {
      urlPattern: ({ request }: { request: Request }) =>
        request.destination === "style" || request.destination === "font",
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "assets",
        expiration: { maxEntries: 30, maxAgeSeconds: 60 * 60 * 24 * 30 },
      },
    },
  ],
});

const nextConfig: NextConfig = pwa({
  experimental: {
    optimizePackageImports: ["react", "next"],
  },
  // Silence Next.js 16 warning when using a small webpack config
  turbopack: {},
  webpack: (config: Configuration) => {
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
    const alias = config.resolve.alias as Record<string, string>;
    alias["@"] = path.resolve(__dirname, "src");
    return config;
  },
});

export default nextConfig;
