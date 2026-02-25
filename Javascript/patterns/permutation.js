function permute(arr) {
    if (arr.length === 0 || arr.length === 1) return [arr];

    let result = [];
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        // Remove the current element from the array to avoid duplicates
        const rest = arr.slice(0, i).concat(arr.slice(i + 1));
        const permutationsOfRest = permute(rest);
        for (let permutation of permutationsOfRest) {
            result.push([item].concat(permutation));
        }
    }

    return result;
}

// Example usage:
const array = [1, 2, 3];
console.log(permute(array)); // Output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]
