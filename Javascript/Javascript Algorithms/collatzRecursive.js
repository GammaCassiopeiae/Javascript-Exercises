function collatzRecursive(n) {
  if (n === 1) return [1]; // Base case recursion
  
  let result;
  
  if (n % 2 === 0) {
    result = collatzRecursive(n / 2);
  } else {
    result = collatzRecursive(3 * n + 1);
  }
  
  result.unshift(n); 
  return result;
}

// Example usage:
const startNumber2 = 6;
console.log(collatzRecursive(startNumber2)); // Output: [6, 3, 10, 5, 16, 8, 4, 2, 1]
