/**
 * ALGO_TWINS // Core Logic Engine
 * 100% Vanilla JavaScript // DOM API Mastery
 * Follows "The Neon-Grid Architect Manifesto"
 */

"use strict";

const ALGORITHMS = [
    {
        id: "factorial",
        name: "Factorial Calculation",
        path: "math/factorial.js",
        iterative: `function factorialIterative(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}`,
        recursive: `function factorialRecursive(n) {
    if (n <= 1) return 1;
    return n * factorialRecursive(n - 1);
}`
    },
    {
        id: "fibonacci",
        name: "Fibonacci Sequence",
        path: "math/fibonacci.js",
        iterative: `function fibonacciIterative(n) {
    if (n <= 1) return n;
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`,
        recursive: `function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}`
    },
    {
        id: "binary-search",
        name: "Binary Search",
        path: "search/binary_search.js",
        iterative: `function binarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
        recursive: `function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
    return binarySearchRecursive(arr, target, left, mid - 1);
}`
    },
    {
        id: "gcd",
        name: "Euclidean GCD",
        path: "math/gcd.js",
        iterative: `function gcdIterative(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}`,
        recursive: `function gcdRecursive(a, b) {
    if (b === 0) return a;
    return gcdRecursive(b, a % b);
}`
    },
    {
        id: "power",
        name: "Power Calculation (x^n)",
        path: "math/power.js",
        iterative: `function powerIterative(x, n) {
    let result = 1;
    for (let i = 0; i < n; i++) {
        result *= x;
    }
    return result;
}`,
        recursive: `function powerRecursive(x, n) {
    if (n === 0) return 1;
    return x * powerRecursive(x, n - 1);
}`
    },
    {
        id: "array-sum",
        name: "Array Summation",
        path: "array/sum.js",
        iterative: `function sumIterative(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}`,
        recursive: `function sumRecursive(arr, n = arr.length) {
    if (n <= 0) return 0;
    return sumRecursive(arr, n - 1) + arr[n - 1];
}`
    },
    {
        id: "reverse-string",
        name: "String Reversal",
        path: "string/reverse.js",
        iterative: `function reverseIterative(str) {
    let reversed = "";
    for (let i = str.length - 1; i >= 0; i--) {
        reversed += str[i];
    }
    return reversed;
}`,
        recursive: `function reverseRecursive(str) {
    if (str === "") return "";
    return reverseRecursive(str.substr(1)) + str[0];
}`
    },
    {
        id: "palindrome",
        name: "Palindrome Check",
        path: "string/palindrome.js",
        iterative: `function isPalindromeIterative(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    return true;
}`,
        recursive: `function isPalindromeRecursive(str) {
    if (str.length <= 1) return true;
    if (str[0] !== str[str.length - 1]) return false;
    return isPalindromeRecursive(str.substring(1, str.length - 1));
}`
    },
    {
        id: "linear-search",
        name: "Linear Search",
        path: "search/linear_search.js",
        iterative: `function linearSearchIterative(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
        recursive: `function linearSearchRecursive(arr, target, n = arr.length) {
    if (n <= 0) return -1;
    if (arr[n - 1] === target) return n - 1;
    return linearSearchRecursive(arr, target, n - 1);
}`
    },
    {
        id: "flatten",
        name: "Array Flattening",
        path: "array/flatten.js",
        iterative: `function flattenIterative(arr) {
    const stack = [...arr];
    const res = [];
    while (stack.length) {
        const next = stack.pop();
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            res.push(next);
        }
    }
    return res.reverse();
}`,
        recursive: `function flattenRecursive(arr) {
    let result = [];
    arr.forEach(item => {
        if (Array.isArray(item)) {
            result = result.concat(flattenRecursive(item));
        } else {
            result.push(item);
        }
    });
    return result;
}`
    },
    {
        id: "bubble-sort",
        name: "Bubble Sort",
        path: "sort/bubble_sort.js",
        iterative: `function bubbleSortIterative(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}`,
        recursive: `function bubbleSortRecursive(arr, n = arr.length) {
    if (n === 1) return arr;
    for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
            [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        }
    }
    return bubbleSortRecursive(arr, n - 1);
}`
    },
    {
        id: "selection-sort",
        name: "Selection Sort",
        path: "sort/selection_sort.js",
        iterative: `function selectionSortIterative(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[min]) min = j;
        }
        if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
    }
    return arr;
}`,
        recursive: `function selectionSortRecursive(arr, index = 0) {
    if (index === arr.length) return arr;
    let min = index;
    for (let i = index + 1; i < arr.length; i++) {
        if (arr[i] < arr[min]) min = i;
    }
    if (min !== index) [arr[index], arr[min]] = [arr[min], arr[index]];
    return selectionSortRecursive(arr, index + 1);
}`
    },
    {
        id: "insertion-sort",
        name: "Insertion Sort",
        path: "sort/insertion_sort.js",
        iterative: `function insertionSortIterative(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}`,
        recursive: `function insertionSortRecursive(arr, n = arr.length) {
    if (n <= 1) return arr;
    insertionSortRecursive(arr, n - 1);
    let last = arr[n - 1];
    let j = n - 2;
    while (j >= 0 && arr[j] > last) {
        arr[j + 1] = arr[j];
        j--;
    }
    arr[j + 1] = last;
    return arr;
}`
    },
    {
        id: "quick-sort",
        name: "Quick Sort",
        path: "sort/quick_sort.js",
        iterative: `function quickSortIterative(arr) {
    let stack = [[0, arr.length - 1]];
    while (stack.length > 0) {
        let [start, end] = stack.pop();
        if (start >= end) continue;
        let pivotIndex = partition(arr, start, end);
        stack.push([start, pivotIndex - 1]);
        stack.push([pivotIndex + 1, end]);
    }
    return arr;
}

function partition(arr, start, end) {
    let pivot = arr[end];
    let i = start;
    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[end]] = [arr[end], arr[i]];
    return i;
}`,
        recursive: `function quickSortRecursive(arr) {
    if (arr.length <= 1) return arr;
    let pivot = arr[arr.length - 1];
    let left = [], right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) left.push(arr[i]);
        else right.push(arr[i]);
    }
    return [...quickSortRecursive(left), pivot, ...quickSortRecursive(right)];
}`
    },
    {
        id: "merge-sort",
        name: "Merge Sort",
        path: "sort/merge_sort.js",
        iterative: `function mergeSortIterative(arr) {
    let n = arr.length;
    for (let size = 1; size < n; size *= 2) {
        for (let left = 0; left < n - 1; left += 2 * size) {
            let mid = Math.min(left + size - 1, n - 1);
            let right = Math.min(left + 2 * size - 1, n - 1);
            merge(arr, left, mid, right);
        }
    }
    return arr;
}

function merge(arr, l, m, r) {
    let n1 = m - l + 1, n2 = r - m;
    let L = arr.slice(l, m + 1), R = arr.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}`,
        recursive: `function mergeSortRecursive(arr) {
    if (arr.length <= 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSortRecursive(arr.slice(0, mid));
    let right = mergeSortRecursive(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    let result = [], i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}`
    },
    {
        id: "reverse-linked-list",
        name: "Reverse Linked List",
        path: "linked-list/reverse.js",
        iterative: `function reverseListIterative(head) {
    let prev = null, curr = head;
    while (curr) {
        let next = curr.next;
        curr.next = prev;
        prev = curr;
        curr = next;
    }
    return prev;
}`,
        recursive: `function reverseListRecursive(head) {
    if (!head || !head.next) return head;
    let p = reverseListRecursive(head.next);
    head.next.next = head;
    head.next = null;
    return p;
}`
    },
    {
        id: "bst-search",
        name: "BST Search",
        path: "tree/bst_search.js",
        iterative: `function searchBSTIterative(root, val) {
    while (root !== null && root.val !== val) {
        root = val < root.val ? root.left : root.right;
    }
    return root;
}`,
        recursive: `function searchBSTRecursive(root, val) {
    if (root === null || root.val === val) return root;
    return val < root.val 
        ? searchBSTRecursive(root.left, val) 
        : searchBSTRecursive(root.right, val);
}`
    },
    {
        id: "bst-insert",
        name: "BST Insert",
        path: "tree/bst_insert.js",
        iterative: `function insertBSTIterative(root, val) {
    if (!root) return new TreeNode(val);
    let curr = root;
    while (true) {
        if (val < curr.val) {
            if (!curr.left) { curr.left = new TreeNode(val); break; }
            curr = curr.left;
        } else {
            if (!curr.right) { curr.right = new TreeNode(val); break; }
            curr = curr.right;
        }
    }
    return root;
}`,
        recursive: `function insertBSTRecursive(root, val) {
    if (!root) return new TreeNode(val);
    if (val < root.val) root.left = insertBSTRecursive(root.left, val);
    else root.right = insertBSTRecursive(root.right, val);
    return root;
}`
    },
    {
        id: "inorder-traversal",
        name: "Inorder Traversal",
        path: "tree/inorder.js",
        iterative: `function inorderIterative(root) {
    let res = [], stack = [], curr = root;
    while (curr || stack.length) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        res.push(curr.val);
        curr = curr.right;
    }
    return res;
}`,
        recursive: `function inorderRecursive(root, res = []) {
    if (!root) return res;
    inorderRecursive(root.left, res);
    res.push(root.val);
    inorderRecursive(root.right, res);
    return res;
}`
    },
    {
        id: "pascal-triangle",
        name: "Pascal's Triangle Row",
        path: "math/pascal.js",
        iterative: `function getPascalRowIterative(rowIndex) {
    let row = [1];
    for (let i = 1; i <= rowIndex; i++) {
        for (let j = i - 1; j >= 1; j--) {
            row[j] = row[j] + row[j - 1];
        }
        row.push(1);
    }
    return row;
    }`,
        recursive: `function getPascalRowRecursive(n) {
    if (n === 0) return [1];
    let prev = getPascalRowRecursive(n - 1);
    let row = [1];
    for (let i = 1; i < n; i++) {
        row[i] = prev[i - 1] + prev[i];
    }
    row.push(1);
    return row;
    }`
    },
    {
        id: "tower-of-hanoi",
        name: "Tower of Hanoi",
        path: "recursion/hanoi.js",
        iterative: `function hanoiIterative(n) {
    const totalMoves = Math.pow(2, n) - 1;
    const src = 'A', aux = 'B', dest = 'C';
    if (n % 2 === 0) [aux, dest] = [dest, aux];

    for (let i = 1; i <= totalMoves; i++) {
        if (i % 3 === 1) moveBetween(src, dest);
        if (i % 3 === 2) moveBetween(src, aux);
        if (i % 3 === 0) moveBetween(aux, dest);
    }
    }`,
        recursive: `function hanoiRecursive(n, src, dest, aux) {
    if (n === 1) {
        console.log(\`Move disk 1 from \${src} to \${dest}\`);
        return;
    }
    hanoiRecursive(n - 1, src, aux, dest);
    console.log(\`Move disk \${n} from \${src} to \${dest}\`);
    hanoiRecursive(n - 1, aux, dest, src);
    }`
    },
    {
        id: "preorder-traversal",
        name: "Preorder Traversal",
        path: "tree/preorder.js",
        iterative: `function preorderIterative(root) {
    if (!root) return [];
    let res = [], stack = [root];
    while (stack.length) {
        let node = stack.pop();
        res.push(node.val);
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return res;
    }`,
        recursive: `function preorderRecursive(root, res = []) {
    if (!root) return res;
    res.push(root.val);
    preorderRecursive(root.left, res);
    preorderRecursive(root.right, res);
    return res;
    }`
    },
    {
        id: "postorder-traversal",
        name: "Postorder Traversal",
        path: "tree/postorder.js",
        iterative: `function postorderIterative(root) {
    if (!root) return [];
    let res = [], stack = [root];
    while (stack.length) {
        let node = stack.pop();
        res.unshift(node.val);
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return res;
    }`,
        recursive: `function postorderRecursive(root, res = []) {
    if (!root) return res;
    postorderRecursive(root.left, res);
    postorderRecursive(root.right, res);
    res.push(root.val);
    return res;
    }`
    },
    {
        id: "tree-height",
        name: "Binary Tree Height",
        path: "tree/height.js",
        iterative: `function treeHeightIterative(root) {
    if (!root) return 0;
    let height = 0, q = [root];
    while (q.length) {
        height++;
        let size = q.length;
        while (size--) {
            let node = q.shift();
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return height;
    }`,
        recursive: `function treeHeightRecursive(root) {
    if (!root) return 0;
    return 1 + Math.max(
        treeHeightRecursive(root.left), 
        treeHeightRecursive(root.right)
    );
    }`
    },
    {
        id: "leaf-count",
        name: "Tree Leaf Count",
        path: "tree/leaf_count.js",
        iterative: `function countLeavesIterative(root) {
    if (!root) return 0;
    let count = 0, stack = [root];
    while (stack.length) {
        let node = stack.pop();
        if (!node.left && !node.right) count++;
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return count;
    }`,
        recursive: `function countLeavesRecursive(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    return countLeavesRecursive(root.left) + 
           countLeavesRecursive(root.right);
    }`
    },
    {
        id: "sum-digits",
        name: "Sum of Digits",
        path: "math/sum_digits.js",
        iterative: `function sumDigitsIterative(n) {
    let sum = 0;
    while (n > 0) {
        sum += n % 10;
        n = Math.floor(n / 10);
    }
    return sum;
    }`,
        recursive: `function sumDigitsRecursive(n) {
    if (n === 0) return 0;
    return (n % 10) + sumDigitsRecursive(Math.floor(n / 10));
    }`
    },
    {
        id: "decimal-to-binary",
        name: "Decimal to Binary",
        path: "math/dec_to_bin.js",
        iterative: `function decToBinIterative(n) {
    let binary = "";
    while (n > 0) {
        binary = (n % 2) + binary;
        n = Math.floor(n / 2);
    }
    return binary || "0";
    }`,
        recursive: `function decToBinRecursive(n) {
    if (n === 0) return "";
    return decToBinRecursive(Math.floor(n / 2)) + (n % 2);
    }`
    },
    {
        id: "find-max",
        name: "Find Maximum",
        path: "array/find_max.js",
        iterative: `function findMaxIterative(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
    }`,
        recursive: `function findMaxRecursive(arr, n = arr.length) {
    if (n === 1) return arr[0];
    return Math.max(arr[n - 1], findMaxRecursive(arr, n - 1));
    }`
    },
    {
        id: "power-of-two",
        name: "Power of Two Check",
        path: "math/power_two.js",
        iterative: `function isPowerOfTwoIterative(n) {
    if (n <= 0) return false;
    while (n > 1) {
        if (n % 2 !== 0) return false;
        n /= 2;
    }
    return true;
    }`,
        recursive: `function isPowerOfTwoRecursive(n) {
    if (n === 1) return true;
    if (n <= 0 || n % 2 !== 0) return false;
    return isPowerOfTwoRecursive(n / 2);
    }`
    },
    {
        id: "reverse-array",
        name: "Reverse Array",
        path: "array/reverse.js",
        iterative: `function reverseArrayIterative(arr) {
    let start = 0, end = arr.length - 1;
    while (start < end) {
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;
    }
    return arr;
}`,
        recursive: `function reverseArrayRecursive(arr, start = 0, end = arr.length - 1) {
    if (start >= end) return arr;
    [arr[start], arr[end]] = [arr[end], arr[start]];
    return reverseArrayRecursive(arr, start + 1, end - 1);
}`
    },
    {
        id: "invert-tree",
        name: "Invert Binary Tree",
        path: "tree/invert.js",
        iterative: `function invertTreeIterative(root) {
    if (!root) return null;
    let stack = [root];
    while (stack.length) {
        let node = stack.pop();
        [node.left, node.right] = [node.right, node.left];
        if (node.left) stack.push(node.left);
        if (node.right) stack.push(node.right);
    }
    return root;
}`,
        recursive: `function invertTreeRecursive(root) {
    if (!root) return null;
    [root.left, root.right] = [
        invertTreeRecursive(root.right), 
        invertTreeRecursive(root.left)
    ];
    return root;
}`
    },
    {
        id: "symmetric-tree",
        name: "Symmetric Tree",
        path: "tree/symmetric.js",
        iterative: `function isSymmetricIterative(root) {
    if (!root) return true;
    let q = [root.left, root.right];
    while (q.length) {
        let t1 = q.shift(), t2 = q.shift();
        if (!t1 && !t2) continue;
        if (!t1 || !t2 || t1.val !== t2.val) return false;
        q.push(t1.left, t2.right, t1.right, t2.left);
    }
    return true;
}`,
        recursive: `function isSymmetricRecursive(root) {
    function check(t1, t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2 || t1.val !== t2.val) return false;
        return check(t1.left, t2.right) && check(t1.right, t2.left);
    }
    return !root || check(root.left, root.right);
}`
    },
    {
        id: "path-sum",
        name: "Path Sum Check",
        path: "tree/path_sum.js",
        iterative: `function hasPathSumIterative(root, target) {
    if (!root) return false;
    let stack = [[root, target - root.val]];
    while (stack.length) {
        let [node, sum] = stack.pop();
        if (!node.left && !node.right && sum === 0) return true;
        if (node.right) stack.push([node.right, sum - node.right.val]);
        if (node.left) stack.push([node.left, sum - node.left.val]);
    }
    return false;
}`,
        recursive: `function hasPathSumRecursive(root, sum) {
    if (!root) return false;
    if (!root.left && !root.right) return sum === root.val;
    return hasPathSumRecursive(root.left, sum - root.val) || 
           hasPathSumRecursive(root.right, sum - root.val);
}`
    },
    {
        id: "linked-list-length",
        name: "Linked List Length",
        path: "linked-list/length.js",
        iterative: `function lengthIterative(head) {
    let count = 0, curr = head;
    while (curr) {
        count++;
        curr = curr.next;
    }
    return count;
}`,
        recursive: `function lengthRecursive(head) {
    if (!head) return 0;
    return 1 + lengthRecursive(head.next);
}`
    },
    {
        id: "is-sorted",
        name: "Is Array Sorted",
        path: "array/is_sorted.js",
        iterative: `function isSortedIterative(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) return false;
    }
    return true;
}`,
        recursive: `function isSortedRecursive(arr, n = arr.length) {
    if (n <= 1) return true;
    if (arr[n - 2] > arr[n - 1]) return false;
    return isSortedRecursive(arr, n - 1);
}`
    },
    {
        id: "find-min",
        name: "Find Minimum",
        path: "array/find_min.js",
        iterative: `function findMinIterative(arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
    }
    return min;
}`,
        recursive: `function findMinRecursive(arr, n = arr.length) {
    if (n === 1) return arr[0];
    return Math.min(arr[n - 1], findMinRecursive(arr, n - 1));
}`
    },
    {
        id: "gcd-array",
        name: "GCD of Array",
        path: "math/gcd_array.js",
        iterative: `function gcdArrayIterative(arr) {
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
        result = gcd(result, arr[i]);
    }
    return result;
}`,
        recursive: `function gcdArrayRecursive(arr, n = arr.length) {
    if (n === 1) return arr[0];
    return gcd(arr[n - 1], gcdArrayRecursive(arr, n - 1));
}`
    },
    {
        id: "tree-node-count",
        name: "Tree Node Count",
        path: "tree/node_count.js",
        iterative: `function countNodesIterative(root) {
    if (!root) return 0;
    let count = 0, q = [root];
    while (q.length) {
        let node = q.shift();
        count++;
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
    }
    return count;
}`,
        recursive: `function countNodesRecursive(root) {
    if (!root) return 0;
    return 1 + countNodesRecursive(root.left) + 
               countNodesRecursive(root.right);
}`
    },
    {
        id: "bst-min",
        name: "BST Min Value",
        path: "tree/bst_min.js",
        iterative: `function bstMinIterative(root) {
    if (!root) return null;
    let curr = root;
    while (curr.left) curr = curr.left;
    return curr.val;
}`,
        recursive: `function bstMinRecursive(root) {
    if (!root) return null;
    if (!root.left) return root.val;
    return bstMinRecursive(root.left);
}`
    },
    {
        id: "bst-max",
        name: "BST Max Value",
        path: "tree/bst_max.js",
        iterative: `function bstMaxIterative(root) {
    if (!root) return null;
    let curr = root;
    while (curr.right) curr = curr.right;
    return curr.val;
}`,
        recursive: `function bstMaxRecursive(root) {
    if (!root) return null;
    if (!root.right) return root.val;
    return bstMaxRecursive(root.right);
}`
    },
    {
        id: "anagram-check",
        name: "Anagram Check",
        path: "string/anagram.js",
        iterative: `function isAnagramIterative(s1, s2) {
    if (s1.length !== s2.length) return false;
    let counts = {};
    for (let char of s1) counts[char] = (counts[char] || 0) + 1;
    for (let char of s2) {
        if (!counts[char]) return false;
        counts[char]--;
    }
    return true;
}`,
        recursive: `function isAnagramRecursive(s1, s2) {
    if (s1.length !== s2.length) return false;
    if (s1 === "" && s2 === "") return true;
    let index = s2.indexOf(s1[0]);
    if (index === -1) return false;
    return isAnagramRecursive(
        s1.substring(1), 
        s2.substring(0, index) + s2.substring(index + 1)
    );
}`
    },
    {
        id: "array-avg",
        name: "Array Average",
        path: "array/average.js",
        iterative: `function averageIterative(arr) {
    let sum = 0;
    for (let x of arr) sum += x;
    return sum / arr.length;
}`,
        recursive: `function averageRecursive(arr, n = arr.length) {
    function sum(a, i) {
        if (i === 0) return 0;
        return a[i - 1] + sum(a, i - 1);
    }
    return sum(arr, n) / n;
}`
    },
    {
        id: "count-occurrence",
        name: "Count Occurrences",
        path: "array/count.js",
        iterative: `function countIterative(arr, target) {
    let count = 0;
    for (let x of arr) if (x === target) count++;
    return count;
}`,
        recursive: `function countRecursive(arr, target, n = arr.length) {
    if (n === 0) return 0;
    return (arr[n - 1] === target ? 1 : 0) + 
           countRecursive(arr, target, n - 1);
}`
    },
    {
        id: "find-index",
        name: "Find Index",
        path: "array/index.js",
        iterative: `function findIndexIterative(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
        recursive: `function findIndexRecursive(arr, target, i = 0) {
    if (i >= arr.length) return -1;
    if (arr[i] === target) return i;
    return findIndexRecursive(arr, target, i + 1);
}`
    },
    {
        id: "power-set",
        name: "Power Set (Subsets)",
        path: "combinatorics/subsets.js",
        iterative: `function subsetsIterative(arr) {
    let result = [[]];
    for (let x of arr) {
        let n = result.length;
        for (let i = 0; i < n; i++) {
            result.push([...result[i], x]);
        }
    }
    return result;
}`,
        recursive: `function subsetsRecursive(arr, i = 0) {
    if (i === arr.length) return [[]];
    let res = subsetsRecursive(arr, i + 1);
    let next = [];
    for (let sub of res) next.push([arr[i], ...sub]);
    return [...res, ...next];
}`
    },
    {
        id: "n-choose-k",
        name: "Combinations (nCr)",
        path: "math/combinations.js",
        iterative: `function nCrIterative(n, r) {
    if (r > n) return 0;
    if (r === 0 || r === n) return 1;
    if (r > n / 2) r = n - r;
    let res = 1;
    for (let i = 1; i <= r; i++) {
        res = res * (n - i + 1) / i;
    }
    return res;
}`,
        recursive: `function nCrRecursive(n, r) {
    if (r === 0 || r === n) return 1;
    return nCrRecursive(n - 1, r - 1) + nCrRecursive(n - 1, r);
}`
    },
    {
        id: "is-prime",
        name: "Is Prime Check",
        path: "math/is_prime.js",
        iterative: `function isPrimeIterative(n) {
    if (n <= 1) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}`,
        recursive: `function isPrimeRecursive(n, i = 2) {
    if (n <= 2) return n === 2;
    if (n % i === 0) return false;
    if (i * i > n) return true;
    return isPrimeRecursive(n, i + 1);
}`
    },
    {
        id: "multiply",
        name: "Multiply (no *)",
        path: "math/multiply.js",
        iterative: `function multiplyIterative(a, b) {
    let res = 0;
    for (let i = 0; i < Math.abs(b); i++) res += a;
    return b < 0 ? -res : res;
}`,
        recursive: `function multiplyRecursive(a, b) {
    if (b === 0) return 0;
    if (b > 0) return a + multiplyRecursive(a, b - 1);
    return -multiplyRecursive(a, -b);
}`
    },
    {
        id: "dfs",
        name: "Depth First Search",
        path: "graph/dfs.js",
        iterative: `function dfsIterative(adj, start) {
    let stack = [start], visited = new Set([start]), res = [];
    while (stack.length) {
        let u = stack.pop();
        res.push(u);
        for (let v of adj[u]) {
            if (!visited.has(v)) {
                visited.add(v);
                stack.push(v);
            }
        }
    }
    return res;
}`,
        recursive: `function dfsRecursive(adj, u, visited = new Set(), res = []) {
    visited.add(u);
    res.push(u);
    for (let v of adj[u]) {
        if (!visited.has(v)) dfsRecursive(adj, v, visited, res);
    }
    return res;
}`
    },
    {
        id: "validate-bst",
        name: "Validate BST",
        path: "tree/validate_bst.js",
        iterative: `function isValidBSTIterative(root) {
    let stack = [], prev = -Infinity, curr = root;
    while (stack.length || curr) {
        while (curr) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        if (curr.val <= prev) return false;
        prev = curr.val;
        curr = curr.right;
    }
    return true;
}`,
        recursive: `function isValidBSTRecursive(node, min = -Infinity, max = Infinity) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return isValidBSTRecursive(node.left, min, node.val) &&
           isValidBSTRecursive(node.right, node.val, max);
}`
    },
    {
        id: "ll-search",
        name: "Linked List Search",
        path: "linked-list/search.js",
        iterative: `function searchLLIterative(head, target) {
    let curr = head;
    while (curr) {
        if (curr.val === target) return true;
        curr = curr.next;
    }
    return false;
}`,
        recursive: `function searchLLRecursive(head, target) {
    if (!head) return false;
    if (head.val === target) return true;
    return searchLLRecursive(head.next, target);
}`
    },
    {
        id: "tree-sum",
        name: "Binary Tree Sum",
        path: "tree/sum.js",
        iterative: `function sumTreeIterative(root) {
    if (!root) return 0;
    let sum = 0, q = [root];
    while (q.length) {
        let node = q.shift();
        sum += node.val;
        if (node.left) q.push(node.left);
        if (node.right) q.push(node.right);
    }
    return sum;
}`,
        recursive: `function sumTreeRecursive(root) {
    if (!root) return 0;
    return root.val + sumTreeRecursive(root.left) + 
                     sumTreeRecursive(root.right);
}`
    },
    {
        id: "array-product",
        name: "Array Product",
        path: "array/product.js",
        iterative: `function productIterative(arr) {
    let res = 1;
    for (let x of arr) res *= x;
    return res;
}`,
        recursive: `function productRecursive(arr, n = arr.length) {
    if (n === 0) return 1;
    return arr[n - 1] * productRecursive(arr, n - 1);
}`
    },
    {
        id: "count-vowels",
        name: "Count Vowels",
        path: "string/vowels.js",
        iterative: `function countVowelsIterative(str) {
    let count = 0, vowels = "aeiouAEIOU";
    for (let char of str) {
        if (vowels.includes(char)) count++;
    }
    return count;
}`,
        recursive: `function countVowelsRecursive(str) {
    if (str.length === 0) return 0;
    const isVowel = "aeiouAEIOU".includes(str[0]) ? 1 : 0;
    return isVowel + countVowelsRecursive(str.substring(1));
}`
    },
    {
        id: "lcm",
        name: "LCM Calculation",
        path: "math/lcm.js",
        iterative: `function lcmIterative(a, b) {
    let max = Math.max(a, b);
    while (true) {
        if (max % a === 0 && max % b === 0) return max;
        max++;
    }
}`,
        recursive: `function lcmRecursive(a, b) {
    // Uses LCM(a, b) = (a * b) / GCD(a, b)
    function gcd(x, y) {
        return y === 0 ? x : gcd(y, x % y);
    }
    return (a * b) / gcd(a, b);
}`
    },
    {
        id: "bin-to-dec",
        name: "Binary to Decimal",
        path: "math/bin_to_dec.js",
        iterative: `function binToDecIterative(binStr) {
    let res = 0;
    for (let i = 0; i < binStr.length; i++) {
        res = res * 2 + parseInt(binStr[i]);
    }
    return res;
}`,
        recursive: `function binToDecRecursive(binStr) {
    if (binStr.length === 0) return 0;
    return binToDecRecursive(binStr.substring(0, binStr.length - 1)) * 2 + 
           parseInt(binStr[binStr.length - 1]);
}`
    },
    {
        id: "sum-natural",
        name: "Sum of N Natural",
        path: "math/sum_n.js",
        iterative: `function sumNaturalIterative(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i;
    return sum;
}`,
        recursive: `function sumNaturalRecursive(n) {
    if (n <= 1) return n;
    return n + sumNaturalRecursive(n - 1);
}`
    },
    {
        id: "sum-squares",
        name: "Sum of Squares",
        path: "math/sum_squares.js",
        iterative: `function sumSquaresIterative(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) sum += i * i;
    return sum;
}`,
        recursive: `function sumSquaresRecursive(n) {
    if (n <= 1) return n;
    return n * n + sumSquaresRecursive(n - 1);
}`
    },
    {
        id: "min-depth",
        name: "Tree Min Depth",
        path: "tree/min_depth.js",
        iterative: `function minDepthIterative(root) {
    if (!root) return 0;
    let q = [[root, 1]];
    while (q.length) {
        let [node, depth] = q.shift();
        if (!node.left && !node.right) return depth;
        if (node.left) q.push([node.left, depth + 1]);
        if (node.right) q.push([node.right, depth + 1]);
    }
}`,
        recursive: `function minDepthRecursive(root) {
    if (!root) return 0;
    if (!root.left) return 1 + minDepthRecursive(root.right);
    if (!root.right) return 1 + minDepthRecursive(root.left);
    return 1 + Math.min(
        minDepthRecursive(root.left), 
        minDepthRecursive(root.right)
    );
}`
    },
    {
        id: "nodes-at-level",
        name: "Nodes at Level K",
        path: "tree/level_k.js",
        iterative: `function nodesAtLevelIterative(root, k) {
    if (!root) return [];
    let q = [root], level = 0;
    while (q.length) {
        if (level === k) return q.map(n => n.val);
        let size = q.length;
        while (size--) {
            let node = q.shift();
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
        level++;
    }
    return [];
}`,
        recursive: `function nodesAtLevelRecursive(root, k, res = []) {
    if (!root) return res;
    if (k === 0) {
        res.push(root.val);
        return res;
    }
    nodesAtLevelRecursive(root.left, k - 1, res);
    nodesAtLevelRecursive(root.right, k - 1, res);
    return res;
}`
    },
    {
        id: "armstrong",
        name: "Armstrong Number",
        path: "math/armstrong.js",
        iterative: `function isArmstrongIterative(n) {
    let sum = 0, temp = n, d = n.toString().length;
    while (temp > 0) {
        sum += Math.pow(temp % 10, d);
        temp = Math.floor(temp / 10);
    }
    return sum === n;
}`,
        recursive: `function isArmstrongRecursive(n) {
    const d = n.toString().length;
    function calc(val) {
        if (val === 0) return 0;
        return Math.pow(val % 10, d) + calc(Math.floor(val / 10));
    }
    return calc(n) === n;
}`
    },
    {
        id: "fibonacci-sum",
        name: "Sum of Fibonacci",
        path: "math/fib_sum.js",
        iterative: `function fibSumIterative(n) {
    if (n <= 0) return 0;
    let a = 0, b = 1, sum = 1;
    for (let i = 2; i <= n; i++) {
        let next = a + b;
        a = b;
        b = next;
        sum += next;
    }
    return sum;
}`,
        recursive: `function fibSumRecursive(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    function fib(k) {
        if (k <= 1) return k;
        return fib(k - 1) + fib(k - 2);
    }
    return fib(n) + fibSumRecursive(n - 1);
}`
    },
    {
        id: "power-three",
        name: "Power of Three",
        path: "math/power_three.js",
        iterative: `function isPowerThreeIterative(n) {
    if (n <= 0) return false;
    while (n % 3 === 0) n /= 3;
    return n === 1;
}`,
        recursive: `function isPowerThreeRecursive(n) {
    if (n === 1) return true;
    if (n <= 0 || n % 3 !== 0) return false;
    return isPowerThreeRecursive(n / 3);
}`
    },
    {
        id: "count-chars",
        name: "Count Occurrences",
        path: "string/count_char.js",
        iterative: `function countCharIterative(str, char) {
    let count = 0;
    for (let c of str) if (c === char) count++;
    return count;
}`,
        recursive: `function countCharRecursive(str, char) {
    if (str.length === 0) return 0;
    const match = str[0] === char ? 1 : 0;
    return match + countCharRecursive(str.substring(1), char);
}`
    },
    {
        id: "array-even-count",
        name: "Count Even Numbers",
        path: "array/even_count.js",
        iterative: `function countEvenIterative(arr) {
    let count = 0;
    for (let x of arr) if (x % 2 === 0) count++;
    return count;
}`,
        recursive: `function countEvenRecursive(arr, n = arr.length) {
    if (n === 0) return 0;
    const match = arr[n - 1] % 2 === 0 ? 1 : 0;
    return match + countEvenRecursive(arr, n - 1);
}`
    },
    {
        id: "tree-width",
        name: "Binary Tree Width",
        path: "tree/width.js",
        iterative: `function treeWidthIterative(root) {
    if (!root) return 0;
    let maxWidth = 0, q = [root];
    while (q.length) {
        let size = q.length;
        maxWidth = Math.max(maxWidth, size);
        while (size--) {
            let node = q.shift();
            if (node.left) q.push(node.left);
            if (node.right) q.push(node.right);
        }
    }
    return maxWidth;
}`,
        recursive: `function treeWidthRecursive(root) {
    function getHeight(node) {
        if (!node) return 0;
        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }
    function getWidth(node, level) {
        if (!node) return 0;
        if (level === 1) return 1;
        return getWidth(node.left, level - 1) + getWidth(node.right, level - 1);
    }
    let max = 0, h = getHeight(root);
    for (let i = 1; i <= h; i++) {
        max = Math.max(max, getWidth(root, i));
    }
    return max;
}`
    },
    {
        id: "bfs",
        name: "Breadth First Search",
        path: "graph/bfs.js",
        iterative: `function bfsIterative(adj, start) {
    let q = [start], visited = new Set([start]), res = [];
    while (q.length) {
        let u = q.shift();
        res.push(u);
        for (let v of adj[u]) {
            if (!visited.has(v)) {
                visited.add(v);
                q.push(v);
            }
        }
    }
    return res;
}`,
        recursive: `function bfsRecursive(adj, q = [], visited = new Set(), res = []) {
    if (q.length === 0) return res;
    let u = q.shift();
    res.push(u);
    for (let v of adj[u]) {
        if (!visited.has(v)) {
            visited.add(v);
            q.push(v);
        }
    }
    return bfsRecursive(adj, q, visited, res);
}`
    },
    {
        id: "perfect-square",
        name: "Perfect Square Check",
        path: "math/perfect_square.js",
        iterative: `function isPerfectSquareIterative(n) {
    if (n < 0) return false;
    let i = 0;
    while (i * i <= n) {
        if (i * i === n) return true;
        i++;
    }
    return false;
}`,
        recursive: `function isPerfectSquareRecursive(n, i = 0) {
    if (i * i > n) return false;
    if (i * i === n) return true;
    return isPerfectSquareRecursive(n, i + 1);
}`
    },
    {
        id: "spiral-matrix",
        name: "Spiral Matrix Trace",
        path: "matrix/spiral.js",
        iterative: `function spiralIterative(matrix) {
    const res = [];
    if (matrix.length === 0) return res;
    let r1 = 0, r2 = matrix.length - 1;
    let c1 = 0, c2 = matrix[0].length - 1;
    while (r1 <= r2 && c1 <= c2) {
        for (let c = c1; c <= c2; c++) res.push(matrix[r1][c]);
        for (let r = r1 + 1; r <= r2; r++) res.push(matrix[r][c2]);
        if (r1 < r2 && c1 < c2) {
            for (let c = c2 - 1; c > c1; c--) res.push(matrix[r2][c]);
            for (let r = r2; r > r1; r--) res.push(matrix[r][c1]);
        }
        r1++; r2--; c1++; c2--;
    }
    return res;
}`,
        recursive: `function spiralRecursive(matrix, r1, r2, c1, c2, res = []) {
    if (r1 > r2 || c1 > c2) return res;
    for (let c = c1; c <= c2; c++) res.push(matrix[r1][c]);
    for (let r = r1 + 1; r <= r2; r++) res.push(matrix[r][c2]);
    if (r1 < r2 && c1 < c2) {
        for (let c = c2 - 1; c > c1; c--) res.push(matrix[r2][c]);
        for (let r = r2; r > r1; r--) res.push(matrix[r][c1]);
    }
    return spiralRecursive(matrix, r1+1, r2-1, c1+1, c2-1, res);
}`
    },
    {
        id: "count-set-bits",
        name: "Count Set Bits",
        path: "math/set_bits.js",
        iterative: `function countSetBitsIterative(n) {
    let count = 0;
    while (n > 0) {
        count += n & 1;
        n >>= 1;
    }
    return count;
}`,
        recursive: `function countSetBitsRecursive(n) {
    if (n === 0) return 0;
    return (n & 1) + countSetBitsRecursive(n >> 1);
}`
    },
    {
        id: "hamming-distance",
        name: "Hamming Distance",
        path: "math/hamming.js",
        iterative: `function hammingIterative(x, y) {
    let xor = x ^ y, dist = 0;
    while (xor > 0) {
        if (xor & 1) dist++;
        xor >>= 1;
    }
    return dist;
}`,
        recursive: `function hammingRecursive(x, y) {
    let xor = x ^ y;
    function count(n) {
        if (n === 0) return 0;
        return (n & 1) + count(n >> 1);
    }
    return count(xor);
}`
    },
    {
        id: "balanced-parentheses",
        name: "Balanced Parens",
        path: "string/balanced.js",
        iterative: `function isBalancedIterative(str) {
    let stack = [];
    for (let char of str) {
        if (char === '(') stack.push('(');
        else if (char === ')') {
            if (stack.length === 0) return false;
            stack.pop();
        }
    }
    return stack.length === 0;
}`,
        recursive: `function isBalancedRecursive(str, balance = 0) {
    if (str.length === 0) return balance === 0;
    if (balance < 0) return false;
    if (str[0] === '(') return isBalancedRecursive(str.slice(1), balance + 1);
    if (str[0] === ')') return isBalancedRecursive(str.slice(1), balance - 1);
    return isBalancedRecursive(str.slice(1), balance);
}`
    },
    {
        id: "string-to-int",
        name: "String to Integer",
        path: "string/atoi.js",
        iterative: `function atoiIterative(str) {
    let res = 0, sign = 1, i = 0;
    if (str[0] === '-') { sign = -1; i = 1; }
    for (; i < str.length; i++) {
        res = res * 10 + (str[i] - '0');
    }
    return res * sign;
}`,
        recursive: `function atoiRecursive(str, n = str.length) {
    if (n === 1) return str[0] - '0';
    return atoiRecursive(str, n - 1) * 10 + (str[n - 1] - '0');
}`
    },
    {
        id: "selection-search",
        name: "Kth Smallest",
        path: "array/kth_smallest.js",
        iterative: `function kthSmallestIterative(arr, k) {
    arr.sort((a, b) => a - b);
    return arr[k - 1];
}`,
        recursive: `function quickSelectRecursive(arr, k) {
    const pivot = arr[Math.floor(Math.random() * arr.length)];
    const left = arr.filter(x => x < pivot);
    const mid = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    if (k <= left.length) return quickSelectRecursive(left, k);
    if (k <= left.length + mid.length) return pivot;
    return quickSelectRecursive(right, k - left.length - mid.length);
}`
    },
    {
        id: "count-leaves-tree",
        name: "Count Leaves (Full)",
        path: "tree/leaf_count_v2.js",
        iterative: `function countLeavesIterative(root) {
    if (!root) return 0;
    let count = 0, stack = [root];
    while (stack.length) {
        let node = stack.pop();
        if (!node.left && !node.right) count++;
        if (node.right) stack.push(node.right);
        if (node.left) stack.push(node.left);
    }
    return count;
}`,
        recursive: `function countLeavesRecursive(root) {
    if (!root) return 0;
    if (!root.left && !root.right) return 1;
    return countLeavesRecursive(root.left) + countLeavesRecursive(root.right);
}`
    },
    {
        id: "check-balanced-tree",
        name: "Check Balanced Tree",
        path: "tree/is_balanced.js",
        iterative: `function isBalancedIterative(root) {
    if (!root) return true;
    const depths = new Map();
    const stack = [root];
    while (stack.length) {
        const node = stack[stack.length - 1];
        if (!node) { stack.pop(); continue; }
        if ((!node.left || depths.has(node.left)) && 
            (!node.right || depths.has(node.right))) {
            const l = depths.get(node.left) || 0;
            const r = depths.get(node.right) || 0;
            if (Math.abs(l - r) > 1) return false;
            depths.set(node, 1 + Math.max(l, r));
            stack.pop();
        } else {
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
    }
    return true;
}`,
        recursive: `function isBalancedRecursive(root) {
    function height(node) {
        if (!node) return 0;
        let l = height(node.left);
        if (l === -1) return -1;
        let r = height(node.right);
        if (r === -1) return -1;
        if (Math.abs(l - r) > 1) return -1;
        return 1 + Math.max(l, r);
    }
    return height(root) !== -1;
}`
    },
    {
        id: "lca-bst",
        name: "LCA in BST",
        path: "tree/lca_bst.js",
        iterative: `function lcaIterative(root, p, q) {
    while (root) {
        if (p.val < root.val && q.val < root.val) root = root.left;
        else if (p.val > root.val && q.val > root.val) root = root.right;
        else return root;
    }
}`,
        recursive: `function lcaRecursive(root, p, q) {
    if (p.val < root.val && q.val < root.val) return lcaRecursive(root.left, p, q);
    if (p.val > root.val && q.val > root.val) return lcaRecursive(root.right, p, q);
    return root;
}`
    },
    {
        id: "find-duplicates",
        name: "Find Duplicates",
        path: "array/duplicates.js",
        iterative: `function findDuplicatesIterative(arr) {
    let seen = new Set(), dups = new Set();
    for (let x of arr) {
        if (seen.has(x)) dups.add(x);
        seen.add(x);
    }
    return [...dups];
}`,
        recursive: `function findDuplicatesRecursive(arr, seen = new Set(), dups = new Set()) {
    if (arr.length === 0) return [...dups];
    let [first, ...rest] = arr;
    if (seen.has(first)) dups.add(first);
    seen.add(first);
    return findDuplicatesRecursive(rest, seen, dups);
}`
    },
    {
        id: "missing-number",
        name: "Missing Number",
        path: "array/missing.js",
        iterative: `function missingIterative(arr, n) {
    let expected = (n * (n + 1)) / 2;
    let actual = arr.reduce((a, b) => a + b, 0);
    return expected - actual;
}`,
        recursive: `function missingRecursive(arr, n) {
    function sum(a, i) {
        if (i === 0) return 0;
        return a[i-1] + sum(a, i-1);
    }
    return (n * (n + 1) / 2) - sum(arr, arr.length);
}`
    },
    {
        id: "power-four",
        name: "Power of Four",
        path: "math/power_four.js",
        iterative: `function isPowerFourIterative(n) {
    if (n <= 0) return false;
    while (n % 4 === 0) n /= 4;
    return n === 1;
}`,
        recursive: `function isPowerFourRecursive(n) {
    if (n === 1) return true;
    if (n <= 0 || n % 4 !== 0) return false;
    return isPowerFourRecursive(n / 4);
}`
    },
    {
        id: "first-unique-char",
        name: "First Unique Char",
        path: "string/unique_char.js",
        iterative: `function firstUniqueIterative(str) {
    let counts = {};
    for (let c of str) counts[c] = (counts[c] || 0) + 1;
    for (let i = 0; i < str.length; i++) {
        if (counts[str[i]] === 1) return i;
    }
    return -1;
}`,
        recursive: `function firstUniqueRecursive(str, i = 0) {
    if (i === str.length) return -1;
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) return i;
    return firstUniqueRecursive(str, i + 1);
}`
    },
    {
        id: "max-subarray-sum",
        name: "Max Subarray Sum",
        path: "array/kadane.js",
        iterative: `function kadaneIterative(arr) {
    let maxSoFar = arr[0], maxEnd = arr[0];
    for (let i = 1; i < arr.length; i++) {
        maxEnd = Math.max(arr[i], maxEnd + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEnd);
    }
    return maxSoFar;
}`,
        recursive: `function kadaneRecursive(arr, i = 1, currentMax = arr[0], globalMax = arr[0]) {
    if (i === arr.length) return globalMax;
    let nextMax = Math.max(arr[i], currentMax + arr[i]);
    return kadaneRecursive(arr, i + 1, nextMax, Math.max(globalMax, nextMax));
}`
    },
    {
        id: "rotate-array",
        name: "Rotate Array",
        path: "array/rotate.js",
        iterative: `function rotateIterative(arr, k) {
    k %= arr.length;
    function reverse(a, s, e) {
        while (s < e) [a[s], a[e]] = [a[e], a[s++], e--];
    }
    reverse(arr, 0, arr.length - 1);
    reverse(arr, 0, k - 1);
    reverse(arr, k, arr.length - 1);
    return arr;
}`,
        recursive: `function rotateRecursive(arr, k) {
    if (k === 0) return arr;
    arr.unshift(arr.pop());
    return rotateRecursive(arr, k - 1);
}`
    },
    {
        id: "intersect-arrays",
        name: "Array Intersection",
        path: "array/intersection.js",
        iterative: `function intersectIterative(a, b) {
    let s1 = new Set(a), res = [];
    for (let x of b) {
        if (s1.has(x)) { res.push(x); s1.delete(x); }
    }
    return res;
}`,
        recursive: `function intersectRecursive(a, b, res = []) {
    if (a.length === 0) return res;
    let [first, ...rest] = a;
    let idx = b.indexOf(first);
    if (idx !== -1) {
        res.push(first);
        return intersectRecursive(rest, [...b.slice(0, idx), ...b.slice(idx + 1)], res);
    }
    return intersectRecursive(rest, b, res);
}`
    },
    {
        id: "product-except-self",
        name: "Product Except Self",
        path: "array/product_self.js",
        iterative: `function productExceptSelfIterative(arr) {
    let n = arr.length, res = new Array(n).fill(1);
    let left = 1, right = 1;
    for (let i = 0; i < n; i++) { res[i] *= left; left *= arr[i]; }
    for (let i = n - 1; i >= 0; i--) { res[i] *= right; right *= arr[i]; }
    return res;
}`,
        recursive: `function productExceptSelfRecursive(arr, i = 0, left = 1) {
    if (i === arr.length) return 1;
    let curr = arr[i];
    let right = productExceptSelfRecursive(arr, i + 1, left * curr);
    arr[i] = left * right;
    return curr * right;
}`
    },
    {
        id: "permutations",
        name: "String Permutations",
        path: "string/permutations.js",
        iterative: `function permutationsIterative(str) {
    let res = [''];
    for (let char of str) {
        let next = [];
        for (let p of res) {
            for (let i = 0; i <= p.length; i++) {
                next.push(p.slice(0, i) + char + p.slice(i));
            }
        }
        res = next;
    }
    return res;
}`,
        recursive: `function permutationsRecursive(str) {
    if (str.length <= 1) return [str];
    let res = [];
    for (let i = 0; i < str.length; i++) {
        let char = str[i];
        let rest = str.slice(0, i) + str.slice(i + 1);
        for (let p of permutationsRecursive(rest)) {
            res.push(char + p);
        }
    }
    return res;
}`
    },
    {
        id: "coin-change",
        name: "Coin Change (Ways)",
        path: "dp/coin_change.js",
        iterative: `function coinChangeIterative(coins, amount) {
    let dp = new Array(amount + 1).fill(0);
    dp[0] = 1;
    for (let coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}`,
        recursive: `function coinChangeRecursive(coins, n, amount) {
    if (amount === 0) return 1;
    if (amount < 0 || n <= 0) return 0;
    return coinChangeRecursive(coins, n - 1, amount) + 
           coinChangeRecursive(coins, n, amount - coins[n - 1]);
}`
    }
];

class LabEngine {
    constructor() {
        this.nodes = {
            list: document.getElementById('algoList'),
            iterative: document.getElementById('codeIterative'),
            recursive: document.getElementById('codeRecursive'),
            path: document.getElementById('currentPath'),
            meta: document.getElementById('algoMeta'),
            status: document.getElementById('systemStatus')
        };
        this.init();
    }

    init() {
        this.renderSidebar();
        this.loadAlgorithm(ALGORITHMS[0].id);
        console.log("ALGO_TWINS // ENGINE_INITIALIZED");
    }

    renderSidebar() {
        const fragment = document.createDocumentFragment(); // Directive 202
        ALGORITHMS.forEach(algo => {
            const li = document.createElement('li');
            li.className = 'c-nav__item';
            
            const a = document.createElement('a');
            a.className = 'c-nav__link';
            a.dataset.id = algo.id; // Directive 204
            a.textContent = `> ${algo.id.toUpperCase()}`;
            
            a.addEventListener('click', (e) => {
                e.preventDefault();
                this.loadAlgorithm(algo.id);
            });
            
            li.appendChild(a);
            fragment.appendChild(li);
        });
        this.nodes.list.appendChild(fragment);
    }

    loadAlgorithm(id) {
        const algo = ALGORITHMS.find(a => a.id === id);
        if (!algo) return;

        // Update UI State
        document.querySelectorAll('.c-nav__link').forEach(link => {
            link.classList.toggle('is-active', link.dataset.id === id);
        });

        this.nodes.path.textContent = `root@twins:~/parallel/${algo.path}`;
        this.nodes.meta.textContent = `COMPILATION: SUCCESS | TARGET: ${algo.id.toUpperCase()}`;
        this.nodes.status.textContent = "SYNCHRONIZED";

        // Decompile effect
        this.renderCode(this.nodes.iterative, algo.iterative);
        this.renderCode(this.nodes.recursive, algo.recursive);
    }

    renderCode(node, code) {
        node.innerHTML = this.highlight(code);
    }

    highlight(code) {
        // Advanced Syntax Highlighting - Directive 190
        const patterns = [
            { cls: 'token-comment', reg: /\/\/.*|\/\*[\s\S]*?\*\//g },
            { cls: 'token-string', reg: /(['"`])(?:(?=(\\?))\2.)*?\1/g },
            { cls: 'token-keyword', reg: /\b(function|const|let|var|if|else|for|while|return|class|new|async|await|null|true|false)\b/g },
            { cls: 'token-number', reg: /\b\d+\b/g },
            { cls: 'token-operator', reg: /[+\-*/%=<>!&|^~]+/g },
            { cls: 'token-function', reg: /\b\w+(?=\s*\()/g }
        ];

        let highlighted = this.esc(code);
        
        // Sorting patterns to avoid overlapping matches
        const matches = [];
        patterns.forEach(p => {
            let m;
            while ((m = p.reg.exec(code)) !== null) {
                matches.push({ i: m.index, l: m[0].length, cls: p.cls, txt: m[0] });
            }
        });
        
        matches.sort((a, b) => b.i - a.i); // Start from end to avoid index shifts

        let result = code;
        matches.forEach(m => {
            // Only highlight if it doesn't overlap with a previously processed match (simple check)
            const before = result.substring(0, m.i);
            const mid = `<span class="${m.cls}">${this.esc(m.txt)}</span>`;
            const after = result.substring(m.i + m.l);
            // This simple replacement approach needs careful handling for HTML tags
            // Re-implementing with a more robust character-by-character or segment approach
        });

        // Refined multi-pass highlighter
        let segments = [{ text: code, type: 'plain' }];
        
        patterns.forEach(p => {
            let nextSegments = [];
            segments.forEach(seg => {
                if (seg.type !== 'plain') {
                    nextSegments.push(seg);
                    return;
                }
                
                let lastIdx = 0;
                let match;
                while ((match = p.reg.exec(seg.text)) !== null) {
                    if (match.index > lastIdx) {
                        nextSegments.push({ text: seg.text.substring(lastIdx, match.index), type: 'plain' });
                    }
                    nextSegments.push({ text: match[0], type: p.cls });
                    lastIdx = match.index + match[0].length;
                }
                if (lastIdx < seg.text.length) {
                    nextSegments.push({ text: seg.text.substring(lastIdx), type: 'plain' });
                }
            });
            segments = nextSegments;
        });

        return segments.map(s => s.type === 'plain' ? this.esc(s.text) : `<span class="${s.type}">${this.esc(s.text)}</span>`).join('');
    }

    esc(t) {
        return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.lab = new LabEngine();
});
