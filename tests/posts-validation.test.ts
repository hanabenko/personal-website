/**
 * Post frontmatter rules — these run against every file in content/posts/.
 * Add a new post? All assertions below must pass before it ships.
 */
import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPostMeta } from "@/lib/posts";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const postFiles = fs
  .readdirSync(POSTS_DIR)
  .filter((f) => f.endsWith(".md") && f !== ".placeholder");

function readFrontmatter(filename: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const date =
    data.date instanceof Date
      ? data.date.toISOString().slice(0, 10)
      : String(data.date ?? "");
  return { data: { ...data, date }, content };
}

// ── Required fields ──────────────────────────────────────────────────────────

describe("required frontmatter fields", () => {
  it.each(postFiles)("%s — has a title", (filename) => {
    const { data } = readFrontmatter(filename);
    expect(data.title, "title is required").toBeTruthy();
    expect(typeof data.title).toBe("string");
  });

  it.each(postFiles)("%s — has a description", (filename) => {
    const { data } = readFrontmatter(filename);
    expect(data.description, "description is required (used in listing + SEO)").toBeTruthy();
  });

  it.each(postFiles)("%s — has a date", (filename) => {
    const { data } = readFrontmatter(filename);
    expect(data.date, "date is required").toBeTruthy();
  });
});

// ── Date format ───────────────────────────────────────────────────────────────

describe("date format", () => {
  it.each(postFiles)('%s — date is "YYYY-MM-DD" (not Jekyll timestamp format)', (filename) => {
    const { data } = readFrontmatter(filename);
    expect(data.date, `date "${data.date}" must match YYYY-MM-DD`).toMatch(DATE_RE);
  });

  it.each(postFiles)("%s — date is a real calendar date", (filename) => {
    const { data } = readFrontmatter(filename);
    const parsed = new Date(data.date + "T00:00:00");
    expect(parsed.toString(), `"${data.date}" is not a valid date`).not.toBe("Invalid Date");
  });
});

// ── Math flag consistency ─────────────────────────────────────────────────────

describe("math flag consistency", () => {
  it.each(postFiles)("%s — math: true posts must contain LaTeX syntax", (filename) => {
    const { data, content } = readFrontmatter(filename);
    if (!data.math) return; // only applies when flag is set
    const hasMath = /\$[^$\n]+\$/.test(content) || /\$\$[\s\S]+?\$\$/.test(content);
    expect(hasMath, `${filename} sets math: true but contains no $...$ or $$...$$ syntax`).toBe(true);
  });

  it.each(postFiles)("%s — math: false posts should not contain stray $ characters", (filename) => {
    const { data, content } = readFrontmatter(filename);
    if (data.math) return; // only applies when flag is NOT set
    // Allow $ in URLs and plain text like "$5" but flag lone math-style $expr$
    const suspiciousMath = /(?<![a-zA-Z0-9])\$[A-Za-z\\{]/.test(content);
    if (suspiciousMath) {
      expect.fail(
        `${filename} may contain LaTeX math ($...) but is missing math: true in frontmatter`
      );
    }
  });
});

// ── Listing & slugs ───────────────────────────────────────────────────────────

describe("getAllPostMeta", () => {
  it("returns all posts", () => {
    const posts = getAllPostMeta();
    expect(posts.length).toBe(postFiles.length);
  });

  it("sorts posts newest-first", () => {
    const posts = getAllPostMeta();
    for (let i = 0; i < posts.length - 1; i++) {
      expect(
        posts[i].date >= posts[i + 1].date,
        `Expected "${posts[i].date}" >= "${posts[i + 1].date}"`
      ).toBe(true);
    }
  });

  it("derives slugs correctly from filenames", () => {
    const posts = getAllPostMeta();
    const slugs = posts.map((p) => p.slug);
    expect(slugs).toContain("first-post");
    expect(slugs).toContain("birthday-special-happy-numbers");
    expect(slugs).toContain("zelda-from-an-existentialist-perspective");
    // No slug should contain a date prefix
    for (const slug of slugs) {
      expect(slug).not.toMatch(/^\d{4}-\d{2}-\d{2}/);
    }
  });
});
