(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', async () => {
        const nav = document.getElementById('main-nav');
        const updateNav = () => nav.classList.toggle('nav-scrolled', window.scrollY > 10);
        window.addEventListener('scroll', updateNav, { passive: true });
        updateNav();
        const menuButton = document.getElementById('mobile-menu-btn');
        menuButton.setAttribute('aria-controls', 'mobile-menu');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.addEventListener('click', () => {
            const closed = document.getElementById('mobile-menu').classList.toggle('hidden');
            menuButton.setAttribute('aria-expanded', String(!closed));
            document.getElementById('menu-icon-open').classList.toggle('hidden', !closed);
            document.getElementById('menu-icon-close').classList.toggle('hidden', closed);
        });
        try {
            const response = await fetch('assets/data/citations.json');
            if (!response.ok) throw new Error('Citation data unavailable');
            const data = await response.json();
            const snapshots = data.snapshots;
            const latest = snapshots[snapshots.length - 1];
            document.getElementById('updated').textContent = 'Last updated · ' + new Date(latest.date + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
            document.getElementById('stats').innerHTML = [['Deduplicated total', latest.total], ['Google Scholar', latest.scholar], ['CNKI', latest.cnki]].map(([label, count]) => `<div class="citation-stat"><strong>${count}</strong>${label}</div>`).join('');
            const start = Date.UTC(data.annual[0].year, 11, 31);
            const end = Date.parse(latest.date);
            const x = date => 48 + (date - start) / (end - start) * 690;
            const ceiling = Math.ceil(Math.max(...snapshots.map(s => Math.max(s.total, s.scholar, s.cnki))) / 10) * 10;
            const y = n => 285 - n / ceiling * 240;
            let svg = '<svg viewBox="0 0 800 335" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">Cumulative citation history</title><desc id="chart-desc">Stacked areas: deduplicated Google Scholar below, additional CNKI citations above. The upper boundary is the deduplicated total. Annual history is followed by observed totals.</desc>';
            for (let n = 0; n <= ceiling; n += 10) svg += `<line class="grid" x1="48" x2="738" y1="${y(n)}" y2="${y(n)}"/><text x="35" y="${y(n) + 4}" text-anchor="end">${n}</text>`;
            const dates = data.annual.map(r => Math.min(Date.UTC(r.year, 11, 31), Date.parse(data.observed_date)));
            data.annual.forEach((r, i) => { svg += `<text x="${x(dates[i])}" y="310" text-anchor="middle">${r.year}</text>`; });
            let scholarSum = 0;
            const history = data.annual.map((r, i) => {
                scholarSum += r.scholar - (r.scholar_internal_duplicates || 0);
                return { x: x(dates[i]), scholar: scholarSum, total: r.cumulative, label: `${r.year} · historical`, historical: true };
            });
            const observed = snapshots.map(s => ({ x: x(Date.parse(s.date)), scholar: s.scholar - s.scholar_internal_duplicates, total: s.total, date: s.date }));
            // At the baseline date, use the observed total as the plotted endpoint.
            // Keeping both values at the same x coordinate creates a vertical spike.
            const points = [...history.filter(p => !observed.some(s => s.x === p.x)), ...observed];
            const coords = (rows, key) => rows.map(p => `${p.x},${y(p[key])}`).join(' ');
            svg += `<polygon class="area scholar" points="${points[0].x},${y(0)} ${coords(points, 'scholar')} ${points[points.length - 1].x},${y(0)}"/>`;
            svg += `<polygon class="area cnki" points="${coords(points, 'total')} ${coords([...points].reverse(), 'scholar')}"/>`;
            for (const [key, color] of [['scholar', 'scholar'], ['total', 'cnki']]) {
                svg += `<g class="${color}"><polyline class="series" points="${coords(points, key)}"/>`;
                svg += '</g>';
            }
            svg += '<g id="hover-markers" visibility="hidden"><line id="hover-guide" y1="45" y2="285" stroke-dasharray="4 4"/><circle id="hover-scholar" class="observed scholar" r="5"/><circle id="hover-total" class="observed cnki" r="5"/></g>';
            const chart = document.getElementById('chart');
            chart.innerHTML = svg + '</svg><div class="chart-tooltip" role="status" hidden></div>';
            const plot = chart.querySelector('svg');
            const tooltip = chart.querySelector('.chart-tooltip');
            const guide = chart.querySelector('#hover-guide');
            const markers = chart.querySelector('#hover-markers');
            plot.setAttribute('tabindex', '0');
            plot.setAttribute('aria-label', 'Citation history. Use left and right arrows to inspect dates.');
            let selected = points.length - 1;
            const showPoint = index => {
                selected = index;
                const point = points[index];
                const dateLabel = point.label || new Date(point.date + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
                tooltip.innerHTML = `<strong>${dateLabel}</strong><span>Google Scholar <b>${point.scholar}</b></span><span>CNKI <b>${point.total - point.scholar}</b></span><span>Total <b>${point.total}</b></span>`;
                tooltip.hidden = false;
                tooltip.style.left = `${Math.max(0, Math.min(point.x / 800 * chart.clientWidth + 12, chart.clientWidth - tooltip.offsetWidth))}px`;
                guide.setAttribute('x1', point.x);
                guide.setAttribute('x2', point.x);
                chart.querySelector('#hover-scholar').setAttribute('cx', point.x);
                chart.querySelector('#hover-scholar').setAttribute('cy', y(point.scholar));
                chart.querySelector('#hover-total').setAttribute('cx', point.x);
                chart.querySelector('#hover-total').setAttribute('cy', y(point.total));
                markers.setAttribute('visibility', 'visible');
            };
            const hidePoint = () => { tooltip.hidden = true; markers.setAttribute('visibility', 'hidden'); };
            plot.addEventListener('pointermove', event => {
                const rect = plot.getBoundingClientRect();
                const mouseX = (event.clientX - rect.left) / rect.width * 800;
                let nearest = 0;
                points.forEach((point, index) => {
                    if (Math.abs(point.x - mouseX) <= Math.abs(points[nearest].x - mouseX)) nearest = index;
                });
                showPoint(nearest);
            });
            plot.addEventListener('pointerleave', hidePoint);
            plot.addEventListener('focus', () => {
                if (plot.matches(':focus-visible')) showPoint(selected);
            });
            plot.addEventListener('blur', hidePoint);
            plot.addEventListener('keydown', event => {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    showPoint(Math.max(0, Math.min(points.length - 1, selected + (event.key === 'ArrowLeft' ? -1 : 1))));
                }
            });
        } catch (error) {
            document.getElementById('load-error').hidden = false;
            console.error(error);
        }
    });
})();
