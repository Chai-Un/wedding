#!/usr/bin/env node

/**
 * Wedding Website - Responsive Image Optimizer
 * 
 * Generates optimized, multi-size images for mobile-first responsive loading.
 * - Detects image orientation (portrait/landscape/square)
 * - Generates device-appropriate sizes (mobile, tablet, desktop)
 * - Converts to WebP (primary) + JPG (fallback)
 * - Preserves folder structure
 * - Generates a manifest for easy import mapping
 * 
 * Usage:
 *   node scripts/optimize-images.mjs           # Process all images
 *   node scripts/optimize-images.mjs --dry-run  # Preview without writing
 */

import sharp from 'sharp';
import { readdir, stat, mkdir, writeFile } from 'fs/promises';
import { join, relative, extname, basename, dirname } from 'path';
import { existsSync } from 'fs';

// ─── Configuration ───────────────────────────────────────────────────────────

const SRC_DIR = join(import.meta.dirname, '..', 'src', 'assets', 'images');
const OUT_DIR = join(import.meta.dirname, '..', 'src', 'assets', 'images-optimized');

const DRY_RUN = process.argv.includes('--dry-run');

// Quality settings
const WEBP_QUALITY = 80;
const JPG_QUALITY = 82;
const PNG_COMPRESSION_LEVEL = 9;

/**
 * Size presets based on image role.
 * - "long edge" = the larger dimension (height for portrait, width for landscape)
 * - Sizes are chosen for common breakpoints × device pixel ratios
 */
const SIZE_PRESETS = {
  // Gallery photos displayed in dialog/modal or full-view pages
  gallery: {
    sizes: [
      { name: 'sm',  longEdge: 800  },   // Mobile (430px × ~2x DPR)
      { name: 'md',  longEdge: 1200 },   // Tablet (768px × ~1.5x)
      { name: 'lg',  longEdge: 1920 },   // Desktop / full HD
    ],
  },
  // Thumbnail images for gallery grid cards
  thumbnail: {
    sizes: [
      { name: 'sm',  longEdge: 400  },   // Mobile grid
      { name: 'md',  longEdge: 600  },   // Tablet grid
      { name: 'lg',  longEdge: 900  },   // Desktop grid
    ],
  },
  // Section hero / background images (cover entire viewport)
  background: {
    sizes: [
      { name: 'sm',  longEdge: 828  },   // iPhone 14 Pro (1x CSS 414 × 2 DPR)
      { name: 'md',  longEdge: 1536 },   // iPad (768 × 2 DPR)
      { name: 'lg',  longEdge: 1920 },   // Desktop full HD
    ],
  },
  // Content images (OurStory, journey, displayed in columns)
  content: {
    sizes: [
      { name: 'sm',  longEdge: 640  },   // Mobile full-width
      { name: 'md',  longEdge: 1024 },   // Tablet
      { name: 'lg',  longEdge: 1600 },   // Desktop
    ],
  },
  // Small decorative / UI elements (logo, stamps, seals, etc.)
  decorative: {
    sizes: [
      { name: 'sm',  longEdge: 200  },
      { name: 'md',  longEdge: 400  },
      { name: 'lg',  longEdge: 800  },   // Desktop / high-DPR
    ],
  },
};

/**
 * Map folders/files to their size preset role.
 */
function getPresetForPath(relPath) {
  const lower = relPath.toLowerCase();

  // Thumbnails
  if (lower.includes('thumbnails/') || lower.includes('thumb')) {
    return 'thumbnail';
  }

  // Gallery photos
  if (lower.includes('gallery/')) {
    return 'gallery';
  }

  // Journey content photos
  if (lower.includes('journey/demo')) {
    return 'content';
  }

  // Journey decorative elements (stamps, flowers, seals, paper textures)
  if (lower.includes('journey/')) {
    return 'decorative';
  }

  // Envelope elements
  if (lower.includes('envelope/')) {
    return 'decorative';
  }

  // Root-level section images used as backgrounds / hero
  const rootBgFiles = ['mievatho_nh6514', 'mievatho_nh1525'];
  if (rootBgFiles.some(f => lower.includes(f))) {
    return 'background';
  }

  // Root-level content images
  if (lower.match(/\.(jpg|jpeg|png)$/i) && !lower.includes('/')) {
    return 'content';
  }

  return 'content'; // default fallback
}

// ─── Image Processing ────────────────────────────────────────────────────────

/**
 * Detect image orientation from metadata.
 */
function getOrientation(width, height) {
  const ratio = width / height;
  if (ratio > 1.1) return 'landscape';
  if (ratio < 0.9) return 'portrait';
  return 'square';
}

/**
 * Calculate resize dimensions preserving aspect ratio.
 * Resizes by longest edge.
 */
function calcDimensions(origWidth, origHeight, maxLongEdge) {
  const longSide = Math.max(origWidth, origHeight);

  // Don't upscale
  if (longSide <= maxLongEdge) {
    return { width: origWidth, height: origHeight, skipped: true };
  }

  const scale = maxLongEdge / longSide;
  return {
    width: Math.round(origWidth * scale),
    height: Math.round(origHeight * scale),
    skipped: false,
  };
}

/**
 * Process a single image file — generate all responsive sizes.
 */
async function processImage(srcPath, relPath, manifest) {
  const presetName = getPresetForPath(relPath);
  const preset = SIZE_PRESETS[presetName];

  const metadata = await sharp(srcPath).metadata();
  const { width: origW, height: origH } = metadata;
  const orientation = getOrientation(origW, origH);

  const ext = extname(relPath);
  const name = basename(relPath, ext);
  const dir = dirname(relPath);

  // PNG sources have alpha — use PNG fallback instead of JPG
  const isPng = ext.toLowerCase() === '.png';
  const fallbackExt = isPng ? 'png' : 'jpg';

  const entry = {
    original: relPath,
    orientation,
    preset: presetName,
    originalSize: `${origW}×${origH}`,
    hasAlpha: isPng,
    variants: [],
  };

  let lastGeneratedDims = null;

  for (const sizeConfig of preset.sizes) {
    const { name: sizeName, longEdge } = sizeConfig;
    const { width, height, skipped } = calcDimensions(origW, origH, longEdge);
    const isLastSize = sizeConfig === preset.sizes[preset.sizes.length - 1];

    if (skipped && sizeName !== preset.sizes[0].name) {
      if (!isLastSize) {
        // Skip intermediate sizes that don't actually downscale
        continue;
      }
      // For the largest size: still skip if same dims as previous variant
      if (lastGeneratedDims && lastGeneratedDims.w === width && lastGeneratedDims.h === height) {
        continue;
      }
    }

    lastGeneratedDims = { w: width, h: height };

    const outputBaseName = `${name}-${sizeName}`;
    const outputDir = join(OUT_DIR, dir);

    if (!DRY_RUN) {
      await mkdir(outputDir, { recursive: true });
    }

    // Generate WebP (supports alpha natively)
    const webpPath = join(outputDir, `${outputBaseName}.webp`);
    const webpRelPath = join(dir, `${outputBaseName}.webp`);

    if (!DRY_RUN) {
      await sharp(srcPath)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(webpPath);
    }

    // Generate fallback: PNG for transparent sources, JPG for photos
    const fallbackPath = join(outputDir, `${outputBaseName}.${fallbackExt}`);
    const fallbackRelPath = join(dir, `${outputBaseName}.${fallbackExt}`);

    if (!DRY_RUN) {
      if (isPng) {
        await sharp(srcPath)
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .png({ compressionLevel: PNG_COMPRESSION_LEVEL })
          .toFile(fallbackPath);
      } else {
        await sharp(srcPath)
          .resize(width, height, { fit: 'inside', withoutEnlargement: true })
          .jpeg({ quality: JPG_QUALITY, progressive: true, mozjpeg: true })
          .toFile(fallbackPath);
      }
    }

    // Get output file sizes
    let webpSize = 0, fallbackSize = 0;
    if (!DRY_RUN) {
      webpSize = (await stat(webpPath)).size;
      fallbackSize = (await stat(fallbackPath)).size;
    }

    entry.variants.push({
      size: sizeName,
      dimensions: `${width}×${height}`,
      webp: webpRelPath,
      [fallbackExt]: fallbackRelPath,
      webpKB: Math.round(webpSize / 1024),
      [`${fallbackExt}KB`]: Math.round(fallbackSize / 1024),
    });
  }

  manifest.push(entry);
}

// ─── File Discovery ──────────────────────────────────────────────────────────

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const SKIP_FILES = new Set(['flower.png:zone.identifier', 'single_flower.png:zone.identifier']);

async function findImages(dir, baseDir = dir) {
  const results = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    const relPath = relative(baseDir, fullPath);

    if (entry.isDirectory()) {
      results.push(...await findImages(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      const nameLower = entry.name.toLowerCase();

      // Skip non-image files, SVGs (already optimized), and Zone.Identifier files
      if (!SUPPORTED_EXTENSIONS.has(ext)) continue;
      if (SKIP_FILES.has(nameLower)) continue;
      if (nameLower.includes('zone.identifier')) continue;

      results.push({ fullPath, relPath });
    }
  }

  return results;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('🎊 Wedding Website - Image Optimizer\n');
  console.log(`📁 Source: ${SRC_DIR}`);
  console.log(`📁 Output: ${OUT_DIR}`);
  if (DRY_RUN) console.log('🔍 DRY RUN — no files will be written\n');

  // Find all images
  const images = await findImages(SRC_DIR);
  console.log(`\n📷 Found ${images.length} images to process\n`);

  // Group by preset for display
  const groups = {};
  for (const img of images) {
    const preset = getPresetForPath(img.relPath);
    groups[preset] = groups[preset] || [];
    groups[preset].push(img.relPath);
  }

  console.log('📋 Image categories:');
  for (const [preset, files] of Object.entries(groups)) {
    const sizes = SIZE_PRESETS[preset].sizes.map(s => `${s.name}:${s.longEdge}px`).join(', ');
    console.log(`   ${preset} (${files.length} files) → [${sizes}]`);
  }
  console.log('');

  // Process images
  const manifest = [];
  let processed = 0;
  let totalOriginalKB = 0;
  let totalWebpKB = 0;
  let totalJpgKB = 0;

  for (const img of images) {
    processed++;
    const origSize = (await stat(img.fullPath)).size;
    totalOriginalKB += Math.round(origSize / 1024);

    process.stdout.write(`\r⚙️  Processing ${processed}/${images.length}: ${img.relPath.substring(0, 60).padEnd(60)}`);

    try {
      await processImage(img.fullPath, img.relPath, manifest);
    } catch (err) {
      console.error(`\n❌ Error processing ${img.relPath}: ${err.message}`);
    }
  }

  // Calculate totals
  for (const entry of manifest) {
    for (const v of entry.variants) {
      totalWebpKB += v.webpKB;
      totalJpgKB += (v.jpgKB || v.pngKB || 0);
    }
  }

  // Summary
  console.log('\n\n' + '═'.repeat(60));
  console.log('📊 OPTIMIZATION SUMMARY');
  console.log('═'.repeat(60));
  console.log(`   Total images processed: ${manifest.length}`);
  console.log(`   Total variants created: ${manifest.reduce((sum, e) => sum + e.variants.length, 0)} (×2 formats)`);
  console.log(`   Original total size:    ${(totalOriginalKB / 1024).toFixed(1)} MB`);

  if (!DRY_RUN) {
    console.log(`   WebP total size:        ${(totalWebpKB / 1024).toFixed(1)} MB (${Math.round((1 - totalWebpKB / totalOriginalKB) * 100)}% smaller)`);
    console.log(`   JPG/PNG total size:     ${(totalJpgKB / 1024).toFixed(1)} MB (${Math.round((1 - totalJpgKB / totalOriginalKB) * 100)}% smaller)`);
  }

  console.log('═'.repeat(60));

  // Print per-image details
  console.log('\n📋 Detailed results:\n');
  for (const entry of manifest) {
    const icon = entry.orientation === 'portrait' ? '📱' : entry.orientation === 'landscape' ? '🖥️' : '⬜';
    console.log(`${icon} ${entry.original} (${entry.originalSize}, ${entry.preset})`);
    for (const v of entry.variants) {
      const fallbackLabel = entry.hasAlpha ? 'PNG' : 'JPG';
      const fallbackKB = v.jpgKB || v.pngKB || 0;
      const sizeInfo = DRY_RUN ? '' : ` → WebP: ${v.webpKB}KB, ${fallbackLabel}: ${fallbackKB}KB`;
      console.log(`   ├─ ${v.size}: ${v.dimensions}${sizeInfo}`);
    }
  }

  // Write manifest
  if (!DRY_RUN) {
    const manifestPath = join(OUT_DIR, 'manifest.json');
    await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
    console.log(`\n✅ Manifest written to: ${manifestPath}`);
  }

  console.log('\n🎉 Done!');
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
