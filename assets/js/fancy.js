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

    // Hero pointer tracking for interactive background accents
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const updateHeroPointer = (event) => {
            const rect = heroSection.getBoundingClientRect();
            const x = ((event.clientX - rect.left) / rect.width) * 100;
            const y = ((event.clientY - rect.top) / rect.height) * 100;

            heroSection.style.setProperty('--pointer-x', `${x}%`);
            heroSection.style.setProperty('--pointer-y', `${y}%`);
        };

        heroSection.addEventListener('mousemove', updateHeroPointer);
        heroSection.addEventListener('mouseleave', () => {
            heroSection.style.setProperty('--pointer-x', '50%');
            heroSection.style.setProperty('--pointer-y', '50%');
        });
    }

});
