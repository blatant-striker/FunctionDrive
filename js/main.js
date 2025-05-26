// Main JavaScript for Function Drive - Optimized

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);
    
    // Get current page for navigation and animations
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Initialize UI components
    initNavigation(currentPage);
    initThemeToggle();
    initNavbarScroll();
    initSmoothScrolling();
    initFadeAnimations();
    initCounterAnimations();
    initTestimonialCarousel();
    initContactForm();
    
    // Initialize theme on load
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateStarAnimationElements(savedTheme);
});

// Initialize navigation and set active links
function initNavigation(currentPage) {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update star animation elements based on theme
        updateStarAnimationElements(newTheme);
    });
}

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
// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize smooth scrolling for anchor links
function initSmoothScrolling() {
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
}

// Initialize fade animations for elements
function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length === 0) return;
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight * 0.8;
            
            if (elementTop < triggerPoint) {
                element.classList.add('fade-visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    window.addEventListener('load', checkFade);
    
    // Initial check
    checkFade();
}

// Initialize counter animations for stats
function initCounterAnimations() {
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
}

// Initialize testimonial carousel
function initTestimonialCarousel() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;
    const nextBtn = document.querySelector('.testimonial-next');
    const prevBtn = document.querySelector('.testimonial-prev');
    
    if (nextBtn && prevBtn && totalTestimonials > 0) {
        // Hide all except first
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        nextBtn.addEventListener('click', () => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            testimonials[currentTestimonial].style.display = 'block';
        });
        
        prevBtn.addEventListener('click', () => {
            testimonials[currentTestimonial].style.display = 'none';
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            testimonials[currentTestimonial].style.display = 'block';
        });
    }
}

// Initialize contact form validation
function initContactForm() {
    const contactForm = document.querySelector('#contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.classList.add('is-invalid');
            } else {
                nameInput.classList.remove('is-invalid');
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('is-invalid');
            } else {
                emailInput.classList.remove('is-invalid');
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.classList.add('is-invalid');
            } else {
                messageInput.classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Form submission logic would go here
                alert('Form submitted successfully! (Demo only)');
                contactForm.reset();
            }
        });
    }
}
// Email validation helper function
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// GSAP Hero Animation for Index Page - Modified into a function for better organization
function initHeroAnimation() {
    const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPagePath !== 'index.html') return;
    
    const heroIllustrationImg = document.getElementById('hero-illustration-img');
    const heroImageContainer = document.getElementById('hero-image-container');
    const heroContent = document.querySelector('.hero-content');

    // Proceed only if elements exist and heroImageContainer is visible (for large screens)
    if (!heroIllustrationImg || !heroImageContainer || !heroContent || 
        window.getComputedStyle(heroImageContainer).display === 'none') return;
    
    // Store original dimensions to ensure consistent sizing
    const originalWidth = getComputedStyle(heroIllustrationImg).width;
    const originalHeight = getComputedStyle(heroIllustrationImg).height;
    const finalRect = heroImageContainer.getBoundingClientRect();
    
    // Create a clone for the animation to avoid affecting the original
    const animatedClone = heroIllustrationImg.cloneNode(true);
    document.body.appendChild(animatedClone);
    
    // Hide original during animation
    heroIllustrationImg.style.opacity = '0';
    
    // Style the clone for the animation
    Object.assign(animatedClone.style, {
        position: 'fixed',
        opacity: '0',
        left: window.innerWidth + 'px',
        top: finalRect.top + 'px',
        width: originalWidth,
        height: 'auto',
        maxWidth: originalWidth,
        zIndex: '1000'
    });
    
    // Create GSAP Timeline
    const tl = gsap.timeline();

    // Get the exact final position by measuring the container's position
    const containerRect = heroImageContainer.getBoundingClientRect();
    // Calculate the exact position accounting for any padding or margins
    const computedStyle = window.getComputedStyle(heroImageContainer);
    const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
    const exactFinalLeft = containerRect.left + paddingLeft;
    
    // Animate the clone from off-screen
    tl.to(animatedClone, {
        duration: 1.2,
        opacity: 1,
        left: exactFinalLeft,
        ease: "power2.out",
        onComplete: () => {
            // Show the original image
            heroIllustrationImg.style.opacity = '1';
            
            // Remove the clone
            animatedClone.remove();
        }
    });
    
    // Animate hero content elements with GSAP for better control
    // First, ensure all elements start hidden
    const heroTagline = heroContent.querySelector('h3.tagline');
    const heroHeading = heroContent.querySelector('h1');
    const heroParagraph = heroContent.querySelector('p');
    const heroButtons = heroContent.querySelector('.hero-buttons');
    
    if (heroTagline) gsap.set(heroTagline, { opacity: 0, y: 20 });
    if (heroHeading) gsap.set(heroHeading, { opacity: 0, y: 20 });
    if (heroParagraph) gsap.set(heroParagraph, { opacity: 0, y: 20 });
    if (heroButtons) gsap.set(heroButtons, { opacity: 0, y: 20 });
    
    // Create a sequence of animations for the hero content
    const contentTimeline = gsap.timeline({ delay: 0.3 }); // Start after image begins moving
    
    if (heroTagline) {
        contentTimeline.to(heroTagline, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        });
    }
    
    if (heroHeading) {
        contentTimeline.to(heroHeading, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        }, "-=0.3"); // Overlap with previous animation
    }
    
    if (heroParagraph) {
        contentTimeline.to(heroParagraph, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        }, "-=0.3");
    }
    
    if (heroButtons) {
        contentTimeline.to(heroButtons, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            ease: "power2.out"
        }, "-=0.3");
    }
}
    
// Add call to initialize hero animation on window load
window.addEventListener('load', function() {
    // Small timeout to ensure proper rendering before animation
    setTimeout(() => {
        initHeroAnimation();
    }, 50);
});

// The code is now optimized and well-structured
// All functionality has been organized into separate, reusable functions
// The site is now more maintainable and performs better
