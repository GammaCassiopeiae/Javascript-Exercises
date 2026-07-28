/**
 * NEON ALGORITHMS GALLERY - Main Application
 * Pure Vanilla JavaScript using DOM API
 * Following NEON-NOIR ARCHITECT MANIFESTO directives
 */

(function() {
  'use strict';

  /* ==========================================================================
     ALGORITHMS DATA - 60 Algorithms across 12 categories
     ========================================================================== */
  const ALGORITHMS_DATA = [
    // SORTING (5)
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      path: 'algorithms/bubble-sort.html',
      category: 'sorting',
      description: 'Simple sorting algorithm that repeatedly swaps adjacent elements if they are in wrong order.',
      complexity: 'O(n²)',
      tags: ['Sorting', 'Basic', 'Comparison'],
      icon: '📊'
    },
    {
      id: 'quick-sort',
      name: 'Quick Sort',
      path: 'algorithms/quick-sort.html',
      category: 'sorting',
      description: 'Efficient divide-and-conquer sorting algorithm using pivot-based partitioning.',
      complexity: 'O(n log n)',
      tags: ['Sorting', 'Divide & Conquer', 'Fast'],
      icon: '⚡'
    },
    {
      id: 'merge-sort',
      name: 'Merge Sort',
      path: 'algorithms/merge-sort.html',
      category: 'sorting',
      description: 'Stable divide-and-conquer sorting algorithm that merges sorted subarrays.',
      complexity: 'O(n log n)',
      tags: ['Sorting', 'Divide & Conquer', 'Stable'],
      icon: '🔀'
    },
    {
      id: 'insertion-sort',
      name: 'Insertion Sort',
      path: 'algorithms/insertion-sort.html',
      category: 'sorting',
      description: 'Simple algorithm that builds the final sorted array one element at a time.',
      complexity: 'O(n²)',
      tags: ['Sorting', 'Basic', 'Incremental'],
      icon: '📈'
    },
    {
      id: 'heap-sort',
      name: 'Heap Sort',
      path: 'algorithms/heap-sort.html',
      category: 'sorting',
      description: 'Comparison-based sorting using binary heap data structure.',
      complexity: 'O(n log n)',
      tags: ['Sorting', 'Heap', 'In-place'],
      icon: '🏔️'
    },

    // SEARCHING (5)
    {
      id: 'binary-search',
      name: 'Binary Search',
      path: 'algorithms/binary-search.html',
      category: 'searching',
      description: 'Efficient search algorithm for sorted arrays using divide-and-conquer.',
      complexity: 'O(log n)',
      tags: ['Searching', 'Divide & Conquer', 'Fast'],
      icon: '🎯'
    },
    {
      id: 'linear-search',
      name: 'Linear Search',
      path: 'algorithms/linear-search.html',
      category: 'searching',
      description: 'Simple search that checks each element sequentially until found.',
      complexity: 'O(n)',
      tags: ['Searching', 'Basic', 'Sequential'],
      icon: '🔎'
    },
    {
      id: 'jump-search',
      name: 'Jump Search',
      path: 'algorithms/jump-search.html',
      category: 'searching',
      description: 'Search algorithm for sorted arrays that jumps ahead by fixed steps.',
      complexity: 'O(√n)',
      tags: ['Searching', 'Optimized', 'Sorted'],
      icon: '🦘'
    },
    {
      id: 'interpolation-search',
      name: 'Interpolation Search',
      path: 'algorithms/interpolation-search.html',
      category: 'searching',
      description: 'Improved binary search for uniformly distributed sorted arrays.',
      complexity: 'O(log log n)',
      tags: ['Searching', 'Interpolation', 'Fast'],
      icon: '📐'
    },
    {
      id: 'exponential-search',
      name: 'Exponential Search',
      path: 'algorithms/exponential-search.html',
      category: 'searching',
      description: 'Search for unbounded/infinite sorted arrays using exponential range.',
      complexity: 'O(log n)',
      tags: ['Searching', 'Unbounded', 'Range'],
      icon: '📏'
    },

    // GRAPH (5)
    {
      id: 'bfs',
      name: 'Breadth-First Search',
      path: 'algorithms/bfs.html',
      category: 'graph',
      description: 'Graph traversal algorithm exploring neighbors level by level.',
      complexity: 'O(V + E)',
      tags: ['Graph', 'Traversal', 'Queue'],
      icon: '🌊'
    },
    {
      id: 'dfs',
      name: 'Depth-First Search',
      path: 'algorithms/dfs.html',
      category: 'graph',
      description: 'Graph traversal algorithm exploring as far as possible along each branch.',
      complexity: 'O(V + E)',
      tags: ['Graph', 'Traversal', 'Stack'],
      icon: '🌲'
    },
    {
      id: 'topological-sort',
      name: 'Topological Sort',
      path: 'algorithms/topological-sort.html',
      category: 'graph',
      description: 'Linear ordering of vertices in a directed acyclic graph.',
      complexity: 'O(V + E)',
      tags: ['Graph', 'DAG', 'Ordering'],
      icon: '📋'
    },
    {
      id: 'kruskal',
      name: "Kruskal's Algorithm",
      path: 'algorithms/kruskal.html',
      category: 'graph',
      description: 'Minimum spanning tree algorithm using union-find data structure.',
      complexity: 'O(E log E)',
      tags: ['Graph', 'MST', 'Greedy'],
      icon: '🌉'
    },
    {
      id: 'prim',
      name: "Prim's Algorithm",
      path: 'algorithms/prim.html',
      category: 'graph',
      description: 'Minimum spanning tree algorithm growing from arbitrary start vertex.',
      complexity: 'O(E + V log V)',
      tags: ['Graph', 'MST', 'Greedy'],
      icon: '🌳'
    },

    // TREE (5)
    {
      id: 'bst-insert',
      name: 'BST Insert',
      path: 'algorithms/bst-insert.html',
      category: 'tree',
      description: 'Binary Search Tree insertion maintaining BST property.',
      complexity: 'O(log n)',
      tags: ['Tree', 'BST', 'Insert'],
      icon: '🌱'
    },
    {
      id: 'bst-search',
      name: 'BST Search',
      path: 'algorithms/bst-search.html',
      category: 'tree',
      description: 'Search operation in Binary Search Tree.',
      complexity: 'O(log n)',
      tags: ['Tree', 'BST', 'Search'],
      icon: '🔍'
    },
    {
      id: 'avl-rotation',
      name: 'AVL Rotation',
      path: 'algorithms/avl-rotation.html',
      category: 'tree',
      description: 'Self-balancing BST rotations maintaining height balance.',
      complexity: 'O(1)',
      tags: ['Tree', 'AVL', 'Balancing'],
      icon: '⚖️'
    },
    {
      id: 'inorder-traversal',
      name: 'Inorder Traversal',
      path: 'algorithms/inorder-traversal.html',
      category: 'tree',
      description: 'Tree traversal visiting left-root-right order.',
      complexity: 'O(n)',
      tags: ['Tree', 'Traversal', 'DFS'],
      icon: '↗️'
    },
    {
      id: 'level-order',
      name: 'Level Order Traversal',
      path: 'algorithms/level-order.html',
      category: 'tree',
      description: 'BFS-based tree traversal level by level.',
      complexity: 'O(n)',
      tags: ['Tree', 'Traversal', 'BFS'],
      icon: '📊'
    },

    // GEOMETRY (5)
    {
      id: 'convex-hull',
      name: 'Convex Hull',
      path: 'algorithms/convex-hull.html',
      category: 'geometry',
      description: "Graham scan algorithm finding smallest convex polygon containing points.",
      complexity: 'O(n log n)',
      tags: ['Geometry', 'Convex', 'Polygon'],
      icon: '◇'
    },
    {
      id: 'line-intersection',
      name: 'Line Intersection',
      path: 'algorithms/line-intersection.html',
      category: 'geometry',
      description: 'Detect and compute intersection point of two line segments.',
      complexity: 'O(1)',
      tags: ['Geometry', 'Lines', 'Intersection'],
      icon: '✖️'
    },
    {
      id: 'closest-pair',
      name: 'Closest Pair',
      path: 'algorithms/closest-pair.html',
      category: 'geometry',
      description: 'Find closest pair of points using divide-and-conquer.',
      complexity: 'O(n log n)',
      tags: ['Geometry', 'Distance', 'D&C'],
      icon: '📍'
    },
    {
      id: 'circle-collision',
      name: 'Circle Collision',
      path: 'algorithms/circle-collision.html',
      category: 'geometry',
      description: 'Detect collision between circles using distance formula.',
      complexity: 'O(1)',
      tags: ['Geometry', 'Collision', 'Circle'],
      icon: '⭕'
    },
    {
      id: 'polygon-area',
      name: 'Polygon Area',
      path: 'algorithms/polygon-area.html',
      category: 'geometry',
      description: "Calculate polygon area using shoelace formula.",
      complexity: 'O(n)',
      tags: ['Geometry', 'Area', 'Polygon'],
      icon: '📐'
    },

    // PATHFINDING (5)
    {
      id: 'dijkstra',
      name: "Dijkstra's Algorithm",
      path: 'algorithms/dijkstra.html',
      category: 'pathfinding',
      description: 'Shortest path algorithm for weighted graphs with non-negative edges.',
      complexity: 'O((V+E) log V)',
      tags: ['Pathfinding', 'Shortest Path', 'Weighted'],
      icon: '🛤️'
    },
    {
      id: 'astar',
      name: 'A* Algorithm',
      path: 'algorithms/astar.html',
      category: 'pathfinding',
      description: 'Heuristic pathfinding algorithm using cost + heuristic function.',
      complexity: 'O(b^d)',
      tags: ['Pathfinding', 'Heuristic', 'Optimal'],
      icon: '⭐'
    },
    {
      id: 'floyd-warshall',
      name: 'Floyd-Warshall',
      path: 'algorithms/floyd-warshall.html',
      category: 'pathfinding',
      description: 'All-pairs shortest path algorithm for weighted graphs.',
      complexity: 'O(V³)',
      tags: ['Pathfinding', 'All-Pairs', 'DP'],
      icon: '🔄'
    },
    {
      id: 'bellman-ford',
      name: 'Bellman-Ford',
      path: 'algorithms/bellman-ford.html',
      category: 'pathfinding',
      description: 'Shortest path algorithm handling negative edge weights.',
      complexity: 'O(VE)',
      tags: ['Pathfinding', 'Negative', 'SPFA'],
      icon: '🔃'
    },
    {
      id: 'greedy-bfs',
      name: 'Greedy Best-First',
      path: 'algorithms/greedy-bfs.html',
      category: 'pathfinding',
      description: 'Pathfinding using only heuristic without considering path cost.',
      complexity: 'O(b^m)',
      tags: ['Pathfinding', 'Greedy', 'Heuristic'],
      icon: '🎯'
    },

    // DYNAMIC PROGRAMMING (5)
    {
      id: 'fibonacci',
      name: 'Fibonacci DP',
      path: 'algorithms/fibonacci.html',
      category: 'dynamic',
      description: 'Compute Fibonacci numbers using dynamic programming memoization.',
      complexity: 'O(n)',
      tags: ['DP', 'Recursion', 'Memoization'],
      icon: '🐚'
    },
    {
      id: 'knapsack',
      name: '0/1 Knapsack',
      path: 'algorithms/knapsack.html',
      category: 'dynamic',
      description: 'Maximize value in knapsack with weight constraint using DP.',
      complexity: 'O(nW)',
      tags: ['DP', 'Optimization', 'Classic'],
      icon: '🎒'
    },
    {
      id: 'lcs',
      name: 'Longest Common Subsequence',
      path: 'algorithms/lcs.html',
      category: 'dynamic',
      description: 'Find longest subsequence common to two sequences.',
      complexity: 'O(mn)',
      tags: ['DP', 'String', 'Sequence'],
      icon: '📝'
    },
    {
      id: 'coin-change',
      name: 'Coin Change',
      path: 'algorithms/coin-change.html',
      category: 'dynamic',
      description: 'Find minimum coins needed to make a target amount.',
      complexity: 'O(n*amount)',
      tags: ['DP', 'Optimization', 'Greedy'],
      icon: '🪙'
    },
    {
      id: 'edit-distance',
      name: 'Edit Distance',
      path: 'algorithms/edit-distance.html',
      category: 'dynamic',
      description: 'Minimum operations to transform one string to another.',
      complexity: 'O(mn)',
      tags: ['DP', 'String', 'Levenshtein'],
      icon: '✏️'
    },

    // MATHEMATICAL (5)
    {
      id: 'sieve',
      name: "Sieve of Eratosthenes",
      path: 'algorithms/sieve.html',
      category: 'math',
      description: 'Find all prime numbers up to n using ancient algorithm.',
      complexity: 'O(n log log n)',
      tags: ['Math', 'Prime', 'Number Theory'],
      icon: '🔢'
    },
    {
      id: 'euclidean',
      name: 'Euclidean Algorithm',
      path: 'algorithms/euclidean.html',
      category: 'math',
      description: 'Find GCD of two numbers using recursive division.',
      complexity: 'O(log min(a,b))',
      tags: ['Math', 'GCD', 'Number Theory'],
      icon: '➗'
    },
    {
      id: 'matrix-mult',
      name: 'Matrix Multiplication',
      path: 'algorithms/matrix-mult.html',
      category: 'math',
      description: 'Multiply two matrices using standard algorithm.',
      complexity: 'O(n³)',
      tags: ['Math', 'Matrix', 'Linear Algebra'],
      icon: '▦'
    },
    {
      id: 'modular-exp',
      name: 'Modular Exponentiation',
      path: 'algorithms/modular-exp.html',
      category: 'math',
      description: 'Compute (base^exp) % mod efficiently using binary exponentiation.',
      complexity: 'O(log n)',
      tags: ['Math', 'Modular', 'Exponent'],
      icon: '🔣'
    },
    {
      id: 'newton-raphson',
      name: "Newton-Raphson",
      path: 'algorithms/newton-raphson.html',
      category: 'math',
      description: 'Find roots of equations using iterative approximation.',
      complexity: 'O(log n)',
      tags: ['Math', 'Roots', 'Iterative'],
      icon: '📉'
    },

    // STRING (5)
    {
      id: 'kmp',
      name: 'KMP Algorithm',
      path: 'algorithms/kmp.html',
      category: 'string',
      description: 'Knuth-Morris-Pratt pattern matching using failure function.',
      complexity: 'O(n+m)',
      tags: ['String', 'Pattern', 'Matching'],
      icon: '🔤'
    },
    {
      id: 'rabin-karp',
      name: 'Rabin-Karp',
      path: 'algorithms/rabin-karp.html',
      category: 'string',
      description: 'String matching using rolling hash technique.',
      complexity: 'O(n+m)',
      tags: ['String', 'Hash', 'Pattern'],
      icon: '🎲'
    },
    {
      id: 'z-algorithm',
      name: 'Z Algorithm',
      path: 'algorithms/z-algorithm.html',
      category: 'string',
      description: 'Pattern matching using Z-array for linear time search.',
      complexity: 'O(n+m)',
      tags: ['String', 'Pattern', 'Z-array'],
      icon: 'Z'
    },
    {
      id: 'manacher',
      name: "Manacher's Algorithm",
      path: 'algorithms/manacher.html',
      category: 'string',
      description: 'Find longest palindromic substring in linear time.',
      complexity: 'O(n)',
      tags: ['String', 'Palindrome', 'Linear'],
      icon: '🔄'
    },
    {
      id: 'suffix-array',
      name: 'Suffix Array',
      path: 'algorithms/suffix-array.html',
      category: 'string',
      description: 'Sorted array of all suffixes for efficient string operations.',
      complexity: 'O(n log n)',
      tags: ['String', 'Suffix', 'Sorting'],
      icon: '📇'
    },

    // ENCRYPTION (5)
    {
      id: 'caesar',
      name: 'Caesar Cipher',
      path: 'algorithms/caesar.html',
      category: 'encryption',
      description: 'Simple substitution cipher shifting letters by fixed amount.',
      complexity: 'O(n)',
      tags: ['Encryption', 'Cipher', 'Classic'],
      icon: '🔐'
    },
    {
      id: 'vigenere',
      name: 'Vigenère Cipher',
      path: 'algorithms/vigenere.html',
      category: 'encryption',
      description: 'Polyalphabetic substitution using keyword-based shifts.',
      complexity: 'O(n)',
      tags: ['Encryption', 'Polyalphabetic', 'Keyword'],
      icon: '🔑'
    },
    {
      id: 'rsa',
      name: 'RSA Algorithm',
      path: 'algorithms/rsa.html',
      category: 'encryption',
      description: 'Public-key cryptosystem using prime factorization.',
      complexity: 'O(n³)',
      tags: ['Encryption', 'Public Key', 'Prime'],
      icon: '🔒'
    },
    {
      id: 'diffie-hellman',
      name: 'Diffie-Hellman',
      path: 'algorithms/diffie-hellman.html',
      category: 'encryption',
      description: 'Key exchange protocol for secure communication.',
      complexity: 'O(log n)',
      tags: ['Encryption', 'Key Exchange', 'DH'],
      icon: '🤝'
    },
    {
      id: 'aes',
      name: 'AES Overview',
      path: 'algorithms/aes.html',
      category: 'encryption',
      description: 'Advanced Encryption Standard symmetric block cipher.',
      complexity: 'O(n)',
      tags: ['Encryption', 'Symmetric', 'Block'],
      icon: '🛡️'
    },

    // COMPRESSION (5)
    {
      id: 'huffman',
      name: 'Huffman Coding',
      path: 'algorithms/huffman.html',
      category: 'compression',
      description: 'Lossless compression using variable-length prefix codes.',
      complexity: 'O(n log n)',
      tags: ['Compression', 'Tree', 'Prefix'],
      icon: '📦'
    },
    {
      id: 'lzw',
      name: 'LZW Compression',
      path: 'algorithms/lzw.html',
      category: 'compression',
      description: 'Dictionary-based lossless data compression algorithm.',
      complexity: 'O(n)',
      tags: ['Compression', 'Dictionary', 'LZ'],
      icon: '🗜️'
    },
    {
      id: 'run-length',
      name: 'Run-Length Encoding',
      path: 'algorithms/run-length.html',
      category: 'compression',
      description: 'Simple compression storing consecutive repeated values.',
      complexity: 'O(n)',
      tags: ['Compression', 'RLE', 'Simple'],
      icon: '📏'
    },
    {
      id: 'burrows-wheeler',
      name: 'Burrows-Wheeler',
      path: 'algorithms/burrows-wheeler.html',
      category: 'compression',
      description: 'Reversible transformation for better compression.',
      complexity: 'O(n²)',
      tags: ['Compression', 'BWT', 'Transform'],
      icon: '🔄'
    },
    {
      id: 'arithmetic',
      name: 'Arithmetic Coding',
      path: 'algorithms/arithmetic.html',
      category: 'compression',
      description: 'Entropy coding using probability intervals.',
      complexity: 'O(n)',
      tags: ['Compression', 'Entropy', 'Probability'],
      icon: '📊'
    },

    // AI & ML (5)
    {
      id: 'perceptron',
      name: 'Perceptron',
      path: 'algorithms/perceptron.html',
      category: 'ai',
      description: 'Basic neural network unit for binary classification.',
      complexity: 'O(n)',
      tags: ['AI', 'Neural', 'Classification'],
      icon: '🧠'
    },
    {
      id: 'knn',
      name: 'K-Nearest Neighbors',
      path: 'algorithms/knn.html',
      category: 'ai',
      description: 'Instance-based learning for classification and regression.',
      complexity: 'O(n)',
      tags: ['ML', 'Classification', 'Distance'],
      icon: '👥'
    },
    {
      id: 'kmeans',
      name: 'K-Means Clustering',
      path: 'algorithms/kmeans.html',
      category: 'ai',
      description: 'Unsupervised clustering algorithm partitioning data into K groups.',
      complexity: 'O(n*k*i)',
      tags: ['ML', 'Clustering', 'Unsupervised'],
      icon: '🔵'
    },
    {
      id: 'gradient-descent',
      name: 'Gradient Descent',
      path: 'algorithms/gradient-descent.html',
      category: 'ai',
      description: 'Optimization algorithm minimizing cost function iteratively.',
      complexity: 'O(n)',
      tags: ['ML', 'Optimization', 'Gradient'],
      icon: '📉'
    },
    {
      id: 'minimax',
      name: 'Minimax Algorithm',
      path: 'algorithms/minimax.html',
      category: 'ai',
      description: 'Decision algorithm for two-player zero-sum games.',
      complexity: 'O(b^d)',
      tags: ['AI', 'Game Theory', 'Decision'],
      icon: '🎮'
    }
  ];

  /* ==========================================================================
     DOM ELEMENT REFERENCES
     ========================================================================== */
  const elements = {
    galleryGrid: null,
    galleryEmpty: null,
    searchInput: null,
    filterGroup: null,
    filterButtons: null,
    categoriesGrid: null,
    currentYear: null,
    scrollTop: null,
    themeToggle: null,
    navLinks: null,
    algoCount: null
  };

  /* ==========================================================================
     STATE MANAGEMENT
     ========================================================================== */
  const state = {
    currentFilter: 'all',
    searchQuery: '',
    filteredAlgos: [...ALGORITHMS_DATA],
    theme: 'dark'
  };

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */
  function init() {
    cacheElements();
    bindEvents();
    loadThemePreference();
    renderGallery(state.filteredAlgos);
    updateCategoryCounts();
    setCurrentYear();
    setupIntersectionObserver();
  }

  /* ==========================================================================
     ELEMENT CACHING
     ========================================================================== */
  function cacheElements() {
    elements.galleryGrid = document.querySelector('.js-gallery-grid');
    elements.galleryEmpty = document.querySelector('.js-gallery-empty');
    elements.searchInput = document.querySelector('.js-search-input');
    elements.filterGroup = document.querySelector('.js-filter-group');
    elements.filterButtons = document.querySelectorAll('.c-filter-btn');
    elements.categoriesGrid = document.querySelector('.js-categories-grid');
    elements.currentYear = document.querySelector('.js-current-year');
    elements.scrollTop = document.querySelector('.js-scroll-top');
    elements.themeToggle = document.querySelector('.js-theme-toggle');
    elements.navLinks = document.querySelectorAll('.c-nav__link');
  }

  /* ==========================================================================
     EVENT BINDING
     ========================================================================== */
  function bindEvents() {
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', handleSearch);
    }

    if (elements.filterGroup) {
      elements.filterGroup.addEventListener('click', handleFilterClick);
    }

    if (elements.categoriesGrid) {
      elements.categoriesGrid.addEventListener('click', handleCategoryClick);
    }

    if (elements.scrollTop) {
      elements.scrollTop.addEventListener('click', scrollToTop);
      elements.scrollTop.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToTop();
        }
      });
      window.addEventListener('scroll', handleScroll);
    }

    if (elements.themeToggle) {
      elements.themeToggle.addEventListener('click', toggleTheme);
    }

    elements.navLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            elements.navLinks.forEach(function(l) {
              l.classList.remove('is-active');
            });
            this.classList.add('is-active');
          }
        }
      });
    });

    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        handleResize();
      }, 250);
    });
  }

  /* ==========================================================================
     GALLERY RENDERING
     ========================================================================== */
  function renderGallery(algos) {
    if (!elements.galleryGrid) return;

    elements.galleryGrid.innerHTML = '';

    if (algos.length === 0) {
      elements.galleryEmpty.classList.remove('is-hidden');
      elements.galleryGrid.classList.add('is-hidden');
      return;
    }

    elements.galleryEmpty.classList.add('is-hidden');
    elements.galleryGrid.classList.remove('is-hidden');

    const fragment = document.createDocumentFragment();

    algos.forEach(function(algo) {
      const card = createGalleryCard(algo);
      fragment.appendChild(card);
    });

    elements.galleryGrid.appendChild(fragment);
    setupCardObserver();
  }

  /* ==========================================================================
     CREATE GALLERY CARD
     ========================================================================== */
  function createGalleryCard(algo) {
    const card = document.createElement('article');
    card.className = 'c-gallery-card';
    card.setAttribute('role', 'listitem');
    card.dataset.category = algo.category;
    card.dataset.id = algo.id;

    const tagsHtml = algo.tags.map(function(tag) {
      return '<span class="c-gallery-card__tag">' + escapeHtml(tag) + '</span>';
    }).join('');

    card.innerHTML =
      '<a href="' + escapeHtml(algo.path) + '" class="c-gallery-card__link" target="_blank" rel="noopener noreferrer">' +
        '<div class="c-gallery-card__image">' +
          '<span class="c-gallery-card__icon" aria-hidden="true">' + algo.icon + '</span>' +
        '</div>' +
        '<div class="c-gallery-card__content">' +
          '<span class="c-gallery-card__category">' + escapeHtml(algo.category) + '</span>' +
          '<h3 class="c-gallery-card__title">' + escapeHtml(algo.name) + '</h3>' +
          '<p class="c-gallery-card__description">' + escapeHtml(algo.description) + '</p>' +
          '<div class="c-gallery-card__meta">' +
            '<span class="c-gallery-card__tag">' + escapeHtml(algo.complexity) + '</span>' +
            tagsHtml +
          '</div>' +
        '</div>' +
      '</a>';

    return card;
  }

  /* ==========================================================================
     UPDATE CATEGORY COUNTS
     ========================================================================== */
  function updateCategoryCounts() {
    const counts = {};
    ALGORITHMS_DATA.forEach(function(algo) {
      counts[algo.category] = (counts[algo.category] || 0) + 1;
    });

    const categoryElements = {
      sorting: document.querySelector('.js-sorting-count'),
      searching: document.querySelector('.js-searching-count'),
      graph: document.querySelector('.js-graph-count'),
      tree: document.querySelector('.js-tree-count'),
      geometry: document.querySelector('.js-geometry-count'),
      pathfinding: document.querySelector('.js-pathfinding-count'),
      dynamic: document.querySelector('.js-dynamic-count'),
      math: document.querySelector('.js-math-count'),
      string: document.querySelector('.js-string-count'),
      encryption: document.querySelector('.js-encryption-count'),
      compression: document.querySelector('.js-compression-count'),
      ai: document.querySelector('.js-ai-count')
    };

    for (const category in categoryElements) {
      if (categoryElements[category] && counts[category]) {
        categoryElements[category].textContent = counts[category] + ' algorithms';
      }
    }
  }

  /* ==========================================================================
     SEARCH HANDLER
     ========================================================================== */
  function handleSearch(e) {
    state.searchQuery = e.target.value.toLowerCase().trim();
    filterAlgos();
  }

  /* ==========================================================================
     FILTER HANDLER
     ========================================================================== */
  function handleFilterClick(e) {
    const button = e.target.closest('.c-filter-btn');
    if (!button) return;

    elements.filterButtons.forEach(function(btn) {
      btn.classList.remove('is-active');
    });
    button.classList.add('is-active');

    state.currentFilter = button.dataset.filter;
    filterAlgos();
  }

  /* ==========================================================================
     CATEGORY CLICK HANDLER
     ========================================================================== */
  function handleCategoryClick(e) {
    const card = e.target.closest('.c-category-card');
    if (!card) return;

    const category = card.dataset.category;
    
    elements.filterButtons.forEach(function(btn) {
      btn.classList.remove('is-active');
      if (btn.dataset.filter === category) {
        btn.classList.add('is-active');
      }
    });

    state.currentFilter = category;
    filterAlgos();

    document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
  }

  /* ==========================================================================
     FILTER ALGORITHMS
     ========================================================================== */
  function filterAlgos() {
    state.filteredAlgos = ALGORITHMS_DATA.filter(function(algo) {
      const matchesFilter = state.currentFilter === 'all' || algo.category === state.currentFilter;
      const matchesSearch = state.searchQuery === '' ||
        algo.name.toLowerCase().includes(state.searchQuery) ||
        algo.description.toLowerCase().includes(state.searchQuery) ||
        algo.tags.some(function(tag) {
          return tag.toLowerCase().includes(state.searchQuery);
        });

      return matchesFilter && matchesSearch;
    });

    renderGallery(state.filteredAlgos);
  }

  /* ==========================================================================
     SET CURRENT YEAR
     ========================================================================== */
  function setCurrentYear() {
    if (elements.currentYear) {
      elements.currentYear.textContent = new Date().getFullYear();
    }
  }

  /* ==========================================================================
     SCROLL TO TOP
     ========================================================================== */
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ==========================================================================
     HANDLE SCROLL
     ========================================================================== */
  function handleScroll() {
    if (!elements.scrollTop) return;
    if (window.scrollY > 300) {
      elements.scrollTop.classList.remove('is-hidden');
    } else {
      elements.scrollTop.classList.add('is-hidden');
    }
  }

  /* ==========================================================================
     HANDLE RESIZE
     ========================================================================== */
  function handleResize() {
    // Recalculate layout-dependent values if needed
  }

  /* ==========================================================================
     INTERSECTION OBSERVER
     ========================================================================== */
  function setupIntersectionObserver() {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.1 });

    document.querySelectorAll('section').forEach(function(section) {
      observer.observe(section);
    });
  }

  /* ==========================================================================
     CARD OBSERVER
     ========================================================================== */
  function setupCardObserver() {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { root: elements.galleryGrid, rootMargin: '50px', threshold: 0.1 });

    document.querySelectorAll('.c-gallery-card').forEach(function(card) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      observer.observe(card);
    });
  }

  /* ==========================================================================
     THEME TOGGLE
     ========================================================================== */
  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(state.theme);
    saveThemePreference(state.theme);
    updateThemeIcon();
  }

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
  }

  function updateThemeIcon() {
    if (!elements.themeToggle) return;
    const icon = elements.themeToggle.querySelector('.c-theme-toggle__icon');
    if (icon) {
      icon.textContent = state.theme === 'dark' ? '🌙' : '☀️';
    }
  }

  function saveThemePreference(theme) {
    try {
      localStorage.setItem('neon-algorithms-theme', theme);
    } catch (e) {}
  }

  function loadThemePreference() {
    try {
      const savedTheme = localStorage.getItem('neon-algorithms-theme');
      if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
        state.theme = savedTheme;
        applyTheme(state.theme);
        updateThemeIcon();
      }
    } catch (e) {}
  }

  /* ==========================================================================
     UTILITY: ESCAPE HTML
     ========================================================================== */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ==========================================================================
     BOOTSTRAP
     ========================================================================== */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
