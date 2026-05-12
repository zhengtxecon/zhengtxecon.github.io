# Tianxiang Zheng Personal Website

Personal academic website for Tianxiang Zheng (郑天翔), published at
`https://zhengtxecon.github.io`.

The site is a pure static GitHub Pages project: HTML, CSS, JavaScript, images,
and downloadable files only. There is no build step and no `package.json`.

## Structure

```text
/
├── index.html                  # Homepage
├── cv.html                     # Curriculum vitae
├── research.html               # Research portfolio
├── teaching.html               # Teaching portfolio and resources
├── blog.html                   # Blog landing page
├── blog-research.html          # Research update collection
├── blog-teaching.html          # Teaching update collection
├── blog-tools.html             # Tools / workflow collection
├── contact.html                # Contact form
├── thank-you.html              # Form submission return page
├── blog/                       # Long-form posts and series pages
├── includes/                   # Header and footer partials loaded by JS
├── assets/
│   ├── css/                    # Base and page-specific styles
│   ├── js/                     # Site interactions and partial hydration
│   ├── images/                 # Site images
│   └── files/                  # PDFs and downloadable assets
├── docs/                       # Agent workflows, patterns, and references
├── feed.xml                    # RSS feed
├── sitemap.xml                 # Search index sitemap
├── TODO.md                     # Active backlog
└── AGENTS.md                   # Agent operating guide
```

## Local Development

Serve the site through HTTP rather than opening files directly. The shared
header and footer use `fetch()`, so `file://` previews can give misleading
results.

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8000/`.

## Editing Notes

- Update shared navigation and footer content in `includes/`.
- Keep page-specific styles in the matching file under `assets/css/`.
- Use existing CSS variables in `assets/css/style.css` before adding new colors.
- Blog posts live under `blog/`; collection pages and metadata must stay in sync
  with `feed.xml` and `sitemap.xml`.
- Blog pages under `blog/` should use `data-root="../"` so shared partials and
  fallback links resolve correctly.

## Validation

Before committing content or layout changes:

- Run a local HTTP server and spot-check changed pages.
- Check that active local links resolve.
- Confirm `sitemap.xml` and `feed.xml` are updated for new public pages or posts.
- Test the shared header/footer on a root page and a `blog/` page.
- Run `git diff --check` before committing.

## Deployment

The repository remote is `zhengtxecon/zhengtxecon.github.io`; the current active
branch is `master`. GitHub Pages publishes from the repository's configured Pages
source after changes are pushed.
