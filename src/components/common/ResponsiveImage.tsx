import type { ImgHTMLAttributes } from 'react';
import manifest from '../../constants/responsiveImages.json';

export function ResponsiveImage({ src = '', sizes = '(max-width: 768px) 100vw, 50vw', loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const item = manifest[src as keyof typeof manifest];
  if (!item) return <img src={src} loading={loading} decoding="async" {...props} />;
  return <picture>
    <source type="image/avif" srcSet={item.avif} sizes={sizes} />
    <source type="image/webp" srcSet={item.webp} sizes={sizes} />
    <img src={src} width={item.width} height={item.height} loading={loading} decoding="async" {...props} />
  </picture>;
}
