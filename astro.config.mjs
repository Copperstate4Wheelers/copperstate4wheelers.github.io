// @ts-check
import { defineConfig } from "astro/config";

import favicons from "astro-favicons";

// https://astro.build/config
export default defineConfig({
  image: {
    experimentalLayout: "constrained",
  },
  experimental: {
    responsiveImages: true,
  },
  integrations: [
    favicons({
      name: "Copperstate4Wheelers",
      short_name: "CS4W",
      input: {
        favicons: ["src/assets/site/copperstate_logo.png"],
      },
    }),
  ],
});
