/**
 * Rendering pipeline tests — verify the markdown → HTML processor
 * handles each formatting feature correctly.
 */
import { describe, it, expect } from "vitest";
import { renderMarkdown, getPostBySlug } from "@/lib/posts";

// ── KaTeX math ────────────────────────────────────────────────────────────────

describe("KaTeX math rendering", () => {
  it("renders inline math $...$ with class=katex", async () => {
    const html = await renderMarkdown("Inline: $x^2 + y^2 = z^2$");
    expect(html).toContain('class="katex"');
  });

  it("renders display math $$...$$ with class=katex-display", async () => {
    const html = await renderMarkdown("$$\nx^2 + y^2 = z^2\n$$");
    expect(html).toContain("katex-display");
  });

  it("renders both mathml and html output (dual representation)", async () => {
    const html = await renderMarkdown("$E = mc^2$");
    expect(html).toContain("katex-mathml");
    expect(html).toContain("katex-html");
  });

  it("renders complex expressions: fractions", async () => {
    const html = await renderMarkdown("$\\frac{a}{b}$");
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("katex-error");
  });

  it("renders complex expressions: summation with subscript/superscript", async () => {
    const html = await renderMarkdown("$\\sum_{i=1}^{n} i$");
    expect(html).toContain('class="katex"');
    expect(html).not.toContain("katex-error");
  });

  it("renders the happy-numbers-style chained implication", async () => {
    const html = await renderMarkdown("$20 \\Rightarrow 2^2 + 0^2 = 4$");
    expect(html).toContain('class="katex"');
  });
});

// ── Standard markdown ─────────────────────────────────────────────────────────

describe("standard markdown rendering", () => {
  it("renders bold", async () => {
    const html = await renderMarkdown("**bold text**");
    expect(html).toContain("<strong>bold text</strong>");
  });

  it("renders italic", async () => {
    const html = await renderMarkdown("_italic text_");
    expect(html).toContain("<em>italic text</em>");
  });

  it("renders headings", async () => {
    const html = await renderMarkdown("## Section Title");
    expect(html).toContain("<h2>");
    expect(html).toContain("Section Title");
  });

  it("renders blockquotes", async () => {
    const html = await renderMarkdown("> A quoted passage");
    expect(html).toContain("<blockquote>");
    expect(html).toContain("A quoted passage");
  });

  it("renders unordered lists", async () => {
    const html = await renderMarkdown("- item one\n- item two");
    expect(html).toContain("<ul>");
    expect(html).toContain("<li>item one</li>");
  });

  it("renders ordered lists", async () => {
    const html = await renderMarkdown("1. first\n2. second");
    expect(html).toContain("<ol>");
    expect(html).toContain("<li>first</li>");
  });

  it("renders links with correct href", async () => {
    const html = await renderMarkdown("[visit](https://example.com)");
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain(">visit</a>");
  });

  it("renders inline code", async () => {
    const html = await renderMarkdown("Use `const x = 1`");
    expect(html).toContain("<code>const x = 1</code>");
  });
});

// ── GFM extensions ────────────────────────────────────────────────────────────

describe("GitHub Flavored Markdown extensions", () => {
  it("renders tables", async () => {
    const md = "| Name | Value |\n|------|-------|\n| foo  | 42    |";
    const html = await renderMarkdown(md);
    expect(html).toContain("<table>");
    expect(html).toContain("<th>");
    expect(html).toContain("foo");
  });

  it("renders strikethrough", async () => {
    const html = await renderMarkdown("~~deleted~~");
    expect(html).toContain("<del>deleted</del>");
  });
});

// ── Inline HTML passthrough ───────────────────────────────────────────────────

describe("inline HTML passthrough", () => {
  it("preserves inline <h2> with style (used in Zelda essay)", async () => {
    const md = '<h2 style="font-size: 1.5rem;">Section</h2>';
    const html = await renderMarkdown(md);
    expect(html).toContain("<h2");
    expect(html).toContain('style="font-size: 1.5rem;"');
  });
});

// ── Real post smoke test ──────────────────────────────────────────────────────

describe("real post rendering", () => {
  it("renders the happy numbers post with KaTeX output", async () => {
    const post = await getPostBySlug("birthday-special-happy-numbers");
    expect(post).not.toBeNull();
    // Post uses inline $...$ math (not display $$...$$), so check for katex and katex-html
    expect(post!.content).toContain('class="katex"');
    expect(post!.content).toContain('class="katex-html"');
  });

  it("renders the zelda essay preserving inline HTML headings", async () => {
    const post = await getPostBySlug("zelda-from-an-existentialist-perspective");
    expect(post).not.toBeNull();
    expect(post!.content).toContain("<h2");
    expect(post!.content).toContain("linear-gradient");
  });

  it("returns null for a non-existent slug", async () => {
    const post = await getPostBySlug("this-post-does-not-exist");
    expect(post).toBeNull();
  });
});
