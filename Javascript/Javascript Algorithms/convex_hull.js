// Convex Hull Algorithms
// Graham Scan and Jarvis March (Gift Wrapping)
// Time Complexity: Graham Scan O(n log n), Jarvis March O(nh) where h = hull vertices
// Space Complexity: O(n)

// Point class for geometric operations
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

// Cross product of vectors OA and OB
// Returns positive if counter-clockwise, negative if clockwise, 0 if collinear
function crossProduct(O, A, B) {
    return (A.x - O.x) * (B.y - O.y) - (A.y - O.y) * (B.x - O.x);
}

// Distance between two points
function distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

// Graham Scan Algorithm
function grahamScan(points) {
    if (points.length < 3) return points;

    // Find the bottom-most point (or left-most in case of tie)
    let start = 0;
    for (let i = 1; i < points.length; i++) {
        if (points[i].y < points[start].y ||
            (points[i].y === points[start].y && points[i].x < points[start].x)) {
            start = i;
        }
    }

    // Swap start point to first position
    [points[0], points[start]] = [points[start], points[0]];
    const pivot = points[0];

    // Sort points by polar angle with respect to pivot
    points.sort((a, b) => {
        if (a === pivot) return -1;
        if (b === pivot) return 1;

        const orientation = crossProduct(pivot, a, b);
        if (orientation === 0) {
            // Collinear points - keep the farthest one
            return distance(pivot, b) - distance(pivot, a);
        }
        return -orientation; // Counter-clockwise
    });

    // Build convex hull
    const hull = [];
    for (const point of points) {
        while (hull.length >= 2 && crossProduct(hull[hull.length - 2], hull[hull.length - 1], point) <= 0) {
            hull.pop();
        }
        hull.push(point);
    }

    return hull;
}

// Jarvis March (Gift Wrapping) Algorithm
function jarvisMarch(points) {
    if (points.length < 3) return points;

    const hull = [];
    const n = points.length;

    // Find the leftmost point
    let leftmost = 0;
    for (let i = 1; i < n; i++) {
        if (points[i].x < points[leftmost].x) {
            leftmost = i;
        }
    }

    // Start from leftmost point
    let current = leftmost;
    do {
        hull.push(points[current]);
        let next = 0;

        // Find the most counter-clockwise point
        for (let i = 0; i < n; i++) {
            if (i === current) continue;

            const orientation = crossProduct(points[current], points[next], points[i]);

            if (next === current || orientation < 0 ||
                (orientation === 0 && distance(points[current], points[i]) > distance(points[current], points[next]))) {
                next = i;
            }
        }

        current = next;
    } while (current !== leftmost && hull.length < n);

    return hull;
}

// QuickHull Algorithm (Divide and Conquer)
function quickHull(points) {
    if (points.length < 3) return points;

    // Find extreme points
    let minX = 0, maxX = 0;
    for (let i = 1; i < points.length; i++) {
        if (points[i].x < points[minX].x) minX = i;
        if (points[i].x > points[maxX].x) maxX = i;
    }

    const hull = [];
    const upper = [];
    const lower = [];

    // Divide points into upper and lower sets
    for (const point of points) {
        const orientation = crossProduct(points[minX], points[maxX], point);
        if (orientation > 0) upper.push(point);
        else if (orientation < 0) lower.push(point);
    }

    // Recursively build hull
    buildHull(points[minX], points[maxX], upper, hull);
    hull.push(points[maxX]);
    buildHull(points[maxX], points[minX], lower, hull);

    return hull;
}

function buildHull(p1, p2, points, hull) {
    if (points.length === 0) return;

    // Find the farthest point from line p1-p2
    let farthest = 0;
    let maxDist = 0;

    for (let i = 0; i < points.length; i++) {
        const dist = Math.abs(crossProduct(p1, p2, points[i]));
        if (dist > maxDist) {
            maxDist = dist;
            farthest = i;
        }
    }

    const farthestPoint = points[farthest];
    hull.push(farthestPoint);

    // Divide points into two sets
    const left1 = [];
    const left2 = [];

    for (let i = 0; i < points.length; i++) {
        if (i === farthest) continue;
        if (crossProduct(p1, farthestPoint, points[i]) > 0) left1.push(points[i]);
        else if (crossProduct(farthestPoint, p2, points[i]) > 0) left2.push(points[i]);
    }

    buildHull(p1, farthestPoint, left1, hull);
    buildHull(farthestPoint, p2, left2, hull);
}

// Check if a point is inside a convex hull
function pointInConvexHull(point, hull) {
    if (hull.length < 3) return false;

    for (let i = 0; i < hull.length; i++) {
        const j = (i + 1) % hull.length;
        if (crossProduct(hull[i], hull[j], point) < 0) {
            return false;
        }
    }
    return true;
}

// Calculate area of convex hull using Shoelace formula
function convexHullArea(hull) {
    if (hull.length < 3) return 0;

    let area = 0;
    for (let i = 0; i < hull.length; i++) {
        const j = (i + 1) % hull.length;
        area += hull[i].x * hull[j].y;
        area -= hull[j].x * hull[i].y;
    }

    return Math.abs(area) / 2;
}

// Example usage
console.log('Convex Hull Algorithms');
console.log('======================');

const points = [
    new Point(0, 3),
    new Point(1, 1),
    new Point(2, 2),
    new Point(4, 4),
    new Point(0, 0),
    new Point(1, 2),
    new Point(3, 5),
    new Point(5, 3),
    new Point(3, 3),
    new Point(4, 1)
];

console.log('Points:', points.map(p => p.toString()));

// Graham Scan
const grahamHull = grahamScan([...points]);
console.log('\n--- Graham Scan ---');
console.log('Convex Hull:', grahamHull.map(p => p.toString()));
console.log('Area:', convexHullArea(grahamHull).toFixed(2));

// Jarvis March
const jarvisHull = jarvisMarch([...points]);
console.log('\n--- Jarvis March ---');
console.log('Convex Hull:', jarvisHull.map(p => p.toString()));

// QuickHull
const quickHullResult = quickHull([...points]);
console.log('\n--- QuickHull ---');
console.log('Convex Hull:', quickHullResult.map(p => p.toString()));

// Point in hull test
console.log('\n--- Point in Hull Test ---');
const testPoint = new Point(2, 2);
console.log(`Point ${testPoint.toString()} inside hull:`, pointInConvexHull(testPoint, grahamHull));
const outsidePoint = new Point(10, 10);
console.log(`Point ${outsidePoint.toString()} inside hull:`, pointInConvexHull(outsidePoint, grahamHull));
