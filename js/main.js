document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger);
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Initialize all UI components
    initNavigation(currentPage);
    initThemeToggle();
    initNavbarScroll();
    initSmoothScrolling();
    initFadeAnimations();
    initCounterAnimations();
    initTestimonialCarousel();
    initContactForm();
    initBurgerMenuAnimation();
    
    // Apply saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateStarAnimationElements(savedTheme);
});

function initNavigation(currentPage) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateStarAnimationElements(newTheme);
    });
}

function updateStarAnimationElements(theme) {
    const animatedBackground = document.querySelector('.animated-background');
    if (!animatedBackground) return;
    
    // Remove existing star elements
    animatedBackground.querySelectorAll('.stars-layer-1, .stars-layer-2, .stars-layer-3, .shooting-star, .bright-stars')
        .forEach(layer => layer.remove());
    
    // Only add star elements in dark mode
    if (theme !== 'light') {
        const brightStars = document.createElement('div');
        brightStars.className = 'bright-stars';
        animatedBackground.appendChild(brightStars);
        
        // Create star layers and shooting stars
        for (let i = 1; i <= 3; i++) {
            const starLayer = document.createElement('div');
            starLayer.className = `stars-layer-${i}`;
            animatedBackground.appendChild(starLayer);
            
            const shootingStar = document.createElement('div');
            shootingStar.className = `shooting-star shooting-star-${i}`;
            animatedBackground.appendChild(shootingStar);
        }
    }
}
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

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

function initFadeAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    if (fadeElements.length === 0) return;
    
    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            element.classList.toggle('fade-visible', elementTop < window.innerHeight * 0.8);
        });
    }
    
    ['scroll', 'resize', 'load'].forEach(event => window.addEventListener(event, checkFade));
    checkFade();
}

function initCounterAnimations() {
    const stats = document.querySelectorAll('.stat-item h3');
    if (!stats.length) return;
    
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));
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
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => observer.observe(stat));
    }
}

function initTestimonialCarousel() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-item');
    const totalTestimonials = testimonials.length;
    const nextBtn = document.querySelector('.testimonial-next');
    const prevBtn = document.querySelector('.testimonial-prev');
    
    if (!(nextBtn && prevBtn && totalTestimonials > 0)) return;
    
    testimonials.forEach((testimonial, index) => {
        testimonial.style.display = index === 0 ? 'block' : 'none';
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

function initContactForm() {
    const contactForm = document.querySelector('#contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        let isValid = true;
        
        // Field validation
        const validateField = (input, condition) => {
            if (!condition) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        };
        
        validateField(nameInput, nameInput.value.trim() !== '');
        validateField(emailInput, emailInput.value.trim() !== '' && isValidEmail(emailInput.value));
        validateField(messageInput, messageInput.value.trim() !== '');
        
        if (isValid) {
            alert('Form submitted successfully! (Demo only)');
            contactForm.reset();
        }
    });
}

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function initBurgerMenuAnimation() {
    const burgerMenu = document.getElementById('burger-menu');
    if (!burgerMenu) return;
    
    // Get the navbar collapse element
    const navbarCollapse = document.getElementById('navbarNav');
    
    // Add event listener to the navbar toggler button
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    // Toggle class on burger menu icon
    navbarToggler.addEventListener('click', function() {
        burgerMenu.classList.toggle('open');
    });
    
    // Handle animation when the collapse is hidden/shown via Bootstrap events
    navbarCollapse.addEventListener('hidden.bs.collapse', function() {
        burgerMenu.classList.remove('open');
    });
    
    navbarCollapse.addEventListener('shown.bs.collapse', function() {
        burgerMenu.classList.add('open');
    });
}

function initHeroAnimation() {
    // Only run on index page
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
            
            // Add floating animation to the original image
            gsap.to(heroIllustrationImg, {
                y: '-=15',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
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

// Initialize hero animation with small delay for proper rendering
window.addEventListener('load', () => setTimeout(initHeroAnimation, 50));
