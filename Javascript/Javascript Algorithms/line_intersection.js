// Line Intersection and Related Geometric Algorithms
// Various algorithms for line segment intersection and related problems

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }
}

class LineSegment {
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

// Check if point q lies on segment pr
function onSegment(p, q, r) {
    return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
           q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
}

// Find orientation of ordered triplet (p, q, r)
// Returns: 0 -> Collinear, 1 -> Clockwise, 2 -> Counter-clockwise
function orientation(p, q, r) {
    const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

    if (Math.abs(val) < Number.EPSILON) return 0;
    return val > 0 ? 1 : 2;
}

// Check if two line segments intersect
function doSegmentsIntersect(seg1, seg2) {
    const p1 = seg1.p1;
    const q1 = seg1.p2;
    const p2 = seg2.p1;
    const q2 = seg2.p2;

    // Find the four orientations needed for general and special cases
    const o1 = orientation(p1, q1, p2);
    const o2 = orientation(p1, q1, q2);
    const o3 = orientation(p2, q2, p1);
    const o4 = orientation(p2, q2, q1);

    // General case
    if (o1 !== o2 && o3 !== o4) {
        return true;
    }

    // Special cases (collinear)
    if (o1 === 0 && onSegment(p1, p2, q1)) return true;
    if (o2 === 0 && onSegment(p1, q2, q1)) return true;
    if (o3 === 0 && onSegment(p2, p1, q2)) return true;
    if (o4 === 0 && onSegment(p2, q1, q2)) return true;

    return false;
}

// Find intersection point of two line segments (if it exists)
function findIntersectionPoint(seg1, seg2) {
    const p1 = seg1.p1;
    const q1 = seg1.p2;
    const p2 = seg2.p1;
    const q2 = seg2.p2;

    const x1 = p1.x, y1 = p1.y;
    const x2 = q1.x, y2 = q1.y;
    const x3 = p2.x, y3 = p2.y;
    const x4 = q2.x, y4 = q2.y;

    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

    if (Math.abs(denom) < Number.EPSILON) {
        // Lines are parallel or collinear
        if (doSegmentsIntersect(seg1, seg2)) {
            // Check for endpoint touching
            if (pointsEqual(p1, p2)) return p1;
            if (pointsEqual(p1, q2)) return p1;
            if (pointsEqual(q1, p2)) return q1;
            if (pointsEqual(q1, q2)) return q1;
            return { type: 'overlap', segments: [seg1, seg2] };
        }
        return null;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
        return new Point(x1 + ua * (x2 - x1), y1 + ua * (y2 - y1));
    }

    return null; // Intersection is outside the segments
}

function pointsEqual(p1, p2) {
    return Math.abs(p1.x - p2.x) < Number.EPSILON && Math.abs(p1.y - p2.y) < Number.EPSILON;
}

// Sweep Line Algorithm for finding all intersections
function find所有Intersections(segments) {
    const intersections = [];
    const n = segments.length;

    // Brute force O(n²) approach
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (doSegmentsIntersect(segments[i], segments[j])) {
                const point = findIntersectionPoint(segments[i], segments[j]);
                if (point && !(point.type === 'overlap')) {
                    intersections.push({
                        segment1: i,
                        segment2: j,
                        point: point
                    });
                }
            }
        }
    }

    return intersections;
}

// Check if a point lies on a line
function pointOnLine(point, lineP1, lineP2) {
    return Math.abs(orientation(lineP1, lineP2, point)) < Number.EPSILON;
}

// Distance from point to line
function distancePointToLine(point, lineP1, lineP2) {
    const A = point.x - lineP1.x;
    const B = point.y - lineP1.y;
    const C = lineP2.x - lineP1.x;
    const D = lineP2.y - lineP1.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq > 0) param = dot / lenSq;

    let xx, yy;

    if (param < 0) {
        xx = lineP1.x;
        yy = lineP1.y;
    } else if (param > 1) {
        xx = lineP2.x;
        yy = lineP2.y;
    } else {
        xx = lineP1.x + param * C;
        yy = lineP1.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
}

// Example usage
console.log('Line Intersection Algorithms');
console.log('============================');

// Test segment intersection
const seg1 = new LineSegment(new Point(1, 1), new Point(4, 4));
const seg2 = new LineSegment(new Point(1, 4), new Point(4, 1));

console.log('Segment 1:', seg1.p1.toString(), 'to', seg1.p2.toString());
console.log('Segment 2:', seg2.p1.toString(), 'to', seg2.p2.toString());
console.log('Do segments intersect?', doSegmentsIntersect(seg1, seg2));

const intersection = findIntersectionPoint(seg1, seg2);
if (intersection && !(intersection.type === 'overlap')) {
    console.log('Intersection point:', intersection.toString());
}

// More examples
console.log('\n--- More Examples ---');

// Non-intersecting segments
const seg3 = new LineSegment(new Point(0, 0), new Point(2, 2));
const seg4 = new LineSegment(new Point(3, 3), new Point(5, 5));
console.log('\nSegments (0,0)-(2,2) and (3,3)-(5,5):');
console.log('Intersect?', doSegmentsIntersect(seg3, seg4));

// Touching at endpoint
const seg5 = new LineSegment(new Point(0, 0), new Point(2, 2));
const seg6 = new LineSegment(new Point(2, 2), new Point(4, 0));
console.log('\nSegments (0,0)-(2,2) and (2,2)-(4,0):');
console.log('Intersect?', doSegmentsIntersect(seg5, seg6));
console.log('Intersection point:', findIntersectionPoint(seg5, seg6)?.toString());

// Multiple intersections
console.log('\n--- Multiple Intersections ---');
const segments = [
    new LineSegment(new Point(0, 0), new Point(4, 4)),
    new LineSegment(new Point(0, 4), new Point(4, 0)),
    new LineSegment(new Point(0, 2), new Point(4, 2)),
    new LineSegment(new Point(2, 0), new Point(2, 4))
];

const allIntersections = find所有Intersections(segments);
console.log('Found', allIntersections.length, 'intersections:');
allIntersections.forEach(i => {
    console.log(`  Segments ${i.segment1} & ${i.segment2}: ${i.point.toString()}`);
});

// Distance from point to line
console.log('\n--- Distance from Point to Line ---');
const point = new Point(3, 1);
const lineP1 = new Point(0, 0);
const lineP2 = new Point(4, 4);
console.log(`Point: ${point.toString()}`);
console.log(`Line: ${lineP1.toString()} to ${lineP2.toString()}`);
console.log('Distance:', distancePointToLine(point, lineP1, lineP2).toFixed(4));
