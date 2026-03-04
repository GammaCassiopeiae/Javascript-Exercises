// Sieve of Eratosthenes
// Time Complexity: O(n log log n)
// Space Complexity: O(n)
// Find all prime numbers up to n

// Basic Sieve of Eratosthenes
function sieveOfEratosthenes(n) {
    if (n < 2) return [];

    const isPrime = new Array(n + 1).fill(true);
    isPrime[0] = isPrime[1] = false;

    for (let i = 2; i * i <= n; i++) {
        if (isPrime[i]) {
            for (let j = i * i; j <= n; j += i) {
                isPrime[j] = false;
            }
        }
    }

    const primes = [];
    for (let i = 2; i <= n; i++) {
        if (isPrime[i]) primes.push(i);
    }

    return primes;
}

// Optimized Sieve (only odd numbers)
function sieveOptimized(n) {
    if (n < 2) return [];
    if (n === 2) return [2];

    const primes = [2];
    const limit = Math.floor((n - 1) / 2);
    const isPrime = new Array(limit + 1).fill(true);

    for (let i = 1; i * i <= limit; i++) {
        if (isPrime[i]) {
            const p = 2 * i + 1;
            for (let j = Math.floor((p * p - 1) / 2); j <= limit; j += p) {
                isPrime[j] = false;
            }
        }
    }

    for (let i = 1; i <= limit; i++) {
        if (isPrime[i]) primes.push(2 * i + 1);
    }

    return primes;
}

// Segmented Sieve (for large ranges)
function segmentedSieve(low, high) {
    if (high < 2) return [];

    const limit = Math.floor(Math.sqrt(high)) + 1;
    const basePrimes = sieveOfEratosthenes(limit);

    const isPrime = new Array(high - low + 1).fill(true);
    if (low === 0) isPrime[0] = isPrime[1] = false;
    if (low === 1) isPrime[0] = false;

    for (const prime of basePrimes) {
        const start = Math.max(prime * prime, Math.ceil(low / prime) * prime);
        for (let j = start; j <= high; j += prime) {
            isPrime[j - low] = false;
        }
    }

    const primes = [];
    for (let i = 0; i < isPrime.length; i++) {
        if (isPrime[i]) primes.push(low + i);
    }

    return primes;
}

// Count primes up to n
function countPrimes(n) {
    return sieveOfEratosthenes(n).length;
}

// Check if a number is prime using precomputed sieve
function isPrimeCheck(n, sieve) {
    if (n < sieve.length) return sieve[n];
    // For numbers outside sieve range, use trial division
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

// Example usage
const n = 100;
console.log(`Primes up to ${n}:`);
console.log(sieveOfEratosthenes(n));

console.log(`\nCount of primes up to ${n}:`, countPrimes(n));

console.log('\n--- Optimized Sieve ---');
console.log(sieveOptimized(100));

console.log('\n--- Segmented Sieve (100 to 200) ---');
console.log(segmentedSieve(100, 200));

console.log('\n--- Large Range ---');
const largePrimes = sieveOfEratosthenes(1000);
console.log(`First 25 primes: ${largePrimes.slice(0, 25)}`);
console.log(`Total primes up to 1000: ${largePrimes.length}`);
