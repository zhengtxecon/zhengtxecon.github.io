# CSS Conventions

> **Purpose**: Define consistent CSS coding standards for the website.

## CSS Variable System

### Design Tokens (style.css)

```css
:root {
    /* Typography */
    --font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
    --font-mono: 'Fira Code', 'SF Mono', 'Roboto Mono', monospace;

    /* Layout */
    --content-max: 1200px;
    --gutter: clamp(1.5rem, 5vw, 3rem);
    --radius-sm: 12px;
    --radius-md: 20px;
    --radius-lg: 32px;
    --header-height: 80px;

    /* Colors - NEVER HARDCODE */
    --color-brand: #3b5bfb;
    --color-brand-strong: #2038c7;
    --color-brand-soft: #eff4ff;
    --color-accent: #f97316;

    /* Neutral palette */
    --color-neutral-900: #0f172a;
    --color-neutral-800: #1e293b;
    --color-neutral-700: #334155;
    --color-neutral-600: #475569;
    --color-neutral-500: #64748b;
    --color-neutral-300: #cbd5e1;
    --color-neutral-200: #e2e8f0;
    --color-neutral-100: #f1f5f9;

    /* Theme backgrounds */
    --color-background: #ffffff;
    --color-surface: #f8fafc;
    --color-surface-alt: #ffffff;
    --color-text: var(--color-neutral-700);
    --color-text-muted: var(--color-neutral-500);

    /* Borders */
    --color-border: rgba(148, 163, 184, 0.15);
    --color-border-strong: rgba(148, 163, 184, 0.3);

    /* Shadows */
    --shadow-sm:
        0 2px 4px rgba(20, 24, 40, 0.02),
        0 6px 12px rgba(20, 24, 40, 0.03);
    --shadow-md:
        0 4px 8px rgba(17, 24, 39, 0.02),
        0 12px 24px rgba(17, 24, 39, 0.04),
        0 24px 48px rgba(17, 24, 39, 0.06);
    --shadow-lg:
        0 8px 16px rgba(20, 24, 40, 0.03),
        0 20px 40px rgba(20, 24, 40, 0.05),
        0 40px 80px rgba(20, 24, 40, 0.08);

    /* Transitions */
    --transition-fast: 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --transition-base: 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
    --transition-bounce: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Dark Theme Variables

```css
[data-theme="dark"] {
    --color-background: #020617;
    --color-surface: #0f172a;
    --color-surface-alt: #1e293b;

    --color-text: #e2e8f0;
    --color-text-muted: #94a3b8;

    --color-border: rgba(255, 255, 255, 0.08);
    --color-border-strong: rgba(255, 255, 255, 0.15);

    --color-brand: #60a5fa;
    --color-brand-strong: #3b82f6;
    --color-brand-soft: rgba(59, 130, 246, 0.15);

    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 16px 32px rgba(0, 0, 0, 0.4);
}
```

---

## BEM Naming Convention

### Basic Structure

```css
.block { }
.block__element { }
.block--modifier { }
```

### Examples

```css
/* Block - standalone entity */
.card { }

/* Element - part of block */
.card__title { }
.card__content { }
.card__actions { }

/* Modifier - variant of block */
.card--featured { }
.card--compact { }

/* Combined */
.card--featured .card__title {
    /* Special styling for featured card title */
}
```

### Common BEM Patterns

```css
/* Button */
.btn { }
.btn--primary { }
.btn--secondary { }
.btn--ghost { }
.btn__icon { }

/* Navigation */
.nav { }
.nav__link { }
.nav__link--active { }

/* Form */
.form-group { }
.form-group__label { }
.form-group__input { }
.form-group__error { }
```

---

## Responsive Breakpoints

### Mobile-First Approach

```css
/* Default - Mobile styles (320px+) */
.element {
    padding: 1rem;
    font-size: 1rem;
}

/* Tablet (768px+) */
@media (min-width: 768px) {
    .element {
        padding: 1.5rem;
        font-size: 1.1rem;
    }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
    .element {
        padding: 2rem;
        font-size: 1.2rem;
    }
}

/* Large Desktop (1440px+) */
@media (min-width: 1440px) {
    .element {
        padding: 2.5rem;
    }
}
```

### Using clamp() for Fluid Typography

```css
/* clamp(min, preferred, max) */
font-size: clamp(1rem, 2.5vw, 1.5rem);
padding: clamp(1.5rem, 5vw, 3rem);
```

---

## Layout Patterns

### Container

```css
.container {
    width: min(100% - 2 * var(--gutter), var(--content-max));
    margin-inline: auto;
}
```

### Flexbox Layout

```css
.flex-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--gutter);
}

.flex-column {
    display: flex;
    flex-direction: column;
    gap: var(--gutter);
}
```

### Grid Layout

```css
.grid {
    display: grid;
    gap: var(--gutter);
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}
```

---

## Dark Mode Patterns

### Theme-Specific Overrides

```css
/* Default (light mode) */
.card {
    background: var(--color-surface-alt);
    color: var(--color-text);
}

/* Dark mode override */
[data-theme="dark"] .card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(18px);
}
```

### Custom Properties with Theme

```css
.card {
    background: var(--card-bg, var(--color-surface-alt));
}

[data-theme="dark"] .card {
    --card-bg: rgba(30, 41, 59, 0.7);
}
```

---

## Utility Classes

### Text Alignment

```css
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-left { text-align: left; }
```

### Margin/Padding

```css
.mt-0 { margin-top: 0; }
.mt-lg { margin-top: 3rem; }
.mb-0 { margin-bottom: 0; }
.mb-lg { margin-bottom: 3rem; }
```

### Display

```css
.sr-only { /* screen reader only */ }
.hidden { display: none; }
```

---

## Animation Patterns

### Fade In Animation

```css
[data-animate] {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 350ms ease, transform 350ms ease;
}

[data-animate].is-visible {
    opacity: 1;
    transform: translateY(0);
}
```

### Hover Effects

```css
.card {
    transition: transform 350ms ease, box-shadow 350ms ease;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-md);
}
```

---

## Best Practices

### DO

1. **Use CSS variables** for colors, spacing, fonts
2. **BEM naming** for components
3. **Mobile-first** responsive design
4. **Prefers-reduced-motion** for accessibility
5. **Minimize specificity** (avoid nesting deeper than 3 levels)

### DON'T

1. **Hardcode colors** (use `var(--color-brand)`)
2. **Use `!important`** (rare exceptions)
3. **Inline styles** in HTML (except for dynamic values)
4. **Skip heading levels** (h1 → h2 → h3)
5. **Magic numbers** (use variables)

---

## CSS Optimization

### Group Selectors

```css
/* Good - grouped */
.btn--primary,
.btn--secondary {
    padding: 0.75rem 1.6rem;
    border-radius: 999px;
}

.btn--primary {
    background: var(--color-brand);
}

.btn--secondary {
    background: var(--color-surface-alt);
}

/* Avoid - repeated */
.btn--primary {
    padding: 0.75rem 1.6rem;
    border-radius: 999px;
    background: var(--color-brand);
}

.btn--secondary {
    padding: 0.75rem 1.6rem;
    border-radius: 999px;
    background: var(--color-surface-alt);
}
```

### Shorthand Properties

```css
/* Good - shorthand */
margin: 1rem 0;
padding: clamp(1.5rem, 5vw, 3rem);
font: 600 1.1rem var(--font-sans);

/* Avoid - long form */
margin-top: 1rem;
margin-bottom: 1rem;
margin-left: 0;
margin-right: 0;
```

---

## See Also

- [reference/css-variables.md](../reference/css-variables.md) - Complete variable list
- [patterns/html-structure.md](html-structure.md) - HTML patterns
- [patterns/javascript-modules.md](javascript-modules.md) - JS patterns
