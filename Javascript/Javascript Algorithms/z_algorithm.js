// Z-Algorithm
// Time Complexity: O(n + m) where n = text length, m = pattern length
// Space Complexity: O(m)
// String matching using Z-array (Z-values)

// Compute Z-array for a string
// Z[i] = length of longest substring starting at i that is also a prefix
function computeZArray(str) {
    const n = str.length;
    const Z = new Array(n).fill(0);

    let left = 0;
    let right = 0;

    for (let i = 1; i < n; i++) {
        // If i is inside the current Z-box
        if (i < right) {
            Z[i] = Math.min(right - i, Z[i - left]);
        }

        // Naive extension
        while (i + Z[i] < n && str[Z[i]] === str[i + Z[i]]) {
            Z[i]++;
        }

        // Update Z-box if we extended past right
        if (i + Z[i] > right) {
            left = i;
            right = i + Z[i];
        }
    }

    return Z;
}

// Z-Algorithm Pattern Matching
function zAlgorithmSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) return [];
    if (m > n) return [];

    // Concatenate pattern + special character + text
    const concat = pattern + '$' + text;
    const Z = computeZArray(concat);

    const occurrences = [];

    // Check Z-values in the text portion
    for (let i = m + 1; i < concat.length; i++) {
        if (Z[i] === m) {
            // Pattern found at position i - (m + 1) in text
            occurrences.push(i - (m + 1));
        }
    }

    return occurrences;
}

// Find first occurrence
function zAlgorithmFirst(text, pattern) {
    const occurrences = zAlgorithmSearch(text, pattern);
    return occurrences.length > 0 ? occurrences[0] : -1;
}

// Count occurrences
function zAlgorithmCount(text, pattern) {
    return zAlgorithmSearch(text, pattern).length;
}

// Find all occurrences with context
function zAlgorithmWithContext(text, pattern, contextLength = 5) {
    const occurrences = zAlgorithmSearch(text, pattern);

    return occurrences.map(pos => ({
        position: pos,
        context: text.substring(
            Math.max(0, pos - contextLength),
            Math.min(text.length, pos + pattern.length + contextLength)
        ),
        match: text.substring(pos, pos + pattern.length)
    }));
}

// Example usage
console.log('Z-Algorithm');
console.log('===========');

const text = 'ABABDABACDABABCABAB';
const pattern = 'ABAB';

console.log('Text:', text);
console.log('Pattern:', pattern);

// Show Z-array for pattern
const zPattern = computeZArray(pattern);
console.log('Z-array for pattern:', zPattern);

// Show Z-array for concatenated string
const concat = pattern + '$' + text;
const zConcat = computeZArray(concat);
console.log('Z-array for concatenated string:', zConcat);

// Search results
const occurrences = zAlgorithmSearch(text, pattern);
console.log('Pattern found at positions:', occurrences);

// More examples
console.log('\n--- More Examples ---');

const text2 = 'GEEKS FOR GEEKS';
const pattern2 = 'GEEK';
console.log(`\nText: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log('Positions:', zAlgorithmSearch(text2, pattern2));

// Count example
console.log('\n--- Count Example ---');
const text3 = 'AAAAA';
const pattern3 = 'AA';
console.log(`"${pattern3}" appears ${zAlgorithmCount(text3, pattern3)} times in "${text3}"`);
console.log('Positions:', zAlgorithmSearch(text3, pattern3));

// With context
console.log('\n--- With Context ---');
const text4 = 'The quick brown fox jumps over the lazy dog';
const pattern4 = 'fox';
const results = zAlgorithmWithContext(text4, pattern4, 10);
results.forEach(r => {
    console.log(`Position ${r.position}: "...${r.context}..."`);
});

// First occurrence
console.log('\n--- First Occurrence ---');
console.log(`First position of "${pattern}" in "${text}":`, zAlgorithmFirst(text, pattern));

// Edge cases
console.log('\n--- Edge Cases ---');
console.log('Empty pattern:', zAlgorithmSearch('hello', ''));
console.log('Pattern longer than text:', zAlgorithmSearch('hi', 'hello'));
console.log('Pattern equals text:', zAlgorithmSearch('hello', 'hello'));
console.log('No match:', zAlgorithmSearch('hello', 'world'));

// Overlapping patterns
console.log('\n--- Overlapping Patterns ---');
const text5 = 'ABABABAB';
const pattern5 = 'ABAB';
console.log(`Text: ${text5}, Pattern: ${pattern5}`);
console.log('Positions (including overlaps):', zAlgorithmSearch(text5, pattern5));
