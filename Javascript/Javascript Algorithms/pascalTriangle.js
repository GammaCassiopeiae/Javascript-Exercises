function getPascalTriangle(n) {
  const triangle = [];
  
  for (let i = 0; i < n; i++) {
    const row = new Array(i + 1).fill(1); // Initialize with all ones
    
    for (let j = 1; j < i; j++) {
      row[j] = triangle[i - 1][j - 1] + triangle[i - 1][j];
    }
    
    triangle.push(row);
  }

  return triangle;
}

// Example usage:
const numRows = 5;
console.log(getPascalTriangle(numRows));
