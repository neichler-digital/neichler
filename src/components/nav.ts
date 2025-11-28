export function nav() {
  return [
    "nav",
    {
      style: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "100",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "var(--space-6) var(--space-8)",
        background:
          "linear-gradient(180deg, rgba(39,40,34,0.95) 0%, rgba(39,40,34,0) 100%)",
      },
    },
    // Logo
    [
      "a",
      {
        href: "#",
        style: {
          fontSize: "var(--text-lg)",
          fontWeight: "700",
          color: "var(--text-primary)",
          textDecoration: "none",
          letterSpacing: "0.05em",
        },
      },
      "NEICHLER",
    ],
    // Nav links (desktop)
    [
      "div",
      {
        class: "nav-links",
        style: {
          display: "flex",
          gap: "var(--space-8)",
          alignItems: "center",
        },
      },
      ...["About", "Services", "Process", "Team", "Contact"].map((item) => [
        "a",
        {
          href: `#${item.toLowerCase()}`,
          style: {
            fontSize: "var(--text-sm)",
            color: "var(--text-secondary)",
            textDecoration: "none",
            transition: "color 0.2s ease",
            fontWeight: "400",
          },
          onmouseover: (e: MouseEvent) => {
            (e.target as HTMLElement).style.color = "#f8f8f2";
          },
          onmouseout: (e: MouseEvent) => {
            (e.target as HTMLElement).style.color = "#75715e";
          },
        },
        item,
      ]),
    ],
    // Mobile menu button
    [
      "button",
      {
        class: "mobile-menu-btn",
        style: {
          display: "none",
          background: "none",
          border: "none",
          color: "var(--text-primary)",
          fontSize: "var(--text-xl)",
          cursor: "pointer",
          padding: "var(--space-2)",
        },
        onclick: () => {
          const mobileNav = document.getElementById("mobile-nav");
          if (mobileNav) {
            mobileNav.style.display =
              mobileNav.style.display === "none" ? "flex" : "none";
          }
        },
      },
      "≡",
    ],
    // Mobile nav dropdown
    [
      "div",
      {
        id: "mobile-nav",
        style: {
          display: "none",
          position: "absolute",
          top: "100%",
          left: "0",
          right: "0",
          flexDirection: "column",
          backgroundColor: "var(--bg-secondary)",
          padding: "var(--space-4)",
          gap: "var(--space-4)",
        },
      },
      ...["About", "Services", "Process", "Team", "Contact"].map((item) => [
        "a",
        {
          href: `#${item.toLowerCase()}`,
          style: {
            fontSize: "var(--text-base)",
            color: "var(--text-secondary)",
            textDecoration: "none",
            padding: "var(--space-3)",
          },
          onclick: () => {
            const mobileNav = document.getElementById("mobile-nav");
            if (mobileNav) mobileNav.style.display = "none";
          },
        },
        item,
      ]),
    ],
  ];
}
