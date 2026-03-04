// Longest Common Subsequence (LCS)
// Time Complexity: O(m * n)
// Space Complexity: O(m * n) or O(min(m, n)) optimized

// Standard DP approach with full table
function lcs(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Create DP table
    const dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }

    // Fill the DP table
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack to find the LCS string
    const lcsString = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (str1[i - 1] === str2[j - 1]) {
            lcsString.unshift(str1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return {
        length: dp[m][n],
        sequence: lcsString.join(''),
        dpTable: dp
    };
}

// Space optimized version (only length)
function lcsOptimized(str1, str2) {
    const m = str1.length;
    const n = str2.length;

    // Use only two rows
    let prev = new Array(n + 1).fill(0);
    let curr = new Array(n + 1).fill(0);

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                curr[j] = prev[j - 1] + 1;
            } else {
                curr[j] = Math.max(prev[j], curr[j - 1]);
            }
        }
        [prev, curr] = [curr, prev];
    }

    return prev[n];
}

// For arrays
function lcsArrays(arr1, arr2) {
    const m = arr1.length;
    const n = arr2.length;

    const dp = [];
    for (let i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(0);
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (arr1[i - 1] === arr2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    // Backtrack
    const result = [];
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (arr1[i - 1] === arr2[j - 1]) {
            result.unshift(arr1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return { length: dp[m][n], sequence: result };
}

// Example usage
const str1 = "AGGTAB";
const str2 = "GXTXAYB";
const result = lcs(str1, str2);
console.log(`LCS of "${str1}" and "${str2}":`);
console.log('Length:', result.length);
console.log('Sequence:', result.sequence);

console.log('\nLCS (Optimized) Length:', lcsOptimized(str1, str2));

const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 5, 6, 7];
console.log('\nLCS of arrays:', lcsArrays(arr1, arr2));
