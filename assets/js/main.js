(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', async () => {
        const root = document.body.dataset.root || '';
        try {
            await Promise.all(['header', 'footer'].map(async name => {
                const target = document.getElementById(`${name}-placeholder`);
                if (!target) return;
                const response = await fetch(`${root}includes/${name}.html`, { cache: 'no-cache' });
                if (!response.ok) throw new Error(`Unable to load ${name}`);
                target.innerHTML = await response.text();
                target.querySelectorAll('[href], [src]').forEach(element => {
                    for (const attribute of ['href', 'src']) {
                        const value = element.getAttribute(attribute);
                        if (value && !/^(?:[a-z]+:|\/|#)/i.test(value)) element.setAttribute(attribute, root + value);
                    }
                });
            }));
            const nav = document.getElementById('main-nav');
            const scroll = () => nav.classList.toggle('nav-scrolled', window.scrollY > 10);
            window.addEventListener('scroll', scroll, { passive: true });
            scroll();
            const button = document.getElementById('mobile-menu-btn');
            const menu = document.getElementById('mobile-menu');
            button.setAttribute('aria-controls', 'mobile-menu');
            button.setAttribute('aria-expanded', 'false');
            button.addEventListener('click', () => {
                const closed = menu.classList.toggle('hidden');
                button.setAttribute('aria-expanded', String(!closed));
                document.getElementById('menu-icon-open').classList.toggle('hidden', !closed);
                document.getElementById('menu-icon-close').classList.toggle('hidden', closed);
            });
            const contact = nav.querySelector('.nav-btn');
            contact.removeAttribute('onclick');
            contact.addEventListener('click', () => { window.location.href = root + 'contact.html'; });
            // Mark the current page in the shared desktop nav (is-active + aria-current)
            const here = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '');
            nav.querySelectorAll('.nav-link').forEach(link => {
                const rawHref = link.getAttribute('href');
                const target = new URL(rawHref, window.location.href).pathname.replace(/\/index\.html$/, '/').replace(/\/+$/, '');
                const isDirectoryLink = /\/$/.test(rawHref);
                if (here === target || (isDirectoryLink && here.startsWith(target + '/'))) {
                    link.classList.add('is-active');
                    link.classList.replace('text-slate-700', 'text-slate-900');
                    link.setAttribute('aria-current', 'page');
                }
            });
        } catch (error) { console.error(error); }
    });
})();
