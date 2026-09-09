import { useState } from "react";
import type { PageState } from "../App";
import FadeSection from "../components/FadeSection";
import ResponsiveImage from "../components/ResponsiveImage";
import { people } from "../content/people";
import { useLang } from "../context/lang";

interface Props {
  navigate: (p: PageState) => void;
}

type OfficeId = NonNullable<(typeof people)[number]["officeId"]>;

const offices: { id: OfficeId; label: { en: string; zh: string } }[] = [
  { id: "singapore", label: { en: "singapore", zh: "新加坡" } },
  { id: "myanmar", label: { en: "myanmar", zh: "缅甸" } },
  { id: "indonesia", label: { en: "indonesia", zh: "印度尼西亚" } },
  { id: "philippines", label: { en: "philippines", zh: "菲律宾" } },
  { id: "china", label: { en: "china", zh: "中国" } },
];

function PersonCard({
  person,
  size,
  onClick,
  zh,
}: {
  person: (typeof people)[0];
  size: "large" | "small";
  onClick: () => void;
  zh: boolean;
}) {
  const lang = zh ? "zh" : "en";
  const nameParts = person.name.en.trim().split(/\s+/);
  const initials = `${nameParts[0]?.[0] ?? ""}${
    nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : ""
  }`.toUpperCase();

  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
      }}
      aria-label={zh ? `查看${person.name.zh}简介` : `view ${person.name.en} profile`}
    >
      <div
        className="img-zoom"
        style={{
          aspectRatio: "1/1",

          backgroundColor: "#e9ecef",

          overflow: "hidden",
        }}
      >
        {person.imageUrl ? (
          <ResponsiveImage
            src={person.imageUrl}
            alt={person.name[lang]}
            sizes={
              size === "large"
                ? "(max-width: 767px) calc((100vw - 5rem) / 2), (max-width: 1200px) 50vw, 520px"
                : "(max-width: 767px) calc((100vw - 5rem) / 2), 360px"
            }
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: "linear-gradient(145deg, #e9ecef 0%, #dfe3e6 100%)",
              color: "#9AA3AC",
              fontSize: size === "large" ? "clamp(2rem, 5vw, 4rem)" : "clamp(1.5rem, 3vw, 2.5rem)",
              fontWeight: 300,
              letterSpacing: "0.12em",
            }}
          >
            {initials}
          </div>
        )}
      </div>
      <div style={{ paddingTop: "1rem" }}>
        <p
          style={{
            fontSize: size === "large" ? "1rem" : "0.88rem",

            fontWeight: 400,

            letterSpacing: "0.01em",

            marginBottom: "0.3rem",

            color: "#212529",
          }}
        >
          {person.name[lang]}
        </p>
        <p
          style={{
            fontSize: "0.7rem",
            color: "#9AA3AC",
            letterSpacing: "0.05em",
          }}
        >
          {person.position[lang]}
        </p>
        {person.office && (
          <p
            style={{
              fontSize: "0.65rem",
              color: "#9AA3AC",
              letterSpacing: "0.05em",
              marginTop: "0.15rem",
            }}
          >
            {person.office[lang]}
          </p>
        )}
      </div>
    </button>
  );
}

export default function People({ navigate }: Props) {
  const { lang } = useLang();
  const zh = lang === "zh";
  const [activeOffice, setActiveOffice] = useState<OfficeId>("singapore");
  const partners = people.filter((p) => p.isPartner);
  const staff = people.filter((p) => !p.isPartner && p.officeId === activeOffice);

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
            {zh ? "团队" : "people"}
          </p>
          <h1
            style={{
              fontSize: "clamp(2rem, 4vw, 3.8rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
            }}
          >
            {zh ? "我们的团队" : "the team"}
          </h1>
        </div>
      </div>

      <section style={{ padding: "clamp(4rem,8vw,7rem) clamp(2rem,5vw,6rem)" }}>
        <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
          {/* Partners */}
          <div
            className="partners-grid"
            style={{
              display: "grid",

              gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",

              gap: "2.5rem 2rem",

              marginBottom: "clamp(3rem,6vw,5rem)",
            }}
          >
            {partners.map((p, i) => (
              <FadeSection key={p.slug} delay={i * 0.1}>
                <PersonCard
                  person={p}
                  size="large"
                  onClick={() => navigate({ id: "person-detail", slug: p.slug })}
                  zh={zh}
                />
              </FadeSection>
            ))}
          </div>

          {/* Team */}
          <div
            role="tablist"
            aria-label={zh ? "按办公室筛选团队成员" : "filter team members by office"}
            className="office-tabs"
            style={{
              display: "flex",
              overflowX: "auto",
              borderBottom: "1px solid #dee2e6",
              marginBottom: "2.5rem",
              scrollbarWidth: "none",
            }}
          >
            {offices.map((office) => {
              const isActive = office.id === activeOffice;

              return (
                <button
                  key={office.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="office-team-panel"
                  onClick={() => setActiveOffice(office.id)}
                  style={{
                    flex: "1 0 auto",
                    minWidth: "8rem",
                    padding: "0 1.25rem 1rem",
                    border: "none",
                    borderBottom: isActive ? "2px solid #b4906e" : "2px solid transparent",
                    background: "transparent",
                    color: isActive ? "#212529" : "#9AA3AC",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.72rem",
                    letterSpacing: "0.1em",
                    transition: "color 0.2s ease, border-color 0.2s ease",
                  }}
                >
                  {office.label[lang]}
                </button>
              );
            })}
          </div>

          <div
            id="office-team-panel"
            role="tabpanel"
            className="team-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "2rem",
            }}
          >
            {staff.map((p, i) => (
              <FadeSection key={p.slug} delay={i * 0.05}>
                <PersonCard
                  person={p}
                  size="small"
                  onClick={() => navigate({ id: "person-detail", slug: p.slug })}
                  zh={zh}
                />
              </FadeSection>
            ))}
          </div>

          <style>{`
            @media (max-width: 767px) {
              .partners-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1rem !important; }
              .team-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 1.25rem !important; }
              .office-tabs { margin-left: -2rem; margin-right: -2rem; padding-left: 0.75rem; padding-right: 0.75rem; }
            }
          `}</style>
        </div>
      </section>

      {/* Careers CTA */}
      <section
        style={{
          borderTop: "1px solid #dee2e6",

          backgroundColor: "#f8f9fa",

          padding: "clamp(4rem,7vw,6rem) clamp(2rem,5vw,6rem)",

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
            {zh ? "加入团队" : "join the team"}
          </p>
          <h2
            style={{
              fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)",
              fontWeight: 300,
              letterSpacing: "-0.01em",
              marginBottom: "1.25rem",
            }}
          >
            {zh ? "有意与我们共事？" : "interested in working with us?"}
          </h2>
          <p
            style={{
              fontSize: "0.82rem",
              color: "#495057",
              marginBottom: "2rem",
              letterSpacing: "0.02em",
              maxWidth: "400px",
              margin: "0 auto 2rem",
            }}
          >
            {zh
              ? "我们始终欢迎才华横溢、充满好奇心的设计师加入我们的事务所。"
              : "we are always looking for talented, curious people to join our practice."}
          </p>
          <button
            onClick={() => navigate({ id: "careers" })}
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
            {zh ? "查看招聘职位" : "view openings"}
          </button>
        </FadeSection>
      </section>
    </div>
  );
}
