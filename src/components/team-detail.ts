import { teamMembers, type TeamMember } from "./team";

export function teamMemberDetail(memberId: string) {
  const member = teamMembers.find((m) => m.id === memberId);

  if (!member) {
    return notFound();
  }

  return memberPage(member);
}

function notFound() {
  return [
    "section",
    {
      style: {
        minHeight: "100vh",
        padding: "var(--space-32) var(--space-8)",
        paddingTop: "calc(72px + var(--space-8))",
        backgroundColor: "var(--bg-primary)",
      },
    },
    [
      "div",
      {
        style: {
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        },
      },
      [
        "h1",
        {
          style: {
            fontSize: "var(--text-4xl)",
            fontWeight: "700",
            color: "var(--text-primary)",
            marginBottom: "var(--space-4)",
          },
        },
        "Team member not found",
      ],
      [
        "p",
        {
          style: {
            fontSize: "var(--text-lg)",
            color: "var(--text-secondary)",
            marginBottom: "var(--space-8)",
          },
        },
        "The person you're looking for doesn't exist.",
      ],
      [
        "a",
        {
          href: "#/",
          style: {
            display: "inline-block",
            padding: "var(--space-4) var(--space-8)",
            backgroundColor: "var(--accent-pink)",
            color: "var(--text-primary)",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "var(--text-sm)",
          },
        },
        "← Back to Home",
      ],
    ],
  ];
}

function memberPage(member: TeamMember) {
  // Split long bio into paragraphs
  const paragraphs = member.longBio.split("\n\n").filter((p) => p.trim());

  return [
    "section",
    {
      style: {
        minHeight: "100vh",
        padding: "var(--space-32) var(--space-8)",
        paddingTop: "calc(72px + var(--space-8))",
        backgroundColor: "var(--bg-primary)",
      },
    },
    [
      "div",
      {
        class: "container",
      },
      // Back link
      [
        "a",
        {
          href: "#/",
          style: {
            display: "inline-block",
            fontSize: "var(--text-sm)",
            color: "var(--accent-cyan)",
            textDecoration: "none",
            marginBottom: "var(--space-8)",
            transition: "opacity 0.2s ease",
          },
          onmouseover: (e: MouseEvent) => {
            (e.currentTarget as HTMLElement).style.opacity = "0.7";
          },
          onmouseout: (e: MouseEvent) => {
            (e.currentTarget as HTMLElement).style.opacity = "1";
          },
        },
        "← Back to Home",
      ],
      // Content wrapper - single column with max-width
      [
        "div",
        {
          style: {
            maxWidth: "700px",
          },
        },
        // Section label
        [
          "span",
          {
            style: {
              fontSize: "var(--text-sm)",
              color: member.color,
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          "Team Member",
        ],
        // Name
        [
          "h1",
          {
            style: {
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginTop: "var(--space-4)",
              marginBottom: "var(--space-2)",
              lineHeight: "var(--leading-tight)",
            },
          },
          member.name,
        ],
        // Role
        [
          "p",
          {
            style: {
              fontSize: "var(--text-xl)",
              color: member.color,
              fontWeight: "500",
              marginBottom: "var(--space-16)",
            },
          },
          member.role,
        ],
        // Bio paragraphs
        ...paragraphs.map((para) => [
          "p",
          {
            style: {
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              lineHeight: "var(--leading-relaxed)",
              marginBottom: "var(--space-6)",
            },
          },
          para,
        ]),
        // Contact CTA
        [
          "div",
          {
            style: {
              marginTop: "var(--space-16)",
              padding: "var(--space-8)",
              backgroundColor: "var(--bg-secondary)",
              borderLeft: `3px solid ${member.color}`,
            },
          },
          [
            "p",
            {
              style: {
                fontSize: "var(--text-base)",
                color: "var(--text-secondary)",
                marginBottom: "var(--space-4)",
              },
            },
            `Want to work with ${member.name.split(" ")[0]}?`,
          ],
          [
            "a",
            {
              href: "#/contact",
              style: {
                display: "inline-block",
                padding: "var(--space-3) var(--space-6)",
                backgroundColor: member.color,
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
            "Get in touch →",
          ],
        ],
      ],
    ],
  ];
}
