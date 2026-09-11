import { articles } from "../content/media";
import { mediaTagLabels } from "../content/media/types";
import { people } from "../content/people";
import { projects } from "../content/projects";
import { projectTypeLabels } from "../content/types";
import type { Lang } from "../context/lang";
import type { PageState } from "../routes";
import type { ResponsiveImageData } from "../types/images";
import ResponsiveImage from "./ResponsiveImage";

interface SearchEntry {
  key: string;
  page: PageState;
  title: Record<Lang, string>;
  type: Record<Lang, string>;
  image?: ResponsiveImageData;
  keywords: string[];
}

export interface SiteSearchResult {
  key: string;
  page: PageState;
  title: string;
  type: string;
  image?: ResponsiveImageData;
}

interface SiteSearchResultsProps {
  query: string;
  lang: Lang;
  compact?: boolean;
  floating?: boolean;
  onSelect: (page: PageState) => void;
}

const searchEntries: SearchEntry[] = [
  ...projects.map((project) => ({
    key: `project-${project.slug}`,
    page: { id: "project-detail", slug: project.slug } as const,
    title: project.title,
    type: { en: "project", zh: "项目" },
    image: project.images[0],
    keywords: [
      project.title.en,
      project.title.zh,
      project.location.en,
      project.location.zh,
      project.year,
      ...project.type.flatMap((type) => [
        projectTypeLabels[type].en,
        projectTypeLabels[type].zh,
      ]),
    ],
  })),
  ...articles.map((article) => ({
    key: `media-${article.slug}`,
    page: { id: "media-detail", slug: article.slug } as const,
    title: { en: article.title, zh: article.zhTitle },
    type: { en: "media", zh: "媒体" },
    image: article.imageUrl,
    keywords: [
      article.title,
      article.zhTitle,
      article.summary,
      article.zhSummary,
      article.date,
      mediaTagLabels[article.tag].en,
      mediaTagLabels[article.tag].zh,
    ],
  })),
  ...people.map((person) => ({
    key: `person-${person.slug}`,
    page: { id: "person-detail", slug: person.slug } as const,
    title: person.name,
    type: { en: "person", zh: "团队成员" },
    image: person.imageUrl,
    keywords: [
      person.name.en,
      person.name.zh,
      person.position.en,
      person.position.zh,
      person.office?.en ?? "",
      person.office?.zh ?? "",
    ],
  })),
];

const normalize = (value: string) => value.trim().toLocaleLowerCase();

export const getSiteSearchResults = (
  query: string,
  lang: Lang,
  limit = 10,
): SiteSearchResult[] => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return [];

  return searchEntries
    .map((entry, order) => {
      const localizedTitle = entry.title[lang];
      const alternateLang = lang === "en" ? "zh" : "en";
      const alternateTitle = entry.title[alternateLang];
      const normalizedTitle = normalize(localizedTitle);
      const normalizedAlternateTitle = normalize(alternateTitle);
      const titleMatch = normalizedTitle.includes(normalizedQuery);
      const alternateTitleMatch = normalizedAlternateTitle.includes(normalizedQuery);
      const keywordMatch = [...entry.keywords, entry.type.en, entry.type.zh].some((keyword) =>
        normalize(keyword).includes(normalizedQuery),
      );

      return {
        entry,
        order,
        matches: titleMatch || alternateTitleMatch || keywordMatch,
        rank: normalizedTitle.startsWith(normalizedQuery)
          ? 0
          : normalizedAlternateTitle.startsWith(normalizedQuery)
            ? 1
            : titleMatch
              ? 2
              : alternateTitleMatch
                ? 3
                : 4,
      };
    })
    .filter(({ matches }) => matches)
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .slice(0, limit)
    .map(({ entry }) => ({
      key: entry.key,
      page: entry.page,
      title: entry.title[lang],
      type: entry.type[lang],
      image: entry.image,
    }));
};

export default function SiteSearchResults({
  query,
  lang,
  compact = false,
  floating = false,
  onSelect,
}: SiteSearchResultsProps) {
  const hasQuery = normalize(query).length > 0;
  const results = getSiteSearchResults(query, lang);

  if (!hasQuery) return null;

  return (
    <div
      role="region"
      aria-live="polite"
      aria-label={lang === "en" ? "search results" : "搜索结果"}
      className="site-search-panel"
      style={{
        border: floating ? "1px solid rgba(222,226,230,0.8)" : "none",
        borderTop: "1px solid rgba(222,226,230,0.8)",
        backgroundColor: floating ? "rgba(255,255,255,0.86)" : "rgba(248,249,250,0.72)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow: floating ? "0 18px 48px rgba(33,37,41,0.14)" : "none",
        maxHeight: compact ? "min(42vh, 320px)" : "min(55vh, 480px)",
        overflowY: "auto",
        animation: "searchPanelIn 0.32s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      {results.length > 0 ? (
        results.map((result, index) => (
          <button
            key={result.key}
            type="button"
            className="site-search-result"
            onClick={() => onSelect(result.page)}
            style={{
              display: "grid",
              gridTemplateColumns: `${compact ? "40px" : "48px"} minmax(0, 1fr) auto`,
              alignItems: "center",
              gap: compact ? "0.75rem" : "0.9rem",
              width: "100%",
              padding: compact ? "0.7rem 1.25rem" : "0.7rem",
              border: "none",
              borderBottom: "1px solid rgba(222,226,230,0.72)",
              backgroundColor: "transparent",
              color: "#212529",
              cursor: "pointer",
              textAlign: "left",
              fontFamily: "inherit",
              transition: "background-color 0.2s ease, color 0.2s ease",
              animation: `searchResultIn 0.34s cubic-bezier(0.16, 1, 0.3, 1) both ${Math.min(index, 6) * 0.035}s`,
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: compact ? "40px" : "48px",
                height: compact ? "40px" : "48px",
                overflow: "hidden",
                backgroundColor: "rgba(180,144,110,0.18)",
              }}
            >
              {result.image && (
                <ResponsiveImage
                  src={result.image}
                  alt=""
                  sizes={compact ? "40px" : "48px"}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </span>
            <span
              style={{
                minWidth: 0,
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: compact ? "0.76rem" : "0.8rem",
                  lineHeight: 1.4,
                  letterSpacing: "0.025em",
                }}
              >
                {result.title}
              </span>
            </span>
            <span
              style={{
                color: "#b4906e",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
              }}
            >
              {result.type}
            </span>
          </button>
        ))
      ) : (
        <p
          style={{
            padding: compact ? "1rem 1.25rem" : "1.25rem",
            color: "#9AA3AC",
            fontSize: "0.72rem",
            letterSpacing: "0.05em",
          }}
        >
          {lang === "en" ? "no results found" : "未找到结果"}
        </p>
      )}
    </div>
  );
}
