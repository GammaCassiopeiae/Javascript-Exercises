// recursiveSearch.js
const binarySearchRecursive = (arr, target, left = 0, right = arr.length - 1) => {
    if (left > right) return -1; // Bazni primer: ni najdeno

    const mid = Math.floor(left + (right - left) / 2);

    if (arr[mid] === target) return mid;
    
    if (arr[mid] > target) {
        return binarySearchRecursive(arr, target, left, mid - 1);
    } else {
        return binarySearchRecursive(arr, target, mid + 1, right);
    }
};

const data = [2, 4, 6, 8, 10, 12];
console.log("Indeks elementa:", binarySearchRecursive(data, 10));
