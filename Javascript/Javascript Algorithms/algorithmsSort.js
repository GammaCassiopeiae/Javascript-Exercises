function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    for (var j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        var temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

// Usage example:
var array = [5, 3, 8, 4, 2]; // Array to sort
var sortedArray1 = bubbleSort(array);


function quickSort(arr) {
  if (arr.length <= 1) return arr;

  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] <= pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
}

// Usage example:
var array = [5, 3, 8, 4, 2]; // Array to sort
var sortedArray2 = quickSort(array);


function selectionSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len - 1; i++) {
    var minIndex = i;

    // Find the index of minimum element in remaining array
    for (var j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap elements
    var temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }

  return arr;
}

// Usage example:
var array = [5, 3, 8, 4, 2]; // Array to sort
var sortedArray3 = selectionSort(array);


function insertionSort(arr) {
  var len = arr.length;
  for (var i = 1; i < len; i++) {
    var currentElement = arr[i];
    var j = i - 1;

    while (j >= 0 && arr[j] > currentElement) {
      // Move elements of arr[0..j] that are greater than currentElement to one position ahead
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = currentElement;
  }

  return arr;
}

// Usage example:
var array = [5, 3, 8, 4, 2]; // Array to sort
var sortedArray4 = insertionSort(array);


function merge(leftArr, rightArr) {
  var result = [];
  while (leftArr.length || rightArr.length) {
    if (!leftArr.length) {
      result.push(rightArr.shift());
    } else if (!rightArr.length) {
      result.push(leftArr.shift());
    } else {
      result.push(leftArr[0] <= rightArr[0] ? leftArr.shift() : rightArr.shift());
    }
  }

  return result;
}

function mergeSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  var mid = Math.floor(arr.length / 2);
  var leftArr = arr.slice(0, mid);
  var rightArr = arr.slice(mid);

  // Sort the left and right halves
  return merge(mergeSort(leftArr), mergeSort(rightArr));
}

// Usage example:
var array = [5, 3, 8, 4, 2]; // Array to sort
var sortedArray5 = mergeSort(array);

function print(){
    console.log(sortedArray1);
    console.log(sortedArray2);
    console.log(sortedArray3);
    console.log(sortedArray4);
    console.log(sortedArray5);
}

print();



