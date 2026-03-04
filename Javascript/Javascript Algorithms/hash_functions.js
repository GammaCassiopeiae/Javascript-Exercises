// Hash Functions
// Various hash function implementations for educational purposes

// Simple Hash Functions

// 1. Division Method
function hashDivision(key, tableSize) {
    return Math.abs(key) % tableSize;
}

// 2. Multiplication Method
function hashMultiplication(key, tableSize, A = 0.6180339887) {
    // A is (sqrt(5) - 1) / 2 (golden ratio fraction)
    const product = key * A;
    const fraction = product - Math.floor(product);
    return Math.floor(tableSize * fraction);
}

// 3. Mid-Square Method
function hashMidSquare(key, tableSize, digits = 2) {
    const square = key * key;
    const squareStr = square.toString().padStart(digits * 2, '0');
    const start = Math.floor((squareStr.length - digits) / 2);
    const middle = parseInt(squareStr.substring(start, start + digits));
    return middle % tableSize;
}

// 4. Folding Method
function hashFolding(key, tableSize) {
    const keyStr = key.toString();
    let sum = 0;
    const partSize = 3;

    for (let i = 0; i < keyStr.length; i += partSize) {
        const part = parseInt(keyStr.substring(i, i + partSize));
        sum += part || 0;
    }

    return sum % tableSize;
}

// String Hash Functions

// 5. DJB2 Hash
function hashDJB2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + char
        hash = hash >>> 0; // Convert to unsigned 32-bit
    }
    return hash;
}

// 6. SDBM Hash
function hashSDBM(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
        hash = hash >>> 0; // Convert to unsigned 32-bit
    }
    return hash;
}

// 7. FNV-1a Hash
function hashFNV1a(str) {
    let hash = 0x811c9dc5; // FNV offset basis
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193); // FNV prime
        hash = hash >>> 0; // Convert to unsigned 32-bit
    }
    return hash;
}

// 8. Polynomial Rolling Hash
function hashPolynomial(str, base = 31, mod = 1e9 + 7) {
    let hash = 0;
    let power = 1;

    for (let i = 0; i < str.length; i++) {
        hash = (hash + str.charCodeAt(i) * power) % mod;
        power = (power * base) % mod;
    }

    return hash;
}

// 9. Bernstein Hash
function hashBernstein(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
        hash = hash >>> 0;
    }
    return hash;
}

// Universal Hashing
function universalHash(key, a, b, p, m) {
    // h(k) = ((a*k + b) mod p) mod m
    return ((a * key + b) % p) % m;
}

// Simple Hash Table Implementation
class HashTable {
    constructor(size = 16) {
        this.size = size;
        this.table = new Array(size).fill(null).map(() => []);
        this.count = 0;
    }

    _hash(key) {
        if (typeof key === 'number') {
            return hashDivision(key, this.size);
        }
        return hashDJB2(key.toString()) % this.size;
    }

    _resize() {
        const oldTable = this.table;
        this.size *= 2;
        this.table = new Array(this.size).fill(null).map(() => []);
        this.count = 0;

        for (const bucket of oldTable) {
            for (const [key, value] of bucket) {
                this.set(key, value);
            }
        }
    }

    set(key, value) {
        const index = this._hash(key);
        const bucket = this.table[index];

        // Check if key exists
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
        this.count++;

        // Resize if load factor > 0.75
        if (this.count / this.size > 0.75) {
            this._resize();
        }
    }

    get(key) {
        const index = this._hash(key);
        const bucket = this.table[index];

        for (const [k, v] of bucket) {
            if (k === key) return v;
        }

        return undefined;
    }

    delete(key) {
        const index = this._hash(key);
        const bucket = this.table[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.count--;
                return true;
            }
        }

        return false;
    }

    has(key) {
        return this.get(key) !== undefined;
    }

    get loadFactor() {
        return this.count / this.size;
    }

    get stats() {
        const bucketSizes = this.table.map(b => b.length);
        return {
            size: this.size,
            count: this.count,
            loadFactor: this.loadFactor.toFixed(2),
            emptyBuckets: bucketSizes.filter(s => s === 0).length,
            maxChainLength: Math.max(...bucketSizes)
        };
    }
}

// Example usage
console.log('Hash Functions');
console.log('==============');

// Numeric hash functions
const key = 12345;
const tableSize = 100;

console.log(`\nNumeric key: ${key}, Table size: ${tableSize}`);
console.log('Division Method:', hashDivision(key, tableSize));
console.log('Multiplication Method:', hashMultiplication(key, tableSize));
console.log('Mid-Square Method:', hashMidSquare(key, tableSize));
console.log('Folding Method:', hashFolding(key, tableSize));

// String hash functions
const str = 'hello world';
console.log(`\nString: "${str}"`);
console.log('DJB2:', hashDJB2(str));
console.log('SDBM:', hashSDBM(str));
console.log('FNV-1a:', hashFNV1a(str));
console.log('Polynomial:', hashPolynomial(str));
console.log('Bernstein:', hashBernstein(str));

// Hash Table
console.log('\n--- Hash Table Demo ---');
const ht = new HashTable(8);
ht.set('name', 'John');
ht.set('age', 30);
ht.set('city', 'New York');
ht.set('country', 'USA');
ht.set('job', 'Developer');

console.log('Get "name":', ht.get('name'));
console.log('Get "age":', ht.get('age'));
console.log('Has "city":', ht.has('city'));

console.log('\nHash Table Stats:', ht.stats);

// Universal hashing example
console.log('\n--- Universal Hashing ---');
const a = 7, b = 3, p = 101, m = 10;
console.log(`h(k) = ((${a}*k + ${b}) mod ${p}) mod ${m}`);
for (const k of [5, 10, 15, 20, 25]) {
    console.log(`h(${k}) = ${universalHash(k, a, b, p, m)}`);
}
