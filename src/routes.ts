import { isMediaTag, type MediaTag } from "./content/media/types";

export type PageState =
  | { id: "home" }
  | { id: "story" }
  | {
      id: "projects";
      filter?: string;
    }
  | { id: "project-detail"; slug: string }
  | { id: "people" }
  | {
      id: "person-detail";
      slug: string;
    }
  | { id: "services" }
  | { id: "media"; tag?: MediaTag }
  | {
      id: "media-detail";
      slug: string;
    }
  | { id: "careers" }
  | { id: "contact" };

const basePath = import.meta.env.BASE_URL.replace(/\/+$/, "");

const withBasePath = (path: string) => `${basePath}${path}` || "/";

const decodePathSegment = (segment: string) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

export const pageToUrl = (page: PageState) => {
  switch (page.id) {
    case "home":
      return withBasePath("/");
    case "story":
      return withBasePath("/our-story/");
    case "projects": {
      const query = page.filter ? `?filter=${encodeURIComponent(page.filter)}` : "";
      return `${withBasePath("/projects/")}${query}`;
    }
    case "project-detail":
      return withBasePath(`/projects/${encodeURIComponent(page.slug)}/`);
    case "people":
      return withBasePath("/people/");
    case "person-detail":
      return withBasePath(`/people/${encodeURIComponent(page.slug)}/`);
    case "services":
      return withBasePath("/services/");
    case "media": {
      const query = page.tag ? `?tag=${encodeURIComponent(page.tag)}` : "";
      return `${withBasePath("/media/")}${query}`;
    }
    case "media-detail":
      return withBasePath(`/media/${encodeURIComponent(page.slug)}/`);
    case "careers":
      return withBasePath("/careers/");
    case "contact":
      return withBasePath("/contact/");
  }
};

export const locationToPage = (
  location: Pick<Location, "pathname" | "search">,
): PageState => {
  let pathname = location.pathname;

  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length);
  }

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map(decodePathSegment);
  const query = new URLSearchParams(location.search);

  if (segments.length === 0) return { id: "home" };

  if (segments.length === 1) {
    switch (segments[0]) {
      case "our-story":
        return { id: "story" };
      case "projects":
        return { id: "projects", filter: query.get("filter") || undefined };
      case "people":
        return { id: "people" };
      case "services":
        return { id: "services" };
      case "media":
        const tag = query.get("tag");
        return { id: "media", tag: tag && isMediaTag(tag) ? tag : undefined };
      case "careers":
        return { id: "careers" };
      case "contact":
        return { id: "contact" };
    }
  }

  if (segments.length === 2) {
    const [directory, slug] = segments;

    if (directory === "projects") return { id: "project-detail", slug };
    if (directory === "people") return { id: "person-detail", slug };
    if (directory === "media") return { id: "media-detail", slug };
  }

  return { id: "home" };
};
