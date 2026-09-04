import type { ResponsiveImageData } from '../types/images'

const originalImageModules = import.meta.glob('/src/content/**/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const responsiveImageModules = import.meta.glob('/src/content/**/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
  query: '?responsive',
}) as Record<string, ResponsiveImageData>

const responsiveImagesBySource = new Map<string, ResponsiveImageData>()

for (const [modulePath, sourceUrl] of Object.entries(originalImageModules)) {
  const responsiveImage = responsiveImageModules[modulePath]
  if (responsiveImage) responsiveImagesBySource.set(sourceUrl, responsiveImage)
}

export function getResponsiveImage(sourceUrl: string) {
  return responsiveImagesBySource.get(sourceUrl)
}
