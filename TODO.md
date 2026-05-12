# TODO

## Critical Fixes
- [x] Restore the correct Chinese characters for the author’s name across HTML templates and fallbacks (`index.html`, `blog.html`, `includes/footer.html`, `assets/js/main.js`, etc.) and verify no tracked text file contains U+FFFD replacement characters.
- [ ] Replace the client-side include pattern in `assets/js/main.js` with a build-time solution (e.g., Eleventy, Astro, or a lightweight Node script) so header/footer markup is present in the source HTML for SEO, accessibility, and static hosting without CORS issues.
- [ ] Update `README.md` to describe the current site structure (blog collections, series hub, CV, teaching resources) and remove stale references to pages that no longer exist (`about.html`, `portfolio.html`, etc.).
- [ ] Decide whether `package.json` is needed; if so, populate accurate metadata (name, author, MIT licence) plus useful scripts (`dev`, `lint`, `build`). Otherwise delete it to avoid confusion.

## Content & Information Architecture
- [ ] Flesh out placeholder copy (e.g., `how-i-built-an-ai-calendar-generator.html`) with real narratives, calls to action, and resources before promoting the pages.
- [ ] Add author bios, related posts, or inline CTAs on long-form posts to improve dwell time and drive navigation through the blog.
- [ ] Introduce a changelog or updates log (possibly in `/blog.html`) so visitors can trace recent publications without scanning every page.

## Accessibility & UX
- [ ] Add a “skip to main content” link and ensure focus styles are visible across all interactive elements.
- [ ] Validate colour contrast for primary and accent palettes defined in `assets/css/style.css`; adjust tokens if they fall below WCAG AA.
- [ ] Confirm that the mobile navigation closes on focus loss / escape key and that scroll locking works for keyboard users.
- [ ] Provide clear focus management when the contact form reports success or errors (currently handled purely by FormSubmit).

## Performance & Front-End Engineering
- [ ] Self-host Google Fonts (or at least add `preconnect`/`font-display` hints) to reduce CLS and external blocking caused by the `@import` in `assets/css/style.css`.
- [ ] Audit duplicated CSS between `style.css`, `blog.css`, `blog-post.css`, and `blog-collections.css`; consolidate shared utilities into a base layer and ship page-specific bundles only when needed.
- [ ] Generate a critical CSS chunk for above-the-fold content on `index.html` to improve Largest Contentful Paint on slower connections.
- [ ] Compress and provide modern image formats (WebP/AVIF) for `assets/images/profile.jpg` and any future media assets.

## SEO & Discovery
- [ ] Add canonical URLs to every page (missing on `index.html`, `contact.html`, `research.html`, etc.) and align the `<title>` / meta description copy with unique page intents.
- [ ] Publish `robots.txt` and `humans.txt`, and verify that `sitemap.xml` is referenced from `robots.txt`.
- [ ] Embed structured data (JSON-LD) for the Person profile, Article schema on blog posts, and Breadcrumb schema where the markup already exists.
- [ ] Create favicons and a web app manifest so the site presents well on mobile devices and when bookmarked.

## Tooling & Quality Assurance
- [ ] Add simple automated checks (e.g., `npm run lint` using HTMLHint/stylelint, `npm run check:links` with a broken-link checker) and wire them into GitHub Actions for pull requests.
- [ ] Document a local development workflow (e.g., `npm install && npm run dev` to start a static server with live reload).
- [ ] Introduce a regression checklist or Cypress/Playwright smoke tests for core flows (navigation, theme toggle, contact form submission).
- [ ] Schedule quarterly content and link audits to keep research artifacts, teaching resources, and external references fresh.
