import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { LangProvider } from "./context/lang";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { FORM_SUBMIT_SUCCESS_HASH } from "./lib/formSubmit";
import { locationToPage, pageToUrl, type PageState } from "./routes";

export type { PageState } from "./routes";

const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const Media = lazy(() => import("./pages/Media"));
const MediaDetail = lazy(() => import("./pages/MediaDetail"));
const OurStory = lazy(() => import("./pages/OurStory"));
const People = lazy(() => import("./pages/People"));
const PersonDetail = lazy(() => import("./pages/PersonDetail"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const Services = lazy(() => import("./pages/Services"));

const HISTORY_STATE_KEY = "apgrpPage";

const isPageState = (value: unknown): value is PageState => {
  if (!value || typeof value !== "object" || !("id" in value)) return false;

  const candidate = value as Record<string, unknown>;
  const simplePages: PageState["id"][] = [
    "home",
    "story",
    "projects",
    "people",
    "services",
    "media",
    "careers",
    "contact",
  ];

  if (typeof candidate.id !== "string") return false;
  if (simplePages.includes(candidate.id as PageState["id"])) return true;

  return (
    ["project-detail", "person-detail", "media-detail"].includes(candidate.id) &&
    typeof candidate.slug === "string"
  );
};

const getHistoryPage = (state: unknown): PageState | null => {
  if (!state || typeof state !== "object") return null;
  const page = (state as Record<string, unknown>)[HISTORY_STATE_KEY];
  return isPageState(page) ? page : null;
};

const withHistoryPage = (page: PageState) => {
  const currentState = window.history.state;
  const preservedState = currentState && typeof currentState === "object" ? currentState : {};
  return { ...preservedState, [HISTORY_STATE_KEY]: page };
};

function PageLoading() {
  return <div aria-label="loading page" style={{ minHeight: "100vh", paddingTop: "64px" }} />;
}

export default function App() {
  const [page, setPage] = useState<PageState>(() =>
    window.location.hash === FORM_SUBMIT_SUCCESS_HASH
      ? { id: "careers" }
      : locationToPage(window.location),
  );
  const initialPageRef = useRef(page);

  useEffect(() => {
    const initialPage = initialPageRef.current;
    const hash = window.location.hash === FORM_SUBMIT_SUCCESS_HASH ? window.location.hash : "";
    window.history.replaceState(
      withHistoryPage(initialPage),
      "",
      `${pageToUrl(initialPage)}${hash}`,
    );

    const handlePopState = (event: PopStateEvent) => {
      setPage(getHistoryPage(event.state) ?? locationToPage(window.location));
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = useCallback((newPage: PageState) => {
    window.history.pushState(withHistoryPage(newPage), "", pageToUrl(newPage));
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const renderPage = () => {
    switch (page.id) {
      case "home":
        return <Home navigate={navigate} />;
      case "story":
        return <OurStory navigate={navigate} />;
      case "projects":
        return <Projects navigate={navigate} initialFilter={page.filter} />;
      case "project-detail":
        return <ProjectDetail slug={page.slug} navigate={navigate} />;
      case "people":
        return <People navigate={navigate} />;
      case "person-detail":
        return <PersonDetail slug={page.slug} navigate={navigate} />;
      case "services":
        return <Services navigate={navigate} />;
      case "media":
        return <Media navigate={navigate} initialTag={page.tag} />;
      case "media-detail":
        return <MediaDetail slug={page.slug} navigate={navigate} />;
      case "careers":
        return <Careers />;
      case "contact":
        return <Contact />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <LangProvider>
      <div className="min-h-screen bg-white text-[#212529]">
        <Nav currentPage={page.id} navigate={navigate} />
        <main>
          <Suspense fallback={<PageLoading />}>{renderPage()}</Suspense>
        </main>
        <Footer navigate={navigate} />
      </div>
    </LangProvider>
  );
}
