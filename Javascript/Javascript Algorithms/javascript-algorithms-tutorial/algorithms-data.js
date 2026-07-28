const ALGO_DATA = {
    "leetcode": [
        {
            "title": "Two Sum",
            "desc": "Find two numbers such that they add up to a specific target.",
            "code": "function twoSum(nums, target) {\n  const prevMap = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const diff = target - nums[i];\n    if (prevMap.has(diff)) {\n      return [prevMap.get(diff), i];\n    }\n    prevMap.set(nums[i], i);\n  }\n  return [];\n}"
        },
        {
            "title": "Reverse Linked List",
            "desc": "Reverse a singly linked list.",
            "code": "function reverseList(head) {\n  let prev = null;\n  let curr = head;\n  while (curr) {\n    const nxt = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = nxt;\n  }\n  return prev;\n}"
        },
        {
            "title": "Valid Parentheses",
            "desc": "Determine if the input string has valid brackets.",
            "code": "function isValid(s) {\n  const map = { ')': '(', ']': '[', '}': '{' };\n  const stack = [];\n  for (const c of s) {\n    if (!(c in map)) {\n      stack.push(c);\n      continue;\n    }\n    if (!stack.length || stack[stack.length - 1] !== map[c]) {\n      return false;\n    }\n    stack.pop();\n  }\n  return stack.length === 0;\n}"
        },
        {
            "title": "Best Time to Buy and Sell Stock",
            "desc": "Maximize profit from one transaction.",
            "code": "function maxProfit(prices) {\n  let res = 0;\n  let lowest = prices[0];\n  for (const price of prices) {\n    if (price < lowest) {\n      lowest = price;\n    }\n    res = Math.max(res, price - lowest);\n  }\n  return res;\n}"
        },
        {
            "title": "Merge Two Sorted Lists",
            "desc": "Merge two sorted linked lists into one.",
            "code": "function mergeTwoLists(l1, l2) {\n  const dummy = { val: 0, next: null };\n  let tail = dummy;\n  while (l1 && l2) {\n    if (l1.val < l2.val) {\n      tail.next = l1;\n      l1 = l1.next;\n    } else {\n      tail.next = l2;\n      l2 = l2.next;\n    }\n    tail = tail.next;\n  }\n  tail.next = l1 || l2;\n  return dummy.next;\n}"
        },
        {
            "title": "Longest Substring Without Repeating Characters",
            "desc": "Find the length of the longest substring without repeating characters.",
            "code": "function lengthOfLongestSubstring(s) {\n  const charSet = new Set();\n  let l = 0;\n  let res = 0;\n  for (let r = 0; r < s.length; r++) {\n    while (charSet.has(s[r])) {\n      charSet.delete(s[l]);\n      l++;\n    }\n    charSet.add(s[r]);\n    res = Math.max(res, r - l + 1);\n  }\n  return res;\n}"
        },
        {
            "title": "Container With Most Water",
            "desc": "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
            "code": "function maxArea(height) {\n  let l = 0;\n  let r = height.length - 1;\n  let res = 0;\n  while (l < r) {\n    res = Math.max(res, Math.min(height[l], height[r]) * (r - l));\n    if (height[l] < height[r]) {\n      l++;\n    } else {\n      r--;\n    }\n  }\n  return res;\n}"
        },
        {
            "title": "Add Two Numbers",
            "desc": "Add two numbers represented by linked lists.",
            "code": "function addTwoNumbers(l1, l2) {\n  const dummy = { val: 0, next: null };\n  let curr = dummy;\n  let carry = 0;\n  while (l1 || l2 || carry) {\n    const v1 = l1 ? l1.val : 0;\n    const v2 = l2 ? l2.val : 0;\n    const val = v1 + v2 + carry;\n    carry = Math.floor(val / 10);\n    curr.next = { val: val % 10, next: null };\n    curr = curr.next;\n    l1 = l1 ? l1.next : null;\n    l2 = l2 ? l2.next : null;\n  }\n  return dummy.next;\n}"
        },
        {
            "title": "Rotate Array",
            "desc": "Rotate an array to the right by k steps.",
            "code": "function rotate(nums, k) {\n  k = k % nums.length;\n  const reverse = (arr, start, end) => {\n    while (start < end) {\n      [arr[start], arr[end]] = [arr[end], arr[start]];\n      start++;\n      end--;\n    }\n  };\n  reverse(nums, 0, nums.length - 1);\n  reverse(nums, 0, k - 1);\n  reverse(nums, k, nums.length - 1);\n}"
        },
        {
            "title": "Remove Duplicates from Sorted Array",
            "desc": "Remove duplicates in-place from a sorted array.",
            "code": "function removeDuplicates(nums) {\n  if (!nums.length) return 0;\n  let l = 1;\n  for (let r = 1; r < nums.length; r++) {\n    if (nums[r] !== nums[r - 1]) {\n      nums[l] = nums[r];\n      l++;\n    }\n  }\n  return l;\n}"
        },
        {
            "title": "Search in Rotated Sorted Array",
            "desc": "Find the index of a target value in a rotated sorted array.",
            "code": "function search(nums, target) {\n  let l = 0;\n  let r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (target === nums[mid]) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (target > nums[mid] || target < nums[l]) {\n        l = mid + 1;\n      } else {\n        r = mid - 1;\n      }\n    } else {\n      if (target < nums[mid] || target > nums[r]) {\n        r = mid - 1;\n      } else {\n        l = mid + 1;\n      }\n    }\n  }\n  return -1;\n}"
        },
        {
            "title": "Longest Increasing Subsequence",
            "desc": "Find the length of the longest strictly increasing subsequence.",
            "code": "function lengthOfLIS(nums) {\n  const LIS = new Array(nums.length).fill(1);\n  for (let i = nums.length - 1; i >= 0; i--) {\n    for (let j = i + 1; j < nums.length; j++) {\n      if (nums[i] < nums[j]) {\n        LIS[i] = Math.max(LIS[i], 1 + LIS[j]);\n      }\n    }\n  }\n  return Math.max(...LIS);\n}"
        },
        {
            "title": "Binary Tree Inorder Traversal",
            "desc": "Return the inorder traversal of a binary tree's nodes' values.",
            "code": "function inorderTraversal(root) {\n  const res = [];\n  function helper(node) {\n    if (!node) return;\n    helper(node.left);\n    res.push(node.val);\n    helper(node.right);\n  }\n  helper(root);\n  return res;\n}"
        },
        {
            "title": "Validate Binary Search Tree",
            "desc": "Determine if a binary tree is a valid binary search tree (BST).",
            "code": "function isValidBST(root) {\n  function valid(node, left, right) {\n    if (!node) return true;\n    if (!(node.val < right && node.val > left)) return false;\n    return valid(node.left, left, node.val) && valid(node.right, node.val, right);\n  }\n  return valid(root, -Infinity, Infinity);\n}"
        },
        {
            "title": "Lowest Common Ancestor of a Binary Tree",
            "desc": "Find the lowest common ancestor node of two given nodes in a binary tree.",
            "code": "function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  if (left && right) return root;\n  return left || right;\n}"
        },
        {
            "title": "Path Sum",
            "desc": "Determine if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.",
            "code": "function hasPathSum(root, targetSum) {\n  if (!root) return false;\n  if (!root.left && !root.right) return targetSum === root.val;\n  return hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);\n}"
        },
        {
            "title": "Maximum Subarray",
            "desc": "Find the contiguous subarray which has the largest sum.",
            "code": "function maxSubArray(nums) {\n  let maxSub = nums[0];\n  let curSum = 0;\n  for (const n of nums) {\n    if (curSum < 0) curSum = 0;\n    curSum += n;\n    maxSub = Math.max(maxSub, curSum);\n  }\n  return maxSub;\n}"
        },
        {
            "title": "Climbing Stairs",
            "desc": "Find the number of distinct ways to climb n stairs.",
            "code": "function climbStairs(n) {\n  let one = 1;\n  let two = 1;\n  for (let i = 0; i < n - 1; i++) {\n    const temp = one;\n    one = one + two;\n    two = temp;\n  }\n  return one;\n}"
        },
        {
            "title": "Word Break",
            "desc": "Determine if a string can be segmented into a space-separated sequence of dictionary words.",
            "code": "function wordBreak(s, wordDict) {\n  const dp = new Array(s.length + 1).fill(false);\n  dp[s.length] = true;\n  for (let i = s.length - 1; i >= 0; i--) {\n    for (const w of wordDict) {\n      if (i + w.length <= s.length && s.slice(i, i + w.length) === w) {\n        dp[i] = dp[i + w.length];\n      }\n      if (dp[i]) break;\n    }\n  }\n  return dp[0];\n}"
        },
        {
            "title": "Word Ladder",
            "desc": "Find the length of the shortest transformation sequence from beginWord to endWord.",
            "code": "function ladderLength(beginWord, endWord, wordList) {\n  if (!wordList.includes(endWord)) return 0;\n  const nei = new Map();\n  wordList.push(beginWord);\n  for (const word of wordList) {\n    for (let j = 0; j < word.length; j++) {\n      const pattern = word.slice(0, j) + '*' + word.slice(j + 1);\n      if (!nei.has(pattern)) nei.set(pattern, []);\n      nei.get(pattern).push(word);\n    }\n  }\n  const visit = new Set([beginWord]);\n  const q = [beginWord];\n  let res = 1;\n  while (q.length) {\n    const len = q.length;\n    for (let i = 0; i < len; i++) {\n      const word = q.shift();\n      if (word === endWord) return res;\n      for (let j = 0; j < word.length; j++) {\n        const pattern = word.slice(0, j) + '*' + word.slice(j + 1);\n        for (const neighbor of (nei.get(pattern) || [])) {\n          if (!visit.has(neighbor)) {\n            visit.add(neighbor);\n            q.push(neighbor);\n          }\n        }\n      }\n    }\n    res++;\n  }\n  return 0;\n}"
        },
        {
            "title": "Group Anagrams",
            "desc": "Group strings that are anagrams of each other.",
            "code": "function groupAnagrams(strs) {\n  const res = new Map();\n  for (const s of strs) {\n    const count = new Array(26).fill(0);\n    for (const c of s) {\n      count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;\n    }\n    const key = count.join(',');\n    if (!res.has(key)) res.set(key, []);\n    res.get(key).push(s);\n  }\n  return Array.from(res.values());\n}"
        },
        {
            "title": "Merge Intervals",
            "desc": "Merge all overlapping intervals.",
            "code": "function merge(intervals) {\n  intervals.sort((a, b) => a[0] - b[0]);\n  const output = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const [start, end] = intervals[i];\n    const lastEnd = output[output.length - 1][1];\n    if (start <= lastEnd) {\n      output[output.length - 1][1] = Math.max(lastEnd, end);\n    } else {\n      output.push([start, end]);\n    }\n  }\n  return output;\n}"
        },
        {
            "title": "Subsets",
            "desc": "Return all possible subsets (the power set).",
            "code": "function subsets(nums) {\n  const res = [];\n  const subset = [];\n  function dfs(i) {\n    if (i >= nums.length) {\n      res.push([...subset]);\n      return;\n    }\n    subset.push(nums[i]);\n    dfs(i + 1);\n    subset.pop();\n    dfs(i + 1);\n  }\n  dfs(0);\n  return res;\n}"
        },
        {
            "title": "Permutations",
            "desc": "Return all possible permutations of a list of distinct integers.",
            "code": "function permute(nums) {\n  const res = [];\n  if (nums.length === 1) return [[...nums]];\n  for (let i = 0; i < nums.length; i++) {\n    const n = nums.shift();\n    const perms = permute(nums);\n    for (const p of perms) {\n      p.push(n);\n    }\n    res.push(...perms);\n    nums.push(n);\n  }\n  return res;\n}"
        },
        {
            "title": "Combination Sum",
            "desc": "Return a list of all unique combinations where the chosen numbers sum to target.",
            "code": "function combinationSum(candidates, target) {\n  const res = [];\n  function dfs(i, cur, total) {\n    if (total === target) {\n      res.push([...cur]);\n      return;\n    }\n    if (i >= candidates.length || total > target) return;\n    cur.push(candidates[i]);\n    dfs(i, cur, total + candidates[i]);\n    cur.pop();\n    dfs(i + 1, cur, total);\n  }\n  dfs(0, [], 0);\n  return res;\n}"
        },
        {
            "title": "Trapping Rain Water",
            "desc": "Compute how much water it can trap after raining.",
            "code": "function trap(height) {\n  if (!height.length) return 0;\n  let l = 0;\n  let r = height.length - 1;\n  let leftMax = height[l];\n  let rightMax = height[r];\n  let res = 0;\n  while (l < r) {\n    if (leftMax < rightMax) {\n      l++;\n      leftMax = Math.max(leftMax, height[l]);\n      res += leftMax - height[l];\n    } else {\n      r--;\n      rightMax = Math.max(rightMax, height[r]);\n      res += rightMax - height[r];\n    }\n  }\n  return res;\n}"
        },
        {
            "title": "Spiral Matrix",
            "desc": "Return all elements of the matrix in spiral order.",
            "code": "function spiralOrder(matrix) {\n  const res = [];\n  let left = 0;\n  let right = matrix[0].length;\n  let top = 0;\n  let bottom = matrix.length;\n  while (left < right && top < bottom) {\n    for (let i = left; i < right; i++) res.push(matrix[top][i]);\n    top++;\n    for (let i = top; i < bottom; i++) res.push(matrix[i][right - 1]);\n    right--;\n    if (!(left < right && top < bottom)) break;\n    for (let i = right - 1; i >= left; i--) res.push(matrix[bottom - 1][i]);\n    bottom--;\n    for (let i = bottom - 1; i >= top; i--) res.push(matrix[i][left]);\n    left++;\n  }\n  return res;\n}"
        },
        {
            "title": "Jump Game",
            "desc": "Determine if you are able to reach the last index.",
            "code": "function canJump(nums) {\n  let goal = nums.length - 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    if (i + nums[i] >= goal) goal = i;\n  }\n  return goal === 0;\n}"
        },
        {
            "title": "Longest Palindromic Substring",
            "desc": "Find the longest palindromic substring in s.",
            "code": "function longestPalindrome(s) {\n  let res = '';\n  let resLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    let l = i, r = i;\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      if (r - l + 1 > resLen) {\n        res = s.slice(l, r + 1);\n        resLen = r - l + 1;\n      }\n      l--; r++;\n    }\n    l = i; r = i + 1;\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      if (r - l + 1 > resLen) {\n        res = s.slice(l, r + 1);\n        resLen = r - l + 1;\n      }\n      l--; r++;\n    }\n  }\n  return res;\n}"
        },
        {
            "title": "Unique Paths",
            "desc": "Find the number of possible unique paths from top-left to bottom-right.",
            "code": "function uniquePaths(m, n) {\n  let row = new Array(n).fill(1);\n  for (let i = 0; i < m - 1; i++) {\n    const newRow = new Array(n).fill(1);\n    for (let j = n - 2; j >= 0; j--) {\n      newRow[j] = newRow[j + 1] + row[j];\n    }\n    row = newRow;\n  }\n  return row[0];\n}"
        }
    ],
    "searching": [
        {
            "title": "Linear Search",
            "desc": "Search for an element by checking each one sequentially.",
            "code": "function linearSearch(arr, x) {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === x) return i;\n  }\n  return -1;\n}"
        },
        {
            "title": "Binary Search",
            "desc": "Search a sorted array by repeatedly dividing the search interval in half.",
            "code": "function binarySearch(arr, x) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (arr[mid] < x) low = mid + 1;\n    else if (arr[mid] > x) high = mid - 1;\n    else return mid;\n  }\n  return -1;\n}"
        },
        {
            "title": "Ternary Search",
            "desc": "A divide-and-conquer algorithm that divides the array into three parts.",
            "code": "function ternarySearch(l, r, key, ar) {\n  if (r >= l) {\n    const mid1 = l + Math.floor((r - l) / 3);\n    const mid2 = r - Math.floor((r - l) / 3);\n    if (ar[mid1] === key) return mid1;\n    if (ar[mid2] === key) return mid2;\n    if (key < ar[mid1]) return ternarySearch(l, mid1 - 1, key, ar);\n    if (key > ar[mid2]) return ternarySearch(mid2 + 1, r, key, ar);\n    return ternarySearch(mid1 + 1, mid2 - 1, key, ar);\n  }\n  return -1;\n}"
        },
        {
            "title": "Jump Search",
            "desc": "Search in a sorted array by jumping fixed steps.",
            "code": "function jumpSearch(arr, x) {\n  const n = arr.length;\n  let step = Math.floor(Math.sqrt(n));\n  let prev = 0;\n  while (arr[Math.min(step, n) - 1] < x) {\n    prev = step;\n    step += Math.floor(Math.sqrt(n));\n    if (prev >= n) return -1;\n  }\n  while (arr[prev] < x) {\n    prev++;\n    if (prev === Math.min(step, n)) return -1;\n  }\n  if (arr[prev] === x) return prev;\n  return -1;\n}"
        },
        {
            "title": "Exponential Search",
            "desc": "Search by finding the range where the element may exist and then performing binary search.",
            "code": "function exponentialSearch(arr, x) {\n  if (arr[0] === x) return 0;\n  let i = 1;\n  while (i < arr.length && arr[i] <= x) i *= 2;\n  return binarySearchRange(arr, Math.floor(i / 2), Math.min(i, arr.length - 1), x);\n}\n\nfunction binarySearchRange(arr, l, r, x) {\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (arr[mid] === x) return mid;\n    if (arr[mid] > x) r = mid - 1;\n    else l = mid + 1;\n  }\n  return -1;\n}"
        },
        {
            "title": "Interpolation Search",
            "desc": "An algorithm for searching in a sorted array where values are uniformly distributed.",
            "code": "function interpolationSearch(arr, x) {\n  let low = 0;\n  let high = arr.length - 1;\n  while (low <= high && x >= arr[low] && x <= arr[high]) {\n    if (low === high) {\n      if (arr[low] === x) return low;\n      return -1;\n    }\n    const pos = low + Math.floor(((high - low) / (arr[high] - arr[low])) * (x - arr[low]));\n    if (arr[pos] === x) return pos;\n    if (arr[pos] < x) low = pos + 1;\n    else high = pos - 1;\n  }\n  return -1;\n}"
        },
        {
            "title": "Fibonacci Search",
            "desc": "A comparison-based search algorithm that uses Fibonacci numbers to divide the array.",
            "code": "function fibonacciSearch(arr, x) {\n  let fib2 = 0;\n  let fib1 = 1;\n  let fibM = fib2 + fib1;\n  while (fibM < arr.length) {\n    fib2 = fib1;\n    fib1 = fibM;\n    fibM = fib2 + fib1;\n  }\n  let offset = -1;\n  while (fibM > 1) {\n    const i = Math.min(offset + fib2, arr.length - 1);\n    if (arr[i] < x) {\n      fibM = fib1; fib1 = fib2; fib2 = fibM - fib1;\n      offset = i;\n    } else if (arr[i] > x) {\n      fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1;\n    } else return i;\n  }\n  if (fib1 && arr[offset + 1] === x) return offset + 1;\n  return -1;\n}"
        },
        {
            "title": "Breadth-First Search (BFS)",
            "desc": "Traverse or search graph structures level by level.",
            "code": "function bfs(graph, start) {\n  const visited = new Set([start]);\n  const queue = [start];\n  while (queue.length) {\n    const node = queue.shift();\n    for (const neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n  return visited;\n}"
        },
        {
            "title": "Depth-First Search (DFS)",
            "desc": "Traverse or search graph structures by exploring as far as possible along each branch.",
            "code": "function dfs(graph, start, visited = new Set()) {\n  visited.add(start);\n  for (const nextNode of graph[start]) {\n    if (!visited.has(nextNode)) {\n      dfs(graph, nextNode, visited);\n    }\n  }\n  return visited;\n}"
        },
        {
            "title": "Best-First Search",
            "desc": "An informed search algorithm that uses an evaluation function to decide which adjacent node is most promising.",
            "code": "function bestFirstSearch(graph, start, target, h) {\n  const visited = new Set();\n  const pq = [[h[start], start]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const u = pq.shift()[1];\n    if (u === target) break;\n    visited.add(u);\n    for (const [v, weight] of graph[u]) {\n      if (!visited.has(v)) {\n        pq.push([h[v], v]);\n      }\n    }\n  }\n}"
        }
    ],
    "sorting": [
        {
            "title": "Bubble Sort",
            "desc": "Repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order.",
            "code": "function bubbleSort(arr) {\n  const n = arr.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = 0; j < n - i - 1; j++) {\n      if (arr[j] > arr[j + 1]) {\n        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];\n      }\n    }\n  }\n  return arr;\n}"
        },
        {
            "title": "Selection Sort",
            "desc": "Repeatedly find the minimum element from the unsorted part and put it at the beginning.",
            "code": "function selectionSort(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    let minIdx = i;\n    for (let j = i + 1; j < arr.length; j++) {\n      if (arr[minIdx] > arr[j]) minIdx = j;\n    }\n    [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];\n  }\n  return arr;\n}"
        },
        {
            "title": "Insertion Sort",
            "desc": "Build the final sorted array one item at a time by inserting each element into its proper place.",
            "code": "function insertionSort(arr) {\n  for (let i = 1; i < arr.length; i++) {\n    const key = arr[i];\n    let j = i - 1;\n    while (j >= 0 && key < arr[j]) {\n      arr[j + 1] = arr[j];\n      j--;\n    }\n    arr[j + 1] = key;\n  }\n  return arr;\n}"
        },
        {
            "title": "Merge Sort",
            "desc": "Divide the array into halves, sort them, and then merge them back together.",
            "code": "function mergeSort(arr) {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  return merge(left, right);\n}\n\nfunction merge(left, right) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] < right[j]) result.push(left[i++]);\n    else result.push(right[j++]);\n  }\n  return result.concat(left.slice(i)).concat(right.slice(j));\n}"
        },
        {
            "title": "Quick Sort",
            "desc": "Pick a pivot and partition the array around it, then recursively sort the sub-arrays.",
            "code": "function quickSort(arr) {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[Math.floor(arr.length / 2)];\n  const left = arr.filter(x => x < pivot);\n  const middle = arr.filter(x => x === pivot);\n  const right = arr.filter(x => x > pivot);\n  return [...quickSort(left), ...middle, ...quickSort(right)];\n}"
        },
        {
            "title": "Heap Sort",
            "desc": "Convert the array into a heap and repeatedly extract the maximum element.",
            "code": "function heapify(arr, n, i) {\n  let largest = i;\n  const l = 2 * i + 1;\n  const r = 2 * i + 2;\n  if (l < n && arr[i] < arr[l]) largest = l;\n  if (r < n && arr[largest] < arr[r]) largest = r;\n  if (largest !== i) {\n    [arr[i], arr[largest]] = [arr[largest], arr[i]];\n    heapify(arr, n, largest);\n  }\n}\n\nfunction heapSort(arr) {\n  const n = arr.length;\n  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(arr, n, i);\n  for (let i = n - 1; i > 0; i--) {\n    [arr[i], arr[0]] = [arr[0], arr[i]];\n    heapify(arr, i, 0);\n  }\n  return arr;\n}"
        },
        {
            "title": "Shell Sort",
            "desc": "A generalization of insertion sort that allows the exchange of items that are far apart.",
            "code": "function shellSort(arr) {\n  const n = arr.length;\n  let gap = Math.floor(n / 2);\n  while (gap > 0) {\n    for (let i = gap; i < n; i++) {\n      const temp = arr[i];\n      let j = i;\n      while (j >= gap && arr[j - gap] > temp) {\n        arr[j] = arr[j - gap];\n        j -= gap;\n      }\n      arr[j] = temp;\n    }\n    gap = Math.floor(gap / 2);\n  }\n  return arr;\n}"
        },
        {
            "title": "Counting Sort",
            "desc": "Sort by counting the occurrences of each unique element.",
            "code": "function countingSort(arr) {\n  const maxVal = Math.max(...arr);\n  const count = new Array(maxVal + 1).fill(0);\n  for (const x of arr) count[x]++;\n  for (let i = 1; i < count.length; i++) count[i] += count[i - 1];\n  const output = new Array(arr.length);\n  for (let i = arr.length - 1; i >= 0; i--) {\n    output[count[arr[i]] - 1] = arr[i];\n    count[arr[i]]--;\n  }\n  return output;\n}"
        },
        {
            "title": "Radix Sort",
            "desc": "Sort numbers by processing individual digits.",
            "code": "function countingSortForRadix(arr, exp) {\n  const n = arr.length;\n  const output = new Array(n);\n  const count = new Array(10).fill(0);\n  for (let i = 0; i < n; i++) count[Math.floor(arr[i] / exp) % 10]++;\n  for (let i = 1; i < 10; i++) count[i] += count[i - 1];\n  for (let i = n - 1; i >= 0; i--) {\n    output[count[Math.floor(arr[i] / exp) % 10] - 1] = arr[i];\n    count[Math.floor(arr[i] / exp) % 10]--;\n  }\n  for (let i = 0; i < n; i++) arr[i] = output[i];\n}\n\nfunction radixSort(arr) {\n  const maxVal = Math.max(...arr);\n  let exp = 1;\n  while (Math.floor(maxVal / exp) > 0) {\n    countingSortForRadix(arr, exp);\n    exp *= 10;\n  }\n  return arr;\n}"
        },
        {
            "title": "Bucket Sort",
            "desc": "Distribute elements into buckets, then sort each bucket individually.",
            "code": "function bucketSort(arr, bucketSize = 5) {\n  if (!arr.length) return arr;\n  const minVal = Math.min(...arr);\n  const maxVal = Math.max(...arr);\n  const bucketCount = Math.floor((maxVal - minVal) / bucketSize) + 1;\n  const buckets = Array.from({ length: bucketCount }, () => []);\n  for (const x of arr) {\n    buckets[Math.floor((x - minVal) / bucketSize)].push(x);\n  }\n  const sorted = [];\n  for (const bucket of buckets) {\n    sorted.push(...bucket.sort((a, b) => a - b));\n  }\n  return sorted;\n}"
        },
        {
            "title": "Comb Sort",
            "desc": "An improvement over bubble sort that uses a gap to eliminate small values at the end.",
            "code": "function combSort(arr) {\n  const n = arr.length;\n  let gap = n;\n  let swapped = true;\n  const shrink = 1.3;\n  while (gap > 1 || swapped) {\n    gap = Math.floor(gap / shrink);\n    if (gap < 1) gap = 1;\n    swapped = false;\n    for (let i = 0; i + gap < n; i++) {\n      if (arr[i] > arr[i + gap]) {\n        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];\n        swapped = true;\n      }\n    }\n  }\n  return arr;\n}"
        },
        {
            "title": "Cycle Sort",
            "desc": "An in-place, unstable sorting algorithm optimal for minimizing writes.",
            "code": "function cycleSort(arr) {\n  const n = arr.length;\n  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {\n    let item = arr[cycleStart];\n    let pos = cycleStart;\n    for (let i = cycleStart + 1; i < n; i++) {\n      if (arr[i] < item) pos++;\n    }\n    if (pos === cycleStart) continue;\n    while (item === arr[pos]) pos++;\n    [arr[pos], item] = [item, arr[pos]];\n    while (pos !== cycleStart) {\n      pos = cycleStart;\n      for (let i = cycleStart + 1; i < n; i++) {\n        if (arr[i] < item) pos++;\n      }\n      while (item === arr[pos]) pos++;\n      [arr[pos], item] = [item, arr[pos]];\n    }\n  }\n  return arr;\n}"
        },
        {
            "title": "Cocktail Shaker Sort",
            "desc": "A variation of bubble sort that traverses the array in both directions.",
            "code": "function cocktailShakerSort(arr) {\n  let [start, end] = [0, arr.length - 1];\n  let swapped = true;\n  while (swapped) {\n    swapped = false;\n    for (let i = start; i < end; i++) {\n      if (arr[i] > arr[i + 1]) {\n        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n        swapped = true;\n      }\n    }\n    if (!swapped) break;\n    swapped = false;\n    end--;\n    for (let i = end - 1; i >= start; i--) {\n      if (arr[i] > arr[i + 1]) {\n        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];\n        swapped = true;\n      }\n    }\n    start++;\n  }\n  return arr;\n}"
        }
    ],
    "graphs": [
        {
            "title": "Dijkstra's Algorithm",
            "desc": "Find the shortest path from a source node to all other nodes in a weighted graph.",
            "code": "function dijkstra(graph, start) {\n  const dist = new Map();\n  const visited = new Set();\n  for (const node in graph) dist.set(node, Infinity);\n  dist.set(start, 0);\n  const pq = [[0, start]];\n  while (pq.length) {\n    pq.sort((a, b) => a[0] - b[0]);\n    const [d, u] = pq.shift();\n    if (visited.has(u)) continue;\n    visited.add(u);\n    for (const [v, weight] of graph[u]) {\n      if (dist.get(u) + weight < dist.get(v)) {\n        dist.set(v, dist.get(u) + weight);\n        pq.push([dist.get(v), v]);\n      }\n    }\n  }\n  return dist;\n}"
        },
        {
            "title": "Bellman-Ford Algorithm",
            "desc": "Find shortest paths in a weighted graph with negative edge weights.",
            "code": "function bellmanFord(graph, vertices, start) {\n  const dist = new Map();\n  for (const v of vertices) dist.set(v, Infinity);\n  dist.set(start, 0);\n  for (let i = 0; i < vertices.length - 1; i++) {\n    for (const u of vertices) {\n      for (const [v, weight] of graph[u]) {\n        if (dist.get(u) !== Infinity && dist.get(u) + weight < dist.get(v)) {\n          dist.set(v, dist.get(u) + weight);\n        }\n      }\n    }\n  }\n  for (const u of vertices) {\n    for (const [v, weight] of graph[u]) {\n      if (dist.get(u) !== Infinity && dist.get(u) + weight < dist.get(v)) {\n        return null; // Negative cycle\n      }\n    }\n  }\n  return dist;\n}"
        },
        {
            "title": "Floyd-Warshall Algorithm",
            "desc": "Find shortest paths between all pairs of vertices.",
            "code": "function floydWarshall(graph, n) {\n  const dist = Array.from({ length: n }, (_, i) =>\n    Array.from({ length: n }, (_, j) =>\n      i === j ? 0 : (graph[i]?.[j] || Infinity)\n    )\n  );\n  for (let k = 0; k < n; k++) {\n    for (let i = 0; i < n; i++) {\n      for (let j = 0; j < n; j++) {\n        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);\n      }\n    }\n  }\n  return dist;\n}"
        },
        {
            "title": "Kruskal's Algorithm",
            "desc": "Find the minimum spanning tree of a connected weighted graph.",
            "code": "function kruskal(edges, n) {\n  edges.sort((a, b) => a[2] - b[2]);\n  const parent = Array.from({ length: n }, (_, i) => i);\n  function find(x) {\n    if (parent[x] !== x) parent[x] = find(parent[x]);\n    return parent[x];\n  }\n  function union(x, y) {\n    parent[find(x)] = find(y);\n  }\n  const mst = [];\n  for (const [u, v, weight] of edges) {\n    if (find(u) !== find(v)) {\n      union(u, v);\n      mst.push([u, v, weight]);\n    }\n  }\n  return mst;\n}"
        },
        {
            "title": "Prim's Algorithm",
            "desc": "Find the minimum spanning tree starting from an arbitrary node.",
            "code": "function prim(graph, start) {\n  const visited = new Set([start]);\n  const mst = [];\n  let edges = graph[start].map(([v, w]) => [start, v, w]);\n  while (edges.length) {\n    edges.sort((a, b) => a[2] - b[2]);\n    const [u, v, weight] = edges.shift();\n    if (visited.has(v)) continue;\n    visited.add(v);\n    mst.push([u, v, weight]);\n    for (const [next, w] of graph[v]) {\n      if (!visited.has(next)) edges.push([v, next, w]);\n    }\n  }\n  return mst;\n}"
        },
        {
            "title": "Topological Sort",
            "desc": "Linear ordering of vertices such that for every directed edge uv, u comes before v.",
            "code": "function topologicalSort(graph) {\n  const visited = new Set();\n  const stack = [];\n  function dfs(v) {\n    visited.add(v);\n    for (const neighbor of graph[v]) {\n      if (!visited.has(neighbor)) dfs(neighbor);\n    }\n    stack.push(v);\n  }\n  for (const node in graph) {\n    if (!visited.has(node)) dfs(node);\n  }\n  return stack.reverse();\n}"
        },
        {
            "title": "Kahn's Algorithm",
            "desc": "Topological sorting using in-degree counting.",
            "code": "function kahnsAlgorithm(graph, numVertices) {\n  const inDegree = new Array(numVertices).fill(0);\n  for (const u in graph) {\n    for (const v of graph[u]) inDegree[v]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numVertices; i++) {\n    if (inDegree[i] === 0) queue.push(i);\n  }\n  const result = [];\n  while (queue.length) {\n    const u = queue.shift();\n    result.push(u);\n    for (const v of graph[u]) {\n      inDegree[v]--;\n      if (inDegree[v] === 0) queue.push(v);\n    }\n  }\n  return result.length === numVertices ? result : null;\n}"
        },
        {
            "title": "A* Search Algorithm",
            "desc": "Find the shortest path using heuristic guidance.",
            "code": "function aStar(graph, start, goal, h) {\n  const openSet = [[h(start), 0, start]];\n  const gScore = new Map();\n  gScore.set(start, 0);\n  const cameFrom = new Map();\n  while (openSet.length) {\n    openSet.sort((a, b) => a[0] - b[0]);\n    const [f, g, current] = openSet.shift();\n    if (current === goal) {\n      const path = [current];\n      let node = current;\n      while (cameFrom.has(node)) { node = cameFrom.get(node); path.unshift(node); }\n      return path;\n    }\n    for (const [neighbor, weight] of graph[current]) {\n      const tentativeG = g + weight;\n      if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {\n        cameFrom.set(neighbor, current);\n        gScore.set(neighbor, tentativeG);\n        openSet.push([tentativeG + h(neighbor), tentativeG, neighbor]);\n      }\n    }\n  }\n  return null;\n}"
        },
        {
            "title": "Tarjan's Strongly Connected Components",
            "desc": "Find all strongly connected components in a directed graph.",
            "code": "function tarjanSCC(graph) {\n  let id = 0;\n  const ids = new Map();\n  const low = new Map();\n  const onStack = new Set();\n  const stack = [];\n  const sccs = [];\n  function dfs(at) {\n    stack.push(at);\n    onStack.add(at);\n    ids.set(at, low.set(at, id).get(at));\n    id++;\n    for (const to of graph[at] || []) {\n      if (!ids.has(to)) {\n        dfs(to);\n        low.set(at, Math.min(low.get(at), low.get(to)));\n      } else if (onStack.has(to)) {\n        low.set(at, Math.min(low.get(at), ids.get(to)));\n      }\n    }\n    if (ids.get(at) === low.get(at)) {\n      const scc = [];\n      while (stack.length) {\n        const node = stack.pop();\n        onStack.delete(node);\n        scc.push(node);\n        if (node === at) break;\n      }\n      sccs.push(scc);\n    }\n  }\n  for (const node in graph) {\n    if (!ids.has(node)) dfs(node);\n  }\n  return sccs;\n}"
        },
        {
            "title": "Ford-Fulkerson Algorithm",
            "desc": "Find the maximum flow in a flow network.",
            "code": "function fordFulkerson(capacity, source, sink) {\n  const n = capacity.length;\n  const residual = capacity.map(row => [...row]);\n  function bfs(parent) {\n    const visited = new Set([source]);\n    const queue = [source];\n    while (queue.length) {\n      const u = queue.shift();\n      for (let v = 0; v < n; v++) {\n        if (!visited.has(v) && residual[u][v] > 0) {\n          visited.add(v);\n          parent[v] = u;\n          if (v === sink) return true;\n          queue.push(v);\n        }\n      }\n    }\n    return false;\n  }\n  let maxFlow = 0;\n  const parent = new Array(n);\n  while (bfs(parent)) {\n    let pathFlow = Infinity;\n    let v = sink;\n    while (v !== source) {\n      const u = parent[v];\n      pathFlow = Math.min(pathFlow, residual[u][v]);\n      v = u;\n    }\n    maxFlow += pathFlow;\n    v = sink;\n    while (v !== source) {\n      const u = parent[v];\n      residual[u][v] -= pathFlow;\n      residual[v][u] += pathFlow;\n      v = u;\n    }\n  }\n  return maxFlow;\n}"
        },
        {
            "title": "Bridges in a Graph",
            "desc": "Find all bridge edges in an undirected graph.",
            "code": "function findBridges(graph, n) {\n  let timer = 0;\n  const tin = new Array(n).fill(-1);\n  const low = new Array(n).fill(-1);\n  const bridges = [];\n  function dfs(u, p = -1) {\n    tin[u] = low[u] = timer++;\n    for (const v of graph[u]) {\n      if (v === p) continue;\n      if (tin[v] !== -1) {\n        low[u] = Math.min(low[u], tin[v]);\n      } else {\n        dfs(v, u);\n        low[u] = Math.min(low[u], low[v]);\n        if (low[v] > tin[u]) bridges.push([u, v]);\n      }\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    if (tin[i] === -1) dfs(i);\n  }\n  return bridges;\n}"
        }
    ],
    "trees": [
        {
            "title": "Binary Tree Traversals (Inorder, Preorder, Postorder)",
            "desc": "Standard tree traversal algorithms for binary trees.",
            "code": "function inorder(root) {\n  return root ? [...inorder(root.left), root.val, ...inorder(root.right)] : [];\n}\nfunction preorder(root) {\n  return root ? [root.val, ...preorder(root.left), ...preorder(root.right)] : [];\n}\nfunction postorder(root) {\n  return root ? [...postorder(root.left), ...postorder(root.right), root.val] : [];\n}"
        },
        {
            "title": "Level Order Traversal",
            "desc": "BFS traversal of a binary tree, level by level.",
            "code": "function levelOrder(root) {\n  if (!root) return [];\n  const result = [];\n  const queue = [root];\n  while (queue.length) {\n    const level = [];\n    const len = queue.length;\n    for (let i = 0; i < len; i++) {\n      const node = queue.shift();\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}"
        },
        {
            "title": "Lowest Common Ancestor (LCA)",
            "desc": "Find the lowest common ancestor of two nodes in a binary tree.",
            "code": "function lowestCommonAncestor(root, p, q) {\n  if (!root || root === p || root === q) return root;\n  const left = lowestCommonAncestor(root.left, p, q);\n  const right = lowestCommonAncestor(root.right, p, q);\n  if (left && right) return root;\n  return left || right;\n}"
        },
        {
            "title": "Fenwick Tree (Binary Indexed Tree)",
            "desc": "Efficiently compute prefix sums and update values.",
            "code": "class FenwickTree {\n  constructor(size) {\n    this.tree = new Array(size + 1).fill(0);\n  }\n  update(i, delta) {\n    for (; i < this.tree.length; i += i & -i) {\n      this.tree[i] += delta;\n    }\n  }\n  query(i) {\n    let sum = 0;\n    for (; i > 0; i -= i & -i) {\n      sum += this.tree[i];\n    }\n    return sum;\n  }\n}"
        },
        {
            "title": "Segment Tree",
            "desc": "A tree for storing intervals and performing range queries efficiently.",
            "code": "class SegmentTree {\n  constructor(arr) {\n    this.n = arr.length;\n    this.tree = new Array(4 * this.n);\n    this.build(arr, 1, 0, this.n - 1);\n  }\n  build(arr, node, start, end) {\n    if (start === end) {\n      this.tree[node] = arr[start];\n    } else {\n      const mid = Math.floor((start + end) / 2);\n      this.build(arr, 2 * node, start, mid);\n      this.build(arr, 2 * node + 1, mid + 1, end);\n      this.tree[node] = this.tree[2 * node] + this.tree[2 * node + 1];\n    }\n  }\n  query(node, start, end, l, r) {\n    if (r < start || end < l) return 0;\n    if (l <= start && end <= r) return this.tree[node];\n    const mid = Math.floor((start + end) / 2);\n    return this.query(2 * node, start, mid, l, r) + this.query(2 * node + 1, mid + 1, end, l, r);\n  }\n}"
        },
        {
            "title": "AVL Tree Rotation",
            "desc": "Self-balancing binary search tree with rotations.",
            "code": "class AVLNode {\n  constructor(val) {\n    this.val = val;\n    this.left = null;\n    this.right = null;\n    this.height = 1;\n  }\n}\n\nfunction getHeight(node) { return node ? node.height : 0; }\n\nfunction rightRotate(y) {\n  const x = y.left;\n  const T2 = x.right;\n  x.right = y;\n  y.left = T2;\n  y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;\n  x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;\n  return x;\n}\n\nfunction leftRotate(x) {\n  const y = x.right;\n  const T2 = y.left;\n  y.left = x;\n  x.right = T2;\n  x.height = Math.max(getHeight(x.left), getHeight(x.right)) + 1;\n  y.height = Math.max(getHeight(y.left), getHeight(y.right)) + 1;\n  return y;\n}"
        },
        {
            "title": "Huffman Coding",
            "desc": "Lossless data compression using variable-length prefix codes.",
            "code": "class HuffmanNode {\n  constructor(char, freq) {\n    this.char = char;\n    this.freq = freq;\n    this.left = null;\n    this.right = null;\n  }\n}\n\nfunction huffmanCoding(chars, freqs) {\n  const pq = chars.map((c, i) => new HuffmanNode(c, freqs[i]));\n  while (pq.length > 1) {\n    pq.sort((a, b) => a.freq - b.freq);\n    const left = pq.shift();\n    const right = pq.shift();\n    const merged = new HuffmanNode(null, left.freq + right.freq);\n    merged.left = left;\n    merged.right = right;\n    pq.push(merged);\n  }\n  const codes = {};\n  function generateCodes(node, code) {\n    if (!node) return;\n    if (node.char !== null) { codes[node.char] = code; return; }\n    generateCodes(node.left, code + '0');\n    generateCodes(node.right, code + '1');\n  }\n  generateCodes(pq[0], '');\n  return codes;\n}"
        }
    ],
    "math": [
        {
            "title": "Euclidean Algorithm (GCD)",
            "desc": "Compute the greatest common divisor of two numbers.",
            "code": "function gcd(a, b) {\n  while (b !== 0) {\n    [a, b] = [b, a % b];\n  }\n  return a;\n}"
        },
        {
            "title": "Extended Euclidean Algorithm",
            "desc": "Find x, y such that ax + by = gcd(a, b).",
            "code": "function extendedGCD(a, b) {\n  if (b === 0) return [a, 1, 0];\n  const [g, x1, y1] = extendedGCD(b, a % b);\n  return [g, y1, x1 - Math.floor(a / b) * y1];\n}"
        },
        {
            "title": "Sieve of Eratosthenes",
            "desc": "Find all prime numbers up to a given limit.",
            "code": "function sieveOfEratosthenes(n) {\n  const isPrime = new Array(n + 1).fill(true);\n  isPrime[0] = isPrime[1] = false;\n  for (let p = 2; p * p <= n; p++) {\n    if (isPrime[p]) {\n      for (let i = p * p; i <= n; i += p) isPrime[i] = false;\n    }\n  }\n  return isPrime.reduce((primes, val, idx) => val ? [...primes, idx] : primes, []);\n}"
        },
        {
            "title": "Miller-Rabin Primality Test",
            "desc": "Probabilistic test to determine if a number is prime.",
            "code": "function millerRabin(n, k = 5) {\n  if (n < 2) return false;\n  if (n === 2 || n === 3) return true;\n  if (n % 2 === 0) return false;\n  let s = 0, d = n - 1;\n  while (d % 2 === 0) { d /= 2; s++; }\n  function modPow(base, exp, mod) {\n    let result = 1;\n    base %= mod;\n    while (exp > 0) {\n      if (exp % 2 === 1) result = (result * base) % mod;\n      base = (base * base) % mod;\n      exp = Math.floor(exp / 2);\n    }\n    return result;\n  }\n  for (let i = 0; i < k; i++) {\n    const a = 2 + Math.floor(Math.random() * (n - 3));\n    let x = modPow(a, d, n);\n    if (x === 1 || x === n - 1) continue;\n    let composite = true;\n    for (let r = 1; r < s; r++) {\n      x = (x * x) % n;\n      if (x === n - 1) { composite = false; break; }\n    }\n    if (composite) return false;\n  }\n  return true;\n}"
        },
        {
            "title": "Karatsuba Algorithm",
            "desc": "Fast multiplication algorithm for large numbers.",
            "code": "function karatsuba(x, y) {\n  if (x < 10 || y < 10) return x * y;\n  const n = Math.max(x.toString().length, y.toString().length);\n  const m = Math.floor(n / 2);\n  const high1 = Math.floor(x / (10 ** m));\n  const low1 = x % (10 ** m);\n  const high2 = Math.floor(y / (10 ** m));\n  const low2 = y % (10 ** m);\n  const z0 = karatsuba(low1, low2);\n  const z1 = karatsuba(high1 + low1, high2 + low2);\n  const z2 = karatsuba(high1, high2);\n  return z2 * (10 ** (2 * m)) + (z1 - z2 - z0) * (10 ** m) + z0;\n}"
        },
        {
            "title": "Gaussian Elimination",
            "desc": "Solve a system of linear equations.",
            "code": "function gaussianElimination(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    let maxEl = Math.abs(matrix[i][i]);\n    let maxRow = i;\n    for (let k = i + 1; k < n; k++) {\n      if (Math.abs(matrix[k][i]) > maxEl) {\n        maxEl = Math.abs(matrix[k][i]);\n        maxRow = k;\n      }\n    }\n    [matrix[i], matrix[maxRow]] = [matrix[maxRow], matrix[i]];\n    for (let k = i + 1; k < n; k++) {\n      const c = -matrix[k][i] / matrix[i][i];\n      for (let j = i; j <= n; j++) {\n        if (i === j) matrix[k][j] = 0;\n        else matrix[k][j] += c * matrix[i][j];\n      }\n    }\n  }\n  const x = new Array(n);\n  for (let i = n - 1; i >= 0; i--) {\n    x[i] = matrix[i][n] / matrix[i][i];\n    for (let k = i - 1; k >= 0; k--) matrix[k][n] -= matrix[k][i] * x[i];\n  }\n  return x;\n}"
        },
        {
            "title": "Euclidean Distance",
            "desc": "Calculate the straight-line distance between two points.",
            "code": "function euclideanDistance(p1, p2) {\n  return Math.sqrt(p1.reduce((sum, val, i) => sum + (val - p2[i]) ** 2, 0));\n}"
        },
        {
            "title": "Manhattan Distance",
            "desc": "Calculate the distance between two points measured along axes at right angles.",
            "code": "function manhattanDistance(p1, p2) {\n  return p1.reduce((sum, val, i) => sum + Math.abs(val - p2[i]), 0);\n}"
        },
        {
            "title": "Monte Carlo Method",
            "desc": "Estimate Pi using random sampling.",
            "code": "function monteCarloPi(samples) {\n  let inside = 0;\n  for (let i = 0; i < samples; i++) {\n    const x = Math.random();\n    const y = Math.random();\n    if (x * x + y * y <= 1) inside++;\n  }\n  return 4 * inside / samples;\n}"
        }
    ],
    "dp": [
        {
            "title": "Knapsack Problem (0/1)",
            "desc": "Maximize value of items in a knapsack with weight capacity.",
            "code": "function knapsack(weights, values, capacity) {\n  const n = weights.length;\n  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 0; w <= capacity; w++) {\n      if (weights[i - 1] <= w) {\n        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);\n      } else {\n        dp[i][w] = dp[i - 1][w];\n      }\n    }\n  }\n  return dp[n][capacity];\n}"
        },
        {
            "title": "Longest Common Subsequence (LCS)",
            "desc": "Find the length of the longest subsequence common to two strings.",
            "code": "function longestCommonSubsequence(text1, text2) {\n  const m = text1.length;\n  const n = text2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1] + 1;\n      } else {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n  return dp[m][n];\n}"
        },
        {
            "title": "Longest Increasing Subsequence (LIS)",
            "desc": "Find the length of the longest strictly increasing subsequence.",
            "code": "function lengthOfLIS(nums) {\n  if (!nums.length) return 0;\n  const dp = new Array(nums.length).fill(1);\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);\n    }\n  }\n  return Math.max(...dp);\n}"
        },
        {
            "title": "Edit Distance (Levenshtein)",
            "desc": "Minimum operations to convert one string to another.",
            "code": "function minDistance(word1, word2) {\n  const m = word1.length;\n  const n = word2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i - 1] === word2[j - 1]) {\n        dp[i][j] = dp[i - 1][j - 1];\n      } else {\n        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n      }\n    }\n  }\n  return dp[m][n];\n}"
        },
        {
            "title": "Matrix Chain Multiplication",
            "desc": "Find the minimum number of scalar multiplications needed.",
            "code": "function matrixChainOrder(p) {\n  const n = p.length - 1;\n  const dp = Array.from({ length: n }, () => new Array(n).fill(0));\n  for (let len = 2; len <= n; len++) {\n    for (let i = 0; i < n - len + 1; i++) {\n      const j = i + len - 1;\n      dp[i][j] = Infinity;\n      for (let k = i; k < j; k++) {\n        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1]);\n      }\n    }\n  }\n  return dp[0][n - 1];\n}"
        },
        {
            "title": "Floyd's Cycle-Finding (Tortoise and Hare)",
            "desc": "Detect a cycle in a linked list.",
            "code": "function hasCycle(head) {\n  let slow = head;\n  let fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}"
        },
        {
            "title": "Kadane's Algorithm",
            "desc": "Find the maximum subarray sum.",
            "code": "function kadane(nums) {\n  let maxSoFar = nums[0];\n  let maxEndingHere = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);\n    maxSoFar = Math.max(maxSoFar, maxEndingHere);\n  }\n  return maxSoFar;\n}"
        },
        {
            "title": "Coin Change Problem",
            "desc": "Find the minimum number of coins to make a given amount.",
            "code": "function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (i - coin >= 0) dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}"
        },
        {
            "title": "Traveling Salesman Problem (DP)",
            "desc": "Find the shortest possible route visiting all cities and returning to start.",
            "code": "function tsp(dist) {\n  const n = dist.length;\n  const SIZE = 1 << n;\n  const dp = Array.from({ length: SIZE }, () => new Array(n).fill(Infinity));\n  dp[1][0] = 0;\n  for (let mask = 1; mask < SIZE; mask++) {\n    for (let u = 0; u < n; u++) {\n      if ((mask & (1 << u)) && dp[mask][u] !== Infinity) {\n        for (let v = 0; v < n; v++) {\n          if (!(mask & (1 << v))) {\n            dp[mask | (1 << v)][v] = Math.min(dp[mask | (1 << v)][v], dp[mask][u] + dist[u][v]);\n          }\n        }\n      }\n    }\n  }\n  let result = Infinity;\n  for (let i = 1; i < n; i++) {\n    result = Math.min(result, dp[SIZE - 1][i] + dist[i][0]);\n  }\n  return result;\n}"
        }
    ],
    "strings": [
        {
            "title": "Knuth-Morris-Pratt (KMP)",
            "desc": "Efficient string matching algorithm using a prefix function.",
            "code": "function kmpSearch(text, pattern) {\n  const lps = computeLPS(pattern);\n  let i = 0, j = 0;\n  while (i < text.length) {\n    if (pattern[j] === text[i]) { i++; j++; }\n    if (j === pattern.length) return i - j;\n    if (i < text.length && pattern[j] !== text[i]) {\n      j = j > 0 ? lps[j - 1] : (i++);\n    }\n  }\n  return -1;\n}\n\nfunction computeLPS(pattern) {\n  const lps = new Array(pattern.length).fill(0);\n  let len = 0, i = 1;\n  while (i < pattern.length) {\n    if (pattern[i] === pattern[len]) {\n      len++;\n      lps[i] = len;\n      i++;\n    } else if (len > 0) {\n      len = lps[len - 1];\n    } else {\n      lps[i] = 0;\n      i++;\n    }\n  }\n  return lps;\n}"
        },
        {
            "title": "Rabin-Karp Algorithm",
            "desc": "String matching using rolling hashes.",
            "code": "function rabinKarp(text, pattern) {\n  const base = 256;\n  const mod = 101;\n  const m = pattern.length;\n  const n = text.length;\n  if (m > n) return -1;\n  let patternHash = 0, textHash = 0;\n  let h = 1;\n  for (let i = 0; i < m - 1; i++) h = (h * base) % mod;\n  for (let i = 0; i < m; i++) {\n    patternHash = (patternHash * base + pattern.charCodeAt(i)) % mod;\n    textHash = (textHash * base + text.charCodeAt(i)) % mod;\n  }\n  for (let i = 0; i <= n - m; i++) {\n    if (patternHash === textHash) {\n      if (text.slice(i, i + m) === pattern) return i;\n    }\n    if (i < n - m) {\n      textHash = ((textHash - text.charCodeAt(i) * h) * base + text.charCodeAt(i + m)) % mod;\n      if (textHash < 0) textHash += mod;\n    }\n  }\n  return -1;\n}"
        },
        {
            "title": "Boyer-Moore String Search",
            "desc": "Efficient string matching using bad character heuristic.",
            "code": "function boyerMoore(text, pattern) {\n  const m = pattern.length;\n  const n = text.length;\n  const badChar = new Map();\n  for (let i = 0; i < m; i++) badChar.set(pattern[i], i);\n  let s = 0;\n  while (s <= n - m) {\n    let j = m - 1;\n    while (j >= 0 && pattern[j] === text[s + j]) j--;\n    if (j < 0) return s;\n    const shift = badChar.has(text[s + j]) ? j - badChar.get(text[s + j]) : j + 1;\n    s += Math.max(1, shift);\n  }\n  return -1;\n}"
        },
        {
            "title": "Manacher's Algorithm",
            "desc": "Find the longest palindromic substring in linear time.",
            "code": "function manacher(s) {\n  const T = '#';\n  const t = T + s.split('').join(T) + T;\n  const P = new Array(t.length).fill(0);\n  let C = 0, R = 0;\n  for (let i = 0; i < t.length; i++) {\n    const mirror = 2 * C - i;\n    if (i < R) P[i] = Math.min(R - i, P[mirror]);\n    let a = i + (1 + P[i]), b = i - (1 + P[i]);\n    while (b >= 0 && a < t.length && t[a] === t[b]) { P[i]++; a++; b--; }\n    if (i + P[i] > R) { C = i; R = i + P[i]; }\n  }\n  const maxLen = Math.max(...P);\n  const centerIndex = P.indexOf(maxLen);\n  return s.slice((centerIndex - maxLen) / 2, (centerIndex + maxLen) / 2);\n}"
        },
        {
            "title": "Longest Palindromic Substring",
            "desc": "Find the longest palindromic substring using expand around center.",
            "code": "function longestPalindrome(s) {\n  let res = '';\n  let resLen = 0;\n  for (let i = 0; i < s.length; i++) {\n    let l = i, r = i;\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      if (r - l + 1 > resLen) { res = s.slice(l, r + 1); resLen = r - l + 1; }\n      l--; r++;\n    }\n    l = i; r = i + 1;\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      if (r - l + 1 > resLen) { res = s.slice(l, r + 1); resLen = r - l + 1; }\n      l--; r++;\n    }\n  }\n  return res;\n}"
        },
        {
            "title": "Soundex Algorithm",
            "desc": "Encode surnames phonetically for indexing.",
            "code": "function soundex(name) {\n  const mapping = { BFPV: '1', CGJKQSXZ: '2', DT: '3', L: '4', MN: '5', R: '6' };\n  function getCode(c) {\n    for (const key in mapping) if (key.includes(c)) return mapping[key];\n    return '0';\n  }\n  let result = name[0].toUpperCase();\n  let prevCode = getCode(name[0].toUpperCase());\n  for (let i = 1; i < name.length; i++) {\n    const code = getCode(name[i].toUpperCase());\n    if (code !== '0' && code !== prevCode) result += code;\n    prevCode = code;\n  }\n  return (result + '000').slice(0, 4);\n}"
        }
    ],
    "ml": [
        {
            "title": "Linear Regression (Gradient Descent)",
            "desc": "Fit a linear model to minimize the sum of squared residuals.",
            "code": "function linearRegression(X, y, lr = 0.01, epochs = 1000) {\n  const m = X.length;\n  const n = X[0].length;\n  let theta = new Array(n + 1).fill(0);\n  const X_bias = X.map(row => [1, ...row]);\n  for (let epoch = 0; epoch < epochs; epoch++) {\n    const gradients = new Array(n + 1).fill(0);\n    for (let i = 0; i < m; i++) {\n      const prediction = theta.reduce((sum, t, j) => sum + t * X_bias[i][j], 0);\n      const error = prediction - y[i];\n      for (let j = 0; j <= n; j++) gradients[j] += error * X_bias[i][j];\n    }\n    for (let j = 0; j <= n; j++) theta[j] -= lr * gradients[j] / m;\n  }\n  return theta;\n}"
        },
        {
            "title": "K-Nearest Neighbors (KNN)",
            "desc": "Classify a data point based on the majority class of its k nearest neighbors.",
            "code": "function knnClassify(trainX, trainY, testPoint, k = 3) {\n  function euclidean(a, b) {\n    return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));\n  }\n  const distances = trainX.map((x, i) => ({ dist: euclidean(x, testPoint), label: trainY[i] }));\n  distances.sort((a, b) => a.dist - b.dist);\n  const votes = {};\n  for (let i = 0; i < k; i++) {\n    const label = distances[i].label;\n    votes[label] = (votes[label] || 0) + 1;\n  }\n  return Object.entries(votes).sort((a, b) => b[1] - a[1])[0][0];\n}"
        },
        {
            "title": "K-Means Clustering",
            "desc": "Partition data into k clusters based on distance to centroids.",
            "code": "function kMeans(data, k, maxIter = 100) {\n  const centroids = data.slice(0, k).map(p => [...p]);\n  function dist(a, b) { return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0)); }\n  for (let iter = 0; iter < maxIter; iter++) {\n    const clusters = Array.from({ length: k }, () => []);\n    for (const point of data) {\n      let minDist = Infinity, minIdx = 0;\n      for (let i = 0; i < k; i++) {\n        const d = dist(point, centroids[i]);\n        if (d < minDist) { minDist = d; minIdx = i; }\n      }\n      clusters[minIdx].push(point);\n    }\n    for (let i = 0; i < k; i++) {\n      if (clusters[i].length) {\n        const dim = clusters[i][0].length;\n        centroids[i] = Array.from({ length: dim }, (_, j) =>\n          clusters[i].reduce((s, p) => s + p[j], 0) / clusters[i].length\n        );\n      }\n    }\n  }\n  return centroids;\n}"
        },
        {
            "title": "Naive Bayes Classifier",
            "desc": "A probabilistic classifier based on Bayes' theorem with feature independence.",
            "code": "function naiveBayesTrain(X, y) {\n  const classes = [...new Set(y)];\n  const classStats = {};\n  for (const cls of classes) {\n    const subset = X.filter((_, i) => y[i] === cls);\n    const mean = subset[0].map((_, j) =>\n      subset.reduce((s, row) => s + row[j], 0) / subset.length\n    );\n    const variance = subset[0].map((_, j) =>\n      subset.reduce((s, row) => s + (row[j] - mean[j]) ** 2, 0) / subset.length\n    );\n    classStats[cls] = { mean, variance, prior: subset.length / X.length };\n  }\n  return { classStats, classes };\n}\n\nfunction naiveBayesPredict(model, x) {\n  function gaussianPdf(val, mean, var_) {\n    return Math.exp(-((val - mean) ** 2) / (2 * var_)) / Math.sqrt(2 * Math.PI * var_);\n  }\n  let bestCls = null, bestProb = -Infinity;\n  for (const cls of model.classes) {\n    let logProb = Math.log(model.classStats[cls].prior);\n    for (let i = 0; i < x.length; i++) {\n      logProb += Math.log(gaussianPdf(x[i], model.classStats[cls].mean[i], model.classStats[cls].variance[i]));\n    }\n    if (logProb > bestProb) { bestProb = logProb; bestCls = cls; }\n  }\n  return bestCls;\n}"
        },
        {
            "title": "PageRank Algorithm",
            "desc": "Rank web pages based on link structure.",
            "code": "function pageRank(graph, damping = 0.85, iterations = 100) {\n  const nodes = Object.keys(graph);\n  const n = nodes.length;\n  let rank = Object.fromEntries(nodes.map(node => [node, 1 / n]));\n  for (let iter = 0; iter < iterations; iter++) {\n    const newRank = {};\n    for (const node of nodes) {\n      let sum = 0;\n      for (const other of nodes) {\n        if (graph[other].includes(node)) {\n          sum += rank[other] / graph[other].length;\n        }\n      }\n      newRank[node] = (1 - damping) / n + damping * sum;\n    }\n    rank = newRank;\n  }\n  return rank;\n}"
        },
        {
            "title": "Q-Learning (Reinforcement Learning)",
            "desc": "Learn optimal actions through trial and error using a Q-table.",
            "code": "function qLearning(states, actions, episodes, alpha = 0.1, gamma = 0.9, epsilon = 0.1) {\n  const qTable = Object.fromEntries(states.map(s => [s, Object.fromEntries(actions.map(a => [a, 0]))]));\n  function getState() { return states[Math.floor(Math.random() * states.length)]; }\n  function getAction(state) {\n    if (Math.random() < epsilon) return actions[Math.floor(Math.random() * actions.length)];\n    return Object.entries(qTable[state]).sort((a, b) => b[1] - a[1])[0][0];\n  }\n  function reward(state, action) { return Math.random() * 10; }\n  function nextState(state, action) { return getState(); }\n  for (let ep = 0; ep < episodes; ep++) {\n    let state = getState();\n    for (let step = 0; step < 100; step++) {\n      const action = getAction(state);\n      const r = reward(state, action);\n      const next = nextState(state, action);\n      const maxQ = Math.max(...Object.values(qTable[next]));\n      qTable[state][action] += alpha * (r + gamma * maxQ - qTable[state][action]);\n      state = next;\n    }\n  }\n  return qTable;\n}"
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ALGO_DATA;
}