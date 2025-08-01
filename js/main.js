// Main JavaScript functionality for SASTI Laser Metal Cutting website

class SastiLaserWebsite {
    constructor() {
        this.currentGalleryIndex = 0;
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initScrollAnimations();
        this.initCounters();
        this.initMobileMenu();
        this.initScrollToTop();
        this.initNavigation();
    }

    setupEventListeners() {
        // Window events
        window.addEventListener('scroll', this.handleScroll.bind(this));
        window.addEventListener('load', this.handleLoad.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));

        // Gallery navigation
        const galleryNavButtons = document.querySelectorAll('.gallery-nav');
        galleryNavButtons.forEach(button => {
            button.addEventListener('click', this.handleGalleryNav.bind(this));
        });

        // CTA buttons
        const ctaButtons = document.querySelectorAll('.cta-button, .primary-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', this.handleCTAClick.bind(this));
        });

        // Play button
        const playButton = document.querySelector('.play-button');
        if (playButton) {
            playButton.addEventListener('click', this.handlePlayClick.bind(this));
        }

        // Smooth scroll for navigation links
        const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavClick.bind(this));
        });
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll(
            '.tech-card, .supply-card, .feature-item, .why-feature, .gallery-item'
        );
        
        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    animateCounter(element) {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (element.dataset.target === '25' ? 'Y+' : '+');
            }
        };

        updateCounter();
    }

    initMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.nav');
        
        if (mobileToggle && nav) {
            mobileToggle.addEventListener('click', () => {
                nav.classList.toggle('active');
                mobileToggle.classList.toggle('active');
            });
        }
    }

    initScrollToTop() {
        const scrollTopBtn = document.getElementById('scrollTop');
        
        if (scrollTopBtn) {
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        const updateActiveNav = () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav);
    }

    handleScroll() {
        const scrollY = window.scrollY;
        const scrollTopBtn = document.getElementById('scrollTop');
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }

        // Header background opacity
       // const header = document.querySelector('.header');
       // if (header) {
        //    const opacity = Math.min(scrollY / 100, 0.95);
        //    header.style.background = `rgba(58, 15, 15, ${opacity})`;
       // }

        // Parallax effect for images
        const parallaxElements = document.querySelectorAll('.hero-bg img');
        parallaxElements.forEach(el => {
            const speed = 0.2;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }

    handleLoad() {
        // Add loaded class to body for CSS transitions
        document.body.classList.add('loaded');
    }

    handleResize() {
        // Recalculate gallery positioning if needed
        this.updateGalleryPosition();
    }

    handleGalleryNav(e) {
        const isNext = e.currentTarget.classList.contains('next');
        const totalItems = Math.ceil(this.galleryItems.length / 3);
        
        if (isNext) {
            this.currentGalleryIndex = (this.currentGalleryIndex + 1) % totalItems;
        } else {
            this.currentGalleryIndex = (this.currentGalleryIndex - 1 + totalItems) % totalItems;
        }
        
        this.updateGalleryPosition();
    }

    updateGalleryPosition() {
        const track = document.querySelector('.gallery-track');
        if (track) {
            const translateX = -this.currentGalleryIndex * 100;
            track.style.transform = `translateX(${translateX}%)`;
        }
    }

    handleCTAClick(e) {
        e.preventDefault();
        // Add ripple effect
        this.createRipple(e.currentTarget, e);
        
        // Simulate quotation request (could integrate with actual form)
        setTimeout(() => {
            alert('Thank you for your interest! We will contact you soon for your quotation.');
        }, 300);
    }

    handlePlayClick(e) {
        e.preventDefault();
        this.createRipple(e.currentTarget, e);
        
        // Simulate video play (could integrate with actual video player)
        setTimeout(() => {
            alert('Video player would open here. Integration with video platform needed.');
        }, 300);
    }

    handleNavClick(e) {
        const href = e.currentTarget.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetSection = document.querySelector(href);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }

    createRipple(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Global gallery navigation function
function moveGallery(direction) {
    const website = window.sastiWebsite;
    if (website) {
        const event = { currentTarget: { classList: { contains: () => direction > 0 } } };
        website.handleGalleryNav(event);
    }
}

// Initialize website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sastiWebsite = new SastiLaserWebsite();
});

// Add ripple effect styles dynamically
const rippleStyles = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = rippleStyles;
document.head.appendChild(styleSheet);