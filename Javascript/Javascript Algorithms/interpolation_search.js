// Interpolation Search Algorithm
// Time Complexity: O(log log n) average, O(n) worst case
// Space Complexity: O(1)
// Note: Array must be sorted and uniformly distributed

function interpolationSearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;

    while (low <= high && target >= arr[low] && target <= arr[high]) {
        // Calculate the probable position using interpolation formula
        const pos = low + Math.floor(
            ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
        );

        if (arr[pos] === target) {
            return pos;
        }

        if (arr[pos] < target) {
            low = pos + 1;
        } else {
            high = pos - 1;
        }
    }

    return -1;
}

// Example usage
const arr = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
const target = 18;
const result = interpolationSearch(arr, target);
console.log(`Interpolation Search: Element ${target} found at index: ${result}`);

const notFound = interpolationSearch(arr, 15);
console.log(`Interpolation Search: Element 15 found at index: ${notFound}`);
