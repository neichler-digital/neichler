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
        class: "container grid-2col",
      },
      // Left side - CTA text
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
          "Have a project in mind? We'd love to hear about it. Drop us a message and we'll get back to you within a day.",
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
          contactInfo("Schedule a call", "Meeting"),
        ],
      ],
      // Right side - Contact form
      [
        "form",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          },
          onsubmit: (e: Event) => {
            e.preventDefault();
            alert("Form submission would be handled here");
          },
        },
        formField("name", "Name", "text", "Your name"),
        formField("email", "Email", "email", "your@email.com"),
        formField("message", "Message", "textarea", "Tell us about your project..."),
        [
          "button",
          {
            type: "submit",
            style: {
              padding: "var(--space-4) var(--space-8)",
              backgroundColor: "var(--accent-pink)",
              color: "var(--text-primary)",
              border: "none",
              fontFamily: "'Source Code Pro', monospace",
              fontSize: "var(--text-sm)",
              fontWeight: "600",
              letterSpacing: "0.05em",
              cursor: "pointer",
              transition: "all 0.2s ease",
              alignSelf: "flex-start",
            },
            onmouseover: (e: MouseEvent) => {
              (e.target as HTMLElement).style.backgroundColor = "#ff3385";
              (e.target as HTMLElement).style.transform = "translateY(-2px)";
            },
            onmouseout: (e: MouseEvent) => {
              (e.target as HTMLElement).style.backgroundColor = "#f92672";
              (e.target as HTMLElement).style.transform = "translateY(0)";
            },
          },
          "SEND MESSAGE",
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
        href: label === "Email" ? `mailto:${text}` : "#",
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

function formField(
  name: string,
  label: string,
  type: string,
  placeholder: string
) {
  const baseStyle = {
    width: "100%",
    padding: "var(--space-4)",
    backgroundColor: "var(--bg-elevated)",
    border: "1px solid var(--border-subtle)",
    color: "var(--text-primary)",
    fontFamily: "'Source Code Pro', monospace",
    fontSize: "var(--text-sm)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  return [
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
      },
    },
    [
      "label",
      {
        for: name,
        style: {
          fontSize: "var(--text-xs)",
          color: "var(--text-secondary)",
          textTransform: "uppercase",
          letterSpacing: "0.1em",
        },
      },
      label,
    ],
    type === "textarea"
      ? [
          "textarea",
          {
            id: name,
            name,
            placeholder,
            rows: "5",
            style: {
              ...baseStyle,
              resize: "vertical",
              minHeight: "120px",
            },
            onfocus: (e: FocusEvent) => {
              (e.target as HTMLElement).style.borderColor = "#66d9ef";
            },
            onblur: (e: FocusEvent) => {
              (e.target as HTMLElement).style.borderColor = "#49483e";
            },
          },
        ]
      : [
          "input",
          {
            id: name,
            name,
            type,
            placeholder,
            style: baseStyle,
            onfocus: (e: FocusEvent) => {
              (e.target as HTMLElement).style.borderColor = "#66d9ef";
            },
            onblur: (e: FocusEvent) => {
              (e.target as HTMLElement).style.borderColor = "#49483e";
            },
          },
        ],
  ];
}
