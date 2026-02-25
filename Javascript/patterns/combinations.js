function getCombinations(arr, size = arr.length) {
  if (size === 0 || size === arr.length) {
    return [arr.slice()];
  }

  var result = [];
  for (var i = 0; i < arr.length && size > 0; i++) {
    // Get combinations of the remaining elements after excluding the current element
    var remainingArr = arr.slice(i + 1);
    var remainingCombinations = getCombinations(remainingArr, size - 1);

    for (var j = 0; j < remainingCombinations.length; j++) {
      result.push([arr[i]].concat(remainingCombinations[j]));
    }
  }

  return result;
}

// Usage example:
var array = [1, 2, 3]; // Array to find combinations of
var combinations = getCombinations(array);

// Print all combinations
combinations.forEach(function(combination) {
  console.log(combination.join(", "));
});
