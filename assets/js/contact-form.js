/**
 * Enhanced contact form functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const purposeSelect = document.getElementById('contact-purpose');
    const messageTextarea = document.getElementById('message');
    
    // Dynamic message placeholders based on selected purpose
    if (purposeSelect && messageTextarea) {
        purposeSelect.addEventListener('change', function() {
            const value = this.value;
            let placeholder = '';
            
            switch(value) {
                case 'Research Collaboration':
                    placeholder = 'Please describe your research interests, potential collaboration ideas, and any specific projects you have in mind...';
                    break;
                case 'Speaking/Conference Invitation':
                    placeholder = 'Please provide details about the event, target audience, date, location, and the topic you would like me to address...';
                    break;
                case 'Academic Discussion':
                    placeholder = 'Please describe the academic topic you would like to discuss and any specific questions you have...';
                    break;
                case 'Student Inquiry':
                    placeholder = 'Please let me know what program you are in, your research interests, and how I might help with your academic journey...';
                    break;
                case 'Other':
                    placeholder = 'Please provide details about how I can assist you...';
                    break;
                default:
                    placeholder = 'Please describe your proposal, research interests, or how we might collaborate...';
            }
            
            messageTextarea.placeholder = placeholder;
        });
    }
    
    // Enhanced form input interaction
    const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea, .input-wrapper select');
    
    formInputs.forEach(input => {
        // Check initial state (for browsers that auto-fill)
        if (input.value.trim()) {
            input.parentElement.classList.add('has-value');
        }
        
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value.trim()) {
                input.parentElement.classList.add('has-value');
            } else {
                input.parentElement.classList.remove('has-value');
            }
        });
    });
    
    // Form submission animation
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            const submitBtn = this.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('i');
            
            // Preserve width to prevent button from resizing
            submitBtn.style.width = submitBtn.offsetWidth + 'px';
            
            // Update button appearance
            btnText.textContent = 'Sending...';
            btnIcon.className = ''; // Clear existing classes
            btnIcon.classList.add('fas', 'fa-spinner', 'fa-spin');
            
            // Let the form submission continue
            // FormSubmit.co will handle the submission and redirect
        });
    }
});

/**
 * Contact form handling for FormSubmit.co integration
 */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add loading state to button on submit
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit naturally to FormSubmit.co
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnIcon = submitBtn.querySelector('i');
            
            // Show loading state
            btnText.textContent = 'Sending...';
            btnIcon.className = 'fas fa-spinner fa-spin';
            submitBtn.disabled = true;
            
            // No need to prevent default or handle AJAX - let FormSubmit handle it
            // The form will redirect to the thank-you page as specified in _next
        });
    }
    
    // Form field animations (keep existing functionality)
    const formInputs = document.querySelectorAll('.input-wrapper input, .input-wrapper textarea, .input-wrapper select');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Check initial state (for browsers that auto-fill)
        if (input.value.trim()) {
            input.parentElement.classList.add('focused');
        }
    });
});
