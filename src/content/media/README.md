# Media content

Each article has a self-contained folder:

```text
article-slug/
  index.ts
  image.jpg
```

To add an article, copy an existing folder, update the entry and image, then import it and add it to the ordered `articles` array in `media/index.ts`.

Assign exactly one `MediaTag` to the article's `tag` field. Valid tags and their
centralized English and Chinese labels are defined in `media/types.ts`: `news`,
`awards`, `press`, `publications`, `events`, `exhibitions`, and `research`.

Store article dates in `dd.mm.yyyy` format so they display consistently in every
language.

Chinese titles and summaries are stored beside their English fields. Article bodies
intentionally remain in English only.
