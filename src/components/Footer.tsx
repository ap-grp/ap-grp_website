import type { PageState } from "../App";

import { useLang } from "../context/lang";

import logoUrl from "../assets/apgrp_logo.svg";

interface FooterProps {
  navigate: (p: PageState) => void;
}

// ── Social media links — update each independently ───────────

const SOCIAL = [
  { label: "instagram", href: "https://www.instagram.com/ap_grp/" },

  { label: "facebook", href: "https://www.instagram.com/ap_grp/" },

  { label: "linkedin", href: "https://www.instagram.com/ap_grp/" },
];

export default function Footer({ navigate }: FooterProps) {
  const { lang } = useLang();

  return (
    <footer
      style={{
        backgroundColor: "#212529",

        color: "#ffffff",

        padding: "clamp(4rem,7vw,6rem) clamp(2rem,5vw,6rem) 2rem",
      }}
    >
      <div style={{ maxWidth: "1560px", margin: "0 auto" }}>
        {/* Top row */}
        <div
          style={{
            display: "grid",

            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",

            gap: "3rem",

            paddingBottom: "3rem",

            borderBottom: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          {/* Brand */}
          <div>
            <button
              onClick={() => navigate({ id: "home" })}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: "1.25rem",
                display: "block",
              }}
            >
              <img
                src={logoUrl}
                alt="a+pgrp"
                style={{
                  height: "26px",
                  width: "auto",
                  display: "block",
                  filter: "brightness(0) invert(1)",
                }}
              />
            </button>
            <p
              style={{
                fontSize: "0.72rem",
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.02em",
                maxWidth: "220px",
              }}
            >
              {lang === "en"
                ? "architecture and design practice creating thoughtful environments across southeast asia."
                : "建筑与设计事务所，在东南亚打造深思熟虑的人居环境。"}
            </p>
          </div>

          {/* Address */}
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              {lang === "en" ? "singapore" : "新加坡"}
            </p>
            <address
              style={{
                fontStyle: "normal",
                fontSize: "0.72rem",
                lineHeight: 1.9,
                color: "rgba(255,255,255,0.55)",
              }}
            >
              43 science park road
              <br />
              #01-11 science park 2<br />
              singapore 117408
              <br />
              <a
                href="mailto:info@ap-grp.com"
                style={{
                  color: "#b4906e",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                info@ap-grp.com
              </a>
            </address>
          </div>

          {/* Social */}
          <div>
            <p
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "1rem",
                textTransform: "uppercase",
              }}
            >
              {lang === "en" ? "connect" : "关注我们"}
            </p>
            <div style={{ display: "flex", gap: "1.25rem" }}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    color: "rgba(255,255,255,0.45)",

                    textDecoration: "none",

                    fontSize: "0.65rem",

                    letterSpacing: "0.06em",

                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "1.5rem",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.04em",
            }}
          >
            © {new Date().getFullYear()}{" "}
            {lang === "en" ? "a+pgrp. all rights reserved." : "a+pgrp. 版权所有。"}
          </p>
        </div>
      </div>
    </footer>
  );
}
