// 0/1 Knapsack Problem
// Time Complexity: O(n * W)
// Space Complexity: O(n * W) or O(W) optimized
// Each item can be taken at most once

// Standard DP approach with full table
function knapsack01(weights, values, capacity) {
    const n = weights.length;
    if (n === 0 || capacity <= 0) return { maxValue: 0, items: [] };

    // dp[i][w] = maximum value using first i items with capacity w
    const dp = [];
    for (let i = 0; i <= n; i++) {
        dp[i] = new Array(capacity + 1).fill(0);
    }

    // Fill the DP table
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            // Don't take item i
            dp[i][w] = dp[i - 1][w];

            // Take item i (if possible)
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]
                );
            }
        }
    }

    // Backtrack to find which items were taken
    const items = [];
    let i = n, w = capacity;
    while (i > 0 && w > 0) {
        if (dp[i][w] !== dp[i - 1][w]) {
            items.unshift(i - 1); // 0-indexed item
            w -= weights[i - 1];
        }
        i--;
    }

    return {
        maxValue: dp[n][capacity],
        items,
        dpTable: dp
    };
}

// Space optimized version (only maxValue)
function knapsack01Optimized(weights, values, capacity) {
    const n = weights.length;
    if (n === 0 || capacity <= 0) return 0;

    // Use only one row
    const dp = new Array(capacity + 1).fill(0);

    for (let i = 0; i < n; i++) {
        // Traverse from right to left to avoid using same item twice
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }

    return dp[capacity];
}

// Recursive with memoization
function knapsack01Memoized(weights, values, capacity) {
    const n = weights.length;
    const memo = {};

    function solve(index, remainingCapacity) {
        if (index === n || remainingCapacity <= 0) {
            return 0;
        }

        const key = `${index},${remainingCapacity}`;
        if (memo[key] !== undefined) {
            return memo[key];
        }

        // Don't take current item
        let result = solve(index + 1, remainingCapacity);

        // Take current item (if possible)
        if (weights[index] <= remainingCapacity) {
            result = Math.max(
                result,
                values[index] + solve(index + 1, remainingCapacity - weights[index])
            );
        }

        memo[key] = result;
        return result;
    }

    return solve(0, capacity);
}

// Example usage
const weights = [2, 3, 4, 5];
const values = [3, 4, 5, 6];
const capacity = 8;

console.log('Weights:', weights);
console.log('Values:', values);
console.log('Capacity:', capacity);

const result = knapsack01(weights, values, capacity);
console.log('\n0/1 Knapsack (Full DP):');
console.log('Maximum Value:', result.maxValue);
console.log('Items taken (indices):', result.items);
console.log('Items taken (weights):', result.items.map(i => weights[i]));
console.log('Items taken (values):', result.items.map(i => values[i]));

console.log('\n0/1 Knapsack (Optimized):', knapsack01Optimized(weights, values, capacity));
console.log('0/1 Knapsack (Memoized):', knapsack01Memoized(weights, values, capacity));
