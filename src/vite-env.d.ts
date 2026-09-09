/// <reference types="vite/client" />

declare module "*?responsive" {
  const image: import("./types/images").ResponsiveImageData;
  export default image;
}
