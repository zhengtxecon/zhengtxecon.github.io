# AGENTS.md - zhengtxecon.github.io AI Agent Guide

> **For Human Readers**: See [docs/AGENTS-zh.md](docs/AGENTS-zh.md) for Chinese summary.

## 🚀 Quick Start (AI Priority Lookup)

### Where to Start
| Task | Go To |
|------|-------|
| Adding a new page | [workflows/add-new-page.md](docs/workflows/add-new-page.md) |
| Adding a blog post | [workflows/add-blog-post.md](docs/workflows/add-blog-post.md) |
| Updating navigation | [workflows/update-navigation.md](docs/workflows/update-navigation.md) |
| Updating existing content | [workflows/update-content.md](docs/workflows/update-content.md) |
| Finding CSS variables | [reference/css-variables.md](docs/reference/css-variables.md) |
| HTML structure patterns | [patterns/html-structure.md](docs/patterns/html-structure.md) |
| CSS conventions | [patterns/css-conventions.md](docs/patterns/css-conventions.md) |
| JavaScript patterns | [patterns/javascript-modules.md](docs/patterns/javascript-modules.md) |
| Accessibility patterns | [patterns/accessibility-patterns.md](docs/patterns/accessibility-patterns.md) |
| Component reference | [reference/components-overview.md](docs/reference/components-overview.md) |
| Troubleshooting | [reference/troubleshooting.md](docs/reference/troubleshooting.md) |

### Project Snapshot
- **Type**: Static HTML/CSS/JS website (no build system)
- **Hosting**: GitHub Pages (auto-deploy on push to `main`)
- **Structure**: 17 HTML files, 10 CSS files, 3 JS files
- **Content**: Researcher profile + CV + blog collections + teaching resources
- **Languages**: Bilingual (English/中文)

---

## 📁 Project Structure

```
/
├── index.html                          # Homepage
├── cv.html, research.html, teaching.html, blog.html, contact.html
├── blog-research.html, blog-teaching.html, blog-tools.html  # Blog categories
├── series-how-i-almost-ai-everything.html    # Blog series hub
├── [blog-post].html                   # Individual blog posts
├── includes/
│   ├── header.html                     # Navigation (JS-hydrated)
│   └── footer.html                     # Footer (JS-hydrated)
├── assets/
│   ├── css/
│   │   ├── style.css                   # Core styles + CSS variables
│   │   ├── [page].css                 # Page-specific styles
│   │   ├── blog-post.css, blog-collections.css
│   │   └── fancy.css
│   ├── js/
│   │   ├── main.js                    # Core interactions + component loading
│   │   ├── homepage.js                # Homepage-specific
│   │   └── fancy.js                  # Fancy page animations
│   ├── images/
│   └── files/
├── feed.xml, sitemap.xml              # RSS/SEO
├── package.json                       # [TODO: Verify or remove]
├── README.md, TODO.md
├── AGENTS.md                         # This file
└── docs/                              # Documentation (new structure)
    ├── AGENTS-zh.md                   # Chinese summary
    ├── workflows/                     # Step-by-step guides
    ├── patterns/                      # Code conventions
    └── reference/                     # Quick lookup
```

---

## 🎯 Core Principles

| Principle | Description | Enforcement |
|-----------|-------------|-------------|
| **Reuse First** | Update `includes/` not copy-paste to pages | Check existing components before new code |
| **Semantic HTML** | Use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` | LSP validation, W3C checker |
| **Accessibility** | `aria-label`, `alt` text, keyboard accessible | WAVE validator check |
| **Style Consistency** | Use CSS variables from `style.css` | No hardcoded colors |
| **Performance** | `<script defer>`, images ≤200KB | Lighthouse audit |
| **Bilingual** | Main content English, Chinese summaries | Meta tags & descriptions |

---

## 📝 HTML Conventions

### Every Page Must Include

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Unique page description for SEO">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/[page-name].css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="assets/js/main.js" defer></script>
    <title>Page Title · Tianxiang Zheng (郑天翔)</title>
</head>
<body data-page="[context]">
    <div id="header-placeholder"></div>
    <main><!-- Content --></main>
    <div id="footer-placeholder"></div>
</body>
</html>
```

### Required Elements

- **Component placeholders**: `<div id="header-placeholder"></div>` and `<div id="footer-placeholder"></div>` BEFORE closing `</body>`
- **One `<h1>` per page** - Use `<section>` with `<h2>` for subsections
- **Accessibility**:
  ```html
  <a href="page.html" aria-current="page">Current Page</a>
  <button aria-label="Toggle menu">...</button>
  <img src="..." alt="Descriptive text">
  <nav aria-label="Primary navigation">
  ```

**See**: [patterns/html-structure.md](docs/patterns/html-structure.md) for detailed patterns

---

## 🎨 CSS Conventions

### Design Tokens (style.css - DO NOT HARD CODE)

```css
:root {
    /* Typography */
    --font-sans: 'Inter', system-ui, sans-serif;
    --font-serif: 'Playfair Display', serif;

    /* Colors - ALWAYS USE VARIABLES */
    --color-brand: #3b5bfb;
    --color-accent: #f97316;

    /* Layout */
    --content-max: 1200px;
    --gutter: clamp(1.5rem, 5vw, 3rem);
    --header-height: 80px;

    /* Transitions */
    --transition-fast: 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --transition-base: 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

### Dark Theme

- Uses `[data-theme="dark"]` attribute on `<html>`
- Theme state stored in `localStorage.getItem('tz-theme')`
- JS in `main.js` handles theme switching

**Critical**: Always test in both light and dark modes.

**See**: [patterns/css-conventions.md](docs/patterns/css-conventions.md)

---

## ⚡ JavaScript Conventions

### Module Pattern (REQUIRED)

```javascript
(function() {
    'use strict';

    // All code in module scope - no globals

    document.addEventListener('DOMContentLoaded', () => {
        // Initialization
    });
})();
```

### Core Architecture (main.js)

1. **Component Hydration**: Loads `includes/header.html` and `includes/footer.html` via fetch API
2. **Navigation**: Mobile menu toggle, active page highlighting
3. **Theme Toggle**: Dark/light mode with `localStorage` persistence
4. **Scroll Animations**: IntersectionObserver for fade-in effects
5. **Header Scroll**: Sticky header with backdrop blur

**See**: [patterns/javascript-modules.md](docs/patterns/javascript-modules.md)

---

## 🔧 Common Workflows

| Task | Files to Modify | Sub-document |
|------|----------------|--------------|
| Add new page | Create `new-page.html` + `assets/css/new-page.css` + `includes/header.html` | [workflows/add-new-page.md](docs/workflows/add-new-page.md) |
| Add blog post | Create `blog-topic.html` + update category pages + `feed.xml` + `sitemap.xml` | [workflows/add-blog-post.md](docs/workflows/add-blog-post.md) |
| Update navigation | `includes/header.html` | [workflows/update-navigation.md](docs/workflows/update-navigation.md) |
| Update footer | `includes/footer.html` | [workflows/update-navigation.md](docs/workflows/update-navigation.md) |
| Update content | `cv.html`, `research.html`, `teaching.html` | [workflows/update-content.md](docs/workflows/update-content.md) |

**See**: [docs/workflows/](docs/workflows/) for complete step-by-step guides

---

## ✅ Validation & Testing

### Pre-Commit Checklist

- [ ] HTML validates with [W3C Validator](https://validator.w3.org/)
- [ ] CSS variables used (no hardcoded colors)
- [ ] Accessibility: [WAVE Validator](https://wave.webaim.org/) passes
- [ ] Dark mode works on page
- [ ] Responsive (320px, 768px, 1024px)
- [ ] Images optimized (≤200KB), have alt text
- [ ] `sitemap.xml` updated (if new pages)
- [ ] `feed.xml` updated (if new blog posts)

### Browser Testing

- Chrome, Firefox, Safari (latest)
- Mobile: iOS Safari, Android Chrome
- Both light and dark themes

### Deployment Workflow

```bash
git checkout -b feature/update-name
git add .
git commit -m "Add/update: description"
git push origin feature/update-name
# Create PR, merge to main → auto-deploy (1-3 min)
```

---

## 🎨 Component Reference

### Header (`includes/header.html`)

**Loading**: Injected via JavaScript into `<div id="header-placeholder"></div>`

**Structure**: Brand logo + Navigation + Theme toggle + CTA button
**Navigation Links**: Home, CV, Research, Teaching, Blog, Contact

### Footer (`includes/footer.html`)

**Loading**: Injected via JavaScript into `<div id="footer-placeholder"></div>`

**Structure**: Brand + 3-column grid (Contact, Explore, Social) + Copyright + Back to top

**See**: [reference/components-overview.md](docs/reference/components-overview.md)

---

## 🚨 Common Pitfalls

| Pitfall | Why It Happens | Solution |
|---------|----------------|----------|
| **Hardcoded colors** | Copy-pasting from other sites | Always use CSS variables like `var(--color-brand)` |
| **Missing component placeholders** | Creating new page manually | Always include `header-placeholder` and `footer-placeholder` divs |
| **Broken Chinese characters** | File saved with wrong encoding | Save as UTF-8 (VSCode: UTF-8 with BOM) |
| **Theme not working on new page** | Not loading `main.js` or not using correct CSS tokens | Ensure `<script src="assets/js/main.js" defer></script>` present |
| **Navigation not highlighting** | Wrong or missing `data-page` attribute on `<body>` | Check `<body data-page="[context]">` matches link href pattern |

**See**: [reference/troubleshooting.md](docs/reference/troubleshooting.md) for detailed solutions

---

## 📚 Documentation Index

### Workflows (Step-by-Step Guides)
- [workflows/add-new-page.md](docs/workflows/add-new-page.md) - Complete guide to add new content pages
- [workflows/add-blog-post.md](docs/workflows/add-blog-post.md) - Create blog post, update indexes, RSS/sitemap
- [workflows/update-navigation.md](docs/workflows/update-navigation.md) - Modify header/footer navigation links
- [workflows/update-content.md](docs/workflows/update-content.md) - Update existing sections (CV, research, teaching)

### Patterns (Code Conventions & Examples)
- [patterns/html-structure.md](docs/patterns/html-structure.md) - Semantic HTML patterns, accessibility attributes
- [patterns/css-conventions.md](docs/patterns/css-conventions.md) - BEM naming, responsive breakpoints, dark mode
- [patterns/javascript-modules.md](docs/patterns/javascript-modules.md) - IIFE pattern, event handling, IntersectionObserver
- [patterns/accessibility-patterns.md](docs/patterns/accessibility-patterns.md) - ARIA attributes, keyboard navigation, screen reader support

### Reference (Quick Lookup)
- [reference/css-variables.md](docs/reference/css-variables.md) - Complete CSS variable list with usage examples
- [reference/components-overview.md](docs/reference/components-overview.md) - Header, footer, cards, forms, buttons
- [reference/troubleshooting.md](docs/reference/troubleshooting.md) - Common issues, error messages, solutions

---

## 🤖 AI Agent Notes

### For AI Agents Working on This Project

1. **Start Here**: Read this AGENTS.md first, then navigate to relevant sub-document
2. **Check Existing Patterns**: Before creating new components, search codebase for similar patterns
3. **Validate**: After changes, use `lsp_diagnostics` to check for errors
4. **Test**: Manually verify in browser if possible
5. **No Build System**: This is a pure static site. No npm install, no build process
6. **GitHub Pages**: Push to `main` branch triggers automatic deployment

### File Reading Order for New Tasks

1. `AGENTS.md` (this file) - High-level overview
2. Relevant workflow doc in `docs/workflows/` - Step-by-step instructions
3. Relevant pattern doc in `docs/patterns/` - Code conventions and examples
4. Example files matching task (e.g., similar pages for reference)

---

## 🌐 Deployment

### GitHub Pages Configuration

- **Repository**: `zhengtxecon/zhengtxecon.github.io`
- **Branch**: `main`
- **Deployment Trigger**: Automatic on push to `main`
- **URL**: `https://zhengtxecon.github.io`
- **Deploy Time**: 1-3 minutes

### Verification Checklist

After deployment:
- [ ] New content appears at correct URL
- [ ] Navigation links work correctly
- [ ] Dark mode toggle works on all pages
- [ ] Mobile responsive layout correct
- [ ] No console errors

---

## 📞 Support

- **Maintainer**: Tianxiang Zheng (tianxiang.zheng.22@ucl.ac.uk, marxzheng@outlook.com)
- **Repository Issues**: [GitHub Issues](https://github.com/zhengtxecon/zhengtxecon.github.io/issues)
- **For Agents**: See [reference/troubleshooting.md](docs/reference/troubleshooting.md) before asking

---

## 📌 Quick Variable Reference

| Purpose | Variable | Value |
|---------|----------|-------|
| Primary color | `--color-brand` | `#3b5bfb` |
| Accent color | `--color-accent` | `#f97316` |
| Content max width | `--content-max` | `1200px` |
| Main font | `--font-sans` | `'Inter', system-ui, sans-serif` |
| Header height | `--header-height` | `80px` |
| Header component | `includes/header.html` | Loaded via JS |
| Footer component | `includes/footer.html` | Loaded via JS |
| Core JavaScript | `assets/js/main.js` | Deferred load |

---

**Last Updated**: January 2026 | **Version**: 2.0 | **Maintained by**: Tianxiang Zheng
