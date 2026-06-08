import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import type { Root, Element } from "hast";
import { visit } from "unist-util-visit";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description?: string;
  categories?: string[];
  tags?: string[];
  math?: boolean;
}

export interface TocEntry {
  depth: number;
  id: string;
  text: string;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocEntry[];
}

function extractText(node: Element): string {
  let text = "";
  for (const child of node.children) {
    if (child.type === "text") text += child.value;
    else if (child.type === "element") text += extractText(child);
  }
  return text;
}

export async function renderMarkdown(content: string): Promise<{ html: string; toc: TocEntry[] }> {
  const toc: TocEntry[] = [];

  function rehypeExtractHeadings() {
    return (tree: Root) => {
      visit(tree, "element", (node: Element) => {
        if (/^h[23]$/.test(node.tagName) && typeof node.properties?.id === "string") {
          toc.push({ depth: parseInt(node.tagName[1]), id: node.properties.id, text: extractText(node) });
        }
      });
    };
  }

  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkMath)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeKatex)
      .use(rehypeSlug)
      .use(rehypeExtractHeadings)
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content)
  );

  return { html, toc };
}

function slugFromFilename(filename: string): string {
  return filename
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/\.md$/, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function normalizeDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  return String(raw ?? "");
}

export function getAllPostMeta(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && f !== ".placeholder")
    .map((filename) => {
      const { data } = matter(
        fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8")
      );
      return {
        slug: slugFromFilename(filename),
        title: data.title ?? filename,
        date: normalizeDate(data.date),
        description: data.description,
        categories: data.categories,
        tags: data.tags,
        math: data.math,
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!fs.existsSync(POSTS_DIR)) return null;

  const filename = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .find((f) => slugFromFilename(f) === slug);

  if (!filename) return null;

  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);

  const { html, toc } = await renderMarkdown(content);

  return {
    slug,
    title: data.title ?? filename,
    date: normalizeDate(data.date),
    description: data.description,
    categories: data.categories,
    tags: data.tags,
    math: data.math,
    content: html,
    toc,
  };
}
