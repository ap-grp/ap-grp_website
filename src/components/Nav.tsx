import { useState, useEffect, useLayoutEffect, useRef } from "react";
import type { PageState } from "../App";
import { useLang } from "../context/lang";
import logoUrl from "../assets/ap-grp_logo.svg";
import SiteSearchResults, { getSiteSearchResults } from "./SiteSearchResults";

interface NavProps {
  currentPage: string;

  navigate: (p: PageState) => void;
}

export default function Nav({ currentPage, navigate }: NavProps) {
  const { lang, toggle } = useLang();

  const [scrolled, setScrolled] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [desktopSearch, setDesktopSearch] = useState("");
  const [mobileSearch, setMobileSearch] = useState("");
  const [desktopFits, setDesktopFits] = useState(true);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLButtonElement>(null);
  const desktopLinksRef = useRef<HTMLDivElement>(null);
  const desktopUtilitiesRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopSearchControlRef = useRef<HTMLDivElement>(null);
  const desktopSearchResultsRef = useRef<HTMLDivElement>(null);
  const desktopFitsRef = useRef(true);

  const links: { label: { en: string; zh: string }; page: PageState["id"] }[] = [
    { label: { en: "our story", zh: "历程" }, page: "story" },
    { label: { en: "people", zh: "团队" }, page: "people" },
    { label: { en: "services", zh: "服务" }, page: "services" },
    { label: { en: "projects", zh: "项目" }, page: "projects" },
    { label: { en: "media", zh: "媒体" }, page: "media" },
    { label: { en: "career", zh: "招聘" }, page: "careers" },
    { label: { en: "contact", zh: "联系" }, page: "contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigateAndClose = (newPage: PageState) => {
    setMenuOpen(false);
    setSearchOpen(false);
    setDesktopSearch("");
    setMobileSearch("");
    navigate(newPage);
  };

  const handleSearchKeyDown =
    (query: string, source: "desktop" | "mobile") =>
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Escape") {
        if (source === "desktop") {
          setSearchOpen(false);
          setDesktopSearch("");
        } else {
          setMobileSearch("");
        }
        return;
      }

      if (event.key !== "Enter") return;
      const firstResult = getSiteSearchResults(query, lang, 1)[0];
      if (firstResult) navigateAndClose(firstResult.page);
    };

  useEffect(() => {
    const closeNavigation = () => {
      setMenuOpen(false);
      setSearchOpen(false);
    };

    window.addEventListener("popstate", closeNavigation);
    return () => window.removeEventListener("popstate", closeNavigation);
  }, []);

  useEffect(() => {
    document.body.style.overflow = !desktopFits && menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [desktopFits, menuOpen]);

  const isHome = currentPage === "home";

  const isTransparent = isHome && !scrolled && !menuOpen;

  const isExpandedHome = isHome && !scrolled && !menuOpen;
  const navHeight = isExpandedHome ? "clamp(88px, 9vw, 112px)" : "64px";

  useLayoutEffect(() => {
    const updateNavigationFit = () => {
      const nav = navRef.current;
      const logo = logoRef.current;
      const desktopLinks = desktopLinksRef.current;
      const desktopUtilities = desktopUtilitiesRef.current;
      if (!nav || !logo || !desktopLinks || !desktopUtilities) return;

      const navStyle = window.getComputedStyle(nav);
      const leftSideWidth = parseFloat(navStyle.paddingLeft) + logo.offsetWidth;
      const rightSideWidth = parseFloat(navStyle.paddingRight) + desktopUtilities.scrollWidth;
      const sideClearance = Math.max(leftSideWidth, rightSideWidth) + 32;
      const requiredWidth = desktopLinks.scrollWidth + sideClearance * 2;

      const nextDesktopFits = nav.clientWidth >= requiredWidth;
      if (desktopFitsRef.current === nextDesktopFits) return;

      desktopFitsRef.current = nextDesktopFits;
      setDesktopFits(nextDesktopFits);
      if (nextDesktopFits) {
        setMenuOpen(false);
      } else {
        setSearchOpen(false);
      }
    };

    const observer = new ResizeObserver(updateNavigationFit);
    if (navRef.current) observer.observe(navRef.current);
    if (logoRef.current) observer.observe(logoRef.current);
    if (desktopLinksRef.current) observer.observe(desktopLinksRef.current);
    if (desktopUtilitiesRef.current) observer.observe(desktopUtilitiesRef.current);

    updateNavigationFit();
    document.fonts?.ready.then(updateNavigationFit);

    return () => observer.disconnect();
  }, [lang, isExpandedHome]);

  useEffect(() => {
    if (!searchOpen || !desktopFits) return;

    const frame = window.requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [desktopFits, searchOpen]);

  useEffect(() => {
    if (!searchOpen || !desktopFits) return;

    const closeSearchOnOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        desktopSearchControlRef.current?.contains(target) ||
        desktopSearchResultsRef.current?.contains(target)
      )
        return;

      setSearchOpen(false);
      setDesktopSearch("");
    };

    document.addEventListener("pointerdown", closeSearchOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeSearchOnOutsidePointer);
  }, [desktopFits, searchOpen]);

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: "fixed",

          top: 0,

          left: 0,

          right: 0,

          zIndex: 100,

          height: navHeight,

          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          padding: "0 clamp(2rem, 5vw, 5rem)",

          backgroundColor: isTransparent ? "transparent" : "rgba(255,255,255,0.96)",

          borderBottom: isTransparent ? "none" : "1px solid #dee2e6",

          backdropFilter: scrolled ? "blur(8px)" : "none",

          transition:
            "height 0.45s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          ref={logoRef}
          onClick={() => navigateAndClose({ id: "home" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
          aria-label="a+pgrp home"
        >
          <img
            src={logoUrl}
            alt="a+pgrp"
            style={{
              height: isExpandedHome ? "clamp(44px, 5vw, 62px)" : "26px",

              width: "auto",

              display: "block",

              filter: isTransparent ? "brightness(0) invert(1)" : "none",

              transition: "height 0.45s cubic-bezier(0.4, 0, 0.2, 1), filter 0.4s ease",
            }}
          />
        </button>

        {/* Centered desktop navigation */}
        <div
          ref={desktopLinksRef}
          aria-hidden={!desktopFits}
          style={{
            position: "absolute",
            left: "50%",
            display: "flex",
            gap: "clamp(1rem, 1.6vw, 2rem)",
            alignItems: "center",
            whiteSpace: "nowrap",
            opacity: desktopFits ? 1 : 0,
            visibility: desktopFits ? "visible" : "hidden",
            pointerEvents: desktopFits ? "auto" : "none",
            transform: desktopFits ? "translate(-50%, 0)" : "translate(-50%, 12px)",
            transition:
              "opacity 0.25s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0.25s",
          }}
        >
          <button
            onClick={() => navigateAndClose({ id: "home" })}
            aria-label={lang === "en" ? "home" : "首页"}
            title={lang === "en" ? "home" : "首页"}
            tabIndex={desktopFits ? 0 : -1}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px 0",
              display: "flex",
              alignItems: "center",
              color:
                currentPage === "home" && !isTransparent
                  ? "#b4906e"
                  : isTransparent
                    ? "rgba(255,255,255,0.85)"
                    : "#212529",
              transition: "color 0.4s ease, opacity 0.2s ease",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 10.5 12 4l8 6.5V20H4Z" />
            </svg>
          </button>
          {links.map((l) => (
            <button
              key={l.page}
              onClick={() => navigateAndClose({ id: l.page } as PageState)}
              className={`nav-link ${currentPage === l.page ? "active" : ""}`}
              tabIndex={desktopFits ? 0 : -1}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                color: isTransparent ? "rgba(255,255,255,0.85)" : "#212529",
                fontFamily: "inherit",
                transition: "color 0.4s ease",
                letterSpacing: "0.08em",
                fontSize: "0.7rem",
              }}
            >
              {l.label[lang]}
            </button>
          ))}
        </div>

        {/* Desktop utilities */}
        <div
          ref={desktopUtilitiesRef}
          aria-hidden={!desktopFits}
          style={{
            position: "absolute",
            right: "clamp(2rem, 5vw, 5rem)",
            display: "flex",
            alignItems: "center",
            gap: "1.2rem",
            opacity: desktopFits ? 1 : 0,
            visibility: desktopFits ? "visible" : "hidden",
            pointerEvents: desktopFits ? "auto" : "none",
            transform: desktopFits ? "translateX(0)" : "translateX(12px)",
            transition:
              "opacity 0.25s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s linear 0.25s",
          }}
        >
          <div
            ref={desktopSearchControlRef}
            style={{
              position: "relative",
              width: "16px",
              height: "36px",
              flexShrink: 0,
            }}
          >
            <input
              ref={searchInputRef}
              type="search"
              value={desktopSearch}
              onChange={(event) => setDesktopSearch(event.target.value)}
              onKeyDown={handleSearchKeyDown(desktopSearch, "desktop")}
              aria-label={lang === "en" ? "search the site" : "搜索网站"}
              aria-expanded={desktopSearch.trim().length > 0}
              placeholder={lang === "en" ? "search..." : "搜索…"}
              className={`desktop-site-search-input${isTransparent ? " on-dark" : ""}`}
              tabIndex={desktopFits && searchOpen ? 0 : -1}
              style={{
                position: "absolute",
                zIndex: 1,
                top: 0,
                right: 0,
                width: "240px",
                height: "36px",
                padding: "0.55rem 0.75rem 0.55rem 2.55rem",
                border: isTransparent
                  ? "1px solid rgba(255,255,255,0.42)"
                  : "1px solid rgba(222,226,230,0.9)",
                outline: "none",
                backgroundColor: isTransparent
                  ? "rgba(33,37,41,0.24)"
                  : "rgba(255,255,255,0.8)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                color: isTransparent ? "#ffffff" : "#212529",
                fontSize: "0.72rem",
                letterSpacing: "0.04em",
                fontFamily: "inherit",
                opacity: searchOpen ? 1 : 0,
                pointerEvents: searchOpen ? "auto" : "none",
                transform: searchOpen ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "right center",
                transition:
                  "transform 0.48s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease, background-color 0.3s ease",
              }}
            />
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => {
                  if (open) setDesktopSearch("");
                  return !open;
                });
              }}
              aria-label={
                searchOpen
                  ? lang === "en"
                    ? "close search"
                    : "关闭搜索"
                  : lang === "en"
                    ? "search"
                    : "搜索"
              }
              aria-expanded={searchOpen}
              tabIndex={desktopFits ? 0 : -1}
              style={{
                position: "absolute",
                zIndex: 2,
                top: "50%",
                left: 0,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: isTransparent ? "#ffffff" : "#212529",
                padding: 0,
                display: "flex",
                alignItems: "center",
                transform: searchOpen
                  ? "translate(-208px, -50%) scale(0.94)"
                  : "translate(0, -50%) scale(1)",
                transition:
                  "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), color 0.4s ease",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="16.5" y1="16.5" x2="22" y2="22" />
              </svg>
            </button>
          </div>
          <button
            onClick={toggle}
            aria-label="toggle language"
            tabIndex={desktopFits ? 0 : -1}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "0.7rem",
              letterSpacing: "0.04em",
              color: isTransparent ? "rgba(255,255,255,0.8)" : "#9AA3AC",
              padding: 0,
              fontFamily: "inherit",
            }}
          >
            {lang === "en" ? "简" : "EN"}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="menu"
          aria-expanded={!desktopFits && menuOpen}
          aria-hidden={desktopFits}
          tabIndex={desktopFits ? -1 : 0}
          style={{
            position: "absolute",
            right: "clamp(2rem, 5vw, 5rem)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            color: isTransparent && !menuOpen ? "#ffffff" : "#212529",
            opacity: desktopFits ? 0 : 1,
            visibility: desktopFits ? "hidden" : "visible",
            pointerEvents: desktopFits ? "none" : "auto",
            transform: desktopFits ? "translateX(12px)" : "translateX(0)",
            transition:
              "opacity 0.25s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.4s ease, visibility 0s linear 0.25s",
          }}
        >
          <span
            style={{
              display: "block",
              width: "20px",
              height: "1px",
              backgroundColor: "currentColor",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              display: "block",
              width: "20px",
              height: "1px",
              backgroundColor: "currentColor",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.3s ease",
            }}
          />
          <span
            style={{
              display: "block",
              width: "20px",
              height: "1px",
              backgroundColor: "currentColor",
              transition: "transform 0.3s ease",
              transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </nav>

      {/* Desktop search results */}
      {searchOpen && desktopFits && desktopSearch.trim() && (
        <div
          ref={desktopSearchResultsRef}
          style={{
            position: "fixed",
            top: `calc(${navHeight} + 8px)`,
            right: "calc(clamp(2rem, 5vw, 5rem) + 2.25rem)",
            width: "min(390px, calc(100vw - 4rem))",
            zIndex: 99,
            transition: "top 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <SiteSearchResults
            query={desktopSearch}
            lang={lang}
            floating
            onSelect={navigateAndClose}
          />
        </div>
      )}

      {/* Backdrop */}
      <button
        type="button"
        aria-label="close menu"
        tabIndex={-1}
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 97,
          backgroundColor: "rgba(0,0,0,0.35)",
          opacity: !desktopFits && menuOpen ? 1 : 0,
          pointerEvents: !desktopFits && menuOpen ? "auto" : "none",
          transition: "opacity 0.4s ease",
          border: "none",
          padding: 0,
        }}
      />

      {/* Side panel drawer */}
      <div
        aria-hidden={desktopFits || !menuOpen}
        inert={desktopFits || !menuOpen}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,

          width: "min(80vw, 320px)",

          zIndex: 98,

          backgroundColor: "#ffffff",

          transform: !desktopFits && menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",

          overflowY: "auto",

          display: "flex",
          flexDirection: "column",

          boxShadow: !desktopFits && menuOpen ? "-8px 0 32px rgba(0,0,0,0.12)" : "none",
        }}
      >
        {/* Panel header */}
        <div
          style={{
            padding: "1.5rem 1.5rem 1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <img src={logoUrl} alt="a+pgrp" style={{ height: "20px", width: "auto" }} />
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              color: "#9AA3AC",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="close menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile search */}
        <div
          style={{
            borderBottom: "1px solid #dee2e6",
          }}
        >
          <div
            style={{
              margin: "1rem 1.25rem",
              padding: "0.65rem 0.8rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              border: "1px solid rgba(222,226,230,0.9)",
              backgroundColor: "rgba(248,249,250,0.8)",
              transition: "border-color 0.25s ease, background-color 0.25s ease",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#9AA3AC"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
              type="search"
              value={mobileSearch}
              onChange={(event) => setMobileSearch(event.target.value)}
              onKeyDown={handleSearchKeyDown(mobileSearch, "mobile")}
              aria-label={lang === "en" ? "search the site" : "搜索网站"}
              aria-expanded={mobileSearch.trim().length > 0}
              placeholder={
                lang === "en" ? "search projects, people, media..." : "搜索项目、团队、媒体…"
              }
              style={{
                flex: 1,
                minWidth: 0,
                border: "none",
                outline: "none",
                fontSize: "0.8rem",
                letterSpacing: "0.04em",
                color: "#212529",
                fontFamily: "inherit",
                backgroundColor: "transparent",
              }}
            />
          </div>
          <SiteSearchResults
            query={mobileSearch}
            lang={lang}
            compact
            onSelect={navigateAndClose}
          />
        </div>

        {/* Nav links */}
        <div style={{ flex: 1 }}>
          {links.map((l, i) => (
            <button
              key={l.page}
              onClick={() => navigateAndClose({ id: l.page } as PageState)}
              style={{
                display: "block",
                width: "100%",
                background: "none",

                border: "none",
                borderBottom: "1px solid #e9ecef",

                cursor: "pointer",
                padding: "1rem 1.5rem",

                textAlign: "left",
                fontSize: "0.95rem",
                fontWeight: currentPage === l.page ? 500 : 300,

                letterSpacing: "0.04em",

                color: currentPage === l.page ? "#b4906e" : "#212529",

                fontFamily: "inherit",

                opacity: 0,

                animation: menuOpen ? `fadeSlideIn 0.4s ease forwards ${i * 0.05 + 0.05}s` : "none",
              }}
            >
              {l.label[lang]}
            </button>
          ))}
        </div>

        {/* Language toggle */}
        <div style={{ padding: "1.25rem 1.5rem", borderTop: "1px solid #dee2e6" }}>
          <button
            onClick={toggle}
            style={{
              background: "none",
              border: "1px solid #dee2e6",
              cursor: "pointer",

              padding: "0.5rem 1.25rem",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",

              color: "#9AA3AC",
              fontFamily: "inherit",
            }}
          >
            {lang === "en" ? "简体中文" : "English"}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateX(16px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        @keyframes searchPanelIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes searchResultIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .desktop-site-search-input::-webkit-search-cancel-button {
          display: none;
        }

        .desktop-site-search-input::placeholder {
          color: #7f8992;
          opacity: 1;
        }

        .desktop-site-search-input.on-dark::placeholder {
          color: rgba(255,255,255,0.72);
        }

        .site-search-result:hover,
        .site-search-result:focus-visible {
          background-color: #f8f9fa !important;
          outline: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .desktop-site-search-input,
          .site-search-panel,
          .site-search-result {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
