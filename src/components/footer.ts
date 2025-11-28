export function footer() {
  const currentYear = new Date().getFullYear();

  return [
    "footer",
    {
      style: {
        backgroundColor: "var(--bg-primary)",
        borderTop: "1px solid var(--border-subtle)",
        padding: "var(--space-12) var(--space-8)",
      },
    },
    [
      "div",
      {
        style: {
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
      },
      // Left - Logo and copyright
      [
        "div",
        {},
        [
          "div",
          {
            style: {
              fontSize: "var(--text-lg)",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginBottom: "var(--space-2)",
            },
          },
          "NEICHLER",
        ],
        [
          "p",
          {
            style: {
              fontSize: "var(--text-xs)",
              color: "var(--text-muted)",
            },
          },
          `© ${currentYear} Neichler. All rights reserved.`,
        ],
      ],
      // Right - Links
      [
        "div",
        {
          style: {
            display: "flex",
            gap: "var(--space-8)",
          },
        },
        ...["GitHub", "LinkedIn", "Twitter"].map((link) => [
          "a",
          {
            href: "#",
            style: {
              fontSize: "var(--text-sm)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            },
            onmouseover: (e: MouseEvent) => {
              (e.target as HTMLElement).style.color = "#66d9ef";
            },
            onmouseout: (e: MouseEvent) => {
              (e.target as HTMLElement).style.color = "#75715e";
            },
          },
          link,
        ]),
      ],
    ],
  ];
}
