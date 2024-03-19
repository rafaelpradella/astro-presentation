import { defineConfig } from 'astro/config';
import metaTags from "astro-meta-tags";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [metaTags(), react()]
});