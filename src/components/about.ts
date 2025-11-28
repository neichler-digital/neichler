export function about() {
  return [
    "section",
    {
      id: "about",
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
          "About Us",
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
          "We build software that matters.",
        ],
      ],
      // Content grid
      [
        "div",
        {
          class: "grid-2col",
        },
        // Left column - main text
        [
          "div",
          {},
          [
            "p",
            {
              style: {
                fontSize: "var(--text-lg)",
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
                marginBottom: "var(--space-6)",
              },
            },
            "Neichler is a software development agency built on the belief that great software comes from deep understanding—of problems, of users, and of the craft itself.",
          ],
          [
            "p",
            {
              style: {
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
                marginBottom: "var(--space-6)",
              },
            },
            "We're a small, focused team working locally and in-house. No outsourcing, no handoffs to strangers. When you work with us, you work with us directly—people who care about getting things right.",
          ],
          [
            "p",
            {
              style: {
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
              },
            },
            "We take an agile approach, delivering iteratively and staying adaptable. But we never rush. We ship when it's ready, not when the calendar says so.",
          ],
        ],
        // Right column - values
        [
          "div",
          {
            class: "values-list",
          },
          ...values.map((value) => valueCard(value)),
        ],
      ],
    ],
  ];
}

interface Value {
  title: string;
  description: string;
  color: string;
}

const values: Value[] = [
  {
    title: "Simplicity",
    description:
      "Solutions as simple as possible, but no simpler. We question every abstraction and avoid accidental complexity.",
    color: "var(--accent-green)",
  },
  {
    title: "Craftsmanship",
    description:
      "We take time to understand problems deeply before solving them. Quality over speed, always.",
    color: "var(--accent-pink)",
  },
  {
    title: "Data-Driven",
    description:
      "We treat data as data. Plain structures over elaborate hierarchies. Making the implicit explicit.",
    color: "var(--accent-cyan)",
  },
];

function valueCard(value: Value) {
  return [
    "div",
    {
      style: {
        padding: "var(--space-6)",
        borderLeft: `3px solid ${value.color}`,
        backgroundColor: "var(--bg-elevated)",
      },
    },
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
      value.title,
    ],
    [
      "p",
      {
        style: {
          fontSize: "var(--text-sm)",
          color: "var(--text-secondary)",
          lineHeight: "var(--leading-normal)",
        },
      },
      value.description,
    ],
  ];
}
