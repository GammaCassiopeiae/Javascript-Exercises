// Coin Change Problem
// Multiple variations with DP solutions

// 1. Minimum number of coins to make a target amount
// Time Complexity: O(n * amount)
// Space Complexity: O(amount)
function coinChangeMinCoins(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }

    return dp[amount] === Infinity ? -1 : dp[amount];
}

// With coin tracking (returns which coins were used)
function coinChangeWithTracking(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    const parent = new Array(amount + 1).fill(-1);
    dp[0] = 0;

    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                parent[i] = coin;
            }
        }
    }

    if (dp[amount] === Infinity) {
        return { count: -1, coins: [] };
    }

    // Reconstruct the coins used
    const usedCoins = [];
    let current = amount;
    while (current > 0) {
        usedCoins.push(parent[current]);
        current -= parent[current];
    }

    return { count: dp[amount], coins: usedCoins };
}

// 2. Count number of ways to make amount
// Time Complexity: O(n * amount)
// Space Complexity: O(amount)
function coinChangeCountWays(coins, amount) {
    const dp = new Array(amount + 1).fill(0);
    dp[0] = 1; // One way to make 0 (use no coins)

    for (const coin of coins) {
        for (let i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }

    return dp[amount];
}

// 3. Recursive with memoization
function coinChangeMemoized(coins, amount) {
    const memo = {};

    function solve(remaining) {
        if (remaining === 0) return 0;
        if (remaining < 0) return Infinity;
        if (memo[remaining] !== undefined) return memo[remaining];

        let minCoins = Infinity;
        for (const coin of coins) {
            const result = solve(remaining - coin);
            if (result !== Infinity) {
                minCoins = Math.min(minCoins, result + 1);
            }
        }

        memo[remaining] = minCoins;
        return minCoins;
    }

    const result = solve(amount);
    return result === Infinity ? -1 : result;
}

// Example usage
const coins = [1, 3, 4, 5];
const amount = 7;

console.log('Coins:', coins);
console.log('Target Amount:', amount);

console.log('\nMinimum coins needed:', coinChangeMinCoins(coins, amount));

const tracked = coinChangeWithTracking(coins, amount);
console.log('With tracking - Count:', tracked.count, 'Coins used:', tracked.coins);

console.log('\nNumber of ways to make amount:', coinChangeCountWays(coins, amount));

console.log('\nMemoized result:', coinChangeMemoized(coins, amount));

// Another example
const coins2 = [2, 5, 10, 20];
const amount2 = 23;
console.log(`\nCoins: ${coins2}, Amount: ${amount2}`);
console.log('Minimum coins:', coinChangeMinCoins(coins2, amount2));
console.log('Ways to make amount:', coinChangeCountWays(coins2, amount2));
