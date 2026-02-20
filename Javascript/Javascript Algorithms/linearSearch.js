function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1; // Return -1 if the element not found
}

// Example usage in Node.js
const arrayToSearch = [64, 34, 25, 12, 22, 11, 90];
const targetElement = 25;
console.log(linearSearch(arrayToSearch, targetElement)); // Output: 3
