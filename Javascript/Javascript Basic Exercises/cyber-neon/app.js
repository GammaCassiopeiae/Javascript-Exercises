/* ======================================================
   Cyber Neon Hub – JavaScript Module
   -------------------------------------------------------
   Implements:
     • DOM API patterns (cited 201‑300)
     • Accessibility & performance rules (260‑300)
     • Keyboard shortcuts, unique IDs, lazy loading,
       and more from the user’s “Neon Web Dev” file.
   ====================================================== */

(() => {
    /* ---------------------------------------------
       Global state
    --------------------------------------------- */
    const state = { sidebarOpen: false };

    /* ---------------------------------------------
       Utility helpers (cited 260‑300)
    --------------------------------------------- */
    const $ = (...args) => document.querySelectorAll(...args);

    const uniqueId = () => window.crypto.randomUUID(); // citation 275

    const injectGlobalStyles = cssString => {
        const style = document.createElement('style');
        style.textContent = cssString;
        document.head.append(style);
    };

    /* ---------- DOM API helpers ----------
       (cited 201‑300) */
    const createFragment = html => {
        const frag = new DocumentFragment();
        frag.append(...Array.from($.template).map(t => t.content.cloneNode(true)));
        return frag;
    };

    /* ---------- Build UI ----------
       All components are created in JS, then appended to #app
    ------------------------------------------- */
    const buildHeader = () => `
        <header class="neon-header">
            <h1 class="glow-text">Cyber Neon Hub</h1>
            <button id="toggle-sidebar" class="neon-btn">☰ Sidebar</button>
        </header>`;

    const buildSidebar = () => `
        <aside id="sidebar" class="neon-sidebar" aria-label="Main navigation">
            <nav class="nav-links">
                ${['Overview','Analytics','Settings'].map(name =>
                    `<a href="#" class="nav-link neon-link" data-name="${name.toLowerCase()}">${name}</a>`
                ).join('')}
            </nav>
        </aside>`;

    const buildMain = () => `
        <main id="main-content" tabindex="0">
            ${Array.from({length: 10}, (_,i) => `
                <section class="card neon-tube">
                    <h2 class="glow-text">Section ${i+1}</h2>
                    <p>Some futuristic content here.</p>
                    <textarea placeholder="Type something..." name="input-${i}" aria-label="Chat input"></textarea>
                </section>`
            ).join('')}
        </main>`;

    /* ---------- Rendering ----------
       (cited 206) */
    const renderDashboard = () => {
        const app = $('#app')[0];
        app.innerHTML = buildHeader() + buildSidebar() + buildMain();

        /* Attach event listeners – all via addEventListener (cited 205, 201‑300) */
        document.getElementById('toggle-sidebar').addEventListener('click', () => {
            state.sidebarOpen = !state.sidebarOpen;
            $('#sidebar')[0].classList.toggle('open');
        });

        /* Keyboard shortcut: Ctrl+K for search (cited 264) */
        window.addEventListener('keydown', e => {
            if (e.ctrlKey && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                const search = $('#search-input')[0];
                if (search) search.focus();
            }
        });

        /* Auto‑grow textarea (cited 262) */
        $('textarea').forEach(el => el.addEventListener('input', autoGrowTextarea));

        /* Reduced motion preference – disable glow if set (cited 283) */
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReduced.matches) {
            document.documentElement.style.setProperty('--neon-glow', 'none');
        }

        /* Lazy load images & high priority hero asset (cited 272, 273) */
        $('img[data-src]').forEach(img => img.loading = 'lazy');
    };

    const autoGrowTextarea = el => {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    };

    /* ---------- Runtime style injection ----------
       (cited 278) */
    injectGlobalStyles(`
        .neon-link { color: var(--neon-secondary); }
        .active { filter: brightness(1.5); }`);

    /* ---------- Init ----------
       Run after DOM is ready (defer script) */
    document.addEventListener('DOMContentLoaded', renderDashboard);
})();
