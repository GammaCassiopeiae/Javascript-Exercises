// Chinese Remainder Theorem (CRT)
// Solves system of congruences: x ≡ aᵢ (mod mᵢ)
// where all mᵢ are pairwise coprime

// Extended Euclidean Algorithm helper
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

// Modular inverse
function modInverse(a, m) {
    const result = extendedGcd(a, m);
    if (result.gcd !== 1) return null;
    return ((result.x % m) + m) % m;
}

// Check if two numbers are coprime
function areCoprime(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return a === 1;
}

// Check if all moduli are pairwise coprime
function arePairwiseCoprime(moduli) {
    for (let i = 0; i < moduli.length; i++) {
        for (let j = i + 1; j < moduli.length; j++) {
            if (!areCoprime(moduli[i], moduli[j])) {
                return false;
            }
        }
    }
    return true;
}

// Chinese Remainder Theorem
// remainders: array of aᵢ values
// moduli: array of mᵢ values (must be pairwise coprime)
function chineseRemainderTheorem(remainders, moduli) {
    if (remainders.length !== moduli.length) {
        return { error: 'Arrays must have same length' };
    }

    if (!arePairwiseCoprime(moduli)) {
        return { error: 'Moduli must be pairwise coprime' };
    }

    // Calculate product of all moduli
    const M = moduli.reduce((a, b) => a * b, 1);

    let result = 0;

    for (let i = 0; i < remainders.length; i++) {
        const ai = remainders[i];
        const mi = moduli[i];
        const Mi = M / mi; // Partial product
        const yi = modInverse(Mi, mi); // Modular inverse

        if (yi === null) {
            return { error: `Modular inverse doesn't exist for index ${i}` };
        }

        result += ai * Mi * yi;
    }

    // Normalize result to be in range [0, M)
    result = ((result % M) + M) % M;

    return {
        solution: result,
        modulus: M,
        generalSolution: `x ≡ ${result} (mod ${M})`,
        verification: remainders.map((a, i) => ({
            congruence: `x ≡ ${a} (mod ${moduli[i]})`,
            verified: result % moduli[i] === a % moduli[i]
        }))
    };
}

// Extended CRT for non-coprime moduli
// Returns solution if it exists, null otherwise
function extendedCRT(remainders, moduli) {
    if (remainders.length !== moduli.length) {
        return { error: 'Arrays must have same length' };
    }

    if (remainders.length === 0) {
        return { solution: 0, modulus: 1 };
    }

    let a1 = remainders[0];
    let m1 = moduli[0];

    for (let i = 1; i < remainders.length; i++) {
        const a2 = remainders[i];
        const m2 = moduli[i];

        const { gcd, x } = extendedGcd(m1, m2);

        // Check if solution exists
        if ((a2 - a1) % gcd !== 0) {
            return { error: 'No solution exists for given congruences' };
        }

        const lcm = (m1 * m2) / gcd;
        const diff = a2 - a1;
        const mult = (diff / gcd * x) % (m2 / gcd);

        a1 = ((a1 + m1 * mult) % lcm + lcm) % lcm;
        m1 = lcm;
    }

    return {
        solution: a1,
        modulus: m1,
        generalSolution: `x ≡ ${a1} (mod ${m1})`
    };
}

// Example usage
console.log('Chinese Remainder Theorem');
console.log('========================');

// Classic example
const remainders1 = [2, 3, 2];
const moduli1 = [3, 5, 7];

console.log('\nSystem of congruences:');
console.log('x ≡ 2 (mod 3)');
console.log('x ≡ 3 (mod 5)');
console.log('x ≡ 2 (mod 7)');

const result1 = chineseRemainderTheorem(remainders1, moduli1);
console.log('\nSolution:', result1);

// Another example
console.log('\n--- Another Example ---');
const remainders2 = [1, 2, 3];
const moduli2 = [5, 7, 11];

console.log('x ≡ 1 (mod 5)');
console.log('x ≡ 2 (mod 7)');
console.log('x ≡ 3 (mod 11)');

const result2 = chineseRemainderTheorem(remainders2, moduli2);
console.log('\nSolution:', result2);

// Extended CRT (non-coprime moduli)
console.log('\n--- Extended CRT (Non-coprime) ---');
const remainders3 = [2, 4];
const moduli3 = [4, 6];

console.log('x ≡ 2 (mod 4)');
console.log('x ≡ 4 (mod 6)');

const result3 = extendedCRT(remainders3, moduli3);
console.log('\nSolution:', result3);
