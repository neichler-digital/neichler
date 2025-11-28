interface Service {
  title: string;
  description: string;
  icon: string;
  color: string;
}

const services: Service[] = [
  {
    title: "Web Development",
    description:
      "Modern, performant web applications built with care. From marketing sites to complex SPAs, we craft experiences that load fast and work flawlessly.",
    icon: "{ }",
    color: "var(--accent-cyan)",
  },
  {
    title: "Mobile Apps",
    description:
      "Native and cross-platform mobile applications. We build apps that feel right on every device, with smooth interactions and offline support.",
    icon: "[ ]",
    color: "var(--accent-pink)",
  },
  {
    title: "AI & Automation",
    description:
      "Intelligent solutions that actually solve problems. We integrate AI where it makes sense—not because it's trendy, but because it adds real value.",
    icon: "< >",
    color: "var(--accent-green)",
  },
  {
    title: "Consulting",
    description:
      "Technical guidance for teams navigating complex decisions. Architecture reviews, technology selection, and hands-on problem solving.",
    icon: "/ /",
    color: "var(--accent-purple)",
  },
];

function serviceCard(service: Service) {
  return [
    "div",
    {
      style: {
        padding: "var(--space-8)",
        backgroundColor: "var(--bg-elevated)",
        borderTop: `2px solid ${service.color}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
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
    [
      "div",
      {
        style: {
          fontSize: "var(--text-2xl)",
          color: service.color,
          fontWeight: "700",
          marginBottom: "var(--space-4)",
          fontFamily: "monospace",
        },
      },
      service.icon,
    ],
    [
      "h3",
      {
        style: {
          fontSize: "var(--text-xl)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--space-3)",
        },
      },
      service.title,
    ],
    [
      "p",
      {
        style: {
          fontSize: "var(--text-sm)",
          color: "var(--text-secondary)",
          lineHeight: "var(--leading-relaxed)",
        },
      },
      service.description,
    ],
  ];
}

export function servicesSection() {
  return [
    "section",
    {
      id: "services",
      style: {
        backgroundColor: "var(--bg-primary)",
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
              color: "var(--accent-pink)",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          "Services",
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
          "What we do",
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
          "We focus on what we're good at. Here's how we can help.",
        ],
      ],
      // Services grid
      [
        "div",
        {
          class: "grid-2col",
        },
        ...services.map((service) => serviceCard(service)),
      ],
    ],
  ];
}
