// Advanced animations and effects for SASTI Laser Metal Cutting website

class AdvancedAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollTriggerAnimations();
        this.initSimpleAnimations();
    }

    initSimpleAnimations() {
        // Simple fade-in animation for elements
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transition = 'opacity 0.6s ease';
        });
    }

    initScrollTriggerAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Elements to animate on scroll
        const animateOnScroll = document.querySelectorAll(
            '.fade-in'
        );

        animateOnScroll.forEach(element => {
            observer.observe(element);
        });
    }
}

// Initialize advanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedAnimations();
});

// Simple fade-in utility
const fadeInStyles = `
    .fade-in {
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
    }
`;

const fadeStyleSheet = document.createElement('style');
fadeStyleSheet.textContent = fadeInStyles;
document.head.appendChild(fadeStyleSheet);