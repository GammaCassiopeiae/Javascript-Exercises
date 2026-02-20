function insertionSort(arr) {
  let len = arr.length;
  for (let i = 1; i < len; i++) {
    let currentElement = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > currentElement) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = currentElement;
  }
  return arr;
}

const arrayToSort3 = [64, 34, 25, 12, 22, 11, 90];
console.log(insertionSort(arrayToSort3)); // Output: [11, 12, 22, 25, 34, 64, 90]
