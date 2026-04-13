const ALGO_DATA = {
    "leetcode": [{
            "title": "Two Sum",
            "desc": "Find two numbers such that they add up to a specific target.",
            "code": "def two_sum(nums, target):\n    prevMap = {} # val : index\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in prevMap:\n            return [prevMap[diff], i]\n        prevMap[n] = i\n    return"
        },
        {
            "title": "Reverse Linked List",
            "desc": "Reverse a singly linked list.",
            "code": "def reverseList(head):\n    prev, curr = None, head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev"
        },
        {
            "title": "Valid Parentheses",
            "desc": "Determine if the input string has valid brackets.",
            "code": "def isValid(s):\n    Map = {\")\": \"(\", \"]\": \"[\", \"}\": \"{\"}\n    stack = []\n    for c in s:\n        if c not in Map:\n            stack.append(c)\n            continue\n        if not stack or stack[-1] != Map[c]:\n            return False\n        stack.pop()\n    return not stack"
        },
        {
            "title": "Best Time to Buy and Sell Stock",
            "desc": "Maximize profit from one transaction.",
            "code": "def maxProfit(prices):\n    res = 0\n    lowest = prices[0]\n    for price in prices:\n        if price < lowest:\n            lowest = price\n        res = max(res, price - lowest)\n    return res"
        },
        {
            "title": "Merge Two Sorted Lists",
            "desc": "Merge two sorted linked lists into one.",
            "code": "def mergeTwoLists(l1, l2):\n    dummy = ListNode()\n    tail = dummy\n    while l1 and l2:\n        if l1.val < l2.val:\n            tail.next = l1\n            l1 = l1.next\n        else:\n            tail.next = l2\n            l2 = l2.next\n        tail = tail.next\n    if l1:\n        tail.next = l1\n    elif l2:\n        tail.next = l2\n    return dummy.next"
        },
        {
            "title": "Longest Substring Without Repeating Characters",
            "desc": "Find the length of the longest substring without repeating characters.",
            "code": "def lengthOfLongestSubstring(s):\n    charSet = set()\n    l = 0\n    res = 0\n    for r in range(len(s)):\n        while s[r] in charSet:\n            charSet.remove(s[l])\n            l += 1\n        charSet.add(s[r])\n        res = max(res, r - l + 1)\n    return res"
        },
        {
            "title": "Container With Most Water",
            "desc": "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
            "code": "def maxArea(height):\n    l, r = 0, len(height) - 1\n    res = 0\n    while l < r:\n        res = max(res, min(height[l], height[r]) * (r - l))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return res"
        },
        {
            "title": "Add Two Numbers",
            "desc": "Add two numbers represented by linked lists.",
            "code": "def addTwoNumbers(l1, l2):\n    dummy = ListNode()\n    curr = dummy\n    carry = 0\n    while l1 or l2 or carry:\n        v1 = l1.val if l1 else 0\n        v2 = l2.val if l2 else 0\n        val = v1 + v2 + carry\n        carry = val // 10\n        val = val % 10\n        curr.next = ListNode(val)\n        curr = curr.next\n        l1 = l1.next if l1 else None\n        l2 = l2.next if l2 else None\n    return dummy.next"
        },
        {
            "title": "Rotate Array",
            "desc": "Rotate an array to the right by k steps.",
            "code": "def rotate(nums, k):\n    k = k % len(nums)\n    nums[:] = nums[::-1]\n    nums[:k] = nums[:k][::-1]\n    nums[k:] = nums[k:][::-1]"
        },
        {
            "title": "Remove Duplicates from Sorted Array",
            "desc": "Remove duplicates in-place from a sorted array.",
            "code": "def removeDuplicates(nums):\n    if not nums: return 0\n    l = 1\n    for r in range(1, len(nums)):\n        if nums[r] != nums[r-1]:\n            nums[l] = nums[r]\n            l += 1\n    return l"
        },
        {
            "title": "Search in Rotated Sorted Array",
            "desc": "Find the index of a target value in a rotated sorted array.",
            "code": "def search(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if target == nums[mid]:\n            return mid\n        if nums[l] <= nums[mid]:\n            if target > nums[mid] or target < nums[l]:\n                l = mid + 1\n            else:\n                r = mid - 1\n        else:\n            if target < nums[mid] or target > nums[r]:\n                r = mid - 1\n            else:\n                l = mid + 1\n    return -1"
        },
        {
            "title": "Longest Increasing Subsequence",
            "desc": "Find the length of the longest strictly increasing subsequence.",
            "code": "def lengthOfLIS(nums):\n    LIS = [1] * len(nums)\n    for i in range(len(nums) - 1, -1, -1):\n        for j in range(i + 1, len(nums)):\n            if nums[i] < nums[j]:\n                LIS[i] = max(LIS[i], 1 + LIS[j])\n    return max(LIS)"
        },
        {
            "title": "Binary Tree Inorder Traversal",
            "desc": "Return the inorder traversal of a binary tree's nodes' values.",
            "code": "def inorderTraversal(root):\n    res = []\n    def helper(node):\n        if not node: return\n        helper(node.left)\n        res.append(node.val)\n        helper(node.right)\n    helper(root)\n    return res"
        },
        {
            "title": "Validate Binary Search Tree",
            "desc": "Determine if a binary tree is a valid binary search tree (BST).",
            "code": "def isValidBST(root):\n    def valid(node, left, right):\n        if not node: return True\n        if not (node.val < right and node.val > left):\n            return False\n        return valid(node.left, left, node.val) and valid(node.right, node.val, right)\n    return valid(root, float(\"-inf\"), float(\"inf\"))"
        },
        {
            "title": "Lowest Common Ancestor of a Binary Tree",
            "desc": "Find the lowest common ancestor node of two given nodes in a binary tree.",
            "code": "def lowestCommonAncestor(root, p, q):\n    if not root or root == p or root == q:\n        return root\n    left = lowestCommonAncestor(root.left, p, q)\n    right = lowestCommonAncestor(root.right, p, q)\n    if left and right:\n        return root\n    return left or right"
        },
        {
            "title": "Path Sum",
            "desc": "Determine if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.",
            "code": "def hasPathSum(root, targetSum):\n    if not root: return False\n    if not root.left and not root.right:\n        return targetSum == root.val\n    return hasPathSum(root.left, targetSum - root.val) or hasPathSum(root.right, targetSum - root.val)"
        },
        {
            "title": "Maximum Subarray",
            "desc": "Find the contiguous subarray which has the largest sum.",
            "code": "def maxSubArray(nums):\n    maxSub = nums[0]\n    curSum = 0\n    for n in nums:\n        if curSum < 0:\n            curSum = 0\n        curSum += n\n        maxSub = max(maxSub, curSum)\n    return maxSub"
        },
        {
            "title": "Climbing Stairs",
            "desc": "Find the number of distinct ways to climb n stairs.",
            "code": "def climbStairs(n):\n    one, two = 1, 1\n    for i in range(n - 1):\n        temp = one\n        one = one + two\n        two = temp\n    return one"
        },
        {
            "title": "Word Break",
            "desc": "Determine if a string can be segmented into a space-separated sequence of dictionary words.",
            "code": "def wordBreak(s, wordDict):\n    dp = [False] * (len(s) + 1)\n    dp[len(s)] = True\n    for i in range(len(s) - 1, -1, -1):\n        for w in wordDict:\n            if (i + len(w)) <= len(s) and s[i : i + len(w)] == w:\n                dp[i] = dp[i + len(w)]\n            if dp[i]:\n                break\n    return dp[0]"
        },
        {
            "title": "Word Ladder",
            "desc": "Find the length of the shortest transformation sequence from beginWord to endWord.",
            "code": "import collections\ndef ladderLength(beginWord, endWord, wordList):\n    if endWord not in wordList: return 0\n    nei = collections.defaultdict(list)\n    wordList.append(beginWord)\n    for word in wordList:\n        for j in range(len(word)):\n            pattern = word[:j] + \"*\" + word[j+1:]\n            nei[pattern].append(word)\n    visit = set([beginWord])\n    q = collections.deque([beginWord])\n    res = 1\n    while q:\n        for i in range(len(q)):\n            word = q.popleft()\n            if word == endWord: return res\n            for j in range(len(word)):\n                pattern = word[:j] + \"*\" + word[j+1:]\n                for neighbor in nei[pattern]:\n                    if neighbor not in visit:\n                        visit.add(neighbor)\n                        q.append(neighbor)\n        res += 1\n    return 0"
        },
        {
            "title": "Group Anagrams",
            "desc": "Group strings that are anagrams of each other.",
            "code": "import collections\ndef groupAnagrams(strs):\n    res = collections.defaultdict(list)\n    for s in strs:\n        count = [0] * 26\n        for c in s:\n            count[ord(c) - ord(\"a\")] += 1\n        res[tuple(count)].append(s)\n    return res.values()"
        },
        {
            "title": "Merge Intervals",
            "desc": "Merge all overlapping intervals.",
            "code": "def merge(intervals):\n    intervals.sort(key = lambda i : i[0])\n    output = [intervals[0]]\n    for start, end in intervals[1:]:\n        lastEnd = output[-1][1]\n        if start <= lastEnd:\n            output[-1][1] = max(lastEnd, end)\n        else:\n            output.append([start, end])\n    return output"
        },
        {
            "title": "Subsets",
            "desc": "Return all possible subsets (the power set).",
            "code": "def subsets(nums):\n    res = []\n    subset = []\n    def dfs(i):\n        if i >= len(nums):\n            res.append(subset.copy())\n            return\n        subset.append(nums[i])\n        dfs(i + 1)\n        subset.pop()\n        dfs(i + 1)\n    dfs(0)\n    return res"
        },
        {
            "title": "Permutations",
            "desc": "Return all possible permutations of a list of distinct integers.",
            "code": "def permute(nums):\n    res = []\n    if len(nums) == 1:\n        return [nums[:]]\n    for i in range(len(nums)):\n        n = nums.pop(0)\n        perms = permute(nums)\n        for p in perms:\n            p.append(n)\n        res.extend(perms)\n        nums.append(n)\n    return res"
        },
        {
            "title": "Combination Sum",
            "desc": "Return a list of all unique combinations where the chosen numbers sum to target.",
            "code": "def combinationSum(candidates, target):\n    res = []\n    def dfs(i, cur, total):\n        if total == target:\n            res.append(cur.copy())\n            return\n        if i >= len(candidates) or total > target:\n            return\n        cur.append(candidates[i])\n        dfs(i, cur, total + candidates[i])\n        cur.pop()\n        dfs(i + 1, cur, total)\n    dfs(0, [], 0)\n    return res"
        },
        {
            "title": "Trapping Rain Water",
            "desc": "Compute how much water it can trap after raining.",
            "code": "def trap(height):\n    if not height: return 0\n    l, r = 0, len(height) - 1\n    leftMax, rightMax = height[l], height[r]\n    res = 0\n    while l < r:\n        if leftMax < rightMax:\n            l += 1\n            leftMax = max(leftMax, height[l])\n            res += leftMax - height[l]\n        else:\n            r -= 1\n            rightMax = max(rightMax, height[r])\n            res += rightMax - height[r]\n    return res"
        },
        {
            "title": "Spiral Matrix",
            "desc": "Return all elements of the matrix in spiral order.",
            "code": "def spiralOrder(matrix):\n    res = []\n    left, right = 0, len(matrix[0])\n    top, bottom = 0, len(matrix)\n    while left < right and top < bottom:\n        for i in range(left, right):\n            res.append(matrix[top][i])\n        top += 1\n        for i in range(top, bottom):\n            res.append(matrix[i][right - 1])\n        right -= 1\n        if not (left < right and top < bottom):\n            break\n        for i in range(right - 1, left - 1, -1):\n            res.append(matrix[bottom - 1][i])\n        bottom -= 1\n        for i in range(bottom - 1, top - 1, -1):\n            res.append(matrix[i][left])\n        left += 1\n    return res"
        },
        {
            "title": "Jump Game",
            "desc": "Determine if you are able to reach the last index.",
            "code": "def canJump(nums):\n    goal = len(nums) - 1\n    for i in range(len(nums) - 1, -1, -1):\n        if i + nums[i] >= goal:\n            goal = i\n    return goal == 0"
        },
        {
            "title": "Longest Palindromic Substring",
            "desc": "Find the longest palindromic substring in s.",
            "code": "def longestPalindrome(s):\n    res = \"\"\n    resLen = 0\n    for i in range(len(s)):\n        # odd\n        l, r = i, i\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > resLen:\n                res = s[l:r+1]\n                resLen = r - l + 1\n            l -= 1\n            r += 1\n        # even\n        l, r = i, i + 1\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            if (r - l + 1) > resLen:\n                res = s[l:r+1]\n                resLen = r - l + 1\n            l -= 1\n            r += 1\n    return res"
        },
        {
            "title": "Unique Paths",
            "desc": "Find the number of possible unique paths from top-left to bottom-right.",
            "code": "def uniquePaths(m, n):\n    row = [1] * n\n    for i in range(m - 1):\n        newRow = [1] * n\n        for j in range(n - 2, -1, -1):\n            newRow[j] = newRow[j + 1] + row[j]\n        row = newRow\n    return row[0]"
        }
    ],
    "searching": [{
            "title": "Linear Search",
            "desc": "Search for an element by checking each one sequentially.",
            "code": "def linear_search(arr, x):\n    for i in range(len(arr)):\n        if arr[i] == x:\n            return i\n    return -1"
        },
        {
            "title": "Binary Search",
            "desc": "Search a sorted array by repeatedly dividing the search interval in half.",
            "code": "def binary_search(arr, x):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] < x:\n            low = mid + 1\n        elif arr[mid] > x:\n            high = mid - 1\n        else:\n            return mid\n    return -1"
        },
        {
            "title": "Ternary Search",
            "desc": "A divide-and-conquer algorithm that divides the array into three parts.",
            "code": "def ternary_search(l, r, key, ar):\n    if (r >= l):\n        mid1 = l + (r - l) // 3\n        mid2 = r - (r - l) // 3\n        if (ar[mid1] == key): return mid1\n        if (ar[mid2] == key): return mid2\n        if (key < ar[mid1]):\n            return ternary_search(l, mid1 - 1, key, ar)\n        elif (key > ar[mid2]):\n            return ternary_search(mid2 + 1, r, key, ar)\n        else:\n            return ternary_search(mid1 + 1, mid2 - 1, key, ar)\n    return -1"
        },
        {
            "title": "Jump Search",
            "desc": "Search in a sorted array by jumping fixed steps.",
            "code": "import math\ndef jump_search(arr, x):\n    n = len(arr)\n    step = math.sqrt(n)\n    prev = 0\n    while arr[int(min(step, n)-1)] < x:\n        prev = step\n        step += math.sqrt(n)\n        if prev >= n: return -1\n    while arr[int(prev)] < x:\n        prev += 1\n        if prev == min(step, n): return -1\n    if arr[int(prev)] == x: return int(prev)\n    return -1"
        },
        {
            "title": "Exponential Search",
            "desc": "Search by finding the range where the element may exist and then performing binary search.",
            "code": "def exponential_search(arr, x):\n    if arr[0] == x: return 0\n    i = 1\n    while i < len(arr) and arr[i] <= x:\n        i = i * 2\n    return binary_search_recursive(arr, i // 2, min(i, len(arr)-1), x)\n\ndef binary_search_recursive(arr, l, r, x):\n    if r >= l:\n        mid = l + (r - l) // 2\n        if arr[mid] == x: return mid\n        if arr[mid] > x: return binary_search_recursive(arr, l, mid - 1, x)\n        return binary_search_recursive(arr, mid + 1, r, x)\n    return -1"
        },
        {
            "title": "Interpolation Search",
            "desc": "An algorithm for searching in a sorted array where values are uniformly distributed.",
            "code": "def interpolation_search(arr, x):\n    low, high = 0, len(arr) - 1\n    while low <= high and x >= arr[low] and x <= arr[high]:\n        if low == high:\n            if arr[low] == x: return low\n            return -1\n        pos = low + int(((float(high - low) / (arr[high] - arr[low])) * (x - arr[low])))\n        if arr[pos] == x: return pos\n        if arr[pos] < x: low = pos + 1\n        else: high = pos - 1\n    return -1"
        },
        {
            "title": "Fibonacci Search",
            "desc": "A comparison-based search algorithm that uses Fibonacci numbers to divide the array.",
            "code": "def fibonacci_search(arr, x):\n    fib2 = 0\n    fib1 = 1\n    fibM = fib2 + fib1\n    while (fibM < len(arr)):\n        fib2 = fib1\n        fib1 = fibM\n        fibM = fib2 + fib1\n    offset = -1\n    while (fibM > 1):\n        i = min(offset + fib2, len(arr) - 1)\n        if (arr[i] < x):\n            fibM, fib1 = fib1, fib2\n            fib2 = fibM - fib1\n            offset = i\n        elif (arr[i] > x):\n            fibM = fib2\n            fib1 = fib1 - fib2\n            fib2 = fibM - fib1\n        else: return i\n    if (fib1 and arr[offset + 1] == x): return offset + 1\n    return -1"
        },
        {
            "title": "Breadth-First Search (BFS)",
            "desc": "Traverse or search graph structures level by level.",
            "code": "from collections import deque\ndef bfs(graph, start):\n    visited = set([start])\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)"
        },
        {
            "title": "Depth-First Search (DFS)",
            "desc": "Traverse or search graph structures by exploring as far as possible along each branch.",
            "code": "def dfs(graph, start, visited=None):\n    if visited is None:\n        visited = set()\n    visited.add(start)\n    for next_node in graph[start]:\n        if next_node not in visited:\n            dfs(graph, next_node, visited)\n    return visited"
        },
        {
            "title": "Best-First Search",
            "desc": "An informed search algorithm that uses an evaluation function to decide which adjacent node is most promising.",
            "code": "from queue import PriorityQueue\ndef best_first_search(graph, start, target, h):\n    visited = set()\n    pq = PriorityQueue()\n    pq.put((h[start], start))\n    while not pq.empty():\n        u = pq.get()[1]\n        if u == target: break\n        for v, weight in graph[u]:\n            if v not in visited:\n                visited.add(v)\n                pq.put((h[v], v))"
        }
    ],
    "sorting": [{
            "title": "Bubble Sort",
            "desc": "Repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order.",
            "code": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if arr[j] > arr[j + 1]:\n                arr[j], arr[j + 1] = arr[j + 1], arr[j]"
        },
        {
            "title": "Selection Sort",
            "desc": "Repeatedly find the minimum element from the unsorted part and put it at the beginning.",
            "code": "def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i + 1, len(arr)):\n            if arr[min_idx] > arr[j]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]"
        },
        {
            "title": "Insertion Sort",
            "desc": "Build the final sorted array one item at a time by inserting each element into its proper place.",
            "code": "def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and key < arr[j]:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key"
        },
        {
            "title": "Merge Sort",
            "desc": "Divide the array into halves, sort them, and then merge them back together.",
            "code": "def merge_sort(arr):\n    if len(arr) > 1:\n        mid = len(arr) // 2\n        L = arr[:mid]\n        R = arr[mid:]\n        merge_sort(L)\n        merge_sort(R)\n        i = j = k = 0\n        while i < len(L) and j < len(R):\n            if L[i] < R[j]:\n                arr[k] = L[i]; i += 1\n            else:\n                arr[k] = R[j]; j += 1\n            k += 1\n        while i < len(L):\n            arr[k] = L[i]; i += 1; k += 1\n        while j < len(R):\n            arr[k] = R[j]; j += 1; k += 1"
        },
        {
            "title": "Quick Sort",
            "desc": "Pick a pivot and partition the array around it, then recursively sort the sub-arrays.",
            "code": "def quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)"
        },
        {
            "title": "Heap Sort",
            "desc": "Convert the array into a heap and repeatedly extract the maximum element.",
            "code": "def heapify(arr, n, i):\n    largest = i\n    l, r = 2 * i + 1, 2 * i + 2\n    if l < n and arr[i] < arr[l]: largest = l\n    if r < n and arr[largest] < arr[r]: largest = r\n    if largest != i:\n        arr[i], arr[largest] = arr[largest], arr[i]\n        heapify(arr, n, largest)\n\ndef heap_sort(arr):\n    n = len(arr)\n    for i in range(n // 2 - 1, -1, -1): heapify(arr, n, i)\n    for i in range(n - 1, 0, -1):\n        arr[i], arr[0] = arr[0], arr[i]\n        heapify(arr, i, 0)"
        },
        {
            "title": "Shell Sort",
            "desc": "A generalization of insertion sort that allows the exchange of items that are far apart.",
            "code": "def shell_sort(arr):\n    n = len(arr)\n    gap = n // 2\n    while gap > 0:\n        for i in range(gap, n):\n            temp = arr[i]\n            j = i\n            while j >= gap and arr[j - gap] > temp:\n                arr[j] = arr[j - gap]\n                j -= gap\n            arr[j] = temp\n        gap //= 2"
        },
        {
            "title": "Counting Sort",
            "desc": "Sort by counting the occurrences of each unique element.",
            "code": "def counting_sort(arr):\n    max_val = max(arr)\n    count = [0] * (max_val + 1)\n    for x in arr: count[x] += 1\n    for i in range(1, len(count)): count[i] += count[i-1]\n    output = [0] * len(arr)\n    for x in reversed(arr):\n        output[count[x] - 1] = x\n        count[x] -= 1\n    return output"
        },
        {
            "title": "Radix Sort",
            "desc": "Sort numbers by processing individual digits.",
            "code": "def counting_sort_for_radix(arr, exp):\n    n = len(arr)\n    output = [0] * n\n    count = [0] * 10\n    for i in range(n):\n        index = (arr[i] // exp)\n        count[index % 10] += 1\n    for i in range(1, 10): count[i] += count[i - 1]\n    i = n - 1\n    while i >= 0:\n        index = (arr[i] // exp)\n        output[count[index % 10] - 1] = arr[i]\n        count[index % 10] -= 1\n        i -= 1\n    for i in range(len(arr)): arr[i] = output[i]\n\ndef radix_sort(arr):\n    max_val = max(arr)\n    exp = 1\n    while max_val // exp > 0:\n        counting_sort_for_radix(arr, exp)\n        exp *= 10"
        },
        {
            "title": "Bucket Sort",
            "desc": "Distribute elements into buckets and then sort each bucket individually.",
            "code": "def bucket_sort(arr):\n    bucket = []\n    slot_num = 10\n    for i in range(slot_num): bucket.append([])\n    for j in arr:\n        index_b = int(slot_num * j)\n        bucket[index_b].append(j)\n    for i in range(slot_num): bucket[i] = sorted(bucket[i])\n    k = 0\n    for i in range(slot_num):\n        for j in range(len(bucket[i])):\n            arr[k] = bucket[i][j]\n            k += 1"
        },
        {
            "title": "Timsort",
            "desc": "A hybrid sorting algorithm derived from merge sort and insertion sort.",
            "code": "def timsort(arr):\n    arr.sort() # Python's built-in sort uses Timsort"
        },
        {
            "title": "Comb Sort",
            "desc": "Improvement on bubble sort using a gap greater than one.",
            "code": "def get_next_gap(gap):\n    gap = (gap * 10) // 13\n    if gap < 1: return 1\n    return gap\n\ndef comb_sort(arr):\n    n = len(arr)\n    gap = n\n    swapped = True\n    while gap != 1 or swapped:\n        gap = get_next_gap(gap)\n        swapped = False\n        for i in range(0, n - gap):\n            if arr[i] > arr[i + gap]:\n                arr[i], arr[i + gap] = arr[i + gap], arr[i]\n                swapped = True"
        },
        {
            "title": "Pigeonhole Sort",
            "desc": "Sort by moving elements into pigeonholes corresponding to their values.",
            "code": "def pigeonhole_sort(a):\n    min_val, max_val = min(a), max(a)\n    size = max_val - min_val + 1\n    holes = [0] * size\n    for x in a: holes[x - min_val] += 1\n    i = 0\n    for count in range(size):\n        while holes[count] > 0:\n            holes[count] -= 1\n            a[i] = count + min_val\n            i += 1"
        },
        {
            "title": "Cycle Sort",
            "desc": "A comparison sort that is theoretically optimal in terms of the total number of writes to the original array.",
            "code": "def cycle_sort(arr):\n    writes = 0\n    for cycleStart in range(0, len(arr) - 1):\n        item = arr[cycleStart]\n        pos = cycleStart\n        for i in range(cycleStart + 1, len(arr)):\n            if arr[i] < item: pos += 1\n        if pos == cycleStart: continue\n        while item == arr[pos]: pos += 1\n        arr[pos], item = item, arr[pos]\n        writes += 1\n        while pos != cycleStart:\n            pos = cycleStart\n            for i in range(cycleStart + 1, len(arr)):\n                if arr[i] < item: pos += 1\n            while item == arr[pos]: pos += 1\n            arr[pos], item = item, arr[pos]\n            writes += 1"
        },
        {
            "title": "Cocktail Shaker Sort",
            "desc": "A variation of bubble sort that sorts in both directions in each pass.",
            "code": "def cocktail_shaker_sort(a):\n    n = len(a)\n    swapped = True\n    start, end = 0, n - 1\n    while swapped:\n        swapped = False\n        for i in range(start, end):\n            if a[i] > a[i + 1]:\n                a[i], a[i + 1] = a[i + 1], a[i]\n                swapped = True\n        if not swapped: break\n        swapped = False\n        end -= 1\n        for i in range(end - 1, start - 1, -1):\n            if a[i] > a[i + 1]:\n                a[i], a[i + 1] = a[i + 1], a[i]\n                swapped = True\n        start += 1"
        }
    ],
    "graphs": [{
            "title": "Dijkstra\u2019s Algorithm",
            "desc": "Find the shortest paths between nodes in a graph.",
            "code": "import heapq\ndef dijkstra(graph, start):\n    pq = [(0, start)]\n    distances = {node: float('inf') for node in graph}\n    distances[start] = 0\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > distances[u]: continue\n        for v, weight in graph[u].items():\n            if distances[u] + weight < distances[v]:\n                distances[v] = distances[u] + weight\n                heapq.heappush(pq, (distances[v], v))\n    return distances"
        },
        {
            "title": "Bellman-Ford",
            "desc": "Computes shortest paths from a single source vertex to all other vertices, even with negative edge weights.",
            "code": "def bellman_ford(graph, nodes, start):\n    dist = {node: float('inf') for node in nodes}\n    dist[start] = 0\n    for _ in range(len(nodes) - 1):\n        for u, v, w in graph:\n            if dist[u] != float('inf') and dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    for u, v, w in graph:\n        if dist[u] != float('inf') and dist[u] + w < dist[v]:\n            print(\"Negative cycle detected\")\n    return dist"
        },
        {
            "title": "Floyd-Warshall",
            "desc": "Find shortest paths between all pairs of vertices in a weighted graph.",
            "code": "def floyd_warshall(graph, n):\n    dist = [[float('inf')] * n for _ in range(n)]\n    for i in range(n): dist[i][i] = 0\n    for u, v, w in graph: dist[u][v] = w\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])\n    return dist"
        },
        {
            "title": "Kruskal\u2019s",
            "desc": "Find the minimum spanning tree of a graph.",
            "code": "def kruskal(n, edges):\n    edges.sort(key=lambda x: x[2])\n    parent = list(range(n))\n    def find(i):\n        if parent[i] == i: return i\n        return find(parent[i])\n    mst = []\n    for u, v, w in edges:\n        root_u, root_v = find(u), find(v)\n        if root_u != root_v:\n            mst.append((u, v, w))\n            parent[root_u] = root_v\n    return mst"
        },
        {
            "title": "Prim\u2019s",
            "desc": "Another algorithm to find the minimum spanning tree for a weighted undirected graph.",
            "code": "import heapq\ndef prim(n, graph):\n    mst = []\n    visited = [False] * n\n    pq = [(0, 0, -1)] # (weight, curr_node, parent)\n    while pq:\n        w, u, p = heapq.heappop(pq)\n        if visited[u]: continue\n        visited[u] = True\n        if p != -1: mst.append((p, u, w))\n        for v, weight in graph[u]:\n            if not visited[v]: heapq.heappush(pq, (weight, v, u))\n    return mst"
        },
        {
            "title": "Topological Sort",
            "desc": "Linear ordering of vertices such that for every directed edge uv, vertex u comes before v.",
            "code": "def topological_sort(v, adj):\n    visited = [False] * v\n    stack = []\n    def dfs(u):\n        visited[u] = True\n        for neighbor in adj[u]:\n            if not visited[neighbor]: dfs(neighbor)\n        stack.append(u)\n    for i in range(v):\n        if not visited[i]: dfs(i)\n    return stack[::-1]"
        },
        {
            "title": "Kahn\u2019s",
            "desc": "Topological sort algorithm using in-degrees of nodes.",
            "code": "from collections import deque\ndef kahn(v, adj):\n    in_degree = [0] * v\n    for i in range(v):\n        for j in adj[i]: in_degree[j] += 1\n    queue = deque([i for i in range(v) if in_degree[i] == 0])\n    topo_order = []\n    while queue:\n        u = queue.popleft()\n        topo_order.append(u)\n        for neighbor in adj[u]:\n            in_degree[neighbor] -= 1\n            if in_degree[neighbor] == 0: queue.append(neighbor)\n    return topo_order"
        },
        {
            "title": "Johnson\u2019s",
            "desc": "Find all-pairs shortest paths in a sparse, weighted directed graph.",
            "code": "# Complexity: Requires Bellman-Ford and Dijkstra\n# 1. Add a source s and 0-weight edges to all nodes.\n# 2. Use Bellman-Ford to find h(v) = dist(s, v).\n# 3. Reweight edges: w'(u,v) = w(u,v) + h(u) - h(v).\n# 4. Run Dijkstra from each node using w'."
        },
        {
            "title": "Tarjan\u2019s",
            "desc": "Find strongly connected components in a directed graph.",
            "code": "def tarjans(v, adj):\n    dfn, low = [-1] * v, [-1] * v\n    stack, in_stack = [], [False] * v\n    timer = 0\n    def dfs(u):\n        nonlocal timer\n        dfn[u] = low[u] = timer\n        timer += 1\n        stack.append(u); in_stack[u] = True\n        for v_node in adj[u]:\n            if dfn[v_node] == -1:\n                dfs(v_node)\n                low[u] = min(low[u], low[v_node])\n            elif in_stack[v_node]:\n                low[u] = min(low[u], dfn[v_node])\n        if low[u] == dfn[u]:\n            component = []\n            while True:\n                node = stack.pop(); in_stack[node] = False\n                component.append(node)\n                if node == u: break\n            print(\"SCC:\", component)"
        },
        {
            "title": "Kosaraju\u2019s",
            "desc": "Find strongly connected components using two passes of DFS.",
            "code": "def kosaraju(v, adj):\n    stack = []\n    visited = [False] * v\n    def dfs1(u):\n        visited[u] = True\n        for neighbor in adj[u]:\n            if not visited[neighbor]: dfs1(neighbor)\n        stack.append(u)\n    for i in range(v):\n        if not visited[i]: dfs1(i)\n    # Transpose graph and run DFS in stack order\n    adj_t = [[] for _ in range(v)]\n    for u in range(v):\n        for neighbor in adj[u]: adj_t[neighbor].append(u)\n    visited = [False] * v\n    while stack:\n        u = stack.pop()\n        if not visited[u]:\n            # Run DFS on adj_t starting from u\n            pass"
        },
        {
            "title": "Ford-Fulkerson",
            "desc": "Compute the maximum flow in a flow network.",
            "code": "def ford_fulkerson(graph, source, sink):\n    parent = [-1] * len(graph)\n    max_flow = 0\n    def bfs(s, t, parent):\n        visited = [False] * len(graph)\n        queue = [s]; visited[s] = True\n        while queue:\n            u = queue.pop(0)\n            for v, cap in enumerate(graph[u]):\n                if not visited[v] and cap > 0:\n                    queue.append(v); visited[v] = True; parent[v] = u\n                    if v == t: return True\n        return False\n    while bfs(source, sink, parent):\n        path_flow = float('inf')\n        s = sink\n        while s != source:\n            path_flow = min(path_flow, graph[parent[s]][s])\n            s = parent[s]\n        max_flow += path_flow\n        v = sink\n        while v != source:\n            u = parent[v]\n            graph[u][v] -= path_flow\n            graph[v][u] += path_flow\n            v = parent[v]\n    return max_flow"
        },
        {
            "title": "Edmonds-Karp",
            "desc": "Implementation of Ford-Fulkerson using BFS to find augmenting paths.",
            "code": "# Edmonds-Karp is specifically Ford-Fulkerson using BFS.\n# This ensures a polynomial time complexity O(VE^2)."
        },
        {
            "title": "A* Search",
            "desc": "An informed search algorithm used in pathfinding and graph traversal.",
            "code": "import heapq\ndef a_star(graph, start, goal, h):\n    pq = [(0 + h(start), 0, start)]\n    g_score = {node: float('inf') for node in graph}\n    g_score[start] = 0\n    while pq:\n        f, g, u = heapq.heappop(pq)\n        if u == goal: return g\n        for v, weight in graph[u].items():\n            tentative_g = g + weight\n            if tentative_g < g_score[v]:\n                g_score[v] = tentative_g\n                f_score = tentative_g + h(v)\n                heapq.heappush(pq, (f_score, tentative_g, v))"
        },
        {
            "title": "Lee Algorithm",
            "desc": "Find the shortest path in a maze using BFS.",
            "code": "from collections import deque\ndef lee_algorithm(grid, start, end):\n    rows, cols = len(grid), len(grid[0])\n    q = deque([(start, 0)])\n    visited = {start}\n    while q:\n        (r, c), dist = q.popleft()\n        if (r, c) == end: return dist\n        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:\n            nr, nc = r+dr, c+dc\n            if 0<=nr<rows and 0<=nc<cols and grid[nr][nc]==1 and (nr,nc) not in visited:\n                visited.add((nr,nc))\n                q.append(((nr,nc), dist+1))"
        },
        {
            "title": "Bridges in a Graph",
            "desc": "Find edges whose removal increases the number of connected components.",
            "code": "def find_bridges(v, adj):\n    tin, low = [-1]*v, [-1]*v\n    timer = 0\n    def dfs(u, p=-1):\n        nonlocal timer\n        tin[u] = low[u] = timer; timer += 1\n        for v_node in adj[u]:\n            if v_node == p: continue\n            if tin[v_node] != -1: low[u] = min(low[u], tin[v_node])\n            else:\n                dfs(v_node, u)\n                low[u] = min(low[u], low[v_node])\n                if low[v_node] > tin[u]: print(f\"Bridge: {u}-{v_node}\")\n    for i in range(v):\n        if tin[i] == -1: dfs(i)"
        }
    ],
    "trees": [{
            "title": "Binary Tree Traversals",
            "desc": "Inorder, Preorder, and Postorder traversals.",
            "code": "def inorder(root):\n    return inorder(root.left) + [root.val] + inorder(root.right) if root else []\ndef preorder(root):\n    return [root.val] + preorder(root.left) + preorder(root.right) if root else []\ndef postorder(root):\n    return postorder(root.left) + postorder(root.right) + [root.val] if root else []"
        },
        {
            "title": "Level Order Traversal",
            "desc": "Traverse the tree level by level.",
            "code": "from collections import deque\ndef level_order(root):\n    if not root: return []\n    res, q = [], deque([root])\n    while q:\n        level = []\n        for _ in range(len(q)):\n            node = q.popleft()\n            level.append(node.val)\n            if node.left: q.append(node.left)\n            if node.right: q.append(node.right)\n        res.append(level)\n    return res"
        },
        {
            "title": "Lowest Common Ancestor (LCA)",
            "desc": "Find the lowest common ancestor of two nodes in a tree.",
            "code": "def lca(root, p, q):\n    if not root or root == p or root == q: return root\n    left = lca(root.left, p, q)\n    right = lca(root.right, p, q)\n    return root if left and right else left or right"
        },
        {
            "title": "Fenwick Tree",
            "desc": "A data structure that can efficiently update elements and calculate prefix sums.",
            "code": "class FenwickTree:\n    def __init__(self, n):\n        self.tree = [0] * (n + 1)\n    def update(self, i, delta):\n        i += 1\n        while i < len(self.tree):\n            self.tree[i] += delta\n            i += i & (-i)\n    def query(self, i):\n        i += 1; s = 0\n        while i > 0:\n            s += self.tree[i]\n            i -= i & (-i)\n        return s"
        },
        {
            "title": "Segment Tree",
            "desc": "A tree data structure used for storing information about intervals, or segments.",
            "code": "class SegmentTree:\n    def __init__(self, data):\n        self.n = len(data)\n        self.tree = [0] * (2 * self.n)\n        for i in range(self.n): self.tree[self.n + i] = data[i]\n        for i in range(self.n - 1, 0, -1):\n            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]\n    def update(self, i, val):\n        i += self.n; self.tree[i] = val\n        while i > 1:\n            self.tree[i >> 1] = self.tree[i] + self.tree[i ^ 1]\n            i >>= 1\n    def query(self, l, r):\n        res = 0; l += self.n; r += self.n\n        while l < r:\n            if l & 1: res += self.tree[l]; l += 1\n            if r & 1: r -= 1; res += self.tree[r]\n            l >>= 1; r >>= 1\n        return res"
        },
        {
            "title": "AVL Tree Rotation",
            "desc": "Self-balancing binary search tree rotations.",
            "code": "def left_rotate(z):\n    y = z.right; T2 = y.left\n    y.left = z; z.right = T2\n    z.height = 1 + max(get_height(z.left), get_height(z.right))\n    y.height = 1 + max(get_height(y.left), get_height(y.right))\n    return y"
        },
        {
            "title": "Red-Black Tree Rebalancing",
            "desc": "Rebalancing operations (rotations and color changes) for a Red-Black Tree.",
            "code": "# Rebalancing involves:\n# 1. Recolor parent and uncle.\n# 2. Rotations if node is a 'triangle' or 'line' with parent and grandparent."
        },
        {
            "title": "B-Tree Insertion/Deletion",
            "desc": "Operations for a self-balancing search tree that can have more than two children.",
            "code": "# Insertion: Split node if full.\n# Deletion: Borrow from sibling or merge if underflow."
        },
        {
            "title": "Splay Tree",
            "desc": "A self-adjusting binary search tree where recently accessed elements are moved to the root.",
            "code": "def splay(root, key):\n    if not root or root.key == key: return root\n    if root.key > key:\n        if not root.left: return root\n        # Zig-Zig or Zig-Zag...\n        pass"
        },
        {
            "title": "Huffman Coding",
            "desc": "An algorithm used for lossless data compression.",
            "code": "import heapq\ndef huffman_coding(chars, freq):\n    pq = [[f, [c, \"\"]] for c, f in zip(chars, freq)]\n    heapq.heapify(pq)\n    while len(pq) > 1:\n        lo = heapq.heappop(pq)\n        hi = heapq.heappop(pq)\n        for pair in lo[1:]: pair[1] = '0' + pair[1]\n        for pair in hi[1:]: pair[1] = '1' + pair[1]\n        heapq.heappush(pq, [lo[0] + hi[0]] + lo[1:] + hi[1:])\n    return sorted(heapq.heappop(pq)[1:], key=lambda p: (len(p[-1]), p))"
        }
    ],
    "math": [{
            "title": "Euclidean Algorithm (GCD)",
            "desc": "Find the greatest common divisor of two integers.",
            "code": "def gcd(a, b):\n    while b: a, b = b, a % b\n    return a"
        },
        {
            "title": "Extended Euclidean Algorithm",
            "desc": "Finds GCD and the coefficients x, y such that ax + by = gcd(a, b).",
            "code": "def extended_gcd(a, b):\n    if a == 0: return b, 0, 1\n    gcd, x1, y1 = extended_gcd(b % a, a)\n    x = y1 - (b // a) * x1\n    y = x1\n    return gcd, x, y"
        },
        {
            "title": "Sieve of Eratosthenes",
            "desc": "Find all prime numbers up to a given limit.",
            "code": "def sieve(n):\n    primes = [True] * (n + 1)\n    p = 2\n    while p * p <= n:\n        if primes[p]:\n            for i in range(p * p, n + 1, p): primes[i] = False\n        p += 1\n    return [p for p in range(2, n + 1) if primes[p]]"
        },
        {
            "title": "Fast Fourier Transform (FFT)",
            "desc": "Algorithm to compute the discrete Fourier transform (DFT) and its inverse.",
            "code": "import numpy as np\ndef fft(x):\n    n = len(x)\n    if n <= 1: return x\n    even = fft(x[0::2])\n    odd = fft(x[1::2])\n    T = [np.exp(-2j * np.pi * k / n) * odd[k] for k in range(n // 2)]\n    return [even[k] + T[k] for k in range(n // 2)] + [even[k] - T[k] for k in range(n // 2)]"
        },
        {
            "title": "Newton-Raphson Method",
            "desc": "Finding successively better approximations to the roots of a real-valued function.",
            "code": "def newton_raphson(f, df, x0, tol=1e-7):\n    while abs(f(x0)) > tol:\n        x0 = x0 - f(x0) / df(x0)\n    return x0"
        },
        {
            "title": "Karatsuba Algorithm",
            "desc": "A fast multiplication algorithm for large integers.",
            "code": "def karatsuba(x, y):\n    if x < 10 or y < 10: return x * y\n    n = max(len(str(x)), len(str(y))) // 2\n    a, b = x // 10**n, x % 10**n\n    c, d = y // 10**n, y % 10**n\n    ac = karatsuba(a, c)\n    bd = karatsuba(b, d)\n    ad_plus_bc = karatsuba(a+b, c+d) - ac - bd\n    return ac * 10**(2*n) + ad_plus_bc * 10**n + bd"
        },
        {
            "title": "Strassen\u2019s Algorithm",
            "desc": "A faster method for matrix multiplication.",
            "code": "# Strassen's uses 7 multiplications instead of 8 for 2x2 matrices.\n# It works recursively by dividing matrices into quadrants."
        },
        {
            "title": "Miller-Rabin Primality Test",
            "desc": "A probabilistic primality test.",
            "code": "import random\ndef is_prime(n, k=5):\n    if n <= 1: return False\n    if n <= 3: return True\n    r, d = 0, n - 1\n    while d % 2 == 0: r += 1; d //= 2\n    for _ in range(k):\n        a = random.randint(2, n - 2)\n        x = pow(a, d, n)\n        if x == 1 or x == n - 1: continue\n        for _ in range(r - 1):\n            x = pow(x, 2, n)\n            if x == n - 1: break\n        else: return False\n    return True"
        },
        {
            "title": "Chinese Remainder Theorem",
            "desc": "Solves a system of simultaneous congruences with pairwise coprime moduli.",
            "code": "def crt(n, a):\n    sum = 0\n    prod = 1\n    for x in n: prod *= x\n    for n_i, a_i in zip(n, a):\n        p = prod // n_i\n        sum += a_i * extended_gcd(p, n_i)[1] * p\n    return sum % prod"
        },
        {
            "title": "Simpson\u2019s Rule",
            "desc": "A method for numerical integration.",
            "code": "def simpsons_rule(f, a, b, n):\n    h = (b - a) / n\n    s = f(a) + f(b)\n    for i in range(1, n, 2): s += 4 * f(a + i * h)\n    for i in range(2, n, 2): s += 2 * f(a + i * h)\n    return s * h / 3"
        },
        {
            "title": "Gaussian Elimination",
            "desc": "An algorithm for solving systems of linear equations.",
            "code": "import numpy as np\ndef gaussian_elimination(A, b):\n    n = len(b)\n    for i in range(n):\n        for j in range(i+1, n):\n            ratio = A[j][i]/A[i][i]\n            A[j] -= ratio * A[i]\n            b[j] -= ratio * b[i]\n    # Back substitution...\n    return np.linalg.solve(A, b)"
        },
        {
            "title": "Power Iteration",
            "desc": "Find the dominant eigenvalue and eigenvector of a matrix.",
            "code": "import numpy as np\ndef power_iteration(A, num_simulations: int):\n    b_k = np.random.rand(A.shape[1])\n    for _ in range(num_simulations):\n        b_k1 = np.dot(A, b_k)\n        b_k = b_k1 / np.linalg.norm(b_k1)\n    return b_k"
        },
        {
            "title": "Euclidean Distance",
            "desc": "The straight-line distance between two points.",
            "code": "import math\ndef euclidean_distance(p1, p2):\n    return math.sqrt(sum((a - b) ** 2 for a, b in zip(p1, p2)))"
        },
        {
            "title": "Manhatten Distance",
            "desc": "The distance between two points measured along axes at right angles.",
            "code": "def manhattan_distance(p1, p2):\n    return sum(abs(a - b) for a, b in zip(p1, p2))"
        },
        {
            "title": "Monte Carlo Method",
            "desc": "Algorithms that rely on repeated random sampling to obtain numerical results.",
            "code": "import random\ndef estimate_pi(n):\n    inside = 0\n    for _ in range(n):\n        x, y = random.random(), random.random()\n        if x**2 + y**2 <= 1: inside += 1\n    return 4 * inside / n"
        }
    ],
    "dp": [{
            "title": "Knapsack Problem (0/1)",
            "desc": "Select items with given weights and values to maximize total value without exceeding capacity.",
            "code": "def knapsack(W, wt, val, n):\n    dp = [[0 for x in range(W + 1)] for x in range(n + 1)]\n    for i in range(n + 1):\n        for w in range(W + 1):\n            if i == 0 or w == 0: dp[i][w] = 0\n            elif wt[i-1] <= w:\n                dp[i][w] = max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w])\n            else: dp[i][w] = dp[i-1][w]\n    return dp[n][W]"
        },
        {
            "title": "Longest Common Subsequence (LCS)",
            "desc": "Find the length of the longest subsequence present in both strings.",
            "code": "def lcs(X, Y):\n    m, n = len(X), len(Y)\n    L = [[0] * (n + 1) for i in range(m + 1)]\n    for i in range(m + 1):\n        for j in range(n + 1):\n            if i == 0 or j == 0: L[i][j] = 0\n            elif X[i-1] == Y[j-1]: L[i][j] = L[i-1][j-1] + 1\n            else: L[i][j] = max(L[i-1][j], L[i][j-1])\n    return L[m][n]"
        },
        {
            "title": "Longest Increasing Subsequence (LIS)",
            "desc": "Find the length of the longest subsequence of a given sequence such that all elements of the subsequence are sorted in increasing order.",
            "code": "def lis(arr):\n    n = len(arr)\n    lis = [1] * n\n    for i in range(1, n):\n        for j in range(0, i):\n            if arr[i] > arr[j] and lis[i] < lis[j] + 1:\n                lis[i] = lis[j] + 1\n    return max(lis) if n > 0 else 0"
        },
        {
            "title": "Edit Distance (Levenshtein)",
            "desc": "Find the minimum number of operations required to transform one string into another.",
            "code": "def edit_distance(str1, str2, m, n):\n    dp = [[0 for x in range(n + 1)] for x in range(m + 1)]\n    for i in range(m + 1):\n        for j in range(n + 1):\n            if i == 0: dp[i][j] = j\n            elif j == 0: dp[i][j] = i\n            elif str1[i-1] == str2[j-1]: dp[i][j] = dp[i-1][j-1]\n            else: dp[i][j] = 1 + min(dp[i][j-1], dp[i-1][j], dp[i-1][j-1])\n    return dp[m][n]"
        },
        {
            "title": "Matrix Chain Multiplication",
            "desc": "Find the most efficient way to multiply a given sequence of matrices.",
            "code": "def matrix_chain_order(p, n):\n    m = [[0 for x in range(n)] for x in range(n)]\n    for L in range(2, n):\n        for i in range(1, n - L + 1):\n            j = i + L - 1\n            m[i][j] = float('inf')\n            for k in range(i, j):\n                q = m[i][k] + m[k+1][j] + p[i-1]*p[k]*p[j]\n                if q < m[i][j]: m[i][j] = q\n    return m[1][n-1]"
        },
        {
            "title": "Bellman Equation",
            "desc": "A recursive equation that relates the value of a state to the values of its successor states.",
            "code": "# V(s) = max_a { R(s, a) + gamma * sum_{s'} P(s' | s, a) * V(s') }\n# Used in Reinforcement Learning for Value Iteration."
        },
        {
            "title": "Floyd\u2019s Cycle-Finding",
            "desc": "A pointer algorithm that uses two pointers moving at different speeds to detect a cycle in a sequence.",
            "code": "def has_cycle(head):\n    slow, fast = head, head\n    while fast and fast.next:\n        slow = slow.next\n        fast = fast.next.next\n        if slow == fast: return True\n    return False"
        },
        {
            "title": "Kadane\u2019s Algorithm",
            "desc": "Find the contiguous subarray within a one-dimensional array of numbers which has the largest sum.",
            "code": "def kadane(arr):\n    max_so_far = arr[0]\n    current_max = arr[0]\n    for i in range(1, len(arr)):\n        current_max = max(arr[i], current_max + arr[i])\n        max_so_far = max(max_so_far, current_max)\n    return max_so_far"
        },
        {
            "title": "Coin Change Problem",
            "desc": "Find the number of ways to make change for a particular amount of money given a set of denominations.",
            "code": "def count_ways(S, m, n):\n    table = [0 for k in range(n + 1)]\n    table[0] = 1\n    for i in range(0, m):\n        for j in range(S[i], n + 1):\n            table[j] += table[j - S[i]]\n    return table[n]"
        },
        {
            "title": "Traveling Salesman Problem (DP)",
            "desc": "Find the shortest possible route that visits each city exactly once and returns to the origin city.",
            "code": "def tsp(mask, pos, n, dist, memo):\n    if mask == (1 << n) - 1: return dist[pos][0]\n    if memo[mask][pos] != -1: return memo[mask][pos]\n    ans = float('inf')\n    for city in range(n):\n        if (mask >> city) & 1 == 0:\n            ans = min(ans, dist[pos][city] + tsp(mask | (1 << city), city, n, dist, memo))\n    memo[mask][pos] = ans\n    return ans"
        }
    ],
    "strings": [{
            "title": "Knuth-Morris-Pratt (KMP)",
            "desc": "Efficiently search for occurrences of a 'word' within a main 'text string'.",
            "code": "def kmp_search(txt, pat):\n    m, n = len(pat), len(txt)\n    lps = [0] * m\n    compute_lps(pat, m, lps)\n    i = j = 0\n    while i < n:\n        if pat[j] == txt[i]: i += 1; j += 1\n        if j == m:\n            print(\"Found pattern at index \" + str(i - j))\n            j = lps[j - 1]\n        elif i < n and pat[j] != txt[i]:\n            if j != 0: j = lps[j - 1]\n            else: i += 1"
        },
        {
            "title": "Rabin-Karp",
            "desc": "String-searching algorithm that uses hashing to find any one of a set of pattern strings in a text.",
            "code": "def rabin_karp(pat, txt, q=101):\n    m, n = len(pat), len(txt); h = pow(256, m-1) % q\n    p = t = 0\n    for i in range(m):\n        p = (256 * p + ord(pat[i])) % q\n        t = (256 * t + ord(txt[i])) % q\n    for i in range(n - m + 1):\n        if p == t:\n            if txt[i:i+m] == pat: print(\"Pattern found at index\", i)\n        if i < n - m:\n            t = (256*(t - ord(txt[i])*h) + ord(txt[i+m])) % q\n            if t < 0: t += q"
        },
        {
            "title": "Boyer-Moore",
            "desc": "Efficient string-searching algorithm that skips several characters by using information gathered during the preprocessing step.",
            "code": "def boyer_moore(text, pattern):\n    m, n = len(pattern), len(text)\n    if m == 0: return 0\n    last = {pattern[i]: i for i in range(m)}\n    i = m - 1\n    while i < n:\n        j = m - 1\n        while text[i] == pattern[j]:\n            if j == 0: return i\n            i -= 1; j -= 1\n        i += m - min(j, 1 + last.get(text[i], -1))\n    return -1"
        },
        {
            "title": "Z Algorithm",
            "desc": "Finds all occurrences of a pattern in a text in linear time.",
            "code": "def get_z_array(string, z):\n    n = len(string); l, r, k = 0, 0, 0\n    for i in range(1, n):\n        if i > r:\n            l = r = i\n            while r < n and string[r-l] == string[r]: r += 1\n            z[i] = r - l; r -= 1\n        else:\n            k = i - l\n            if z[k] < r - i + 1: z[i] = z[k]\n            else:\n                l = i\n                while r < n and string[r-l] == string[r]: r += 1\n                z[i] = r - l; r -= 1"
        },
        {
            "title": "Aho-Corasick",
            "desc": "A string-searching algorithm that locates elements of a finite set of patterns within an input text.",
            "code": "# Aho-Corasick builds a finite automaton from the patterns.\n# It uses failure links similar to KMP but for multiple patterns."
        },
        {
            "title": "Manacher\u2019s Algorithm",
            "desc": "Find the longest palindromic substring in linear time.",
            "code": "def manachers(s):\n    t = '#' + '#'.join(s) + '#'\n    n = len(t); p = [0] * n; c = r = 0\n    for i in range(n):\n        mirror = 2 * c - i\n        if i < r: p[i] = min(r - i, p[mirror])\n        while i + 1 + p[i] < n and i - 1 - p[i] >= 0 and t[i + 1 + p[i]] == t[i - 1 - p[i]]:\n            p[i] += 1\n        if i + p[i] > r: c = i; r = i + p[i]\n    max_len, center_index = max((n, i) for i, n in enumerate(p))\n    return s[(center_index - max_len) // 2 : (center_index + max_len) // 2]"
        },
        {
            "title": "Ukkonen\u2019s Suffix Tree Construction",
            "desc": "Build a suffix tree for a string in linear time.",
            "code": "# Ukkonen's algorithm is an online algorithm for constructing suffix trees.\n# It is complex and uses implicit suffixes and suffix links."
        },
        {
            "title": "Longest Palindromic Substring",
            "desc": "Find the longest palindromic substring (already covered in LeetCode).",
            "code": "# See LeetCode implementation of Longest Palindromic Substring."
        },
        {
            "title": "Soundex Algorithm",
            "desc": "Phonetic algorithm for indexing names by sound.",
            "code": "def soundex(name):\n    name = name.upper()\n    codes = {\"BFPV\": \"1\", \"CGJKQSXZ\": \"2\", \"DT\": \"3\", \"L\": \"4\", \"MN\": \"5\", \"R\": \"6\"}\n    res = name[0]\n    for char in name[1:]:\n        for k, v in codes.items():\n            if char in k:\n                if v != res[-1]: res += v\n                break\n    return (res + \"000\")[:4]"
        },
        {
            "title": "Wagner-Fischer Algorithm",
            "desc": "Computes the edit distance between two strings using dynamic programming.",
            "code": "# Wagner-Fischer is the DP approach for Edit Distance (Levenshtein).\n# See DP section for the implementation."
        }
    ],
    "ml": [{
            "title": "Linear Regression",
            "desc": "Predict a continuous target variable based on one or more independent variables.",
            "code": "import numpy as np\ndef linear_regression(X, y):\n    X = np.c_[np.ones(X.shape[0]), X]\n    theta = np.linalg.inv(X.T @ X) @ X.T @ y\n    return theta"
        },
        {
            "title": "Logistic Regression",
            "desc": "A classification algorithm used to predict the probability of a binary outcome.",
            "code": "import numpy as np\ndef sigmoid(z): return 1 / (1 + np.exp(-z))\ndef logistic_regression(X, y, lr=0.01, steps=1000):\n    weights = np.zeros(X.shape[1])\n    for _ in range(steps):\n        z = np.dot(X, weights)\n        h = sigmoid(z)\n        gradient = np.dot(X.T, (h - y)) / y.size\n        weights -= lr * gradient\n    return weights"
        },
        {
            "title": "K-Nearest Neighbors (KNN)",
            "desc": "A simple algorithm that stores all available cases and classifies new cases based on a similarity measure.",
            "code": "import numpy as np\nfrom collections import Counter\ndef knn(X_train, y_train, x_test, k=3):\n    distances = [np.linalg.norm(x_test - x) for x in X_train]\n    k_indices = np.argsort(distances)[:k]\n    k_nearest_labels = [y_train[i] for i in k_indices]\n    return Counter(k_nearest_labels).most_common(1)[0][0]"
        },
        {
            "title": "K-Means Clustering",
            "desc": "Partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean.",
            "code": "import numpy as np\ndef k_means(X, k, max_iters=100):\n    centroids = X[np.random.choice(X.shape[0], k, replace=False)]\n    for _ in range(max_iters):\n        labels = np.argmin(np.linalg.norm(X[:, np.newaxis] - centroids, axis=2), axis=1)\n        new_centroids = np.array([X[labels == i].mean(axis=0) for i in range(k)])\n        if np.all(centroids == new_centroids): break\n        centroids = new_centroids\n    return centroids, labels"
        },
        {
            "title": "Support Vector Machines (SVM)",
            "desc": "A classification algorithm that finds the hyperplane that best separates different classes.",
            "code": "# SVM aims to maximize the margin between classes.\n# The optimization problem: min 1/2 ||w||^2 subject to y_i(w.x_i + b) >= 1."
        },
        {
            "title": "Decision Tree",
            "desc": "A non-parametric supervised learning method used for classification and regression.",
            "code": "# Decision Trees split data based on features that provide highest Information Gain or Gini Impurity."
        },
        {
            "title": "Random Forest",
            "desc": "An ensemble learning method that operates by constructing a multitude of decision trees at training time.",
            "code": "# Random Forest uses bagging and feature randomness to create an ensemble of decision trees."
        },
        {
            "title": "Backpropagation",
            "desc": "A method used to calculate the gradient of the loss function with respect to the weights in a neural network.",
            "code": "# Core of neural network training:\n# 1. Forward pass to compute loss.\n# 2. Backward pass using chain rule to compute gradients.\n# 3. Update weights."
        },
        {
            "title": "Naive Bayes Classifier",
            "desc": "A probabilistic classifier based on applying Bayes' theorem with strong independence assumptions between the features.",
            "code": "# P(C|X) = P(X|C)P(C) / P(X)\n# Assumes features are independent given the class."
        },
        {
            "title": "Principal Component Analysis (PCA)",
            "desc": "A dimensionality-reduction method that is often used to reduce the dimensionality of large data sets.",
            "code": "import numpy as np\ndef pca(X, n_components):\n    X_meaned = X - np.mean(X, axis=0)\n    cov_mat = np.cov(X_meaned, rowvar=False)\n    eigen_values, eigen_vectors = np.linalg.eigh(cov_mat)\n    sorted_index = np.argsort(eigen_values)[::-1]\n    sorted_eigenvectors = eigen_vectors[:, sorted_index]\n    return sorted_eigenvectors[:, 0:n_components]"
        },
        {
            "title": "Expectation-Maximization (EM)",
            "desc": "An iterative method to find maximum likelihood estimates of parameters in statistical models with latent variables.",
            "code": "# 1. E-step: Estimate the missing data (latent variables).\n# 2. M-step: Maximize the likelihood given the estimated data."
        },
        {
            "title": "PageRank Algorithm",
            "desc": "An algorithm used by Google Search to rank web pages in their search engine results.",
            "code": "import numpy as np\ndef pagerank(M, num_iterations: int = 100, d: float = 0.85):\n    N = M.shape[1]\n    v = np.random.rand(N, 1); v = v / np.linalg.norm(v, 1)\n    M_hat = (d * M) + (((1 - d) / N) * np.ones((N, N)))\n    for _ in range(num_iterations): v = M_hat @ v\n    return v"
        },
        {
            "title": "Apriori Algorithm",
            "desc": "A classic algorithm for frequent itemset mining and association rule learning over relational databases.",
            "code": "# 1. Find frequent individual items.\n# 2. Extend them to larger itemsets as long as those itemsets appear sufficiently often."
        },
        {
            "title": "AdaBoost",
            "desc": "A boosting ensemble model that combines multiple weak classifiers to create a strong one.",
            "code": "# AdaBoost assigns weights to each training instance.\n# Instances misclassified by a weak learner are given higher weights for the next learner."
        },
        {
            "title": "Q-Learning",
            "desc": "A model-free reinforcement learning algorithm to learn the value of an action in a particular state.",
            "code": "import numpy as np\ndef q_learning(q_table, state, action, reward, next_state, alpha, gamma):\n    old_value = q_table[state, action]\n    next_max = np.max(q_table[next_state])\n    new_value = (1 - alpha) * old_value + alpha * (reward + gamma * next_max)\n    q_table[state, action] = new_value"
        }
    ]
};