import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, Token, Tokens } from "marked";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");
const OUTPUT_FILE = path.join(process.cwd(), "src/components/blog-data.ts");

type HiccupNode = string | [string, Record<string, unknown>, ...HiccupNode[]];

// Check if an array is a hiccup tuple [tag, attrs, ...children]
// vs an array of nodes [node1, node2, ...]
function isHiccupTuple(node: unknown[]): boolean {
  return (
    node.length >= 2 &&
    typeof node[0] === "string" &&
    typeof node[1] === "object" &&
    node[1] !== null &&
    !Array.isArray(node[1])
  );
}

function collectChildren(tokens: Token[]): HiccupNode[] {
  const result: HiccupNode[] = [];
  for (const tok of tokens) {
    const node = tokenToHiccup(tok);
    if (node === null) continue;
    if (typeof node === "string") {
      result.push(node);
    } else if (Array.isArray(node) && isHiccupTuple(node)) {
      // Single hiccup node like ["strong", {}, "text"]
      result.push(node as HiccupNode);
    } else if (Array.isArray(node)) {
      // Array of nodes
      result.push(...(node as HiccupNode[]));
    }
  }
  return result;
}

function tokenToHiccup(token: Token): HiccupNode | HiccupNode[] | null {
  switch (token.type) {
    case "heading": {
      const t = token as Tokens.Heading;
      const tag = `h${t.depth}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      return [tag, {}, ...inlineTokensToHiccup(t.tokens || [])];
    }

    case "paragraph": {
      const t = token as Tokens.Paragraph;
      return ["p", {}, ...inlineTokensToHiccup(t.tokens || [])];
    }

    case "text": {
      const t = token as Tokens.Text;
      if ("tokens" in t && t.tokens) {
        return inlineTokensToHiccup(t.tokens);
      }
      return t.text;
    }

    case "strong": {
      const t = token as Tokens.Strong;
      return ["strong", {}, ...inlineTokensToHiccup(t.tokens || [])];
    }

    case "em": {
      const t = token as Tokens.Em;
      return ["em", {}, ...inlineTokensToHiccup(t.tokens || [])];
    }

    case "codespan": {
      const t = token as Tokens.Codespan;
      return ["code", {}, t.text];
    }

    case "code": {
      const t = token as Tokens.Code;
      return ["pre", {}, ["code", { class: t.lang || "" }, t.text]];
    }

    case "link": {
      const t = token as Tokens.Link;
      return [
        "a",
        { href: t.href, target: "_blank", rel: "noopener noreferrer" },
        ...inlineTokensToHiccup(t.tokens || []),
      ];
    }

    case "image": {
      const t = token as Tokens.Image;
      return ["img", { src: t.href, alt: t.text }];
    }

    case "list": {
      const t = token as Tokens.List;
      const tag = t.ordered ? "ol" : "ul";
      const items = t.items.map((item) => {
        const children = collectChildren(item.tokens || []);
        return ["li", {}, ...children] as HiccupNode;
      });
      return [tag, {}, ...items];
    }

    case "blockquote": {
      const t = token as Tokens.Blockquote;
      const children = collectChildren(t.tokens || []);
      return ["blockquote", {}, ...children];
    }

    case "hr":
      return ["hr", {}];

    case "br":
      return ["br", {}];

    case "table": {
      const t = token as Tokens.Table;
      const headerRow = [
        "tr",
        {},
        ...t.header.map((cell) => [
          "th",
          {},
          ...inlineTokensToHiccup(cell.tokens || []),
        ]),
      ];
      const bodyRows = t.rows.map((row) => [
        "tr",
        {},
        ...row.map((cell) => [
          "td",
          {},
          ...inlineTokensToHiccup(cell.tokens || []),
        ]),
      ]);
      return [
        "table",
        {},
        ["thead", {}, headerRow],
        ["tbody", {}, ...bodyRows],
      ];
    }

    case "space":
      return null;

    default:
      // For unknown token types, try to extract text
      if ("text" in token) {
        return (token as { text: string }).text;
      }
      return null;
  }
}

function inlineTokensToHiccup(tokens: Token[]): HiccupNode[] {
  const result: HiccupNode[] = [];
  for (const t of tokens) {
    const node = tokenToHiccup(t);
    if (node === null) continue;
    if (typeof node === "string") {
      result.push(node);
    } else if (Array.isArray(node) && isHiccupTuple(node)) {
      // Single hiccup node like ["strong", {}, "text"]
      result.push(node as HiccupNode);
    } else if (Array.isArray(node)) {
      // Array of nodes from tokenToHiccup returning multiple nodes
      result.push(...(node as HiccupNode[]));
    }
  }
  return result;
}

function markdownToHiccup(markdown: string): HiccupNode[] {
  const tokens = marked.lexer(markdown);
  const result: HiccupNode[] = [];

  for (const token of tokens) {
    const node = tokenToHiccup(token);
    if (node !== null) {
      if (Array.isArray(node) && Array.isArray(node[0])) {
        result.push(...(node as HiccupNode[]));
      } else {
        result.push(node as HiccupNode);
      }
    }
  }

  return result;
}

interface BlogPostMeta {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  color: string;
}

interface BlogPost extends BlogPostMeta {
  content: HiccupNode[];
}

function processMarkdownFile(filePath: string): BlogPost {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const meta = data as BlogPostMeta;
  const hiccupContent = markdownToHiccup(content);

  return {
    id: meta.id,
    title: meta.title,
    excerpt: meta.excerpt,
    date: meta.date,
    author: meta.author,
    color: meta.color,
    content: hiccupContent,
  };
}

function generateBlogData() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse(); // newest first based on filename

  const posts: BlogPost[] = files.map((file) =>
    processMarkdownFile(path.join(CONTENT_DIR, file))
  );

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const output = `// Auto-generated by scripts/generate-blog.ts
// Do not edit directly - edit markdown files in content/blog/ instead

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HiccupNode = any;

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  color: string;
  content: HiccupNode[];
}

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

  fs.writeFileSync(OUTPUT_FILE, output);
  console.log(`Generated ${OUTPUT_FILE} with ${posts.length} posts`);
}

generateBlogData();
