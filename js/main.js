// Main JavaScript for AI Automation Agency Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check for saved theme preference or use default (dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Toggle theme when button is clicked
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in animation for elements
    const fadeElements = document.querySelectorAll('.fade-up');
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Check on initial load
    checkFade();
    
    // Check on scroll
    window.addEventListener('scroll', checkFade);

    // Testimonial carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const totalTestimonials = testimonials.length;
    
    if (totalTestimonials > 0) {
        // Show only the first testimonial initially
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Set up next/prev buttons if they exist
        const nextBtn = document.querySelector('.testimonial-next');
        const prevBtn = document.querySelector('.testimonial-prev');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
                testimonials[currentTestimonial].style.display = 'block';
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
                testimonials[currentTestimonial].style.display = 'block';
            });
        }
    }

    // Contact form validation
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const message = document.querySelector('#message');
            
            if (!name.value.trim()) {
                isValid = false;
                name.classList.add('is-invalid');
            } else {
                name.classList.remove('is-invalid');
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                isValid = false;
                email.classList.add('is-invalid');
            } else {
                email.classList.remove('is-invalid');
            }
            
            if (!message.value.trim()) {
                isValid = false;
                message.classList.add('is-invalid');
            } else {
                message.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // In a real scenario, you would send the form data to a server
                // For demo purposes, we'll just show a success message
                contactForm.innerHTML = '<div class="alert alert-success">Thank you for your message! We\'ll get back to you soon.</div>';
            }
        });
    }
    
    // Email validation helper function
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.service-icon').classList.add('floating');
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.service-icon').classList.remove('floating');
        });
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-item h3');
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const step = Math.ceil(target / (duration / 16)); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, 16);
    }
    
    // Intersection Observer for counter animation
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            observer.observe(stat);
        });
    }

    // Preloader code removed
});
