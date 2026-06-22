import { defineConfig } from "astro/config";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import remarkOkfLinks from "./remark-okf-links.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read site config from repo-root okf-site.config.json.
const configPath = path.resolve(__dirname, "../../okf-site.config.json");
let siteConfig = {};
try {
  siteConfig = JSON.parse(readFileSync(configPath, "utf8"));
} catch {
  siteConfig = {};
}

const site = siteConfig.site || "http://localhost";
// Allow env OKF_BASE override.
let base = process.env.OKF_BASE || siteConfig.base || "/";
if (!base.endsWith("/")) base += "/";

export default defineConfig({
  site,
  base,
  markdown: {
    remarkPlugins: [[remarkOkfLinks, { base }]],
  },
});
