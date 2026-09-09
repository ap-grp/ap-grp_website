import { useState } from "react";
import type { PageState } from "../App";
import FadeSection from "../components/FadeSection";
import ResponsiveImage from "../components/ResponsiveImage";
import { projects } from "../content/projects";
import { projectTypeLabels, type ProjectTag } from "../content/types";
import { useLang } from "../context/lang";

type ProjectFilter = "all" | ProjectTag;

const filters: { key: ProjectFilter; en: string; zh: string }[] = [
  { key: "all", en: "all", zh: "全部" },

  ...Object.entries(projectTypeLabels).map(([key, label]) => ({
    key: key as ProjectTag,

    ...label,
  })),
];

const isProjectFilter = (value?: string): value is ProjectFilter =>
  filters.some((filter) => filter.key === value);

interface Props {
  navigate: (p: PageState) => void;

  initialFilter?: string;
}

export default function Projects({ navigate, initialFilter }: Props) {
  const { lang } = useLang();

  const zh = lang === "zh";

  const [active, setActive] = useState<ProjectFilter>(
    isProjectFilter(initialFilter) ? initialFilter : "all",
  );

  const filtered = active === "all" ? projects : projects.filter((p) => p.type.includes(active));

  return (
    <div style={{ paddingTop: "64px" }}>
      {/* Header */}
      <div
        style={{
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem) clamp(2rem,4vw,3rem)",

          borderBottom: "1px solid #dee2e6",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#b4906e",
              marginBottom: "0.75rem",
            }}
          >
            {zh ? "项目" : "projects"}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              marginBottom: "2.5rem",
            }}
          >
            {zh ? "我们的作品" : "our work"}
          </h1>

          {/* Filters */}
          <div style={{ display: "flex", gap: "0.25rem", flexWrap: "wrap" }}>
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                style={{
                  padding: "0.5rem 1.1rem",

                  border: `1px solid ${active === f.key ? "#212529" : "#dee2e6"}`,

                  backgroundColor: active === f.key ? "#212529" : "transparent",

                  color: active === f.key ? "#ffffff" : "#9AA3AC",

                  cursor: "pointer",

                  fontSize: "0.65rem",

                  letterSpacing: "0.08em",

                  fontFamily: "inherit",

                  transition: "all 0.2s ease",
                }}
              >
                {zh ? f.zh : f.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section
        style={{
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,5vw,6rem) clamp(5rem,9vw,8rem)",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          {filtered.length === 0 ? (
            <p
              style={{
                color: "#9AA3AC",
                fontSize: "0.85rem",
                letterSpacing: "0.04em",
                padding: "3rem 0",
              }}
            >
              {zh ? "该分类下暂无项目。" : "no projects found in this category."}
            </p>
          ) : (
            <div
              className="projects-grid"
              style={{
                display: "grid",

                gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",

                gap: "2.5rem 2rem",
              }}
            >
              {filtered.map((p, i) => (
                <FadeSection key={p.slug} delay={(i % 3) * 0.06}>
                  <button
                    onClick={() => navigate({ id: "project-detail", slug: p.slug })}
                    style={{
                      display: "block",
                      width: "100%",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      textAlign: "left",
                    }}
                    aria-label={`${zh ? "查看" : "view"} ${p.title[lang]}`}
                  >
                    <div
                      className="img-zoom"
                      style={{
                        aspectRatio: "1/1",
                        backgroundColor: "#e9ecef",
                        overflow: "hidden",
                      }}
                    >
                      {p.images[0] && (
                        <ResponsiveImage
                          src={p.images[0]}
                          alt={p.title[lang]}
                          sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1200px) 50vw, 520px"
                          loading="eager"
                          fetchPriority={i < 2 ? "high" : "auto"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      )}
                    </div>
                    <div style={{ paddingTop: "1.1rem" }}>
                      <p
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 400,
                          letterSpacing: "0.01em",
                          marginBottom: "0.3rem",
                          color: "#212529",
                        }}
                      >
                        {p.title[lang]}
                      </p>
                      <p
                        style={{
                          fontSize: "0.72rem",
                          color: "#9AA3AC",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {p.location[lang]}
                      </p>
                    </div>
                  </button>
                </FadeSection>
              ))}
            </div>
          )}
        </div>
      </section>
      <style>{`
        @media (max-width: 767px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
