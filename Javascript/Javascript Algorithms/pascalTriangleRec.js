function getPascalTriangleRecursive(n, row = [1], index = 0) {
  if (index === n) {
    return row;
  }
  
  // Generate the next number in the current row by summing two elements from the previous row
  const newRow = [...row];
  newRow[index] += row[index];
  
  if (newRow.length > 1 && newRow[newRow.length - 1] === undefined) {
    newRow.push(1); // Add a trailing one for the next iteration
  }
  
  return getPascalTriangleRecursive(n, newRow, index + 1);
}

// Example usage:
const numRows2 = 5;
console.log(getPascalTriangleRecursive(numRows2));
