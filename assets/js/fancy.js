document.addEventListener('DOMContentLoaded', () => {
    
    // Spotlight Effect
    const cards = document.querySelectorAll('.spotlight');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // Simple 3D Tilt Effect for cards with data-tilt
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class styles dynamically (keeps tilt transforms intact)
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            will-change: transform, opacity;
        }

        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    const revealTargets = document.querySelectorAll('.bento-card, .hero-text, .hero-actions');

    revealTargets.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });

    // Hero pointer tracking for interactive background accents and particles
    const heroSection = document.querySelector('.hero-section');
    const pointerState = { x: 0.5, y: 0.5 };
    const pointerVector = { x: 0, y: 0, strength: 0 };
    let pointerTargetStrength = 0;

    if (heroSection) {
        const updateHeroPointer = (event) => {
            const rect = heroSection.getBoundingClientRect();
            const normX = (event.clientX - rect.left) / rect.width;
            const normY = (event.clientY - rect.top) / rect.height;
            const x = normX * 100;
            const y = normY * 100;

            pointerState.x = normX;
            pointerState.y = normY;
            pointerVector.x = normX * rect.width;
            pointerVector.y = normY * rect.height;
            pointerTargetStrength = 1;

            heroSection.style.setProperty('--pointer-x', `${x}%`);
            heroSection.style.setProperty('--pointer-y', `${y}%`);
        };

        heroSection.addEventListener('mousemove', updateHeroPointer);
        heroSection.addEventListener('mouseleave', () => {
            const rect = heroSection.getBoundingClientRect();
            pointerState.x = 0.5;
            pointerState.y = 0.5;
            pointerVector.x = rect.width * 0.5;
            pointerVector.y = rect.height * 0.5;
            pointerTargetStrength = 0;
            heroSection.style.setProperty('--pointer-x', '50%');
            heroSection.style.setProperty('--pointer-y', '50%');
        });
    }

    // Particle text in hero (particles form the name and react to cursor)
    const particleCanvas = document.querySelector('.hero-particles');
    if (heroSection && particleCanvas && particleCanvas.getContext) {
        const ctx = particleCanvas.getContext('2d');
        const particles = [];
        const MAX_TARGETS = 7800;
        let width = 0;
        let height = 0;
        let deviceScale = window.devicePixelRatio || 1;
        let textTargets = [];
        const textLabel = 'Tianxiang Zheng';

        const resizeCanvas = () => {
            const rect = heroSection.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            deviceScale = window.devicePixelRatio || 1;
            particleCanvas.width = width * deviceScale;
            particleCanvas.height = height * deviceScale;
            particleCanvas.style.width = `${rect.width}px`;
            particleCanvas.style.height = `${rect.height}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(deviceScale, deviceScale);
            pointerVector.x = width * pointerState.x;
            pointerVector.y = height * pointerState.y;
        };

        let startTime = performance.now();

        const buildTextTargets = () => {
            const offscreen = document.createElement('canvas');
            const offW = Math.min(900, Math.max(540, width * 0.7));
            const offH = Math.min(260, Math.max(170, height * 0.3));
            offscreen.width = offW;
            offscreen.height = offH;
            const octx = offscreen.getContext('2d');

            const fontSize = Math.min(offH * 0.62, offW * 0.13);
            octx.clearRect(0, 0, offW, offH);
            octx.fillStyle = '#ffffff';
            octx.textAlign = 'center';
            octx.textBaseline = 'middle';
            octx.font = `700 ${fontSize}px "Outfit", "Inter", sans-serif`;
            octx.fillText(textLabel, offW / 2, offH / 2 + fontSize * 0.04);

            const data = octx.getImageData(0, 0, offW, offH).data;
            const gap = 1;
            const points = [];
            for (let y = 0; y < offH; y += gap) {
                for (let x = 0; x < offW; x += gap) {
                    const idx = (y * offW + x) * 4 + 3;
                    if (data[idx] > 100) {
                        points.push({
                            x: x - offW / 2,
                            y: y - offH / 2
                        });
                    }
                }
            }

            // Shuffle then cap to keep performance while retaining shape fidelity
            for (let i = points.length - 1; i > 0; i -= 1) {
                const j = Math.floor(Math.random() * (i + 1));
                [points[i], points[j]] = [points[j], points[i]];
            }
            const selected = points.slice(0, Math.min(MAX_TARGETS, points.length));

            const offsetX = width / 2;
            const offsetY = height * 0.42;
            textTargets = selected.map(point => ({
                x: point.x + offsetX,
                y: point.y + offsetY
            }));
        };

        const initParticles = () => {
            particles.length = 0;
            const count = textTargets.length || MAX_TARGETS;
            for (let i = 0; i < count; i += 1) {
                particles.push({
                    x: width / 2 + (Math.random() - 0.5) * 140,
                    y: height / 2 + (Math.random() - 0.5) * 100,
                    tx: width / 2,
                    ty: height / 2,
                    size: 0.5 + Math.random() * 0.7,
                    jitter: Math.random() * Math.PI * 2
                });
            }
        };

        const assignTargets = () => {
            if (!textTargets.length) return;
            if (particles.length < textTargets.length) {
                const needed = textTargets.length - particles.length;
                for (let i = 0; i < needed; i += 1) {
                    particles.push({
                        x: width / 2 + (Math.random() - 0.5) * 140,
                        y: height / 2 + (Math.random() - 0.5) * 100,
                        tx: width / 2,
                        ty: height / 2,
                        size: 0.5 + Math.random() * 0.7,
                        jitter: Math.random() * Math.PI * 2
                    });
                }
            } else if (particles.length > textTargets.length) {
                particles.length = textTargets.length;
            }

            particles.forEach((p, idx) => {
                const target = textTargets[idx % textTargets.length];
                p.tx = target.x;
                p.ty = target.y;
            });
        };

        const updateParticles = () => {
            const now = performance.now();
            const settleRaw = Math.min(1, (now - startTime) / 1400);
            const settle = settleRaw * settleRaw * (3 - 2 * settleRaw);
            const jitterScale = 1 - settle * 0.65;
            pointerVector.strength += (pointerTargetStrength - pointerVector.strength) * 0.12;
            const basePointerInfluence = pointerVector.strength * (0.92 - settle * 0.35);
            const influenceRadius = Math.max(110, Math.min(220, width * 0.18));
            const maxDistSq = influenceRadius * influenceRadius;

            particles.forEach(p => {
                let targetX = p.tx;
                let targetY = p.ty;

                if (basePointerInfluence > 0.001) {
                    const dx = p.tx - pointerVector.x;
                    const dy = p.ty - pointerVector.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < maxDistSq) {
                        const dist = Math.sqrt(distSq) || 1;
                        const falloff = 1 - dist / influenceRadius;
                        const push = basePointerInfluence * falloff * 12;
                        const swirl = basePointerInfluence * falloff * 4;

                        targetX += (dx / dist) * push - (dy / dist) * swirl;
                        targetY += (dy / dist) * push + (dx / dist) * swirl;
                    }
                }

                p.x += (targetX - p.x) * 0.16;
                p.y += (targetY - p.y) * 0.16;

                p.jitter += 0.028;
                p.x += Math.cos(p.jitter) * 0.16 * jitterScale;
                p.y += Math.sin(p.jitter) * 0.16 * jitterScale;
            });
        };

        const renderParticles = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(95, 196, 255, 0.9)';

            const now = performance.now();
            const blendRaw = Math.min(1, (now - startTime) / 1400);
            const blend = blendRaw * blendRaw * (3 - 2 * blendRaw); // smoothstep
            const particleAlphaScale = 0.72 + blend * 0.28;
            const particleSizeScale = 1 - blend * 0.1;

            particles.forEach(p => {
                const size = Math.max(0.4, p.size * particleSizeScale);
                ctx.globalAlpha = (0.5 + Math.min(0.35, (p.y / height))) * particleAlphaScale;
                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
        };

        const start = () => {
            resizeCanvas();
            buildTextTargets();
            initParticles();
            assignTargets();

            const tick = () => {
                updateParticles();
                renderParticles();
                requestAnimationFrame(tick);
            };

            tick();

            window.addEventListener('resize', () => {
                resizeCanvas();
                buildTextTargets();
                initParticles();
                assignTargets();
                startTime = performance.now();
            });
        };

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(start);
        } else {
            start();
        }
    }

});
