# CSS Variables Reference

> **Purpose**: Complete CSS variable list with usage examples.

## Typography Variables

### Font Families

```css
/* Sans-serif for body text */
--font-sans: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

/* Serif for headings */
--font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;

/* Monospace for code */
--font-mono: 'Fira Code', 'SF Mono', 'Roboto Mono', monospace;
```

### Usage

```css
body {
    font-family: var(--font-sans);
}

h1, h2, h3 {
    font-family: var(--font-serif);
}

code, pre {
    font-family: var(--font-mono);
}
```

---

## Layout Variables

### Content Layout

```css
/* Maximum content width */
--content-max: 1200px;

/* Spacing between elements */
--gutter: clamp(1.5rem, 5vw, 3rem);

/* Border radius */
--radius-sm: 12px;
--radius-md: 20px;
--radius-lg: 32px;

/* Header height */
--header-height: 80px;
```

### Usage

```css
.container {
    width: min(100% - 2 * var(--gutter), var(--content-max));
    margin-inline: auto;
}

.card {
    border-radius: var(--radius-md);
}

.site-header {
    min-height: var(--header-height);
}
```

---

## Color Variables - Light Theme

### Primary Colors

```css
/* Brand colors */
--color-brand: #3b5bfb;           /* Vibrant Blue */
--color-brand-strong: #2038c7;    /* Deep Blue */
--color-brand-soft: #eff4ff;      /* Soft Blue Tint */

/* Accent color */
--color-accent: #f97316;          /* Energetic Orange */

/* Brand contrast (for text on brand backgrounds) */
--color-brand-contrast: #ffffff;
--color-accent-contrast: #ffffff;
```

### Neutral Palette

```css
/* Dark to light slate */
--color-neutral-900: #0f172a;
--color-neutral-800: #1e293b;
--color-neutral-700: #334155;
--color-neutral-600: #475569;
--color-neutral-500: #64748b;
--color-neutral-300: #cbd5e1;
--color-neutral-200: #e2e8f0;
--color-neutral-100: #f1f5f9;

/* White */
--color-white: #ffffff;
```

### Theme Backgrounds

```css
--color-background: #ffffff;
--color-surface: #f8fafc;
--color-surface-alt: #ffffff;

/* Text colors */
--color-text: var(--color-neutral-700);
--color-text-muted: var(--color-neutral-500);

/* Borders */
--color-border: rgba(148, 163, 184, 0.15);
--color-border-strong: rgba(148, 163, 184, 0.3);

/* Overlays */
--color-overlay: rgba(15, 23, 42, 0.6);
```

### Usage

```css
.button {
    background: var(--color-brand);
    color: var(--color-brand-contrast);
}

.text-muted {
    color: var(--color-text-muted);
}

.card {
    background: var(--color-surface-alt);
    border: 1px solid var(--color-border);
}
```

---

## Color Variables - Dark Theme

### Dark Theme Override

```css
[data-theme="dark"] {
    /* Backgrounds */
    --color-background: #020617;      /* Deep Slate */
    --color-surface: #0f172a;
    --color-surface-alt: #1e293b;

    /* Text colors */
    --color-text: #e2e8f0;
    --color-text-muted: #94a3b8;

    /* Brand colors (lighter for dark mode) */
    --color-brand: #60a5fa;
    --color-brand-strong: #3b82f6;
    --color-brand-soft: rgba(59, 130, 246, 0.15);

    /* Accent color */
    --color-accent: #fb923c;

    /* Neutral palette (inverted) */
    --color-neutral-900: #f8fafc;
    --color-neutral-800: #f1f5f9;

    /* Borders (lighter for dark mode) */
    --color-border: rgba(255, 255, 255, 0.08);
    --color-border-strong: rgba(255, 255, 255, 0.15);

    /* Overlays */
    --color-overlay: rgba(15, 23, 42, 0.8);
}
```

### Dark Theme Usage

```css
[data-theme="dark"] .button {
    background: var(--color-brand);
    /* Color is now lighter (#60a5fa) in dark mode */
}

[data-theme="dark"] .card {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(18px);
}
```

---

## Shadow Variables

### Shadow Layers

```css
/* Small shadow - cards, buttons */
--shadow-sm:
    0 2px 4px rgba(20, 24, 40, 0.02),
    0 6px 12px rgba(20, 24, 40, 0.03);

/* Medium shadow - hover states */
--shadow-md:
    0 4px 8px rgba(17, 24, 39, 0.02),
    0 12px 24px rgba(17, 24, 39, 0.04),
    0 24px 48px rgba(17, 24, 39, 0.06);

/* Large shadow - featured elements */
--shadow-lg:
    0 8px 16px rgba(20, 24, 40, 0.03),
    0 20px 40px rgba(20, 24, 40, 0.05),
    0 40px 80px rgba(20, 24, 40, 0.08);
```

### Dark Theme Shadows

```css
[data-theme="dark"] {
    /* Darker shadows for dark mode */
    --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
    --shadow-md: 0 8px 16px rgba(0, 0, 0, 0.3);
    --shadow-lg: 0 16px 32px rgba(0, 0, 0, 0.4);
}
```

### Usage

```css
.card {
    box-shadow: var(--shadow-sm);
}

.card:hover {
    box-shadow: var(--shadow-md);
}

.featured {
    box-shadow: var(--shadow-lg);
}
```

---

## Transition Variables

### Timing Functions

```css
/* Fast transition - hover states */
--transition-fast: 200ms cubic-bezier(0.2, 0.8, 0.2, 1);

/* Base transition - default animations */
--transition-base: 350ms cubic-bezier(0.2, 0.8, 0.2, 1);

/* Bounce transition - playful effects */
--transition-bounce: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Usage

```css
.button {
    transition:
        color var(--transition-fast),
        background var(--transition-fast),
        transform var(--transition-base);
}

.card {
    transition:
        transform var(--transition-base),
        box-shadow var(--transition-base);
}

.animation {
    transition:
        opacity var(--transition-bounce),
        transform var(--transition-bounce);
}
```

---

## Gradients

### Hero Gradients

```css
/* Light theme hero gradient */
--page-hero-gradient:
    radial-gradient(100% 100% at 50% 0%, rgba(59, 91, 251, 0.08) 0%, transparent 60%),
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);

/* Hero overlay */
--page-hero-overlay: linear-gradient(to bottom, transparent, #ffffff);

/* Hero text colors */
--page-hero-heading-color: var(--color-neutral-900);
--page-hero-body-color: var(--color-text);
--page-hero-muted-color: var(--color-text-muted);
```

### Dark Theme Gradients

```css
[data-theme="dark"] {
    --page-hero-gradient:
        radial-gradient(100% 100% at 50% 0%, rgba(96, 165, 250, 0.12) 0%, transparent 60%),
        linear-gradient(180deg, #020617 0%, #0f172a 100%);

    --page-hero-overlay: linear-gradient(to bottom, transparent, #020617);

    --page-hero-heading-color: rgba(240, 244, 255, 0.96);
    --page-hero-body-color: rgba(224, 232, 255, 0.9);
    --page-hero-muted-color: rgba(190, 205, 245, 0.75);
}
```

### Usage

```css
.page-header {
    background: var(--page-hero-gradient);
    color: var(--page-hero-body-color);
}

.page-header h1 {
    color: var(--page-hero-heading-color);
}
```

---

## Glass Effect Variables

### Glass Surface

```css
/* Light theme glass */
--glass-surface: rgba(255, 255, 255, 0.7);
--glass-border: rgba(255, 255, 255, 0.5);
--glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.04);
```

### Dark Theme Glass

```css
[data-theme="dark"] {
    --glass-surface: rgba(15, 23, 42, 0.7);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Usage

```css
.card-glass {
    background: var(--glass-surface);
    backdrop-filter: blur(18px);
    border: 1px solid var(--glass-border);
    box-shadow: var(--glass-shadow);
}
```

---

## Complete Variable List

### Quick Reference

| Category | Variable | Light Theme | Dark Theme |
|----------|-----------|-------------|-------------|
| **Typography** | --font-sans | 'Inter', system-ui | 'Inter', system-ui |
| | --font-serif | 'Playfair Display', serif | 'Playfair Display', serif |
| | --font-mono | 'Fira Code', monospace | 'Fira Code', monospace |
| **Layout** | --content-max | 1200px | 1200px |
| | --gutter | clamp(1.5rem, 5vw, 3rem) | clamp(1.5rem, 5vw, 3rem) |
| | --header-height | 80px | 80px |
| **Colors** | --color-brand | #3b5bfb | #60a5fa |
| | --color-accent | #f97316 | #fb923c |
| | --color-background | #ffffff | #020617 |
| | --color-surface | #f8fafc | #0f172a |
| | --color-surface-alt | #ffffff | #1e293b |
| | --color-text | #334155 | #e2e8f0 |
| | --color-text-muted | #64748b | #94a3b8 |
| | --color-border | rgba(148, 163, 184, 0.15) | rgba(255, 255, 255, 0.08) |
| **Shadows** | --shadow-sm | Multi-layered | Multi-layered (darker) |
| | --shadow-md | Multi-layered | Multi-layered (darker) |
| | --shadow-lg | Multi-layered | Multi-layered (darker) |
| **Transitions** | --transition-fast | 200ms | 200ms |
| | --transition-base | 350ms | 350ms |
| | --transition-bounce | 500ms | 500ms |

---

## Best Practices

### When Using Variables

1. **Always use CSS variables** - never hardcode colors
2. **Test both themes** - ensure variables work in light and dark mode
3. **Use meaningful names** - `--color-brand` not `--my-blue`
4. **Group logically** - organize variables by category in your CSS

### Custom Properties in Components

```css
/* Component-specific properties */
.card {
    --card-bg: var(--color-surface-alt);
    --card-border: var(--color-border);
}

.card--featured {
    --card-bg: var(--color-brand-soft);
}
```

---

## See Also

- [patterns/css-conventions.md](../patterns/css-conventions.md) - CSS conventions
- [patterns/html-structure.md](../patterns/html-structure.md) - HTML patterns
