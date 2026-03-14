import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const projectRoot = '/Users/hoangtran/Desktop/wedding-website';
const sourceFile = path.join(projectRoot, 'src/assets/images/envelope/envelope_with_paper.png');
const outputDir = path.join(projectRoot, 'src/assets/images-optimized/envelope');
const manifestPath = path.join(projectRoot, 'src/assets/images-optimized/manifest.json');

// Background preset for large envelope images
const BACKGROUND_SIZES = [
  { width: 828, suffix: 'sm' },
  { width: 1536, suffix: 'md' },
  { width: 1920, suffix: 'lg' },
];

async function optimizeImage(inputPath, outputPath, width) {
  const image = sharp(inputPath);
  const metadata = await image.metadata();
  
  console.log(`  Source: ${metadata.width}x${metadata.height}`);
  
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
  
  console.log('Processing envelope_with_paper.png...\n');
  
  const variants = [];
  
  for (const { width, suffix } of BACKGROUND_SIZES) {
    const outputFilename = `envelope_with_paper-${suffix}.webp`;
    const outputPath = path.join(outputDir, outputFilename);
    
    console.log(`Generating ${suffix} (${width}px)...`);
    const { width: actualWidth, height, size } = await optimizeImage(sourceFile, outputPath, width);
    
    variants.push({
      size: suffix,
      dimensions: `${actualWidth}×${height}`,
      webp: `envelope/${outputFilename}`,
      webpKB: Math.round(size / 1024),
    });
    
    console.log(`  ✓ ${outputFilename} (${actualWidth}x${height}, ${(size / 1024).toFixed(1)}KB)\n`);
  }
  
  // Update manifest
  const manifestContent = await fs.readFile(manifestPath, 'utf-8');
  const manifest = JSON.parse(manifestContent);
  
  // Get source metadata for manifest
  const metadata = await sharp(sourceFile).metadata();
  
  const newEntry = {
    original: "envelope/envelope_with_paper.png",
    orientation: metadata.width > metadata.height ? "landscape" : (metadata.width < metadata.height ? "portrait" : "square"),
    preset: "background",
    originalSize: `${metadata.width}×${metadata.height}`,
    hasAlpha: metadata.hasAlpha || false,
    variants,
  };
  
  // Add or update entry
  const existingIndex = manifest.findIndex(item => item.original === newEntry.original);
  if (existingIndex !== -1) {
    manifest[existingIndex] = newEntry;
    console.log('✓ Updated manifest entry');
  } else {
    manifest.push(newEntry);
    console.log('✓ Added new manifest entry');
  }
  
  await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('\n✅ WebP images created and manifest updated!');
}

main().catch(console.error);
