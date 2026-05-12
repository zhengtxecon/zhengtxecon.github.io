# Add New Page - Complete Workflow

> **Purpose**: Guide to add a new content page (not a blog post) to the website.

## Overview

This workflow walks through creating a new standalone page (e.g., publications, resources, about variants).

**Prerequisites**:
- Git repository cloned locally
- Feature branch created: `git checkout -b feature/new-page-name`
- Text editor configured for UTF-8 encoding

---

## Step 1: Create HTML File

### File Naming

- Use lowercase, hyphenated names: `publications.html`, `about-team.html`
- Place in root directory (not in subfolder)

### Page Template

Create HTML file with this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Brief, unique description for SEO (150-160 chars)">

    <!-- Open Graph tags -->
    <meta property="og:title" content="Page Title · Tianxiang Zheng">
    <meta property="og:description" content="Page description">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://zhengtxecon.github.io/page-name.html">
    <meta property="og:image" content="https://zhengtxecon.github.io/assets/images/profile.jpg">

    <!-- Twitter cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page description">

    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/page-name.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- JavaScript -->
    <script src="assets/js/main.js" defer></script>

    <title>Page Title · Tianxiang Zheng (郑天翔)</title>
</head>
<body data-page="page-name">
    <!-- Component placeholders (REQUIRED) -->
    <div id="header-placeholder"></div>

    <main>
        <section class="page-header">
            <div class="container">
                <span class="section-label"><i class="fas fa-tag"></i> Category</span>
                <h1>Page Title</h1>
                <p>Page introduction or subtitle</p>

                <div class="breadcrumbs" aria-label="Breadcrumb">
                    <a href="index.html">Home</a>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">Page Title</span>
                </div>
            </div>
        </section>

        <section class="page-content">
            <div class="container">
                <!-- Your content here -->
                <!-- Use semantic tags: <article>, <section>, <h2>, <h3> -->
            </div>
        </section>
    </main>

    <!-- Component placeholders (REQUIRED) -->
    <div id="footer-placeholder"></div>
</body>
</html>
```

### Key Points

- **`data-page` attribute**: Set to a simple identifier (used for navigation highlighting)
- **SEO description**: Unique for each page, 150-160 characters
- **Breadcrumbs**: Add for better UX and SEO

---

## Step 2: Create CSS File

### File Location

`assets/css/page-name.css`

### CSS Template

```css
/* page-name.css - Page-specific styles */

/* Override hero gradient if needed */
.page-header {
    --page-hero-gradient:
        radial-gradient(100% 100% at 50% 0%, rgba(59, 91, 251, 0.08) 0%, transparent 60%),
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

/* Dark mode hero gradient */
[data-theme="dark"] .page-header {
    --page-hero-gradient:
        radial-gradient(100% 100% at 50% 0%, rgba(96, 165, 250, 0.12) 0%, transparent 60%),
        linear-gradient(180deg, #020617 0%, #0f172a 100%);
}

/* Page-specific content styles */
.page-content {
    padding: clamp(3rem, 5vw, 4.5rem) 0;
}

/* Use CSS variables for all colors, spacing, etc. */
.custom-element {
    background: var(--color-surface-alt);
    color: var(--color-text);
    padding: var(--gutter);
    border-radius: var(--radius-md);
}
```

### CSS Best Practices

1. **Always use CSS variables** from `style.css`
2. **Dark mode support**: Use `[data-theme="dark"]` selectors
3. **Responsive**: Use `clamp()`, `@media` queries
4. **BEM naming**: `.block`, `.block__element`, `.block--modifier`

---

## Step 3: Update Navigation

### Update Header Navigation

Edit `includes/header.html`:

```html
<ul id="primary-navigation" class="nav-links">
    <li><a class="nav-link" href="index.html">Home</a></li>
    <li><a class="nav-link" href="cv.html">CV</a></li>
    <li><a class="nav-link" href="research.html">Research</a></li>
    <li><a class="nav-link" href="teaching.html">Teaching</a></li>
    <li><a class="nav-link" href="blog.html">Blog</a></li>
    <li><a class="nav-link" href="page-name.html">Page Name</a></li>  <!-- ADD HERE -->
    <li><a class="nav-link" href="contact.html">Contact</a></li>
</ul>
```

### Update Footer (Optional)

Edit `includes/footer.html` in "Explore" section:

```html
<div class="footer-column">
    <h3>Explore</h3>
    <ul class="footer-links">
        <li><a href="cv.html">Curriculum Vitae</a></li>
        <li><a href="research.html">Research Portfolio</a></li>
        <li><a href="teaching.html">Teaching Resources</a></li>
        <li><a href="blog.html#tags">Blog Categories</a></li>
        <li><a href="page-name.html">Page Name</a></li>  <!-- ADD HERE -->
        <li><a href="blog.html">Insights & Blog</a></li>
    </ul>
</div>
```

---

## Step 4: Update Sitemap

Edit `sitemap.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- Existing URLs -->
    <url>
        <loc>https://zhengtxecon.github.io/</loc>
        <lastmod>2025-10-15</lastmod>
        <changefreq>monthly</changefreq>
        <priority>1.0</priority>
    </url>

    <!-- ADD YOUR NEW PAGE HERE -->
    <url>
        <loc>https://zhengtxecon.github.io/page-name.html</loc>
        <lastmod>2025-10-15</lastmod>  <!-- Use today's date -->
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

---

## Step 5: Validation & Testing

### Validation Checklist

- [ ] **HTML Validation**: [https://validator.w3.org/](https://validator.w3.org/) - No errors
- [ ] **Accessibility**: [https://wave.webaim.org/](https://wave.webaim.org/) - No errors
- [ ] **CSS Variables**: No hardcoded colors, all use `var(--variable-name)`
- [ ] **Links**: All internal and external links work
- [ ] **Images**: All images have descriptive `alt` text

### Browser Testing

Test in:
- Chrome, Firefox, Safari (desktop)
- Mobile browser (320px width)
- Both light and dark themes

### Local Testing

Open page directly in browser:
```bash
# On macOS/Linux
open page-name.html

# On Windows
start page-name.html
```

Or use a local server:
```bash
# Python 3
python -m http.server 8000

# Node.js (if live-server installed)
live-server
```

---

## Step 6: Commit & Deploy

```bash
# Add all changes
git add assets/css/page-name.css page-name.html includes/header.html includes/footer.html sitemap.xml

# Commit
git commit -m "Add new page: page-name"

# Push
git push origin feature/new-page-name

# Create PR on GitHub
# Review and merge to main
# Auto-deploys to GitHub Pages
```

---

## Common Issues

### Issue: Navigation not highlighting

**Cause**: `data-page` attribute doesn't match link href pattern.

**Solution**: Ensure `<body data-page="page-name">` matches your navigation link pattern.

### Issue: Chinese characters display as replacement boxes

**Cause**: File not saved as UTF-8.

**Solution**: Save file as UTF-8 with BOM (VSCode: File > Save with Encoding > UTF-8 with BOM).

### Issue: CSS not applying

**Cause**: CSS file not linked in `<head>`.

**Solution**: Ensure `<link rel="stylesheet" href="assets/css/page-name.css">` is present.

### Issue: Footer not loading

**Cause**: Missing `<div id="footer-placeholder"></div>`.

**Solution**: Add placeholder div before closing `</body>` tag.

---

## See Also

- [patterns/html-structure.md](../patterns/html-structure.md) - HTML patterns
- [patterns/css-conventions.md](../patterns/css-conventions.md) - CSS conventions
- [reference/troubleshooting.md](../reference/troubleshooting.md) - Troubleshooting guide
