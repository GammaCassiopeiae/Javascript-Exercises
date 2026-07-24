/**
 * LeetCode Algorithms App - Main Controller
 * Follows SPA Controller Pattern (RAG.md Part IV)
 */

const App = {
  // State Management
  state: {
    currentPage: 'home',
    currentProblem: null,
    theme: 'dark'
  },

  // Problem Metadata (List)
  problems: [
    { id: 1, title: 'Two Sum', tags: ['array', 'hash'], difficulty: 'easy' },
    { id: 2, title: 'Reverse Linked List', tags: ['linked-list'], difficulty: 'easy' },
    { id: 3, title: 'Valid Parentheses', tags: ['string', 'stack'], difficulty: 'easy' },
    { id: 4, title: 'Best Time to Buy and Sell Stock', tags: ['array', 'dp'], difficulty: 'easy' },
    { id: 5, title: 'Merge Two Sorted Lists', tags: ['linked-list'], difficulty: 'easy' },
    { id: 6, title: 'Longest Substring Without Repeating Characters', tags: ['string', 'sliding-window'], difficulty: 'medium' },
    { id: 7, title: 'Container With Most Water', tags: ['array', 'two-pointers'], difficulty: 'medium' },
    { id: 8, title: 'Add Two Numbers', tags: ['linked-list', 'math'], difficulty: 'medium' },
    { id: 9, title: 'Rotate Array', tags: ['array'], difficulty: 'medium' },
    { id: 10, title: 'Remove Duplicates from Sorted Array', tags: ['array', 'two-pointers'], difficulty: 'easy' },
    { id: 11, title: 'Search in Rotated Sorted Array', tags: ['array', 'binary-search'], difficulty: 'medium' },
    { id: 12, title: 'Longest Increasing Subsequence', tags: ['array', 'dp'], difficulty: 'medium' },
    { id: 13, title: 'Binary Tree Inorder Traversal', tags: ['tree'], difficulty: 'easy' },
    { id: 14, title: 'Validate Binary Search Tree', tags: ['tree'], difficulty: 'medium' },
    { id: 15, title: 'Lowest Common Ancestor of a Binary Tree', tags: ['tree'], difficulty: 'medium' },
    { id: 16, title: 'Path Sum', tags: ['tree'], difficulty: 'easy' },
    { id: 17, title: 'Maximum Subarray', tags: ['array', 'dp'], difficulty: 'medium' },
    { id: 18, title: 'Climbing Stairs', tags: ['dp'], difficulty: 'easy' },
    { id: 19, title: 'Word Break', tags: ['string', 'dp'], difficulty: 'medium' },
    { id: 20, title: 'Word Ladder', tags: ['string', 'graph', 'bfs'], difficulty: 'hard' },
    { id: 21, title: 'Group Anagrams', tags: ['string', 'hash'], difficulty: 'medium' },
    { id: 22, title: 'Merge Intervals', tags: ['array', 'sorting'], difficulty: 'medium' },
    { id: 23, title: 'Subsets', tags: ['backtrack'], difficulty: 'medium' },
    { id: 24, title: 'Permutations', tags: ['backtrack'], difficulty: 'medium' },
    { id: 25, title: 'Combination Sum', tags: ['backtrack'], difficulty: 'medium' },
    { id: 26, title: 'Trapping Rain Water', tags: ['array', 'two-pointers'], difficulty: 'hard' },
    { id: 27, title: 'Spiral Matrix', tags: ['array', 'matrix'], difficulty: 'medium' },
    { id: 28, title: 'Rotate Image', tags: ['array', 'matrix'], difficulty: 'medium' },
    { id: 29, title: 'Jump Game', tags: ['array', 'dp', 'greedy'], difficulty: 'medium' },
    { id: 30, title: 'Longest Palindromic Substring', tags: ['string', 'dp'], difficulty: 'medium' },
    { id: 31, title: 'Unique Paths', tags: ['dp'], difficulty: 'medium' },
    { id: 32, title: 'House Robber', tags: ['dp'], difficulty: 'medium' },
    { id: 33, title: 'Word Search', tags: ['backtrack', 'matrix'], difficulty: 'medium' },
    { id: 34, title: 'Number of Islands', tags: ['graph', 'dfs', 'bfs'], difficulty: 'medium' },
    { id: 35, title: 'Find First and Last Position of Element in Sorted Array', tags: ['array', 'binary-search'], difficulty: 'medium' },
    { id: 36, title: 'Count Complete Tree Nodes', tags: ['tree', 'binary-search'], difficulty: 'medium' },
    { id: 37, title: 'Reverse Words in a String', tags: ['string'], difficulty: 'medium' },
    { id: 38, title: 'Course Schedule', tags: ['graph', 'dfs', 'bfs'], difficulty: 'medium' },
    { id: 39, title: 'Longest Consecutive Sequence', tags: ['array', 'hash'], difficulty: 'medium' },
    { id: 40, title: 'Find Peak Element', tags: ['array', 'binary-search'], difficulty: 'medium' },
    { id: 41, title: 'Minimum Path Sum', tags: ['dp'], difficulty: 'medium' },
    { id: 42, title: 'Kth Largest Element in an Array', tags: ['array', 'sorting', 'heap'], difficulty: 'medium' },
    { id: 43, title: 'Top K Frequent Elements', tags: ['hash', 'heap'], difficulty: 'medium' },
    { id: 44, title: 'Find All Anagrams in a String', tags: ['string', 'sliding-window'], difficulty: 'medium' },
    { id: 45, title: 'Sort Colors', tags: ['array', 'sorting', 'two-pointers'], difficulty: 'medium' },
    { id: 46, title: 'Remove Nth Node From End of List', tags: ['linked-list', 'two-pointers'], difficulty: 'medium' },
    { id: 47, title: 'Subtree of Another Tree', tags: ['tree'], difficulty: 'easy' },
    { id: 48, title: 'Serialize and Deserialize Binary Tree', tags: ['tree'], difficulty: 'hard' },
    { id: 49, title: 'Find the Duplicate Number', tags: ['array', 'two-pointers', 'binary-search'], difficulty: 'medium' },
    { id: 50, title: 'Find Minimum in Rotated Sorted Array', tags: ['array', 'binary-search'], difficulty: 'medium' }
  ],

  /**
   * Initialize the application
   */
  init() {
    try {
      this.cacheDOM();
      if (!this.container) return;
      this.bindEvents();
      this.route();
      this.loadTheme();
    } catch (error) {
      console.error('App initialization error:', error);
    }
  },

  /**
   * Cache DOM elements
   */
  cacheDOM() {
    this.container = document.getElementById('app-container');
  },

  /**
   * Bind event listeners
   */
  bindEvents() {
    window.addEventListener('hashchange', () => this.route());
    
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => this.toggleTheme());

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('c-code-block__copy')) {
        this.copyCode(e.target);
      }
    });
  },

  /**
   * Router - handles navigation based on hash OR page metadata
   */
  async route() {
    const hash = window.location.hash.slice(1);
    const path = window.location.pathname;
    
    // Check if we are on a problem-specific HTML file
    const fileMatch = path.match(/problem-(\d+)\.html$/);
    
    if (fileMatch) {
      this.state.currentPage = 'problem';
      this.state.currentProblem = parseInt(fileMatch[1]);
      await this.renderProblem(this.state.currentProblem);
    } else if (hash.startsWith('problem/')) {
      const id = parseInt(hash.split('/')[1]);
      this.state.currentPage = 'problem';
      this.state.currentProblem = id;
      await this.renderProblem(id);
    } else {
      this.state.currentPage = 'home';
      this.state.currentProblem = null;
      this.renderHome();
    }
    
    window.scrollTo(0, 0);
    this.updateNavState();
  },

  updateNavState() {
    const navLinks = document.querySelectorAll('.c-nav__link');
    navLinks.forEach(link => {
      const isActive = (this.state.currentPage === 'home' && link.getAttribute('href') === '#home');
      link.classList.toggle('is-active', isActive);
    });
  },

  /**
   * Render Home Page
   */
  renderHome() {
    const fragment = document.createDocumentFragment();
    const main = document.createElement('main');
    main.className = 'l-main';

    main.innerHTML = `
      <section class="c-hero u-text-center">
        <h1 class="is-pulsing">LeetCode Algorithms</h1>
        <p class="c-hero__subtitle">Master 50 Essential Coding Problems with TypeScript</p>
      </section>
      <section class="l-problem-grid" aria-label="Problem List"></section>
    `;

    const grid = main.querySelector('.l-problem-grid');
    this.problems.forEach(problem => {
      const card = this.createProblemCard(problem);
      grid.appendChild(card);
    });

    fragment.appendChild(main);
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  },

  createProblemCard(problem) {
    const card = document.createElement('article');
    card.className = 'c-card';
    const tagsHtml = problem.tags.map(tag => 
      `<span class="c-tag c-tag--${tag.split('-')[0]}">${tag}</span>`
    ).join('');

    // Link to problem-X.html to follow "links to other html files" instruction
    card.innerHTML = `
      <div class="c-card__number">#${problem.id}</div>
      <h2 class="c-card__title">${problem.title}</h2>
      <div class="c-card__tags">${tagsHtml}</div>
      <a href="problem-${problem.id}.html" class="c-card__link">View Solution</a>
    `;
    return card;
  },

  /**
   * Render Problem Detail
   */
  async renderProblem(problemId) {
    const problemMeta = this.problems.find(p => p.id === problemId);
    if (!problemMeta) {
      this.renderHome();
      return;
    }

    this.container.innerHTML = `<main class="l-main"><div class="c-skeleton" style="height: 600px; width: 100%;"></div></main>`;

    const problemData = await this.fetchProblemData(problemId);
    const fragment = document.createDocumentFragment();
    const main = document.createElement('main');
    main.className = 'l-main';

    const tagsHtml = problemMeta.tags.map(tag =>
      `<span class="c-tag c-tag--${tag.split('-')[0]}">${tag}</span>`
    ).join('');

    main.innerHTML = `
      <article class="c-problem-detail">
        <a href="index.html" class="c-back-btn">← Back to Problems</a>

        <header class="c-problem-detail__header">
          <h1 class="c-problem-detail__title">#${problemData.id}. ${problemData.title}</h1>
          <div class="c-problem-detail__meta">
            <span class="c-problem-detail__difficulty c-difficulty--${problemData.difficulty}">
              ${problemData.difficulty.toUpperCase()}
            </span>
            <div class="c-card__tags">${tagsHtml}</div>
          </div>
        </header>

        <section class="c-problem-detail__description">
          ${problemData.description}
        </section>

        <section class="c-code-section">
          <h2>TypeScript Solution</h2>
          <div class="c-code-block">
            <div class="c-code-block__header">
              <span class="c-code-block__title">solution.ts</span>
              <button class="c-code-block__copy" data-code="${encodeURIComponent(problemData.code)}">Copy</button>
            </div>
            <div class="c-code-block__content">
              <pre><code>${this.highlightSyntax(problemData.code)}</code></pre>
            </div>
          </div>
        </section>
      </article>
    `;

    fragment.appendChild(main);
    this.container.innerHTML = '';
    this.container.appendChild(fragment);
  },

  async fetchProblemData(id) {
    if (typeof PROBLEMS_DATA !== 'undefined' && PROBLEMS_DATA[id]) {
      return PROBLEMS_DATA[id];
    }
    return {
      id,
      title: 'Error Loading Problem',
      difficulty: 'hard',
      description: '<p>Failed to load problem data. Please ensure PROBLEMS_DATA is defined.</p>',
      code: '// Error loading code'
    };
  },

  /**
   * Neon-Noir Syntax Highlighter (Single-Pass)
   */
  highlightSyntax(code) {
    if (!code) return '';
    
    // Escape HTML first
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Single-pass regex for all tokens
    // Group 1: Comments (//...)
    // Group 2: Strings ("...", '...', `...`)
    // Group 3: Keywords
    // Group 4: Types (PascalCase)
    // Group 5: Functions (name before () )
    // Group 6: Numbers
    // Group 7: Operators
    const regex = /(\/\/.*$)|(["'`](?:\\.|[^\1])*?["'])|\b(function|const|let|var|if|else|for|while|return|class|constructor|new|this|import|export|from|async|await|try|catch|type|interface|readonly|public|private|protected|static|as|of|in|instanceof|typeof|throw|extends|implements|get|set|any|void|number|string|boolean|unknown|never|null|undefined)\b|\b([A-Z][a-zA-Z0-9]*)\b|(\b\w+)(?=\s*\()|\b(\d+(?:\.\d+)?)\b|([+\-*\/=<>!&|?:]+)/gm;

    return escaped.replace(regex, (match, comment, string, keyword, type, fn, num, op) => {
      if (comment) return `<span class="token-comment">${match}</span>`;
      if (string) return `<span class="token-string">${match}</span>`;
      if (keyword) return `<span class="token-keyword">${match}</span>`;
      if (type) return `<span class="token-type">${match}</span>`;
      if (fn) return `<span class="token-function">${match}</span>`;
      if (num) return `<span class="token-number">${match}</span>`;
      if (op) return `<span class="token-operator">${match}</span>`;
      return match;
    });
  },

  async copyCode(button) {
    const code = decodeURIComponent(button.getAttribute('data-code') || '');
    try {
      await navigator.clipboard.writeText(code);
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('is-active');
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('is-active');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  },

  loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  },

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }
};

App.init();
