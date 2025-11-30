export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  content: string;
  color: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "automating-claude",
    title: "Automating Claude",
    excerpt:
      "With AI tools getting more and more capable for coding, the dream of working like Homer is becoming more of a reality.",
    date: "2024-12-28",
    author: "Neichler Team",
    color: "var(--accent-cyan)",
    content: `With AI tools getting more and more capable for coding, the dream of working like Homer is becoming more of a reality. Instead of having a bird cover for us (see the video: https://www.youtube.com/shorts/PPk-z5ZJcrA), we have created automate_claude.

The magic first starts with breaking down your tasks into iterative Claude commands. Once this is done, one would normally have to enter them in and wait for them to execute. Automate Claude takes over this task for us - we can enter in the command sequence that we want it to execute, and it will take care to run the sequence of commands N times (whatever we decide).

In order to make sure work was completed properly, we run a check after each command and optionally retry if something went wrong. If we run out of usage and are throttled, the program will sleep until it can continue working again.

Note: in case you didn't know, each time we interact with a chat agent, the entire history of that chat session is sent to the model for computation, meaning we run our limits down faster. The automate command makes sure to run each command in a fresh session for us as well.

The command currently only runs on Linux but we would be open to updating it to other platforms if people are interested.`,
  },
];

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
        paddingTop: "calc(var(--space-16) + 80px)",
        backgroundColor: "var(--bg-primary)",
      },
    },
    [
      "div",
      {
        style: {
          maxWidth: "900px",
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
      // Blog posts grid
      [
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "var(--space-8)",
          },
        },
        ...blogPosts.map((post) => blogPostCard(post)),
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
        paddingTop: "calc(var(--space-32) + 80px)",
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

  // Split content into paragraphs
  const paragraphs = post.content.split("\n\n").filter((p) => p.trim());

  return [
    "section",
    {
      style: {
        minHeight: "100vh",
        padding: "var(--space-16) var(--space-8)",
        paddingTop: "calc(var(--space-16) + 80px)",
        backgroundColor: "var(--bg-primary)",
      },
    },
    [
      "div",
      {
        style: {
          maxWidth: "800px",
          margin: "0 auto",
        },
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
      // Content paragraphs
      [
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-6)",
          },
        },
        ...paragraphs.map((para) => {
          // Check if paragraph contains a URL and render it as a link
          const urlMatch = para.match(/(https?:\/\/[^\s]+)/);
          if (urlMatch) {
            const url = urlMatch[1];
            const parts = para.split(url);
            return [
              "p",
              {
                style: {
                  fontSize: "var(--text-lg)",
                  color: "var(--text-secondary)",
                  lineHeight: "var(--leading-relaxed)",
                },
              },
              parts[0],
              [
                "a",
                {
                  href: url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  style: {
                    color: post.color,
                    textDecoration: "underline",
                  },
                },
                url,
              ],
              parts[1] || "",
            ];
          }
          return [
            "p",
            {
              style: {
                fontSize: "var(--text-lg)",
                color: "var(--text-secondary)",
                lineHeight: "var(--leading-relaxed)",
              },
            },
            para,
          ];
        }),
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
          "Interested in automating your workflow?",
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
