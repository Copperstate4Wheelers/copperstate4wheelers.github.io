// @ts-check
import { defineConfig } from "astro/config";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://copperstate4wheelers.github.io",
  integrations: [icon()],
  ssr: {
    noExternal: ['normalize.css'],
  }
});

