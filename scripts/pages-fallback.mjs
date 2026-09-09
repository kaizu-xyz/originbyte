#!/usr/bin/env node
/**
 * GitHub Pages SPA fallback: unknown paths must serve the app shell.
 * Nitro's github-pages preset already writes `.nojekyll`; this copies the
 * shell to `404.html` when the build didn't emit one.
 */
import { copyFile, writeFile, access } from "node:fs/promises";
import { join } from "node:path";

const publicDir = join(process.cwd(), "dist", "client");
const indexHtml = join(publicDir, "index.html");
const shellHtml = join(publicDir, "_shell.html");
const notFound = join(publicDir, "404.html");
const nojekyll = join(publicDir, ".nojekyll");
const cnameSrc = join(process.cwd(), "public", "CNAME");
const cnameDest = join(publicDir, "CNAME");

try {
  await access(publicDir);
} catch {
  console.warn("[pages-fallback] no dist/client — skip");
  process.exit(0);
}

const shell = (await access(indexHtml).then(() => indexHtml).catch(() => null))
  ?? (await access(shellHtml).then(() => shellHtml).catch(() => null));

if (!shell) {
  console.warn("[pages-fallback] no index.html or _shell.html — skip");
  process.exit(0);
}

if (shell !== indexHtml) {
  await copyFile(shell, indexHtml);
  console.log("[pages-fallback] wrote index.html from _shell.html");
}

await copyFile(shell, notFound);
console.log("[pages-fallback] wrote 404.html");

await writeFile(nojekyll, "");
console.log("[pages-fallback] .nojekyll ready");

try {
  await access(cnameSrc);
  await copyFile(cnameSrc, cnameDest);
  console.log("[pages-fallback] CNAME copied");
} catch {
  // no custom domain file — fine for github.io-only deploys
}
