// KMP (Knuth-Morris-Pratt) Algorithm
// Time Complexity: O(n + m) where n = text length, m = pattern length
// Space Complexity: O(m)
// Efficient string matching algorithm using failure function

// Compute the LPS (Longest Proper Prefix which is also Suffix) array
function computeLPS(pattern) {
    const m = pattern.length;
    const lps = new Array(m).fill(0);
    let len = 0; // Length of previous longest prefix suffix
    let i = 1;

    while (i < m) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}

// KMP Search - Find all occurrences
function kmpSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) return [];
    if (m > n) return [];

    const lps = computeLPS(pattern);
    const occurrences = [];

    let i = 0; // Index for text
    let j = 0; // Index for pattern

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            // Pattern found
            occurrences.push(i - j);
            j = lps[j - 1];
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return occurrences;
}

// KMP Search - Find first occurrence only
function kmpSearchFirst(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) return 0;
    if (m > n) return -1;

    const lps = computeLPS(pattern);

    let i = 0;
    let j = 0;

    while (i < n) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === m) {
            return i - j;
        } else if (i < n && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return -1;
}

// KMP Search with count
function kmpSearchCount(text, pattern) {
    const occurrences = kmpSearch(text, pattern);
    return {
        count: occurrences.length,
        positions: occurrences
    };
}

// Example usage
console.log('KMP (Knuth-Morris-Pratt) Algorithm');
console.log('===================================');

const text = 'ABABDABACDABABCABAB';
const pattern = 'ABABCABAB';

console.log('Text:', text);
console.log('Pattern:', pattern);

const lps = computeLPS(pattern);
console.log('LPS Array:', lps);

const occurrences = kmpSearch(text, pattern);
console.log('Pattern found at positions:', occurrences);

// More examples
console.log('\n--- More Examples ---');

const text2 = 'AABAACAADAABAABA';
const pattern2 = 'AABA';
console.log(`\nText: ${text2}`);
console.log(`Pattern: ${pattern2}`);
console.log('LPS:', computeLPS(pattern2));
console.log('Occurrences:', kmpSearch(text2, pattern2));

// Count example
console.log('\n--- Count Example ---');
const text3 = 'GEEKS FOR GEEKS';
const pattern3 = 'GEEKS';
const result = kmpSearchCount(text3, pattern3);
console.log(`"${pattern3}" appears ${result.count} times in "${text3}"`);
console.log('Positions:', result.positions);

// Edge cases
console.log('\n--- Edge Cases ---');
console.log('Empty pattern:', kmpSearch('hello', ''));
console.log('Pattern longer than text:', kmpSearch('hi', 'hello'));
console.log('Pattern equals text:', kmpSearch('hello', 'hello'));
console.log('No match:', kmpSearch('hello', 'world'));
