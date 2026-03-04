// Prime Factorization
// Multiple approaches for factoring integers

// Trial Division Method
// Time Complexity: O(√n)
// Space Complexity: O(1)
function primeFactorization(n) {
    if (n <= 1) return { factors: {}, representation: `${n}` };

    const factors = {};
    let num = n;

    // Check for factor 2
    while (num % 2 === 0) {
        factors[2] = (factors[2] || 0) + 1;
        num /= 2;
    }

    // Check for odd factors
    for (let i = 3; i * i <= num; i += 2) {
        while (num % i === 0) {
            factors[i] = (factors[i] || 0) + 1;
            num /= i;
        }
    }

    // If num is still greater than 1, it's a prime factor
    if (num > 1) {
        factors[num] = 1;
    }

    // Create representation string
    const representation = Object.entries(factors)
        .map(([prime, exp]) => exp > 1 ? `${prime}^${exp}` : prime)
        .join(' × ');

    return { factors, representation };
}

// Using precomputed smallest prime factor (SPF)
// Time Complexity: O(log n) per query after O(n log log n) preprocessing
function createSPFSieve(maxN) {
    const spf = new Array(maxN + 1);
    for (let i = 0; i <= maxN; i++) spf[i] = i;

    for (let i = 2; i * i <= maxN; i++) {
        if (spf[i] === i) {
            for (let j = i * i; j <= maxN; j += i) {
                if (spf[j] === j) spf[j] = i;
            }
        }
    }

    return spf;
}

function primeFactorizationSPF(n, spf) {
    if (n <= 1) return { factors: {}, representation: `${n}` };

    const factors = {};
    let num = n;

    while (num > 1) {
        const prime = spf[num];
        factors[prime] = (factors[prime] || 0) + 1;
        num /= prime;
    }

    const representation = Object.entries(factors)
        .map(([prime, exp]) => exp > 1 ? `${prime}^${exp}` : prime)
        .join(' × ');

    return { factors, representation };
}

// Get all divisors from prime factorization
function getAllDivisors(n) {
    const { factors } = primeFactorization(n);
    const divisors = [1];

    for (const [prime, exp] of Object.entries(factors)) {
        const newDivisors = [];
        for (let i = 0; i <= exp; i++) {
            const multiplier = Math.pow(parseInt(prime), i);
            for (const d of divisors) {
                newDivisors.push(d * multiplier);
            }
        }
        divisors.length = 0;
        divisors.push(...newDivisors);
    }

    return divisors.sort((a, b) => a - b);
}

// Count divisors using prime factorization
function countDivisors(n) {
    const { factors } = primeFactorization(n);
    let count = 1;

    for (const exp of Object.values(factors)) {
        count *= (exp + 1);
    }

    return count;
}

// Sum of divisors using prime factorization
function sumOfDivisors(n) {
    const { factors } = primeFactorization(n);
    let sum = 1;

    for (const [prime, exp] of Object.entries(factors)) {
        const p = parseInt(prime);
        sum *= (Math.pow(p, exp + 1) - 1) / (p - 1);
    }

    return sum;
}

// Example usage
const n = 360;
console.log(`Prime Factorization of ${n}:`);
const result = primeFactorization(n);
console.log('Factors:', result.factors);
console.log('Representation:', result.representation);

console.log('\n--- All Divisors ---');
console.log(`Divisors of ${n}:`, getAllDivisors(n));
console.log(`Count: ${countDivisors(n)}`);
console.log(`Sum: ${sumOfDivisors(n)}`);

console.log('\n--- More Examples ---');
const numbers = [84, 100, 1024, 997];
for (const num of numbers) {
    const fact = primeFactorization(num);
    console.log(`${num} = ${fact.representation}`);
}

console.log('\n--- SPF Method (for multiple queries) ---');
const maxN = 1000;
const spf = createSPFSieve(maxN);
console.log(`Prime factorization of 840:`, primeFactorizationSPF(840, spf).representation);
