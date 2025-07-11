// @ts-check
import { defineConfig } from "astro/config";

import serviceWorker from "astrojs-service-worker";
import favicons from "astro-favicons";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  redirects: {
    // Automatically redirect the top-level '/events' to the current event year
    "/events": `/events/${new Date().getFullYear()}`,
  },

  vite: {
    css: {
      transformer: "lightningcss",
      lightningcss: {
        targets: browserslistToTargets(browserslist(">= 0.25%")),
      },
    },
    build: {
      cssMinify: "lightningcss",
    },
  },

  image: {
    responsiveStyles: true,
    layout: "constrained",
  },

  integrations: [
    serviceWorker(),
    favicons({
      name: "Copperstate4Wheelers",
      short_name: "CS4W",
      input: {
        favicons: ["src/assets/site/copperstate_logo.png"],
      },
    }),
    mdx(),
  ],
});
