# JavaScript Modules

> **Purpose**: Define JavaScript coding patterns for the website.

## IIFE Pattern (Required)

All JavaScript must use IIFE (Immediately Invoked Function Expression) to prevent global namespace pollution.

### Basic IIFE Structure

```javascript
(function() {
    'use strict';

    // All code here is scoped to this function

    document.addEventListener('DOMContentLoaded', () => {
        // Initialization code
    });
})();
```

### Why IIFE?

- **No global variables**: Variables don't leak to window object
- **Strict mode by default**: 'use strict' catches common errors
- **Encapsulation**: Code is self-contained

---

## DOM Manipulation Patterns

### Select Elements

```javascript
// Single element
const header = document.querySelector('.site-header');
const button = document.querySelector('.theme-toggle');

// Multiple elements
const navLinks = document.querySelectorAll('.nav-link');
const cards = document.querySelectorAll('.card');
```

### Event Listeners

```javascript
// Click event
button.addEventListener('click', (event) => {
    event.preventDefault();
    // Handle click
});

// Form submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Handle submit
});

// Scroll event (passive for performance)
window.addEventListener('scroll', handleScroll, { passive: true });
```

### DOM Updates

```javascript
// Update text
element.textContent = 'New text';

// Update HTML (use cautiously)
element.innerHTML = '<span>New HTML</span>';

// Update attributes
element.setAttribute('aria-expanded', 'true');
element.dataset.themeState = 'dark';

// Add/remove classes
element.classList.add('new-class');
element.classList.remove('old-class');
element.classList.toggle('active');

// Check class
element.classList.contains('active');
```

---

## Component Hydration Pattern

### Fetch and Insert HTML

```javascript
function loadPartial(target, url, fallbackHtml) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status}`);
            }
            return response.text();
        })
        .catch(error => {
            console.warn(`[tz-site] ${error.message}. Falling back to embedded markup.`);
            return fallbackHtml;
        })
        .then(html => {
            if (html) {
                target.innerHTML = html;
                target.dataset.loaded = 'true';
            }
        });
}
```

### Usage

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const headerTarget = document.getElementById('header-placeholder');
    const footerTarget = document.getElementById('footer-placeholder');

    loadPartial(headerTarget, 'includes/header.html', HEADER_FALLBACK);
    loadPartial(footerTarget, 'includes/footer.html', FOOTER_FALLBACK);
});
```

---

## Intersection Observer Pattern

### Scroll Animations

```javascript
function initScrollAnimations() {
    const animated = Array.from(document.querySelectorAll('[data-animate]'));
    if (!animated.length) return;

    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        animated.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18,      // Trigger when 18% visible
        rootMargin: '0px 0px -10% 0px'  // Trigger before fully in view
    });

    animated.forEach(el => observer.observe(el));
}
```

### Sticky Header Detection

```javascript
function initHeaderScroll() {
    const header = document.querySelector('[data-component="header"]');
    if (!header) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            header.classList.toggle('is-stuck', !entry.isIntersecting);
        },
        { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
    );

    const sentinel = document.createElement('div');
    sentinel.className = 'header-sentinel';
    header.before(sentinel);
    observer.observe(sentinel);
}
```

---

## Theme Toggle Pattern

### Theme Switching

```javascript
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    // Determine initial theme
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('tz-theme');
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme, { toggle, persist: Boolean(storedTheme) });

    // Toggle on click
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme, { toggle });
    });

    // Listen for system preference changes
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = event => {
        if (localStorage.getItem('tz-theme')) return;  // User has manual preference
        applyTheme(event.matches ? 'dark' : 'light', { toggle, persist: false });
    };

    if (systemPreference.addEventListener) {
        systemPreference.addEventListener('change', handler);
    } else if (systemPreference.addListener) {
        systemPreference.addListener(handler);
    }
}

function applyTheme(theme, { toggle, persist = true } = {}) {
    document.documentElement.setAttribute('data-theme', theme);
    if (toggle) {
        toggle.dataset.themeState = theme;
        toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
    if (persist) {
        localStorage.setItem('tz-theme', theme);
    }
}
```

---

## Navigation Pattern

### Mobile Menu Toggle

```javascript
function initNavigation() {
    const header = document.querySelector('[data-component="header"]');
    if (!header) return;

    const toggle = header.querySelector('.nav-toggle');
    const navList = header.querySelector('.nav-links');

    if (toggle && navList) {
        const setNavState = open => {
            toggle.setAttribute('aria-expanded', String(open));
            header.classList.toggle('nav-open', open);
            document.body.classList.toggle('nav-open', open);
        };

        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            setNavState(!expanded);
        });

        // Close on link click
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setNavState(false);
            });
        });
    }
}
```

### Active Page Highlighting

```javascript
function highlightActivePage() {
    const normalizePath = value => {
        if (!value) return '';
        return value.split(/[?#]/)[0];
    };

    const rawPage = window.location.pathname.split('/').pop();
    const page = normalizePath(rawPage) || 'index.html';
    const pageContext = document.body?.dataset.page || '';
    const blogContexts = new Set(['blog', 'blog-post', 'blog-category']);

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        const normalizedHref = normalizePath(href) || (href === '' ? 'index.html' : href);
        const matchesCurrent = normalizedHref === page;
        const matchesBlogContext = blogContexts.has(pageContext) && href === 'blog.html';

        if (matchesCurrent || matchesBlogContext) {
            link.classList.add('is-active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('is-active');
            link.removeAttribute('aria-current');
        }
    });
}
```

---

## Form Handling Pattern

### Client-Side Validation

```javascript
function initFormValidation(form) {
    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            showError('Please fill in all required fields');
            return;
        }

        // Form is valid, allow submission
    });
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    // Insert error message
}
```

---

## Performance Patterns

### Debounce

```javascript
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Usage
window.addEventListener('scroll', debounce(handleScroll, 100));
```

### Throttle

```javascript
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Usage
window.addEventListener('resize', throttle(handleResize, 200));
```

---

## Best Practices

### DO

1. **Use IIFE** to prevent global pollution
2. **Event delegation** for multiple similar elements
3. **IntersectionObserver** for scroll animations
4. **Passive listeners** for scroll/resize events
5. **ARIA attributes** for accessibility

### DON'T

1. **Inline JavaScript** in HTML
2. **Global variables** (use const/let in IIFE)
3. **eval()** - security risk
4. **Blocking synchronous** operations
5. **Inline event handlers** like `onclick="..."`

---

## See Also

- [patterns/html-structure.md](html-structure.md) - HTML patterns
- [patterns/css-conventions.md](css-conventions.md) - CSS patterns
- [patterns/accessibility-patterns.md](accessibility-patterns.md) - Accessibility patterns
