// Dashboard JavaScript for AI SaaS Template Kit

class DashboardManager {
    constructor() {
        this.init();
    }

    init() {
        this.initSidebar();
        this.initCharts();
        this.initStats();
        this.initActivity();
        this.bindEvents();
    }

    initSidebar() {
        // Add active state management for sidebar menu
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            const link = item.querySelector('.menu-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    // Remove active class from all items
                    menuItems.forEach(i => i.classList.remove('active'));
                    // Add active class to clicked item
                    item.classList.add('active');
                });
            }
        });
    }

    initCharts() {
        // Initialize chart animations
        const chartBars = document.querySelectorAll('.bar');
        chartBars.forEach((bar, index) => {
            bar.style.animationDelay = `${index * 0.1}s`;
        });

        // Chart control buttons
        const chartControls = document.querySelectorAll('.chart-controls');
        chartControls.forEach(control => {
            const buttons = control.querySelectorAll('.chart-btn');
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    buttons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    this.updateChart(button.textContent);
                });
            });
        });
    }

    updateChart(period) {
        // Simulate chart update based on selected period
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.animation = 'none';
            bar.offsetHeight; // Trigger reflow
            bar.style.animation = 'bar-grow 1s ease-out';
        });

        // Update chart data based on period
        console.log(`Updating chart for period: ${period}`);
    }

    initStats() {
        // Initialize counter animations for stats
        const counters = document.querySelectorAll('.stat-number.counter');
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
        const text = element.textContent;
        const number = parseFloat(text.replace(/[^\d.]/g, ''));
        const suffix = text.replace(/[\d.]/g, '');
        const duration = 2000;
        const increment = number / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            
            element.textContent = Math.floor(current) + suffix;
        }, 16);
    }

    initActivity() {
        // Initialize activity feed
        const activityItems = document.querySelectorAll('.activity-item');
        activityItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                document.body.classList.toggle('theme-dark');
                this.updateThemeIcon();
            });
        }

        // Color scheme toggle
        const colorSchemeToggle = document.getElementById('color-scheme-toggle');
        if (colorSchemeToggle) {
            colorSchemeToggle.addEventListener('click', () => {
                this.cycleColorScheme();
            });
        }

        // User menu
        const userMenu = document.querySelector('.user-menu');
        if (userMenu) {
            userMenu.addEventListener('click', () => {
                this.toggleUserMenu();
            });
        }

        // Mobile sidebar toggle
        this.initMobileSidebar();
    }

    initMobileSidebar() {
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.cssText = `
            display: none;
            position: fixed;
            top: 85px;
            left: 20px;
            z-index: 1001;
            background: var(--accent-primary);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px;
            cursor: pointer;
        `;

        document.body.appendChild(mobileMenuBtn);

        // Toggle sidebar on mobile
        mobileMenuBtn.addEventListener('click', () => {
            document.querySelector('.dashboard-sidebar').classList.toggle('open');
        });

        // Show/hide mobile menu button based on screen size
        const checkScreenSize = () => {
            if (window.innerWidth <= 1024) {
                mobileMenuBtn.style.display = 'block';
            } else {
                mobileMenuBtn.style.display = 'none';
                document.querySelector('.dashboard-sidebar').classList.remove('open');
            }
        };

        window.addEventListener('resize', checkScreenSize);
        checkScreenSize();
    }

    updateThemeIcon() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const darkIcon = themeToggle.querySelector('.dark-icon');
            const lightIcon = themeToggle.querySelector('.light-icon');
            
            if (document.body.classList.contains('theme-dark')) {
                darkIcon.style.display = 'none';
                lightIcon.style.display = 'block';
            } else {
                darkIcon.style.display = 'block';
                lightIcon.style.display = 'none';
            }
        }
    }

    cycleColorScheme() {
        const schemes = ['purple', 'neon', 'minimal'];
        const currentScheme = document.body.className.match(/color-(\w+)/);
        const currentIndex = currentScheme ? schemes.indexOf(currentScheme[1]) : 0;
        const nextIndex = (currentIndex + 1) % schemes.length;
        
        // Remove current color scheme
        schemes.forEach(scheme => {
            document.body.classList.remove(`color-${scheme}`);
        });
        
        // Add new color scheme
        document.body.classList.add(`color-${schemes[nextIndex]}`);
        
        // Show notification
        this.showNotification(`Color scheme changed to ${schemes[nextIndex]}`, 'info');
    }

    toggleUserMenu() {
        // Create user dropdown if it doesn't exist
        let dropdown = document.querySelector('.user-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            dropdown.innerHTML = `
                <div class="dropdown-content">
                    <a href="dashboard-settings.html" class="dropdown-item">
                        <i class="fas fa-user"></i>
                        <span>Profile</span>
                    </a>
                    <a href="dashboard-settings.html" class="dropdown-item">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                    <div class="dropdown-divider"></div>
                    <a href="index.html" class="dropdown-item">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Logout</span>
                    </a>
                </div>
            `;
            dropdown.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                background: var(--bg-primary);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                min-width: 200px;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transform: translateY(-10px);
                transition: all 0.3s ease;
            `;
            
            document.querySelector('.user-menu').appendChild(dropdown);
        }

        // Toggle dropdown
        const isVisible = dropdown.style.opacity === '1';
        if (isVisible) {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.transform = 'translateY(-10px)';
        } else {
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            dropdown.style.transform = 'translateY(0)';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-primary);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1rem 1.5rem;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Real-time updates simulation
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateStats();
            this.updateActivity();
        }, 30000); // Update every 30 seconds
    }

    updateStats() {
        // Simulate real-time stat updates
        const statNumbers = document.querySelectorAll('.stat-number.counter');
        statNumbers.forEach(stat => {
            const currentValue = parseFloat(stat.textContent.replace(/[^\d.]/g, ''));
            const newValue = currentValue + Math.floor(Math.random() * 10);
            const suffix = stat.textContent.replace(/[\d.]/g, '');
            
            stat.textContent = newValue + suffix;
        });
    }

    updateActivity() {
        // Add new activity item
        const activityList = document.querySelector('.activity-list');
        if (activityList) {
            const activities = [
                'New user registered',
                'AI model updated',
                'System maintenance completed',
                'Monthly report generated',
                'API key generated',
                'Data export completed'
            ];
            
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const timeAgo = Math.floor(Math.random() * 60) + 1;
            
            const newItem = document.createElement('div');
            newItem.className = 'activity-item';
            newItem.innerHTML = `
                <div class="activity-icon">
                    <i class="fas fa-circle"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-text">${randomActivity}</div>
                    <div class="activity-time">${timeAgo} minutes ago</div>
                </div>
            `;
            
            activityList.insertBefore(newItem, activityList.firstChild);
            
            // Remove old items if there are too many
            const items = activityList.querySelectorAll('.activity-item');
            if (items.length > 10) {
                activityList.removeChild(items[items.length - 1]);
            }
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const dashboard = new DashboardManager();
    
    // Start real-time updates
    dashboard.startRealTimeUpdates();
    
    // Export for global access
    window.dashboardManager = dashboard;
});

// Additional dashboard utilities
class DashboardUtils {
    static formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    static formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    }

    static formatTime(date) {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(date));
    }
}

// Export utilities
window.DashboardUtils = DashboardUtils;
























