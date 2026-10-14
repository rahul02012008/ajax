/**
 * SEO & Performance Image Optimization Utilities
 * 
 * Provides automated WebP compression, dimension preservation,
 * and responsive srcSet generation to optimize Core Web Vitals (LCP, CLS)
 * and technical On-Page SEO.
 */

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'auto';
  fit?: 'crop' | 'clip' | 'scale';
}

/**
 * Transforms an image URL (such as Unsplash) with strict WebP compression
 * and resolution parameters to minimize byte payload while retaining crisp
 * architectural detail.
 */
export function getCompressedImageUrl(
  url: string,
  options: ImageOptimizationOptions = {}
): string {
  if (!url) return '';

  const {
    width,
    height,
    quality = 75, // Optimal compression ratio for high-fidelity photography
    format = 'webp',
    fit = 'crop',
  } = options;

  try {
    // Check if URL is from Unsplash or supports standard URL parameter optimization
    if (url.includes('images.unsplash.com')) {
      const urlObj = new URL(url);
      urlObj.searchParams.set('auto', 'format');
      urlObj.searchParams.set('fit', fit);
      urlObj.searchParams.set('fm', format);
      urlObj.searchParams.set('q', quality.toString());

      if (width) {
        urlObj.searchParams.set('w', width.toString());
      }
      if (height) {
        urlObj.searchParams.set('h', height.toString());
      }

      return urlObj.toString();
    }
  } catch {
    // Return original if URL parsing fails
    return url;
  }

  return url;
}

/**
 * Generates standard responsive srcSet string for modern responsive images.
 * This instructs mobile browsers to load lightweight ~40-60KB compressed assets
 * while desktop displays receive full-width high-resolution images.
 */
export function getResponsiveImageSrcSet(
  url: string,
  widths: number[] = [480, 800, 1200, 1600],
  quality: number = 75
): string {
  if (!url || !url.includes('images.unsplash.com')) {
    return '';
  }

  return widths
    .map((w) => {
      const compressedUrl = getCompressedImageUrl(url, {
        width: w,
        quality,
        format: 'webp',
      });
      return `${compressedUrl} ${w}w`;
    })
    .join(', ');
}
