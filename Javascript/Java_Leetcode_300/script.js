/* ========================================
   NEON-NOIR JAVA LEETCODE 300
   Main Logic & Interactive Effects
   ======================================== */

const App = {
    state: {
        theme: 'dark'
    },

    init() {
        this.cacheDOM();
        this.glitchTitles();
        this.setupHoverEffects();
        this.setupThemeSwitcher();
        this.setupParallax();
        this.loadTheme();
        console.log("SYSTEM_INITIALIZED: Java LeetCode 300 Tutorial");
    },

    cacheDOM() {
        this.body = document.body;
        this.header = document.querySelector('.c-header__container');
    },

    glitchTitles() {
        const titles = document.querySelectorAll('.c-hero__title');
        titles.forEach(title => {
            title.setAttribute('data-text', title.textContent);
            setInterval(() => {
                if (Math.random() > 0.98) {
                    title.classList.add('is-glitching');
                    setTimeout(() => title.classList.remove('is-glitching'), 200);
                }
            }, 1000);
        });
    },

    setupThemeSwitcher() {
        const btn = document.createElement('button');
        btn.className = 'c-btn c-theme-toggle';
        btn.innerHTML = 'TOGGLE_VISION';
        btn.style.marginLeft = '1rem';
        btn.addEventListener('click', () => this.toggleTheme());
        this.header.appendChild(btn);
    },

    toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
    },

    applyTheme() {
        if (this.state.theme === 'light') {
            this.body.style.setProperty('--bg-deep', '#e0e0e0');
            this.body.style.setProperty('--text-primary', '#121212');
            this.body.style.setProperty('--text-muted', '#444');
            this.body.style.setProperty('--bg-surface', '#ffffff');
        } else {
            this.body.style.setProperty('--bg-deep', '#000000');
            this.body.style.setProperty('--text-primary', '#ffffff');
            this.body.style.setProperty('--text-muted', 'rgba(255, 255, 255, 0.7)');
            this.body.style.setProperty('--bg-surface', '#0a0b10');
        }
        localStorage.setItem('jlt-theme', this.state.theme);
    },

    loadTheme() {
        const saved = localStorage.getItem('jlt-theme');
        if (saved) {
            this.state.theme = saved;
            this.applyTheme();
        }
    },

    setupHoverEffects() {
        const cards = document.querySelectorAll('.c-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.borderColor = 'var(--neon-green)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.borderColor = 'rgba(0, 243, 255, 0.2)';
            });
        });
    },

    setupParallax() {
        document.addEventListener('mousemove', (e) => {
            const cards = document.querySelectorAll('.c-card');
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = rect.left + rect.width / 2;
                const cardY = rect.top + rect.height / 2;

                const angleX = (cardY - mouseY) / 30;
                const angleY = (mouseX - cardX) / 30;

                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-5px)`;
            });
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
