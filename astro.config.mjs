// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: "https://reisen.open.t-pusch.de",
  trailingSlash: "always",
  markdown: {
    // Text exakt wie im Original übernehmen (keine automatische Typografie-Umwandlung).
    processor: satteri({ features: { smartPunctuation: false } }),
  },
});
