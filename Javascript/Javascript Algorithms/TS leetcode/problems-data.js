const PROBLEMS_DATA = {
  "1": {
    "id": 1,
    "title": "Two Sum",
    "difficulty": "easy",
    "tags": [
      "array",
      "hash"
    ],
    "description": "<p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p><p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p><p>You can return the answer in any order.</p><h3>Example 1:</h3><pre>Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre><h3>Example 2:</h3><pre>Input: nums = [3,2,4], target = 6\nOutput: [1,2]\n</pre><h3>Example 3:</h3><pre>Input: nums = [3,3], target = 6\nOutput: [0,1]\n</pre><h3>Constraints:</h3><ul><li><code>2 <= nums.length <= 10^4</code></li><li><code>-10^9 <= nums[i] <= 10^9</code></li><li><code>-10^9 <= target <= 10^9</code></li><li><strong>Only one valid answer exists.</strong></li></ul>",
    "code": "function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  \n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    \n    if (map.has(complement)) {\n      return [map.get(complement)!, i];\n    }\n    \n    map.set(nums[i], i);\n  }\n  \n  return [];\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(n)"
  },
  "2": {
    "id": 2,
    "title": "Reverse Linked List",
    "difficulty": "easy",
    "tags": [
      "linked-list"
    ],
    "description": "<p>Given the <code>head</code> of a singly linked list, reverse the list, and return <em>the reversed list</em>.</p><h3>Example 1:</h3><pre>Input: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n</pre><h3>Example 2:</h3><pre>Input: head = [1,2]\nOutput: [2,1]\n</pre><h3>Example 3:</h3><pre>Input: head = []\nOutput: []\n</pre><h3>Constraints:</h3><ul><li>The number of nodes in the list is in the range <code>[0, 5000]</code>.</li><li><code>-5000 <= Node.val <= 5000</code></li></ul>",
    "code": "class ListNode {\n  val: number;\n  next: ListNode | null;\n  \n  constructor(val?: number, next?: ListNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.next = (next === undefined ? null : next);\n  }\n}\n\nfunction reverseList(head: ListNode | null): ListNode | null {\n  let prev: ListNode | null = null;\n  let current: ListNode | null = head;\n  \n  while (current !== null) {\n    const nextTemp = current.next;\n    current.next = prev;\n    prev = current;\n    current = nextTemp;\n  }\n  \n  return prev;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "3": {
    "id": 3,
    "title": "Valid Parentheses",
    "difficulty": "easy",
    "tags": [
      "string",
      "stack"
    ],
    "description": "<p>Given a string <code>s</code> containing just the characters <code>'('</code>, <code>')'</code>, <code>'{'</code>, <code>'}'</code>, <code>'['</code> and <code>']'</code>, determine if the input string is valid.</p><p>An input string is valid if:</p><ol><li>Open brackets must be closed by the same type of brackets.</li><li>Open brackets must be closed in the correct order.</li><li>Every close bracket has a corresponding open bracket of the same type.</li></ol><h3>Example 1:</h3><pre>Input: s = \"()\"\nOutput: true\n</pre><h3>Example 2:</h3><pre>Input: s = \"()[]{}\"\nOutput: true\n</pre><h3>Example 3:</h3><pre>Input: s = \"(]\"\nOutput: false\n</pre>",
    "code": "function isValid(s: string): boolean {\n  const stack: string[] = [];\n  const map: Record<string, string> = {\n    ')': '(',\n    '}': '{',\n    ']': '['\n  };\n  \n  for (const char of s) {\n    if (char in map) {\n      const top = stack.pop() || '#';\n      if (top !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  \n  return stack.length === 0;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(n)"
  },
  "4": {
    "id": 4,
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "easy",
    "tags": [
      "array",
      "dp"
    ],
    "description": "<p>You are given an array <code>prices</code> where <code>prices[i]</code> is the price of a given stock on the <code>i<sup>th</sup></code> day.</p><p>You want to maximize your profit by choosing a <strong>single day</strong> to buy one stock and choosing a <strong>different day in the future</strong> to sell that stock.</p><p>Return <em>the maximum profit you can achieve from this transaction</em>. If you cannot achieve any profit, return <code>0</code>.</p><h3>Example 1:</h3><pre>Input: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.\n</pre><h3>Example 2:</h3><pre>Input: prices = [7,6,4,3,1]\nOutput: 0\nExplanation: In this case, no transactions are done and the max profit = 0.\n</pre>",
    "code": "function maxProfit(prices: number[]): number {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  \n  for (const price of prices) {\n    minPrice = Math.min(minPrice, price);\n    maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  \n  return maxProfit;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "5": {
    "id": 5,
    "title": "Merge Two Sorted Lists",
    "difficulty": "easy",
    "tags": [
      "linked-list"
    ],
    "description": "<p>You are given the heads of two sorted linked lists <code>list1</code> and <code>list2</code>.</p><p>Merge the two lists into one <strong>sorted</strong> list. The list should be made by splicing together the nodes of the first two lists.</p><p>Return <em>the head of the merged linked list</em>.</p><h3>Example 1:</h3><pre>Input: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n</pre><h3>Example 2:</h3><pre>Input: list1 = [], list2 = []\nOutput: []\n</pre><h3>Example 3:</h3><pre>Input: list1 = [], list2 = [0]\nOutput: [0]\n</pre>",
    "code": "class ListNode {\n  val: number;\n  next: ListNode | null;\n  \n  constructor(val?: number, next?: ListNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.next = (next === undefined ? null : next);\n  }\n}\n\nfunction mergeTwoLists(\n  list1: ListNode | null, \n  list2: ListNode | null\n): ListNode | null {\n  const dummy = new ListNode(0);\n  let current = dummy;\n  \n  while (list1 && list2) {\n    if (list1.val <= list2.val) {\n      current.next = list1;\n      list1 = list1.next;\n    } else {\n      current.next = list2;\n      list2 = list2.next;\n    }\n    current = current.next;\n  }\n  \n  current.next = list1 || list2;\n  return dummy.next;\n}\n\n// Time Complexity: O(m + n)\n// Space Complexity: O(1)"
  },
  "6": {
    "id": 6,
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "medium",
    "tags": [
      "string",
      "sliding-window"
    ],
    "description": "<p>Given a string <code>s</code>, find the length of the <strong>longest substring</strong> without repeating characters.</p><h3>Example 1:</h3><pre>Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.\n</pre><h3>Example 2:</h3><pre>Input: s = \"bbbbb\"\nOutput: 1\nExplanation: The answer is \"b\", with the length of 1.\n</pre><h3>Example 3:</h3><pre>Input: s = \"pwwkew\"\nOutput: 3\nExplanation: The answer is \"wke\", with the length of 3.\n</pre>",
    "code": "function lengthOfLongestSubstring(s: string): number {\n  const seen = new Map<string, number>();\n  let maxLength = 0;\n  let left = 0;\n  \n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    \n    if (seen.has(char) && seen.get(char)! >= left) {\n      left = seen.get(char)! + 1;\n    }\n    \n    seen.set(char, right);\n    maxLength = Math.max(maxLength, right - left + 1);\n  }\n  \n  return maxLength;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(min(m, n))"
  },
  "7": {
    "id": 7,
    "title": "Container With Most Water",
    "difficulty": "medium",
    "tags": [
      "array",
      "two-pointers"
    ],
    "description": "<p>You are given an integer array <code>height</code> of length <code>n</code>. There are <code>n</code> vertical lines drawn such that the two endpoints of the <code>i<sup>th</sup></code> line are <code>(i, 0)</code> and <code>(i, height[i])</code>.</p><p>Find two lines that together with the x-axis form a container, such that the container contains the most water.</p><p>Return <em>the maximum amount of water a container can store</em>.</p><h3>Example 1:</h3><pre>Input: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\n</pre><h3>Example 2:</h3><pre>Input: height = [1,1]\nOutput: 1\n</pre>",
    "code": "function maxArea(height: number[]): number {\n  let left = 0;\n  let right = height.length - 1;\n  let maxArea = 0;\n  \n  while (left < right) {\n    const width = right - left;\n    const h = Math.min(height[left], height[right]);\n    maxArea = Math.max(maxArea, width * h);\n    \n    if (height[left] < height[right]) {\n      left++;\n    } else {\n      right--;\n    }\n  }\n  \n  return maxArea;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "8": {
    "id": 8,
    "title": "Add Two Numbers",
    "difficulty": "medium",
    "tags": [
      "linked-list",
      "math"
    ],
    "description": "<p>You are given two <strong>non-empty</strong> linked lists representing two non-negative integers. The digits are stored in <strong>reverse order</strong>, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.</p><p>You may assume the two numbers do not contain any leading zero, except the number 0 itself.</p><h3>Example 1:</h3><pre>Input: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n</pre><h3>Example 2:</h3><pre>Input: l1 = [0], l2 = [0]\nOutput: [0]\n</pre>",
    "code": "class ListNode {\n  val: number;\n  next: ListNode | null;\n  \n  constructor(val?: number, next?: ListNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.next = (next === undefined ? null : next);\n  }\n}\n\nfunction addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n  const dummy = new ListNode(0);\n  let current = dummy;\n  let carry = 0;\n  \n  while (l1 || l2 || carry) {\n    const val1 = l1 ? l1.val : 0;\n    const val2 = l2 ? l2.val : 0;\n    const sum = val1 + val2 + carry;\n    \n    carry = Math.floor(sum / 10);\n    current.next = new ListNode(sum % 10);\n    current = current.next;\n    \n    if (l1) l1 = l1.next;\n    if (l2) l2 = l2.next;\n  }\n  \n  return dummy.next;\n}\n\n// Time Complexity: O(max(m, n))\n// Space Complexity: O(max(m, n))"
  },
  "9": {
    "id": 9,
    "title": "Rotate Array",
    "difficulty": "medium",
    "tags": [
      "array"
    ],
    "description": "<p>Given an integer array <code>nums</code>, rotate the array to the right by <code>k</code> steps, where <code>k</code> is non-negative.</p><h3>Example 1:</h3><pre>Input: nums = [1,2,3,4,5,6,7], k = 3\nOutput: [5,6,7,1,2,3,4]\n</pre><h3>Example 2:</h3><pre>Input: nums = [-1,-100,3,99], k = 2\nOutput: [3,99,-1,-100]\n</pre>",
    "code": "function rotate(nums: number[], k: number): void {\n  const n = nums.length;\n  k = k % n;\n  \n  const reverse = (arr: number[], start: number, end: number) => {\n    while (start < end) {\n      [arr[start], arr[end]] = [arr[end], arr[start]];\n      start++;\n      end--;\n    }\n  };\n  \n  reverse(nums, 0, n - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, n - 1);\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "10": {
    "id": 10,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "easy",
    "tags": [
      "array",
      "two-pointers"
    ],
    "description": "<p>Given an integer array <code>nums</code> sorted in <strong>non-decreasing order</strong>, remove the duplicates in-place such that each unique element appears only once. Return <code>k</code> after placing the final result in the first <code>k</code> slots of <code>nums</code>.</p><h3>Example 1:</h3><pre>Input: nums = [1,1,2]\nOutput: 2, nums = [1,2,_]\n</pre><h3>Example 2:</h3><pre>Input: nums = [0,0,1,1,1,2,2,3,3,4]\nOutput: 5, nums = [0,1,2,3,4,_,_,_,_,_]\n</pre>",
    "code": "function removeDuplicates(nums: number[]): number {\n  if (nums.length === 0) return 0;\n  \n  let slow = 0;\n  \n  for (let fast = 1; fast < nums.length; fast++) {\n    if (nums[fast] !== nums[slow]) {\n      slow++;\n      nums[slow] = nums[fast];\n    }\n  }\n  \n  return slow + 1;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "11": {
    "id": 11,
    "title": "Search in Rotated Sorted Array",
    "difficulty": "medium",
    "tags": [
      "array",
      "binary-search"
    ],
    "description": "<p>There is an integer array <code>nums</code> sorted in ascending order (with <strong>distinct</strong> values).</p><p>Prior to being passed to your function, <code>nums</code> is <strong>possibly rotated</strong> at an unknown pivot index <code>k</code>.</p><p>Given the array <code>nums</code> after the possible rotation and an integer <code>target</code>, return <em>the index of </em><code>target</code><em> if it is in </em><code>nums</code><em>, or </em><code>-1</code><em> if it is not in </em><code>nums</code>.</p><p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>",
    "code": "function search(nums: number[], target: number): number {\n  let left = 0;\n  let right = nums.length - 1;\n  \n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (nums[mid] === target) return mid;\n    \n    // Left half is sorted\n    if (nums[left] <= nums[mid]) {\n      if (nums[left] <= target && target < nums[mid]) {\n        right = mid - 1;\n      } else {\n        left = mid + 1;\n      }\n    } else {\n      // Right half is sorted\n      if (nums[mid] < target && target <= nums[right]) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n  }\n  \n  return -1;\n}\n\n// Time Complexity: O(log n)\n// Space Complexity: O(1)"
  },
  "12": {
    "id": 12,
    "title": "Longest Increasing Subsequence",
    "difficulty": "medium",
    "tags": [
      "array",
      "dp"
    ],
    "description": "<p>Given an integer array <code>nums</code>, return <em>the length of the longest strictly increasing subsequence</em>.</p><h3>Example 1:</h3><pre>Input: nums = [10,9,2,5,3,7,101,18]\nOutput: 4\nExplanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.\n</pre><h3>Example 2:</h3><pre>Input: nums = [0,1,0,3,2,3]\nOutput: 4\n</pre><h3>Example 3:</h3><pre>Input: nums = [7,7,7,7,7,7,7]\nOutput: 1\n</pre>",
    "code": "function lengthOfLIS(nums: number[]): number {\n  if (nums.length === 0) return 0;\n  \n  const dp: number[] = new Array(nums.length).fill(1);\n  \n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[j] < nums[i]) {\n        dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n    }\n  }\n  \n  return Math.max(...dp);\n}\n\n// Time Complexity: O(n^2)\n// Space Complexity: O(n)"
  },
  "13": {
    "id": 13,
    "title": "Binary Tree Inorder Traversal",
    "difficulty": "easy",
    "tags": [
      "tree"
    ],
    "description": "<p>Given the <code>root</code> of a binary tree, return <em>the inorder traversal of its nodes' values</em>.</p><h3>Example 1:</h3><pre>Input: root = [1,null,2,3]\nOutput: [1,3,2]\n</pre><h3>Example 2:</h3><pre>Input: root = []\nOutput: []\n</pre><h3>Example 3:</h3><pre>Input: root = [1]\nOutput: [1]\n</pre>",
    "code": "class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  \n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\nfunction inorderTraversal(root: TreeNode | null): number[] {\n  const result: number[] = [];\n  const stack: TreeNode[] = [];\n  let current: TreeNode | null = root;\n  \n  while (current !== null || stack.length > 0) {\n    while (current !== null) {\n      stack.push(current);\n      current = current.left;\n    }\n    current = stack.pop()!;\n    result.push(current.val);\n    current = current.right;\n  }\n  \n  return result;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(h)"
  },
  "14": {
    "id": 14,
    "title": "Validate Binary Search Tree",
    "difficulty": "medium",
    "tags": [
      "tree"
    ],
    "description": "<p>Given the <code>root</code> of a binary tree, determine if it is a valid binary search tree (BST).</p><p>A <strong>valid BST</strong> is defined as follows:</p><ul><li>The left subtree of a node contains only nodes with keys <strong>less than</strong> the node's key.</li><li>The right subtree of a node contains only nodes with keys <strong>greater than</strong> the node's key.</li><li>Both the left and right subtrees must also be binary search trees.</li></ul>",
    "code": "class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  \n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\nfunction isValidBST(root: TreeNode | null): boolean {\n  function validate(node: TreeNode | null, min: number, max: number): boolean {\n    if (!node) return true;\n    \n    if (node.val <= min || node.val >= max) return false;\n    \n    return validate(node.left, min, node.val) && \n           validate(node.right, node.val, max);\n  }\n  \n  return validate(root, -Infinity, Infinity);\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(h)"
  },
  "15": {
    "id": 15,
    "title": "Lowest Common Ancestor of a Binary Tree",
    "difficulty": "medium",
    "tags": [
      "tree"
    ],
    "description": "<p>Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.</p><p>The lowest common ancestor is defined between two nodes <code>p</code> and <code>q</code> as the lowest node in <code>T</code> that has both <code>p</code> and <code>q</code> as descendants.</p>",
    "code": "class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  \n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\nfunction lowestCommonAncestor(\n  root: TreeNode | null, \n  p: TreeNode | null, \n  q: TreeNode | null\n): TreeNode | null {\n  if (!root || root === p || root === q) return root;\n  \n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  \n  if (left && right) return root;\n  return left || right;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(h)"
  },
  "16": {
    "id": 16,
    "title": "Path Sum",
    "difficulty": "easy",
    "tags": [
      "tree"
    ],
    "description": "<p>Given the <code>root</code> of a binary tree and an integer <code>targetSum</code>, return <code>true</code> if the tree has a root-to-leaf path such that adding up all the values along the path equals <code>targetSum</code>.</p><p>A <strong>leaf</strong> is a node with no children.</p>",
    "code": "class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  \n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\nfunction hasPathSum(root: TreeNode | null, targetSum: number): boolean {\n  if (!root) return false;\n  \n  if (!root.left && !root.right) {\n    return targetSum === root.val;\n  }\n  \n  const remainingSum = targetSum - root.val;\n  return hasPathSum(root.left, remainingSum) || \n         hasPathSum(root.right, remainingSum);\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(h)"
  },
  "17": {
    "id": 17,
    "title": "Maximum Subarray",
    "difficulty": "medium",
    "tags": [
      "array",
      "dp"
    ],
    "description": "<p>Given an integer array <code>nums</code>, find the <strong>subarray</strong> with the largest sum, and return <em>its sum</em>.</p><h3>Example 1:</h3><pre>Input: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: The subarray [4,-1,2,1] has the largest sum 6.\n</pre><h3>Example 2:</h3><pre>Input: nums = [1]\nOutput: 1\n</pre>",
    "code": "function maxSubArray(nums: number[]): number {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  \n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  \n  return maxSum;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "18": {
    "id": 18,
    "title": "Climbing Stairs",
    "difficulty": "easy",
    "tags": [
      "dp"
    ],
    "description": "<p>You are climbing a staircase. It takes <code>n</code> steps to reach the top.</p><p>Each time you can either climb <code>1</code> or <code>2</code> steps. In how many distinct ways can you climb to the top?</p><h3>Example 1:</h3><pre>Input: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n</pre><h3>Example 2:</h3><pre>Input: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step\n</pre>",
    "code": "function climbStairs(n: number): number {\n  if (n <= 2) return n;\n  \n  let prev1 = 1;\n  let prev2 = 2;\n  \n  for (let i = 3; i <= n; i++) {\n    const current = prev1 + prev2;\n    prev1 = prev2;\n    prev2 = current;\n  }\n  \n  return prev2;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "19": {
    "id": 19,
    "title": "Word Break",
    "difficulty": "medium",
    "tags": [
      "string",
      "dp"
    ],
    "description": "<p>Given a string <code>s</code> and a dictionary of strings <code>wordDict</code>, return <code>true</code> if <code>s</code> can be segmented into a space-separated sequence of one or more dictionary words.</p><p><strong>Note</strong> that the same word in the dictionary may be reused multiple times in the segmentation.</p>",
    "code": "function wordBreak(s: string, wordDict: string[]): boolean {\n  const wordSet = new Set(wordDict);\n  const dp: boolean[] = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  \n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && wordSet.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  \n  return dp[s.length];\n}\n\n// Time Complexity: O(n^3)\n// Space Complexity: O(n)"
  },
  "20": {
    "id": 20,
    "title": "Word Ladder",
    "difficulty": "hard",
    "tags": [
      "string",
      "graph",
      "bfs"
    ],
    "description": "<p>A <strong>transformation sequence</strong> from word <code>beginWord</code> to word <code>endWord</code> using a dictionary <code>wordList</code> is a sequence of words <code>beginWord -> s1 -> s2 -> ... -> sk</code> such that:</p><ul><li>Every adjacent pair of words differs by a single letter.</li><li>Every <code>si</code> for <code>1 <= i <= k</code> is in <code>wordList</code>.</li><li><code>sk == endWord</code></li></ul><p>Given the two words <code>beginWord</code> and <code>endWord</code> and a dictionary <code>wordList</code>, return <em>the <strong>number of words</strong> in the <strong>shortest transformation sequence</strong></em>.</p>",
    "code": "function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {\n  const wordSet = new Set(wordList);\n  if (!wordSet.has(endWord)) return 0;\n  \n  const queue: [string, number][] = [[beginWord, 1]];\n  const visited = new Set<string>([beginWord]);\n  \n  while (queue.length > 0) {\n    const [word, level] = queue.shift()!;\n    \n    for (let i = 0; i < word.length; i++) {\n      for (let c = 0; c < 26; c++) {\n        const newWord = word.slice(0, i) + String.fromCharCode(97 + c) + word.slice(i + 1);\n        \n        if (newWord === endWord) return level + 1;\n        \n        if (wordSet.has(newWord) && !visited.has(newWord)) {\n          visited.add(newWord);\n          queue.push([newWord, level + 1]);\n        }\n      }\n    }\n  }\n  \n  return 0;\n}\n\n// Time Complexity: O(M^2 * N)\n// Space Complexity: O(M^2 * N)"
  },
  "21": {
    "id": 21,
    "title": "Group Anagrams",
    "difficulty": "medium",
    "tags": [
      "string",
      "hash"
    ],
    "description": "<p>Given an array of strings <code>strs</code>, group <strong>the anagrams</strong> together. You can return the answer in <strong>any order</strong>.</p><p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.</p><h3>Example 1:</h3><pre>Input: strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]\nOutput: [[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]\n</pre>",
    "code": "function groupAnagrams(strs: string[]): string[][] {\n  const map = new Map<string, string[]>();\n  \n  for (const str of strs) {\n    const sorted = str.split('').sort().join('');\n    if (!map.has(sorted)) {\n      map.set(sorted, []);\n    }\n    map.get(sorted)!.push(str);\n  }\n  \n  return Array.from(map.values());\n}\n\n// Time Complexity: O(N * K * log(K))\n// Space Complexity: O(N * K)"
  },
  "22": {
    "id": 22,
    "title": "Merge Intervals",
    "difficulty": "medium",
    "tags": [
      "array",
      "sorting"
    ],
    "description": "<p>Given an array of <code>intervals</code> where <code>intervals[i] = [start<sub>i</sub>, end<sub>i</sub>]</code>, merge all overlapping intervals, and return <em>an array of the non-overlapping intervals that cover all the intervals in the input</em>.</p><h3>Example 1:</h3><pre>Input: intervals = [[1,3],[2,6],[8,10],[15,18]]\nOutput: [[1,6],[8,10],[15,18]]\nExplanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].\n</pre>",
    "code": "function merge(intervals: number[][]): number[][] {\n  if (intervals.length <= 1) return intervals;\n  \n  intervals.sort((a, b) => a[0] - b[0]);\n  \n  const result: number[][] = [intervals[0]];\n  \n  for (const interval of intervals) {\n    const last = result[result.length - 1];\n    \n    if (interval[0] <= last[1]) {\n      last[1] = Math.max(last[1], interval[1]);\n    } else {\n      result.push(interval);\n    }\n  }\n  \n  return result;\n}\n\n// Time Complexity: O(n * log(n))\n// Space Complexity: O(n)"
  },
  "23": {
    "id": 23,
    "title": "Subsets",
    "difficulty": "medium",
    "tags": [
      "backtrack"
    ],
    "description": "<p>Given an integer array <code>nums</code> of <strong>unique elements</strong>, return <em>all possible subsets (the power set)</em>.</p><p>The solution set <strong>must not</strong> contain duplicate subsets. Return the solution in <strong>any order</strong>.</p><h3>Example 1:</h3><pre>Input: nums = [1,2,3]\nOutput: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]\n</pre>",
    "code": "function subsets(nums: number[]): number[][] {\n  const result: number[][] = [];\n  \n  function backtrack(start: number, path: number[]) {\n    result.push([...path]);\n    \n    for (let i = start; i < nums.length; i++) {\n      path.push(nums[i]);\n      backtrack(i + 1, path);\n      path.pop();\n    }\n  }\n  \n  backtrack(0, []);\n  return result;\n}\n\n// Time Complexity: O(2^n)\n// Space Complexity: O(n)"
  },
  "24": {
    "id": 24,
    "title": "Permutations",
    "difficulty": "medium",
    "tags": [
      "backtrack"
    ],
    "description": "<p>Given an array <code>nums</code> of distinct integers, return <em>all the possible permutations</em>. You can return the answer in <strong>any order</strong>.</p><h3>Example 1:</h3><pre>Input: nums = [1,2,3]\nOutput: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]\n</pre>",
    "code": "function permute(nums: number[]): number[][] {\n  const result: number[][] = [];\n  const used = new Array(nums.length).fill(false);\n  \n  function backtrack(path: number[]) {\n    if (path.length === nums.length) {\n      result.push([...path]);\n      return;\n    }\n    \n    for (let i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      \n      used[i] = true;\n      path.push(nums[i]);\n      backtrack(path);\n      path.pop();\n      used[i] = false;\n    }\n  }\n  \n  backtrack([]);\n  return result;\n}\n\n// Time Complexity: O(n!)\n// Space Complexity: O(n)"
  },
  "25": {
    "id": 25,
    "title": "Combination Sum",
    "difficulty": "medium",
    "tags": [
      "backtrack"
    ],
    "description": "<p>Given an array of <strong>distinct</strong> integers <code>candidates</code> and a target integer <code>target</code>, return <em>a list of all <strong>unique combinations</strong> of </em><code>candidates</code><em> where the chosen numbers sum to </em><code>target</code>.</p><p>The <strong>same</strong> number may be chosen from <code>candidates</code> an <strong>unlimited number of times</strong>.</p>",
    "code": "function combinationSum(candidates: number[], target: number): number[][] {\n  const result: number[][] = [];\n  \n  function backtrack(start: number, path: number[], remaining: number) {\n    if (remaining === 0) {\n      result.push([...path]);\n      return;\n    }\n    \n    if (remaining < 0) return;\n    \n    for (let i = start; i < candidates.length; i++) {\n      path.push(candidates[i]);\n      backtrack(i, path, remaining - candidates[i]);\n      path.pop();\n    }\n  }\n  \n  backtrack(0, [], target);\n  return result;\n}\n\n// Time Complexity: O(2^t)\n// Space Complexity: O(t)"
  },
  "26": {
    "id": 26,
    "title": "Trapping Rain Water",
    "difficulty": "hard",
    "tags": [
      "array",
      "two-pointers"
    ],
    "description": "<p>Given <code>n</code> non-negative integers representing an elevation map where the width of each bar is <code>1</code>, compute how much water it can trap after raining.</p><h3>Example 1:</h3><pre>Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\n</pre><h3>Example 2:</h3><pre>Input: height = [4,2,0,3,2,5]\nOutput: 9\n</pre>",
    "code": "function trap(height: number[]): number {\n  if (height.length === 0) return 0;\n  \n  let left = 0;\n  let right = height.length - 1;\n  let leftMax = 0;\n  let rightMax = 0;\n  let water = 0;\n  \n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) {\n        leftMax = height[left];\n      } else {\n        water += leftMax - height[left];\n      }\n      left++;\n    } else {\n      if (height[right] >= rightMax) {\n        rightMax = height[right];\n      } else {\n        water += rightMax - height[right];\n      }\n      right--;\n    }\n  }\n  \n  return water;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "27": {
    "id": 27,
    "title": "Spiral Matrix",
    "difficulty": "medium",
    "tags": [
      "array",
      "matrix"
    ],
    "description": "<p>Given an <code>m x n</code> <code>matrix</code>, return <em>all elements of the</em> <code>matrix</code> <em>in spiral order</em>.</p><h3>Example 1:</h3><pre>Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]\n</pre>",
    "code": "function spiralOrder(matrix: number[][]): number[] {\n  const result: number[] = [];\n  if (matrix.length === 0) return result;\n  \n  let top = 0;\n  let bottom = matrix.length - 1;\n  let left = 0;\n  let right = matrix[0].length - 1;\n  \n  while (top <= bottom && left <= right) {\n    // Traverse right\n    for (let i = left; i <= right; i++) {\n      result.push(matrix[top][i]);\n    }\n    top++;\n    \n    // Traverse down\n    for (let i = top; i <= bottom; i++) {\n      result.push(matrix[i][right]);\n    }\n    right--;\n    \n    // Traverse left\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) {\n        result.push(matrix[bottom][i]);\n      }\n      bottom--;\n    }\n    \n    // Traverse up\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) {\n        result.push(matrix[i][left]);\n      }\n      left++;\n    }\n  }\n  \n  return result;\n}\n\n// Time Complexity: O(m * n)\n// Space Complexity: O(1)"
  },
  "28": {
    "id": 28,
    "title": "Rotate Image",
    "difficulty": "medium",
    "tags": [
      "array",
      "matrix"
    ],
    "description": "<p>You are given an <code>n x n</code> 2D <code>matrix</code> representing an image, rotate the image by <strong>90</strong> degrees (clockwise).</p><p>You have to rotate the image <strong><a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\" rel=\"noopener noreferrer\">in-place</a></strong>.</p>",
    "code": "function rotate(matrix: number[][]): void {\n  const n = matrix.length;\n  \n  // Transpose\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  \n  // Reverse each row\n  for (let i = 0; i < n; i++) {\n    matrix[i].reverse();\n  }\n}\n\n// Time Complexity: O(n^2)\n// Space Complexity: O(1)"
  },
  "29": {
    "id": 29,
    "title": "Jump Game",
    "difficulty": "medium",
    "tags": [
      "array",
      "dp",
      "greedy"
    ],
    "description": "<p>You are given an integer array <code>nums</code>. You are initially positioned at the array's <strong>first index</strong>, and each element in the array represents your maximum jump length at that position.</p><p>Return <code>true</code><em> if you can reach the last index, or </em><code>false</code><em> otherwise</em>.</p><h3>Example 1:</h3><pre>Input: nums = [2,3,1,1,4]\nOutput: true\nExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.\n</pre>",
    "code": "function canJump(nums: number[]): boolean {\n  let maxReach = 0;\n  \n  for (let i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n  }\n  \n  return true;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "30": {
    "id": 30,
    "title": "Longest Palindromic Substring",
    "difficulty": "medium",
    "tags": [
      "string",
      "dp"
    ],
    "description": "<p>Given a string <code>s</code>, return <em>the longest palindromic substring</em> in <code>s</code>.</p><h3>Example 1:</h3><pre>Input: s = \"babad\"\nOutput: \"bab\"\nExplanation: \"aba\" is also a valid answer.\n</pre><h3>Example 2:</h3><pre>Input: s = \"cbbd\"\nOutput: \"bb\"\n</pre>",
    "code": "function longestPalindrome(s: string): string {\n  if (s.length === 0) return '';\n  \n  let start = 0;\n  let maxLen = 0;\n  \n  function expandAroundCenter(left: number, right: number): number {\n    while (left >= 0 && right < s.length && s[left] === s[right]) {\n      left--;\n      right++;\n    }\n    return right - left - 1;\n  }\n  \n  for (let i = 0; i < s.length; i++) {\n    const len1 = expandAroundCenter(i, i);\n    const len2 = expandAroundCenter(i, i + 1);\n    const len = Math.max(len1, len2);\n    \n    if (len > maxLen) {\n      start = i - Math.floor((len - 1) / 2);\n      maxLen = len;\n    }\n  }\n  \n  return s.substring(start, start + maxLen);\n}\n\n// Time Complexity: O(n^2)\n// Space Complexity: O(1)"
  },
  "31": {
    "id": 31,
    "title": "Unique Paths",
    "difficulty": "medium",
    "tags": [
      "dp"
    ],
    "description": "<p>There is a robot on an <code>m x n</code> grid. The robot is initially located at the <strong>top-left corner</strong>. The robot tries to move to the <strong>bottom-right corner</strong>. The robot can only move either down or right at any point in time.</p><p>Given the two integers <code>m</code> and <code>n</code>, return <em>the number of possible unique paths</em>.</p>",
    "code": "function uniquePaths(m: number, n: number): number {\n  const dp: number[][] = Array.from({ length: m }, () => new Array(n).fill(1));\n  \n  for (let i = 1; i < m; i++) {\n    for (let j = 1; j < n; j++) {\n      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];\n    }\n  }\n  \n  return dp[m - 1][n - 1];\n}\n\n// Time Complexity: O(m * n)\n// Space Complexity: O(m * n)"
  },
  "32": {
    "id": 32,
    "title": "House Robber",
    "difficulty": "medium",
    "tags": [
      "dp"
    ],
    "description": "<p>You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and <strong>it will automatically contact the police if two adjacent houses were broken into on the same night</strong>.</p><p>Given an integer array <code>nums</code> representing the amount of money of each house, return <em>the maximum amount of money you can rob tonight <strong>without alerting the police</strong></em>.</p>",
    "code": "function rob(nums: number[]): number {\n  if (nums.length === 0) return 0;\n  if (nums.length === 1) return nums[0];\n  \n  let prev1 = 0;\n  let prev2 = 0;\n  \n  for (const num of nums) {\n    const current = Math.max(prev1, prev2 + num);\n    prev2 = prev1;\n    prev1 = current;\n  }\n  \n  return prev1;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "33": {
    "id": 33,
    "title": "Word Search",
    "difficulty": "medium",
    "tags": [
      "backtrack",
      "matrix"
    ],
    "description": "<p>Given an <code>m x n</code> grid of characters <code>board</code> and a string <code>word</code>, return <code>true</code> <em>if</em> <code>word</code> <em>exists in the grid</em>.</p><p>The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring.</p>",
    "code": "function exist(board: string[][], word: string): boolean {\n  const m = board.length;\n  const n = board[0].length;\n  const visited: boolean[][] = Array.from({ length: m }, () => new Array(n).fill(false));\n  \n  function backtrack(row: number, col: number, index: number): boolean {\n    if (index === word.length) return true;\n    \n    if (row < 0 || row >= m || col < 0 || col >= n || \n        visited[row][col] || board[row][col] !== word[index]) {\n      return false;\n    }\n    \n    visited[row][col] = true;\n    \n    const found = backtrack(row + 1, col, index + 1) ||\n                  backtrack(row - 1, col, index + 1) ||\n                  backtrack(row, col + 1, index + 1) ||\n                  backtrack(row, col - 1, index + 1);\n    \n    visited[row][col] = false;\n    return found;\n  }\n  \n  for (let i = 0; i < m; i++) {\n    for (let j = 0; j < n; j++) {\n      if (backtrack(i, j, 0)) return true;\n    }\n  }\n  \n  return false;\n}\n\n// Time Complexity: O(m * n * 4^L)\n// Space Complexity: O(L)"
  },
  "34": {
    "id": 34,
    "title": "Number of Islands",
    "difficulty": "medium",
    "tags": [
      "graph",
      "dfs",
      "bfs"
    ],
    "description": "<p>Given an <code>m x n</code> 2D binary grid <code>grid</code> which represents a map of <code>'1'</code>s (land) and <code>'0'</code>s (water), return <em>the number of islands</em>.</p><p>An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.</p>",
    "code": "function numIslands(grid: string[][]): number {\n  if (!grid || grid.length === 0) return 0;\n  \n  const m = grid.length;\n  const n = grid[0].length;\n  let count = 0;\n  \n  function dfs(row: number, col: number) {\n    if (row < 0 || row >= m || col < 0 || col >= n || grid[row][col] === '0') {\n      return;\n    }\n    \n    grid[row][col] = '0';\n    dfs(row + 1, col);\n    dfs(row - 1, col);\n    dfs(row, col + 1);\n    dfs(row, col - 1);\n  }\n  \n  for (let i = 0; i < m; i++) {\n    for (let j = 0; j < n; j++) {\n      if (grid[i][j] === '1') {\n        count++;\n        dfs(i, j);\n      }\n    }\n  }\n  \n  return count;\n}\n\n// Time Complexity: O(m * n)\n// Space Complexity: O(m * n)"
  },
  "35": {
    "id": 35,
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "medium",
    "tags": [
      "array",
      "binary-search"
    ],
    "description": "<p>Given an array of integers <code>nums</code> sorted in non-decreasing order, find the starting and ending position of a given <code>target</code> value.</p><p>If <code>target</code> is not found in the array, return <code>[-1, -1]</code>.</p><p>You must write an algorithm with <code>O(log n)</code> runtime complexity.</p>",
    "code": "function searchRange(nums: number[], target: number): number[] {\n  function findBound(isFirst: boolean): number {\n    let left = 0;\n    let right = nums.length - 1;\n    let bound = -1;\n    \n    while (left <= right) {\n      const mid = Math.floor((left + right) / 2);\n      \n      if (nums[mid] === target) {\n        bound = mid;\n        if (isFirst) {\n          right = mid - 1;\n        } else {\n          left = mid + 1;\n        }\n      } else if (nums[mid] < target) {\n        left = mid + 1;\n      } else {\n        right = mid - 1;\n      }\n    }\n    \n    return bound;\n  }\n  \n  return [findBound(true), findBound(false)];\n}\n\n// Time Complexity: O(log n)\n// Space Complexity: O(1)"
  },
  "36": {
    "id": 36,
    "title": "Count Complete Tree Nodes",
    "difficulty": "medium",
    "tags": [
      "tree",
      "binary-search"
    ],
    "description": "<p>Given the <code>root</code> of a <strong>complete</strong> binary tree, return the number of the nodes in the tree.</p><p>A <strong>complete</strong> binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes in the last level are as far left as possible.</p>",
    "code": "class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  \n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\nfunction countNodes(root: TreeNode | null): number {\n  if (!root) return 0;\n  \n  function getHeight(node: TreeNode | null, goLeft: boolean): number {\n    let height = 0;\n    while (node) {\n      height++;\n      node = goLeft ? node.left : node.right;\n    }\n    return height;\n  }\n  \n  const leftHeight = getHeight(root, true);\n  const rightHeight = getHeight(root, false);\n  \n  if (leftHeight === rightHeight) {\n    return (1 << leftHeight) - 1;\n  }\n  \n  return 1 + countNodes(root.left) + countNodes(root.right);\n}\n\n// Time Complexity: O(log^2 n)\n// Space Complexity: O(log n)"
  },
  "37": {
    "id": 37,
    "title": "Reverse Words in a String",
    "difficulty": "medium",
    "tags": [
      "string"
    ],
    "description": "<p>Given an input string <code>s</code>, reverse the order of the <strong>words</strong>.</p><p>A <strong>word</strong> is defined as a sequence of non-space characters. The words in <code>s</code> will be separated by at least one space.</p><p>Return <em>a string of the words in reverse order concatenated by a single space.</em></p>",
    "code": "function reverseWords(s: string): string {\n  return s\n    .trim()\n    .split(/\\s+/)\n    .reverse()\n    .join(' ');\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(n)"
  },
  "38": {
    "id": 38,
    "title": "Course Schedule",
    "difficulty": "medium",
    "tags": [
      "graph",
      "dfs",
      "bfs"
    ],
    "description": "<p>There are a total of <code>numCourses</code> courses you have to take, labeled from <code>0</code> to <code>numCourses - 1</code>. You are given an array <code>prerequisites</code> where <code>prerequisites[i] = [a<sub>i</sub>, b<sub>i</sub>]</code> indicates that you <strong>must</strong> take course <code>b<sub>i</sub></code> first if you want to take course <code>a<sub>i</sub></code>.</p><p>Return <code>true</code> if you can finish all courses. Otherwise, return <code>false</code>.</p>",
    "code": "function canFinish(numCourses: number, prerequisites: number[][]): boolean {\n  const graph: number[][] = Array.from({ length: numCourses }, () => []);\n  const visited: number[] = new Array(numCourses).fill(0);\n  \n  for (const [course, prereq] of prerequisites) {\n    graph[prereq].push(course);\n  }\n  \n  function dfs(course: number): boolean {\n    if (visited[course] === 1) return false; // Cycle detected\n    if (visited[course] === 2) return true;  // Already processed\n    \n    visited[course] = 1; // Mark as visiting\n    \n    for (const neighbor of graph[course]) {\n      if (!dfs(neighbor)) return false;\n    }\n    \n    visited[course] = 2; // Mark as visited\n    return true;\n  }\n  \n  for (let i = 0; i < numCourses; i++) {\n    if (!dfs(i)) return false;\n  }\n  \n  return true;\n}\n\n// Time Complexity: O(V + E)\n// Space Complexity: O(V + E)"
  },
  "39": {
    "id": 39,
    "title": "Longest Consecutive Sequence",
    "difficulty": "medium",
    "tags": [
      "array",
      "hash"
    ],
    "description": "<p>Given an unsorted array of integers <code>nums</code>, return <em>the length of the longest consecutive elements sequence</em>.</p><p>You must write an algorithm that runs in <code>O(n)</code> time.</p><h3>Example 1:</h3><pre>Input: nums = [100,4,200,1,3,2]\nOutput: 4\nExplanation: The longest consecutive elements sequence is [1, 2, 3, 4].\n</pre>",
    "code": "function longestConsecutive(nums: number[]): number {\n  if (nums.length === 0) return 0;\n  \n  const numSet = new Set(nums);\n  let maxLength = 0;\n  \n  for (const num of numSet) {\n    // Only start counting if this is the beginning of a sequence\n    if (!numSet.has(num - 1)) {\n      let currentNum = num;\n      let currentLength = 1;\n      \n      while (numSet.has(currentNum + 1)) {\n        currentNum++;\n        currentLength++;\n      }\n      \n      maxLength = Math.max(maxLength, currentLength);\n    }\n  }\n  \n  return maxLength;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(n)"
  },
  "40": {
    "id": 40,
    "title": "Find Peak Element",
    "difficulty": "medium",
    "tags": [
      "array",
      "binary-search"
    ],
    "description": "<p>A peak element is an element that is strictly greater than its neighbors.</p><p>Given a <strong>0-indexed</strong> integer array <code>nums</code>, find a peak element, and return its index. If the array contains multiple peaks, return the index to <strong>any of the peaks</strong>.</p><p>You may imagine that <code>nums[-1] = nums[n] = -∞</code>.</p>",
    "code": "function findPeakElement(nums: number[]): number {\n  let left = 0;\n  let right = nums.length - 1;\n  \n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (nums[mid] > nums[mid + 1]) {\n      // Peak is in the left half (including mid)\n      right = mid;\n    } else {\n      // Peak is in the right half\n      left = mid + 1;\n    }\n  }\n  \n  return left;\n}\n\n// Time Complexity: O(log n)\n// Space Complexity: O(1)"
  },
  "41": {
    "id": 41,
    "title": "Minimum Path Sum",
    "difficulty": "medium",
    "tags": [
      "dp"
    ],
    "description": "<p>Given a <code>m x n</code> <code>grid</code> filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path.</p><p><strong>Note:</strong> You can only move either down or right at any point in time.</p>",
    "code": "function minPathSum(grid: number[][]): number {\n  const m = grid.length;\n  const n = grid[0].length;\n  \n  for (let i = 0; i < m; i++) {\n    for (let j = 0; j < n; j++) {\n      if (i === 0 && j === 0) continue;\n      else if (i === 0) grid[i][j] += grid[i][j - 1];\n      else if (j === 0) grid[i][j] += grid[i - 1][j];\n      else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);\n    }\n  }\n  \n  return grid[m - 1][n - 1];\n}\n\n// Time Complexity: O(m * n)\n// Space Complexity: O(1)"
  },
  "42": {
    "id": 42,
    "title": "Kth Largest Element in an Array",
    "difficulty": "medium",
    "tags": [
      "array",
      "sorting",
      "heap"
    ],
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the</em> <code>k<sup>th</sup></code> <em>largest element in the array</em>.</p><p>Note that it is the k<sup>th</sup> largest element in the sorted order, not the k<sup>th</sup> distinct element.</p><p>You must write an algorithm with <code>O(n)</code> time complexity.</p>",
    "code": "function findKthLargest(nums: number[], k: number): number {\n  function partition(left: number, right: number, pivotIndex: number): number {\n    const pivot = nums[pivotIndex];\n    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];\n    \n    let storeIndex = left;\n    for (let i = left; i < right; i++) {\n      if (nums[i] > pivot) {\n        [nums[storeIndex], nums[i]] = [nums[i], nums[storeIndex]];\n        storeIndex++;\n      }\n    }\n    \n    [nums[right], nums[storeIndex]] = [nums[storeIndex], nums[right]];\n    return storeIndex;\n  }\n  \n  function quickSelect(left: number, right: number): number {\n    if (left === right) return nums[left];\n    \n    const pivotIndex = Math.floor((left + right) / 2);\n    const partitionIndex = partition(left, right, pivotIndex);\n    \n    if (partitionIndex === k - 1) return nums[partitionIndex];\n    else if (partitionIndex < k - 1) return quickSelect(partitionIndex + 1, right);\n    else return quickSelect(left, partitionIndex - 1);\n  }\n  \n  return quickSelect(0, nums.length - 1);\n}\n\n// Time Complexity: O(n) average\n// Space Complexity: O(1)"
  },
  "43": {
    "id": 43,
    "title": "Top K Frequent Elements",
    "difficulty": "medium",
    "tags": [
      "hash",
      "heap"
    ],
    "description": "<p>Given an integer array <code>nums</code> and an integer <code>k</code>, return <em>the</em> <code>k</code> <em>most frequent elements</em>. You may return the answer in <strong>any order</strong>.</p><h3>Example 1:</h3><pre>Input: nums = [1,1,1,2,2,3], k = 2\nOutput: [1,2]\n</pre>",
    "code": "function topKFrequent(nums: number[], k: number): number[] {\n  const freq = new Map<number, number>();\n  \n  for (const num of nums) {\n    freq.set(num, (freq.get(num) || 0) + 1);\n  }\n  \n  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);\n  \n  for (const [num, count] of freq.entries()) {\n    buckets[count].push(num);\n  }\n  \n  const result: number[] = [];\n  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {\n    result.push(...buckets[i]);\n  }\n  \n  return result.slice(0, k);\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(n)"
  },
  "44": {
    "id": 44,
    "title": "Find All Anagrams in a String",
    "difficulty": "medium",
    "tags": [
      "string",
      "sliding-window"
    ],
    "description": "<p>Given two strings <code>s</code> and <code>p</code>, return <em>an array of all the start indices of </em><code>p</code><em>'s anagrams in </em><code>s</code>. You may return the answer in <strong>any order</strong>.</p><p>An <strong>Anagram</strong> is a word or phrase formed by rearranging the letters of a different word or phrase, using all the original letters exactly once.</p>",
    "code": "function findAnagrams(s: string, p: string): number[] {\n  const result: number[] = [];\n  if (p.length > s.length) return result;\n  \n  const pCount = new Map<string, number>();\n  const windowCount = new Map<string, number>();\n  \n  for (const char of p) {\n    pCount.set(char, (pCount.get(char) || 0) + 1);\n  }\n  \n  let left = 0;\n  \n  for (let right = 0; right < s.length; right++) {\n    const rightChar = s[right];\n    windowCount.set(rightChar, (windowCount.get(rightChar) || 0) + 1);\n    \n    if (right >= p.length) {\n      const leftChar = s[left];\n      const count = windowCount.get(leftChar)!;\n      if (count === 1) windowCount.delete(leftChar);\n      else windowCount.set(leftChar, count - 1);\n      left++;\n    }\n    \n    if (mapsEqual(pCount, windowCount)) {\n      result.push(left);\n    }\n  }\n  \n  return result;\n}\n\nfunction mapsEqual(a: Map<string, number>, b: Map<string, number>): boolean {\n  if (a.size !== b.size) return false;\n  for (const [key, val] of a.entries()) {\n    if (b.get(key) !== val) return false;\n  }\n  return true;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "45": {
    "id": 45,
    "title": "Sort Colors",
    "difficulty": "medium",
    "tags": [
      "array",
      "sorting",
      "two-pointers"
    ],
    "description": "<p>Given an array <code>nums</code> with <code>n</code> objects colored red, white, or blue, sort them <strong><a href=\"https://en.wikipedia.org/wiki/In-place_algorithm\" target=\"_blank\" rel=\"noopener noreferrer\">in-place</a></strong> so that objects of the same color are adjacent, with the colors in the order red, white, and blue.</p><p>We will use the integers <code>0</code>, <code>1</code>, and <code>2</code> to represent the color red, white, and blue, respectively.</p>",
    "code": "function sortColors(nums: number[]): void {\n  let low = 0;\n  let mid = 0;\n  let high = nums.length - 1;\n  \n  while (mid <= high) {\n    if (nums[mid] === 0) {\n      [nums[low], nums[mid]] = [nums[mid], nums[low]];\n      low++;\n      mid++;\n    } else if (nums[mid] === 1) {\n      mid++;\n    } else {\n      [nums[mid], nums[high]] = [nums[high], nums[mid]];\n      high--;\n    }\n  }\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "46": {
    "id": 46,
    "title": "Remove Nth Node From End of List",
    "difficulty": "medium",
    "tags": [
      "linked-list",
      "two-pointers"
    ],
    "description": "<p>Given the <code>head</code> of a linked list, remove the <code>n<sup>th</sup></code> node from the end of the list and return its head.</p><h3>Example 1:</h3><pre>Input: head = [1,2,3,4,5], n = 2\nOutput: [1,2,3,5]\n</pre><h3>Example 2:</h3><pre>Input: head = [1], n = 1\nOutput: []\n</pre>",
    "code": "class ListNode {\n  val: number;\n  next: ListNode | null;\n  \n  constructor(val?: number, next?: ListNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.next = (next === undefined ? null : next);\n  }\n}\n\nfunction removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {\n  const dummy = new ListNode(0, head);\n  let slow: ListNode | null = dummy;\n  let fast: ListNode | null = dummy;\n  \n  for (let i = 0; i <= n; i++) {\n    fast = fast!.next;\n  }\n  \n  while (fast !== null) {\n    slow = slow!.next;\n    fast = fast.next;\n  }\n  \n  slow!.next = slow!.next!.next;\n  return dummy.next;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "47": {
    "id": 47,
    "title": "Subtree of Another Tree",
    "difficulty": "easy",
    "tags": [
      "tree"
    ],
    "description": "<p>Given the roots of two binary trees <code>root</code> and <code>subRoot</code>, return <code>true</code> if there is a subtree of <code>root</code> with the same structure and node values of <code>subRoot</code> and <code>false</code> otherwise.</p><p>A subtree of a binary tree <code>tree</code> is a tree that consists of a node in <code>tree</code> and all of this node's descendants.</p>",
    "code": "class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  \n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\nfunction isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {\n  if (!root) return false;\n  if (isSameTree(root, subRoot)) return true;\n  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);\n}\n\nfunction isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {\n  if (!p && !q) return true;\n  if (!p || !q) return false;\n  if (p.val !== q.val) return false;\n  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);\n}\n\n// Time Complexity: O(m * n)\n// Space Complexity: O(h)"
  },
  "48": {
    "id": 48,
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "hard",
    "tags": [
      "tree"
    ],
    "description": "<p>Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.</p><p>Design an algorithm to serialize and deserialize a binary tree.</p>",
    "code": "class TreeNode {\n  val: number;\n  left: TreeNode | null;\n  right: TreeNode | null;\n  \n  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {\n    this.val = (val === undefined ? 0 : val);\n    this.left = (left === undefined ? null : left);\n    this.right = (right === undefined ? null : right);\n  }\n}\n\nfunction serialize(root: TreeNode | null): string {\n  const result: string[] = [];\n  \n  function dfs(node: TreeNode | null) {\n    if (!node) {\n      result.push('null');\n      return;\n    }\n    result.push(String(node.val));\n    dfs(node.left);\n    dfs(node.right);\n  }\n  \n  dfs(root);\n  return result.join(',');\n}\n\nfunction deserialize(data: string): TreeNode | null {\n  const nodes = data.split(',');\n  let index = 0;\n  \n  function dfs(): TreeNode | null {\n    if (nodes[index] === 'null') {\n      index++;\n      return null;\n    }\n    \n    const node = new TreeNode(Number(nodes[index]));\n    index++;\n    node.left = dfs();\n    node.right = dfs();\n    return node;\n  }\n  \n  return dfs();\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(n)"
  },
  "49": {
    "id": 49,
    "title": "Find the Duplicate Number",
    "difficulty": "medium",
    "tags": [
      "array",
      "two-pointers",
      "binary-search"
    ],
    "description": "<p>Given an array of integers <code>nums</code> containing <code>n + 1</code> integers where each integer is in the range <code>[1, n]</code> inclusive.</p><p>There is only <strong>one repeated number</strong> in <code>nums</code>, return <em>this repeated number</em>.</p><p>You must solve the problem <strong>without</strong> modifying the array <code>nums</code> and uses only constant extra space.</p>",
    "code": "function findDuplicate(nums: number[]): number {\n  // Floyd's Tortoise and Hare (Cycle Detection)\n  let slow = nums[0];\n  let fast = nums[0];\n  \n  do {\n    slow = nums[slow];\n    fast = nums[nums[fast]];\n  } while (slow !== fast);\n  \n  slow = nums[0];\n  while (slow !== fast) {\n    slow = nums[slow];\n    fast = nums[fast];\n  }\n  \n  return slow;\n}\n\n// Time Complexity: O(n)\n// Space Complexity: O(1)"
  },
  "50": {
    "id": 50,
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "medium",
    "tags": [
      "array",
      "binary-search"
    ],
    "description": "<p>Suppose an array of length <code>n</code> sorted in ascending order is <strong>rotated</strong> between <code>1</code> and <code>n</code> times.</p><p>Given the sorted rotated array <code>nums</code> of unique elements, return <em>the minimum element of this array</em>.</p><p>You must write an algorithm that runs in <code>O(log n)</code> time.</p>",
    "code": "function findMin(nums: number[]): number {\n  let left = 0;\n  let right = nums.length - 1;\n  \n  while (left < right) {\n    const mid = Math.floor((left + right) / 2);\n    \n    if (nums[mid] > nums[right]) {\n      // Minimum is in the right half\n      left = mid + 1;\n    } else {\n      // Minimum is in the left half (including mid)\n      right = mid;\n    }\n  }\n  \n  return nums[left];\n}\n\n// Time Complexity: O(log n)\n// Space Complexity: O(1)"
  }
};