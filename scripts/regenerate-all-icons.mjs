// scripts/regenerate-all-icons.mjs
// Regenerates ALL PNG favicons, the ICO file, and the 512x512 logo PNG
// from the updated favicon.svg (small icon) and logo-large.svg (large
// icon with more detail). Run after updating either SVG.
//
// Usage: node scripts/regenerate-all-icons.mjs

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");
const FAVICON_SVG = join(PUBLIC_DIR, "favicon.svg");
const LOGO_LARGE_SVG = join(PUBLIC_DIR, "logo-large.svg");

const faviconSvgBuffer = readFileSync(FAVICON_SVG);
const logoLargeSvgBuffer = readFileSync(LOGO_LARGE_SVG);

console.log("Regenerating all PNG favicons and logo from updated SVGs...\n");

// Small favicons (16, 32, 48, 96) from favicon.svg (simpler design
// that stays recognizable at tiny sizes).
const smallSizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "favicon-96x96.png", size: 96 },
  { name: "apple-touch-icon.png", size: 180 },
];

for (const { name, size } of smallSizes) {
  const outPath = join(PUBLIC_DIR, name);
  await sharp(faviconSvgBuffer, { density: 384 })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath);
  console.log(`  ${name} (${size}x${size}) from favicon.svg`);
}

// Large logos (192, 512) from logo-large.svg (more detail, gauge ring,
// neural network) - these are what Google shows in search results and
// the knowledge panel.
const largeSizes = [
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
  { name: "mstile-144x144.png", size: 144 },
];

for (const { name, size } of largeSizes) {
  const outPath = join(PUBLIC_DIR, name);
  await sharp(logoLargeSvgBuffer, { density: 384 })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath);
  console.log(`  ${name} (${size}x${size}) from logo-large.svg`);
}

// Also generate a dedicated logo.png (512x512) for use as the
// Organization schema logo. This is the same as android-chrome-512x512
// but with a clearer name.
const logoPngPath = join(PUBLIC_DIR, "logo.png");
await sharp(logoLargeSvgBuffer, { density: 384 })
  .resize(512, 512, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toFile(logoPngPath);
console.log(`  logo.png (512x512) from logo-large.svg`);

// Create favicon.ico: multi-size ICO containing 16, 32, 48.
function createIco(pngBuffers) {
  const COUNT = pngBuffers.length;
  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const offset = HEADER_SIZE + COUNT * ENTRY_SIZE;

  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type = 1 (ICO)
  header.writeUInt16LE(COUNT, 4); // image count

  const entries = [];
  let dataOffset = offset;
  for (const { size, data } of pngBuffers) {
    const entry = Buffer.alloc(ENTRY_SIZE);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(dataOffset, 12);
    entries.push(entry);
    dataOffset += data.length;
  }

  const allPngData = Buffer.concat(pngBuffers.map((b) => b.data));
  return Buffer.concat([header, ...entries, allPngData]);
}

const icoSources = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
];

const pngBuffersForIco = icoSources.map(({ size, name }) => ({
  size,
  data: readFileSync(join(PUBLIC_DIR, name)),
}));

const icoBuffer = createIco(pngBuffersForIco);
const icoPath = join(PUBLIC_DIR, "favicon.ico");
writeFileSync(icoPath, icoBuffer);
console.log(`  favicon.ico (sizes: 16, 32, 48)`);

// Regenerate og-image.png from og-image.svg (the OG image references
// the brand mark, so it should be regenerated too).
const ogImageSvgPath = join(PUBLIC_DIR, "og-image.svg");
const ogImagePngPath = join(PUBLIC_DIR, "og-image.png");
const ogSvgBuffer = readFileSync(ogImageSvgPath);
await sharp(ogSvgBuffer, { density: 192 })
  .resize(1200, 630, { fit: "cover", position: "center" })
  .png()
  .toFile(ogImagePngPath);
console.log(`  og-image.png (1200x630) from og-image.svg`);

console.log("\nAll icons regenerated successfully.");
