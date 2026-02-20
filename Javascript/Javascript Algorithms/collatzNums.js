function collatz(n) {
  let steps = [];
  
  while (n !== 1) {
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
    
    // Store each step 
    steps.push(n);
  }

  return steps;
}

// Example usage:
const startNumber = 6;
console.log(collatz(startNumber)); // Output: [6, 3, 10, 5, 16, 8, 4, 2, 1]
