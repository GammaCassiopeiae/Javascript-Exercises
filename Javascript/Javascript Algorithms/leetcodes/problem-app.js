/* ==========================================================================
   Problem Detail Page JavaScript - LeetCode Explorer
   Following RAG.md Directives v4.0
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   Problem Data - Complete with descriptions and solutions
   -------------------------------------------------------------------------- */
const PROBLEM_DATA = {
  1: {
    title: 'Two Sum',
    number: '001',
    difficulty: 'easy',
    topics: ['Array', 'Hash Table'],
    description: `Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.

<p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
<p>You can return the answer in any order.</p>`,
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: '' },
      { input: 'nums = [3,3], target = 6', output: '[0,1]', explanation: '' }
    ],
    constraints: [
      '<code>2 <= nums.length <= 10^4</code>',
      '<code>-10^9 <= nums[i] <= 10^9</code>',
      '<code>-10^9 <= target <= 10^9</code>',
      'Only one valid answer exists.'
    ],
    solutions: [
      {
        name: 'Hash Table',
        description: 'Use a hash map to store the value and its index. For each element, check if <code>target - current</code> exists in the map.',
        code: `function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}`,
        complexity: { time: 'O(n) - single pass through the array', space: 'O(n) - hash map storage' }
      },
      {
        name: 'Brute Force',
        description: 'Check every pair of elements to find if their sum equals the target.',
        code: `function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
        complexity: { time: 'O(n²) - nested loops', space: 'O(1) - constant extra space' }
      }
    ]
  },
  2: {
    title: 'Reverse Linked List',
    number: '002',
    difficulty: 'easy',
    topics: ['Linked List', 'Recursion'],
    description: `Given the <code>head</code> of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: 'head = [1,2,3,4,5]', output: '[5,4,3,2,1]', explanation: '' },
      { input: 'head = [1,2]', output: '[2,1]', explanation: '' },
      { input: 'head = []', output: '[]', explanation: '' }
    ],
    constraints: [
      'The number of nodes in the list is in the range <code>[0, 5000]</code>.',
      '<code>-5000 <= Node.val <= 5000</code>'
    ],
    solutions: [
      {
        name: 'Iterative',
        description: 'Use three pointers to reverse the links between nodes iteratively.',
        code: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  
  return prev;
}`,
        complexity: { time: 'O(n) - traverse each node once', space: 'O(1) - constant extra space' }
      },
      {
        name: 'Recursive',
        description: 'Recursively reverse the list by changing pointers.',
        code: `function reverseList(head) {
  if (head === null || head.next === null) {
    return head;
  }
  
  const newHead = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  
  return newHead;
}`,
        complexity: { time: 'O(n) - visit each node once', space: 'O(n) - recursion stack' }
      }
    ]
  },
  3: {
    title: 'Valid Parentheses',
    number: '003',
    difficulty: 'easy',
    topics: ['String', 'Stack'],
    description: `Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.

<p>An input string is valid if:</p>
<ul>
<li>Open brackets must be closed by the same type of brackets.</li>
<li>Open brackets must be closed in the correct order.</li>
<li>Every close bracket has a corresponding open bracket of the same type.</li>
</ul>`,
    examples: [
      { input: 's = "()"', output: 'true', explanation: '' },
      { input: 's = "()[]{}"', output: 'true', explanation: '' },
      { input: 's = "(]"', output: 'false', explanation: '' },
      { input: 's = "([])"', output: 'true', explanation: '' }
    ],
    constraints: [
      '<code>1 <= s.length <= 10^4</code>',
      '<code>s</code> consists of parentheses only <code>\'()[]{}\'</code>.'
    ],
    solutions: [
      {
        name: 'Stack',
        description: 'Use a stack to track opening brackets. When encountering a closing bracket, check if it matches the top of the stack.',
        code: `function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (char in map) {
      const top = stack.pop() || '#';
      if (map[char] !== top) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}`,
        complexity: { time: 'O(n) - traverse the string once', space: 'O(n) - stack space' }
      }
    ]
  },
  4: {
    title: 'Best Time to Buy and Sell Stock',
    number: '004',
    difficulty: 'easy',
    topics: ['Array', 'DP'],
    description: `You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.

<p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p>
<p>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p>`,
    examples: [
      { input: 'prices = [7,1,5,3,6,4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: 'prices = [7,6,4,3,1]', output: '0', explanation: 'No transactions are done, i.e., max profit = 0.' }
    ],
    constraints: [
      '<code>1 <= prices.length <= 10^5</code>',
      '<code>0 <= prices[i] <= 10^4</code>'
    ],
    solutions: [
      {
        name: 'One Pass',
        description: 'Track the minimum price seen so far and calculate the maximum profit at each day.',
        code: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (const price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else {
      maxProfit = Math.max(maxProfit, price - minPrice);
    }
  }
  
  return maxProfit;
}`,
        complexity: { time: 'O(n) - single pass', space: 'O(1) - constant space' }
      }
    ]
  },
  5: {
    title: 'Merge Two Sorted Lists',
    number: '005',
    difficulty: 'easy',
    topics: ['Linked List', 'Recursion'],
    description: `You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.

<p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p>
<p>Return <em>the head of the merged linked list</em>.</p>`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: '' },
      { input: 'list1 = [], list2 = []', output: '[]', explanation: '' },
      { input: 'list1 = [], list2 = [0]', output: '[0]', explanation: '' }
    ],
    constraints: [
      'The number of nodes in both lists is in the range <code>[0, 50]</code>.',
      '<code>-100 <= Node.val <= 100</code>',
      'Both <code>list1</code> and <code>list2</code> are sorted in <strong>non-decreasing</strong> order.'
    ],
    solutions: [
      {
        name: 'Iterative',
        description: 'Use a dummy node and iterate through both lists, always attaching the smaller node.',
        code: `function mergeTwoLists(list1, list2) {
  const dummy = { next: null };
  let current = dummy;
  
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      current.next = list1;
      list1 = list1.next;
    } else {
      current.next = list2;
      list2 = list2.next;
    }
    current = current.next;
  }
  
  current.next = list1 || list2;
  return dummy.next;
}`,
        complexity: { time: 'O(n + m) - traverse both lists', space: 'O(1) - constant space' }
      },
      {
        name: 'Recursive',
        description: 'Recursively merge by comparing heads and attaching the result.',
        code: `function mergeTwoLists(list1, list2) {
  if (!list1) return list2;
  if (!list2) return list1;
  
  if (list1.val <= list2.val) {
    list1.next = mergeTwoLists(list1.next, list2);
    return list1;
  } else {
    list2.next = mergeTwoLists(list1, list2.next);
    return list2;
  }
}`,
        complexity: { time: 'O(n + m) - visit each node', space: 'O(n + m) - recursion stack' }
      }
    ]
  }
};

/* --------------------------------------------------------------------------
   Problem Page Controller
   -------------------------------------------------------------------------- */
const ProblemPage = {
  state: {
    problemId: 1,
    activeSolution: 1
  },

  dom: {
    solutionTabs: null,
    solutionPanels: null
  },

  init(problemId) {
    this.state.problemId = problemId;
    this.cacheDOM();
    this.bindEvents();
    this.loadProblem(problemId);
  },

  cacheDOM() {
    this.dom.solutionTabs = document.querySelectorAll('.c-solution-tab');
    this.dom.solutionPanels = document.querySelectorAll('.c-solution-panel');
  },

  bindEvents() {
    /* Solution Tabs */
    this.dom.solutionTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const solutionIndex = parseInt(e.target.dataset.solution);
        this.switchSolution(solutionIndex);
      });
    });

    /* Theme Toggle */
    const themeToggle = document.querySelector('.js-theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  },

  loadTheme() {
    const savedTheme = localStorage.getItem('leetcode-theme');
    const theme = savedTheme || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeIcon(theme);
  },

  updateThemeIcon(theme) {
    const themeToggle = document.querySelector('.js-theme-toggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('.c-theme-toggle__icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '☀' : '◑';
    }
  },

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('leetcode-theme', newTheme);
    this.updateThemeIcon(newTheme);
  },

  switchSolution(index) {
    this.state.activeSolution = index;

    /* Update Tabs */
    this.dom.solutionTabs.forEach(tab => {
      tab.classList.toggle('is-active', parseInt(tab.dataset.solution) === index);
    });

    /* Update Panels */
    this.dom.solutionPanels.forEach(panel => {
      panel.classList.toggle('is-active', parseInt(panel.dataset.panel) === index);
    });
  },

  loadProblem(id) {
    const problem = PROBLEM_DATA[id];
    if (!problem) return;

    /* Update Page Title */
    document.title = `${problem.title} | LeetCode Explorer`;

    /* Update Meta */
    const numberEl = document.querySelector('.c-problem-detail__number');
    if (numberEl) numberEl.textContent = `#${problem.number}`;

    /* Update Title */
    const titleEl = document.querySelector('.c-problem-detail__title');
    if (titleEl) titleEl.textContent = problem.title;

    /* Update Difficulty Badge */
    const difficultyBadge = document.querySelector('.c-difficulty-badge');
    if (difficultyBadge) {
      difficultyBadge.textContent = problem.difficulty;
      difficultyBadge.className = `c-difficulty-badge c-difficulty-badge--${problem.difficulty}`;
    }

    /* Update Topic Tags */
    const topicTags = document.querySelector('.c-topic-tags');
    if (topicTags) {
      topicTags.innerHTML = problem.topics
        .map(topic => `<span class="c-topic-tag">${topic}</span>`)
        .join('');
    }

    /* Update Description */
    const descriptionEl = document.querySelector('.c-problem-detail__description');
    if (descriptionEl) descriptionEl.innerHTML = problem.description;

    /* Update Examples */
    const examplesContainer = document.querySelector('.c-problem-detail__content');
    if (examplesContainer) {
      /* Remove old examples */
      const oldExamples = examplesContainer.querySelectorAll('.c-example');
      oldExamples.forEach(ex => ex.remove());

      /* Insert new examples after description */
      const descriptionEl = examplesContainer.querySelector('.c-problem-detail__description');
      if (descriptionEl && problem.examples) {
        problem.examples.forEach((example, index) => {
          const exampleEl = document.createElement('div');
          exampleEl.className = 'c-example';
          exampleEl.innerHTML = `
            <h3 class="c-example__title">Example ${index + 1}:</h3>
            <div class="c-example__content">
              <pre><code>Input: ${example.input}
Output: ${example.output}${example.explanation ? '\nExplanation: ' + example.explanation : ''}</code></pre>
            </div>
          `;
          descriptionEl.after(exampleEl);
        });
      }
    }

    /* Update Constraints */
    const constraintsEl = document.querySelector('.c-constraints ul');
    if (constraintsEl && problem.constraints) {
      constraintsEl.innerHTML = problem.constraints
        .map(c => `<li>${c}</li>`)
        .join('');
    }

    /* Update Solutions */
    this.updateSolutions(problem.solutions);

    /* Update Navigation */
    this.updateNavigation(id);
  },

  updateSolutions(solutions) {
    if (!solutions) return;

    /* Update Tabs */
    const tabsContainer = document.querySelector('.c-solution-tabs');
    if (tabsContainer) {
      tabsContainer.innerHTML = solutions
        .map((sol, index) => `<button class="c-solution-tab${index === 0 ? ' is-active' : ''}" data-solution="${index + 1}" type="button">${sol.name}</button>`)
        .join('');
    }

    /* Update Panels */
    const contentContainer = document.querySelector('.c-solution-content');
    if (contentContainer) {
      contentContainer.innerHTML = solutions
        .map((sol, index) => `
          <div class="c-solution-panel${index === 0 ? ' is-active' : ''}" data-panel="${index + 1}">
            <h3>${sol.name} Solution</h3>
            <p>${sol.description}</p>
            <pre><code class="language-javascript">${sol.code}</code></pre>
            <div class="c-complexity">
              <h4>Complexity Analysis:</h4>
              <ul>
                <li><strong>Time:</strong> <code>${sol.complexity.time}</code></li>
                <li><strong>Space:</strong> <code>${sol.complexity.space}</code></li>
              </ul>
            </div>
          </div>
        `).join('');
    }

    /* Re-cache and bind events for new elements */
    this.cacheDOM();
    this.bindEvents();
  },

  updateNavigation(currentId) {
    const prevLink = document.querySelector('.c-problem-nav__link--prev');
    const nextLink = document.querySelector('.c-problem-nav__link--next');

    if (prevLink) {
      if (currentId > 1) {
        prevLink.href = `problem-${currentId - 1}.html`;
        prevLink.style.pointerEvents = 'auto';
        prevLink.style.opacity = '1';
      } else {
        prevLink.href = 'index.html';
        prevLink.querySelector('.c-problem-nav__text').textContent = 'All Problems';
      }
    }

    if (nextLink) {
      if (currentId < 50) {
        nextLink.href = `problem-${currentId + 1}.html`;
        nextLink.style.pointerEvents = 'auto';
        nextLink.style.opacity = '1';
      } else {
        nextLink.href = 'index.html';
        nextLink.querySelector('.c-problem-nav__text').textContent = 'All Problems';
      }
    }
  }
};

/* --------------------------------------------------------------------------
   Initialization
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  /* Extract problem ID from URL */
  const path = window.location.pathname;
  const match = path.match(/problem-(\d+)\.html/);
  const problemId = match ? parseInt(match[1]) : 1;

  ProblemPage.loadTheme();
  ProblemPage.init(problemId);
});
