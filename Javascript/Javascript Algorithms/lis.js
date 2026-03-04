// Longest Increasing Subsequence (LIS)
// Multiple approaches with different time complexities

// 1. Dynamic Programming Approach
// Time Complexity: O(n^2)
// Space Complexity: O(n)
function lisDP(arr) {
    const n = arr.length;
    if (n === 0) return { length: 0, sequence: [] };

    // dp[i] = length of LIS ending at index i
    const dp = new Array(n).fill(1);
    const parent = new Array(n).fill(-1); // For reconstruction

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
                parent[i] = j;
            }
        }
    }

    // Find the index of maximum LIS length
    let maxLength = 0;
    let maxIndex = 0;
    for (let i = 0; i < n; i++) {
        if (dp[i] > maxLength) {
            maxLength = dp[i];
            maxIndex = i;
        }
    }

    // Reconstruct the sequence
    const sequence = [];
    let current = maxIndex;
    while (current !== -1) {
        sequence.unshift(arr[current]);
        current = parent[current];
    }

    return { length: maxLength, sequence };
}

// 2. Binary Search Approach (Optimal)
// Time Complexity: O(n log n)
// Space Complexity: O(n)
function lisBinarySearch(arr) {
    const n = arr.length;
    if (n === 0) return { length: 0, sequence: [] };

    // tails[i] = smallest tail element for LIS of length i+1
    const tails = [];
    const parent = new Array(n).fill(-1);
    const indices = []; // indices[i] = index in arr of tails[i]

    for (let i = 0; i < n; i++) {
        // Binary search for the position
        let left = 0;
        let right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < arr[i]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // Update or append
        if (left === tails.length) {
            tails.push(arr[i]);
            indices.push(i);
        } else {
            tails[left] = arr[i];
            indices[left] = i;
        }

        // Track parent for reconstruction
        if (left > 0) {
            parent[i] = indices[left - 1];
        }
    }

    // Reconstruct the sequence
    const sequence = [];
    let current = indices[indices.length - 1];
    while (current !== -1) {
        sequence.unshift(arr[current]);
        current = parent[current];
    }

    return { length: tails.length, sequence };
}

// 3. Longest Non-Decreasing Subsequence
function lndsBinarySearch(arr) {
    const n = arr.length;
    if (n === 0) return { length: 0, sequence: [] };

    const tails = [];
    const parent = new Array(n).fill(-1);
    const indices = [];

    for (let i = 0; i < n; i++) {
        let left = 0;
        let right = tails.length;
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] <= arr[i]) { // Note: <= for non-decreasing
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        if (left === tails.length) {
            tails.push(arr[i]);
            indices.push(i);
        } else {
            tails[left] = arr[i];
            indices[left] = i;
        }

        if (left > 0) {
            parent[i] = indices[left - 1];
        }
    }

    const sequence = [];
    let current = indices[indices.length - 1];
    while (current !== -1) {
        sequence.unshift(arr[current]);
        current = parent[current];
    }

    return { length: tails.length, sequence };
}

// Example usage
const arr = [10, 22, 9, 33, 21, 50, 41, 60, 80];
console.log('Array:', arr);

const dpResult = lisDP(arr);
console.log('\nLIS (DP O(n^2)):');
console.log('Length:', dpResult.length);
console.log('Sequence:', dpResult.sequence);

const bsResult = lisBinarySearch(arr);
console.log('\nLIS (Binary Search O(n log n)):');
console.log('Length:', bsResult.length);
console.log('Sequence:', bsResult.sequence);

const arr2 = [3, 10, 2, 1, 20];
console.log('\nArray:', arr2);
console.log('LIS Length:', lisBinarySearch(arr2).length);
