import { useEffect, useRef, useState } from "react";
import type { PageState } from "../App";
import FadeSection from "../components/FadeSection";
import ResponsiveImage from "../components/ResponsiveImage";
import { homeImages } from "../content/home";
import { featuredArticle } from "../content/media/featured";
import { mediaTagLabels } from "../content/media/types";
import { latestProjects } from "../content/projects/latest";
import { useLang } from "../context/lang";

const HERO_IMAGES = homeImages.hero;

const SLIDE_INTERVAL = 5000; // ms between slides

interface Props {
  navigate: (p: PageState) => void;
}

function useFadeIn(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;

    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          obs.unobserve(entry.target);
        }
      },

      { threshold: 0.15 },
    );

    obs.observe(el);

    return () => obs.disconnect();
  }, [ref]);
}

export default function Home({ navigate }: Props) {
  const { lang } = useLang();

  const zh = lang === "zh";

  const introRef = useRef<HTMLDivElement>(null);

  useFadeIn(introRef);

  const [heroIndex, setHeroIndex] = useState(() =>
    HERO_IMAGES.length > 0 ? Math.floor(Math.random() * HERO_IMAGES.length) : 0,
  );

  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused || HERO_IMAGES.length <= 1) return;

    const id = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_IMAGES.length), SLIDE_INTERVAL);

    return () => clearInterval(id);
  }, [heroPaused]);

  const stats = zh
    ? [
        { value: "20+", label: "年执业经验" },

        { value: "150+", label: "已完成项目" },

        { value: "14", label: "个国家" },

        { value: "7", label: "个办事处" },
      ]
    : [
        { value: "30+", label: "years of practice" },

        { value: "200+", label: "projects completed" },

        { value: "14", label: "countries reached" },

        { value: "7", label: "offices" },
      ];

  return (
    <div>
      {/* Hero */}
      <div
        style={{
          position: "relative",
          height: "100svh",
          minHeight: "600px",
          overflow: "hidden",
          backgroundColor: "#212529",
        }}
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        {/* Crossfade slideshow */}
        {HERO_IMAGES.map((src, i) => (
          <ResponsiveImage
            key={src.src}
            src={src}
            alt=""
            sizes="100vw"
            loading={i === heroIndex ? "eager" : "lazy"}
            fetchPriority={i === heroIndex ? "high" : "low"}
            aria-hidden={i !== heroIndex}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",

              objectFit: "cover",

              opacity: i === heroIndex ? 0.65 : 0,

              transition: "opacity 1.4s ease",

              pointerEvents: "none",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)",
          }}
        />

        <div
          style={{
            position: "absolute",

            bottom: "8%",

            left: "clamp(2rem,5vw,6rem)",

            right: "2rem",

            maxWidth: "1200px",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.55)",
              marginBottom: "1.25rem",
            }}
          >
            est. 1997 · singapore
          </p>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 5.5rem)",

              fontWeight: 300,

              lineHeight: 1.15,

              color: "#ffffff",

              letterSpacing: "-0.01em",

              marginBottom: "1.5rem",
            }}
          >
            {zh ? (
              <>
                以目的
                <br />
                设计场所
              </>
            ) : (
              <>
                designing places
                <br />
                with purpose
              </>
            )}
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.65)",
              maxWidth: "480px",
              letterSpacing: "0.02em",
            }}
          >
            {zh
              ? "a+pgrp是一家建筑与设计事务所，在建筑、室内设计、景观、城市规划与开发领域打造深思熟虑的人居环境。"
              : "a+pgrp is an architecture and design practice creating thoughtful environments across architecture, interiors, landscape, urban planning and development."}
          </p>

          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate({ id: "projects" })}
              style={{
                padding: "0.75rem 1.75rem",

                backgroundColor: "#ffffff",

                color: "#212529",

                border: "none",

                cursor: "pointer",

                fontSize: "0.7rem",

                letterSpacing: "0.12em",

                fontFamily: "inherit",

                transition: "background-color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b4906e")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
            >
              {zh ? "查看项目" : "view projects"}
            </button>
            <button
              onClick={() => navigate({ id: "story" })}
              style={{
                padding: "0.75rem 1.75rem",

                backgroundColor: "transparent",

                color: "#ffffff",

                border: "1px solid rgba(255,255,255,0.4)",

                cursor: "pointer",

                fontSize: "0.7rem",

                letterSpacing: "0.12em",

                fontFamily: "inherit",

                transition: "border-color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")}
            >
              {zh ? "关于我们" : "our story"}
            </button>
          </div>
        </div>

        {/* Slide indicators */}
        {HERO_IMAGES.length > 1 && (
          <div
            style={{
              position: "absolute",

              bottom: "clamp(1.5rem,3vw,2.5rem)",

              right: "clamp(2rem,5vw,6rem)",

              display: "flex",

              gap: "6px",

              alignItems: "center",

              zIndex: 2,
            }}
          >
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                aria-label={`slide ${i + 1}`}
                style={{
                  height: "2px",

                  width: i === heroIndex ? "28px" : "8px",

                  backgroundColor: i === heroIndex ? "#ffffff" : "rgba(255,255,255,0.35)",

                  border: "none",

                  cursor: "pointer",

                  padding: 0,

                  transition: "width 0.4s ease, background-color 0.4s ease",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Intro */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",

              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",

              gap: "clamp(3rem, 6vw, 6rem)",

              alignItems: "start",
            }}
          >
            <FadeSection>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#b4906e",
                  marginBottom: "1.5rem",
                }}
              >
                {zh ? "关于 a+pgrp" : "about a+pgrp"}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 3rem)",

                  fontWeight: 300,

                  lineHeight: 1.3,

                  letterSpacing: "-0.01em",

                  color: "#212529",
                }}
              >
                {zh
                  ? "融合人、活动与场所，营造历久弥新的环境。"
                  : "fusing people, activity and place into enduring environments."}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  marginBottom: "1.5rem",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "优秀的设计始于对环境脉络、发展机遇与长远价值的深刻理解。我们融合建筑、城市规划、工程及设计等多元专业，以综合性的思维创造兼具创新、功能与技术品质的解决方案。每一个项目都体现我们对卓越设计的坚持，致力于营造经得起时间考验、回应社区需求的环境。"
                  : "thoughtful design begins with a clear understanding of context, opportunity, and long-term value. by integrating architecture, urban planning, engineering, and design, we deliver solutions that balance technical excellence with thoughtful innovation. every project reflects a commitment to creating environments that are enduring, functional, and responsive to the needs of their communities."}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  marginBottom: "2.5rem",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "近三十年来，我们与亚洲及世界各地的客户携手合作，完成了涵盖总体规划、城市发展及地标建筑等不同规模与类型的项目。秉持协作精神、专业诚信与可持续发展的理念，我们持续创造兼具实用性、适应性与长远价值的设计，为城市与社区的发展贡献深远影响。"
                  : "for nearly three decades, we have partnered with clients across asia and beyond to realise projects of every scale, from master plans to landmark developments. guided by collaboration, integrity, and sustainable thinking, we pursue design that is practical, adaptable, and built to create lasting value."}
              </p>
              <button
                onClick={() => navigate({ id: "story" })}
                style={{
                  background: "none",

                  border: "none",

                  cursor: "pointer",

                  padding: 0,

                  fontSize: "0.7rem",

                  letterSpacing: "0.1em",

                  color: "#212529",

                  fontFamily: "inherit",

                  display: "flex",

                  alignItems: "center",

                  gap: "0.5rem",

                  borderBottom: "1px solid #212529",

                  paddingBottom: "4px",
                }}
              >
                {zh ? "了解我们的故事" : "read our story"}
                <span>→</span>
              </button>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <div
        style={{
          borderTop: "1px solid #dee2e6",
          borderBottom: "1px solid #dee2e6",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          style={{
            maxWidth: "1560px",
            margin: "0 auto",
            padding: "0 clamp(2rem,5vw,6rem)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            }}
          >
            {stats.map((s, i) => (
              <div key={i} style={{ padding: "2.5rem 1rem", textAlign: "center" }}>
                <p
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.02em",
                    color: "#212529",
                    marginBottom: "0.4rem",
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    color: "#9AA3AC",
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected projects */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <FadeSection>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "3rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "#b4906e",
                    marginBottom: "0.75rem",
                  }}
                >
                  {zh ? "精选作品" : "selected work"}
                </p>
                <h2
                  style={{
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {zh ? "近期项目" : "recent projects"}
                </h2>
              </div>
              <button
                onClick={() => navigate({ id: "projects" })}
                style={{
                  background: "none",

                  border: "none",

                  cursor: "pointer",

                  padding: 0,

                  fontSize: "0.7rem",

                  letterSpacing: "0.1em",

                  color: "#9AA3AC",

                  fontFamily: "inherit",

                  display: "flex",

                  alignItems: "center",

                  gap: "0.5rem",

                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#212529")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#9AA3AC")}
              >
                {zh ? "全部项目 →" : "all projects →"}
              </button>
            </div>
          </FadeSection>

          <div
            className="home-projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "2rem",
            }}
          >
            {latestProjects.map((p, i) => (
              <FadeSection key={p.slug} delay={i * 0.1}>
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
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    )}
                  </div>
                  <div style={{ paddingTop: "1rem" }}>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 400,
                        letterSpacing: "0.01em",
                        marginBottom: "0.25rem",
                        color: "#212529",
                      }}
                    >
                      {p.title[lang]}
                    </p>
                    <p
                      style={{
                        fontSize: "0.7rem",
                        color: "#9AA3AC",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {p.location[lang]}
                    </p>
                  </div>
                </button>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      <section style={{ padding: "clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <FadeSection>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#b4906e",
                marginBottom: "3rem",
              }}
            >
              {zh ? "a+pgrp 最新动态" : "latest from a+pgrp"}
            </p>
          </FadeSection>
          <FadeSection delay={0.1}>
            <button
              aria-label={
                zh
                  ? `阅读文章：${featuredArticle.zhTitle}`
                  : `read article: ${featuredArticle.title}`
              }
              onClick={() => navigate({ id: "media-detail", slug: featuredArticle.slug })}
              style={{
                display: "block",
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                textAlign: "left",
              }}
            >
              <div
                className="home-article-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
                  gap: "3rem",
                  alignItems: "center",
                }}
              >
                <div
                  className="img-zoom"
                  style={{
                    aspectRatio: "16/10",
                    backgroundColor: "#e9ecef",
                    overflow: "hidden",
                  }}
                >
                  <ResponsiveImage
                    src={featuredArticle.imageUrl}
                    alt={zh ? featuredArticle.zhTitle : featuredArticle.title}
                    sizes="(max-width: 800px) calc(100vw - 4rem), 50vw"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.6rem",
                        letterSpacing: "0.12em",
                        color: "#b4906e",
                        textTransform: "uppercase",
                      }}
                    >
                      {mediaTagLabels[featuredArticle.tag][lang]}
                    </span>
                    <span
                      style={{
                        width: "24px",
                        height: "1px",
                        backgroundColor: "#dee2e6",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "#9AA3AC",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {featuredArticle.date}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "clamp(1.2rem, 2vw, 1.7rem)",

                      fontWeight: 300,

                      lineHeight: 1.35,

                      letterSpacing: "-0.01em",

                      marginBottom: "1.25rem",

                      color: "#212529",
                    }}
                  >
                    {zh ? featuredArticle.zhTitle : featuredArticle.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      lineHeight: 1.8,
                      color: "#495057",
                      letterSpacing: "0.02em",
                      marginBottom: "2rem",
                    }}
                  >
                    {zh ? featuredArticle.zhSummary : featuredArticle.summary}
                  </p>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.1em",
                      color: "#212529",
                      borderBottom: "1px solid #212529",
                      paddingBottom: "3px",
                    }}
                  >
                    {zh ? "阅读更多 →" : "read more →"}
                  </span>
                </div>
              </div>
            </button>
          </FadeSection>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        style={{
          position: "relative",

          overflow: "hidden",

          backgroundColor: "#212529",

          padding: "clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)",

          textAlign: "center",
        }}
      >
        <ResponsiveImage
          src={homeImages.contactCta}
          alt=""
          sizes="100vw"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.18,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeSection>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.4)",
                marginBottom: "1.5rem",
              }}
            >
              {zh ? "开始对话" : "start a conversation"}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 4vw, 4rem)",

                fontWeight: 300,

                color: "#ffffff",

                lineHeight: 1.2,

                letterSpacing: "-0.01em",

                marginBottom: "1.5rem",
              }}
            >
              {zh ? (
                <>
                  共同设计
                  <br />
                  卓越非凡之作
                </>
              ) : (
                <>
                  let us design something
                  <br />
                  extraordinary together
                </>
              )}
            </h2>
            <p
              style={{
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.5)",
                marginBottom: "3rem",
                letterSpacing: "0.02em",
              }}
            >
              {zh
                ? "我们欢迎各类规模与类型的项目咨询。"
                : "we welcome enquiries for projects of all scales and types."}
            </p>
            <button
              onClick={() => navigate({ id: "contact" })}
              style={{
                padding: "0.9rem 2.5rem",

                backgroundColor: "#b4906e",

                color: "#ffffff",

                border: "none",

                cursor: "pointer",

                fontSize: "0.7rem",

                letterSpacing: "0.12em",

                fontFamily: "inherit",

                transition: "background-color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c9a080")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#b4906e")}
            >
              {zh ? "联系我们" : "get in touch"}
            </button>
          </FadeSection>
        </div>
      </section>
      <style>{`
        @media (max-width: 767px) {
          .home-projects-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin-left: auto !important; margin-right: auto !important; }
          .home-article-grid { grid-template-columns: 1fr !important; max-width: 480px !important; margin-left: auto !important; margin-right: auto !important; }
        }
      `}</style>
    </div>
  );
}
