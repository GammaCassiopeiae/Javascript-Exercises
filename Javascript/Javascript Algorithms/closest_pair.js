// Closest Pair of Points Algorithm
// Divide and Conquer approach
// Time Complexity: O(n log n)
// Space Complexity: O(n)

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

// Calculate Euclidean distance between two points
function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Brute force approach for small sets
// Time Complexity: O(n²)
function closestPairBruteForce(points) {
    const n = points.length;
    if (n < 2) return { distance: Infinity, pair: null };

    let minDist = Infinity;
    let closestPair = null;

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = distance(points[i], points[j]);
            if (dist < minDist) {
                minDist = dist;
                closestPair = [points[i], points[j]];
            }
        }
    }

    return { distance: minDist, pair: closestPair };
}

// Divide and Conquer approach
function closestPair(points) {
    const n = points.length;
    if (n < 2) return { distance: Infinity, pair: null };

    // Sort points by x-coordinate
    const pointsByX = [...points].sort((a, b) => a.x - b.x);

    // Create array sorted by y-coordinate
    const pointsByY = [...points].sort((a, b) => a.y - b.y);

    return closestPairRecursive(pointsByX, pointsByY);
}

function closestPairRecursive(pointsByX, pointsByY) {
    const n = pointsByX.length;

    // Base case: use brute force for small sets
    if (n <= 3) {
        return closestPairBruteForce(pointsByX);
    }

    // Divide
    const mid = Math.floor(n / 2);
    const midPoint = pointsByX[mid];

    const leftX = pointsByX.slice(0, mid);
    const rightX = pointsByX.slice(mid);

    // Create left and right Y-sorted arrays
    const leftSet = new Set(leftX);
    const leftY = pointsByY.filter(p => leftSet.has(p));
    const rightY = pointsByY.filter(p => !leftSet.has(p));

    // Conquer
    const leftResult = closestPairRecursive(leftX, leftY);
    const rightResult = closestPairRecursive(rightX, rightY);

    // Get minimum distance from left and right
    let minDist;
    let closestPair;

    if (leftResult.distance < rightResult.distance) {
        minDist = leftResult.distance;
        closestPair = leftResult.pair;
    } else {
        minDist = rightResult.distance;
        closestPair = rightResult.pair;
    }

    // Combine: Check strip around dividing line
    const strip = pointsByY.filter(p => Math.abs(p.x - midPoint.x) < minDist);

    const stripResult = closestPairInStrip(strip, minDist);

    if (stripResult.distance < minDist) {
        return stripResult;
    }

    return { distance: minDist, pair: closestPair };
}

// Find closest pair in the strip
function closestPairInStrip(strip, minDist) {
    const n = strip.length;
    let result = { distance: minDist, pair: null };

    for (let i = 0; i < n; i++) {
        // Check next 7 points at most (proven sufficient)
        for (let j = i + 1; j < n && (strip[j].y - strip[i].y) < minDist; j++) {
            const dist = distance(strip[i], strip[j]);
            if (dist < result.distance) {
                result.distance = dist;
                result.pair = [strip[i], strip[j]];
            }
        }
    }

    return result;
}

// Find k closest pairs
function findKClosestPairs(points, k = 1) {
    const n = points.length;
    if (n < 2 || k <= 0) return [];

    const allPairs = [];

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            allPairs.push({
                pair: [points[i], points[j]],
                distance: distance(points[i], points[j])
            });
        }
    }

    allPairs.sort((a, b) => a.distance - b.distance);

    return allPairs.slice(0, k);
}

// Find all pairs within a given distance
function findPairsWithinDistance(points, maxDistance) {
    const n = points.length;
    const result = [];

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const dist = distance(points[i], points[j]);
            if (dist <= maxDistance) {
                result.push({
                    pair: [points[i], points[j]],
                    distance: dist
                });
            }
        }
    }

    return result;
}

// Find nearest neighbor for each point
function findNearestNeighbors(points) {
    const n = points.length;
    const result = [];

    for (let i = 0; i < n; i++) {
        let minDist = Infinity;
        let nearest = null;

        for (let j = 0; j < n; j++) {
            if (i === j) continue;
            const dist = distance(points[i], points[j]);
            if (dist < minDist) {
                minDist = dist;
                nearest = points[j];
            }
        }

        result.push({
            point: points[i],
            nearest,
            distance: minDist
        });
    }

    return result;
}

// Example usage
console.log('Closest Pair of Points Algorithm');
console.log('================================');

const points = [
    new Point(2, 3),
    new Point(12, 30),
    new Point(40, 50),
    new Point(5, 1),
    new Point(12, 10),
    new Point(3, 4),
    new Point(7, 8),
    new Point(15, 20),
    new Point(30, 40),
    new Point(1, 9)
];

console.log('Points:', points.map(p => p.toString()));

// Brute force
console.log('\n--- Brute Force ---');
const bruteResult = closestPairBruteForce(points);
console.log('Closest pair:', bruteResult.pair?.map(p => p.toString()));
console.log('Distance:', bruteResult.distance.toFixed(4));

// Divide and Conquer
console.log('\n--- Divide and Conquer ---');
const dcResult = closestPair(points);
console.log('Closest pair:', dcResult.pair?.map(p => p.toString()));
console.log('Distance:', dcResult.distance.toFixed(4));

// K closest pairs
console.log('\n--- 3 Closest Pairs ---');
const kClosest = findKClosestPairs(points, 3);
kClosest.forEach((result, i) => {
    console.log(`${i + 1}. ${result.pair[0].toString()} - ${result.pair[1].toString()}: ${result.distance.toFixed(4)}`);
});

// Pairs within distance
console.log('\n--- Pairs Within Distance 5 ---');
const withinDist = findPairsWithinDistance(points, 5);
console.log('Found', withinDist.length, 'pairs:');
withinDist.forEach(result => {
    console.log(`  ${result.pair[0].toString()} - ${result.pair[1].toString()}: ${result.distance.toFixed(4)}`);
});

// Nearest neighbors
console.log('\n--- Nearest Neighbors ---');
const neighbors = findNearestNeighbors(points);
neighbors.forEach(n => {
    console.log(`  ${n.point.toString()} -> ${n.nearest?.toString()}: ${n.distance.toFixed(4)}`);
});

// Larger test
console.log('\n--- Performance Test ---');
const largePoints = [];
for (let i = 0; i < 100; i++) {
    largePoints.push(new Point(Math.random() * 1000, Math.random() * 1000));
}

const startTime = Date.now();
const largeResult = closestPair(largePoints);
const endTime = Date.now();

console.log(`100 random points: closest pair distance = ${largeResult.distance.toFixed(4)}`);
console.log(`Time: ${endTime - startTime}ms`);
