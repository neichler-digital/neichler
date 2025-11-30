export function nav() {
  return [
    "nav",
    {
      style: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        height: "72px",
        zIndex: "1000",
        isolation: "isolate",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 var(--space-8)",
        background: "var(--bg-primary)",
      },
    },
    // Logo
    [
      "a",
      {
        href: "#hero",
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
      ...["About", "Services", "Process", "Team", "Blog", "Contact"].map(
        (item) => [
          "a",
          {
            href: item === "Blog" ? "#/blog" : `#${item.toLowerCase()}`,
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
        ]
      ),
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
          fontSize: "2rem",
          cursor: "pointer",
          padding: "var(--space-2)",
        },
        onclick: () => {
          const mobileNav = document.getElementById("mobile-nav");
          if (mobileNav) {
            const isHidden = mobileNav.style.display === "none" || mobileNav.style.display === "";
            mobileNav.style.display = isHidden ? "flex" : "none";
            mobileNav.style.flexDirection = "column";
          }
        },
      },
      "≡",
    ],
    // Mobile nav sidebar
    [
      "div",
      {
        id: "mobile-nav",
        style: "display: none; position: fixed; top: 72px; left: 0; bottom: 0; width: 250px; flex-direction: column; background-color: var(--bg-secondary); padding: var(--space-6); gap: var(--space-2); z-index: 999; box-shadow: 4px 0 20px rgba(0,0,0,0.3);",
      },
      ...["About", "Services", "Process", "Team", "Blog", "Contact"].map(
        (item) => [
          "a",
          {
            href: item === "Blog" ? "#/blog" : `#${item.toLowerCase()}`,
            style: {
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              textDecoration: "none",
              padding: "var(--space-4) var(--space-3)",
              borderBottom: "1px solid var(--border-subtle)",
            },
            onclick: () => {
              const mobileNav = document.getElementById("mobile-nav");
              if (mobileNav) mobileNav.style.display = "none";
            },
          },
          item,
        ]
      ),
    ],
  ];
}
