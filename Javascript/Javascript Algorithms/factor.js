function primeFactorization(n) {
  let factors = [];
  
  for (let i = 2; i * i <= n; i++) {
    while (n % i === 0) {
      factors.push(i);
      n /= i;
    }
  }
  
  if (n > 1) factors.push(n);
  return factors;
}

// Example
console.log(primeFactorization(60)); // Output: [2, 2, 3, 5]