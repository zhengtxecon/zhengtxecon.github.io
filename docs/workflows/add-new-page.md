# Page maintenance

Use the current design and execution rules in [AGENTS.md](../../AGENTS.md).

## New or updated page

1. Choose a current reference: root landing pages use `contact.html`; article pages use `blog/codex-experience.html`.
2. Preserve metadata and page-specific content. Reuse the current typography, blue palette, compact navigation, and translucent panels.
3. Content pages load `style.css`, their page layout CSS, the current font/Tailwind/Iconify configuration, and `main.js`. Keep `header-placeholder` and `footer-placeholder`; set `data-root="../"` on nested pages.
4. Main landing pages have inline navigation; shared content pages use `includes/`. Update both surfaces for sitewide navigation changes.
5. Retain accessibility labels, one h1, semantic content, and correct relative links. Do not add the retired theme toggle.
6. Serve over HTTP and inspect actual rendered desktop/mobile pages. Test the mobile menu, article code/table overflow, form destinations, and nested links.
7. Update sitemap/feed as applicable. Review the diff, commit only authorized files, and push only with authorization. Publishing branch: `master`.

## Citation history

Its canonical data and historical evidence are in `assets/data/citations.json`. The existing 30-day Dida task owns refresh instructions. Styling cleanup must not change citation values or invent dates.
