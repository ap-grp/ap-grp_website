import { useEffect, useRef, useState } from "react";
import type { PageState } from "../App";
import FadeSection from "../components/FadeSection";
import ResponsiveImage from "../components/ResponsiveImage";
import { officeMapPins } from "../content/offices";

import { ourStoryImages } from "../content/our-story";

import { useLang } from "../context/lang";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

interface Props {
  navigate: (p: PageState) => void;
}

// ─── World presence map ───────────────────────────────────────
const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const MAP_WIDTH = 800;

const MAP_HEIGHT = 400;

const MAP_CENTER: [number, number] = [112, 22];

const MAP_SCALE = 280;

function getMapPosition(lon: number, lat: number, dx: number, dy: number) {
  const radians = Math.PI / 180;

  return {
    left: ((MAP_WIDTH / 2 + MAP_SCALE * (lon - MAP_CENTER[0]) * radians + dx) / MAP_WIDTH) * 100,

    top: ((MAP_HEIGHT / 2 - MAP_SCALE * (lat - MAP_CENTER[1]) * radians + dy) / MAP_HEIGHT) * 100,
  };
}

// Labels are HTML overlays positioned from the same projection as the SVG. Their
// typography scales in CSS so the markers stay legible without crowding narrow screens.
// anchor='end'  → name + "+"  rendered right-to-left (name left of pin, right-justified)

// anchor='start' → "+" + name  rendered left-to-right (name right of pin)

function WorldMap({ isZh }: { isZh: boolean }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const [tooltipOpen, setTooltipOpen] = useState(false);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const language = isZh ? "zh" : "en";

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    },
    [],
  );

  const showTooltip = (slug: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    setHovered(slug);

    setTooltipOpen(true);
  };

  const hideTooltip = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);

    // Leave a short bridge between the SVG label and its HTML popup so moving

    // the pointer into the popup does not interrupt the hover state.

    closeTimer.current = setTimeout(() => {
      setTooltipOpen(false);

      closeTimer.current = setTimeout(() => setHovered(null), 320);
    }, 120);
  };

  return (
    <div className="story-map-canvas" style={{ position: "relative" }}>
      <ComposableMap
        projection="geoEquirectangular"
        projectionConfig={{ center: MAP_CENTER, scale: MAP_SCALE }}
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          userSelect: "none",
        }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#E9ECEF"
                stroke="#ffffff"
                strokeWidth={0.6}
                tabIndex={-1}
                focusable="false"
                aria-hidden="true"
                pointerEvents="none"
              />
            ))
          }
        </Geographies>
      </ComposableMap>

      {officeMapPins.map((office) => {
        const isDisplayed = hovered === office.slug;

        const isActive = isDisplayed && tooltipOpen;

        const position = getMapPosition(office.lon, office.lat, office.dx, office.dy);

        const anchoredTransform = office.anchor === "end" ? "translateX(-100%)" : "translateX(0)";

        return (
          <div
            key={`${office.slug}-tooltip`}
            className="story-map-tooltip"
            role="tooltip"
            aria-hidden={!isActive}
            onPointerEnter={() => showTooltip(office.slug)}
            onPointerLeave={hideTooltip}
            style={{
              position: "absolute",

              left: `calc(${position.left}% ${office.anchor === "end" ? "+" : "-"} 0.8rem)`,

              top: `calc(${position.top}% - 2rem)`,

              transform: anchoredTransform,
              zIndex: isActive ? 20 : 2,

              visibility: isDisplayed ? "visible" : "hidden",

              pointerEvents: isDisplayed ? "auto" : "none",

              backgroundColor: isActive ? "rgba(73, 80, 87, 0.84)" : "rgba(73, 80, 87, 0)",

              border: `1px solid ${
                isActive ? "rgba(255, 255, 255, 0.16)" : "rgba(255, 255, 255, 0)"
              }`,

              boxShadow: isActive
                ? "0 12px 28px rgba(33, 37, 41, 0.18)"
                : "0 0 0 rgba(33, 37, 41, 0)",

              padding: "0.8rem",

              color: "rgba(255, 255, 255, 0.82)",

              fontSize: "0.68rem",

              lineHeight: 1.5,

              letterSpacing: "0.02em",

              boxSizing: "border-box",

              userSelect: "text",

              willChange: "background-color, box-shadow",

              transition:
                "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <div className="story-map-tooltip-header">
              <strong className="story-map-tooltip-title">{office.name[language]}</strong>
              <button
                className="story-map-tooltip-close"
                type="button"
                aria-label={isZh ? "关闭办公室详情" : "close office details"}
                onClick={hideTooltip}
              >
                ×
              </button>
            </div>
            <address
              style={{
                margin: "3.5rem 0 0",

                fontStyle: "normal",

                textAlign: "left",

                cursor: "text",

                userSelect: "text",

                opacity: isActive ? 1 : 0,

                transform: `translateY(${isActive ? "0" : "5px"})`,

                transition: `opacity 0.2s ease ${
                  isActive ? "0.2s" : "0s"
                }, transform 0.2s ease ${isActive ? "0.2s" : "0s"}`,
              }}
            >
              {office.address[language].map((line) => (
                <span key={line} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
              {office.phone && (
                <span style={{ display: "block", marginTop: "0.35rem" }}>t: {office.phone}</span>
              )}
              <span
                style={{
                  display: "block",
                  marginTop: office.phone ? 0 : "0.35rem",
                }}
              >
                e: {office.email}
              </span>
            </address>
          </div>
        );
      })}

      {officeMapPins.map((office) => {
        const isActive = hovered === office.slug && tooltipOpen;

        const label = office.label[language];

        const position = getMapPosition(office.lon, office.lat, office.dx, office.dy);

        const officeDetails = [
          ...office.address[language],

          ...(office.phone ? [`t: ${office.phone}`] : []),

          `e: ${office.email}`,
        ].join(", ");

        return (
          <button
            type="button"
            key={`${office.slug}-tag`}
            className={`story-map-label${isActive ? " is-active" : ""}`}
            data-office={office.slug}
            aria-label={`${label}: ${officeDetails}`}
            aria-expanded={isActive}
            onMouseEnter={() => showTooltip(office.slug)}
            onMouseLeave={hideTooltip}
            onFocus={() => showTooltip(office.slug)}
            onBlur={hideTooltip}
            onClick={() => showTooltip(office.slug)}
            onKeyDown={(event) => {
              if (event.key === "Escape") hideTooltip();
            }}
            style={{
              position: "absolute",

              left: `${position.left}%`,

              top: `${position.top}%`,

              zIndex: isActive ? 30 : 3,

              display: "flex",

              alignItems: "center",

              gap: "0.28em",

              transform: office.anchor === "end" ? "translate(-100%, -50%)" : "translate(0, -50%)",

              color: isActive ? "#ffffff" : "#495057",

              cursor: "pointer",
              border: 0,
              padding: 0,
              background: "transparent",
              font: "inherit",

              userSelect: "none",

              whiteSpace: "nowrap",

              lineHeight: 1,

              transition: "color 0.3s ease",
            }}
          >
            {office.anchor === "end" ? (
              <>
                <span className="story-map-label-name">{label}</span>
                <span className="story-map-label-marker">+</span>
              </>
            ) : (
              <>
                <span className="story-map-label-marker">+</span>
                <span className="story-map-label-name">{label}</span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

const timeline = {
  en: [
    {
      year: "1997",
      event:
        "a+p consultants founded by liew soong shoon. the practice begins with residential and small commercial commissions.",
    },

    {
      year: "2008",
      event:
        "first international commission — a boutique resort in thailand — marks the beginning of the practice's regional expansion.",
    },

    {
      year: "2012",
      event:
        "the practice grows to 25 people and opens a project office in kuala lumpur to support growing regional commissions.",
    },

    {
      year: "2015",
      event:
        "establishment of dedicatsed interior design and landscape design studios within the practice.",
    },

    {
      year: "2017",
      event:
        "first urban masterplanning commission — a 180-hectare township development in myanmar — signals a significant expansion of scale and scope.",
    },

    {
      year: "2019",
      event:
        "the practice is awarded two sia architectural design awards, recognising excellence across residential and hospitality categories.",
    },

    {
      year: "2021",
      event:
        "a+pgrp is appointed to the marina bay precinct urban design study, one of singapore's most significant planning commissions.",
    },

    {
      year: "2025",
      event:
        "mei mei leong joins as partner, marking the formation of a+p grp llp and the firm's next chapter.",
    },
  ],

  zh: [
    {
      year: "1997",
      event: "廖松顺于1997年在新加坡创立a+pgrp，事务所以住宅及小型商业项目起步。",
    },

    {
      year: "2008",
      event: "首个国际项目——泰国一家精品度假村——标志着事务所区域扩张的开始。",
    },

    {
      year: "2012",
      event: "团队规模扩展至25人，并在吉隆坡开设项目办公室以支持增长中的区域业务。",
    },

    { year: "2015", event: "在事务所内成立专属室内设计与景观设计工作室。" },

    {
      year: "2017",
      event:
        "首个城市总体规划项目——缅甸一个180公顷的城镇开发项目——标志着事务所在规模与范围上的重大扩张。",
    },

    {
      year: "2019",
      event: "事务所荣获两项新加坡建筑师学会建筑设计奖，分别在住宅与酒店类别中斩获殊荣。",
    },

    {
      year: "2021",
      event: "a+pgrp受委托开展滨海湾片区城市设计研究，这是新加坡最重要的规划项目之一。",
    },

    {
      year: "2025",
      event: "梁美美加入成为合伙人，标志着 a+p grp llp 的成立，开启事务所发展的新篇章。",
    },
  ],
};

const awards = {
  en: [
    {
      year: "2019",
      title:
        "28 jalan buroh: \n" +
        "bca greenmark certified \n" +
        "\n" +
        "defu industrial city: \n" +
        "bca greenmark gold awards",
    },

    {
      year: "2018",
      title:
        "min residences: \n" +
        "best condo design asia property awards 2018 \n" +
        "best mixed use development asia property awards 2018 \n" +
        "best condo design asia property awards 2018 \n" +
        "best universal design asia property awards 2018 \n" +
        "\n" +
        "m tower: \n" +
        "best office design asia property awards 2018 \n" +
        "best universal design asia property awards 2018 \n" +
        "\n" +
        "mottama centre: \n" +
        "best retail development asia property awards 2018",
    },

    {
      year: "2017",
      title:
        "myanmar engineering council design competition, 1st winner \n" +
        "myanmar architects council design competition, 2nd winner",
    },

    {
      year: "2015",
      title: "chengdu integrated bus terminal design competition, 2nd place",
    },

    {
      year: "2010",
      title:
        "qingdao north highspeed train station competition, finalist \n" +
        'chengdu project "198" master planning competition, 1st winner \n' +
        "wencheng masterplan, hainan design competition, 1st winner \n" +
        "tai yuan tecnology park, wuxi design competition, 2nd place",
    },

    {
      year: "2006",
      title:
        "singapore institute of architects, façade gold awards \n" +
        "singapore institute of architects, gold awards (industrial category) \n" +
        "suzhou wuzhong technology park design competition, 2nd winner \n" +
        "yixing eco-sustainable city, 2nd winner",
    },

    {
      year: "2005",
      title:
        "foreigner town planning license granted by beijing construction ministry \n" +
        "beijing lengqian new estate town. 94 ha. 3rd place",
    },

    {
      year: "2004",
      title:
        "building & construction authority (bca) best buildable design award \n" +
        "suzhou south bus terminal, 1st winner",
    },
  ],

  zh: [
    {
      year: "2019",
      title:
        "18布罗路: \n" +
        "新加坡建设局（bca）绿色建筑标志认证 \n" +
        "\n" +
        "德福工业城: \n" +
        "新加坡建设局（bca）绿色建筑标志金级加强认证（green mark gold plus）",
    },

    {
      year: "2018",
      title:
        "min residences: \n" +
        "2018 亚洲地产大奖 最佳公寓设计 \n" +
        "2018 亚洲地产大奖 最佳综合开发 \n" +
        "2018 亚洲地产大奖 最佳公寓设计 \n" +
        "2018 亚洲地产大奖 最佳通用设计 \n" +
        "\n" +
        "m 塔: \n" +
        "2018 亚洲地产大奖 最佳办公楼设计 \n" +
        "2018 亚洲地产大奖 最佳通用设计 \n" +
        "\n" +
        "mottama centre: \n" +
        "2018 亚洲地产大奖 最佳零售开发",
    },

    {
      year: "2017",
      title: "缅甸工程师委员会设计竞赛，一等奖 \n" + "缅甸建筑师委员会设计竞赛，二等奖",
    },

    { year: "2015", title: "成都综合客运枢纽设计竞赛，二等奖" },

    {
      year: "2010",
      title:
        "青岛北高速铁路站设计竞赛，入围 \n" +
        '成都项目 "198" 总体规划竞赛，一等奖 \n' +
        "文城镇总体规划，海南设计竞赛，一等奖 \n" +
        "太原科技园区，无锡设计竞赛，二等奖",
    },

    {
      year: "2006",
      title:
        "新加坡建筑师学会（sia）立面设计金奖 \n" +
        "新加坡建筑师学会 (sia)，金奖 (工业类) \n" +
        "苏州吴中科技园区设计竞赛，二等奖 \n" +
        "宜兴生态可持续城市，二等奖",
    },

    {
      year: "2005",
      title:
        "北京市建设主管部门颁发外国机构城市规划资质许可证 \n" +
        "北京冷泉新城规划（94公顷），三等奖",
    },

    {
      year: "2004",
      title: "新加坡建设局（bca）最佳可建造性设计奖 \n" + "苏州南部客运枢纽设计竞赛，一等奖",
    },
  ],
};

const philosophy = {
  en: [
    {
      title: "context first",
      body: "every project begins with a rigorous reading of its physical, cultural, and social context. we believe that architecture must emerge from its place, not be imposed upon it.",
    },

    {
      title: "human scale",
      body: "we design for people, not for photographs. the quality of an environment is measured by how it feels to inhabit — the quality of light, the pleasure of movement, the comfort of shelter.",
    },

    {
      title: "design through collaboration",
      body: "We believe exceptional design emerges through collaboration, bringing together clients, context, and creative exploration to shape thoughtful, enduring solutions.",
    },

    {
      title: "enduring quality",
      body: "we resist the fashionable in favour of the lasting. our ambition is to create buildings and places that remain relevant, loved, and valued for generations.",
    },
  ],

  zh: [
    {
      title: "场所优先",
      body: "每个项目都始于对其物理、文化与社会背景的严格解读。我们相信建筑必须从场所中生长，而非强加于其上。",
    },

    {
      title: "人本尺度",
      body: "我们为人而设计，而非为照片。环境的品质由人居其中的感受衡量——光线的质量、移动的愉悦、遮蔽的舒适。",
    },

    {
      title: "协同设计",
      body: "我们相信，卓越的设计源于协作，通过融合客户愿景、场地特质与创新思维，创造兼具深度与持久价值的设计。",
    },

    {
      title: "持久品质",
      body: "我们抵制流行，追求持久。我们的理想是创造代代相传、始终被珍视与热爱的建筑与场所。",
    },
  ],
};

export default function OurStory({ navigate }: Props) {
  const { lang } = useLang();

  const zh = lang === "zh";

  return (
    <div style={{ paddingTop: "64px" }}>
      {/* Page header */}
      <div
        style={{
          position: "relative",

          backgroundColor: "#212529",

          overflow: "hidden",

          padding: "clamp(5rem,10vw,9rem) clamp(2rem,5vw,6rem)",
        }}
      >
        <ResponsiveImage
          src={ourStoryImages.hero}
          alt="architecture"
          sizes="100vw"
          loading="eager"
          fetchPriority="high"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.22,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "760px" }}>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "1.25rem",
            }}
          >
            {zh ? "关于我们" : "about us"}
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 3.8rem)",
              fontWeight: 300,
              color: "#ffffff",
              lineHeight: 1.25,
              letterSpacing: "-0.01em",
              marginBottom: "1.75rem",
            }}
          >
            {zh ? "三十年，以目的设计场所" : "thirty years of designing places with purpose"}
          </h1>
          <p
            style={{
              fontSize: "0.88rem",
              lineHeight: 1.85,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "560px",
              letterSpacing: "0.02em",
            }}
          >
            {zh
              ? "a+pgrp是一家多元化建筑与设计事务所，在东南亚打造深思熟虑的人居环境。"
              : "a+pgrp is a multi-disciplinary architecture and design practice creating thoughtful environments across southeast asia."}
          </p>
        </div>
      </div>

      {/* Intro */}
      <section style={{ padding: "clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(3rem,6vw,6rem)",
              alignItems: "start",
            }}
          >
            <FadeSection>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 300,
                  lineHeight: 1.3,
                  letterSpacing: "-0.01em",
                  border: "none",
                  textAlign: "left",
                }}
              >
                {zh ? "三十年，以目的设计场所" : "thirty years of designing places with purpose"}
              </h2>
            </FadeSection>
            <FadeSection delay={0.15}>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  marginBottom: "1.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "a+p grp 于 1997 年在新加坡成立，前身为 a+p consultants。自成立以来，公司积极拓展业务版图，业务范围涵盖多元项目类型，包括综合顾问服务、可行性研究、城市规划、城市设计、建筑设计、景观设计、室内设计及工程顾问服务。"
                  : "a+p grp was inaugurated as a+p consultants in singapore in 1997. since then, it has expanded voraciously into varied project types ranging from integrated consultancy services – feasibility studies, urban planning, urban design, architecture, landscape design, interior design, and engineering services."}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  marginBottom: "1.25rem",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "截至目前，我们已在新加坡、北京、上海、苏州、南京、宿务及仰光设有办公室。公司拥有约 100 名专业人才组成的国际化团队，汇聚了经验丰富的规划师、建筑师、设计师及工程师，共同为客户提供高品质的专业服务。"
                  : "To date, we pride ourselves on having offices in singapore, beijing, shanghai, suzhou, nanjing, cebu and yangon. our combined team of 100 people comprises talented and experienced planners, architects, designers, and engineers."}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "2025 年 8 月，随着新合伙人的加入及业务进一步拓展，a+p grp llp（新加坡）正式成立。"
                  : "in august 2025, with new partners and further expansion, a+p grp llp (singapore) was formed."}
              </p>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <div
        style={{
          height: "clamp(300px, 50vw, 550px)",
          overflow: "hidden",
          backgroundColor: "#e9ecef",
        }}
      >
        <ResponsiveImage
          src={ourStoryImages.philosophy}
          alt="a+pgrp project"
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Design philosophy */}
      <section style={{ padding: "clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <FadeSection>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#b4906e",
                marginBottom: "1.5rem",
              }}
            >
              {zh ? "设计哲学" : "design philosophy"}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                fontWeight: 300,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                maxWidth: "640px",
                marginBottom: "3rem",
              }}
            >
              {zh
                ? "我们相信，最好的建筑始于深度倾听"
                : "we believe that the best architecture begins with deep listening"}
            </h2>
          </FadeSection>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "3rem",
            }}
          >
            {philosophy[lang === "zh" ? "zh" : "en"].map((v, i) => (
              <FadeSection key={v.title} delay={i * 0.08}>
                <div style={{ borderTop: "1px solid #dee2e6", paddingTop: "2rem" }}>
                  <h3
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      marginBottom: "1rem",
                      color: "#212529",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      lineHeight: 1.85,
                      color: "#495057",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {v.body}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* World presence map */}
      <section
        style={{
          paddingTop: "clamp(4rem,7vw,6rem)",
          paddingBottom: "clamp(3rem,5vw,4rem)",
          padding: "clamp(4rem,7vw,6rem) clamp(2rem,5vw,6rem) 0",
        }}
      >
        <div
          style={{
            maxWidth: "1560px",
            margin: "0 auto",
            marginBottom: "2.5rem",
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
              {zh ? "业务范围" : "our presence"}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                fontWeight: 300,
                lineHeight: 1.3,
                letterSpacing: "-0.01em",
                marginBottom: 0,
              }}
            >
              {zh ? "扎根新加坡，服务亚太地区" : "rooted in singapore, working across asia"}
            </h2>
          </FadeSection>
        </div>
        <FadeSection delay={0.1}>
          <div className="story-map-viewport">
            <WorldMap isZh={zh} />
          </div>
        </FadeSection>
      </section>

      {/* Timeline */}
      <section
        style={{
          backgroundColor: "#f8f9fa",
          padding: "clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)",
        }}
      >
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <FadeSection>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "#b4906e",
                marginBottom: "1.5rem",
              }}
            >
              {zh ? "历史" : "history"}
            </p>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                fontWeight: 300,
                letterSpacing: "-0.01em",
                marginBottom: "4rem",
              }}
            >
              {zh ? "重要里程碑" : "milestones"}
            </h2>
          </FadeSection>
          <div>
            {timeline[lang === "zh" ? "zh" : "en"].map((t, i) => (
              <FadeSection key={t.year} delay={i * 0.05}>
                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns: "80px 1fr",

                    gap: "2rem",

                    padding: "2rem 0",

                    borderBottom: "1px solid #dee2e6",

                    alignItems: "start",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      color: "#b4906e",
                      letterSpacing: "0.08em",
                      paddingTop: "0.1rem",
                    }}
                  >
                    {t.year}
                  </span>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.8,
                      color: "#495057",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {t.event}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <div
        style={{
          height: "clamp(280px, 40vw, 500px)",
          overflow: "hidden",
          backgroundColor: "#e9ecef",
        }}
      >
        <ResponsiveImage
          src={ourStoryImages.recognition}
          alt="urban design"
          sizes="100vw"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Awards */}
      <section style={{ padding: "clamp(5rem,9vw,8rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "clamp(3rem,6vw,6rem)",
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
                {zh ? "荣誉" : "recognition"}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.01em",
                  marginBottom: "1.5rem",
                }}
              >
                {zh ? "奖项与成就" : "awards &\nachievements"}
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  lineHeight: 1.9,
                  color: "#495057",
                  letterSpacing: "0.02em",
                }}
              >
                {zh
                  ? "2005年，a+p grp 获得中华人民共和国政府颁发的首个城乡规划编制资质证书（许可证编号：2005001），成为首批获准取得该资质的国有及精选外资规划咨询机构之一。"
                  : "In 2005, a+p grp obtained the first Urban and Town Planning Licence (Licence No: 2005001) from the Government of the People’s Republic of China—an accreditation issued only to a few state-approved and selected foreign consultancies."}
              </p>
            </FadeSection>
            <FadeSection delay={0.1}>
              <div>
                {awards[lang === "zh" ? "zh" : "en"].map((a, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",

                      gap: "1.5rem",

                      padding: "1.25rem 0",

                      borderBottom: "1px solid #dee2e6",

                      alignItems: "baseline",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.65rem",
                        color: "#b4906e",
                        letterSpacing: "0.08em",
                        flexShrink: 0,
                      }}
                    >
                      {a.year}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "#495057",
                        letterSpacing: "0.02em",
                        lineHeight: 1.6,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {a.title}
                    </span>
                  </div>
                ))}
              </div>
            </FadeSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          borderTop: "1px solid #dee2e6",
          padding: "clamp(4rem,7vw,7rem) clamp(2rem,5vw,6rem)",
          textAlign: "center",
        }}
      >
        <FadeSection>
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              color: "#9AA3AC",
              marginBottom: "1rem",
            }}
          >
            {zh ? "与我们合作" : "work with us"}
          </p>
          <h2
            style={{
              fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              marginBottom: "2rem",
            }}
          >
            {zh ? "准备好开始一个项目了吗？" : "ready to begin a project?"}
          </h2>
          <button
            onClick={() => navigate({ id: "contact" })}
            style={{
              padding: "0.85rem 2.5rem",

              backgroundColor: "#212529",

              color: "#ffffff",

              border: "none",

              cursor: "pointer",

              fontSize: "0.7rem",

              letterSpacing: "0.12em",

              fontFamily: "inherit",

              transition: "background-color 0.25s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#b4906e")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#212529")}
          >
            {zh ? "联系我们" : "get in touch"}
          </button>
        </FadeSection>
      </section>
    </div>
  );
}
