interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Project Inquiry",
    description:
      "Have a digital product idea? Reach out through our contact form or book a free initial consultation with us directly online.",
    details: [
      "Simple contact form submission",
      "Free initial consultation",
      "No obligation, no pressure",
      "Quick response within 24 hours",
    ],
    color: "var(--accent-cyan)",
  },
  {
    number: "02",
    title: "Discovery Call",
    description:
      "In our first conversation, we get to know your project, clarify goals and requirements, and discuss how we can best support you.",
    details: [
      "Understanding your vision and goals",
      "Clarifying scope and requirements",
      "Identifying key challenges",
      "Exploring how we can help",
    ],
    color: "var(--accent-pink)",
  },
  {
    number: "03",
    title: "Estimation",
    description:
      "Together with our developers and designers, we create a User Story Map and estimate the effort—supported by AI-assisted analysis for well-founded planning.",
    details: [
      "Collaborative story mapping session",
      "AI-assisted effort estimation",
      "Transparent cost breakdown",
      "Realistic timeline planning",
    ],
    color: "var(--accent-green)",
  },
  {
    number: "04",
    title: "Concept Sprint",
    description:
      "Before development begins, our team develops the vision of your product—from initial sketches to key design decisions that create a clear foundation.",
    details: [
      "Product vision and strategy",
      "Initial wireframes and sketches",
      "Core design decisions",
      "Clear foundation for development",
    ],
    color: "var(--accent-purple)",
  },
  {
    number: "05",
    title: "Development",
    description:
      "As equal partners with transparent communication, we develop your idea together as a team. As Product Owner, you guide the priorities and requirements throughout.",
    details: [
      "Collaborative, transparent process",
      "You stay in control as Product Owner",
      "Regular updates and demos",
      "Agile adaptation to your needs",
    ],
    color: "var(--accent-orange)",
  },
];

function processStepCard(step: ProcessStep) {
  return [
    "div",
    {
      style: {
        padding: "var(--space-8)",
        backgroundColor: "var(--bg-elevated)",
        borderLeft: `3px solid ${step.color}`,
        marginBottom: "var(--space-6)",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    // Header with number and title
    [
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--space-4)",
          marginBottom: "var(--space-4)",
        },
      },
      [
        "span",
        {
          style: {
            fontSize: "var(--text-sm)",
            fontWeight: "700",
            color: step.color,
          },
        },
        step.number,
      ],
      [
        "h3",
        {
          style: {
            fontSize: "var(--text-xl)",
            fontWeight: "600",
            color: "var(--text-primary)",
          },
        },
        step.title,
      ],
    ],
    // Description
    [
      "p",
      {
        style: {
          fontSize: "var(--text-base)",
          color: "var(--text-secondary)",
          lineHeight: "var(--leading-relaxed)",
          marginBottom: "var(--space-4)",
        },
      },
      step.description,
    ],
    // Details as horizontal row with borders
    [
      "div",
      {
        class: "process-details",
        style: {
          display: "flex",
          border: "1px solid var(--border-subtle)",
        },
      },
      ["div", { style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", padding: "var(--space-3)", borderRight: "1px solid var(--border-subtle)", flex: "1" } }, `→ ${step.details[0]}`],
      ["div", { style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", padding: "var(--space-3)", borderRight: "1px solid var(--border-subtle)", flex: "1" } }, `→ ${step.details[1]}`],
      ["div", { style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", padding: "var(--space-3)", borderRight: "1px solid var(--border-subtle)", flex: "1" } }, `→ ${step.details[2]}`],
      ["div", { style: { fontSize: "var(--text-sm)", color: "var(--text-secondary)", padding: "var(--space-3)", flex: "1" } }, `→ ${step.details[3]}`],
    ],
  ];
}

export function howWeWork() {
  return [
    "section",
    {
      id: "process",
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
              color: "var(--accent-orange)",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          "Our Process",
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
          "How we work",
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
          "No black boxes, no surprises. Here's exactly what working with us looks like.",
        ],
      ],
      // Process steps
      [
        "div",
        {
          class: "process-steps",
          style: {
            display: "block",
          },
        },
        processStepCard(processSteps[0]),
        processStepCard(processSteps[1]),
        processStepCard(processSteps[2]),
        processStepCard(processSteps[3]),
        processStepCard(processSteps[4]),
      ],
      // Bottom CTA
      [
        "div",
        {
          style: {
            marginTop: "var(--space-24)",
            textAlign: "center",
            padding: "var(--space-8)",
            backgroundColor: "var(--bg-elevated)",
            borderTop: "2px solid var(--accent-orange)",
          },
        },
        [
          "p",
          {
            style: {
              fontSize: "var(--text-lg)",
              color: "var(--text-primary)",
              marginBottom: "var(--space-4)",
            },
          },
          "Ready to start a conversation?",
        ],
        [
          "a",
          {
            href: "#contact",
            style: {
              display: "inline-block",
              padding: "var(--space-4) var(--space-8)",
              backgroundColor: "var(--accent-orange)",
              color: "var(--bg-primary)",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "var(--text-sm)",
              transition: "opacity 0.2s ease",
            },
            onmouseover: (e: MouseEvent) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.85";
            },
            onmouseout: (e: MouseEvent) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
            },
          },
          "GET IN TOUCH",
        ],
      ],
    ],
  ];
}
