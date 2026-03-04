// Point in Polygon Algorithms
// Various algorithms to determine if a point lies inside a polygon

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

class Polygon {
    constructor(vertices) {
        this.vertices = vertices;
    }
}

// Ray Casting Algorithm (Even-Odd Rule)
// Time Complexity: O(n)
// Space Complexity: O(1)
function pointInPolygonRayCasting(point, polygon) {
    const vertices = polygon.vertices;
    const n = vertices.length;

    if (n < 3) return false;

    let inside = false;

    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y;
        const xj = vertices[j].x, yj = vertices[j].y;

        // Check if point is on vertex
        if (Math.abs(point.x - xi) < Number.EPSILON && Math.abs(point.y - yi) < Number.EPSILON) {
            return true; // On boundary
        }

        // Check if ray from point crosses this edge
        const intersect = ((yi > point.y) !== (yj > point.y)) &&
            (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);

        if (intersect) inside = !inside;
    }

    return inside;
}

// Winding Number Algorithm
// Time Complexity: O(n)
// Space Complexity: O(1)
// More accurate for complex polygons
function pointInPolygonWindingNumber(point, polygon) {
    const vertices = polygon.vertices;
    const n = vertices.length;

    if (n < 3) return false;

    let windingNumber = 0;

    for (let i = 0, j = n - 1; i < n; j = i++) {
        const xi = vertices[i].x, yi = vertices[i].y;
        const xj = vertices[j].x, yj = vertices[j].y;

        // Check if point is on vertex
        if (Math.abs(point.x - xi) < Number.EPSILON && Math.abs(point.y - yi) < Number.EPSILON) {
            return true; // On boundary
        }

        // Check if point is on edge
        if (isPointOnSegment(point, vertices[j], vertices[i])) {
            return true; // On boundary
        }

        if (yi <= point.y) {
            if (yj > point.y) {
                // Upward crossing
                if (isLeft(vertices[j], vertices[i], point) > 0) {
                    windingNumber++;
                }
            }
        } else {
            if (yj <= point.y) {
                // Downward crossing
                if (isLeft(vertices[j], vertices[i], point) < 0) {
                    windingNumber--;
                }
            }
        }
    }

    return windingNumber !== 0;
}

// Helper function: check if point is on segment
function isPointOnSegment(point, p1, p2) {
    const cross = (point.y - p1.y) * (p2.x - p1.x) - (point.x - p1.x) * (p2.y - p1.y);
    if (Math.abs(cross) > Number.EPSILON) return false;

    const dot = (point.x - p1.x) * (point.x - p2.x) + (point.y - p1.y) * (point.y - p2.y);
    return dot <= 0;
}

// Helper function: determine if point is left of line
function isLeft(p1, p2, point) {
    return (p2.x - p1.x) * (point.y - p1.y) - (point.x - p1.x) * (p2.y - p1.y);
}

// Check if point is on polygon boundary
function pointOnPolygonBoundary(point, polygon) {
    const vertices = polygon.vertices;
    const n = vertices.length;

    for (let i = 0, j = n - 1; i < n; j = i++) {
        if (isPointOnSegment(point, vertices[j], vertices[i])) {
            return true;
        }
    }

    return false;
}

// Comprehensive point-in-polygon test
function pointInPolygonComprehensive(point, polygon) {
    if (pointOnPolygonBoundary(point, polygon)) {
        return { inside: false, onBoundary: true };
    }

    const inside = pointInPolygonRayCasting(point, polygon);
    return { inside, onBoundary: false };
}

// Test multiple points against a polygon
function testMultiplePoints(points, polygon) {
    return points.map(point => ({
        point,
        result: pointInPolygonComprehensive(point, polygon)
    }));
}

// Calculate polygon area using Shoelace formula
function polygonArea(polygon) {
    const vertices = polygon.vertices;
    const n = vertices.length;

    if (n < 3) return 0;

    let area = 0;
    for (let i = 0; i < n; i++) {
        const j = (i + 1) % n;
        area += vertices[i].x * vertices[j].y;
        area -= vertices[j].x * vertices[i].y;
    }

    return Math.abs(area) / 2;
}

// Check if polygon is convex
function isConvex(polygon) {
    const vertices = polygon.vertices;
    const n = vertices.length;

    if (n < 3) return false;

    let sign = null;

    for (let i = 0; i < n; i++) {
        const p1 = vertices[i];
        const p2 = vertices[(i + 1) % n];
        const p3 = vertices[(i + 2) % n];

        const cross = (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);

        if (Math.abs(cross) > Number.EPSILON) {
            const currentSign = cross > 0;
            if (sign === null) {
                sign = currentSign;
            } else if (sign !== currentSign) {
                return false;
            }
        }
    }

    return true;
}

// Example usage
console.log('Point in Polygon Algorithms');
console.log('===========================');

// Create a simple polygon (square)
const square = new Polygon([
    new Point(0, 0),
    new Point(4, 0),
    new Point(4, 4),
    new Point(0, 4)
]);

// Test points
const testPoints = [
    new Point(2, 2),   // Inside
    new Point(0, 0),   // On vertex
    new Point(2, 0),   // On edge
    new Point(5, 5),   // Outside
    new Point(-1, 2),  // Outside
    new Point(1, 1)    // Inside
];

console.log('Square polygon: (0,0), (4,0), (4,4), (0,4)');
console.log('\n--- Ray Casting Results ---');
for (const point of testPoints) {
    const inside = pointInPolygonRayCasting(point, square);
    console.log(`Point ${point.toString()}: ${inside ? 'Inside' : 'Outside'}`);
}

console.log('\n--- Winding Number Results ---');
for (const point of testPoints) {
    const inside = pointInPolygonWindingNumber(point, square);
    console.log(`Point ${point.toString()}: ${inside ? 'Inside' : 'Outside'}`);
}

console.log('\n--- Comprehensive Results ---');
for (const point of testPoints) {
    const result = pointInPolygonComprehensive(point, square);
    if (result.onBoundary) {
        console.log(`Point ${point.toString()}: On boundary`);
    } else {
        console.log(`Point ${point.toString()}: ${result.inside ? 'Inside' : 'Outside'}`);
    }
}

// Complex polygon (star-shaped)
console.log('\n--- Complex Polygon (Star) ---');
const star = new Polygon([
    new Point(0, 2),
    new Point(1, 1),
    new Point(2, 0),
    new Point(3, 1),
    new Point(4, 2),
    new Point(3, 3),
    new Point(4, 4),
    new Point(3, 5),
    new Point(2, 4),
    new Point(1, 5),
    new Point(0, 4),
    new Point(-1, 5),
    new Point(-2, 4),
    new Point(-1, 3),
    new Point(-2, 2),
    new Point(-1, 1)
]);

const starTestPoints = [
    new Point(1, 2),
    new Point(2, 2),
    new Point(0, 0)
];

console.log('Star polygon test:');
for (const point of starTestPoints) {
    const inside = pointInPolygonRayCasting(point, star);
    console.log(`Point ${point.toString()}: ${inside ? 'Inside' : 'Outside'}`);
}

// Polygon properties
console.log('\n--- Polygon Properties ---');
console.log('Square area:', polygonArea(square));
console.log('Square is convex:', isConvex(square));
console.log('Star area:', polygonArea(star).toFixed(2));
console.log('Star is convex:', isConvex(star));
