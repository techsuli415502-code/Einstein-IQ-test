// scripts/generate-favicons.mjs
// Generates PNG favicons at all required sizes from the master SVG (favicon.svg).
// Also generates a multi-size favicon.ico file.

import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, "..", "public");
const SOURCE_SVG = join(PUBLIC_DIR, "favicon.svg");

const svgBuffer = readFileSync(SOURCE_SVG);

const sizes = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "favicon-48x48.png", size: 48 },
  { name: "apple-touch-icon.png", size: 180 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

console.log("Generating PNG favicons from", SOURCE_SVG);

for (const { name, size } of sizes) {
  const outPath = join(PUBLIC_DIR, name);
  await sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(outPath);
  console.log(`  ${name} (${size}x${size})`);
}

// Create favicon.ico: a multi-size ICO file containing 16, 32, 48.
function createIco(pngBuffers) {
  const COUNT = pngBuffers.length;
  const HEADER_SIZE = 6;
  const ENTRY_SIZE = 16;
  const offset = HEADER_SIZE + COUNT * ENTRY_SIZE;

  const header = Buffer.alloc(HEADER_SIZE);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(COUNT, 4);

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
console.log(`  favicon.ico (sizes: ${icoSources.map((s) => s.size).join(", ")})`);

console.log("\nAll favicons generated successfully.");
