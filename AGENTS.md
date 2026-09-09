# Website agent guide

## Source of truth

- Static HTML/CSS/JS site; no build step or package installation.
- Current visual references: `index.html`, `contact.html`, `research.html`, and `citations.html`.
- Use Inter body text, light DM Sans headings, blue accents, translucent light cards, and the compact Research / Teaching / CV / Blog / Contact navigation. Do not restore the old logo badge, theme toggle, or alternate homepage designs.
- For visual bugs, inspect the user's actual rendered page and relevant DOM before editing. Verify the result in that same page; do not infer the cause from source alone.
- Preserve substantive page content, metadata, public URLs, forms, and citation data when changing presentation.

## Architecture

- Main landing pages currently contain their own Tailwind configuration, navigation, footer, and small interaction script. Follow a current page rather than an obsolete template.
- Teaching, the form return page, and long-form blog pages share `includes/header.html`, `includes/footer.html`, and `assets/js/main.js`. Those partials now use the current design.
- Shared Tailwind configuration and shell styling live in `assets/js/content-theme.js` and `assets/css/content-shell.css`. Content-page typography and tokens live in `assets/css/style.css`. Page layouts live in `teaching.css`, `blog.css`, `blog-post.css`, and `blog-collections.css`.
- Nested blog pages require `data-root="../"` for shared links. Serve previews over HTTP because partials and citation data are fetched.
- Old alternate homepage URLs redirect to `index.html`; they are compatibility routes, not design references.
- `citations.html` reads `assets/data/citations.json` using `assets/js/citations.js`; retain its deduplication and snapshot semantics.

## Changes and checks

1. Read the current target page and check Git state before editing.
2. New pages need a unique title/description, one h1, semantic landmarks, accessible labels, keyboard interactions, and correct relative URLs.
3. Use the shared tokens or current Tailwind palette. Keep article text readable and allow tables/code blocks to scroll on small screens.
4. Keep main-page navigation and shared partials consistent when changing sitewide links.
5. Check desktop and 320/768px layouts, mobile menu, local assets/links, console errors, and `git diff --check`. Verify visual changes with screenshots after resources load.
6. New public pages go in `sitemap.xml`; new blog posts also update collections and `feed.xml`.
7. Stage only the authorized files. Actual publishing branch is `master`, not `main`. A push triggers GitHub Pages; verify the deployment and live page before reporting publication.

See [maintenance workflows](docs/workflows/add-new-page.md) and [README](README.md).
