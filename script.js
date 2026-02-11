// ================================
// GARAGE21 - Interactive Features
// ================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== GARAGE DOOR ANIMATION =====
    const garageDoor = document.getElementById('garageDoor');
    
    // Add sound effect simulation (optional)
    const playGarageDoorSound = () => {
        // Visual feedback during door opening
        console.log('🚪 Garage door opening...');
    };
    
    // Trigger sound/effects
    setTimeout(playGarageDoorSound, 1200);
    
    // Remove garage door after animation completes (increased timing for vertical slide)
    setTimeout(() => {
        if (garageDoor) {
            garageDoor.style.display = 'none';
        }
        console.log('✅ Garage door fully opened!');
    }, 4000); // Adjusted to 4 seconds for smoother experience

    // ===== MOBILE NAVIGATION =====
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (hamburger && navMenu) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // ===== STICKY NAVIGATION =====
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for styling
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ===== PROGRESS BAR =====
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });

    // ===== COUNTER ANIMATION =====
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16); // 60fps
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.floor(target);
                clearInterval(counter);
                // Add completion pulse
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Intersection Observer for counter animation
    const counters = document.querySelectorAll('.counter, .count');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counter.style.transition = 'transform 0.3s ease';
        counterObserver.observe(counter);
    });

    // ===== FAQ ACCORDION =====
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add special entrance animation for package cards
                if (entry.target.classList.contains('package-card')) {
                    entry.target.style.animation = 'packageEntrance 0.8s ease-out forwards';
                }
                
                // Add shimmer effect to service cards
                if (entry.target.classList.contains('service-card')) {
                    setTimeout(() => {
                        entry.target.classList.add('shimmer-once');
                    }, 300);
                }
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
        .service-card,
        .why-card,
        .package-card,
        .testimonial-card,
        .process-step,
        .gallery-item,
        .faq-item
    `);

    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        fadeInObserver.observe(el);
    });

    // Add package entrance animation
    const packageStyle = document.createElement('style');
    packageStyle.textContent = `
        @keyframes packageEntrance {
            0% {
                transform: translateY(30px) scale(0.95);
                opacity: 0;
            }
            50% {
                transform: translateY(-10px) scale(1.02);
            }
            100% {
                transform: translateY(0) scale(1);
                opacity: 1;
            }
        }
        
        .shimmer-once::before {
            animation: shimmer 1s ease-out;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(packageStyle);

    // ===== STAT ITEMS HOVER EFFECT =====
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== PACKAGE CARD INTERACTIONS =====
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Subtle scale effect for non-featured cards
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // ===== DYNAMIC BACKGROUND PARTICLES =====
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? 'var(--primary)' : 'var(--secondary)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.pointerEvents = 'none';
        return particle;
    }

    // Add particles to hero section
    const heroParticles = document.querySelector('.hero-particles');
    if (heroParticles) {
        for (let i = 0; i < 30; i++) {
            heroParticles.appendChild(createParticle());
        }
    }

    // ===== BUTTON RIPPLE EFFECT =====
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-morph, .btn-outline, .btn-package');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // Add ripple animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== TESTIMONIAL CARD TILT EFFECT (Desktop Only) =====
    if (window.innerWidth > 768) {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        
        testimonialCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    // ===== LAZY LOADING FOR IMAGES (when added) =====
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    // Add keyboard navigation for FAQ
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
                const isActive = item.classList.contains('active');
                this.setAttribute('aria-expanded', isActive);
            }
        });
    });

    // ===== CONSOLE MESSAGE =====
    console.log('%c🚗 GARAGE21 - Elite Automotive Detailing', 'color: #ff3d00; font-size: 20px; font-weight: bold;');
    console.log('%cWebsite loaded successfully! Ready to transform vehicles.', 'color: #00e5ff; font-size: 14px;');
    
    // ===== PREVENT CONTEXT MENU ON LOGO (Optional) =====
    const brandLogo = document.querySelector('.brand');
    if (brandLogo) {
        brandLogo.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    }

    // ===== GALLERY PLACEHOLDER ANIMATION =====
    const galleryPlaceholders = document.querySelectorAll('.gallery-placeholder');
    galleryPlaceholders.forEach((placeholder, index) => {
        setTimeout(() => {
            placeholder.style.animation = 'pulse 2s ease-in-out infinite';
        }, index * 200);
    });

    // Add pulse animation for placeholders
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    // ===== FORM VALIDATION (if contact form is added later) =====
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add your form validation and submission logic here
            const formData = new FormData(contactForm);
            
            // Show success message
            alert('Thank you for contacting Garage21! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // ===== AUTO-UPDATE COPYRIGHT YEAR =====
    const copyrightYear = document.querySelector('.footer-bottom p');
    if (copyrightYear && copyrightYear.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = copyrightYear.textContent.replace('2026', currentYear);
    }

    // ===== PRELOADER HANDLING (if needed) =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===== ORIENTATION CHANGE HANDLING =====
    window.addEventListener('orientationchange', function() {
        // Adjust layout on orientation change
        setTimeout(() => {
            window.scrollTo(0, window.pageYOffset);
        }, 100);
    });

    // ===== DETECT MOBILE DEVICE =====
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Disable hover effects on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (hover: none) and (pointer: coarse) {
                .testimonial-card {
                    transform: none !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== ANALYTICS TRACKING (Placeholder) =====
    function trackEvent(category, action, label) {
        // Add your analytics tracking code here
        console.log('Event tracked:', category, action, label);
    }

    // Track button clicks
    document.querySelectorAll('.btn-morph, .btn-outline, .btn-package').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('Button', 'Click', this.textContent.trim());
        });
    });

    // Track phone number clicks
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('Contact', 'Phone Click', this.href);
        });
    });

    // ===== SERVICE WORKER REGISTRATION (for PWA - Optional) =====
    if ('serviceWorker' in navigator) {
        // Uncomment when you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('ServiceWorker registered'))
        //     .catch(error => console.log('ServiceWorker registration failed'));
    }

    // ===== END OF INITIALIZATION =====
    console.log('All interactive features initialized successfully! 🎉');
});

// ===== GLOBAL FUNCTIONS =====

// Function to open WhatsApp with pre-filled message
function openWhatsApp(message = 'Hi! I\'m interested in your car detailing services.') {
    const phoneNumber = '923044772655';
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
}

// Function to call phone number
function callNow() {
    window.location.href = 'tel:+923044772655';
}

// Export functions for global use
window.garage21 = {
    openWhatsApp,
    callNow
};
