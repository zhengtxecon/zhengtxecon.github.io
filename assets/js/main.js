document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully');
    
    // Ensure cursor is visible by removing any potential canvas overlays
    // that might have been added by the splash cursor
    const fluidCanvas = document.getElementById('fluid');
    if (fluidCanvas) {
        fluidCanvas.remove();
    }
    
    // Reset cursor style on body and all elements
    document.body.style.cursor = 'default';
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Handle header background on scroll
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll direction
        if (window.scrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        
        lastScrollY = window.scrollY;
    });
    
    // Add scroll to top button
    const scrollTopBtn = document.createElement('div');
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when button is clicked
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // In a real application, you would send this data to a server
                console.log('Form submitted:', { name, email, message });
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }
    
    // Contact form purpose-specific guidance
    const purposeSelect = document.getElementById('contact-purpose');
    const messageTextarea = document.getElementById('message');
    
    if (purposeSelect && messageTextarea) {
        purposeSelect.addEventListener('change', function() {
            const value = this.value;
            let placeholder = '';
            
            switch(value) {
                case 'research':
                    placeholder = 'Please describe your research interests, potential collaboration ideas, and any specific projects you have in mind...';
                    break;
                case 'speaking':
                    placeholder = 'Please provide details about the event, target audience, date, location, and the topic you would like me to address...';
                    break;
                case 'academic':
                    placeholder = 'Please describe the academic topic you would like to discuss and any specific questions you have...';
                    break;
                case 'student':
                    placeholder = 'Please let me know what program you are in, your research interests, and how I might help with your academic journey...';
                    break;
                case 'other':
                    placeholder = 'Please provide details about how I can assist you...';
                    break;
                default:
                    placeholder = 'Please describe your proposal, research interests, or how we might collaborate...';
            }
            
            messageTextarea.placeholder = placeholder;
        });
    }
    
    // Project filter functionality (for portfolio page)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-filter');
                const projects = document.querySelectorAll('.project');
                
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                projects.forEach(project => {
                    if (category === 'all' || project.classList.contains(category)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Add fade-in animation to elements when they come into view
    const fadeElements = document.querySelectorAll('.fade-element');
    
    if (fadeElements.length > 0 && 'IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        fadeElements.forEach(element => {
            fadeObserver.observe(element);
        });
    }
});