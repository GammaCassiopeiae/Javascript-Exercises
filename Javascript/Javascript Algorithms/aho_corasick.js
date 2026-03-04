// Aho-Corasick Algorithm
// Time Complexity: O(n + m + z) where n = text length, m = total pattern length, z = number of matches
// Space Complexity: O(m * k) where k = alphabet size
// Multiple pattern string matching using finite automaton

class AhoCorasickNode {
    constructor() {
        this.children = {};
        this.fail = null;
        this.output = []; // Patterns ending at this node
        this.depth = 0;
    }
}

class AhoCorasick {
    constructor() {
        this.root = new AhoCorasickNode();
        this.patterns = [];
    }

    // Add pattern to automaton
    addPattern(pattern) {
        this.patterns.push(pattern);
        let node = this.root;

        for (let i = 0; i < pattern.length; i++) {
            const char = pattern[i];
            if (!node.children[char]) {
                node.children[char] = new AhoCorasickNode();
                node.children[char].depth = i + 1;
            }
            node = node.children[char];
        }

        node.output.push(pattern);
    }

    // Build failure links using BFS
    buildFailureLinks() {
        const queue = [];

        // Initialize: depth-1 nodes fail to root
        for (const char in this.root.children) {
            this.root.children[char].fail = this.root;
            queue.push(this.root.children[char]);
        }

        // BFS to build failure links
        while (queue.length > 0) {
            const currentNode = queue.shift();

            for (const char in currentNode.children) {
                const childNode = currentNode.children[char];
                queue.push(childNode);

                // Find failure state
                let failNode = currentNode.fail;
                while (failNode && !failNode.children[char]) {
                    failNode = failNode.fail;
                }

                childNode.fail = failNode ? failNode.children[char] : this.root;

                // Merge output
                childNode.output = [...childNode.output, ...childNode.fail.output];
            }
        }
    }

    // Search for all patterns in text
    search(text) {
        if (this.patterns.length === 0) return [];

        const results = [];
        let node = this.root;

        for (let i = 0; i < text.length; i++) {
            const char = text[i];

            // Follow failure links until we find a match or reach root
            while (node && !node.children[char]) {
                node = node.fail;
            }

            if (node && node.children[char]) {
                node = node.children[char];
            } else {
                node = this.root;
            }

            // Record all matches at current position
            for (const pattern of node.output) {
                results.push({
                    pattern,
                    position: i - pattern.length + 1,
                    endIndex: i
                });
            }
        }

        return results;
    }

    // Search and group by pattern
    searchGrouped(text) {
        const results = this.search(text);
        const grouped = {};

        for (const pattern of this.patterns) {
            grouped[pattern] = [];
        }

        for (const result of results) {
            grouped[result.pattern].push(result.position);
        }

        return grouped;
    }

    // Count occurrences of each pattern
    countOccurrences(text) {
        const results = this.search(text);
        const counts = {};

        for (const pattern of this.patterns) {
            counts[pattern] = 0;
        }

        for (const result of results) {
            counts[result.pattern]++;
        }

        return counts;
    }
}

// Convenience function for simple search
function ahoCorasickSearch(text, patterns) {
    const ac = new AhoCorasick();
    for (const pattern of patterns) {
        ac.addPattern(pattern);
    }
    ac.buildFailureLinks();
    return ac.search(text);
}

// Example usage
console.log('Aho-Corasick Algorithm');
console.log('======================');

const text = 'ABCCDDAEFGABCDAEFGHABCD';
const patterns = ['ABCD', 'AEFG', 'BCD', 'CD'];

console.log('Text:', text);
console.log('Patterns:', patterns);

const ac = new AhoCorasick();
for (const pattern of patterns) {
    ac.addPattern(pattern);
}
ac.buildFailureLinks();

const results = ac.search(text);
console.log('\nAll matches:');
results.forEach(r => {
    console.log(`  "${r.pattern}" at position ${r.position}`);
});

// Grouped results
console.log('\n--- Grouped by Pattern ---');
const grouped = ac.searchGrouped(text);
for (const [pattern, positions] of Object.entries(grouped)) {
    console.log(`"${pattern}": ${positions}`);
}

// Count occurrences
console.log('\n--- Count Occurrences ---');
const counts = ac.countOccurrences(text);
for (const [pattern, count] of Object.entries(counts)) {
    console.log(`"${pattern}": ${count}`);
}

// More examples
console.log('\n--- More Examples ---');

const text2 = 'ushers';
const patterns2 = ['he', 'she', 'his', 'hers'];

console.log(`\nText: "${text2}"`);
console.log('Patterns:', patterns2);

const results2 = ahoCorasickSearch(text2, patterns2);
console.log('Matches:');
results2.forEach(r => {
    console.log(`  "${r.pattern}" at position ${r.position}`);
});

// Real-world example: keyword detection
console.log('\n--- Keyword Detection Example ---');
const article = 'JavaScript is a versatile programming language. Many developers love JavaScript for its flexibility.';
const keywords = ['JavaScript', 'developers', 'programming', 'Python'];

const ac2 = new AhoCorasick();
for (const keyword of keywords) {
    ac2.addPattern(keyword);
}
ac2.buildFailureLinks();

const keywordResults = ac2.searchGrouped(article);
console.log('Article:', article);
console.log('\nKeywords found:');
for (const [keyword, positions] of Object.entries(keywordResults)) {
    if (positions.length > 0) {
        console.log(`  "${keyword}": ${positions.length} occurrence(s) at ${positions}`);
    } else {
        console.log(`  "${keyword}": not found`);
    }
}
