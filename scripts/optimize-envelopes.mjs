import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = '/Users/hoangtran/Desktop/wedding-website';
const sourceDir = path.join(projectRoot, 'src/assets/images/envelope');
const outputDir = path.join(projectRoot, 'src/assets/images-optimized/envelope');
const manifestPath = path.join(projectRoot, 'src/assets/images-optimized/manifest.json');

// Background preset for large envelope images
const BACKGROUND_SIZES = [
  { width: 828, suffix: 'sm' },
  { width: 1536, suffix: 'md' },
  { width: 1920, suffix: 'lg' },
];

// Content preset for envelope_online
const CONTENT_SIZES = [
  { width: 640, suffix: 'sm' },
  { width: 1024, suffix: 'md' },
  { width: 1600, suffix: 'lg' },
];

const imagesToProcess = [
  { name: 'envelope_flower_open_1', sizes: BACKGROUND_SIZES },
  { name: 'envelope_flower_open', sizes: BACKGROUND_SIZES },
  { name: 'envelope_online', sizes: CONTENT_SIZES },
  { name: 'envelope_open', sizes: BACKGROUND_SIZES },
];

async function optimizeImage(inputPath, outputPath, width) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  // Calculate height to maintain aspect ratio
  const height = Math.round((width / metadata.width) * metadata.height);
  
  await image
    .resize(width, height, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 80 })
    .toFile(outputPath);
    
  const stats = await fs.stat(outputPath);
  return { width, height, size: stats.size };
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  
  let manifest;
  try {
    const manifestContent = await fs.readFile(manifestPath, 'utf-8');
    manifest = JSON.parse(manifestContent);
    if (!manifest.images) {
      manifest.images = {};
    }
  } catch (error) {
    manifest = { images: {} };
  }
  
  for (const { name, sizes } of imagesToProcess) {
    const inputPath = path.join(sourceDir, `${name}.png`);
    
    console.log(`\nProcessing ${name}...`);
    
    try {
      await fs.access(inputPath);
    } catch (error) {
      console.log(`  ⚠️  Source file not found: ${inputPath}`);
      continue;
    }
    
    const variants = [];
    
    for (const { width, suffix } of sizes) {
      const outputFilename = `${name}-${suffix}.webp`;
      const outputPath = path.join(outputDir, outputFilename);
      
      console.log(`  Generating ${suffix} (${width}px)...`);
      const { width: actualWidth, height, size } = await optimizeImage(inputPath, outputPath, width);
      
      variants.push({
        type: 'webp',
        size: suffix,
        width: actualWidth,
        height,
        path: `envelope/${outputFilename}`,
        fileSize: size,
      });
      
      console.log(`    ✓ ${outputFilename} (${actualWidth}x${height}, ${(size / 1024).toFixed(1)}KB)`);
    }
    
    // Update manifest - keep existing variants if any
    const basePath = `envelope/${name}.png`;
    const existing = manifest.images[basePath] || { original: basePath, variants: [] };
    
    // Merge new webp variants with existing PNG variants
    const existingPngVariants = existing.variants?.filter(v => v.type === 'png') || [];
    manifest.images[basePath] = {
      original: basePath,
      variants: [...existingPngVariants, ...variants],
    };
  }
  
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('\n✅ All images optimized and manifest updated!');
}

main().catch(console.error);
