// Rod Cutting Problem
// Time Complexity: O(n^2)
// Space Complexity: O(n)
// Maximize revenue by cutting a rod of length n into pieces

// Standard DP approach (Bottom-Up)
function rodCutting(prices, n) {
    // dp[i] = maximum revenue for rod of length i
    const dp = new Array(n + 1).fill(0);
    const cuts = new Array(n + 1).fill(0); // Track first cut for each length

    for (let i = 1; i <= n; i++) {
        let maxRevenue = -Infinity;
        for (let j = 1; j <= i; j++) {
            const revenue = prices[j - 1] + dp[i - j];
            if (revenue > maxRevenue) {
                maxRevenue = revenue;
                cuts[i] = j;
            }
        }
        dp[i] = maxRevenue;
    }

    // Reconstruct the cuts
    const pieces = [];
    let length = n;
    while (length > 0) {
        pieces.push(cuts[length]);
        length -= cuts[length];
    }

    return {
        maxRevenue: dp[n],
        pieces,
        dpTable: dp
    };
}

// Recursive with memoization (Top-Down)
function rodCuttingMemoized(prices, n) {
    const memo = {};

    function solve(length) {
        if (length === 0) return 0;
        if (memo[length] !== undefined) return memo[length];

        let maxRevenue = -Infinity;
        for (let i = 1; i <= length; i++) {
            maxRevenue = Math.max(maxRevenue, prices[i - 1] + solve(length - i));
        }

        memo[length] = maxRevenue;
        return maxRevenue;
    }

    return solve(n);
}

// With all possible cuts tracking
function rodCuttingWithAllCuts(prices, n) {
    const dp = new Array(n + 1).fill(0);
    const allCuts = new Array(n + 1).fill(null).map(() => []);

    for (let i = 1; i <= n; i++) {
        let maxRevenue = -Infinity;
        for (let j = 1; j <= i; j++) {
            const revenue = prices[j - 1] + dp[i - j];
            if (revenue > maxRevenue) {
                maxRevenue = revenue;
                allCuts[i] = [j, ...allCuts[i - j]];
            }
        }
        dp[i] = maxRevenue;
    }

    return {
        maxRevenue: dp[n],
        pieces: allCuts[n]
    };
}

// Example usage
// prices[i] = price of rod piece of length i+1
const prices = [1, 5, 8, 9, 10, 17, 17, 20, 24, 30];
const n = 8;

console.log('Rod Cutting Problem');
console.log('Prices by length:', prices.map((p, i) => `Length ${i + 1}: $${p}`).join(', '));
console.log('Rod length:', n);

const result = rodCutting(prices, n);
console.log('\nRod Cutting Result (Bottom-Up):');
console.log('Maximum Revenue:', result.maxRevenue);
console.log('Optimal pieces:', result.pieces);
console.log('Piece breakdown:', result.pieces.map(p => `Length ${p} = $${prices[p - 1]}`).join(' + '));

console.log('\nMemoized result:', rodCuttingMemoized(prices, n));

// Another example
const prices2 = [2, 5, 7, 8];
const n2 = 4;
console.log('\n--- Smaller Example ---');
console.log('Prices:', prices2);
console.log('Length:', n2);
const result2 = rodCutting(prices2, n2);
console.log('Max Revenue:', result2.maxRevenue);
console.log('Pieces:', result2.pieces);
