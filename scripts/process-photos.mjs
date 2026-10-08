// One consistent treatment for every stock photo on the site:
// 3:2 crop (attention-weighted), 1800x1200, slight warm/teal grade, mild desaturation.
// Usage: node scripts/process-photos.mjs <input-dir>   → writes public/photos/*.jpg
import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";

const input = process.argv[2];
if (!input) throw new Error("Pass the folder with the original photos.");
const out = path.resolve("public/photos");
await mkdir(out, { recursive: true });

// Warm skin and highlights a touch, pull blues slightly toward teal.
const grade = [
  [1.03, 0.0, 0.0],
  [0.0, 1.0, 0.02],
  [0.0, 0.04, 0.95],
];

for (const file of await readdir(input)) {
  if (!/\.jpe?g$/i.test(file)) continue;
  const dest = path.join(out, file.replace(/\.jpeg$/i, ".jpg"));
  await sharp(path.join(input, file))
    .rotate()
    .resize(1800, 1200, { fit: "cover", position: sharp.strategy.attention })
    .recomb(grade)
    .modulate({ saturation: 0.9 })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
  console.log("✓", path.basename(dest));
}
