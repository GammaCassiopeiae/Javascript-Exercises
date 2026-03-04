// Edit Distance (Levenshtein Distance)
// Time Complexity: O(m * n)
// Space Complexity: O(m * n) or O(min(m, n)) optimized
// Minimum operations to convert str1 to str2 (insert, delete, replace)

// Standard DP approach with full table
function editDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // dp[i][j] = edit distance between str1[0..i-1] and str2[0..j-1]
    const dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }

    // Base cases
    for (let i = 0; i <= m; i++) dp[i][0] = i; // Delete all from str1
    for (let j = 0; j <= n; j++) dp[0][j] = j; // Insert all to str1

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1]; // No operation needed
            } else {
                dp[i][j] = 1 + Math.min(
                    dp[i - 1][j],     // Delete from str1
                    dp[i][j - 1],     // Insert into str1
                    dp[i - 1][j - 1]  // Replace in str1
                );
            }
        }
    }

    // Backtrack to find operations
    const operations = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0 && str1[i - 1] === str2[j - 1]) {
            operations.unshift({ type: 'match', char: str1[i - 1], pos1: i - 1, pos2: j - 1 });
            i--;
            j--;
        } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
            operations.unshift({ type: 'replace', from: str1[i - 1], to: str2[j - 1], pos: i - 1 });
            i--;
            j--;
        } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            operations.unshift({ type: 'delete', char: str1[i - 1], pos: i - 1 });
            i--;
        } else {
            operations.unshift({ type: 'insert', char: str2[j - 1], pos: j - 1 });
            j--;
        }
    }

    return {
        distance: dp[m][n],
        operations,
        dpTable: dp
    };
}

// Space optimized version (only distance)
function editDistanceOptimized(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Use only two rows
    let prev = new Array(n + 1).fill(0);
    let curr = new Array(n + 1).fill(0);

    for (let j = 0; j <= n; j++) prev[j] = j;

    for (let i = 1; i <= m; i++) {
        curr[0] = i;
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = prev[j - 1];
            } else {
                curr[j] = 1 + Math.min(prev[j], curr[j - 1], prev[j - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }

    return prev[n];
}

// Recursive with memoization
function editDistanceMemoized(str1, str2) {
    const memo = {};

    function solve(i, j) {
        if (i === 0) return j;
        if (j === 0) return i;

        const key = `${i},${j}`;
        if (memo[key] !== undefined) return memo[key];

        if (str1[i - 1] === str2[j - 1]) {
            memo[key] = solve(i - 1, j - 1);
        } else {
            memo[key] = 1 + Math.min(
                solve(i - 1, j),     // Delete
                solve(i, j - 1),     // Insert
                solve(i - 1, j - 1)  // Replace
            );
        }

        return memo[key];
    }

    return solve(str1.length, str2.length);
}

// Example usage
const str1 = "kitten";
const str2 = "sitting";

console.log(`Edit Distance from "${str1}" to "${str2}":`);
const result = editDistance(str1, str2);
console.log('Distance:', result.distance);
console.log('Operations:');
result.operations.forEach(op => {
    console.log(`  ${op.type}: ${JSON.stringify(op)}`);
});

console.log('\nOptimized:', editDistanceOptimized(str1, str2));
console.log('Memoized:', editDistanceMemoized(str1, str2));

// Another example
const s1 = "horse";
const s2 = "ros";
console.log(`\n"${s1}" -> "${s2}":`, editDistance(s1, s2).distance);
