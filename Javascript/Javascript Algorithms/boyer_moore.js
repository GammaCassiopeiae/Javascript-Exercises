// Boyer-Moore Algorithm
// Time Complexity: O(n*m) worst case, O(n/m) best case
// Space Complexity: O(k) where k = alphabet size
// Efficient string matching using bad character and good suffix heuristics

// Bad Character Heuristic
function computeBadCharTable(pattern) {
    const table = {};
    const m = pattern.length;

    // Initialize all characters to -1
    for (let i = 0; i < m; i++) {
        table[pattern[i]] = -1;
    }

    // Fill with actual positions
    for (let i = 0; i < m; i++) {
        table[pattern[i]] = i;
    }

    return table;
}

// Good Suffix Heuristic
function computeGoodSuffixTable(pattern) {
    const m = pattern.length;
    const border = new Array(m).fill(0);
    const suffix = new Array(m).fill(0);

    // Compute suffix array
    for (let i = m - 2; i >= 0; i--) {
        let j = i;
        let k = m - 1;
        while (j >= 0 && pattern[j] === pattern[k]) {
            j--;
            k--;
            suffix[i] = i - j;
        }
    }

    // Compute border array
    for (let i = 0; i < m - 1; i++) {
        border[i] = m - 1;
    }

    let j = m - 1;
    for (let i = m - 2; i >= 0; i--) {
        if (suffix[i] === i + 1) {
            while (j < m - 1 - suffix[i]) {
                if (border[j] === m - 1) {
                    border[j] = m - 1 - i;
                }
                j++;
            }
        }
    }

    for (let i = 0; i < m - 1; i++) {
        border[m - 1 - suffix[i]] = m - 1 - i;
    }

    return border;
}

// Boyer-Moore Search (simplified version using bad character heuristic)
function boyerMooreSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) return [];
    if (m > n) return [];

    const badChar = computeBadCharTable(pattern);
    const occurrences = [];

    let shift = 0;

    while (shift <= n - m) {
        let j = m - 1;

        // Compare pattern from right to left
        while (j >= 0 && pattern[j] === text[shift + j]) {
            j--;
        }

        if (j < 0) {
            // Pattern found
            occurrences.push(shift);
            // Shift pattern past the match
            shift += (shift + m < n) ? m - badChar[text[shift + m]] || m : 1;
        } else {
            // Shift using bad character heuristic
            const badCharShift = j - (badChar[text[shift + j]] ?? -1);
            shift += Math.max(1, badCharShift);
        }
    }

    return occurrences;
}

// Boyer-Moore-Horspool (simplified, practical version)
function boyerMooreHorspool(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) return [];
    if (m > n) return [];

    // Build bad character table (shift for last character of pattern)
    const shift = {};
    for (let i = 0; i < n; i++) {
        shift[text[i]] = m;
    }
    for (let i = 0; i < m - 1; i++) {
        shift[pattern[i]] = m - 1 - i;
    }

    const occurrences = [];
    let i = 0;

    while (i <= n - m) {
        let j = m - 1;

        while (j >= 0 && pattern[j] === text[i + j]) {
            j--;
        }

        if (j < 0) {
            occurrences.push(i);
            i += shift[text[i + m - 1]] || m;
        } else {
            i += shift[text[i + m - 1]] || m;
        }
    }

    return occurrences;
}

// Find first occurrence
function boyerMooreFirst(text, pattern) {
    const occurrences = boyerMooreSearch(text, pattern);
    return occurrences.length > 0 ? occurrences[0] : -1;
}

// Example usage
console.log('Boyer-Moore Algorithm');
console.log('=====================');

const text = 'ABAAABCDABCDAABCDA';
const pattern = 'ABCD';

console.log('Text:', text);
console.log('Pattern:', pattern);

const occurrences = boyerMooreSearch(text, pattern);
console.log('Pattern found at positions:', occurrences);

// Horspool version
console.log('\n--- Horspool Version ---');
const occurrencesHorspool = boyerMooreHorspool(text, pattern);
console.log('Positions (Horspool):', occurrencesHorspool);

// More examples
console.log('\n--- More Examples ---');

const text2 = 'HERE IS A SIMPLE EXAMPLE';
const pattern2 = 'EXAMPLE';
console.log(`\nText: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log('Positions:', boyerMooreSearch(text2, pattern2));

// Multiple occurrences
console.log('\n--- Multiple Occurrences ---');
const text3 = 'AABAACAADAABAABA';
const pattern3 = 'AABA';
console.log(`Text: ${text3}`);
console.log(`Pattern: ${pattern3}`);
console.log('Positions:', boyerMooreSearch(text3, pattern3));

// First occurrence
console.log('\n--- First Occurrence ---');
console.log(`First position of "${pattern}" in "${text}":`, boyerMooreFirst(text, pattern));

// Edge cases
console.log('\n--- Edge Cases ---');
console.log('Empty pattern:', boyerMooreSearch('hello', ''));
console.log('Pattern longer than text:', boyerMooreSearch('hi', 'hello'));
console.log('Pattern equals text:', boyerMooreSearch('hello', 'hello'));
console.log('No match:', boyerMooreSearch('hello', 'world'));
