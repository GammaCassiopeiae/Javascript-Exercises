function fastExponentiation(base, exp, mod = null) {
  let result = 1;
  base = mod ? base % mod : base;
  
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = mod ? (result * base) % mod : result * base;
    }
    exp = Math.floor(exp / 2);
    base = mod ? (base * base) % mod : base * base;
  }
  
  return result;
}

// Example
console.log(fastExponentiation(2, 10)); // Output: 1024
console.log(fastExponentiation(2, 10, 1000)); // Output: 24 (1024 % 1000)