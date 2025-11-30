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
    id: "ai-performance-programming",
    title: "Lessons from AI-Assisted Performance Programming",
    excerpt:
      "We conducted an experiment to understand how AI approaches the 1 Billion Row Challenge across multiple programming languages, using three different prompting strategies.",
    date: "2025-11-30",
    author: "Timothy Eichler",
    color: "var(--accent-green)",
    content: `Overview

We conducted an experiment to understand how AI (Claude) approaches the 1 Billion Row Challenge across multiple programming languages, using three different prompting strategies:

1. Normal: "Solve the challenge with clean, idiomatic code. Focus on correctness and readability." (No mention of performance)
2. Performant: "Solve the challenge with a strong focus on performance. Use all available optimization techniques."
3. Performance-Aware: "Apply performance-aware programming principles from a detailed guide covering the five performance multipliers"

The goal was to extract lessons for effectively collaborating with AI on performance-critical code.


Results Summary

Here are the complete benchmark results across all languages and variants:

Language         | Normal   | Performant | Performance-Aware
-----------------|----------|------------|------------------
Zig              | 133s     | 7.5s       | 7.3s
C                | 773s     | 6.8s       | 24.5s
Nim              | 208s     | 8.3s       | 7.8s
Rust             | 190s     | 8.9s       | 8.3s
Java             | 168s     | 10.6s      | 9.3s
OCaml            | 248s     | 21.8s      | 15.8s
Clojure          | ~12,480s | 17.7s      | 20.8s
Jai              | 110s     | 53.0s      | 70.4s
Red              | ~15,800s | ~6,990s    | ~13,740s
Baseline (gonix) | -        | 7.8s       | -

Note: Red and Clojure normal times are extrapolated from 100k row samples due to extremely slow interpreted execution.


Key Findings

If You Don't Ask for Performance, You Won't Get It

The difference between "normal" and "performant" prompts is stark:

Language | Normal   | Performant | Speedup
---------|----------|------------|--------
Jai      | 110s     | 53s        | 2x
Zig      | 133s     | 7.5s       | 18x
Java     | 168s     | 10.6s      | 16x
Rust     | 190s     | 8.9s       | 21x
Nim      | 208s     | 8.3s       | 25x
OCaml    | 248s     | 21.8s      | 11x
C        | 773s     | 6.8s       | 114x
Clojure  | ~12,480s | 17.7s      | ~705x

The normal solutions are perfectly correct and readable, but they're 2-700x slower. The AI produced clean, idiomatic code when asked - but didn't volunteer optimizations unless explicitly requested.


Two Approaches, Similar Results

The "performant" and "performance-aware" prompts represent two different strategies:

- Performant: Tell the AI to optimize aggressively, let it figure out how
- Performance-Aware: Provide a detailed guide explaining the five performance multipliers: reduce waste, maximize IPC, SIMD, cache optimization, and multithreading

Language | Performant | Perf-Aware | Difference
---------|------------|------------|-------------
C        | 6.8s       | 24.5s      | -262% (worse)
Zig      | 7.5s       | 7.3s       | +3% better
Nim      | 8.3s       | 7.8s       | +6% better
Rust     | 8.9s       | 8.3s       | +7% better
Java     | 10.6s      | 9.3s       | +12% better
OCaml    | 21.8s      | 15.8s      | +28% better
Clojure  | 17.7s      | 20.8s      | -18% (worse)
Jai      | 53.0s      | 70.4s      | -33% (worse)

The results are mixed. For most languages, the performance-aware approach produced slightly faster code (7-28% improvement). However, for C, Clojure, and Jai, the "just optimize" approach actually outperformed the guided approach.

Baseline comparison: The gonix unsafe Java entry (11th place in the official competition at 2.5s, selected because it didn't use GraalVM) ran on our system in 7.8s. Our best AI-generated solutions (C at 6.8s, Zig at 7.3s, Nim at 7.8s) achieved competitive or better performance.


The Code Complexity Tax

Performance comes at a cost in code complexity:

Language | Normal | Performant   | Performance-Aware
---------|--------|--------------|------------------
Rust     | 104    | 330 (3.2x)   | 359 (3.5x)
C        | 123    | 304 (2.5x)   | 355 (2.9x)
Java     | 71     | 276 (3.9x)   | 318 (4.5x)
Zig      | 123    | 323 (2.6x)   | 355 (2.9x)
Nim      | 64     | 253 (4.0x)   | 257 (4.0x)
OCaml    | 88     | 264 (3.0x)   | 316 (3.6x)
Clojure  | 61     | 200 (3.3x)   | 252 (4.1x)
Jai      | 260    | 337 (1.3x)   | 417 (1.6x)
Red      | 85     | 83 (1.0x)    | 153 (1.8x)

Average lines of code across all languages:

Variant           | Avg LOC | Increase from Normal
------------------|---------|---------------------
Normal            | 109     | -
Performant        | 262     | 2.4x
Performance-Aware | 297     | 2.7x

The biggest code explosions happened in Java (71 → 318 lines, 4.5x) and Clojure (61 → 252 lines, 4.1x). Jai had the smallest relative increase (1.6x), but it started with the largest normal solution (260 lines) due to the AI struggling with the less-documented language.


Common Optimization Patterns

Across all languages, the AI consistently applied these optimizations when asked for performance:

1. Memory-mapped I/O: Every performant solution used mmap instead of buffered reads
2. Parallel processing: All solutions divided work across CPU cores
3. Integer arithmetic: Temperature stored as int×10 to avoid floating-point operations
4. Custom hash tables: Most solutions implemented open-addressing with FNV-1a hashing
5. Per-thread accumulators: Each thread maintains its own hash table, merged at the end


Hands-Off After Setup

An interesting observation: after the initial implementation work, the AI was fully hands-off. Even when the AI noted in its progress logs that "more work could be done to improve the solution" (see C performance-aware noting it was slower than the performant version), it stopped when the validation passed. The AI follows instructions literally - if you want it to keep optimizing, you need to tell it to.


Lessons Learned

1. Be explicit about performance requirements. "Make it fast" produces vastly different code than "make it clean." If you want performance, ask for it upfront.

2. Detailed guidance can help, but isn't magic. The performance-aware guide helped in some languages (OCaml saw 28% improvement) but hurt in others (C was 262% worse). The AI's innate optimization knowledge often matched or exceeded what a guide could provide.

3. Expect 2-4x more code for optimized solutions. Performance-critical code is inherently more complex - more explicit memory management, parallel coordination, and low-level operations.

4. AI follows instructions, not intent. If you want the AI to iterate and improve, explicitly request iterations. "Validate and stop" is the default behavior.

5. Language familiarity matters. The AI produced better optimizations in languages with more training data (Rust, Java, C) versus niche languages (Jai, Red).


Methodology Notes

- All benchmarks run on the same system (Linux, 16 cores, WSL2)
- 13GB input file with 1 billion rows
- Baseline: gonix unsafe java solution (7.8s on our system, 2.5s in official competition at 11th place)
- Each solution was developed independently - no cross-pollination between variants
- AI was hands-off after initial work, no manual intervention`,
  },
  {
    id: "automating-claude",
    title: "Automating Claude",
    excerpt:
      "With AI tools getting more and more capable for coding, the dream of working like Homer is becoming more of a reality.",
    date: "2025-11-27",
    author: "Timothy Eichler",
    color: "var(--accent-cyan)",
    content: `With AI tools getting more and more capable for coding, the dream of working like Homer is becoming more of a reality. Instead of having a bird cover for us (see the video: https://www.youtube.com/shorts/PPk-z5ZJcrA), we have created automate_claude.

The magic first starts with breaking down your tasks into iterative Claude commands. Once this is done, one would normally have to enter them in and wait for them to execute. Automate Claude takes over this task for us - we can enter in the command sequence that we want it to execute, and it will take care to run the sequence of commands N times (whatever we decide).

In order to make sure work was completed properly, we run a check after each command and optionally retry if something went wrong. If we run out of usage and are throttled, the program will sleep until it can continue working again.

Note: in case you didn't know, each time we interact with a chat agent, the entire history of that chat session is sent to the model for computation, meaning we run our limits down faster. The automate command makes sure to run each command in a fresh session for us as well.

The command currently only runs on Linux but we would be open to updating it to other platforms if people are interested.

Check out the repo: https://github.com/neichler-digital/automate-claude`,
  },
];

function renderContentWithLinks(content: string, linkColor: string): any[] {
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part) => {
    if (urlRegex.test(part)) {
      // Reset regex lastIndex since we're reusing it
      urlRegex.lastIndex = 0;
      return [
        "a",
        {
          href: part,
          target: "_blank",
          rel: "noopener noreferrer",
          style: `color: ${linkColor}; text-decoration: underline;`,
        },
        part,
      ];
    }
    return part;
  });
}

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
          style: "font-size: var(--text-lg); color: var(--text-secondary); line-height: var(--leading-relaxed); white-space: pre-wrap;",
        },
        ...renderContentWithLinks(post.content, post.color),
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
