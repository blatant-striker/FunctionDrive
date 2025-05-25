// Main JavaScript for Function Drive - Optimized

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
        
        // Update star animation elements based on theme
        updateStarAnimationElements(newTheme);
    });
    
    // Function to create or remove star animation elements based on theme
    function updateStarAnimationElements(theme) {
        const animatedBackground = document.querySelector('.animated-background');
        if (!animatedBackground) return;
        
        // Clear existing star layers first
        const existingStarLayers = animatedBackground.querySelectorAll('.stars-layer-1, .stars-layer-2, .stars-layer-3, .shooting-star, .bright-stars');
        existingStarLayers.forEach(layer => layer.remove());
        
        // Only add star elements in dark mode
        if (theme !== 'light') {
            // Create special bright stars layer
            const brightStars = document.createElement('div');
            brightStars.className = 'bright-stars';
            animatedBackground.appendChild(brightStars);
            
            // Create regular star layers
            for (let i = 1; i <= 3; i++) {
                const starLayer = document.createElement('div');
                starLayer.className = `stars-layer-${i}`;
                animatedBackground.appendChild(starLayer);
            }
            
            // Create shooting stars
            for (let i = 1; i <= 3; i++) {
                const shootingStar = document.createElement('div');
                shootingStar.className = `shooting-star shooting-star-${i}`;
                animatedBackground.appendChild(shootingStar);
            }
        }
    }
    
    // Initialize star animation elements based on current theme
    updateStarAnimationElements(savedTheme);
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

    // --- Exact Beam AI Card Stacking Implementation ---
    const servicesStickyContainer = document.getElementById('services-sticky-container');
    const servicesSection = document.getElementById('services');
    
    if (servicesStickyContainer && servicesSection) {
        // Get all cards and the track element
        const serviceCards = document.querySelectorAll('.service-card');
        const cardsTrack = document.querySelector('.beam-cards-track');
        
        // Reset any existing animations
        ScrollTrigger.getAll().forEach(st => st.kill());
        
        // Separate cards into rows (assuming 3 cards per row for desktop layout)
        const cardsPerRow = 3;
        const rows = Math.ceil(serviceCards.length / cardsPerRow);
        
        // Assign layer classes to help with proper stacking (exactly like Beam AI)
        serviceCards.forEach((card, index) => {
            const rowIndex = Math.floor(index / cardsPerRow);
            card.classList.add(`card-layer-${rowIndex + 1}`);
        });
        
        // Set up the main scroll trigger for pinning the section
        ScrollTrigger.create({
            trigger: servicesStickyContainer,
            start: "top top",
            end: "+=200%", // Exact value used in Beam AI
            pin: servicesSection,
            pinSpacing: true,
            anticipatePin: 1, // Prevents jerky start
            scrub: 0.1, // Exact value for ultra-smooth scrolling like Beam AI
            markers: false,
            invalidateOnRefresh: true,
            onEnter: () => {
                // When entering the section, set up initial states
                serviceCards.forEach(card => card.classList.add('active'));
            }
        });
        
        // Initial load animation - fade cards in staggered
        gsap.set(serviceCards, {
            opacity: 0,
            y: 50,
            scale: 0.95
        });
        
        gsap.to(serviceCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.05, // Exactly like Beam AI
            duration: 0.5,
            ease: "power2.out",
            delay: 0.2
        });
        
        // =============== THE KEY PART: EXACT BEAM AI STACKING ANIMATION ===============
        // Create a master timeline for stacking
        const stackTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: servicesStickyContainer,
                start: "top top", 
                end: "+=200%",
                scrub: 0.1,
                invalidateOnRefresh: true
            }
        });
        
        // First, the first row stays put, subsequent rows move up and under in 3D space
        for (let row = 1; row < rows; row++) {
            // Select cards in this row
            const rowCards = Array.from(serviceCards).filter((_, i) => 
                Math.floor(i / cardsPerRow) === row
            );
            
            // Move entire row up and under previous row with Beam AI's exact transforms
            stackTimeline.to(rowCards, {
                y: `-=${row * 100}`, // Exact Beam AI offset value
                z: `-=${row * 50}`, // Exact Beam AI z-depth value
                scale: 1 - (row * 0.05), // Exact Beam AI scale reduction
                rotationX: -5 * row, // Exact Beam AI rotation value
                opacity: 1 - (row * 0.1), // Exact Beam AI opacity reduction
                ease: "none", // Critical for smooth scrubbing
                duration: 1 / rows // Normalize duration based on number of rows
            }, 0); // Start at same time
        }
        
        // Apply the exact hover effect from Beam AI
        serviceCards.forEach((card, index) => {
            const rowIndex = Math.floor(index / cardsPerRow);
            
            // Enhanced hover effects exactly like Beam AI
            card.addEventListener('mouseenter', () => {
                // First, cancel any existing animations
                gsap.killTweensOf(card);
                
                // Apply exact Beam AI hover state
                gsap.to(card, {
                    y: `${gsap.getProperty(card, 'y') - 10}px`, // Lift exactly 10px from current position
                    scale: gsap.getProperty(card, 'scale') * 1.02, // Grow by exactly 2%
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.25)', // Exact Beam AI shadow
                    duration: 0.2,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                // Get the current stack position from the ScrollTrigger progress
                const progress = ScrollTrigger.getAll()
                    .find(st => st.vars.trigger === servicesStickyContainer)
                    ?.progress() || 0;
                
                // Calculate exact position based on current scroll progress
                const baseY = rowIndex === 0 ? 0 : -(rowIndex * 100 * progress);
                const baseScale = rowIndex === 0 ? 1 : (1 - (rowIndex * 0.05 * progress));
                const baseRotX = rowIndex === 0 ? 0 : (-5 * rowIndex * progress);
                
                // Return to exact Beam AI scroll-based position
                gsap.to(card, {
                    y: baseY,
                    scale: baseScale,
                    rotationX: baseRotX,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                    duration: 0.3,
                    ease: 'power3.out',
                    overwrite: 'auto'
                });
            });
        });
        
        // Handle window resize - exactly like Beam AI
        window.addEventListener('resize', () => {
            // Beam AI recalculates on resize with a slight delay
            ScrollTrigger.refresh();
        });
    }
    // --- End GSAP Card Stacking ---

    // Preloader code removed
});

// GSAP animations are used instead of AOS

// GSAP Hero Animation for Index Page
window.addEventListener('load', function() {
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPagePath === 'index.html') {
        const heroIllustrationImg = document.getElementById('hero-illustration-img');
        const heroImageContainer = document.getElementById('hero-image-container');
        const heroContent = document.querySelector('.hero-content');

        // Proceed only if elements exist and heroImageContainer is visible (for large screens)
        if (heroIllustrationImg && heroImageContainer && heroContent && window.getComputedStyle(heroImageContainer).display !== 'none') {

            // Calculate final dimensions and position once
            const finalRect = heroImageContainer.getBoundingClientRect();
            const finalWidth = finalRect.width;
            const finalHeight = finalRect.height;

            // Set initial state of the illustration for animation: Off-screen right, faded out
            gsap.set(heroIllustrationImg, {
                position: 'fixed',
                opacity: 0,
                left: window.innerWidth, // Start off-screen to the right
                top: finalRect.top,      // Align with final top position
                width: finalWidth,       // Start at final width
                height: finalHeight,     // Start at final height
                xPercent: 0, 
                yPercent: 0,
                zIndex: 1000,
                display: 'block' // Ensure it's visible for GSAP to animate
            });

            // 3. Create GSAP Timeline
            const tl = gsap.timeline();

            // Animate illustration to its final position and fade in
            tl.to(heroIllustrationImg, {
                duration: 1.2, // Adjust duration as needed for smooth animation
                opacity: 1,
                left: finalRect.left, // Animate to final 'left' position
                ease: "power2.out",
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
            });
        }
    }
});
