// Jump Search Algorithm
// Time Complexity: O(√n)
// Space Complexity: O(1)
// Note: Array must be sorted

function jumpSearch(arr, target) {
    const n = arr.length;
    const step = Math.floor(Math.sqrt(n));
    let prev = 0;

    // Finding the block where the element is present
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }

    // Linear search within the block
    while (arr[prev] < target) {
        prev++;
        if (prev >= Math.min(step, n)) {
            return -1;
        }
    }

    // If element is found
    if (arr[prev] === target) {
        return prev;
    }

    return -1;
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29];
const target = 17;
const result = jumpSearch(arr, target);
console.log(`Jump Search: Element ${target} found at index: ${result}`);

const notFound = jumpSearch(arr, 10);
console.log(`Jump Search: Element 10 found at index: ${notFound}`);
