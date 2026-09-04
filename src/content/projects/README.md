# Project content

Each project lives in its own folder and contains its text data and images:

```text
project-slug/
  index.ts
  images/
    cover.jpg
    gallery-01.jpg
    gallery-02.jpg
```

## Add a project

1. Copy an existing project folder and give it a unique name. The current convention is `PROJECTCODE_ProjectName_Country`.
2. Edit the fields in its `index.ts`. All visitor-facing text uses `{ en, zh }`.
   Set `type` to an array of one or more valid project types. These values provide
   both the detail-page type text and the filters/tags on the projects page.
   Multiple values display as a comma-separated list.
   Set `status` to one of the canonical statuses defined by `ProjectStatus`; its
   English and Chinese display labels are supplied automatically. Use `''` to
   hide the status row when the status is unknown.
   Set `gfa` to the gross floor area using the format `123,456 sqm`.
   Set `estimatedCost` to the estimated project cost, including the currency. Leave it as an empty string to hide it.
   Add bilingual entries to `awards`; leave it as `[]` to hide the awards section.
3. Add `images/cover.jpg` and any gallery files. Until images are added, keep `images: []`; the site will show an empty image area without making a broken request.
4. Add or remove image imports and update the ordered `images` array. The first image is the cover. In the detail slideshow, the first gallery image appears first and the cover appears second.
5. Import the project and add it to the ordered `projects` array in `src/content/projects/index.ts`.

## Remove a project

1. Remove its import and entry from `src/content/projects/index.ts`.
2. Remove its slug from any other project's `related` array.
3. Delete its folder.

Valid types and statuses are defined by `ProjectTag` and `ProjectStatus` in
`src/content/types.ts`.
