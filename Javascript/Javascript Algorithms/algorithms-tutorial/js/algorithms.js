/**
 * NEON ALGORITHMS TUTORIAL - Complete Algorithm Implementations
 * Following JavaScript conventions with proper indentation
 * 100+ Algorithms organized by category
 */

const ALGORITHMS_DB = [
  // =====================
  // SORTING ALGORITHMS (15)
  // =====================
  {
    id: 'bubble-sort',
    category: 'sorting',
    title: 'Bubble Sort',
    description: 'Simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Bubble Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function bubbleSort(arr) {
  const n = arr.length;
  
  // Outer loop for passes
  for (let i = 0; i < n - 1; i++) {
    // Flag to optimize - if no swaps, array is sorted
    let swapped = false;
    
    // Inner loop for comparisons
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap if in wrong order
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, array is sorted
    if (!swapped) break;
  }
  
  return arr;
}

// Usage Example
const array = [64, 34, 25, 12, 22, 11, 90];
console.log('Original:', array);
console.log('Sorted:', bubbleSort([...array]));`
  },
  {
    id: 'selection-sort',
    category: 'sorting',
    title: 'Selection Sort',
    description: 'Sorts by repeatedly finding the minimum element from unsorted part and putting it at the beginning.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function selectionSort(arr) {
  const n = arr.length;
  
  // Iterate through array
  for (let i = 0; i < n - 1; i++) {
    // Find minimum element in remaining unsorted array
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap found minimum with first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

// Usage Example
const array = [64, 25, 12, 22, 11];
console.log('Sorted:', selectionSort([...array]));`
  },
  {
    id: 'insertion-sort',
    category: 'sorting',
    title: 'Insertion Sort',
    description: 'Builds the final sorted array one item at a time by inserting each element into its correct position.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function insertionSort(arr) {
  const n = arr.length;
  
  // Start from second element
  for (let i = 1; i < n; i++) {
    // Current element to be inserted
    const key = arr[i];
    let j = i - 1;
    
    // Move elements greater than key to one position ahead
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    // Insert key at correct position
    arr[j + 1] = key;
  }
  
  return arr;
}

// Usage Example
const array = [12, 11, 13, 5, 6];
console.log('Sorted:', insertionSort([...array]));`
  },
  {
    id: 'merge-sort',
    category: 'sorting',
    title: 'Merge Sort',
    description: 'Divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back together.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Merge Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are sorted
  if (arr.length <= 1) return arr;
  
  // Find middle point
  const mid = Math.floor(arr.length / 2);
  
  // Divide array into two halves
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves and merge
  return merge(mergeSort(left), mergeSort(right));
}

/**
 * Merge two sorted arrays
 * @param {number[]} left - Left sorted array
 * @param {number[]} right - Right sorted array
 * @returns {number[]} - Merged sorted array
 */
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  // Compare elements from both arrays
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  // Add remaining elements
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Usage Example
const array = [38, 27, 43, 3, 9, 82, 10];
console.log('Sorted:', mergeSort([...array]));`
  },
  {
    id: 'quick-sort',
    category: 'sorting',
    title: 'Quick Sort',
    description: 'Divide-and-conquer algorithm that picks a pivot element and partitions the array around it.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    difficulty: 'Medium',
    code: `/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst
 * Space Complexity: O(log n)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  const array = arr.length === undefined ? [...arr] : arr;
  
  if (low < high) {
    // Partition array and get pivot index
    const pivotIndex = partition(array, low, high);
    
    // Recursively sort elements before and after partition
    quickSort(array, low, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, high);
  }
  
  return array;
}

/**
 * Partition function for Quick Sort
 * @param {number[]} arr - Array to partition
 * @param {number} low - Starting index
 * @param {number} high - Ending index
 * @returns {number} - Pivot index
 */
function partition(arr, low, high) {
  // Choose rightmost element as pivot
  const pivot = arr[high];
  let i = low - 1;
  
  // Partition smaller and larger elements
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  // Place pivot in correct position
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Usage Example
const array = [10, 7, 8, 9, 1, 5];
console.log('Sorted:', quickSort([...array]));`
  },
  {
    id: 'heap-sort',
    category: 'sorting',
    title: 'Heap Sort',
    description: 'Comparison-based sorting using a binary heap data structure. Builds a max heap and repeatedly extracts maximum.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Hard',
    code: `/**
 * Heap Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // Call heapify on reduced heap
    heapify(arr, i, 0);
  }
  
  return arr;
}

/**
 * Heapify subtree rooted at index i
 * @param {number[]} arr - Array representing heap
 * @param {number} n - Size of heap
 * @param {number} i - Root index
 */
function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;
  
  // Check if left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // Check if right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root, swap and heapify
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// Usage Example
const array = [12, 11, 13, 5, 6, 7];
console.log('Sorted:', heapSort([...array]));`
  },
  {
    id: 'counting-sort',
    category: 'sorting',
    title: 'Counting Sort',
    description: 'Non-comparison sorting algorithm that works by counting occurrences of each distinct element.',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n + k)' },
    spaceComplexity: 'O(k)',
    difficulty: 'Medium',
    code: `/**
 * Counting Sort Algorithm
 * Time Complexity: O(n + k) where k is range of input
 * Space Complexity: O(k)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function countingSort(arr) {
  if (arr.length === 0) return arr;
  
  // Find minimum and maximum values
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  
  // Create count array
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences of each element
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }
  
  // Calculate cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  return output;
}

// Usage Example
const array = [4, 2, 2, 8, 3, 3, 1];
console.log('Sorted:', countingSort([...array]));`
  },
  {
    id: 'radix-sort',
    category: 'sorting',
    title: 'Radix Sort',
    description: 'Non-comparison integer sorting algorithm that sorts by processing individual digits.',
    timeComplexity: { best: 'O(nk)', average: 'O(nk)', worst: 'O(nk)' },
    spaceComplexity: 'O(n + k)',
    difficulty: 'Hard',
    code: `/**
 * Radix Sort Algorithm
 * Time Complexity: O(nk) where k is number of digits
 * Space Complexity: O(n + k)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function radixSort(arr) {
  if (arr.length === 0) return arr;
  
  // Find maximum number to know number of digits
  const max = Math.max(...arr);
  
  // Do counting sort for every digit
  let exp = 1;
  while (Math.floor(max / exp) > 0) {
    countingSortByDigit(arr, exp);
    exp *= 10;
  }
  
  return arr;
}

/**
 * Counting sort by digit
 * @param {number[]} arr - Array to sort
 * @param {number} exp - Exponent (1, 10, 100, ...)
 */
function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n);
  const count = new Array(10).fill(0);
  
  // Count occurrences of digits
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy output to original array
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

// Usage Example
const array = [170, 45, 75, 90, 802, 24, 2, 66];
console.log('Sorted:', radixSort([...array]));`
  },
  {
    id: 'bucket-sort',
    category: 'sorting',
    title: 'Bucket Sort',
    description: 'Distribution sort that divides elements into buckets, sorts each bucket, and concatenates results.',
    timeComplexity: { best: 'O(n + k)', average: 'O(n + k)', worst: 'O(n²)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Bucket Sort Algorithm
 * Time Complexity: O(n + k) average, O(n²) worst
 * Space Complexity: O(n)
 * @param {number[]} arr - Array to sort
 * @param {number} bucketSize - Size of each bucket
 * @returns {number[]} - Sorted array
 */
function bucketSort(arr, bucketSize = 5) {
  if (arr.length === 0) return arr;

  // Find minimum and maximum values
  const min = Math.min(...arr);
  const max = Math.max(...arr);

  // Create buckets
  const bucketCount = Math.floor((max - min) / bucketSize) + 1;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (let i = 0; i < arr.length; i++) {
    const bucketIndex = Math.floor((arr[i] - min) / bucketSize);
    buckets[bucketIndex].push(arr[i]);
  }

  // Sort each bucket using insertion sort and concatenate
  const sorted = [];
  for (let i = 0; i < buckets.length; i++) {
    if (buckets[i].length > 0) {
      // Insertion sort for this bucket
      const bucket = buckets[i];
      for (let j = 1; j < bucket.length; j++) {
        const key = bucket[j];
        let k = j - 1;
        while (k >= 0 && bucket[k] > key) {
          bucket[k + 1] = bucket[k];
          k--;
        }
        bucket[k + 1] = key;
      }
      sorted.push(...bucket);
    }
  }

  return sorted;
}

// Usage Example (works best with uniformly distributed data)
const array = [0.897, 0.565, 0.656, 0.1234, 0.665, 0.3434];
console.log('Original:', array);
console.log('Sorted:', bucketSort([...array]));`
  },
  {
    id: 'shell-sort',
    category: 'sorting',
    title: 'Shell Sort',
    description: 'Generalization of insertion sort that allows exchange of far apart elements using gaps.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Shell Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function shellSort(arr) {
  const n = arr.length;
  
  // Start with large gap, then reduce
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do insertion sort for this gap
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;
      
      // Shift earlier gap-sorted elements
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        arr[j] = arr[j - gap];
      }
      
      // Put temp in correct location
      arr[j] = temp;
    }
  }
  
  return arr;
}

// Usage Example
const array = [12, 34, 54, 2, 3, 9, 17];
console.log('Sorted:', shellSort([...array]));`
  },
  {
    id: 'cocktail-sort',
    category: 'sorting',
    title: 'Cocktail Shaker Sort',
    description: 'Variation of bubble sort that sorts in both directions each pass through the list.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Cocktail Shaker Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function cocktailSort(arr) {
  const n = arr.length;
  let swapped = true;
  let start = 0;
  let end = n - 1;
  
  while (swapped) {
    swapped = false;
    
    // Forward pass (left to right)
    for (let i = start; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    
    if (!swapped) break;
    
    swapped = false;
    end--;
    
    // Backward pass (right to left)
    for (let i = end - 1; i >= start; i--) {
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
      }
    }
    
    start++;
  }
  
  return arr;
}

// Usage Example
const array = [5, 1, 4, 2, 8, 0, 2];
console.log('Sorted:', cocktailSort([...array]));`
  },
  {
    id: 'cycle-sort',
    category: 'sorting',
    title: 'Cycle Sort',
    description: 'In-place sorting algorithm that minimizes memory writes. Optimal in terms of number of writes.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Hard',
    code: `/**
 * Cycle Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * Minimizes number of writes to array
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function cycleSort(arr) {
  const n = arr.length;
  
  for (let cycleStart = 0; cycleStart <= n - 2; cycleStart++) {
    let item = arr[cycleStart];
    
    // Find position where item should go
    let pos = cycleStart;
    for (let i = cycleStart + 1; i < n; i++) {
      if (arr[i] < item) pos++;
    }
    
    if (pos === cycleStart) continue;
    
    // Skip duplicates
    while (item === arr[pos]) pos++;
    
    // Put item in correct position
    if (pos !== cycleStart) {
      [item, arr[pos]] = [arr[pos], item];
    }
    
    // Rotate rest of cycle
    while (pos !== cycleStart) {
      pos = cycleStart;
      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) pos++;
      }
      while (item === arr[pos]) pos++;
      if (item !== arr[pos]) {
        [item, arr[pos]] = [arr[pos], item];
      }
    }
  }
  
  return arr;
}

// Usage Example
const array = [20, 40, 50, 10, 30];
console.log('Sorted:', cycleSort([...array]));`
  },
  {
    id: 'tim-sort',
    category: 'sorting',
    title: 'Tim Sort',
    description: 'Hybrid sorting algorithm derived from merge sort and insertion sort. Used in Python and Java.',
    timeComplexity: { best: 'O(n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * Tim Sort Algorithm (Simplified)
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Hybrid of Merge Sort and Insertion Sort
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function timSort(arr) {
  const RUN = 32;
  const n = arr.length;

  // Sort individual runs using insertion sort
  for (let i = 0; i < n; i += RUN) {
    const end = Math.min(i + RUN - 1, n - 1);
    insertionSort(arr, i, end);
  }

  // Merge runs
  for (let size = RUN; size < n; size = 2 * size) {
    for (let left = 0; left < n; left += 2 * size) {
      const mid = Math.min(left + size - 1, n - 1);
      const right = Math.min(left + 2 * size - 1, n - 1);
      if (mid < right) merge(arr, left, mid, right);
    }
  }

  return arr;
}

/**
 * Insertion sort for a subarray
 * @param {number[]} arr - Array to sort
 * @param {number} left - Left index
 * @param {number} right - Right index
 */
function insertionSort(arr, left, right) {
  for (let i = left + 1; i <= right; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= left && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
}

/**
 * Merge two sorted subarrays
 * @param {number[]} arr - Array containing both subarrays
 * @param {number} left - Left subarray start
 * @param {number} mid - Left subarray end
 * @param {number} right - Right subarray end
 */
function merge(arr, left, mid, right) {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;
  while (i < leftArr.length && j < rightArr.length) {
    arr[k++] = leftArr[i] <= rightArr[j] ? leftArr[i++] : rightArr[j++];
  }
  while (i < leftArr.length) arr[k++] = leftArr[i++];
  while (j < rightArr.length) arr[k++] = rightArr[j++];
}

// Usage Example
const array = [5, 21, 7, 23, 19, 4, 32, 11];
console.log('Original:', array);
console.log('Sorted:', timSort([...array]));`
  },
  {
    id: 'gnome-sort',
    category: 'sorting',
    title: 'Gnome Sort',
    description: 'Simple sorting algorithm similar to insertion sort but uses swapping like bubble sort.',
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Gnome Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function gnomeSort(arr) {
  const n = arr.length;
  let index = 0;
  
  while (index < n) {
    if (index === 0 || arr[index - 1] <= arr[index]) {
      index++;
    } else {
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      index--;
    }
  }
  
  return arr;
}

// Usage Example
const array = [34, 2, 10, -9, 5, 20];
console.log('Sorted:', gnomeSort([...array]));`
  },
  {
    id: 'bogo-sort',
    category: 'sorting',
    title: 'Bogo Sort',
    description: 'Humorous sorting algorithm that randomly shuffles until sorted. Extremely inefficient - for educational purposes only.',
    timeComplexity: { best: 'O(n)', average: 'O(n × n!)', worst: 'O(∞)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Bogo Sort Algorithm (DO NOT USE IN PRODUCTION)
 * Time Complexity: O(n × n!) average
 * Space Complexity: O(1)
 * Educational purposes only!
 * @param {number[]} arr - Array to sort
 * @returns {number[]} - Sorted array
 */
function bogoSort(arr) {
  const isSorted = (array) => {
    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i + 1]) return false;
    }
    return true;
  };
  
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  
  const result = [...arr];
  while (!isSorted(result)) {
    shuffle(result);
  }
  
  return result;
}

// Usage Example (use very small arrays!)
const array = [3, 1, 2];
console.log('Sorted:', bogoSort([...array]));`
  },

  // =====================
  // SEARCH ALGORITHMS (12)
  // =====================
  {
    id: 'linear-search',
    category: 'search',
    title: 'Linear Search',
    description: 'Simple search algorithm that checks each element sequentially until target is found.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Linear Search Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} arr - Array to search
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Find all occurrences
function linearSearchAll(arr, target) {
  const indices = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) indices.push(i);
  }
  return indices;
}

// Usage Example
const array = [5, 3, 8, 4, 2, 8, 1];
console.log('Index:', linearSearch(array, 8));
console.log('All indices:', linearSearchAll(array, 8));`
  },
  {
    id: 'binary-search',
    category: 'search',
    title: 'Binary Search',
    description: 'Efficient search algorithm for sorted arrays that divides search interval in half each step.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Binary Search Algorithm (Iterative)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Requires sorted array
 * @param {number[]} arr - Sorted array to search
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  const mid = Math.floor((left + right) / 2);
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}

// Usage Example
const array = [1, 3, 5, 7, 9, 11, 13, 15];
console.log('Index:', binarySearch(array, 7));
console.log('Recursive:', binarySearchRecursive(array, 11));`
  },
  {
    id: 'ternary-search',
    category: 'search',
    title: 'Ternary Search',
    description: 'Divide-and-conquer search that divides array into three parts instead of two.',
    timeComplexity: { best: 'O(1)', average: 'O(log₃ n)', worst: 'O(log₃ n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Ternary Search Algorithm
 * Time Complexity: O(log₃ n)
 * Space Complexity: O(1)
 * Requires sorted array
 * @param {number[]} arr - Sorted array to search
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function ternarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid1 = Math.floor(left + (right - left) / 3);
    const mid2 = Math.floor(right - (right - left) / 3);
    
    if (arr[mid1] === target) return mid1;
    if (arr[mid2] === target) return mid2;
    
    if (target < arr[mid1]) right = mid1 - 1;
    else if (target > arr[mid2]) left = mid2 + 1;
    else { left = mid1 + 1; right = mid2 - 1; }
  }
  return -1;
}

// Usage Example
const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
console.log('Index:', ternarySearch(array, 11));`
  },
  {
    id: 'jump-search',
    category: 'search',
    title: 'Jump Search',
    description: 'Search algorithm for sorted arrays that jumps ahead by fixed steps and does linear search.',
    timeComplexity: { best: 'O(1)', average: 'O(√n)', worst: 'O(√n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Jump Search Algorithm
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 * Requires sorted array
 * @param {number[]} arr - Sorted array to search
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) return -1;
  }
  
  while (arr[prev] < target) {
    prev++;
    if (prev >= Math.min(step, n)) return -1;
  }
  
  return arr[prev] === target ? prev : -1;
}

// Usage Example
const array = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
console.log('Index:', jumpSearch(array, 55));`
  },
  {
    id: 'interpolation-search',
    category: 'search',
    title: 'Interpolation Search',
    description: 'Improved binary search for uniformly distributed sorted arrays using interpolation formula.',
    timeComplexity: { best: 'O(1)', average: 'O(log log n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Interpolation Search Algorithm
 * Time Complexity: O(log log n) average, O(n) worst
 * Space Complexity: O(1)
 * Works best with uniformly distributed sorted arrays
 * @param {number[]} arr - Sorted array to search
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function interpolationSearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  
  while (low <= high && target >= arr[low] && target <= arr[high]) {
    const pos = low + Math.floor(
      ((target - arr[low]) * (high - low)) / (arr[high] - arr[low])
    );
    
    if (arr[pos] === target) return pos;
    if (arr[pos] < target) low = pos + 1;
    else high = pos - 1;
  }
  return -1;
}

// Usage Example
const array = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
console.log('Index:', interpolationSearch(array, 70));`
  },
  {
    id: 'exponential-search',
    category: 'search',
    title: 'Exponential Search',
    description: 'Search algorithm for unbounded/infinite sorted arrays. Finds range then does binary search.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Exponential Search Algorithm
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Useful for unbounded/infinite arrays
 * @param {number[]} arr - Sorted array to search
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function exponentialSearch(arr, target) {
  const n = arr.length;
  if (arr[0] === target) return 0;

  // Find range by doubling index
  let i = 1;
  while (i < n && arr[i] <= target) i *= 2;

  // Binary search in the found range
  return binarySearchInRange(arr, target, Math.floor(i / 2), Math.min(i, n - 1));
}

/**
 * Binary search within a specific range
 * @param {number[]} arr - Sorted array
 * @param {number} target - Value to find
 * @param {number} left - Left boundary
 * @param {number} right - Right boundary
 * @returns {number} - Index of target or -1
 */
function binarySearchInRange(arr, target, left, right) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// Usage Example
const array = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
console.log('Index of 15:', exponentialSearch(array, 15));
console.log('Index of 1:', exponentialSearch(array, 1));
console.log('Index of 25:', exponentialSearch(array, 25));`
  },
  {
    id: 'fibonacci-search',
    category: 'search',
    title: 'Fibonacci Search',
    description: 'Search algorithm using Fibonacci numbers to divide array. Alternative to binary search.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Hard',
    code: `/**
 * Fibonacci Search Algorithm
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Uses Fibonacci numbers to divide array
 * @param {number[]} arr - Sorted array to search
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function fibonacciSearch(arr, target) {
  const n = arr.length;
  let fib2 = 0, fib1 = 1, fib = fib1 + fib2;
  
  while (fib < n) { fib2 = fib1; fib1 = fib; fib = fib1 + fib2; }
  
  let offset = -1;
  while (fib > 1) {
    const i = Math.min(offset + fib2, n - 1);
    if (arr[i] < target) {
      fib = fib1; fib1 = fib2; fib2 = fib - fib1; offset = i;
    } else if (arr[i] > target) {
      fib = fib2; fib1 = fib1 - fib2; fib2 = fib - fib1;
    } else return i;
  }
  if (fib1 && arr[offset + 1] === target) return offset + 1;
  return -1;
}

// Usage Example
const array = [2, 3, 4, 10, 40, 50, 60, 70, 80, 90];
console.log('Index:', fibonacciSearch(array, 50));`
  },
  {
    id: 'search-rotated',
    category: 'search',
    title: 'Search in Rotated Sorted Array',
    description: 'Binary search variation for arrays that are sorted but rotated at unknown pivot.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Search in Rotated Sorted Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * @param {number[]} arr - Rotated sorted array
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function searchRotated(arr, target) {
  let left = 0, right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    
    if (arr[left] <= arr[mid]) {
      if (arr[left] <= target && target < arr[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (arr[mid] < target && target <= arr[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}

// Usage Example
const array = [4, 5, 6, 7, 0, 1, 2];
console.log('Index:', searchRotated(array, 0));
console.log('Index:', searchRotated(array, 3));`
  },
  {
    id: 'find-peak',
    category: 'search',
    title: 'Find Peak Element',
    description: 'Find an element that is greater than its neighbors using binary search approach.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Find Peak Element
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 * Peak: element greater than its neighbors
 * @param {number[]} arr - Array to search
 * @returns {number} - Index of peak element
 */
function findPeakElement(arr) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < arr[mid + 1]) left = mid + 1;
    else right = mid;
  }
  return left;
}

// Usage Example
const array = [1, 3, 20, 4, 1, 0];
console.log('Peak index:', findPeakElement(array));`
  },
  {
    id: 'kth-smallest',
    category: 'search',
    title: 'Kth Smallest Element (QuickSelect)',
    description: 'Find the kth smallest element in an unsorted array using QuickSelect algorithm.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Hard',
    code: `/**
 * Find Kth Smallest Element (QuickSelect)
 * Time Complexity: O(n) average, O(n²) worst
 * Space Complexity: O(1)
 * @param {number[]} arr - Unsorted array
 * @param {number} k - Kth position (1-indexed)
 * @returns {number} - Kth smallest element
 */
function kthSmallest(arr, k) {
  if (k < 1 || k > arr.length) return null;
  const array = [...arr];
  return quickSelect(array, 0, array.length - 1, k - 1);
}

function quickSelect(arr, left, right, k) {
  if (left === right) return arr[left];
  const pivotIndex = partition(arr, left, right);
  if (k === pivotIndex) return arr[k];
  else if (k < pivotIndex) return quickSelect(arr, left, pivotIndex - 1, k);
  else return quickSelect(arr, pivotIndex + 1, right, k);
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) { [arr[i], arr[j]] = [arr[j], arr[i]]; i++; }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

// Usage Example
const array = [12, 3, 5, 7, 4, 19, 26];
console.log('3rd smallest:', kthSmallest(array, 3));`
  },
  {
    id: 'majority-element',
    category: 'search',
    title: 'Majority Element (Boyer-Moore)',
    description: 'Find element that appears more than n/2 times using Boyer-Moore voting algorithm.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Majority Element - Boyer-Moore Voting Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Finds element appearing more than n/2 times
 * @param {number[]} arr - Input array
 * @returns {number|null} - Majority element or null
 */
function majorityElement(arr) {
  let candidate = null, count = 0;
  
  for (const num of arr) {
    if (count === 0) { candidate = num; count = 1; }
    else if (num === candidate) count++;
    else count--;
  }
  
  // Verify
  count = 0;
  for (const num of arr) if (num === candidate) count++;
  return count > Math.floor(arr.length / 2) ? candidate : null;
}

// Usage Example
console.log('Majority:', majorityElement([3, 3, 4, 2, 3, 3, 3]));
console.log('Majority:', majorityElement([1, 2, 3, 4, 5]));`
  },
  {
    id: 'sentinel-search',
    category: 'search',
    title: 'Sentinel Search',
    description: 'Optimized linear search that places target at end to eliminate boundary checks.',
    timeComplexity: { best: 'O(1)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Sentinel Search Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * Note: This function temporarily modifies the array. Pass a copy if you need to preserve the original.
 * @param {number[]} arr - Array to search (will be temporarily modified then restored)
 * @param {number} target - Value to find
 * @returns {number} - Index of target or -1 if not found
 */
function sentinelSearch(arr, target) {
  const n = arr.length;
  if (n === 0) return -1;
  
  // Save last element and place target at end as sentinel
  const last = arr[n - 1];
  arr[n - 1] = target;

  // Search without boundary check
  let i = 0;
  while (arr[i] !== target) i++;

  // Restore last element
  arr[n - 1] = last;
  
  // Check if we found the target
  if (i < n - 1 || arr[n - 1] === target) return i;
  return -1;
}

// Usage Example - always pass a copy to avoid mutation
const array = [5, 3, 8, 4, 2, 7, 1];
console.log('Index of 4:', sentinelSearch([...array], 4));
console.log('Index of 9:', sentinelSearch([...array], 9));`
  },

  // =====================
  // ARRAY ALGORITHMS (15)
  // =====================
  {
    id: 'two-sum',
    category: 'array',
    title: 'Two Sum Problem',
    description: 'Find two numbers in array that add up to target value.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Easy',
    code: `/**
 * Two Sum Problem
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {number[]} nums - Input array
 * @param {number} target - Target sum
 * @returns {number[]} - Indices of two numbers
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}

// Usage Example
const array = [2, 7, 11, 15];
console.log('Indices:', twoSum(array, 9));`
  },
  {
    id: 'three-sum',
    category: 'array',
    title: 'Three Sum Problem',
    description: 'Find all unique triplets in array that sum to zero.',
    timeComplexity: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Three Sum Problem
 * Time Complexity: O(n²)
 * Space Complexity: O(1) excluding output
 * @param {number[]} nums - Input array
 * @returns {number[][]} - All unique triplets summing to zero
 */
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);
  const n = nums.length;
  
  for (let i = 0; i < n - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = n - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}

// Usage Example
const array = [-1, 0, 1, 2, -1, -4];
console.log('Triplets:', threeSum([...array]));`
  },
  {
    id: 'max-subarray',
    category: 'array',
    title: 'Maximum Subarray (Kadane\'s)',
    description: 'Find contiguous subarray with largest sum using Kadane\'s algorithm.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Maximum Subarray - Kadane's Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} nums - Input array
 * @returns {number} - Maximum subarray sum
 */
function maxSubArray(nums) {
  let maxSum = nums[0], currentSum = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentSum = Math.max(nums[i], currentSum + nums[i]);
    maxSum = Math.max(maxSum, currentSum);
  }
  return maxSum;
}

// Usage Example
const array = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log('Max Sum:', maxSubArray(array));`
  },
  {
    id: 'product-array',
    category: 'array',
    title: 'Product of Array Except Self',
    description: 'Return array where each element is product of all other elements without division.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Product of Array Except Self
 * Time Complexity: O(n)
 * Space Complexity: O(1) excluding output
 * @param {number[]} nums - Input array
 * @returns {number[]} - Product array
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);
  
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }
  
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }
  
  return result;
}

// Usage Example
const array = [1, 2, 3, 4];
console.log('Product Array:', productExceptSelf(array));`
  },
  {
    id: 'merge-intervals',
    category: 'array',
    title: 'Merge Intervals',
    description: 'Merge all overlapping intervals in a collection.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Merge Intervals
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * @param {number[][]} intervals - Array of [start, end] intervals
 * @returns {number[][]} - Merged intervals
 */
function mergeIntervals(intervals) {
  if (intervals.length === 0) return [];
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  
  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const current = intervals[i];
    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push(current);
    }
  }
  return merged;
}

// Usage Example
const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
console.log('Merged:', mergeIntervals(intervals));`
  },
  {
    id: 'rotate-array',
    category: 'array',
    title: 'Rotate Array',
    description: 'Rotate array to the right by k steps using reversal algorithm.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Rotate Array - Reversal Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} nums - Array to rotate
 * @param {number} k - Number of steps
 */
function rotateArray(nums, k) {
  const n = nums.length;
  k = k % n;
  reverse(nums, 0, n - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, n - 1);
}

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++; end--;
  }
}

// Usage Example
const array = [1, 2, 3, 4, 5, 6, 7];
rotateArray(array, 3);
console.log('Rotated:', array);`
  },
  {
    id: 'first-missing-positive',
    category: 'array',
    title: 'First Missing Positive',
    description: 'Find smallest missing positive integer in unsorted array.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Hard',
    code: `/**
 * First Missing Positive
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} nums - Input array
 * @returns {number} - First missing positive
 */
function firstMissingPositive(nums) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const correctIdx = nums[i] - 1;
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    }
  }
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return n + 1;
}

// Usage Example
console.log('Missing:', firstMissingPositive([3, 4, -1, 1]));`
  },
  {
    id: 'spiral-matrix',
    category: 'array',
    title: 'Spiral Matrix Traversal',
    description: 'Traverse 2D matrix in spiral order.',
    timeComplexity: { best: 'O(m*n)', average: 'O(m*n)', worst: 'O(m*n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Spiral Matrix Traversal
 * Time Complexity: O(m*n)
 * Space Complexity: O(1) excluding output
 * @param {number[][]} matrix - 2D matrix
 * @returns {number[]} - Elements in spiral order
 */
function spiralOrder(matrix) {
  if (matrix.length === 0) return [];
  const result = [];
  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;
  
  while (top <= bottom && left <= right) {
    for (let i = left; i <= right; i++) result.push(matrix[top][i]);
    top++;
    for (let i = top; i <= bottom; i++) result.push(matrix[i][right]);
    right--;
    if (top <= bottom) {
      for (let i = right; i >= left; i--) result.push(matrix[bottom][i]);
      bottom--;
    }
    if (left <= right) {
      for (let i = bottom; i >= top; i--) result.push(matrix[i][left]);
      left++;
    }
  }
  return result;
}

// Usage Example
const matrix = [[1,2,3],[4,5,6],[7,8,9]];
console.log('Spiral:', spiralOrder(matrix));`
  },
  {
    id: 'longest-consecutive',
    category: 'array',
    title: 'Longest Consecutive Sequence',
    description: 'Find length of longest consecutive elements sequence.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Longest Consecutive Sequence
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {number[]} nums - Unsorted array
 * @returns {number} - Length of longest consecutive sequence
 */
function longestConsecutive(nums) {
  if (nums.length === 0) return 0;
  const numSet = new Set(nums);
  let longest = 0;
  
  for (const num of numSet) {
    if (!numSet.has(num - 1)) {
      let currentNum = num, currentStreak = 1;
      while (numSet.has(currentNum + 1)) {
        currentNum++; currentStreak++;
      }
      longest = Math.max(longest, currentStreak);
    }
  }
  return longest;
}

// Usage Example
const array = [100, 4, 200, 1, 3, 2];
console.log('Longest:', longestConsecutive(array));`
  },
  {
    id: 'container-water',
    category: 'array',
    title: 'Container With Most Water',
    description: 'Find two lines that form container holding maximum water.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Container With Most Water
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} height - Array of line heights
 * @returns {number} - Maximum area
 */
function maxArea(height) {
  let maxArea = 0, left = 0, right = height.length - 1;
  while (left < right) {
    const h = Math.min(height[left], height[right]);
    const w = right - left;
    maxArea = Math.max(maxArea, h * w);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return maxArea;
}

// Usage Example
const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log('Max Area:', maxArea(heights));`
  },
  {
    id: 'trapping-rain',
    category: 'array',
    title: 'Trapping Rain Water',
    description: 'Calculate amount of water that can be trapped between bars.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * Trapping Rain Water
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {number[]} height - Array of bar heights
 * @returns {number} - Total trapped water
 */
function trap(height) {
  if (height.length === 0) return 0;
  const n = height.length;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);
  
  leftMax[0] = height[0];
  for (let i = 1; i < n; i++) leftMax[i] = Math.max(leftMax[i-1], height[i]);
  
  rightMax[n-1] = height[n-1];
  for (let i = n-2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i+1], height[i]);
  
  let water = 0;
  for (let i = 0; i < n; i++) {
    water += Math.min(leftMax[i], rightMax[i]) - height[i];
  }
  return water;
}

// Usage Example
const heights = [0,1,0,2,1,0,1,3,2,1,2,1];
console.log('Trapped Water:', trap(heights));`
  },
  {
    id: 'jump-game',
    category: 'array',
    title: 'Jump Game',
    description: 'Determine if you can reach the last index.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Jump Game
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} nums - Max jump length at each position
 * @returns {boolean} - True if last index is reachable
 */
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}

// Usage Example
console.log('Can Jump:', canJump([2,3,1,1,4]));
console.log('Can Jump:', canJump([3,2,1,0,4]));`
  },
  {
    id: 'find-duplicate',
    category: 'array',
    title: 'Find Duplicate (Floyd\'s Cycle)',
    description: 'Find duplicate using Floyd\'s cycle detection algorithm.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Find Duplicate - Floyd's Cycle Detection
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 * @param {number[]} nums - Array with n+1 integers in range [1, n]
 * @returns {number} - Duplicate number
 */
function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);
  
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}

// Usage Example
const array = [1, 3, 4, 2, 2];
console.log('Duplicate:', findDuplicate(array));`
  },
  {
    id: 'set-matrix-zeroes',
    category: 'array',
    title: 'Set Matrix Zeroes',
    description: 'If element is 0, set its entire row and column to 0s.',
    timeComplexity: { best: 'O(m*n)', average: 'O(m*n)', worst: 'O(m*n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Set Matrix Zeroes - In-place
 * Time Complexity: O(m*n)
 * Space Complexity: O(1)
 * @param {number[][]} matrix - Input matrix
 */
function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRowHasZero = false, firstColHasZero = false;
  
  for (let j = 0; j < n; j++) if (matrix[0][j] === 0) firstRowHasZero = true;
  for (let i = 0; i < m; i++) if (matrix[i][0] === 0) firstColHasZero = true;
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][j] === 0) { matrix[i][0] = 0; matrix[0][j] = 0; }
    }
  }
  
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;
    }
  }
  
  if (firstRowHasZero) for (let j = 0; j < n; j++) matrix[0][j] = 0;
  if (firstColHasZero) for (let i = 0; i < m; i++) matrix[i][0] = 0;
}

// Usage Example
const matrix = [[1,0,3],[4,5,6],[7,8,9]];
setZeroes(matrix);
console.log(matrix);`
  },
  {
    id: 'subarray-sum-k',
    category: 'array',
    title: 'Subarray Sum Equals K',
    description: 'Find total number of continuous subarrays whose sum equals k.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Subarray Sum Equals K
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {number[]} nums - Input array
 * @param {number} k - Target sum
 * @returns {number} - Count of subarrays
 */
function subarraySum(nums, k) {
  const map = new Map([[0, 1]]);
  let sum = 0, count = 0;
  
  for (const num of nums) {
    sum += num;
    if (map.has(sum - k)) count += map.get(sum - k);
    map.set(sum, (map.get(sum) || 0) + 1);
  }
  return count;
}

// Usage Example
console.log('Count:', subarraySum([1,1,1], 2));
console.log('Count:', subarraySum([1,2,3], 3));`
  },

  // =====================
  // LINKED LIST ALGORITHMS (10)
  // =====================
  {
    id: 'reverse-linked-list',
    category: 'linkedlist',
    title: 'Reverse Linked List',
    description: 'Reverse a singly linked list iteratively and recursively.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Reverse Linked List
 * Time Complexity: O(n)
 * Space Complexity: O(1) iterative, O(n) recursive
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Iterative approach
function reverseList(head) {
  let prev = null, current = head;
  while (current !== null) {
    const nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }
  return prev;
}

// Recursive approach
function reverseListRecursive(head) {
  if (head === null || head.next === null) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

// Usage Example
const node1 = new ListNode(1);
node1.next = new ListNode(2);
node1.next.next = new ListNode(3);
let reversed = reverseList(node1);`
  },
  {
    id: 'detect-cycle',
    category: 'linkedlist',
    title: 'Detect Cycle (Floyd\'s)',
    description: 'Detect if linked list has a cycle using Floyd\'s algorithm.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Detect Cycle - Floyd's Algorithm
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function hasCycle(head) {
  if (!head || !head.next) return false;
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}

// Find cycle start
function detectCycleStart(head) {
  if (!head || !head.next) return null;
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }
  if (!fast || !fast.next) return null;
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}`
  },
  {
    id: 'merge-two-lists',
    category: 'linkedlist',
    title: 'Merge Two Sorted Lists',
    description: 'Merge two sorted linked lists into one sorted list.',
    timeComplexity: { best: 'O(n+m)', average: 'O(n+m)', worst: 'O(n+m)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Merge Two Sorted Linked Lists
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) { current.next = l1; l1 = l1.next; }
    else { current.next = l2; l2 = l2.next; }
    current = current.next;
  }
  current.next = l1 || l2;
  return dummy.next;
}`
  },
  {
    id: 'remove-nth-node',
    category: 'linkedlist',
    title: 'Remove Nth Node From End',
    description: 'Remove nth node from end of list in one pass.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Remove Nth Node From End
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy, second = dummy;
  for (let i = 0; i <= n; i++) first = first.next;
  while (first !== null) { first = first.next; second = second.next; }
  second.next = second.next.next;
  return dummy.next;
}`
  },
  {
    id: 'middle-linked-list',
    category: 'linkedlist',
    title: 'Middle of Linked List',
    description: 'Find middle node using slow and fast pointers.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Middle of Linked List
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function middleNode(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow;
}`
  },
  {
    id: 'intersection-lists',
    category: 'linkedlist',
    title: 'Intersection of Two Lists',
    description: 'Find node where two linked lists intersect.',
    timeComplexity: { best: 'O(n+m)', average: 'O(n+m)', worst: 'O(n+m)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Easy',
    code: `/**
 * Intersection of Two Linked Lists
 * Time Complexity: O(n + m)
 * Space Complexity: O(1)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function getIntersectionNode(headA, headB) {
  if (!headA || !headB) return null;
  let pointerA = headA, pointerB = headB;
  while (pointerA !== pointerB) {
    pointerA = pointerA ? pointerA.next : headB;
    pointerB = pointerB ? pointerB.next : headA;
  }
  return pointerA;
}`
  },
  {
    id: 'add-two-numbers',
    category: 'linkedlist',
    title: 'Add Two Numbers',
    description: 'Add two numbers represented by linked lists (digits in reverse order).',
    timeComplexity: { best: 'O(max(n,m))', average: 'O(max(n,m))', worst: 'O(max(n,m))' },
    spaceComplexity: 'O(max(n,m))',
    difficulty: 'Medium',
    code: `/**
 * Add Two Numbers (Reverse Order)
 * Time Complexity: O(max(n, m))
 * Space Complexity: O(max(n, m))
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy, carry = 0;
  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    const sum = val1 + val2 + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
    if (l1) l1 = l1.next;
    if (l2) l2 = l2.next;
  }
  return dummy.next;
}`
  },
  {
    id: 'copy-list-random',
    category: 'linkedlist',
    title: 'Copy List with Random Pointer',
    description: 'Deep copy linked list with random pointers.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Copy List with Random Pointer
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
class Node {
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

function copyRandomList(head) {
  if (!head) return null;
  const map = new Map();
  let current = head;
  while (current) {
    map.set(current, new Node(current.val));
    current = current.next;
  }
  current = head;
  while (current) {
    const copy = map.get(current);
    copy.next = map.get(current.next) || null;
    copy.random = map.get(current.random) || null;
    current = current.next;
  }
  return map.get(head);
}`
  },
  {
    id: 'rotate-list',
    category: 'linkedlist',
    title: 'Rotate List',
    description: 'Rotate linked list to the right by k places.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Rotate List to Right by K Places
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function rotateRight(head, k) {
  if (!head || !head.next || k === 0) return head;
  let length = 1, tail = head;
  while (tail.next) { tail = tail.next; length++; }
  tail.next = head;
  k = k % length;
  const stepsToNewHead = length - k;
  let newTail = head;
  for (let i = 1; i < stepsToNewHead; i++) newTail = newTail.next;
  const newHead = newTail.next;
  newTail.next = null;
  return newHead;
}`
  },
  {
    id: 'lru-cache',
    category: 'linkedlist',
    title: 'LRU Cache',
    description: 'Implement Least Recently Used cache using hash map and doubly linked list.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(capacity)',
    difficulty: 'Medium',
    code: `/**
 * LRU Cache Implementation
 * Time Complexity: O(1) for get and put
 * Space Complexity: O(capacity)
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }
  
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._addToTail(node);
    return node.value;
  }
  
  put(key, value) {
    if (this.map.has(key)) this._remove(this.map.get(key));
    const node = new Node(key, value);
    this._addToTail(node);
    this.map.set(key, node);
    if (this.map.size > this.capacity) {
      const lru = this.head.next;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }
  
  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }
  
  _addToTail(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }
}`
  },

  // =====================
  // STACK ALGORITHMS (8)
  // =====================
  {
    id: 'valid-parentheses',
    category: 'stack',
    title: 'Valid Parentheses',
    description: 'Check if string of parentheses is valid using stack.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Easy',
    code: `/**
 * Valid Parentheses
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {string} s - String of parentheses
 * @returns {boolean} - True if valid
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const char of s) {
    if (char in map) {
      const top = stack.pop() || '#';
      if (map[char] !== top) return false;
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}

// Usage Example
console.log(isValid('()[]{}')); // true
console.log(isValid('([)]')); // false`
  },
  {
    id: 'min-stack',
    category: 'stack',
    title: 'Min Stack',
    description: 'Design stack that supports push, pop, top, and getMin in O(1).',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Min Stack - O(1) operations
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(n)
 */
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    this.stack.push(val);
    if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
      this.minStack.push(val);
    }
  }
  pop() {
    if (this.stack.pop() === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }
  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}`
  },
  {
    id: 'evaluate-rpn',
    category: 'stack',
    title: 'Evaluate Reverse Polish Notation',
    description: 'Evaluate arithmetic expression in RPN using stack.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Evaluate Reverse Polish Notation
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {string[]} tokens - RPN expression tokens
 * @returns {number} - Evaluation result
 */
function evalRPN(tokens) {
  const stack = [];
  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => Math.trunc(a / b)
  };
  for (const token of tokens) {
    if (token in operators) {
      const b = stack.pop(), a = stack.pop();
      stack.push(operators[token](a, b));
    } else {
      stack.push(parseInt(token));
    }
  }
  return stack[0];
}

// Usage Example
console.log(evalRPN(['2', '1', '+', '3', '*'])); // 9`
  },
  {
    id: 'daily-temperatures',
    category: 'stack',
    title: 'Daily Temperatures',
    description: 'Find how many days to wait for warmer temperature using monotonic stack.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Daily Temperatures - Monotonic Stack
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {number[]} temperatures - Array of daily temperatures
 * @returns {number[]} - Days to wait for warmer temperature
 */
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIndex = stack.pop();
      result[prevIndex] = i - prevIndex;
    }
    stack.push(i);
  }
  return result;
}`
  },
  {
    id: 'largest-rectangle',
    category: 'stack',
    title: 'Largest Rectangle in Histogram',
    description: 'Find largest rectangle area in histogram using monotonic stack.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * Largest Rectangle in Histogram
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {number[]} heights - Array of bar heights
 * @returns {number} - Maximum rectangle area
 */
function largestRectangleArea(heights) {
  const stack = [];
  let maxArea = 0;
  const n = heights.length;
  for (let i = 0; i <= n; i++) {
    const h = i === n ? 0 : heights[i];
    while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }
  return maxArea;
}`
  },
  {
    id: 'next-greater',
    category: 'stack',
    title: 'Next Greater Element',
    description: 'Find next greater element for each element using monotonic stack.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Easy',
    code: `/**
 * Next Greater Element
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 * @param {number[]} nums - Input array
 * @returns {number[]} - Next greater elements
 */
function nextGreaterElement(nums) {
  const n = nums.length;
  const result = new Array(n).fill(-1);
  const stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
    stack.push(i);
  }
  return result;
}`
  },
  {
    id: 'implement-queue-stacks',
    category: 'stack',
    title: 'Implement Queue using Stacks',
    description: 'Implement FIFO queue using only two LIFO stacks.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Easy',
    code: `/**
 * Implement Queue using Two Stacks
 * Time Complexity: O(1) amortized for push/pop
 * Space Complexity: O(n)
 */
class MyQueue {
  constructor() { this.stack1 = []; this.stack2 = []; }
  push(x) { this.stack1.push(x); }
  pop() { this._move(); return this.stack2.pop(); }
  peek() { this._move(); return this.stack2[this.stack2.length - 1]; }
  empty() { return this.stack1.length === 0 && this.stack2.length === 0; }
  _move() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) this.stack2.push(this.stack1.pop());
    }
  }
}`
  },
  {
    id: 'implement-stack-queues',
    category: 'stack',
    title: 'Implement Stack using Queues',
    description: 'Implement LIFO stack using only two FIFO queues.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Easy',
    code: `/**
 * Implement Stack using Two Queues
 * Time Complexity: O(1) for push, O(n) for pop
 * Space Complexity: O(n)
 */
class MyStack {
  constructor() { this.queue1 = []; this.queue2 = []; }
  push(x) { this.queue1.push(x); }
  pop() {
    while (this.queue1.length > 1) this.queue2.push(this.queue1.shift());
    const top = this.queue1.shift();
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
    return top;
  }
  top() {
    while (this.queue1.length > 1) this.queue2.push(this.queue1.shift());
    const top = this.queue1[0];
    this.queue2.push(this.queue1.shift());
    [this.queue1, this.queue2] = [this.queue2, this.queue1];
    return top;
  }
  empty() { return this.queue1.length === 0; }
}`
  },

  // =====================
  // QUEUE ALGORITHMS (6)
  // =====================
  {
    id: 'queue-bfs',
    category: 'queue',
    title: 'BFS using Queue',
    description: 'Breadth-First Search traversal using queue.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Breadth-First Search using Queue
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const result = [];
  visited.add(start);
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}

// Usage Example
const graph = { 0: [1, 2], 1: [0, 3, 4], 2: [0, 5], 3: [1], 4: [1], 5: [2] };
console.log(bfs(graph, 0));`
  },
  {
    id: 'sliding-window-max',
    category: 'queue',
    title: 'Sliding Window Maximum',
    description: 'Find maximum in each sliding window of size k using deque.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(k)',
    difficulty: 'Hard',
    code: `/**
 * Sliding Window Maximum - Deque Approach
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 * @param {number[]} nums - Input array
 * @param {number} k - Window size
 * @returns {number[]} - Maximum of each window
 */
function maxSlidingWindow(nums, k) {
  if (nums.length === 0) return [];
  const result = [], deque = [];
  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && deque[0] <= i - k) deque.shift();
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) result.push(nums[deque[0]]);
  }
  return result;
}

// Usage Example
console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));`
  },
  {
    id: 'perfect-squares',
    category: 'queue',
    title: 'Perfect Squares (BFS)',
    description: 'Find least number of perfect squares that sum to n using BFS.',
    timeComplexity: { best: 'O(n*√n)', average: 'O(n*√n)', worst: 'O(n*√n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Perfect Squares - BFS Approach
 * Time Complexity: O(n * √n)
 * Space Complexity: O(n)
 * @param {number} n - Target number
 * @returns {number} - Minimum number of perfect squares
 */
function numSquares(n) {
  const squares = [];
  for (let i = 1; i * i <= n; i++) squares.push(i * i);
  const queue = [[n, 0]], visited = new Set([n]);
  while (queue.length > 0) {
    const [remaining, steps] = queue.shift();
    for (const square of squares) {
      const next = remaining - square;
      if (next === 0) return steps + 1;
      if (next < 0) break;
      if (!visited.has(next)) {
        visited.add(next);
        queue.push([next, steps + 1]);
      }
    }
  }
  return -1;
}`
  },
  {
    id: 'word-ladder',
    category: 'queue',
    title: 'Word Ladder (BFS)',
    description: 'Find shortest transformation sequence between words using BFS.',
    timeComplexity: { best: 'O(M²*N)', average: 'O(M²*N)', worst: 'O(M²*N)' },
    spaceComplexity: 'O(M²*N)',
    difficulty: 'Hard',
    code: `/**
 * Word Ladder - BFS
 * Time Complexity: O(M² * N) where M is word length, N is number of words
 * Space Complexity: O(M² * N)
 * @param {string} beginWord - Starting word
 * @param {string} endWord - Target word
 * @param {string[]} wordList - Dictionary of words
 * @returns {number} - Length of shortest transformation or 0
 */
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const queue = [[beginWord, 1]];
  while (queue.length > 0) {
    const [word, level] = queue.shift();
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) {
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);
        if (newWord === endWord) return level + 1;
        if (wordSet.has(newWord)) {
          wordSet.delete(newWord);
          queue.push([newWord, level + 1]);
        }
      }
    }
  }
  return 0;
}`
  },
  {
    id: 'rotting-oranges',
    category: 'queue',
    title: 'Rotting Oranges (BFS)',
    description: 'Find minimum time to rot all oranges using multi-source BFS.',
    timeComplexity: { best: 'O(m*n)', average: 'O(m*n)', worst: 'O(m*n)' },
    spaceComplexity: 'O(m*n)',
    difficulty: 'Medium',
    code: `/**
 * Rotting Oranges - Multi-source BFS
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 * @param {number[][]} grid - Grid with 0=empty, 1=fresh, 2=rotten
 * @returns {number} - Minutes until no fresh oranges or -1
 */
function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const queue = [];
  let freshCount = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) queue.push([i, j, 0]);
      if (grid[i][j] === 1) freshCount++;
    }
  }
  let minutes = 0;
  const dirs = [[0,1], [0,-1], [1,0], [-1,0]];
  while (queue.length > 0) {
    const [i, j, time] = queue.shift();
    minutes = time;
    for (const [di, dj] of dirs) {
      const ni = i + di, nj = j + dj;
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {
        grid[ni][nj] = 2;
        freshCount--;
        queue.push([ni, nj, time + 1]);
      }
    }
  }
  return freshCount === 0 ? minutes : -1;
}`
  },
  {
    id: 'design-circular-queue',
    category: 'queue',
    title: 'Design Circular Queue',
    description: 'Implement circular queue (ring buffer) data structure.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(k)',
    difficulty: 'Medium',
    code: `/**
 * Design Circular Queue
 * Time Complexity: O(1) for all operations
 * Space Complexity: O(k)
 */
class MyCircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.head = 0;
    this.tail = -1;
    this.size = 0;
    this.capacity = k;
  }
  enQueue(value) {
    if (this.isFull()) return false;
    this.tail = (this.tail + 1) % this.capacity;
    this.queue[this.tail] = value;
    this.size++;
    return true;
  }
  deQueue() {
    if (this.isEmpty()) return false;
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return true;
  }
  Front() { return this.isEmpty() ? -1 : this.queue[this.head]; }
  Rear() { return this.isEmpty() ? -1 : this.queue[this.tail]; }
  isEmpty() { return this.size === 0; }
  isFull() { return this.size === this.capacity; }
}`
  },

  // =====================
  // TREE ALGORITHMS (12)
  // =====================
  {
    id: 'binary-tree-inorder',
    category: 'tree',
    title: 'Binary Tree Inorder Traversal',
    description: 'Traverse binary tree in inorder (left, root, right) recursively and iteratively.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    difficulty: 'Easy',
    code: `/**
 * Binary Tree Inorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(h) where h is tree height
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Recursive approach
function inorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    result.push(node.val);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

// Iterative approach using stack
function inorderTraversalIterative(root) {
  const result = [], stack = [];
  let current = root;
  while (current || stack.length > 0) {
    while (current) { stack.push(current); current = current.left; }
    current = stack.pop();
    result.push(current.val);
    current = current.right;
  }
  return result;
}`
  },
  {
    id: 'binary-tree-preorder',
    category: 'tree',
    title: 'Binary Tree Preorder Traversal',
    description: 'Traverse binary tree in preorder (root, left, right).',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    difficulty: 'Easy',
    code: `/**
 * Binary Tree Preorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Recursive
function preorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    result.push(node.val);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(root);
  return result;
}

// Iterative
function preorderTraversalIterative(root) {
  if (!root) return [];
  const result = [], stack = [root];
  while (stack.length > 0) {
    const node = stack.pop();
    result.push(node.val);
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return result;
}`
  },
  {
    id: 'binary-tree-postorder',
    category: 'tree',
    title: 'Binary Tree Postorder Traversal',
    description: 'Traverse binary tree in postorder (left, right, root).',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    difficulty: 'Easy',
    code: `/**
 * Binary Tree Postorder Traversal
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Recursive
function postorderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    traverse(node.left);
    traverse(node.right);
    result.push(node.val);
  }
  traverse(root);
  return result;
}

// Iterative using two stacks
function postorderTraversalIterative(root) {
  if (!root) return [];
  const stack1 = [root], stack2 = [], result = [];
  while (stack1.length > 0) {
    const node = stack1.pop();
    stack2.push(node);
    if (node.left) stack1.push(node.left);
    if (node.right) stack1.push(node.right);
  }
  while (stack2.length > 0) result.push(stack2.pop().val);
  return result;
}`
  },
  {
    id: 'level-order-traversal',
    category: 'tree',
    title: 'Level Order Traversal (BFS)',
    description: 'Traverse binary tree level by level using BFS.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(w)',
    difficulty: 'Medium',
    code: `/**
 * Level Order Traversal (BFS)
 * Time Complexity: O(n)
 * Space Complexity: O(w) where w is max width
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`
  },
  {
    id: 'max-depth',
    category: 'tree',
    title: 'Maximum Depth of Binary Tree',
    description: 'Find maximum depth of binary tree using DFS or BFS.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    difficulty: 'Easy',
    code: `/**
 * Maximum Depth of Binary Tree
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// DFS Recursive
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// BFS Iterative
function maxDepthBFS(root) {
  if (!root) return 0;
  let depth = 0;
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    depth++;
  }
  return depth;
}`
  },
  {
    id: 'validate-bst',
    category: 'tree',
    title: 'Validate Binary Search Tree',
    description: 'Check if binary tree is a valid BST.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    difficulty: 'Medium',
    code: `/**
 * Validate Binary Search Tree
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isValidBST(root) {
  function validate(node, min, max) {
    if (!node) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
  }
  return validate(root, -Infinity, Infinity);
}`
  },
  {
    id: 'lowest-common-ancestor',
    category: 'tree',
    title: 'Lowest Common Ancestor',
    description: 'Find lowest common ancestor of two nodes in binary tree.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(h)',
    difficulty: 'Medium',
    code: `/**
 * Lowest Common Ancestor
 * Time Complexity: O(n)
 * Space Complexity: O(h)
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}`
  },
  {
    id: 'serialize-deserialize',
    category: 'tree',
    title: 'Serialize and Deserialize Tree',
    description: 'Convert binary tree to string and back.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * Serialize and Deserialize Binary Tree
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Codec {
  serialize(root) {
    const result = [];
    function dfs(node) {
      if (!node) { result.push('null'); return; }
      result.push(node.val.toString());
      dfs(node.left);
      dfs(node.right);
    }
    dfs(root);
    return result.join(',');
  }
  
  deserialize(data) {
    const values = data.split(',');
    let i = 0;
    function dfs() {
      if (values[i] === 'null') { i++; return null; }
      const node = new TreeNode(parseInt(values[i++]));
      node.left = dfs();
      node.right = dfs();
      return node;
    }
    return dfs();
  }
}`
  },
  {
    id: 'trie',
    category: 'tree',
    title: 'Trie (Prefix Tree)',
    description: 'Implement Trie data structure for efficient string operations.',
    timeComplexity: { best: 'O(m)', average: 'O(m)', worst: 'O(m)' },
    spaceComplexity: 'O(alphabet * N * m)',
    difficulty: 'Medium',
    code: `/**
 * Trie (Prefix Tree) Implementation
 * Time Complexity: O(m) for insert, search, startsWith
 * Space Complexity: O(alphabet * N * m)
 */
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }
  
  search(word) {
    const node = this._findNode(word);
    return node !== null && node.isEndOfWord;
  }
  
  startsWith(prefix) {
    return this._findNode(prefix) !== null;
  }
  
  _findNode(str) {
    let node = this.root;
    for (const char of str) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }
    return node;
  }
}`
  },
  {
    id: 'avl-tree',
    category: 'tree',
    title: 'AVL Tree',
    description: 'Self-balancing binary search tree with O(log n) operations.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * AVL Tree - Self-balancing BST
 * Time Complexity: O(log n) for insert, search, delete
 * Space Complexity: O(n)
 */
class AVLNode {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  constructor() { this.root = null; }
  
  _height(node) { return node ? node.height : 0; }
  
  _balanceFactor(node) {
    return node ? this._height(node.left) - this._height(node.right) : 0;
  }
  
  _updateHeight(node) {
    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
  }
  
  _rotateRight(y) {
    const x = y.left, T2 = x.right;
    x.right = y; y.left = T2;
    this._updateHeight(y); this._updateHeight(x);
    return x;
  }
  
  _rotateLeft(x) {
    const y = x.right, T2 = y.left;
    y.left = x; x.right = T2;
    this._updateHeight(x); this._updateHeight(y);
    return y;
  }
  
  insert(key) { this.root = this._insert(this.root, key); }
  
  _insert(node, key) {
    if (!node) return new AVLNode(key);
    if (key < node.key) node.left = this._insert(node.left, key);
    else if (key > node.key) node.right = this._insert(node.right, key);
    else return node;
    
    this._updateHeight(node);
    const balance = this._balanceFactor(node);
    
    if (balance > 1 && key < node.left.key) return this._rotateRight(node);
    if (balance < -1 && key > node.right.key) return this._rotateLeft(node);
    if (balance > 1 && key > node.left.key) {
      node.left = this._rotateLeft(node.left);
      return this._rotateRight(node);
    }
    if (balance < -1 && key < node.right.key) {
      node.right = this._rotateRight(node.right);
      return this._rotateLeft(node);
    }
    return node;
  }
}`
  },
  {
    id: 'segment-tree',
    category: 'tree',
    title: 'Segment Tree',
    description: 'Data structure for range queries and updates.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * Segment Tree for Range Sum Queries
 * Time Complexity: O(log n) for query and update
 * Space Complexity: O(n)
 */
class SegmentTree {
  constructor(nums) {
    this.n = nums.length;
    this.tree = new Array(4 * this.n).fill(0);
    if (this.n > 0) this._build(nums, 0, 0, this.n - 1);
  }
  
  _build(nums, node, start, end) {
    if (start === end) { this.tree[node] = nums[start]; return; }
    const mid = Math.floor((start + end) / 2);
    this._build(nums, 2 * node + 1, start, mid);
    this._build(nums, 2 * node + 2, mid + 1, end);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }
  
  update(index, val) { this._update(0, 0, this.n - 1, index, val); }
  
  _update(node, start, end, idx, val) {
    if (start === end) { this.tree[node] = val; return; }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) this._update(2 * node + 1, start, mid, idx, val);
    else this._update(2 * node + 2, mid + 1, end, idx, val);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }
  
  queryRange(left, right) { return this._query(0, 0, this.n - 1, left, right); }
  
  _query(node, start, end, left, right) {
    if (right < start || left > end) return 0;
    if (left <= start && end <= right) return this.tree[node];
    const mid = Math.floor((start + end) / 2);
    return this._query(2 * node + 1, start, mid, left, right) +
           this._query(2 * node + 2, mid + 1, end, left, right);
  }
}`
  },
  {
    id: 'fenwick-tree',
    category: 'tree',
    title: 'Fenwick Tree (Binary Indexed Tree)',
    description: 'Efficient data structure for prefix sums and updates.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * Fenwick Tree (Binary Indexed Tree)
 * Time Complexity: O(log n) for update and query
 * Space Complexity: O(n)
 */
class FenwickTree {
  constructor(n) {
    this.n = n;
    this.tree = new Array(n + 1).fill(0);
  }
  
  update(index, delta) {
    index++; // 1-indexed
    while (index <= this.n) {
      this.tree[index] += delta;
      index += index & (-index);
    }
  }
  
  query(index) {
    index++; // 1-indexed
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & (-index);
    }
    return sum;
  }
  
  queryRange(left, right) {
    return this.query(right) - (left > 0 ? this.query(left - 1) : 0);
  }
}`
  },
  {
    id: 'red-black-tree',
    category: 'tree',
    title: 'Red-Black Tree',
    description: 'Self-balancing BST with color property for balance.',
    timeComplexity: { best: 'O(log n)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Hard',
    code: `/**
 * Red-Black Tree (Simplified)
 * Time Complexity: O(log n) for insert, search, delete
 * Space Complexity: O(n)
 * 
 * Properties:
 * 1. Every node is either red or black
 * 2. Root is black
 * 3. All leaves (null) are black
 * 4. Red nodes have black children (no two reds in a row)
 * 5. All paths from root to leaves have same black height
 */
const RED = true, BLACK = false;

class RBNode {
  constructor(key, color = RED) {
    this.key = key;
    this.color = color;
    this.left = null;
    this.right = null;
    this.parent = null;
  }
}

class RedBlackTree {
  constructor() { this.root = null; }

  insert(key) {
    const node = new RBNode(key);
    this._bstInsert(node);
    this._fixInsert(node);
  }

  _bstInsert(node) {
    let y = null, x = this.root;
    while (x) { y = x; x = node.key < x.key ? x.left : x.right; }
    node.parent = y;
    if (!y) this.root = node;
    else if (node.key < y.key) y.left = node;
    else y.right = node;
  }

  _fixInsert(node) {
    while (node !== this.root && node.parent.color === RED) {
      if (node.parent === node.parent.parent.left) {
        const uncle = node.parent.parent.right;
        if (uncle && uncle.color === RED) {
          node.parent.color = BLACK; uncle.color = BLACK;
          node.parent.parent.color = RED; node = node.parent.parent;
        } else {
          if (node === node.parent.right) {
            node = node.parent; this._leftRotate(node);
          }
          node.parent.color = BLACK; node.parent.parent.color = RED;
          this._rightRotate(node.parent.parent);
        }
      } else {
        // Symmetric case - uncle is on the right
        const uncle = node.parent.parent.left;
        if (uncle && uncle.color === RED) {
          node.parent.color = BLACK; uncle.color = BLACK;
          node.parent.parent.color = RED; node = node.parent.parent;
        } else {
          if (node === node.parent.left) {
            node = node.parent; this._rightRotate(node);
          }
          node.parent.color = BLACK; node.parent.parent.color = RED;
          this._leftRotate(node.parent.parent);
        }
      }
    }
    this.root.color = BLACK;
  }

  _leftRotate(x) {
    const y = x.right;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) this.root = y;
    else if (x === x.parent.left) x.parent.left = y;
    else x.parent.right = y;
    y.left = x;
    x.parent = y;
  }

  _rightRotate(y) {
    const x = y.left;
    y.left = x.right;
    if (x.right) x.right.parent = y;
    x.parent = y.parent;
    if (!y.parent) this.root = x;
    else if (y === y.parent.left) y.parent.left = x;
    else y.parent.right = x;
    x.right = y;
    y.parent = x;
  }

  search(key) {
    let current = this.root;
    while (current) {
      if (key === current.key) return current;
      current = key < current.key ? current.left : current.right;
    }
    return null;
  }

  inorder() {
    const result = [];
    this._inorderHelper(this.root, result);
    return result;
  }

  _inorderHelper(node, result) {
    if (node) {
      this._inorderHelper(node.left, result);
      result.push(node.key);
      this._inorderHelper(node.right, result);
    }
  }
}

// Usage Example
const tree = new RedBlackTree();
[50, 30, 70, 20, 40, 60, 80].forEach(v => tree.insert(v));
console.log('Inorder:', tree.inorder());
console.log('Search 40:', tree.search(40) ? 'Found' : 'Not found');`
  },

  // =====================
  // HEAP ALGORITHMS (6)
  // =====================
  {
    id: 'binary-heap',
    category: 'heap',
    title: 'Binary Heap',
    description: 'Implement min/max binary heap data structure.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Binary Min Heap
 * Time Complexity: O(1) findMin, O(log n) insert/extractMin
 * Space Complexity: O(n)
 */
class MinHeap {
  constructor() { this.heap = []; }
  
  _parent(i) { return Math.floor((i - 1) / 2); }
  _leftChild(i) { return 2 * i + 1; }
  _rightChild(i) { return 2 * i + 2; }
  
  _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  
  insert(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }
  
  _bubbleUp(i) {
    while (i > 0 && this.heap[this._parent(i)] > this.heap[i]) {
      this._swap(i, this._parent(i));
      i = this._parent(i);
    }
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = this._leftChild(i), right = this._rightChild(i);
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      this._swap(i, smallest);
      i = smallest;
    }
  }
  
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }
}`
  },
  {
    id: 'max-heap',
    category: 'heap',
    title: 'Max Heap',
    description: 'Implement max binary heap where root is maximum.',
    timeComplexity: { best: 'O(1)', average: 'O(log n)', worst: 'O(log n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Binary Max Heap
 * Time Complexity: O(1) findMax, O(log n) insert/extractMax
 * Space Complexity: O(n)
 */
class MaxHeap {
  constructor() { this.heap = []; }
  
  _parent(i) { return Math.floor((i - 1) / 2); }
  _leftChild(i) { return 2 * i + 1; }
  _rightChild(i) { return 2 * i + 2; }
  _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  
  insert(value) {
    this.heap.push(value);
    this._bubbleUp(this.heap.length - 1);
  }
  
  _bubbleUp(i) {
    while (i > 0 && this.heap[this._parent(i)] < this.heap[i]) {
      this._swap(i, this._parent(i));
      i = this._parent(i);
    }
  }
  
  extractMax() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return max;
  }
  
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let largest = i;
      const left = this._leftChild(i), right = this._rightChild(i);
      if (left < n && this.heap[left] > this.heap[largest]) largest = left;
      if (right < n && this.heap[right] > this.heap[largest]) largest = right;
      if (largest === i) break;
      this._swap(i, largest);
      i = largest;
    }
  }
  
  peek() { return this.heap[0]; }
}`
  },
  {
    id: 'heap-sort',
    category: 'heap',
    title: 'Heap Sort (using Heap)',
    description: 'Sort array using heap data structure.',
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Heap Sort
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
function heapSort(arr) {
  const n = arr.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  
  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1, right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`
  },
  {
    id: 'kth-largest',
    category: 'heap',
    title: 'Kth Largest Element',
    description: 'Find kth largest element using min heap.',
    timeComplexity: { best: 'O(n log k)', average: 'O(n log k)', worst: 'O(n log k)' },
    spaceComplexity: 'O(k)',
    difficulty: 'Medium',
    code: `/**
 * Kth Largest Element using Min Heap
 * Time Complexity: O(n log k)
 * Space Complexity: O(k)
 */
class MinHeap {
  constructor() { this.heap = []; }
  _parent(i) { return Math.floor((i - 1) / 2); }
  _leftChild(i) { return 2 * i + 1; }
  _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  
  insert(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[this._parent(i)] > this.heap[i]) {
      this._swap(i, this._parent(i)); i = this._parent(i);
    }
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i, left = 2*i+1, right = 2*i+2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      this._swap(i, smallest); i = smallest;
    }
  }
  
  peek() { return this.heap[0]; }
  size() { return this.heap.length; }
}

function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) minHeap.extractMin();
  }
  return minHeap.peek();
}`
  },
  {
    id: 'merge-k-lists',
    category: 'heap',
    title: 'Merge K Sorted Lists',
    description: 'Merge k sorted linked lists using min heap.',
    timeComplexity: { best: 'O(N log k)', average: 'O(N log k)', worst: 'O(N log k)' },
    spaceComplexity: 'O(k)',
    difficulty: 'Hard',
    code: `/**
 * Merge K Sorted Lists using Min Heap
 * Time Complexity: O(N log k) where N is total elements
 * Space Complexity: O(k)
 */
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val; this.next = next;
  }
}

class MinHeap {
  constructor() { this.heap = []; }
  _parent(i) { return Math.floor((i - 1) / 2); }
  _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  
  insert(node) {
    this.heap.push(node);
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[this._parent(i)].val > this.heap[i].val) {
      this._swap(i, this._parent(i)); i = this._parent(i);
    }
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i, left = 2*i+1, right = 2*i+2;
      if (left < n && this.heap[left].val < this.heap[smallest].val) smallest = left;
      if (right < n && this.heap[right].val < this.heap[smallest].val) smallest = right;
      if (smallest === i) break;
      this._swap(i, smallest); i = smallest;
    }
  }
  
  size() { return this.heap.length; }
}

function mergeKLists(lists) {
  const heap = new MinHeap(), dummy = new ListNode(0);
  let current = dummy;
  for (const list of lists) if (list) heap.insert(list);
  while (heap.size() > 0) {
    const node = heap.extractMin();
    current.next = node; current = current.next;
    if (node.next) heap.insert(node.next);
  }
  return dummy.next;
}`
  },
  {
    id: 'top-k-frequent',
    category: 'heap',
    title: 'Top K Frequent Elements',
    description: 'Find k most frequent elements using heap.',
    timeComplexity: { best: 'O(n log k)', average: 'O(n log k)', worst: 'O(n log k)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Top K Frequent Elements
 * Time Complexity: O(n log k)
 * Space Complexity: O(n)
 */
class MinHeap {
  constructor() { this.heap = []; }
  _parent(i) { return Math.floor((i - 1) / 2); }
  _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  
  insert(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0 && this.heap[this._parent(i)][1] > this.heap[i][1]) {
      this._swap(i, this._parent(i)); i = this._parent(i);
    }
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i, left = 2*i+1, right = 2*i+2;
      if (left < n && this.heap[left][1] < this.heap[smallest][1]) smallest = left;
      if (right < n && this.heap[right][1] < this.heap[smallest][1]) smallest = right;
      if (smallest === i) break;
      this._swap(i, smallest); i = smallest;
    }
  }
  
  size() { return this.heap.length; }
}

function topKFrequent(nums, k) {
  const freq = new Map();
  for (const num of nums) freq.set(num, (freq.get(num) || 0) + 1);
  
  const heap = new MinHeap();
  for (const [num, count] of freq) {
    heap.insert([num, count]);
    if (heap.size() > k) heap.extractMin();
  }
  
  return heap.heap.map(([num]) => num);
}`
  },

  // =====================
  // HASH TABLE ALGORITHMS (6)
  // =====================
  {
    id: 'hash-table',
    category: 'hashtable',
    title: 'Hash Table Implementation',
    description: 'Implement hash table with chaining for collision resolution.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Medium',
    code: `/**
 * Hash Table with Chaining
 * Time Complexity: O(1) average for get, set, delete
 * Space Complexity: O(n)
 */
class HashNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable {
  constructor(size = 16) {
    this.size = size;
    this.buckets = new Array(size).fill(null);
    this.count = 0;
  }
  
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = ((hash << 5) - hash) + key.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.abs(hash) % this.size;
  }
  
  _resize() {
    const oldBuckets = this.buckets;
    this.size *= 2;
    this.buckets = new Array(this.size).fill(null);
    this.count = 0;
    for (let head of oldBuckets) {
      while (head) {
        this.set(head.key, head.value);
        head = head.next;
      }
    }
  }
  
  set(key, value) {
    if (this.count / this.size > 0.75) this._resize();
    const index = this._hash(key);
    let node = this.buckets[index];
    while (node) {
      if (node.key === key) { node.value = value; return; }
      node = node.next;
    }
    const newNode = new HashNode(key, value);
    newNode.next = this.buckets[index];
    this.buckets[index] = newNode;
    this.count++;
  }
  
  get(key) {
    const index = this._hash(key);
    let node = this.buckets[index];
    while (node) {
      if (node.key === key) return node.value;
      node = node.next;
    }
    return undefined;
  }
  
  delete(key) {
    const index = this._hash(key);
    let node = this.buckets[index], prev = null;
    while (node) {
      if (node.key === key) {
        if (prev) prev.next = node.next;
        else this.buckets[index] = node.next;
        this.count--;
        return true;
      }
      prev = node; node = node.next;
    }
    return false;
  }
  
  has(key) { return this.get(key) !== undefined; }
  keys() {
    const result = [];
    for (let head of this.buckets) {
      while (head) { result.push(head.key); head = head.next; }
    }
    return result;
  }
}`
  },
  {
    id: 'two-sum-hash',
    category: 'hashtable',
    title: 'Two Sum (Hash Table)',
    description: 'Classic two sum problem using hash table for O(n) solution.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Easy',
    code: `/**
 * Two Sum using Hash Table
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`
  },
  {
    id: 'group-anagrams',
    category: 'hashtable',
    title: 'Group Anagrams',
    description: 'Group strings that are anagrams of each other using hash table.',
    timeComplexity: { best: 'O(n*k)', average: 'O(n*k)', worst: 'O(n*k)' },
    spaceComplexity: 'O(n*k)',
    difficulty: 'Medium',
    code: `/**
 * Group Anagrams
 * Time Complexity: O(n * k) where k is max string length
 * Space Complexity: O(n * k)
 */
function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return Array.from(map.values());
}`
  },
  {
    id: 'valid-sudoku',
    category: 'hashtable',
    title: 'Valid Sudoku',
    description: 'Validate Sudoku board using hash sets.',
    timeComplexity: { best: 'O(1)', average: 'O(1)', worst: 'O(1)' },
    spaceComplexity: 'O(1)',
    difficulty: 'Medium',
    code: `/**
 * Valid Sudoku
 * Time Complexity: O(1) - fixed 9x9 board
 * Space Complexity: O(1)
 */
function isValidSudoku(board) {
  const rows = Array.from({length: 9}, () => new Set());
  const cols = Array.from({length: 9}, () => new Set());
  const boxes = Array.from({length: 9}, () => new Set());
  
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = board[i][j];
      if (num === '.') continue;
      const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
      if (rows[i].has(num) || cols[j].has(num) || boxes[boxIndex].has(num)) {
        return false;
      }
      rows[i].add(num); cols[j].add(num); boxes[boxIndex].add(num);
    }
  }
  return true;
}`
  },
  {
    id: 'longest-substring',
    category: 'hashtable',
    title: 'Longest Substring Without Repeating',
    description: 'Find length of longest substring without repeating characters using sliding window.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(min(m,n))',
    difficulty: 'Medium',
    code: `/**
 * Longest Substring Without Repeating Characters
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n))
 */
function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let maxLen = 0, start = 0;
  for (let i = 0; i < s.length; i++) {
    if (seen.has(s[i]) && seen.get(s[i]) >= start) {
      start = seen.get(s[i]) + 1;
    }
    seen.set(s[i], i);
    maxLen = Math.max(maxLen, i - start + 1);
  }
  return maxLen;
}`
  },
  {
    id: 'contains-duplicate',
    category: 'hashtable',
    title: 'Contains Duplicate',
    description: 'Check if array contains any duplicates using hash set.',
    timeComplexity: { best: 'O(n)', average: 'O(n)', worst: 'O(n)' },
    spaceComplexity: 'O(n)',
    difficulty: 'Easy',
    code: `/**
 * Contains Duplicate
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`
  },

  // =====================
  // GRAPH ALGORITHMS (15)
  // =====================
  {
    id: 'dfs',
    category: 'graph',
    title: 'Depth-First Search (DFS)',
    description: 'Graph traversal using depth-first search recursively and iteratively.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Easy',
    code: `/**
 * Depth-First Search (DFS)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
// Recursive DFS
function dfsRecursive(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);
  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
  return visited;
}

// Iterative DFS using stack
function dfsIterative(graph, start) {
  const visited = new Set(), stack = [start];
  while (stack.length > 0) {
    const vertex = stack.pop();
    if (!visited.has(vertex)) {
      visited.add(vertex);
      for (const neighbor of graph[vertex]) {
        if (!visited.has(neighbor)) stack.push(neighbor);
      }
    }
  }
  return visited;
}`
  },
  {
    id: 'bfs',
    category: 'graph',
    title: 'Breadth-First Search (BFS)',
    description: 'Graph traversal using breadth-first search with queue.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Easy',
    code: `/**
 * Breadth-First Search (BFS)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const result = [];
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    for (const neighbor of graph[vertex]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return result;
}`
  },
  {
    id: 'dijkstra',
    category: 'graph',
    title: 'Dijkstra\'s Algorithm',
    description: 'Find shortest path from source to all vertices in weighted graph.',
    timeComplexity: { best: 'O((V+E) log V)', average: 'O((V+E) log V)', worst: 'O((V+E) log V)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Dijkstra's Algorithm - Shortest Path
 * Time Complexity: O((V + E) log V) with min-heap
 * Space Complexity: O(V)
 * @param {Object} graph - Adjacency list { node: [[neighbor, weight], ...] }
 * @param {string|number} start - Starting node
 * @returns {Object} - Shortest distances from start
 */
class MinHeap {
  constructor() { this.heap = []; }
  _parent(i) { return Math.floor((i - 1) / 2); }
  _swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
  
  push(node, dist) {
    this.heap.push({ node, dist });
    this._bubbleUp(this.heap.length - 1);
  }
  
  _bubbleUp(i) {
    while (i > 0 && this.heap[this._parent(i)].dist > this.heap[i].dist) {
      this._swap(i, this._parent(i)); i = this._parent(i);
    }
  }
  
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i, left = 2*i+1, right = 2*i+2;
      if (left < n && this.heap[left].dist < this.heap[smallest].dist) smallest = left;
      if (right < n && this.heap[right].dist < this.heap[smallest].dist) smallest = right;
      if (smallest === i) break;
      this._swap(i, smallest); i = smallest;
    }
  }
  
  isEmpty() { return this.heap.length === 0; }
}

function dijkstra(graph, start) {
  const distances = {};
  for (const node in graph) distances[node] = Infinity;
  distances[start] = 0;
  
  const heap = new MinHeap();
  heap.push(start, 0);
  
  while (!heap.isEmpty()) {
    const { node, dist } = heap.pop();
    if (dist > distances[node]) continue;
    
    for (const [neighbor, weight] of graph[node]) {
      const newDist = dist + weight;
      if (newDist < distances[neighbor]) {
        distances[neighbor] = newDist;
        heap.push(neighbor, newDist);
      }
    }
  }
  return distances;
}

// Usage Example
const graph = {
  A: [['B', 4], ['C', 2]],
  B: [['C', 1], ['D', 5]],
  C: [['D', 8], ['E', 10]],
  D: [['E', 2]],
  E: []
};
console.log(dijkstra(graph, 'A'));`
  },
  {
    id: 'kruskal',
    category: 'graph',
    title: 'Kruskal\'s Algorithm (MST)',
    description: 'Find Minimum Spanning Tree using Kruskal\'s algorithm with Union-Find.',
    timeComplexity: { best: 'O(E log E)', average: 'O(E log E)', worst: 'O(E log E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Kruskal's Algorithm - Minimum Spanning Tree
 * Time Complexity: O(E log E) or O(E log V)
 * Space Complexity: O(V)
 * Uses Union-Find (Disjoint Set Union) data structure
 */
class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Path compression
    }
    return this.parent[x];
  }
  
  union(x, y) {
    const rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    
    // Union by rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

function kruskal(edges, n) {
  // edges: [[u, v, weight], ...]
  // n: number of vertices
  
  // Sort edges by weight
  edges.sort((a, b) => a[2] - b[2]);
  
  const uf = new UnionFind(n);
  const mst = [];
  let totalWeight = 0;
  
  for (const [u, v, weight] of edges) {
    if (uf.union(u, v)) {
      mst.push([u, v, weight]);
      totalWeight += weight;
      if (mst.length === n - 1) break;
    }
  }
  
  return { mst, totalWeight };
}

// Usage Example
const edges = [
  [0, 1, 4], [0, 2, 3], [1, 2, 1], [1, 3, 2],
  [2, 3, 4], [3, 4, 2], [4, 5, 6]
];
console.log(kruskal(edges, 6));`
  },
  {
    id: 'prim',
    category: 'graph',
    title: 'Prim\'s Algorithm (MST)',
    description: 'Find Minimum Spanning Tree using Prim\'s algorithm.',
    timeComplexity: { best: 'O((V+E) log V)', average: 'O((V+E) log V)', worst: 'O((V+E) log V)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Prim's Algorithm - Minimum Spanning Tree
 * Time Complexity: O((V + E) log V) with min-heap
 * Space Complexity: O(V)
 */
class MinHeap {
  constructor() { this.heap = []; }
  push(node, weight) {
    this.heap.push({ node, weight });
    this._bubbleUp(this.heap.length - 1);
  }
  _bubbleUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.heap[p].weight <= this.heap[i].weight) break;
      [this.heap[p], this.heap[i]] = [this.heap[i], this.heap[p]];
      i = p;
    }
  }
  pop() {
    if (!this.heap.length) return null;
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown(0);
    return min;
  }
  _bubbleDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i, l = 2*i+1, r = 2*i+2;
      if (l < n && this.heap[l].weight < this.heap[smallest].weight) smallest = l;
      if (r < n && this.heap[r].weight < this.heap[smallest].weight) smallest = r;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
  isEmpty() { return !this.heap.length; }
}

function prim(graph, start) {
  const mst = [], visited = new Set([start]);
  const heap = new MinHeap();
  
  for (const [neighbor, weight] of graph[start]) {
    heap.push([start, neighbor, weight], weight);
  }
  
  while (!heap.isEmpty() && visited.size < Object.keys(graph).length) {
    const [u, v, weight] = heap.pop();
    if (visited.has(v)) continue;
    
    visited.add(v);
    mst.push([u, v, weight]);
    
    for (const [neighbor, w] of graph[v]) {
      if (!visited.has(neighbor)) {
        heap.push([v, neighbor, w], w);
      }
    }
  }
  
  return { mst, totalWeight: mst.reduce((sum, e) => sum + e[2], 0) };
}`
  },
  {
    id: 'bellman-ford',
    category: 'graph',
    title: 'Bellman-Ford Algorithm',
    description: 'Find shortest paths with negative edge weights. Detects negative cycles.',
    timeComplexity: { best: 'O(VE)', average: 'O(VE)', worst: 'O(VE)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Bellman-Ford Algorithm
 * Time Complexity: O(V * E)
 * Space Complexity: O(V)
 * Handles negative edge weights and detects negative cycles
 */
function bellmanFord(vertices, edges, start) {
  const dist = new Array(vertices).fill(Infinity);
  dist[start] = 0;
  
  // Relax edges V-1 times
  for (let i = 0; i < vertices - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  
  // Check for negative cycles
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return { hasNegativeCycle: true, distances: null };
    }
  }
  
  return { hasNegativeCycle: false, distances: dist };
}`
  },
  {
    id: 'floyd-warshall',
    category: 'graph',
    title: 'Floyd-Warshall Algorithm',
    description: 'Find shortest paths between all pairs of vertices.',
    timeComplexity: { best: 'O(V³)', average: 'O(V³)', worst: 'O(V³)' },
    spaceComplexity: 'O(V²)',
    difficulty: 'Medium',
    code: `/**
 * Floyd-Warshall Algorithm - All Pairs Shortest Path
 * Time Complexity: O(V³)
 * Space Complexity: O(V²)
 */
function floydWarshall(graph) {
  const n = graph.length;
  const dist = graph.map(row => [...row]);
  
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  
  return dist;
}

// Usage: graph[i][j] = weight of edge i->j, Infinity if no edge
const graph = [
  [0, 3, Infinity, 5],
  [2, 0, Infinity, 4],
  [Infinity, 1, 0, Infinity],
  [Infinity, Infinity, 2, 0]
];
console.log(floydWarshall(graph));`
  },
  {
    id: 'topological-sort',
    category: 'graph',
    title: 'Topological Sort',
    description: 'Linear ordering of vertices in DAG using DFS or Kahn\'s algorithm.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Topological Sort - DFS Approach
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function topologicalSortDFS(graph) {
  const visited = new Set(), stack = [];
  
  function dfs(node) {
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs(neighbor);
    }
    stack.push(node);
  }
  
  for (const node in graph) {
    if (!visited.has(node)) dfs(node);
  }
  
  return stack.reverse();
}

// Kahn's Algorithm (BFS approach)
function topologicalSortKahn(graph, numVertices) {
  const inDegree = new Array(numVertices).fill(0);
  for (const node in graph) {
    for (const neighbor of graph[node]) inDegree[neighbor]++;
  }
  
  const queue = [];
  for (let i = 0; i < numVertices; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  const result = [];
  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node);
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }
  
  return result.length === numVertices ? result : []; // Empty if cycle exists
}`
  },
  {
    id: 'cycle-detection',
    category: 'graph',
    title: 'Cycle Detection in Graph',
    description: 'Detect cycle in directed and undirected graphs.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Cycle Detection in Directed Graph
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function hasCycleDirected(graph) {
  const visited = new Set(), recStack = new Set();
  
  function dfs(node) {
    visited.add(node);
    recStack.add(node);
    
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor)) return true;
      } else if (recStack.has(neighbor)) {
        return true;
      }
    }
    
    recStack.delete(node);
    return false;
  }
  
  for (const node in graph) {
    if (!visited.has(node) && dfs(node)) return true;
  }
  return false;
}

// For undirected graph using Union-Find
function hasCycleUndirected(edges, n) {
  const parent = Array.from({length: n}, (_, i) => i);
  function find(x) { return parent[x] === x ? x : (parent[x] = find(parent[x])); }
  
  for (const [u, v] of edges) {
    const rootU = find(u), rootV = find(v);
    if (rootU === rootV) return true;
    parent[rootU] = rootV;
  }
  return false;
}`
  },
  {
    id: 'bipartite-check',
    category: 'graph',
    title: 'Check Bipartite Graph',
    description: 'Check if graph is bipartite using BFS coloring.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Medium',
    code: `/**
 * Check if Graph is Bipartite
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function isBipartite(graph) {
  const colors = new Map();
  
  for (let start = 0; start < graph.length; start++) {
    if (colors.has(start)) continue;
    
    const queue = [start];
    colors.set(start, 0);
    
    while (queue.length > 0) {
      const node = queue.shift();
      for (const neighbor of graph[node]) {
        if (!colors.has(neighbor)) {
          colors.set(neighbor, 1 - colors.get(node));
          queue.push(neighbor);
        } else if (colors.get(neighbor) === colors.get(node)) {
          return false;
        }
      }
    }
  }
  return true;
}`
  },
  {
    id: 'articulation-points',
    category: 'graph',
    title: 'Articulation Points',
    description: 'Find articulation points (cut vertices) in graph.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Hard',
    code: `/**
 * Find Articulation Points (Cut Vertices)
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function findArticulationPoints(graph, n) {
  const discovery = new Array(n).fill(-1);
  const low = new Array(n).fill(-1);
  const parent = new Array(n).fill(-1);
  const ap = new Set();
  let time = 0;
  
  function dfs(u) {
    discovery[u] = low[u] = ++time;
    let children = 0;
    
    for (const v of graph[u]) {
      if (discovery[v] === -1) {
        children++;
        parent[v] = u;
        dfs(v);
        low[u] = Math.min(low[u], low[v]);
        
        if (parent[u] === -1 && children > 1) ap.add(u);
        if (parent[u] !== -1 && low[v] >= discovery[u]) ap.add(u);
      } else if (v !== parent[u]) {
        low[u] = Math.min(low[u], discovery[v]);
      }
    }
  }
  
  for (let i = 0; i < n; i++) {
    if (discovery[i] === -1) dfs(i);
  }
  
  return Array.from(ap);
}`
  },
  {
    id: 'strongly-connected',
    category: 'graph',
    title: 'Strongly Connected Components',
    description: 'Find SCCs using Kosaraju\'s or Tarjan\'s algorithm.',
    timeComplexity: { best: 'O(V+E)', average: 'O(V+E)', worst: 'O(V+E)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Hard',
    code: `/**
 * Strongly Connected Components - Kosaraju's Algorithm
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
 */
function kosaraju(graph, n) {
  // Step 1: DFS and fill stack
  const visited = new Set(), stack = [];
  
  function dfs1(node) {
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) dfs1(neighbor);
    }
    stack.push(node);
  }
  
  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) dfs1(i);
  }
  
  // Step 2: Create transpose graph
  const transpose = Array.from({length: n}, () => []);
  for (let u = 0; u < n; u++) {
    for (const v of graph[u]) transpose[v].push(u);
  }
  
  // Step 3: DFS on transpose in reverse order
  visited.clear();
  const sccs = [];
  
  function dfs2(node, component) {
    visited.add(node);
    component.push(node);
    for (const neighbor of transpose[node]) {
      if (!visited.has(neighbor)) dfs2(neighbor, component);
    }
  }
  
  while (stack.length > 0) {
    const node = stack.pop();
    if (!visited.has(node)) {
      const component = [];
      dfs2(node, component);
      sccs.push(component);
    }
  }
  
  return sccs;
}`
  },
  {
    id: 'max-flow',
    category: 'graph',
    title: 'Maximum Flow (Ford-Fulkerson)',
    description: 'Find maximum flow in flow network using Ford-Fulkerson with BFS.',
    timeComplexity: { best: 'O(V*E²)', average: 'O(V*E²)', worst: 'O(V*E²)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Hard',
    code: `/**
 * Maximum Flow - Ford-Fulkerson with BFS (Edmonds-Karp)
 * Time Complexity: O(V * E²)
 * Space Complexity: O(V)
 */
function bfs(capacity, source, sink, parent) {
  const visited = new Set([source]);
  const queue = [source];
  
  while (queue.length > 0) {
    const u = queue.shift();
    for (let v = 0; v < capacity.length; v++) {
      if (!visited.has(v) && capacity[u][v] > 0) {
        visited.add(v);
        parent[v] = u;
        if (v === sink) return true;
        queue.push(v);
      }
    }
  }
  return false;
}

function maxFlow(capacity, source, sink) {
  const n = capacity.length;
  const parent = new Array(n).fill(-1);
  let maxFlowValue = 0;
  
  while (bfs(capacity, source, sink, parent)) {
    let pathFlow = Infinity;
    let v = sink;
    while (v !== source) {
      const u = parent[v];
      pathFlow = Math.min(pathFlow, capacity[u][v]);
      v = u;
    }
    
    v = sink;
    while (v !== source) {
      const u = parent[v];
      capacity[u][v] -= pathFlow;
      capacity[v][u] += pathFlow;
      v = u;
    }
    
    maxFlowValue += pathFlow;
  }
  
  return maxFlowValue;
}`
  },
  {
    id: 'graph-coloring',
    category: 'graph',
    title: 'Graph Coloring (Backtracking)',
    description: 'Color graph with m colors such that no adjacent vertices share color.',
    timeComplexity: { best: 'O(m^V)', average: 'O(m^V)', worst: 'O(m^V)' },
    spaceComplexity: 'O(V)',
    difficulty: 'Hard',
    code: `/**
 * Graph Coloring - Backtracking
 * Time Complexity: O(m^V)
 * Space Complexity: O(V)
 */
function isSafe(graph, colors, vertex, color) {
  for (const neighbor of graph[vertex]) {
    if (colors[neighbor] === color) return false;
  }
  return true;
}

function graphColoring(graph, m) {
  const n = graph.length;
  const colors = new Array(n).fill(-1);
  
  function backtrack(vertex) {
    if (vertex === n) return true;
    
    for (let color = 0; color < m; color++) {
      if (isSafe(graph, colors, vertex, color)) {
        colors[vertex] = color;
        if (backtrack(vertex + 1)) return true;
        colors[vertex] = -1;
      }
    }
    return false;
  }
  
  return backtrack(0) ? colors : null;
}`
  },
  {
    id: 'traveling-salesman',
    category: 'graph',
    title: 'Traveling Salesman (DP)',
    description: 'Find shortest Hamiltonian cycle using dynamic programming.',
    timeComplexity: { best: 'O(n²*2^n)', average: 'O(n²*2^n)', worst: 'O(n²*2^n)' },
    spaceComplexity: 'O(n*2^n)',
    difficulty: 'Hard',
    code: `/**
 * Traveling Salesman Problem - Dynamic Programming
 * Time Complexity: O(n² * 2^n)
 * Space Complexity: O(n * 2^n)
 */
function travelingSalesman(dist) {
  const n = dist.length;
  const ALL_VISITED = (1 << n) - 1;
  const memo = {};
  
  function tsp(mask, pos) {
    if (mask === ALL_VISITED) return dist[pos][0];
    
    const key = \`\${mask}-\${pos}\`;
    if (memo[key] !== undefined) return memo[key];
    
    let result = Infinity;
    for (let city = 0; city < n; city++) {
      if ((mask & (1 << city)) === 0) {
        result = Math.min(result, dist[pos][city] + tsp(mask | (1 << city), city));
      }
    }
    
    memo[key] = result;
    return result;
  }
  
  return tsp(1, 0); // Start from city 0
}

// Usage Example
const distances = [
  [0, 10, 15, 20],
  [10, 0, 35, 25],
  [15, 35, 0, 30],
  [20, 25, 30, 0]
];
console.log('TSP:', travelingSalesman(distances));`
  },
];
