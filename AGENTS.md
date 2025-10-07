# Contribution Guidelines for zhengtxecon.github.io

Welcome! This document provides conventions for maintaining Tianxiang Zheng's personal website. Follow these instructions whenever you update files within this repository.

## Repository Overview
- **Static site** built from hand-authored HTML pages under the repository root.
- **Shared includes** live in `includes/` and are inserted into pages during build/publish.
- **Global styling** resides in `assets/css/`, with `style.css` as the primary stylesheet.
- **Client-side behaviour** is implemented with plain JavaScript located in `assets/js/`.
- **Content pages** (e.g., `index.html`, `research.html`, `blog-*.html`) are organized at the repository root for direct deployment.

## General Editing Principles
1. **Prefer Reuse**
   - Update shared fragments in `includes/` instead of duplicating markup across pages.
   - Keep navigation and footer content synchronized by editing the include files.
2. **Maintain Semantic HTML**
   - Use proper heading hierarchy (`<h1>` once per page, nested `<h2>`, `<h3>` as needed).
   - Wrap sections in meaningful elements (`<section>`, `<article>`, `<aside>`, `<nav>`).
3. **Preserve Accessibility**
   - Ensure all interactive elements remain keyboard accessible.
   - Provide descriptive `alt` text for images and `aria-label` attributes when icons are used without visible text.
4. **Keep Styling Consistent**
   - Place global rules in `assets/css/style.css`. Limit inline styles to exceptional cases.
   - Respect the existing design tokens: primary colour `#1d3557`, secondary colour `#457b9d`, accent `#e63946`, and neutral palette.
5. **Optimize Performance**
   - Minimize blocking scripts; prefer deferred loading (`<script src="..." defer>`).
   - Compress new images (≤ 200 KB when possible) and store them in `assets/images/`.

## Content Strategy
- Write in a **professional yet approachable tone** that reflects Tianxiang Zheng’s academic background.
- Highlight research, teaching, and blog content with clear summaries and calls to action.
- When adding blog posts:
  - Create a dedicated HTML page (`blog-your-topic.html`).
  - Link it from the appropriate index page (`blog.html`, `blog-research.html`, or `blog-teaching.html`).
  - Update RSS feeds (`feed.xml`, `sitemap.xml`) if publication timelines are relevant.

## JavaScript Guidelines (`assets/js/`)
- Use vanilla ES6+ syntax; avoid introducing frameworks.
- Namespace new functions under an immediately-invoked function expression (IIFE) to avoid global pollution.
- Handle DOMContentLoaded events before manipulating the DOM.
- Prefer feature detection over user-agent sniffing.

## CSS Guidelines (`assets/css/`)
- Follow the existing BEM-inspired naming convention: `.block`, `.block__element`, `.block--modifier`.
- Group related declarations and comment major sections with `/* ===== Section Name ===== */`.
- Use CSS variables defined in `:root` for colours, spacing, and typography.
- Ensure responsiveness with mobile-first media queries (`@media (min-width: ...)`).

## HTML Includes (`includes/`)
- The header include controls primary navigation. When adding pages:
  - Update both the navigation list and any dropdown structures.
  - Ensure active page classes are toggled correctly if needed.
- The footer include contains analytics snippets and social links; keep scripts lightweight and privacy-friendly.

## Assets and Media
- Store documents (e.g., PDFs) under `assets/documents/` and link using relative paths.
- Name files using lowercase hyphenated strings (e.g., `summer-2024-syllabus.pdf`).
- Provide attribution for third-party media in the page content or a dedicated credits section.

## Testing & Validation
- Validate HTML via [W3C Validator](https://validator.w3.org/) for significant markup changes.
- Run CSS through [W3C CSS Validator](https://jigsaw.w3.org/css-validator/) when modifying core styles.
- Manually test the site locally in at least Chrome and Firefox. Use responsive design tools to confirm mobile layouts.

## Deployment Notes
- The site is hosted with GitHub Pages; pushing to `main` triggers deployment automatically.
- Ensure `sitemap.xml` and `feed.xml` stay updated to maintain SEO and syndication accuracy.

## Documentation & Version Control
- Document major structural changes in `README.md`.
- Keep commit messages concise and descriptive (e.g., `Update research page with 2024 publications`).
- For pull requests, summarise user-facing changes and note any accessibility or performance improvements.

Thank you for maintaining the quality and consistency of zhengtxecon.github.io!
