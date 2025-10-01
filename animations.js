// Advanced Animation System for AI SaaS Template Kit

class AnimationSystem {
    constructor() {
        this.animations = new Map();
        this.observers = new Map();
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initParallaxEffects();
        this.initParticleSystem();
        this.initTypingAnimation();
        this.initMorphingShapes();
        this.initGradientAnimations();
    }

    // Scroll-based animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });

        this.observers.set('scroll', scrollObserver);
    }

    triggerAnimation(element) {
        const animationType = element.dataset.animate;
        const delay = parseInt(element.dataset.delay) || 0;
        const duration = parseInt(element.dataset.duration) || 600;

        setTimeout(() => {
            element.classList.add('animate-' + animationType);
            
            // Add event listeners for animation end
            element.addEventListener('animationend', () => {
                element.classList.add('animated');
            }, { once: true });
        }, delay);
    }

    // Parallax scrolling effects
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        const updateParallax = () => {
            const scrollY = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        };

        // Throttled scroll handler
        const throttledUpdate = this.throttle(updateParallax, 16);
        window.addEventListener('scroll', throttledUpdate);
    }

    // Particle system for backgrounds
    initParticleSystem() {
        const particleContainers = document.querySelectorAll('.particle-system');
        
        particleContainers.forEach(container => {
            this.createParticleSystem(container);
        });
    }

    createParticleSystem(container) {
        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = this.createParticle(container);
            particles.push(particle);
        }

        // Animate particles
        const animateParticles = () => {
            particles.forEach(particle => {
                this.updateParticle(particle);
            });
            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        // Random animation properties
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        particle.life = Math.random() * 100 + 100;
        particle.maxLife = particle.life;
        
        container.appendChild(particle);
        return particle;
    }

    updateParticle(particle) {
        // Update position
        const currentLeft = parseFloat(particle.style.left);
        const currentTop = parseFloat(particle.style.top);
        
        particle.style.left = (currentLeft + particle.vx) + '%';
        particle.style.top = (currentTop + particle.vy) + '%';
        
        // Update life
        particle.life--;
        
        // Reset particle when it dies
        if (particle.life <= 0) {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.life = particle.maxLife;
        }
        
        // Update opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        particle.style.opacity = lifeRatio * 0.8;
    }

    // Typing animation for text
    initTypingAnimation() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.textContent;
            const speed = parseInt(element.dataset.typingSpeed) || 100;
            
            element.textContent = '';
            element.classList.add('typing-cursor');
            
            this.typeText(element, text, speed);
        });
    }

    typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            element.textContent += text.charAt(i);
            i++;
            
            if (i >= text.length) {
                clearInterval(timer);
                element.classList.remove('typing-cursor');
            }
        }, speed);
    }

    // Morphing shapes animation
    initMorphingShapes() {
        const morphElements = document.querySelectorAll('[data-morph]');
        
        morphElements.forEach(element => {
            this.createMorphingShape(element);
        });
    }

    createMorphingShape(element) {
        const shapes = [
            'polygon(50% 0%, 0% 100%, 100% 100%)',
            'polygon(0% 0%, 100% 0%, 50% 100%)',
            'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
            'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            'circle(50% 50% at 50% 50%)',
            'ellipse(50% 50% at 50% 50%)'
        ];
        
        let currentShape = 0;
        
        const morph = () => {
            element.style.clipPath = shapes[currentShape];
            currentShape = (currentShape + 1) % shapes.length;
        };
        
        setInterval(morph, 2000);
    }

    // Gradient animations
    initGradientAnimations() {
        const gradientElements = document.querySelectorAll('[data-gradient]');
        
        gradientElements.forEach(element => {
            this.createGradientAnimation(element);
        });
    }

    createGradientAnimation(element) {
        const colors = element.dataset.gradient.split(',');
        let currentColor = 0;
        
        const animateGradient = () => {
            const nextColor = (currentColor + 1) % colors.length;
            element.style.background = `linear-gradient(45deg, ${colors[currentColor]}, ${colors[nextColor]})`;
            currentColor = nextColor;
        };
        
        setInterval(animateGradient, 3000);
    }

    // Advanced hover effects
    initHoverEffects() {
        const hoverElements = document.querySelectorAll('[data-hover]');
        
        hoverElements.forEach(element => {
            const effect = element.dataset.hover;
            this.addHoverEffect(element, effect);
        });
    }

    addHoverEffect(element, effect) {
        switch (effect) {
            case 'tilt':
                this.addTiltEffect(element);
                break;
            case 'glow':
                this.addGlowEffect(element);
                break;
            case 'magnetic':
                this.addMagneticEffect(element);
                break;
            case 'ripple':
                this.addRippleEffect(element);
                break;
        }
    }

    addTiltEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    addGlowEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.style.boxShadow = '0 0 30px rgba(168, 85, 247, 0.6)';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.boxShadow = '';
        });
    }

    addMagneticEffect(element) {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    }

    addRippleEffect(element) {
        element.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Utility functions
    throttle(func, limit) {
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

    // Cleanup
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.animations.clear();
        this.observers.clear();
    }
}

// CSS for additional animations
const additionalStyles = `
.typing-cursor::after {
    content: '|';
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.magnetic {
    transition: transform 0.3s ease;
}

.tilt {
    transition: transform 0.1s ease;
}

.glow {
    transition: box-shadow 0.3s ease;
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize animation system
document.addEventListener('DOMContentLoaded', () => {
    window.animationSystem = new AnimationSystem();
});

// Export for global access
window.AnimationSystem = AnimationSystem;

