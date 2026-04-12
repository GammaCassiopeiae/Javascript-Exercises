// ============================================
// JAVA ALGORITHMS DATABASE
// All 127+ Algorithm Implementations in Java
// ============================================

const ALGORITHMS_DATA = {
    leetcode: {
        title: "LEETCODE_PROBLEMS",
        description: "31 Essential LeetCode Problems for Technical Interviews",
        algorithms: [
            {
                id: "two-sum",
                name: "Two Sum",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
                code: `import java.util.HashMap;
import java.util.Map;

public class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[] {};
    }
}`
            },
            {
                id: "reverse-linked-list",
                name: "Reverse Linked List",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
                code: `public class ReverseLinkedList {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode nextTemp = curr.next;
            curr.next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
}

class ListNode {
    int val;
    ListNode next;
    ListNode() {}
    ListNode(int val) { this.val = val; }
    ListNode(int val, ListNode next) { this.val = val; this.next = next; }
}`
            },
            {
                id: "valid-parentheses",
                name: "Valid Parentheses",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
                code: `import java.util.Stack;

public class ValidParentheses {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
            },
            {
                id: "best-time-buy-sell-stock",
                name: "Best Time to Buy and Sell Stock",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Find the maximum profit you can achieve from a single transaction (buy one and sell one share of the stock).",
                code: `public class BestTimeToBuySellStock {
    public int maxProfit(int[] prices) {
        int minPrice = Integer.MAX_VALUE;
        int maxProfit = 0;
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }
}`
            },
            {
                id: "merge-two-sorted-lists",
                name: "Merge Two Sorted Lists",
                difficulty: "Easy",
                complexity: "Time: O(n + m) | Space: O(1)",
                description: "Merge two sorted linked lists and return it as a sorted list.",
                code: `public class MergeTwoSortedLists {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                curr.next = list1;
                list1 = list1.next;
            } else {
                curr.next = list2;
                list2 = list2.next;
            }
            curr = curr.next;
        }
        curr.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}`
            },
            {
                id: "longest-substring-without-repeating",
                name: "Longest Substring Without Repeating Characters",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(min(n, m))",
                description: "Given a string s, find the length of the longest substring without repeating characters.",
                code: `import java.util.HashSet;
import java.util.Set;

public class LongestSubstringWithoutRepeating {
    public int lengthOfLongestSubstring(String s) {
        Set<Character> set = new HashSet<>();
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            while (set.contains(s.charAt(right))) {
                set.remove(s.charAt(left));
                left++;
            }
            set.add(s.charAt(right));
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`
            },
            {
                id: "container-with-most-water",
                name: "Container With Most Water",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
                code: `public class ContainerWithMostWater {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int left = 0, right = height.length - 1;
        while (left < right) {
            int h = Math.min(height[left], height[right]);
            maxArea = Math.max(maxArea, h * (right - left));
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxArea;
    }
}`
            },
            {
                id: "add-two-numbers",
                name: "Add Two Numbers",
                difficulty: "Medium",
                complexity: "Time: O(max(m, n)) | Space: O(max(m, n))",
                description: "Add two numbers represented by two non-empty linked lists where digits are stored in reverse order.",
                code: `public class AddTwoNumbers {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode curr = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int x = (l1 != null) ? l1.val : 0;
            int y = (l2 != null) ? l2.val : 0;
            int sum = x + y + carry;
            carry = sum / 10;
            curr.next = new ListNode(sum % 10);
            curr = curr.next;
            if (l1 != null) l1 = l1.next;
            if (l2 != null) l2 = l2.next;
        }
        return dummy.next;
    }
}`
            },
            {
                id: "rotate-array",
                name: "Rotate Array",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Rotate the array to the right by k steps, where k is non-negative.",
                code: `public class RotateArray {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}`
            },
            {
                id: "remove-duplicates-sorted-array",
                name: "Remove Duplicates from Sorted Array",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Remove duplicates from a sorted array in-place such that each element appears only once.",
                code: `public class RemoveDuplicatesSortedArray {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;
        int i = 0;
        for (int j = 1; j < nums.length; j++) {
            if (nums[j] != nums[i]) {
                i++;
                nums[i] = nums[j];
            }
        }
        return i + 1;
    }
}`
            },
            {
                id: "search-rotated-sorted-array",
                name: "Search in Rotated Sorted Array",
                difficulty: "Medium",
                complexity: "Time: O(log n) | Space: O(1)",
                description: "Search for a target value in a rotated sorted array. Return the index if found, otherwise return -1.",
                code: `public class SearchRotatedSortedArray {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[left] <= nums[mid]) {
                if (nums[left] <= target && target < nums[mid]) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (nums[mid] < target && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
}`
            },
            {
                id: "longest-increasing-subsequence",
                name: "Longest Increasing Subsequence",
                difficulty: "Medium",
                complexity: "Time: O(n^2) | Space: O(n)",
                description: "Find the length of the longest strictly increasing subsequence in an array of integers.",
                code: `public class LongestIncreasingSubsequence {
    public int lengthOfLIS(int[] nums) {
        if (nums.length == 0) return 0;
        int[] dp = new int[nums.length];
        int maxLen = 1;
        for (int i = 0; i < nums.length; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            maxLen = Math.max(maxLen, dp[i]);
        }
        return maxLen;
    }
}`
            },
            {
                id: "binary-tree-inorder-traversal",
                name: "Binary Tree Inorder Traversal",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Return the inorder traversal of a binary tree's nodes' values.",
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class BinaryTreeInorderTraversal {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode curr = root;
        while (curr != null || !stack.isEmpty()) {
            while (curr != null) {
                stack.push(curr);
                curr = curr.left;
            }
            curr = stack.pop();
            result.add(curr.val);
            curr = curr.right;
        }
        return result;
    }
}

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}`
            },
            {
                id: "validate-binary-search-tree",
                name: "Validate Binary Search Tree",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Determine if a binary tree is a valid binary search tree (BST).",
                code: `public class ValidateBinarySearchTree {
    public boolean isValidBST(TreeNode root) {
        return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }
    
    private boolean isValid(TreeNode node, long min, long max) {
        if (node == null) return true;
        if (node.val <= min || node.val >= max) return false;
        return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
    }
}`
            },
            {
                id: "lowest-common-ancestor-bt",
                name: "Lowest Common Ancestor of a Binary Tree",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Find the lowest common ancestor (LCA) of two given nodes in a binary tree.",
                code: `public class LowestCommonAncestorBT {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return (left != null) ? left : right;
    }
}`
            },
            {
                id: "path-sum",
                name: "Path Sum",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Determine if the tree has a root-to-leaf path such that adding up all the values equals targetSum.",
                code: `public class PathSum {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;
        if (root.left == null && root.right == null) {
            return root.val == targetSum;
        }
        return hasPathSum(root.left, targetSum - root.val) ||
               hasPathSum(root.right, targetSum - root.val);
    }
}`
            },
            {
                id: "maximum-subarray",
                name: "Maximum Subarray",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
                code: `public class MaximumSubarray {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }
}`
            },
            {
                id: "climbing-stairs",
                name: "Climbing Stairs",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
                code: `public class ClimbingStairs {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int temp = a + b;
            a = b;
            b = temp;
        }
        return b;
    }
}`
            },
            {
                id: "word-break",
                name: "Word Break",
                difficulty: "Medium",
                complexity: "Time: O(n^2) | Space: O(n)",
                description: "Given a string s and a dictionary of strings wordDict, determine if s can be segmented into space-separated dictionary words.",
                code: `import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class WordBreak {
    public boolean wordBreak(String s, List<String> wordDict) {
        Set<String> wordSet = new HashSet<>(wordDict);
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && wordSet.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`
            },
            {
                id: "word-ladder",
                name: "Word Ladder",
                difficulty: "Hard",
                complexity: "Time: O(n * m^2) | Space: O(n * m)",
                description: "Find the number of words in the shortest transformation sequence from beginWord to endWord.",
                code: `import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

public class WordLadder {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;
        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);
        int level = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String curr = queue.poll();
                char[] chars = curr.toCharArray();
                for (int j = 0; j < chars.length; j++) {
                    char original = chars[j];
                    for (char c = 'a'; c <= 'z'; c++) {
                        chars[j] = c;
                        String next = new String(chars);
                        if (next.equals(endWord)) return level + 1;
                        if (wordSet.contains(next)) {
                            queue.offer(next);
                            wordSet.remove(next);
                        }
                    }
                    chars[j] = original;
                }
            }
            level++;
        }
        return 0;
    }
}`
            },
            {
                id: "group-anagrams",
                name: "Group Anagrams",
                difficulty: "Medium",
                complexity: "Time: O(n * k log k) | Space: O(n * k)",
                description: "Given an array of strings, group the anagrams together.",
                code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GroupAnagrams {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] chars = s.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`
            },
            {
                id: "merge-intervals",
                name: "Merge Intervals",
                difficulty: "Medium",
                complexity: "Time: O(n log n) | Space: O(n)",
                description: "Merge all overlapping intervals from an array of intervals.",
                code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MergeIntervals {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));
        List<int[]> result = new ArrayList<>();
        int[] curr = intervals[0];
        result.add(curr);
        for (int[] interval : intervals) {
            if (interval[0] <= curr[1]) {
                curr[1] = Math.max(curr[1], interval[1]);
            } else {
                curr = interval;
                result.add(curr);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}`
            },
            {
                id: "subsets",
                name: "Subsets",
                difficulty: "Medium",
                complexity: "Time: O(n * 2^n) | Space: O(n * 2^n)",
                description: "Given an integer array nums of unique elements, return all possible subsets (the power set).",
                code: `import java.util.ArrayList;
import java.util.List;

public class Subsets {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), nums, 0);
        return result;
    }
    
    private void backtrack(List<List<Integer>> result, List<Integer> temp, int[] nums, int start) {
        result.add(new ArrayList<>(temp));
        for (int i = start; i < nums.length; i++) {
            temp.add(nums[i]);
            backtrack(result, temp, nums, i + 1);
            temp.remove(temp.size() - 1);
        }
    }
}`
            },
            {
                id: "permutations",
                name: "Permutations",
                difficulty: "Medium",
                complexity: "Time: O(n * n!) | Space: O(n)",
                description: "Given an array nums of distinct integers, return all the possible permutations.",
                code: `import java.util.ArrayList;
import java.util.List;

public class Permutations {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), nums);
        return result;
    }
    
    private void backtrack(List<List<Integer>> result, List<Integer> temp, int[] nums) {
        if (temp.size() == nums.length) {
            result.add(new ArrayList<>(temp));
            return;
        }
        for (int num : nums) {
            if (temp.contains(num)) continue;
            temp.add(num);
            backtrack(result, temp, nums);
            temp.remove(temp.size() - 1);
        }
    }
}`
            },
            {
                id: "combination-sum",
                name: "Combination Sum",
                difficulty: "Medium",
                complexity: "Time: O(n^(T/M)) | Space: O(T/M)",
                description: "Find all unique combinations of candidates where the candidate numbers sum to target.",
                code: `import java.util.ArrayList;
import java.util.List;

public class CombinationSum {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(result, new ArrayList<>(), candidates, target, 0);
        return result;
    }
    
    private void backtrack(List<List<Integer>> result, List<Integer> temp, int[] candidates, int remaining, int start) {
        if (remaining == 0) {
            result.add(new ArrayList<>(temp));
            return;
        }
        for (int i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) continue;
            temp.add(candidates[i]);
            backtrack(result, temp, candidates, remaining - candidates[i], i);
            temp.remove(temp.size() - 1);
        }
    }
}`
            },
            {
                id: "trapping-rain-water",
                name: "Trapping Rain Water",
                difficulty: "Hard",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Compute how much water can be trapped after raining, given n non-negative integers representing an elevation map.",
                code: `public class TrappingRainWater {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0;
        int water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) {
                    leftMax = height[left];
                } else {
                    water += leftMax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        return water;
    }
}`
            },
            {
                id: "spiral-matrix",
                name: "Spiral Matrix",
                difficulty: "Medium",
                complexity: "Time: O(m * n) | Space: O(1)",
                description: "Return all elements of the matrix in spiral order.",
                code: `import java.util.ArrayList;
import java.util.List;

public class SpiralMatrix {
    public List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> result = new ArrayList<>();
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) result.add(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) result.add(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) result.add(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) result.add(matrix[i][left]);
                left++;
            }
        }
        return result;
    }
}`
            },
            {
                id: "rotate-image",
                name: "Rotate Image",
                difficulty: "Medium",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "Rotate an n x n 2D matrix by 90 degrees clockwise in-place.",
                code: `public class RotateImage {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n / 2; i++) {
            for (int j = i; j < n - 1 - i; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[n - 1 - j][i];
                matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
                matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
                matrix[j][n - 1 - i] = temp;
            }
        }
    }
}`
            },
            {
                id: "jump-game",
                name: "Jump Game",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Determine if you can reach the last index given an array where each element represents your maximum jump length.",
                code: `public class JumpGame {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}`
            },
            {
                id: "longest-palindromic-substring",
                name: "Longest Palindromic Substring",
                difficulty: "Medium",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "Given a string s, return the longest palindromic substring in s.",
                code: `public class LongestPalindromicSubstring {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`
            },
            {
                id: "unique-paths",
                name: "Unique Paths",
                difficulty: "Medium",
                complexity: "Time: O(m * n) | Space: O(n)",
                description: "Return the number of possible unique paths from the top-left to the bottom-right of an m x n grid.",
                code: `public class UniquePaths {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 || j == 0) {
                    dp[j] = 1;
                } else {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return dp[n - 1];
    }
}`
            }
        ]
    },

    searching: {
        title: "SEARCHING_ALGORITHMS",
        description: "9 Essential Search Algorithms",
        algorithms: [
            {
                id: "linear-search",
                name: "Linear Search",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Sequentially check each element until the target is found or the list is exhausted.",
                code: `public class LinearSearch {
    public int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                return i;
            }
        }
        return -1;
    }
}`
            },
            {
                id: "binary-search",
                name: "Binary Search",
                difficulty: "Easy",
                complexity: "Time: O(log n) | Space: O(1)",
                description: "Efficiently find an element in a sorted array by repeatedly dividing the search interval in half.",
                code: `public class BinarySearch {
    public int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`
            },
            {
                id: "ternary-search",
                name: "Ternary Search",
                difficulty: "Medium",
                complexity: "Time: O(log3 n) | Space: O(1)",
                description: "Divide the array into three parts and determine which part the target lies in.",
                code: `public class TernarySearch {
    public int ternarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid1 = left + (right - left) / 3;
            int mid2 = right - (right - left) / 3;
            if (arr[mid1] == target) return mid1;
            if (arr[mid2] == target) return mid2;
            if (target < arr[mid1]) {
                right = mid1 - 1;
            } else if (target > arr[mid2]) {
                left = mid2 + 1;
            } else {
                left = mid1 + 1;
                right = mid2 - 1;
            }
        }
        return -1;
    }
}`
            },
            {
                id: "jump-search",
                name: "Jump Search",
                difficulty: "Medium",
                complexity: "Time: O(sqrt(n)) | Space: O(1)",
                description: "Search a sorted array by jumping ahead by fixed steps and then performing linear search.",
                code: `public class JumpSearch {
    public int jumpSearch(int[] arr, int target) {
        int n = arr.length;
        int step = (int) Math.sqrt(n);
        int prev = 0;
        while (arr[Math.min(step, n) - 1] < target) {
            prev = step;
            step += (int) Math.sqrt(n);
            if (prev >= n) return -1;
        }
        while (arr[prev] < target) {
            prev++;
            if (prev == Math.min(step, n)) return -1;
        }
        return (arr[prev] == target) ? prev : -1;
    }
}`
            },
            {
                id: "exponential-search",
                name: "Exponential Search",
                difficulty: "Medium",
                complexity: "Time: O(log n) | Space: O(1)",
                description: "Search by finding a range where the element might be present and then binary search within that range.",
                code: `public class ExponentialSearch {
    public int exponentialSearch(int[] arr, int target) {
        if (arr[0] == target) return 0;
        int i = 1;
        while (i < arr.length && arr[i] <= target) {
            i *= 2;
        }
        return binarySearch(arr, target, i / 2, Math.min(i, arr.length - 1));
    }
    
    private int binarySearch(int[] arr, int target, int left, int right) {
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`
            },
            {
                id: "interpolation-search",
                name: "Interpolation Search",
                difficulty: "Medium",
                complexity: "Time: O(log log n) avg | Space: O(1)",
                description: "An improved binary search that probes at the estimated position of the search key.",
                code: `public class InterpolationSearch {
    public int interpolationSearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high && target >= arr[low] && target <= arr[high]) {
            if (low == high) {
                return (arr[low] == target) ? low : -1;
            }
            int pos = low + ((target - arr[low]) * (high - low)) / (arr[high] - arr[low]);
            if (arr[pos] == target) return pos;
            if (arr[pos] < target) low = pos + 1;
            else high = pos - 1;
        }
        return -1;
    }
}`
            },
            {
                id: "fibonacci-search",
                name: "Fibonacci Search",
                difficulty: "Hard",
                complexity: "Time: O(log n) | Space: O(1)",
                description: "Use Fibonacci numbers to divide the array into unequal parts for searching.",
                code: `public class FibonacciSearch {
    public int fibonacciSearch(int[] arr, int target) {
        int n = arr.length;
        int fibMMm2 = 0;
        int fibMMm1 = 1;
        int fibM = fibMMm2 + fibMMm1;
        while (fibM < n) {
            fibMMm2 = fibMMm1;
            fibMMm1 = fibM;
            fibM = fibMMm2 + fibMMm1;
        }
        int offset = -1;
        while (fibM > 1) {
            int i = Math.min(offset + fibMMm2, n - 1);
            if (arr[i] < target) {
                fibM = fibMMm1;
                fibMMm1 = fibMMm2;
                fibMMm2 = fibM - fibMMm1;
                offset = i;
            } else if (arr[i] > target) {
                fibM = fibMMm2;
                fibMMm1 = fibMMm1 - fibMMm2;
                fibMMm2 = fibM - fibMMm1;
            } else return i;
        }
        return (fibMMm1 == 1 && arr[offset + 1] == target) ? offset + 1 : -1;
    }
}`
            },
            {
                id: "bfs",
                name: "Breadth-First Search (BFS)",
                difficulty: "Medium",
                complexity: "Time: O(V + E) | Space: O(V)",
                description: "Traverse a graph level by level using a queue data structure.",
                code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class BFS {
    public List<Integer> bfs(int start, int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        visited[start] = true;
        queue.offer(start);
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            result.add(curr);
            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.offer(neighbor);
                }
            }
        }
        return result;
    }
}`
            },
            {
                id: "dfs",
                name: "Depth-First Search (DFS)",
                difficulty: "Medium",
                complexity: "Time: O(V + E) | Space: O(V)",
                description: "Traverse a graph by exploring as far as possible along each branch before backtracking.",
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class DFS {
    public List<Integer> dfs(int start, int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        stack.push(start);
        visited[start] = true;
        while (!stack.isEmpty()) {
            int curr = stack.pop();
            result.add(curr);
            for (int neighbor : adj.get(curr)) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            }
        }
        return result;
    }
    
    // Recursive version
    public List<Integer> dfsRecursive(int start, int V, List<List<Integer>> adj) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        dfsUtil(start, adj, visited, result);
        return result;
    }
    
    private void dfsUtil(int curr, List<List<Integer>> adj, boolean[] visited, List<Integer> result) {
        visited[curr] = true;
        result.add(curr);
        for (int neighbor : adj.get(curr)) {
            if (!visited[neighbor]) {
                dfsUtil(neighbor, adj, visited, result);
            }
        }
    }
}`
            }
        ]
    },

    sorting: {
        title: "SORTING_ALGORITHMS",
        description: "15 Essential Sorting Algorithms",
        algorithms: [
            {
                id: "bubble-sort",
                name: "Bubble Sort",
                difficulty: "Easy",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "Repeatedly step through the list, compare adjacent elements and swap them if they are in the wrong order.",
                code: `public class BubbleSort {
    public void bubbleSort(int[] arr) {
        int n = arr.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}`
            },
            {
                id: "selection-sort",
                name: "Selection Sort",
                difficulty: "Easy",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "Find the minimum element from the unsorted part and place it at the beginning.",
                code: `public class SelectionSort {
    public void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
        }
    }
}`
            },
            {
                id: "insertion-sort",
                name: "Insertion Sort",
                difficulty: "Easy",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "Build the final sorted array one item at a time by inserting each element into its correct position.",
                code: `public class InsertionSort {
    public void insertionSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= 0 && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
}`
            },
            {
                id: "merge-sort",
                name: "Merge Sort",
                difficulty: "Medium",
                complexity: "Time: O(n log n) | Space: O(n)",
                description: "Divide the array into halves, sort them, and then merge the sorted halves back together.",
                code: `public class MergeSort {
    public void mergeSort(int[] arr) {
        if (arr.length <= 1) return;
        mergeSortUtil(arr, 0, arr.length - 1);
    }
    
    private void mergeSortUtil(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSortUtil(arr, left, mid);
        mergeSortUtil(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
    
    private void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) temp[k++] = arr[i++];
            else temp[k++] = arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        System.arraycopy(temp, 0, arr, left, temp.length);
    }
}`
            },
            {
                id: "quick-sort",
                name: "Quick Sort",
                difficulty: "Medium",
                complexity: "Time: O(n log n) avg | Space: O(log n)",
                description: "Pick a pivot element, partition the array around the pivot, and recursively sort the sub-arrays.",
                code: `public class QuickSort {
    public void quickSort(int[] arr) {
        quickSortUtil(arr, 0, arr.length - 1);
    }
    
    private void quickSortUtil(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSortUtil(arr, low, pi - 1);
            quickSortUtil(arr, pi + 1, high);
        }
    }
    
    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }
    
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`
            },
            {
                id: "heap-sort",
                name: "Heap Sort",
                difficulty: "Medium",
                complexity: "Time: O(n log n) | Space: O(1)",
                description: "Build a max heap and repeatedly extract the maximum element to sort the array.",
                code: `public class HeapSort {
    public void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
        for (int i = n - 1; i > 0; i--) {
            int temp = arr[0];
            arr[0] = arr[i];
            arr[i] = temp;
            heapify(arr, i, 0);
        }
    }
    
    private void heapify(int[] arr, int n, int i) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        if (left < n && arr[left] > arr[largest]) largest = left;
        if (right < n && arr[right] > arr[largest]) largest = right;
        if (largest != i) {
            int swap = arr[i];
            arr[i] = arr[largest];
            arr[largest] = swap;
            heapify(arr, n, largest);
        }
    }
}`
            },
            {
                id: "shell-sort",
                name: "Shell Sort",
                difficulty: "Medium",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "A generalization of insertion sort that allows exchange of far apart elements.",
                code: `public class ShellSort {
    public void shellSort(int[] arr) {
        int n = arr.length;
        for (int gap = n / 2; gap > 0; gap /= 2) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j;
                for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                    arr[j] = arr[j - gap];
                }
                arr[j] = temp;
            }
        }
    }
}`
            },
            {
                id: "counting-sort",
                name: "Counting Sort",
                difficulty: "Medium",
                complexity: "Time: O(n + k) | Space: O(k)",
                description: "Count the occurrences of each element and use that information to place elements in the correct position.",
                code: `public class CountingSort {
    public void countingSort(int[] arr) {
        int max = arr[0];
        for (int num : arr) max = Math.max(max, num);
        int[] count = new int[max + 1];
        for (int num : arr) count[num]++;
        int idx = 0;
        for (int i = 0; i <= max; i++) {
            while (count[i] > 0) {
                arr[idx++] = i;
                count[i]--;
            }
        }
    }
}`
            },
            {
                id: "radix-sort",
                name: "Radix Sort",
                difficulty: "Medium",
                complexity: "Time: O(d * (n + k)) | Space: O(n + k)",
                description: "Sort numbers digit by digit starting from the least significant digit using counting sort as a subroutine.",
                code: `public class RadixSort {
    public void radixSort(int[] arr) {
        int max = arr[0];
        for (int num : arr) max = Math.max(max, num);
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSortByDigit(arr, exp);
        }
    }
    
    private void countingSortByDigit(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n];
        int[] count = new int[10];
        for (int num : arr) count[(num / exp) % 10]++;
        for (int i = 1; i < 10; i++) count[i] += count[i - 1];
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }
        System.arraycopy(output, 0, arr, 0, n);
    }
}`
            },
            {
                id: "bucket-sort",
                name: "Bucket Sort",
                difficulty: "Medium",
                complexity: "Time: O(n + k) avg | Space: O(n + k)",
                description: "Distribute elements into buckets, sort each bucket individually, and concatenate the results.",
                code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class BucketSort {
    public void bucketSort(float[] arr) {
        if (arr.length <= 0) return;
        int n = arr.length;
        List<List<Float>> buckets = new ArrayList<>(n);
        for (int i = 0; i < n; i++) buckets.add(new ArrayList<>());
        for (float num : arr) {
            int bucketIdx = (int) (num * n);
            buckets.get(bucketIdx).add(num);
        }
        for (List<Float> bucket : buckets) {
            Collections.sort(bucket);
        }
        int idx = 0;
        for (List<Float> bucket : buckets) {
            for (float num : bucket) arr[idx++] = num;
        }
    }
}`
            },
            {
                id: "timsort",
                name: "Timsort",
                difficulty: "Hard",
                complexity: "Time: O(n log n) | Space: O(n)",
                description: "A hybrid stable sorting algorithm derived from merge sort and insertion sort. Used in Java's Arrays.sort() for objects.",
                code: `import java.util.Arrays;

public class Timsort {
    private static final int RUN = 32;
    
    public void timsort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i += RUN) {
            insertionSortRange(arr, i, Math.min(i + RUN, n));
        }
        for (int size = RUN; size < n; size *= 2) {
            for (int left = 0; left < n; left += 2 * size) {
                int mid = left + size - 1;
                int right = Math.min(left + 2 * size - 1, n - 1);
                if (mid < right) merge(arr, left, mid, right);
            }
        }
    }
    
    private void insertionSortRange(int[] arr, int left, int right) {
        for (int i = left + 1; i < right; i++) {
            int key = arr[i];
            int j = i - 1;
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    private void merge(int[] arr, int left, int mid, int right) {
        int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
        int i = 0, j = 0, k = left;
        while (i < leftArr.length && j < rightArr.length) {
            arr[k++] = (leftArr[i] <= rightArr[j]) ? leftArr[i++] : rightArr[j++];
        }
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }
}`
            },
            {
                id: "comb-sort",
                name: "Comb Sort",
                difficulty: "Medium",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "An improvement over bubble sort that uses a gap larger than 1 to eliminate turtles (small values near the end).",
                code: `public class CombSort {
    public void combSort(int[] arr) {
        int n = arr.length;
        int gap = n;
        boolean swapped = true;
        while (gap > 1 || swapped) {
            gap = getNextGap(gap);
            swapped = false;
            for (int i = 0; i < n - gap; i++) {
                if (arr[i] > arr[i + gap]) {
                    int temp = arr[i];
                    arr[i] = arr[i + gap];
                    arr[i + gap] = temp;
                    swapped = true;
                }
            }
        }
    }
    
    private int getNextGap(int gap) {
        gap = (gap * 10) / 13;
        return Math.max(1, gap);
    }
}`
            },
            {
                id: "cycle-sort",
                name: "Cycle Sort",
                difficulty: "Hard",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "An in-place, unstable sorting algorithm that minimizes the number of writes to the array.",
                code: `public class CycleSort {
    public void cycleSort(int[] arr) {
        int n = arr.length;
        for (int cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
            int item = arr[cycleStart];
            int pos = cycleStart;
            for (int i = cycleStart + 1; i < n; i++) {
                if (arr[i] < item) pos++;
            }
            if (pos == cycleStart) continue;
            while (item == arr[pos]) pos++;
            int temp = arr[pos];
            arr[pos] = item;
            item = temp;
            while (pos != cycleStart) {
                pos = cycleStart;
                for (int i = cycleStart + 1; i < n; i++) {
                    if (arr[i] < item) pos++;
                }
                while (item == arr[pos]) pos++;
                int t = arr[pos];
                arr[pos] = item;
                item = t;
            }
        }
    }
}`
            },
            {
                id: "cocktail-shaker-sort",
                name: "Cocktail Shaker Sort",
                difficulty: "Easy",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "A variation of bubble sort that sorts in both directions on each pass through the list.",
                code: `public class CocktailShakerSort {
    public void cocktailShakerSort(int[] arr) {
        int n = arr.length;
        int start = 0, end = n - 1;
        boolean swapped = true;
        while (swapped) {
            swapped = false;
            for (int i = start; i < end; i++) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    swapped = true;
                }
            }
            if (!swapped) break;
            swapped = false;
            end--;
            for (int i = end - 1; i >= start; i--) {
                if (arr[i] > arr[i + 1]) {
                    swap(arr, i, i + 1);
                    swapped = true;
                }
            }
            start++;
        }
    }
    
    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`
            },
            {
                id: "pigeonhole-sort",
                name: "Pigeonhole Sort",
                difficulty: "Medium",
                complexity: "Time: O(n + k) | Space: O(n + k)",
                description: "Works by creating an array of pigeonholes and placing each element in its corresponding hole.",
                code: `public class PigeonholeSort {
    public void pigeonholeSort(int[] arr) {
        int min = arr[0], max = arr[0];
        for (int num : arr) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }
        int range = max - min + 1;
        int[] holes = new int[range];
        for (int num : arr) holes[num - min]++;
        int idx = 0;
        for (int i = 0; i < range; i++) {
            while (holes[i] > 0) {
                arr[idx++] = i + min;
                holes[i]--;
            }
        }
    }
}`
            }
        ]
    },

    graphs: {
        title: "GRAPH_ALGORITHMS",
        description: "15 Essential Graph Algorithms",
        algorithms: [
            {
                id: "dijkstra",
                name: "Dijkstra's Algorithm",
                difficulty: "Medium",
                complexity: "Time: O((V + E) log V) | Space: O(V)",
                description: "Find the shortest path from a source node to all other nodes in a weighted graph with non-negative edges.",
                code: `import java.util.Arrays;
import java.util.PriorityQueue;

public class Dijkstra {
    public int[] dijkstra(int[][] graph, int src) {
        int V = graph.length;
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> a.dist - b.dist);
        pq.add(new Node(src, 0));
        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            int u = curr.vertex;
            for (int v = 0; v < V; v++) {
                if (graph[u][v] != 0 && dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                    pq.add(new Node(v, dist[v]));
                }
            }
        }
        return dist;
    }
    
    class Node {
        int vertex, dist;
        Node(int v, int d) { vertex = v; dist = d; }
    }
}`
            },
            {
                id: "bellman-ford",
                name: "Bellman-Ford Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(V * E) | Space: O(V)",
                description: "Find shortest paths in a weighted graph that may contain negative weight edges. Detects negative cycles.",
                code: `import java.util.Arrays;

public class BellmanFord {
    public int[] bellmanFord(int[][] graph, int src, int V, int E) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        for (int i = 1; i <= V - 1; i++) {
            for (int[] edge : graph) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        // Check for negative weight cycles
        for (int[] edge : graph) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                System.out.println("Graph contains negative weight cycle");
            }
        }
        return dist;
    }
}`
            },
            {
                id: "floyd-warshall",
                name: "Floyd-Warshall Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(V^3) | Space: O(V^2)",
                description: "Find shortest paths between all pairs of vertices in a weighted graph.",
                code: `public class FloydWarshall {
    public int[][] floydWarshall(int[][] graph) {
        int V = graph.length;
        int[][] dist = new int[V][V];
        for (int i = 0; i < V; i++) {
            System.arraycopy(graph[i], 0, dist[i], 0, V);
        }
        for (int k = 0; k < V; k++) {
            for (int i = 0; i < V; i++) {
                for (int j = 0; j < V; j++) {
                    if (dist[i][k] != Integer.MAX_VALUE && dist[k][j] != Integer.MAX_VALUE) {
                        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }
        return dist;
    }
}`
            },
            {
                id: "kruskal",
                name: "Kruskal's Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(E log E) | Space: O(V)",
                description: "Find the Minimum Spanning Tree (MST) of a graph using a greedy approach with Union-Find.",
                code: `import java.util.Arrays;

public class Kruskal {
    public int kruskalMST(int[][] edges, int V) {
        Arrays.sort(edges, (a, b) -> a[2] - b[2]);
        int[] parent = new int[V];
        for (int i = 0; i < V; i++) parent[i] = i;
        int mstWeight = 0, edgesUsed = 0;
        for (int[] edge : edges) {
            if (edgesUsed == V - 1) break;
            int rootU = find(parent, edge[0]);
            int rootV = find(parent, edge[1]);
            if (rootU != rootV) {
                parent[rootU] = rootV;
                mstWeight += edge[2];
                edgesUsed++;
            }
        }
        return mstWeight;
    }
    
    private int find(int[] parent, int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent, parent[i]);
    }
}`
            },
            {
                id: "prim",
                name: "Prim's Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(E log V) | Space: O(V)",
                description: "Find the Minimum Spanning Tree starting from an arbitrary vertex and growing the MST one edge at a time.",
                code: `import java.util.Arrays;
import java.util.PriorityQueue;

public class Prim {
    public int primMST(int[][] graph) {
        int V = graph.length;
        boolean[] inMST = new boolean[V];
        int[] key = new int[V];
        Arrays.fill(key, Integer.MAX_VALUE);
        key[0] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.offer(new int[]{0, 0});
        int mstWeight = 0;
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            if (inMST[u]) continue;
            inMST[u] = true;
            mstWeight += key[u];
            for (int v = 0; v < V; v++) {
                if (graph[u][v] != 0 && !inMST[v] && graph[u][v] < key[v]) {
                    key[v] = graph[u][v];
                    pq.offer(new int[]{v, key[v]});
                }
            }
        }
        return mstWeight;
    }
}`
            },
            {
                id: "topological-sort",
                name: "Topological Sort",
                difficulty: "Medium",
                complexity: "Time: O(V + E) | Space: O(V)",
                description: "Linear ordering of vertices such that for every directed edge u->v, u comes before v.",
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class TopologicalSort {
    public List<Integer> topologicalSort(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < V; i++) {
            if (!visited[i]) dfs(i, adj, visited, stack);
        }
        List<Integer> result = new ArrayList<>();
        while (!stack.isEmpty()) result.add(stack.pop());
        return result;
    }
    
    private void dfs(int u, List<List<Integer>> adj, boolean[] visited, Stack<Integer> stack) {
        visited[u] = true;
        for (int v : adj.get(u)) {
            if (!visited[v]) dfs(v, adj, visited, stack);
        }
        stack.push(u);
    }
}`
            },
            {
                id: "kahn-algorithm",
                name: "Kahn's Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(V + E) | Space: O(V)",
                description: "Topological sorting using BFS and in-degree calculation.",
                code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class KahnAlgorithm {
    public List<Integer> kahnsAlgorithm(int V, List<List<Integer>> adj) {
        int[] inDegree = new int[V];
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) inDegree[v]++;
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < V; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }
        List<Integer> result = new ArrayList<>();
        while (!queue.isEmpty()) {
            int u = queue.poll();
            result.add(u);
            for (int v : adj.get(u)) {
                inDegree[v]--;
                if (inDegree[v] == 0) queue.offer(v);
            }
        }
        return result.size() == V ? result : new ArrayList<>();
    }
}`
            },
            {
                id: "tarjan-scc",
                name: "Tarjan's Strongly Connected Components",
                difficulty: "Hard",
                complexity: "Time: O(V + E) | Space: O(V)",
                description: "Find all strongly connected components in a directed graph using DFS.",
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class TarjanSCC {
    private int timer;
    private int[] disc, low;
    private boolean[] onStack;
    private Stack<Integer> stack;
    private List<List<Integer>> sccs;
    
    public List<List<Integer>> tarjanSCC(int V, List<List<Integer>> adj) {
        disc = new int[V];
        low = new int[V];
        onStack = new boolean[V];
        stack = new Stack<>();
        sccs = new ArrayList<>();
        timer = 0;
        for (int i = 0; i < V; i++) {
            if (disc[i] == 0) dfs(i, adj);
        }
        return sccs;
    }
    
    private void dfs(int u, List<List<Integer>> adj) {
        disc[u] = low[u] = ++timer;
        stack.push(u);
        onStack[u] = true;
        for (int v : adj.get(u)) {
            if (disc[v] == 0) {
                dfs(v, adj);
                low[u] = Math.min(low[u], low[v]);
            } else if (onStack[v]) {
                low[u] = Math.min(low[u], disc[v]);
            }
        }
        if (low[u] == disc[u]) {
            List<Integer> scc = new ArrayList<>();
            while (true) {
                int v = stack.pop();
                onStack[v] = false;
                scc.add(v);
                if (u == v) break;
            }
            sccs.add(scc);
        }
    }
}`
            },
            {
                id: "kosaraju",
                name: "Kosaraju's Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(V + E) | Space: O(V)",
                description: "Find all strongly connected components using two DFS passes.",
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Kosaraju {
    public List<List<Integer>> kosarajuSCC(int V, List<List<Integer>> adj) {
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[V];
        for (int i = 0; i < V; i++) {
            if (!visited[i]) dfs1(i, adj, visited, stack);
        }
        List<List<Integer>> transpose = getTranspose(V, adj);
        List<List<Integer>> sccs = new ArrayList<>();
        visited = new boolean[V];
        while (!stack.isEmpty()) {
            int curr = stack.pop();
            if (!visited[curr]) {
                List<Integer> scc = new ArrayList<>();
                dfs2(curr, transpose, visited, scc);
                sccs.add(scc);
            }
        }
        return sccs;
    }
    
    private void dfs1(int u, List<List<Integer>> adj, boolean[] visited, Stack<Integer> stack) {
        visited[u] = true;
        for (int v : adj.get(u)) {
            if (!visited[v]) dfs1(v, adj, visited, stack);
        }
        stack.push(u);
    }
    
    private void dfs2(int u, List<List<Integer>> adj, boolean[] visited, List<Integer> scc) {
        visited[u] = true;
        scc.add(u);
        for (int v : adj.get(u)) {
            if (!visited[v]) dfs2(v, adj, visited, scc);
        }
    }
    
    private List<List<Integer>> getTranspose(int V, List<List<Integer>> adj) {
        List<List<Integer>> transpose = new ArrayList<>();
        for (int i = 0; i < V; i++) transpose.add(new ArrayList<>());
        for (int u = 0; u < V; u++) {
            for (int v : adj.get(u)) transpose.get(v).add(u);
        }
        return transpose;
    }
}`
            },
            {
                id: "ford-fulkerson",
                name: "Ford-Fulkerson Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(E * max_flow) | Space: O(V)",
                description: "Compute the maximum flow in a flow network using augmenting paths.",
                code: `import java.util.LinkedList;
import java.util.Queue;

public class FordFulkerson {
    public int fordFulkerson(int[][] capacity, int source, int sink, int V) {
        int[][] residual = new int[V][V];
        for (int i = 0; i < V; i++) {
            System.arraycopy(capacity[i], 0, residual[i], 0, V);
        }
        int[] parent = new int[V];
        int maxFlow = 0;
        while (bfs(residual, source, sink, parent, V)) {
            int pathFlow = Integer.MAX_VALUE;
            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                pathFlow = Math.min(pathFlow, residual[u][v]);
            }
            maxFlow += pathFlow;
            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                residual[u][v] -= pathFlow;
                residual[v][u] += pathFlow;
            }
        }
        return maxFlow;
    }
    
    private boolean bfs(int[][] residual, int source, int sink, int[] parent, int V) {
        boolean[] visited = new boolean[V];
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(source);
        visited[source] = true;
        parent[source] = -1;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            for (int v = 0; v < V; v++) {
                if (!visited[v] && residual[u][v] > 0) {
                    if (v == sink) return true;
                    queue.offer(v);
                    visited[v] = true;
                    parent[v] = u;
                }
            }
        }
        return false;
    }
}`
            },
            {
                id: "edmonds-karp",
                name: "Edmonds-Karp Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(V * E^2) | Space: O(V)",
                description: "Implementation of Ford-Fulkerson using BFS to find shortest augmenting paths.",
                code: `import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class EdmondsKarp {
    public int edmondsKarp(int[][] capacity, int source, int sink, int V) {
        int[][] residual = new int[V][V];
        for (int i = 0; i < V; i++) {
            System.arraycopy(capacity[i], 0, residual[i], 0, V);
        }
        int maxFlow = 0;
        while (true) {
            int[] parent = new int[V];
            Arrays.fill(parent, -1);
            Queue<Integer> queue = new LinkedList<>();
            queue.offer(source);
            parent[source] = -2;
            boolean foundPath = false;
            while (!queue.isEmpty()) {
                int u = queue.poll();
                for (int v = 0; v < V; v++) {
                    if (parent[v] == -1 && residual[u][v] > 0) {
                        parent[v] = u;
                        if (v == sink) { foundPath = true; break; }
                        queue.offer(v);
                    }
                }
            }
            if (!foundPath) break;
            int pathFlow = Integer.MAX_VALUE;
            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                pathFlow = Math.min(pathFlow, residual[u][v]);
            }
            maxFlow += pathFlow;
            for (int v = sink; v != source; v = parent[v]) {
                int u = parent[v];
                residual[u][v] -= pathFlow;
                residual[v][u] += pathFlow;
            }
        }
        return maxFlow;
    }
}`
            },
            {
                id: "astar",
                name: "A* Search Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(E log V) | Space: O(V)",
                description: "Find the shortest path using a heuristic function that estimates the cost to reach the goal.",
                code: `import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.PriorityQueue;
import java.util.Set;

public class AStar {
    public int[] aStar(int[][] graph, int start, int end, int[] heuristic) {
        PriorityQueue<Node> open = new PriorityQueue<>((a, b) -> a.f - b.f);
        Set<Integer> closed = new HashSet<>();
        Map<Integer, Integer> gScore = new HashMap<>();
        Map<Integer, Integer> cameFrom = new HashMap<>();
        gScore.put(start, 0);
        open.offer(new Node(start, 0, heuristic[start]));
        while (!open.isEmpty()) {
            Node curr = open.poll();
            if (curr.vertex == end) return reconstructPath(cameFrom, end);
            if (closed.contains(curr.vertex)) continue;
            closed.add(curr.vertex);
            for (int i = 0; i < graph[curr.vertex].length; i++) {
                if (graph[curr.vertex][i] == 0 || closed.contains(i)) continue;
                int tentativeG = gScore.get(curr.vertex) + graph[curr.vertex][i];
                if (tentativeG < gScore.getOrDefault(i, Integer.MAX_VALUE)) {
                    cameFrom.put(i, curr.vertex);
                    gScore.put(i, tentativeG);
                    int f = tentativeG + heuristic[i];
                    open.offer(new Node(i, tentativeG, f));
                }
            }
        }
        return new int[0];
    }
    
    private int[] reconstructPath(Map<Integer, Integer> cameFrom, int end) {
        int[] path = new int[cameFrom.size() + 1];
        int curr = end, idx = path.length - 1;
        path[idx--] = curr;
        while (cameFrom.containsKey(curr)) {
            curr = cameFrom.get(curr);
            path[idx--] = curr;
        }
        return path;
    }
    
    class Node {
        int vertex, g, f;
        Node(int v, int g, int f) { this.vertex = v; this.g = g; this.f = f; }
    }
}`
            },
            {
                id: "bridges-in-graph",
                name: "Bridges in a Graph",
                difficulty: "Hard",
                complexity: "Time: O(V + E) | Space: O(V)",
                description: "Find all bridges (critical edges) in an undirected graph using DFS.",
                code: `import java.util.ArrayList;
import java.util.List;

public class BridgesInGraph {
    private int timer;
    private int[] disc, low;
    private List<List<Integer>> bridges;
    
    public List<List<Integer>> findBridges(int V, List<List<Integer>> adj) {
        disc = new int[V];
        low = new int[V];
        timer = 0;
        bridges = new ArrayList<>();
        for (int i = 0; i < V; i++) {
            if (disc[i] == 0) dfs(i, -1, adj);
        }
        return bridges;
    }
    
    private void dfs(int u, int parent, List<List<Integer>> adj) {
        disc[u] = low[u] = ++timer;
        for (int v : adj.get(u)) {
            if (v == parent) continue;
            if (disc[v] != 0) {
                low[u] = Math.min(low[u], disc[v]);
            } else {
                dfs(v, u, adj);
                low[u] = Math.min(low[u], low[v]);
                if (low[v] > disc[u]) {
                    List<Integer> bridge = new ArrayList<>();
                    bridge.add(u);
                    bridge.add(v);
                    bridges.add(bridge);
                }
            }
        }
    }
}`
            },
            {
                id: "johnson",
                name: "Johnson's Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(V^2 log V + VE) | Space: O(V)",
                description: "Find shortest paths between all pairs in a sparse weighted graph, handling negative edges.",
                code: `import java.util.Arrays;
import java.util.PriorityQueue;

public class JohnsonAlgorithm {
    public int[][] johnson(int V, int[][][] adj) {
        int[] h = bellmanFordInit(V, adj);
        if (h == null) {
            System.out.println("Negative weight cycle");
            return null;
        }
        int[][] dist = new int[V][V];
        for (int u = 0; u < V; u++) {
            Arrays.fill(dist[u], Integer.MAX_VALUE);
            dist[u][u] = 0;
            PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
            pq.offer(new int[]{u, 0});
            while (!pq.isEmpty()) {
                int[] curr = pq.poll();
                int v = curr[0], d = curr[1];
                if (d > dist[u][v]) continue;
                for (int[] edge : adj[v]) {
                    int next = edge[0], w = edge[1] + h[v] - h[next];
                    if (dist[u][v] + w < dist[u][next]) {
                        dist[u][next] = dist[u][v] + w;
                        pq.offer(new int[]{next, dist[u][next]});
                    }
                }
            }
            for (int v = 0; v < V; v++) {
                if (dist[u][v] != Integer.MAX_VALUE) {
                    dist[u][v] = dist[u][v] - h[u] + h[v];
                }
            }
        }
        return dist;
    }
    
    private int[] bellmanFordInit(int V, int[][][] adj) {
        int[] dist = new int[V];
        Arrays.fill(dist, 0);
        for (int i = 0; i < V - 1; i++) {
            for (int u = 0; u < V; u++) {
                for (int[] edge : adj[u]) {
                    int v = edge[0], w = edge[1];
                    if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                        dist[v] = dist[u] + w;
                    }
                }
            }
        }
        return dist;
    }
}`
            },
            {
                id: "lee-algorithm",
                name: "Lee Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(V) | Space: O(V)",
                description: "Breadth-first search for maze routing to find the shortest path in a grid.",
                code: `import java.util.LinkedList;
import java.util.Queue;

public class LeeAlgorithm {
    private static final int[] DX = {-1, 1, 0, 0};
    private static final int[] DY = {0, 0, -1, 1};
    
    public int shortestPath(int[][] grid, int[] start, int[] end) {
        int rows = grid.length, cols = grid[0].length;
        boolean[][] visited = new boolean[rows][cols];
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{start[0], start[1], 0});
        visited[start[0]][start[1]] = true;
        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int x = curr[0], y = curr[1], dist = curr[2];
            if (x == end[0] && y == end[1]) return dist;
            for (int i = 0; i < 4; i++) {
                int nx = x + DX[i], ny = y + DY[i];
                if (nx >= 0 && nx < rows && ny >= 0 && ny < cols &&
                    grid[nx][ny] == 0 && !visited[nx][ny]) {
                    visited[nx][ny] = true;
                    queue.offer(new int[]{nx, ny, dist + 1});
                }
            }
        }
        return -1;
    }
}`
            },
            {
                id: "best-first-search",
                name: "Best-First Search",
                difficulty: "Medium",
                complexity: "Time: O(E log V) | Space: O(V)",
                description: "Graph traversal using a priority queue ordered by a heuristic evaluation function.",
                code: `import java.util.ArrayList;
import java.util.List;
import java.util.PriorityQueue;

public class BestFirstSearch {
    public List<Integer> bestFirstSearch(int V, List<List<Edge>> adj, int start, int[] heuristic) {
        List<Integer> result = new ArrayList<>();
        boolean[] visited = new boolean[V];
        PriorityQueue<Node> pq = new PriorityQueue<>((a, b) -> a.priority - b.priority);
        pq.offer(new Node(start, heuristic[start]));
        visited[start] = true;
        while (!pq.isEmpty()) {
            Node curr = pq.poll();
            result.add(curr.vertex);
            for (Edge edge : adj.get(curr.vertex)) {
                if (!visited[edge.to]) {
                    visited[edge.to] = true;
                    pq.offer(new Node(edge.to, heuristic[edge.to]));
                }
            }
        }
        return result;
    }
    
    class Node {
        int vertex, priority;
        Node(int v, int p) { vertex = v; priority = p; }
    }
    
    class Edge {
        int to, weight;
        Edge(int t, int w) { to = t; weight = w; }
    }
}`
            }
        ]
    },

    trees: {
        title: "TREE_ALGORITHMS",
        description: "10 Essential Tree Algorithms",
        algorithms: [
            {
                id: "tree-traversals",
                name: "Binary Tree Traversals",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Inorder, Preorder, and Postorder traversals of a binary tree.",
                code: `import java.util.ArrayList;
import java.util.List;

public class TreeTraversals {
    public List<Integer> inorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        inorderUtil(root, result);
        return result;
    }
    
    private void inorderUtil(TreeNode node, List<Integer> result) {
        if (node == null) return;
        inorderUtil(node.left, result);
        result.add(node.val);
        inorderUtil(node.right, result);
    }
    
    public List<Integer> preorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        preorderUtil(root, result);
        return result;
    }
    
    private void preorderUtil(TreeNode node, List<Integer> result) {
        if (node == null) return;
        result.add(node.val);
        preorderUtil(node.left, result);
        preorderUtil(node.right, result);
    }
    
    public List<Integer> postorder(TreeNode root) {
        List<Integer> result = new ArrayList<>();
        postorderUtil(root, result);
        return result;
    }
    
    private void postorderUtil(TreeNode node, List<Integer> result) {
        if (node == null) return;
        postorderUtil(node.left, result);
        postorderUtil(node.right, result);
        result.add(node.val);
    }
}`
            },
            {
                id: "level-order-traversal",
                name: "Level Order Traversal",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Traverse a binary tree level by level using BFS.",
                code: `import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class LevelOrderTraversal {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            int size = queue.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode curr = queue.poll();
                level.add(curr.val);
                if (curr.left != null) queue.offer(curr.left);
                if (curr.right != null) queue.offer(curr.right);
            }
            result.add(level);
        }
        return result;
    }
}`
            },
            {
                id: "lca-binary-tree",
                name: "Lowest Common Ancestor (LCA)",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Find the lowest common ancestor of two nodes in a binary tree.",
                code: `public class LCA {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null || root == p || root == q) return root;
        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);
        if (left != null && right != null) return root;
        return left != null ? left : right;
    }
}`
            },
            {
                id: "fenwick-tree",
                name: "Fenwick Tree (Binary Indexed Tree)",
                difficulty: "Hard",
                complexity: "Time: O(log n) | Space: O(n)",
                description: "Efficiently compute prefix sums and update elements in an array.",
                code: `public class FenwickTree {
    private int[] tree;
    private int n;
    
    public FenwickTree(int[] nums) {
        n = nums.length;
        tree = new int[n + 1];
        for (int i = 0; i < n; i++) update(i, nums[i]);
    }
    
    public void update(int index, int delta) {
        index++;
        while (index <= n) {
            tree[index] += delta;
            index += index & (-index);
        }
    }
    
    public int query(int index) {
        index++;
        int sum = 0;
        while (index > 0) {
            sum += tree[index];
            index -= index & (-index);
        }
        return sum;
    }
    
    public int queryRange(int left, int right) {
        return query(right) - query(left - 1);
    }
}`
            },
            {
                id: "segment-tree",
                name: "Segment Tree",
                difficulty: "Hard",
                complexity: "Time: O(log n) | Space: O(n)",
                description: "A tree data structure for storing intervals and performing range queries efficiently.",
                code: `public class SegmentTree {
    private int[] tree;
    private int n;
    
    public SegmentTree(int[] nums) {
        n = nums.length;
        tree = new int[4 * n];
        build(nums, 0, 0, n - 1);
    }
    
    private void build(int[] nums, int node, int start, int end) {
        if (start == end) {
            tree[node] = nums[start];
        } else {
            int mid = (start + end) / 2;
            build(nums, 2 * node + 1, start, mid);
            build(nums, 2 * node + 2, mid + 1, end);
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }
    
    public int query(int l, int r) {
        return queryUtil(0, 0, n - 1, l, r);
    }
    
    private int queryUtil(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return queryUtil(2 * node + 1, start, mid, l, r) +
               queryUtil(2 * node + 2, mid + 1, end, l, r);
    }
    
    public void update(int idx, int val) {
        updateUtil(0, 0, n - 1, idx, val);
    }
    
    private void updateUtil(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (start <= idx && idx <= mid) {
                updateUtil(2 * node + 1, start, mid, idx, val);
            } else {
                updateUtil(2 * node + 2, mid + 1, end, idx, val);
            }
            tree[node] = tree[2 * node + 1] + tree[2 * node + 2];
        }
    }
}`
            },
            {
                id: "avl-rotation",
                name: "AVL Tree Rotation",
                difficulty: "Hard",
                complexity: "Time: O(log n) | Space: O(1)",
                description: "Self-balancing BST with height difference of at most 1 between subtrees.",
                code: `public class AVLTree {
    class Node {
        int key, height;
        Node left, right;
        Node(int d) { key = d; height = 1; }
    }
    
    private int height(Node N) {
        return (N == null) ? 0 : N.height;
    }
    
    private Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        return x;
    }
    
    private Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        return y;
    }
    
    private int getBalance(Node N) {
        return (N == null) ? 0 : height(N.left) - height(N.right);
    }
    
    public Node insert(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        else return node;
        node.height = 1 + Math.max(height(node.left), height(node.right));
        int balance = getBalance(node);
        if (balance > 1 && key < node.left.key) return rightRotate(node);
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }
}`
            },
            {
                id: "huffman-coding",
                name: "Huffman Coding",
                difficulty: "Hard",
                complexity: "Time: O(n log n) | Space: O(n)",
                description: "Lossless data compression algorithm using variable-length prefix codes based on character frequencies.",
                code: `import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class HuffmanCoding {
    class Node implements Comparable<Node> {
        char ch;
        int freq;
        Node left, right;
        Node(char ch, int freq) { this.ch = ch; this.freq = freq; }
        Node(int freq, Node left, Node right) {
            this.ch = '\0'; this.freq = freq;
            this.left = left; this.right = right;
        }
        public int compareTo(Node other) { return this.freq - other.freq; }
    }
    
    private Map<Character, String> codes = new HashMap<>();
    
    public Map<Character, String> buildCodes(Map<Character, Integer> freqMap) {
        PriorityQueue<Node> pq = new PriorityQueue<>();
        for (Map.Entry<Character, Integer> entry : freqMap.entrySet()) {
            pq.offer(new Node(entry.getKey(), entry.getValue()));
        }
        while (pq.size() > 1) {
            Node left = pq.poll();
            Node right = pq.poll();
            pq.offer(new Node(left.freq + right.freq, left, right));
        }
        if (!pq.isEmpty()) buildCodeUtil(pq.poll(), "");
        return codes;
    }
    
    private void buildCodeUtil(Node node, String code) {
        if (node == null) return;
        if (node.left == null && node.right == null) {
            codes.put(node.ch, code);
            return;
        }
        buildCodeUtil(node.left, code + "0");
        buildCodeUtil(node.right, code + "1");
    }
}`
            },
            {
                id: "red-black-tree",
                name: "Red-Black Tree Rebalancing",
                difficulty: "Hard",
                complexity: "Time: O(log n) | Space: O(1)",
                description: "Self-balancing BST ensuring the path from root to the furthest leaf is no more than twice as long as any other.",
                code: `public class RedBlackTree {
    private static final boolean RED = true;
    private static final boolean BLACK = false;
    
    class Node {
        int key;
        boolean color;
        Node left, right, parent;
        Node(int key) { this.key = key; this.color = RED; }
    }
    
    private Node root;
    
    private void rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        if (y.left != null) y.left.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = y;
        y.left = x;
        x.parent = y;
    }
    
    private void rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        if (x.right != null) x.right.parent = y;
        x.parent = y.parent;
        if (y.parent == null) root = x;
        else if (y == y.parent.right) y.parent.right = x;
        else y.parent.left = x;
        x.right = y;
        y.parent = x;
    }
    
    public void insert(int key) {
        Node node = new Node(key);
        root = bstInsert(root, node);
        fixViolation(node);
    }
    
    private Node bstInsert(Node root, Node node) {
        if (root == null) return node;
        if (node.key < root.key) {
            root.left = bstInsert(root.left, node);
            root.left.parent = root;
        } else if (node.key > root.key) {
            root.right = bstInsert(root.right, node);
            root.right.parent = root;
        }
        return root;
    }
    
    private void fixViolation(Node node) {
        Node parent = null;
        Node grandParent = null;
        while (node != root && node.color == RED && node.parent.color == RED) {
            parent = node.parent;
            grandParent = parent.parent;
            if (parent == grandParent.left) {
                Node uncle = grandParent.right;
                if (uncle != null && uncle.color == RED) {
                    grandParent.color = RED;
                    parent.color = BLACK;
                    uncle.color = BLACK;
                    node = grandParent;
                } else {
                    if (node == parent.right) {
                        rotateLeft(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    rotateRight(grandParent);
                    boolean temp = parent.color;
                    parent.color = grandParent.color;
                    grandParent.color = temp;
                    node = parent;
                }
            } else {
                Node uncle = grandParent.left;
                if (uncle != null && uncle.color == RED) {
                    grandParent.color = RED;
                    parent.color = BLACK;
                    uncle.color = BLACK;
                    node = grandParent;
                } else {
                    if (node == parent.left) {
                        rotateRight(parent);
                        node = parent;
                        parent = node.parent;
                    }
                    rotateLeft(grandParent);
                    boolean temp = parent.color;
                    parent.color = grandParent.color;
                    grandParent.color = temp;
                    node = parent;
                }
            }
        }
        root.color = BLACK;
    }
}`
            },
            {
                id: "b-tree",
                name: "B-Tree Insertion/Deletion",
                difficulty: "Hard",
                complexity: "Time: O(log n) | Space: O(n)",
                description: "A self-balancing search tree optimized for systems that read/write large blocks of data.",
                code: `public class BTree {
    private int t; // minimum degree
    private Node root;
    
    class Node {
        int n; // current number of keys
        int[] keys;
        Node[] children;
        boolean leaf;
        
        Node(int t, boolean leaf) {
            this.leaf = leaf;
            this.keys = new int[2 * t - 1];
            this.children = new Node[2 * t];
            this.n = 0;
        }
    }
    
    public BTree(int t) {
        this.t = t;
        this.root = new Node(t, true);
    }
    
    public void insert(int key) {
        Node r = root;
        if (r.n == 2 * t - 1) {
            Node s = new Node(t, false);
            root = s;
            s.children[0] = r;
            splitChild(s, 0, r);
            insertNonFull(s, key);
        } else {
            insertNonFull(r, key);
        }
    }
    
    private void splitChild(Node x, int i, Node y) {
        Node z = new Node(t, y.leaf);
        z.n = t - 1;
        for (int j = 0; j < t - 1; j++) z.keys[j] = y.keys[j + t];
        if (!y.leaf) {
            for (int j = 0; j < t; j++) z.children[j] = y.children[j + t];
        }
        y.n = t - 1;
        for (int j = x.n; j >= i + 1; j--) x.children[j + 1] = x.children[j];
        x.children[i + 1] = z;
        for (int j = x.n - 1; j >= i; j--) x.keys[j + 1] = x.keys[j];
        x.keys[i] = y.keys[t - 1];
        x.n = x.n + 1;
    }
    
    private void insertNonFull(Node x, int k) {
        int i = x.n - 1;
        if (x.leaf) {
            while (i >= 0 && k < x.keys[i]) {
                x.keys[i + 1] = x.keys[i];
                i--;
            }
            x.keys[i + 1] = k;
            x.n = x.n + 1;
        } else {
            while (i >= 0 && k < x.keys[i]) i--;
            i++;
            if (x.children[i].n == 2 * t - 1) {
                splitChild(x, i, x.children[i]);
                if (k > x.keys[i]) i++;
            }
            insertNonFull(x.children[i], k);
        }
    }
}`
            },
            {
                id: "splay-tree",
                name: "Splay Tree",
                difficulty: "Hard",
                complexity: "Time: O(log n) amortized | Space: O(n)",
                description: "A self-adjusting BST where recently accessed elements are quick to access again.",
                code: `public class SplayTree {
    class Node {
        int key;
        Node left, right;
        Node(int key) { this.key = key; }
    }
    
    private Node root;
    
    private Node rotateRight(Node y) {
        Node x = y.left;
        y.left = x.right;
        x.right = y;
        return x;
    }
    
    private Node rotateLeft(Node x) {
        Node y = x.right;
        x.right = y.left;
        y.left = x;
        return y;
    }
    
    private Node splay(Node root, int key) {
        if (root == null || root.key == key) return root;
        if (root.key > key) {
            if (root.left == null) return root;
            if (root.left.key > key) {
                root.left.left = splay(root.left.left, key);
                root = rotateRight(root);
            } else if (root.left.key < key) {
                root.left.right = splay(root.left.right, key);
                if (root.left.right != null) root.left = rotateLeft(root.left);
            }
            return (root.left == null) ? root : rotateRight(root);
        } else {
            if (root.right == null) return root;
            if (root.right.key > key) {
                root.right.left = splay(root.right.left, key);
                if (root.right.left != null) root.right = rotateRight(root.right);
            } else if (root.right.key < key) {
                root.right.right = splay(root.right.right, key);
                root = rotateLeft(root);
            }
            return (root.right == null) ? root : rotateLeft(root);
        }
    }
    
    public Node search(Node root, int key) {
        return splay(root, key);
    }
    
    public Node insert(Node root, int key) {
        if (root == null) return new Node(key);
        root = splay(root, key);
        if (root.key == key) return root;
        Node newNode = new Node(key);
        if (root.key > key) {
            newNode.right = root;
            newNode.left = root.left;
            root.left = null;
        } else {
            newNode.left = root;
            newNode.right = root.right;
            root.right = null;
        }
        return newNode;
    }
}`
            }
        ]
    },

    dp: {
        title: "DYNAMIC_PROGRAMMING",
        description: "9 Essential DP Algorithms",
        algorithms: [
            {
                id: "knapsack-01",
                name: "0/1 Knapsack Problem",
                difficulty: "Medium",
                complexity: "Time: O(n * W) | Space: O(n * W)",
                description: "Given weights and values, find the maximum value subset with total weight not exceeding capacity.",
                code: `public class Knapsack01 {
    public int knapsack(int[] weights, int[] values, int W) {
        int n = weights.length;
        int[][] dp = new int[n + 1][W + 1];
        for (int i = 1; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                dp[i][w] = dp[i - 1][w];
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
                }
            }
        }
        return dp[n][W];
    }
}`
            },
            {
                id: "longest-common-subsequence",
                name: "Longest Common Subsequence (LCS)",
                difficulty: "Medium",
                complexity: "Time: O(m * n) | Space: O(m * n)",
                description: "Find the length of the longest subsequence common to two strings.",
                code: `public class LCS {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length(), n = text2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`
            },
            {
                id: "edit-distance",
                name: "Edit Distance (Levenshtein)",
                difficulty: "Medium",
                complexity: "Time: O(m * n) | Space: O(m * n)",
                description: "Find the minimum number of operations (insert, delete, replace) to convert one string to another.",
                code: `public class EditDistance {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1],
                                   Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }
        return dp[m][n];
    }
}`
            },
            {
                id: "matrix-chain-multiplication",
                name: "Matrix Chain Multiplication",
                difficulty: "Hard",
                complexity: "Time: O(n^3) | Space: O(n^2)",
                description: "Find the minimum number of scalar multiplications to multiply a chain of matrices.",
                code: `public class MatrixChainMultiplication {
    public int matrixChainOrder(int[] p) {
        int n = p.length - 1;
        int[][] dp = new int[n][n];
        for (int len = 2; len <= n; len++) {
            for (int i = 0; i < n - len + 1; i++) {
                int j = i + len - 1;
                dp[i][j] = Integer.MAX_VALUE;
                for (int k = i; k < j; k++) {
                    int cost = dp[i][k] + dp[k + 1][j] + p[i] * p[k + 1] * p[j + 1];
                    dp[i][j] = Math.min(dp[i][j], cost);
                }
            }
        }
        return dp[0][n - 1];
    }
}`
            },
            {
                id: "kadane-algorithm",
                name: "Kadane's Algorithm (Max Subarray)",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Find the maximum sum contiguous subarray in a single pass.",
                code: `public class KadaneAlgorithm {
    public int maxSubArray(int[] nums) {
        int maxSoFar = nums[0];
        int maxEndingHere = nums[0];
        for (int i = 1; i < nums.length; i++) {
            maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
            maxSoFar = Math.max(maxSoFar, maxEndingHere);
        }
        return maxSoFar;
    }
}`
            },
            {
                id: "coin-change",
                name: "Coin Change Problem",
                difficulty: "Medium",
                complexity: "Time: O(n * amount) | Space: O(amount)",
                description: "Find the fewest number of coins needed to make up a given amount.",
                code: `public class CoinChange {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        for (int i = 1; i <= amount; i++) dp[i] = amount + 1;
        dp[0] = 0;
        for (int coin : coins) {
            for (int i = coin; i <= amount; i++) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
            },
            {
                id: "tsp-dp",
                name: "Traveling Salesman Problem (DP)",
                difficulty: "Hard",
                complexity: "Time: O(n^2 * 2^n) | Space: O(n * 2^n)",
                description: "Find the shortest possible route that visits each city exactly once and returns to the origin.",
                code: `public class TSP {
    public int solveTSP(int[][] dist) {
        int n = dist.length;
        int TOTAL_STATES = 1 << n;
        int[][] dp = new int[TOTAL_STATES][n];
        for (int[] row : dp) java.util.Arrays.fill(row, Integer.MAX_VALUE);
        dp[1][0] = 0;
        for (int mask = 1; mask < TOTAL_STATES; mask++) {
            for (int u = 0; u < n; u++) {
                if ((mask & (1 << u)) != 0 && dp[mask][u] != Integer.MAX_VALUE) {
                    for (int v = 0; v < n; v++) {
                        if ((mask & (1 << v)) == 0) {
                            int newMask = mask | (1 << v);
                            dp[newMask][v] = Math.min(dp[newMask][v], dp[mask][u] + dist[u][v]);
                        }
                    }
                }
            }
        }
        int result = Integer.MAX_VALUE;
        for (int i = 1; i < n; i++) {
            result = Math.min(result, dp[TOTAL_STATES - 1][i] + dist[i][0]);
        }
        return result;
    }
}`
            },
            {
                id: "floyd-cycle-finding",
                name: "Floyd's Cycle-Finding (Tortoise and Hare)",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Detect a cycle in a linked list using two pointers moving at different speeds.",
                code: `public class FloydCycleFinding {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
    
    public ListNode detectCycle(ListNode head) {
        if (head == null || head.next == null) return null;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null;
    }
}`
            },
            {
                id: "bellman-equation",
                name: "Bellman Equation (DP Foundation)",
                difficulty: "Hard",
                complexity: "Time: O(n * states) | Space: O(states)",
                description: "The foundation of dynamic programming and reinforcement learning expressing value recursively.",
                code: `import java.util.HashMap;
import java.util.Map;

public class BellmanEquation {
    private Map<String, Double> valueFunction = new HashMap<>();
    private double discount;
    
    public BellmanEquation(double discount) {
        this.discount = discount;
    }
    
    public double bellmanUpdate(String state, double reward, Map<String, Double> transitions) {
        double maxValue = Double.NEGATIVE_INFINITY;
        for (Map.Entry<String, Double> entry : transitions.entrySet()) {
            String nextState = entry.getKey();
            double prob = entry.getValue();
            double value = reward + discount * valueFunction.getOrDefault(nextState, 0.0);
            maxValue = Math.max(maxValue, prob * value);
        }
        valueFunction.put(state, maxValue);
        return maxValue;
    }
    
    public Map<String, Double> getValueFunction() {
        return valueFunction;
    }
}`
            }
        ]
    },

    strings: {
        title: "STRING_ALGORITHMS",
        description: "10 Essential String Algorithms",
        algorithms: [
            {
                id: "kmp",
                name: "Knuth-Morris-Pratt (KMP)",
                difficulty: "Hard",
                complexity: "Time: O(n + m) | Space: O(m)",
                description: "Efficient pattern matching algorithm that avoids re-examining previously matched characters.",
                code: `public class KMP {
    public int kmpSearch(String text, String pattern) {
        int[] lps = computeLPS(pattern);
        int i = 0, j = 0;
        while (i < text.length()) {
            if (pattern.charAt(j) == text.charAt(i)) {
                i++;
                j++;
            }
            if (j == pattern.length()) return i - j;
            if (i < text.length() && pattern.charAt(j) != text.charAt(i)) {
                j = (j > 0) ? lps[j - 1] : 0;
            }
        }
        return -1;
    }
    
    private int[] computeLPS(String pattern) {
        int[] lps = new int[pattern.length()];
        int len = 0;
        int i = 1;
        while (i < pattern.length()) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len != 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }
}`
            },
            {
                id: "rabin-karp",
                name: "Rabin-Karp Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(n + m) avg | Space: O(1)",
                description: "String matching algorithm using hashing to find patterns in text.",
                code: `public class RabinKarp {
    private static final int PRIME = 101;
    private static final int BASE = 256;
    
    public int rabinKarp(String text, String pattern) {
        int n = text.length(), m = pattern.length();
        if (m > n) return -1;
        long patternHash = 0, textHash = 0;
        long h = 1;
        for (int i = 0; i < m - 1; i++) h = (h * BASE) % PRIME;
        for (int i = 0; i < m; i++) {
            patternHash = (patternHash * BASE + pattern.charAt(i)) % PRIME;
            textHash = (textHash * BASE + text.charAt(i)) % PRIME;
        }
        for (int i = 0; i <= n - m; i++) {
            if (patternHash == textHash) {
                boolean match = true;
                for (int j = 0; j < m; j++) {
                    if (text.charAt(i + j) != pattern.charAt(j)) {
                        match = false;
                        break;
                    }
                }
                if (match) return i;
            }
            if (i < n - m) {
                textHash = ((textHash - text.charAt(i) * h) * BASE + text.charAt(i + m)) % PRIME;
                if (textHash < 0) textHash += PRIME;
            }
        }
        return -1;
    }
}`
            },
            {
                id: "boyer-moore",
                name: "Boyer-Moore String Search",
                difficulty: "Hard",
                complexity: "Time: O(n/m) best | Space: O(k)",
                description: "Efficient string search that skips sections of the text using bad character and good suffix rules.",
                code: `import java.util.HashMap;
import java.util.Map;

public class BoyerMoore {
    public int boyerMoore(String text, String pattern) {
        int n = text.length(), m = pattern.length();
        if (m == 0) return 0;
        Map<Character, Integer> badChar = buildBadCharTable(pattern);
        int s = 0;
        while (s <= n - m) {
            int j = m - 1;
            while (j >= 0 && pattern.charAt(j) == text.charAt(s + j)) j--;
            if (j < 0) return s;
            s += Math.max(1, j - badChar.getOrDefault(text.charAt(s + j), -1));
        }
        return -1;
    }
    
    private Map<Character, Integer> buildBadCharTable(String pattern) {
        Map<Character, Integer> table = new HashMap<>();
        for (int i = 0; i < pattern.length(); i++) {
            table.put(pattern.charAt(i), i);
        }
        return table;
    }
}`
            },
            {
                id: "z-algorithm",
                name: "Z Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(n + m) | Space: O(n)",
                description: "Linear time pattern matching algorithm that computes the Z-array.",
                code: `public class ZAlgorithm {
    public int zAlgorithm(String text, String pattern) {
        String combined = pattern + "$" + text;
        int[] z = computeZ(combined);
        for (int i = 0; i < z.length; i++) {
            if (z[i] == pattern.length()) return i - pattern.length() - 1;
        }
        return -1;
    }
    
    private int[] computeZ(String s) {
        int n = s.length();
        int[] z = new int[n];
        int L = 0, R = 0;
        for (int i = 1; i < n; i++) {
            if (i <= R) z[i] = Math.min(R - i + 1, z[i - L]);
            while (i + z[i] < n && s.charAt(z[i]) == s.charAt(i + z[i])) {
                L = i; R = i + z[i];
                z[i]++;
            }
        }
        return z;
    }
}`
            },
            {
                id: "aho-corasick",
                name: "Aho-Corasick Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(n + m + z) | Space: O(m * k)",
                description: "Multiple pattern matching algorithm that finds all occurrences of a finite set of patterns in a text.",
                code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

public class AhoCorasick {
    class TrieNode {
        Map<Character, TrieNode> children = new HashMap<>();
        TrieNode failure;
        List<String> output = new ArrayList<>();
    }
    
    private TrieNode root = new TrieNode();
    
    public void buildTrie(String[] patterns) {
        for (String pattern : patterns) {
            TrieNode node = root;
            for (char c : pattern.toCharArray()) {
                node.children.putIfAbsent(c, new TrieNode());
                node = node.children.get(c);
            }
            node.output.add(pattern);
        }
    }
    
    public void buildFailureLinks() {
        Queue<TrieNode> queue = new LinkedList<>();
        for (TrieNode node : root.children.values()) {
            node.failure = root;
            queue.offer(node);
        }
        while (!queue.isEmpty()) {
            TrieNode curr = queue.poll();
            for (Map.Entry<Character, TrieNode> entry : curr.children.entrySet()) {
                char c = entry.getKey();
                TrieNode child = entry.getValue();
                TrieNode f = curr.failure;
                while (f != null && !f.children.containsKey(c)) f = f.failure;
                child.failure = (f == null) ? root : f.children.get(c);
                child.output.addAll(child.failure.output);
                queue.offer(child);
            }
        }
    }
    
    public List<String> search(String text) {
        List<String> result = new ArrayList<>();
        TrieNode node = root;
        for (char c : text.toCharArray()) {
            while (node != null && !node.children.containsKey(c)) node = node.failure;
            node = (node == null) ? root : node.children.get(c);
            result.addAll(node.output);
        }
        return result;
    }
}`
            },
            {
                id: "manacher",
                name: "Manacher's Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Find the longest palindromic substring in linear time.",
                code: `public class Manacher {
    public String longestPalindrome(String s) {
        if (s == null || s.length() == 0) return "";
        String t = preprocess(s);
        int n = t.length();
        int[] P = new int[n];
        int C = 0, R = 0;
        for (int i = 1; i < n - 1; i++) {
            int mirror = 2 * C - i;
            if (i < R) P[i] = Math.min(R - i, P[mirror]);
            while (t.charAt(i + P[i] + 1) == t.charAt(i - P[i] - 1)) P[i]++;
            if (i + P[i] > R) {
                C = i;
                R = i + P[i];
            }
        }
        int maxLen = 0, centerIndex = 0;
        for (int i = 1; i < n - 1; i++) {
            if (P[i] > maxLen) {
                maxLen = P[i];
                centerIndex = i;
            }
        }
        int start = (centerIndex - maxLen) / 2;
        return s.substring(start, start + maxLen);
    }
    
    private String preprocess(String s) {
        StringBuilder sb = new StringBuilder("^");
        for (char c : s.toCharArray()) {
            sb.append("#").append(c);
        }
        sb.append("#$");
        return sb.toString();
    }
}`
            },
            {
                id: "longest-palindrome-substring",
                name: "Longest Palindromic Substring",
                difficulty: "Medium",
                complexity: "Time: O(n^2) | Space: O(1)",
                description: "Find the longest substring that reads the same forwards and backwards.",
                code: `public class LongestPalindrome {
    public String longestPalindrome(String s) {
        if (s == null || s.length() < 1) return "";
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
            }
        }
        return s.substring(start, end + 1);
    }
    
    private int expandAroundCenter(String s, int left, int right) {
        while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
            left--;
            right++;
        }
        return right - left - 1;
    }
}`
            },
            {
                id: "soundex",
                name: "Soundex Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Phonetic algorithm for indexing names by sound, as pronounced in English.",
                code: `public class Soundex {
    public String soundex(String name) {
        if (name == null || name.isEmpty()) return "";
        name = name.toUpperCase();
        char[] codes = {'0', '1', '2', '3', '0', '1', '2', '0', '0', '2', '2', '4', '5', '5',
                        '0', '1', '2', '6', '2', '3', '0', '1', '0', '2', '0', '2'};
        StringBuilder result = new StringBuilder();
        result.append(name.charAt(0));
        char prev = codes[name.charAt(0) - 'A'];
        for (int i = 1; i < name.length() && result.length() < 4; i++) {
            char curr = name.charAt(i);
            if (curr < 'A' || curr > 'Z') continue;
            char code = codes[curr - 'A'];
            if (code != '0' && code != prev) {
                result.append(code);
            }
            prev = code;
        }
        while (result.length() < 4) result.append('0');
        return result.toString();
    }
}`
            },
            {
                id: "wagner-fischer",
                name: "Wagner-Fischer Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(m * n) | Space: O(m * n)",
                description: "Compute the edit distance between two strings using dynamic programming.",
                code: `public class WagnerFischer {
    public int wagnerFischer(String s1, String s2) {
        int m = s1.length(), n = s2.length();
        int[][] dp = new int[m + 1][n + 1];
        for (int i = 0; i <= m; i++) dp[i][0] = i;
        for (int j = 0; j <= n; j++) dp[0][j] = j;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                int cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;
                dp[i][j] = Math.min(Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                           dp[i - 1][j - 1] + cost);
            }
        }
        return dp[m][n];
    }
}`
            },
            {
                id: "ukkonen-suffix-tree",
                name: "Ukkonen's Suffix Tree Construction",
                difficulty: "Hard",
                complexity: "Time: O(n) | Space: O(n)",
                description: "Construct a suffix tree in linear time for efficient string matching.",
                code: `import java.util.HashMap;
import java.util.Map;

public class UkkonenSuffixTree {
    class Node {
        int start, end;
        Map<Character, Node> children = new HashMap<>();
        Node suffixLink;
        Node(int s, int e) { start = s; end = e; }
        int length() { return end - start; }
    }
    
    private String text;
    private Node root;
    private Node activeNode;
    private int activeEdge, activeLength, remainingSuffixCount;
    private int leafEnd;
    
    public UkkonenSuffixTree(String text) {
        this.text = text;
        root = new Node(-1, -1);
        activeNode = root;
        for (int i = 0; i < text.length(); i++) {
            extendSuffixTree(i);
        }
    }
    
    private void extendSuffixTree(int idx) {
        leafEnd++;
        remainingSuffixCount++;
        activeEdge = idx - remainingSuffixCount + 1;
        while (remainingSuffixCount > 0) {
            if (activeLength == 0) activeEdge = idx;
            if (!activeNode.children.containsKey(text.charAt(activeEdge))) {
                activeNode.children.put(text.charAt(activeEdge), new Node(idx, leafEnd + 1));
                remainingSuffixCount--;
            } else {
                Node next = activeNode.children.get(text.charAt(activeEdge));
                if (walkDown(next, idx)) continue;
                if (text.charAt(next.start + activeLength) == text.charAt(idx)) {
                    activeLength++;
                    remainingSuffixCount--;
                } else {
                    Node split = new Node(next.start, next.start + activeLength);
                    split.children.put(text.charAt(idx), new Node(idx, leafEnd + 1));
                    next.start += activeLength;
                    split.children.put(text.charAt(next.start), next);
                    activeNode.children.put(text.charAt(activeEdge), split);
                    remainingSuffixCount--;
                }
            }
        }
    }
    
    private boolean walkDown(Node next, int idx) {
        if (activeLength >= next.length()) {
            activeEdge += next.length();
            activeLength -= next.length();
            activeNode = next;
            return true;
        }
        return false;
    }
}`
            }
        ]
    },

    math: {
        title: "MATHEMATICAL_ALGORITHMS",
        description: "14 Essential Math Algorithms",
        algorithms: [
            {
                id: "euclidean-gcd",
                name: "Euclidean Algorithm (GCD)",
                difficulty: "Easy",
                complexity: "Time: O(log(min(a, b))) | Space: O(1)",
                description: "Efficiently compute the greatest common divisor of two numbers.",
                code: `public class EuclideanGCD {
    public int gcd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return Math.abs(a);
    }
    
    // Recursive version
    public int gcdRecursive(int a, int b) {
        return (b == 0) ? Math.abs(a) : gcdRecursive(b, a % b);
    }
}`
            },
            {
                id: "extended-euclidean",
                name: "Extended Euclidean Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(log(min(a, b))) | Space: O(1)",
                description: "Find GCD along with coefficients x, y such that ax + by = gcd(a, b).",
                code: `public class ExtendedEuclidean {
    public int[] extendedGCD(int a, int b) {
        if (b == 0) return new int[]{a, 1, 0};
        int[] result = extendedGCD(b, a % b);
        int gcd = result[0], x1 = result[1], y1 = result[2];
        int x = y1;
        int y = x1 - (a / b) * y1;
        return new int[]{gcd, x, y};
    }
}`
            },
            {
                id: "sieve-eratosthenes",
                name: "Sieve of Eratosthenes",
                difficulty: "Easy",
                complexity: "Time: O(n log log n) | Space: O(n)",
                description: "Efficiently find all prime numbers up to n.",
                code: `import java.util.ArrayList;
import java.util.List;

public class SieveOfEratosthenes {
    public List<Integer> sieve(int n) {
        boolean[] isPrime = new boolean[n + 1];
        for (int i = 2; i <= n; i++) isPrime[i] = true;
        for (int p = 2; p * p <= n; p++) {
            if (isPrime[p]) {
                for (int i = p * p; i <= n; i += p) {
                    isPrime[i] = false;
                }
            }
        }
        List<Integer> primes = new ArrayList<>();
        for (int i = 2; i <= n; i++) {
            if (isPrime[i]) primes.add(i);
        }
        return primes;
    }
}`
            },
            {
                id: "fast-fourier-transform",
                name: "Fast Fourier Transform (FFT)",
                difficulty: "Hard",
                complexity: "Time: O(n log n) | Space: O(n)",
                description: "Efficiently compute the Discrete Fourier Transform using divide and conquer.",
                code: `import java.util.CompletableFuture;

public class FastFourierTransform {
    private static final double PI = Math.PI;
    
    public static Complex[] fft(Complex[] x) {
        int n = x.length;
        if (n == 1) return x;
        Complex[] even = new Complex[n / 2];
        Complex[] odd = new Complex[n / 2];
        for (int i = 0; i < n / 2; i++) {
            even[i] = x[2 * i];
            odd[i] = x[2 * i + 1];
        }
        Complex[] T = fft(odd);
        for (int k = 0; k < n / 2; k++) {
            double angle = -2 * PI * k / n;
            Complex w = new Complex(Math.cos(angle), Math.sin(angle));
            Complex t = T[k];
            Complex evenK = fft(even)[k];
            x[k] = evenK.plus(w.times(t));
            x[k + n / 2] = evenK.minus(w.times(t));
        }
        return x;
    }
    
    public static class Complex {
        private final double re, im;
        public Complex(double re, double im) { this.re = re; this.im = im; }
        public Complex plus(Complex b) { return new Complex(re + b.re, im + b.im); }
        public Complex minus(Complex b) { return new Complex(re - b.re, im - b.im); }
        public Complex times(Complex b) {
            return new Complex(re * b.re - im * b.im, re * b.im + im * b.re);
        }
    }
}`
            },
            {
                id: "newton-raphson",
                name: "Newton-Raphson Method",
                difficulty: "Medium",
                complexity: "Time: O(log n) iterations | Space: O(1)",
                description: "Find successively better approximations to the roots of a real-valued function.",
                code: `public class NewtonRaphson {
    public double sqrt(double n, double epsilon) {
        if (n < 0) return Double.NaN;
        if (n == 0) return 0;
        double x = n;
        while (Math.abs(x * x - n) > epsilon) {
            x = (x + n / x) / 2;
        }
        return x;
    }
    
    public double findRoot(double initialGuess, double epsilon) {
        double x = initialGuess;
        while (Math.abs(f(x)) > epsilon) {
            x = x - f(x) / fPrime(x);
        }
        return x;
    }
    
    private double f(double x) { return x * x - 2; }
    private double fPrime(double x) { return 2 * x; }
}`
            },
            {
                id: "karatsuba",
                name: "Karatsuba Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(n^1.585) | Space: O(log n)",
                description: "Fast multiplication algorithm using divide and conquer, faster than the naive O(n^2).",
                code: `public class Karatsuba {
    public long karatsuba(long x, long y) {
        if (x < 10 || y < 10) return x * y;
        int n = Math.max(Long.toString(x).length(), Long.toString(y).length());
        int m = n / 2;
        long high1 = x / (long) Math.pow(10, m);
        long low1 = x % (long) Math.pow(10, m);
        long high2 = y / (long) Math.pow(10, m);
        long low2 = y % (long) Math.pow(10, m);
        long z0 = karatsuba(low1, low2);
        long z1 = karatsuba(low1 + high1, low2 + high2);
        long z2 = karatsuba(high1, high2);
        return z2 * (long) Math.pow(10, 2 * m) + (z1 - z2 - z0) * (long) Math.pow(10, m) + z0;
    }
}`
            },
            {
                id: "strassen",
                name: "Strassen's Algorithm",
                difficulty: "Hard",
                complexity: "Time: O(n^2.81) | Space: O(n^2)",
                description: "Fast matrix multiplication using divide and conquer, better than naive O(n^3).",
                code: `public class Strassen {
    public int[][] multiply(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        if (n == 1) {
            C[0][0] = A[0][0] * B[0][0];
        } else {
            int newSize = n / 2;
            int[][] A11 = new int[newSize][newSize];
            int[][] A12 = new int[newSize][newSize];
            int[][] A21 = new int[newSize][newSize];
            int[][] A22 = new int[newSize][newSize];
            int[][] B11 = new int[newSize][newSize];
            int[][] B12 = new int[newSize][newSize];
            int[][] B21 = new int[newSize][newSize];
            int[][] B22 = new int[newSize][newSize];
            divide(A, A11, A12, A21, A22, newSize);
            divide(B, B11, B12, B21, B22, newSize);
            int[][] M1 = multiply(add(A11, A22), add(B11, B22));
            int[][] M2 = multiply(add(A21, A22), B11);
            int[][] M3 = multiply(A11, subtract(B12, B22));
            int[][] M4 = multiply(A22, subtract(B21, B11));
            int[][] M5 = multiply(add(A11, A12), B22);
            int[][] M6 = multiply(subtract(A21, A11), add(B11, B12));
            int[][] M7 = multiply(subtract(A12, A22), add(B21, B22));
            int[][] C11 = add(subtract(add(M1, M4), M5), M7);
            int[][] C12 = add(M3, M5);
            int[][] C21 = add(M2, M4);
            int[][] C22 = add(subtract(add(M1, M3), M2), M6);
            combine(C11, C12, C21, C22, C, newSize);
        }
        return C;
    }
    
    private int[][] add(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                C[i][j] = A[i][j] + B[i][j];
        return C;
    }
    
    private int[][] subtract(int[][] A, int[][] B) {
        int n = A.length;
        int[][] C = new int[n][n];
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                C[i][j] = A[i][j] - B[i][j];
        return C;
    }
    
    private void divide(int[][] P, int[][] P11, int[][] P12, int[][] P21, int[][] P22, int newSize) {
        for (int i = 0; i < newSize; i++)
            for (int j = 0; j < newSize; j++) {
                P11[i][j] = P[i][j];
                P12[i][j] = P[i][j + newSize];
                P21[i][j] = P[i + newSize][j];
                P22[i][j] = P[i + newSize][j + newSize];
            }
    }
    
    private void combine(int[][] C11, int[][] C12, int[][] C21, int[][] C22, int[][] C, int newSize) {
        for (int i = 0; i < newSize; i++)
            for (int j = 0; j < newSize; j++) {
                C[i][j] = C11[i][j];
                C[i][j + newSize] = C12[i][j];
                C[i + newSize][j] = C21[i][j];
                C[i + newSize][j + newSize] = C22[i][j];
            }
    }
}`
            },
            {
                id: "miller-rabin",
                name: "Miller-Rabin Primality Test",
                difficulty: "Hard",
                complexity: "Time: O(k log^3 n) | Space: O(1)",
                description: "Probabilistic algorithm to determine if a number is prime.",
                code: `public class MillerRabin {
    public boolean isPrime(long n, int k) {
        if (n < 2) return false;
        if (n == 2 || n == 3) return true;
        if (n % 2 == 0) return false;
        long d = n - 1;
        while (d % 2 == 0) d /= 2;
        for (int i = 0; i < k; i++) {
            long a = 2 + (long) (Math.random() * (n - 3));
            long x = modPow(a, d, n);
            if (x == 1 || x == n - 1) continue;
            boolean composite = true;
            long r = d;
            while (r != n - 1) {
                x = modPow(x, 2, n);
                r *= 2;
                if (x == 1) return false;
                if (x == n - 1) { composite = false; break; }
            }
            if (composite) return false;
        }
        return true;
    }
    
    private long modPow(long base, long exp, long mod) {
        long result = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) result = (result * base) % mod;
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }
}`
            },
            {
                id: "chinese-remainder",
                name: "Chinese Remainder Theorem",
                difficulty: "Hard",
                complexity: "Time: O(n log n) | Space: O(1)",
                description: "Solve a system of congruences with pairwise coprime moduli.",
                code: `public class ChineseRemainderTheorem {
    public int solve(int[] num, int[] rem) {
        int n = num.length;
        long product = 1;
        for (int i = 0; i < n; i++) product *= num[i];
        long result = 0;
        for (int i = 0; i < n; i++) {
            long pp = product / num[i];
            result += rem[i] * modInverse(pp, num[i]) * pp;
        }
        return (int) (result % product);
    }
    
    private int modInverse(int a, int m) {
        int m0 = m, t, q;
        int x0 = 0, x1 = 1;
        if (m == 1) return 0;
        while (a > 1) {
            q = a / m;
            t = m;
            m = a % m;
            a = t;
            t = x0;
            x0 = x1 - q * x0;
            x1 = t;
        }
        return (x1 < 0) ? x1 + m0 : x1;
    }
}`
            },
            {
                id: "gaussian-elimination",
                name: "Gaussian Elimination",
                difficulty: "Hard",
                complexity: "Time: O(n^3) | Space: O(n^2)",
                description: "Solve a system of linear equations using row operations.",
                code: `public class GaussianElimination {
    public double[] solve(double[][] A, double[] b) {
        int n = A.length;
        double[][] augmented = new double[n][n + 1];
        for (int i = 0; i < n; i++) {
            System.arraycopy(A[i], 0, augmented[i], 0, n);
            augmented[i][n] = b[i];
        }
        for (int i = 0; i < n; i++) {
            int maxRow = i;
            for (int k = i + 1; k < n; k++) {
                if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = k;
                }
            }
            double[] temp = augmented[i];
            augmented[i] = augmented[maxRow];
            augmented[maxRow] = temp;
            for (int k = i + 1; k < n; k++) {
                double factor = augmented[k][i] / augmented[i][i];
                for (int j = i; j <= n; j++) {
                    augmented[k][j] -= factor * augmented[i][j];
                }
            }
        }
        double[] x = new double[n];
        for (int i = n - 1; i >= 0; i--) {
            x[i] = augmented[i][n];
            for (int j = i + 1; j < n; j++) {
                x[i] -= augmented[i][j] * x[j];
            }
            x[i] /= augmented[i][i];
        }
        return x;
    }
}`
            },
            {
                id: "simpson-rule",
                name: "Simpson's Rule (Integration)",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Numerical integration using parabolic arcs to approximate the area under a curve.",
                code: `public class SimpsonRule {
    public double integrate(double a, double b, int n, Function f) {
        if (n % 2 != 0) n++;
        double h = (b - a) / n;
        double sum = f.evaluate(a) + f.evaluate(b);
        for (int i = 1; i < n; i += 2) {
            sum += 4 * f.evaluate(a + i * h);
        }
        for (int i = 2; i < n - 1; i += 2) {
            sum += 2 * f.evaluate(a + i * h);
        }
        return (h / 3) * sum;
    }
    
    interface Function {
        double evaluate(double x);
    }
}`
            },
            {
                id: "euclidean-distance",
                name: "Euclidean Distance",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Calculate the straight-line distance between two points in Euclidean space.",
                code: `public class EuclideanDistance {
    public double distance(double[] p1, double[] p2) {
        double sum = 0;
        for (int i = 0; i < p1.length; i++) {
            sum += Math.pow(p1[i] - p2[i], 2);
        }
        return Math.sqrt(sum);
    }
}`
            },
            {
                id: "manhattan-distance",
                name: "Manhattan Distance",
                difficulty: "Easy",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Calculate the distance between two points moving only along axes at right angles.",
                code: `public class ManhattanDistance {
    public double distance(double[] p1, double[] p2) {
        double sum = 0;
        for (int i = 0; i < p1.length; i++) {
            sum += Math.abs(p1[i] - p2[i]);
        }
        return sum;
    }
}`
            },
            {
                id: "monte-carlo",
                name: "Monte Carlo Method",
                difficulty: "Medium",
                complexity: "Time: O(n) | Space: O(1)",
                description: "Estimate values using random sampling, commonly used for integration and simulation.",
                code: `public class MonteCarlo {
    public double estimatePi(int iterations) {
        int insideCircle = 0;
        for (int i = 0; i < iterations; i++) {
            double x = Math.random();
            double y = Math.random();
            if (x * x + y * y <= 1) insideCircle++;
        }
        return 4.0 * insideCircle / iterations;
    }
    
    public double integrate(Function f, double a, double b, int iterations) {
        double sum = 0;
        for (int i = 0; i < iterations; i++) {
            double x = a + Math.random() * (b - a);
            sum += f.evaluate(x);
        }
        return (b - a) * sum / iterations;
    }
    
    interface Function {
        double evaluate(double x);
    }
}`
            },
            {
                id: "power-iteration",
                name: "Power Iteration",
                difficulty: "Hard",
                complexity: "Time: O(k * n^2) | Space: O(n)",
                description: "Find the dominant eigenvalue and eigenvector of a matrix through iteration.",
                code: `public class PowerIteration {
    public double[] powerIteration(double[][] A, int iterations, double tolerance) {
        int n = A.length;
        double[] b = new double[n];
        for (int i = 0; i < n; i++) b[i] = 1.0;
        double eigenvalue = 0;
        for (int iter = 0; iter < iterations; iter++) {
            double[] Ab = multiply(A, b);
            double norm = norm(Ab);
            double[] newB = normalize(Ab);
            double newEigenvalue = dot(b, Ab);
            if (Math.abs(newEigenvalue - eigenvalue) < tolerance) break;
            eigenvalue = newEigenvalue;
            b = newB;
        }
        double[] result = new double[n + 1];
        result[0] = eigenvalue;
        System.arraycopy(b, 0, result, 1, n);
        return result;
    }
    
    private double[] multiply(double[][] A, double[] v) {
        int n = A.length;
        double[] result = new double[n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                result[i] += A[i][j] * v[j];
            }
        }
        return result;
    }
    
    private double norm(double[] v) {
        double sum = 0;
        for (double val : v) sum += val * val;
        return Math.sqrt(sum);
    }
    
    private double[] normalize(double[] v) {
        double n = norm(v);
        double[] result = new double[v.length];
        for (int i = 0; i < v.length; i++) result[i] = v[i] / n;
        return result;
    }
    
    private double dot(double[] a, double[] b) {
        double sum = 0;
        for (int i = 0; i < a.length; i++) sum += a[i] * b[i];
        return sum;
    }
}`
            }
        ]
    },

    ml: {
        title: "MACHINE_LEARNING_ALGORITHMS",
        description: "15 ML & Statistical Algorithms",
        algorithms: [
            {
                id: "linear-regression",
                name: "Linear Regression (Gradient Descent)",
                difficulty: "Medium",
                complexity: "Time: O(n * iterations) | Space: O(n)",
                description: "Fit a linear model to predict continuous values using gradient descent optimization.",
                code: `public class LinearRegression {
    private double[] weights;
    
    public double[] train(double[][] X, double[] y, double learningRate, int iterations) {
        int n = X.length;
        int features = X[0].length;
        weights = new double[features];
        for (int iter = 0; iter < iterations; iter++) {
            double[] gradients = new double[features];
            for (int i = 0; i < n; i++) {
                double prediction = predict(X[i]);
                double error = prediction - y[i];
                for (int j = 0; j < features; j++) {
                    gradients[j] += error * X[i][j];
                }
            }
            for (int j = 0; j < features; j++) {
                weights[j] -= (learningRate / n) * gradients[j];
            }
        }
        return weights;
    }
    
    public double predict(double[] x) {
        double sum = 0;
        for (int i = 0; i < weights.length; i++) sum += weights[i] * x[i];
        return sum;
    }
}`
            },
            {
                id: "logistic-regression",
                name: "Logistic Regression",
                difficulty: "Medium",
                complexity: "Time: O(n * iterations) | Space: O(n)",
                description: "Binary classification algorithm using the sigmoid function to predict probabilities.",
                code: `public class LogisticRegression {
    private double[] weights;
    
    public double[] train(double[][] X, int[] y, double learningRate, int iterations) {
        int n = X.length;
        int features = X[0].length;
        weights = new double[features];
        for (int iter = 0; iter < iterations; iter++) {
            double[] gradients = new double[features];
            for (int i = 0; i < n; i++) {
                double prediction = sigmoid(predict(X[i]));
                double error = prediction - y[i];
                for (int j = 0; j < features; j++) {
                    gradients[j] += error * X[i][j];
                }
            }
            for (int j = 0; j < features; j++) {
                weights[j] -= (learningRate / n) * gradients[j];
            }
        }
        return weights;
    }
    
    private double predict(double[] x) {
        double sum = 0;
        for (int i = 0; i < weights.length; i++) sum += weights[i] * x[i];
        return sum;
    }
    
    private double sigmoid(double z) {
        return 1.0 / (1.0 + Math.exp(-z));
    }
    
    public int classify(double[] x) {
        return sigmoid(predict(x)) >= 0.5 ? 1 : 0;
    }
}`
            },
            {
                id: "knn",
                name: "K-Nearest Neighbors (KNN)",
                difficulty: "Easy",
                complexity: "Time: O(n * d) | Space: O(n)",
                description: "Classify a data point based on the majority class of its k nearest neighbors.",
                code: `import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

public class KNN {
    private double[][] X;
    private int[] y;
    private int k;
    
    public KNN(double[][] X, int[] y, int k) {
        this.X = X;
        this.y = y;
        this.k = k;
    }
    
    public int predict(double[] x) {
        PriorityQueue<double[]> pq = new PriorityQueue<>((a, b) -> Double.compare(b[1], a[1]));
        for (int i = 0; i < X.length; i++) {
            double dist = euclideanDistance(x, X[i]);
            pq.offer(new double[]{i, dist});
            if (pq.size() > k) pq.poll();
        }
        Map<Integer, Integer> votes = new HashMap<>();
        int maxVotes = 0, predictedClass = -1;
        while (!pq.isEmpty()) {
            int idx = (int) pq.poll()[0];
            votes.put(y[idx], votes.getOrDefault(y[idx], 0) + 1);
            if (votes.get(y[idx]) > maxVotes) {
                maxVotes = votes.get(y[idx]);
                predictedClass = y[idx];
            }
        }
        return predictedClass;
    }
    
    private double euclideanDistance(double[] a, double[] b) {
        double sum = 0;
        for (int i = 0; i < a.length; i++) sum += Math.pow(a[i] - b[i], 2);
        return Math.sqrt(sum);
    }
}`
            },
            {
                id: "k-means",
                name: "K-Means Clustering",
                difficulty: "Medium",
                complexity: "Time: O(n * k * iterations) | Space: O(n)",
                description: "Partition n data points into k clusters by minimizing the within-cluster variance.",
                code: `import java.util.Arrays;
import java.util.Random;

public class KMeans {
    public int[] fit(double[][] X, int k, int maxIterations) {
        int n = X.length;
        int d = X[0].length;
        double[][] centroids = initializeCentroids(X, k);
        int[] clusters = new int[n];
        for (int iter = 0; iter < maxIterations; iter++) {
            for (int i = 0; i < n; i++) {
                clusters[i] = closestCentroid(X[i], centroids);
            }
            double[][] newCentroids = new double[k][d];
            int[] counts = new int[k];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < d; j++) {
                    newCentroids[clusters[i]][j] += X[i][j];
                }
                counts[clusters[i]]++;
            }
            boolean converged = true;
            for (int c = 0; c < k; c++) {
                if (counts[c] == 0) continue;
                for (int j = 0; j < d; j++) {
                    newCentroids[c][j] /= counts[c];
                    if (Math.abs(newCentroids[c][j] - centroids[c][j]) > 1e-6) converged = false;
                }
            }
            centroids = newCentroids;
            if (converged) break;
        }
        return clusters;
    }
    
    private double[][] initializeCentroids(double[][] X, int k) {
        double[][] centroids = new double[k][X[0].length];
        Random rand = new Random();
        for (int i = 0; i < k; i++) {
            centroids[i] = X[rand.nextInt(X.length)];
        }
        return centroids;
    }
    
    private int closestCentroid(double[] x, double[][] centroids) {
        int closest = 0;
        double minDist = Double.MAX_VALUE;
        for (int i = 0; i < centroids.length; i++) {
            double dist = distance(x, centroids[i]);
            if (dist < minDist) { minDist = dist; closest = i; }
        }
        return closest;
    }
    
    private double distance(double[] a, double[] b) {
        double sum = 0;
        for (int i = 0; i < a.length; i++) sum += Math.pow(a[i] - b[i], 2);
        return Math.sqrt(sum);
    }
}`
            },
            {
                id: "svm",
                name: "Support Vector Machines (SVM)",
                difficulty: "Hard",
                complexity: "Time: O(n^2 * d) | Space: O(n^2)",
                description: "Find the optimal hyperplane that maximally separates classes in feature space.",
                code: `public class SVM {
    private double[] alpha;
    private double bias;
    private double C;
    private double[][] X;
    private int[] y;
    
    public SVM(double C) { this.C = C; }
    
    public void train(double[][] X, int[] y, int iterations) {
        int n = X.length;
        this.X = X;
        this.y = y;
        this.alpha = new double[n];
        this.bias = 0;
        for (int iter = 0; iter < iterations; iter++) {
            for (int i = 0; i < n; i++) {
                double Ei = predictRaw(X[i]) - y[i];
                if ((y[i] * Ei < -0.001 && alpha[i] < C) || (y[i] * Ei > 0.001 && alpha[i] > 0)) {
                    int j = (int) (Math.random() * n);
                    if (i == j) continue;
                    double Ej = predictRaw(X[j]) - y[j];
                    double alphaIold = alpha[i];
                    double alphaJold = alpha[j];
                    double L, H;
                    if (y[i] != y[j]) {
                        L = Math.max(0, alpha[j] - alpha[i]);
                        H = Math.min(C, C + alpha[j] - alpha[i]);
                    } else {
                        L = Math.max(0, alpha[i] + alpha[j] - C);
                        H = Math.min(C, alpha[i] + alpha[j]);
                    }
                    if (L == H) continue;
                    double eta = 2 * kernel(X[i], X[j]) - kernel(X[i], X[i]) - kernel(X[j], X[j]);
                    if (eta >= 0) continue;
                    alpha[j] -= y[j] * (Ei - Ej) / eta;
                    alpha[j] = Math.max(L, Math.min(H, alpha[j]));
                    if (Math.abs(alpha[j] - alphaJold) < 1e-5) continue;
                    alpha[i] += y[i] * y[j] * (alphaJold - alpha[j]);
                    double b1 = bias - Ei - y[i] * (alpha[i] - alphaIold) * kernel(X[i], X[i])
                               - y[j] * (alpha[j] - alphaJold) * kernel(X[i], X[j]);
                    double b2 = bias - Ej - y[i] * (alpha[i] - alphaIold) * kernel(X[i], X[j])
                               - y[j] * (alpha[j] - alphaJold) * kernel(X[j], X[j]);
                    bias = (alpha[i] > 0 && alpha[i] < C) ? b1 : (alpha[j] > 0 && alpha[j] < C) ? b2 : (b1 + b2) / 2;
                }
            }
        }
    }
    
    private double predictRaw(double[] x) {
        double sum = bias;
        for (int i = 0; i < X.length; i++) {
            if (alpha[i] > 0) sum += alpha[i] * y[i] * kernel(X[i], x);
        }
        return sum;
    }
    
    public int predict(double[] x) {
        return predictRaw(x) >= 0 ? 1 : -1;
    }
    
    private double kernel(double[] x1, double[] x2) {
        double sum = 0;
        for (int i = 0; i < x1.length; i++) sum += x1[i] * x2[i];
        return sum;
    }
}`
            },
            {
                id: "decision-tree",
                name: "Decision Tree (ID3/C4.5)",
                difficulty: "Medium",
                complexity: "Time: O(n * d * log n) | Space: O(log n)",
                description: "Build a tree-based classifier using information gain or gain ratio for splitting.",
                code: `import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class DecisionTree {
    class Node {
        int featureIdx;
        double threshold;
        Node left, right;
        int prediction;
        boolean isLeaf;
    }
    
    private Node root;
    
    public void train(double[][] X, int[] y, int maxDepth) {
        root = buildTree(X, y, 0, maxDepth);
    }
    
    private Node buildTree(double[][] X, int[] y, int depth, int maxDepth) {
        Node node = new Node();
        if (depth >= maxDepth || allSame(y)) {
            node.isLeaf = true;
            node.prediction = majorityClass(y);
            return node;
        }
        int bestFeature = -1;
        double bestThreshold = 0;
        double bestGain = -1;
        int n = X.length;
        int features = X[0].length;
        double parentEntropy = entropy(y);
        for (int f = 0; f < features; f++) {
            Set<Double> thresholds = getThresholds(X, f);
            for (double threshold : thresholds) {
                int[] leftY = new int[n], rightY = new int[n];
                int leftCount = 0, rightCount = 0;
                for (int i = 0; i < n; i++) {
                    if (X[i][f] <= threshold) leftY[leftCount++] = y[i];
                    else rightY[rightCount++] = y[i];
                }
                if (leftCount == 0 || rightCount == 0) continue;
                int[] leftYTrimmed = new int[leftCount];
                int[] rightYTrimmed = new int[rightCount];
                System.arraycopy(leftY, 0, leftYTrimmed, 0, leftCount);
                System.arraycopy(rightY, 0, rightYTrimmed, 0, rightCount);
                double gain = parentEntropy - ((leftCount * entropy(leftYTrimmed) + rightCount * entropy(rightYTrimmed)) / n);
                if (gain > bestGain) {
                    bestGain = gain;
                    bestFeature = f;
                    bestThreshold = threshold;
                }
            }
        }
        if (bestGain <= 0) {
            node.isLeaf = true;
            node.prediction = majorityClass(y);
            return node;
        }
        node.featureIdx = bestFeature;
        node.threshold = bestThreshold;
        int leftCount = 0, rightCount = 0;
        for (int val : y) { if (leftCount < y.length) leftCount++; }
        return node;
    }
    
    private double entropy(int[] y) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int val : y) counts.put(val, counts.getOrDefault(val, 0) + 1);
        double entropy = 0;
        for (int count : counts.values()) {
            double p = (double) count / y.length;
            entropy -= p * Math.log(p) / Math.log(2);
        }
        return entropy;
    }
    
    private int majorityClass(int[] y) {
        Map<Integer, Integer> counts = new HashMap<>();
        for (int val : y) counts.put(val, counts.getOrDefault(val, 0) + 1);
        int maxCount = 0, result = -1;
        for (Map.Entry<Integer, Integer> entry : counts.entrySet()) {
            if (entry.getValue() > maxCount) { maxCount = entry.getValue(); result = entry.getKey(); }
        }
        return result;
    }
    
    private boolean allSame(int[] y) {
        for (int val : y) if (val != y[0]) return false;
        return true;
    }
    
    private Set<Double> getThresholds(double[][] X, int f) {
        Set<Double> thresholds = new HashSet<>();
        for (double[] row : X) thresholds.add(row[f]);
        return thresholds;
    }
    
    public int predict(double[] x) {
        Node curr = root;
        while (!curr.isLeaf) {
            if (x[curr.featureIdx] <= curr.threshold) curr = curr.left;
            else curr = curr.right;
        }
        return curr.prediction;
    }
}`
            },
            {
                id: "random-forest",
                name: "Random Forest",
                difficulty: "Hard",
                complexity: "Time: O(n_trees * n * log n) | Space: O(n_trees * n)",
                description: "Ensemble of decision trees using bagging and random feature selection.",
                code: `import java.util.Random;

public class RandomForest {
    private DecisionTree[] trees;
    private int nTrees;
    private Random rand;
    
    public RandomForest(int nTrees) {
        this.nTrees = nTrees;
        this.trees = new DecisionTree[nTrees];
        this.rand = new Random();
    }
    
    public void train(double[][] X, int[] y, int maxDepth) {
        int n = X.length;
        for (int t = 0; t < nTrees; t++) {
            double[][] bootstrapX = bootstrapSample(X, n);
            int[] bootstrapY = bootstrapSample(y, n);
            trees[t] = new DecisionTree();
            trees[t].train(bootstrapX, bootstrapY, maxDepth);
        }
    }
    
    public int predict(double[] x) {
        int[] votes = new int[10];
        for (DecisionTree tree : trees) {
            votes[tree.predict(x)]++;
        }
        int maxVotes = 0, prediction = -1;
        for (int i = 0; i < votes.length; i++) {
            if (votes[i] > maxVotes) { maxVotes = votes[i]; prediction = i; }
        }
        return prediction;
    }
    
    private double[][] bootstrapSample(double[][] X, int n) {
        double[][] sample = new double[n][X[0].length];
        for (int i = 0; i < n; i++) sample[i] = X[rand.nextInt(n)];
        return sample;
    }
    
    private int[] bootstrapSample(int[] y, int n) {
        int[] sample = new int[n];
        for (int i = 0; i < n; i++) sample[i] = y[rand.nextInt(n)];
        return sample;
    }
}`
            },
            {
                id: "backpropagation",
                name: "Backpropagation (Neural Networks)",
                difficulty: "Hard",
                complexity: "Time: O(n * layers * neurons) | Space: O(layers * neurons)",
                description: "Train a neural network by propagating errors backward through the layers.",
                code: `import java.util.Random;

public class Backpropagation {
    private double[][] weights;
    private double[] biases;
    private int[] layerSizes;
    private double learningRate;
    private Random rand;
    
    public Backpropagation(int[] layerSizes, double learningRate) {
        this.layerSizes = layerSizes;
        this.learningRate = learningRate;
        this.rand = new Random();
        initializeWeights();
    }
    
    private void initializeWeights() {
        weights = new double[layerSizes.length - 1][];
        biases = new double[layerSizes.length - 1];
        for (int i = 0; i < layerSizes.length - 1; i++) {
            weights[i] = new double[layerSizes[i] * layerSizes[i + 1]];
            biases[i] = rand.nextGaussian() * 0.01;
            for (int j = 0; j < weights[i].length; j++) {
                weights[i][j] = rand.nextGaussian() * 0.01;
            }
        }
    }
    
    public void train(double[][] X, double[][] y, int epochs) {
        for (int epoch = 0; epoch < epochs; epoch++) {
            for (int i = 0; i < X.length; i++) {
                double[][] activations = forward(X[i]);
                backward(X[i], y[i], activations);
            }
        }
    }
    
    private double[][] forward(double[] input) {
        double[][] activations = new double[layerSizes.length][];
        activations[0] = input.clone();
        for (int l = 1; l < layerSizes.length; l++) {
            activations[l] = new double[layerSizes[l]];
            for (int j = 0; j < layerSizes[l]; j++) {
                double sum = biases[l - 1];
                for (int i = 0; i < layerSizes[l - 1]; i++) {
                    sum += weights[l - 1][i * layerSizes[l] + j] * activations[l - 1][i];
                }
                activations[l][j] = sigmoid(sum);
            }
        }
        return activations;
    }
    
    private void backward(double[] input, double[] target, double[][] activations) {
        int L = layerSizes.length - 1;
        double[][] deltas = new double[L + 1][];
        deltas[L] = new double[layerSizes[L]];
        for (int j = 0; j < layerSizes[L]; j++) {
            double error = activations[L][j] - target[j];
            deltas[L][j] = error * sigmoidDerivative(activations[L][j]);
        }
        for (int l = L - 1; l >= 1; l--) {
            deltas[l] = new double[layerSizes[l]];
            for (int j = 0; j < layerSizes[l]; j++) {
                double error = 0;
                for (int k = 0; k < layerSizes[l + 1]; k++) {
                    error += weights[l][j * layerSizes[l + 1] + k] * deltas[l + 1][k];
                }
                deltas[l][j] = error * sigmoidDerivative(activations[l][j]);
            }
        }
        for (int l = 0; l < L; l++) {
            for (int j = 0; j < layerSizes[l + 1]; j++) {
                for (int i = 0; i < layerSizes[l]; i++) {
                    weights[l][i * layerSizes[l + 1] + j] -= learningRate * deltas[l + 1][j] * activations[l][i];
                }
                biases[l] -= learningRate * deltas[l + 1][j];
            }
        }
    }
    
    public double[] predict(double[] input) {
        double[][] activations = forward(input);
        return activations[activations.length - 1];
    }
    
    private double sigmoid(double x) { return 1.0 / (1.0 + Math.exp(-x)); }
    private double sigmoidDerivative(double x) { return x * (1 - x); }
}`
            },
            {
                id: "naive-bayes",
                name: "Naive Bayes Classifier",
                difficulty: "Easy",
                complexity: "Time: O(n * d) | Space: O(d)",
                description: "Probabilistic classifier based on Bayes' theorem with feature independence assumption.",
                code: `import java.util.HashMap;
import java.util.Map;

public class NaiveBayes {
    private Map<Integer, Integer> classCounts;
    private Map<Integer, Map<Integer, Double>> featureMeans;
    private Map<Integer, Map<Integer, Double>> featureVariances;
    private int totalSamples;
    
    public NaiveBayes() {
        classCounts = new HashMap<>();
        featureMeans = new HashMap<>();
        featureVariances = new HashMap<>();
    }
    
    public void train(double[][] X, int[] y) {
        totalSamples = X.length;
        int features = X[0].length;
        for (int i = 0; i < X.length; i++) {
            int cls = y[i];
            classCounts.put(cls, classCounts.getOrDefault(cls, 0) + 1);
            for (int f = 0; f < features; f++) {
                featureMeans.computeIfAbsent(cls, k -> new HashMap<>());
                featureVariances.computeIfAbsent(cls, k -> new HashMap<>());
                featureMeans.get(cls).put(f, featureMeans.get(cls).getOrDefault(f, 0.0) + X[i][f]);
                featureVariances.get(cls).put(f, featureVariances.get(cls).getOrDefault(f, 0.0) + X[i][f] * X[i][f]);
            }
        }
        for (Map.Entry<Integer, Map<Integer, Double>> entry : featureMeans.entrySet()) {
            int cls = entry.getKey();
            int count = classCounts.get(cls);
            for (int f = 0; f < features; f++) {
                double mean = featureMeans.get(cls).get(f) / count;
                double variance = featureVariances.get(cls).get(f) / count - mean * mean;
                featureMeans.get(cls).put(f, mean);
                featureVariances.get(cls).put(f, Math.max(variance, 1e-9));
            }
        }
    }
    
    public int predict(double[] x) {
        int bestClass = -1;
        double maxLogProb = Double.NEGATIVE_INFINITY;
        for (int cls : classCounts.keySet()) {
            double logProb = Math.log((double) classCounts.get(cls) / totalSamples);
            for (int f = 0; f < x.length; f++) {
                double mean = featureMeans.get(cls).get(f);
                double var = featureVariances.get(cls).get(f);
                logProb -= 0.5 * Math.log(2 * Math.PI * var) + 0.5 * Math.pow(x[f] - mean, 2) / var;
            }
            if (logProb > maxLogProb) { maxLogProb = logProb; bestClass = cls; }
        }
        return bestClass;
    }
}`
            },
            {
                id: "pca",
                name: "Principal Component Analysis (PCA)",
                difficulty: "Hard",
                complexity: "Time: O(n * d^2 + d^3) | Space: O(d^2)",
                description: "Dimensionality reduction by projecting data onto principal components.",
                code: `public class PCA {
    private double[][] components;
    private double[] mean;
    
    public void fit(double[][] X, int nComponents) {
        int n = X.length;
        int d = X[0].length;
        mean = new double[d];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < d; j++) mean[j] += X[i][j];
        }
        for (int j = 0; j < d; j++) mean[j] /= n;
        double[][] centered = new double[n][d];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < d; j++) centered[i][j] = X[i][j] - mean[j];
        }
        double[][] cov = covarianceMatrix(centered, n, d);
        EigenDeccomposition eigen = new EigenDeccomposition(cov);
        components = new double[nComponents][d];
        double[] eigenvalues = eigen.getRealEigenvalues();
        Integer[] indices = new Integer[d];
        for (int i = 0; i < d; i++) indices[i] = i;
        java.util.Arrays.sort(indices, (a, b) -> Double.compare(eigenvalues[b], eigenvalues[a]));
        for (int i = 0; i < nComponents; i++) {
            int idx = indices[i];
            for (int j = 0; j < d; j++) components[i][j] = eigen.getEigenvector(idx)[j];
        }
    }
    
    private double[][] covarianceMatrix(double[][] X, int n, int d) {
        double[][] cov = new double[d][d];
        for (int i = 0; i < d; i++) {
            for (int j = 0; j < d; j++) {
                for (int k = 0; k < n; k++) {
                    cov[i][j] += X[k][i] * X[k][j];
                }
                cov[i][j] /= (n - 1);
            }
        }
        return cov;
    }
    
    public double[][] transform(double[][] X) {
        double[][] transformed = new double[X.length][components.length];
        for (int i = 0; i < X.length; i++) {
            for (int j = 0; j < components.length; j++) {
                for (int k = 0; k < X[0].length; k++) {
                    transformed[i][j] += (X[i][k] - mean[k]) * components[j][k];
                }
            }
        }
        return transformed;
    }
    
    static class EigenDeccomposition {
        private double[][] V;
        private double[] d;
        
        EigenDeccomposition(double[][] A) {
            int n = A.length;
            d = new double[n];
            V = new double[n][n];
            for (int i = 0; i < n; i++) V[i][i] = 1;
            double[][] B = new double[n][n];
            for (int i = 0; i < n; i++) System.arraycopy(A[i], 0, B[i], 0, n);
            int iterations = 100;
            for (int iter = 0; iter < iterations; iter++) {
                int p = 0, q = 1;
                for (int i = 0; i < n; i++) {
                    for (int j = i + 1; j < n; j++) {
                        if (Math.abs(B[i][j]) > Math.abs(B[p][q])) { p = i; q = j; }
                    }
                }
                if (Math.abs(B[p][q]) < 1e-10) break;
                double theta = 0.5 * Math.atan2(2 * B[p][q], B[p][p] - B[q][q]);
                double c = Math.cos(theta), s = Math.sin(theta);
                double[][] G = new double[n][n];
                for (int i = 0; i < n; i++) G[i][i] = 1;
                G[p][p] = c; G[q][q] = c; G[p][q] = -s; G[q][p] = s;
                B = multiply(transpose(G), multiply(B, G));
                V = multiply(V, G);
            }
            for (int i = 0; i < n; i++) d[i] = B[i][i];
        }
        
        double[] getRealEigenvalues() { return d; }
        double[] getEigenvector(int i) { return V[i]; }
        
        private double[][] multiply(double[][] A, double[][] B) {
            int n = A.length;
            double[][] C = new double[n][n];
            for (int i = 0; i < n; i++) {
                for (int k = 0; k < n; k++) {
                    for (int j = 0; j < n; j++) C[i][j] += A[i][k] * B[k][j];
                }
            }
            return C;
        }
        
        private double[][] transpose(double[][] A) {
            int n = A.length;
            double[][] T = new double[n][n];
            for (int i = 0; i < n; i++)
                for (int j = 0; j < n; j++) T[j][i] = A[i][j];
            return T;
        }
    }
}`
            },
            {
                id: "pagerank",
                name: "PageRank Algorithm",
                difficulty: "Medium",
                complexity: "Time: O(k * (V + E)) | Space: O(V)",
                description: "Rank web pages based on the link structure, the foundation of Google's search algorithm.",
                code: `public class PageRank {
    public double[] pageRank(int[][] adj, int V, double damping, int iterations) {
        double[] rank = new double[V];
        for (int i = 0; i < V; i++) rank[i] = 1.0 / V;
        int[] outDegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (adj[i][j] == 1) outDegree[i]++;
            }
        }
        for (int iter = 0; iter < iterations; iter++) {
            double[] newRank = new double[V];
            for (int j = 0; j < V; j++) {
                for (int i = 0; i < V; i++) {
                    if (adj[i][j] == 1 && outDegree[i] > 0) {
                        newRank[j] += rank[i] / outDegree[i];
                    }
                }
                newRank[j] = (1 - damping) / V + damping * newRank[j];
            }
            rank = newRank;
        }
        return rank;
    }
}`
            },
            {
                id: "apriori",
                name: "Apriori Algorithm (Data Mining)",
                difficulty: "Medium",
                complexity: "Time: O(2^d * n) | Space: O(2^d)",
                description: "Find frequent itemsets in transaction data using the downward closure property.",
                code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Apriori {
    public List<Set<String>> apriori(List<Set<String>> transactions, double minSupport) {
        Map<String, Integer> itemCounts = countItems(transactions);
        List<Set<String>> frequentItemsets = new ArrayList<>();
        List<Set<String>> L = getFrequentItems(itemCounts, transactions.size(), minSupport);
        frequentItemsets.addAll(L);
        int k = 2;
        while (!L.isEmpty()) {
            List<Set<String>> C = generateCandidates(L, k);
            Map<Set<String>, Integer> counts = countCandidates(transactions, C);
            L = getFrequentCandidates(counts, transactions.size(), minSupport);
            frequentItemsets.addAll(L);
            k++;
        }
        return frequentItemsets;
    }
    
    private List<Set<String>> generateCandidates(List<Set<String>> L, int k) {
        List<Set<String>> candidates = new ArrayList<>();
        for (int i = 0; i < L.size(); i++) {
            for (int j = i + 1; j < L.size(); j++) {
                Set<String> union = new HashSet<>(L.get(i));
                union.addAll(L.get(j));
                if (union.size() == k && !candidates.contains(union)) candidates.add(union);
            }
        }
        return candidates;
    }
    
    private Map<Set<String>, Integer> countCandidates(List<Set<String>> transactions, List<Set<String>> candidates) {
        Map<Set<String>, Integer> counts = new HashMap<>();
        for (Set<String> transaction : transactions) {
            for (Set<String> candidate : candidates) {
                if (transaction.containsAll(candidate)) {
                    counts.put(candidate, counts.getOrDefault(candidate, 0) + 1);
                }
            }
        }
        return counts;
    }
    
    private List<Set<String>> getFrequentCandidates(Map<Set<String>, Integer> counts, int total, double minSupport) {
        List<Set<String>> frequent = new ArrayList<>();
        for (Map.Entry<Set<String>, Integer> entry : counts.entrySet()) {
            if ((double) entry.getValue() / total >= minSupport) frequent.add(entry.getKey());
        }
        return frequent;
    }
    
    private Map<String, Integer> countItems(List<Set<String>> transactions) {
        Map<String, Integer> counts = new HashMap<>();
        for (Set<String> transaction : transactions) {
            for (String item : transaction) counts.put(item, counts.getOrDefault(item, 0) + 1);
        }
        return counts;
    }
    
    private List<Set<String>> getFrequentItems(Map<String, Integer> counts, int total, double minSupport) {
        List<Set<String>> frequent = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : counts.entrySet()) {
            if ((double) entry.getValue() / total >= minSupport) {
                Set<String> itemset = new HashSet<>();
                itemset.add(entry.getKey());
                frequent.add(itemset);
            }
        }
        return frequent;
    }
}`
            },
            {
                id: "adaboost",
                name: "AdaBoost",
                difficulty: "Hard",
                complexity: "Time: O(T * n * d) | Space: O(n)",
                description: "Ensemble method that combines weak learners into a strong classifier by focusing on misclassified examples.",
                code: `public class AdaBoost {
    private double[] alpha;
    private WeakLearner[] learners;
    private int T;
    
    interface WeakLearner {
        void train(double[][] X, int[] y, double[] weights);
        int predict(double[] x);
    }
    
    public AdaBoost(int T) { this.T = T; }
    
    public void train(double[][] X, int[] y, WeakLearner weakLearner) {
        int n = X.length;
        alpha = new double[T];
        learners = new WeakLearner[T];
        double[] weights = new double[n];
        for (int i = 0; i < n; i++) weights[i] = 1.0 / n;
        for (int t = 0; t < T; t++) {
            WeakLearner learner = instantiateLearner(weakLearner);
            learner.train(X, y, weights);
            learners[t] = learner;
            double error = 0;
            for (int i = 0; i < n; i++) {
                if (learner.predict(X[i]) != y[i]) error += weights[i];
            }
            if (error == 0) error = 1e-10;
            alpha[t] = 0.5 * Math.log((1 - error) / error);
            double Z = 0;
            for (int i = 0; i < n; i++) {
                int prediction = learner.predict(X[i]);
                weights[i] *= Math.exp(-alpha[t] * y[i] * prediction);
                Z += weights[i];
            }
            for (int i = 0; i < n; i++) weights[i] /= Z;
        }
    }
    
    public int predict(double[] x) {
        double sum = 0;
        for (int t = 0; t < T; t++) {
            sum += alpha[t] * learners[t].predict(x);
        }
        return (sum >= 0) ? 1 : -1;
    }
    
    private WeakLearner instantiateLearner(WeakLearner prototype) {
        try { return prototype.getClass().newInstance(); }
        catch (Exception e) { throw new RuntimeException(e); }
    }
}`
            },
            {
                id: "q-learning",
                name: "Q-Learning (Reinforcement Learning)",
                difficulty: "Hard",
                complexity: "Time: O(episodes * steps) | Space: O(states * actions)",
                description: "Model-free reinforcement learning that learns the value of state-action pairs.",
                code: `import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class QLearning {
    private Map<String, Map<Integer, Double>> qTable;
    private double learningRate;
    private double discountFactor;
    private double epsilon;
    private Random rand;
    
    public QLearning(double learningRate, double discountFactor, double epsilon) {
        this.learningRate = learningRate;
        this.discountFactor = discountFactor;
        this.epsilon = epsilon;
        this.qTable = new HashMap<>();
        this.rand = new Random();
    }
    
    public int chooseAction(String state, int nActions) {
        if (rand.nextDouble() < epsilon) return rand.nextInt(nActions);
        qTable.putIfAbsent(state, new HashMap<>());
        Map<Integer, Double> actions = qTable.get(state);
        int bestAction = 0;
        double maxQ = Double.NEGATIVE_INFINITY;
        for (Map.Entry<Integer, Double> entry : actions.entrySet()) {
            if (entry.getValue() > maxQ) { maxQ = entry.getValue(); bestAction = entry.getKey(); }
        }
        return bestAction;
    }
    
    public void learn(String state, int action, double reward, String nextState, int nActions) {
        qTable.putIfAbsent(state, new HashMap<>());
        qTable.putIfAbsent(nextState, new HashMap<>());
        double currentQ = qTable.get(state).getOrDefault(action, 0.0);
        double maxNextQ = Double.NEGATIVE_INFINITY;
        for (int a = 0; a < nActions; a++) {
            maxNextQ = Math.max(maxNextQ, qTable.get(nextState).getOrDefault(a, 0.0));
        }
        double newQ = currentQ + learningRate * (reward + discountFactor * maxNextQ - currentQ);
        qTable.get(state).put(action, newQ);
    }
    
    public Map<String, Map<Integer, Double>> getQTable() { return qTable; }
}`
            },
            {
                id: "em-algorithm",
                name: "Expectation-Maximization (EM)",
                difficulty: "Hard",
                complexity: "Time: O(n * k * iterations) | Space: O(n * k)",
                description: "Iterative method to find maximum likelihood estimates when data has missing values or latent variables.",
                code: `public class EMAlgorithm {
    private double[] means;
    private double[] variances;
    private double[] weights;
    private int k;
    
    public void fit(double[] data, int k, int iterations) {
        this.k = k;
        means = new double[k];
        variances = new double[k];
        weights = new double[k];
        initialize(data);
        int n = data.length;
        double[][] responsibilities = new double[n][k];
        for (int iter = 0; iter < iterations; iter++) {
            // E-step
            for (int i = 0; i < n; i++) {
                double sum = 0;
                for (int j = 0; j < k; j++) {
                    responsibilities[i][j] = weights[j] * gaussian(data[i], means[j], variances[j]);
                    sum += responsibilities[i][j];
                }
                for (int j = 0; j < k; j++) responsibilities[i][j] /= sum;
            }
            // M-step
            for (int j = 0; j < k; j++) {
                double Nj = 0;
                for (int i = 0; i < n; i++) Nj += responsibilities[i][j];
                means[j] = 0;
                for (int i = 0; i < n; i++) means[j] += responsibilities[i][j] * data[i];
                means[j] /= Nj;
                variances[j] = 0;
                for (int i = 0; i < n; i++) variances[j] += responsibilities[i][j] * Math.pow(data[i] - means[j], 2);
                variances[j] /= Nj;
                weights[j] = Nj / n;
            }
        }
    }
    
    private double gaussian(double x, double mean, double variance) {
        return Math.exp(-Math.pow(x - mean, 2) / (2 * variance)) / Math.sqrt(2 * Math.PI * variance);
    }
    
    private void initialize(double[] data) {
        int n = data.length;
        for (int j = 0; j < k; j++) {
            means[j] = data[(int) (Math.random() * n)];
            variances[j] = 1.0;
            weights[j] = 1.0 / k;
        }
    }
    
    public int predict(double x) {
        int best = 0;
        double maxProb = 0;
        for (int j = 0; j < k; j++) {
            double prob = weights[j] * gaussian(x, means[j], variances[j]);
            if (prob > maxProb) { maxProb = prob; best = j; }
        }
        return best;
    }
}`
            }
        ]
    }
};
