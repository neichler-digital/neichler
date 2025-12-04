export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  color: string;
  longBio: string;
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "timothy-eichler",
    name: "Timothy Eichler",
    role: "Founder & Lead Developer",
    bio: "From mechanical engineering to software development, driven by a passion for automation and elegant solutions.",
    color: "var(--accent-pink)",
    longBio: `My first exposure to coding was through my brother when I was 15—he inspired me to build a calculator in the terminal.

Originally I was studying mechanical engineering and working as a technical drafter at [RUD](https://rud.com.au) and [W&K-Automation](https://www.wuk-automation.de/), doing 3D modelling. I fell in love with parametric design and generating complete models and designs based on inputs and calculations fed in through Excel. It was my first exposure to automating processes through technology.

I got into programming to solve a problem I kept running into—I wanted to build an organizational application to help me declutter my computer in an automated, rule-based, hotkey-driven manner. This became the [Uncrumpled project](https://bitbucket.org/timeyyy/uncrumpled_old/src/master/). The idea was simple, but I got bogged down in scope creep. I wanted to embed Neovim directly into the application, but the architecture wasn't there yet at the time. I ended up contributing to [extended marks](https://www.reddit.com/r/neovim/comments/brnlrs/extended_marks_what_are_they/) and built [pytknvim](https://github.com/timeyyy/pytknvim) as part of that exploration. Uncrumpled is slowly coming out of the drawer i left it in, help me validate the idea at [uncrumpled.app](https://uncrumpled.app).

Eventually I pivoted away from mechanical engineering to pursue work as a software developer. I worked at [Ambient Digital](https://ambient.digital) and [ThoughtWorks](https://thoughtworks.com) as a developer and consultant, gaining experience across a variety of projects and technologies.

One problem I noticed during my time in offices: we'd sometimes listen to music together, but there was never really a fair way to decide what to play. Everyone has different tastes, and someone always ends up unhappy. That's part of what led me to build [Zenchor](https://zenchor.com)—a solution for democratically choosing music, and more broadly, a way for people to connect with each other through shared experiences. You can read more about the vision at [zenchor.com/about](https://zenchor.com/about).`,
    image: "/src/assets/team/tim.png",
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
        position: "relative",
        zIndex: "1",
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
