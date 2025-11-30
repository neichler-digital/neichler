export function contact() {
  return [
    "section",
    {
      id: "contact",
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
      [
        "div",
        {},
        [
          "span",
          {
            style: {
              fontSize: "var(--text-sm)",
              color: "var(--accent-green)",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          "Get in Touch",
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
          "Let's build something together.",
        ],
        [
          "p",
          {
            style: {
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              marginTop: "var(--space-6)",
              lineHeight: "var(--leading-relaxed)",
            },
          },
          "Have a project in mind? We'd love to hear about it. Get in touch and we'll get back to you within a day.",
        ],
        [
          "div",
          {
            style: {
              marginTop: "var(--space-8)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-4)",
            },
          },
          contactInfo("hello@neichler.com", "Email"),
          contactInfo("0410 370 589", "Phone"),
        ],
      ],
    ],
  ];
}

function contactInfo(text: string, label: string) {
  return [
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
      },
    },
    [
      "span",
      {
        style: {
          fontSize: "var(--text-xs)",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          width: "60px",
        },
      },
      label,
    ],
    [
      "a",
      {
        href: label === "Email" ? `mailto:${text}` : label === "Phone" ? `tel:${text.replace(/\s/g, '')}` : "#",
        style: {
          fontSize: "var(--text-base)",
          color: "var(--accent-cyan)",
          textDecoration: "none",
          transition: "color 0.2s ease",
        },
        onmouseover: (e: MouseEvent) => {
          (e.target as HTMLElement).style.textDecoration = "underline";
        },
        onmouseout: (e: MouseEvent) => {
          (e.target as HTMLElement).style.textDecoration = "none";
        },
      },
      text,
    ],
  ];
}
