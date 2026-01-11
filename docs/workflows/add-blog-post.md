# Add Blog Post - Complete Workflow

> **Purpose**: Guide to add a new blog post with all necessary updates.

## Overview

This workflow creates a new blog post and updates:
- Blog category index page
- Blog main index (`blog.html`)
- RSS feed (`feed.xml`)
- Sitemap (`sitemap.xml`)

**Prerequisites**:
- Git repository cloned locally
- Feature branch created
- Blog post content ready

---

## Step 1: Create Blog Post HTML File

### File Naming

Use descriptive, lowercase, hyphenated names:
- `how-i-switched-from-github-copilot.html`
- `automation-labour-market-2025.html`

### Blog Post Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Blog post description (150-160 chars)">

    <!-- Open Graph -->
    <meta property="og:title" content="Blog Post Title · Tianxiang Zheng">
    <meta property="og:description" content="Blog post description">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://zhengtxecon.github.io/blog-post-title.html">
    <meta property="og:image" content="https://zhengtxecon.github.io/assets/images/profile.jpg">
    <meta property="article:published_time" content="2025-01-15">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Blog Post Title">

    <!-- RSS -->
    <link rel="alternate" type="application/rss+xml" title="Tianxiang Zheng · Blog feed" href="feed.xml">
    <link rel="sitemap" type="application/xml" href="sitemap.xml">

    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/blog-post.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <script src="assets/js/main.js" defer></script>

    <title>Blog Post Title · Tianxiang Zheng (郑天翔)</title>
</head>
<body data-page="blog-post">
    <div id="header-placeholder"></div>

    <article class="blog-post">
        <header class="blog-post-header">
            <div class="container">
                <div class="blog-post-meta">
                    <span class="tag tag-brand">Research</span>  <!-- or Teaching, Tools -->
                    <span class="date">15 January 2025</span>
                    <span class="read-time">8 min read</span>
                </div>

                <h1>Blog Post Title</h1>

                <div class="blog-post-author">
                    <img src="assets/images/profile.jpg" alt="Tianxiang Zheng" />
                    <div>
                        <span class="author-name">By Tianxiang Zheng</span>
                        <span class="author-bio">Economist · Researcher · Educator</span>
                    </div>
                </div>

                <p class="blog-post-intro">
                    Brief introduction or hook for blog post...
                </p>
            </div>
        </header>

        <main class="blog-post-content">
            <div class="container">
                <!-- Blog post content -->
                <!-- Use semantic headings: <h2>, <h3>, <h4> -->
                <!-- Use <p>, <ul>, <ol>, <blockquote>, <code> -->

                <section>
                    <h2>First Section</h2>
                    <p>Content goes here...</p>
                </section>

                <section>
                    <h2>Second Section</h2>
                    <p>More content...</p>
                </section>
            </div>
        </main>

        <footer class="blog-post-footer">
            <div class="container">
                <div class="blog-post-navigation">
                    <a href="blog.html" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Back to Blog</a>
                </div>

                <div class="blog-post-share">
                    <span>Share this post:</span>
                    <a href="https://twitter.com/intent/tweet?text=Check+out+this+blog+post&url=https://zhengtxecon.github.io/blog-post-title.html" target="_blank" rel="noopener"><i class="fab fa-twitter"></i></a>
                    <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://zhengtxecon.github.io/blog-post-title.html" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
        </footer>
    </article>

    <div id="footer-placeholder"></div>
</body>
</html>
```

### Blog Post Meta Tags

Add appropriate tags based on post category:
- `<meta property="article:section" content="Research">`
- `<meta property="article:tag" content="automation">`

---

## Step 2: Update Category Index Page

### Choose Category Index

Based on your post type:
- Research posts → `blog-research.html`
- Teaching posts → `blog-teaching.html`
- Tools posts → `blog-tools.html`

### Add Post Card to Category Index

```html
<section class="blog-posts-grid">
    <div class="container">
        <!-- Add new card at top -->
        <article class="surface blog-post-card">
            <div class="blog-post-card-meta">
                <span class="tag tag-brand">Research</span>
                <span class="date">15 January 2025</span>
            </div>

            <h3><a href="blog-post-title.html">Blog Post Title</a></h3>

            <p>Excerpt or summary of blog post (2-3 sentences)...</p>

            <div class="blog-post-card-footer">
                <span class="read-time">8 min read</span>
                <a href="blog-post-title.html" class="btn btn-ghost">Read more <i class="fas fa-arrow-right"></i></a>
            </div>
        </article>

        <!-- Existing cards... -->
    </div>
</section>
```

---

## Step 3: Update Main Blog Index

Edit `blog.html`:

### Add to Featured Section (if applicable)

```html
<section id="featured" class="blog-featured">
    <div class="container blog-featured-grid">
        <!-- Add featured post -->
        <article class="surface blog-featured-post">
            <div class="blog-featured-meta">
                <span class="tag tag-brand">Research</span>
                <span class="tag tag-muted">8 min read</span>
            </div>
            <h2><a href="blog-post-title.html">Blog Post Title</a></h2>
            <p>Excerpt...</p>
        </article>
    </div>
</section>
```

### Add to Recent Posts Section

```html
<section id="recent" class="blog-recent">
    <div class="container">
        <div class="section-heading">
            <h2>Recent Posts</h2>
        </div>

        <div class="blog-posts-grid">
            <!-- Add new card -->
            <article class="surface blog-post-card">
                <!-- Same card structure as category index -->
            </article>
        </div>
    </div>
</section>
```

---

## Step 4: Update RSS Feed

Edit `feed.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Tianxiang Zheng · Blog</title>
        <link>https://zhengtxecon.github.io/blog.html</link>
        <description>Insights on future of work, automation, and development economics</description>
        <atom:link href="https://zhengtxecon.github.io/feed.xml" rel="self" type="application/rss+xml"/>
        <language>en-us</language>

        <!-- ADD NEW ITEM HERE (at top) -->
        <item>
            <title>Blog Post Title</title>
            <link>https://zhengtxecon.github.io/blog-post-title.html</link>
            <description>Blog post excerpt...</description>
            <pubDate>Wed, 15 Jan 2025 00:00:00 GMT</pubDate>
            <guid isPermaLink="true">https://zhengtxecon.github.io/blog-post-title.html</guid>
        </item>

        <!-- Existing items... -->
    </channel>
</rss>
```

### RSS Date Format

Use RFC 822 format: `Wed, 15 Jan 2025 00:00:00 GMT`

---

## Step 5: Update Sitemap

Edit `sitemap.xml`:

```xml
<url>
    <loc>https://zhengtxecon.github.io/blog-post-title.html</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
</url>
```

---

## Step 6: Validation & Testing

### Validation Checklist

- [ ] HTML validates
- [ ] Blog post displays correctly
- [ ] Links to/from blog work
- [ ] RSS feed validates
- [ ] Sitemap includes new post
- [ ] Chinese characters display correctly
- [ ] Dark mode works
- [ ] Mobile responsive

### Test RSS Feed

Use RSS validator: [https://validator.w3.org/feed/](https://validator.w3.org/feed/)

---

## Step 7: Commit & Deploy

```bash
git add blog-post-title.html blog-research.html blog.html feed.xml sitemap.xml
git commit -m "Add blog post: Blog Post Title"
git push origin feature/add-blog-post
# Create PR, merge, auto-deploy
```

---

## Common Issues

### Issue: Blog post not appearing in category index

**Cause**: Card not added to category HTML file.

**Solution**: Add card to `blog-research.html`, `blog-teaching.html`, or `blog-tools.html`.

### Issue: RSS feed not updating

**Cause**: `<item>` not added or date format incorrect.

**Solution**: Use RFC 822 date format, add `<item>` at top of feed.

### Issue: Navigation not highlighting blog

**Cause**: `data-page="blog-post"` attribute on `<body>`.

**Solution**: Ensure body has correct `data-page` attribute.

---

## See Also

- [patterns/html-structure.md](../patterns/html-structure.md) - HTML patterns
- [reference/troubleshooting.md](../reference/troubleshooting.md) - Troubleshooting
