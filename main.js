// Main JavaScript for AI SaaS Template Kit

// Theme Management
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentColorScheme = localStorage.getItem('colorScheme') || 'purple';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.body.className = `theme-${this.currentTheme} color-${this.currentColorScheme}`;
        this.updateThemeIcon();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const darkIcon = themeToggle.querySelector('.dark-icon');
            const lightIcon = themeToggle.querySelector('.light-icon');
            
            if (this.currentTheme === 'dark') {
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'block';
            } else {
                darkIcon.style.display = 'block';
                lightIcon.style.display = 'none';
            }
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        localStorage.setItem('theme', this.currentTheme);
    }

    changeColorScheme() {
        const schemes = ['purple', 'neon', 'minimal'];
        const currentIndex = schemes.indexOf(this.currentColorScheme);
        const nextIndex = (currentIndex + 1) % schemes.length;
        this.currentColorScheme = schemes[nextIndex];
        this.applyTheme();
        localStorage.setItem('colorScheme', this.currentColorScheme);
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        const colorSchemeToggle = document.getElementById('color-scheme-toggle');

        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        if (colorSchemeToggle) {
            colorSchemeToggle.addEventListener('click', () => this.changeColorScheme());
        }
    }
}

// Navigation Management
class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle && this.navMenu) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Handle scroll events
        window.addEventListener('scroll', () => this.handleScroll());
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
    }

    handleScroll() {
        if (window.scrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }
}

// Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initParticleAnimations();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe scroll reveal elements
        const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
        scrollElements.forEach(el => observer.observe(el));

        // Observe AOS elements
        const aosElements = document.querySelectorAll('[data-aos]');
        aosElements.forEach(el => observer.observe(el));
    }

    initHoverAnimations() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.feature-card, .pricing-card, .blog-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-lift');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-lift');
            });
        });

        // Add hover effects to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.classList.add('hover-scale');
            });
            
            button.addEventListener('mouseleave', () => {
                button.classList.remove('hover-scale');
            });
        });
    }

    initParticleAnimations() {
        // Create floating particles
        const particleContainer = document.querySelector('.particle-system');
        if (particleContainer) {
            this.createParticles(particleContainer);
        }
    }

    createParticles(container) {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(particle);
        }
    }
}

// Counter Animation
class CounterAnimation {
    constructor() {
        this.init();
    }

    init() {
        const counters = document.querySelectorAll('.stat-number, .counter');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            const suffix = element.textContent.replace(/[\d]/g, '');
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Form Handler
class FormHandler {
    constructor() {
        this.init();
    }

    init() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Lazy Loading
class LazyLoader {
    constructor() {
        this.init();
    }

    init() {
        const images = document.querySelectorAll('img[data-src]');
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, observerOptions);

        images.forEach(img => observer.observe(img));
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all managers
    new ThemeManager();
    new NavigationManager();
    new AnimationManager();
    new CounterAnimation();
    new SmoothScroll();
    new FormHandler();
    new LazyLoader();

    // Initialize AOS (Animate On Scroll) if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // Add loading animation
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('loaded');
        }, 1000);
    }

    // Console welcome message
    console.log('%c🚀 AI SaaS Template Kit', 'color: #a855f7; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to the future of web development!', 'color: #06b6d4; font-size: 14px;');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when page becomes visible
        document.body.classList.remove('paused');
    }
});

// Handle window resize
window.addEventListener('resize', Utils.debounce(() => {
    // Recalculate any size-dependent elements
    const event = new CustomEvent('resize');
    window.dispatchEvent(event);
}, 250));

// Export for global access
window.AISaaSTemplate = {
    ThemeManager,
    NavigationManager,
    AnimationManager,
    CounterAnimation,
    SmoothScroll,
    FormHandler,
    LazyLoader,
    Utils
};

