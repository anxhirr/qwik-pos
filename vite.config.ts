import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(() => {
  return {
    resolve: {
      alias: {
        ".prisma/client/edge":"./node_modules/.prisma/client/edge.js" // https://fixtergeek.com/blog/how-to-use-prismaclient-with-qwik-on-cloudflare-pages-2023
      },
    },
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
    optimizeDeps: {
      include: [ "@auth/core" ]
    },
  };
});
