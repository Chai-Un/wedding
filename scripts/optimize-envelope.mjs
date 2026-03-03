import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = 'src/assets/images/envelope';
const outputDir = 'src/assets/images-optimized/envelope';

// These PNGs all have transparency — generate WebP (with alpha) + PNG variants
const configs = {
  'envelope.png':      { sizes: { sm: 600, md: 1228 } },
  'envelope_open.png': { sizes: { sm: 600, md: 1024 } },
  'wax_seal.png':      { sizes: { sm: 100, md: 200 } },
  'flower.png':        { sizes: { sm: 200, md: 400 } },
  'single_flower.png': { sizes: { sm: 140, md: 320 } },
  'eiffel.png':        { sizes: { sm: 120, md: 300 } },
  'stamp_one.png':     { sizes: { sm: 120, md: 300 } },
  'stamp_two.png':     { sizes: { sm: 120, md: 300 } },
  'stamp_three.png':   { sizes: { sm: 120, md: 300 } },
};

async function run() {
  for (const [file, cfg] of Object.entries(configs)) {
    const input = path.join(inputDir, file);
    const baseName = file.replace('.png', '');
    
    for (const [sizeName, maxDim] of Object.entries(cfg.sizes)) {
      const meta = await sharp(input).metadata();
      const isPortrait = meta.height > meta.width;
      const resizeOpts = isPortrait
        ? { height: Math.min(maxDim, meta.height) }
        : { width: Math.min(maxDim, meta.width) };

      // WebP with alpha
      await sharp(input)
        .resize({ ...resizeOpts, withoutEnlargement: true })
        .webp({ quality: 80, alphaQuality: 90 })
        .toFile(path.join(outputDir, `${baseName}-${sizeName}.webp`));

      // PNG (compressed, still has alpha)
      await sharp(input)
        .resize({ ...resizeOpts, withoutEnlargement: true })
        .png({ compressionLevel: 9, quality: 80 })
        .toFile(path.join(outputDir, `${baseName}-${sizeName}.png`));

      const webpSize = fs.statSync(path.join(outputDir, `${baseName}-${sizeName}.webp`)).size;
      const pngSize = fs.statSync(path.join(outputDir, `${baseName}-${sizeName}.png`)).size;
      console.log(`${baseName}-${sizeName}: WebP=${(webpSize/1024).toFixed(1)}KB, PNG=${(pngSize/1024).toFixed(1)}KB (orig: ${(fs.statSync(input).size/1024).toFixed(0)}KB)`);
    }
  }
  console.log('\nDone!');
}

run().catch(console.error);
