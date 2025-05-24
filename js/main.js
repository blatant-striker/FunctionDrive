// Main JavaScript for AI Automation Agency Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
    
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

    // --- GSAP Scroll-triggered Card Stacking ---
    // Re-use 'serviceCards' declared earlier for the hover effect
    const servicesStickyContainer = document.getElementById('services-sticky-container');
    const servicesSection = document.getElementById('services');
    // const serviceCards = gsap.utils.toArray('.service-card'); // This was the redundant declaration

    if (servicesStickyContainer && servicesSection && serviceCards.length > 0) {
        
        // Calculate a dynamic pin duration based on the number of cards and desired scroll speed for stacking
        // This value might need tweaking for feel. Higher value = more scroll needed to stack.
        let pinEffectDuration = (serviceCards.length / 3) * 100; // e.g., 3 rows * 100vh per row for stacking effect

        ScrollTrigger.create({
            trigger: servicesStickyContainer, // The outer container that has natural document flow height
            start: "top top", // When the top of servicesStickyContainer hits the top of the viewport
            // Pin for the natural height of servicesSection PLUS the extra scroll distance needed for the stacking effect
            end: () => `+=${servicesSection.offsetHeight + pinEffectDuration}`,
            pin: servicesSection, // Pin the .services section itself
            pinSpacing: true, // Add padding to the bottom of servicesStickyContainer to push content down
            scrub: 1, // Smooth scrubbing, takes 1 second to "catch up" to the scrollbar
            // markers: true, // For debugging - remove for production
            onUpdate: self => {
                // Optional: log progress for debugging
                // console.log("progress:", self.progress.toFixed(3), "direction:", self.direction);
            }
        });

        const cardsPerRow = 3;
        const yOffsetBetweenStackedCards = 15; // Vertical pixels between stacked cards
        const scaleReductionPerRow = 0.05; // How much smaller each subsequent stacked row becomes

        serviceCards.forEach((card, index) => {
            const rowIndex = Math.floor(index / cardsPerRow); // 0 for first row, 1 for second, etc.
            // const colIndex = index % cardsPerRow; // 0, 1, 2 for column position

            // Cards in row 0 don't need to move initially, they are the base of the stack.
            // Cards in row 1 will move up to stack on row 0.
            // Cards in row 2 will move up to stack on row 1.
            
            // Stagger the start of the animation for each row slightly.
            // The animation for a card should effectively start when its row is about to be 'covered'.
            let rowScrollStart = rowIndex * (card.offsetHeight / 2); // Start when half of the previous row is scrolled by

            gsap.to(card, {
                scrollTrigger: {
                    trigger: servicesStickyContainer, // Animate relative to the overall scroll through the sticky container
                    start: () => `top+=${rowScrollStart} top`, // Start animation a bit staggered by row
                    end: () => `+=${servicesSection.offsetHeight * 0.75}`, // End animation partway through the pinned section scroll
                    scrub: true,
                    // markers: {startColor: "purple", endColor: "fuchsia", indent: (index * 10) + 50}, // For debugging card-specific triggers
                },
                // Move cards up. Row 0 stays (or moves minimally if desired).
                // Subsequent rows move up to stack on top of the previous row.
                y: () => (rowIndex > 0) ? - (card.offsetHeight * rowIndex - (yOffsetBetweenStackedCards * rowIndex)) : 0,
                // Scale down cards in subsequent rows to give a depth effect.
                scale: () => 1 - (rowIndex * scaleReductionPerRow),
                opacity: 1, // Ensure opacity is 1
                ease: "none",
                transformOrigin: "center bottom" // Scale from the bottom center for a nice stacking feel
            });
        });
    }
    // --- End GSAP Card Stacking ---

    // Preloader code removed
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800, // Animation duration
    easing: 'ease-in-out', // Easing function
    once: true // Whether animation should happen only once - while scrolling down
});

// GSAP Hero Animation for Index Page
window.addEventListener('load', function() {
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPagePath === 'index.html') {
        const heroIllustrationImg = document.getElementById('hero-illustration-img');
        const heroImageContainer = document.getElementById('hero-image-container');
        const heroContent = document.querySelector('.hero-content');

        // Proceed only if elements exist and heroImageContainer is visible (for large screens)
        if (heroIllustrationImg && heroImageContainer && heroContent && window.getComputedStyle(heroImageContainer).display !== 'none') {

            // 1. Calculate final position and size of the illustration
            // Temporarily set up for measurement
            gsap.set(heroImageContainer, { display: 'block', opacity: 0 }); // Ensure it's in layout but hidden
            gsap.set(heroIllustrationImg, { 
                position: 'relative', 
                width: '100%', // As per .img-fluid
                height: 'auto',
                display: 'block', 
                opacity: 0 // Keep it hidden during measurement
            });

            const finalRect = heroIllustrationImg.getBoundingClientRect();
            const finalX = finalRect.left;
            const finalY = finalRect.top;
            const finalWidth = finalRect.width;
            const finalHeight = finalRect.height;

            // 2. Set initial state of the illustration for animation - OPTION 1: From Above with faster setup
            // To change animation style, comment this block and uncomment one of the options below
            gsap.set(heroIllustrationImg, {
                position: 'fixed',
                top: '-10%', // Start closer to the viewport for faster appearance
                left: '50%',
                xPercent: -50,
                yPercent: 0,
                width: finalWidth * 1.1, // Less scaling for faster animation
                height: finalHeight * 1.1,
                opacity: 0.2, // Start with slight visibility for smoother appearance
                rotation: -5, // Minimal tilt for faster straightening
                zIndex: 1000,
                display: 'block'
            });
            
            /* OPTION 2: From Bottom with Spin
            gsap.set(heroIllustrationImg, {
                position: 'fixed',
                top: '130%', // Start below the viewport
                left: '50%',
                xPercent: -50,
                yPercent: 0,
                width: finalWidth * 0.5, // Start smaller
                height: finalHeight * 0.5,
                opacity: 0.3,
                rotation: 180, // Start upside down
                zIndex: 1000,
                display: 'block'
            });
            */
            
            /* OPTION 3: Fade In from Center (Minimal Movement)
            gsap.set(heroIllustrationImg, {
                position: 'fixed',
                top: '50%',
                left: '50%',
                xPercent: -50,
                yPercent: -50,
                width: finalWidth * 0.8, // Start smaller
                height: finalHeight * 0.8,
                opacity: 0,
                scale: 0.8,
                zIndex: 1000,
                display: 'block'
            });
            */

            // 3. Create GSAP Timeline
            const tl = gsap.timeline();

            // Animate illustration to its final place and size with enhanced animation
            tl.to(heroIllustrationImg, {
                duration: 0.5,
                top: '50%',
                yPercent: -50,
                opacity: 1,
                rotation: 0,
                scale: 1.3,
                ease: "back.out(1.4)",
            })
            .to(heroIllustrationImg, {
                duration: 0.3, // Reduced from 0.5 to 0.3 seconds for faster animation
                x: finalX - (window.innerWidth / 2) + (finalWidth / 2), // Target center of image to final center
                y: finalY - (window.innerHeight / 2) + (finalHeight / 2),
                width: finalWidth,
                height: finalHeight,
                opacity: 1,
                ease: "power1.out", // Changed to power1.out for faster easing

                onComplete: () => {
                    // Reset illustration to flow naturally in its container
                    gsap.set(heroIllustrationImg, {
                        position: 'relative',
                        top: 'auto',
                        left: 'auto',
                        x: 0, 
                        y: 0,
                        xPercent: 0,
                        yPercent: 0,
                        zIndex: 'auto',
                        width: '100%', // Back to .img-fluid like behavior
                        height: 'auto'
                    });
                    // Make the container visible now that the image is in place
                    gsap.to(heroImageContainer, { opacity: 1, duration: 0.3 });
                }
            })
            // Don't animate hero content here since we're using CSS animations
            // This allows the CSS animations to handle the text animations
            .set(heroContent, { 
                opacity: 1, // Just make sure the container is visible
                clearProps: "opacity" // Clear the opacity property to let CSS handle it
            });
        }
    }
});
