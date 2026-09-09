import { useCallback, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";
import type { ResponsiveImageData } from "../types/images";

interface ResponsiveImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "height" | "src" | "srcSet" | "width"
> {
  src: ResponsiveImageData;
  sizes: string;
}

function createSrcSet(variants: Array<{ src: string; width: number }>) {
  return variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");
}

export default function ResponsiveImage({
  src,
  sizes,
  alt = "",
  loading = "lazy",
  decoding = "async",
  onLoad,
  ...imageProps
}: ResponsiveImageProps) {
  const [loadedSource, setLoadedSource] = useState<string | null>(null);
  const softlyReveal = loading === "eager";
  const fillsContainer = imageProps.style?.position === "absolute";

  const revealCachedImage = useCallback(
    (image: HTMLImageElement | null) => {
      if (image?.complete && image.naturalWidth > 0) {
        setLoadedSource(src.src);
      }
    },
    [src.src],
  );

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoadedSource(src.src);
    onLoad?.(event);
  };

  return (
    <picture
      className={
        softlyReveal
          ? `soft-image-reveal${loadedSource === src.src ? " is-loaded" : ""}`
          : undefined
      }
      style={
        fillsContainer ? { position: "absolute", inset: imageProps.style?.inset ?? 0 } : undefined
      }
    >
      <source type="image/webp" srcSet={createSrcSet(src.webp)} sizes={sizes} />
      <img
        ref={revealCachedImage}
        {...imageProps}
        src={src.src}
        alt={alt}
        width={src.width}
        height={src.height}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
      />
    </picture>
  );
}
