// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile sidenav
    var sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    // Initialize scrollspy for smooth scrolling
    var scrollspy = document.querySelectorAll('.scrollspy');
    M.ScrollSpy.init(scrollspy, {
        scrollOffset: 64 // Height of the navbar
    });

    // Initialize form validation
    var forms = document.querySelectorAll('form');
    M.updateTextFields();

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Account for fixed navbar
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                var instance = M.Sidenav.getInstance(document.querySelector('.sidenav'));
                if (instance.isOpen) {
                    instance.close();
                }
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.createElement('a');
    backToTopBtn.href = '#';
    backToTopBtn.className = 'btn-floating btn-large waves-effect waves-light blue back-to-top';
    backToTopBtn.innerHTML = '<i class="material-icons">arrow_upward</i>';
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Form submission handling
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('invalid');
                } else {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                }
            });
            
            // Email validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value.trim())) {
                    isValid = false;
                    emailInput.classList.add('invalid');
                }
            }
            
            if (isValid) {
                // Show success message
                M.toast({
                    html: 'Thank you for your message! We will get back to you soon.',
                    classes: 'rounded green'
                });
                
                // Reset form
                this.reset();
                
                // Remove validation classes
                inputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
            } else {
                M.toast({
                    html: 'Please fill in all required fields correctly.',
                    classes: 'rounded red'
                });
            }
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .section h2, .section p');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.card, .section h2, .section p').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});
