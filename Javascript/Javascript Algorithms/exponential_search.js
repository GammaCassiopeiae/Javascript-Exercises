// Exponential Search Algorithm
// Time Complexity: O(log n)
// Space Complexity: O(1)
// Note: Array must be sorted
// Useful for unbounded/infinite arrays

function binarySearch(arr, target, left, right) {
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

function exponentialSearch(arr, target) {
    const n = arr.length;

    // If target is present at first location itself
    if (arr[0] === target) {
        return 0;
    }

    // Find range for binary search by repeated doubling
    let i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }

    // Call binary search for the found range
    const left = Math.floor(i / 2);
    const right = Math.min(i, n - 1);

    return binarySearch(arr, target, left, right);
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
const target = 17;
const result = exponentialSearch(arr, target);
console.log(`Exponential Search: Element ${target} found at index: ${result}`);

const notFound = exponentialSearch(arr, 10);
console.log(`Exponential Search: Element 10 found at index: ${notFound}`);
