# Component Reference

> **Purpose**: Overview of reusable components in the website.

## Header Component (`includes/header.html`)

### Loading Mechanism

Injected via JavaScript into `<div id="header-placeholder"></div>` on page load.

### Structure

```html
<header class="site-header" data-component="header">
    <div class="container header-inner">
        <!-- Brand section -->
        <a class="brand" href="index.html" aria-label="Tianxiang Zheng home">
            <span class="brand-initials" aria-hidden="true">TZ</span>
            <span class="brand-text">
                <span class="brand-name">Tianxiang Zheng</span>
                <span class="brand-role">Economist · Researcher · Educator</span>
            </span>
        </a>

        <!-- Navigation -->
        <nav class="site-nav" aria-label="Primary">
            <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">
                <span class="nav-toggle-bar"></span>
                <span class="nav-toggle-bar"></span>
                <span class="nav-toggle-bar"></span>
                <span class="sr-only">Menu</span>
            </button>

            <ul id="primary-navigation" class="nav-links">
                <li><a class="nav-link" href="index.html">Home</a></li>
                <li><a class="nav-link" href="cv.html">CV</a></li>
                <li><a class="nav-link" href="research.html">Research</a></li>
                <li><a class="nav-link" href="teaching.html">Teaching</a></li>
                <li><a class="nav-link" href="blog.html">Blog</a></li>
                <li><a class="nav-link" href="contact.html">Contact</a></li>
            </ul>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
            <button class="theme-toggle" type="button" data-theme-state="light" aria-pressed="false" aria-label="Switch to dark mode">
                <span class="theme-toggle-track" aria-hidden="true">
                    <span class="theme-toggle-thumb"></span>
                    <i class="fas fa-sun theme-icon theme-icon-sun" aria-hidden="true"></i>
                    <i class="fas fa-moon theme-icon theme-icon-moon" aria-hidden="true"></i>
                </span>
                <span class="theme-toggle-label" aria-hidden="true">
                    <span class="theme-toggle-state theme-toggle-state-light">Light</span>
                    <span class="theme-toggle-state theme-toggle-state-dark">Dark</span>
                </span>
            </button>
            <a class="header-cta" href="contact.html">Let's Collaborate</a>
        </div>
    </div>
</header>
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.site-header` | Main container, sticky positioning |
| `.header-inner` | Flex container for header content |
| `.brand` | Logo/name section |
| `.brand-initials` | "TZ" initials |
| `.brand-text` | Name + role text |
| `.site-nav` | Navigation container |
| `.nav-toggle` | Mobile hamburger menu button |
| `.nav-links` | Navigation links list |
| `.nav-link` | Individual navigation link |
| `.nav-link.is-active` | Active page indicator |
| `.header-actions` | Theme toggle + CTA |
| `.theme-toggle` | Dark/light mode button |
| `.header-cta` | Call-to-action button |

### JavaScript Functions

- `loadPartial()` - Fetches and injects header HTML
- `initNavigation()` - Mobile menu toggle, link highlighting
- `initThemeToggle()` - Theme switching with localStorage
- `initHeaderScroll()` - Sticky header state

---

## Footer Component (`includes/footer.html`)

### Loading Mechanism

Injected via JavaScript into `<div id="footer-placeholder"></div>` on page load.

### Structure

```html
<footer class="site-footer" data-component="footer">
    <div class="container footer-inner">
        <!-- Brand section -->
        <div class="footer-brand">
            <span class="footer-initials" aria-hidden="true">TZ</span>
            <div>
                <p class="footer-name">Tianxiang Zheng (郑天翔)</p>
                <p class="footer-tagline">Economist · Researcher · Educator</p>
            </div>
        </div>

        <!-- Three-column grid -->
        <div class="footer-grid">
            <!-- Contact links -->
            <div class="footer-column">
                <h3>Stay in touch</h3>
                <ul class="footer-links">
                    <li><a href="mailto:tianxiang.zheng.22@ucl.ac.uk"><i class="fas fa-envelope"></i> tianxiang.zheng.22@ucl.ac.uk</a></li>
                    <li><a href="mailto:marxzheng@outlook.com"><i class="fas fa-paper-plane"></i> marxzheng@outlook.com</a></li>
                    <li><a href="contact.html"><i class="fas fa-handshake"></i> Request a meeting</a></li>
                </ul>
            </div>

            <!-- Explore links -->
            <div class="footer-column">
                <h3>Explore</h3>
                <ul class="footer-links">
                    <li><a href="cv.html">Curriculum Vitae</a></li>
                    <li><a href="research.html">Research Portfolio</a></li>
                    <li><a href="teaching.html">Teaching Resources</a></li>
                    <li><a href="blog.html#tags">Blog Categories</a></li>
                    <li><a href="series-how-i-almost-ai-everything.html">How I (Almost) AI Everything</a></li>
                    <li><a href="blog.html">Insights & Blog</a></li>
                </ul>
            </div>

            <!-- Social links -->
            <div class="footer-column">
                <h3>Connect</h3>
                <div class="footer-social">
                    <a href="https://scholar.google.com/citations?user=yMayrcEAAAAJ" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i> Scholar</a>
                    <a href="https://github.com/zhengtxecon" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
                    <a href="https://www.linkedin.com/in/tianxiang-marx-zheng-187ab0131/" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i> LinkedIn</a>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer bottom -->
    <div class="footer-bottom">
        <div class="container footer-bottom-inner">
            <p>&copy; <span data-year></span> Tianxiang Zheng. Crafted for clarity and collaboration.</p>
            <button class="to-top" type="button" aria-label="Back to top">
                <i class="fas fa-arrow-up"></i>
            </button>
        </div>
    </div>
</footer>
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.site-footer` | Main footer container |
| `.footer-inner` | Top section container |
| `.footer-brand` | Brand section (initials + name) |
| `.footer-grid` | Three-column grid layout |
| `.footer-column` | Individual column |
| `.footer-links` | List of links |
| `.footer-social` | Social media links |
| `.footer-bottom` | Copyright + back to top |
| `.to-top` | Scroll to top button |
| `.to-top.is-visible` | Show scroll-to-top when scrolled |

### JavaScript Functions

- `loadPartial()` - Fetches and injects footer HTML
- `initScrollToTop()` - Show/hide scroll-to-top button
- `updateFooterYear()` - Updates copyright year

---

## Card Components

### Basic Card

```html
<article class="surface card">
    <div class="card-meta">
        <span class="tag tag-brand">Tag</span>
        <span class="date">Date</span>
    </div>
    <h3>Card Title</h3>
    <p>Card description...</p>
    <div class="card-actions">
        <a href="#" class="btn btn-ghost">Learn more <i class="fas fa-arrow-right"></i></a>
    </div>
</article>
```

### Blog Card

```html
<article class="surface blog-post-card">
    <div class="blog-post-card-meta">
        <span class="tag tag-brand">Research</span>
        <span class="date">15 January 2025</span>
    </div>
    <h3><a href="blog-post.html">Blog Post Title</a></h3>
    <p>Excerpt or summary...</p>
    <div class="blog-post-card-footer">
        <span class="read-time">8 min read</span>
        <a href="blog-post.html" class="btn btn-ghost">Read more <i class="fas fa-arrow-right"></i></a>
    </div>
</article>
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.surface` | Base card styling with shadow/border |
| `.card` | Card modifier |
| `.card-meta` | Metadata (tags, dates) |
| `.card-actions` | Action buttons/links |
| `.blog-post-card` | Blog-specific card |
| `.tag` | Tag/label styling |
| `.tag-brand` | Brand-colored tag |
| `.tag-muted` | Neutral-colored tag |

---

## Button Components

### Button Variants

```html
<!-- Primary button -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary button -->
<a href="#" class="btn btn-secondary">Secondary Action</a>

<!-- Ghost button -->
<a href="#" class="btn btn-ghost">Tertiary Action</a>
```

### Button with Icon

```html
<button class="btn btn-primary">
    <i class="fas fa-download"></i>
    Download
</button>
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.btn` | Base button styling |
| `.btn--primary` | Brand color background |
| `.btn--secondary` | Light brand background |
| `.btn--ghost` | Transparent with border |
| `.btn__icon` | Icon inside button |

---

## Form Components

### Form Structure

```html
<form action="https://formsubmit.co/your-email@example.com" method="POST">
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
    </div>

    <div class="form-group">
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" required>
    </div>

    <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5" required></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Send Message</button>
</form>
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.form-group` | Form input + label wrapper |
| `.form-error` | Error message styling |

---

## Utility Components

### Surface Component

```html
<div class="surface">
    <h3>Content Title</h3>
    <p>Content...</p>
</div>
```

### Section Label

```html
<span class="section-label">
    <i class="fas fa-tag"></i>
    Category
</span>
```

### Breadcrumbs

```html
<div class="breadcrumbs" aria-label="Breadcrumb">
    <a href="index.html">Home</a>
    <span aria-hidden="true">/</span>
    <a href="parent.html">Parent</a>
    <span aria-hidden="true">/</span>
    <span aria-current="page">Current</span>
</div>
```

### CSS Classes

| Class | Purpose |
|-------|---------|
| `.surface` | Card-like styling with hover effect |
| `.section-label` | Category/section heading badge |
| `.breadcrumbs` | Breadcrumb navigation |
| `.sr-only` | Screen reader only content |

---

## See Also

- [patterns/html-structure.md](../patterns/html-structure.md) - HTML patterns
- [patterns/css-conventions.md](../patterns/css-conventions.md) - CSS conventions
- [reference/css-variables.md](css-variables.md) - CSS variables
