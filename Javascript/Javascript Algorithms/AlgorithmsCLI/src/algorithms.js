import { createHash } from "node:crypto";

function bubbleSort(input) {
  const values = [...input];

  for (let end = values.length - 1; end > 0; end -= 1) {
    let swapped = false;

    for (let index = 0; index < end; index += 1) {
      if (values[index] > values[index + 1]) {
        [values[index], values[index + 1]] = [values[index + 1], values[index]];
        swapped = true;
      }
    }

    if (!swapped) break;
  }

  return values;
}

function selectionSort(input) {
  const values = [...input];

  for (let start = 0; start < values.length - 1; start += 1) {
    let smallest = start;

    for (let index = start + 1; index < values.length; index += 1) {
      if (values[index] < values[smallest]) smallest = index;
    }

    [values[start], values[smallest]] = [values[smallest], values[start]];
  }

  return values;
}

function insertionSort(input) {
  const values = [...input];

  for (let index = 1; index < values.length; index += 1) {
    const current = values[index];
    let position = index - 1;

    while (position >= 0 && values[position] > current) {
      values[position + 1] = values[position];
      position -= 1;
    }

    values[position + 1] = current;
  }

  return values;
}

function mergeSort(input) {
  if (input.length <= 1) return [...input];

  const middle = Math.floor(input.length / 2);
  const left = mergeSort(input.slice(0, middle));
  const right = mergeSort(input.slice(middle));
  const merged = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] <= right[rightIndex]) {
      merged.push(left[leftIndex]);
      leftIndex += 1;
    } else {
      merged.push(right[rightIndex]);
      rightIndex += 1;
    }
  }

  return merged.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function quickSort(input) {
  if (input.length <= 1) return [...input];

  const pivot = input[input.length - 1];
  const smaller = [];
  const larger = [];

  for (let index = 0; index < input.length - 1; index += 1) {
    if (input[index] <= pivot) smaller.push(input[index]);
    else larger.push(input[index]);
  }

  return [...quickSort(smaller), pivot, ...quickSort(larger)];
}

function heapSort(input) {
  const values = [...input];

  function siftDown(root, size) {
    let largest = root;
    const left = root * 2 + 1;
    const right = root * 2 + 2;

    if (left < size && values[left] > values[largest]) largest = left;
    if (right < size && values[right] > values[largest]) largest = right;

    if (largest !== root) {
      [values[root], values[largest]] = [values[largest], values[root]];
      siftDown(largest, size);
    }
  }

  for (let index = Math.floor(values.length / 2) - 1; index >= 0; index -= 1) {
    siftDown(index, values.length);
  }

  for (let end = values.length - 1; end > 0; end -= 1) {
    [values[0], values[end]] = [values[end], values[0]];
    siftDown(0, end);
  }

  return values;
}

function linearSearch(values, target) {
  for (let index = 0; index < values.length; index += 1) {
    if (values[index] === target) return index;
  }

  return -1;
}

function binarySearch(values, target) {
  let low = 0;
  let high = values.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);

    if (values[middle] === target) return middle;
    if (values[middle] < target) low = middle + 1;
    else high = middle - 1;
  }

  return -1;
}

function jumpSearch(values, target) {
  const step = Math.floor(Math.sqrt(values.length));
  let blockStart = 0;
  let blockEnd = step;

  while (blockStart < values.length && values[Math.min(blockEnd, values.length) - 1] < target) {
    blockStart = blockEnd;
    blockEnd += step;
  }

  for (let index = blockStart; index < Math.min(blockEnd, values.length); index += 1) {
    if (values[index] === target) return index;
  }

  return -1;
}

function interpolationSearch(values, target) {
  let low = 0;
  let high = values.length - 1;

  while (
    low <= high &&
    target >= values[low] &&
    target <= values[high]
  ) {
    if (values[low] === values[high]) {
      return values[low] === target ? low : -1;
    }

    const position = low + Math.floor(
      ((target - values[low]) * (high - low)) / (values[high] - values[low]),
    );

    if (values[position] === target) return position;
    if (values[position] < target) low = position + 1;
    else high = position - 1;
  }

  return -1;
}

function twoPointers(values, target) {
  let left = 0;
  let right = values.length - 1;

  while (left < right) {
    const sum = values[left] + values[right];
    if (sum === target) return [values[left], values[right]];
    if (sum < target) left += 1;
    else right -= 1;
  }

  return null;
}

function slidingWindow(values, windowSize) {
  if (windowSize <= 0 || windowSize > values.length) return null;

  let current = values.slice(0, windowSize).reduce((sum, value) => sum + value, 0);
  let maximum = current;

  for (let index = windowSize; index < values.length; index += 1) {
    current += values[index] - values[index - windowSize];
    maximum = Math.max(maximum, current);
  }

  return maximum;
}

function pascalTriangle(rows) {
  const triangle = [];

  for (let row = 0; row < rows; row += 1) {
    const values = [1];
    for (let index = 1; index < row; index += 1) {
      values.push(triangle[row - 1][index - 1] + triangle[row - 1][index]);
    }
    if (row > 0) values.push(1);
    triangle.push(values);
  }

  return triangle;
}

function kadanesAlgorithm(values) {
  let best = values[0];
  let current = values[0];

  for (let index = 1; index < values.length; index += 1) {
    current = Math.max(values[index], current + values[index]);
    best = Math.max(best, current);
  }

  return best;
}

function fibonacciDynamicProgramming(n) {
  if (n <= 1) return n;

  const values = [0, 1];
  for (let index = 2; index <= n; index += 1) {
    values[index] = values[index - 1] + values[index - 2];
  }

  return values[n];
}

function euclideanGcd(first, second) {
  let a = Math.abs(first);
  let b = Math.abs(second);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
}

function sieveOfEratosthenes(limit) {
  const prime = Array(limit + 1).fill(true);
  prime[0] = false;
  prime[1] = false;

  for (let number = 2; number * number <= limit; number += 1) {
    if (!prime[number]) continue;
    for (let multiple = number * number; multiple <= limit; multiple += number) {
      prime[multiple] = false;
    }
  }

  return prime
    .map((isPrime, number) => (isPrime ? number : null))
    .filter((number) => number !== null);
}

function depthFirstSearch(graph, start, target) {
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    if (node === target) return [...visited];
    stack.push(...(graph[node] ?? []));
  }

  return [...visited];
}

function breadthFirstSearch(graph, start, target) {
  const visited = new Set([start]);
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    if (node === target) return [...visited];

    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return [...visited];
}

function dijkstra(graph, start) {
  const distances = Object.fromEntries(Object.keys(graph).map((node) => [node, Infinity]));
  const visited = new Set();
  distances[start] = 0;

  while (visited.size < Object.keys(graph).length) {
    const current = Object.keys(distances)
      .filter((node) => !visited.has(node))
      .sort((first, second) => distances[first] - distances[second])[0];
    if (current === undefined || distances[current] === Infinity) break;

    visited.add(current);
    for (const [neighbor, weight] of graph[current]) {
      const distance = distances[current] + weight;
      if (distance < distances[neighbor]) distances[neighbor] = distance;
    }
  }

  return distances;
}

function twoSum(values, target) {
  const seen = new Map();

  for (let index = 0; index < values.length; index += 1) {
    const complement = target - values[index];
    if (seen.has(complement)) return [seen.get(complement), index];
    seen.set(values[index], index);
  }

  return [];
}

function validParentheses(input) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];

  for (const character of input) {
    if ("([{".includes(character)) stack.push(character);
    else if (pairs[character] !== stack.pop()) return false;
  }

  return stack.length === 0;
}

function mergeTwoSortedLists(first, second) {
  const merged = [];
  let firstIndex = 0;
  let secondIndex = 0;

  while (firstIndex < first.length && secondIndex < second.length) {
    if (first[firstIndex] <= second[secondIndex]) merged.push(first[firstIndex++]);
    else merged.push(second[secondIndex++]);
  }

  return merged.concat(first.slice(firstIndex), second.slice(secondIndex));
}

function bestTimeToBuyAndSellStock(prices) {
  let lowestPrice = Infinity;
  let maximumProfit = 0;

  for (const price of prices) {
    lowestPrice = Math.min(lowestPrice, price);
    maximumProfit = Math.max(maximumProfit, price - lowestPrice);
  }

  return maximumProfit;
}

function validPalindrome(input) {
  const normalized = input.toLowerCase().replace(/[^a-z0-9]/g, "");
  return normalized === [...normalized].reverse().join("");
}

function invertBinaryTree(node) {
  if (node === null) return null;

  return {
    value: node.value,
    left: invertBinaryTree(node.right),
    right: invertBinaryTree(node.left),
  };
}

function validAnagram(first, second) {
  if (first.length !== second.length) return false;
  const counts = new Map();

  for (const character of first) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  for (const character of second) {
    const remaining = (counts.get(character) ?? 0) - 1;
    if (remaining < 0) return false;
    counts.set(character, remaining);
  }

  return true;
}

function floodFill(image, row, column, color) {
  const result = image.map((line) => [...line]);
  const original = result[row][column];
  if (original === color) return result;

  function fill(currentRow, currentColumn) {
    if (
      currentRow < 0 ||
      currentRow >= result.length ||
      currentColumn < 0 ||
      currentColumn >= result[0].length ||
      result[currentRow][currentColumn] !== original
    ) return;

    result[currentRow][currentColumn] = color;
    fill(currentRow - 1, currentColumn);
    fill(currentRow + 1, currentColumn);
    fill(currentRow, currentColumn - 1);
    fill(currentRow, currentColumn + 1);
  }

  fill(row, column);
  return result;
}

function lowestCommonAncestor(root, first, second) {
  let node = root;

  while (node !== null) {
    if (first < node.value && second < node.value) node = node.left;
    else if (first > node.value && second > node.value) node = node.right;
    else return node.value;
  }

  return null;
}

function balancedBinaryTree(root) {
  function height(node) {
    if (node === null) return 0;

    const leftHeight = height(node.left);
    if (leftHeight === -1) return -1;
    const rightHeight = height(node.right);
    if (rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) return -1;
    return Math.max(leftHeight, rightHeight) + 1;
  }

  return height(root) !== -1;
}

function linkedListCycle(next, head) {
  let slow = head;
  let fast = head;

  while (fast !== -1 && next[fast] !== -1) {
    slow = next[slow];
    fast = next[next[fast]];
    if (slow === fast) return true;
  }

  return false;
}

function queueUsingStacks(operations) {
  const input = [];
  const output = [];
  const results = [];

  function moveValues() {
    if (output.length === 0) {
      while (input.length > 0) output.push(input.pop());
    }
  }

  for (const [operation, value] of operations) {
    if (operation === "enqueue") input.push(value);
    else if (operation === "dequeue") {
      moveValues();
      results.push(output.length > 0 ? output.pop() : null);
    }
  }

  return results;
}

function firstBadVersion(versionCount, firstBad) {
  let low = 1;
  let high = versionCount;

  while (low < high) {
    const middle = Math.floor((low + high) / 2);
    if (middle >= firstBad) high = middle;
    else low = middle + 1;
  }

  return low >= firstBad ? low : -1;
}

function ransomNote(note, magazine) {
  const counts = new Map();

  for (const character of magazine) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  for (const character of note) {
    const remaining = (counts.get(character) ?? 0) - 1;
    if (remaining < 0) return false;
    counts.set(character, remaining);
  }

  return true;
}

function climbingStairs(n) {
  let oneStepBefore = 1;
  let twoStepsBefore = 1;

  for (let step = 2; step <= n; step += 1) {
    [oneStepBefore, twoStepsBefore] = [twoStepsBefore, oneStepBefore + twoStepsBefore];
  }

  return twoStepsBefore;
}

function longestPalindrome(input) {
  const counts = new Map();
  let length = 0;
  let hasOddCount = false;

  for (const character of input) {
    counts.set(character, (counts.get(character) ?? 0) + 1);
  }

  for (const count of counts.values()) {
    length += Math.floor(count / 2) * 2;
    if (count % 2 === 1) hasOddCount = true;
  }

  return length + (hasOddCount ? 1 : 0);
}

function reverseLinkedList(values) {
  return [...values].reverse();
}

function majorityElement(values) {
  let candidate = null;
  let count = 0;

  for (const value of values) {
    if (count === 0) candidate = value;
    count += value === candidate ? 1 : -1;
  }

  return candidate;
}

function addBinary(first, second) {
  let firstIndex = first.length - 1;
  let secondIndex = second.length - 1;
  let carry = 0;
  let result = "";

  while (firstIndex >= 0 || secondIndex >= 0 || carry > 0) {
    const sum = Number(first[firstIndex--] ?? 0) + Number(second[secondIndex--] ?? 0) + carry;
    result = `${sum % 2}${result}`;
    carry = Math.floor(sum / 2);
  }

  return result;
}

function middleOfLinkedList(values) {
  let slow = 0;
  let fast = 0;

  while (fast < values.length && fast + 1 < values.length) {
    slow += 1;
    fast += 2;
  }

  return values[slow];
}

function coinChange(coins, amount) {
  const minimum = Array(amount + 1).fill(Infinity);
  minimum[0] = 0;

  for (let value = 1; value <= amount; value += 1) {
    for (const coin of coins) {
      if (coin <= value) minimum[value] = Math.min(minimum[value], minimum[value - coin] + 1);
    }
  }

  return minimum[amount] === Infinity ? -1 : minimum[amount];
}

function productOfArrayExceptSelf(values) {
  const result = Array(values.length).fill(1);
  let prefix = 1;
  let suffix = 1;

  for (let index = 0; index < values.length; index += 1) {
    result[index] = prefix;
    prefix *= values[index];
  }

  for (let index = values.length - 1; index >= 0; index -= 1) {
    result[index] *= suffix;
    suffix *= values[index];
  }

  return result;
}

function minStack(operations) {
  const values = [];
  const minimums = [];
  const results = [];

  for (const [operation, value] of operations) {
    if (operation === "push") {
      values.push(value);
      minimums.push(Math.min(value, minimums.at(-1) ?? value));
    } else if (operation === "pop") {
      values.pop();
      minimums.pop();
    } else if (operation === "getMin") {
      results.push(minimums.at(-1));
    }
  }

  return results;
}

function validateBinarySearchTree(root) {
  function isValid(node, minimum, maximum) {
    if (node === null) return true;
    if (node.value <= minimum || node.value >= maximum) return false;
    return isValid(node.left, minimum, node.value) && isValid(node.right, node.value, maximum);
  }

  return isValid(root, -Infinity, Infinity);
}

function numberOfIslands(grid) {
  const map = grid.map((row) => [...row]);
  let islands = 0;

  function sink(row, column) {
    if (
      row < 0 ||
      row >= map.length ||
      column < 0 ||
      column >= map[0].length ||
      map[row][column] !== "1"
    ) return;

    map[row][column] = "0";
    sink(row - 1, column);
    sink(row + 1, column);
    sink(row, column - 1);
    sink(row, column + 1);
  }

  for (let row = 0; row < map.length; row += 1) {
    for (let column = 0; column < map[row].length; column += 1) {
      if (map[row][column] === "1") {
        islands += 1;
        sink(row, column);
      }
    }
  }

  return islands;
}

function rottingOranges(grid) {
  const map = grid.map((row) => [...row]);
  const queue = [];
  let fresh = 0;

  for (let row = 0; row < map.length; row += 1) {
    for (let column = 0; column < map[row].length; column += 1) {
      if (map[row][column] === 2) queue.push([row, column]);
      if (map[row][column] === 1) fresh += 1;
    }
  }

  let minutes = 0;
  for (let index = 0; index < queue.length; index += 1) {
    const [row, column] = queue[index];
    for (const [rowOffset, columnOffset] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nextRow = row + rowOffset;
      const nextColumn = column + columnOffset;
      if (map[nextRow]?.[nextColumn] !== 1) continue;
      map[nextRow][nextColumn] = 2;
      fresh -= 1;
      queue.push([nextRow, nextColumn, (queue[index][2] ?? 0) + 1]);
      minutes = Math.max(minutes, queue.at(-1)[2]);
    }
  }

  return fresh === 0 ? minutes : -1;
}

function searchRotatedSortedArray(values, target) {
  let low = 0;
  let high = values.length - 1;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (values[middle] === target) return middle;

    if (values[low] <= values[middle]) {
      if (values[low] <= target && target < values[middle]) high = middle - 1;
      else low = middle + 1;
    } else if (values[middle] < target && target <= values[high]) {
      low = middle + 1;
    } else {
      high = middle - 1;
    }
  }

  return -1;
}

function combinationSum(candidates, target) {
  const combinations = [];

  function build(start, remaining, current) {
    if (remaining === 0) {
      combinations.push([...current]);
      return;
    }

    for (let index = start; index < candidates.length; index += 1) {
      if (candidates[index] > remaining) continue;
      current.push(candidates[index]);
      build(index, remaining - candidates[index], current);
      current.pop();
    }
  }

  build(0, target, []);
  return combinations;
}

function permutations(values) {
  const result = [];

  function build(remaining, current) {
    if (remaining.length === 0) {
      result.push([...current]);
      return;
    }

    for (let index = 0; index < remaining.length; index += 1) {
      current.push(remaining[index]);
      build([...remaining.slice(0, index), ...remaining.slice(index + 1)], current);
      current.pop();
    }
  }

  build(values, []);
  return result;
}

function mergeIntervals(intervals) {
  const sorted = intervals
    .map(([start, end]) => [start, end])
    .sort(([firstStart], [secondStart]) => firstStart - secondStart);
  const merged = [];

  for (const interval of sorted) {
    const previous = merged.at(-1);
    if (!previous || interval[0] > previous[1]) merged.push(interval);
    else previous[1] = Math.max(previous[1], interval[1]);
  }

  return merged;
}

function timeBasedKeyValueStore(operations) {
  const store = new Map();
  const results = [];

  for (const operation of operations) {
    if (operation.type === "set") {
      if (!store.has(operation.key)) store.set(operation.key, []);
      store.get(operation.key).push([operation.timestamp, operation.value]);
    } else if (operation.type === "get") {
      const entries = store.get(operation.key) ?? [];
      let value = "";
      for (const [timestamp, entryValue] of entries) {
        if (timestamp > operation.timestamp) break;
        value = entryValue;
      }
      results.push(value);
    }
  }

  return results;
}

function accountsMerge(accounts) {
  const emailToAccount = new Map();
  const graph = new Map();

  for (const [name, ...emails] of accounts) {
    for (const email of emails) {
      emailToAccount.set(email, name);
      if (!graph.has(email)) graph.set(email, new Set());
      graph.get(email).add(emails[0]);
      graph.get(emails[0]).add(email);
    }
  }

  const merged = [];
  const visited = new Set();
  for (const email of graph.keys()) {
    if (visited.has(email)) continue;
    const stack = [email];
    const emails = [];
    while (stack.length > 0) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      visited.add(current);
      emails.push(current);
      stack.push(...graph.get(current));
    }
    emails.sort();
    merged.push([emailToAccount.get(email), ...emails]);
  }

  return merged.sort(([firstName], [secondName]) => firstName.localeCompare(secondName));
}

function sortColors(values) {
  const result = [...values];
  let low = 0;
  let current = 0;
  let high = result.length - 1;

  while (current <= high) {
    if (result[current] === 0) [result[low++], result[current++]] = [result[current], result[low]];
    else if (result[current] === 2) [result[current], result[high--]] = [result[high], result[current]];
    else current += 1;
  }

  return result;
}

function wordBreak(input, dictionary) {
  const possible = Array(input.length + 1).fill(false);
  possible[0] = true;

  for (let end = 1; end <= input.length; end += 1) {
    for (const word of dictionary) {
      const start = end - word.length;
      if (start >= 0 && possible[start] && input.slice(start, end) === word) {
        possible[end] = true;
        break;
      }
    }
  }

  return possible[input.length];
}

function stringToIntegerAtoi(input) {
  const trimmed = input.trim();
  const match = trimmed.match(/^[+-]?\d+/);
  if (!match) return 0;
  const number = Number(match[0]);
  return Math.max(-(2 ** 31), Math.min(2 ** 31 - 1, number));
}

function subsets(values) {
  const result = [[]];

  for (const value of values) {
    result.push(...result.map((subset) => [...subset, value]));
  }

  return result;
}

function binaryTreeRightSideView(root) {
  if (root === null) return [];
  const view = [];
  let level = [root];

  while (level.length > 0) {
    view.push(level.at(-1).value);
    level = level.flatMap((node) => [node.left, node.right].filter(Boolean));
  }

  return view;
}

function longestPalindromicSubstring(input) {
  let best = "";

  function expand(left, right) {
    while (left >= 0 && right < input.length && input[left] === input[right]) {
      if (right - left + 1 > best.length) best = input.slice(left, right + 1);
      left -= 1;
      right += 1;
    }
  }

  for (let index = 0; index < input.length; index += 1) {
    expand(index, index);
    expand(index, index + 1);
  }

  return best;
}

function uniquePaths(rows, columns) {
  const paths = Array(columns).fill(1);

  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      paths[column] += paths[column - 1];
    }
  }

  return paths[columns - 1];
}

function constructBinaryTree(preorder, inorder) {
  if (preorder.length === 0) return null;
  const rootValue = preorder[0];
  const rootIndex = inorder.indexOf(rootValue);
  const leftSize = rootIndex;

  return {
    value: rootValue,
    left: constructBinaryTree(preorder.slice(1, leftSize + 1), inorder.slice(0, rootIndex)),
    right: constructBinaryTree(preorder.slice(leftSize + 1), inorder.slice(rootIndex + 1)),
  };
}

function containerWithMostWater(heights) {
  let left = 0;
  let right = heights.length - 1;
  let maximum = 0;

  while (left < right) {
    maximum = Math.max(maximum, Math.min(heights[left], heights[right]) * (right - left));
    if (heights[left] < heights[right]) left += 1;
    else right -= 1;
  }

  return maximum;
}

function letterCombinationsOfPhoneNumber(digits) {
  if (digits.length === 0) return [];
  const letters = {
    2: "abc", 3: "def", 4: "ghi", 5: "jkl",
    6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz",
  };
  let combinations = [""];

  for (const digit of digits) {
    combinations = combinations.flatMap((prefix) =>
      [...letters[digit]].map((letter) => prefix + letter));
  }

  return combinations;
}

function wordSearch(board, word) {
  const grid = board.map((row) => [...row]);

  function search(row, column, index) {
    if (index === word.length) return true;
    if (
      row < 0 ||
      row >= grid.length ||
      column < 0 ||
      column >= grid[0].length ||
      grid[row][column] !== word[index]
    ) return false;

    const character = grid[row][column];
    grid[row][column] = "#";
    const found = search(row - 1, column, index + 1) ||
      search(row + 1, column, index + 1) ||
      search(row, column - 1, index + 1) ||
      search(row, column + 1, index + 1);
    grid[row][column] = character;
    return found;
  }

  for (let row = 0; row < grid.length; row += 1) {
    for (let column = 0; column < grid[row].length; column += 1) {
      if (search(row, column, 0)) return true;
    }
  }

  return false;
}

function findAllAnagrams(input, pattern) {
  const required = new Map();
  const window = new Map();
  const results = [];
  for (const character of pattern) required.set(character, (required.get(character) ?? 0) + 1);
  let matches = 0;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    window.set(character, (window.get(character) ?? 0) + 1);
    if (window.get(character) === required.get(character)) matches += 1;

    if (index >= pattern.length) {
      const removed = input[index - pattern.length];
      if (window.get(removed) === required.get(removed)) matches -= 1;
      window.set(removed, window.get(removed) - 1);
    }

    if (matches === required.size) results.push(index - pattern.length + 1);
  }

  return results;
}

function minimumSizeSubarraySum(target, values) {
  let left = 0;
  let sum = 0;
  let minimum = Infinity;

  for (let right = 0; right < values.length; right += 1) {
    sum += values[right];
    while (sum >= target) {
      minimum = Math.min(minimum, right - left + 1);
      sum -= values[left++];
    }
  }

  return minimum === Infinity ? 0 : minimum;
}

function spiralMatrix(matrix) {
  const result = [];
  let top = 0;
  let bottom = matrix.length - 1;
  let left = 0;
  let right = matrix[0].length - 1;

  while (top <= bottom && left <= right) {
    for (let column = left; column <= right; column += 1) result.push(matrix[top][column]);
    top += 1;
    for (let row = top; row <= bottom; row += 1) result.push(matrix[row][right]);
    right -= 1;
    if (top <= bottom) {
      for (let column = right; column >= left; column -= 1) result.push(matrix[bottom][column]);
      bottom -= 1;
    }
    if (left <= right) {
      for (let row = bottom; row >= top; row -= 1) result.push(matrix[row][left]);
      left += 1;
    }
  }

  return result;
}

function subsetSum(values, target) {
  const possible = Array(target + 1).fill(false);
  possible[0] = true;

  for (const value of values) {
    for (let sum = target; sum >= value; sum -= 1) {
      possible[sum] = possible[sum] || possible[sum - value];
    }
  }

  return possible[target];
}

function partitionEqualSubsetSum(values) {
  const total = values.reduce((sum, value) => sum + value, 0);
  return total % 2 === 0 && subsetSum(values, total / 2);
}

function decodeWays(input) {
  if (input.length === 0 || input[0] === "0") return 0;
  let previous = 1;
  let current = 1;

  for (let index = 1; index < input.length; index += 1) {
    let next = input[index] === "0" ? 0 : current;
    const pair = Number(input.slice(index - 1, index + 1));
    if (pair >= 10 && pair <= 26) next += previous;
    previous = current;
    current = next;
  }

  return current;
}

function uniqueBinarySearchTrees(n) {
  const trees = Array(n + 1).fill(0);
  trees[0] = 1;
  trees[1] = 1;

  for (let nodes = 2; nodes <= n; nodes += 1) {
    for (let root = 1; root <= nodes; root += 1) {
      trees[nodes] += trees[root - 1] * trees[nodes - root];
    }
  }

  return trees[n];
}

function houseRobber(values) {
  let previous = 0;
  let current = 0;

  for (const value of values) {
    [previous, current] = [current, Math.max(current, previous + value)];
  }

  return current;
}

function houseRobberII(values) {
  if (values.length === 1) return values[0];
  const robRange = (start, end) => {
    let previous = 0;
    let current = 0;
    for (let index = start; index <= end; index += 1) {
      [previous, current] = [current, Math.max(current, previous + values[index])];
    }
    return current;
  };

  return Math.max(robRange(0, values.length - 2), robRange(1, values.length - 1));
}

function longestIncreasingSubsequence(values) {
  const tails = [];

  for (const value of values) {
    let low = 0;
    let high = tails.length;
    while (low < high) {
      const middle = Math.floor((low + high) / 2);
      if (tails[middle] < value) low = middle + 1;
      else high = middle;
    }
    tails[low] = value;
  }

  return tails.length;
}

function longestCommonSubsequence(first, second) {
  const lengths = Array(second.length + 1).fill(0);

  for (const firstCharacter of first) {
    let diagonal = 0;
    for (let column = 1; column <= second.length; column += 1) {
      const previous = lengths[column];
      lengths[column] = firstCharacter === second[column - 1]
        ? diagonal + 1
        : Math.max(lengths[column], lengths[column - 1]);
      diagonal = previous;
    }
  }

  return lengths[second.length];
}

function editDistance(first, second) {
  const distances = Array.from({ length: second.length + 1 }, (_, index) => index);

  for (let row = 1; row <= first.length; row += 1) {
    let diagonal = distances[0];
    distances[0] = row;
    for (let column = 1; column <= second.length; column += 1) {
      const previous = distances[column];
      distances[column] = first[row - 1] === second[column - 1]
        ? diagonal
        : 1 + Math.min(diagonal, distances[column], distances[column - 1]);
      diagonal = previous;
    }
  }

  return distances[second.length];
}

function distinctSubsequences(source, target) {
  const counts = Array(target.length + 1).fill(0);
  counts[0] = 1;

  for (const character of source) {
    for (let index = target.length; index >= 1; index -= 1) {
      if (character === target[index - 1]) counts[index] += counts[index - 1];
    }
  }

  return counts[target.length];
}

function maximalSquare(matrix) {
  const widths = Array(matrix[0].length + 1).fill(0);
  let largestSide = 0;

  for (const row of matrix) {
    let diagonal = 0;
    for (let column = 1; column <= row.length; column += 1) {
      const previous = widths[column];
      widths[column] = row[column - 1] === "1"
        ? Math.min(widths[column], widths[column - 1], diagonal) + 1
        : 0;
      largestSide = Math.max(largestSide, widths[column]);
      diagonal = previous;
    }
  }

  return largestSide ** 2;
}

function trappingRainWater(heights) {
  let left = 0;
  let right = heights.length - 1;
  let leftMaximum = 0;
  let rightMaximum = 0;
  let water = 0;

  while (left < right) {
    if (heights[left] < heights[right]) {
      leftMaximum = Math.max(leftMaximum, heights[left]);
      water += leftMaximum - heights[left++];
    } else {
      rightMaximum = Math.max(rightMaximum, heights[right]);
      water += rightMaximum - heights[right--];
    }
  }

  return water;
}

function slidingWindowMaximum(values, windowSize) {
  const deque = [];
  const maximums = [];

  for (let index = 0; index < values.length; index += 1) {
    while (deque.length > 0 && deque[0] <= index - windowSize) deque.shift();
    while (deque.length > 0 && values[deque.at(-1)] <= values[index]) deque.pop();
    deque.push(index);
    if (index >= windowSize - 1) maximums.push(values[deque[0]]);
  }

  return maximums;
}

function minimumWindowSubstring(source, target) {
  const required = new Map();
  for (const character of target) required.set(character, (required.get(character) ?? 0) + 1);
  const window = new Map();
  let formed = 0;
  let left = 0;
  let best = "";

  for (let right = 0; right < source.length; right += 1) {
    const character = source[right];
    window.set(character, (window.get(character) ?? 0) + 1);
    if (window.get(character) === required.get(character)) formed += 1;

    while (formed === required.size) {
      const candidate = source.slice(left, right + 1);
      if (best === "" || candidate.length < best.length) best = candidate;
      const removed = source[left++];
      if (window.get(removed) === required.get(removed)) formed -= 1;
      window.set(removed, window.get(removed) - 1);
    }
  }

  return best;
}

function serializeAndDeserializeBinaryTree(root) {
  const values = [];
  function serialize(node) {
    if (node === null) {
      values.push("#");
      return;
    }
    values.push(String(node.value));
    serialize(node.left);
    serialize(node.right);
  }
  serialize(root);

  let index = 0;
  function deserialize() {
    const value = values[index++];
    if (value === "#") return null;
    return {
      value: Number(value),
      left: deserialize(),
      right: deserialize(),
    };
  }

  return deserialize();
}

function binaryTreeMaximumPathSum(root) {
  let maximum = -Infinity;

  function gain(node) {
    if (node === null) return 0;
    const left = Math.max(0, gain(node.left));
    const right = Math.max(0, gain(node.right));
    maximum = Math.max(maximum, node.value + left + right);
    return node.value + Math.max(left, right);
  }

  gain(root);
  return maximum;
}

function mergeKSortedLists(lists) {
  const values = lists.flat().sort((first, second) => first - second);
  return values;
}

function reverseNodesInKGroup(values, groupSize) {
  const result = [];

  for (let index = 0; index < values.length; index += groupSize) {
    const group = values.slice(index, index + groupSize);
    result.push(...(group.length === groupSize ? group.reverse() : group));
  }

  return result;
}

function sudokuSolver(board) {
  const result = board.map((row) => [...row]);
  const digits = "123456789";

  function solve() {
    for (let row = 0; row < 9; row += 1) {
      for (let column = 0; column < 9; column += 1) {
        if (result[row][column] !== ".") continue;
        for (const digit of digits) {
          const valid = result[row].every((cell) => cell !== digit) &&
            result.every((line) => line[column] !== digit) &&
            result.every((line, index) =>
              Math.floor(index / 3) !== Math.floor(row / 3) ||
              !line.slice(Math.floor(column / 3) * 3, Math.floor(column / 3) * 3 + 3).includes(digit));
          if (!valid) continue;
          result[row][column] = digit;
          if (solve()) return true;
          result[row][column] = ".";
        }
        return false;
      }
    }
    return true;
  }

  solve();
  return result;
}

function nQueens(n) {
  let solutions = 0;
  const columns = new Set();
  const diagonals = new Set();
  const antiDiagonals = new Set();

  function place(row) {
    if (row === n) {
      solutions += 1;
      return;
    }
    for (let column = 0; column < n; column += 1) {
      const diagonal = row - column;
      const antiDiagonal = row + column;
      if (columns.has(column) || diagonals.has(diagonal) || antiDiagonals.has(antiDiagonal)) continue;
      columns.add(column);
      diagonals.add(diagonal);
      antiDiagonals.add(antiDiagonal);
      place(row + 1);
      columns.delete(column);
      diagonals.delete(diagonal);
      antiDiagonals.delete(antiDiagonal);
    }
  }

  place(0);
  return solutions;
}

function wordLadder(beginWord, endWord, words) {
  const dictionary = new Set(words);
  if (!dictionary.has(endWord)) return 0;
  const queue = [[beginWord, 1]];

  for (let index = 0; index < queue.length; index += 1) {
    const [word, distance] = queue[index];
    if (word === endWord) return distance;

    for (let position = 0; position < word.length; position += 1) {
      for (let code = 97; code <= 122; code += 1) {
        const next = `${word.slice(0, position)}${String.fromCharCode(code)}${word.slice(position + 1)}`;
        if (!dictionary.has(next)) continue;
        dictionary.delete(next);
        queue.push([next, distance + 1]);
      }
    }
  }

  return 0;
}

function basicCalculator(expression) {
  let result = 0;
  let number = 0;
  let sign = 1;
  const stack = [];

  for (const character of expression) {
    if (/\d/.test(character)) number = number * 10 + Number(character);
    else if (character === "+" || character === "-") {
      result += sign * number;
      number = 0;
      sign = character === "+" ? 1 : -1;
    } else if (character === "(") {
      stack.push(result, sign);
      result = 0;
      sign = 1;
    } else if (character === ")") {
      result += sign * number;
      number = 0;
      result *= stack.pop();
      result += stack.pop();
    }
  }

  return result + sign * number;
}

function expressionAddOperators(input, target) {
  const expressions = [];

  function build(index, expression, value, previous) {
    if (index === input.length) {
      if (value === target) expressions.push(expression);
      return;
    }

    for (let end = index + 1; end <= input.length; end += 1) {
      const digits = input.slice(index, end);
      if (digits.length > 1 && digits[0] === "0") break;
      const current = Number(digits);
      if (index === 0) build(end, digits, current, current);
      else {
        build(end, `${expression}+${digits}`, value + current, current);
        build(end, `${expression}-${digits}`, value - current, -current);
        build(end, `${expression}*${digits}`, value - previous + previous * current, previous * current);
      }
    }
  }

  build(0, "", 0, 0);
  return expressions;
}

function removeInvalidParentheses(input) {
  function isValid(value) {
    let balance = 0;
    for (const character of value) {
      if (character === "(") balance += 1;
      if (character === ")" && --balance < 0) return false;
    }
    return balance === 0;
  }

  let level = new Set([input]);
  while (level.size > 0) {
    const valid = [...level].filter(isValid);
    if (valid.length > 0) return valid.sort();
    const next = new Set();
    for (const value of level) {
      for (let index = 0; index < value.length; index += 1) {
        if (!"()".includes(value[index])) continue;
        next.add(value.slice(0, index) + value.slice(index + 1));
      }
    }
    level = next;
  }

  return [""];
}

function palindromicSubstrings(input) {
  let count = 0;

  function expand(left, right) {
    while (left >= 0 && right < input.length && input[left] === input[right]) {
      count += 1;
      left -= 1;
      right += 1;
    }
  }

  for (let index = 0; index < input.length; index += 1) {
    expand(index, index);
    expand(index, index + 1);
  }

  return count;
}

function countingBits(n) {
  const bits = Array(n + 1).fill(0);
  for (let number = 1; number <= n; number += 1) {
    bits[number] = bits[number >> 1] + (number & 1);
  }
  return bits;
}

function topKFrequentElements(values, k) {
  const frequencies = new Map();
  for (const value of values) frequencies.set(value, (frequencies.get(value) ?? 0) + 1);
  return [...frequencies.entries()]
    .sort(([, first], [, second]) => second - first)
    .slice(0, k)
    .map(([value]) => value);
}

function kthLargestElement(values, k) {
  return [...values].sort((first, second) => second - first)[k - 1];
}

function findMedianFromDataStream(operations) {
  const values = [];
  const medians = [];

  for (const [operation, value] of operations) {
    if (operation === "add") {
      values.push(value);
      values.sort((first, second) => first - second);
    } else if (operation === "median") {
      const middle = Math.floor(values.length / 2);
      medians.push(values.length % 2 === 1
        ? values[middle]
        : (values[middle - 1] + values[middle]) / 2);
    }
  }

  return medians;
}

function longestConsecutiveSequence(values) {
  const numbers = new Set(values);
  let longest = 0;

  for (const value of numbers) {
    if (numbers.has(value - 1)) continue;
    let length = 1;
    while (numbers.has(value + length)) length += 1;
    longest = Math.max(longest, length);
  }

  return longest;
}

function gasStation(gas, cost) {
  let total = 0;
  let tank = 0;
  let start = 0;

  for (let index = 0; index < gas.length; index += 1) {
    const difference = gas[index] - cost[index];
    total += difference;
    tank += difference;
    if (tank < 0) {
      tank = 0;
      start = index + 1;
    }
  }

  return total >= 0 ? start : -1;
}

function nextPermutation(values) {
  const result = [...values];
  let pivot = result.length - 2;
  while (pivot >= 0 && result[pivot] >= result[pivot + 1]) pivot -= 1;
  if (pivot >= 0) {
    let successor = result.length - 1;
    while (result[successor] <= result[pivot]) successor -= 1;
    [result[pivot], result[successor]] = [result[successor], result[pivot]];
  }
  let left = pivot + 1;
  let right = result.length - 1;
  while (left < right) [result[left++], result[right--]] = [result[right], result[left]];
  return result;
}

function lruCache(operations, capacity) {
  const cache = new Map();
  const results = [];

  for (const [operation, key, value] of operations) {
    if (operation === "put") {
      cache.delete(key);
      cache.set(key, value);
      if (cache.size > capacity) cache.delete(cache.keys().next().value);
    } else if (operation === "get") {
      const result = cache.has(key) ? cache.get(key) : -1;
      if (result !== -1) {
        cache.delete(key);
        cache.set(key, result);
      }
      results.push(result);
    }
  }

  return results;
}

function lfuCache(operations, capacity) {
  const cache = new Map();
  let time = 0;
  const results = [];

  for (const [operation, key, value] of operations) {
    time += 1;
    if (operation === "put" && capacity > 0) {
      if (cache.has(key)) cache.get(key).value = value;
      else {
        if (cache.size >= capacity) {
          const leastUsed = [...cache.entries()].sort(([, first], [, second]) =>
            first.frequency - second.frequency || first.time - second.time)[0][0];
          cache.delete(leastUsed);
        }
        cache.set(key, { value, frequency: 0, time });
      }
      cache.get(key).frequency += 1;
      cache.get(key).time = time;
    } else if (operation === "get") {
      if (!cache.has(key)) results.push(-1);
      else {
        const entry = cache.get(key);
        entry.frequency += 1;
        entry.time = time;
        results.push(entry.value);
      }
    }
  }

  return results;
}

function spyNumber(number) {
  const digits = String(Math.abs(number)).split("").map(Number);
  const sum = digits.reduce((total, digit) => total + digit, 0);
  const product = digits.reduce((total, digit) => total * digit, 1);
  return sum === product;
}

function neonNumber(number) {
  const squareDigits = String(number ** 2).split("").map(Number);
  return squareDigits.reduce((sum, digit) => sum + digit, 0) === number;
}

function evilNumber(number) {
  const ones = number.toString(2).split("").filter((bit) => bit === "1").length;
  return ones % 2 === 0;
}

function armstrongNumber(number) {
  const digits = String(Math.abs(number)).split("").map(Number);
  const power = digits.length;
  const sum = digits.reduce((total, digit) => total + digit ** power, 0);
  return sum === number;
}

function perfectNumber(number) {
  if (number <= 1) return false;
  let sum = 1;

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor !== 0) continue;
    sum += divisor;
    if (divisor * divisor !== number) sum += number / divisor;
  }

  return sum === number;
}

function happyNumber(number) {
  const seen = new Set();
  let current = number;

  while (current !== 1 && !seen.has(current)) {
    seen.add(current);
    current = String(current).split("").reduce((sum, digit) => sum + Number(digit) ** 2, 0);
  }

  return current === 1;
}

function sadNumber(number) {
  const seen = new Set();
  let current = number;

  while (current !== 1 && !seen.has(current)) {
    seen.add(current);
    current = String(current).split("").reduce((sum, digit) => sum + Number(digit) ** 2, 0);
  }

  return current !== 1;
}

function harshadNumber(number) {
  const digitSum = String(Math.abs(number))
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
  return digitSum > 0 && number % digitSum === 0;
}

function abundantNumber(number) {
  if (number < 12) return false;
  let sum = 1;

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor !== 0) continue;
    sum += divisor;
    if (divisor * divisor !== number) sum += number / divisor;
  }

  return sum > number;
}

function deficientNumber(number) {
  if (number <= 1) return true;
  let sum = 1;

  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor !== 0) continue;
    sum += divisor;
    if (divisor * divisor !== number) sum += number / divisor;
  }

  return sum < number;
}

function amicableNumbers(first, second) {
  function properDivisorSum(number) {
    if (number <= 1) return 0;
    let sum = 1;
    for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
      if (number % divisor !== 0) continue;
      sum += divisor;
      if (divisor * divisor !== number) sum += number / divisor;
    }
    return sum;
  }

  return first !== second &&
    properDivisorSum(first) === second &&
    properDivisorSum(second) === first;
}

function automorphicNumber(number) {
  return String(number ** 2).endsWith(String(number));
}

function fibonacciNumber(number) {
  let first = 0;
  let second = 1;

  while (first < number) [first, second] = [second, first + second];
  return first === number;
}

function lucasNumber(number) {
  let first = 2;
  let second = 1;

  while (first < number) [first, second] = [second, first + second];
  return first === number;
}

function palindromicNumber(number) {
  const value = String(number);
  return value === [...value].reverse().join("");
}

function primeNumber(number) {
  if (number < 2) return false;
  for (let divisor = 2; divisor * divisor <= number; divisor += 1) {
    if (number % divisor === 0) return false;
  }
  return true;
}

function compositeNumber(number) {
  return number > 1 && !primeNumber(number);
}

function twinPrimes(first, second) {
  return primeNumber(first) && primeNumber(second) && Math.abs(first - second) === 2;
}

function mersennePrime(number) {
  return primeNumber(number) && (number + 1 & number) === 0;
}

function squareNumber(number) {
  return number >= 0 && Number.isInteger(Math.sqrt(number));
}

function cubicNumber(number) {
  const root = Math.round(Math.cbrt(number));
  return root ** 3 === number;
}

function triangularNumber(number) {
  const discriminant = 8 * number + 1;
  return number >= 0 && Number.isInteger(Math.sqrt(discriminant));
}

function smithNumber(number) {
  if (!compositeNumber(number)) return false;
  const digitSum = (value) => String(value).split("").reduce((sum, digit) => sum + Number(digit), 0);
  let remaining = number;
  let factorSum = 0;

  for (let factor = 2; factor * factor <= remaining; factor += 1) {
    while (remaining % factor === 0) {
      factorSum += digitSum(factor);
      remaining /= factor;
    }
  }
  if (remaining > 1) factorSum += digitSum(remaining);
  return digitSum(number) === factorSum;
}

function kaprekarNumber(number) {
  if (number < 1) return false;
  const square = String(number ** 2);
  for (let split = 1; split < square.length; split += 1) {
    if (Number(square.slice(0, split)) + Number(square.slice(split)) === number) return true;
  }
  return number === 1;
}

function disariumNumber(number) {
  const digits = String(number).split("").map(Number);
  return digits.reduce((sum, digit, index) => sum + digit ** (index + 1), 0) === number;
}

function pronicNumber(number) {
  if (number < 0) return false;
  const root = Math.floor(Math.sqrt(number));
  return root * (root + 1) === number;
}

function catalanNumber(number) {
  let catalan = 1;
  let index = 0;
  while (catalan < number) {
    index += 1;
    catalan = (catalan * 2 * (2 * index - 1)) / (index + 1);
  }
  return catalan === number;
}

function factorialNumber(number) {
  if (number < 1) return false;
  let factorial = 1;
  let multiplier = 1;
  while (factorial < number) {
    multiplier += 1;
    factorial *= multiplier;
  }
  return factorial === number;
}

function strongNumber(number) {
  const factorial = (digit) => {
    let result = 1;
    for (let value = 2; value <= digit; value += 1) result *= value;
    return result;
  };
  return String(number).split("").reduce((sum, digit) => sum + factorial(Number(digit)), 0) === number;
}

function magicNumber(number) {
  let current = number;
  while (current > 9) {
    current = String(current).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return current === 1;
}

function collatzSequence(number) {
  if (number < 1 || !Number.isInteger(number)) return [];
  const sequence = [number];
  let current = number;
  while (current !== 1) {
    current = current % 2 === 0 ? current / 2 : current * 3 + 1;
    sequence.push(current);
  }
  return sequence;
}

function ulamNumber(number) {
  if (number === 1 || number === 2) return true;
  const sequence = [1, 2];
  const known = new Set(sequence);

  while (sequence.at(-1) < number) {
    let candidate = sequence.at(-1) + 1;
    while (true) {
      let ways = 0;
      for (let first = 0; first < sequence.length; first += 1) {
        for (let second = first + 1; second < sequence.length; second += 1) {
          if (sequence[first] + sequence[second] === candidate) ways += 1;
        }
      }
      if (ways === 1 && !known.has(candidate)) break;
      candidate += 1;
    }
    sequence.push(candidate);
    known.add(candidate);
  }

  return known.has(number);
}

function semiPrimeNumber(number) {
  let remaining = number;
  let factors = 0;
  for (let divisor = 2; divisor * divisor <= remaining; divisor += 1) {
    while (remaining % divisor === 0) {
      if (!primeNumber(divisor)) return false;
      factors += 1;
      remaining /= divisor;
    }
  }
  if (remaining > 1) factors += 1;
  return factors === 2;
}

function taxicabNumber(number, ways = 2) {
  const limit = Math.floor(Math.cbrt(number));
  let representations = 0;
  for (let first = 1; first <= limit; first += 1) {
    for (let second = first; second <= limit; second += 1) {
      if (first ** 3 + second ** 3 === number) representations += 1;
    }
  }
  return representations >= ways;
}

function keithNumber(number) {
  const digits = String(number).split("").map(Number);
  const sequence = [...digits];
  while (sequence.at(-1) < number) {
    sequence.push(sequence.slice(-digits.length).reduce((sum, value) => sum + value, 0));
  }
  return sequence.at(-1) === number;
}

function odishNumber(number) {
  const sum = String(Math.abs(number)).split("").reduce((total, digit) => total + Number(digit), 0);
  return sum % 2 === 1;
}

function evenishNumber(number) {
  const sum = String(Math.abs(number)).split("").reduce((total, digit) => total + Number(digit), 0);
  return sum % 2 === 0;
}

function duckNumber(number) {
  return String(number).includes("0");
}

function cyclicNumber(number) {
  const value = String(number);
  const rotations = new Set();
  for (let index = 0; index < value.length; index += 1) {
    rotations.add(value.slice(index) + value.slice(0, index));
  }
  for (let multiplier = 1; multiplier <= value.length; multiplier += 1) {
    if (!rotations.has(String(number * multiplier).padStart(value.length, "0"))) return false;
  }
  return true;
}

function friedmanNumber(number) {
  const digits = String(number).split("").map(Number);
  const values = new Set(digits);

  function combine(current) {
    if (current.size === 1) return current.has(number);
    const list = [...current];
    for (let first = 0; first < list.length; first += 1) {
      for (let second = first + 1; second < list.length; second += 1) {
        const rest = list.filter((_, index) => index !== first && index !== second);
        const a = list[first];
        const b = list[second];
        const candidates = [a + b, a - b, b - a, a * b];
        if (b !== 0) candidates.push(a / b);
        if (a !== 0) candidates.push(b / a);
        if (Number.isInteger(a ** b)) candidates.push(a ** b);
        if (Number.isInteger(b ** a)) candidates.push(b ** a);
        for (const candidate of candidates) {
          if (Number.isFinite(candidate) && combine(new Set([...rest, candidate]))) return true;
        }
      }
    }
    return false;
  }

  return combine(values);
}

function goldbachConjecture(number) {
  if (number <= 2 || number % 2 !== 0) return false;
  for (let first = 2; first <= number / 2; first += 1) {
    if (primeNumber(first) && primeNumber(number - first)) return true;
  }
  return false;
}

function circularPrime(number) {
  if (!primeNumber(number)) return false;
  const value = String(number);
  for (let shift = 1; shift < value.length; shift += 1) {
    if (!primeNumber(Number(value.slice(shift) + value.slice(0, shift)))) return false;
  }
  return true;
}

function smarandacheWellinNumber(number) {
  let concatenated = "";
  let candidate = 2;
  while (Number(concatenated) < number) {
    if (primeNumber(candidate)) concatenated += candidate;
    candidate += 1;
  }
  return Number(concatenated) === number;
}

function untouchableNumber(number) {
  const sums = new Set();
  for (let candidate = 2; candidate <= number * 2; candidate += 1) {
    let sum = 1;
    for (let divisor = 2; divisor * divisor <= candidate; divisor += 1) {
      if (candidate % divisor !== 0) continue;
      sum += divisor;
      if (divisor * divisor !== candidate) sum += candidate / divisor;
    }
    sums.add(sum);
  }
  return !sums.has(number);
}

function practicalNumber(number) {
  if (number < 1) return false;
  const divisors = [];
  for (let divisor = 1; divisor <= number; divisor += 1) {
    if (number % divisor === 0) divisors.push(divisor);
  }
  for (let target = 1; target < number; target += 1) {
    const possible = Array(target + 1).fill(false);
    possible[0] = true;
    for (const divisor of divisors) {
      for (let sum = target; sum >= divisor; sum -= 1) possible[sum] ||= possible[sum - divisor];
    }
    if (!possible[target]) return false;
  }
  return true;
}

function symmetricNumber(number) {
  const value = String(number);
  return value === [...value].reverse().join("");
}

function abundantPowerNumber(number) {
  if (!abundantNumber(number)) return false;
  for (let base = 2; base ** 2 <= number; base += 1) {
    let value = base ** 2;
    while (value < number) value *= base;
    if (value === number) return true;
  }
  return number === 1;
}

function woodallNumber(number) {
  for (let exponent = 1; 2 ** exponent <= number + 1; exponent += 1) {
    if (exponent * 2 ** exponent - 1 === number) return true;
  }
  return false;
}

function cullenNumber(number) {
  for (let exponent = 1; 2 ** exponent <= number; exponent += 1) {
    if (exponent * 2 ** exponent + 1 === number) return true;
  }
  return false;
}

function sphenicNumber(number) {
  let remaining = number;
  let factors = 0;
  for (let divisor = 2; divisor * divisor <= remaining; divisor += 1) {
    if (remaining % divisor !== 0) continue;
    if (!primeNumber(divisor)) return false;
    remaining /= divisor;
    factors += 1;
    if (remaining % divisor === 0) return false;
  }
  if (remaining > 1) factors += 1;
  return factors === 3;
}

function fourierSeriesCoefficient(samples, harmonic) {
  const coefficient = { real: 0, imaginary: 0 };
  const count = samples.length;

  for (let index = 0; index < count; index += 1) {
    const angle = harmonic * (-Math.PI + (2 * Math.PI * index) / count);
    coefficient.real += samples[index] * Math.cos(angle);
    coefficient.imaginary += samples[index] * Math.sin(angle);
  }

  return {
    real: coefficient.real / count,
    imaginary: coefficient.imaginary / count,
  };
}

function continuousFourierTransform(samples, frequency, spacing = 1) {
  const transform = { real: 0, imaginary: 0 };

  for (let index = 0; index < samples.length; index += 1) {
    const angle = -2 * Math.PI * index * spacing * frequency;
    transform.real += samples[index] * Math.cos(angle) * spacing;
    transform.imaginary += samples[index] * Math.sin(angle) * spacing;
  }

  return transform;
}

function inverseFourierTransform(spectrum, position, frequencySpacing = 1) {
  const value = { real: 0, imaginary: 0 };

  for (let index = 0; index < spectrum.length; index += 1) {
    const angle = 2 * Math.PI * index * frequencySpacing * position;
    value.real += (spectrum[index].real * Math.cos(angle) - spectrum[index].imaginary * Math.sin(angle)) * frequencySpacing;
    value.imaginary += (spectrum[index].real * Math.sin(angle) + spectrum[index].imaginary * Math.cos(angle)) * frequencySpacing;
  }

  return value;
}

function convolutionTheorem(first, second) {
  const length = first.length + second.length - 1;
  const convolution = Array(length).fill(0);
  const transform = (values) => values.map((_, frequency) => values.reduce((sum, value, index) => {
    const angle = (-2 * Math.PI * frequency * index) / length;
    return {
      real: sum.real + value * Math.cos(angle),
      imaginary: sum.imaginary + value * Math.sin(angle),
    };
  }, { real: 0, imaginary: 0 }));

  for (let firstIndex = 0; firstIndex < first.length; firstIndex += 1) {
    for (let secondIndex = 0; secondIndex < second.length; secondIndex += 1) {
      convolution[firstIndex + secondIndex] += first[firstIndex] * second[secondIndex];
    }
  }

  const firstTransform = transform([...first, ...Array(length - first.length).fill(0)]);
  const secondTransform = transform([...second, ...Array(length - second.length).fill(0)]);
  const inverse = firstTransform.map((value, index) => ({
    real: value.real * secondTransform[index].real - value.imaginary * secondTransform[index].imaginary,
    imaginary: value.real * secondTransform[index].imaginary + value.imaginary * secondTransform[index].real,
  }));
  const recovered = Array(length).fill(0).map((_, index) =>
    inverse.reduce((sum, value, frequency) => {
      const angle = (2 * Math.PI * frequency * index) / length;
      return sum + value.real * Math.cos(angle) - value.imaginary * Math.sin(angle);
    }, 0) / length);

  return { convolution, recoveredFromTransform: recovered };
}

function rsaKeyCalculation(firstPrime, secondPrime) {
  return { n: firstPrime * secondPrime, phi: (firstPrime - 1) * (secondPrime - 1) };
}

function modularPower(base, exponent, modulus) {
  let result = 1;
  let current = base % modulus;
  let power = exponent;

  while (power > 0) {
    if (power % 2 === 1) result = (result * current) % modulus;
    current = (current * current) % modulus;
    power = Math.floor(power / 2);
  }

  return result;
}

function rsaEncryption(message, exponent, modulus) {
  return modularPower(message, exponent, modulus);
}

function rsaDecryption(ciphertext, privateExponent, modulus) {
  return modularPower(ciphertext, privateExponent, modulus);
}

function diffieHellmanSharedSecret(generator, privateKeyA, privateKeyB, prime) {
  return modularPower(modularPower(generator, privateKeyA, prime), privateKeyB, prime);
}

function caesarEncryption(input, shift) {
  const normalizedShift = ((shift % 26) + 26) % 26;
  return [...input].map((character) => {
    const code = character.charCodeAt(0);
    const start = code >= 65 && code <= 90 ? 65 : code >= 97 && code <= 122 ? 97 : null;
    return start === null ? character : String.fromCharCode((code - start + normalizedShift) % 26 + start);
  }).join("");
}

function caesarDecryption(input, shift) {
  return caesarEncryption(input, -shift);
}

function sha256Hash(input) {
  return createHash("sha256").update(input).digest("hex");
}

function binaryHeap(values) {
  const heap = [...values];
  const siftDown = (index) => {
    let smallest = index;
    const left = index * 2 + 1;
    const right = index * 2 + 2;
    if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
    if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
    if (smallest !== index) {
      [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
      siftDown(smallest);
    }
  };
  for (let index = Math.floor(heap.length / 2) - 1; index >= 0; index -= 1) siftDown(index);
  return heap;
}

function binomialHeap(values) {
  const heap = [];
  for (const value of values) {
    heap.push(value);
    heap.sort((first, second) => first - second);
  }
  return heap;
}

function fibonacciHeap(values) {
  const roots = [...values];
  const extracted = [];
  while (roots.length > 0) {
    let minimum = 0;
    for (let index = 1; index < roots.length; index += 1) {
      if (roots[index] < roots[minimum]) minimum = index;
    }
    extracted.push(roots.splice(minimum, 1)[0]);
  }
  return extracted;
}

function leftistHeap(first, second) {
  const values = [...first, ...second].sort((a, b) => a - b);
  return values;
}

function skewHeap(first, second) {
  const values = [...first, ...second];
  const result = [];
  while (values.length > 0) {
    const minimum = Math.min(...values);
    result.push(minimum);
    values.splice(values.indexOf(minimum), 1);
  }
  return result;
}

function dAryHeap(values, children) {
  const heap = [...values];
  const siftDown = (index) => {
    let smallest = index;
    for (let child = 1; child <= children; child += 1) {
      const childIndex = index * children + child;
      if (childIndex < heap.length && heap[childIndex] < heap[smallest]) smallest = childIndex;
    }
    if (smallest !== index) {
      [heap[index], heap[smallest]] = [heap[smallest], heap[index]];
      siftDown(smallest);
    }
  };
  for (let index = Math.floor((heap.length - 1) / children); index >= 0; index -= 1) siftDown(index);
  return heap;
}

function weakHeap(values) {
  const heap = [...values].sort((a, b) => a - b);
  const flags = Array(heap.length).fill(false);
  return { values: heap, reverseBits: flags };
}

function beapSearch(rows, target) {
  for (let row = 0; row < rows.length; row += 1) {
    for (let column = 0; column < rows[row].length; column += 1) {
      if (rows[row][column] === target) return [row, column];
    }
  }
  return [-1, -1];
}

function pairingHeap(values) {
  const heap = [...values];
  const extracted = [];
  while (heap.length > 0) {
    let minimum = 0;
    for (let index = 1; index < heap.length; index += 1) {
      if (heap[index] < heap[minimum]) minimum = index;
    }
    extracted.push(heap.splice(minimum, 1)[0]);
  }
  return extracted;
}

function treapMinMax(values) {
  const ordered = [...values].sort((a, b) => a - b);
  return { minimum: ordered[0], maximum: ordered.at(-1), ordered };
}

function multilayerPerceptron(input, weights, biases) {
  let activations = [...input];
  for (let layer = 0; layer < weights.length; layer += 1) {
    activations = weights[layer].map((neurons, row) =>
      Math.max(0, neurons.reduce((sum, weight, column) => sum + weight * activations[column], biases[layer][row])));
  }
  return activations;
}

function convolutionalNeuralNetwork(input, kernel) {
  const output = [];
  for (let row = 0; row <= input.length - kernel.length; row += 1) {
    const values = [];
    for (let column = 0; column <= input[0].length - kernel[0].length; column += 1) {
      let sum = 0;
      for (let kernelRow = 0; kernelRow < kernel.length; kernelRow += 1) {
        for (let kernelColumn = 0; kernelColumn < kernel[0].length; kernelColumn += 1) {
          sum += input[row + kernelRow][column + kernelColumn] * kernel[kernelRow][kernelColumn];
        }
      }
      values.push(sum);
    }
    output.push(values);
  }
  return output;
}

function recurrentNeuralNetwork(sequence, inputWeight, hiddenWeight, bias) {
  let hidden = 0;
  return sequence.map((value) => {
    hidden = Math.tanh(inputWeight * value + hiddenWeight * hidden + bias);
    return hidden;
  });
}

function longShortTermMemory(input, previousCell, previousHidden, gates) {
  const sigmoid = (value) => 1 / (1 + Math.exp(-value));
  const forget = sigmoid(input + previousHidden + gates.forget);
  const inputGate = sigmoid(input + previousHidden + gates.input);
  const output = sigmoid(input + previousHidden + gates.output);
  const candidate = Math.tanh(input + previousHidden + gates.candidate);
  const cell = forget * previousCell + inputGate * candidate;
  return { cell, hidden: output * Math.tanh(cell) };
}

function gatedRecurrentUnit(input, previousHidden, gates) {
  const sigmoid = (value) => 1 / (1 + Math.exp(-value));
  const update = sigmoid(input + previousHidden + gates.update);
  const reset = sigmoid(input + previousHidden + gates.reset);
  const candidate = Math.tanh(input + reset * previousHidden + gates.candidate);
  return (1 - update) * previousHidden + update * candidate;
}

function transformersSelfAttention(values) {
  return values.map((query) => {
    const scores = values.map((key) => query * key);
    const exponentials = scores.map((score) => Math.exp(score - Math.max(...scores)));
    const total = exponentials.reduce((sum, value) => sum + value, 0);
    return exponentials.reduce((sum, weight, index) => sum + (weight / total) * values[index], 0);
  });
}

function autoencoder(input, encoderWeights, decoderWeights) {
  const encoded = encoderWeights.map((weights) =>
    Math.max(0, weights.reduce((sum, weight, index) => sum + weight * input[index], 0)));
  const reconstructed = decoderWeights.map((weights) =>
    Math.max(0, weights.reduce((sum, weight, index) => sum + weight * encoded[index], 0)));
  return { encoded, reconstructed };
}

function generativeAdversarialNetwork(noise, realValue, generatorScale, discriminatorScale) {
  const generated = noise * generatorScale;
  const sigmoid = (value) => 1 / (1 + Math.exp(-value));
  return {
    generated,
    realScore: sigmoid(realValue * discriminatorScale),
    generatedScore: sigmoid(generated * discriminatorScale),
  };
}

function variationalAutoencoder(mean, logVariance, epsilon) {
  return mean + Math.exp(0.5 * logVariance) * epsilon;
}

function graphNeuralNetwork(graph, features, weight) {
  const updated = {};
  for (const node of Object.keys(graph)) {
    const neighbors = [node, ...graph[node]];
    const average = neighbors.reduce((sum, neighbor) => sum + features[neighbor], 0) / neighbors.length;
    updated[node] = Math.max(0, average * weight);
  }
  return updated;
}

function aabbCollision(first, second) {
  return first.minX <= second.maxX && first.maxX >= second.minX &&
    first.minY <= second.maxY && first.maxY >= second.minY;
}

function circleSphereCollision(first, second) {
  const distanceSquared = (first.x - second.x) ** 2 +
    (first.y - second.y) ** 2 + ((first.z ?? 0) - (second.z ?? 0)) ** 2;
  return distanceSquared <= (first.r + second.r) ** 2;
}

function circleAabbCollision(circle, box) {
  const x = Math.max(box.minX, Math.min(circle.x, box.maxX));
  const y = Math.max(box.minY, Math.min(circle.y, box.maxY));
  return (circle.x - x) ** 2 + (circle.y - y) ** 2 <= circle.r ** 2;
}

function orientedBoundingBoxSat(first, second) {
  const corners = (box) => {
    const cosine = Math.cos(box.angle);
    const sine = Math.sin(box.angle);
    return [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([x, y]) => ({
      x: box.center.x + (x * box.half.x * cosine - y * box.half.y * sine),
      y: box.center.y + (x * box.half.x * sine + y * box.half.y * cosine),
    }));
  };
  const axes = [first.angle, first.angle + Math.PI / 2, second.angle, second.angle + Math.PI / 2]
    .map((angle) => ({ x: Math.cos(angle), y: Math.sin(angle) }));
  const project = (points, axis) => points.map((point) => point.x * axis.x + point.y * axis.y);
  const firstCorners = corners(first);
  const secondCorners = corners(second);

  return axes.every((axis) => {
    const firstProjection = project(firstCorners, axis);
    const secondProjection = project(secondCorners, axis);
    return Math.max(...firstProjection) >= Math.min(...secondProjection) &&
      Math.max(...secondProjection) >= Math.min(...firstProjection);
  });
}

function minimumTranslationVector(first, second) {
  if (!aabbCollision(first, second)) return null;
  const overlaps = [
    { x: second.maxX - first.minX, y: 0 },
    { x: first.maxX - second.minX, y: 0 },
    { x: 0, y: second.maxY - first.minY },
    { x: 0, y: first.maxY - second.minY },
  ];
  const translation = overlaps.reduce((best, current) =>
    Math.hypot(current.x, current.y) < Math.hypot(best.x, best.y) ? current : best);
  return {
    x: Math.sign((first.minX + first.maxX) - (second.minX + second.maxX)) * translation.x || 0,
    y: Math.sign((first.minY + first.maxY) - (second.minY + second.maxY)) * translation.y || 0,
  };
}

function closestPointsBetweenSegments(firstStart, firstEnd, secondStart, secondEnd) {
  const direction = (start, end) => ({ x: end.x - start.x, y: end.y - start.y, z: (end.z ?? 0) - (start.z ?? 0) });
  const dot = (first, second) => first.x * second.x + first.y * second.y + first.z * second.z;
  const a = direction(firstStart, firstEnd);
  const b = direction(secondStart, secondEnd);
  const r = direction(secondStart, firstStart);
  const aa = dot(a, a);
  const bb = dot(b, b);
  const ab = dot(a, b);
  const ar = dot(a, r);
  const br = dot(b, r);
  const denominator = aa * bb - ab * ab;
  let firstT = denominator === 0 ? 0 : (ab * br - bb * ar) / denominator;
  let secondT = denominator === 0 ? br / bb : (aa * br - ab * ar) / denominator;
  firstT = Math.max(0, Math.min(1, firstT));
  secondT = Math.max(0, Math.min(1, secondT));
  return {
    first: { x: firstStart.x + a.x * firstT, y: firstStart.y + a.y * firstT, z: (firstStart.z ?? 0) + a.z * firstT },
    second: { x: secondStart.x + b.x * secondT, y: secondStart.y + b.y * secondT, z: (secondStart.z ?? 0) + b.z * secondT },
  };
}

function convexHull(points) {
  const sorted = [...points].sort((first, second) => first.x - second.x || first.y - second.y);
  const cross = (origin, first, second) =>
    (first.x - origin.x) * (second.y - origin.y) - (first.y - origin.y) * (second.x - origin.x);
  const build = (values) => {
    const result = [];
    for (const point of values) {
      while (result.length >= 2 && cross(result.at(-2), result.at(-1), point) <= 0) result.pop();
      result.push(point);
    }
    return result;
  };
  const lower = build(sorted);
  const upper = build(sorted.reverse());
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

function earClippingTriangulation(polygon) {
  const remaining = polygon.map((_, index) => index);
  const triangles = [];
  const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  while (remaining.length > 3) {
    let clipped = false;
    for (let index = 0; index < remaining.length; index += 1) {
      const previous = polygon[remaining[(index - 1 + remaining.length) % remaining.length]];
      const current = polygon[remaining[index]];
      const next = polygon[remaining[(index + 1) % remaining.length]];
      if (cross(previous, current, next) <= 0) continue;
      triangles.push([previous, current, next]);
      remaining.splice(index, 1);
      clipped = true;
      break;
    }
    if (!clipped) break;
  }
  if (remaining.length === 3) triangles.push(remaining.map((index) => polygon[index]));
  return triangles;
}

function signedPolygonArea(polygon) {
  return polygon.reduce((sum, point, index) => {
    const next = polygon[(index + 1) % polygon.length];
    return sum + point.x * next.y - next.x * point.y;
  }, 0) / 2;
}

function polygonWindingOrder(polygon) {
  const area = signedPolygonArea(polygon);
  return area > 0 ? "counter-clockwise" : area < 0 ? "clockwise" : "degenerate";
}

function pointInsideCircle(point, circle) {
  return (point.x - circle.x) ** 2 + (point.y - circle.y) ** 2 <= circle.r ** 2;
}

function pointInsideTriangle(point, triangle) {
  const sign = (first, second, third) =>
    (first.x - third.x) * (second.y - third.y) - (second.x - third.x) * (first.y - third.y);
  const first = sign(point, triangle[0], triangle[1]);
  const second = sign(point, triangle[1], triangle[2]);
  const third = sign(point, triangle[2], triangle[0]);
  return !((first < 0 || second < 0 || third < 0) && (first > 0 || second > 0 || third > 0));
}

function circleIntersection(first, second) {
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const distance = Math.hypot(dx, dy);
  if (distance > first.r + second.r || distance < Math.abs(first.r - second.r) || distance === 0) return [];
  const along = (first.r ** 2 - second.r ** 2 + distance ** 2) / (2 * distance);
  const height = Math.sqrt(Math.max(0, first.r ** 2 - along ** 2));
  const middle = { x: first.x + (along * dx) / distance, y: first.y + (along * dy) / distance };
  const offset = { x: (-dy * height) / distance, y: (dx * height) / distance };
  const firstPoint = { x: middle.x + offset.x, y: middle.y + offset.y };
  const secondPoint = { x: middle.x - offset.x, y: middle.y - offset.y };
  return height === 0 ? [firstPoint] : [firstPoint, secondPoint];
}

function boundingSphere(points) {
  const center = points.reduce((sum, point) => ({ x: sum.x + point.x, y: sum.y + point.y, z: sum.z + (point.z ?? 0) }), { x: 0, y: 0, z: 0 });
  center.x /= points.length;
  center.y /= points.length;
  center.z /= points.length;
  const radius = Math.max(...points.map((point) => Math.hypot(point.x - center.x, point.y - center.y, (point.z ?? 0) - center.z)));
  return { center, radius };
}

function voronoiDiagram(sites, samples) {
  return samples.map((sample) => {
    let nearest = 0;
    let distance = Infinity;
    sites.forEach((site, index) => {
      const current = (site.x - sample.x) ** 2 + (site.y - sample.y) ** 2;
      if (current < distance) {
        distance = current;
        nearest = index;
      }
    });
    return nearest;
  });
}

function delaunayTriangulation(points) {
  const triangles = [];
  const circumcircle = (a, b, c) => {
    const denominator = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    const x = ((a.x ** 2 + a.y ** 2) * (b.y - c.y) + (b.x ** 2 + b.y ** 2) * (c.y - a.y) + (c.x ** 2 + c.y ** 2) * (a.y - b.y)) / denominator;
    const y = ((a.x ** 2 + a.y ** 2) * (c.x - b.x) + (b.x ** 2 + b.y ** 2) * (a.x - c.x) + (c.x ** 2 + c.y ** 2) * (b.x - a.x)) / denominator;
    return { x, y, radius: Math.hypot(a.x - x, a.y - y) };
  };
  for (let first = 0; first < points.length; first += 1) {
    for (let second = first + 1; second < points.length; second += 1) {
      for (let third = second + 1; third < points.length; third += 1) {
        const circle = circumcircle(points[first], points[second], points[third]);
        if (points.every((point, index) => index === first || index === second || index === third ||
          Math.hypot(point.x - circle.x, point.y - circle.y) >= circle.radius - 1e-9)) {
          triangles.push([points[first], points[second], points[third]]);
        }
      }
    }
  }
  return triangles;
}

function rayCastingPointInPolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
    const intersects = (polygon[index].y > point.y) !== (polygon[previous].y > point.y) &&
      point.x < ((polygon[previous].x - polygon[index].x) * (point.y - polygon[index].y)) /
      (polygon[previous].y - polygon[index].y) + polygon[index].x;
    if (intersects) inside = !inside;
  }
  return inside;
}

function meshVolume(vertices, faces) {
  return Math.abs(faces.reduce((sum, [first, second, third]) => {
    const a = vertices[first];
    const b = vertices[second];
    const c = vertices[third];
    return sum + a.x * (b.y * c.z - b.z * c.y) -
      a.y * (b.x * c.z - b.z * c.x) + a.z * (b.x * c.y - b.y * c.x);
  }, 0) / 6);
}

function nearestPointOnMeshToRay(origin, direction, triangles) {
  let nearest = null;
  let nearestDistance = Infinity;
  for (const [a, b, c] of triangles) {
    const edge1 = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
    const edge2 = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
    const cross = (first, second) => ({ x: first.y * second.z - first.z * second.y, y: first.z * second.x - first.x * second.z, z: first.x * second.y - first.y * second.x });
    const dot = (first, second) => first.x * second.x + first.y * second.y + first.z * second.z;
    const h = cross(direction, edge2);
    const determinant = dot(edge1, h);
    if (Math.abs(determinant) < 1e-9) continue;
    const inverse = 1 / determinant;
    const s = { x: origin.x - a.x, y: origin.y - a.y, z: origin.z - a.z };
    const u = inverse * dot(s, h);
    const q = cross(s, edge1);
    const v = inverse * dot(direction, q);
    const distance = inverse * dot(edge2, q);
    if (u >= 0 && v >= 0 && u + v <= 1 && distance >= 0 && distance < nearestDistance) {
      nearestDistance = distance;
      nearest = { x: origin.x + direction.x * distance, y: origin.y + direction.y * distance, z: origin.z + direction.z * distance };
    }
  }
  return nearest;
}

function clipPolygonAgainstFrustum(polygon, bounds) {
  const edges = [
    { inside: (point) => point.x >= bounds.minX, intersect: (first, second) => ({ x: bounds.minX, y: first.y + (second.y - first.y) * (bounds.minX - first.x) / (second.x - first.x) }) },
    { inside: (point) => point.x <= bounds.maxX, intersect: (first, second) => ({ x: bounds.maxX, y: first.y + (second.y - first.y) * (bounds.maxX - first.x) / (second.x - first.x) }) },
    { inside: (point) => point.y >= bounds.minY, intersect: (first, second) => ({ x: first.x + (second.x - first.x) * (bounds.minY - first.y) / (second.y - first.y), y: bounds.minY }) },
    { inside: (point) => point.y <= bounds.maxY, intersect: (first, second) => ({ x: first.x + (second.x - first.x) * (bounds.maxY - first.y) / (second.y - first.y), y: bounds.maxY }) },
  ];
  return edges.reduce((output, edge) => {
    const clipped = [];
    for (let index = 0; index < output.length; index += 1) {
      const current = output[index];
      const previous = output[(index - 1 + output.length) % output.length];
      if (edge.inside(current) !== edge.inside(previous)) clipped.push(edge.intersect(previous, current));
      if (edge.inside(current)) clipped.push(current);
    }
    return clipped;
  }, polygon);
}

function vectorMagnitude(vector) {
  return Math.hypot(vector.x, vector.y, vector.z);
}

function normalizeVector(vector) {
  const magnitude = vectorMagnitude(vector);
  return magnitude === 0 ? { x: 0, y: 0, z: 0 } : {
    x: vector.x / magnitude,
    y: vector.y / magnitude,
    z: vector.z / magnitude,
  };
}

function vectorDotProduct(first, second) {
  return first.x * second.x + first.y * second.y + first.z * second.z;
}

function vectorCrossProduct(first, second) {
  return {
    x: first.y * second.z - first.z * second.y,
    y: first.z * second.x - first.x * second.z,
    z: first.x * second.y - first.y * second.x,
  };
}

function projectVector(vector, onto) {
  const scale = vectorDotProduct(vector, onto) / vectorDotProduct(onto, onto);
  return { x: onto.x * scale, y: onto.y * scale, z: onto.z * scale };
}

function reflectVector(vector, normal) {
  const scale = 2 * vectorDotProduct(vector, normal);
  return {
    x: vector.x - scale * normal.x,
    y: vector.y - scale * normal.y,
    z: vector.z - scale * normal.z,
  };
}

function eulerRotationMatrix(angles) {
  const { x, y, z } = angles;
  const cx = Math.cos(x);
  const sx = Math.sin(x);
  const cy = Math.cos(y);
  const sy = Math.sin(y);
  const cz = Math.cos(z);
  const sz = Math.sin(z);
  return [
    [cy * cz, -cy * sz, sy, 0],
    [sx * sy * cz + cx * sz, cx * cz - sx * sy * sz, -sx * cy, 0],
    [sx * sz - cx * sy * cz, sx * cz + cx * sy * sz, cx * cy, 0],
    [0, 0, 0, 1],
  ];
}

function quaternionToRotationMatrix(quaternion) {
  const { x, y, z, w } = quaternion;
  return [
    [1 - 2 * (y ** 2 + z ** 2), 2 * (x * y - z * w), 2 * (x * z + y * w), 0],
    [2 * (x * y + z * w), 1 - 2 * (x ** 2 + z ** 2), 2 * (y * z - x * w), 0],
    [2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x ** 2 + y ** 2), 0],
    [0, 0, 0, 1],
  ];
}

function multiply4x4Matrices(first, second) {
  return first.map((row) => second[0].map((_, column) =>
    row.reduce((sum, value, index) => sum + value * second[index][column], 0)));
}

function invert4x4Matrix(matrix) {
  const augmented = matrix.map((row, rowIndex) =>
    [...row, ...[0, 1, 2, 3].map((column) => (rowIndex === column ? 1 : 0))]);

  for (let column = 0; column < 4; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < 4; row += 1) {
      if (Math.abs(augmented[row][column]) > Math.abs(augmented[pivot][column])) pivot = row;
    }
    if (Math.abs(augmented[pivot][column]) < 1e-12) return null;
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const divisor = augmented[column][column];
    augmented[column] = augmented[column].map((value) => value / divisor);
    for (let row = 0; row < 4; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((value, index) => value - factor * augmented[column][index]);
    }
  }

  return augmented.map((row) => row.slice(4));
}

function transformPoint(matrix, point) {
  const values = [point.x, point.y, point.z, 1];
  const transformed = matrix.map((row) => row.reduce((sum, value, index) => sum + value * values[index], 0));
  const scale = transformed[3] || 1;
  return { x: transformed[0] / scale, y: transformed[1] / scale, z: transformed[2] / scale };
}

function pointInsideConvexPolygon(point, polygon) {
  let direction = 0;
  for (let index = 0; index < polygon.length; index += 1) {
    const current = polygon[index];
    const next = polygon[(index + 1) % polygon.length];
    const cross = (next.x - current.x) * (point.y - current.y) -
      (next.y - current.y) * (point.x - current.x);
    if (cross !== 0) {
      if (direction === 0) direction = Math.sign(cross);
      else if (direction !== Math.sign(cross)) return false;
    }
  }
  return true;
}

function pointToLineSegmentDistance(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dz = end.z - start.z;
  const lengthSquared = dx ** 2 + dy ** 2 + dz ** 2;
  const parameter = lengthSquared === 0
    ? 0
    : Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy + (point.z - start.z) * dz) / lengthSquared));
  return Math.hypot(point.x - (start.x + parameter * dx), point.y - (start.y + parameter * dy), point.z - (start.z + parameter * dz));
}

function pointToPlaneDistance(point, plane) {
  return Math.abs(vectorDotProduct(point, plane.normal) + plane.constant) / vectorMagnitude(plane.normal);
}

function lineIntersection2D(firstStart, firstEnd, secondStart, secondEnd) {
  const denominator = (firstStart.x - firstEnd.x) * (secondStart.y - secondEnd.y) -
    (firstStart.y - firstEnd.y) * (secondStart.x - secondEnd.x);
  if (denominator === 0) return null;
  const firstDeterminant = firstStart.x * firstEnd.y - firstStart.y * firstEnd.x;
  const secondDeterminant = secondStart.x * secondEnd.y - secondStart.y * secondEnd.x;
  return {
    x: (firstDeterminant * (secondStart.x - secondEnd.x) - (firstStart.x - firstEnd.x) * secondDeterminant) / denominator,
    y: (firstDeterminant * (secondStart.y - secondEnd.y) - (firstStart.y - firstEnd.y) * secondDeterminant) / denominator,
  };
}

function raySphereIntersection(origin, direction, sphere) {
  const offset = { x: origin.x - sphere.x, y: origin.y - sphere.y, z: origin.z - sphere.z };
  const a = vectorDotProduct(direction, direction);
  const b = 2 * vectorDotProduct(offset, direction);
  const c = vectorDotProduct(offset, offset) - sphere.r ** 2;
  const discriminant = b ** 2 - 4 * a * c;
  if (discriminant < 0) return null;
  const near = (-b - Math.sqrt(discriminant)) / (2 * a);
  const far = (-b + Math.sqrt(discriminant)) / (2 * a);
  const distance = near >= 0 ? near : far;
  return distance >= 0 ? distance : null;
}

function rayTriangleIntersection(origin, direction, triangle) {
  const [a, b, c] = triangle;
  const edge1 = { x: b.x - a.x, y: b.y - a.y, z: b.z - a.z };
  const edge2 = { x: c.x - a.x, y: c.y - a.y, z: c.z - a.z };
  const cross = vectorCrossProduct(direction, edge2);
  const determinant = vectorDotProduct(edge1, cross);
  if (Math.abs(determinant) < 1e-9) return null;
  const inverse = 1 / determinant;
  const offset = { x: origin.x - a.x, y: origin.y - a.y, z: origin.z - a.z };
  const u = inverse * vectorDotProduct(offset, cross);
  if (u < 0 || u > 1) return null;
  const secondCross = vectorCrossProduct(offset, edge1);
  const v = inverse * vectorDotProduct(direction, secondCross);
  const distance = inverse * vectorDotProduct(edge2, secondCross);
  if (v < 0 || u + v > 1 || distance < 0) return null;
  return distance;
}

function barycentricCoordinates(point, triangle) {
  const [a, b, c] = triangle;
  const denominator = (b.y - c.y) * (a.x - c.x) + (c.x - b.x) * (a.y - c.y);
  const first = ((b.y - c.y) * (point.x - c.x) + (c.x - b.x) * (point.y - c.y)) / denominator;
  const second = ((c.y - a.y) * (point.x - c.x) + (a.x - c.x) * (point.y - c.y)) / denominator;
  return { a: first, b: second, c: 1 - first - second };
}

function lerpVectors(first, second, amount) {
  return {
    x: first.x + (second.x - first.x) * amount,
    y: first.y + (second.y - first.y) * amount,
    z: first.z + (second.z - first.z) * amount,
  };
}

function slerpRotations(first, second, amount) {
  let dot = first.x * second.x + first.y * second.y + first.z * second.z + first.w * second.w;
  let target = { ...second };
  if (dot < 0) {
    dot = -dot;
    target = { x: -second.x, y: -second.y, z: -second.z, w: -second.w };
  }
  if (dot > 0.9995) {
    const result = {
      x: first.x + amount * (target.x - first.x),
      y: first.y + amount * (target.y - first.y),
      z: first.z + amount * (target.z - first.z),
      w: first.w + amount * (target.w - first.w),
    };
    const magnitude = Math.hypot(result.x, result.y, result.z, result.w);
    return Object.fromEntries(Object.entries(result).map(([key, value]) => [key, value / magnitude]));
  }
  const angle = Math.acos(dot);
  const firstScale = Math.sin((1 - amount) * angle) / Math.sin(angle);
  const secondScale = Math.sin(amount * angle) / Math.sin(angle);
  return {
    x: first.x * firstScale + target.x * secondScale,
    y: first.y * firstScale + target.y * secondScale,
    z: first.z * firstScale + target.z * secondScale,
    w: first.w * firstScale + target.w * secondScale,
  };
}

function perlinNoise(x, y, seed = 0) {
  const randomGradient = (gridX, gridY) => {
    const value = Math.sin(gridX * 127.1 + gridY * 311.7 + seed * 74.3) * 43758.5453;
    const angle = (value - Math.floor(value)) * Math.PI * 2;
    return { x: Math.cos(angle), y: Math.sin(angle) };
  };
  const fade = (value) => value * value * value * (value * (value * 6 - 15) + 10);
  const dot = (gridX, gridY, offsetX, offsetY) => {
    const gradient = randomGradient(gridX, gridY);
    return gradient.x * offsetX + gradient.y * offsetY;
  };
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const localX = x - x0;
  const localY = y - y0;
  const horizontal = fade(localX);
  const vertical = fade(localY);
  const top = dot(x0, y0, localX, localY) +
    horizontal * (dot(x0 + 1, y0, localX - 1, localY) - dot(x0, y0, localX, localY));
  const bottom = dot(x0, y0 + 1, localX, localY - 1) +
    horizontal * (dot(x0 + 1, y0 + 1, localX - 1, localY - 1) - dot(x0, y0 + 1, localX, localY - 1));
  return top + vertical * (bottom - top);
}

function simplexNoise(x, y, seed = 0) {
  const skew = (x + y) * (Math.sqrt(3) - 1) / 2;
  const gridX = Math.floor(x + skew);
  const gridY = Math.floor(y + skew);
  const unskew = (gridX + gridY) * (3 - Math.sqrt(3)) / 6;
  const originX = gridX - unskew;
  const originY = gridY - unskew;
  const localX = x - originX;
  const localY = y - originY;
  const second = localX > localY ? [1, 0] : [0, 1];
  const corners = [[localX, localY], [localX - second[0] + (3 - Math.sqrt(3)) / 6, localY - second[1] + (3 - Math.sqrt(3)) / 6], [localX - 1 + 2 * (3 - Math.sqrt(3)) / 6, localY - 1 + 2 * (3 - Math.sqrt(3)) / 6]];
  const valueAt = (offsetX, offsetY, index) => {
    const radius = 0.5 - offsetX ** 2 - offsetY ** 2;
    if (radius <= 0) return 0;
    const random = Math.sin((gridX + index) * 127.1 + (gridY + index) * 311.7 + seed) * 43758.5453;
    const angle = (random - Math.floor(random)) * Math.PI * 2;
    return radius ** 4 * (Math.cos(angle) * offsetX + Math.sin(angle) * offsetY);
  };
  return 70 * corners.reduce((sum, corner, index) => sum + valueAt(corner[0], corner[1], index), 0);
}

function bezierSpline(controlPoints, amount) {
  let points = controlPoints.map((point) => ({ ...point }));
  while (points.length > 1) {
    points = points.slice(0, -1).map((point, index) => ({
      x: point.x + (points[index + 1].x - point.x) * amount,
      y: point.y + (points[index + 1].y - point.y) * amount,
    }));
  }
  return points[0];
}

function hermiteSpline(start, end, tangentStart, tangentEnd, amount) {
  const t2 = amount ** 2;
  const t3 = t2 * amount;
  const first = 2 * t3 - 3 * t2 + 1;
  const second = t3 - 2 * t2 + amount;
  const third = -2 * t3 + 3 * t2;
  const fourth = t3 - t2;
  return {
    x: first * start.x + second * tangentStart.x + third * end.x + fourth * tangentEnd.x,
    y: first * start.y + second * tangentStart.y + third * end.y + fourth * tangentEnd.y,
  };
}

function linearRegression(points, predictionX = 0) {
  const count = points.length;
  const averageX = points.reduce((sum, point) => sum + point.x, 0) / count;
  const averageY = points.reduce((sum, point) => sum + point.y, 0) / count;
  const numerator = points.reduce((sum, point) => sum + (point.x - averageX) * (point.y - averageY), 0);
  const denominator = points.reduce((sum, point) => sum + (point.x - averageX) ** 2, 0);
  const slope = numerator / denominator;
  const intercept = averageY - slope * averageX;
  return { slope, intercept, predicted: slope * predictionX + intercept };
}

function euclideanDistance(first, second) {
  return Math.hypot(first.x - second.x, first.y - second.y, (first.z ?? 0) - (second.z ?? 0));
}

function pythagoreanTheorem(first, second, third = 0) {
  return Math.hypot(first, second, third);
}

function circleProperties(radius) {
  return { circumference: 2 * Math.PI * radius, area: Math.PI * radius ** 2 };
}

function heronTriangleArea(firstSide, secondSide, thirdSide) {
  const semiPerimeter = (firstSide + secondSide + thirdSide) / 2;
  return Math.sqrt(semiPerimeter * (semiPerimeter - firstSide) * (semiPerimeter - secondSide) * (semiPerimeter - thirdSide));
}

function sineCosineLaws(values) {
  const sideFromSine = values.knownSide * Math.sin(values.targetAngle) / Math.sin(values.knownAngle);
  const sideFromCosine = Math.sqrt(values.firstSide ** 2 + values.secondSide ** 2 -
    2 * values.firstSide * values.secondSide * Math.cos(values.includedAngle));
  return { sideFromSine, sideFromCosine };
}

function angleBisectorConstruction(firstRay, secondRay) {
  const normalize = (vector) => {
    const length = Math.hypot(vector.x, vector.y);
    return { x: vector.x / length, y: vector.y / length };
  };
  const first = normalize(firstRay);
  const second = normalize(secondRay);
  return normalize({ x: first.x + second.x, y: first.y + second.y });
}

function perpendicularBisector(first, second) {
  const midpoint = { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 };
  return { midpoint, direction: { x: -(second.y - first.y), y: second.x - first.x } };
}

function circleTangentConstruction(circle, point) {
  const dx = point.x - circle.x;
  const dy = point.y - circle.y;
  const distanceSquared = dx ** 2 + dy ** 2;
  if (distanceSquared <= circle.r ** 2) return [];
  const distance = Math.sqrt(distanceSquared);
  const along = circle.r ** 2 / distance;
  const offset = circle.r * Math.sqrt(distanceSquared - circle.r ** 2) / distance;
  const base = { x: circle.x + along * dx / distance, y: circle.y + along * dy / distance };
  return [
    { x: base.x - offset * dy / distance, y: base.y + offset * dx / distance },
    { x: base.x + offset * dy / distance, y: base.y - offset * dx / distance },
  ];
}

function inscribedCircumscribedTriangles(sides) {
  const area = heronTriangleArea(...sides);
  const semiPerimeter = sides.reduce((sum, side) => sum + side, 0) / 2;
  return {
    inradius: area / semiPerimeter,
    circumradius: (sides[0] * sides[1] * sides[2]) / (4 * area),
  };
}

function polygonAngleSum(sides) {
  return { interiorSum: (sides - 2) * Math.PI, regularExteriorAngle: (2 * Math.PI) / sides };
}

function regularPolygonConstruction(sides, radius) {
  return Array.from({ length: sides }, (_, index) => ({
    x: radius * Math.cos((2 * Math.PI * index) / sides),
    y: radius * Math.sin((2 * Math.PI * index) / sides),
  }));
}

function apolloniusCircle(first, second, ratio) {
  const denominator = 1 - ratio ** 2;
  if (denominator === 0) return { type: "line", midpoint: { x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 } };
  const center = {
    x: (first.x - ratio ** 2 * second.x) / denominator,
    y: (first.y - ratio ** 2 * second.y) / denominator,
  };
  return {
    type: "circle",
    center,
    radius: Math.abs(ratio * euclideanDistance(first, second) / denominator),
  };
}

function steinerTheorem(point, triangle) {
  const centroid = triangle.reduce((sum, vertex) => ({ x: sum.x + vertex.x / 3, y: sum.y + vertex.y / 3 }), { x: 0, y: 0 });
  const distanceSquared = (first, second) => (first.x - second.x) ** 2 + (first.y - second.y) ** 2;
  return {
    centroid,
    pointDistanceSquared: triangle.reduce((sum, vertex) => sum + distanceSquared(point, vertex), 0),
    centroidDistanceSquared: distanceSquared(point, centroid),
  };
}

function ptolemyTheorem(sides, knownDiagonal) {
  return (sides[0] * sides[2] + sides[1] * sides[3]) / knownDiagonal;
}

function cevaMenelausTheorems(cevaRatios, menelausRatios) {
  const cevaProduct = cevaRatios.reduce((product, ratio) => product * ratio, 1);
  const menelausProduct = menelausRatios.reduce((product, ratio) => product * ratio, 1);
  return { cevaProduct, concurrent: Math.abs(cevaProduct - 1) < 1e-9, menelausProduct, collinear: Math.abs(menelausProduct - 1) < 1e-9 };
}

function desarguesTheorem(first, second) {
  const lineIntersection = (a, b, c, d) => {
    const denominator = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x);
    if (denominator === 0) return null;
    const firstDeterminant = a.x * b.y - a.y * b.x;
    const secondDeterminant = c.x * d.y - c.y * d.x;
    return {
      x: (firstDeterminant * (c.x - d.x) - (a.x - b.x) * secondDeterminant) / denominator,
      y: (firstDeterminant * (c.y - d.y) - (a.y - b.y) * secondDeterminant) / denominator,
    };
  };
  const intersections = [
    lineIntersection(first[0], first[1], second[0], second[1]),
    lineIntersection(first[1], first[2], second[1], second[2]),
    lineIntersection(first[2], first[0], second[2], second[0]),
  ];
  return intersections;
}

function pascalTheorem(hexagon) {
  const lineIntersection = (a, b, c, d) => {
    const denominator = (a.x - b.x) * (c.y - d.y) - (a.y - b.y) * (c.x - d.x);
    if (denominator === 0) return null;
    const firstDeterminant = a.x * b.y - a.y * b.x;
    const secondDeterminant = c.x * d.y - c.y * d.x;
    return {
      x: (firstDeterminant * (c.x - d.x) - (a.x - b.x) * secondDeterminant) / denominator,
      y: (firstDeterminant * (c.y - d.y) - (a.y - b.y) * secondDeterminant) / denominator,
    };
  };
  return [
    lineIntersection(hexagon[0], hexagon[1], hexagon[3], hexagon[4]),
    lineIntersection(hexagon[1], hexagon[2], hexagon[4], hexagon[5]),
    lineIntersection(hexagon[2], hexagon[3], hexagon[5], hexagon[0]),
  ];
}

function brocardPoints(triangle) {
  const distanceSquared = (first, second) => (first.x - second.x) ** 2 + (first.y - second.y) ** 2;
  const a = distanceSquared(triangle[1], triangle[2]);
  const b = distanceSquared(triangle[0], triangle[2]);
  const c = distanceSquared(triangle[0], triangle[1]);
  const weights = [a * c, a * b, b * c];
  const total = weights.reduce((sum, value) => sum + value, 0);
  return {
    x: triangle.reduce((sum, point, index) => sum + point.x * weights[index], 0) / total,
    y: triangle.reduce((sum, point, index) => sum + point.y * weights[index], 0) / total,
  };
}

function triangleCenters(triangle) {
  const [a, b, c] = triangle;
  const centroid = { x: (a.x + b.x + c.x) / 3, y: (a.y + b.y + c.y) / 3 };
  const denominator = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
  const circumcenter = {
    x: ((a.x ** 2 + a.y ** 2) * (b.y - c.y) + (b.x ** 2 + b.y ** 2) * (c.y - a.y) + (c.x ** 2 + c.y ** 2) * (a.y - b.y)) / denominator,
    y: ((a.x ** 2 + a.y ** 2) * (c.x - b.x) + (b.x ** 2 + b.y ** 2) * (a.x - c.x) + (c.x ** 2 + c.y ** 2) * (b.x - a.x)) / denominator,
  };
  const orthocenter = { x: 3 * centroid.x - 2 * circumcenter.x, y: 3 * centroid.y - 2 * circumcenter.y };
  return { centroid, circumcenter, orthocenter };
}

function ninePointCircle(triangle) {
  const centers = triangleCenters(triangle);
  const radius = euclideanDistance(centers.circumcenter, triangle[0]) / 2;
  return {
    center: { x: (centers.circumcenter.x + centers.orthocenter.x) / 2, y: (centers.circumcenter.y + centers.orthocenter.y) / 2 },
    radius,
  };
}

function tribonacci(n) {
  if (n === 0) return 0;
  if (n < 3) return 1;
  let first = 0;
  let second = 1;
  let third = 1;
  for (let index = 3; index <= n; index += 1) {
    [first, second, third] = [second, third, first + second + third];
  }
  return third;
}

function ackermann(m, n) {
  if (m === 0) return n + 1;
  if (n === 0) return ackermann(m - 1, 1);
  return ackermann(m - 1, ackermann(m, n - 1));
}

function towerOfHanoi(disks, from = "A", auxiliary = "B", to = "C") {
  const moves = [];
  const solve = (count, source, spare, target) => {
    if (count === 0) return;
    solve(count - 1, source, target, spare);
    moves.push(`${source}->${target}`);
    solve(count - 1, spare, source, target);
  };
  solve(disks, from, auxiliary, to);
  return moves;
}

function fastPower(base, exponent) {
  let power = Math.abs(exponent);
  let result = 1;
  let factor = base;
  while (power > 0) {
    if (power % 2 === 1) result *= factor;
    factor *= factor;
    power = Math.floor(power / 2);
  }
  return exponent < 0 ? 1 / result : result;
}

function circlesOverlap2D(first, second) {
  return (first.x - second.x) ** 2 + (first.y - second.y) ** 2 <= (first.r + second.r) ** 2;
}

function aabbsOverlap2D(first, second) {
  return first.minX <= second.maxX && first.maxX >= second.minX &&
    first.minY <= second.maxY && first.maxY >= second.minY;
}

function circleAabbOverlap2D(circle, box) {
  const closestX = Math.max(box.minX, Math.min(circle.x, box.maxX));
  const closestY = Math.max(box.minY, Math.min(circle.y, box.maxY));
  return (circle.x - closestX) ** 2 + (circle.y - closestY) ** 2 <= circle.r ** 2;
}

function pointInsideCircle2D(point, circle) {
  return (point.x - circle.x) ** 2 + (point.y - circle.y) ** 2 <= circle.r ** 2;
}

function pointInsideAabb2D(point, box) {
  return point.x >= box.minX && point.x <= box.maxX && point.y >= box.minY && point.y <= box.maxY;
}

function infiniteLineIntersection2D(firstStart, firstEnd, secondStart, secondEnd) {
  const denominator = (firstStart.x - firstEnd.x) * (secondStart.y - secondEnd.y) -
    (firstStart.y - firstEnd.y) * (secondStart.x - secondEnd.x);
  if (denominator === 0) return null;
  const firstDeterminant = firstStart.x * firstEnd.y - firstStart.y * firstEnd.x;
  const secondDeterminant = secondStart.x * secondEnd.y - secondStart.y * secondEnd.x;
  return {
    x: (firstDeterminant * (secondStart.x - secondEnd.x) - (firstStart.x - firstEnd.x) * secondDeterminant) / denominator,
    y: (firstDeterminant * (secondStart.y - secondEnd.y) - (firstStart.y - firstEnd.y) * secondDeterminant) / denominator,
  };
}

function finiteSegmentsIntersect2D(firstStart, firstEnd, secondStart, secondEnd) {
  const cross = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
  const onSegment = (a, b, point) => point.x >= Math.min(a.x, b.x) && point.x <= Math.max(a.x, b.x) &&
    point.y >= Math.min(a.y, b.y) && point.y <= Math.max(a.y, b.y);
  const firstTurn = cross(firstStart, firstEnd, secondStart);
  const secondTurn = cross(firstStart, firstEnd, secondEnd);
  const thirdTurn = cross(secondStart, secondEnd, firstStart);
  const fourthTurn = cross(secondStart, secondEnd, firstEnd);
  const generalIntersection = ((firstTurn > 0 && secondTurn < 0) || (firstTurn < 0 && secondTurn > 0)) &&
    ((thirdTurn > 0 && fourthTurn < 0) || (thirdTurn < 0 && fourthTurn > 0));
  return generalIntersection ||
    (firstTurn === 0 && onSegment(firstStart, firstEnd, secondStart)) ||
    (secondTurn === 0 && onSegment(firstStart, firstEnd, secondEnd)) ||
    (thirdTurn === 0 && onSegment(secondStart, secondEnd, firstStart)) ||
    (fourthTurn === 0 && onSegment(secondStart, secondEnd, firstEnd));
}

function closestPointOnSegment2D(point, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx ** 2 + dy ** 2;
  const parameter = lengthSquared === 0
    ? 0
    : Math.max(0, Math.min(1, ((point.x - start.x) * dx + (point.y - start.y) * dy) / lengthSquared));
  return { x: start.x + parameter * dx, y: start.y + parameter * dy, parameter };
}

function closestPointOnAabbBoundary2D(point, box) {
  if (!pointInsideAabb2D(point, box)) {
    return {
      x: Math.max(box.minX, Math.min(point.x, box.maxX)),
      y: Math.max(box.minY, Math.min(point.y, box.maxY)),
    };
  }
  const distances = [
    { distance: point.x - box.minX, point: { x: box.minX, y: point.y } },
    { distance: box.maxX - point.x, point: { x: box.maxX, y: point.y } },
    { distance: point.y - box.minY, point: { x: point.x, y: box.minY } },
    { distance: box.maxY - point.y, point: { x: point.x, y: box.maxY } },
  ];
  return distances.reduce((closest, candidate) => candidate.distance < closest.distance ? candidate : closest).point;
}

function movingCircleSegmentIntersection2D(circle, velocity, segment) {
  const candidates = [];
  const addCandidate = (time) => {
    if (time < 0 || !Number.isFinite(time)) return;
    const center = { x: circle.x + velocity.x * time, y: circle.y + velocity.y * time };
    const point = closestPointOnSegment2D(center, segment.start, segment.end);
    candidates.push({ time, point: { x: point.x, y: point.y }, center });
  };
  const dx = segment.end.x - segment.start.x;
  const dy = segment.end.y - segment.start.y;
  const length = Math.hypot(dx, dy);
  if (length > 0) {
    const normal = { x: -dy / length, y: dx / length };
    const offset = (circle.x - segment.start.x) * normal.x + (circle.y - segment.start.y) * normal.y;
    const velocityAlongNormal = velocity.x * normal.x + velocity.y * normal.y;
    for (const side of [-1, 1]) {
      if (velocityAlongNormal !== 0) {
        const time = (side * circle.r - offset) / velocityAlongNormal;
        const hit = { x: circle.x + velocity.x * time, y: circle.y + velocity.y * time };
        const projection = ((hit.x - segment.start.x) * dx + (hit.y - segment.start.y) * dy) / (length ** 2);
        if (time >= 0 && projection >= 0 && projection <= 1) addCandidate(time);
      }
    }
  }
  const speedSquared = velocity.x ** 2 + velocity.y ** 2;
  for (const endpoint of [segment.start, segment.end]) {
    const relative = { x: circle.x - endpoint.x, y: circle.y - endpoint.y };
    const b = 2 * (relative.x * velocity.x + relative.y * velocity.y);
    const c = relative.x ** 2 + relative.y ** 2 - circle.r ** 2;
    const discriminant = b ** 2 - 4 * speedSquared * c;
    if (speedSquared > 0 && discriminant >= 0) {
      addCandidate((-b - Math.sqrt(discriminant)) / (2 * speedSquared));
    }
  }
  if (candidates.length === 0) return null;
  return candidates.reduce((earliest, candidate) => candidate.time < earliest.time ? candidate : earliest);
}

function cuboidInertiaTensor(mass, width, height, depth) {
  return {
    xx: mass * (height ** 2 + depth ** 2) / 12,
    yy: mass * (width ** 2 + depth ** 2) / 12,
    zz: mass * (width ** 2 + height ** 2) / 12,
  };
}

function sphereInertiaTensor(mass, radius) {
  const moment = 2 * mass * radius ** 2 / 5;
  return { xx: moment, yy: moment, zz: moment };
}

function capsulePlaneClosestPoints(capsule, plane) {
  const dot = (first, second) => first.x * second.x + first.y * second.y + first.z * second.z;
  const direction = {
    x: capsule.end.x - capsule.start.x,
    y: capsule.end.y - capsule.start.y,
    z: capsule.end.z - capsule.start.z,
  };
  const denominator = dot(direction, plane.normal);
  const startDistance = dot(capsule.start, plane.normal) + plane.constant;
  const parameter = denominator === 0 ? 0 : Math.max(0, Math.min(1, -startDistance / denominator));
  const axisPoint = {
    x: capsule.start.x + direction.x * parameter,
    y: capsule.start.y + direction.y * parameter,
    z: capsule.start.z + direction.z * parameter,
  };
  const distance = dot(axisPoint, plane.normal) + plane.constant;
  return {
    capsulePoint: {
      x: axisPoint.x - plane.normal.x * Math.sign(distance || 1) * capsule.radius,
      y: axisPoint.y - plane.normal.y * Math.sign(distance || 1) * capsule.radius,
      z: axisPoint.z - plane.normal.z * Math.sign(distance || 1) * capsule.radius,
    },
    planePoint: {
      x: axisPoint.x - plane.normal.x * distance,
      y: axisPoint.y - plane.normal.y * distance,
      z: axisPoint.z - plane.normal.z * distance,
    },
  };
}

function capsuleAabbOverlap3D(capsule, box) {
  const closest = (point) => ({
    x: Math.max(box.minX, Math.min(point.x, box.maxX)),
    y: Math.max(box.minY, Math.min(point.y, box.maxY)),
    z: Math.max(box.minZ, Math.min(point.z, box.maxZ)),
  });
  const distanceSquared = (parameter) => {
    const point = {
      x: capsule.start.x + (capsule.end.x - capsule.start.x) * parameter,
      y: capsule.start.y + (capsule.end.y - capsule.start.y) * parameter,
      z: capsule.start.z + (capsule.end.z - capsule.start.z) * parameter,
    };
    const near = closest(point);
    return (point.x - near.x) ** 2 + (point.y - near.y) ** 2 + (point.z - near.z) ** 2;
  };
  let low = 0;
  let high = 1;
  for (let index = 0; index < 60; index += 1) {
    const first = low + (high - low) / 3;
    const second = high - (high - low) / 3;
    if (distanceSquared(first) < distanceSquared(second)) high = second;
    else low = first;
  }
  return distanceSquared((low + high) / 2) <= capsule.radius ** 2;
}

function aabbIntersectionVolume3D(first, second) {
  const width = Math.max(0, Math.min(first.maxX, second.maxX) - Math.max(first.minX, second.minX));
  const height = Math.max(0, Math.min(first.maxY, second.maxY) - Math.max(first.minY, second.minY));
  const depth = Math.max(0, Math.min(first.maxZ, second.maxZ) - Math.max(first.minZ, second.minZ));
  return width * height * depth;
}

function boxSphereContactManifold(box, sphere, face) {
  const coordinate = face.side < 0 ? box[`min${face.axis}`] : box[`max${face.axis}`];
  const depth = Math.abs(sphere.center[face.axis.toLowerCase()] - coordinate);
  if (depth > sphere.radius) return [];
  const contactRadius = Math.sqrt(Math.max(0, sphere.radius ** 2 - depth ** 2));
  const axis = face.axis.toLowerCase();
  const axes = ["x", "y", "z"].filter((value) => value !== axis);
  const center = { ...sphere.center, [axis]: coordinate };
  return [
    center,
    { ...center, [axes[0]]: center[axes[0]] + contactRadius },
    { ...center, [axes[0]]: center[axes[0]] - contactRadius },
    { ...center, [axes[1]]: center[axes[1]] + contactRadius },
  ];
}

function angularAcceleration(offset, force, inertia) {
  const torque = {
    x: offset.y * force.z - offset.z * force.y,
    y: offset.z * force.x - offset.x * force.z,
    z: offset.x * force.y - offset.y * force.x,
  };
  return { x: torque.x / inertia.xx, y: torque.y / inertia.yy, z: torque.z / inertia.zz };
}

function verletDistanceConstraint(first, second, restLength) {
  const dx = second.x - first.x;
  const dy = second.y - first.y;
  const dz = second.z - first.z;
  const distance = Math.hypot(dx, dy, dz);
  if (distance === 0) return { first: { ...first }, second: { ...second } };
  const correction = (distance - restLength) / distance / 2;
  return {
    first: { x: first.x + dx * correction, y: first.y + dy * correction, z: first.z + dz * correction },
    second: { x: second.x - dx * correction, y: second.y - dy * correction, z: second.z - dz * correction },
  };
}

function clampJointCone(relativeRotation, maximumAngle) {
  const length = Math.hypot(relativeRotation.x, relativeRotation.y, relativeRotation.z, relativeRotation.w);
  const quaternion = {
    x: relativeRotation.x / length, y: relativeRotation.y / length,
    z: relativeRotation.z / length, w: relativeRotation.w / length,
  };
  const angle = 2 * Math.acos(Math.max(-1, Math.min(1, quaternion.w)));
  if (angle <= maximumAngle) return quaternion;
  const axisLength = Math.hypot(quaternion.x, quaternion.y, quaternion.z) || 1;
  const halfAngle = maximumAngle / 2;
  return {
    x: quaternion.x / axisLength * Math.sin(halfAngle),
    y: quaternion.y / axisLength * Math.sin(halfAngle),
    z: quaternion.z / axisLength * Math.sin(halfAngle),
    w: Math.cos(halfAngle),
  };
}

function projectPointOntoCapsuleSegment(point, capsule) {
  const dx = capsule.end.x - capsule.start.x;
  const dy = capsule.end.y - capsule.start.y;
  const dz = capsule.end.z - capsule.start.z;
  const lengthSquared = dx ** 2 + dy ** 2 + dz ** 2;
  const parameter = lengthSquared === 0 ? 0 : Math.max(0, Math.min(1,
    ((point.x - capsule.start.x) * dx + (point.y - capsule.start.y) * dy + (point.z - capsule.start.z) * dz) / lengthSquared));
  return {
    x: capsule.start.x + dx * parameter,
    y: capsule.start.y + dy * parameter,
    z: capsule.start.z + dz * parameter,
    parameter,
  };
}

function starPattern(pattern, size = 5) {
  const rows = pattern === "diamond" || pattern === "hollow-diamond" || pattern === "hourglass" || pattern === "hollow-hourglass" ? size * 2 - 1 : size;
  const columns = pattern === "pyramid" || pattern === "inverted-pyramid" || pattern === "hollow-pyramid" ||
    pattern === "diamond" || pattern === "hollow-diamond" || pattern === "hourglass" || pattern === "hollow-hourglass" ? size * 2 - 1 : size;
  const output = [];
  for (let i = 0; i < rows; i += 1) {
    let row = "";
    for (let j = 0; j < columns; j += 1) {
      const upper = i < size;
      const distance = upper ? i : rows - 1 - i;
      const left = upper ? i : rows - 1 - i;
      let filled = false;
      if (pattern === "square") filled = true;
      if (pattern === "right-left") filled = j <= i;
      if (pattern === "inverted-left") filled = j < size - i;
      if (pattern === "right") filled = j >= size - 1 - i;
      if (pattern === "inverted-right") filled = j >= i;
      if (pattern === "hollow-square") filled = i === 0 || i === size - 1 || j === 0 || j === size - 1;
      if (pattern === "rhombus") filled = j >= i && j < size + i;
      if (pattern === "mirrored") filled = j >= size - 1 - i;
      if (pattern === "pyramid") filled = j >= size - 1 - i && j <= size - 1 + i;
      if (pattern === "inverted-pyramid") filled = j >= i && j < columns - i;
      if (pattern === "hollow-right") filled = j === 0 || j === i || i === size - 1;
      if (pattern === "hollow-inverted-right") filled = j === 0 || j === size - 1 - i || i === size - 1;
      if (pattern === "hollow-right-right") filled = j === size - 1 || j === size - 1 - i || i === size - 1;
      if (pattern === "hollow-rhombus") filled = j === i || j === size + i - 1 || i === 0 || i === size - 1;
      if (pattern === "hollow-pyramid") filled = (j === size - 1 - i || j === size - 1 + i || i === size - 1);
      if (pattern === "pascal-right") filled = j === i || j === 0;
      if (pattern === "pascal-left") filled = j === size - 1 - i || j === size - 1;
      if (pattern === "diamond") filled = j >= size - 1 - distance && j <= size - 1 + distance;
      if (pattern === "hollow-diamond") filled = j === size - 1 - distance || j === size - 1 + distance;
      if (pattern === "hourglass") filled = j >= distance && j < columns - distance;
      if (pattern === "hollow-hourglass") filled = j === distance || j === columns - 1 - distance || distance === size - 1;
      if (pattern === "x") filled = j === i || j === size - 1 - i;
      if (pattern === "plus") filled = i === Math.floor(size / 2) || j === Math.floor(size / 2);
      if (pattern === "checkerboard") filled = (i + j) % 2 === 0;
      if (pattern === "left-diagonal") filled = j === i;
      if (pattern === "right-diagonal") filled = j === size - 1 - i;
      if (pattern === "butterfly") filled = j <= i || j >= size - 1 - i;
      if (pattern === "hollow-butterfly") filled = j === i || j === size - 1 - i || i === size - 1;
      if (pattern === "square-cross") filled = i === Math.floor(size / 2) || j === Math.floor(size / 2) || i === 0 || i === size - 1 || j === 0 || j === size - 1;
      if (pattern === "vertical-stripes") filled = j % 2 === 0;
      row += filled ? "* " : "  ";
    }
    output.push(row.trimEnd());
  }
  return output.join("\n");
}

function dijkstraShortestPath(graph, start) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  for (const node of Object.keys(graph)) {
    distances[node] = Infinity;
    previous[node] = null;
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    let closestNode = null;
    let shortestDistance = Infinity;

    for (const node of unvisited) {
      if (distances[node] < shortestDistance) {
        shortestDistance = distances[node];
        closestNode = node;
      }
    }

    if (closestNode === null || distances[closestNode] === Infinity) break;
    unvisited.delete(closestNode);

    for (const [neighbor, weight] of graph[closestNode] ?? []) {
      if (unvisited.has(neighbor)) {
        const candidateDistance = distances[closestNode] + weight;
        if (candidateDistance < distances[neighbor]) {
          distances[neighbor] = candidateDistance;
          previous[neighbor] = closestNode;
        }
      }
    }
  }

  const paths = {};
  for (const node of Object.keys(graph)) {
    if (distances[node] === Infinity) {
      paths[node] = null;
      continue;
    }
    const path = [];
    let current = node;
    while (current !== null) {
      path.unshift(current);
      current = previous[current];
    }
    paths[node] = path;
  }

  return { distances, paths };
}

function louvainCommunityDetection(graph) {
  const nodes = Object.keys(graph);
  const community = {};
  nodes.forEach((node, index) => {
    community[node] = index;
  });

  let totalWeight = 0;
  const degrees = {};
  for (const u of nodes) {
    let d = 0;
    for (const [v, weight] of graph[u] ?? []) {
      d += weight;
      totalWeight += weight;
    }
    degrees[u] = d;
  }
  const m = totalWeight / 2 || 1;

  let improved = true;
  let iterations = 0;
  while (improved && iterations < 20) {
    improved = false;
    iterations += 1;

    for (const node of nodes) {
      const currentComm = community[node];
      const neighborWeights = {};

      for (const [neighbor, weight] of graph[node] ?? []) {
        const c = community[neighbor];
        neighborWeights[c] = (neighborWeights[c] ?? 0) + weight;
      }

      let bestComm = currentComm;
      let bestGain = 0;

      const commTot = {};
      for (const n of nodes) {
        const c = community[n];
        commTot[c] = (commTot[c] ?? 0) + degrees[n];
      }

      for (const c of Object.keys(neighborWeights).map(Number)) {
        if (c === currentComm) continue;
        const k_i_in = neighborWeights[c] ?? 0;
        const k_i = degrees[node];
        const tot = commTot[c] ?? 0;
        const gain = k_i_in - (tot * k_i) / (2 * m);
        if (gain > bestGain) {
          bestGain = gain;
          bestComm = c;
        }
      }

      if (bestComm !== currentComm) {
        community[node] = bestComm;
        improved = true;
      }
    }
  }

  const unique = [...new Set(Object.values(community))];
  const normalized = {};
  for (const node of nodes) {
    normalized[node] = unique.indexOf(community[node]);
  }

  return { communities: normalized, clusterCount: unique.length };
}

function labelPropagation(graph, initialLabels = {}, maxIterations = 20) {
  const nodes = Object.keys(graph);
  const labels = {};

  nodes.forEach((node, index) => {
    labels[node] = initialLabels[node] !== undefined ? initialLabels[node] : index;
  });

  for (let iter = 0; iter < maxIterations; iter += 1) {
    let changed = false;
    for (const node of nodes) {
      if (initialLabels[node] !== undefined) continue;

      const neighbors = graph[node] ?? [];
      if (neighbors.length === 0) continue;

      const counts = {};
      for (const neighbor of neighbors) {
        const lbl = labels[neighbor];
        counts[lbl] = (counts[lbl] ?? 0) + 1;
      }

      let maxCount = -1;
      let dominantLabel = labels[node];
      for (const [lbl, count] of Object.entries(counts)) {
        if (count > maxCount || (count === maxCount && Number(lbl) < Number(dominantLabel))) {
          maxCount = count;
          dominantLabel = isNaN(Number(lbl)) ? lbl : Number(lbl);
        }
      }

      if (labels[node] !== dominantLabel) {
        labels[node] = dominantLabel;
        changed = true;
      }
    }
    if (!changed) break;
  }

  return labels;
}

function binaryTree(values) {
  if (!values || values.length === 0) return null;

  function Node(value) {
    return { value, left: null, right: null };
  }

  const root = Node(values[0]);
  const queue = [root];
  let index = 1;

  while (queue.length > 0 && index < values.length) {
    const current = queue.shift();

    if (index < values.length && values[index] !== null) {
      current.left = Node(values[index]);
      queue.push(current.left);
    }
    index += 1;

    if (index < values.length && values[index] !== null) {
      current.right = Node(values[index]);
      queue.push(current.right);
    }
    index += 1;
  }

  const inorder = [];
  const preorder = [];
  const postorder = [];

  function traverseInorder(node) {
    if (!node) return;
    traverseInorder(node.left);
    inorder.push(node.value);
    traverseInorder(node.right);
  }

  function traversePreorder(node) {
    if (!node) return;
    preorder.push(node.value);
    traversePreorder(node.left);
    traversePreorder(node.right);
  }

  function traversePostorder(node) {
    if (!node) return;
    traversePostorder(node.left);
    traversePostorder(node.right);
    postorder.push(node.value);
  }

  function height(node) {
    if (!node) return 0;
    return 1 + Math.max(height(node.left), height(node.right));
  }

  traverseInorder(root);
  traversePreorder(root);
  traversePostorder(root);

  return {
    root,
    inorder,
    preorder,
    postorder,
    height: height(root),
    size: inorder.length,
  };
}

function binarySearchTree(operations) {
  let root = null;
  const history = [];

  function insert(node, value) {
    if (node === null) return { value, left: null, right: null };
    if (value < node.value) node.left = insert(node.left, value);
    else if (value > node.value) node.right = insert(node.right, value);
    return node;
  }

  function search(node, value) {
    if (node === null) return false;
    if (node.value === value) return true;
    return value < node.value ? search(node.left, value) : search(node.right, value);
  }

  function findMin(node) {
    while (node && node.left !== null) node = node.left;
    return node;
  }

  function remove(node, value) {
    if (node === null) return null;
    if (value < node.value) {
      node.left = remove(node.left, value);
    } else if (value > node.value) {
      node.right = remove(node.right, value);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;
      const minRight = findMin(node.right);
      node.value = minRight.value;
      node.right = remove(node.right, minRight.value);
    }
    return node;
  }

  function inorder(node, result = []) {
    if (!node) return result;
    inorder(node.left, result);
    result.push(node.value);
    inorder(node.right, result);
    return result;
  }

  for (const [op, val] of operations) {
    if (op === "insert") {
      root = insert(root, val);
      history.push({ op: "insert", value: val });
    } else if (op === "search") {
      const found = search(root, val);
      history.push({ op: "search", value: val, found });
    } else if (op === "delete") {
      root = remove(root, val);
      history.push({ op: "delete", value: val });
    }
  }

  return {
    sortedKeys: inorder(root),
    history,
    root,
  };
}

function avlTree(values) {
  function Node(value) {
    return { value, left: null, right: null, height: 1 };
  }

  function height(node) {
    return node ? node.height : 0;
  }

  function getBalance(node) {
    return node ? height(node.left) - height(node.right) : 0;
  }

  function updateHeight(node) {
    node.height = 1 + Math.max(height(node.left), height(node.right));
  }

  function rotateRight(y) {
    const x = y.left;
    const t2 = x.right;
    x.right = y;
    y.left = t2;
    updateHeight(y);
    updateHeight(x);
    return x;
  }

  function rotateLeft(x) {
    const y = x.right;
    const t2 = y.left;
    y.left = x;
    x.right = t2;
    updateHeight(x);
    updateHeight(y);
    return y;
  }

  function insert(node, value) {
    if (!node) return Node(value);
    if (value < node.value) node.left = insert(node.left, value);
    else if (value > node.value) node.right = insert(node.right, value);
    else return node;

    updateHeight(node);
    const balance = getBalance(node);

    if (balance > 1 && value < node.left.value) return rotateRight(node);
    if (balance < -1 && value > node.right.value) return rotateLeft(node);
    if (balance > 1 && value > node.left.value) {
      node.left = rotateLeft(node.left);
      return rotateRight(node);
    }
    if (balance < -1 && value < node.right.value) {
      node.right = rotateRight(node.right);
      return rotateLeft(node);
    }

    return node;
  }

  let root = null;
  for (const value of values) {
    root = insert(root, value);
  }

  function toInorder(node, list = []) {
    if (!node) return list;
    toInorder(node.left, list);
    list.push(node.value);
    toInorder(node.right, list);
    return list;
  }

  return {
    root,
    height: height(root),
    balanceFactor: getBalance(root),
    inorder: toInorder(root),
  };
}

function redBlackTree(values) {
  const RED = "RED";
  const BLACK = "BLACK";

  function Node(value, color = RED) {
    return { value, color, left: null, right: null, parent: null };
  }

  let root = null;

  function rotateLeft(node) {
    const rightChild = node.right;
    node.right = rightChild.left;
    if (rightChild.left) rightChild.left.parent = node;
    rightChild.parent = node.parent;
    if (!node.parent) root = rightChild;
    else if (node === node.parent.left) node.parent.left = rightChild;
    else node.parent.right = rightChild;
    rightChild.left = node;
    node.parent = rightChild;
  }

  function rotateRight(node) {
    const leftChild = node.left;
    node.left = leftChild.right;
    if (leftChild.right) leftChild.right.parent = node;
    leftChild.parent = node.parent;
    if (!node.parent) root = leftChild;
    else if (node === node.parent.right) node.parent.right = leftChild;
    else node.parent.left = leftChild;
    leftChild.right = node;
    node.parent = leftChild;
  }

  function fixViolation(node) {
    let current = node;
    while (current !== root && current.parent && current.parent.color === RED) {
      if (current.parent === current.parent.parent?.left) {
        const uncle = current.parent.parent.right;
        if (uncle && uncle.color === RED) {
          current.parent.color = BLACK;
          uncle.color = BLACK;
          current.parent.parent.color = RED;
          current = current.parent.parent;
        } else {
          if (current === current.parent.right) {
            current = current.parent;
            rotateLeft(current);
          }
          current.parent.color = BLACK;
          current.parent.parent.color = RED;
          rotateRight(current.parent.parent);
        }
      } else {
        const uncle = current.parent.parent?.left;
        if (uncle && uncle.color === RED) {
          current.parent.color = BLACK;
          uncle.color = BLACK;
          current.parent.parent.color = RED;
          current = current.parent.parent;
        } else {
          if (current === current.parent.left) {
            current = current.parent;
            rotateRight(current);
          }
          current.parent.color = BLACK;
          current.parent.parent.color = RED;
          rotateLeft(current.parent.parent);
        }
      }
    }
    root.color = BLACK;
  }

  function insert(value) {
    const newNode = Node(value, RED);
    if (!root) {
      newNode.color = BLACK;
      root = newNode;
      return;
    }

    let parent = null;
    let current = root;
    while (current) {
      parent = current;
      if (value < current.value) current = current.left;
      else if (value > current.value) current = current.right;
      else return;
    }

    newNode.parent = parent;
    if (value < parent.value) parent.left = newNode;
    else parent.right = newNode;

    fixViolation(newNode);
  }

  for (const value of values) {
    insert(value);
  }

  function cleanTree(node) {
    if (!node) return null;
    return {
      value: node.value,
      color: node.color,
      left: cleanTree(node.left),
      right: cleanTree(node.right),
    };
  }

  function getBlackHeight(node) {
    if (!node) return 1;
    const leftBh = getBlackHeight(node.left);
    return leftBh + (node.color === BLACK ? 1 : 0);
  }

  return {
    root: cleanTree(root),
    blackHeight: getBlackHeight(root),
  };
}

function splayTree(operations) {
  function Node(value) {
    return { value, left: null, right: null };
  }

  function rotateRight(root) {
    const left = root.left;
    root.left = left.right;
    left.right = root;
    return left;
  }

  function rotateLeft(root) {
    const right = root.right;
    root.right = right.left;
    right.left = root;
    return right;
  }

  function splay(root, key) {
    if (!root || root.value === key) return root;

    if (key < root.value) {
      if (!root.left) return root;

      if (key < root.left.value) {
        root.left.left = splay(root.left.left, key);
        root = rotateRight(root);
      } else if (key > root.left.value) {
        root.left.right = splay(root.left.right, key);
        if (root.left.right) root.left = rotateLeft(root.left);
      }

      return root.left ? rotateRight(root) : root;
    } else {
      if (!root.right) return root;

      if (key < root.right.value) {
        root.right.left = splay(root.right.left, key);
        if (root.right.left) root.right = rotateRight(root.right);
      } else if (key > root.right.value) {
        root.right.right = splay(root.right.right, key);
        root = rotateLeft(root);
      }

      return root.right ? rotateLeft(root) : root;
    }
  }

  function insert(root, key) {
    if (!root) return Node(key);
    root = splay(root, key);
    if (root.value === key) return root;

    const newNode = Node(key);
    if (key < root.value) {
      newNode.right = root;
      newNode.left = root.left;
      root.left = null;
    } else {
      newNode.left = root;
      newNode.right = root.right;
      root.right = null;
    }
    return newNode;
  }

  let root = null;
  const history = [];

  for (const [op, key] of operations) {
    if (op === "insert") {
      root = insert(root, key);
      history.push({ op: "insert", key, rootValue: root.value });
    } else if (op === "find" || op === "access") {
      root = splay(root, key);
      history.push({ op: "access", key, found: root?.value === key, rootValue: root?.value });
    }
  }

  return {
    rootValue: root ? root.value : null,
    history,
    root,
  };
}

function bTree(order, keys) {
  const t = Math.max(2, Math.floor(order / 2));

  function BTreeNode(leaf = true) {
    return { leaf, keys: [], children: [] };
  }

  let root = BTreeNode(true);

  function splitChild(parent, i, fullChild) {
    const newSibling = BTreeNode(fullChild.leaf);
    const midKey = fullChild.keys[t - 1];

    newSibling.keys = fullChild.keys.slice(t);
    fullChild.keys = fullChild.keys.slice(0, t - 1);

    if (!fullChild.leaf) {
      newSibling.children = fullChild.children.slice(t);
      fullChild.children = fullChild.children.slice(0, t);
    }

    parent.children.splice(i + 1, 0, newSibling);
    parent.keys.splice(i, 0, midKey);
  }

  function insertNonFull(node, key) {
    let i = node.keys.length - 1;

    if (node.leaf) {
      while (i >= 0 && key < node.keys[i]) i -= 1;
      node.keys.splice(i + 1, 0, key);
    } else {
      while (i >= 0 && key < node.keys[i]) i -= 1;
      i += 1;
      if (node.children[i].keys.length === 2 * t - 1) {
        splitChild(node, i, node.children[i]);
        if (key > node.keys[i]) i += 1;
      }
      insertNonFull(node.children[i], key);
    }
  }

  function insert(key) {
    if (root.keys.length === 2 * t - 1) {
      const newRoot = BTreeNode(false);
      newRoot.children.push(root);
      splitChild(newRoot, 0, root);
      root = newRoot;
    }
    insertNonFull(root, key);
  }

  for (const key of keys) {
    insert(key);
  }

  function traverseKeys(node, list = []) {
    if (!node) return list;
    for (let i = 0; i < node.keys.length; i += 1) {
      if (!node.leaf && node.children[i]) traverseKeys(node.children[i], list);
      list.push(node.keys[i]);
    }
    if (!node.leaf && node.children[node.keys.length]) {
      traverseKeys(node.children[node.keys.length], list);
    }
    return list;
  }

  return {
    root,
    order,
    degree: t,
    allKeys: traverseKeys(root),
  };
}

function bPlusTree(order, entries) {
  const maxKeys = order - 1;

  function LeafNode() {
    return { isLeaf: true, keys: [], values: [], next: null };
  }

  function InternalNode() {
    return { isLeaf: false, keys: [], children: [] };
  }

  let root = LeafNode();

  function insert(key, value) {
    let leaf = root;
    while (!leaf.isLeaf) {
      let i = 0;
      while (i < leaf.keys.length && key >= leaf.keys[i]) i += 1;
      leaf = leaf.children[i];
    }

    let i = 0;
    while (i < leaf.keys.length && leaf.keys[i] < key) i += 1;
    if (i < leaf.keys.length && leaf.keys[i] === key) {
      leaf.values[i] = value;
      return;
    }

    leaf.keys.splice(i, 0, key);
    leaf.values.splice(i, 0, value);

    if (leaf.keys.length > maxKeys) {
      const mid = Math.floor(leaf.keys.length / 2);
      const newLeaf = LeafNode();
      newLeaf.keys = leaf.keys.slice(mid);
      newLeaf.values = leaf.values.slice(mid);
      leaf.keys = leaf.keys.slice(0, mid);
      leaf.values = leaf.values.slice(0, mid);

      newLeaf.next = leaf.next;
      leaf.next = newLeaf;

      if (leaf === root) {
        const newRoot = InternalNode();
        newRoot.keys = [newLeaf.keys[0]];
        newRoot.children = [leaf, newLeaf];
        root = newRoot;
      }
    }
  }

  for (const entry of entries) {
    insert(entry.key, entry.val ?? entry.value ?? entry.key);
  }

  function rangeSearch(minKey, maxKey) {
    let leaf = root;
    while (!leaf.isLeaf) {
      let i = 0;
      while (i < leaf.keys.length && minKey >= leaf.keys[i]) i += 1;
      leaf = leaf.children[i];
    }

    const results = [];
    while (leaf) {
      for (let i = 0; i < leaf.keys.length; i += 1) {
        if (leaf.keys[i] >= minKey && leaf.keys[i] <= maxKey) {
          results.push({ key: leaf.keys[i], value: leaf.values[i] });
        }
        if (leaf.keys[i] > maxKey) return results;
      }
      leaf = leaf.next;
    }
    return results;
  }

  return {
    root,
    rangeSample: rangeSearch(entries[0]?.key ?? 0, entries.at(-1)?.key ?? 100),
  };
}

function trie(words, queries = []) {
  function TrieNode() {
    return { children: {}, isEndOfWord: false };
  }

  const root = TrieNode();

  function insert(word) {
    let current = root;
    for (const char of word) {
      if (!current.children[char]) current.children[char] = TrieNode();
      current = current.children[char];
    }
    current.isEndOfWord = true;
  }

  function search(word) {
    let current = root;
    for (const char of word) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return current.isEndOfWord;
  }

  function startsWith(prefix) {
    let current = root;
    for (const char of prefix) {
      if (!current.children[char]) return false;
      current = current.children[char];
    }
    return true;
  }

  function autocomplete(prefix) {
    let current = root;
    for (const char of prefix) {
      if (!current.children[char]) return [];
      current = current.children[char];
    }
    const results = [];
    function collect(node, path) {
      if (node.isEndOfWord) results.push(path);
      for (const [char, child] of Object.entries(node.children)) {
        collect(child, path + char);
      }
    }
    collect(current, prefix);
    return results;
  }

  for (const word of words) {
    insert(word);
  }

  const queryResults = queries.map((q) => ({
    query: q,
    exactMatch: search(q),
    hasPrefix: startsWith(q),
    completions: autocomplete(q),
  }));

  return {
    wordsCount: words.length,
    queryResults,
  };
}

function radixTree(words, searchWords = []) {
  function RadixNode(isWord = false) {
    return { children: {}, isWord };
  }

  const root = RadixNode();

  function insert(word) {
    let current = root;
    let remaining = word;

    while (remaining.length > 0) {
      let matchedEdge = null;
      let commonPrefixLen = 0;

      for (const edge of Object.keys(current.children)) {
        let i = 0;
        while (i < edge.length && i < remaining.length && edge[i] === remaining[i]) i += 1;
        if (i > 0) {
          matchedEdge = edge;
          commonPrefixLen = i;
          break;
        }
      }

      if (!matchedEdge) {
        current.children[remaining] = RadixNode(true);
        return;
      }

      if (commonPrefixLen < matchedEdge.length) {
        const splitChild = current.children[matchedEdge];
        delete current.children[matchedEdge];

        const commonPrefix = matchedEdge.slice(0, commonPrefixLen);
        const remainingEdge = matchedEdge.slice(commonPrefixLen);

        const intermediateNode = RadixNode(false);
        intermediateNode.children[remainingEdge] = splitChild;
        current.children[commonPrefix] = intermediateNode;

        if (commonPrefixLen === remaining.length) {
          intermediateNode.isWord = true;
        } else {
          intermediateNode.children[remaining.slice(commonPrefixLen)] = RadixNode(true);
        }
        return;
      }

      current = current.children[matchedEdge];
      remaining = remaining.slice(matchedEdge.length);
    }
    current.isWord = true;
  }

  function search(word) {
    let current = root;
    let remaining = word;

    while (remaining.length > 0) {
      let matched = false;
      for (const edge of Object.keys(current.children)) {
        if (remaining.startsWith(edge)) {
          remaining = remaining.slice(edge.length);
          current = current.children[edge];
          matched = true;
          break;
        }
      }
      if (!matched) return false;
    }
    return current.isWord;
  }

  for (const word of words) insert(word);

  const lookup = {};
  for (const query of searchWords) {
    lookup[query] = search(query);
  }

  return { root, lookup };
}

function suffixTree(text, pattern = "") {
  const terminalText = text.endsWith("$") ? text : `${text}$`;
  const root = { children: {}, indexes: [] };

  for (let i = 0; i < terminalText.length; i += 1) {
    let current = root;
    current.indexes.push(i);
    for (let j = i; j < terminalText.length; j += 1) {
      const char = terminalText[j];
      if (!current.children[char]) {
        current.children[char] = { children: {}, indexes: [] };
      }
      current = current.children[char];
      current.indexes.push(i);
    }
  }

  function searchSubstring(pat) {
    let current = root;
    for (const char of pat) {
      if (!current.children[char]) return [];
      current = current.children[char];
    }
    return current.indexes;
  }

  let longestRepeated = "";
  function findLongestRepeated(node, currentStr) {
    if (node.indexes.length >= 2 && currentStr.length > longestRepeated.length) {
      longestRepeated = currentStr;
    }
    for (const [char, child] of Object.entries(node.children)) {
      if (char !== "$") {
        findLongestRepeated(child, currentStr + char);
      }
    }
  }
  findLongestRepeated(root, "");

  return {
    text,
    patternMatch: pattern ? searchSubstring(pattern) : [],
    longestRepeatedSubstring: longestRepeated,
  };
}

function segmentTree(values, operations = []) {
  const n = values.length;
  const tree = Array(4 * n).fill(0);

  function build(node, start, end) {
    if (start === end) {
      tree[node] = values[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    build(2 * node, start, mid);
    build(2 * node + 1, mid + 1, end);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
  }

  function queryRange(node, start, end, l, r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return tree[node];
    const mid = Math.floor((start + end) / 2);
    return queryRange(2 * node, start, mid, l, r) + queryRange(2 * node + 1, mid + 1, end, l, r);
  }

  function updatePoint(node, start, end, idx, val) {
    if (start === end) {
      tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) updatePoint(2 * node, start, mid, idx, val);
    else updatePoint(2 * node + 1, mid + 1, end, idx, val);
    tree[node] = tree[2 * node] + tree[2 * node + 1];
  }

  if (n > 0) build(1, 0, n - 1);

  const results = [];
  for (const op of operations) {
    if (op.type === "query") {
      results.push({ op: "query", range: [op.left, op.right], sum: queryRange(1, 0, n - 1, op.left, op.right) });
    } else if (op.type === "update") {
      updatePoint(1, 0, n - 1, op.index, op.value);
      results.push({ op: "update", index: op.index, value: op.value });
    }
  }

  return { initialValues: values, totalSum: tree[1], results };
}

function fenwickTree(values, operations = []) {
  const n = values.length;
  const bit = Array(n + 1).fill(0);

  function update(index, delta) {
    for (let i = index + 1; i <= n; i += i & -i) {
      bit[i] += delta;
    }
  }

  function queryPrefix(index) {
    let sum = 0;
    for (let i = index + 1; i > 0; i -= i & -i) {
      sum += bit[i];
    }
    return sum;
  }

  function queryRange(left, right) {
    return queryPrefix(right) - (left > 0 ? queryPrefix(left - 1) : 0);
  }

  values.forEach((val, idx) => update(idx, val));

  const results = [];
  for (const op of operations) {
    if (op.type === "prefix") {
      results.push({ op: "prefix", index: op.index, sum: queryPrefix(op.index) });
    } else if (op.type === "range") {
      results.push({ op: "range", left: op.left, right: op.right, sum: queryRange(op.left, op.right) });
    } else if (op.type === "update") {
      update(op.index, op.delta);
      results.push({ op: "update", index: op.index, delta: op.delta });
    }
  }

  return {
    initialValues: values,
    results,
  };
}

function quadtree(points, boundary = { minX: 0, minY: 0, maxX: 100, maxY: 100 }, queryRange = { minX: 0, minY: 0, maxX: 50, maxY: 50 }) {
  const CAPACITY = 4;

  function createNode(box) {
    return { box, points: [], divided: false, nw: null, ne: null, sw: null, se: null };
  }

  function inBox(box, p) {
    return p.x >= box.minX && p.x <= box.maxX && p.y >= box.minY && p.y <= box.maxY;
  }

  function intersects(a, b) {
    return !(a.maxX < b.minX || a.minX > b.maxX || a.maxY < b.minY || a.minY > b.maxY);
  }

  function subdivide(node) {
    const { minX, minY, maxX, maxY } = node.box;
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;

    node.nw = createNode({ minX, minY: midY, maxX: midX, maxY });
    node.ne = createNode({ minX: midX, minY: midY, maxX, maxY });
    node.sw = createNode({ minX, minY, maxX: midX, maxY: midY });
    node.se = createNode({ minX: midX, minY: maxX, maxY: midY });
    node.divided = true;
  }

  function insert(node, p) {
    if (!inBox(node.box, p)) return false;

    if (node.points.length < CAPACITY && !node.divided) {
      node.points.push(p);
      return true;
    }

    if (!node.divided) subdivide(node);

    return (
      insert(node.nw, p) ||
      insert(node.ne, p) ||
      insert(node.sw, p) ||
      insert(node.se, p)
    );
  }

  function query(node, range, found = []) {
    if (!intersects(node.box, range)) return found;

    for (const p of node.points) {
      if (inBox(range, p)) found.push(p);
    }

    if (node.divided) {
      query(node.nw, range, found);
      query(node.ne, range, found);
      query(node.sw, range, found);
      query(node.se, range, found);
    }

    return found;
  }

  const root = createNode(boundary);
  for (const p of points) insert(root, p);

  return {
    totalPoints: points.length,
    queryRange,
    pointsInRange: query(root, queryRange),
    root,
  };
}

function octree(points, boundary = { minX: 0, minY: 0, minZ: 0, maxX: 100, maxY: 100, maxZ: 100 }, queryBox = { minX: 0, minY: 0, minZ: 0, maxX: 50, maxY: 50, maxZ: 50 }) {
  const CAPACITY = 4;

  function createNode(box) {
    return { box, points: [], divided: false, children: [] };
  }

  function inBox(box, p) {
    return (
      p.x >= box.minX && p.x <= box.maxX &&
      p.y >= box.minY && p.y <= box.maxY &&
      p.z >= box.minZ && p.z <= box.maxZ
    );
  }

  function intersects(a, b) {
    return !(
      a.maxX < b.minX || a.minX > b.maxX ||
      a.maxY < b.minY || a.minY > b.maxY ||
      a.maxZ < b.minZ || a.minZ > b.maxZ
    );
  }

  function subdivide(node) {
    const { minX, minY, minZ, maxX, maxY, maxZ } = node.box;
    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const midZ = (minZ + maxZ) / 2;

    const xs = [[minX, midX], [midX, maxX]];
    const ys = [[minY, midY], [midY, maxY]];
    const zs = [[minZ, midZ], [midZ, maxZ]];

    node.children = [];
    for (const [x0, x1] of xs) {
      for (const [y0, y1] of ys) {
        for (const [z0, z1] of zs) {
          node.children.push(createNode({ minX: x0, minY: y0, minZ: z0, maxX: x1, maxY: y1, maxZ: z1 }));
        }
      }
    }
    node.divided = true;
  }

  function insert(node, p) {
    if (!inBox(node.box, p)) return false;

    if (node.points.length < CAPACITY && !node.divided) {
      node.points.push(p);
      return true;
    }

    if (!node.divided) subdivide(node);

    for (const child of node.children) {
      if (insert(child, p)) return true;
    }
    return false;
  }

  function query(node, box, found = []) {
    if (!intersects(node.box, box)) return found;

    for (const p of node.points) {
      if (inBox(box, p)) found.push(p);
    }

    if (node.divided) {
      for (const child of node.children) {
        query(child, box, found);
      }
    }
    return found;
  }

  const root = createNode(boundary);
  for (const p of points) insert(root, p);

  return {
    totalPoints: points.length,
    queryBox,
    pointsInRange: query(root, queryBox),
    root,
  };
}

function kdTree(points, targetPoint = null) {
  const k = points[0]?.length ?? 2;

  function build(pts, depth = 0) {
    if (pts.length === 0) return null;
    const axis = depth % k;
    pts.sort((a, b) => a[axis] - b[axis]);
    const mid = Math.floor(pts.length / 2);

    return {
      point: pts[mid],
      axis,
      left: build(pts.slice(0, mid), depth + 1),
      right: build(pts.slice(mid + 1), depth + 1),
    };
  }

  function distanceSq(a, b) {
    let sum = 0;
    for (let i = 0; i < a.length; i += 1) {
      sum += (a[i] - b[i]) ** 2;
    }
    return sum;
  }

  let bestNode = null;
  let bestDistSq = Infinity;

  function nearest(node, target, depth = 0) {
    if (!node) return;

    const dSq = distanceSq(node.point, target);
    if (dSq < bestDistSq) {
      bestDistSq = dSq;
      bestNode = node.point;
    }

    const axis = depth % k;
    const diff = target[axis] - node.point[axis];
    const first = diff < 0 ? node.left : node.right;
    const second = diff < 0 ? node.right : node.left;

    nearest(first, target, depth + 1);
    if (diff * diff < bestDistSq) {
      nearest(second, target, depth + 1);
    }
  }

  const root = build([...points]);
  if (targetPoint) nearest(root, targetPoint);

  return {
    dimensions: k,
    pointCount: points.length,
    target: targetPoint,
    nearestNeighbor: bestNode,
    distance: targetPoint ? Math.sqrt(bestDistSq) : null,
    root,
  };
}

function tournamentTree(competitors) {
  const rounds = [];
  let currentRound = competitors.map((c) => (typeof c === "object" ? { ...c } : { name: String(c), score: Number(c) }));
  rounds.push([...currentRound]);

  while (currentRound.length > 1) {
    const nextRound = [];
    for (let i = 0; i < currentRound.length; i += 2) {
      const first = currentRound[i];
      const second = currentRound[i + 1];
      if (!second) {
        nextRound.push(first);
      } else {
        const winner = first.score >= second.score ? first : second;
        nextRound.push({ ...winner, match: `${first.name} vs ${second.name}` });
      }
    }
    currentRound = nextRound;
    rounds.push([...currentRound]);
  }

  return {
    winner: currentRound[0],
    totalRounds: rounds.length - 1,
    bracketRounds: rounds,
  };
}

function decisionTree(trainingData, sample) {
  function predict(node, item) {
    if (node.isLeaf) return node.label;
    const value = item[node.feature];
    if (node.type === "categorical") {
      const child = node.branches[value] ?? node.branches[Object.keys(node.branches)[0]];
      return predict(child, item);
    } else {
      return value <= node.threshold ? predict(node.left, item) : predict(node.right, item);
    }
  }

  const features = Object.keys(trainingData[0]).filter((k) => k !== "label" && k !== "outcome");
  const targetKey = trainingData[0].label !== undefined ? "label" : "outcome";

  const root = {
    feature: features[0] ?? "feature",
    type: typeof trainingData[0][features[0]] === "number" ? "numeric" : "categorical",
    threshold: typeof trainingData[0][features[0]] === "number" ? 50 : undefined,
    branches: {},
    isLeaf: false,
  };

  if (root.type === "categorical") {
    const groups = {};
    for (const row of trainingData) {
      const val = row[root.feature];
      groups[val] = groups[val] ?? [];
      groups[val].push(row[targetKey]);
    }
    for (const [val, labels] of Object.entries(groups)) {
      const mode = labels.sort((a, b) => labels.filter((v) => v === a).length - labels.filter((v) => v === b).length).pop();
      root.branches[val] = { isLeaf: true, label: mode };
    }
  } else {
    root.left = { isLeaf: true, label: trainingData[0][targetKey] };
    root.right = { isLeaf: true, label: trainingData.at(-1)[targetKey] };
  }

  const prediction = sample ? predict(root, sample) : null;

  return {
    tree: root,
    sample,
    prediction,
  };
}

function treap(operations) {
  function Node(key, priority = Math.floor(Math.random() * 1000)) {
    return { key, priority, left: null, right: null };
  }

  function rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    return x;
  }

  function rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
  }

  function insert(root, key, priority) {
    if (!root) return Node(key, priority);

    if (key < root.key) {
      root.left = insert(root.left, key, priority);
      if (root.left.priority > root.priority) root = rotateRight(root);
    } else if (key > root.key) {
      root.right = insert(root.right, key, priority);
      if (root.right.priority > root.priority) root = rotateLeft(root);
    }
    return root;
  }

  function search(root, key) {
    if (!root) return false;
    if (root.key === key) return true;
    return key < root.key ? search(root.left, key) : search(root.right, key);
  }

  function inorder(root, result = []) {
    if (!root) return result;
    inorder(root.left, result);
    result.push({ key: root.key, priority: root.priority });
    inorder(root.right, result);
    return result;
  }

  let root = null;
  const history = [];

  for (const [op, key, priority] of operations) {
    if (op === "insert") {
      root = insert(root, key, priority ?? Math.floor(Math.random() * 1000));
      history.push({ op: "insert", key });
    } else if (op === "search") {
      const found = search(root, key);
      history.push({ op: "search", key, found });
    }
  }

  return {
    sortedKeys: inorder(root),
    history,
    root,
  };
}

function vantagePointTree(points, queryPoint = null, k = 1) {
  function dist(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  function build(pts) {
    if (pts.length === 0) return null;
    const vp = pts[0];
    if (pts.length === 1) return { vp, threshold: 0, left: null, right: null };

    const distances = pts.slice(1).map((p) => ({ point: p, d: dist(vp, p) }));
    distances.sort((a, b) => a.d - b.d);
    const medianIdx = Math.floor(distances.length / 2);
    const threshold = distances[medianIdx].d;

    const inside = distances.slice(0, medianIdx).map((item) => item.point);
    const outside = distances.slice(medianIdx).map((item) => item.point);

    return {
      vp,
      threshold,
      left: build(inside),
      right: build(outside),
    };
  }

  const root = build([...points]);
  const neighbors = [];

  if (queryPoint) {
    const allDistances = points.map((p) => ({ point: p, distance: dist(p, queryPoint) }));
    allDistances.sort((a, b) => a.distance - b.distance);
    neighbors.push(...allDistances.slice(0, k));
  }

  return {
    pointCount: points.length,
    queryPoint,
    nearestNeighbors: neighbors,
    root,
  };
}

function bkTree(words, query = null, maxDistance = 1) {
  function levenshtein(a, b) {
    const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        dp[i][j] = a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
    return dp[a.length][b.length];
  }

  function Node(word) {
    return { word, children: {} };
  }

  const root = Node(words[0]);

  function insert(node, word) {
    const d = levenshtein(node.word, word);
    if (d === 0) return;
    if (!node.children[d]) {
      node.children[d] = Node(word);
    } else {
      insert(node.children[d], word);
    }
  }

  for (let i = 1; i < words.length; i += 1) insert(root, words[i]);

  function search(node, target, maxDist, results = []) {
    const d = levenshtein(node.word, target);
    if (d <= maxDist) results.push({ word: node.word, distance: d });

    const minD = Math.max(1, d - maxDist);
    const maxD = d + maxDist;

    for (let i = minD; i <= maxD; i += 1) {
      if (node.children[i]) {
        search(node.children[i], target, maxDist, results);
      }
    }
    return results;
  }

  const matches = query ? search(root, query, maxDistance) : [];

  return {
    dictionarySize: words.length,
    query,
    maxDistance,
    matches,
    root,
  };
}

function binaryHeapPriorityQueue(operations) {
  const heap = [];
  const extracted = [];

  function siftUp(index) {
    let current = index;
    while (current > 0) {
      const parent = Math.floor((current - 1) / 2);
      if (heap[current] < heap[parent]) {
        [heap[current], heap[parent]] = [heap[parent], heap[current]];
        current = parent;
      } else break;
    }
  }

  function siftDown(index) {
    let current = index;
    while (2 * current + 1 < heap.length) {
      let smallest = current;
      const left = 2 * current + 1;
      const right = 2 * current + 2;

      if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
      if (right < heap.length && heap[right] < heap[smallest]) smallest = right;

      if (smallest !== current) {
        [heap[current], heap[smallest]] = [heap[smallest], heap[current]];
        current = smallest;
      } else break;
    }
  }

  for (const [op, val] of operations) {
    if (op === "insert") {
      heap.push(val);
      siftUp(heap.length - 1);
    } else if (op === "extractMin") {
      if (heap.length === 0) continue;
      const min = heap[0];
      const last = heap.pop();
      if (heap.length > 0) {
        heap[0] = last;
        siftDown(0);
      }
      extracted.push(min);
    }
  }

  return {
    heap: [...heap],
    extracted,
    minimum: heap[0] ?? null,
  };
}

function binomialHeapStructure(values) {
  function Node(val) {
    return { val, degree: 0, parent: null, child: null, sibling: null };
  }

  function linkTrees(minNode, otherNode) {
    otherNode.parent = minNode;
    otherNode.sibling = minNode.child;
    minNode.child = otherNode;
    minNode.degree += 1;
  }

  function mergeRoots(h1, h2) {
    if (!h1) return h2;
    if (!h2) return h1;
    let head = null;
    let tail = null;
    let p1 = h1;
    let p2 = h2;

    function append(node) {
      if (!head) head = node;
      else tail.sibling = node;
      tail = node;
    }

    while (p1 && p2) {
      if (p1.degree <= p2.degree) {
        const next = p1.sibling;
        append(p1);
        p1 = next;
      } else {
        const next = p2.sibling;
        append(p2);
        p2 = next;
      }
    }
    if (p1) append(p1);
    if (p2) append(p2);
    return head;
  }

  function union(h1, h2) {
    let newHead = mergeRoots(h1, h2);
    if (!newHead) return null;

    let prev = null;
    let curr = newHead;
    let next = curr.sibling;

    while (next) {
      if (curr.degree !== next.degree || (next.sibling && next.sibling.degree === curr.degree)) {
        prev = curr;
        curr = next;
      } else if (curr.val <= next.val) {
        curr.sibling = next.sibling;
        linkTrees(curr, next);
      } else {
        if (!prev) newHead = next;
        else prev.sibling = next;
        linkTrees(next, curr);
        curr = next;
      }
      next = curr.sibling;
    }
    return newHead;
  }

  let head = null;
  for (const v of values) {
    const single = Node(v);
    head = union(head, single);
  }

  const treeDegrees = [];
  let curr = head;
  while (curr) {
    treeDegrees.push({ rootVal: curr.val, degree: curr.degree });
    curr = curr.sibling;
  }

  return {
    valuesCount: values.length,
    binomialTrees: treeDegrees,
    minimum: values.length > 0 ? Math.min(...values) : null,
  };
}

function fibonacciHeapStructure(operations) {
  function Node(key) {
    return { key, degree: 0, parent: null, child: null, left: null, right: null, mark: false };
  }

  let minNode = null;
  let count = 0;
  const roots = [];

  for (const [op, val] of operations) {
    if (op === "insert") {
      const node = Node(val);
      node.left = node;
      node.right = node;
      if (!minNode || node.key < minNode.key) minNode = node;
      roots.push(node.key);
      count += 1;
    }
  }

  return {
    nodeCount: count,
    minKey: minNode ? minNode.key : null,
    rootKeys: roots.sort((a, b) => a - b),
  };
}

function leftistHeapStructure(firstValues, secondValues) {
  function Node(val) {
    return { val, npl: 1, left: null, right: null };
  }

  function merge(h1, h2) {
    if (!h1) return h2;
    if (!h2) return h1;

    if (h1.val > h2.val) [h1, h2] = [h2, h1];

    h1.right = merge(h1.right, h2);

    if ((h1.left ? h1.left.npl : 0) < (h1.right ? h1.right.npl : 0)) {
      [h1.left, h1.right] = [h1.right, h1.left];
    }

    h1.npl = 1 + (h1.right ? h1.right.npl : 0);
    return h1;
  }

  let h1 = null;
  for (const v of firstValues) h1 = merge(h1, Node(v));
  let h2 = null;
  for (const v of secondValues) h2 = merge(h2, Node(v));

  const merged = merge(h1, h2);

  return {
    minimum: merged ? merged.val : null,
    npl: merged ? merged.npl : 0,
    mergedRoot: merged,
  };
}

function skewHeapStructure(firstValues, secondValues) {
  function Node(val) {
    return { val, left: null, right: null };
  }

  function merge(h1, h2) {
    if (!h1) return h2;
    if (!h2) return h1;

    if (h1.val > h2.val) [h1, h2] = [h2, h1];

    const temp = merge(h1.right, h2);
    h1.right = h1.left;
    h1.left = temp;
    return h1;
  }

  let h1 = null;
  for (const v of firstValues) h1 = merge(h1, Node(v));
  let h2 = null;
  for (const v of secondValues) h2 = merge(h2, Node(v));

  const merged = merge(h1, h2);

  return {
    minimum: merged ? merged.val : null,
    mergedRoot: merged,
  };
}

function dAryHeapStructure(d, values) {
  const heap = [...values];

  function siftDown(i) {
    let current = i;
    while (true) {
      let smallest = current;
      for (let k = 1; k <= d; k += 1) {
        const child = d * current + k;
        if (child < heap.length && heap[child] < heap[smallest]) {
          smallest = child;
        }
      }
      if (smallest !== current) {
        [heap[current], heap[smallest]] = [heap[smallest], heap[current]];
        current = smallest;
      } else break;
    }
  }

  for (let i = Math.floor((heap.length - 2) / d); i >= 0; i -= 1) {
    siftDown(i);
  }

  return {
    d,
    heap,
    minimum: heap[0],
  };
}

function weakHeapStructure(values) {
  const heap = [...values];
  const reverseBits = Array(heap.length).fill(0);

  function getParent(j) {
    while ((j & 1) === reverseBits[j >> 1]) j >>= 1;
    return j >> 1;
  }

  for (let i = heap.length - 1; i > 0; i -= 1) {
    const p = getParent(i);
    if (heap[i] < heap[p]) {
      [heap[i], heap[p]] = [heap[p], heap[i]];
      reverseBits[i] ^= 1;
    }
  }

  return {
    heap,
    reverseBits,
    minimum: heap[0],
  };
}

function beapStructure(values, target = null) {
  const rows = [];
  let index = 0;
  let rowLen = 1;

  while (index < values.length) {
    rows.push(values.slice(index, index + rowLen));
    index += rowLen;
    rowLen += 1;
  }

  let found = false;
  let pos = null;

  if (target !== null) {
    for (let r = 0; r < rows.length; r += 1) {
      for (let c = 0; c < rows[r].length; c += 1) {
        if (rows[r][c] === target) {
          found = true;
          pos = { row: r, col: c };
          break;
        }
      }
      if (found) break;
    }
  }

  return {
    rowCount: rows.length,
    triangularRows: rows,
    searchTarget: target,
    found,
    position: pos,
  };
}

function pairingHeapMeldable(operations) {
  function Node(val) {
    return { val, child: null, sibling: null };
  }

  function meld(h1, h2) {
    if (!h1) return h2;
    if (!h2) return h1;
    if (h1.val < h2.val) {
      h2.sibling = h1.child;
      h1.child = h2;
      return h1;
    } else {
      h1.sibling = h2.child;
      h2.child = h1;
      return h2;
    }
  }

  function mergePairs(first) {
    if (!first || !first.sibling) return first;
    const second = first.sibling;
    const rest = second.sibling;
    first.sibling = null;
    second.sibling = null;
    return meld(meld(first, second), mergePairs(rest));
  }

  function deleteMin(root) {
    if (!root) return null;
    return mergePairs(root.child);
  }

  let root = null;
  const extracted = [];

  for (const [op, val] of operations) {
    if (op === "insert") {
      root = meld(root, Node(val));
    } else if (op === "extractMin") {
      if (root) {
        extracted.push(root.val);
        root = deleteMin(root);
      }
    }
  }

  return {
    minimum: root ? root.val : null,
    extracted,
    root,
  };
}

function treapMinMaxStructure(operations) {
  function Node(key, priority = Math.floor(Math.random() * 10000)) {
    return { key, priority, left: null, right: null };
  }

  function rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    return x;
  }

  function rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
  }

  function insert(root, key, priority) {
    if (!root) return Node(key, priority);
    if (key < root.key) {
      root.left = insert(root.left, key, priority);
      if (root.left.priority > root.priority) root = rotateRight(root);
    } else if (key > root.key) {
      root.right = insert(root.right, key, priority);
      if (root.right.priority > root.priority) root = rotateLeft(root);
    }
    return root;
  }

  function inorder(root, list = []) {
    if (!root) return list;
    inorder(root.left, list);
    list.push(root.key);
    inorder(root.right, list);
    return list;
  }

  let root = null;
  for (const [op, val, priority] of operations) {
    if (op === "insert") {
      root = insert(root, val, priority ?? Math.floor(Math.random() * 10000));
    }
  }

  const keys = inorder(root);

  return {
    min: keys.length > 0 ? keys[0] : null,
    max: keys.length > 0 ? keys.at(-1) : null,
    sortedKeys: keys,
    root,
  };
}

function inOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    if (node.left) traverse(node.left);
    result.push(node.value ?? node.val ?? node);
    if (node.right) traverse(node.right);
  }
  traverse(root);
  return result;
}

function preOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    result.push(node.value ?? node.val ?? node);
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
  }
  traverse(root);
  return result;
}

function postOrderTraversal(root) {
  const result = [];
  function traverse(node) {
    if (!node) return;
    if (node.left) traverse(node.left);
    if (node.right) traverse(node.right);
    result.push(node.value ?? node.val ?? node);
  }
  traverse(root);
  return result;
}

function levelOrderTraversal(root) {
  if (!root) return { levels: [], flat: [] };
  const levels = [];
  const flat = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i += 1) {
      const node = queue.shift();
      const val = node.value ?? node.val ?? node;
      currentLevel.push(val);
      flat.push(val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    levels.push(currentLevel);
  }

  return { levels, flat };
}

function morrisInOrderTraversal(root) {
  const result = [];
  let current = root;

  while (current) {
    if (!current.left) {
      result.push(current.value ?? current.val ?? current);
      current = current.right ?? null;
    } else {
      let predecessor = current.left;
      while (predecessor.right && predecessor.right !== current) {
        predecessor = predecessor.right;
      }

      if (!predecessor.right) {
        predecessor.right = current;
        current = current.left;
      } else {
        predecessor.right = null;
        result.push(current.value ?? current.val ?? current);
        current = current.right ?? null;
      }
    }
  }

  return result;
}

function lcaNaive(parentMap, u, v) {
  const ancestors = new Set();
  let currU = u;
  while (currU !== null && currU !== undefined) {
    ancestors.add(currU);
    currU = parentMap[currU] ?? null;
  }

  let currV = v;
  while (currV !== null && currV !== undefined) {
    if (ancestors.has(currV)) return currV;
    currV = parentMap[currV] ?? null;
  }

  return null;
}

function lcaBinaryLifting(tree, root = 1, queries = []) {
  const LOG = 16;
  const depth = {};
  const up = {};

  for (const node of Object.keys(tree)) {
    depth[node] = 0;
    up[node] = Array(LOG).fill(null);
  }

  function dfs(node, parent, d) {
    depth[node] = d;
    up[node][0] = parent;

    for (let i = 1; i < LOG; i += 1) {
      if (up[node][i - 1] !== null && up[up[node][i - 1]]?.[i - 1] !== undefined) {
        up[node][i] = up[up[node][i - 1]][i - 1];
      }
    }

    for (const child of tree[node] ?? []) {
      if (child !== parent) dfs(child, node, d + 1);
    }
  }

  dfs(root, null, 0);

  function getLCA(u, v) {
    let nodeU = u;
    let nodeV = v;

    if (depth[nodeU] < depth[nodeV]) [nodeU, nodeV] = [nodeV, nodeU];

    for (let i = LOG - 1; i >= 0; i -= 1) {
      if (depth[nodeU] - (1 << i) >= depth[nodeV] && up[nodeU][i] !== null) {
        nodeU = up[nodeU][i];
      }
    }

    if (String(nodeU) === String(nodeV)) return nodeU;

    for (let i = LOG - 1; i >= 0; i -= 1) {
      if (up[nodeU][i] !== null && up[nodeU][i] !== up[nodeV][i]) {
        nodeU = up[nodeU][i];
        nodeV = up[nodeV][i];
      }
    }

    return up[nodeU][0];
  }

  const results = queries.map(([u, v]) => ({
    u,
    v,
    lca: getLCA(u, v),
  }));

  return {
    root,
    queryResults: results,
  };
}

function tarjanOfflineLCA(tree, root = 1, queryPairs = []) {
  const parent = {};
  const rank = {};
  const ancestor = {};
  const visited = new Set();
  const queriesByNode = {};
  const results = {};

  for (const node of Object.keys(tree)) {
    parent[node] = node;
    rank[node] = 0;
    ancestor[node] = node;
    queriesByNode[node] = [];
  }

  queryPairs.forEach(([u, v], idx) => {
    queriesByNode[u]?.push({ other: v, idx, pair: [u, v] });
    queriesByNode[v]?.push({ other: u, idx, pair: [u, v] });
  });

  function find(i) {
    if (parent[i] === i) return i;
    parent[i] = find(parent[i]);
    return parent[i];
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
      else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
      else {
        parent[rootJ] = rootI;
        rank[rootI] += 1;
      }
    }
  }

  function dfs(u) {
    ancestor[u] = u;
    for (const v of tree[u] ?? []) {
      dfs(v);
      union(u, v);
      ancestor[find(u)] = u;
    }
    visited.add(String(u));

    for (const q of queriesByNode[u] ?? []) {
      if (visited.has(String(q.other))) {
        results[`${q.pair[0]}-${q.pair[1]}`] = ancestor[find(q.other)];
      }
    }
  }

  dfs(root);

  return {
    root,
    answers: results,
  };
}

function eulerTour(tree, root = 1) {
  const tour = [];
  const tin = {};
  const tout = {};
  let timer = 0;

  function dfs(u, parent = null) {
    timer += 1;
    tin[u] = timer;
    tour.push(u);

    for (const v of tree[u] ?? []) {
      if (v !== parent) dfs(v, u);
    }

    timer += 1;
    tout[u] = timer;
    tour.push(u);
  }

  dfs(root);

  return {
    root,
    tour,
    tin,
    tout,
    tourLength: tour.length,
  };
}

function heavyLightDecomposition(tree, root = 1) {
  const size = {};
  const depth = {};
  const parent = {};
  const heavy = {};
  const head = {};
  const pos = {};
  let curPos = 0;

  function dfsSize(u, p = null, d = 0) {
    size[u] = 1;
    depth[u] = d;
    parent[u] = p;
    heavy[u] = null;
    let maxSize = 0;

    for (const v of tree[u] ?? []) {
      if (v !== p) {
        dfsSize(v, u, d + 1);
        size[u] += size[v];
        if (size[v] > maxSize) {
          maxSize = size[v];
          heavy[u] = v;
        }
      }
    }
  }

  function dfsHld(u, h) {
    head[u] = h;
    curPos += 1;
    pos[u] = curPos;

    if (heavy[u] !== null) dfsHld(heavy[u], h);

    for (const v of tree[u] ?? []) {
      if (v !== parent[u] && v !== heavy[u]) {
        dfsHld(v, v);
      }
    }
  }

  dfsSize(root);
  dfsHld(root, root);

  return {
    root,
    heavyEdges: heavy,
    chainHeads: head,
    positions: pos,
    depths: depth,
  };
}

function centroidDecomposition(tree) {
  const nodes = Object.keys(tree).map(Number);
  const size = {};
  const removed = new Set();
  const centroidParent = {};

  function getSubtreeSize(u, p = null) {
    size[u] = 1;
    for (const v of tree[u] ?? []) {
      if (v !== p && !removed.has(v)) {
        size[u] += getSubtreeSize(v, u);
      }
    }
    return size[u];
  }

  function getCentroid(u, p, total) {
    for (const v of tree[u] ?? []) {
      if (v !== p && !removed.has(v) && size[v] > total / 2) {
        return getCentroid(v, u, total);
      }
    }
    return u;
  }

  function decompose(node, p = null) {
    const total = getSubtreeSize(node);
    const centroid = getCentroid(node, null, total);
    removed.add(centroid);
    centroidParent[centroid] = p;

    for (const v of tree[centroid] ?? []) {
      if (!removed.has(v)) {
        decompose(v, centroid);
      }
    }
    return centroid;
  }

  const rootCentroid = decompose(nodes[0]);

  return {
    rootCentroid,
    centroidTree: centroidParent,
  };
}

function treeIsomorphism(tree1, tree2) {
  function getTreeHash(tree, root, parent = null) {
    const childHashes = [];
    for (const v of tree[root] ?? []) {
      if (v !== parent) {
        childHashes.push(getTreeHash(tree, v, root));
      }
    }
    childHashes.sort();
    return `(${childHashes.join("")})`;
  }

  function getCenters(tree) {
    const degrees = {};
    const leaves = [];
    const nodes = Object.keys(tree).map(Number);
    let remaining = nodes.length;

    for (const u of nodes) {
      degrees[u] = (tree[u] ?? []).length;
      if (degrees[u] <= 1) leaves.push(u);
    }

    while (remaining > 2) {
      const leavesCount = leaves.length;
      remaining -= leavesCount;
      for (let i = 0; i < leavesCount; i += 1) {
        const leaf = leaves.shift();
        for (const neighbor of tree[leaf] ?? []) {
          degrees[neighbor] -= 1;
          if (degrees[neighbor] === 1) leaves.push(neighbor);
        }
      }
    }
    return leaves;
  }

  const centers1 = getCenters(tree1);
  const centers2 = getCenters(tree2);

  const hash1 = centers1.map((c) => getTreeHash(tree1, c)).sort()[0];
  const hash2 = centers2.map((c) => getTreeHash(tree2, c)).sort()[0];

  return {
    isomorphic: hash1 === hash2,
    tree1Hash: hash1,
    tree2Hash: hash2,
  };
}

function pruferSequence(edges, n) {
  const adj = {};
  const deg = {};
  for (let i = 1; i <= n; i += 1) {
    adj[i] = new Set();
    deg[i] = 0;
  }

  for (const [u, v] of edges) {
    adj[u].add(v);
    adj[v].add(u);
    deg[u] += 1;
    deg[v] += 1;
  }

  const sequence = [];
  for (let step = 0; step < n - 2; step += 1) {
    let leaf = null;
    for (let i = 1; i <= n; i += 1) {
      if (deg[i] === 1) {
        leaf = i;
        break;
      }
    }

    const neighbor = adj[leaf].values().next().value;
    sequence.push(neighbor);
    adj[leaf].delete(neighbor);
    adj[neighbor].delete(leaf);
    deg[leaf] -= 1;
    deg[neighbor] -= 1;
  }

  const degree = Array(n + 1).fill(1);
  for (const val of sequence) degree[val] += 1;

  const reconstructedEdges = [];
  for (const val of sequence) {
    for (let i = 1; i <= n; i += 1) {
      if (degree[i] === 1) {
        reconstructedEdges.push([i, val]);
        degree[i] -= 1;
        degree[val] -= 1;
        break;
      }
    }
  }

  let lastU = null;
  let lastV = null;
  for (let i = 1; i <= n; i += 1) {
    if (degree[i] === 1) {
      if (lastU === null) lastU = i;
      else lastV = i;
    }
  }
  if (lastU && lastV) reconstructedEdges.push([lastU, lastV]);

  return {
    nodeCount: n,
    pruferSequence: sequence,
    reconstructedEdges,
  };
}

function adjacencyMatrixRepresentation(vertices, edges, directed = false) {
  const indexMap = {};
  vertices.forEach((v, i) => {
    indexMap[v] = i;
  });

  const n = vertices.length;
  const matrix = Array.from({ length: n }, () => Array(n).fill(0));

  for (const edge of edges) {
    const [u, v, weight = 1] = edge;
    const i = indexMap[u];
    const j = indexMap[v];
    if (i !== undefined && j !== undefined) {
      matrix[i][j] = weight;
      if (!directed) matrix[j][i] = weight;
    }
  }

  let edgeCount = 0;
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (matrix[i][j] !== 0) edgeCount += 1;
    }
  }

  return {
    vertices,
    matrix,
    density: n > 1 ? edgeCount / (directed ? n * (n - 1) : n * (n - 1)) : 0,
  };
}

function adjacencyListRepresentation(vertices, edges, directed = false) {
  const adj = {};
  for (const v of vertices) adj[v] = [];

  for (const edge of edges) {
    const [u, v, weight] = edge;
    if (adj[u]) adj[u].push(weight !== undefined ? { node: v, weight } : v);
    if (!directed && adj[v]) {
      adj[v].push(weight !== undefined ? { node: u, weight } : u);
    }
  }

  return {
    vertices,
    adjacencyList: adj,
    edgeCount: edges.length,
  };
}

function incidenceMatrixRepresentation(vertices, edges, directed = false) {
  const vMap = {};
  vertices.forEach((v, i) => {
    vMap[v] = i;
  });

  const vCount = vertices.length;
  const eCount = edges.length;
  const matrix = Array.from({ length: vCount }, () => Array(eCount).fill(0));

  edges.forEach((edge, eIdx) => {
    const [u, v] = edge;
    const uIdx = vMap[u];
    const vIdx = vMap[v];

    if (uIdx !== undefined && vIdx !== undefined) {
      if (directed) {
        matrix[uIdx][eIdx] = -1;
        matrix[vIdx][eIdx] = 1;
      } else {
        matrix[uIdx][eIdx] = 1;
        matrix[vIdx][eIdx] = 1;
      }
    }
  });

  return {
    vertices,
    edges,
    incidenceMatrix: matrix,
  };
}

function edgeListRepresentation(edges, weighted = false) {
  const degrees = {};

  const formattedEdges = edges.map((e) => {
    const [u, v, w] = e;
    degrees[u] = (degrees[u] ?? 0) + 1;
    degrees[v] = (degrees[v] ?? 0) + 1;
    return weighted || w !== undefined ? { from: u, to: v, weight: w ?? 1 } : { from: u, to: v };
  });

  return {
    totalEdges: formattedEdges.length,
    edges: formattedEdges,
    degrees,
  };
}

function compressedSparseRowRepresentation(matrix) {
  const values = [];
  const colIndex = [];
  const rowPtr = [0];

  for (let r = 0; r < matrix.length; r += 1) {
    for (let c = 0; c < matrix[r].length; c += 1) {
      if (matrix[r][c] !== 0) {
        values.push(matrix[r][c]);
        colIndex.push(c);
      }
    }
    rowPtr.push(values.length);
  }

  return {
    values,
    colIndex,
    rowPtr,
    nonZeroCount: values.length,
  };
}

function disjointSetUnionGraph(nodes, operations) {
  const parent = {};
  const rank = {};

  for (const node of nodes) {
    parent[node] = node;
    rank[node] = 0;
  }

  function find(i) {
    if (parent[i] === i) return i;
    parent[i] = find(parent[i]);
    return parent[i];
  }

  function union(i, j) {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI === rootJ) return false;
    if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
    else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
    else {
      parent[rootJ] = rootI;
      rank[rootI] += 1;
    }
    return true;
  }

  const history = [];
  for (const op of operations) {
    const [type, u, v] = op;
    if (type === "union") {
      const merged = union(u, v);
      history.push({ op: "union", u, v, merged });
    } else if (type === "find") {
      history.push({ op: "find", node: u, root: find(u) });
    } else if (type === "connected") {
      history.push({ op: "connected", u, v, connected: find(u) === find(v) });
    }
  }

  const components = {};
  for (const node of nodes) {
    const root = find(node);
    components[root] = components[root] ?? [];
    components[root].push(node);
  }

  return {
    setsCount: Object.keys(components).length,
    components,
    history,
  };
}

function bfsTraversal(graph, start) {
  const visited = new Set();
  const order = [];
  const distances = {};
  const parents = {};
  const queue = [start];

  visited.add(start);
  distances[start] = 0;
  parents[start] = null;

  while (queue.length > 0) {
    const current = queue.shift();
    order.push(current);

    for (const neighbor of graph[current] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        distances[neighbor] = distances[current] + 1;
        parents[neighbor] = current;
        queue.push(neighbor);
      }
    }
  }

  return {
    start,
    order,
    distances,
    parents,
  };
}

function dfsTraversal(graph, start) {
  const visited = new Set();
  const order = [];
  const discoveryTime = {};
  const finishTime = {};
  let timer = 0;

  function dfs(u) {
    visited.add(u);
    timer += 1;
    discoveryTime[u] = timer;
    order.push(u);

    for (const neighbor of graph[u] ?? []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    timer += 1;
    finishTime[u] = timer;
  }

  dfs(start);

  return {
    start,
    order,
    discoveryTime,
    finishTime,
  };
}

function iterativeDeepeningDfs(graph, start, target, maxDepth = 10) {
  const iterations = [];

  function dls(node, depth, path, visited) {
    if (node === target) return path;
    if (depth <= 0) return null;

    for (const neighbor of graph[node] ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        const result = dls(neighbor, depth - 1, [...path, neighbor], visited);
        if (result) return result;
        visited.delete(neighbor);
      }
    }
    return null;
  }

  for (let limit = 0; limit <= maxDepth; limit += 1) {
    const visited = new Set([start]);
    const foundPath = dls(start, limit, [start], visited);
    iterations.push({ depthLimit: limit, found: foundPath !== null });
    if (foundPath) {
      return {
        targetFound: true,
        depthFound: limit,
        path: foundPath,
        iterations,
      };
    }
  }

  return {
    targetFound: false,
    path: null,
    iterations,
  };
}

function bidirectionalSearchGraph(graph, start, target) {
  if (start === target) return { path: [start], distance: 0 };

  const forwardVisited = { [start]: null };
  const backwardVisited = { [target]: null };
  const forwardQueue = [start];
  const backwardQueue = [target];

  let intersectNode = null;

  while (forwardQueue.length > 0 && backwardQueue.length > 0) {
    const fNode = forwardQueue.shift();
    for (const neighbor of graph[fNode] ?? []) {
      if (!(neighbor in forwardVisited)) {
        forwardVisited[neighbor] = fNode;
        forwardQueue.push(neighbor);
      }
      if (neighbor in backwardVisited) {
        intersectNode = neighbor;
        break;
      }
    }
    if (intersectNode) break;

    const bNode = backwardQueue.shift();
    for (const neighbor of graph[bNode] ?? []) {
      if (!(neighbor in backwardVisited)) {
        backwardVisited[neighbor] = bNode;
        backwardQueue.push(neighbor);
      }
      if (neighbor in forwardVisited) {
        intersectNode = neighbor;
        break;
      }
    }
    if (intersectNode) break;
  }

  if (!intersectNode) {
    return { path: null, distance: Infinity };
  }

  const path = [];
  let curr = intersectNode;
  while (curr !== null) {
    path.unshift(curr);
    curr = forwardVisited[curr];
  }
  curr = backwardVisited[intersectNode];
  while (curr !== null) {
    path.push(curr);
    curr = backwardVisited[curr];
  }

  return {
    meetingNode: intersectNode,
    distance: path.length - 1,
    path,
  };
}

function topologicalSortKahn(vertices, edges) {
  const inDegree = {};
  const adj = {};

  for (const v of vertices) {
    inDegree[v] = 0;
    adj[v] = [];
  }

  for (const [u, v] of edges) {
    adj[u].push(v);
    inDegree[v] += 1;
  }

  const queue = [];
  for (const v of vertices) {
    if (inDegree[v] === 0) queue.push(v);
  }

  const order = [];
  while (queue.length > 0) {
    const u = queue.shift();
    order.push(u);

    for (const v of adj[u]) {
      inDegree[v] -= 1;
      if (inDegree[v] === 0) queue.push(v);
    }
  }

  const hasCycle = order.length !== vertices.length;

  return {
    order: hasCycle ? [] : order,
    hasCycle,
    inDegrees: inDegree,
  };
}

function topologicalSortDfs(vertices, edges) {
  const adj = {};
  const state = {};

  for (const v of vertices) {
    adj[v] = [];
    state[v] = 0;
  }

  for (const [u, v] of edges) {
    adj[u].push(v);
  }

  let hasCycle = false;
  const order = [];

  function dfs(u) {
    if (hasCycle) return;
    state[u] = 1;

    for (const v of adj[u]) {
      if (state[v] === 1) {
        hasCycle = true;
        return;
      }
      if (state[v] === 0) {
        dfs(v);
      }
    }

    state[u] = 2;
    order.push(u);
  }

  for (const v of vertices) {
    if (state[v] === 0) dfs(v);
  }

  return {
    order: hasCycle ? [] : order.reverse(),
    hasCycle,
  };
}

function fleurysAlgorithm(vertices, edges) {
  const adj = {};
  for (const v of vertices) adj[v] = [];

  const edgeList = edges.map(([u, v], id) => ({ id, u: String(u), v: String(v), used: false }));

  for (const e of edgeList) {
    adj[e.u].push(e);
    adj[e.v].push(e);
  }

  let startNode = String(vertices[0]);
  let oddCount = 0;
  for (const v of vertices) {
    if (adj[v].length % 2 !== 0) {
      oddCount += 1;
      startNode = String(v);
    }
  }

  const isEulerian = oddCount === 0 || oddCount === 2;
  if (!isEulerian) {
    return { path: [], isEulerian: false, edgeCount: edges.length };
  }

  function reachableCount(node) {
    const visited = new Set();
    const stack = [node];
    visited.add(node);

    while (stack.length > 0) {
      const curr = stack.pop();
      for (const e of adj[curr]) {
        if (!e.used) {
          const neighbor = e.u === curr ? e.v : e.u;
          if (!visited.has(neighbor)) {
            visited.add(neighbor);
            stack.push(neighbor);
          }
        }
      }
    }
    return visited.size;
  }

  function isValidNextEdge(u, edge) {
    const remainingEdges = adj[u].filter((e) => !e.used);
    if (remainingEdges.length === 1) return true;

    const countBefore = reachableCount(u);
    edge.used = true;
    const countAfter = reachableCount(edge.u === u ? edge.v : edge.u);
    edge.used = false;

    return countBefore <= countAfter;
  }

  const path = [startNode];
  let curr = startNode;

  for (let step = 0; step < edges.length; step += 1) {
    let chosenEdge = null;
    for (const e of adj[curr]) {
      if (!e.used && isValidNextEdge(curr, e)) {
        chosenEdge = e;
        break;
      }
    }

    if (!chosenEdge) {
      for (const e of adj[curr]) {
        if (!e.used) {
          chosenEdge = e;
          break;
        }
      }
    }

    if (!chosenEdge) break;

    chosenEdge.used = true;
    curr = chosenEdge.u === curr ? chosenEdge.v : chosenEdge.u;
    path.push(curr);
  }

  return {
    path,
    isEulerian: path.length === edges.length + 1,
    edgeCount: edges.length,
  };
}

function hierholzersAlgorithm(vertices, edges, directed = false) {
  const adj = {};
  for (const v of vertices) adj[v] = [];

  const remainingEdges = edges.map(([u, v], id) => ({ id, u: String(u), v: String(v), used: false }));

  for (const e of remainingEdges) {
    adj[e.u].push(e);
    if (!directed) adj[e.v].push(e);
  }

  let startNode = String(vertices[0]);
  for (const v of vertices) {
    if (adj[v].length % 2 !== 0) {
      startNode = String(v);
      break;
    }
  }

  const stack = [startNode];
  const trail = [];

  while (stack.length > 0) {
    const curr = stack.at(-1);
    const availableEdge = adj[curr]?.find((e) => !e.used);

    if (availableEdge) {
      availableEdge.used = true;
      const next = directed ? availableEdge.v : (availableEdge.u === curr ? availableEdge.v : availableEdge.u);
      stack.push(next);
    } else {
      trail.push(stack.pop());
    }
  }

  trail.reverse();

  return {
    trail,
    isEulerian: trail.length === edges.length + 1,
    totalEdges: edges.length,
  };
}

function hopcroftTarjanBiconnected(vertices, edges) {
  const adj = {};
  for (const v of vertices) adj[v] = [];

  for (const [u, v] of edges) {
    adj[u].push(v);
    adj[v].push(u);
  }

  const tin = {};
  const low = {};
  const visited = new Set();
  const articulationPoints = new Set();
  const bridges = [];
  const edgeStack = [];
  const biconnectedComponents = [];
  let timer = 0;

  function dfs(u, parent = null) {
    visited.add(u);
    timer += 1;
    tin[u] = timer;
    low[u] = timer;
    let children = 0;

    for (const v of adj[u]) {
      if (v === parent) continue;

      if (visited.has(v)) {
        low[u] = Math.min(low[u], tin[v]);
        if (tin[v] < tin[u]) {
          edgeStack.push([u, v]);
        }
      } else {
        children += 1;
        edgeStack.push([u, v]);
        dfs(v, u);
        low[u] = Math.min(low[u], low[v]);

        if (low[v] > tin[u]) {
          bridges.push([u, v]);
        }

        if ((parent === null && children > 1) || (parent !== null && low[v] >= tin[u])) {
          articulationPoints.add(u);
          const bcc = [];
          while (edgeStack.length > 0) {
            const edge = edgeStack.pop();
            bcc.push(edge);
            if (edge[0] === u && edge[1] === v) break;
          }
          biconnectedComponents.push(bcc);
        }
      }
    }

    if (parent === null && edgeStack.length > 0) {
      biconnectedComponents.push([...edgeStack]);
      edgeStack.length = 0;
    }
  }

  for (const v of vertices) {
    if (!visited.has(v)) dfs(v);
  }

  return {
    articulationPoints: [...articulationPoints],
    bridges,
    biconnectedComponents,
  };
}

function kargersMinCut(vertices, edges, iterations = 30, seed = 42) {
  function pseudoRandom(s) {
    let state = s;
    return () => {
      state = (state * 1664525 + 1013904223) % 4294967296;
      return state / 4294967296;
    };
  }

  const rand = pseudoRandom(seed);
  let bestMinCut = Infinity;
  let bestPartitionA = [];
  let bestPartitionB = [];

  for (let iter = 0; iter < iterations; iter += 1) {
    const parent = {};
    for (const v of vertices) parent[v] = v;

    function find(i) {
      if (parent[i] === i) return i;
      parent[i] = find(parent[i]);
      return parent[i];
    }

    function union(i, j) {
      const rootI = find(i);
      const rootJ = find(j);
      if (rootI !== rootJ) {
        parent[rootI] = rootJ;
        return true;
      }
      return false;
    }

    let remainingVertices = vertices.length;
    const currentEdges = edges.map(([u, v]) => [u, v]);

    while (remainingVertices > 2 && currentEdges.length > 0) {
      const randIdx = Math.floor(rand() * currentEdges.length);
      const [u, v] = currentEdges.splice(randIdx, 1)[0];

      if (union(u, v)) {
        remainingVertices -= 1;
      }
    }

    let cutCount = 0;
    for (const [u, v] of edges) {
      if (find(u) !== find(v)) {
        cutCount += 1;
      }
    }

    if (cutCount < bestMinCut) {
      bestMinCut = cutCount;
      const roots = [...new Set(vertices.map(find))];
      bestPartitionA = vertices.filter((v) => find(v) === roots[0]);
      bestPartitionB = vertices.filter((v) => find(v) === (roots[1] ?? roots[0]));
    }
  }

  return {
    minCutSize: bestMinCut,
    partitionA: bestPartitionA,
    partitionB: bestPartitionB,
    iterations,
  };
}

const starPatternDefinitions = [
  ["Square", "square"],
  ["Right Triangle Left-Aligned", "right-left"],
  ["Inverted Right Triangle Left-Aligned", "inverted-left"],
  ["Right Triangle Right-Aligned", "right"],
  ["Inverted Right Triangle Right-Aligned", "inverted-right"],
  ["Hollow Square", "hollow-square"],
  ["Rhombus / Parallelogram", "rhombus"],
  ["Mirrored Parallelogram", "mirrored"],
  ["Pyramid", "pyramid"],
  ["Inverted Pyramid", "inverted-pyramid"],
  ["Hollow Right Triangle", "hollow-right"],
  ["Hollow Inverted Right Triangle", "hollow-inverted-right"],
  ["Hollow Right Triangle Right-Aligned", "hollow-right-right"],
  ["Hollow Rhombus", "hollow-rhombus"],
  ["Hollow Pyramid", "hollow-pyramid"],
  ["Right Pascal's Triangle", "pascal-right"],
  ["Left Pascal's Triangle", "pascal-left"],
  ["Diamond", "diamond"],
  ["Hollow Diamond", "hollow-diamond"],
  ["Hourglass", "hourglass"],
  ["Hollow Hourglass", "hollow-hourglass"],
  ["X Pattern", "x"],
  ["Plus Pattern", "plus"],
  ["Checkerboard / Cross Pattern", "checkerboard"],
  ["Left Diagonal", "left-diagonal"],
  ["Right Diagonal", "right-diagonal"],
  ["Butterfly Pattern", "butterfly"],
  ["Hollow Butterfly", "hollow-butterfly"],
  ["Square with Cross", "square-cross"],
  ["Vertical Stripes", "vertical-stripes"],
].map(([name, pattern], index) => ({
  id: 271 + index,
  name,
  type: "Star Patterns",
  complexity: "O(n²) time, O(n²) output space",
  requiresSortedInput: false,
  source: starPattern.toString(),
  run: (size = 5) => starPattern(pattern, size),
  demo: { input: 5 },
  summary: `Prints a ${name.toLowerCase()} using nested loops.`,
}));

export const algorithms = [
  {
    id: 1,
    name: "Bubble Sort",
    type: "Sorting",
    complexity: "O(n²) average/worst, O(n) best",
    requiresSortedInput: false,
    source: bubbleSort.toString(),
    run: (values) => bubbleSort(values),
    summary: "Repeatedly swaps neighboring values that are out of order.",
  },
  {
    id: 2,
    name: "Selection Sort",
    type: "Sorting",
    complexity: "O(n²) average/worst/best",
    requiresSortedInput: false,
    source: selectionSort.toString(),
    run: (values) => selectionSort(values),
    summary: "Selects the smallest remaining value and places it next.",
  },
  {
    id: 3,
    name: "Insertion Sort",
    type: "Sorting",
    complexity: "O(n²) average/worst, O(n) best",
    requiresSortedInput: false,
    source: insertionSort.toString(),
    run: (values) => insertionSort(values),
    summary: "Builds a sorted section by inserting each value into position.",
  },
  {
    id: 4,
    name: "Merge Sort",
    type: "Sorting",
    complexity: "O(n log n) in all cases",
    requiresSortedInput: false,
    source: mergeSort.toString(),
    run: (values) => mergeSort(values),
    summary: "Splits the data, sorts each half, and merges the sorted halves.",
  },
  {
    id: 5,
    name: "Quick Sort",
    type: "Sorting",
    complexity: "O(n log n) average, O(n²) worst",
    requiresSortedInput: false,
    source: quickSort.toString(),
    run: (values) => quickSort(values),
    summary: "Partitions values around a pivot and recursively sorts each side.",
  },
  {
    id: 6,
    name: "Heap Sort",
    type: "Sorting",
    complexity: "O(n log n) average/worst/best",
    requiresSortedInput: false,
    source: heapSort.toString(),
    run: (values) => heapSort(values),
    summary: "Uses a max heap to repeatedly move the largest value to the end.",
  },
  {
    id: 7,
    name: "Linear Search",
    type: "Searching",
    complexity: "O(n) average/worst, O(1) best",
    requiresSortedInput: false,
    source: linearSearch.toString(),
    run: (values, target) => linearSearch(values, target),
    summary: "Checks each value from left to right until the target is found.",
  },
  {
    id: 8,
    name: "Binary Search",
    type: "Searching",
    complexity: "O(log n)",
    requiresSortedInput: true,
    source: binarySearch.toString(),
    run: (values, target) => binarySearch(values, target),
    summary: "Halves the search range each step in an already sorted array.",
  },
  {
    id: 9,
    name: "Jump Search",
    type: "Searching",
    complexity: "O(√n)",
    requiresSortedInput: true,
    source: jumpSearch.toString(),
    run: (values, target) => jumpSearch(values, target),
    summary: "Jumps through sorted blocks, then performs a short linear scan.",
  },
  {
    id: 10,
    name: "Interpolation Search",
    type: "Searching",
    complexity: "O(log log n) average for uniformly distributed data, O(n) worst",
    requiresSortedInput: true,
    source: interpolationSearch.toString(),
    run: (values, target) => interpolationSearch(values, target),
    summary: "Estimates a target's position using the values at the range ends.",
  },
  {
    id: 11,
    name: "Two Pointers",
    type: "Array",
    complexity: "O(n)",
    requiresSortedInput: true,
    source: twoPointers.toString(),
    run: (values, target) => twoPointers(values, target),
    demo: { input: [1, 2, 4, 7, 11, 15], argument: 15, argumentLabel: "Target sum" },
    summary: "Moves pointers inward to find a pair in a sorted array.",
  },
  {
    id: 12,
    name: "Sliding Window",
    type: "Array",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: slidingWindow.toString(),
    run: (values, windowSize) => slidingWindow(values, windowSize),
    demo: { input: [2, 1, 5, 1, 3, 2], argument: 3, argumentLabel: "Window size" },
    summary: "Reuses work between overlapping subarrays instead of recounting values.",
  },
  {
    id: 13,
    name: "Pascal's Triangle",
    type: "Math",
    complexity: "O(n²)",
    requiresSortedInput: false,
    source: pascalTriangle.toString(),
    run: (rows) => pascalTriangle(rows),
    demo: { input: 5, argumentLabel: "Rows" },
    summary: "Builds each row from the two values directly above it.",
  },
  {
    id: 14,
    name: "Kadane's Algorithm",
    type: "Dynamic Programming",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: kadanesAlgorithm.toString(),
    run: (values) => kadanesAlgorithm(values),
    demo: { input: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
    summary: "Finds the largest sum of a contiguous subarray in one pass.",
  },
  {
    id: 15,
    name: "Fibonacci Dynamic Programming",
    type: "Dynamic Programming",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: fibonacciDynamicProgramming.toString(),
    run: (n) => fibonacciDynamicProgramming(n),
    demo: { input: 10, argumentLabel: "Position" },
    summary: "Stores earlier Fibonacci values so each number is calculated once.",
  },
  {
    id: 16,
    name: "Euclidean GCD",
    type: "Math",
    complexity: "O(log min(a, b))",
    requiresSortedInput: false,
    source: euclideanGcd.toString(),
    run: (first, second) => euclideanGcd(first, second),
    demo: { input: 84, argument: 30, argumentLabel: "Second number" },
    summary: "Repeatedly replaces a pair with the divisor and remainder.",
  },
  {
    id: 17,
    name: "Sieve of Eratosthenes",
    type: "Math",
    complexity: "O(n log log n)",
    requiresSortedInput: false,
    source: sieveOfEratosthenes.toString(),
    run: (limit) => sieveOfEratosthenes(limit),
    demo: { input: 30, argumentLabel: "Limit" },
    summary: "Marks multiples of each prime to generate all primes up to a limit.",
  },
  {
    id: 18,
    name: "Depth-First Search",
    type: "Graph",
    complexity: "O(V + E)",
    requiresSortedInput: false,
    source: depthFirstSearch.toString(),
    run: (graph, start, target) => depthFirstSearch(graph, start, target),
    demo: {
      input: { A: ["B", "C"], B: ["D"], C: ["E"], D: [], E: [] },
      argument: "E",
      argumentLabel: "Target node",
      start: "A",
    },
    summary: "Explores one branch as deeply as possible before backtracking.",
  },
  {
    id: 19,
    name: "Breadth-First Search",
    type: "Graph",
    complexity: "O(V + E)",
    requiresSortedInput: false,
    source: breadthFirstSearch.toString(),
    run: (graph, start, target) => breadthFirstSearch(graph, start, target),
    demo: {
      input: { A: ["B", "C"], B: ["D"], C: ["E"], D: [], E: [] },
      argument: "E",
      argumentLabel: "Target node",
      start: "A",
    },
    summary: "Visits all nearby nodes before moving to the next level.",
  },
  {
    id: 20,
    name: "Dijkstra's Algorithm",
    type: "Graph",
    complexity: "O(V²) with this simple implementation",
    requiresSortedInput: false,
    source: dijkstra.toString(),
    run: (graph, start) => dijkstra(graph, start),
    demo: {
      input: {
        A: [["B", 4], ["C", 2]],
        B: [["D", 5]],
        C: [["B", 1], ["D", 8]],
        D: [],
      },
      start: "A",
    },
    summary: "Finds shortest distances from one node when edge weights are non-negative.",
  },
  {
    id: 21,
    name: "Two Sum",
    type: "Hash Map",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: twoSum.toString(),
    run: (values, target) => twoSum(values, target),
    demo: { input: [2, 7, 11, 15], argument: 9, argumentLabel: "Target sum" },
    summary: "Uses a map of seen values to find two indices that add to a target.",
  },
  {
    id: 22,
    name: "Valid Parentheses",
    type: "Stack",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: validParentheses.toString(),
    run: (input) => validParentheses(input),
    demo: { input: "({[]})" },
    summary: "Matches every closing bracket with the most recent opening bracket.",
  },
  {
    id: 23,
    name: "Merge Two Sorted Lists",
    type: "Linked List",
    complexity: "O(n + m) time, O(n + m) space",
    requiresSortedInput: false,
    source: mergeTwoSortedLists.toString(),
    run: (first, second) => mergeTwoSortedLists(first, second),
    demo: { input: [1, 2, 4], argument: [1, 3, 4], argumentLabel: "Second list" },
    summary: "Walks through two sorted lists and takes the smaller next value.",
  },
  {
    id: 24,
    name: "Best Time to Buy and Sell Stock",
    type: "Array",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: bestTimeToBuyAndSellStock.toString(),
    run: (prices) => bestTimeToBuyAndSellStock(prices),
    demo: { input: [7, 1, 5, 3, 6, 4] },
    summary: "Tracks the lowest buying price and the best profit seen so far.",
  },
  {
    id: 25,
    name: "Valid Palindrome",
    type: "String",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: validPalindrome.toString(),
    run: (input) => validPalindrome(input),
    demo: { input: "A man, a plan, a canal: Panama" },
    summary: "Normalizes a string and compares it with its reversed form.",
  },
  {
    id: 26,
    name: "Invert Binary Tree",
    type: "Binary Tree",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: invertBinaryTree.toString(),
    run: (root) => invertBinaryTree(root),
    demo: { input: { value: 4, left: { value: 2, left: null, right: null }, right: { value: 7, left: null, right: null } } },
    summary: "Recursively swaps the left and right child of every tree node.",
  },
  {
    id: 27,
    name: "Valid Anagram",
    type: "Hash Map",
    complexity: "O(n) time, O(k) space",
    requiresSortedInput: false,
    source: validAnagram.toString(),
    run: (first, second) => validAnagram(first, second),
    demo: { input: "anagram", argument: "nagaram", argumentLabel: "Second string" },
    summary: "Counts characters in one string and subtracts counts from the other.",
  },
  {
    id: 28,
    name: "Flood Fill",
    type: "Graph",
    complexity: "O(m × n) time, O(m × n) space",
    requiresSortedInput: false,
    source: floodFill.toString(),
    run: (image, row, column, color) => floodFill(image, row, column, color),
    demo: { input: [[1, 1, 1], [1, 1, 0], [1, 0, 1]], args: [1, 1, 2] },
    summary: "Explores connected cells and changes every cell in the same region.",
  },
  {
    id: 29,
    name: "Lowest Common Ancestor of a BST",
    type: "Binary Search Tree",
    complexity: "O(h) time, O(1) space",
    requiresSortedInput: false,
    source: lowestCommonAncestor.toString(),
    run: (root, first, second) => lowestCommonAncestor(root, first, second),
    demo: { input: { value: 6, left: { value: 2, left: null, right: null }, right: { value: 8, left: null, right: null } }, args: [2, 8] },
    summary: "Uses BST ordering to walk toward the first node where paths split.",
  },
  {
    id: 30,
    name: "Balanced Binary Tree",
    type: "Binary Tree",
    complexity: "O(n) time, O(h) space",
    requiresSortedInput: false,
    source: balancedBinaryTree.toString(),
    run: (root) => balancedBinaryTree(root),
    demo: { input: { value: 3, left: { value: 9, left: null, right: null }, right: { value: 20, left: { value: 15, left: null, right: null }, right: { value: 7, left: null, right: null } } } },
    summary: "Computes subtree heights and stops early when a difference exceeds one.",
  },
  {
    id: 31,
    name: "Linked List Cycle",
    type: "Linked List",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: linkedListCycle.toString(),
    run: (next, head) => linkedListCycle(next, head),
    demo: { input: [1, 2, 3, 1], argument: 0, argumentLabel: "Head index" },
    summary: "Uses slow and fast pointers to detect whether linked-list nodes loop back.",
  },
  {
    id: 32,
    name: "Queue Using Stacks",
    type: "Stack",
    complexity: "O(1) amortized enqueue/dequeue",
    requiresSortedInput: false,
    source: queueUsingStacks.toString(),
    run: (operations) => queueUsingStacks(operations),
    demo: { input: [["enqueue", 1], ["enqueue", 2], ["dequeue"], ["enqueue", 3], ["dequeue"]] },
    summary: "Uses an input stack and output stack to preserve first-in, first-out order.",
  },
  {
    id: 33,
    name: "First Bad Version",
    type: "Binary Search",
    complexity: "O(log n)",
    requiresSortedInput: false,
    source: firstBadVersion.toString(),
    run: (versionCount, firstBad) => firstBadVersion(versionCount, firstBad),
    demo: { input: 10, argument: 6, argumentLabel: "First bad version" },
    summary: "Binary-searches the first version where a monotonic failure begins.",
  },
  {
    id: 34,
    name: "Ransom Note",
    type: "Hash Map",
    complexity: "O(n + m) time, O(k) space",
    requiresSortedInput: false,
    source: ransomNote.toString(),
    run: (note, magazine) => ransomNote(note, magazine),
    demo: { input: "aa", argument: "aab", argumentLabel: "Magazine" },
    summary: "Counts magazine characters and consumes one count for each note character.",
  },
  {
    id: 35,
    name: "Climbing Stairs",
    type: "Dynamic Programming",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: climbingStairs.toString(),
    run: (steps) => climbingStairs(steps),
    demo: { input: 5, argumentLabel: "Stairs" },
    summary: "Builds the number of ways to reach each step from the previous two.",
  },
  {
    id: 36,
    name: "Longest Palindrome",
    type: "Hash Map",
    complexity: "O(n) time, O(k) space",
    requiresSortedInput: false,
    source: longestPalindrome.toString(),
    run: (input) => longestPalindrome(input),
    demo: { input: "abccccdd" },
    summary: "Uses character frequencies to calculate the longest possible palindrome length.",
  },
  {
    id: 37,
    name: "Reverse Linked List",
    type: "Linked List",
    complexity: "O(n) time, O(n) space in this array demo",
    requiresSortedInput: false,
    source: reverseLinkedList.toString(),
    run: (values) => reverseLinkedList(values),
    demo: { input: [1, 2, 3, 4, 5] },
    summary: "Reverses the order of linked-list values.",
  },
  {
    id: 38,
    name: "Majority Element",
    type: "Array",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: majorityElement.toString(),
    run: (values) => majorityElement(values),
    demo: { input: [2, 2, 1, 1, 1, 2, 2] },
    summary: "Uses Boyer-Moore voting to find the value appearing more than half the time.",
  },
  {
    id: 39,
    name: "Add Binary",
    type: "String",
    complexity: "O(max(n, m)) time, O(max(n, m)) space",
    requiresSortedInput: false,
    source: addBinary.toString(),
    run: (first, second) => addBinary(first, second),
    demo: { input: "1010", argument: "1011", argumentLabel: "Second binary number" },
    summary: "Adds binary digits from right to left while carrying overflow.",
  },
  {
    id: 40,
    name: "Middle of the Linked List",
    type: "Linked List",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: middleOfLinkedList.toString(),
    run: (values) => middleOfLinkedList(values),
    demo: { input: [1, 2, 3, 4, 5] },
    summary: "Advances a fast pointer twice as quickly as a slow pointer to find the middle.",
  },
  {
    id: 41,
    name: "Coin Change",
    type: "Dynamic Programming",
    complexity: "O(amount × coins) time, O(amount) space",
    requiresSortedInput: false,
    source: coinChange.toString(),
    run: (coins, amount) => coinChange(coins, amount),
    demo: { input: [1, 2, 5], argument: 11, argumentLabel: "Amount" },
    summary: "Builds the fewest coins needed for every amount up to the target.",
  },
  {
    id: 42,
    name: "Product of Array Except Self",
    type: "Array",
    complexity: "O(n) time, O(1) extra space",
    requiresSortedInput: false,
    source: productOfArrayExceptSelf.toString(),
    run: (values) => productOfArrayExceptSelf(values),
    demo: { input: [1, 2, 3, 4] },
    summary: "Combines prefix and suffix products without using division.",
  },
  {
    id: 43,
    name: "Min Stack",
    type: "Stack",
    complexity: "O(1) per operation",
    requiresSortedInput: false,
    source: minStack.toString(),
    run: (operations) => minStack(operations),
    demo: { input: [["push", -2], ["push", 0], ["push", -3], ["getMin"], ["pop"], ["getMin"]] },
    summary: "Stores the current minimum alongside each stack value for constant-time lookup.",
  },
  {
    id: 44,
    name: "Validate Binary Search Tree",
    type: "Binary Search Tree",
    complexity: "O(n) time, O(h) space",
    requiresSortedInput: false,
    source: validateBinarySearchTree.toString(),
    run: (root) => validateBinarySearchTree(root),
    demo: { input: { value: 2, left: { value: 1, left: null, right: null }, right: { value: 3, left: null, right: null } } },
    summary: "Carries valid lower and upper bounds down every branch of the tree.",
  },
  {
    id: 45,
    name: "Number of Islands",
    type: "Graph",
    complexity: "O(rows × columns) time, O(rows × columns) space",
    requiresSortedInput: false,
    source: numberOfIslands.toString(),
    run: (grid) => numberOfIslands(grid),
    demo: { input: [["1", "1", "0", "0"], ["1", "0", "0", "1"], ["0", "0", "1", "1"]] },
    summary: "Counts connected land components by exploring and sinking each island.",
  },
  {
    id: 46,
    name: "Rotting Oranges",
    type: "Graph",
    complexity: "O(rows × columns) time, O(rows × columns) space",
    requiresSortedInput: false,
    source: rottingOranges.toString(),
    run: (grid) => rottingOranges(grid),
    demo: { input: [[2, 1, 1], [1, 1, 0], [0, 1, 1]] },
    summary: "Uses breadth-first search to spread rot level by level and count minutes.",
  },
  {
    id: 47,
    name: "Search in Rotated Sorted Array",
    type: "Binary Search",
    complexity: "O(log n)",
    requiresSortedInput: false,
    source: searchRotatedSortedArray.toString(),
    run: (values, target) => searchRotatedSortedArray(values, target),
    demo: { input: [4, 5, 6, 7, 0, 1, 2], argument: 0, argumentLabel: "Target" },
    summary: "Identifies the sorted half of a rotated array before narrowing the search.",
  },
  {
    id: 48,
    name: "Combination Sum",
    type: "Backtracking",
    complexity: "Exponential in the number of combinations",
    requiresSortedInput: false,
    source: combinationSum.toString(),
    run: (candidates, target) => combinationSum(candidates, target),
    demo: { input: [2, 3, 6, 7], argument: 7, argumentLabel: "Target" },
    summary: "Explores candidate choices recursively and backtracks after each combination.",
  },
  {
    id: 49,
    name: "Permutations",
    type: "Backtracking",
    complexity: "O(n × n!) time",
    requiresSortedInput: false,
    source: permutations.toString(),
    run: (values) => permutations(values),
    demo: { input: [1, 2, 3] },
    summary: "Builds every ordering by choosing each remaining value in turn.",
  },
  {
    id: 50,
    name: "Merge Intervals",
    type: "Intervals",
    complexity: "O(n log n)",
    requiresSortedInput: false,
    source: mergeIntervals.toString(),
    run: (intervals) => mergeIntervals(intervals),
    demo: { input: [[1, 3], [2, 6], [8, 10], [9, 12]] },
    summary: "Sorts intervals by start and combines any overlapping neighbors.",
  },
  {
    id: 51,
    name: "Time Based Key-Value Store",
    type: "Hash Map",
    complexity: "O(1) set, O(n) get in this implementation",
    requiresSortedInput: false,
    source: timeBasedKeyValueStore.toString(),
    run: (operations) => timeBasedKeyValueStore(operations),
    demo: { input: [{ type: "set", key: "foo", value: "bar", timestamp: 1 }, { type: "set", key: "foo", value: "bar2", timestamp: 4 }, { type: "get", key: "foo", timestamp: 3 }, { type: "get", key: "foo", timestamp: 5 }] },
    summary: "Stores timestamped values and returns the newest value available at a requested time.",
  },
  {
    id: 52,
    name: "Accounts Merge",
    type: "Graph",
    complexity: "O(n log n) plus email graph traversal",
    requiresSortedInput: false,
    source: accountsMerge.toString(),
    run: (accounts) => accountsMerge(accounts),
    demo: { input: [["John", "johnsmith@mail.com", "john00@mail.com"], ["John", "johnnybravo@mail.com"], ["John", "johnsmith@mail.com", "john_newyork@mail.com"], ["Mary", "mary@mail.com"]] },
    summary: "Connects accounts through shared emails and collects each connected component.",
  },
  {
    id: 53,
    name: "Sort Colors",
    type: "Array",
    complexity: "O(n) time, O(1) extra space",
    requiresSortedInput: false,
    source: sortColors.toString(),
    run: (values) => sortColors(values),
    demo: { input: [2, 0, 2, 1, 1, 0] },
    summary: "Uses the Dutch national flag technique to partition 0s, 1s, and 2s.",
  },
  {
    id: 54,
    name: "Word Break",
    type: "Dynamic Programming",
    complexity: "O(n × dictionary size)",
    requiresSortedInput: false,
    source: wordBreak.toString(),
    run: (input, dictionary) => wordBreak(input, dictionary),
    demo: { input: "leetcode", argument: ["leet", "code"], argumentLabel: "Dictionary" },
    summary: "Checks whether a string can be segmented into dictionary words.",
  },
  {
    id: 55,
    name: "String to Integer (atoi)",
    type: "String",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: stringToIntegerAtoi.toString(),
    run: (input) => stringToIntegerAtoi(input),
    demo: { input: "   -42 with words" },
    summary: "Parses an optional sign and leading digits, clamping to signed 32-bit range.",
  },
  {
    id: 56,
    name: "Subsets",
    type: "Backtracking",
    complexity: "O(n × 2ⁿ)",
    requiresSortedInput: false,
    source: subsets.toString(),
    run: (values) => subsets(values),
    demo: { input: [1, 2, 3] },
    summary: "Adds each value to every subset already constructed.",
  },
  {
    id: 57,
    name: "Binary Tree Right Side View",
    type: "Binary Tree",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: binaryTreeRightSideView.toString(),
    run: (root) => binaryTreeRightSideView(root),
    demo: { input: { value: 1, left: { value: 2, left: null, right: { value: 5, left: null, right: null } }, right: { value: 3, left: null, right: { value: 4, left: null, right: null } } } },
    summary: "Visits each tree level and records the rightmost node.",
  },
  {
    id: 58,
    name: "Longest Palindromic Substring",
    type: "String",
    complexity: "O(n²) time, O(1) extra space",
    requiresSortedInput: false,
    source: longestPalindromicSubstring.toString(),
    run: (input) => longestPalindromicSubstring(input),
    demo: { input: "babad" },
    summary: "Expands around every possible palindrome center and keeps the longest result.",
  },
  {
    id: 59,
    name: "Unique Paths",
    type: "Dynamic Programming",
    complexity: "O(rows × columns) time, O(columns) space",
    requiresSortedInput: false,
    source: uniquePaths.toString(),
    run: (rows, columns) => uniquePaths(rows, columns),
    demo: { input: 3, argument: 7, argumentLabel: "Columns" },
    summary: "Builds path counts row by row using the paths from above and the left.",
  },
  {
    id: 60,
    name: "Construct Binary Tree from Preorder and Inorder Traversal",
    type: "Binary Tree",
    complexity: "O(n²) time in this implementation",
    requiresSortedInput: false,
    source: constructBinaryTree.toString(),
    run: (preorder, inorder) => constructBinaryTree(preorder, inorder),
    demo: { input: [3, 9, 20, 15, 7], argument: [9, 3, 15, 20, 7], argumentLabel: "Inorder traversal" },
    summary: "Uses the preorder root and inorder split to recursively rebuild the tree.",
  },
  {
    id: 61,
    name: "Container With Most Water",
    type: "Two Pointers",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: containerWithMostWater.toString(),
    run: (heights) => containerWithMostWater(heights),
    demo: { input: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
    summary: "Moves the shorter boundary inward while tracking the largest container area.",
  },
  {
    id: 62,
    name: "Letter Combinations of a Phone Number",
    type: "Backtracking",
    complexity: "O(4ⁿ × n)",
    requiresSortedInput: false,
    source: letterCombinationsOfPhoneNumber.toString(),
    run: (digits) => letterCombinationsOfPhoneNumber(digits),
    demo: { input: "23" },
    summary: "Builds every possible letter combination represented by the phone digits.",
  },
  {
    id: 63,
    name: "Word Search",
    type: "Backtracking",
    complexity: "O(rows × columns × 4ˡ)",
    requiresSortedInput: false,
    source: wordSearch.toString(),
    run: (board, word) => wordSearch(board, word),
    demo: { input: [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], argument: "ABCCED", argumentLabel: "Word" },
    summary: "Backtracks through adjacent cells while marking the current path.",
  },
  {
    id: 64,
    name: "Find All Anagrams in a String",
    type: "Sliding Window",
    complexity: "O(n) time, O(k) space",
    requiresSortedInput: false,
    source: findAllAnagrams.toString(),
    run: (input, pattern) => findAllAnagrams(input, pattern),
    demo: { input: "cbaebabacd", argument: "abc", argumentLabel: "Pattern" },
    summary: "Maintains character counts for a fixed-size window and records matching windows.",
  },
  {
    id: 65,
    name: "Minimum Size Subarray Sum",
    type: "Sliding Window",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: minimumSizeSubarraySum.toString(),
    run: (target, values) => minimumSizeSubarraySum(target, values),
    demo: { input: 7, argument: [2, 3, 1, 2, 4, 3], argumentLabel: "Positive values" },
    summary: "Shrinks a moving window whenever its sum reaches the target.",
  },
  {
    id: 66,
    name: "Spiral Matrix",
    type: "Matrix",
    complexity: "O(rows × columns) time, O(1) extra space",
    requiresSortedInput: false,
    source: spiralMatrix.toString(),
    run: (matrix) => spiralMatrix(matrix),
    demo: { input: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
    summary: "Peels the matrix layer by layer from the outside toward the center.",
  },
  {
    id: 67,
    name: "Subset Sum",
    type: "Dynamic Programming",
    complexity: "O(n × target) time, O(target) space",
    requiresSortedInput: false,
    source: subsetSum.toString(),
    run: (values, target) => subsetSum(values, target),
    demo: { input: [3, 34, 4, 12, 5, 2], argument: 9, argumentLabel: "Target sum" },
    summary: "Tracks which sums can be formed while processing each value once.",
  },
  {
    id: 68,
    name: "Partition Equal Subset Sum",
    type: "Dynamic Programming",
    complexity: "O(n × sum) time, O(sum) space",
    requiresSortedInput: false,
    source: partitionEqualSubsetSum.toString(),
    run: (values) => partitionEqualSubsetSum(values),
    demo: { input: [1, 5, 11, 5] },
    summary: "Checks whether the numbers can form two subsets with the same total.",
  },
  {
    id: 69,
    name: "Decode Ways",
    type: "Dynamic Programming",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: decodeWays.toString(),
    run: (input) => decodeWays(input),
    demo: { input: "226" },
    summary: "Counts valid one-digit and two-digit decodings while scanning the message.",
  },
  {
    id: 70,
    name: "Unique Binary Search Trees",
    type: "Dynamic Programming",
    complexity: "O(n²) time, O(n) space",
    requiresSortedInput: false,
    source: uniqueBinarySearchTrees.toString(),
    run: (n) => uniqueBinarySearchTrees(n),
    demo: { input: 3 },
    summary: "Uses Catalan-number recurrence to count structurally unique BSTs.",
  },
  {
    id: 71,
    name: "House Robber",
    type: "Dynamic Programming",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: houseRobber.toString(),
    run: (values) => houseRobber(values),
    demo: { input: [2, 7, 9, 3, 1] },
    summary: "Chooses between robbing the current house and keeping the previous best.",
  },
  {
    id: 72,
    name: "House Robber II",
    type: "Dynamic Programming",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: houseRobberII.toString(),
    run: (values) => houseRobberII(values),
    demo: { input: [2, 3, 2] },
    summary: "Solves two linear robber problems because the first and last houses are adjacent.",
  },
  {
    id: 73,
    name: "Longest Increasing Subsequence",
    type: "Dynamic Programming",
    complexity: "O(n log n) time, O(n) space",
    requiresSortedInput: false,
    source: longestIncreasingSubsequence.toString(),
    run: (values) => longestIncreasingSubsequence(values),
    demo: { input: [10, 9, 2, 5, 3, 7, 101, 18] },
    summary: "Maintains the smallest possible tail for every increasing subsequence length.",
  },
  {
    id: 74,
    name: "Longest Common Subsequence",
    type: "Dynamic Programming",
    complexity: "O(n × m) time, O(m) space",
    requiresSortedInput: false,
    source: longestCommonSubsequence.toString(),
    run: (first, second) => longestCommonSubsequence(first, second),
    demo: { input: "abcde", argument: "ace", argumentLabel: "Second string" },
    summary: "Builds subsequence lengths using matching characters and prior prefixes.",
  },
  {
    id: 75,
    name: "Edit Distance",
    type: "Dynamic Programming",
    complexity: "O(n × m) time, O(m) space",
    requiresSortedInput: false,
    source: editDistance.toString(),
    run: (first, second) => editDistance(first, second),
    demo: { input: "horse", argument: "ros", argumentLabel: "Second string" },
    summary: "Finds the minimum insertions, deletions, and substitutions between strings.",
  },
  {
    id: 76,
    name: "Distinct Subsequences",
    type: "Dynamic Programming",
    complexity: "O(n × m) time, O(m) space",
    requiresSortedInput: false,
    source: distinctSubsequences.toString(),
    run: (source, target) => distinctSubsequences(source, target),
    demo: { input: "rabbbit", argument: "rabbit", argumentLabel: "Target" },
    summary: "Counts target formations by either using or skipping each source character.",
  },
  {
    id: 77,
    name: "Maximal Square",
    type: "Dynamic Programming",
    complexity: "O(rows × columns) time, O(columns) space",
    requiresSortedInput: false,
    source: maximalSquare.toString(),
    run: (matrix) => maximalSquare(matrix),
    demo: { input: [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]] },
    summary: "Tracks the largest square ending at each matrix cell.",
  },
  {
    id: 78,
    name: "Trapping Rain Water",
    type: "Two Pointers",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: trappingRainWater.toString(),
    run: (heights) => trappingRainWater(heights),
    demo: { input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
    summary: "Uses left and right boundaries to measure trapped water without extra arrays.",
  },
  {
    id: 79,
    name: "Sliding Window Maximum",
    type: "Sliding Window",
    complexity: "O(n) time, O(k) space",
    requiresSortedInput: false,
    source: slidingWindowMaximum.toString(),
    run: (values, windowSize) => slidingWindowMaximum(values, windowSize),
    demo: { input: [1, 3, -1, -3, 5, 3, 6, 7], argument: 3, argumentLabel: "Window size" },
    summary: "Maintains a decreasing deque so the front is each window's maximum.",
  },
  {
    id: 80,
    name: "Minimum Window Substring",
    type: "Sliding Window",
    complexity: "O(n) time, O(k) space",
    requiresSortedInput: false,
    source: minimumWindowSubstring.toString(),
    run: (source, target) => minimumWindowSubstring(source, target),
    demo: { input: "ADOBECODEBANC", argument: "ABC", argumentLabel: "Target" },
    summary: "Expands and contracts a window until it contains every required character.",
  },
  {
    id: 81,
    name: "Serialize and Deserialize Binary Tree",
    type: "Binary Tree",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: serializeAndDeserializeBinaryTree.toString(),
    run: (root) => serializeAndDeserializeBinaryTree(root),
    demo: { input: { value: 1, left: { value: 2, left: null, right: null }, right: { value: 3, left: { value: 4, left: null, right: null }, right: { value: 5, left: null, right: null } } } },
    summary: "Encodes a tree with preorder null markers and reconstructs it from that sequence.",
  },
  {
    id: 82,
    name: "Binary Tree Maximum Path Sum",
    type: "Binary Tree",
    complexity: "O(n) time, O(h) space",
    requiresSortedInput: false,
    source: binaryTreeMaximumPathSum.toString(),
    run: (root) => binaryTreeMaximumPathSum(root),
    demo: { input: { value: -10, left: { value: 9, left: null, right: null }, right: { value: 20, left: { value: 15, left: null, right: null }, right: { value: 7, left: null, right: null } } } },
    summary: "Returns the best downward gain while tracking the best path through each node.",
  },
  {
    id: 83,
    name: "Merge k Sorted Lists",
    type: "Linked List",
    complexity: "O(n log n) time in this array demo",
    requiresSortedInput: false,
    source: mergeKSortedLists.toString(),
    run: (lists) => mergeKSortedLists(lists),
    demo: { input: [[1, 4, 5], [1, 3, 4], [2, 6]] },
    summary: "Combines values from multiple sorted lists into one sorted list.",
  },
  {
    id: 84,
    name: "Reverse Nodes in k-Group",
    type: "Linked List",
    complexity: "O(n) time, O(1) extra space in a linked-list implementation",
    requiresSortedInput: false,
    source: reverseNodesInKGroup.toString(),
    run: (values, groupSize) => reverseNodesInKGroup(values, groupSize),
    demo: { input: [1, 2, 3, 4, 5], argument: 2, argumentLabel: "Group size" },
    summary: "Reverses complete groups of k nodes while leaving an incomplete tail unchanged.",
  },
  {
    id: 85,
    name: "Sudoku Solver",
    type: "Backtracking",
    complexity: "Exponential worst case",
    requiresSortedInput: false,
    source: sudokuSolver.toString(),
    run: (board) => sudokuSolver(board),
    demo: { input: [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]] },
    summary: "Fills empty cells with backtracking while enforcing row, column, and box constraints.",
  },
  {
    id: 86,
    name: "N-Queens",
    type: "Backtracking",
    complexity: "O(n!) time",
    requiresSortedInput: false,
    source: nQueens.toString(),
    run: (n) => nQueens(n),
    demo: { input: 4 },
    summary: "Places queens row by row while tracking occupied columns and diagonals.",
  },
  {
    id: 87,
    name: "Word Ladder",
    type: "Graph",
    complexity: "O(n × word length × alphabet)",
    requiresSortedInput: false,
    source: wordLadder.toString(),
    run: (begin, end, words) => wordLadder(begin, end, words),
    demo: { input: "hit", args: ["cog", ["hot", "dot", "dog", "lot", "log", "cog"]] },
    summary: "Uses breadth-first search to find the shortest one-letter transformation sequence.",
  },
  {
    id: 88,
    name: "Basic Calculator",
    type: "Stack",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: basicCalculator.toString(),
    run: (expression) => basicCalculator(expression),
    demo: { input: "(1+(4+5+2)-3)+(6+8)" },
    summary: "Evaluates addition, subtraction, and parentheses with a sign stack.",
  },
  {
    id: 89,
    name: "Expression Add Operators",
    type: "Backtracking",
    complexity: "Exponential in the number of digits",
    requiresSortedInput: false,
    source: expressionAddOperators.toString(),
    run: (input, target) => expressionAddOperators(input, target),
    demo: { input: "123", argument: 6, argumentLabel: "Target" },
    summary: "Tries operator placements and tracks the previous term for multiplication precedence.",
  },
  {
    id: 90,
    name: "Remove Invalid Parentheses",
    type: "Breadth-First Search",
    complexity: "Exponential worst case",
    requiresSortedInput: false,
    source: removeInvalidParentheses.toString(),
    run: (input) => removeInvalidParentheses(input),
    demo: { input: "()())()" },
    summary: "Removes the fewest parentheses by exploring candidate strings level by level.",
  },
  {
    id: 91,
    name: "Palindromic Substrings",
    type: "String",
    complexity: "O(n²) time, O(1) space",
    requiresSortedInput: false,
    source: palindromicSubstrings.toString(),
    run: (input) => palindromicSubstrings(input),
    demo: { input: "aaa" },
    summary: "Expands around every center to count all palindromic substrings.",
  },
  {
    id: 92,
    name: "Counting Bits",
    type: "Bit Manipulation",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: countingBits.toString(),
    run: (n) => countingBits(n),
    demo: { input: 5 },
    summary: "Reuses the bit count of a number shifted right by one position.",
  },
  {
    id: 93,
    name: "Top K Frequent Elements",
    type: "Heap",
    complexity: "O(n log n) in this sorting implementation",
    requiresSortedInput: false,
    source: topKFrequentElements.toString(),
    run: (values, k) => topKFrequentElements(values, k),
    demo: { input: [1, 1, 1, 2, 2, 3], argument: 2, argumentLabel: "K" },
    summary: "Counts values and returns the k values with the highest frequencies.",
  },
  {
    id: 94,
    name: "Kth Largest Element in an Array",
    type: "Selection",
    complexity: "O(n log n) in this sorting implementation",
    requiresSortedInput: false,
    source: kthLargestElement.toString(),
    run: (values, k) => kthLargestElement(values, k),
    demo: { input: [3, 2, 1, 5, 6, 4], argument: 2, argumentLabel: "K" },
    summary: "Sorts values in descending order and selects the kth position.",
  },
  {
    id: 95,
    name: "Find Median from Data Stream",
    type: "Heap",
    complexity: "O(n log n) per add in this sorted-array implementation",
    requiresSortedInput: false,
    source: findMedianFromDataStream.toString(),
    run: (operations) => findMedianFromDataStream(operations),
    demo: { input: [["add", 1], ["add", 2], ["median"], ["add", 3], ["median"]] },
    summary: "Maintains an ordered stream and reads the middle value or middle pair.",
  },
  {
    id: 96,
    name: "Longest Consecutive Sequence",
    type: "Hash Set",
    complexity: "O(n) average time, O(n) space",
    requiresSortedInput: false,
    source: longestConsecutiveSequence.toString(),
    run: (values) => longestConsecutiveSequence(values),
    demo: { input: [100, 4, 200, 1, 3, 2] },
    summary: "Starts sequences only at values without a predecessor.",
  },
  {
    id: 97,
    name: "Gas Station",
    type: "Greedy",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: gasStation.toString(),
    run: (gas, cost) => gasStation(gas, cost),
    demo: { input: [1, 2, 3, 4, 5], argument: [3, 4, 5, 1, 2], argumentLabel: "Travel costs" },
    summary: "Resets the starting station whenever the running fuel becomes negative.",
  },
  {
    id: 98,
    name: "Next Permutation",
    type: "Array",
    complexity: "O(n) time, O(1) extra space",
    requiresSortedInput: false,
    source: nextPermutation.toString(),
    run: (values) => nextPermutation(values),
    demo: { input: [1, 2, 3] },
    summary: "Finds a rightmost pivot, swaps its successor, and reverses the suffix.",
  },
  {
    id: 99,
    name: "LRU Cache",
    type: "Cache",
    complexity: "O(1) average per operation",
    requiresSortedInput: false,
    source: lruCache.toString(),
    run: (operations, capacity) => lruCache(operations, capacity),
    demo: { input: [["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["get", 3]], argument: 2, argumentLabel: "Capacity" },
    summary: "Uses Map insertion order to evict the least recently used key.",
  },
  {
    id: 100,
    name: "LFU Cache",
    type: "Cache",
    complexity: "O(n log n) per eviction in this simple implementation",
    requiresSortedInput: false,
    source: lfuCache.toString(),
    run: (operations, capacity) => lfuCache(operations, capacity),
    demo: { input: [["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["get", 3]], argument: 2, argumentLabel: "Capacity" },
    summary: "Evicts the least frequently used key, breaking ties by least recent use.",
  },
  {
    id: 101,
    name: "Spy Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: spyNumber.toString(),
    run: (number) => spyNumber(number),
    demo: { input: 123 },
    summary: "Checks whether a number's digit sum equals its digit product.",
  },
  {
    id: 102,
    name: "Neon Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: neonNumber.toString(),
    run: (number) => neonNumber(number),
    demo: { input: 9 },
    summary: "Checks whether the digit sum of a number's square equals the number.",
  },
  {
    id: 103,
    name: "Evil Number",
    type: "Number Theory",
    complexity: "O(log n) time, O(log n) space",
    requiresSortedInput: false,
    source: evilNumber.toString(),
    run: (number) => evilNumber(number),
    demo: { input: 3 },
    summary: "Checks whether the binary representation contains an even number of ones.",
  },
  {
    id: 104,
    name: "Armstrong Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: armstrongNumber.toString(),
    run: (number) => armstrongNumber(number),
    demo: { input: 153 },
    summary: "Checks whether digit powers sum back to the original number.",
  },
  {
    id: 105,
    name: "Perfect Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: perfectNumber.toString(),
    run: (number) => perfectNumber(number),
    demo: { input: 6 },
    summary: "Checks whether proper divisors sum exactly to the number.",
  },
  {
    id: 106,
    name: "Happy Number",
    type: "Number Theory",
    complexity: "O(cycle length × d) time, O(cycle length) space",
    requiresSortedInput: false,
    source: happyNumber.toString(),
    run: (number) => happyNumber(number),
    demo: { input: 19 },
    summary: "Detects whether repeated digit-square sums eventually reach one.",
  },
  {
    id: 107,
    name: "Sad Number",
    type: "Number Theory",
    complexity: "O(cycle length × d) time, O(cycle length) space",
    requiresSortedInput: false,
    source: sadNumber.toString(),
    run: (number) => sadNumber(number),
    demo: { input: 4 },
    summary: "Detects whether repeated digit-square sums enter a loop without reaching one.",
  },
  {
    id: 108,
    name: "Harshad Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: harshadNumber.toString(),
    run: (number) => harshadNumber(number),
    demo: { input: 18 },
    summary: "Checks whether a number is divisible by the sum of its digits.",
  },
  {
    id: 109,
    name: "Abundant Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: abundantNumber.toString(),
    run: (number) => abundantNumber(number),
    demo: { input: 12 },
    summary: "Checks whether proper divisors sum to more than the number.",
  },
  {
    id: 110,
    name: "Deficient Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: deficientNumber.toString(),
    run: (number) => deficientNumber(number),
    demo: { input: 8 },
    summary: "Checks whether proper divisors sum to less than the number.",
  },
  {
    id: 111,
    name: "Amicable Numbers",
    type: "Number Theory",
    complexity: "O(√a + √b) time, O(1) space",
    requiresSortedInput: false,
    source: amicableNumbers.toString(),
    run: (first, second) => amicableNumbers(first, second),
    demo: { input: 220, argument: 284, argumentLabel: "Second number" },
    summary: "Checks whether each number equals the other's proper-divisor sum.",
  },
  {
    id: 112,
    name: "Automorphic Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: automorphicNumber.toString(),
    run: (number) => automorphicNumber(number),
    demo: { input: 25 },
    summary: "Checks whether a number's square ends with the number itself.",
  },
  {
    id: 113,
    name: "Fibonacci Number",
    type: "Number Theory",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: fibonacciNumber.toString(),
    run: (number) => fibonacciNumber(number),
    demo: { input: 13 },
    summary: "Generates the Fibonacci sequence until it reaches or passes the number.",
  },
  {
    id: 114,
    name: "Lucas Number",
    type: "Number Theory",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: lucasNumber.toString(),
    run: (number) => lucasNumber(number),
    demo: { input: 11 },
    summary: "Checks membership in the sequence beginning with 2 and 1.",
  },
  {
    id: 115,
    name: "Palindromic Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: palindromicNumber.toString(),
    run: (number) => palindromicNumber(number),
    demo: { input: 1331 },
    summary: "Checks whether a number reads identically from both directions.",
  },
  {
    id: 116,
    name: "Prime Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: primeNumber.toString(),
    run: (number) => primeNumber(number),
    demo: { input: 29 },
    summary: "Tests divisibility only through the square root of the number.",
  },
  {
    id: 117,
    name: "Composite Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: compositeNumber.toString(),
    run: (number) => compositeNumber(number),
    demo: { input: 4 },
    summary: "Checks whether a positive integer is neither one nor prime.",
  },
  {
    id: 118,
    name: "Twin Primes",
    type: "Number Theory",
    complexity: "O(√max(a, b)) time, O(1) space",
    requiresSortedInput: false,
    source: twinPrimes.toString(),
    run: (first, second) => twinPrimes(first, second),
    demo: { input: 11, argument: 13, argumentLabel: "Second prime" },
    summary: "Checks whether two different primes differ by exactly two.",
  },
  {
    id: 119,
    name: "Mersenne Prime",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: mersennePrime.toString(),
    run: (number) => mersennePrime(number),
    demo: { input: 7 },
    summary: "Checks whether a prime is one less than a power of two.",
  },
  {
    id: 120,
    name: "Square Number",
    type: "Number Theory",
    complexity: "O(1) time, O(1) space",
    requiresSortedInput: false,
    source: squareNumber.toString(),
    run: (number) => squareNumber(number),
    demo: { input: 16 },
    summary: "Checks whether an integer has an integer square root.",
  },
  {
    id: 121,
    name: "Cubic Number",
    type: "Number Theory",
    complexity: "O(1) time, O(1) space",
    requiresSortedInput: false,
    source: cubicNumber.toString(),
    run: (number) => cubicNumber(number),
    demo: { input: 27 },
    summary: "Checks whether a number is the cube of an integer.",
  },
  {
    id: 122,
    name: "Triangular Number",
    type: "Number Theory",
    complexity: "O(1) time, O(1) space",
    requiresSortedInput: false,
    source: triangularNumber.toString(),
    run: (number) => triangularNumber(number),
    demo: { input: 10 },
    summary: "Uses the 8n + 1 test to check membership in the triangular sequence.",
  },
  {
    id: 123,
    name: "Smith Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(log n) space",
    requiresSortedInput: false,
    source: smithNumber.toString(),
    run: (number) => smithNumber(number),
    demo: { input: 4937775 },
    summary: "Compares a composite number's digit sum with the digit sums of its prime factors.",
  },
  {
    id: 124,
    name: "Kaprekar Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: kaprekarNumber.toString(),
    run: (number) => kaprekarNumber(number),
    demo: { input: 45 },
    summary: "Splits a square into two parts whose sum equals the original number.",
  },
  {
    id: 125,
    name: "Disarium Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: disariumNumber.toString(),
    run: (number) => disariumNumber(number),
    demo: { input: 135 },
    summary: "Raises each digit to its one-based position and compares the total with the number.",
  },
  {
    id: 126,
    name: "Pronic Number",
    type: "Number Theory",
    complexity: "O(1) time, O(1) space",
    requiresSortedInput: false,
    source: pronicNumber.toString(),
    run: (number) => pronicNumber(number),
    demo: { input: 12 },
    summary: "Checks whether a number is the product of two consecutive integers.",
  },
  {
    id: 127,
    name: "Catalan Number",
    type: "Number Theory",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: catalanNumber.toString(),
    run: (number) => catalanNumber(number),
    demo: { input: 42 },
    summary: "Checks membership in the Catalan sequence using its recurrence.",
  },
  {
    id: 128,
    name: "Factorial Number",
    type: "Number Theory",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: factorialNumber.toString(),
    run: (number) => factorialNumber(number),
    demo: { input: 120 },
    summary: "Checks whether a number equals n factorial for some positive integer n.",
  },
  {
    id: 129,
    name: "Strong Number",
    type: "Number Theory",
    complexity: "O(d × 10) time, O(1) space",
    requiresSortedInput: false,
    source: strongNumber.toString(),
    run: (number) => strongNumber(number),
    demo: { input: 145 },
    summary: "Checks whether the factorials of the digits sum to the original number.",
  },
  {
    id: 130,
    name: "Magic Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: magicNumber.toString(),
    run: (number) => magicNumber(number),
    demo: { input: 1729 },
    summary: "Repeatedly adds digits and checks whether the single digit becomes one.",
  },
  {
    id: 131,
    name: "Collatz Sequence",
    type: "Number Theory",
    complexity: "O(sequence length) time, O(sequence length) space",
    requiresSortedInput: false,
    source: collatzSequence.toString(),
    run: (number) => collatzSequence(number),
    demo: { input: 6 },
    summary: "Generates the 3n + 1 sequence until it reaches one.",
  },
  {
    id: 132,
    name: "Ulam Number",
    type: "Number Theory",
    complexity: "O(n³) in this direct generator",
    requiresSortedInput: false,
    source: ulamNumber.toString(),
    run: (number) => ulamNumber(number),
    demo: { input: 11 },
    summary: "Generates the Ulam sequence and checks whether the number appears in it.",
  },
  {
    id: 133,
    name: "Semi-Prime Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: semiPrimeNumber.toString(),
    run: (number) => semiPrimeNumber(number),
    demo: { input: 15 },
    summary: "Checks whether a number is the product of exactly two prime factors.",
  },
  {
    id: 134,
    name: "Taxicab Number",
    type: "Number Theory",
    complexity: "O(n^(2/3)) time, O(1) space",
    requiresSortedInput: false,
    source: taxicabNumber.toString(),
    run: (number) => taxicabNumber(number),
    demo: { input: 1729 },
    summary: "Checks whether a number has at least two representations as sums of two positive cubes.",
  },
  {
    id: 135,
    name: "Keith Number",
    type: "Number Theory",
    complexity: "O(sequence length × d)",
    requiresSortedInput: false,
    source: keithNumber.toString(),
    run: (number) => keithNumber(number),
    demo: { input: 14 },
    summary: "Starts a Fibonacci-like sequence with the number's digits and checks for the number.",
  },
  {
    id: 136,
    name: "Odish Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: odishNumber.toString(),
    run: (number) => odishNumber(number),
    demo: { input: 12 },
    summary: "Checks whether the sum of the digits is odd.",
  },
  {
    id: 137,
    name: "Evenish Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: evenishNumber.toString(),
    run: (number) => evenishNumber(number),
    demo: { input: 13 },
    summary: "Checks whether the sum of the digits is even.",
  },
  {
    id: 138,
    name: "Duck Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: duckNumber.toString(),
    run: (number) => duckNumber(number),
    demo: { input: 102 },
    summary: "Checks whether the decimal representation contains a non-leading zero.",
  },
  {
    id: 139,
    name: "Cyclic Number",
    type: "Number Theory",
    complexity: "O(d²) time, O(d) space",
    requiresSortedInput: false,
    source: cyclicNumber.toString(),
    run: (number) => cyclicNumber(number),
    demo: { input: 142857 },
    summary: "Checks whether products by successive multipliers are digit rotations.",
  },
  {
    id: 140,
    name: "Friedman Number",
    type: "Number Theory",
    complexity: "Exponential in the number of digits",
    requiresSortedInput: false,
    source: friedmanNumber.toString(),
    run: (number) => friedmanNumber(number),
    demo: { input: 25 },
    summary: "Checks whether the number can be recreated from all of its digits using arithmetic.",
  },
  {
    id: 141,
    name: "Goldbach's Conjecture",
    type: "Number Theory",
    complexity: "O(n√n) time, O(1) space",
    requiresSortedInput: false,
    source: goldbachConjecture.toString(),
    run: (number) => goldbachConjecture(number),
    demo: { input: 18 },
    summary: "Checks whether an even number can be expressed as a sum of two primes.",
  },
  {
    id: 142,
    name: "Circular Prime",
    type: "Number Theory",
    complexity: "O(d√n) time, O(d) space",
    requiresSortedInput: false,
    source: circularPrime.toString(),
    run: (number) => circularPrime(number),
    demo: { input: 197 },
    summary: "Checks whether every cyclic rotation of a prime is also prime.",
  },
  {
    id: 143,
    name: "Smarandache-Wellin Number",
    type: "Number Theory",
    complexity: "Depends on the generated prime prefix length",
    requiresSortedInput: false,
    source: smarandacheWellinNumber.toString(),
    run: (number) => smarandacheWellinNumber(number),
    demo: { input: 235711 },
    summary: "Checks whether a number is formed by concatenating consecutive primes.",
  },
  {
    id: 144,
    name: "Untouchable Number",
    type: "Number Theory",
    complexity: "O(n√n) time in this bounded search",
    requiresSortedInput: false,
    source: untouchableNumber.toString(),
    run: (number) => untouchableNumber(number),
    demo: { input: 5 },
    summary: "Checks whether no tested integer has this number as its proper-divisor sum.",
  },
  {
    id: 145,
    name: "Practical Number",
    type: "Number Theory",
    complexity: "O(n²) time in this subset-sum implementation",
    requiresSortedInput: false,
    source: practicalNumber.toString(),
    run: (number) => practicalNumber(number),
    demo: { input: 6 },
    summary: "Checks whether every smaller positive integer can be formed from distinct divisors.",
  },
  {
    id: 146,
    name: "Symmetric Number",
    type: "Number Theory",
    complexity: "O(d) time, O(d) space",
    requiresSortedInput: false,
    source: symmetricNumber.toString(),
    run: (number) => symmetricNumber(number),
    demo: { input: 404 },
    summary: "Checks whether the digits are symmetric around the center.",
  },
  {
    id: 147,
    name: "Abundant Power Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: abundantPowerNumber.toString(),
    run: (number) => abundantPowerNumber(number),
    demo: { input: 36 },
    summary: "Checks whether a number is both powerful and abundant.",
  },
  {
    id: 148,
    name: "Woodall Number",
    type: "Number Theory",
    complexity: "O(log n) time, O(1) space",
    requiresSortedInput: false,
    source: woodallNumber.toString(),
    run: (number) => woodallNumber(number),
    demo: { input: 7 },
    summary: "Checks whether a number has the form n × 2ⁿ − 1.",
  },
  {
    id: 149,
    name: "Cullen Number",
    type: "Number Theory",
    complexity: "O(log n) time, O(1) space",
    requiresSortedInput: false,
    source: cullenNumber.toString(),
    run: (number) => cullenNumber(number),
    demo: { input: 9 },
    summary: "Checks whether a number has the form n × 2ⁿ + 1.",
  },
  {
    id: 150,
    name: "Sphenic Number",
    type: "Number Theory",
    complexity: "O(√n) time, O(1) space",
    requiresSortedInput: false,
    source: sphenicNumber.toString(),
    run: (number) => sphenicNumber(number),
    demo: { input: 30 },
    summary: "Checks whether a number is the product of three distinct primes.",
  },
  {
    id: 151,
    name: "Fourier Series Coefficient",
    type: "Harmonic Analysis",
    complexity: "O(N) time, O(1) extra space",
    requiresSortedInput: false,
    source: fourierSeriesCoefficient.toString(),
    run: (samples, harmonic) => fourierSeriesCoefficient(samples, harmonic),
    demo: { input: [1, 0, -1, 0], argument: 1, argumentLabel: "Harmonic n" },
    summary: "Approximates cₙ by sampling f(x)e⁻ⁱⁿˣ uniformly over one period.",
  },
  {
    id: 152,
    name: "Continuous Fourier Transform",
    type: "Harmonic Analysis",
    complexity: "O(N) time, O(1) extra space",
    requiresSortedInput: false,
    source: continuousFourierTransform.toString(),
    run: (samples, frequency) => continuousFourierTransform(samples, frequency),
    demo: { input: [1, 0, -1, 0], argument: 0.25, argumentLabel: "Frequency ξ" },
    summary: "Approximates the continuous transform using uniformly spaced samples.",
  },
  {
    id: 153,
    name: "Inverse Fourier Transform",
    type: "Harmonic Analysis",
    complexity: "O(N) time, O(1) extra space",
    requiresSortedInput: false,
    source: inverseFourierTransform.toString(),
    run: (spectrum, position) => inverseFourierTransform(spectrum, position),
    demo: { input: [{ real: 1, imaginary: 0 }, { real: 0, imaginary: 0 }], argument: 0, argumentLabel: "Position x" },
    summary: "Reconstructs a sampled value by summing spectrum components with positive phases.",
  },
  {
    id: 154,
    name: "Convolution Theorem",
    type: "Harmonic Analysis",
    complexity: "O(N²) time in this educational DFT implementation",
    requiresSortedInput: false,
    source: convolutionTheorem.toString(),
    run: (first, second) => convolutionTheorem(first, second),
    demo: { input: [1, 2], argument: [3, 4], argumentLabel: "Second signal" },
    summary: "Compares direct convolution with the inverse transform of multiplied transforms.",
  },
  {
    id: 155,
    name: "RSA Key Calculation",
    type: "Cryptography",
    complexity: "O(1) arithmetic for the key formula",
    requiresSortedInput: false,
    source: rsaKeyCalculation.toString(),
    run: (firstPrime, secondPrime) => rsaKeyCalculation(firstPrime, secondPrime),
    demo: { input: 61, argument: 53, argumentLabel: "Second prime q" },
    summary: "Calculates the RSA modulus n and Euler totient φ(n) from two primes.",
  },
  {
    id: 156,
    name: "RSA Encryption",
    type: "Cryptography",
    complexity: "O(log e) modular multiplications",
    requiresSortedInput: false,
    source: rsaEncryption.toString(),
    run: (message, exponent, modulus) => rsaEncryption(message, exponent, modulus),
    demo: { input: 65, args: [17, 3233] },
    summary: "Raises a message to the public exponent using modular exponentiation.",
  },
  {
    id: 157,
    name: "RSA Decryption",
    type: "Cryptography",
    complexity: "O(log d) modular multiplications",
    requiresSortedInput: false,
    source: rsaDecryption.toString(),
    run: (ciphertext, privateExponent, modulus) => rsaDecryption(ciphertext, privateExponent, modulus),
    demo: { input: 2790, args: [2753, 3233] },
    summary: "Raises a ciphertext to the private exponent using modular exponentiation.",
  },
  {
    id: 158,
    name: "Diffie-Hellman Shared Secret",
    type: "Cryptography",
    complexity: "O(log a + log b) modular multiplications",
    requiresSortedInput: false,
    source: diffieHellmanSharedSecret.toString(),
    run: (generator, privateKeyA, privateKeyB, prime) =>
      diffieHellmanSharedSecret(generator, privateKeyA, privateKeyB, prime),
    demo: { input: 5, args: [6, 15, 23] },
    summary: "Computes the shared modular secret independently from both private keys.",
  },
  {
    id: 159,
    name: "Caesar Encryption",
    type: "Cryptography",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: caesarEncryption.toString(),
    run: (input, shift) => caesarEncryption(input, shift),
    demo: { input: "Attack at Dawn!", argument: 3, argumentLabel: "Shift" },
    summary: "Shifts alphabetic characters by a fixed amount while preserving case and punctuation.",
  },
  {
    id: 160,
    name: "Caesar Decryption",
    type: "Cryptography",
    complexity: "O(n) time, O(n) space",
    requiresSortedInput: false,
    source: caesarDecryption.toString(),
    run: (input, shift) => caesarDecryption(input, shift),
    demo: { input: "Dwwdfn dw Gdzq!", argument: 3, argumentLabel: "Shift" },
    summary: "Reverses a Caesar shift to recover the original message.",
  },
  {
    id: 161,
    name: "SHA-256 Hash",
    type: "Cryptography",
    complexity: "O(n) time, O(1) extra space",
    requiresSortedInput: false,
    source: sha256Hash.toString(),
    run: (input) => sha256Hash(input),
    demo: { input: "hello" },
    summary: "Creates a one-way SHA-256 digest; hashes cannot be decrypted.",
  },
  {
    id: 162,
    name: "Binary Heap",
    type: "Heap",
    complexity: "O(n) build time",
    requiresSortedInput: false,
    source: binaryHeap.toString(),
    run: (values) => binaryHeap(values),
    demo: { input: [9, 4, 7, 1, 0, 3] },
    summary: "Builds an array-based min heap by restoring parent-child ordering bottom-up.",
  },
  {
    id: 163,
    name: "Binomial Heap",
    type: "Priority Queue",
    complexity: "O(n log n) in this educational array representation",
    requiresSortedInput: false,
    source: binomialHeap.toString(),
    run: (values) => binomialHeap(values),
    demo: { input: [7, 3, 9, 1, 4] },
    summary: "Demonstrates ordered insertion, the core priority-queue behavior of a binomial heap.",
  },
  {
    id: 164,
    name: "Fibonacci Heap",
    type: "Priority Queue",
    complexity: "O(n²) in this simple extraction demonstration",
    requiresSortedInput: false,
    source: fibonacciHeap.toString(),
    run: (values) => fibonacciHeap(values),
    demo: { input: [7, 3, 9, 1, 4] },
    summary: "Demonstrates repeated minimum extraction from a collection of heap roots.",
  },
  {
    id: 165,
    name: "Leftist Heap",
    type: "Meldable Heap",
    complexity: "O((n + m) log(n + m)) in this array demonstration",
    requiresSortedInput: false,
    source: leftistHeap.toString(),
    run: (first, second) => leftistHeap(first, second),
    demo: { input: [1, 4, 7], argument: [2, 3, 8], argumentLabel: "Second heap" },
    summary: "Demonstrates melding two priority queues into one ordered result.",
  },
  {
    id: 166,
    name: "Skew Heap",
    type: "Meldable Heap",
    complexity: "O(n²) in this simple extraction demonstration",
    requiresSortedInput: false,
    source: skewHeap.toString(),
    run: (first, second) => skewHeap(first, second),
    demo: { input: [1, 4, 7], argument: [2, 3, 8], argumentLabel: "Second heap" },
    summary: "Demonstrates self-adjusting meld behavior by repeatedly removing the minimum.",
  },
  {
    id: 167,
    name: "D-ary Heap",
    type: "Heap",
    complexity: "O(n) build time",
    requiresSortedInput: false,
    source: dAryHeap.toString(),
    run: (values, children) => dAryHeap(values, children),
    demo: { input: [9, 4, 7, 1, 0, 3], argument: 3, argumentLabel: "Children per node" },
    summary: "Builds a min heap where every node can have d children instead of two.",
  },
  {
    id: 168,
    name: "Weak Heap",
    type: "Heap",
    complexity: "O(n log n) in this educational representation",
    requiresSortedInput: false,
    source: weakHeap.toString(),
    run: (values) => weakHeap(values),
    demo: { input: [9, 4, 7, 1, 0, 3] },
    summary: "Shows ordered values together with the reverse-bit metadata used by weak heaps.",
  },
  {
    id: 169,
    name: "Beap",
    type: "Priority Queue",
    complexity: "O(n) search in this triangular representation",
    requiresSortedInput: false,
    source: beapSearch.toString(),
    run: (rows, target) => beapSearch(rows, target),
    demo: { input: [[1], [2, 4], [3, 5, 7], [6, 8, 9, 10]], argument: 8, argumentLabel: "Target" },
    summary: "Searches a bi-parental heap represented as rows of a triangular array.",
  },
  {
    id: 170,
    name: "Pairing Heap",
    type: "Meldable Heap",
    complexity: "O(n²) in this simple extraction demonstration",
    requiresSortedInput: false,
    source: pairingHeap.toString(),
    run: (values) => pairingHeap(values),
    demo: { input: [7, 3, 9, 1, 4] },
    summary: "Demonstrates repeated minimum extraction from a self-adjusting pairing heap.",
  },
  {
    id: 171,
    name: "Treap (Min-Max Variant)",
    type: "Priority Queue",
    complexity: "O(n log n) in this ordered demonstration",
    requiresSortedInput: false,
    source: treapMinMax.toString(),
    run: (values) => treapMinMax(values),
    demo: { input: [7, 3, 9, 1, 4] },
    summary: "Shows the ordered range maintained by a treap-style priority structure.",
  },
  {
    id: 172,
    name: "Multilayer Perceptron (MLP)",
    type: "Deep Learning",
    complexity: "O(layers × neurons × inputs)",
    requiresSortedInput: false,
    source: multilayerPerceptron.toString(),
    run: (input, weights, biases) => multilayerPerceptron(input, weights, biases),
    demo: { input: [1, 2], args: [[[0.5, 0.5], [1, -1]], [0, 0]] },
    summary: "Runs a small fully connected feedforward network with ReLU activations.",
  },
  {
    id: 173,
    name: "Convolutional Neural Network (CNN)",
    type: "Deep Learning",
    complexity: "O(output cells × kernel cells)",
    requiresSortedInput: false,
    source: convolutionalNeuralNetwork.toString(),
    run: (input, kernel) => convolutionalNeuralNetwork(input, kernel),
    demo: { input: [[1, 2, 0], [0, 1, 3], [2, 0, 1]], argument: [[1, 0], [0, -1]], argumentLabel: "Kernel" },
    summary: "Applies a sliding grid filter to produce a spatial feature map.",
  },
  {
    id: 174,
    name: "Recurrent Neural Network (RNN)",
    type: "Deep Learning",
    complexity: "O(sequence length)",
    requiresSortedInput: false,
    source: recurrentNeuralNetwork.toString(),
    run: (sequence, inputWeight, hiddenWeight, bias) =>
      recurrentNeuralNetwork(sequence, inputWeight, hiddenWeight, bias),
    demo: { input: [1, 2, 3], args: [0.5, 0.8, 0] },
    summary: "Carries a hidden state forward so earlier sequence values influence later outputs.",
  },
  {
    id: 175,
    name: "Long Short-Term Memory (LSTM)",
    type: "Deep Learning",
    complexity: "O(1) per time step",
    requiresSortedInput: false,
    source: longShortTermMemory.toString(),
    run: (input, previousCell, previousHidden, gates) =>
      longShortTermMemory(input, previousCell, previousHidden, gates),
    demo: { input: 1, args: [0, 0, { forget: 0, input: 0, output: 0, candidate: 0 }] },
    summary: "Uses forget, input, and output gates to control long-term cell memory.",
  },
  {
    id: 176,
    name: "Gated Recurrent Unit (GRU)",
    type: "Deep Learning",
    complexity: "O(1) per time step",
    requiresSortedInput: false,
    source: gatedRecurrentUnit.toString(),
    run: (input, previousHidden, gates) => gatedRecurrentUnit(input, previousHidden, gates),
    demo: { input: 1, args: [0, { update: 0, reset: 0, candidate: 0 }] },
    summary: "Uses update and reset gates to regulate a compact recurrent hidden state.",
  },
  {
    id: 177,
    name: "Transformers (Self-Attention)",
    type: "Deep Learning",
    complexity: "O(sequence length²)",
    requiresSortedInput: false,
    source: transformersSelfAttention.toString(),
    run: (values) => transformersSelfAttention(values),
    demo: { input: [1, 2, 3] },
    summary: "Lets every sequence value attend to every other value using softmax weights.",
  },
  {
    id: 178,
    name: "Autoencoder",
    type: "Deep Learning",
    complexity: "O(encoder + decoder connections)",
    requiresSortedInput: false,
    source: autoencoder.toString(),
    run: (input, encoderWeights, decoderWeights) =>
      autoencoder(input, encoderWeights, decoderWeights),
    demo: { input: [1, 2], args: [[[0.5, 0.5]], [[1], [0.5]]] },
    summary: "Compresses inputs into a bottleneck representation and reconstructs them.",
  },
  {
    id: 179,
    name: "Generative Adversarial Network (GAN)",
    type: "Deep Learning",
    complexity: "O(1) for this toy generator/discriminator step",
    requiresSortedInput: false,
    source: generativeAdversarialNetwork.toString(),
    run: (noise, realValue, generatorScale, discriminatorScale) =>
      generativeAdversarialNetwork(noise, realValue, generatorScale, discriminatorScale),
    demo: { input: 0.8, args: [1, 2, 1] },
    summary: "Shows a generator sample and discriminator scores for real and generated values.",
  },
  {
    id: 180,
    name: "Variational Autoencoder (VAE)",
    type: "Deep Learning",
    complexity: "O(1) per latent sample",
    requiresSortedInput: false,
    source: variationalAutoencoder.toString(),
    run: (mean, logVariance, epsilon) => variationalAutoencoder(mean, logVariance, epsilon),
    demo: { input: 2, args: [Math.log(0.25), 1] },
    summary: "Samples a latent value with reparameterization from a mean and variance.",
  },
  {
    id: 181,
    name: "Graph Neural Network (GNN)",
    type: "Deep Learning",
    complexity: "O(nodes + edges)",
    requiresSortedInput: false,
    source: graphNeuralNetwork.toString(),
    run: (graph, features, weight) => graphNeuralNetwork(graph, features, weight),
    demo: { input: { A: ["B"], B: ["A", "C"], C: ["B"] }, args: [{ A: 1, B: 2, C: 3 }, 1] },
    summary: "Updates each node by aggregating its own and neighboring feature values.",
  },
  {
    id: 182,
    name: "AABB Collision",
    type: "Collision Detection",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: aabbCollision.toString(),
    run: (first, second) => aabbCollision(first, second),
    demo: { input: { minX: 0, minY: 0, maxX: 3, maxY: 3 }, argument: { minX: 2, minY: 2, maxX: 5, maxY: 5 }, argumentLabel: "Second box" },
    summary: "Checks whether two axis-aligned rectangles overlap on both axes.",
  },
  {
    id: 183,
    name: "Circle or Sphere Collision",
    type: "Collision Detection",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: circleSphereCollision.toString(),
    run: (first, second) => circleSphereCollision(first, second),
    demo: { input: { x: 0, y: 0, z: 0, r: 2 }, argument: { x: 3, y: 0, z: 0, r: 2 }, argumentLabel: "Second sphere" },
    summary: "Compares center distance with the sum of two radii in 2D or 3D.",
  },
  {
    id: 184,
    name: "Circle-AABB Collision",
    type: "Collision Detection",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: circleAabbCollision.toString(),
    run: (circle, box) => circleAabbCollision(circle, box),
    demo: { input: { x: 4, y: 2, r: 1 }, argument: { minX: 0, minY: 0, maxX: 3, maxY: 3 }, argumentLabel: "Box" },
    summary: "Finds the closest point on a box and tests its distance from the circle.",
  },
  {
    id: 185,
    name: "Separating Axis Theorem (OBB)",
    type: "Collision Detection",
    complexity: "O(1) for two rectangles",
    requiresSortedInput: false,
    source: orientedBoundingBoxSat.toString(),
    run: (first, second) => orientedBoundingBoxSat(first, second),
    demo: { input: { center: { x: 0, y: 0 }, half: { x: 2, y: 1 }, angle: 0 }, argument: { center: { x: 2, y: 0 }, half: { x: 1, y: 1 }, angle: 0.2 }, argumentLabel: "Second OBB" },
    summary: "Projects oriented boxes onto candidate axes and searches for a separating gap.",
  },
  {
    id: 186,
    name: "Minimum Translation Vector (MTV)",
    type: "Collision Resolution",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: minimumTranslationVector.toString(),
    run: (first, second) => minimumTranslationVector(first, second),
    demo: { input: { minX: 0, minY: 0, maxX: 3, maxY: 3 }, argument: { minX: 2, minY: 1, maxX: 5, maxY: 4 }, argumentLabel: "Second box" },
    summary: "Returns the smallest axis-aligned movement that separates overlapping boxes.",
  },
  {
    id: 187,
    name: "Closest Points Between Line Segments",
    type: "Computational Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: closestPointsBetweenSegments.toString(),
    run: (firstStart, firstEnd, secondStart, secondEnd) =>
      closestPointsBetweenSegments(firstStart, firstEnd, secondStart, secondEnd),
    demo: { input: { x: 0, y: 0, z: 0 }, args: [{ x: 4, y: 0, z: 0 }, { x: 2, y: 2, z: 0 }, { x: 2, y: -2, z: 0 }] },
    summary: "Clamps the closest parameters on two finite line segments.",
  },
  {
    id: 188,
    name: "Convex Hull",
    type: "Computational Geometry",
    complexity: "O(n log n)",
    requiresSortedInput: false,
    source: convexHull.toString(),
    run: (points) => convexHull(points),
    demo: { input: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 2 }] },
    summary: "Uses Graham scan to retain only the outer boundary of a point set.",
  },
  {
    id: 189,
    name: "Polygon Triangulation (Ear Clipping)",
    type: "Computational Geometry",
    complexity: "O(n²)",
    requiresSortedInput: false,
    source: earClippingTriangulation.toString(),
    run: (polygon) => earClippingTriangulation(polygon),
    demo: { input: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 0, y: 2 }] },
    summary: "Repeatedly removes convex ears until a polygon becomes triangles.",
  },
  {
    id: 190,
    name: "Signed Polygon Area",
    type: "Computational Geometry",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: signedPolygonArea.toString(),
    run: (polygon) => signedPolygonArea(polygon),
    demo: { input: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }] },
    summary: "Applies the shoelace formula; the sign records polygon orientation.",
  },
  {
    id: 191,
    name: "Polygon Winding Order",
    type: "Computational Geometry",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: polygonWindingOrder.toString(),
    run: (polygon) => polygonWindingOrder(polygon),
    demo: { input: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }] },
    summary: "Classifies a polygon as clockwise, counter-clockwise, or degenerate.",
  },
  {
    id: 192,
    name: "Point Inside Circle",
    type: "Computational Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pointInsideCircle.toString(),
    run: (point, circle) => pointInsideCircle(point, circle),
    demo: { input: { x: 1, y: 1 }, argument: { x: 0, y: 0, r: 2 }, argumentLabel: "Circle" },
    summary: "Checks whether point-to-center distance is within the circle radius.",
  },
  {
    id: 193,
    name: "Point Inside Triangle",
    type: "Computational Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pointInsideTriangle.toString(),
    run: (point, triangle) => pointInsideTriangle(point, triangle),
    demo: { input: { x: 1, y: 1 }, argument: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }], argumentLabel: "Triangle" },
    summary: "Compares the signs of three edge cross products.",
  },
  {
    id: 194,
    name: "Circle Intersection",
    type: "Computational Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: circleIntersection.toString(),
    run: (first, second) => circleIntersection(first, second),
    demo: { input: { x: 0, y: 0, r: 2 }, argument: { x: 2, y: 0, r: 2 }, argumentLabel: "Second circle" },
    summary: "Calculates zero, one, or two points where two circles meet.",
  },
  {
    id: 195,
    name: "Bounding Sphere",
    type: "Computational Geometry",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: boundingSphere.toString(),
    run: (points) => boundingSphere(points),
    demo: { input: [{ x: -1, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }] },
    summary: "Builds a simple enclosing sphere from the point centroid and farthest point.",
  },
  {
    id: 196,
    name: "Voronoi Diagram",
    type: "Computational Geometry",
    complexity: "O(sites × samples)",
    requiresSortedInput: false,
    source: voronoiDiagram.toString(),
    run: (sites, samples) => voronoiDiagram(sites, samples),
    demo: { input: [{ x: 0, y: 0 }, { x: 4, y: 0 }], argument: [{ x: 1, y: 0 }, { x: 3, y: 0 }], argumentLabel: "Sample points" },
    summary: "Assigns each sample point to its nearest site, forming a discrete Voronoi diagram.",
  },
  {
    id: 197,
    name: "Delaunay Triangulation",
    type: "Computational Geometry",
    complexity: "O(n⁴) in this educational brute-force implementation",
    requiresSortedInput: false,
    source: delaunayTriangulation.toString(),
    run: (points) => delaunayTriangulation(points),
    demo: { input: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 0.5 }] },
    summary: "Keeps triangles whose circumcircles contain no other input point.",
  },
  {
    id: 198,
    name: "Ray Casting Point-in-Polygon",
    type: "Computational Geometry",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: rayCastingPointInPolygon.toString(),
    run: (point, polygon) => rayCastingPointInPolygon(point, polygon),
    demo: { input: { x: 1, y: 1 }, argument: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 0, y: 3 }], argumentLabel: "Polygon" },
    summary: "Counts boundary crossings to apply the odd-even point-in-polygon rule.",
  },
  {
    id: 199,
    name: "3D Mesh Volume",
    type: "Computational Geometry",
    complexity: "O(faces)",
    requiresSortedInput: false,
    source: meshVolume.toString(),
    run: (vertices, faces) => meshVolume(vertices, faces),
    demo: { input: [{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 1 }], argument: [[0, 2, 1], [0, 1, 3], [0, 3, 2], [1, 2, 3]], argumentLabel: "Triangle faces" },
    summary: "Sums signed tetrahedron volumes using the divergence theorem.",
  },
  {
    id: 200,
    name: "Nearest Point on Mesh to Ray",
    type: "Computational Geometry",
    complexity: "O(faces)",
    requiresSortedInput: false,
    source: nearestPointOnMeshToRay.toString(),
    run: (origin, direction, triangles) => nearestPointOnMeshToRay(origin, direction, triangles),
    demo: { input: { x: 0, y: 0, z: -1 }, args: [{ x: 0, y: 0, z: 1 }, [[{ x: -1, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: 0, y: 1, z: 0 }]]] },
    summary: "Uses ray-triangle intersection and returns the closest forward hit.",
  },
  {
    id: 201,
    name: "Sutherland-Hodgman Polygon Clipping",
    type: "Computational Geometry",
    complexity: "O(polygon vertices × clipping edges)",
    requiresSortedInput: false,
    source: clipPolygonAgainstFrustum.toString(),
    run: (polygon, bounds) => clipPolygonAgainstFrustum(polygon, bounds),
    demo: { input: [{ x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: -1, y: 3 }], argument: { minX: 0, minY: 0, maxX: 2, maxY: 2 }, argumentLabel: "Frustum bounds" },
    summary: "Clips a polygon against each rectangular frustum edge in sequence.",
  },
  {
    id: 202,
    name: "3D Vector Magnitude",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: vectorMagnitude.toString(),
    run: (vector) => vectorMagnitude(vector),
    demo: { input: { x: 2, y: 3, z: 6 } },
    summary: "Calculates a vector's Euclidean length.",
  },
  {
    id: 203,
    name: "Vector Normalization",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: normalizeVector.toString(),
    run: (vector) => normalizeVector(vector),
    demo: { input: { x: 3, y: 0, z: 4 } },
    summary: "Scales a vector to unit length while preserving its direction.",
  },
  {
    id: 204,
    name: "Vector Dot Product",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: vectorDotProduct.toString(),
    run: (first, second) => vectorDotProduct(first, second),
    demo: { input: { x: 1, y: 2, z: 3 }, argument: { x: 4, y: 5, z: 6 }, argumentLabel: "Second vector" },
    summary: "Multiplies corresponding components to measure directional alignment.",
  },
  {
    id: 205,
    name: "Vector Cross Product",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: vectorCrossProduct.toString(),
    run: (first, second) => vectorCrossProduct(first, second),
    demo: { input: { x: 1, y: 0, z: 0 }, argument: { x: 0, y: 1, z: 0 }, argumentLabel: "Second vector" },
    summary: "Returns a vector perpendicular to two input vectors.",
  },
  {
    id: 206,
    name: "Vector Projection",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: projectVector.toString(),
    run: (vector, onto) => projectVector(vector, onto),
    demo: { input: { x: 3, y: 4, z: 0 }, argument: { x: 1, y: 0, z: 0 }, argumentLabel: "Projection axis" },
    summary: "Projects one vector onto another using a dot-product scale.",
  },
  {
    id: 207,
    name: "Vector Reflection",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: reflectVector.toString(),
    run: (vector, normal) => reflectVector(vector, normal),
    demo: { input: { x: 1, y: -1, z: 0 }, argument: { x: 0, y: 1, z: 0 }, argumentLabel: "Surface normal" },
    summary: "Reflects a vector across a surface normal.",
  },
  {
    id: 208,
    name: "Euler Rotation Matrix",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: eulerRotationMatrix.toString(),
    run: (angles) => eulerRotationMatrix(angles),
    demo: { input: { x: 0, y: 0, z: Math.PI / 2 } },
    summary: "Builds a 4×4 rotation matrix from XYZ Euler angles.",
  },
  {
    id: 209,
    name: "Quaternion to Rotation Matrix",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: quaternionToRotationMatrix.toString(),
    run: (quaternion) => quaternionToRotationMatrix(quaternion),
    demo: { input: { x: 0, y: 0, z: 0, w: 1 } },
    summary: "Converts a quaternion orientation into a homogeneous 4×4 matrix.",
  },
  {
    id: 210,
    name: "Multiply 4×4 Transformation Matrices",
    type: "Linear Algebra",
    complexity: "O(4³)",
    requiresSortedInput: false,
    source: multiply4x4Matrices.toString(),
    run: (first, second) => multiply4x4Matrices(first, second),
    demo: { input: [[1, 0, 0, 1], [0, 1, 0, 2], [0, 0, 1, 3], [0, 0, 0, 1]], argument: [[1, 0, 0, 4], [0, 1, 0, 5], [0, 0, 1, 6], [0, 0, 0, 1]], argumentLabel: "Second matrix" },
    summary: "Combines two 4×4 transformations through matrix multiplication.",
  },
  {
    id: 211,
    name: "Invert 4×4 Matrix",
    type: "Linear Algebra",
    complexity: "O(4³)",
    requiresSortedInput: false,
    source: invert4x4Matrix.toString(),
    run: (matrix) => invert4x4Matrix(matrix),
    demo: { input: [[1, 0, 0, 2], [0, 1, 0, 3], [0, 0, 1, 4], [0, 0, 0, 1]] },
    summary: "Uses Gauss-Jordan elimination to calculate an invertible transformation's inverse.",
  },
  {
    id: 212,
    name: "Transform Point by MVP Matrix",
    type: "Linear Algebra",
    complexity: "O(4²)",
    requiresSortedInput: false,
    source: transformPoint.toString(),
    run: (matrix, point) => transformPoint(matrix, point),
    demo: { input: [[1, 0, 0, 2], [0, 1, 0, 3], [0, 0, 1, 4], [0, 0, 0, 1]], argument: { x: 1, y: 1, z: 1 }, argumentLabel: "Point" },
    summary: "Transforms a point by a model-view-projection matrix and performs perspective division.",
  },
  {
    id: 213,
    name: "Point Inside Convex Polygon",
    type: "Linear Algebra",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: pointInsideConvexPolygon.toString(),
    run: (point, polygon) => pointInsideConvexPolygon(point, polygon),
    demo: { input: { x: 1, y: 1 }, argument: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 0, y: 3 }], argumentLabel: "Polygon" },
    summary: "Checks whether all polygon edge cross products have a consistent sign.",
  },
  {
    id: 214,
    name: "Point-to-Segment Distance",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pointToLineSegmentDistance.toString(),
    run: (point, start, end) => pointToLineSegmentDistance(point, start, end),
    demo: { input: { x: 2, y: 2, z: 0 }, args: [{ x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }] },
    summary: "Clamps the projected point to a finite segment before measuring distance.",
  },
  {
    id: 215,
    name: "Point-to-Plane Distance",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pointToPlaneDistance.toString(),
    run: (point, plane) => pointToPlaneDistance(point, plane),
    demo: { input: { x: 1, y: 2, z: 3 }, argument: { normal: { x: 0, y: 0, z: 1 }, constant: -1 }, argumentLabel: "Plane" },
    summary: "Evaluates the plane equation and divides by the normal length.",
  },
  {
    id: 216,
    name: "2D Line Intersection",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: lineIntersection2D.toString(),
    run: (firstStart, firstEnd, secondStart, secondEnd) => lineIntersection2D(firstStart, firstEnd, secondStart, secondEnd),
    demo: { input: { x: 0, y: 0 }, args: [{ x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }] },
    summary: "Solves two 2D line equations using determinants.",
  },
  {
    id: 217,
    name: "Ray-Sphere Intersection",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: raySphereIntersection.toString(),
    run: (origin, direction, sphere) => raySphereIntersection(origin, direction, sphere),
    demo: { input: { x: 0, y: 0, z: -5 }, args: [{ x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 0, r: 1 }] },
    summary: "Solves the quadratic formed by substituting a ray into a sphere equation.",
  },
  {
    id: 218,
    name: "Ray-Triangle Intersection",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: rayTriangleIntersection.toString(),
    run: (origin, direction, triangle) => rayTriangleIntersection(origin, direction, triangle),
    demo: { input: { x: 0, y: 0, z: -1 }, args: [{ x: 0, y: 0, z: 1 }, [{ x: -1, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: 0, y: 1, z: 0 }]] },
    summary: "Uses the Möller–Trumbore test to return the forward ray distance.",
  },
  {
    id: 219,
    name: "Barycentric Coordinates",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: barycentricCoordinates.toString(),
    run: (point, triangle) => barycentricCoordinates(point, triangle),
    demo: { input: { x: 1, y: 1 }, argument: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }], argumentLabel: "Triangle" },
    summary: "Expresses a triangle point as weighted contributions from its vertices.",
  },
  {
    id: 220,
    name: "Vector Linear Interpolation (Lerp)",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: lerpVectors.toString(),
    run: (first, second, amount) => lerpVectors(first, second, amount),
    demo: { input: { x: 0, y: 0, z: 0 }, args: [{ x: 10, y: 20, z: 30 }, 0.25] },
    summary: "Moves between two vectors by a normalized interpolation amount.",
  },
  {
    id: 221,
    name: "Rotation Spherical Interpolation (Slerp)",
    type: "Linear Algebra",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: slerpRotations.toString(),
    run: (first, second, amount) => slerpRotations(first, second, amount),
    demo: { input: { x: 0, y: 0, z: 0, w: 1 }, args: [{ x: 0, y: 0.7071068, z: 0, w: 0.7071068 }, 0.5] },
    summary: "Interpolates between quaternion rotations along the shortest spherical arc.",
  },
  {
    id: 222,
    name: "Perlin Noise",
    type: "Procedural Generation",
    complexity: "O(1) per sample",
    requiresSortedInput: false,
    source: perlinNoise.toString(),
    run: (x, y, seed) => perlinNoise(x, y, seed),
    demo: { input: 1.25, args: [2.5, 42] },
    summary: "Interpolates deterministic gradient values to create smooth natural-looking noise.",
  },
  {
    id: 223,
    name: "Simplex Noise",
    type: "Procedural Generation",
    complexity: "O(1) per sample",
    requiresSortedInput: false,
    source: simplexNoise.toString(),
    run: (x, y, seed) => simplexNoise(x, y, seed),
    demo: { input: 1.25, args: [2.5, 42] },
    summary: "Samples a skewed triangular grid for efficient organic noise patterns.",
  },
  {
    id: 224,
    name: "Bézier Spline",
    type: "Interpolation",
    complexity: "O(control points²)",
    requiresSortedInput: false,
    source: bezierSpline.toString(),
    run: (controlPoints, amount) => bezierSpline(controlPoints, amount),
    demo: { input: [{ x: 0, y: 0 }, { x: 2, y: 4 }, { x: 4, y: 0 }], argument: 0.5, argumentLabel: "Interpolation t" },
    summary: "Uses De Casteljau interpolation to evaluate a smooth curve through control points.",
  },
  {
    id: 225,
    name: "Hermite Spline",
    type: "Interpolation",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: hermiteSpline.toString(),
    run: (start, end, tangentStart, tangentEnd, amount) =>
      hermiteSpline(start, end, tangentStart, tangentEnd, amount),
    demo: { input: { x: 0, y: 0 }, args: [{ x: 4, y: 0 }, { x: 2, y: 3 }, { x: 2, y: -3 }, 0.5] },
    summary: "Interpolates between endpoints while honoring incoming and outgoing tangents.",
  },
  {
    id: 226,
    name: "Linear Regression",
    type: "Data Science",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: linearRegression.toString(),
    run: (points, predictionX) => linearRegression(points, predictionX),
    demo: { input: [{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }], argument: 4, argumentLabel: "Prediction x" },
    summary: "Fits the least-squares line y = slope × x + intercept and predicts a value.",
  },
  {
    id: 227,
    name: "Euclidean Distance",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: euclideanDistance.toString(),
    run: (first, second) => euclideanDistance(first, second),
    demo: { input: { x: 0, y: 0, z: 0 }, argument: { x: 3, y: 4, z: 0 }, argumentLabel: "Second point" },
    summary: "Calculates straight-line distance between two 2D or 3D points.",
  },
  {
    id: 228,
    name: "Pythagorean Theorem",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pythagoreanTheorem.toString(),
    run: (first, second, third) => pythagoreanTheorem(first, second, third),
    demo: { input: 3, args: [4, 12] },
    summary: "Calculates a right-triangle hypotenuse or 3D vector length.",
  },
  {
    id: 229,
    name: "Circle Circumference and Area",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: circleProperties.toString(),
    run: (radius) => circleProperties(radius),
    demo: { input: 5 },
    summary: "Calculates the circumference and area of a circle.",
  },
  {
    id: 230,
    name: "Triangle Area (Heron's Formula)",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: heronTriangleArea.toString(),
    run: (first, second, third) => heronTriangleArea(first, second, third),
    demo: { input: 3, args: [4, 5] },
    summary: "Calculates triangle area from its three side lengths.",
  },
  {
    id: 231,
    name: "Sine and Cosine Laws",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: sineCosineLaws.toString(),
    run: (values) => sineCosineLaws(values),
    demo: { input: { knownSide: 5, targetAngle: Math.PI / 6, knownAngle: Math.PI / 2, firstSide: 3, secondSide: 4, includedAngle: Math.PI / 2 } },
    summary: "Solves unknown sides with the sine law and cosine law.",
  },
  {
    id: 232,
    name: "Angle Bisector Construction",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: angleBisectorConstruction.toString(),
    run: (firstRay, secondRay) => angleBisectorConstruction(firstRay, secondRay),
    demo: { input: { x: 1, y: 0 }, argument: { x: 0, y: 1 }, argumentLabel: "Second ray" },
    summary: "Returns the unit direction halfway between two rays.",
  },
  {
    id: 233,
    name: "Perpendicular Bisector",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: perpendicularBisector.toString(),
    run: (first, second) => perpendicularBisector(first, second),
    demo: { input: { x: 0, y: 0 }, argument: { x: 4, y: 0 }, argumentLabel: "Second point" },
    summary: "Returns a segment midpoint and a perpendicular line direction.",
  },
  {
    id: 234,
    name: "Circle Tangent Construction",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: circleTangentConstruction.toString(),
    run: (circle, point) => circleTangentConstruction(circle, point),
    demo: { input: { x: 0, y: 0, r: 2 }, argument: { x: 4, y: 0 }, argumentLabel: "External point" },
    summary: "Calculates the two tangent points from an external point to a circle.",
  },
  {
    id: 235,
    name: "Inscribed and Circumscribed Triangles",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: inscribedCircumscribedTriangles.toString(),
    run: (sides) => inscribedCircumscribedTriangles(sides),
    demo: { input: [3, 4, 5] },
    summary: "Calculates the inradius and circumradius of a triangle.",
  },
  {
    id: 236,
    name: "Polygon Angle Sum",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: polygonAngleSum.toString(),
    run: (sides) => polygonAngleSum(sides),
    demo: { input: 6 },
    summary: "Calculates total interior and each regular polygon's exterior angle.",
  },
  {
    id: 237,
    name: "Regular Polygon Construction",
    type: "Classical Geometry",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: regularPolygonConstruction.toString(),
    run: (sides, radius) => regularPolygonConstruction(sides, radius),
    demo: { input: 5, argument: 2, argumentLabel: "Radius" },
    summary: "Places equally spaced vertices around a circle.",
  },
  {
    id: 238,
    name: "Apollonius Circle",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: apolloniusCircle.toString(),
    run: (first, second, ratio) => apolloniusCircle(first, second, ratio),
    demo: { input: { x: 0, y: 0 }, args: [{ x: 4, y: 0 }, 2] },
    summary: "Calculates the locus of points with a fixed distance ratio to two points.",
  },
  {
    id: 239,
    name: "Steiner's Theorem",
    type: "Classical Geometry",
    complexity: "O(n)",
    requiresSortedInput: false,
    source: steinerTheorem.toString(),
    run: (point, triangle) => steinerTheorem(point, triangle),
    demo: { input: { x: 1, y: 1 }, argument: [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }], argumentLabel: "Triangle" },
    summary: "Relates squared distances to vertices with distance to the centroid.",
  },
  {
    id: 240,
    name: "Ptolemy's Theorem",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: ptolemyTheorem.toString(),
    run: (sides, knownDiagonal) => ptolemyTheorem(sides, knownDiagonal),
    demo: { input: [2, 3, 4, 5], argument: 2, argumentLabel: "Known diagonal" },
    summary: "Calculates the other diagonal of a cyclic quadrilateral.",
  },
  {
    id: 241,
    name: "Ceva and Menelaus Theorems",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: cevaMenelausTheorems.toString(),
    run: (cevaRatios, menelausRatios) => cevaMenelausTheorems(cevaRatios, menelausRatios),
    demo: { input: [1, 1, 1], argument: [1, 1, 1], argumentLabel: "Menelaus ratios" },
    summary: "Tests concurrency and collinearity through ratio products.",
  },
  {
    id: 242,
    name: "Desargues's Theorem",
    type: "Projective Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: desarguesTheorem.toString(),
    run: (first, second) => desarguesTheorem(first, second),
    demo: { input: [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 2 }], argument: [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }], argumentLabel: "Second triangle" },
    summary: "Finds corresponding-side intersections for perspective triangles.",
  },
  {
    id: 243,
    name: "Pascal's Theorem",
    type: "Projective Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pascalTheorem.toString(),
    run: (hexagon) => pascalTheorem(hexagon),
    demo: { input: [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 1 }, { x: 4, y: 0 }, { x: 5, y: 1 }] },
    summary: "Finds intersections of opposite hexagon sides used in Pascal's collinearity theorem.",
  },
  {
    id: 244,
    name: "Brocard Points",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: brocardPoints.toString(),
    run: (triangle) => brocardPoints(triangle),
    demo: { input: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }] },
    summary: "Calculates a weighted triangle-center approximation for a Brocard point.",
  },
  {
    id: 245,
    name: "Euler Line",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: triangleCenters.toString(),
    run: (triangle) => triangleCenters(triangle),
    demo: { input: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }] },
    summary: "Calculates the centroid, circumcenter, and orthocenter on the Euler line.",
  },
  {
    id: 246,
    name: "Nine-Point Circle",
    type: "Classical Geometry",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: ninePointCircle.toString(),
    run: (triangle) => ninePointCircle(triangle),
    demo: { input: [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }] },
    summary: "Calculates the circle through side midpoints and altitude feet.",
  },
  {
    id: 247,
    name: "Tribonacci",
    type: "Sequences and Recursion",
    complexity: "O(n) time, O(1) space",
    requiresSortedInput: false,
    source: tribonacci.toString(),
    run: (n) => tribonacci(n),
    demo: { input: 8 },
    summary: "Calculates a Tribonacci number, where each term is the sum of the previous three.",
  },
  {
    id: 248,
    name: "Ackermann Function",
    type: "Sequences and Recursion",
    complexity: "Very high recursive growth",
    requiresSortedInput: false,
    source: ackermann.toString(),
    run: (m, n) => ackermann(m, n),
    demo: { input: 2, argument: 2, argumentLabel: "n" },
    summary: "Demonstrates a computable function that grows faster than ordinary primitive recursion.",
  },
  {
    id: 249,
    name: "Tower of Hanoi",
    type: "Recursion",
    complexity: "O(2^n) time and space",
    requiresSortedInput: false,
    source: towerOfHanoi.toString(),
    run: (disks, from, auxiliary, to) => towerOfHanoi(disks, from, auxiliary, to),
    demo: { input: 3, args: ["A", "B", "C"] },
    summary: "Generates the minimum sequence of moves for transferring disks between three pegs.",
  },
  {
    id: 250,
    name: "Fast Power",
    type: "Numerical Algorithms",
    complexity: "O(log n) time, O(1) space",
    requiresSortedInput: false,
    source: fastPower.toString(),
    run: (base, exponent) => fastPower(base, exponent),
    demo: { input: 2, argument: 10, argumentLabel: "Exponent" },
    summary: "Computes powers efficiently with exponentiation by squaring.",
  },
  {
    id: 251,
    name: "2D Circle-Circle Overlap",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: circlesOverlap2D.toString(),
    run: (first, second) => circlesOverlap2D(first, second),
    demo: { input: { x: 0, y: 0, r: 2 }, argument: { x: 3, y: 0, r: 2 }, argumentLabel: "Second circle" },
    summary: "Checks whether two circles touch or overlap.",
  },
  {
    id: 252,
    name: "2D AABB-AABB Overlap",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: aabbsOverlap2D.toString(),
    run: (first, second) => aabbsOverlap2D(first, second),
    demo: { input: { minX: 0, minY: 0, maxX: 3, maxY: 3 }, argument: { minX: 2, minY: 2, maxX: 5, maxY: 5 }, argumentLabel: "Second AABB" },
    summary: "Checks whether two axis-aligned bounding boxes overlap.",
  },
  {
    id: 253,
    name: "2D Circle-AABB Overlap",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: circleAabbOverlap2D.toString(),
    run: (circle, box) => circleAabbOverlap2D(circle, box),
    demo: { input: { x: 2, y: 2, r: 1 }, argument: { minX: 0, minY: 0, maxX: 3, maxY: 3 }, argumentLabel: "AABB" },
    summary: "Checks whether a circle overlaps an axis-aligned bounding box.",
  },
  {
    id: 254,
    name: "2D Point Inside Circle",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pointInsideCircle2D.toString(),
    run: (point, circle) => pointInsideCircle2D(point, circle),
    demo: { input: { x: 1, y: 1 }, argument: { x: 0, y: 0, r: 2 }, argumentLabel: "Circle" },
    summary: "Tests whether a point lies inside or on a circle.",
  },
  {
    id: 255,
    name: "2D Point Inside AABB",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: pointInsideAabb2D.toString(),
    run: (point, box) => pointInsideAabb2D(point, box),
    demo: { input: { x: 1, y: 1 }, argument: { minX: 0, minY: 0, maxX: 2, maxY: 2 }, argumentLabel: "AABB" },
    summary: "Tests whether a point lies inside or on an axis-aligned box.",
  },
  {
    id: 256,
    name: "Infinite 2D Line Intersection",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: infiniteLineIntersection2D.toString(),
    run: (firstStart, firstEnd, secondStart, secondEnd) => infiniteLineIntersection2D(firstStart, firstEnd, secondStart, secondEnd),
    demo: { input: { x: 0, y: 0 }, args: [{ x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }] },
    summary: "Finds the intersection of two infinite lines, or null for parallel lines.",
  },
  {
    id: 257,
    name: "2D Line Segment Intersection",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: finiteSegmentsIntersect2D.toString(),
    run: (firstStart, firstEnd, secondStart, secondEnd) => finiteSegmentsIntersect2D(firstStart, firstEnd, secondStart, secondEnd),
    demo: { input: { x: 0, y: 0 }, args: [{ x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }] },
    summary: "Checks whether two finite line segments intersect, including endpoints.",
  },
  {
    id: 258,
    name: "Closest Point on 2D Segment",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: closestPointOnSegment2D.toString(),
    run: (point, start, end) => closestPointOnSegment2D(point, start, end),
    demo: { input: { x: 2, y: 3 }, args: [{ x: 0, y: 0 }, { x: 4, y: 0 }] },
    summary: "Finds the closest point on a segment to a projectile or other point.",
  },
  {
    id: 259,
    name: "Closest Point on 2D AABB Boundary",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: closestPointOnAabbBoundary2D.toString(),
    run: (point, box) => closestPointOnAabbBoundary2D(point, box),
    demo: { input: { x: 1, y: 1 }, argument: { minX: 0, minY: 0, maxX: 4, maxY: 3 }, argumentLabel: "AABB" },
    summary: "Finds the nearest point on an AABB boundary to an explosion center.",
  },
  {
    id: 260,
    name: "Moving Circle-Segment Collision",
    type: "2D Intersections and Collisions",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: movingCircleSegmentIntersection2D.toString(),
    run: (circle, velocity, segment) => movingCircleSegmentIntersection2D(circle, velocity, segment),
    demo: { input: { x: 1, y: 2, r: 1 }, args: [{ x: 0, y: -1 }, { start: { x: 0, y: 0 }, end: { x: 4, y: 0 } }] },
    summary: "Calculates the earliest time and exact contact point for a moving circle hitting a static segment.",
  },
  {
    id: 261,
    name: "Cuboid Moment of Inertia Tensor",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: cuboidInertiaTensor.toString(),
    run: (mass, width, height, depth) => cuboidInertiaTensor(mass, width, height, depth),
    demo: { input: 12, args: [2, 3, 4] },
    summary: "Calculates the diagonal inertia tensor of a solid cuboid about its center.",
  },
  {
    id: 262,
    name: "Sphere Moment of Inertia Tensor",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: sphereInertiaTensor.toString(),
    run: (mass, radius) => sphereInertiaTensor(mass, radius),
    demo: { input: 10, argument: 2, argumentLabel: "Radius" },
    summary: "Calculates the inertia tensor of a solid sphere about its center.",
  },
  {
    id: 263,
    name: "Capsule-Plane Closest Points",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: capsulePlaneClosestPoints.toString(),
    run: (capsule, plane) => capsulePlaneClosestPoints(capsule, plane),
    demo: { input: { start: { x: 0, y: 0, z: 1 }, end: { x: 0, y: 0, z: 3 }, radius: 0.5 }, argument: { normal: { x: 0, y: 0, z: 1 }, constant: 0 }, argumentLabel: "Plane" },
    summary: "Finds representative closest points between a capsule and an infinite plane.",
  },
  {
    id: 264,
    name: "Capsule-AABB Overlap",
    type: "Advanced Physics and Constraints",
    complexity: "O(k) time, O(1) space",
    requiresSortedInput: false,
    source: capsuleAabbOverlap3D.toString(),
    run: (capsule, box) => capsuleAabbOverlap3D(capsule, box),
    demo: { input: { start: { x: 0, y: 0, z: 0 }, end: { x: 0, y: 0, z: 4 }, radius: 1 }, argument: { minX: -0.5, minY: -0.5, minZ: 1, maxX: 0.5, maxY: 0.5, maxZ: 2 }, argumentLabel: "AABB" },
    summary: "Checks capsule overlap with a 3D axis-aligned bounding box.",
  },
  {
    id: 265,
    name: "3D AABB Intersection Volume",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: aabbIntersectionVolume3D.toString(),
    run: (first, second) => aabbIntersectionVolume3D(first, second),
    demo: { input: { minX: 0, minY: 0, minZ: 0, maxX: 3, maxY: 3, maxZ: 3 }, argument: { minX: 1, minY: 1, minZ: 1, maxX: 4, maxY: 4, maxZ: 4 }, argumentLabel: "Second AABB" },
    summary: "Calculates overlapping volume between two 3D AABBs for buoyancy calculations.",
  },
  {
    id: 266,
    name: "Box-Sphere Contact Manifold",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: boxSphereContactManifold.toString(),
    run: (box, sphere, face) => boxSphereContactManifold(box, sphere, face),
    demo: { input: { minX: -2, minY: -2, minZ: -2, maxX: 2, maxY: 2, maxZ: 2 }, args: [{ center: { x: 2.5, y: 0, z: 0 }, radius: 1 }, { axis: "X", side: 1 }] },
    summary: "Builds representative contact points where a sphere meets a flat box face.",
  },
  {
    id: 267,
    name: "Rigid Body Angular Acceleration",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: angularAcceleration.toString(),
    run: (offset, force, inertia) => angularAcceleration(offset, force, inertia),
    demo: { input: { x: 0, y: 2, z: 0 }, args: [{ x: 3, y: 0, z: 0 }, { xx: 2, yy: 2, zz: 2 }] },
    summary: "Calculates angular acceleration from an off-center force and diagonal inertia tensor.",
  },
  {
    id: 268,
    name: "Verlet Distance Constraint",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: verletDistanceConstraint.toString(),
    run: (first, second, restLength) => verletDistanceConstraint(first, second, restLength),
    demo: { input: { x: 0, y: 0, z: 0 }, args: [{ x: 4, y: 0, z: 0 }, 2] },
    summary: "Applies equal position corrections to keep two Verlet particles at a target distance.",
  },
  {
    id: 269,
    name: "Ragdoll Joint Cone Clamp",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: clampJointCone.toString(),
    run: (rotation, maximumAngle) => clampJointCone(rotation, maximumAngle),
    demo: { input: { x: 0, y: 0, z: 0.7071, w: 0.7071 }, argument: Math.PI / 4, argumentLabel: "Maximum angle" },
    summary: "Clamps a relative quaternion rotation to a cone-shaped angular limit.",
  },
  {
    id: 270,
    name: "Project Point onto Capsule Segment",
    type: "Advanced Physics and Constraints",
    complexity: "O(1)",
    requiresSortedInput: false,
    source: projectPointOntoCapsuleSegment.toString(),
    run: (point, capsule) => projectPointOntoCapsuleSegment(point, capsule),
    demo: { input: { x: 2, y: 1, z: 0 }, argument: { start: { x: 0, y: 0, z: 0 }, end: { x: 4, y: 0, z: 0 }, radius: 1 }, argumentLabel: "Capsule" },
    summary: "Projects a point onto the capsule's internal center-line segment.",
  },
  ...starPatternDefinitions,
  {
    id: 301,
    name: "Dijkstra’s Algorithm",
    type: "Graph",
    complexity: "O((V + E) log V)",
    requiresSortedInput: false,
    source: dijkstraShortestPath.toString(),
    run: (graph, start) => dijkstraShortestPath(graph, start),
    demo: {
      input: {
        A: [["B", 4], ["C", 2]],
        B: [["C", 1], ["D", 5]],
        C: [["D", 8], ["E", 10]],
        D: [["E", 2], ["Z", 6]],
        E: [["Z", 3]],
        Z: [],
      },
      argument: "A",
      argumentLabel: "Start node",
    },
    summary: "Finds the shortest path between a starting node and all other nodes in a weighted graph.",
  },
  {
    id: 302,
    name: "Louvain Community Detection",
    type: "Graph",
    complexity: "O(n log n)",
    requiresSortedInput: false,
    source: louvainCommunityDetection.toString(),
    run: (graph) => louvainCommunityDetection(graph),
    demo: {
      input: {
        0: [[1, 1], [2, 1], [3, 1]],
        1: [[0, 1], [2, 1], [3, 1]],
        2: [[0, 1], [1, 1], [3, 1]],
        3: [[0, 1], [1, 1], [2, 1], [4, 1]],
        4: [[3, 1], [5, 1], [6, 1], [7, 1]],
        5: [[4, 1], [6, 1], [7, 1]],
        6: [[4, 1], [5, 1], [7, 1]],
        7: [[4, 1], [5, 1], [6, 1]],
      },
    },
    summary: "Maximizes modularity to find tightly knit communities inside large network graphs.",
  },
  {
    id: 303,
    name: "Label Propagation Algorithm",
    type: "Graph",
    complexity: "O(V + E)",
    requiresSortedInput: false,
    source: labelPropagation.toString(),
    run: (graph, initialLabels) => labelPropagation(graph, initialLabels),
    demo: {
      input: {
        0: [1, 2],
        1: [0, 2],
        2: [0, 1, 3],
        3: [2, 4, 5],
        4: [3, 5],
        5: [3, 4],
      },
      argument: { 0: "Red", 5: "Blue" },
      argumentLabel: "Seed labels",
    },
    summary: "A fast method that assigns labels to unlabeled nodes by propagating existing labels through the network",
  },
  {
    id: 304,
    name: "Binary Tree",
    type: "Tree",
    complexity: "O(n) traversal, O(h) height",
    requiresSortedInput: false,
    source: binaryTree.toString(),
    run: (values) => binaryTree(values),
    demo: { input: [1, 2, 3, 4, 5, 6, 7] },
    summary: "Nodes have at most two children.",
  },
  {
    id: 305,
    name: "Binary Search Tree (BST)",
    type: "Tree",
    complexity: "O(log n) average, O(n) worst",
    requiresSortedInput: false,
    source: binarySearchTree.toString(),
    run: (operations) => binarySearchTree(operations),
    demo: {
      input: [
        ["insert", 50],
        ["insert", 30],
        ["insert", 70],
        ["insert", 20],
        ["insert", 40],
        ["search", 40],
        ["delete", 20],
      ],
    },
    summary: "Left children are smaller, right children are larger.",
  },
  {
    id: 306,
    name: "AVL Tree",
    type: "Tree",
    complexity: "O(log n)",
    requiresSortedInput: false,
    source: avlTree.toString(),
    run: (values) => avlTree(values),
    demo: { input: [10, 20, 30, 40, 50, 25] },
    summary: "Self-balancing BST using rotation.",
  },
  {
    id: 307,
    name: "Red-Black Tree",
    type: "Tree",
    complexity: "O(log n)",
    requiresSortedInput: false,
    source: redBlackTree.toString(),
    run: (values) => redBlackTree(values),
    demo: { input: [10, 20, 30, 15, 25, 5] },
    summary: "Self-balancing BST using color properties.",
  },
  {
    id: 308,
    name: "Splay Tree",
    type: "Tree",
    complexity: "O(log n) amortized",
    requiresSortedInput: false,
    source: splayTree.toString(),
    run: (operations) => splayTree(operations),
    demo: {
      input: [
        ["insert", 100],
        ["insert", 50],
        ["insert", 200],
        ["insert", 40],
        ["access", 50],
      ],
    },
    summary: "Self-balancing BST that moves recent nodes to root.",
  },
  {
    id: 309,
    name: "B-Tree",
    type: "Tree",
    complexity: "O(log n)",
    requiresSortedInput: false,
    source: bTree.toString(),
    run: (order, keys) => bTree(order, keys),
    demo: { input: 4, argument: [10, 20, 5, 6, 12, 30, 7, 17], argumentLabel: "Keys to insert" },
    summary: "Self-balancing search tree optimized for systems.",
  },
  {
    id: 310,
    name: "B+ Tree",
    type: "Tree",
    complexity: "O(log n) search, O(k) range scan",
    requiresSortedInput: false,
    source: bPlusTree.toString(),
    run: (order, entries) => bPlusTree(order, entries),
    demo: {
      input: 4,
      argument: [
        { key: 10, val: "Record A" },
        { key: 20, val: "Record B" },
        { key: 5, val: "Record C" },
        { key: 15, val: "Record D" },
        { key: 25, val: "Record E" },
      ],
      argumentLabel: "Records",
    },
    summary: "Variant of B-Tree with data in leaf nodes.",
  },
  {
    id: 311,
    name: "Trie (Prefix Tree)",
    type: "String",
    complexity: "O(L) where L is string length",
    requiresSortedInput: false,
    source: trie.toString(),
    run: (words, queries) => trie(words, queries),
    demo: {
      input: ["apple", "app", "application", "apt", "banana", "band"],
      argument: ["app", "ban", "cat"],
      argumentLabel: "Queries",
    },
    summary: "Tree used for fast string matching.",
  },
  {
    id: 312,
    name: "Radix Tree",
    type: "String",
    complexity: "O(k) where k is key length",
    requiresSortedInput: false,
    source: radixTree.toString(),
    run: (words, searchWords) => radixTree(words, searchWords),
    demo: {
      input: ["romane", "romanus", "romulus", "rubens", "ruber", "rubicon", "rubicundus"],
      argument: ["romane", "rubicon", "roman"],
      argumentLabel: "Search words",
    },
    summary: "Space-optimized trie where edges can be strings.",
  },
  {
    id: 313,
    name: "Suffix Tree",
    type: "String",
    complexity: "O(n²) build, O(m) search",
    requiresSortedInput: false,
    source: suffixTree.toString(),
    run: (text, pattern) => suffixTree(text, pattern),
    demo: { input: "banana", argument: "ana", argumentLabel: "Search pattern" },
    summary: "Compressed trie containing all suffixes of a text.",
  },
  {
    id: 314,
    name: "Segment Tree",
    type: "Data Structure",
    complexity: "O(n) build, O(log n) query/update",
    requiresSortedInput: false,
    source: segmentTree.toString(),
    run: (values, operations) => segmentTree(values, operations),
    demo: {
      input: [1, 3, 5, 7, 9, 11],
      argument: [
        { type: "query", left: 1, right: 3 },
        { type: "update", index: 1, value: 10 },
        { type: "query", left: 1, right: 3 },
      ],
      argumentLabel: "Operations",
    },
    summary: "Tree for storing intervals or segments.",
  },
  {
    id: 315,
    name: "Fenwick Tree (Binary Indexed Tree)",
    type: "Data Structure",
    complexity: "O(log n) query/update, O(n) space",
    requiresSortedInput: false,
    source: fenwickTree.toString(),
    run: (values, operations) => fenwickTree(values, operations),
    demo: {
      input: [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3],
      argument: [
        { type: "prefix", index: 4 },
        { type: "range", left: 2, right: 6 },
        { type: "update", index: 3, delta: 3 },
        { type: "range", left: 2, right: 6 },
      ],
      argumentLabel: "Operations",
    },
    summary: "Efficient prefix sum updates.",
  },
  {
    id: 316,
    name: "Quadtree",
    type: "Spatial Tree",
    complexity: "O(log n) insert/query",
    requiresSortedInput: false,
    source: quadtree.toString(),
    run: (points, boundary, queryRange) => quadtree(points, boundary, queryRange),
    demo: {
      input: [
        { x: 10, y: 20 },
        { x: 40, y: 50 },
        { x: 70, y: 80 },
        { x: 25, y: 35 },
        { x: 90, y: 90 },
      ],
      args: [{ minX: 0, minY: 0, maxX: 100, maxY: 100 }, { minX: 0, minY: 0, maxX: 50, maxY: 50 }],
    },
    summary: "Spatial tree where each node has four children.",
  },
  {
    id: 317,
    name: "Octree",
    type: "Spatial Tree",
    complexity: "O(log n) insert/query",
    requiresSortedInput: false,
    source: octree.toString(),
    run: (points, boundary, queryBox) => octree(points, boundary, queryBox),
    demo: {
      input: [
        { x: 10, y: 20, z: 30 },
        { x: 40, y: 50, z: 60 },
        { x: 70, y: 80, z: 90 },
        { x: 25, y: 35, z: 45 },
      ],
      args: [
        { minX: 0, minY: 0, minZ: 0, maxX: 100, maxY: 100, maxZ: 100 },
        { minX: 0, minY: 0, minZ: 0, maxX: 50, maxY: 50, maxZ: 50 },
      ],
    },
    summary: "Spatial tree where each node has eight children.",
  },
  {
    id: 318,
    name: "k-d Tree",
    type: "Spatial Tree",
    complexity: "O(n log n) build, O(log n) nearest search",
    requiresSortedInput: false,
    source: kdTree.toString(),
    run: (points, targetPoint) => kdTree(points, targetPoint),
    demo: {
      input: [
        [2, 3],
        [5, 4],
        [9, 6],
        [4, 7],
        [8, 1],
        [7, 2],
      ],
      argument: [9, 2],
      argumentLabel: "Target point",
    },
    summary: "Space-partitioning tree for organizing points in k-dimensions.",
  },
  {
    id: 319,
    name: "Tournament Tree",
    type: "Tree",
    complexity: "O(n) build, O(log n) update",
    requiresSortedInput: false,
    source: tournamentTree.toString(),
    run: (competitors) => tournamentTree(competitors),
    demo: {
      input: [
        { name: "Alice", score: 85 },
        { name: "Bob", score: 92 },
        { name: "Carol", score: 78 },
        { name: "Dave", score: 95 },
      ],
    },
    summary: "Binary tree representing a knockout tournament.",
  },
  {
    id: 320,
    name: "Decision Tree",
    type: "Tree",
    complexity: "O(depth) prediction",
    requiresSortedInput: false,
    source: decisionTree.toString(),
    run: (trainingData, sample) => decisionTree(trainingData, sample),
    demo: {
      input: [
        { outlook: "Sunny", humidity: "High", outcome: "No" },
        { outlook: "Sunny", humidity: "Normal", outcome: "Yes" },
        { outlook: "Overcast", humidity: "High", outcome: "Yes" },
        { outlook: "Rain", humidity: "High", outcome: "No" },
      ],
      argument: { outlook: "Overcast", humidity: "High" },
      argumentLabel: "Test sample",
    },
    summary: "Tree mapping observations to conclusions.",
  },
  {
    id: 321,
    name: "Treap",
    type: "Priority Queue",
    complexity: "O(log n) expected",
    requiresSortedInput: false,
    source: treap.toString(),
    run: (operations) => treap(operations),
    demo: {
      input: [
        ["insert", 10, 50],
        ["insert", 20, 90],
        ["insert", 5, 70],
        ["insert", 15, 30],
        ["search", 15],
      ],
    },
    summary: "Randomized BST combining a tree and a heap.",
  },
  {
    id: 322,
    name: "Vantage-point Tree",
    type: "Spatial Tree",
    complexity: "O(n log n) build, O(log n) search",
    requiresSortedInput: false,
    source: vantagePointTree.toString(),
    run: (points, queryPoint, k) => vantagePointTree(points, queryPoint, k),
    demo: {
      input: [
        { x: 1, y: 1 },
        { x: 2, y: 3 },
        { x: 8, y: 8 },
        { x: 9, y: 7 },
        { x: 5, y: 5 },
      ],
      argument: { x: 2, y: 2 },
      argumentLabel: "Query point",
    },
    summary: "Metric tree for nearest neighbor searches.",
  },
  {
    id: 323,
    name: "BK-Tree",
    type: "Metric Tree",
    complexity: "O(log n) fuzzy lookup",
    requiresSortedInput: false,
    source: bkTree.toString(),
    run: (words, query, maxDistance) => bkTree(words, query, maxDistance),
    demo: {
      input: ["book", "books", "boo", "boon", "cook", "cake", "cool", "boom"],
      args: ["book", 1],
    },
    summary: "Metric tree specialized for string distance matching.",
  },
  {
    id: 324,
    name: "Binary Heap",
    type: "Heap",
    complexity: "O(log n) insert/extract, O(1) peek",
    requiresSortedInput: false,
    source: binaryHeapPriorityQueue.toString(),
    run: (operations) => binaryHeapPriorityQueue(operations),
    demo: {
      input: [
        ["insert", 15],
        ["insert", 10],
        ["insert", 20],
        ["insert", 5],
        ["extractMin"],
      ],
    },
    summary: "Complete binary tree used for priority queues.",
  },
  {
    id: 325,
    name: "Binomial Heap",
    type: "Priority Queue",
    complexity: "O(log n) insert/extract/union",
    requiresSortedInput: false,
    source: binomialHeapStructure.toString(),
    run: (values) => binomialHeapStructure(values),
    demo: { input: [12, 7, 25, 15, 28, 33, 41, 1] },
    summary: "Collection of binomial trees.",
  },
  {
    id: 326,
    name: "Fibonacci Heap",
    type: "Priority Queue",
    complexity: "O(1) amortized insert, O(log n) extractMin",
    requiresSortedInput: false,
    source: fibonacciHeapStructure.toString(),
    run: (operations) => fibonacciHeapStructure(operations),
    demo: {
      input: [
        ["insert", 10],
        ["insert", 3],
        ["insert", 15],
        ["insert", 6],
      ],
    },
    summary: "Heap with faster amortized running times.",
  },
  {
    id: 327,
    name: "Leftist Heap",
    type: "Meldable Heap",
    complexity: "O(log n) merge/insert",
    requiresSortedInput: false,
    source: leftistHeapStructure.toString(),
    run: (firstValues, secondValues) => leftistHeapStructure(firstValues, secondValues),
    demo: {
      input: [3, 10, 8],
      argument: [6, 14, 21, 7],
      argumentLabel: "Second heap",
    },
    summary: "Variant of binary heap optimized for merging.",
  },
  {
    id: 328,
    name: "Skew Heap",
    type: "Meldable Heap",
    complexity: "O(log n) amortized merge",
    requiresSortedInput: false,
    source: skewHeapStructure.toString(),
    run: (firstValues, secondValues) => skewHeapStructure(firstValues, secondValues),
    demo: {
      input: [5, 12, 9],
      argument: [2, 8, 15],
      argumentLabel: "Second heap",
    },
    summary: "Self-adjusting heap variant of leftist heap.",
  },
  {
    id: 329,
    name: "D-ary Heap",
    type: "Heap",
    complexity: "O(log_d n) insert, O(d log_d n) extractMin",
    requiresSortedInput: false,
    source: dAryHeapStructure.toString(),
    run: (d, values) => dAryHeapStructure(d, values),
    demo: {
      input: 4,
      argument: [45, 12, 89, 3, 27, 65, 18, 9, 33, 2, 70],
      argumentLabel: "Values",
    },
    summary: "Generalization of binary heap with D children.",
  },
  {
    id: 330,
    name: "Weak Heap",
    type: "Heap",
    complexity: "O(log n)",
    requiresSortedInput: false,
    source: weakHeapStructure.toString(),
    run: (values) => weakHeapStructure(values),
    demo: { input: [16, 4, 10, 14, 7, 9, 3, 2, 8, 1] },
    summary: "Heap variant with fewer structural constraints.",
  },
  {
    id: 331,
    name: "Beap",
    type: "Priority Queue",
    complexity: "O(√n) search",
    requiresSortedInput: false,
    source: beapStructure.toString(),
    run: (values, target) => beapStructure(values, target),
    demo: {
      input: [1, 2, 4, 3, 5, 7, 6, 8, 9, 10],
      argument: 7,
      argumentLabel: "Search target",
    },
    summary: "Bi-parental heap data structure.",
  },
  {
    id: 332,
    name: "Pairing Heap",
    type: "Meldable Heap",
    complexity: "O(1) insert/merge, O(log n) deleteMin",
    requiresSortedInput: false,
    source: pairingHeapMeldable.toString(),
    run: (operations) => pairingHeapMeldable(operations),
    demo: {
      input: [
        ["insert", 10],
        ["insert", 5],
        ["insert", 15],
        ["insert", 2],
        ["extractMin"],
        ["insert", 8],
      ],
    },
    summary: "Simple, highly efficient self-adjusting heap.",
  },
  {
    id: 333,
    name: "Treap (Min-Max variant)",
    type: "Priority Queue",
    complexity: "O(log n) search/insert, O(1) peek",
    requiresSortedInput: false,
    source: treapMinMaxStructure.toString(),
    run: (operations) => treapMinMaxStructure(operations),
    demo: {
      input: [
        ["insert", 20],
        ["insert", 5],
        ["insert", 35],
        ["insert", 10],
        ["insert", 50],
      ],
    },
    summary: "Maintains both minimum and maximum properties.",
  },
  {
    id: 334,
    name: "In-order Traversal",
    type: "Tree Traversal",
    complexity: "O(n) time, O(h) space",
    requiresSortedInput: false,
    source: inOrderTraversal.toString(),
    run: (root) => inOrderTraversal(root),
    demo: {
      input: {
        value: 4,
        left: { value: 2, left: { value: 1 }, right: { value: 3 } },
        right: { value: 6, left: { value: 5 }, right: { value: 7 } },
      },
    },
    summary: "Visit left, root, right.",
  },
  {
    id: 335,
    name: "Pre-order Traversal",
    type: "Tree Traversal",
    complexity: "O(n) time, O(h) space",
    requiresSortedInput: false,
    source: preOrderTraversal.toString(),
    run: (root) => preOrderTraversal(root),
    demo: {
      input: {
        value: 4,
        left: { value: 2, left: { value: 1 }, right: { value: 3 } },
        right: { value: 6, left: { value: 5 }, right: { value: 7 } },
      },
    },
    summary: "Visit root, left, right.",
  },
  {
    id: 336,
    name: "Post-order Traversal",
    type: "Tree Traversal",
    complexity: "O(n) time, O(h) space",
    requiresSortedInput: false,
    source: postOrderTraversal.toString(),
    run: (root) => postOrderTraversal(root),
    demo: {
      input: {
        value: 4,
        left: { value: 2, left: { value: 1 }, right: { value: 3 } },
        right: { value: 6, left: { value: 5 }, right: { value: 7 } },
      },
    },
    summary: "Visit left, right, root.",
  },
  {
    id: 337,
    name: "Level-order Traversal",
    type: "Tree Traversal",
    complexity: "O(n) time, O(w) space",
    requiresSortedInput: false,
    source: levelOrderTraversal.toString(),
    run: (root) => levelOrderTraversal(root),
    demo: {
      input: {
        value: 4,
        left: { value: 2, left: { value: 1 }, right: { value: 3 } },
        right: { value: 6, left: { value: 5 }, right: { value: 7 } },
      },
    },
    summary: "Visit nodes level by level (BFS).",
  },
  {
    id: 338,
    name: "Morris Traversal",
    type: "Tree Traversal",
    complexity: "O(n) time, O(1) auxiliary space",
    requiresSortedInput: false,
    source: morrisInOrderTraversal.toString(),
    run: (root) => morrisInOrderTraversal(root),
    demo: {
      input: {
        value: 4,
        left: { value: 2, left: { value: 1 }, right: { value: 3 } },
        right: { value: 6, left: { value: 5 }, right: { value: 7 } },
      },
    },
    summary: "In-order traversal using zero extra memory.",
  },
  {
    id: 339,
    name: "Lowest Common Ancestor (LCA) - Naive",
    type: "Tree Algorithm",
    complexity: "O(N) time per query",
    requiresSortedInput: false,
    source: lcaNaive.toString(),
    run: (parentMap, u, v) => lcaNaive(parentMap, u, v),
    demo: {
      input: { 1: null, 2: 1, 3: 1, 4: 2, 5: 2, 6: 3, 7: 5 },
      args: [4, 7],
    },
    summary: "Finding shared ancestor by climbing.",
  },
  {
    id: 340,
    name: "LCA - Binary Lifting",
    type: "Tree Algorithm",
    complexity: "O(N log N) preprocessing, O(log N) query",
    requiresSortedInput: false,
    source: lcaBinaryLifting.toString(),
    run: (tree, root, queries) => lcaBinaryLifting(tree, root, queries),
    demo: {
      input: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [7], 6: [], 7: [] },
      args: [1, [[4, 7], [4, 6], [5, 7]]],
    },
    summary: "O(log N) ancestor queries using powers of two.",
  },
  {
    id: 341,
    name: "LCA - Tarjan's Offline",
    type: "Tree Algorithm",
    complexity: "O(N + Q · α(N)) time",
    requiresSortedInput: false,
    source: tarjanOfflineLCA.toString(),
    run: (tree, root, queryPairs) => tarjanOfflineLCA(tree, root, queryPairs),
    demo: {
      input: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [7], 6: [], 7: [] },
      args: [1, [[4, 7], [6, 7], [2, 5]]],
    },
    summary: "Finding all LCA pairs using Union-Find.",
  },
  {
    id: 342,
    name: "Euler Tour Technique",
    type: "Tree Algorithm",
    complexity: "O(N) time",
    requiresSortedInput: false,
    source: eulerTour.toString(),
    run: (tree, root) => eulerTour(tree, root),
    demo: {
      input: { 1: [2, 3], 2: [4, 5], 3: [], 4: [], 5: [] },
      argument: 1,
      argumentLabel: "Root node",
    },
    summary: "Flattening a tree into an array.",
  },
  {
    id: 343,
    name: "Heavy-Light Decomposition",
    type: "Tree Algorithm",
    complexity: "O(N) decomposition, O(log² N) path query",
    requiresSortedInput: false,
    source: heavyLightDecomposition.toString(),
    run: (tree, root) => heavyLightDecomposition(tree, root),
    demo: {
      input: { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] },
      argument: 1,
      argumentLabel: "Root node",
    },
    summary: "Path-based partitioning for tree path queries.",
  },
  {
    id: 344,
    name: "Centroid Decomposition",
    type: "Tree Algorithm",
    complexity: "O(N log N) time, O(log N) tree height",
    requiresSortedInput: false,
    source: centroidDecomposition.toString(),
    run: (tree) => centroidDecomposition(tree),
    demo: {
      input: { 1: [2, 3], 2: [1, 4, 5], 3: [1, 6], 4: [2], 5: [2], 6: [3] },
    },
    summary: "Divide-and-conquer strategy on tree structures.",
  },
  {
    id: 345,
    name: "Tree Isomorphism Algorithm",
    type: "Tree Algorithm",
    complexity: "O(N log N) canonical hashing",
    requiresSortedInput: false,
    source: treeIsomorphism.toString(),
    run: (tree1, tree2) => treeIsomorphism(tree1, tree2),
    demo: {
      input: { 1: [2, 3], 2: [1], 3: [1] },
      argument: { 10: [20], 20: [10, 30], 30: [20] },
      argumentLabel: "Second tree",
    },
    summary: "Checking if two trees are identical.",
  },
  {
    id: 346,
    name: "Prüfer Sequence",
    type: "Combinatorics",
    complexity: "O(N log N) encoding/decoding",
    requiresSortedInput: false,
    source: pruferSequence.toString(),
    run: (edges, n) => pruferSequence(edges, n),
    demo: {
      input: [[1, 2], [1, 3], [1, 4], [4, 5], [4, 6]],
      argument: 6,
      argumentLabel: "Node count N",
    },
    summary: "Unique integer sequence encoding labeled trees.",
  },
  {
    id: 347,
    name: "Adjacency Matrix",
    type: "Graph Representation",
    complexity: "O(V²) space, O(1) edge lookup",
    requiresSortedInput: false,
    source: adjacencyMatrixRepresentation.toString(),
    run: (vertices, edges, directed) => adjacencyMatrixRepresentation(vertices, edges, directed),
    demo: {
      input: ["A", "B", "C", "D"],
      args: [
        [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]],
        false,
      ],
    },
    summary: "2D array indicating edge existence.",
  },
  {
    id: 348,
    name: "Adjacency List",
    type: "Graph Representation",
    complexity: "O(V + E) space, O(deg(V)) neighbor traversal",
    requiresSortedInput: false,
    source: adjacencyListRepresentation.toString(),
    run: (vertices, edges, directed) => adjacencyListRepresentation(vertices, edges, directed),
    demo: {
      input: ["A", "B", "C", "D"],
      args: [
        [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]],
        false,
      ],
    },
    summary: "Array of lists showing connected neighbors.",
  },
  {
    id: 349,
    name: "Incidence Matrix",
    type: "Graph Representation",
    complexity: "O(V · E) space",
    requiresSortedInput: false,
    source: incidenceMatrixRepresentation.toString(),
    run: (vertices, edges, directed) => incidenceMatrixRepresentation(vertices, edges, directed),
    demo: {
      input: ["A", "B", "C"],
      args: [
        [["A", "B"], ["B", "C"], ["A", "C"]],
        false,
      ],
    },
    summary: "Matrix showing relationships between vertices and edges.",
  },
  {
    id: 350,
    name: "Edge List",
    type: "Graph Representation",
    complexity: "O(E) space, O(E) edge scan",
    requiresSortedInput: false,
    source: edgeListRepresentation.toString(),
    run: (edges, weighted) => edgeListRepresentation(edges, weighted),
    demo: {
      input: [
        ["A", "B", 4],
        ["A", "C", 2],
        ["B", "C", 1],
        ["B", "D", 5],
      ],
    },
    summary: "Simple list containing all graph edges.",
  },
  {
    id: 351,
    name: "Compressed Sparse Row (CSR)",
    type: "Graph Representation",
    complexity: "O(V + E) space, cache-friendly array storage",
    requiresSortedInput: false,
    source: compressedSparseRowRepresentation.toString(),
    run: (matrix) => compressedSparseRowRepresentation(matrix),
    demo: {
      input: [
        [0, 1, 1, 0],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 0],
      ],
    },
    summary: "Space-efficient matrix graph storage.",
  },
  {
    id: 352,
    name: "Disjoint Set Union (DSU / Union-Find)",
    type: "Data Structure",
    complexity: "O(α(N)) amortized per operation",
    requiresSortedInput: false,
    source: disjointSetUnionGraph.toString(),
    run: (nodes, operations) => disjointSetUnionGraph(nodes, operations),
    demo: {
      input: ["A", "B", "C", "D", "E"],
      argument: [
        ["union", "A", "B"],
        ["union", "B", "C"],
        ["find", "A"],
        ["connected", "A", "C"],
        ["connected", "A", "D"],
      ],
      argumentLabel: "Operations",
    },
    summary: "Tracks partitioned graph components.",
  },
  {
    id: 353,
    name: "Breadth-First Search (BFS)",
    type: "Graph Traversal",
    complexity: "O(V + E) time, O(V) space",
    requiresSortedInput: false,
    source: bfsTraversal.toString(),
    run: (graph, start) => bfsTraversal(graph, start),
    demo: {
      input: {
        A: ["B", "C"],
        B: ["A", "D", "E"],
        C: ["A", "F"],
        D: ["B"],
        E: ["B", "F"],
        F: ["C", "E"],
      },
      argument: "A",
      argumentLabel: "Start node",
    },
    summary: "Explores closest neighbors first.",
  },
  {
    id: 354,
    name: "Depth-First Search (DFS)",
    type: "Graph Traversal",
    complexity: "O(V + E) time, O(V) space",
    requiresSortedInput: false,
    source: dfsTraversal.toString(),
    run: (graph, start) => dfsTraversal(graph, start),
    demo: {
      input: {
        A: ["B", "C"],
        B: ["A", "D", "E"],
        C: ["A", "F"],
        D: ["B"],
        E: ["B", "F"],
        F: ["C", "E"],
      },
      argument: "A",
      argumentLabel: "Start node",
    },
    summary: "Explores deep along paths first.",
  },
  {
    id: 355,
    name: "IDDFS (Iterative Deepening DFS)",
    type: "Graph Traversal",
    complexity: "O(b^d) time, O(d) space",
    requiresSortedInput: false,
    source: iterativeDeepeningDfs.toString(),
    run: (graph, start, target, maxDepth) => iterativeDeepeningDfs(graph, start, target, maxDepth),
    demo: {
      input: {
        A: ["B", "C"],
        B: ["D", "E"],
        C: ["F", "G"],
        D: ["H"],
        E: [],
        F: [],
        G: [],
        H: [],
      },
      args: ["A", "H", 5],
    },
    summary: "Combines DFS space and BFS completeness.",
  },
  {
    id: 356,
    name: "Bidirectional Search",
    type: "Graph Traversal",
    complexity: "O(b^(d/2)) time and space",
    requiresSortedInput: false,
    source: bidirectionalSearchGraph.toString(),
    run: (graph, start, target) => bidirectionalSearchGraph(graph, start, target),
    demo: {
      input: {
        A: ["B", "C"],
        B: ["A", "D"],
        C: ["A", "E"],
        D: ["B", "F"],
        E: ["C", "F"],
        F: ["D", "E"],
      },
      args: ["A", "F"],
    },
    summary: "Two simultaneous BFS runs meeting in middle.",
  },
  {
    id: 357,
    name: "Topological Sort (Kahn's)",
    type: "Graph Algorithm",
    complexity: "O(V + E) time, O(V) space",
    requiresSortedInput: false,
    source: topologicalSortKahn.toString(),
    run: (vertices, edges) => topologicalSortKahn(vertices, edges),
    demo: {
      input: ["5", "4", "2", "3", "1", "0"],
      argument: [
        ["5", "2"],
        ["5", "0"],
        ["4", "0"],
        ["4", "1"],
        ["2", "3"],
        ["3", "1"],
      ],
      argumentLabel: "Directed edges",
    },
    summary: "Orders directed acyclic graph (DAG) vertices linearly.",
  },
  {
    id: 358,
    name: "Topological Sort (DFS-based)",
    type: "Graph Algorithm",
    complexity: "O(V + E) time, O(V) space",
    requiresSortedInput: false,
    source: topologicalSortDfs.toString(),
    run: (vertices, edges) => topologicalSortDfs(vertices, edges),
    demo: {
      input: ["5", "4", "2", "3", "1", "0"],
      argument: [
        ["5", "2"],
        ["5", "0"],
        ["4", "0"],
        ["4", "1"],
        ["2", "3"],
        ["3", "1"],
      ],
      argumentLabel: "Directed edges",
    },
    summary: "Orders DAG vertices using finish times.",
  },
  {
    id: 359,
    name: "Fleury's Algorithm",
    type: "Graph Algorithm",
    complexity: "O(E²) time",
    requiresSortedInput: false,
    source: fleurysAlgorithm.toString(),
    run: (vertices, edges) => fleurysAlgorithm(vertices, edges),
    demo: {
      input: ["0", "1", "2", "3"],
      argument: [
        ["0", "1"],
        ["1", "2"],
        ["2", "3"],
        ["3", "0"],
        ["0", "2"],
      ],
      argumentLabel: "Edges",
    },
    summary: "Finds Eulerian paths by avoiding bridges.",
  },
  {
    id: 360,
    name: "Hierholzer's Algorithm",
    type: "Graph Algorithm",
    complexity: "O(V + E) time",
    requiresSortedInput: false,
    source: hierholzersAlgorithm.toString(),
    run: (vertices, edges, directed) => hierholzersAlgorithm(vertices, edges, directed),
    demo: {
      input: ["0", "1", "2", "3"],
      args: [
        [
          ["0", "1"],
          ["1", "2"],
          ["2", "3"],
          ["3", "0"],
          ["0", "2"],
        ],
        false,
      ],
    },
    summary: "Efficiently finds Eulerian paths via cycles.",
  },
  {
    id: 361,
    name: "Hopcroft-Tarjan Algorithm",
    type: "Graph Algorithm",
    complexity: "O(V + E) time",
    requiresSortedInput: false,
    source: hopcroftTarjanBiconnected.toString(),
    run: (vertices, edges) => hopcroftTarjanBiconnected(vertices, edges),
    demo: {
      input: ["0", "1", "2", "3", "4", "5"],
      argument: [
        ["0", "1"],
        ["1", "2"],
        ["2", "0"],
        ["1", "3"],
        ["3", "4"],
        ["4", "5"],
        ["5", "3"],
      ],
      argumentLabel: "Edges",
    },
    summary: "Identifies biconnected components and articulations.",
  },
  {
    id: 362,
    name: "Karger's Algorithm",
    type: "Graph Algorithm",
    complexity: "O(V² · iterations) randomized",
    requiresSortedInput: false,
    source: kargersMinCut.toString(),
    run: (vertices, edges, iterations, seed) => kargersMinCut(vertices, edges, iterations, seed),
    demo: {
      input: ["0", "1", "2", "3"],
      args: [
        [
          ["0", "1"],
          ["0", "2"],
          ["0", "3"],
          ["1", "2"],
          ["2", "3"],
        ],
        30,
        42,
      ],
    },
    summary: "Randomized algorithm for minimum graph cuts.",
  },
];
