interface ResponsiveImageVariant {
  src: string;
  width: number;
}

export interface ResponsiveImageData {
  src: string;
  width: number;
  height: number;
  webp: ResponsiveImageVariant[];
}
