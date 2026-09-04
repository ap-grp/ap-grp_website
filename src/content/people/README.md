# People content

Each person has a self-contained folder:

```text
person-slug/
  index.ts
  portrait.jpg
```

To add a person, copy an existing folder, update the entry and portrait, then import it and add it to the ordered `people` array in `people/index.ts`.

Keep each English and Chinese translation together:

```ts
name: { en: 'english name', zh: '中文姓名' },
qualifications: [
  { en: 'english qualification', zh: '中文资质' },
],
```

The portrait may use another browser-supported image format, but its import in the person's `index.ts` must match the filename.
