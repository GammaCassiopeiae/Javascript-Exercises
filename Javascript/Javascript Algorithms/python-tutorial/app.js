/**
 * ============================================
 * NEON-NOIR PYTHON TUTORIAL - APP CONTROLLER
 * Version: 4.0 | System: Cyberpunk Educational
 * ============================================
 */

'use strict';

// ============================================
// APP STATE MANAGEMENT
// ============================================
const App = {
    state: {
        theme: 'dark',
        currentSection: 'introduction',
        mousePosition: { x: 0, y: 0 },
        isSidebarOpen: false
    },

    // ============================================
    // INITIALIZATION
    // ============================================
    init() {
        this.cacheDOM();
        this.bindEvents();
        this.render();
        this.logSystemMessage();
    },

    // ============================================
    // DOM CACHING
    // ============================================
    cacheDOM() {
        // Header elements
        this.themeToggle = document.getElementById('themeToggle');
        
        // Navigation elements
        this.navLinks = document.querySelectorAll('.c-nav__link');
        this.sidebar = document.querySelector('.l-sidebar');
        
        // Content elements
        this.sections = document.querySelectorAll('.c-section');
        this.contentArea = document.getElementById('content-area');
        
        // UI elements
        this.coordinatesDisplay = document.getElementById('coordinates');
        
        // Quiz elements
        this.quizSubmitBtn = document.getElementById('submitQuiz');
        this.quizResult = document.getElementById('quizResult');
    },

    // ============================================
    // EVENT BINDING
    // ============================================
    bindEvents() {
        // Theme toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Navigation links - using event delegation
        document.querySelector('.c-sidebar').addEventListener('click', (e) => {
            const link = e.target.closest('.c-nav__link');
            if (link) {
                e.preventDefault();
                this.handleNavigation(link);
            }
        });

        // Mouse tracking for coordinates
        document.addEventListener('mousemove', (e) => this.trackMouse(e));

        // Quiz submission
        if (this.quizSubmitBtn) {
            this.quizSubmitBtn.addEventListener('click', () => this.submitQuiz());
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Hash change for SPA routing
        window.addEventListener('hashchange', () => this.handleHashChange());

        // Intersection Observer for section visibility
        this.setupIntersectionObserver();

        // Load saved theme
        this.loadTheme();
    },

    // ============================================
    // RENDER FUNCTION
    // ============================================
    render() {
        // Initial render - activate first section
        const hash = window.location.hash.slice(1) || 'introduction';
        this.activateSection(hash);
    },

    // ============================================
    // THEME MANAGEMENT
    // ============================================
    toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        document.body.classList.toggle('theme-light', this.state.theme === 'light');
        localStorage.setItem('neon-tutorial-theme', this.state.theme);
        
        // Visual feedback
        this.themeToggle.classList.add('is-pressed');
        setTimeout(() => {
            this.themeToggle.classList.remove('is-pressed');
        }, 150);
    },

    loadTheme() {
        const savedTheme = localStorage.getItem('neon-tutorial-theme');
        if (savedTheme && savedTheme !== this.state.theme) {
            this.state.theme = savedTheme;
            document.body.classList.toggle('theme-light', savedTheme === 'light');
        }
    },

    // ============================================
    // NAVIGATION HANDLING
    // ============================================
    handleNavigation(link) {
        const sectionId = link.dataset.section;
        if (!sectionId) return;

        // Update active states
        this.navLinks.forEach(l => l.classList.remove('is-active'));
        link.classList.add('is-active');

        // Navigate to section
        if (link.getAttribute('href').startsWith('#')) {
            this.activateSection(sectionId);
            window.location.hash = sectionId;
        }
        // External page links are handled normally
    },

    activateSection(sectionId) {
        this.sections.forEach(section => {
            const isActive = section.dataset.section === sectionId || section.id === sectionId;
            section.classList.toggle('is-active', isActive);
            
            if (isActive) {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        this.state.currentSection = sectionId;
    },

    handleHashChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            this.activateSection(hash);
            
            // Update nav link active state
            this.navLinks.forEach(link => {
                link.classList.toggle('is-active', link.dataset.section === hash);
            });
        }
    },

    // ============================================
    // INTERSECTION OBSERVER
    // ============================================
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '-100px 0px -100px 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.dataset.section || entry.target.id;
                    this.updateActiveNav(sectionId);
                }
            });
        }, options);

        this.sections.forEach(section => observer.observe(section));
    },

    updateActiveNav(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.toggle('is-active', link.dataset.section === sectionId);
        });
    },

    // ============================================
    // MOUSE TRACKING
    // ============================================
    trackMouse(event) {
        this.state.mousePosition = {
            x: event.clientX,
            y: event.clientY
        };

        if (this.coordinatesDisplay) {
            const x = String(event.clientX).padStart(4, '0');
            const y = String(event.clientY).padStart(4, '0');
            this.coordinatesDisplay.innerHTML = `<span>X: ${x}</span> | <span>Y: ${y}</span>`;
        }
    },

    // ============================================
    // QUIZ FUNCTIONALITY
    // ============================================
    submitQuiz() {
        const selected = document.querySelector('input[name="q1"]:checked');
        
        if (!selected) {
            this.showQuizResult('Please select an answer!', false);
            return;
        }

        const isCorrect = selected.value === 'b';
        this.showQuizResult(
            isCorrect ? 'CORRECT! print() is the Python output function.' : 'INCORRECT. Try again!',
            isCorrect
        );
    },

    showQuizResult(message, isCorrect) {
        if (!this.quizResult) return;

        this.quizResult.textContent = message;
        this.quizResult.className = 'c-quiz__result';
        this.quizResult.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
        this.quizResult.style.display = 'block';

        // Add glitch effect for wrong answer
        if (!isCorrect) {
            this.quizResult.style.animation = 'glitch 0.3s steps(10)';
            setTimeout(() => {
                this.quizResult.style.animation = '';
            }, 300);
        }
    },

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    handleKeyboard(event) {
        // Close sidebar on Escape
        if (event.key === 'Escape' && this.state.isSidebarOpen) {
            this.toggleSidebar();
        }

        // Navigate sections with arrow keys (when not in input)
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
            const sections = Array.from(this.sections);
            const currentIndex = sections.findIndex(s => s.classList.contains('is-active'));

            if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                event.preventDefault();
                const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
                this.navigateToSection(sections[nextIndex]);
            } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                event.preventDefault();
                const prevIndex = Math.max(currentIndex - 1, 0);
                this.navigateToSection(sections[prevIndex]);
            }
        }
    },

    navigateToSection(section) {
        const sectionId = section.dataset.section || section.id;
        this.activateSection(sectionId);
        window.location.hash = sectionId;

        // Update nav
        this.navLinks.forEach(link => {
            link.classList.toggle('is-active', link.dataset.section === sectionId);
        });
    },

    // ============================================
    // SIDEBAR TOGGLE (MOBILE)
    // ============================================
    toggleSidebar() {
        this.state.isSidebarOpen = !this.state.isSidebarOpen;
        this.sidebar.classList.toggle('is-active', this.state.isSidebarOpen);
    },

    // ============================================
    // SYSTEM LOG MESSAGE (CONSOLE EASTER EGG)
    // ============================================
    logSystemMessage() {
        console.log(`
%c
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🐍 PYTHON TUTORIAL TERMINAL v3.12                       ║
║   System Status: OPERATIONAL                              ║
║   Encryption: AES-256                                     ║
║                                                           ║
║   Welcome, Netrunner. Initialize your Python journey.     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
%c
        `, 
        'color: #00ff9d; font-family: monospace; font-size: 12px;',
        'color: #666; font-size: 10px;'
    );

    // Hidden lore in console
    console.log('%c[DATA_FRAGMENT_77]: The Python interpreter is your gateway to the matrix. Use it wisely.', 'color: #ff00ff; font-family: monospace; font-size: 11px;');
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Creates a DOM element with attributes
 * @param {string} tag - HTML tag name
 * @param {object} attributes - Object of attributes
 * @param {string|HTMLElement} content - Inner content
 * @returns {HTMLElement}
 */
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });

    if (typeof content === 'string') {
        element.innerHTML = content;
    } else if (content instanceof HTMLElement) {
        element.appendChild(content);
    }

    return element;
}

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
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

/**
 * Throttle function for performance
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function}
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Smooth scroll to element
 * @param {string} selector - CSS selector
 * @param {number} offset - Offset from top
 */
function smoothScrollTo(selector, offset = 0) {
    const element = document.querySelector(selector);
    if (element) {
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    }
}

// ============================================
// BOOTSTRAP APPLICATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Handle lazy loading with Intersection Observer
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('is-loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ============================================
// REDUCED MOTION SUPPORT
// ============================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

prefersReducedMotion.addEventListener('change', (e) => {
    if (e.matches) {
        document.documentElement.style.setProperty('--transition-base', '0s');
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-slow', '0s');
    } else {
        document.documentElement.style.setProperty('--transition-base', '0.3s');
        document.documentElement.style.setProperty('--transition-fast', '0.15s');
        document.documentElement.style.setProperty('--transition-slow', '0.5s');
    }
});

// ============================================
// EXPORT FOR MODULE USAGE (OPTIONAL)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { App, createElement, debounce, throttle, smoothScrollTo };
}

/* 
 * ============================================
 * END OF APP CONTROLLER
 * System Status: All systems operational
 * Connection: STABLE
 * ============================================
 */
