// Huffman Coding Algorithm
// Time Complexity: O(n log n)
// Space Complexity: O(n)
// Lossless data compression using variable-length prefix codes

class HuffmanNode {
    constructor(char, frequency) {
        this.char = char;
        this.frequency = frequency;
        this.left = null;
        this.right = null;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(node) {
        this.heap.push(node);
        this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown(0);
        return min;
    }

    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[parentIndex].frequency <= this.heap[index].frequency) break;

            [this.heap[parentIndex], this.heap[index]] = [this.heap[index], this.heap[parentIndex]];
            index = parentIndex;
        }
    }

    bubbleDown(index) {
        const length = this.heap.length;
        while (true) {
            const leftChild = 2 * index + 1;
            const rightChild = 2 * index + 2;
            let smallest = index;

            if (leftChild < length && this.heap[leftChild].frequency < this.heap[smallest].frequency) {
                smallest = leftChild;
            }
            if (rightChild < length && this.heap[rightChild].frequency < this.heap[smallest].frequency) {
                smallest = rightChild;
            }

            if (smallest === index) break;

            [this.heap[smallest], this.heap[index]] = [this.heap[index], this.heap[smallest]];
            index = smallest;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    size() {
        return this.heap.length;
    }
}

// Build Huffman Tree
function buildHuffmanTree(frequencies) {
    const heap = new MinHeap();

    // Create leaf nodes for each character
    for (const [char, freq] of Object.entries(frequencies)) {
        heap.insert(new HuffmanNode(char, freq));
    }

    // Build tree by combining two minimum frequency nodes
    while (heap.size() > 1) {
        const left = heap.extractMin();
        const right = heap.extractMin();

        const internalNode = new HuffmanNode(null, left.frequency + right.frequency);
        internalNode.left = left;
        internalNode.right = right;

        heap.insert(internalNode);
    }

    return heap.extractMin();
}

// Generate Huffman Codes
function generateHuffmanCodes(root) {
    const codes = {};

    function traverse(node, code) {
        if (!node) return;

        if (node.char !== null) {
            codes[node.char] = code || '0'; // Handle single character case
            return;
        }

        traverse(node.left, code + '0');
        traverse(node.right, code + '1');
    }

    traverse(root, '');
    return codes;
}

// Encode text using Huffman codes
function huffmanEncode(text, codes) {
    return text.split('').map(char => codes[char]).join('');
}

// Decode Huffman encoded text
function huffmanDecode(encoded, root) {
    const decoded = [];
    let current = root;

    for (const bit of encoded) {
        current = bit === '0' ? current.left : current.right;

        if (current.char !== null) {
            decoded.push(current.char);
            current = root;
        }
    }

    return decoded.join('');
}

// Complete Huffman coding process
function huffmanCoding(text) {
    if (text.length === 0) return { encoded: '', decoded: '', codes: {}, compression: 0 };

    // Calculate character frequencies
    const frequencies = {};
    for (const char of text) {
        frequencies[char] = (frequencies[char] || 0) + 1;
    }

    // Build tree and generate codes
    const root = buildHuffmanTree(frequencies);
    const codes = generateHuffmanCodes(root);

    // Encode and decode
    const encoded = huffmanEncode(text, codes);
    const decoded = huffmanDecode(encoded, root);

    // Calculate compression ratio
    const originalBits = text.length * 8; // ASCII uses 8 bits per character
    const compressedBits = encoded.length;
    const compressionRatio = ((1 - compressedBits / originalBits) * 100).toFixed(2);

    return {
        frequencies,
        codes,
        encoded,
        decoded,
        originalSize: originalBits,
        compressedSize: compressedBits,
        compressionRatio: `${compressionRatio}%`
    };
}

// Example usage
console.log('Huffman Coding Algorithm');
console.log('========================');

const text = 'huffman coding algorithm';
console.log('Original text:', text);

const result = huffmanCoding(text);
console.log('\nCharacter Frequencies:', result.frequencies);
console.log('\nHuffman Codes:');
for (const [char, code] of Object.entries(result.codes)) {
    console.log(`  '${char}': ${code}`);
}

console.log('\nEncoded:', result.encoded);
console.log('Decoded:', result.decoded);
console.log('\nOriginal size:', result.originalSize, 'bits');
console.log('Compressed size:', result.compressedSize, 'bits');
console.log('Compression ratio:', result.compressionRatio);

// Another example
console.log('\n--- Another Example ---');
const text2 = 'AAAAABBBBCCCDDE';
const result2 = huffmanCoding(text2);
console.log('Text:', text2);
console.log('Codes:', result2.codes);
console.log('Compression:', result2.compressionRatio);
