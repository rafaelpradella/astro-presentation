import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from "astro/config";
import metaTags from "astro-meta-tags";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import { default as abTestDirective } from "./src/utils/directives/abTest/register";
import icon from "astro-icon";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, 'src');

const alias = {
  "@assets": resolve(root, 'assets'),
  "@constants": resolve(root, 'constants'),
  "@content": resolve(root, 'content'),
  "@components": resolve(root, 'components'),
  "@layouts": resolve(root, 'layouts'),
  "@pages": resolve(root, 'pages'),
  "@utils": resolve(root, 'utils'),
};

// https://astro.build/config
export default defineConfig({
  integrations: [metaTags(), react(), icon(), abTestDirective()],
  output: "hybrid",
  adapter: vercel(),
  vite: {
    resolve: { alias },
  },
});