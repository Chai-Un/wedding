import { getResponsiveImage } from '@/lib/responsive-image';

interface ResponsiveImageProps {
  /** The original image import path (e.g., 'gallery/redamancy/mievatho_NH6309.jpg') */
  src: string;
  alt: string;
  className?: string;
  /** Custom sizes attribute (default: responsive) */
  sizes?: string;
  /** Loading strategy (default: 'lazy') */
  loading?: 'lazy' | 'eager';
  /** Object position for object-cover (e.g., '50% 80%') */
  objectPosition?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional style */
  style?: React.CSSProperties;
  /** Whether the original image has transparency (PNG) — uses WebP+PNG instead of WebP+JPG */
  alpha?: boolean;
  /** Allow native img attributes like draggable, aria-hidden */
  draggable?: boolean;
  'aria-hidden'?: boolean | 'true' | 'false';
  /** Called when the image finishes loading */
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement>) => void;
}

/**
 * Responsive image component that renders a <picture> element with
 * WebP sources and JPG fallback, with proper srcSet for device sizes.
 *
 * Falls back to a plain <img> if no optimized variants are found.
 */
export default function ResponsiveImage({
  src,
  alt,
  className,
  sizes,
  loading = 'lazy',
  objectPosition,
  onClick,
  style,
  alpha = false,
  draggable,
  'aria-hidden': ariaHidden,
  onLoad,
}: ResponsiveImageProps) {
  // Auto-detect alpha from .png extension, or use explicit prop
  const isAlpha = alpha || /\.png$/i.test(src);
  const responsive = getResponsiveImage(src);

  // Fallback: no optimized variants found, render plain img
  if (!responsive) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        onClick={onClick}
        onLoad={onLoad}
        draggable={draggable}
        aria-hidden={ariaHidden}
        style={{ ...style, objectPosition }}
      />
    );
  }

  const imgStyle: React.CSSProperties = {
    ...style,
    ...(objectPosition ? { objectPosition } : {}),
  };

  const fallbackMimeType = isAlpha ? 'image/png' : 'image/jpeg';

  return (
    <picture>
      {/* WebP source — modern browsers (with alpha for transparent PNGs) */}
      {responsive.webpSrcSet && (
        <source
          type="image/webp"
          srcSet={responsive.webpSrcSet}
          sizes={sizes || responsive.sizes}
        />
      )}
      {/* JPG/PNG fallback source */}
      {responsive.jpgSrcSet && (
        <source
          type={fallbackMimeType}
          srcSet={responsive.jpgSrcSet}
          sizes={sizes || responsive.sizes}
        />
      )}
      {/* Fallback img element */}
      <img
        src={responsive.fallbackSrc}
        alt={alt}
        className={className}
        loading={loading}
        onClick={onClick}
        onLoad={onLoad}
        draggable={draggable}
        aria-hidden={ariaHidden}
        style={imgStyle}
      />
    </picture>
  );
}
