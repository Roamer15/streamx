import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "ChwiiX",
        short_name: "ChwiiX",
        description: "Discover movies and TV shows",
        theme_color: "#111827",
        background_color: "#111827",
        display: "standalone",
        start_url: "/",
        icons: [
          { src: "/chwiix.svg", sizes: "any", type: "image/svg+xml" },
        ],
      },
      workbox: {
        runtimeCaching: [
          // TMDB API JSON — NetworkFirst (serve fresh, fall back to cache when offline)
          {
            urlPattern: /^https:\/\/api\.themoviedb\.org\//i,
            handler: "NetworkFirst",
            options: {
              cacheName: "tmdb-api-cache",
              networkTimeoutSeconds: 5,
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // TMDB poster/backdrop images — CacheFirst (images are stable)
          {
            urlPattern: /^https:\/\/image\.tmdb\.org\//i,
            handler: "CacheFirst",
            options: {
              cacheName: "tmdb-images-cache",
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // YouTube embeds — NetworkOnly (video streams can't be meaningfully cached)
          {
            urlPattern: /^https:\/\/www\.youtube\.com\//i,
            handler: "NetworkOnly",
          },
        ],
      },
    }),
  ],
  server: {
    proxy: {
      "/api/tmdb": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/tmdb/, ""),
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            const [pathname, search] = proxyReq.path.split("?");
            const params = new URLSearchParams(search);
            params.delete("api_key");
            params.set("api_key", env.TMDB_API_KEY ?? "");
            proxyReq.path = `${pathname}?${params.toString()}`;
          });
        },
      },
    },
  },
  };
});
