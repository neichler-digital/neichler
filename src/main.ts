import { $compile, $replace } from "@thi.ng/rdom";
import { reactive } from "@thi.ng/rstream";
import { nav } from "./components/nav";
import { hero } from "./components/hero";
import { about } from "./components/about";
import { servicesSection } from "./components/services";
import { technologySection } from "./components/technology";
import { howWeWork } from "./components/how-we-work";
import { teamSection } from "./components/team";
import { contact } from "./components/contact";
import { footer } from "./components/footer";
import { teamMemberDetail } from "./components/team-detail";
import { blogSection, blogPostDetail } from "./components/blog";

// Disable browser's automatic scroll restoration for hash navigation
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Simple hash-based routing
interface Route {
  type: "home" | "team-member" | "blog" | "blog-post";
  params?: { id?: string };
}

function parseRoute(hash: string): Route {
  const path = hash.replace("#/", "").replace("#", "") || "";

  // Blog post detail: #/blog/post-id
  const blogPostMatch = path.match(/^blog\/(.+)$/);
  if (blogPostMatch) {
    return { type: "blog-post", params: { id: blogPostMatch[1] } };
  }

  // Blog list: #/blog
  if (path === "blog") {
    return { type: "blog" };
  }

  // Team member detail: #/team/member-id
  const teamMatch = path.match(/^team\/(.+)$/);
  if (teamMatch) {
    return { type: "team-member", params: { id: teamMatch[1] } };
  }

  // Default to home
  return { type: "home" };
}

// Create reactive route stream
const route$ = reactive<Route>(parseRoute(window.location.hash));

// Track current route to avoid unnecessary re-renders
let currentRouteType: Route["type"] = parseRoute(window.location.hash).type;

// Listen for hash changes
window.addEventListener("hashchange", () => {
  const newRoute = parseRoute(window.location.hash);
  const hash = window.location.hash;
  const wasOnDifferentPage = currentRouteType !== "home";

  // Only update if the route type actually changed (not just section anchors)
  if (newRoute.type !== currentRouteType || newRoute.params?.id) {
    // Scroll to top immediately when navigating to a page route
    if (newRoute.type !== "home") {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
    currentRouteType = newRoute.type;
    route$.next(newRoute);
  }

  // Handle section scrolling for anchor links on home page
  if (hash && !hash.includes("/") && newRoute.type === "home") {
    if (wasOnDifferentPage) {
      // Coming from a different page - wait for DOM to re-render
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    } else {
      // Already on home page - scroll immediately
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
});

// Home page (single-page layout)
function homePage() {
  return [
    "div",
    {},
    hero(),
    about(),
    servicesSection(),
    howWeWork(),
    teamSection(),
    technologySection(),
    contact(),
  ];
}

// Router component that swaps content based on route
function routerOutlet(route: Route) {
  switch (route.type) {
    case "blog":
      return blogSection();
    case "blog-post":
      return blogPostDetail(route.params?.id || "");
    case "team-member":
      return teamMemberDetail(route.params?.id || "");
    case "home":
    default:
      return homePage();
  }
}

const app = () => {
  return [
    "div",
    {
      id: "root",
      style: {
        isolation: "isolate",
      },
    },
    nav(),
    // Reactive content based on route
    $replace(route$.map((route) => routerOutlet(route))),
    footer(),
  ];
};

$compile(app()).mount(document.getElementById("app")!);

// Handle scroll to section on home page
function handleInitialHash() {
  const hash = window.location.hash;
  // If it's a section anchor (not a route), scroll to it
  if (hash && !hash.includes("/")) {
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
}

// Force scroll to top helper
function forceScrollTop() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// Scroll to top when navigating to a new page
let lastRouteKey = "";
route$.subscribe({
  next: (route) => {
    const routeKey = route.type + (route.params?.id || "");
    if (routeKey !== lastRouteKey) {
      lastRouteKey = routeKey;
      if (route.type !== "home") {
        // Multiple scroll attempts to catch any async rendering
        forceScrollTop();
        requestAnimationFrame(forceScrollTop);
        setTimeout(forceScrollTop, 0);
        setTimeout(forceScrollTop, 50);
        setTimeout(forceScrollTop, 100);
        setTimeout(forceScrollTop, 200);
        setTimeout(forceScrollTop, 500);
      }
    }
  },
});

handleInitialHash();
