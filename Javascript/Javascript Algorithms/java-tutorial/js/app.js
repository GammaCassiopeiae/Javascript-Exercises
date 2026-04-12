// ============================================
// JAVA ALGORITHMS TUTORIAL - MAIN APP
// SPA Controller & Interactive Logic
// ============================================

const App = {
    state: {
        currentSection: 'home',
        theme: 'dark',
        searchOpen: false
    },

    init() {
        this.cacheDOM();
        this.bindEvents();
        this.loadTheme();
        this.updateCoords();
        this.render();
        console.log('%c[SYSTEM] JAVA_ALGORITHMS_TUTORIAL v2.0 LOADED', 'color: #00f3ff; font-size: 14px; font-weight: bold;');
        console.log('%c[STATUS] 127 Modules Ready // 10 Categories Active', 'color: #00ff9d;');
    },

    cacheDOM() {
        this.mainContent = document.getElementById('mainContent');
        this.themeToggle = document.getElementById('themeToggle');
        this.searchToggle = document.getElementById('searchToggle');
        this.searchOverlay = document.getElementById('searchOverlay');
        this.searchInput = document.getElementById('searchInput');
        this.searchClose = document.getElementById('searchClose');
        this.searchResults = document.getElementById('searchResults');
        this.coordsDisplay = document.getElementById('coords');
        this.navLinks = document.querySelectorAll('.c-nav-link');
    },

    bindEvents() {
        // Navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.navigateTo(section);
            });
        });

        // Theme Toggle
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Search
        if (this.searchToggle) {
            this.searchToggle.addEventListener('click', () => this.toggleSearch());
        }
        if (this.searchClose) {
            this.searchClose.addEventListener('click', () => this.toggleSearch());
        }
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Mouse coordinates
        document.addEventListener('mousemove', (e) => this.updateCoords(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.searchOpen) {
                this.toggleSearch();
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.toggleSearch();
            }
        });

        // Hash routing
        window.addEventListener('hashchange', () => this.route());
    },

    route() {
        const hash = window.location.hash.slice(1) || 'home';
        this.navigateTo(hash);
    },

    navigateTo(section) {
        this.state.currentSection = section;
        window.location.hash = section;
        this.render();
        this.updateActiveNav(section);
    },

    updateActiveNav(section) {
        this.navLinks.forEach(link => {
            link.classList.toggle('is-active', link.dataset.section === section);
        });
    },

    render() {
        const section = this.state.currentSection;
        if (section === 'home') {
            this.renderHome();
        } else {
            this.renderSection(section);
        }
    },

    renderHome() {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.classList.add('is-active');
        }
        // Hide other sections
        document.querySelectorAll('.c-section:not(#home)').forEach(s => {
            s.classList.remove('is-active');
        });
    },

    renderSection(sectionKey) {
        const data = ALGORITHMS_DATA[sectionKey];
        if (!data) return;

        // Hide home and other sections
        document.querySelectorAll('.c-section').forEach(s => {
            s.classList.remove('is-active');
        });

        // Check if section already exists
        let sectionEl = document.getElementById(sectionKey);
        if (!sectionEl) {
            sectionEl = this.createSectionElement(sectionKey, data);
            this.mainContent.appendChild(sectionEl);
        }
        sectionEl.classList.add('is-active');
    },

    createSectionElement(sectionKey, data) {
        const section = document.createElement('section');
        section.className = 'c-section';
        section.id = sectionKey;
        section.dataset.section = sectionKey;

        const title = document.createElement('h2');
        title.className = 'c-section__title';
        title.textContent = data.title;

        const desc = document.createElement('p');
        desc.className = 'c-algorithm__desc';
        desc.textContent = data.description;

        const algoList = document.createElement('div');
        algoList.className = 'c-algo-list';

        data.algorithms.forEach((algo, idx) => {
            const algoItem = this.createAlgorithmElement(algo, idx);
            algoList.appendChild(algoItem);
        });

        section.appendChild(title);
        section.appendChild(desc);
        section.appendChild(algoList);

        return section;
    },

    createAlgorithmElement(algo, idx) {
        const item = document.createElement('article');
        item.className = 'c-algo-item';
        item.dataset.serial = `ALG-${String(idx + 1).padStart(3, '0')}`;

        // Header
        const header = document.createElement('div');
        header.className = 'c-algo-item__header';

        const title = document.createElement('h3');
        title.className = 'c-algo-item__title';
        title.textContent = algo.name;

        const tags = document.createElement('div');
        tags.className = 'c-algo-item__tags';

        const diffTag = document.createElement('span');
        diffTag.className = 'c-tag';
        diffTag.textContent = algo.difficulty.toUpperCase();

        const compTag = document.createElement('span');
        compTag.className = 'c-tag';
        compTag.textContent = algo.complexity.split('|')[0].trim();

        tags.appendChild(diffTag);
        tags.appendChild(compTag);
        header.appendChild(title);
        header.appendChild(tags);

        // Description
        const desc = document.createElement('p');
        desc.className = 'c-algo-item__desc';
        desc.textContent = algo.description;

        // Code Block
        const codeBlock = this.createCodeBlock(algo);

        item.appendChild(header);
        item.appendChild(desc);
        item.appendChild(codeBlock);

        return item;
    },

    createCodeBlock(algo) {
        const codeContainer = document.createElement('div');
        codeContainer.className = 'c-code';

        const codeHeader = document.createElement('div');
        codeHeader.className = 'c-code__header';

        const langLabel = document.createElement('span');
        langLabel.className = 'c-code__lang';
        langLabel.textContent = 'JAVA';

        const copyBtn = document.createElement('button');
        copyBtn.className = 'c-code__copy';
        copyBtn.textContent = 'COPY';
        copyBtn.addEventListener('click', () => this.copyCode(algo.code, copyBtn));

        codeHeader.appendChild(langLabel);
        codeHeader.appendChild(copyBtn);

        const codeContent = document.createElement('pre');
        codeContent.className = 'c-code__content';
        codeContent.textContent = algo.code;

        codeContainer.appendChild(codeHeader);
        codeContainer.appendChild(codeContent);

        return codeContainer;
    },

    copyCode(code, btn) {
        navigator.clipboard.writeText(code).then(() => {
            btn.textContent = 'COPIED!';
            btn.style.color = 'var(--neon-green)';
            btn.style.borderColor = 'var(--neon-green)';
            setTimeout(() => {
                btn.textContent = 'COPY';
                btn.style.color = '';
                btn.style.borderColor = '';
            }, 2000);
        });
    },

    toggleTheme() {
        this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.state.theme);
        localStorage.setItem('theme', this.state.theme);
    },

    loadTheme() {
        const saved = localStorage.getItem('theme') || 'dark';
        this.state.theme = saved;
        document.documentElement.setAttribute('data-theme', saved);
    },

    toggleSearch() {
        this.state.searchOpen = !this.state.searchOpen;
        if (this.searchOverlay) {
            this.searchOverlay.classList.toggle('is-active', this.state.searchOpen);
        }
        if (this.state.searchOpen && this.searchInput) {
            this.searchInput.focus();
        }
    },

    handleSearch(query) {
        if (!query || query.length < 2) {
            this.searchResults.innerHTML = '';
            return;
        }

        const results = this.searchAlgorithms(query.toLowerCase());
        this.renderSearchResults(results);
    },

    searchAlgorithms(query) {
        const results = [];
        for (const [category, data] of Object.entries(ALGORITHMS_DATA)) {
            for (const algo of data.algorithms) {
                if (algo.name.toLowerCase().includes(query) ||
                    algo.description.toLowerCase().includes(query) ||
                    category.toLowerCase().includes(query)) {
                    results.push({ ...algo, category });
                }
            }
        }
        return results.slice(0, 10);
    },

    renderSearchResults(results) {
        this.searchResults.innerHTML = '';
        if (results.length === 0) {
            this.searchResults.innerHTML = '<p class="c-search__no-results">No algorithms found.</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        results.forEach(result => {
            const link = document.createElement('a');
            link.className = 'c-search__result';
            link.href = `#${result.category}`;

            const title = document.createElement('div');
            title.className = 'c-search__result-title';
            title.textContent = result.name;

            const desc = document.createElement('div');
            desc.className = 'c-search__result-desc';
            desc.textContent = `${result.category.toUpperCase()} // ${result.difficulty}`;

            link.appendChild(title);
            link.appendChild(desc);
            fragment.appendChild(link);
        });

        this.searchResults.appendChild(fragment);
    },

    updateCoords(e) {
        if (!this.coordsDisplay) return;
        const x = e ? e.clientX : 0;
        const y = e ? e.clientY : 0;
        const valueEl = this.coordsDisplay.querySelector('.c-coords__value');
        if (valueEl) {
            valueEl.textContent = `${String(x).padStart(4, '0')}/${String(y).padStart(4, '0')}`;
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => App.init());
