# HTML Structure Patterns

> **Purpose**: Define consistent HTML structure patterns for the website.

## Page Structure Hierarchy

```
<!DOCTYPE html>
<html lang="en">
├── <head>
│   ├── meta tags (charset, viewport, description)
│   ├── Open Graph tags
│   ├── Twitter card tags
│   ├── CSS links
│   └── script tags (deferred)
└── <body data-page="[context]">
    ├── <div id="header-placeholder"></div>
    ├── <main>
    │   ├── <section class="page-header">
    │   └── <section class="page-content">
    └── <div id="footer-placeholder"></div>
</body>
</html>
```

---

## Component Patterns

### Page Header

```html
<section class="page-header">
    <div class="container">
        <span class="section-label"><i class="fas fa-icon"></i> Category</span>
        <h1>Page Title</h1>
        <p>Page description or subtitle</p>

        <div class="breadcrumbs" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span aria-hidden="true">/</span>
            <a href="parent.html">Parent</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Current</span>
        </div>
    </div>
</section>
```

### Content Section

```html
<section class="content-section">
    <div class="container">
        <div class="section-heading">
            <span class="section-label"><i class="fas fa-tag"></i> Section</span>
            <h2>Section Title</h2>
            <p>Section description</p>
        </div>

        <div class="content-grid">
            <article class="surface card">
                <h3>Card Title</h3>
                <p>Card content...</p>
            </article>
        </div>
    </div>
</section>
```

### Card Component

```html
<article class="surface card">
    <div class="card-meta">
        <span class="tag tag-brand">Tag</span>
        <span class="date">Date</span>
    </div>

    <h3><a href="page.html">Card Title</a></h3>

    <p>Card description or excerpt...</p>

    <div class="card-actions">
        <a href="page.html" class="btn btn-ghost">Learn more <i class="fas fa-arrow-right"></i></a>
    </div>
</article>
```

---

## Semantic HTML Elements

### Navigation

```html
<nav aria-label="Primary navigation">
    <ul>
        <li><a href="page.html">Link Text</a></li>
    </ul>
</nav>
```

### Article

```html
<article class="post">
    <header>
        <h1>Article Title</h1>
        <time datetime="2025-01-15">15 January 2025</time>
    </header>
    <p>Article content...</p>
</article>
```

### Section

```html
<section aria-labelledby="section-heading">
    <h2 id="section-heading">Section Title</h2>
    <p>Section content...</p>
</section>
```

### Figure with Caption

```html
<figure>
    <img src="image.jpg" alt="Descriptive alt text">
    <figcaption>Image caption or credit</figcaption>
</figure>
```

---

## Accessibility Patterns

### Skip to Main Content

```html
<a href="#main" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
    position: absolute;
    top: -9999px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem;
    background: var(--color-brand);
    color: white;
    z-index: 9999;
}

.skip-link:focus {
    top: 1rem;
}
```

### Screen Reader Only

```html
<span class="sr-only">Hidden from visual, visible to screen readers</span>
```

```css
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

### ARIA Labels

```html
<!-- Decorative icons -->
<i class="fas fa-envelope" aria-hidden="true"></i>

<!-- Buttons without visible text -->
<button aria-label="Toggle menu">Menu</button>

<!-- Active page indicator -->
<a href="page.html" aria-current="page">Current Page</a>

<!-- Navigation landmarks -->
<nav aria-label="Primary navigation">
<nav aria-label="Blog categories">

<!-- Descriptive links -->
<a href="cv.html" aria-label="Download Tianxiang Zheng's CV">
    <i class="fas fa-file-download"></i>
</a>
```

### Focus Management

```html
<!-- Ensure all interactive elements are focusable -->
<button class="theme-toggle" type="button">Theme</button>
<a href="page.html" class="nav-link">Link</a>

<!-- Visible focus states -->
/* Already handled in style.css */
a:focus-visible,
button:focus-visible {
    outline: 3px solid var(--color-brand);
    outline-offset: 2px;
}
```

---

## Heading Hierarchy

### Correct Usage

```html
<main>
    <h1>Page Title (one per page)</h1>

    <section>
        <h2>Section Title</h2>
        <p>Content...</p>

        <h3>Subsection Title</h3>
        <p>Content...</p>

        <h4>Sub-subsection Title</h4>
        <p>Content...</p>
    </section>

    <section>
        <h2>Another Section Title</h2>
        <p>Content...</p>
    </section>
</main>
```

### Incorrect Usage

```html
<!-- DON'T DO THIS -->
<h1>Page Title</h1>
<h1>Another H1 (WRONG - only one H1 per page)</h1>

<h2>Section</h2>
<h4>Skipping H3 (WRONG - don't skip levels)</h4>

<h3>Out of order (WRONG)</h3>
```

---

## Form Patterns

### Form Structure

```html
<form action="https://formsubmit.co/your-email@example.com" method="POST">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
    </div>

    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
    </div>

    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

---

## Common HTML Gotchas

### Self-Closing Tags

```html
<!-- Self-closing -->
<br />
<hr />
<img src="image.jpg" alt="Alt text" />
<input type="text" />
<meta name="description" content="..." />

<!-- Not self-closing -->
<div></div>
<p></p>
<a></a>
<span></span>
```

### Special Characters

```html
<!-- Use HTML entities -->
&amp;     -> &
&lt;      -> <
&gt;      -> >
&quot;    -> "
&apos;   -> '
&copy;    -> ©
&trade;   -> ™

<!-- Or use UTF-8 encoding in HTML head -->
<meta charset="UTF-8">
<!-- Then you can use characters directly -->
© ™
```

---

## See Also

- [patterns/css-conventions.md](css-conventions.md) - CSS patterns
- [patterns/accessibility-patterns.md](accessibility-patterns.md) - Accessibility patterns
- [reference/components-overview.md](../reference/components-overview.md) - Component reference
