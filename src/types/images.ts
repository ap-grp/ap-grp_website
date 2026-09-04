export interface ResponsiveImageVariant {
  src: string
  width: number
}

export interface ResponsiveImageData {
  src: string
  width: number
  height: number
  avif: ResponsiveImageVariant[]
  webp: ResponsiveImageVariant[]
}
