function sieveOfEratosthenes(n) {
  let primes = Array(n + 1).fill(true);
  primes = primes = false;
  
  for (let i = 2; i * i <= n; i++) {
    if (primes[i]) {
      for (let j = i * i; j <= n; j += i) {
        primes[j] = false;
      }
    }
  }
  
  return primes.map((p, i) => p ? i : null).filter(p => p !== null);
}

// Example
console.log(sieveOfEratosthenes(30)); // Output: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]