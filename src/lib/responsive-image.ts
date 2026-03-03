/**
 * Responsive Image Utility
 *
 * Uses Vite's import.meta.glob to eagerly load all optimized image variants,
 * then provides helpers to resolve srcSet and sources for any original image.
 *
 * Naming convention (from optimize-images.mjs):
 *   original: gallery/becomeone/mievatho_NH1550.jpg
 *   variants: gallery/becomeone/mievatho_NH1550-sm.webp
 *             gallery/becomeone/mievatho_NH1550-sm.jpg
 *             gallery/becomeone/mievatho_NH1550-md.webp
 *             ...
 */

// Eagerly import ALL optimized images at build time — Vite resolves these to hashed URLs
const optimizedImages = import.meta.glob<string>(
  '@/assets/images-optimized/**/*.{webp,jpg,png}',
  { eager: true, import: 'default' },
);

// Size breakpoints in pixels (matching the script's output)
const SIZE_WIDTHS: Record<string, number> = {
  sm: 640,
  md: 1200,
  lg: 1920,
};

export interface ResponsiveImageSources {
  /** WebP srcSet string: "url1 640w, url2 1200w, url3 1920w" */
  webpSrcSet: string;
  /** JPG srcSet string (fallback) */
  jpgSrcSet: string;
  /** The smallest JPG variant as fallback src */
  fallbackSrc: string;
  /** sizes attribute hint */
  sizes: string;
}

/**
 * Extract the "key" from an original image path.
 * e.g. "@/assets/images/gallery/becomeone/mievatho_NH1550.jpg"
 *    → "gallery/becomeone/mievatho_NH1550"
 *
 * Also handles Vite's resolved URLs (hashed) by matching against the original import.
 */
function extractKey(originalPath: string): string {
  // Normalize: strip leading @/assets/images/ or src/assets/images/ or full filesystem path
  let key = originalPath
    .replace(/^.*\/assets\/images\//, '') // strip everything up to and including images/
    .replace(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/, ''); // strip extension

  return key;
}

/**
 * Find the optimized variant URL for a given key, size, and format.
 */
function findVariant(key: string, size: string, format: 'webp' | 'jpg' | 'png'): string | undefined {
  // The glob keys look like: /src/assets/images-optimized/gallery/becomeone/mievatho_NH1550-sm.webp
  // We need to find a match
  const suffix = `-${size}.${format}`;
  const searchKey = key.toLowerCase();

  for (const [globPath, url] of Object.entries(optimizedImages)) {
    const normalizedGlobPath = globPath
      .replace(/^.*\/assets\/images-optimized\//, '')
      .toLowerCase();

    // Check if this glob path matches our key + suffix
    const expectedPath = (searchKey + suffix).toLowerCase();
    if (normalizedGlobPath === expectedPath) {
      return url;
    }
  }

  return undefined;
}

/**
 * Get the responsive image width for a specific size.
 * We look at the actual optimized image filename to determine width,
 * but fall back to the preset widths.
 */
function getWidthForSize(_key: string, size: string): number {
  return SIZE_WIDTHS[size] || 640;
}

/**
 * Given an original image import (the Vite-resolved URL or path),
 * returns srcSet and source information for responsive rendering.
 *
 * @param originalSrc - The imported image (e.g., `import img from '@/assets/images/foo.jpg'`)
 * @param originalPath - The import path string (e.g., '@/assets/images/foo.jpg')
 *                       Only needed if originalSrc is a hashed URL
 */
export function getResponsiveImage(
  originalPath: string,
): ResponsiveImageSources | null {
  const key = extractKey(originalPath);
  const sizes = ['sm', 'md', 'lg'];

  // Auto-detect: PNG sources use PNG fallback (preserving alpha), others use JPG
  const isPng = /\.png$/i.test(originalPath);
  const fallbackFormat: 'jpg' | 'png' = isPng ? 'png' : 'jpg';

  const webpEntries: string[] = [];
  const fallbackEntries: string[] = [];
  let fallbackSrc = '';

  for (const size of sizes) {
    const webpUrl = findVariant(key, size, 'webp');
    const fallbackUrl = findVariant(key, size, fallbackFormat);

    if (webpUrl) {
      const width = getWidthForSize(key, size);
      webpEntries.push(`${webpUrl} ${width}w`);
    }
    if (fallbackUrl) {
      const width = getWidthForSize(key, size);
      fallbackEntries.push(`${fallbackUrl} ${width}w`);
      if (!fallbackSrc) fallbackSrc = fallbackUrl; // smallest as fallback
    }
  }

  if (webpEntries.length === 0 && fallbackEntries.length === 0) {
    return null;
  }

  return {
    webpSrcSet: webpEntries.join(', '),
    jpgSrcSet: fallbackEntries.join(', '),
    fallbackSrc,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  };
}

/**
 * Get just the best single optimized URL for a given size.
 * Useful for background-image CSS where srcSet isn't available.
 *
 * @param originalPath - The import path of the original image
 * @param preferredSize - 'sm' | 'md' | 'lg'
 * @param format - 'webp' | 'jpg' (default: 'jpg' for wider CSS compatibility)
 */
export function getOptimizedUrl(
  originalPath: string,
  preferredSize: 'sm' | 'md' | 'lg' = 'md',
  format?: 'webp' | 'jpg' | 'png',
): string | undefined {
  const key = extractKey(originalPath);
  // Auto-detect format from original extension if not specified
  const resolvedFormat = format ?? (/\.png$/i.test(originalPath) ? 'png' : 'jpg');
  return findVariant(key, preferredSize, resolvedFormat);
}

/**
 * Get all optimized URLs for background-image use with media queries.
 * Returns URLs for each size.
 */
export function getOptimizedUrls(
  originalPath: string,
  format?: 'webp' | 'jpg' | 'png',
): Record<string, string> {
  const key = extractKey(originalPath);
  // Auto-detect format from original extension if not specified
  const resolvedFormat = format ?? (/\.png$/i.test(originalPath) ? 'png' : 'jpg');
  const result: Record<string, string> = {};

  for (const size of ['sm', 'md', 'lg']) {
    const url = findVariant(key, size, resolvedFormat);
    if (url) result[size] = url;
  }

  return result;
}

/**
 * Get responsive image sources for transparent images (PNG/WebP with alpha).
 * Returns WebP srcSet + PNG srcSet (instead of JPG) for alpha preservation.
 */
export function getResponsiveImageAlpha(
  originalPath: string,
): ResponsiveImageSources | null {
  const key = extractKey(originalPath);
  const sizes = ['sm', 'md', 'lg'];

  const webpEntries: string[] = [];
  const pngEntries: string[] = [];
  let fallbackSrc = '';

  for (const size of sizes) {
    const webpUrl = findVariant(key, size, 'webp');
    const pngUrl = findVariant(key, size, 'png');

    if (webpUrl) {
      const width = getWidthForSize(key, size);
      webpEntries.push(`${webpUrl} ${width}w`);
    }
    if (pngUrl) {
      const width = getWidthForSize(key, size);
      pngEntries.push(`${pngUrl} ${width}w`);
      if (!fallbackSrc) fallbackSrc = pngUrl;
    }
  }

  if (webpEntries.length === 0 && pngEntries.length === 0) {
    return null;
  }

  return {
    webpSrcSet: webpEntries.join(', '),
    jpgSrcSet: pngEntries.join(', '), // reuse field for PNG srcSet
    fallbackSrc,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  };
}
