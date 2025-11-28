interface Technology {
  name: string;
  description: string;
  color: string;
  logo: string; // SVG path or content
}

// SVG logos for each technology
const djangoLogo = `<svg viewBox="0 0 100 100" fill="currentColor">
  <path d="M25 10h20v55c-10 2-17 3-25 3-14 0-21-6-21-19 0-12 8-20 20-20 3 0 5 0 6 1V10zm0 50c2 0 4 0 6-1V42c-2 0-3-1-5-1-7 0-11 4-11 10 0 6 4 9 10 9z"/>
  <path d="M55 10h20v70h-20z"/>
  <circle cx="65" cy="5" r="10"/>
</svg>`;

const clojureLogo = `<svg viewBox="0 0 100 100" fill="currentColor">
  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="4"/>
  <path d="M50 15c-20 0-35 15-35 35h10c0-14 11-25 25-25V15z"/>
  <path d="M50 85c20 0 35-15 35-35h-10c0 14-11 25-25 25V85z"/>
  <circle cx="50" cy="50" r="8"/>
</svg>`;

const mirageOsLogo = `<svg viewBox="0 0 100 100" fill="currentColor">
  <polygon points="50,5 95,75 5,75"/>
  <polygon points="50,25 80,70 20,70" fill="var(--bg-primary)"/>
  <polygon points="50,40 65,65 35,65"/>
</svg>`;

const jaiLogo = `<svg viewBox="0 0 100 100" fill="currentColor">
  <text x="50" y="70" font-size="60" font-weight="bold" text-anchor="middle" font-family="monospace">J</text>
</svg>`;

const nixLogo = `<svg viewBox="0 0 100 100" fill="currentColor">
  <path d="M50 10l35 20v40l-35 20-35-20V30z" fill="none" stroke="currentColor" stroke-width="4"/>
  <path d="M50 25l20 12v23l-20 12-20-12V37z"/>
</svg>`;

const technologies: Technology[] = [
  {
    name: "Django",
    description:
      "Rapid development with Python's most mature web framework. Clean architecture, built-in admin, and battle-tested security.",
    color: "var(--accent-green)",
    logo: djangoLogo,
  },
  {
    name: "Clojure",
    description:
      "Functional programming for complex domains. Immutable data, REPL-driven development, and seamless Java interop.",
    color: "var(--accent-cyan)",
    logo: clojureLogo,
  },
  {
    name: "MirageOS",
    description:
      "Unikernels for minimal attack surface. Type-safe OCaml, single-purpose VMs, and infrastructure as code.",
    color: "var(--accent-orange)",
    logo: mirageOsLogo,
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
    logo: nixLogo,
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
    [
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
