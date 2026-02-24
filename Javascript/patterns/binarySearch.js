// iterativeSearch.js
const binarySearchIterative = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor(left + (right - left) / 2);

        if (arr[mid] === target) return mid; // Element najden
        if (arr[mid] < target) left = mid + 1; // Išči v desni polovici
        else right = mid - 1; // Išči v levi polovici
    }

    return -1; // Element ni v seznamu
};

const data = [1, 3, 5, 7, 9, 11];
console.log("Indeks elementa:", binarySearchIterative(data, 7));
