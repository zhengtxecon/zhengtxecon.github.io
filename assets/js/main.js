// Core site interactions
const HEADER_FALLBACK = `
<header class="site-header" data-component="header">
    <div class="container header-inner">
        <a class="brand" href="index.html" aria-label="Tianxiang Zheng home">
            <span class="brand-initials" aria-hidden="true">TZ</span>
            <span class="brand-text">
                <span class="brand-name">Tianxiang Zheng</span>
                <span class="brand-role">Economist · Researcher · Educator</span>
            </span>
        </a>

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
`;

const FOOTER_FALLBACK = `
<footer class="site-footer" data-component="footer">
    <div class="container footer-inner">
        <div class="footer-brand">
            <span class="footer-initials" aria-hidden="true">TZ</span>
            <div>
                <p class="footer-name">Tianxiang Zheng (郑天翔)</p>
                <p class="footer-tagline">Economist · Researcher · Educator</p>
            </div>
        </div>

        <div class="footer-grid">
            <div class="footer-column">
                <h3>Stay in touch</h3>
                <ul class="footer-links">
                    <li><a href="mailto:tianxiang.zheng.22@ucl.ac.uk"><i class="fas fa-envelope"></i> tianxiang.zheng.22@ucl.ac.uk</a></li>
                    <li><a href="mailto:marxzheng@outlook.com"><i class="fas fa-paper-plane"></i> marxzheng@outlook.com</a></li>
                    <li><a href="contact.html"><i class="fas fa-handshake"></i> Request a meeting</a></li>
                </ul>
            </div>
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

    <div class="footer-bottom">
        <div class="container footer-bottom-inner">
            <p>&copy; <span data-year></span> Tianxiang Zheng. Crafted for clarity and collaboration.</p>
            <button class="to-top" type="button" aria-label="Back to top">
                <i class="fas fa-arrow-up"></i>
            </button>
        </div>
    </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
    hydratePartials().then(() => {
        initNavigation();
        initHeaderScroll();
        initThemeToggle();
        initScrollAnimations();
        highlightActivePage();
        initScrollToTop();
        updateFooterYear();
    });
});

function hydratePartials() {
    const headerTarget = document.getElementById('header-placeholder');
    const footerTarget = document.getElementById('footer-placeholder');
    const root = document.body.dataset.root || '';

    const requests = [];

    if (headerTarget && !headerTarget.dataset.loaded) {
        requests.push(loadPartial(headerTarget, `${root}includes/header.html`, HEADER_FALLBACK, root));
    }

    if (footerTarget && !footerTarget.dataset.loaded) {
        requests.push(loadPartial(footerTarget, `${root}includes/footer.html`, FOOTER_FALLBACK, root));
    }

    return Promise.all(requests);
}

function loadPartial(target, url, fallbackHtml, root = '') {
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
                if (root) {
                    // Rewrite relative links that don't start with http, //, #, or /
                    // This regex matches href="value" or src="value"
                    html = html.replace(/(href|src)=["']((?![a-z]+:|#|\/)[^"']+)["']/gi, (match, attr, value) => {
                        return `${attr}="${root}${value}"`;
                    });
                }
                target.innerHTML = html;
                target.dataset.loaded = 'true';
            }
        });
}

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

        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                setNavState(false);
            });
        });
    }
}

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

function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('tz-theme');
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    applyTheme(initialTheme, { toggle, persist: Boolean(storedTheme) });

    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme, { toggle });
    });

    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
    const systemPreferenceHandler = event => {
        if (localStorage.getItem('tz-theme')) return;
        applyTheme(event.matches ? 'dark' : 'light', { toggle, persist: false });
    };

    if (systemPreference.addEventListener) {
        systemPreference.addEventListener('change', systemPreferenceHandler);
    } else if (systemPreference.addListener) {
        systemPreference.addListener(systemPreferenceHandler);
    }
}

function applyTheme(theme, { toggle, persist = true } = {}) {
    document.documentElement.setAttribute('data-theme', theme);
    if (toggle) {
        toggle.dataset.themeState = theme;
        toggle.setAttribute('aria-pressed', String(theme === 'dark'));
        toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    if (persist) {
        localStorage.setItem('tz-theme', theme);
    }
}

function initScrollAnimations() {
    const main = document.querySelector('main');
    if (!main) return;

    main.querySelectorAll('section:not([data-animate])').forEach(section => {
        section.dataset.animate = 'fade-up';
    });

    document.querySelectorAll('.surface:not([data-animate])').forEach((card, index) => {
        card.dataset.animate = 'scale-in';
        card.style.setProperty('--reveal-delay', `${(index % 4) * 80}ms`);
    });

    const animated = Array.from(document.querySelectorAll('[data-animate]'));
    if (!animated.length) return;

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
        threshold: 0.18,
        rootMargin: '0px 0px -10% 0px'
    });

    animated.forEach(el => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0;
        if (inView) {
            el.classList.add('is-visible');
        } else {
            observer.observe(el);
        }
    });
}

function highlightActivePage() {
    const normalizePath = value => {
        if (!value) return '';
        return value.split(/[?#]/)[0];
    };

    const rawPage = window.location.pathname.split('/').pop();
    const page = normalizePath(rawPage) || 'index.html';
    const pageContext = (document.body && document.body.dataset.page) || '';
    const blogContexts = new Set(['blog', 'blog-post', 'blog-category', 'blog-series']);

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

function initScrollToTop() {
    const toTop = document.querySelector('.to-top');
    if (!toTop) return;

    const toggleVisibility = () => {
        toTop.classList.toggle('is-visible', window.scrollY > 600);
    };

    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility, { passive: true });

    toTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function updateFooterYear() {
    const yearEl = document.querySelector('[data-year]');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}
