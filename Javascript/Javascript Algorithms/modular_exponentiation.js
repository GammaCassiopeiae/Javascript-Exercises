// Modular Exponentiation
// Calculate (base^exponent) % modulus efficiently
// Time Complexity: O(log exponent)
// Space Complexity: O(1) iterative, O(log exponent) recursive

// Iterative version (Binary Exponentiation)
function modPowIterative(base, exponent, modulus) {
    if (modulus === 1) return 0;

    base = ((base % modulus) + modulus) % modulus; // Handle negative base
    let result = 1;

    while (exponent > 0) {
        // If exponent is odd, multiply base with result
        if (exponent % 2 === 1) {
            result = (result * base) % modulus;
        }
        // Square the base
        base = (base * base) % modulus;
        // Divide exponent by 2
        exponent = Math.floor(exponent / 2);
    }

    return result;
}

// Recursive version
function modPowRecursive(base, exponent, modulus) {
    if (modulus === 1) return 0;
    if (exponent === 0) return 1;

    base = ((base % modulus) + modulus) % modulus;

    // If exponent is even
    if (exponent % 2 === 0) {
        const half = modPowRecursive(base, exponent / 2, modulus);
        return (half * half) % modulus;
    }

    // If exponent is odd
    return (base * modPowRecursive(base, exponent - 1, modulus)) % modulus;
}

// Modular multiplicative inverse using Fermat's Little Theorem
// Only works when modulus is prime
// a^(-1) ≡ a^(p-2) (mod p)
function modInverseFermat(a, p) {
    return modPowIterative(a, p - 2, p);
}

// Modular inverse using Extended Euclidean Algorithm
// Works for any coprime a and modulus
function modInverseExtendedGcd(a, m) {
    function extendedGcd(a, b) {
        if (b === 0) {
            return { gcd: a, x: 1, y: 0 };
        }
        const result = extendedGcd(b, a % b);
        return {
            gcd: result.gcd,
            x: result.y,
            y: result.x - Math.floor(a / b) * result.y
        };
    }

    const result = extendedGcd(a, m);
    if (result.gcd !== 1) return null; // Inverse doesn't exist
    return ((result.x % m) + m) % m;
}

// Compute (a * b) % m for very large numbers without overflow
function modMultiply(a, b, m) {
    // For JavaScript, this helps with large number multiplication
    a = a % m;
    b = b % m;

    let result = 0;
    while (b > 0) {
        if (b % 2 === 1) {
            result = (result + a) % m;
        }
        a = (a * 2) % m;
        b = Math.floor(b / 2);
    }
    return result;
}

// Euler's totient function using modular exponentiation
function eulerTotient(n) {
    let result = n;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            while (n % i === 0) {
                n /= i;
            }
            result -= Math.floor(result / i);
        }
    }
    if (n > 1) {
        result -= Math.floor(result / n);
    }
    return result;
}

// Example usage
console.log('Modular Exponentiation');
console.log('======================');

const base = 2;
const exp = 10;
const mod = 1000;

console.log(`${base}^${exp} mod ${mod}:`);
console.log('Iterative:', modPowIterative(base, exp, mod));
console.log('Recursive:', modPowRecursive(base, exp, mod));

console.log('\n--- Large Exponent ---');
console.log(`3^1000 mod 1000000007:`, modPowIterative(3, 1000, 1000000007));

console.log('\n--- Modular Inverse (Fermat) ---');
const a = 3;
const p = 11;
const inverse = modInverseFermat(a, p);
console.log(`Inverse of ${a} mod ${p}: ${inverse}`);
console.log('Verification:', (a * inverse) % p);

console.log('\n--- Modular Inverse (Extended GCD) ---');
console.log(`Inverse of 7 mod 26:`, modInverseExtendedGcd(7, 26));

console.log('\n--- Euler Totient ---');
for (const n of [10, 15, 17, 100]) {
    console.log(`φ(${n}) = ${eulerTotient(n)}`);
}
