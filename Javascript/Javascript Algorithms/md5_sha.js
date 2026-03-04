// MD5 and SHA Hash Functions
// Educational implementations of cryptographic hash functions
// Note: For production use, use Node.js crypto module

const crypto = require('crypto');

// ============================================
// Using Node.js crypto module (recommended)
// ============================================

// MD5 Hash
function md5(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

// SHA-1 Hash
function sha1(data) {
    return crypto.createHash('sha1').update(data).digest('hex');
}

// SHA-256 Hash
function sha256(data) {
    return crypto.createHash('sha256').update(data).digest('hex');
}

// SHA-512 Hash
function sha512(data) {
    return crypto.createHash('sha512').update(data).digest('hex');
}

// Hash with HMAC (Keyed-hash)
function hmacSHA256(data, key) {
    return crypto.createHmac('sha256', key).update(data).digest('hex');
}

// ============================================
// Educational: Simplified MD5 Implementation
// (Not for cryptographic use - for learning)
// ============================================

// Left rotate function
function leftRotate(x, amount) {
    return ((x << amount) | (x >>> (32 - amount))) >>> 0;
}

// MD5 implementation (simplified for educational purposes)
function md5Implementation(message) {
    // Convert message to bytes
    const msgBytes = [];
    for (let i = 0; i < message.length; i++) {
        msgBytes.push(message.charCodeAt(i) & 0xFF);
    }

    // Append padding bits
    const originalLengthBits = msgBytes.length * 8;
    msgBytes.push(0x80);
    while ((msgBytes.length % 64) !== 56) {
        msgBytes.push(0x00);
    }

    // Append original length in bits (little-endian)
    for (let i = 0; i < 8; i++) {
        msgBytes.push((originalLengthBits >>> (i * 8)) & 0xFF);
    }

    // Initialize MD5 state
    let a0 = 0x67452301;
    let b0 = 0xEFCDAB89;
    let c0 = 0x98BADCFE;
    let d0 = 0x10325476;

    // MD5 constants
    const K = [
        0xD76AA478, 0xE8C7B756, 0x242070DB, 0xC1BDCEEE,
        0xF57C0FAF, 0x4787C62A, 0xA8304613, 0xFD469501,
        0x698098D8, 0x8B44F7AF, 0xFFFF5BB1, 0x895CD7BE,
        0x6B901122, 0xFD987193, 0xA679438E, 0x49B40821,
        0xF61E2562, 0xC040B340, 0x265E5A51, 0xE9B6C7AA,
        0xD62F105D, 0x02441453, 0xD8A1E681, 0xE7D3FBC8,
        0x21E1CDE6, 0xC33707D6, 0xF4D50D87, 0x455A14ED,
        0xA9E3E905, 0xFCEFA3F8, 0x676F02D9, 0x8D2A4C8A,
        0xFFFA3942, 0x8771F681, 0x6D9D6122, 0xFDE5380C,
        0xA4BEEA44, 0x4BDECFA9, 0xF6BB4B60, 0xBEBFBC70,
        0x289B7EC6, 0xEAA127FA, 0xD4EF3085, 0x04881D05,
        0xD9D4D039, 0xE6DB99E5, 0x1FA27CF8, 0xC4AC5665,
        0xF4292244, 0x432AFF97, 0xAB9423A7, 0xFC93A039,
        0x655B59C3, 0x8F0CCC92, 0xFFEFF47D, 0x85845DD1,
        0x6FA87E4F, 0xFE2CE6E0, 0xA3014314, 0x4E0811A1,
        0xF7537E82, 0xBD3AF235, 0x2AD7D2BB, 0xEB86D391
    ];

    const S = [
        7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
        5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
        4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
        6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21
    ];

    // Process each 512-bit chunk
    for (let chunk = 0; chunk < msgBytes.length; chunk += 64) {
        const M = [];
        for (let i = 0; i < 16; i++) {
            M[i] = msgBytes[chunk + i * 4] |
                   (msgBytes[chunk + i * 4 + 1] << 8) |
                   (msgBytes[chunk + i * 4 + 2] << 16) |
                   (msgBytes[chunk + i * 4 + 3] << 24);
        }

        let A = a0, B = b0, C = c0, D = d0;

        for (let i = 0; i < 64; i++) {
            let F, g;

            if (i < 16) {
                F = (B & C) | ((~B) & D);
                g = i;
            } else if (i < 32) {
                F = (D & B) | ((~D) & C);
                g = (5 * i + 1) % 16;
            } else if (i < 48) {
                F = B ^ C ^ D;
                g = (3 * i + 5) % 16;
            } else {
                F = C ^ (B | (~D));
                g = (7 * i) % 16;
            }

            F = (F + A + K[i] + M[g]) >>> 0;
            A = D;
            D = C;
            C = B;
            B = (B + leftRotate(F, S[i])) >>> 0;
        }

        a0 = (a0 + A) >>> 0;
        b0 = (b0 + B) >>> 0;
        c0 = (c0 + C) >>> 0;
        d0 = (d0 + D) >>> 0;
    }

    // Produce final hash (little-endian)
    const digest = [];
    for (const val of [a0, b0, c0, d0]) {
        for (let i = 0; i < 4; i++) {
            digest.push((val >>> (i * 8)) & 0xFF);
        }
    }

    return digest.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================
// Educational: Simplified SHA-1 Implementation
// ============================================

function sha1Implementation(message) {
    const msgBytes = [];
    for (let i = 0; i < message.length; i++) {
        msgBytes.push(message.charCodeAt(i) & 0xFF);
    }

    const originalLengthBits = msgBytes.length * 8;
    msgBytes.push(0x80);
    while ((msgBytes.length % 64) !== 56) {
        msgBytes.push(0x00);
    }

    for (let i = 0; i < 8; i++) {
        msgBytes.push((originalLengthBits >>> (56 - i * 8)) & 0xFF);
    }

    let h0 = 0x67452301;
    let h1 = 0xEFCDAB89;
    let h2 = 0x98BADCFE;
    let h3 = 0x10325476;
    let h4 = 0xC3D2E1F0;

    for (let chunk = 0; chunk < msgBytes.length; chunk += 64) {
        const W = [];
        for (let i = 0; i < 16; i++) {
            W[i] = (msgBytes[chunk + i * 4] << 24) |
                   (msgBytes[chunk + i * 4 + 1] << 16) |
                   (msgBytes[chunk + i * 4 + 2] << 8) |
                   msgBytes[chunk + i * 4 + 3];
        }

        for (let i = 16; i < 80; i++) {
            W[i] = leftRotate(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
        }

        let a = h0, b = h1, c = h2, d = h3, e = h4;

        for (let i = 0; i < 80; i++) {
            let f, k;

            if (i < 20) {
                f = (b & c) | ((~b) & d);
                k = 0x5A827999;
            } else if (i < 40) {
                f = b ^ c ^ d;
                k = 0x6ED9EBA1;
            } else if (i < 60) {
                f = (b & c) | (b & d) | (c & d);
                k = 0x8F1BBCDC;
            } else {
                f = b ^ c ^ d;
                k = 0xCA62C1D6;
            }

            const temp = (leftRotate(a, 5) + f + e + k + W[i]) >>> 0;
            e = d;
            d = c;
            c = leftRotate(b, 30);
            b = a;
            a = temp;
        }

        h0 = (h0 + a) >>> 0;
        h1 = (h1 + b) >>> 0;
        h2 = (h2 + c) >>> 0;
        h3 = (h3 + d) >>> 0;
        h4 = (h4 + e) >>> 0;
    }

    const digest = [];
    for (const val of [h0, h1, h2, h3, h4]) {
        for (let i = 0; i < 4; i++) {
            digest.push((val >>> (24 - i * 8)) & 0xFF);
        }
    }

    return digest.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ============================================
// Example Usage
// ============================================

console.log('MD5 and SHA Hash Functions');
console.log('==========================');

const testString = 'Hello, World!';

console.log(`\nInput: "${testString}"`);

// Using Node.js crypto (recommended)
console.log('\n--- Using Node.js crypto module ---');
console.log('MD5:', md5(testString));
console.log('SHA-1:', sha1(testString));
console.log('SHA-256:', sha256(testString));
console.log('SHA-512:', sha512(testString));

// HMAC
console.log('\n--- HMAC-SHA256 ---');
const key = 'secret-key';
console.log(`HMAC-SHA256("${testString}", "${key}"):`, hmacSHA256(testString, key));

// Educational implementations
console.log('\n--- Educational Implementations ---');
console.log('MD5 (implementation):', md5Implementation(testString));
console.log('SHA-1 (implementation):', sha1Implementation(testString));

// Verify implementations match
console.log('\n--- Verification ---');
console.log('MD5 match:', md5(testString) === md5Implementation(testString));
console.log('SHA-1 match:', sha1(testString) === sha1Implementation(testString));

// Hash file content (example)
console.log('\n--- Hash Properties ---');
console.log('Empty string MD5:', md5(''));
console.log('Same input produces same hash:', md5(testString) === md5(testString));
console.log('Different inputs produce different hashes:', md5('a') !== md5('b'));

// Avalanche effect demonstration
console.log('\n--- Avalanche Effect ---');
const original = 'Hello';
const modified = 'hello';
console.log(`MD5("${original}"):`, md5(original));
console.log(`MD5("${modified}"):`, md5(modified));
console.log('Single character change produces very different hash!');
