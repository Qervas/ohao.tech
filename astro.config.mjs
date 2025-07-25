// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  site: "https://ohao.tech",
  server: {
    host: true,
    port: 4321,
    headers: {},
  },
  vite: {
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
});
