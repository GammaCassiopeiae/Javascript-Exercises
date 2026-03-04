// Linear Search Algorithm
// Time Complexity: O(n)
// Space Complexity: O(1)

function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Return index if found
        }
    }
    return -1; // Return -1 if not found
}

// Example usage
const arr = [64, 34, 25, 12, 22, 11, 90];
const target = 22;
const result = linearSearch(arr, target);
console.log(`Linear Search: Element ${target} found at index: ${result}`);

const notFound = linearSearch(arr, 100);
console.log(`Linear Search: Element 100 found at index: ${notFound}`);
