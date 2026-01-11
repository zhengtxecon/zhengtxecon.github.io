# Update Existing Content

> **Purpose**: Guide to update existing pages (CV, research, teaching, etc.)

## Overview

This workflow covers updating content on existing pages without structural changes.

---

## Update CV Page

### File Location

`cv.html`

### Common CV Updates

**Add new publication**:
```html
<article class="publication-item surface">
    <div class="pub-header">
        <h3>New Publication Title</h3>
        <span class="pub-year">2025</span>
    </div>
    <p>Co-authors: Name1, Name2, Name3</p>
    <p>Journal or Conference Name</p>
    <a href="assets/files/paper.pdf" class="btn btn-secondary"><i class="fas fa-file-pdf"></i> Download PDF</a>
</article>
```

**Add new work experience**:
```html
<section class="experience-item">
    <h3>Position Title</h3>
    <div class="exp-meta">
        <span>Institution Name</span>
        <span>Start Date - End Date</span>
    </div>
    <ul>
        <li>Key responsibility 1</li>
        <li>Key responsibility 2</li>
    </ul>
</section>
```

**Add new education**:
```html
<section class="education-item">
    <h3>Degree Name</h3>
    <div class="edu-meta">
        <span>Institution</span>
        <span>Year</span>
    </div>
</section>
```

---

## Update Research Page

### File Location

`research.html`

### Add New Research Project

```html
<section class="research-project surface">
    <div class="project-header">
        <span class="tag tag-brand">Working Paper</span>
        <span>2025</span>
    </div>
    <h3>Research Project Title</h3>
    <p>Brief abstract or description of research...</p>
    <div class="project-actions">
        <a href="#" class="btn btn-ghost">Read abstract</a>
        <a href="#" class="btn btn-secondary"><i class="fas fa-file-pdf"></i> Full paper</a>
    </div>
</section>
```

### Update Research Statistics

Update metrics in hero section:
```html
<div class="hero-metrics">
    <div class="metric">
        <span class="metric-value">3</span>
        <span class="metric-label">Working papers</span>
    </div>
    <div class="metric">
        <span class="metric-value">10</span>
        <span class="metric-label">Google Scholar citations</span>
    </div>
</div>
```

---

## Update Teaching Page

### File Location

`teaching.html`

### Add New Course

```html
<section class="course-item surface">
    <div class="course-header">
        <h3>Course Code: Course Name</h3>
        <span class="course-term">Fall 2025</span>
    </div>
    <p>Institution Name</p>
    <p>Course description...</p>
    <div class="course-resources">
        <a href="#" class="btn btn-secondary"><i class="fas fa-download"></i> Syllabus</a>
        <a href="#" class="btn btn-ghost"><i class="fas fa-external-link-alt"></i> Course page</a>
    </div>
</section>
```

---

## Update Contact Page

### File Location

`contact.html`

### Update Contact Information

```html
<div class="contact-info">
    <div class="contact-item">
        <i class="fas fa-envelope"></i>
        <div>
            <span class="label">Email</span>
            <a href="mailto:tianxiang.zheng.22@ucl.ac.uk">tianxiang.zheng.22@ucl.ac.uk</a>
        </div>
    </div>
</div>
```

---

## Update Homepage

### File Location

`index.html`

### Update News Section

```html
<article class="news-card">
    <div class="news-card__meta">
        <span class="news-card__date">January 2026</span>
        <span class="news-card__tag">News</span>
    </div>
    <h3><a href="#">News Headline</a></h3>
    <p>News description...</p>
</article>
```

### Update Hero Section

```html
<div class="hero-copy">
    <p class="hero-subtitle">New tagline or subtitle...</p>
    <p class="hero-summary">Updated summary text...</p>
</div>
```

---

## Content Best Practices

### Text Content

1. **Keep it concise**: 2-3 sentences per paragraph
2. **Use active voice**: "Research shows" not "It was shown by research"
3. **Link to sources**: Cite papers, data sources
4. **Update dates**: Keep publication dates, event dates current

### Accessibility

1. **Alt text**: All images have descriptive alt text
2. **Link text**: Use descriptive text, not "click here"
3. **Heading hierarchy**: Use `<h1>`, `<h2>`, `<h3>` correctly

### SEO

1. **Meta descriptions**: Unique, 150-160 characters
2. **Page titles**: Descriptive, include key terms
3. **Structured data**: Consider JSON-LD schema

---

## Validation & Testing

### Checklist

- [ ] Content is accurate and up-to-date
- [ ] All links work
- [ ] Images have alt text
- [ ] No typos or grammatical errors
- [ ] Chinese characters display correctly
- [ ] Dark mode works
- [ ] Mobile responsive

### Browser Testing

1. Open updated page
2. Check all content displays correctly
3. Test all links
4. Test on mobile
5. Test dark mode

---

## See Also

- [patterns/html-structure.md](../patterns/html-structure.md) - HTML patterns
- [reference/css-variables.md](../reference/css-variables.md) - CSS variables
