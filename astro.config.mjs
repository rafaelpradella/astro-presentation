import { defineConfig } from 'astro/config';
import metaTags from "astro-meta-tags";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [metaTags(), react()],
  output: "server",
  adapter: cloudflare()
});