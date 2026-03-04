// Diffie-Hellman Key Exchange
// Method for securely exchanging cryptographic keys over public channels
// Time Complexity: O(log n) for modular exponentiation
// Note: Educational implementation - not for production use

// ============================================
// Helper Functions
// ============================================

// Modular Exponentiation (fast)
function modPow(base, exponent, modulus) {
    if (modulus === 1n) return 0n;

    let result = 1n;
    base = base % modulus;

    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent / 2n;
        base = (base * base) % modulus;
    }

    return result;
}

// Miller-Rabin Primality Test
function isPrime(n, k = 10) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    let r = 0n;
    let d = n - 1n;
    while (d % 2n === 0n) {
        r++;
        d /= 2n;
    }

    for (let i = 0; i < k; i++) {
        const a = BigInt(Math.floor(Math.random() * Number(n - 4n)) + 2);
        let x = modPow(a, d, n);

        if (x === 1n || x === n - 1n) continue;

        let composite = true;
        for (let j = 0n; j < r - 1n; j++) {
            x = modPow(x, 2n, n);
            if (x === n - 1n) {
                composite = false;
                break;
            }
        }

        if (composite) return false;
    }

    return true;
}

// Generate a random prime
function generatePrime(bits) {
    while (true) {
        let num = 0n;
        for (let i = 0; i < bits; i++) {
            num = (num << 1n) | BigInt(Math.floor(Math.random() * 2));
        }
        num = (num | (1n << BigInt(bits - 1))) | 1n;

        if (isPrime(num)) {
            return num;
        }
    }
}

// Generate a safe prime (p = 2q + 1 where q is also prime)
function generateSafePrime(bits) {
    while (true) {
        const q = generatePrime(bits - 1);
        const p = 2n * q + 1n;
        if (isPrime(p)) {
            return p;
        }
    }
}

// Find a primitive root modulo p
function findPrimitiveRoot(p) {
    const phi = p - 1n;
    const factors = primeFactors(phi);

    for (let g = 2n; g < p; g++) {
        let isPrimitive = true;
        for (const factor of factors) {
            if (modPow(g, phi / factor, p) === 1n) {
                isPrimitive = false;
                break;
            }
        }
        if (isPrimitive) {
            return g;
        }
    }

    return 2n; // Fallback
}

// Find prime factors
function primeFactors(n) {
    const factors = new Set();
    let d = 2n;

    while (d * d <= n) {
        while (n % d === 0n) {
            factors.add(d);
            n /= d;
        }
        d++;
    }

    if (n > 1n) {
        factors.add(n);
    }

    return Array.from(factors);
}

// Generate random private key
function generatePrivateKey(maxBits) {
    let key = 0n;
    for (let i = 0; i < maxBits; i++) {
        key = (key << 1n) | BigInt(Math.floor(Math.random() * 2));
    }
    return key;
}

// ============================================
// Diffie-Hellman Implementation
// ============================================

class DiffieHellman {
    constructor(primeBits = 256) {
        this.primeBits = primeBits;
        this.p = null; // Prime modulus
        this.g = null; // Generator (primitive root)
        this.privateKey = null;
        this.publicKey = null;
        this.sharedSecret = null;
    }

    // Generate system parameters (can be shared publicly)
    generateParameters() {
        this.p = generateSafePrime(this.primeBits);
        this.g = findPrimitiveRoot(this.p);
        return {
            p: this.p.toString(),
            g: this.g.toString()
        };
    }

    // Set parameters (for receiving from other party)
    setParameters(p, g) {
        this.p = typeof p === 'string' ? BigInt(p) : p;
        this.g = typeof g === 'string' ? BigInt(g) : g;
    }

    // Generate key pair
    generateKeyPair() {
        if (!this.p || !this.g) {
            this.generateParameters();
        }

        // Generate private key (random number between 2 and p-2)
        this.privateKey = generatePrivateKey(this.primeBits - 2) + 2n;

        // Calculate public key: g^privateKey mod p
        this.publicKey = modPow(this.g, this.privateKey, this.p);

        return {
            privateKey: this.privateKey.toString(),
            publicKey: this.publicKey.toString()
        };
    }

    // Calculate shared secret from other party's public key
    calculateSharedSecret(otherPublicKey) {
        if (!this.privateKey || !this.p) {
            throw new Error('Must generate key pair first');
        }

        const otherKey = typeof otherPublicKey === 'string'
            ? BigInt(otherPublicKey)
            : otherPublicKey;

        this.sharedSecret = modPow(otherKey, this.privateKey, this.p);
        return this.sharedSecret.toString();
    }

    // Get derived key (e.g., first 256 bits of shared secret)
    deriveKey(bits = 256) {
        if (!this.sharedSecret) {
            throw new Error('Must calculate shared secret first');
        }

        const mask = (1n << BigInt(bits)) - 1n;
        return (this.sharedSecret & mask).toString(16).padStart(Math.ceil(bits / 4), '0');
    }
}

// ============================================
// Simplified Version (for educational demo)
// ============================================

class DiffieHellmanSimple {
    constructor(p, g) {
        this.p = BigInt(p);
        this.g = BigInt(g);
        this.privateKey = null;
        this.publicKey = null;
    }

    generateKeyPair() {
        // Simple private key generation
        this.privateKey = BigInt(Math.floor(Math.random() * 1000) + 2);
        this.publicKey = modPow(this.g, this.privateKey, this.p);

        return {
            privateKey: this.privateKey.toString(),
            publicKey: this.publicKey.toString()
        };
    }

    calculateSharedSecret(otherPublicKey) {
        const otherKey = typeof otherPublicKey === 'string'
            ? BigInt(otherPublicKey)
            : otherPublicKey;

        return modPow(otherKey, this.privateKey, this.p);
    }
}

// ============================================
// Example Usage
// ============================================

console.log('Diffie-Hellman Key Exchange');
console.log('===========================');

// Simulate Alice and Bob
console.log('\n--- Key Exchange Simulation ---');

// Alice generates parameters
const alice = new DiffieHellman(128);
const params = alice.generateParameters();

console.log('\nPublic Parameters (shared):');
console.log('Prime (p):', params.p.substring(0, 40) + '...');
console.log('Generator (g):', params.g);

// Bob receives parameters
const bob = new DiffieHellman(128);
bob.setParameters(params.p, params.g);

// Both generate key pairs
const aliceKeys = alice.generateKeyPair();
const bobKeys = bob.generateKeyPair();

console.log('\nAlice\'s Keys:');
console.log('Private:', aliceKeys.privateKey.substring(0, 30) + '...');
console.log('Public:', aliceKeys.publicKey.substring(0, 30) + '...');

console.log('\nBob\'s Keys:');
console.log('Private:', bobKeys.privateKey.substring(0, 30) + '...');
console.log('Public:', bobKeys.publicKey.substring(0, 30) + '...');

// Exchange public keys and calculate shared secret
const aliceSharedSecret = alice.calculateSharedSecret(bobKeys.publicKey);
const bobSharedSecret = bob.calculateSharedSecret(aliceKeys.publicKey);

console.log('\nShared Secrets:');
console.log('Alice\'s:', aliceSharedSecret.substring(0, 40) + '...');
console.log('Bob\'s:', bobSharedSecret.substring(0, 40) + '...');

console.log('\nSecrets match:', aliceSharedSecret === bobSharedSecret);

// Derive encryption key
const aliceKey = alice.deriveKey(128);
const bobKey = bob.deriveKey(128);

console.log('\nDerived Keys (128-bit):');
console.log('Alice:', aliceKey);
console.log('Bob:', bobKey);
console.log('Keys match:', aliceKey === bobKey);

// ============================================
// Small Number Example (Educational)
// ============================================

console.log('\n--- Small Number Example ---');
console.log('(Using small numbers for clarity)');

// Well-known small DH parameters
const smallP = 23n;
const smallG = 5n;

console.log(`\nPublic: p = ${smallP}, g = ${smallG}`);

// Alice chooses secret a = 6
const alicePrivate = 6n;
const alicePublic = modPow(smallG, alicePrivate, smallP);
console.log(`\nAlice's private (a) = ${alicePrivate}`);
console.log(`Alice's public (A) = g^a mod p = ${smallG}^${alicePrivate} mod ${smallP} = ${alicePublic}`);

// Bob chooses secret b = 15
const bobPrivate = 15n;
const bobPublic = modPow(smallG, bobPrivate, smallP);
console.log(`\nBob's private (b) = ${bobPrivate}`);
console.log(`Bob's public (B) = g^b mod p = ${smallG}^${bobPrivate} mod ${smallP} = ${bobPublic}`);

// Exchange and compute shared secret
const aliceShared = modPow(bobPublic, alicePrivate, smallP);
const bobShared = modPow(alicePublic, bobPrivate, smallP);

console.log('\n--- Shared Secret Calculation ---');
console.log(`Alice computes: B^a mod p = ${bobPublic}^${alicePrivate} mod ${smallP} = ${aliceShared}`);
console.log(`Bob computes: A^b mod p = ${alicePublic}^${bobPrivate} mod ${smallP} = ${bobShared}`);
console.log(`\nShared secret: ${aliceShared}`);
console.log('Secrets match:', aliceShared === bobShared);

// ============================================
// Security Note
// ============================================

console.log('\n--- Security Notes ---');
console.log('1. Use at least 2048-bit primes for security');
console.log('2. Use cryptographically secure random number generators');
console.log('3. Validate received public keys');
console.log('4. Use key derivation functions (KDF) for final keys');
console.log('5. This implementation is for educational purposes only');
