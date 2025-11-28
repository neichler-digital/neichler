export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  color: string;
  longBio: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "alex-chen",
    name: "Alex Chen",
    role: "Founder & Lead Developer",
    bio: "Full-stack engineer with a passion for elegant solutions and clean architecture. 10+ years building software that stands the test of time.",
    color: "var(--accent-pink)",
    longBio: `Alex founded Neichler after a decade of working at both startups and large enterprises, seeing firsthand what works and what doesn't in software development.

The pattern was always the same: teams would start with good intentions, then complexity would creep in. Abstractions piled on abstractions. Simple features became multi-week projects. Codebases became archaeological dig sites.

Neichler was born from a simple conviction: it doesn't have to be this way. Software can be built thoughtfully, with intention. Every line of code can earn its place.

Before founding Neichler, Alex led engineering teams at [Previous Company], shipped products used by millions, and contributed to several open-source projects in the data visualization space.

When not coding, Alex can be found hiking local trails, experimenting with generative art, or reading about systems thinking and organizational design.`,
  },
  {
    id: "jordan-rivera",
    name: "Jordan Rivera",
    role: "Senior Engineer",
    bio: "Systems thinker who loves making complex problems simple. Specializes in performance optimization and data architecture.",
    color: "var(--accent-cyan)",
    longBio: `Jordan joined Neichler drawn by the philosophy of simplicity and craftsmanship. After years of watching projects sink under their own weight, the opportunity to build things the right way was irresistible.

With a background in distributed systems and data engineering, Jordan brings a unique perspective to every project. The question is never "can we build it?" but "should we build it this way?"

Prior experience includes building real-time analytics pipelines at scale, designing fault-tolerant systems for financial services, and optimizing database performance for high-traffic applications.

Jordan is a strong believer in the power of constraints. The best solutions often come from understanding what you don't need to build.

Outside of work, Jordan contributes to local tech meetups, mentors junior developers, and maintains a small collection of mechanical keyboards.`,
  },
  {
    id: "sam-taylor",
    name: "Sam Taylor",
    role: "Product Engineer",
    bio: "Bridge between users and technology. Combines deep technical skills with genuine empathy for the people using what we build.",
    color: "var(--accent-green)",
    longBio: `Sam's path to engineering was unconventional—starting in user research before transitioning to development. This dual perspective shapes everything Sam builds.

At Neichler, Sam ensures we never lose sight of why we're building in the first place. Features are only valuable if people can actually use them. Code is only clean if the product makes sense.

This means asking uncomfortable questions early: Do users actually need this? What's the simplest version that delivers value? Where will this break under real-world conditions?

Previous work includes redesigning user flows that increased conversion by 40%, building accessible interfaces for healthcare applications, and developing mobile experiences that work beautifully even on slow connections.

Sam is passionate about inclusive design and regularly speaks at conferences about building technology that works for everyone. In spare time, you'll find Sam prototyping ideas, reading cognitive science papers, or perfecting pour-over coffee technique.`,
  },
];

function teamMemberCard(member: TeamMember) {
  return [
    "a",
    {
      href: `#/team/${member.id}`,
      style: {
        display: "block",
        padding: "var(--space-8)",
        backgroundColor: "var(--bg-elevated)",
        borderLeft: `3px solid ${member.color}`,
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.2s ease, background-color 0.2s ease",
        cursor: "pointer",
      },
      onmouseover: (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = "translateX(8px)";
        target.style.backgroundColor = "#4a4940";
      },
      onmouseout: (e: MouseEvent) => {
        const target = e.currentTarget as HTMLElement;
        target.style.transform = "translateX(0)";
        target.style.backgroundColor = "var(--bg-elevated)";
      },
    },
    // Avatar placeholder
    [
      "div",
      {
        style: {
          width: "80px",
          height: "80px",
          borderRadius: "4px",
          backgroundColor: member.color,
          opacity: "0.2",
          marginBottom: "var(--space-6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      },
      [
        "span",
        {
          style: {
            fontSize: "var(--text-2xl)",
            fontWeight: "700",
            color: member.color,
            opacity: "1",
          },
        },
        member.name
          .split(" ")
          .map((n) => n[0])
          .join(""),
      ],
    ],
    [
      "h3",
      {
        style: {
          fontSize: "var(--text-xl)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--space-2)",
        },
      },
      member.name,
    ],
    [
      "p",
      {
        style: {
          fontSize: "var(--text-sm)",
          color: member.color,
          fontWeight: "500",
          marginBottom: "var(--space-4)",
        },
      },
      member.role,
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
      member.bio,
    ],
    // "Read more" indicator
    [
      "span",
      {
        style: {
          display: "inline-block",
          marginTop: "var(--space-4)",
          fontSize: "var(--text-xs)",
          color: member.color,
          fontWeight: "500",
        },
      },
      "Learn more →",
    ],
  ];
}

export function teamSection() {
  return [
    "section",
    {
      id: "team",
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
          },
        },
        [
          "span",
          {
            style: {
              fontSize: "var(--text-sm)",
              color: "var(--accent-purple)",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          "Our Team",
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
          "The people behind the code.",
        ],
        [
          "p",
          {
            style: {
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              marginTop: "var(--space-4)",
              maxWidth: "600px",
              lineHeight: "var(--leading-relaxed)",
            },
          },
          "A small team of experienced engineers who care deeply about building software the right way.",
        ],
      ],
      // Team grid
      [
        "div",
        {
          class: "team-grid",
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "var(--space-8)",
          },
        },
        ...teamMembers.map((member) => teamMemberCard(member)),
      ],
    ],
  ];
}
