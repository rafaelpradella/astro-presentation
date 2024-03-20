import { defineConfig } from 'astro/config';
import metaTags from "astro-meta-tags";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [metaTags(), react(), icon()],
  output: "server",
  adapter: vercel()
});