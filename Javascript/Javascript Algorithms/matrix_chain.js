// Matrix Chain Multiplication
// Time Complexity: O(n^3)
// Space Complexity: O(n^2)
// Find optimal parenthesization to minimize scalar multiplications

// Standard DP approach
function matrixChainMultiplication(dimensions) {
    const n = dimensions.length - 1; // Number of matrices

    if (n <= 0) return { multiplications: 0, parenthesization: '' };

    // m[i][j] = minimum multiplications for matrices i to j
    const m = [];
    // s[i][j] = optimal split point for matrices i to j
    const s = [];

    for (let i = 0; i <= n; i++) {
        m[i] = new Array(n + 1).fill(0);
        s[i] = new Array(n + 1).fill(0);
    }

    // l is the chain length
    for (let l = 2; l <= n; l++) {
        for (let i = 1; i <= n - l + 1; i++) {
            const j = i + l - 1;
            m[i][j] = Infinity;

            for (let k = i; k < j; k++) {
                // Cost = cost of left part + cost of right part + cost of multiplication
                const cost = m[i][k] + m[k + 1][j] + dimensions[i - 1] * dimensions[k] * dimensions[j];

                if (cost < m[i][j]) {
                    m[i][j] = cost;
                    s[i][j] = k;
                }
            }
        }
    }

    // Construct optimal parenthesization
    function constructParenthesization(i, j) {
        if (i === j) {
            return `A${i}`;
        }
        const k = s[i][j];
        const left = constructParenthesization(i, k);
        const right = constructParenthesization(k + 1, j);
        return `(${left} × ${right})`;
    }

    return {
        multiplications: m[1][n],
        parenthesization: constructParenthesization(1, n),
        dpTable: m,
        splitTable: s
    };
}

// Recursive with memoization
function matrixChainMemoized(dimensions) {
    const n = dimensions.length - 1;
    const memo = {};

    function solve(i, j) {
        if (i === j) return 0;

        const key = `${i},${j}`;
        if (memo[key] !== undefined) return memo[key];

        let minCost = Infinity;
        for (let k = i; k < j; k++) {
            const cost = solve(i, k) + solve(k + 1, j) + dimensions[i - 1] * dimensions[k] * dimensions[j];
            minCost = Math.min(minCost, cost);
        }

        memo[key] = minCost;
        return minCost;
    }

    return solve(1, n);
}

// Print optimal parenthesization
function printParenthesization(s, i, j) {
    if (i === j) {
        return `A${i}`;
    }
    const k = s[i][j];
    const left = printParenthesization(s, i, k);
    const right = printParenthesization(s, k + 1, j);
    return `(${left}${right})`;
}

// Example usage
// Matrix dimensions: A1(30x35), A2(35x15), A3(15x5), A4(5x10), A5(10x20), A6(20x25)
const dimensions = [30, 35, 15, 5, 10, 20, 25];

console.log('Matrix dimensions:', dimensions);
console.log('Number of matrices:', dimensions.length - 1);

const result = matrixChainMultiplication(dimensions);
console.log('\nMatrix Chain Multiplication Result:');
console.log('Minimum scalar multiplications:', result.multiplications);
console.log('Optimal parenthesization:', result.parenthesization);

console.log('\nMemoized result:', matrixChainMemoized(dimensions));

// Smaller example
const dims2 = [10, 20, 30, 40, 30];
console.log('\n--- Smaller Example ---');
console.log('Dimensions:', dims2);
const result2 = matrixChainMultiplication(dims2);
console.log('Minimum multiplications:', result2.multiplications);
console.log('Parenthesization:', result2.parenthesization);
