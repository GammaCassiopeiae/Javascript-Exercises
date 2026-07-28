/* ============================================================
   JS_ALGORITHM_TUTORIAL // APP CONTROLLER
   Vanilla JS SPA Renderer with Neon-Noir Theme
   ============================================================ */

const App = {
    serialCounter: 0,

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.restoreTheme();
        this.render();
        this.trackMouse();
        this.logConsoleMessage();
    },

    cacheDOM() {
        this.container = document.querySelector('.u-grid-columns');
        this.pageTitle = document.querySelector('.u-glow-text');
        this.header = document.querySelector('.c-header');
        this.body = document.body;
    },

    bindEvents() {
        window.addEventListener('hashchange', () => this.render());
        document.addEventListener('DOMContentLoaded', () => this.render());

        // Theme toggle
        const toggleBtn = document.querySelector('.js-theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    },

    restoreTheme() {
        const saved = localStorage.getItem('js-algo-theme');
        if (saved === 'light') {
            this.body.classList.add('is-light-mode');
        }
    },

    toggleTheme() {
        this.body.classList.toggle('is-light-mode');
        const theme = this.body.classList.contains('is-light-mode') ? 'light' : 'dark';
        localStorage.setItem('js-algo-theme', theme);
    },

    trackMouse() {
        let coordsEl = document.querySelector('.c-coords');
        if (!coordsEl) {
            coordsEl = document.createElement('div');
            coordsEl.className = 'c-coords';
            document.body.appendChild(coordsEl);
        }
        document.addEventListener('mousemove', (e) => {
            coordsEl.textContent = `X:${e.clientX} Y:${e.clientY}`;
        });
    },

    logConsoleMessage() {
        console.log(
            '%c[JS_ALGO_CORE] SYSTEM_INITIALIZED // ENCRYPTION: AES-256 %c\n> Welcome, netrunner. The algorithms await.',
            'color: #00f3ff; font-size: 16px; font-weight: bold; text-shadow: 0 0 5px #00f3ff;',
            'color: #00ff9d; font-size: 12px;'
        );
    },

    render() {
        const path = window.location.pathname;

        if (path.includes('leetcode.html')) {
            this.renderCategory('leetcode', 'LEETCODE_CORE');
        } else if (path.includes('classic.html')) {
            const hash = window.location.hash.slice(1) || 'searching';
            const titles = {
                searching: 'SEARCH_PROTOCOLS',
                sorting: 'SORT_ROUTINES',
                graphs: 'GRAPH_NETWORK',
                trees: 'TREE_STRUCTURES',
                math: 'MATH_VECTORS',
                dp: 'DYNAMIC_RECURSION',
                strings: 'STRING_PARSING'
            };
            this.renderCategory(hash, titles[hash] || hash.toUpperCase());
        } else if (path.includes('ml.html')) {
            this.renderCategory('ml', 'ML_NEURAL_SYNAPSE');
        }
    },

    generateSerial() {
        this.serialCounter++;
        return `JS-${String(this.serialCounter).padStart(3, '0')}`;
    },

    renderCategory(category, title) {
        if (!this.container) return;

        if (this.pageTitle) {
            this.pageTitle.textContent = title;
        }

        this.container.innerHTML = '';
        this.serialCounter = 0;

        const items = ALGO_DATA[category] || [];

        if (!items.length) {
            this.container.innerHTML = '<p class="u-magenta-text" style="font-family: var(--font-mono);">> NO_DATA_STREAM_FOUND // Category not initialized.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'c-card';
            card.setAttribute('data-serial', this.generateSerial());
            card.style.cursor = 'default';

            const titleEl = document.createElement('div');
            titleEl.className = 'c-card__title';
            titleEl.textContent = item.title;

            const descEl = document.createElement('p');
            descEl.className = 'c-card__desc';
            descEl.textContent = item.desc;

            const codeEl = document.createElement('div');
            codeEl.className = 'c-code';
            codeEl.textContent = item.code;

            card.appendChild(titleEl);
            card.appendChild(descEl);
            card.appendChild(codeEl);

            fragment.appendChild(card);
        });

        this.container.appendChild(fragment);
    }
};

/* Boot sequence */
document.addEventListener('DOMContentLoaded', () => App.init());
window.addEventListener('hashchange', () => App.render());
