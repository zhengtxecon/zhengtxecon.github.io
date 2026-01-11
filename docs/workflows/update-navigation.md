# Update Navigation & Footer

> **Purpose**: Guide to modify header and footer navigation links.

## Overview

This workflow covers:
- Adding/removing navigation links in header
- Adding/removing links in footer "Explore" section
- Updating social media links in footer
- Updating contact information in footer

---

## Header Navigation

### File Location

`includes/header.html`

### Navigation Links Structure

```html
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
```

### Adding a Navigation Link

```html
<li><a class="nav-link" href="new-page.html">New Page</a></li>
```

### Removing a Navigation Link

Delete entire `<li>` element:
```html
<li><a class="nav-link" href="remove-this.html">Remove This</a></li>  <!-- DELETE -->
```

### Reordering Navigation Links

Move `<li>` elements up or down in list to change order.

---

## Footer Links

### File Location

`includes/footer.html`

### Footer "Explore" Section

```html
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
```

### Adding a Footer Link

```html
<li><a href="new-page.html">New Page</a></li>
```

### Removing a Footer Link

Delete `<li>` element.

---

## Footer Contact Information

### Contact Links Section

```html
<div class="footer-column">
    <h3>Stay in touch</h3>
    <ul class="footer-links">
        <li><a href="mailto:tianxiang.zheng.22@ucl.ac.uk"><i class="fas fa-envelope"></i> tianxiang.zheng.22@ucl.ac.uk</a></li>
        <li><a href="mailto:marxzheng@outlook.com"><i class="fas fa-paper-plane"></i> marxzheng@outlook.com</a></li>
        <li><a href="contact.html"><i class="fas fa-handshake"></i> Request a meeting</a></li>
    </ul>
</div>
```

### Updating Email Addresses

Change `href` and display text:
```html
<li><a href="mailto:new.email@example.com"><i class="fas fa-envelope"></i> new.email@example.com</a></li>
```

---

## Footer Social Links

### Social Links Section

```html
<div class="footer-column">
    <h3>Connect</h3>
    <div class="footer-social">
        <a href="https://scholar.google.com/citations?user=yMayrcEAAAAJ" target="_blank" rel="noopener"><i class="fas fa-graduation-cap"></i> Scholar</a>
        <a href="https://github.com/zhengtxecon" target="_blank" rel="noopener"><i class="fab fa-github"></i> GitHub</a>
        <a href="https://www.linkedin.com/in/tianxiang-marx-zheng-187ab0131/" target="_blank" rel="noopener"><i class="fab fa-linkedin-in"></i> LinkedIn</a>
    </div>
</div>
```

### Adding a Social Link

```html
<a href="https://platform.com/username" target="_blank" rel="noopener"><i class="fab fa-platform"></i> Platform Name</a>
```

Choose appropriate Font Awesome icon:
- `fab fa-twitter` - Twitter/X
- `fab fa-instagram` - Instagram
- `fab fa-youtube` - YouTube
- `fas fa-globe` - Website

### Removing a Social Link

Delete entire `<a>` element.

---

## Footer Brand Section

```html
<div class="footer-brand">
    <span class="footer-initials" aria-hidden="true">TZ</span>
    <div>
        <p class="footer-name">Tianxiang Zheng (郑天翔)</p>
        <p class="footer-tagline">Economist · Researcher · Educator</p>
    </div>
</div>
```

### Updating Name/Tagline

Change text in `<p>` elements. **Ensure Chinese characters are UTF-8 encoded**.

---

## Validation & Testing

### Testing Checklist

- [ ] All navigation links work
- [ ] All footer links work
- [ ] Social links open in new tab (target="_blank")
- [ ] Rel="noopener" on all external links
- [ ] Active page highlighting works
- [ ] Mobile menu works
- [ ] Chinese characters display correctly

### Browser Testing

Open site, test:
1. Click each navigation link
2. Click each footer link
3. Test on mobile (responsive menu)
4. Test dark mode

---

## Common Issues

### Issue: Navigation links not highlighting active page

**Cause**: JS `highlightActivePage()` function in `main.js` relies on URL matching.

**Solution**: Ensure link href matches page file name exactly.

### Issue: Chinese characters broken

**Cause**: File encoding issue.

**Solution**: Ensure `includes/header.html` and `includes/footer.html` saved as UTF-8.

### Issue: Footer not loading

**Cause**: Missing `<div id="footer-placeholder"></div>` on page.

**Solution**: Add placeholder before closing `</body>`.

---

## See Also

- [patterns/html-structure.md](../patterns/html-structure.md) - HTML patterns
- [reference/components-overview.md](../reference/components-overview.md) - Component reference
