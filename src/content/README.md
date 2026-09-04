# Site content

Visitor-facing collections live here so they can be edited without changing page components.

- `projects/` — one folder per project, including its gallery images
- `people/` — one folder per person, containing `index.ts` and a portrait image
- `media/` — one folder per article, containing `index.ts` and its feature image
- `services/` — slideshow text in `index.ts` and all service images under `images/`
- `home/images/` — Home hero slideshow and contact CTA images
- `our-story/images/` — Our Story hero and full-width section images
- `jobs/` — current vacancies in `index.ts` and Jobs page images under `images/`
- `offices/index.ts` — Contact details plus Our Story map coordinates, layout offsets, and bilingual pin labels

Keep English and Chinese fields together when editing or adding content. Array order controls display order for projects, people, media articles, services, job listings, and offices.

## Images

Keep original JPG, JPEG, and PNG files inside the relevant `src/content/` folder and import them normally in that section's `index.ts`. Vite automatically creates responsive AVIF and WebP variants when the development server or production build uses the image. Generated files are cached under `.cache/responsive-images/` and are not committed; replacing a source image regenerates only that image's variants. SVG files and assets outside `src/content/` are not processed.

Do not resize source images manually. The pipeline creates widths up to 480, 800, 1200, 1600, and 2400 pixels, includes the original width when it is smaller than the next target, and never upscales beyond the source dimensions.

To add a person or article, copy an existing folder, edit its `index.ts`, replace the adjacent image, then import the entry and add it to the ordered collection array in that section's top-level `index.ts`.

The first office marked `isHeadquarters: true` is displayed as the main Contact location. All remaining offices are displayed in the office grid. An office with `mapPin` data is also displayed on the Our Story presence map.
