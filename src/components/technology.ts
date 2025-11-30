interface Technology {
  name: string;
  description: string;
  color: string;
  logo?: string; // SVG content for fallback
  logoSrc?: string; // Image file path
}

// Import logo images
import djangoLogo from "../assets/logos/django.png";
import clojureLogo from "../assets/logos/clojure.png";
import mirageOsLogo from "../assets/logos/mirageos.svg";
import nixLogo from "../assets/logos/nix.png";

// SVG fallback for Jai (no image available)
const jaiLogo = `<svg viewBox="0 0 100 100" fill="currentColor">
  <text x="50" y="70" font-size="60" font-weight="bold" text-anchor="middle" font-family="monospace">J</text>
</svg>`;

const technologies: Technology[] = [
  {
    name: "Django",
    description:
      "Rapid development with Python's most mature web framework. Clean architecture, built-in admin, and battle-tested security.",
    color: "var(--accent-green)",
    logoSrc: djangoLogo,
  },
  {
    name: "Clojure",
    description:
      "Functional programming for complex domains. Immutable data, REPL-driven development, and seamless Java interop.",
    color: "var(--accent-cyan)",
    logoSrc: clojureLogo,
  },
  {
    name: "MirageOS",
    description:
      "Unikernels for minimal attack surface. Type-safe OCaml, single-purpose VMs, and infrastructure as code.",
    color: "var(--accent-orange)",
    logoSrc: mirageOsLogo,
  },
  {
    name: "Jai",
    description:
      "Systems programming done right. Zero-cost abstractions, compile-time execution, and explicit control over memory.",
    color: "var(--accent-purple)",
    logo: jaiLogo,
  },
  {
    name: "Nix",
    description:
      "Reproducible builds and deployments. Declarative configuration, rollbacks, and consistent environments everywhere.",
    color: "var(--accent-pink)",
    logoSrc: nixLogo,
  },
];

function techCard(tech: Technology) {
  return [
    "div",
    {
      style: {
        padding: "var(--space-6)",
        backgroundColor: "var(--bg-elevated)",
        borderLeft: `3px solid ${tech.color}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      },
      onmouseover: (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
      },
      onmouseout: (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      },
    },
    // Logo
    tech.logoSrc
      ? [
          "img",
          {
            src: tech.logoSrc,
            alt: `${tech.name} logo`,
            style: {
              width: "64px",
              height: "64px",
              marginBottom: "var(--space-4)",
              objectFit: "contain",
            },
          },
        ]
      : [
          "div",
          {
            style: {
              width: "64px",
              height: "64px",
              color: tech.color,
              marginBottom: "var(--space-4)",
            },
            innerHTML: tech.logo,
          },
        ],
    // Name
    [
      "h3",
      {
        style: {
          fontSize: "var(--text-lg)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--space-2)",
        },
      },
      tech.name,
    ],
    // Description
    [
      "p",
      {
        style: {
          fontSize: "var(--text-sm)",
          color: "var(--text-secondary)",
          lineHeight: "var(--leading-relaxed)",
        },
      },
      tech.description,
    ],
  ];
}

export function technologySection() {
  return [
    "section",
    {
      id: "technology",
      style: {
        backgroundColor: "var(--bg-secondary)",
        padding: "var(--space-32) var(--space-8)",
      },
    },
    [
      "div",
      {
        class: "container",
      },
      // Section header
      [
        "div",
        {
          style: {
            marginBottom: "var(--space-16)",
            textAlign: "center",
          },
        },
        [
          "span",
          {
            style: {
              fontSize: "var(--text-sm)",
              color: "var(--accent-cyan)",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          "Technology",
        ],
        [
          "h2",
          {
            style: {
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginTop: "var(--space-4)",
              lineHeight: "var(--leading-tight)",
            },
          },
          "Tools we trust",
        ],
        [
          "p",
          {
            style: {
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              marginTop: "var(--space-4)",
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
            },
          },
          "We choose technologies deliberately. These are the ones we reach for when the work matters.",
        ],
      ],
      // Tech grid - 5 items
      [
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-6)",
          },
        },
        ...technologies.map((tech) => techCard(tech)),
      ],
    ],
  ];
}
