import { useState, useEffect } from 'react';
import { getOptimizedUrls } from '@/lib/responsive-image';

interface ResponsiveBackgroundProps {
  /** The original image path relative to images folder (e.g., 'gallery/redamancy/mievatho_NH1525.jpg') */
  imagePath: string;
  /** The original image import as fallback (optional — will use empty string if no optimized variants found) */
  fallbackSrc?: string;
  /** Child elements */
  children?: React.ReactNode;
  /** Additional classes */
  className?: string;
  /** Background position (default: 'center') */
  backgroundPosition?: string;
  /** Additional inline style */
  style?: React.CSSProperties;
}

/**
 * Renders a div with a responsive background-image that picks the right
 * size based on current viewport width.
 */
export default function ResponsiveBackground({
  imagePath,
  fallbackSrc,
  children,
  className,
  backgroundPosition = 'center',
  style,
}: ResponsiveBackgroundProps) {
  const [bgUrl, setBgUrl] = useState<string>(() => {
    const urls = getOptimizedUrls(imagePath);
    const width = window.innerWidth * (window.devicePixelRatio || 1);

    if (width <= 828 && urls.sm) {
      return urls.sm;
    } else if (width <= 1536 && urls.md) {
      return urls.md;
    } else if (urls.lg) {
      return urls.lg;
    } else if (urls.md) {
      return urls.md;
    } else if (urls.sm) {
      return urls.sm;
    }
    return fallbackSrc || '';
  });

  useEffect(() => {
    const handleResize = () => {
      const urls = getOptimizedUrls(imagePath);
      const width = window.innerWidth * (window.devicePixelRatio || 1);

      if (width <= 828 && urls.sm) {
        setBgUrl(urls.sm);
      } else if (width <= 1536 && urls.md) {
        setBgUrl(urls.md);
      } else if (urls.lg) {
        setBgUrl(urls.lg);
      } else if (urls.md) {
        setBgUrl(urls.md);
      } else if (urls.sm) {
        setBgUrl(urls.sm);
      } else {
        setBgUrl(fallbackSrc || '');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [imagePath, fallbackSrc]);

  return (
    <div
      className={className}
      style={{
        ...style,
        backgroundImage: `url(${bgUrl})`,
        backgroundPosition,
      }}
    >
      {children}
    </div>
  );
}
