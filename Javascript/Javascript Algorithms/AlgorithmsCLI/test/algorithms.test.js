import test from "node:test";
import assert from "node:assert/strict";
import { algorithms } from "../src/algorithms.js";

const sortingAlgorithms = algorithms.filter(({ type }) => type === "Sorting");
const searchingAlgorithms = algorithms.filter(({ type }) => type === "Searching");
const input = [9, 2, 7, 2, -1, 5];

test("provides three hundred and sixty-two algorithms", () => {
  assert.equal(algorithms.length, 362);
  assert.equal(sortingAlgorithms.length, 6);
  assert.equal(searchingAlgorithms.length, 4);
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
  const newAlgos = algorithms.slice(356);
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
