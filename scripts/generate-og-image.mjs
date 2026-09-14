// scripts/generate-og-image.mjs
// Generates a 1200x630 PNG version of the OG image from the master SVG.
// Google prefers PNG for search features and the knowledge panel.
// SVG is supported by some platforms (Facebook, Twitter) but PNG is
// universally accepted and required for Google rich results.

import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");
const SOURCE_SVG = join(PUBLIC_DIR, "og-image.svg");
const OUT_PNG = join(PUBLIC_DIR, "og-image.png");

const svgBuffer = readFileSync(SOURCE_SVG);

await sharp(svgBuffer, { density: 192 })
  .resize(1200, 630, { fit: "cover", position: "center" })
  .png()
  .toFile(OUT_PNG);

console.log(`Generated ${OUT_PNG}`);
console.log(`Size: ${(await sharp(OUT_PNG).metadata()).width}x${(await sharp(OUT_PNG).metadata()).height}`);
