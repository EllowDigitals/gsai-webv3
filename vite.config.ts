import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon_io/favicon.ico",
        "favicon_io/apple-touch-icon.png",
        "favicon_io/favicon-32x32.png",
        "favicon_io/favicon-16x16.png",
      ],
      manifest: {
        name: "Ghatak Sports Academy India",
        short_name: "GSAI",
        description:
          "Train in martial arts at Ghatak Sports Academy, India's leading martial arts and self-defense school.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#ff4500",
        icons: [
          {
            src: "favicon_io/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon_io/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "favicon_io/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            src: "favicon_io/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "favicon_io/favicon.ico",
            sizes: "48x48",
            type: "image/x-icon",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "document",
            handler: "NetworkFirst",
            options: {
              cacheName: "html-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
          },
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "image-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
    componentTagger(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "src"),
      three: path.resolve(__dirname, "node_modules/three"),
    },
  },
  server: {
    host: true,
    port: 8080,
    open: true,
    strictPort: true,
    allowedHosts: ["3f4b1235-7cdd-4e05-9dcd-de0368d51a2d.lovableproject.com"],
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    minify: "esbuild",
    sourcemap: true,
  },
  optimizeDeps: {
    include: ["three"],
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
});
