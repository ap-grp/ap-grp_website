# Media content

Each article has a self-contained folder:

```text
article-slug/
  index.ts
  image.jpg
```

To add an article, copy an existing folder, update the entry and image, then import it and add it to the ordered `articles` array in `media/index.ts`.

Chinese titles, summaries, and categories are stored beside their English fields. Article bodies intentionally remain in English only.
