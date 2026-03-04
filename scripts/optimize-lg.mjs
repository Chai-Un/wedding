import sharp from 'sharp';
import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const SRC = 'src/assets/images/lg.png';
const OUT_DIR = 'src/assets/images-optimized';
const MANIFEST_PATH = join(OUT_DIR, 'manifest.json');

const SIZES = [
  { name: 'sm', longEdge: 200 },
  { name: 'md', longEdge: 400 },
  { name: 'lg', longEdge: 800 },
];

const meta = await sharp(SRC).metadata();
const origW = meta.width;
const origH = meta.height;
const longSide = Math.max(origW, origH);

const variants = [];

for (const { name, longEdge } of SIZES) {
  let w, h;
  if (longSide <= longEdge) {
    w = origW;
    h = origH;
  } else {
    const scale = longEdge / longSide;
    w = Math.round(origW * scale);
    h = Math.round(origH * scale);
  }

  const webpOut = `${OUT_DIR}/lg.${name}.webp`;
  await sharp(SRC).resize(w, h).webp({ quality: 80 }).toFile(webpOut);
  console.log('wrote', webpOut, `${w}x${h}`);
  variants.push({ size: name, format: 'webp', file: `lg.${name}.webp`, width: w, height: h });

  const pngOut = `${OUT_DIR}/lg.${name}.png`;
  await sharp(SRC).resize(w, h).png({ compressionLevel: 9 }).toFile(pngOut);
  console.log('wrote', pngOut, `${w}x${h}`);
  variants.push({ size: name, format: 'png', file: `lg.${name}.png`, width: w, height: h });
}

// Update manifest
const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf-8'));

// Remove any existing lg.png entry
const filtered = manifest.filter((e) => e.src !== 'lg.png');
filtered.push({
  src: 'lg.png',
  preset: 'decorative',
  alpha: true,
  variants,
});

await writeFile(MANIFEST_PATH, JSON.stringify(filtered, null, 2));
console.log('manifest updated, total entries:', filtered.length);
console.log('done');
