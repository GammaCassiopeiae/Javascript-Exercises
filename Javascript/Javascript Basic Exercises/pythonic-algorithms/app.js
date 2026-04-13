const App = {
    init() {
        this.cacheDOM();
        this.render();
    },

    cacheDOM() {
        this.container = document.querySelector('.u-grid-columns');
        this.pageTitle = document.querySelector('.u-glow-text');
    },

    render() {
        const path = window.location.pathname;
        const hash = window.location.hash.slice(1);

        if (path.includes('leetcode.html')) {
            this.renderCategory('leetcode', 'LEETCODE_CORE');
        } else if (path.includes('classic.html')) {
            const category = hash || 'searching';
            this.renderCategory(category, category.toUpperCase() + '_PROTOCOLS');
        } else if (path.includes('ml.html')) {
            this.renderCategory('ml', 'ML_LAB_RESULTS');
        }
    },

    renderCategory(category, title) {
        if (!this.container) return;

        this.pageTitle.textContent = title;
        this.container.innerHTML = '';

        const items = ALGO_DATA[category] || [];

        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'c-card';
            card.style.cursor = 'default';

            card.innerHTML = `
                <div class="c-card__title">${item.title}</div>
                <p class="c-card__desc">${item.desc}</p>
                <div class="c-code">${item.code}</div>
            `;

            fragment.appendChild(card);
        });

        this.container.appendChild(fragment);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
window.addEventListener('hashchange', () => App.render());