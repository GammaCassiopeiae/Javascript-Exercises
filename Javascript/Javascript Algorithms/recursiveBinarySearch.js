function recursiveBinarySearch(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) {
    return -1; // Target not found
  }

  const midIndex = Math.floor((right + left) / 2);

  if (arr[midIndex] === target) {
    return midIndex; // Target found at middle index
  } else if (arr[midIndex] < target) {
    return recursiveBinarySearch(arr, target, midIndex + 1, right); // Search the right half.
  } else {
    return recursiveBinarySearch(arr, target, left, midIndex - 1); // Search the left half.
  }
}

const arrayToSearch = [11, 12, 22, 25, 34, 64, 90];
const targetElement = 25;
console.log(recursiveBinarySearch(arrayToSearch, targetElement)); // Output: 3
