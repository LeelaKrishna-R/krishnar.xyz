// Blog posts are Markdown files in app/blog/posts with title/date frontmatter.
// Read at build time; nothing here runs in the browser.
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const DIR = path.join(process.cwd(), "app/blog/posts");

function minutes(text) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 220));
}

// First real paragraph, stripped of Markdown, for cards and meta descriptions.
function excerpt(content, max = 190) {
  const para = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .find((p) => p && !p.startsWith("#") && !p.startsWith("-") && !p.startsWith("```"));
  const plain = (para || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (plain.length <= max) return plain;
  return plain.slice(0, plain.lastIndexOf(" ", max)) + "…";
}

export function formatDate(iso) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export async function getAllPosts() {
  const files = (await fs.readdir(DIR)).filter((f) => f.endsWith(".md"));
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(DIR, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        minutes: minutes(content),
        excerpt: excerpt(content),
      };
    }),
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  let raw;
  try {
    raw = await fs.readFile(path.join(DIR, `${slug}.md`), "utf8");
  } catch {
    return null;
  }
  const { data, content } = matter(raw);
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeStringify)
      .process(content),
  );
  return {
    slug,
    title: data.title,
    date: data.date,
    minutes: minutes(content),
    excerpt: excerpt(content),
    html,
  };
}
