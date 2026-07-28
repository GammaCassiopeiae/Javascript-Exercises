/* ==========================================================================
   LeetCode Explorer - Main Application
   Following RAG.md Directives v4.0 - JavaScript & DOM API
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. PROBLEM DATA - 50 LeetCode Problems
   -------------------------------------------------------------------------- */
const PROBLEMS = [
  { id: 1, title: 'Two Sum', difficulty: 'easy', topics: ['Array', 'Hash Table'] },
  { id: 2, title: 'Reverse Linked List', difficulty: 'easy', topics: ['Linked List', 'Recursion'] },
  { id: 3, title: 'Valid Parentheses', difficulty: 'easy', topics: ['String', 'Stack'] },
  { id: 4, title: 'Best Time to Buy and Sell Stock', difficulty: 'easy', topics: ['Array', 'DP'] },
  { id: 5, title: 'Merge Two Sorted Lists', difficulty: 'easy', topics: ['Linked List', 'Recursion'] },
  { id: 6, title: 'Longest Substring Without Repeating Characters', difficulty: 'medium', topics: ['String', 'Sliding Window'] },
  { id: 7, title: 'Container With Most Water', difficulty: 'medium', topics: ['Array', 'Two Pointers'] },
  { id: 8, title: 'Add Two Numbers', difficulty: 'medium', topics: ['Linked List', 'Math'] },
  { id: 9, title: 'Rotate Array', difficulty: 'medium', topics: ['Array', 'Two Pointers'] },
  { id: 10, title: 'Remove Duplicates from Sorted Array', difficulty: 'easy', topics: ['Array', 'Two Pointers'] },
  { id: 11, title: 'Search in Rotated Sorted Array', difficulty: 'medium', topics: ['Array', 'Binary Search'] },
  { id: 12, title: 'Longest Increasing Subsequence', difficulty: 'medium', topics: ['Array', 'DP', 'Binary Search'] },
  { id: 13, title: 'Binary Tree Inorder Traversal', difficulty: 'easy', topics: ['Tree', 'DFS', 'Stack'] },
  { id: 14, title: 'Validate Binary Search Tree', difficulty: 'medium', topics: ['Tree', 'DFS'] },
  { id: 15, title: 'Lowest Common Ancestor of a Binary Tree', difficulty: 'medium', topics: ['Tree', 'DFS'] },
  { id: 16, title: 'Path Sum', difficulty: 'easy', topics: ['Tree', 'DFS', 'Recursion'] },
  { id: 17, title: 'Maximum Subarray', difficulty: 'medium', topics: ['Array', 'DP', 'Divide & Conquer'] },
  { id: 18, title: 'Climbing Stairs', difficulty: 'easy', topics: ['Math', 'DP', 'Recursion'] },
  { id: 19, title: 'Word Break', difficulty: 'medium', topics: ['String', 'DP', 'Trie'] },
  { id: 20, title: 'Word Ladder', difficulty: 'hard', topics: ['String', 'BFS', 'Graph'] },
  { id: 21, title: 'Group Anagrams', difficulty: 'medium', topics: ['String', 'Hash Table', 'Sorting'] },
  { id: 22, title: 'Merge Intervals', difficulty: 'medium', topics: ['Array', 'Sorting'] },
  { id: 23, title: 'Subsets', difficulty: 'medium', topics: ['Array', 'Backtracking', 'Bit Manipulation'] },
  { id: 24, title: 'Permutations', difficulty: 'medium', topics: ['Array', 'Backtracking'] },
  { id: 25, title: 'Combination Sum', difficulty: 'medium', topics: ['Array', 'Backtracking'] },
  { id: 26, title: 'Trapping Rain Water', difficulty: 'hard', topics: ['Array', 'Two Pointers', 'DP'] },
  { id: 27, title: 'Spiral Matrix', difficulty: 'medium', topics: ['Array', 'Matrix', 'Simulation'] },
  { id: 28, title: 'Rotate Image', difficulty: 'medium', topics: ['Array', 'Matrix'] },
  { id: 29, title: 'Jump Game', difficulty: 'medium', topics: ['Array', 'DP', 'Greedy'] },
  { id: 30, title: 'Longest Palindromic Substring', difficulty: 'medium', topics: ['String', 'DP'] },
  { id: 31, title: 'Unique Paths', difficulty: 'medium', topics: ['Array', 'DP', 'Combinatorics'] },
  { id: 32, title: 'House Robber', difficulty: 'medium', topics: ['Array', 'DP'] },
  { id: 33, title: 'Word Search', difficulty: 'medium', topics: ['Array', 'Backtracking', 'Matrix'] },
  { id: 34, title: 'Number of Islands', difficulty: 'medium', topics: ['Array', 'DFS', 'BFS', 'Matrix'] },
  { id: 35, title: 'Find First and Last Position of Element in Sorted Array', difficulty: 'medium', topics: ['Array', 'Binary Search'] },
  { id: 36, title: 'Count Complete Tree Nodes', difficulty: 'medium', topics: ['Tree', 'Binary Search'] },
  { id: 37, title: 'Reverse Words in a String', difficulty: 'medium', topics: ['String', 'Two Pointers'] },
  { id: 38, title: 'Course Schedule', difficulty: 'medium', topics: ['Graph', 'DFS', 'BFS', 'Topological Sort'] },
  { id: 39, title: 'Longest Consecutive Sequence', difficulty: 'medium', topics: ['Array', 'Hash Table'] },
  { id: 40, title: 'Find Peak Element', difficulty: 'medium', topics: ['Array', 'Binary Search'] },
  { id: 41, title: 'Minimum Path Sum', difficulty: 'medium', topics: ['Array', 'DP', 'Matrix'] },
  { id: 42, title: 'Kth Largest Element in an Array', difficulty: 'medium', topics: ['Array', 'Sorting', 'Heap'] },
  { id: 43, title: 'Top K Frequent Elements', difficulty: 'medium', topics: ['Array', 'Hash Table', 'Heap'] },
  { id: 44, title: 'Find All Anagrams in a String', difficulty: 'medium', topics: ['String', 'Sliding Window'] },
  { id: 45, title: 'Sort Colors', difficulty: 'medium', topics: ['Array', 'Two Pointers', 'Sorting'] },
  { id: 46, title: 'Remove Nth Node From End of List', difficulty: 'medium', topics: ['Linked List', 'Two Pointers'] },
  { id: 47, title: 'Subtree of Another Tree', difficulty: 'easy', topics: ['Tree', 'DFS', 'String Matching'] },
  { id: 48, title: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', topics: ['Tree', 'DFS', 'BFS'] },
  { id: 49, title: 'Find the Duplicate Number', difficulty: 'medium', topics: ['Array', 'Two Pointers', 'Binary Search'] },
  { id: 50, title: 'Find Minimum in Rotated Sorted Array', difficulty: 'medium', topics: ['Array', 'Binary Search'] }
];

/* --------------------------------------------------------------------------
   2. APP CONTROLLER (Directive 4.2: Standard SPA Controller Pattern)
   -------------------------------------------------------------------------- */
const App = {
  state: {
    theme: 'dark',
    searchQuery: '',
    difficultyFilter: 'all',
    problems: PROBLEMS
  },

  dom: {
    grid: null,
    emptyState: null,
    searchInput: null,
    filterButtons: null,
    themeToggle: null
  },

  /* Initialize Application */
  init() {
    this.loadTheme();
    this.cacheDOM();
    this.bindEvents();
    this.render();
  },

  /* Cache DOM Elements (Directive 4.1) */
  cacheDOM() {
    this.dom.grid = document.querySelector('.js-problems-grid');
    this.dom.emptyState = document.querySelector('.js-problems-empty');
    this.dom.searchInput = document.querySelector('.js-search-input');
    this.dom.filterButtons = document.querySelectorAll('.c-filter-btn');
    this.dom.themeToggle = document.querySelector('.js-theme-toggle');
  },

  /* Bind Event Listeners (Directive 4.1-5: Event Delegation) */
  bindEvents() {
    /* Search Input */
    if (this.dom.searchInput) {
      this.dom.searchInput.addEventListener('input', (e) => {
        this.state.searchQuery = e.target.value.toLowerCase().trim();
        this.filterAndRender();
      });
    }

    /* Filter Buttons */
    this.dom.filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const difficulty = e.target.dataset.difficulty;
        this.setDifficultyFilter(difficulty);
      });
    });

    /* Theme Toggle */
    if (this.dom.themeToggle) {
      this.dom.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    /* Keyboard Navigation */
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== this.dom.searchInput) {
        e.preventDefault();
        this.dom.searchInput?.focus();
      }
    });
  },

  /* Load Theme from localStorage (Directive 4.1-8) */
  loadTheme() {
    const savedTheme = localStorage.getItem('leetcode-theme');
    this.state.theme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    this.updateThemeIcon();
  },

  /* Update Theme Toggle Icon */
  updateThemeIcon() {
    if (!this.dom.themeToggle) return;
    const icon = this.dom.themeToggle.querySelector('.c-theme-toggle__icon');
    if (icon) {
      icon.textContent = this.state.theme === 'dark' ? '☀' : '◑';
    }
  },

  /* Toggle Theme */
  toggleTheme() {
    this.state.theme = this.state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', this.state.theme);
    localStorage.setItem('leetcode-theme', this.state.theme);
    this.updateThemeIcon();
  },

  /* Set Difficulty Filter */
  setDifficultyFilter(difficulty) {
    this.state.difficultyFilter = difficulty;
    
    /* Update Active State (Directive 4.1-3: classList API) */
    this.dom.filterButtons.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.difficulty === difficulty);
    });

    this.filterAndRender();
  },

  /* Filter Problems */
  filterProblems() {
    return this.state.problems.filter(problem => {
      /* Search Filter */
      const matchesSearch = problem.title.toLowerCase().includes(this.state.searchQuery) ||
        problem.topics.some(topic => topic.toLowerCase().includes(this.state.searchQuery));

      /* Difficulty Filter */
      const matchesDifficulty = this.state.difficultyFilter === 'all' ||
        problem.difficulty === this.state.difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });
  },

  /* Filter and Render */
  filterAndRender() {
    const filtered = this.filterProblems();
    this.renderProblems(filtered);
  },

  /* Render Application */
  render() {
    this.renderProblems(this.state.problems);
  },

  /* Render Problems Grid (Directive 4.1-2: DocumentFragment) */
  renderProblems(problems) {
    if (!this.dom.grid) return;

    /* Clear Grid */
    this.dom.grid.innerHTML = '';

    /* Show/Hide Empty State */
    if (problems.length === 0) {
      this.dom.grid.hidden = true;
      this.dom.emptyState.hidden = false;
      return;
    }

    this.dom.grid.hidden = false;
    this.dom.emptyState.hidden = true;

    /* Create DocumentFragment for Batch DOM Updates */
    const fragment = document.createDocumentFragment();

    problems.forEach((problem, index) => {
      const card = this.createProblemCard(problem, index);
      fragment.appendChild(card);
    });

    this.dom.grid.appendChild(fragment);
  },

  /* Create Problem Card (Directive 4.1-1: createElement) */
  createProblemCard(problem, index) {
    const card = document.createElement('a');
    card.className = 'c-problem-card';
    card.href = `problem-${problem.id}.html`;
    card.style.animationDelay = `${index * 0.03}s`;

    /* Card Header */
    const header = document.createElement('div');
    header.className = 'c-problem-card__header';

    const number = document.createElement('span');
    number.className = 'c-problem-card__number';
    number.textContent = `#${String(problem.id).padStart(2, '0')}`;

    const difficulty = document.createElement('span');
    difficulty.className = `c-problem-card__difficulty c-problem-card__difficulty--${problem.difficulty}`;
    difficulty.textContent = problem.difficulty;

    header.appendChild(number);
    header.appendChild(difficulty);

    /* Card Title */
    const title = document.createElement('h3');
    title.className = 'c-problem-card__title';
    title.textContent = problem.title;

    /* Card Topics */
    const topics = document.createElement('div');
    topics.className = 'c-problem-card__topics';

    problem.topics.slice(0, 3).forEach(topic => {
      const topicSpan = document.createElement('span');
      topicSpan.className = 'c-problem-card__topic';
      topicSpan.textContent = topic;
      topics.appendChild(topicSpan);
    });

    /* Assemble Card */
    card.appendChild(header);
    card.appendChild(title);
    card.appendChild(topics);

    return card;
  }
};

/* --------------------------------------------------------------------------
   3. INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
