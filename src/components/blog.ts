import { blogPosts, HiccupNode } from "./blog-data";
export { blogPosts };

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  color: string;
  content: HiccupNode[];
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function applyStyles(node: HiccupNode, color: string): any {
  if (typeof node === "string") {
    return node;
  }

  const [tag, attrs, ...children] = node;
  const styledAttrs = { ...attrs } as Record<string, unknown>;

  // Apply styles based on tag type
  switch (tag) {
    case "h1":
      styledAttrs.style = `font-size: var(--text-3xl); font-weight: 700; color: var(--text-primary); margin: var(--space-8) 0 var(--space-4) 0; line-height: var(--leading-tight);`;
      break;
    case "h2":
      styledAttrs.style = `font-size: var(--text-2xl); font-weight: 600; color: var(--text-primary); margin: var(--space-8) 0 var(--space-4) 0; line-height: var(--leading-tight);`;
      break;
    case "h3":
      styledAttrs.style = `font-size: var(--text-xl); font-weight: 600; color: var(--text-primary); margin: var(--space-6) 0 var(--space-3) 0;`;
      break;
    case "h4":
    case "h5":
    case "h6":
      styledAttrs.style = `font-size: var(--text-lg); font-weight: 600; color: var(--text-primary); margin: var(--space-4) 0 var(--space-2) 0;`;
      break;
    case "p":
      styledAttrs.style = `margin: 0 0 var(--space-4) 0; line-height: var(--leading-relaxed);`;
      break;
    case "ul":
    case "ol":
      styledAttrs.style = `margin: 0 0 var(--space-4) 0; padding-left: var(--space-6); line-height: var(--leading-relaxed);`;
      break;
    case "li":
      styledAttrs.style = `margin-bottom: var(--space-2);`;
      break;
    case "a":
      styledAttrs.style = `color: ${color}; text-decoration: underline;`;
      break;
    case "strong":
      styledAttrs.style = `font-weight: 600; color: var(--text-primary);`;
      break;
    case "em":
      styledAttrs.style = `font-style: italic;`;
      break;
    case "code":
      styledAttrs.style = `background: var(--bg-secondary); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; font-size: 0.9em;`;
      break;
    case "pre":
      styledAttrs.style = `background: var(--bg-secondary); padding: var(--space-4); overflow-x: auto; margin: 0 0 var(--space-4) 0; border-radius: 4px;`;
      break;
    case "blockquote":
      styledAttrs.style = `border-left: 3px solid ${color}; padding-left: var(--space-4); margin: var(--space-4) 0; color: var(--text-muted);`;
      break;
    case "table":
      styledAttrs.style = `width: 100%; border-collapse: collapse; margin: var(--space-4) 0; font-size: var(--text-sm);`;
      break;
    case "thead":
      styledAttrs.style = `background: var(--bg-secondary);`;
      break;
    case "th":
      styledAttrs.style = `padding: var(--space-3) var(--space-4); text-align: left; border-bottom: 2px solid ${color}; font-weight: 600; color: var(--text-primary);`;
      break;
    case "td":
      styledAttrs.style = `padding: var(--space-3) var(--space-4); border-bottom: 1px solid var(--bg-elevated);`;
      break;
    case "hr":
      styledAttrs.style = `border: none; border-top: 1px solid var(--bg-elevated); margin: var(--space-8) 0;`;
      break;
    case "img":
      styledAttrs.style = `max-width: 100%; height: auto; margin: var(--space-4) 0;`;
      break;
  }

  const styledChildren = children.map((child: HiccupNode) => applyStyles(child, color));
  return [tag, styledAttrs, ...styledChildren];
}

function renderContent(content: HiccupNode[], color: string): any[] {
  return content.map((node) => applyStyles(node, color));
}

function blogPostCard(post: BlogPost) {
  return [
    "a",
    {
      href: `#/blog/${post.id}`,
      style: {
        display: "block",
        padding: "var(--space-8)",
        backgroundColor: "var(--bg-elevated)",
        borderTop: `2px solid ${post.color}`,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        textDecoration: "none",
      },
      onmouseover: (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
      },
      onmouseout: (e: MouseEvent) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      },
    },
    [
      "div",
      {
        style: {
          display: "flex",
          gap: "var(--space-4)",
          marginBottom: "var(--space-4)",
          fontSize: "var(--text-sm)",
          color: "var(--text-muted)",
        },
      },
      [
        "span",
        {
          style: { color: post.color },
        },
        formatDate(post.date),
      ],
      [
        "span",
        {},
        "•",
      ],
      [
        "span",
        {},
        post.author,
      ],
    ],
    [
      "h3",
      {
        style: {
          fontSize: "var(--text-xl)",
          fontWeight: "600",
          color: "var(--text-primary)",
          marginBottom: "var(--space-3)",
        },
      },
      post.title,
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
      post.excerpt,
    ],
    [
      "span",
      {
        style: {
          display: "inline-block",
          marginTop: "var(--space-4)",
          fontSize: "var(--text-sm)",
          color: post.color,
          fontWeight: "500",
        },
      },
      "Read more →",
    ],
  ];
}

export function blogSection() {
  return [
    "section",
    {
      style: {
        minHeight: "100vh",
        padding: "var(--space-16) var(--space-8)",
        paddingTop: "calc(72px + var(--space-8))",
        backgroundColor: "var(--bg-primary)",
      },
    },
    [
      "div",
      {
        style: {
          maxWidth: "var(--max-content-width)",
          margin: "0 auto",
        },
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
              color: "var(--accent-green)",
              fontWeight: "600",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            },
          },
          "Blog",
        ],
        [
          "h1",
          {
            style: {
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginTop: "var(--space-4)",
              lineHeight: "var(--leading-tight)",
            },
          },
          "Thoughts & Updates",
        ],
        [
          "p",
          {
            style: {
              fontSize: "var(--text-lg)",
              color: "var(--text-secondary)",
              marginTop: "var(--space-4)",
              maxWidth: "600px",
            },
          },
          "Ideas, experiments, and lessons learned along the way.",
        ],
      ],
      // Blog posts list (single column)
      [
        "div",
        {
          class: "blog-grid",
          style: "display: flex; flex-direction: column; gap: var(--space-8);",
        },
        ...blogPosts.map((post) => blogPostCard(post as BlogPost)),
      ],
    ],
  ];
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
        "Post not found",
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
        "The blog post you're looking for doesn't exist.",
      ],
      [
        "a",
        {
          href: "#/blog",
          style: {
            display: "inline-block",
            padding: "var(--space-4) var(--space-8)",
            backgroundColor: "var(--accent-green)",
            color: "var(--bg-primary)",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "var(--text-sm)",
          },
        },
        "← Back to Blog",
      ],
    ],
  ];
}

export function blogPostDetail(postId: string) {
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    return notFound();
  }

  return [
    "section",
    {
      style: {
        minHeight: "100vh",
        padding: "var(--space-16) var(--space-8)",
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
          href: "#/blog",
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
        "← Back to Blog",
      ],
      // Header
      [
        "div",
        {
          style: {
            marginBottom: "var(--space-12)",
          },
        },
        [
          "div",
          {
            style: {
              display: "flex",
              gap: "var(--space-4)",
              marginBottom: "var(--space-4)",
              fontSize: "var(--text-sm)",
              color: "var(--text-muted)",
            },
          },
          [
            "span",
            {
              style: { color: post.color },
            },
            formatDate(post.date),
          ],
          [
            "span",
            {},
            "•",
          ],
          [
            "span",
            {},
            post.author,
          ],
        ],
        [
          "h1",
          {
            style: {
              fontSize: "var(--text-4xl)",
              fontWeight: "700",
              color: "var(--text-primary)",
              marginBottom: "var(--space-4)",
              lineHeight: "var(--leading-tight)",
            },
          },
          post.title,
        ],
      ],
      // Divider
      [
        "div",
        {
          style: {
            height: "3px",
            width: "60px",
            backgroundColor: post.color,
            marginBottom: "var(--space-12)",
          },
        },
      ],
      // Content
      [
        "article",
        {
          style:
            "font-size: var(--text-lg); color: var(--text-secondary); line-height: var(--leading-relaxed);",
        },
        ...renderContent(post.content, post.color),
      ],
      // Footer CTA
      [
        "div",
        {
          style: {
            marginTop: "var(--space-16)",
            padding: "var(--space-8)",
            backgroundColor: "var(--bg-secondary)",
            borderLeft: `3px solid ${post.color}`,
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
          "Want to work with us on your next project?",
        ],
        [
          "a",
          {
            href: "#contact",
            style: {
              display: "inline-block",
              padding: "var(--space-3) var(--space-6)",
              backgroundColor: post.color,
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
  ];
}
