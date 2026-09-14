// scripts/generate-favicon-96.mjs
// Generates a 96x96 favicon PNG - Google's recommended size for
// search result favicons. Also generates 144x144 for Windows tiles.

import sharp from "sharp";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");
const SOURCE_SVG = join(PUBLIC_DIR, "favicon.svg");

const svgBuffer = readFileSync(SOURCE_SVG);

const sizes = [
  { name: "favicon-96x96.png", size: 96 },
  { name: "mstile-144x144.png", size: 144 },
];

for (const { name, size } of sizes) {
  const outPath = join(PUBLIC_DIR, name);
  await sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log(`Generated ${name} (${size}x${size})`);
}
