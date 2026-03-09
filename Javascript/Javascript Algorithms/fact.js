function factorial(n) {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

// Iterative version (more efficient)
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function combinations(n, r) {
  return factorial(n) / (factorial(r) * factorial(n - r));
}

// Example
console.log(combinations(5, 3)); // Output: 10

// Example
console.log(factorial(5)); // Output: 120