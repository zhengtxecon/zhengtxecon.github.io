# Accessibility Patterns

> **Purpose**: Ensure website is accessible to all users.

## WCAG 2.1 Compliance

This site aims for WCAG 2.1 Level AA compliance.

### Key Principles

1. **Perceivable**: Information must be presentable to users in ways they can perceive
2. **Operable**: Interface components must be operable
3. **Understandable**: Information and operation must be understandable
4. **Robust**: Content must be robust enough to be interpreted by assistive technologies

---

## ARIA Attributes

### Landmark Roles

```html
<!-- Page structure -->
<header role="banner">...</header>
<nav role="navigation">...</nav>
<main role="main">...</main>
<aside role="complementary">...</aside>
<footer role="contentinfo">...</footer>
```

### Navigation Labels

```html
<!-- Primary navigation -->
<nav aria-label="Primary navigation">
    <ul>
        <li><a href="index.html">Home</a></li>
    </ul>
</nav>

<!-- Secondary navigation -->
<nav aria-label="Blog categories">
    <ul>
        <li><a href="blog-research.html">Research</a></li>
    </ul>
</nav>
```

### Descriptive Labels

```html
<!-- Buttons without visible text -->
<button aria-label="Toggle menu">
    <span class="hamburger"></span>
</button>

<button aria-label="Switch to dark mode" aria-pressed="false">
    <i class="fas fa-moon"></i>
</button>

<!-- Descriptive links -->
<a href="cv.pdf" aria-label="Download Tianxiang Zheng's CV (PDF)">
    CV
</a>
```

### Current Page Indicator

```html
<a href="current-page.html" aria-current="page">
    Current Page
</a>
```

### Expanded/Collapsed States

```html
<button aria-expanded="false" aria-controls="menu">
    Menu
</button>
<ul id="menu">
    <li><a href="#">Item 1</a></li>
</ul>
```

---

## Keyboard Navigation

### Focus Management

```javascript
// Ensure focusable elements have visible focus state
button:focus-visible,
a:focus-visible,
input:focus-visible {
    outline: 3px solid var(--color-brand);
    outline-offset: 2px;
}
```

### Tab Order

Ensure logical tab order:
```html
<!-- Correct - logical order -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<footer>...</footer>

<!-- Incorrect - hidden elements in tab order -->
<div tabindex="-1">...</div>
```

### Keyboard Shortcuts

```javascript
// Escape key closes menu
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});
```

---

## Screen Reader Support

### Screen Reader Only Text

```html
<span class="sr-only">Additional context for screen readers</span>
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

### Icon Accessibility

```html
<!-- Decorative icons -->
<i class="fas fa-envelope" aria-hidden="true"></i>

<!-- Meaningful icons -->
<i class="fas fa-envelope" aria-label="Email"></i>

<!-- Icon with text -->
<a href="mailto:email@example.com">
    <i class="fas fa-envelope" aria-hidden="true"></i>
    <span>Email me</span>
</a>
```

### Alt Text

```html
<!-- Informative alt text -->
<img src="profile.jpg" alt="Portrait of Tianxiang Zheng, smiling, wearing glasses">

<!-- Decorative images -->
<img src="decorative.jpg" alt="" role="presentation">

<!-- Informative charts -->
<img src="chart.png" alt="Line chart showing employment trends from 2020 to 2025, with steady increase">
```

---

## Forms Accessibility

### Label Association

```html
<!-- Using for/id -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- Using wrapping -->
<label>
    Email Address
    <input type="email" name="email" required>
</label>

<!-- Fieldset for groups -->
<fieldset>
    <legend>Contact Information</legend>
    <div>
        <label for="name">Name</label>
        <input type="text" id="name" name="name">
    </div>
    <div>
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
    </div>
</fieldset>
```

### Error Messages

```html
<div class="form-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" aria-describedby="email-error" aria-invalid="true">
    <span id="email-error" class="error-message" role="alert">Please enter a valid email address</span>
</div>
```

### Required Fields

```html
<label for="name">Name <span class="required" aria-label="required">*</span></label>
<input type="text" id="name" name="name" required aria-required="true">
```

---

## Skip Links

```html
<a href="#main-content" class="skip-link">Skip to main content</a>

<main id="main-content">
    <!-- Main content -->
</main>
```

```css
.skip-link {
    position: absolute;
    top: -9999px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    background: var(--color-brand);
    color: white;
    z-index: 9999;
    transition: top 0.2s;
}

.skip-link:focus {
    top: 1rem;
    outline: 3px solid white;
}
```

---

## Color Contrast

### Minimum Contrast Ratios

- **Normal text**: 4.5:1 (AA), 7:1 (AAA)
- **Large text (18pt+)**: 3:1 (AA), 4.5:1 (AAA)
- **UI components**: 3:1 (AA)

### Using CSS Variables

The site's CSS variables are designed to meet WCAG AA contrast ratios:

```css
/* These combinations meet WCAG AA */
color: var(--color-text);
background: var(--color-background);

color: var(--color-white);
background: var(--color-brand);
```

### Testing

Use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) to verify.

---

## Reduced Motion

### Prefers-Reduced-Motion

```css
/* Default animations */
.card {
    transition: transform 350ms ease;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    .card {
        transition: none;
        transform: none !important;
        animation: none !important;
    }
}
```

### JavaScript Check

```javascript
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations
} else {
    // Enable animations
}
```

---

## Testing Tools

### Browser Extensions

- [WAVE Extension](https://wave.webaim.org/) - Accessibility evaluation
- [axe DevTools](https://www.deque.com/axe/devtools/) - Automated testing
- [Lighthouse](https://developers.google.com/web/tools/lighthouse/) - Performance & accessibility

### Online Validators

- [WAVE](https://wave.webaim.org/) - WebAIM's accessibility checker
- [axe DevTools](https://axe.dev/) - Deque's accessibility testing

### Screen Readers

- **NVDA** (Windows, free)
- **JAWS** (Windows, paid)
- **VoiceOver** (macOS, built-in)
- **Narrator** (Windows, built-in)

---

## Common Issues

### Issue: Keyboard trap

**Cause**: User can't tab out of a component.

**Solution**: Ensure all modal/dialogs have close functionality and trap focus correctly.

### Issue: Missing alt text

**Cause**: Images without `alt` attribute.

**Solution**: Add descriptive alt text to all images. Use empty string for decorative images.

### Issue: Focus not visible

**Cause**: Browser default focus outline removed.

**Solution**: Ensure visible focus state on all interactive elements.

---

## See Also

- [patterns/html-structure.md](html-structure.md) - HTML patterns
- [patterns/javascript-modules.md](javascript-modules.md) - JS patterns
- [reference/troubleshooting.md](../reference/troubleshooting.md) - Troubleshooting
