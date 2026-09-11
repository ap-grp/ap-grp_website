import fs from "node:fs";
import path from "node:path";

import type { Plugin } from "vite";

const projectRoot = path.resolve(__dirname, "..");

const pageDirectories = [
  "our-story",
  "projects",
  "people",
  "services",
  "media",
  "careers",
  "contact",
];

const readSlugs = (contentDirectory: string) =>
  fs
    .readdirSync(contentDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const contentFile = path.join(contentDirectory, entry.name, "index.ts");
      if (!fs.existsSync(contentFile)) return [];

      const source = fs.readFileSync(contentFile, "utf8");
      const slug = source.match(/\bslug:\s*["']([^"']+)["']/)?.[1];
      return slug && /^[a-zA-Z0-9_-]+$/.test(slug) ? [slug] : [];
    });

export function staticPageDirectories(): Plugin {
  return {
    name: "static-page-directories",

    writeBundle(outputOptions) {
      const detailDirectories = (["projects", "media", "people"] as const).flatMap(
        (section) =>
          readSlugs(path.resolve(projectRoot, `src/content/${section}`)).map(
            (slug) => `${section}/${slug}`,
        ),
      );
      const outputDirectory = path.resolve(projectRoot, outputOptions.dir ?? "dist");
      const rootIndex = path.join(outputDirectory, "index.html");

      for (const directory of [...pageDirectories, ...detailDirectories]) {
        const routeDirectory = path.join(outputDirectory, directory);
        fs.mkdirSync(routeDirectory, { recursive: true });
        fs.copyFileSync(rootIndex, path.join(routeDirectory, "index.html"));
      }
    },
  };
}
