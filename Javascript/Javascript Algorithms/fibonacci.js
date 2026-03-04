// Fibonacci Sequence - Multiple Approaches
// Time and Space complexities vary by approach

// 1. Naive Recursive (exponential time - for educational purposes)
function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

// 2. Memoized Recursive (Top-Down DP)
// Time Complexity: O(n), Space Complexity: O(n)
function fibonacciMemoized(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fibonacciMemoized(n - 1, memo) + fibonacciMemoized(n - 2, memo);
    return memo[n];
}

// 3. Tabulation (Bottom-Up DP)
// Time Complexity: O(n), Space Complexity: O(n)
function fibonacciTabulation(n) {
    if (n <= 1) return n;

    const dp = [0, 1];
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 4. Space Optimized (Best for single value)
// Time Complexity: O(n), Space Complexity: O(1)
function fibonacciOptimized(n) {
    if (n <= 1) return n;

    let prev2 = 0;
    let prev1 = 1;
    let current;

    for (let i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    return current;
}

// 5. Matrix Exponentiation (for very large n)
// Time Complexity: O(log n), Space Complexity: O(1)
function fibonacciMatrix(n) {
    if (n <= 1) return n;

    function multiply(a, b) {
        return [
            [a[0][0] * b[0][0] + a[0][1] * b[1][0], a[0][0] * b[0][1] + a[0][1] * b[1][1]],
            [a[1][0] * b[0][0] + a[1][1] * b[1][0], a[1][0] * b[0][1] + a[1][1] * b[1][1]]
        ];
    }

    function power(matrix, n) {
        if (n === 1) return matrix;
        if (n % 2 === 0) {
            const half = power(matrix, n / 2);
            return multiply(half, half);
        }
        return multiply(matrix, power(matrix, n - 1));
    }

    const base = [[1, 1], [1, 0]];
    const result = power(base, n);
    return result[0][1];
}

// Example usage
const n = 10;
console.log(`Fibonacci(${n}) - Recursive: ${fibonacciRecursive(n)}`);
console.log(`Fibonacci(${n}) - Memoized: ${fibonacciMemoized(n)}`);
console.log(`Fibonacci(${n}) - Tabulation: ${fibonacciTabulation(n)}`);
console.log(`Fibonacci(${n}) - Optimized: ${fibonacciOptimized(n)}`);
console.log(`Fibonacci(${n}) - Matrix: ${fibonacciMatrix(n)}`);

// Generate first n Fibonacci numbers
function generateFibonacci(count) {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(fibonacciOptimized(i));
    }
    return result;
}

console.log('First 15 Fibonacci numbers:', generateFibonacci(15));
