// ==== DASHBOARD JS: OBSERVER FIXES + MODERN PRACTICES ====
// 1. Avoid redeclaring observers/functions
// 2. Use best practices from citations

(function() {
    'use strict';

    // ----- HELPER: DOM NODE CREATION & APPEND -----
    function createElementWithClasses(tag, classes) {
        const el = document.createElement(tag);
        if (classes) el.className = classes;
        return el;
    }

    // ----- DEEP OBSERVER MANAGEMENT -----
    let dashboardObserver;
    let cardObserver;

    // Initialize dashboard UI
    function renderDashboard() {
        const container = document.getElementById('dashboard');
        if (!container) return;

        // Use DocumentFragment for performance
        const frag = document.createDocumentFragment();

        // Example: Dynamic grid items
        const data = [
            { id: 1, title: "Card 1", value: 42 },
            { id: 2, title: "Card 2", value: 84 }
        ];

        data.forEach(item => {
            const card = createElementWithClasses('div', 'neon-card');
            card.dataset.id = item.id;
            card.innerHTML = `<h3>${item.title}</h3><p>${item.value}</p>`;
            frag.appendChild(card);
        });

        container.appendChild(frag);
    }

    // ----- INTERSECTION OBSERVER: Lazy-load cards -----
    function initCardObserver() {
        const cards = document.querySelectorAll('.lazy-card');
        cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Load content or animate in
                    entry.target.classList.add('animate-in');
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => cardObserver.observe(card));
    }

    // ----- MUTATION OBSERVER: Watch for layout changes -----
    function initMutationObserver() {
        const target = document.getElementById('dashboard');
        if (!target) return;

        const observer = new MutationObserver(mutations => {
            mutations.forEach(m => {
                // Example: Update glow based on data changes
                m.addedNodes.forEach(node => {
                    if (node.classList?.contains('neon-card')) {
                        node.style.setProperty('--glow', '2px');
                    }
                });
            });
        });

        observer.observe(target, { childList: true, subtree: true });
    }

    // ----- EVENT HANDLING: Use addEventListener everywhere -----
    function bindEvents() {
        document.addEventListener('DOMContentLoaded', () => {
            renderDashboard();
            initCardObserver();
            initMutationObserver();

            // Example button with no br tag, proper attributes
            const btn = createElementWithClasses('button', 'neon-btn');
            btn.textContent = 'Refresh';
            btn.setAttribute('type', 'button');
            btn.addEventListener('click', () => {
                alert('Dashboard refreshed!');
            });
            document.body.appendChild(btn);

            // Example: Accessible, semantic markup
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1';
            document.head.appendChild(meta);
        });
    }

    bindEvents();
})();
