// Rabin-Karp Algorithm
// Time Complexity: O(n + m) average, O(n * m) worst case
// Space Complexity: O(1)
// String matching using rolling hash

// Simple polynomial rolling hash function
function createHash(str, prime, d) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * d + str.charCodeAt(i)) % prime;
    }
    return hash;
}

// Recalculate hash using previous hash value (rolling hash)
function recalculateHash(prevHash, prevChar, nextChar, patternLength, prime, d) {
    let newHash = ((prevHash - prevChar.charCodeAt(0) * Math.pow(d, patternLength - 1)) * d + nextChar.charCodeAt(0)) % prime;
    // Handle negative hash values
    if (newHash < 0) {
        newHash += prime;
    }
    return newHash;
}

// Rabin-Karp Search
function rabinKarpSearch(text, pattern, prime = 101, d = 256) {
    const n = text.length;
    const m = pattern.length;

    if (m === 0) return [];
    if (m > n) return [];

    const occurrences = [];

    // Calculate hash of pattern and first window of text
    let patternHash = createHash(pattern, prime, d);
    let textHash = createHash(text.substring(0, m), prime, d);

    // Precompute d^(m-1) % prime for rolling hash
    let highCharMultiplier = 1;
    for (let i = 0; i < m - 1; i++) {
        highCharMultiplier = (highCharMultiplier * d) % prime;
    }

    // Slide the pattern over the text
    for (let i = 0; i <= n - m; i++) {
        // Check if hashes match
        if (patternHash === textHash) {
            // Verify character by character to avoid hash collision
            let match = true;
            for (let j = 0; j < m; j++) {
                if (text[i + j] !== pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                occurrences.push(i);
            }
        }

        // Calculate hash for next window
        if (i < n - m) {
            textHash = recalculateHash(
                textHash,
                text[i],
                text[i + m],
                m,
                prime,
                d
            );
        }
    }

    return occurrences;
}

// Rabin-Karp with multiple patterns
function rabinKarpMultiplePatterns(text, patterns, prime = 101, d = 256) {
    const results = {};

    for (const pattern of patterns) {
        results[pattern] = rabinKarpSearch(text, pattern, prime, d);
    }

    return results;
}

// Find first occurrence
function rabinKarpFirst(text, pattern, prime = 101, d = 256) {
    const occurrences = rabinKarpSearch(text, pattern, prime, d);
    return occurrences.length > 0 ? occurrences[0] : -1;
}

// Count occurrences
function rabinKarpCount(text, pattern, prime = 101, d = 256) {
    return rabinKarpSearch(text, pattern, prime, d).length;
}

// Example usage
console.log('Rabin-Karp Algorithm');
console.log('====================');

const text = 'ABCCDDAEFGABCDAEFGH';
const pattern = 'AEFG';

console.log('Text:', text);
console.log('Pattern:', pattern);

const occurrences = rabinKarpSearch(text, pattern);
console.log('Pattern found at positions:', occurrences);

// More examples
console.log('\n--- More Examples ---');

const text2 = 'GEEKS FOR GEEKS';
const pattern2 = 'GEEK';
console.log(`\nText: "${text2}"`);
console.log(`Pattern: "${pattern2}"`);
console.log('Positions:', rabinKarpSearch(text2, pattern2));

// Multiple patterns
console.log('\n--- Multiple Patterns ---');
const text3 = 'AABAACAADAABAABA';
const patterns = ['AABA', 'ACA', 'DAA'];
const multiResults = rabinKarpMultiplePatterns(text3, patterns);
for (const [pattern, positions] of Object.entries(multiResults)) {
    console.log(`"${pattern}": ${positions}`);
}

// Count example
console.log('\n--- Count Example ---');
const text4 = 'ABABABABA';
const pattern4 = 'ABA';
console.log(`"${pattern4}" appears ${rabinKarpCount(text4, pattern4)} times in "${text4}"`);
console.log('Positions:', rabinKarpSearch(text4, pattern4));

// First occurrence
console.log('\n--- First Occurrence ---');
console.log(`First position of "${pattern}" in "${text}":`, rabinKarpFirst(text, pattern));

// Edge cases
console.log('\n--- Edge Cases ---');
console.log('Empty pattern:', rabinKarpSearch('hello', ''));
console.log('Pattern longer than text:', rabinKarpSearch('hi', 'hello'));
console.log('Pattern equals text:', rabinKarpSearch('hello', 'hello'));
console.log('No match:', rabinKarpSearch('hello', 'world'));

// Large prime for better hash distribution
console.log('\n--- With Large Prime ---');
const largePrime = 1000000007;
console.log('Positions (large prime):', rabinKarpSearch(text, pattern, largePrime));
