// Binary Search Algorithm
// Time Complexity: O(log n)
// Space Complexity: O(1) iterative, O(log n) recursive
// Note: Array must be sorted

// Iterative version
function binarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }

    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
const target = 11;

console.log(`Binary Search (Iterative): Element ${target} found at index: ${binarySearchIterative(arr, target)}`);
console.log(`Binary Search (Recursive): Element ${target} found at index: ${binarySearchRecursive(arr, target)}`);

const notFound = binarySearchIterative(arr, 10);
console.log(`Binary Search: Element 10 found at index: ${notFound}`);
