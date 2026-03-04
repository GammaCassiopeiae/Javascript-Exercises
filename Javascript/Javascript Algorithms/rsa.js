// RSA Algorithm
// Public-key cryptosystem for secure data transmission
// Time Complexity: O(n³) for key generation, O(n²) for encryption/decryption
// Note: Educational implementation - not for production use

// ============================================
// Helper Functions
// ============================================

// Extended Euclidean Algorithm
function extendedGCD(a, b) {
    if (a === 0n) {
        return { gcd: b, x: 0n, y: 1n };
    }
    const { gcd, x, y } = extendedGCD(b % a, a);
    return { gcd, x: y - (b / a) * x, y: x };
}

// Modular Inverse using Extended GCD
function modInverse(a, m) {
    const { gcd, x } = extendedGCD(a % m, m);
    if (gcd !== 1n) {
        throw new Error('Modular inverse does not exist');
    }
    return ((x % m) + m) % m;
}

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
function isPrime(n, k = 5) {
    if (n < 2n) return false;
    if (n === 2n || n === 3n) return true;
    if (n % 2n === 0n) return false;

    // Write n-1 as 2^r * d
    let r = 0n;
    let d = n - 1n;
    while (d % 2n === 0n) {
        r++;
        d /= 2n;
    }

    // Witness loop
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

// Generate a random prime number
function generatePrime(bits) {
    while (true) {
        // Generate random number with specified bits
        let num = 0n;
        for (let i = 0; i < bits; i++) {
            num = (num << 1n) | BigInt(Math.floor(Math.random() * 2));
        }

        // Set MSB and LSB to ensure it's odd and has correct bit length
        num = (num | (1n << BigInt(bits - 1))) | 1n;

        if (isPrime(num)) {
            return num;
        }
    }
}

// Greatest Common Divisor
function gcd(a, b) {
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}

// ============================================
// RSA Implementation
// ============================================

class RSA {
    constructor(keySize = 512) {
        this.keySize = keySize;
        this.publicKey = null;
        this.privateKey = null;
        this.n = null;
    }

    // Generate key pair
    generateKeyPair() {
        const halfSize = Math.floor(this.keySize / 2);

        // Generate two distinct primes
        let p, q;
        do {
            p = generatePrime(halfSize);
            q = generatePrime(halfSize);
        } while (p === q);

        // Calculate n = p * q
        this.n = p * q;

        // Calculate Euler's totient: φ(n) = (p-1)(q-1)
        const phi = (p - 1n) * (q - 1n);

        // Choose e (public exponent)
        // Common choices: 3, 17, 65537
        const e = 65537n;

        // Calculate d (private exponent): d ≡ e^(-1) (mod φ(n))
        const d = modInverse(e, phi);

        this.publicKey = { e, n: this.n };
        this.privateKey = { d, n: this.n };

        return {
            publicKey: { e: e.toString(), n: this.n.toString() },
            privateKey: { d: d.toString(), n: this.n.toString() }
        };
    }

    // Encrypt message using public key
    encrypt(message, publicKey = this.publicKey) {
        if (!publicKey) {
            throw new Error('No public key available');
        }

        const messageBytes = Buffer.from(message, 'utf-8');
        const blockSize = Math.floor((this.keySize - 1) / 8);

        const encrypted = [];

        for (let i = 0; i < messageBytes.length; i += blockSize) {
            const block = messageBytes.slice(i, i + blockSize);
            const m = BigInt('0x' + block.toString('hex'));

            if (m >= publicKey.n) {
                throw new Error('Message block too large');
            }

            const c = modPow(m, publicKey.e, publicKey.n);
            encrypted.push(c.toString(16).padStart(this.keySize / 4, '0'));
        }

        return encrypted.join('');
    }

    // Decrypt ciphertext using private key
    decrypt(ciphertext, privateKey = this.privateKey) {
        if (!privateKey) {
            throw new Error('No private key available');
        }

        const blockSize = this.keySize / 4; // Hex characters per block
        const blocks = [];

        for (let i = 0; i < ciphertext.length; i += blockSize) {
            blocks.push(ciphertext.slice(i, i + blockSize));
        }

        const decrypted = [];

        for (const block of blocks) {
            const c = BigInt('0x' + block);
            const m = modPow(c, privateKey.d, privateKey.n);

            let hex = m.toString(16);
            // Pad to even length
            if (hex.length % 2) hex = '0' + hex;

            decrypted.push(hex);
        }

        return Buffer.from(decrypted.join(''), 'hex').toString('utf-8');
    }

    // Sign message using private key
    sign(message) {
        const messageHash = this.hashMessage(message);
        const m = BigInt('0x' + messageHash);

        if (!this.privateKey) {
            throw new Error('No private key available');
        }

        const s = modPow(m, this.privateKey.d, this.privateKey.n);
        return s.toString(16);
    }

    // Verify signature using public key
    verify(message, signature, publicKey = this.publicKey) {
        const messageHash = this.hashMessage(message);
        const m = BigInt('0x' + messageHash);

        if (!publicKey) {
            throw new Error('No public key available');
        }

        const s = BigInt('0x' + signature);
        const v = modPow(s, publicKey.e, publicKey.n);

        return v === m;
    }

    // Simple hash function for signing (use SHA-256 in production)
    hashMessage(message) {
        // Simplified hash - in production use crypto.createHash('sha256')
        let hash = 0n;
        const prime = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F');

        for (let i = 0; i < message.length; i++) {
            hash = ((hash * 31n) + BigInt(message.charCodeAt(i))) % prime;
        }

        return hash.toString(16).padStart(64, '0');
    }
}

// ============================================
// Example Usage
// ============================================

console.log('RSA Algorithm');
console.log('=============');

// Create RSA instance with smaller key size for demo
const rsa = new RSA(512);

console.log('\n--- Key Generation ---');
const keys = rsa.generateKeyPair();
console.log('Public Key (e):', keys.publicKey.e);
console.log('Public Key (n):', keys.publicKey.n.substring(0, 50) + '...');
console.log('Private Key (d):', keys.privateKey.d.substring(0, 50) + '...');

console.log('\n--- Encryption/Decryption ---');
const message = 'Hello, RSA!';
console.log('Original message:', message);

const encrypted = rsa.encrypt(message);
console.log('Encrypted:', encrypted.substring(0, 64) + '...');

const decrypted = rsa.decrypt(encrypted);
console.log('Decrypted:', decrypted);

console.log('\n--- Digital Signature ---');
const signature = rsa.sign(message);
console.log('Signature:', signature.substring(0, 64) + '...');

const isValid = rsa.verify(message, signature);
console.log('Signature valid:', isValid);

// Tamper detection
const tamperedMessage = 'Hello, RSA?';
const tamperedValid = rsa.verify(tamperedMessage, signature);
console.log('Tampered signature valid:', tamperedValid);

// ============================================
// Small Example (for educational purposes)
// ============================================

console.log('\n--- Small Number Example ---');
console.log('(Using small primes for demonstration)');

const smallP = 61n;
const smallQ = 53n;
const smallN = smallP * smallQ;
const smallPhi = (smallP - 1n) * (smallQ - 1n);
const smallE = 17n;
const smallD = modInverse(smallE, smallPhi);

console.log(`p = ${smallP}, q = ${smallQ}`);
console.log(`n = ${smallN}`);
console.log(`φ(n) = ${smallPhi}`);
console.log(`e = ${smallE}`);
console.log(`d = ${smallD}`);

const smallMessage = 65n; // 'A'
const smallEncrypted = modPow(smallMessage, smallE, smallN);
const smallDecrypted = modPow(smallEncrypted, smallD, smallN);

console.log(`\nMessage: ${smallMessage}`);
console.log(`Encrypted: ${smallEncrypted}`);
console.log(`Decrypted: ${smallDecrypted}`);
console.log(`Match: ${smallMessage === smallDecrypted}`);
