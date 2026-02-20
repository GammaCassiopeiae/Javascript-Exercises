function binarySearch(arr, target) {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    const midIndex = Math.floor((rightIndex + leftIndex) / 2);
    
    if (arr[midIndex] === target) {
      return midIndex; // Target found
    } else if (arr[midIndex] < target) {
      leftIndex = midIndex + 1;
    } else {
      rightIndex = midIndex - 1;
    }
  }

  return -1; // Return -1 if the element not found
}

const arrayToSearch2 = [11, 12, 22, 25, 34, 64, 90];
const targetElement2 = 25;
console.log(binarySearch(arrayToSearch2, targetElement2)); // Output: 3
