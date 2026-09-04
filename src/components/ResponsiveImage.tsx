import type { ImgHTMLAttributes } from 'react'
import { getResponsiveImage } from '../lib/responsiveImages'

interface ResponsiveImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'height' | 'src' | 'srcSet' | 'width'> {
  src: string
  sizes: string
}

function createSrcSet(variants: Array<{ src: string; width: number }>) {
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(', ')
}

export default function ResponsiveImage({
  src,
  sizes,
  alt = '',
  loading = 'lazy',
  decoding = 'async',
  ...imageProps
}: ResponsiveImageProps) {
  const responsiveImage = getResponsiveImage(src)

  if (!responsiveImage) {
    return (
      <img
        {...imageProps}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
      />
    )
  }

  return (
    <picture>
      <source
        type="image/avif"
        srcSet={createSrcSet(responsiveImage.avif)}
        sizes={sizes}
      />
      <source
        type="image/webp"
        srcSet={createSrcSet(responsiveImage.webp)}
        sizes={sizes}
      />
      <img
        {...imageProps}
        src={responsiveImage.src}
        alt={alt}
        width={responsiveImage.width}
        height={responsiveImage.height}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
      />
    </picture>
  )
}
