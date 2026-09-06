import test from "node:test";
import assert from "node:assert/strict";
import { algorithms } from "../src/algorithms.js";

const sortingAlgorithms = algorithms.filter(({ type }) => type === "Sorting");
const searchingAlgorithms = algorithms.filter(({ type }) => type === "Searching");
const input = [9, 2, 7, 2, -1, 5];

test("provides five hundred and forty-seven algorithms", () => {
  assert.equal(algorithms.length, 547);
  assert.equal(sortingAlgorithms.length, 10);
  assert.equal(searchingAlgorithms.length, 5);
});

test("runs the added numerical methods and graph algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.ok(Math.abs(find(494).run(1, 0, 1, 0.1) - 4) < 0.01);
  assert.ok(Math.abs(find(495).run([1, 0, 0], 0, 1, 100) - 1 / 3) < 1e-8);
  assert.ok(Math.abs(find(496).run([1, 0, 0], 0, 1, 100) - 1 / 3) < 1e-4);
  assert.ok(Math.abs(find(497).run([1, 0, -2], 1, 2, 10) - Math.sqrt(2)) < 1e-8);
  assert.equal(find(498).run(["A", "B", "C", "D"], [["A", "B", 1], ["B", "C", 2], ["A", "C", 3], ["C", "D", 1], ["B", "D", 4]]).weight, 4);
  assert.equal(find(499).run({ A: [["B", 1], ["C", 3]], B: [["A", 1], ["C", 2], ["D", 4]], C: [["A", 3], ["B", 2], ["D", 1]], D: [["B", 4], ["C", 1]] }, "A").weight, 4);
  assert.equal(find(500).run([[0, 3, 2, 0], [0, 0, 0, 2], [0, 0, 0, 3], [0, 0, 0, 0]], 0, 3), 4);
});

test("runs the added numerical methods and optimization algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  const solution = find(484).run([[4, 1], [2, 3]], [1, 2], 25);
  assert.ok(Math.abs(solution[0] - 0.1) < 1e-6);
  assert.deepEqual(find(485).run([[1, 0], [1, 1]]), [[1, 0], [0, 1]]);
  const ranks = find(486).run({ A: ["B"], B: ["A", "C"], C: [] });
  assert.ok(Math.abs(Object.values(ranks).reduce((sum, value) => sum + value, 0) - 1) < 1e-9);
  assert.ok(find(487).run([[2, 0], [0, 1]], 10).eigenvalue > 1.9);
  assert.deepEqual(find(488).run([[1, 0], [0, 1]]), { Q: [[1, 0], [0, 1]], R: [[1, 0], [0, 1]] });
  assert.ok(find(489).run([3, 2], [{ a: [1, 1], b: 4 }, { a: [1, 0], b: 2 }, { a: [0, 1], b: 3 }]).value > 10);
  assert.ok(Math.abs(find(490).run(10, 0.1, 50)) < 0.001);
  assert.ok(Math.abs(find(491).run(1, 10) - Math.sqrt(2)) < 1e-9);
  assert.ok(find(492).run([[0, 1], [1, 3], [2, 5]], [0, 0], 100)[0] > 1.5);
  assert.ok(find(493).run("HELLO", 20, 30).score > 0);
});

test("runs the added number-theory, FFT, and multiplication algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.deepEqual(find(479).run(240, 46), { gcd: 2, x: -9, y: 47 });
  assert.deepEqual(find(480).run(30), [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
  const fft = find(481).run([1, 2, 3, 4]);
  assert.equal(fft.length, 4);
  assert.ok(Math.abs(fft[0].real - 10) < 1e-9);
  assert.equal(find(482).run("123456789", "987654321"), "121932631112635269");
  assert.equal(find(483).run("12345678901234567890", "98765432109876543210"), "1219326311370217952237463801111263526900");
});

test("runs the added dynamic programming and graph algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.equal(find(471).run("ABABC", "BABCA"), 4);
  assert.equal(find(472).run("bbbab"), 4);
  assert.equal(find(473).run(2, [[1, 0]]), true);
  assert.deepEqual(find(474).run(2, [[1, 0]]), [0, 1]);
  assert.equal(find(475).run(["wrt", "wrf", "er", "ett", "rftt"]), "wertf");
});

test("runs the added trie and Hilbert curve algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.deepEqual(
    find(476).run([["insert", "apple"], ["search", "apple"], ["startsWith", "app"], ["search", "app"]]),
    [true, true, false],
  );
  assert.deepEqual(
    find(477).run([["addWord", "bad"], ["addWord", "dad"], ["search", ".ad"], ["search", "pad"]]),
    [true, false],
  );
  assert.equal(find(478).run(2).length, 16);
});

test("runs the added binary-search, pair-sum, and target-sum algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.equal(find(467).run([10, 8, 6, 4, 2], 6), 2);
  assert.equal(find(467).run([2, 4, 6, 8, 10], 7), -1);
  assert.ok([1, 3, 5].includes(find(468).run([1, 2, 1, 3, 5, 6, 4])));
  assert.deepEqual(find(469).run([1, 7, 11], [2, 4, 6], 3), [[1, 2], [1, 4], [1, 6]]);
  assert.equal(find(470).run([1, 1, 1, 1, 1], 3), 5);
});

test("runs the added path, graph, tree, and heap algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.equal(find(461).run([[0, 0, 0], [1, 1, 0], [0, 0, 0]], [0, 0], [2, 2]), 4);
  assert.equal(find(462).run({ A: ["B"], B: ["A"], C: [], D: ["E"], E: ["D"] }), 3);
  assert.equal(find(463).run({ value: 5, left: { value: 4, left: { value: 11, left: null, right: null }, right: null }, right: { value: 8, left: null, right: null } }, 20), true);
  assert.deepEqual(find(464).run({ 1: [2, 4], 2: [1, 3], 3: [2, 4], 4: [1, 3] }, 1), { 1: [2, 4], 2: [1, 3], 4: [1, 3], 3: [2, 4] });
  assert.equal(find(465).run([1, 2, 3, 4]), 2.5);
  assert.equal(find(466).run(2, 0, [1, 2, 3], [0, 1, 1]), 4);
});

test("runs the added interval and array algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.deepEqual(find(457).run([[1, 3], [6, 9]], [2, 5]), [[1, 5], [6, 9]]);
  assert.equal(find(458).run([[0, 30], [5, 10], [15, 20]]), false);
  assert.equal(find(458).run([[0, 5], [5, 10], [15, 20]]), true);
  assert.equal(find(459).run([3, 0, 1]), 2);
  assert.deepEqual(find(460).run([4, 3, 2, 7, 8, 2, 3, 1]), [2, 3]);
});

test("runs the added two-pointer and sliding-window algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.deepEqual(find(451).run([2, 7, 11, 15], 9), [1, 2]);
  assert.deepEqual(find(452).run([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]), [0, 1, 2, 3, 4]);
  assert.equal(find(453).run("abcabcbb"), 3);
});

test("runs the added fast-and-slow pointer algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  assert.equal(find(454).run([1, 2, 3, 1], 0), true);
  assert.equal(find(455).run(19), true);
  assert.equal(find(455).run(2), false);
  assert.equal(find(456).run([1, 3, 4, 2, 2]), 2);
});

test("every sorting algorithm returns a sorted copy", () => {
  for (const algorithm of sortingAlgorithms) {
    assert.deepEqual(algorithm.run(input), [-1, 2, 2, 5, 7, 9], algorithm.name);
  }
  assert.deepEqual(input, [9, 2, 7, 2, -1, 5]);
});

test("every searching algorithm finds a target in sorted input", () => {
  const sorted = [-1, 2, 2, 5, 7, 9];

  for (const algorithm of searchingAlgorithms) {
    assert.notEqual(algorithm.run(sorted, 5), -1, algorithm.name);
    assert.equal(algorithm.run(sorted, 100), -1, algorithm.name);
  }
});

test("runs the ten additional tutorial algorithms", () => {
  const extras = algorithms.slice(10);
  assert.deepEqual(extras[0].run([1, 2, 4, 7, 11, 15], 15), [4, 11]);
  assert.equal(extras[1].run([2, 1, 5, 1, 3, 2], 3), 9);
  assert.deepEqual(extras[2].run(5), [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]);
  assert.equal(extras[3].run([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
  assert.equal(extras[4].run(10), 55);
  assert.equal(extras[5].run(84, 30), 6);
  assert.deepEqual(extras[6].run(10), [2, 3, 5, 7]);
  assert.deepEqual(
    extras[7].run({ A: ["B"], B: ["C"], C: [] }, "A", "C"),
    ["A", "B", "C"],
  );
  assert.deepEqual(
    extras[8].run({ A: ["B"], B: ["C"], C: [] }, "A", "C"),
    ["A", "B", "C"],
  );
  assert.deepEqual(
    extras[9].run({ A: [["B", 4], ["C", 2]], B: [["D", 5]], C: [["B", 1], ["D", 8]], D: [] }, "A"),
    { A: 0, B: 3, C: 2, D: 8 },
  );
});

test("runs the requested interview algorithms", () => {
  const extras = algorithms.slice(20);
  assert.deepEqual(extras[0].run([2, 7, 11, 15], 9), [0, 1]);
  assert.equal(extras[1].run("({[]})"), true);
  assert.deepEqual(extras[2].run([1, 2, 4], [1, 3, 4]), [1, 1, 2, 3, 4, 4]);
  assert.equal(extras[3].run([7, 1, 5, 3, 6, 4]), 5);
  assert.equal(extras[4].run("A man, a plan, a canal: Panama"), true);
  assert.deepEqual(
    extras[5].run({ value: 4, left: { value: 2, left: null, right: null }, right: { value: 7, left: null, right: null } }),
    { value: 4, left: { value: 7, left: null, right: null }, right: { value: 2, left: null, right: null } },
  );
  assert.equal(extras[6].run("anagram", "nagaram"), true);
  assert.deepEqual(
    extras[7].run([[1, 1, 1], [1, 1, 0], [1, 0, 1]], 1, 1, 2),
    [[2, 2, 2], [2, 2, 0], [2, 0, 1]],
  );
  assert.equal(
    extras[8].run({ value: 6, left: { value: 2, left: null, right: null }, right: { value: 8, left: null, right: null } }, 2, 8),
    6,
  );
  assert.equal(
    extras[9].run({ value: 3, left: { value: 9, left: null, right: null }, right: { value: 20, left: { value: 15, left: null, right: null }, right: { value: 7, left: null, right: null } } }),
    true,
  );
});

test("runs the linked list, stack, string, and array algorithms", () => {
  const extras = algorithms.slice(30);
  assert.equal(extras[0].run([1, 2, 3, 1], 0), true);
  assert.deepEqual(
    extras[1].run([["enqueue", 1], ["enqueue", 2], ["dequeue"], ["enqueue", 3], ["dequeue"]]),
    [1, 2],
  );
  assert.equal(extras[2].run(10, 6), 6);
  assert.equal(extras[3].run("aa", "aab"), true);
  assert.equal(extras[4].run(5), 8);
  assert.equal(extras[5].run("abccccdd"), 7);
  assert.deepEqual(extras[6].run([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);
  assert.equal(extras[7].run([2, 2, 1, 1, 1, 2, 2]), 2);
  assert.equal(extras[8].run("1010", "1011"), "10101");
  assert.equal(extras[9].run([1, 2, 3, 4, 5]), 3);
});

test("runs the latest dynamic programming, graph, and backtracking algorithms", () => {
  const extras = algorithms.slice(40);
  assert.equal(extras[0].run([1, 2, 5], 11), 3);
  assert.deepEqual(extras[1].run([1, 2, 3, 4]), [24, 12, 8, 6]);
  assert.deepEqual(
    extras[2].run([["push", -2], ["push", 0], ["push", -3], ["getMin"], ["pop"], ["getMin"]]),
    [-3, -2],
  );
  assert.equal(
    extras[3].run({ value: 2, left: { value: 1, left: null, right: null }, right: { value: 3, left: null, right: null } }),
    true,
  );
  assert.equal(
    extras[4].run([["1", "1", "0"], ["1", "0", "0"], ["0", "0", "1"]]),
    2,
  );
  assert.equal(extras[5].run([[2, 1, 1], [1, 1, 0], [0, 1, 1]]), 4);
  assert.equal(extras[6].run([4, 5, 6, 7, 0, 1, 2], 0), 4);
  assert.deepEqual(extras[7].run([2, 3, 6, 7], 7), [[2, 2, 3], [7]]);
  assert.equal(extras[8].run([1, 2, 3]).length, 6);
  assert.deepEqual(extras[9].run([[1, 3], [2, 6], [8, 10], [9, 12]]), [[1, 6], [8, 12]]);
});

test("runs the newest map, tree, matrix, and string algorithms", () => {
  const extras = algorithms.slice(50);
  assert.deepEqual(
    extras[0].run([
      { type: "set", key: "foo", value: "bar", timestamp: 1 },
      { type: "set", key: "foo", value: "bar2", timestamp: 4 },
      { type: "get", key: "foo", timestamp: 3 },
      { type: "get", key: "foo", timestamp: 5 },
    ]),
    ["bar", "bar2"],
  );
  assert.equal(extras[1].run([["John", "a@mail.com"], ["John", "a@mail.com", "b@mail.com"]]).length, 1);
  assert.deepEqual(extras[2].run([2, 0, 2, 1, 1, 0]), [0, 0, 1, 1, 2, 2]);
  assert.equal(extras[3].run("leetcode", ["leet", "code"]), true);
  assert.equal(extras[4].run("   -42 with words"), -42);
  assert.equal(extras[5].run([1, 2]).length, 4);
  assert.deepEqual(
    extras[6].run({ value: 1, left: { value: 2, left: null, right: { value: 5, left: null, right: null } }, right: { value: 3, left: null, right: { value: 4, left: null, right: null } } }),
    [1, 3, 4],
  );
  assert.equal(extras[7].run("babad").length, 3);
  assert.equal(extras[8].run(3, 7), 28);
  assert.deepEqual(
    extras[9].run([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]),
    { value: 3, left: { value: 9, left: null, right: null }, right: { value: 20, left: { value: 15, left: null, right: null }, right: { value: 7, left: null, right: null } } },
  );
  assert.equal(extras[10].run([1, 8, 6, 2, 5, 4, 8, 3, 7]), 49);
  assert.deepEqual(extras[11].run("23"), ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]);
  assert.equal(extras[12].run([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"), true);
  assert.deepEqual(extras[13].run("cbaebabacd", "abc"), [0, 6]);
  assert.equal(extras[14].run(7, [2, 3, 1, 2, 4, 3]), 2);
  assert.deepEqual(extras[15].run([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), [1, 2, 3, 6, 9, 8, 7, 4, 5]);
  assert.equal(extras[16].run([3, 34, 4, 12, 5, 2], 9), true);
  assert.equal(extras[17].run([1, 5, 11, 5]), true);
});

test("runs the advanced dynamic programming and tree algorithms", () => {
  const extras = algorithms.slice(68);
  assert.equal(extras[0].run("226"), 3);
  assert.equal(extras[1].run(3), 5);
  assert.equal(extras[2].run([2, 7, 9, 3, 1]), 12);
  assert.equal(extras[3].run([2, 3, 2]), 3);
  assert.equal(extras[4].run([10, 9, 2, 5, 3, 7, 101, 18]), 4);
  assert.equal(extras[5].run("abcde", "ace"), 3);
  assert.equal(extras[6].run("horse", "ros"), 3);
  assert.equal(extras[7].run("rabbbit", "rabbit"), 3);
  assert.equal(extras[8].run([["1", "0", "1"], ["1", "1", "1"]]), 1);
  assert.equal(extras[9].run([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
  assert.deepEqual(extras[10].run([1, 3, -1, -3, 5, 3, 6, 7], 3), [3, 3, 5, 5, 6, 7]);
  assert.equal(extras[11].run("ADOBECODEBANC", "ABC"), "BANC");
  const tree = { value: 1, left: { value: 2, left: null, right: null }, right: null };
  assert.deepEqual(extras[12].run(tree), tree);
  assert.equal(extras[13].run({ value: -10, left: { value: 9, left: null, right: null }, right: { value: 20, left: { value: 15, left: null, right: null }, right: { value: 7, left: null, right: null } } }), 42);
  assert.deepEqual(extras[14].run([[1, 4], [1, 3], [2, 6]]), [1, 1, 2, 3, 4, 6]);
  assert.deepEqual(extras[15].run([1, 2, 3, 4, 5], 2), [2, 1, 4, 3, 5]);
  const solved = extras[16].run([
    ["5", "3", ".", ".", "7", ".", ".", ".", "."],
    ["6", ".", ".", "1", "9", "5", ".", ".", "."],
    [".", "9", "8", ".", ".", ".", ".", "6", "."],
    ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
    ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
    ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
    [".", "6", ".", ".", ".", ".", "2", "8", "."],
    [".", ".", ".", "4", "1", "9", ".", ".", "5"],
    [".", ".", ".", ".", "8", ".", ".", "7", "9"],
  ]);
  assert.equal(solved.flat().includes("."), false);
});

test("runs the final backtracking, cache, graph, and greedy algorithms", () => {
  const extras = algorithms.slice(85);
  assert.equal(extras[0].run(4), 2);
  assert.equal(extras[1].run("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]), 5);
  assert.equal(extras[2].run("(1+(4+5+2)-3)+(6+8)"), 23);
  assert.deepEqual(extras[3].run("123", 6), ["1+2+3", "1*2*3"]);
  assert.deepEqual(extras[4].run("()())()"), ["(())()", "()()()"]);
  assert.equal(extras[5].run("aaa"), 6);
  assert.deepEqual(extras[6].run(5), [0, 1, 1, 2, 1, 2]);
  assert.deepEqual(extras[7].run([1, 1, 1, 2, 2, 3], 2), [1, 2]);
  assert.equal(extras[8].run([3, 2, 1, 5, 6, 4], 2), 5);
  assert.deepEqual(extras[9].run([["add", 1], ["add", 2], ["median"], ["add", 3], ["median"]]), [1.5, 2]);
  assert.equal(extras[10].run([100, 4, 200, 1, 3, 2]), 4);
  assert.equal(extras[11].run([1, 2, 3, 4, 5], [3, 4, 5, 1, 2]), 3);
  assert.deepEqual(extras[12].run([1, 2, 3]), [1, 3, 2]);
  assert.deepEqual(extras[13].run([["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["get", 3]], 2), [1, -1, 3]);
  assert.deepEqual(extras[14].run([["put", 1, 1], ["put", 2, 2], ["get", 1], ["put", 3, 3], ["get", 2], ["get", 3]], 2), [1, -1, 3]);
});

test("runs the number classification algorithms", () => {
  const numbers = algorithms.slice(100);
  assert.equal(numbers[0].run(123), true);
  assert.equal(numbers[1].run(9), true);
  assert.equal(numbers[2].run(3), true);
  assert.equal(numbers[3].run(153), true);
  assert.equal(numbers[4].run(6), true);
  assert.equal(numbers[5].run(19), true);
  assert.equal(numbers[6].run(4), true);
  assert.equal(numbers[7].run(18), true);
  assert.equal(numbers[8].run(12), true);
});

test("runs the additional number algorithms", () => {
  const numbers = algorithms.slice(109);
  assert.equal(numbers[0].run(8), true);
  assert.equal(numbers[1].run(220, 284), true);
  assert.equal(numbers[2].run(25), true);
  assert.equal(numbers[3].run(13), true);
  assert.equal(numbers[4].run(11), true);
  assert.equal(numbers[5].run(1331), true);
  assert.equal(numbers[6].run(29), true);
});

test("runs the latest number algorithms", () => {
  const numbers = algorithms.slice(116);
  assert.equal(numbers[0].run(4), true);
  assert.equal(numbers[1].run(11, 13), true);
  assert.equal(numbers[2].run(7), true);
  assert.equal(numbers[3].run(16), true);
  assert.equal(numbers[4].run(27), true);
  assert.equal(numbers[5].run(10), true);
  assert.equal(numbers[6].run(4937775), true);
  assert.equal(numbers[7].run(45), true);
  assert.equal(numbers[8].run(135), true);
  assert.equal(numbers[9].run(12), true);
  assert.equal(numbers[10].run(42), true);
  assert.equal(numbers[11].run(120), true);
  assert.equal(numbers[12].run(145), true);
  assert.equal(numbers[13].run(1729), true);
  assert.deepEqual(numbers[14].run(6), [6, 3, 10, 5, 16, 8, 4, 2, 1]);
});

test("runs the advanced number algorithms", () => {
  const numbers = algorithms.slice(131);
  assert.equal(numbers[0].run(11), true);
  assert.equal(numbers[1].run(15), true);
  assert.equal(numbers[2].run(1729), true);
  assert.equal(numbers[3].run(14), true);
  assert.equal(numbers[4].run(12), true);
  assert.equal(numbers[5].run(13), true);
  assert.equal(numbers[6].run(102), true);
  assert.equal(numbers[7].run(142857), true);
  assert.equal(numbers[8].run(25), true);
  assert.equal(numbers[9].run(18), true);
  assert.equal(numbers[10].run(197), true);
  assert.equal(numbers[11].run(235711), true);
  assert.equal(numbers[12].run(5), true);
  assert.equal(numbers[13].run(6), true);
  assert.equal(numbers[14].run(404), true);
  assert.equal(numbers[15].run(36), true);
  assert.equal(numbers[16].run(7), true);
  assert.equal(numbers[17].run(9), true);
  assert.equal(numbers[18].run(30), true);
});

test("runs the classical geometry algorithms", () => {
  const geometry = algorithms.slice(226);
  assert.equal(geometry[0].run({ x: 0, y: 0 }, { x: 3, y: 4 }), 5);
  assert.equal(geometry[1].run(3, 4), 5);
  assert.deepEqual(geometry[2].run(2), { circumference: 4 * Math.PI, area: 4 * Math.PI });
  assert.equal(geometry[3].run(3, 4, 5), 6);
  assert.ok(Math.abs(geometry[4].run({
    knownSide: 5, targetAngle: Math.PI / 6, knownAngle: Math.PI / 2,
    firstSide: 3, secondSide: 4, includedAngle: Math.PI / 2,
  }).sideFromSine - 2.5) < 1e-9);
  const bisector = geometry[5].run({ x: 1, y: 0 }, { x: 0, y: 1 });
  assert.ok(Math.abs(bisector.x - Math.SQRT1_2) < 1e-9);
  assert.ok(Math.abs(bisector.y - Math.SQRT1_2) < 1e-9);
  assert.deepEqual(geometry[6].run({ x: 0, y: 0 }, { x: 4, y: 0 }).midpoint, { x: 2, y: 0 });
  assert.equal(geometry[7].run({ x: 0, y: 0, r: 2 }, { x: 4, y: 0 }).length, 2);
  assert.deepEqual(geometry[8].run([3, 4, 5]), { inradius: 1, circumradius: 2.5 });
  assert.deepEqual(geometry[9].run(6), { interiorSum: 4 * Math.PI, regularExteriorAngle: Math.PI / 3 });
  assert.equal(geometry[10].run(5, 2).length, 5);
  assert.equal(geometry[11].run({ x: 0, y: 0 }, { x: 4, y: 0 }, 2).radius, 8 / 3);
  assert.deepEqual(geometry[12].run({ x: 1, y: 1 }, [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }]).centroid, { x: 1, y: 1 });
  assert.equal(geometry[13].run([2, 3, 4, 5], 2), 11.5);
  assert.equal(geometry[14].run([1, 1, 1], [1, 1, 1]).concurrent, true);
  assert.equal(geometry[15].run([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 2 }], [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 1, y: 3 }]).length, 3);
  assert.equal(geometry[16].run([{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 0 }, { x: 3, y: 1 }, { x: 4, y: 0 }, { x: 5, y: 1 }]).length, 3);
  assert.ok(geometry[17].run([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }]).x >= 0);
  assert.equal(geometry[18].run([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }]).orthocenter.x, 0);
  assert.equal(geometry[19].run([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 0, y: 3 }]).radius, 1.25);
});

test("runs the sequence and recursion algorithms", () => {
  const extras = algorithms.slice(246);
  assert.equal(extras[0].run(8), 44);
  assert.equal(extras[1].run(2, 2), 7);
  assert.deepEqual(extras[2].run(3), ["A->C", "A->B", "C->B", "A->C", "B->A", "B->C", "A->C"]);
  assert.equal(extras[3].run(2, 10), 1024);
  assert.equal(extras[3].run(2, -3), 0.125);
});

test("runs the 2D intersections and collisions algorithms", () => {
  const collision = algorithms.slice(250);
  assert.equal(collision[0].run({ x: 0, y: 0, r: 2 }, { x: 3, y: 0, r: 2 }), true);
  assert.equal(collision[1].run({ minX: 0, minY: 0, maxX: 2, maxY: 2 }, { minX: 2, minY: 1, maxX: 4, maxY: 3 }), true);
  assert.equal(collision[2].run({ x: 2, y: 2, r: 1 }, { minX: 0, minY: 0, maxX: 3, maxY: 3 }), true);
  assert.equal(collision[3].run({ x: 1, y: 1 }, { x: 0, y: 0, r: 2 }), true);
  assert.equal(collision[4].run({ x: 1, y: 1 }, { minX: 0, minY: 0, maxX: 2, maxY: 2 }), true);
  assert.deepEqual(
    collision[5].run({ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }),
    { x: 1, y: 1 },
  );
  assert.equal(collision[6].run({ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }), true);
  assert.deepEqual(collision[7].run({ x: 2, y: 3 }, { x: 0, y: 0 }, { x: 4, y: 0 }), { x: 2, y: 0, parameter: 0.5 });
  assert.deepEqual(collision[8].run({ x: 1, y: 1 }, { minX: 0, minY: 0, maxX: 4, maxY: 3 }), { x: 0, y: 1 });
  const hit = collision[9].run(
    { x: 1, y: 2, r: 1 },
    { x: 0, y: -1 },
    { start: { x: 0, y: 0 }, end: { x: 4, y: 0 } },
  );
  assert.equal(hit.time, 1);
  assert.deepEqual(hit.point, { x: 1, y: 0 });
});

test("runs the advanced physics and constraints algorithms", () => {
  const physics = algorithms.slice(260);
  assert.deepEqual(physics[0].run(12, 2, 3, 4), { xx: 25, yy: 20, zz: 13 });
  assert.deepEqual(physics[1].run(10, 2), { xx: 16, yy: 16, zz: 16 });
  const closest = physics[2].run(
    { start: { x: 0, y: 0, z: 1 }, end: { x: 0, y: 0, z: 3 }, radius: 0.5 },
    { normal: { x: 0, y: 0, z: 1 }, constant: 0 },
  );
  assert.equal(closest.planePoint.z, 0);
  assert.equal(physics[3].run(
    { start: { x: 0, y: 0, z: 0 }, end: { x: 0, y: 0, z: 4 }, radius: 1 },
    { minX: -0.5, minY: -0.5, minZ: 1, maxX: 0.5, maxY: 0.5, maxZ: 2 },
  ), true);
  assert.equal(physics[4].run(
    { minX: 0, minY: 0, minZ: 0, maxX: 3, maxY: 3, maxZ: 3 },
    { minX: 1, minY: 1, minZ: 1, maxX: 4, maxY: 4, maxZ: 4 },
  ), 8);
  assert.equal(physics[5].run(
    { minX: -2, minY: -2, minZ: -2, maxX: 2, maxY: 2, maxZ: 2 },
    { center: { x: 2.5, y: 0, z: 0 }, radius: 1 },
    { axis: "X", side: 1 },
  ).length, 4);
  assert.deepEqual(physics[6].run({ x: 0, y: 2, z: 0 }, { x: 3, y: 0, z: 0 }, { xx: 2, yy: 2, zz: 2 }), { x: 0, y: 0, z: -3 });
  const constrained = physics[7].run({ x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }, 2);
  assert.equal(constrained.second.x - constrained.first.x, 2);
  const clamped = physics[8].run({ x: 0, y: 0, z: 0.7071, w: 0.7071 }, Math.PI / 4);
  assert.ok(Math.abs(2 * Math.acos(clamped.w) - Math.PI / 4) < 0.001);
  assert.deepEqual(physics[9].run(
    { x: 2, y: 1, z: 0 },
    { start: { x: 0, y: 0, z: 0 }, end: { x: 4, y: 0, z: 0 }, radius: 1 },
  ), { x: 2, y: 0, z: 0, parameter: 0.5 });
});

test("runs all star pattern algorithms", () => {
  const patterns = algorithms.slice(270, 300);
  assert.equal(patterns.length, 30);
  for (const pattern of patterns) {
    const output = pattern.run(5);
    assert.equal(typeof output, "string", pattern.name);
    assert.ok(output.includes("*"), pattern.name);
  }
  assert.equal(patterns[0].run(2), "* *\n* *");
  assert.equal(patterns[8].run(3), "    *\n  * * *\n* * * * *");
});

test("runs the Fourier and harmonic analysis algorithms", () => {
  const analysis = algorithms.slice(150);
  const coefficient = analysis[0].run([1, 0, -1, 0], 1);
  assert.ok(Math.abs(coefficient.real + 0.5) < 0.000001);
  assert.ok(Math.abs(coefficient.imaginary) < 0.000001);
  const transform = analysis[1].run([1, 0, -1, 0], 0.25);
  assert.ok(Math.abs(transform.real - 2) < 0.000001);
  assert.ok(Math.abs(transform.imaginary) < 0.000001);
  assert.deepEqual(analysis[2].run([{ real: 1, imaginary: 0 }, { real: 0, imaginary: 0 }], 0), { real: 1, imaginary: 0 });
  const theorem = analysis[3].run([1, 2], [3, 4]);
  assert.deepEqual(theorem.convolution, [3, 10, 8]);
  theorem.recoveredFromTransform.forEach((value, index) => {
    assert.ok(Math.abs(value - theorem.convolution[index]) < 0.000001);
  });
});

test("runs the cryptography algorithms", () => {
  const crypto = algorithms.slice(154);
  assert.deepEqual(crypto[0].run(61, 53), { n: 3233, phi: 3120 });
  assert.equal(crypto[1].run(65, 17, 3233), 2790);
  assert.equal(crypto[2].run(2790, 2753, 3233), 65);
  assert.equal(crypto[3].run(5, 6, 15, 23), 2);
  assert.equal(crypto[4].run("Attack at Dawn!", 3), "Dwwdfn dw Gdzq!");
  assert.equal(crypto[5].run("Dwwdfn dw Gdzq!", 3), "Attack at Dawn!");
  assert.equal(
    crypto[6].run("hello"),
    "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  );
});

test("runs the heap and priority queue algorithms", () => {
  const heaps = algorithms.slice(161);
  assert.deepEqual(heaps[0].run([9, 4, 7, 1, 0, 3]), [0, 1, 3, 9, 4, 7]);
  assert.deepEqual(heaps[1].run([7, 3, 9, 1, 4]), [1, 3, 4, 7, 9]);
  assert.deepEqual(heaps[2].run([7, 3, 9, 1, 4]), [1, 3, 4, 7, 9]);
  assert.deepEqual(heaps[3].run([1, 4, 7], [2, 3, 8]), [1, 2, 3, 4, 7, 8]);
  assert.deepEqual(heaps[4].run([1, 4, 7], [2, 3, 8]), [1, 2, 3, 4, 7, 8]);
  assert.deepEqual(heaps[5].run([9, 4, 7, 1, 0, 3], 3), [0, 3, 7, 1, 4, 9]);
  assert.deepEqual(heaps[6].run([9, 4, 7, 1, 0, 3]), { values: [0, 1, 3, 4, 7, 9], reverseBits: [false, false, false, false, false, false] });
  assert.deepEqual(heaps[7].run([[1], [2, 4], [3, 5, 7], [6, 8, 9, 10]], 8), [3, 1]);
  assert.deepEqual(heaps[8].run([7, 3, 9, 1, 4]), [1, 3, 4, 7, 9]);
  assert.deepEqual(heaps[9].run([7, 3, 9, 1, 4]), { minimum: 1, maximum: 9, ordered: [1, 3, 4, 7, 9] });
});

test("runs the deep learning and neural network demonstrations", () => {
  const models = algorithms.slice(171);
  assert.deepEqual(
    models[0].run([1, 2], [[ [0.5, 0.5], [1, -1] ]], [[0, 0]]),
    [1.5, 0],
  );
  assert.deepEqual(
    models[1].run([[1, 2, 0], [0, 1, 3], [2, 0, 1]], [[1, 0], [0, -1]]),
    [[0, -1], [0, 0]],
  );
  assert.equal(models[2].run([1, 2, 3], 0.5, 0.8, 0).length, 3);
  assert.ok(Number.isFinite(models[3].run(1, 0, 0, { forget: 0, input: 0, output: 0, candidate: 0 }).hidden));
  assert.ok(Number.isFinite(models[4].run(1, 0, { update: 0, reset: 0, candidate: 0 })));
  assert.equal(models[5].run([1, 2, 3]).length, 3);
  assert.deepEqual(
    models[6].run([1, 2], [[0.5, 0.5]], [[1], [0.5]]),
    { encoded: [1.5], reconstructed: [1.5, 0.75] },
  );
  assert.ok(models[7].run(0.8, 1, 2, 1).generated > 0);
  assert.equal(models[8].run(2, Math.log(0.25), 1), 2.5);
  assert.deepEqual(
    models[9].run({ A: ["B"], B: ["A", "C"], C: ["B"] }, { A: 1, B: 2, C: 3 }, 1),
    { A: 1.5, B: 2, C: 2.5 },
  );
});

test("runs the collision and computational geometry algorithms", () => {
  const geometry = algorithms.slice(181);
  assert.equal(geometry[0].run({ minX: 0, minY: 0, maxX: 3, maxY: 3 }, { minX: 2, minY: 2, maxX: 5, maxY: 5 }), true);
  assert.equal(geometry[1].run({ x: 0, y: 0, z: 0, r: 2 }, { x: 3, y: 0, z: 0, r: 2 }), true);
  assert.equal(geometry[2].run({ x: 4, y: 2, r: 1 }, { minX: 0, minY: 0, maxX: 3, maxY: 3 }), true);
  assert.equal(geometry[3].run({ center: { x: 0, y: 0 }, half: { x: 2, y: 1 }, angle: 0 }, { center: { x: 2, y: 0 }, half: { x: 1, y: 1 }, angle: 0.2 }), true);
  assert.deepEqual(geometry[4].run({ minX: 0, minY: 0, maxX: 3, maxY: 3 }, { minX: 2, minY: 1, maxX: 5, maxY: 4 }), { x: -1, y: 0 });
  assert.deepEqual(
    geometry[5].run({ x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }, { x: 2, y: 2, z: 0 }, { x: 2, y: -2, z: 0 }),
    { first: { x: 2, y: 0, z: 0 }, second: { x: 2, y: 0, z: 0 } },
  );
  assert.equal(geometry[6].run([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 0, y: 2 }]).length, 4);
  assert.equal(geometry[7].run([{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 2 }, { x: 0, y: 2 }]).length, 2);
  assert.equal(geometry[8].run([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }]), 12);
  assert.equal(geometry[9].run([{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 3 }, { x: 0, y: 3 }]), "counter-clockwise");
  assert.equal(geometry[10].run({ x: 1, y: 1 }, { x: 0, y: 0, r: 2 }), true);
  assert.equal(geometry[11].run({ x: 1, y: 1 }, [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }]), true);
  assert.equal(geometry[12].run({ x: 0, y: 0, r: 2 }, { x: 2, y: 0, r: 2 }).length, 2);
  assert.equal(geometry[13].run([{ x: -1, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }]).radius > 1, true);
  assert.deepEqual(geometry[14].run([{ x: 0, y: 0 }, { x: 4, y: 0 }], [{ x: 1, y: 0 }, { x: 3, y: 0 }]), [0, 1]);
  assert.ok(geometry[15].run([{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 }, { x: 1, y: 0.5 }]).length > 0);
  assert.equal(geometry[16].run({ x: 1, y: 1 }, [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 0, y: 3 }]), true);
  assert.ok(Math.abs(geometry[17].run([{ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }, { x: 0, y: 0, z: 1 }], [[0, 2, 1], [0, 1, 3], [0, 3, 2], [1, 2, 3]]) - 1 / 6) < 0.000001);
  assert.deepEqual(geometry[18].run({ x: 0, y: 0, z: -1 }, { x: 0, y: 0, z: 1 }, [[{ x: -1, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: 0, y: 1, z: 0 }]]), { x: 0, y: 0, z: 0 });
  assert.deepEqual(
    geometry[19].run([{ x: -1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 3 }, { x: -1, y: 3 }], { minX: 0, minY: 0, maxX: 2, maxY: 2 }),
    [{ x: 0, y: 2 }, { x: 0, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }],
  );
});

test("runs the linear algebra and vector math algorithms", () => {
  const math = algorithms.slice(201);
  assert.equal(math[0].run({ x: 2, y: 3, z: 6 }), 7);
  assert.deepEqual(math[1].run({ x: 3, y: 0, z: 4 }), { x: 0.6, y: 0, z: 0.8 });
  assert.equal(math[2].run({ x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 }), 32);
  assert.deepEqual(math[3].run({ x: 1, y: 0, z: 0 }, { x: 0, y: 1, z: 0 }), { x: 0, y: 0, z: 1 });
  assert.deepEqual(math[4].run({ x: 3, y: 4, z: 0 }, { x: 1, y: 0, z: 0 }), { x: 3, y: 0, z: 0 });
  assert.deepEqual(math[5].run({ x: 1, y: -1, z: 0 }, { x: 0, y: 1, z: 0 }), { x: 1, y: 1, z: 0 });
  assert.equal(math[6].run({ x: 0, y: 0, z: 0 })[3][3], 1);
  assert.equal(math[7].run({ x: 0, y: 0, z: 0, w: 1 })[0][0], 1);
  assert.equal(math[8].run([[1, 0, 0, 1], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]], [[1, 0, 0, 2], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]])[0][3], 3);
  assert.deepEqual(math[9].run([[1, 0, 0, 2], [0, 1, 0, 3], [0, 0, 1, 4], [0, 0, 0, 1]])[0], [1, 0, 0, -2]);
  assert.deepEqual(math[10].run([[1, 0, 0, 2], [0, 1, 0, 3], [0, 0, 1, 4], [0, 0, 0, 1]], { x: 1, y: 1, z: 1 }), { x: 3, y: 4, z: 5 });
  assert.equal(math[11].run({ x: 1, y: 1 }, [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 3 }, { x: 0, y: 3 }]), true);
  assert.equal(math[12].run({ x: 2, y: 2, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 4, y: 0, z: 0 }), 2);
  assert.equal(math[13].run({ x: 1, y: 2, z: 3 }, { normal: { x: 0, y: 0, z: 1 }, constant: -1 }), 2);
  assert.deepEqual(math[14].run({ x: 0, y: 0 }, { x: 2, y: 2 }, { x: 0, y: 2 }, { x: 2, y: 0 }), { x: 1, y: 1 });
  assert.equal(math[15].run({ x: 0, y: 0, z: -5 }, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 0, r: 1 }), 4);
  assert.equal(math[16].run({ x: 0, y: 0, z: -1 }, { x: 0, y: 0, z: 1 }, [{ x: -1, y: -1, z: 0 }, { x: 1, y: -1, z: 0 }, { x: 0, y: 1, z: 0 }]), 1);
  assert.deepEqual(math[17].run({ x: 1, y: 1 }, [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 0, y: 3 }]), { a: 0.3333333333333333, b: 0.3333333333333333, c: 0.3333333333333334 });
  assert.deepEqual(math[18].run({ x: 0, y: 0, z: 0 }, { x: 10, y: 20, z: 30 }, 0.25), { x: 2.5, y: 5, z: 7.5 });
  const rotation = math[19].run({ x: 0, y: 0, z: 0, w: 1 }, { x: 0, y: 0.7071068, z: 0, w: 0.7071068 }, 0.5);
  assert.ok(Math.abs(rotation.w - 0.9238795) < 0.0001);
});

test("runs procedural generation, splines, and regression", () => {
  const additions = algorithms.slice(221);
  assert.ok(Number.isFinite(additions[0].run(1.25, 2.5, 42)));
  assert.ok(Number.isFinite(additions[1].run(1.25, 2.5, 42)));
  assert.deepEqual(
    additions[2].run([{ x: 0, y: 0 }, { x: 2, y: 4 }, { x: 4, y: 0 }], 0.5),
    { x: 2, y: 2 },
  );
  assert.deepEqual(
    additions[3].run({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 2, y: 3 }, { x: 2, y: -3 }, 0.5),
    { x: 2, y: 0.75 },
  );
  assert.deepEqual(
    additions[4].run([{ x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }], 4),
    { slope: 2, intercept: 0, predicted: 8 },
  );
});

test("runs the new graph, tree, and string algorithms", () => {
  const newAlgos = algorithms.slice(300, 315);
  assert.equal(newAlgos.length, 15);

  // 1. Dijkstra's Algorithm
  const dijkstraResult = newAlgos[0].run(
    {
      A: [["B", 4], ["C", 2]],
      B: [["C", 1], ["D", 5]],
      C: [["D", 8], ["E", 10]],
      D: [["E", 2], ["Z", 6]],
      E: [["Z", 3]],
      Z: [],
    },
    "A",
  );
  assert.equal(dijkstraResult.distances.Z, 14);
  assert.deepEqual(dijkstraResult.paths.Z, ["A", "B", "D", "E", "Z"]);

  // 2. Louvain Community Detection
  const louvainResult = newAlgos[1].run({
    0: [[1, 1], [2, 1], [3, 1]],
    1: [[0, 1], [2, 1], [3, 1]],
    2: [[0, 1], [1, 1], [3, 1]],
    3: [[0, 1], [1, 1], [2, 1], [4, 1]],
    4: [[3, 1], [5, 1], [6, 1], [7, 1]],
    5: [[4, 1], [6, 1], [7, 1]],
    6: [[4, 1], [5, 1], [7, 1]],
    7: [[4, 1], [5, 1], [6, 1]],
  });
  assert.ok(louvainResult.clusterCount >= 2);

  // 3. Label Propagation
  const lpaResult = newAlgos[2].run(
    {
      0: [1, 2],
      1: [0, 2],
      2: [0, 1, 3],
      3: [2, 4, 5],
      4: [3, 5],
      5: [3, 4],
    },
    { 0: "Red", 5: "Blue" },
  );
  assert.equal(lpaResult[0], "Red");
  assert.equal(lpaResult[5], "Blue");

  // 4. Binary Tree
  const btResult = newAlgos[3].run([1, 2, 3, 4, 5, 6, 7]);
  assert.deepEqual(btResult.inorder, [4, 2, 5, 1, 6, 3, 7]);
  assert.equal(btResult.height, 3);
  assert.equal(btResult.size, 7);

  // 5. Binary Search Tree (BST)
  const bstResult = newAlgos[4].run([
    ["insert", 50],
    ["insert", 30],
    ["insert", 70],
    ["insert", 20],
    ["insert", 40],
    ["search", 40],
    ["delete", 20],
  ]);
  assert.deepEqual(bstResult.sortedKeys, [30, 40, 50, 70]);

  // 6. AVL Tree
  const avlResult = newAlgos[5].run([10, 20, 30, 40, 50, 25]);
  assert.deepEqual(avlResult.inorder, [10, 20, 25, 30, 40, 50]);
  assert.ok(Math.abs(avlResult.balanceFactor) <= 1);

  // 7. Red-Black Tree
  const rbResult = newAlgos[6].run([10, 20, 30, 15, 25, 5]);
  assert.ok(rbResult.blackHeight > 0);
  assert.equal(rbResult.root.color, "BLACK");

  // 8. Splay Tree
  const splayResult = newAlgos[7].run([
    ["insert", 100],
    ["insert", 50],
    ["insert", 200],
    ["access", 50],
  ]);
  assert.equal(splayResult.rootValue, 50);

  // 9. B-Tree
  const btreeResult = newAlgos[8].run(4, [10, 20, 5, 6, 12, 30, 7, 17]);
  assert.deepEqual(btreeResult.allKeys, [5, 6, 7, 10, 12, 17, 20, 30]);

  // 10. B+ Tree
  const bplusResult = newAlgos[9].run(4, [
    { key: 10, val: "Record A" },
    { key: 20, val: "Record B" },
    { key: 5, val: "Record C" },
    { key: 15, val: "Record D" },
  ]);
  assert.ok(bplusResult.rangeSample.length > 0);

  // 11. Trie
  const trieResult = newAlgos[10].run(
    ["apple", "app", "application", "apt", "banana"],
    ["app", "cat"],
  );
  assert.equal(trieResult.queryResults[0].exactMatch, true);
  assert.equal(trieResult.queryResults[1].exactMatch, false);

  // 12. Radix Tree
  const radixResult = newAlgos[11].run(
    ["romane", "romanus", "romulus", "rubens"],
    ["romane", "roman"],
  );
  assert.equal(radixResult.lookup["romane"], true);
  assert.equal(radixResult.lookup["roman"], false);

  // 13. Suffix Tree
  const suffixResult = newAlgos[12].run("banana", "ana");
  assert.deepEqual(suffixResult.patternMatch, [1, 3]);
  assert.equal(suffixResult.longestRepeatedSubstring, "ana");

  // 14. Segment Tree
  const segResult = newAlgos[13].run([1, 3, 5, 7, 9, 11], [
    { type: "query", left: 1, right: 3 },
    { type: "update", index: 1, value: 10 },
    { type: "query", left: 1, right: 3 },
  ]);
  assert.equal(segResult.results[0].sum, 15);
  assert.equal(segResult.results[2].sum, 22);

  // 15. Fenwick Tree
  const fenwickResult = newAlgos[14].run([3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3], [
    { type: "prefix", index: 4 },
    { type: "range", left: 2, right: 6 },
    { type: "update", index: 3, delta: 3 },
    { type: "range", left: 2, right: 6 },
  ]);
  assert.equal(fenwickResult.results[0].sum, 15);
  assert.equal(fenwickResult.results[1].sum, 11);
  assert.equal(fenwickResult.results[3].sum, 14);
});

test("runs the spatial trees and advanced heap algorithms", () => {
  const newAlgos = algorithms.slice(315, 331);
  assert.equal(newAlgos.length, 16);

  // 1. Quadtree
  const qtResult = newAlgos[0].run(
    [
      { x: 10, y: 20 },
      { x: 40, y: 50 },
      { x: 70, y: 80 },
      { x: 25, y: 35 },
      { x: 90, y: 90 },
    ],
    { minX: 0, minY: 0, maxX: 100, maxY: 100 },
    { minX: 0, minY: 0, maxX: 50, maxY: 50 },
  );
  assert.equal(qtResult.pointsInRange.length, 3);

  // 2. Octree
  const otResult = newAlgos[1].run(
    [
      { x: 10, y: 20, z: 30 },
      { x: 40, y: 50, z: 60 },
      { x: 70, y: 80, z: 90 },
      { x: 25, y: 35, z: 45 },
    ],
    { minX: 0, minY: 0, minZ: 0, maxX: 100, maxY: 100, maxZ: 100 },
    { minX: 0, minY: 0, minZ: 0, maxX: 50, maxY: 50, maxZ: 50 },
  );
  assert.equal(otResult.pointsInRange.length, 2);

  // 3. k-d Tree
  const kdResult = newAlgos[2].run(
    [
      [2, 3],
      [5, 4],
      [9, 6],
      [4, 7],
      [8, 1],
      [7, 2],
    ],
    [9, 2],
  );
  assert.deepEqual(kdResult.nearestNeighbor, [8, 1]);

  // 4. Tournament Tree
  const ttResult = newAlgos[3].run([
    { name: "Alice", score: 85 },
    { name: "Bob", score: 92 },
    { name: "Carol", score: 78 },
    { name: "Dave", score: 95 },
  ]);
  assert.equal(ttResult.winner.name, "Dave");

  // 5. Decision Tree
  const dtResult = newAlgos[4].run(
    [
      { outlook: "Sunny", humidity: "High", outcome: "No" },
      { outlook: "Sunny", humidity: "Normal", outcome: "Yes" },
      { outlook: "Overcast", humidity: "High", outcome: "Yes" },
    ],
    { outlook: "Overcast", humidity: "High" },
  );
  assert.equal(dtResult.prediction, "Yes");

  // 6. Treap
  const treapResult = newAlgos[5].run([
    ["insert", 10, 50],
    ["insert", 20, 90],
    ["insert", 5, 70],
    ["insert", 15, 30],
    ["search", 15],
  ]);
  assert.equal(treapResult.sortedKeys.length, 4);
  assert.equal(treapResult.history.find((h) => h.op === "search")?.found, true);

  // 7. Vantage-point Tree
  const vpResult = newAlgos[6].run(
    [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 8, y: 8 },
      { x: 9, y: 7 },
      { x: 5, y: 5 },
    ],
    { x: 2, y: 2 },
    2,
  );
  assert.equal(vpResult.nearestNeighbors.length, 2);

  // 8. BK-Tree
  const bkResult = newAlgos[7].run(
    ["book", "books", "boo", "boon", "cook", "cake", "cool", "boom"],
    "book",
    1,
  );
  assert.ok(bkResult.matches.some((m) => m.word === "books"));

  // 9. Binary Heap
  const bhResult = newAlgos[8].run([
    ["insert", 15],
    ["insert", 10],
    ["insert", 20],
    ["insert", 5],
    ["extractMin"],
  ]);
  assert.deepEqual(bhResult.extracted, [5]);
  assert.equal(bhResult.minimum, 10);

  // 10. Binomial Heap
  const binomResult = newAlgos[9].run([12, 7, 25, 15, 28, 33, 41, 1]);
  assert.equal(binomResult.minimum, 1);

  // 11. Fibonacci Heap
  const fibResult = newAlgos[10].run([
    ["insert", 10],
    ["insert", 3],
    ["insert", 15],
    ["insert", 6],
  ]);
  assert.equal(fibResult.minKey, 3);

  // 12. Leftist Heap
  const leftistResult = newAlgos[11].run([3, 10, 8], [6, 14, 21, 7]);
  assert.equal(leftistResult.minimum, 3);

  // 13. Skew Heap
  const skewResult = newAlgos[12].run([5, 12, 9], [2, 8, 15]);
  assert.equal(skewResult.minimum, 2);

  // 14. D-ary Heap
  const daryResult = newAlgos[13].run(4, [45, 12, 89, 3, 27, 65, 18, 9, 33, 2, 70]);
  assert.equal(daryResult.minimum, 2);

  // 15. Weak Heap
  const weakResult = newAlgos[14].run([16, 4, 10, 14, 7, 9, 3, 2, 8, 1]);
  assert.equal(weakResult.minimum, 1);

  // 16. Beap
  const beapResult = newAlgos[15].run([1, 2, 4, 3, 5, 7, 6, 8, 9, 10], 7);
  assert.equal(beapResult.found, true);
});

test("runs tree traversals and advanced tree query algorithms", () => {
  const newAlgos = algorithms.slice(331, 346);
  assert.equal(newAlgos.length, 15);

  // 1. Pairing Heap
  const pairResult = newAlgos[0].run([
    ["insert", 10],
    ["insert", 5],
    ["insert", 15],
    ["insert", 2],
    ["extractMin"],
    ["insert", 8],
  ]);
  assert.deepEqual(pairResult.extracted, [2]);
  assert.equal(pairResult.minimum, 5);

  // 2. Treap (Min-Max variant)
  const treapMmResult = newAlgos[1].run([
    ["insert", 20],
    ["insert", 5],
    ["insert", 35],
    ["insert", 10],
    ["insert", 50],
  ]);
  assert.equal(treapMmResult.min, 5);
  assert.equal(treapMmResult.max, 50);

  const sampleTree = {
    value: 4,
    left: { value: 2, left: { value: 1 }, right: { value: 3 } },
    right: { value: 6, left: { value: 5 }, right: { value: 7 } },
  };

  // 3. In-order Traversal
  assert.deepEqual(newAlgos[2].run(sampleTree), [1, 2, 3, 4, 5, 6, 7]);

  // 4. Pre-order Traversal
  assert.deepEqual(newAlgos[3].run(sampleTree), [4, 2, 1, 3, 6, 5, 7]);

  // 5. Post-order Traversal
  assert.deepEqual(newAlgos[4].run(sampleTree), [1, 3, 2, 5, 7, 6, 4]);

  // 6. Level-order Traversal
  const levelResult = newAlgos[5].run(sampleTree);
  assert.deepEqual(levelResult.flat, [4, 2, 6, 1, 3, 5, 7]);

  // 7. Morris Traversal
  assert.deepEqual(newAlgos[6].run(sampleTree), [1, 2, 3, 4, 5, 6, 7]);

  // 8. LCA - Naive
  const lcaNaiveResult = newAlgos[7].run(
    { 1: null, 2: 1, 3: 1, 4: 2, 5: 2, 6: 3, 7: 5 },
    4,
    7,
  );
  assert.equal(lcaNaiveResult, 2);

  // 9. LCA - Binary Lifting
  const lcaLiftResult = newAlgos[8].run(
    { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [7], 6: [], 7: [] },
    1,
    [[4, 7], [4, 6], [5, 7]],
  );
  assert.equal(lcaLiftResult.queryResults[0].lca, 2);
  assert.equal(lcaLiftResult.queryResults[1].lca, 1);
  assert.equal(lcaLiftResult.queryResults[2].lca, 5);

  // 10. LCA - Tarjan's Offline
  const tarjanResult = newAlgos[9].run(
    { 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [7], 6: [], 7: [] },
    1,
    [[4, 7], [6, 7], [2, 5]],
  );
  assert.equal(tarjanResult.answers["4-7"], 2);

  // 11. Euler Tour Technique
  const eulerResult = newAlgos[10].run({ 1: [2, 3], 2: [4, 5], 3: [], 4: [], 5: [] }, 1);
  assert.ok(eulerResult.tour.length > 0);
  assert.ok(eulerResult.tin[4] < eulerResult.tout[4]);

  // 12. Heavy-Light Decomposition
  const hldResult = newAlgos[11].run({ 1: [2, 3], 2: [4, 5], 3: [6], 4: [], 5: [], 6: [] }, 1);
  assert.equal(hldResult.heavyEdges[1], 2);

  // 13. Centroid Decomposition
  const centroidResult = newAlgos[12].run({ 1: [2, 3], 2: [1, 4, 5], 3: [1, 6], 4: [2], 5: [2], 6: [3] });
  assert.ok(centroidResult.rootCentroid !== undefined);

  // 14. Tree Isomorphism
  const isoResult = newAlgos[13].run(
    { 1: [2, 3], 2: [1], 3: [1] },
    { 10: [20], 20: [10, 30], 30: [20] },
  );
  assert.equal(isoResult.isomorphic, true);

  // 15. Prüfer Sequence
  const pruferResult = newAlgos[14].run([[1, 2], [1, 3], [1, 4], [4, 5], [4, 6]], 6);
  assert.deepEqual(pruferResult.pruferSequence, [1, 1, 4, 4]);
  assert.equal(pruferResult.reconstructedEdges.length, 5);
});

test("runs graph representations and advanced traversals", () => {
  const newAlgos = algorithms.slice(346, 356);
  assert.equal(newAlgos.length, 10);

  // 1. Adjacency Matrix
  const adjMatResult = newAlgos[0].run(["A", "B", "C", "D"], [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]], false);
  assert.equal(adjMatResult.matrix[0][1], 1);
  assert.equal(adjMatResult.matrix[1][0], 1);
  assert.equal(adjMatResult.matrix[0][3], 0);

  // 2. Adjacency List
  const adjListResult = newAlgos[1].run(["A", "B", "C", "D"], [["A", "B"], ["A", "C"], ["B", "D"], ["C", "D"]], false);
  assert.deepEqual(adjListResult.adjacencyList["A"], ["B", "C"]);

  // 3. Incidence Matrix
  const incMatResult = newAlgos[2].run(["A", "B", "C"], [["A", "B"], ["B", "C"], ["A", "C"]], false);
  assert.equal(incMatResult.incidenceMatrix.length, 3);
  assert.equal(incMatResult.incidenceMatrix[0].length, 3);

  // 4. Edge List
  const edgeListResult = newAlgos[3].run([["A", "B", 4], ["A", "C", 2], ["B", "C", 1], ["B", "D", 5]], true);
  assert.equal(edgeListResult.totalEdges, 4);
  assert.equal(edgeListResult.edges[0].weight, 4);

  // 5. CSR
  const csrResult = newAlgos[4].run([
    [0, 1, 1, 0],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 0],
  ]);
  assert.deepEqual(csrResult.values, [1, 1, 1, 1]);
  assert.deepEqual(csrResult.rowPtr, [0, 2, 3, 4, 4]);

  // 6. DSU
  const dsuResult = newAlgos[5].run(["A", "B", "C", "D", "E"], [
    ["union", "A", "B"],
    ["union", "B", "C"],
    ["find", "A"],
    ["connected", "A", "C"],
    ["connected", "A", "D"],
  ]);
  assert.equal(dsuResult.history.find((h) => h.op === "connected" && h.v === "C")?.connected, true);
  assert.equal(dsuResult.history.find((h) => h.op === "connected" && h.v === "D")?.connected, false);

  const sampleGraph = {
    A: ["B", "C"],
    B: ["A", "D", "E"],
    C: ["A", "F"],
    D: ["B"],
    E: ["B", "F"],
    F: ["C", "E"],
  };

  // 7. BFS
  const bfsResult = newAlgos[6].run(sampleGraph, "A");
  assert.deepEqual(bfsResult.order, ["A", "B", "C", "D", "E", "F"]);
  assert.equal(bfsResult.distances["F"], 2);

  // 8. DFS
  const dfsResult = newAlgos[7].run(sampleGraph, "A");
  assert.equal(dfsResult.order[0], "A");
  assert.equal(dfsResult.order.length, 6);

  // 9. IDDFS
  const iddfsGraph = {
    A: ["B", "C"],
    B: ["D", "E"],
    C: ["F", "G"],
    D: ["H"],
    E: [],
    F: [],
    G: [],
    H: [],
  };
  const iddfsResult = newAlgos[8].run(iddfsGraph, "A", "H", 5);
  assert.equal(iddfsResult.targetFound, true);
  assert.deepEqual(iddfsResult.path, ["A", "B", "D", "H"]);

  // 10. Bidirectional Search
  const biGraph = {
    A: ["B", "C"],
    B: ["A", "D"],
    C: ["A", "E"],
    D: ["B", "F"],
    E: ["C", "F"],
    F: ["D", "E"],
  };
  const biResult = newAlgos[9].run(biGraph, "A", "F");
  assert.equal(biResult.distance, 3);
  assert.equal(biResult.path[0], "A");
  assert.equal(biResult.path.at(-1), "F");
});

test("runs topological sorting, eulerian paths, biconnectivity, and min-cut", () => {
  const newAlgos = algorithms.slice(356, 362);
  assert.equal(newAlgos.length, 6);

  // 1. Topological Sort (Kahn's)
  const kahnResult = newAlgos[0].run(
    ["5", "4", "2", "3", "1", "0"],
    [
      ["5", "2"],
      ["5", "0"],
      ["4", "0"],
      ["4", "1"],
      ["2", "3"],
      ["3", "1"],
    ],
  );
  assert.equal(kahnResult.hasCycle, false);
  assert.equal(kahnResult.order.length, 6);
  assert.ok(kahnResult.order.indexOf("5") < kahnResult.order.indexOf("2"));
  assert.ok(kahnResult.order.indexOf("2") < kahnResult.order.indexOf("3"));

  // 2. Topological Sort (DFS-based)
  const dfsTopoResult = newAlgos[1].run(
    ["5", "4", "2", "3", "1", "0"],
    [
      ["5", "2"],
      ["5", "0"],
      ["4", "0"],
      ["4", "1"],
      ["2", "3"],
      ["3", "1"],
    ],
  );
  assert.equal(dfsTopoResult.hasCycle, false);
  assert.equal(dfsTopoResult.order.length, 6);
  assert.ok(dfsTopoResult.order.indexOf("5") < dfsTopoResult.order.indexOf("2"));
  assert.ok(dfsTopoResult.order.indexOf("3") < dfsTopoResult.order.indexOf("1"));

  // 3. Fleury's Algorithm
  const fleuryResult = newAlgos[2].run(
    ["0", "1", "2", "3"],
    [
      ["0", "1"],
      ["1", "2"],
      ["2", "3"],
      ["3", "0"],
      ["0", "2"],
    ],
  );
  assert.equal(fleuryResult.isEulerian, true);
  assert.equal(fleuryResult.path.length, 6);

  // 4. Hierholzer's Algorithm
  const hierholzerResult = newAlgos[3].run(
    ["0", "1", "2", "3"],
    [
      ["0", "1"],
      ["1", "2"],
      ["2", "3"],
      ["3", "0"],
      ["0", "2"],
    ],
    false,
  );
  assert.equal(hierholzerResult.isEulerian, true);
  assert.equal(hierholzerResult.trail.length, 6);

  // 5. Hopcroft-Tarjan Algorithm
  const htResult = newAlgos[4].run(
    ["0", "1", "2", "3", "4", "5"],
    [
      ["0", "1"],
      ["1", "2"],
      ["2", "0"],
      ["1", "3"],
      ["3", "4"],
      ["4", "5"],
      ["5", "3"],
    ],
  );
  assert.ok(htResult.articulationPoints.includes("1") || htResult.articulationPoints.includes("3"));
  assert.ok(htResult.bridges.some(([u, v]) => (u === "1" && v === "3") || (u === "3" && v === "1")));

  // 6. Karger's Algorithm
  const kargerResult = newAlgos[5].run(
    ["0", "1", "2", "3"],
    [
      ["0", "1"],
      ["0", "2"],
      ["0", "3"],
      ["1", "2"],
      ["2", "3"],
    ],
    30,
    42,
  );
  assert.ok(kargerResult.minCutSize >= 1);
  assert.equal(kargerResult.partitionA.length + kargerResult.partitionB.length, 4);
});

test("runs interview array algorithms: 2D rotation, left rotation, chaos, swaps, and manipulation", () => {
  const newAlgos = algorithms.slice(362, 367);
  assert.equal(newAlgos.length, 5);

  // 1. 2D Array - DS
  const rotated = newAlgos[0].run([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  assert.deepEqual(rotated, [
    [7, 4, 1],
    [8, 5, 2],
    [9, 6, 3],
  ]);

  // 2. Left Rotation
  const rotatedArr = newAlgos[1].run([1, 2, 3, 4, 5], 2);
  assert.deepEqual(rotatedArr, [3, 4, 5, 1, 2]);

  // 3. New Year Chaos
  const chaosResult = newAlgos[2].run([2, 1, 5, 3, 4]);
  assert.equal(chaosResult, 3);

  // 4. Minimum Swaps 2
  const swapsResult = newAlgos[3].run([7, 1, 3, 2, 4, 5, 6]);
  assert.equal(swapsResult, 5);

  // 5. Array Manipulation
  const manipResult = newAlgos[4].run(10, [
    [1, 5, 3],
    [4, 8, 7],
    [6, 9, 1],
  ]);
  assert.equal(manipResult, 10);
});

test("runs hash table algorithms: ransom note, two strings, anagrams, triplets, and frequency", () => {
  const newAlgos = algorithms.slice(367, 372);
  assert.equal(newAlgos.length, 5);

  // 1. Ransom Note
  assert.equal(newAlgos[0].run("give me one grand today", "give me one grand today"), true);
  assert.equal(newAlgos[0].run("hello", "world"), false);

  // 2. Two Strings
  assert.equal(newAlgos[1].run("hello", "world"), "YES");
  assert.equal(newAlgos[1].run("hi", "world"), "NO");

  // 3. Sherlock and Anagrams
  assert.equal(newAlgos[2].run("abba"), 4);
  assert.equal(newAlgos[2].run("abcd"), 0);

  // 4. Count Triplets
  assert.equal(newAlgos[3].run([1, 2, 2, 4], 2), 2);
  assert.equal(newAlgos[3].run([1, 3, 9, 27, 81], 3), 3);

  // 5. Frequency Queries
  const fqResult = newAlgos[4].run([
    [1, 5], [1, 6], [3, 2], [1, 10], [1, 10], [1, 6], [2, 5], [3, 2],
  ]);
  assert.deepEqual(fqResult, [0, 1]);
});

test("runs ice cream, swap nodes, pairs, triplets, time, subarray, and candies", () => {
  const newAlgos = algorithms.slice(372, 379);
  assert.equal(newAlgos.length, 7);

  // 1. Ice Cream Parlor
  assert.deepEqual(newAlgos[0].run([1, 4, 5, 3, 2], 4), [1, 4]);

  // 2. Swap Nodes
  assert.deepEqual(newAlgos[1].run([1, 2, 3, 4, 5], 2), [1, 4, 3, 2, 5]);

  // 3. Pairs
  assert.equal(newAlgos[2].run([1, 5, 3, 4, 2], 2), 3);

  // 4. Triple Sum
  assert.equal(newAlgos[3].run([1, 3, 5], [2, 3], [2, 3, 4]), 1);

  // 5. Minimum Time Required
  assert.equal(newAlgos[4].run([1, 3, 4], 10), 7);

  // 6. Maximum Subarray Sum
  assert.equal(newAlgos[5].run([3, 3, 5, 5], 5), 3);

  // 7. Making Candies
  assert.equal(newAlgos[6].run(4, 2, 12), 2);
});

test("runs greedy and sort algorithms: min diff, luck balance, max min, florist, and reverse shuffle", () => {
  const newAlgos = algorithms.slice(379, 384);
  assert.equal(newAlgos.length, 5);

  // 1. Minimum Absolute Difference
  assert.equal(newAlgos[0].run([3, -7, 0, -2, 8, -1, 5]), 1);

  // 2. Luck Balance
  assert.equal(newAlgos[1].run(2, [[5,1],[1,1],[4,0],[7,1],[3,0],[5,0]]), 23);

  // 3. Max Min
  assert.equal(newAlgos[2].run([10, 100, 1, 2, 3, 4, 1000], 3), 2);

  // 4. Greedy Florist
  assert.equal(newAlgos[3].run(3, [2, 5, 6]), 13);

  // 5. Reverse Shuffle Merge
  assert.equal(newAlgos[4].run("abcdefgfedcba"), "abcdefg");
});

test("runs stack and graph algorithms: brackets, two stacks, largest rect, min max riddle, and castle", () => {
  const newAlgos = algorithms.slice(384, 389);
  assert.equal(newAlgos.length, 5);

  // 1. Balanced Brackets
  assert.equal(newAlgos[0].run("{[()]}"), true);
  assert.equal(newAlgos[0].run("{[(])}"), false);

  // 2. Queues: A Tale of Two Stacks
  const tale = newAlgos[1].run();
  assert.deepEqual(tale.dequeued, [42, 14]);
  assert.equal(tale.peek, 28);

  // 3. Largest Rectangle
  assert.equal(newAlgos[2].run([2, 1, 5, 6, 2, 3]), 10);

  // 4. Min Max Riddle
  assert.deepEqual(newAlgos[3].run([2, 6, 1, 12]), [12, 2, 1, 1]);

  // 5. Castle on the Grid
  assert.equal(newAlgos[4].run(
    [[".",".","."],[".",".","."],[".",".","."]], 0, 0, 2, 2
  ), 4);
});

test("runs DP and bit algorithms: max sum, abbreviation, flipping bits, lonely integer", () => {
  const newAlgos = algorithms.slice(389, 393);
  assert.equal(newAlgos.length, 4);

  // 1. Max Array Sum
  assert.equal(newAlgos[0].run([3, 7, 4, 6, 5]), 13);
  assert.equal(newAlgos[0].run([-2, 1, 3, -4, 5]), 8);

  // 2. Abbreviation
  assert.equal(newAlgos[1].run("daBcd", "ABC"), "YES");
  assert.equal(newAlgos[1].run("dBcd", "ABC"), "NO");

  // 3. Flipping Bits
  assert.equal(newAlgos[2].run(123456), 4294843839);
  assert.equal(newAlgos[2].run(0), 4294967295);

  // 4. Lonely Integer
  assert.equal(newAlgos[3].run([1, 2, 3, 4, 3, 2, 1]), 4);
  assert.equal(newAlgos[3].run([9]), 9);
});

test("runs easy math algorithms: find point, max draws, handshake, triangle, army, primes, towns, cuts, best divisor", () => {
  const a = algorithms;
  const find = (id) => a.find((x) => x.id === id);

  assert.deepEqual(find(394).run(4, 3), [8, 6]);
  assert.equal(find(395).run(2), 3);
  assert.equal(find(396).run(4), 6);
  assert.equal(find(397).run(6, 4), 3);
  assert.equal(find(398).run(4), 4);
  assert.equal(find(399).run(100), 2);
  assert.equal(find(400).run(3, [1, 2]), 2);
  assert.equal(find(401).run(3, 4), 11);
  assert.equal(find(402).run(12), 6);
});

test("runs medium/hard math algorithms: reverse, strange grid, fibo, closest, smith, bus, rocks, peasant, matrix, polar, collinear", () => {
  const a = algorithms;
  const find = (id) => a.find((x) => x.id === id);

  assert.equal(find(403).run(5, 2), 3);
  assert.equal(find(404).run(6, 3), 55);
  assert.equal(find(405).run(8), true);
  assert.equal(find(406).run(3, 4, 10), 80);
  assert.equal(find(407).run(378), true);
  assert.equal(find(408).run(378), 1);
  assert.equal(find(409).run([3, 4, 5]), 60);
  assert.equal(find(410).run(0, 0, 4, 2), 1);
  assert.equal(find(411).run(5, 3), 15);
  assert.deepEqual(find(412).run([[1, 1], [1, 0]], 5), [[8, 5], [5, 3]]);
  assert.deepEqual(find(413).run([[1, 1], [0, 1], [-1, 1], [-1, 0]]), [[1, 1], [0, 1], [-1, 1], [-1, 0]]);
  assert.equal(find(414).run([[1, 1], [2, 2], [3, 4]]), false);
});

test("runs recursion algorithms: digit sum, power sum, staircase", () => {
  const a = algorithms;
  const find = (id) => a.find((x) => x.id === id);

  assert.equal(find(415).run(942), 6);
  assert.equal(find(416).run(10, 2), 1);
  assert.equal(find(417).run(5), 13);
});

test("runs classic DP algorithms: coin change, max subarray, knapsack, lcs, lis, fib mod", () => {
  const a = algorithms;
  const find = (id) => a.find((x) => x.id === id);

  assert.equal(find(422).run([1, 2, 3], 4), 2);
  assert.deepEqual(find(423).run([1, 2, 3, 4]), [10, 10]);
  assert.equal(find(424).run([1, 3, 4, 5], [1, 4, 5, 7], 7), 9);
  assert.equal(find(425).run("ABCBDAB", "BDCAB"), 4);
  assert.equal(find(426).run([2, 5, 3, 7, 1, 8]), 4);
  assert.equal(find(427).run(0, 1, 5), 5);
});

test("runs more DP algorithms: prime xor, candies, sherlock cost, construct, kingdom, sam, equal, hackerrank", () => {
  const a = algorithms;
  const find = (id) => a.find((x) => x.id === id);

  assert.equal(find(428).run([3, 6, 8, 13]), 8);
  assert.equal(find(429).run(5, [3, 4, 3, 2, 1]), 11);
  assert.equal(find(430).run([1, 2, 3]), 2);
  assert.equal(find(431).run(4, 3), 5);
  assert.equal(find(432).run(5, [[1,2],[2,3],[3,4],[4,5]]), 3);
  assert.equal(find(433).run("16"), 17);
  assert.equal(find(434).run([2, 2, 3, 7]), 2);
  assert.equal(find(435).run(2), 42);
});

test("runs physics algorithms: friction, thrust, air resistance, mass, slope, wind, tug, centripetal, spring, buoyancy", () => {
  const a = algorithms;
  const find = (id) => a.find((x) => x.id === id);

  const fric = find(436).run(10, 5, "ice");
  assert.ok(fric.friction > 0);
  assert.ok(fric.distance > 0);

  assert.equal(find(437).run(100, 9.8), 980);

  const air = find(438).run(30, 0.47, 0.5, 1.225);
  assert.ok(air > 0);

  const mass = find(439).run(10, 50);
  assert.ok(mass.acceleration > mass.halfAcceleration);

  const slope = find(440).run(10, 30);
  assert.ok(slope.force > 0);

  const wind = find(441).run(0.1, 2, 3);
  assert.ok(wind.horizontalDistance > 0);

  const tug = find(442).run(500, 450, 20);
  assert.equal(tug.direction, "Team 1");

  const cent = find(443).run(1500, 20, 50);
  assert.ok(cent.force > 0);

  const spring = find(444).run(50, 0.2);
  assert.equal(spring.force, -10);

  const buoy = find(445).run(500, 0.5, 0.5);
  assert.equal(buoy.floating, true);
});

test("runs two pointers, swinging window, sudoku, markov, and munchausen", () => {
  const a = algorithms;
  const find = (id) => a.find((x) => x.id === id);

  assert.deepEqual(find(446).run([1, 2, 3, 4, 6], 6), [1, 3]);
  assert.deepEqual(find(446).run([1, 2, 3, 4, 6], 11), [-1, -1]);

  assert.equal(find(447).run([1, 4, 2, 10, 2, 3, 1, 0, 20], 4), 24);

  const solved = find(448).run([
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ]);
  assert.ok(solved[0][0] === 5);
  assert.ok(solved[0][2] === 4);

  const marks = find(449).run(100);
  assert.ok(marks.includes(1));
  assert.ok(marks.includes(2));
  assert.ok(marks.includes(5));
  assert.ok(marks.includes(13));

  const munch = find(450).run(50000);
  assert.ok(munch.includes(1));
  assert.ok(munch.includes(3435));
});

test("runs the added recursive searching and sorting algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  // 501: Recursive Binary Search
  const sorted = [1, 3, 5, 7, 9, 11, 13];
  assert.equal(find(501).run(sorted, 7), 3);
  assert.equal(find(501).run(sorted, 1), 0);
  assert.equal(find(501).run(sorted, 13), 6);
  assert.equal(find(501).run(sorted, 4), -1);

  // 502: Recursive Selection Sort
  assert.deepEqual(find(502).run([5, 2, 4, 6, 1, 3]), [1, 2, 3, 4, 5, 6]);

  // 503: Recursive Insertion Sort
  assert.deepEqual(find(503).run([12, 11, 13, 5, 6]), [5, 6, 11, 12, 13]);

  // 504: Recursive Quicksort
  assert.deepEqual(find(504).run([10, 7, 8, 9, 1, 5]), [1, 5, 7, 8, 9, 10]);

  // 505: Recursive Merge Sort
  assert.deepEqual(find(505).run([38, 27, 43, 3, 9, 82, 10]), [3, 9, 10, 27, 38, 43, 82]);
});

test("runs the added recursive math and fractal algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  // 506: Recursive Fractal
  const fractal = find(506).run(2);
  assert.equal(typeof fractal, "string");
  assert.ok(fractal.includes("*"));

  // 507: Recursive Factorial Calculation
  assert.equal(find(507).run(5), 120);
  assert.equal(find(507).run(0), 1);
  assert.equal(find(507).run(-1), null);

  // 508: Recursive Fibonacci Sequence
  assert.deepEqual(find(508).run(7), [0, 1, 1, 2, 3, 5, 8]);
  assert.deepEqual(find(508).run(1), [0]);

  // 509: Recursive Greatest Common Divisor (GCD)
  assert.equal(find(509).run(48, 18), 6);
  assert.equal(find(509).run(-48, 18), 6);
  assert.equal(find(509).run(17, 13), 1);

  // 510: Recursive Fast Powering (Exponentiation)
  assert.equal(find(510).run(2, 10), 1024);
  assert.equal(find(510).run(3, 5), 243);
  assert.equal(find(510).run(2, -2), 0.25);
  assert.equal(find(510).run(7, 0), 1);

  // 511: Recursive Sum of Natural Numbers
  assert.equal(find(511).run(10), 55);
  assert.equal(find(511).run(1), 1);
  assert.equal(find(511).run(0), 0);

  // 512: Recursive Sum of Digits
  assert.equal(find(512).run(12345), 15);
  assert.equal(find(512).run(9), 9);
  assert.equal(find(512).run(-482), 14);
});

test("runs the added recursive arithmetic, number-theory, and simulation algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  // 513: Recursive Decimal to Binary Conversion
  assert.equal(find(513).run(13), "1101");
  assert.equal(find(513).run(0), "0");
  assert.equal(find(513).run(-5), "-101");

  // 514: Recursive Decimal to Hexadecimal
  assert.equal(find(514).run(255), "FF");
  assert.equal(find(514).run(16), "10");
  assert.equal(find(514).run(0), "0");
  assert.equal(find(514).run(-42), "-2A");

  // 515: Recursive Count Digits
  assert.equal(find(515).run(987654), 6);
  assert.equal(find(515).run(0), 1);
  assert.equal(find(515).run(-42), 2);

  // 516: Recursive Product of Two Numbers
  assert.equal(find(516).run(6, 7), 42);
  assert.equal(find(516).run(-4, 5), -20);
  assert.equal(find(516).run(4, -5), -20);
  assert.equal(find(516).run(5, 0), 0);

  // 517: Recursive Tower of Hanoi
  const hanoiMoves = find(517).run(3);
  assert.equal(hanoiMoves.length, 7);
  assert.equal(hanoiMoves[0], "Move disk 1 from A to C");
  assert.equal(hanoiMoves[6], "Move disk 1 from A to C");

  // 518: Recursive Ackermann Function
  assert.equal(find(518).run(0, 5), 6);
  assert.equal(find(518).run(1, 2), 4);
  assert.equal(find(518).run(2, 3), 9);
  assert.equal(find(518).run(3, 2), 29);

  // 519: Recursive Josephus Problem
  assert.equal(find(519).run(5, 2), 3);
  assert.equal(find(519).run(7, 3), 4);
  assert.equal(find(519).run(1, 2), 1);

  // 520: Recursive Is Prime Check
  assert.equal(find(520).run(29), true);
  assert.equal(find(520).run(1), false);
  assert.equal(find(520).run(2), true);
  assert.equal(find(520).run(25), false);

  // 521: Recursive Collatz Conjecture Simulation
  assert.deepEqual(find(521).run(6), [6, 3, 10, 5, 16, 8, 4, 2, 1]);
  assert.deepEqual(find(521).run(1), [1]);
  assert.deepEqual(find(521).run(0), []);
});

test("runs the added recursive string and subsequence algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  // 522: Recursive Reverse a String
  assert.equal(find(522).run("hello"), "olleh");
  assert.equal(find(522).run("a"), "a");
  assert.equal(find(522).run(""), "");

  // 523: Recursive Palindrome Verification
  assert.equal(find(523).run("racecar"), true);
  assert.equal(find(523).run("A man, a plan, a canal: Panama"), true);
  assert.equal(find(523).run("hello"), false);

  // 524: Recursive String Length Calculation
  assert.equal(find(524).run("hello"), 5);
  assert.equal(find(524).run(""), 0);

  // 525: Recursive All Permutations of a String
  assert.deepEqual(find(525).run("abc"), ["abc", "acb", "bac", "bca", "cab", "cba"]);
  assert.deepEqual(find(525).run("a"), ["a"]);

  // 526: Recursive All Subsets/Subsequences
  assert.deepEqual(find(526).run("ab"), ["", "a", "ab", "b"]);

  // 527: Recursive Count Vowels
  assert.equal(find(527).run("hello world"), 3);
  assert.equal(find(527).run("rhythm"), 0);
  assert.equal(find(527).run("AEIOU"), 5);

  // 528: Recursive First Capital Letter Search
  assert.equal(find(528).run("helloWorld"), "W");
  assert.equal(find(528).run("Hello"), "H");
  assert.equal(find(528).run("lowercase"), null);

  // 529: Recursive String Tokenization
  assert.deepEqual(find(529).run("hello world from algo cli", " "), ["hello", "world", "from", "algo", "cli"]);
  assert.deepEqual(find(529).run("apple,banana,orange", ","), ["apple", "banana", "orange"]);
});

test("runs the added recursive array, search, and parenthesis algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  // 530: Recursive Parenthesis Matching
  assert.equal(find(530).run("((a + b) * (c - d))"), true);
  assert.equal(find(530).run("(()"), false);
  assert.equal(find(530).run(")("), false);

  // 531: Recursive Linear Search
  assert.equal(find(531).run([10, 20, 30, 40], 30), 2);
  assert.equal(find(531).run([10, 20, 30, 40], 50), -1);

  // 532: Recursive Binary Search
  assert.equal(find(532).run([3, 7, 12, 18, 24, 32, 45], 24), 4);
  assert.equal(find(532).run([3, 7, 12, 18, 24, 32, 45], 100), -1);

  // 533: Recursive Find Maximum Element
  assert.equal(find(533).run([3, 7, 2, 9, 5]), 9);
  assert.equal(find(533).run([-5, -2, -10]), -2);

  // 534: Recursive Find Minimum Element
  assert.equal(find(534).run([3, 7, 2, 9, 5]), 2);
  assert.equal(find(534).run([-5, -2, -10]), -10);

  // 535: Recursive Sum of Array Elements
  assert.equal(find(535).run([1, 2, 3, 4, 5]), 15);
  assert.equal(find(535).run([]), 0);

  // 536: Recursive Reverse an Array
  assert.deepEqual(find(536).run([1, 2, 3, 4, 5]), [5, 4, 3, 2, 1]);

  // 537: Recursive Print Array Elements
  assert.equal(find(537).run([10, 20, 30]), "10, 20, 30");
  assert.equal(find(537).run([]), "");

  // 538: Recursive Check if Array is Sorted
  assert.equal(find(538).run([2, 4, 6, 8, 10]), true);
  assert.equal(find(538).run([2, 4, 1, 8]), false);

  // 539: Recursive Count Occurrences of an Item
  assert.equal(find(539).run([1, 2, 3, 2, 4, 2, 5], 2), 3);
  assert.equal(find(539).run([1, 2, 3], 7), 0);
});

test("runs the added recursive linked list algorithms", () => {
  const find = (id) => algorithms.find((algorithm) => algorithm.id === id);

  const list = { value: 1, next: { value: 2, next: { value: 3, next: { value: 4, next: null } } } };

  // 540: Recursive Traverse Linked List
  assert.deepEqual(find(540).run(list), [1, 2, 3, 4]);
  assert.deepEqual(find(540).run(null), []);

  // 541: Recursive Reverse a Linked List
  const reversed = find(541).run(list);
  assert.deepEqual(find(540).run(reversed), [4, 3, 2, 1]);

  // 542: Recursive Print Linked List in Reverse
  assert.equal(find(542).run(list), "4 -> 3 -> 2 -> 1");
  assert.equal(find(542).run(null), "");

  // 543: Recursive Delete a Node
  const deleted = find(543).run(list, 3);
  assert.deepEqual(find(540).run(deleted), [1, 2, 4]);
  const deletedHead = find(543).run(list, 1);
  assert.deepEqual(find(540).run(deletedHead), [2, 3, 4]);

  // 544: Recursive Insert Node into Sorted List
  const inserted = find(544).run({ value: 1, next: { value: 2, next: { value: 4, next: null } } }, 3);
  assert.deepEqual(find(540).run(inserted), [1, 2, 3, 4]);

  // 545: Recursive Merge Two Sorted Lists
  const listA = { value: 1, next: { value: 3, next: null } };
  const listB = { value: 2, next: { value: 4, next: null } };
  const merged = find(545).run(listA, listB);
  assert.deepEqual(find(540).run(merged), [1, 2, 3, 4]);

  // 546: Recursive Length of Linked List
  assert.equal(find(546).run(list), 4);
  assert.equal(find(546).run(null), 0);

  // 547: Recursive Search in a Linked List
  assert.equal(find(547).run(list, 3), 2);
  assert.equal(find(547).run(list, 99), -1);
  assert.equal(find(547).run(null, 1), -1);
});





