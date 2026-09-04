import { useState, type ImgHTMLAttributes, type SyntheticEvent } from 'react'
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
  onLoad,
  ...imageProps
}: ResponsiveImageProps) {
  const responsiveImage = getResponsiveImage(src)
  const [loadedSource, setLoadedSource] = useState<string | null>(null)
  const softlyReveal = loading === 'eager'

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSource(src)
    onLoad?.(event)
  }

  if (!responsiveImage) {
    return (
      <img
        {...imageProps}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
      />
    )
  }

  return (
    <picture
      className={
        softlyReveal
          ? `soft-image-reveal${loadedSource === src ? ' is-loaded' : ''}`
          : undefined
      }
    >
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
        onLoad={handleLoad}
      />
    </picture>
  )
}
