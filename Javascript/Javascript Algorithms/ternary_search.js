// Ternary Search Algorithm
// Time Complexity: O(log3 n)
// Space Complexity: O(1) iterative, O(log3 n) recursive
// Note: Array must be sorted

// Iterative version
function ternarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid1 = Math.floor(left + (right - left) / 3);
        const mid2 = Math.floor(right - (right - left) / 3);

        if (arr[mid1] === target) {
            return mid1;
        }
        if (arr[mid2] === target) {
            return mid2;
        }

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

// Recursive version
function ternarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) {
        return -1;
    }

    const mid1 = Math.floor(left + (right - left) / 3);
    const mid2 = Math.floor(right - (right - left) / 3);

    if (arr[mid1] === target) {
        return mid1;
    }
    if (arr[mid2] === target) {
        return mid2;
    }

    if (target < arr[mid1]) {
        return ternarySearchRecursive(arr, target, left, mid1 - 1);
    } else if (target > arr[mid2]) {
        return ternarySearchRecursive(arr, target, mid2 + 1, right);
    } else {
        return ternarySearchRecursive(arr, target, mid1 + 1, mid2 - 1);
    }
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
const target = 17;

console.log(`Ternary Search (Iterative): Element ${target} found at index: ${ternarySearchIterative(arr, target)}`);
console.log(`Ternary Search (Recursive): Element ${target} found at index: ${ternarySearchRecursive(arr, target)}`);

const notFound = ternarySearchIterative(arr, 10);
console.log(`Ternary Search: Element 10 found at index: ${notFound}`);
