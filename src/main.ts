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

// Simple hash-based routing
interface Route {
  type: "home" | "team-member";
  params?: { id?: string };
}

function parseRoute(hash: string): Route {
  const path = hash.replace("#/", "").replace("#", "") || "";

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

// Listen for hash changes
window.addEventListener("hashchange", () => {
  route$.next(parseRoute(window.location.hash));
});

// Home page (single-page layout)
function homePage() {
  return [
    "div",
    {},
    hero(),
    about(),
    servicesSection(),
    technologySection(),
    howWeWork(),
    teamSection(),
    contact(),
  ];
}

// Router component that swaps content based on route
function routerOutlet(route: Route) {
  switch (route.type) {
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
    { id: "root" },
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

// Scroll to top when navigating to a new page
route$.subscribe({
  next: (route) => {
    if (route.type !== "home") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  },
});

handleInitialHash();
