/**
 * NEON ALGORITHMS TUTORIAL - Main Application
 * Following RAG Directives for UI/UX
 */

(function() {
  'use strict';

  // Category configuration with icons
  const CATEGORIES = {
    sorting: { name: 'Sorting', icon: '↕️' },
    search: { name: 'Search', icon: '🔍' },
    array: { name: 'Array', icon: '📊' },
    linkedlist: { name: 'Linked List', icon: '🔗' },
    stack: { name: 'Stack', icon: '📚' },
    queue: { name: 'Queue', icon: '📋' },
    tree: { name: 'Tree', icon: '🌳' },
    heap: { name: 'Heap', icon: '📐' },
    hashtable: { name: 'Hash Table', icon: '🗂️' },
    graph: { name: 'Graph', icon: '🕸️' }
  };

  // State
  const state = {
    expandedCategories: new Set(['sorting']),
    activeAlgorithm: null,
    searchQuery: ''
  };

  // Utility Functions
  function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstChild;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Render sidebar categories
  function renderSidebar() {
    const container = document.getElementById('categories-container');
    if (!container) return;

    // Group algorithms by category
    const grouped = {};
    for (const algo of ALGORITHMS_DB) {
      if (!grouped[algo.category]) grouped[algo.category] = [];
      grouped[algo.category].push(algo);
    }

    let html = '';
    for (const [catKey, algos] of Object.entries(grouped)) {
      const cat = CATEGORIES[catKey] || { name: catKey, icon: '📁' };
      const isExpanded = state.expandedCategories.has(catKey);
      
      html += `
        <div class="c-category ${isExpanded ? 'is-expanded' : ''}" data-category="${catKey}">
          <div class="c-category__header" onclick="toggleCategory('${catKey}')">
            <span class="c-category__title">
              <span class="c-category__icon">${cat.icon}</span>
              ${cat.name}
            </span>
            <span class="c-category__count">${algos.length}</span>
          </div>
          <ul class="c-category__list">
            ${algos.map(algo => `
              <li>
                <a href="#${algo.id}" class="c-algo-link" data-algo="${algo.id}">${algo.title}</a>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  // Toggle category expansion
  window.toggleCategory = function(catKey) {
    if (state.expandedCategories.has(catKey)) {
      state.expandedCategories.delete(catKey);
    } else {
      state.expandedCategories.add(catKey);
    }
    renderSidebar();
  };

  // Render algorithm card - displays raw JavaScript code without syntax highlighting
  function renderAlgorithmCard(algo) {
    const timeBest = algo.timeComplexity?.best || 'N/A';
    const timeAvg = algo.timeComplexity?.average || 'N/A';
    const timeWorst = algo.timeComplexity?.worst || 'N/A';

    // Escape HTML characters to display code as plain text
    const escapedCode = escapeHtml(algo.code);

    return `
      <article class="c-algo-card" id="${algo.id}">
        <div class="c-algo-card__header">
          <h3 class="c-algo-card__title">${algo.title}</h3>
          <div class="c-algo-card__badges">
            <span class="c-badge c-badge--time">⏱ ${timeWorst}</span>
            <span class="c-badge c-badge--space">💾 ${algo.spaceComplexity || 'N/A'}</span>
            <span class="c-badge c-badge--difficulty">${algo.difficulty || 'Medium'}</span>
          </div>
        </div>
        <p class="c-algo-card__description">${algo.description}</p>

        <div class="c-code-block">
          <div class="c-code-block__header">
            <span class="c-code-block__title">JavaScript Implementation</span>
            <div class="c-code-block__actions">
              <button class="c-code-block__btn" onclick="copyCode('${algo.id}')">📋 Copy</button>
            </div>
          </div>
          <div class="c-code-block__content">
            <pre><code id="code-${algo.id}">${escapedCode}</code></pre>
          </div>
        </div>
      </article>
    `;
  }

  // Render content area
  function renderContent() {
    const container = document.getElementById('content-area');
    if (!container) return;

    // Filter algorithms based on search
    let filtered = ALGORITHMS_DB;
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = ALGORITHMS_DB.filter(algo => 
        algo.title.toLowerCase().includes(query) ||
        algo.description.toLowerCase().includes(query) ||
        algo.category.toLowerCase().includes(query)
      );
    }

    // Group by category
    const grouped = {};
    for (const algo of filtered) {
      if (!grouped[algo.category]) grouped[algo.category] = [];
      grouped[algo.category].push(algo);
    }

    let html = '';
    for (const [catKey, algos] of Object.entries(grouped)) {
      const cat = CATEGORIES[catKey] || { name: catKey, icon: '📁' };
      const sectionId = catKey === 'graph' ? 'graphs' : catKey === 'linkedlist' ? 'data-structures' : catKey;
      
      html += `
        <section id="${sectionId}" class="c-section">
          <div class="c-section__header">
            <h2 class="c-section__title">
              <span class="c-section__title-icon">${cat.icon}</span>
              ${cat.name} Algorithms
            </h2>
            <p class="c-section__description">${algos.length} algorithm${algos.length !== 1 ? 's' : ''} in this category</p>
          </div>
          ${algos.map(renderAlgorithmCard).join('')}
        </section>
      `;
    }

    if (filtered.length === 0) {
      html = `
        <div class="c-section">
          <div class="c-algo-card">
            <h3 class="c-algo-card__title">No algorithms found</h3>
            <p class="c-algo-card__description">Try adjusting your search query.</p>
          </div>
        </div>
      `;
    }

    container.innerHTML = html;
  }

  // Copy code to clipboard
  window.copyCode = function(algoId) {
    const algo = ALGORITHMS_DB.find(a => a.id === algoId);
    if (!algo) return;
    
    navigator.clipboard.writeText(algo.code).then(() => {
      const btn = event.target;
      const originalText = btn.textContent;
      btn.textContent = '✅ Copied!';
      setTimeout(() => { btn.textContent = originalText; }, 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  // Search functionality
  function initSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderContent();
      renderSidebar();
    });
  }

  // Navigation toggle
  function initNavigation() {
    const navToggle = document.querySelector('.js-nav-toggle');
    const nav = document.querySelector('.c-nav');
    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.classList.toggle('is-active');
      nav.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', !isExpanded);
    });

    // Close nav on link click
    nav.querySelectorAll('.c-nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('is-active');
        nav.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Counter animation
  function animateCounter(element) {
    const target = parseInt(element.dataset.count, 10);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };
    updateCounter();
  }

  function initCounters() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
  }

  // Scroll to top
  function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('is-visible');
      } else {
        scrollBtn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Footer year
  function initFooter() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // Handle hash changes for deep linking
  function handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        // Highlight the algorithm link
        document.querySelectorAll('.c-algo-link').forEach(link => {
          link.classList.toggle('is-active', link.dataset.algo === hash);
        });
      }
    }
  }

  // Initialize application
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    renderSidebar();
    renderContent();
    initSearch();
    initNavigation();
    initCounters();
    initScrollToTop();
    initFooter();
    
    window.addEventListener('hashchange', handleHashChange);
    setTimeout(handleHashChange, 100);

    console.log('🌌 NeonAlgo initialized with', ALGORITHMS_DB.length, 'algorithms');
  }

  init();
})();
