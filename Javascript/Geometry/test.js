/**
 * Demonstration of Geometry Algorithms
 */

const Basic = require('./basic');
const Lines = require('./lines');
const Triangles = require('./triangles');
const Polygons = require('./polygons');
const Circles = require('./circles');
const Transformations = require('./transformations');

// 1. Basic Geometry
const p1 = { x: 0, y: 0 };
const p2 = { x: 3, y: 4 };
console.log('--- Basic ---');
console.log('Euclidean Distance (0,0) to (3,4):', Basic.euclideanDistance(p1, p2)); // Expected: 5
console.log('Midpoint:', Basic.midpoint(p1, p2));
console.log('Manhattan Distance:', Basic.manhattanDistance(p1, p2)); // Expected: 7

// 2. Lines
const line1 = Lines.lineFromPoints({ x: 0, y: 0 }, { x: 10, y: 10 }); // y = x
const line2 = Lines.lineFromPoints({ x: 0, y: 10 }, { x: 10, y: 0 }); // y = -x + 10
console.log('\n--- Lines ---');
console.log('Intersection of y=x and y=-x+10:', Lines.lineIntersection(line1, line2)); // Expected: {x: 5, y: 5}

// 3. Triangles
const A = { x: 0, y: 0 }, B = { x: 4, y: 0 }, C = { x: 0, y: 3 };
console.log('\n--- Triangles ---');
console.log('Area of triangle (0,0),(4,0),(0,3):', Triangles.areaCrossProduct(A, B, C)); // Expected: 6
console.log('Centroid:', Triangles.centroid(A, B, C));
console.log('Point (1,1) inside triangle?:', Triangles.isPointInTriangle({ x: 1, y: 1 }, A, B, C)); // Expected: true

// 4. Polygons
const poly = [{ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, { x: 0, y: 4 }];
console.log('\n--- Polygons ---');
console.log('Polygon Area (4x4 square):', Polygons.polygonArea(poly)); // Expected: 16
console.log('Is Convex?:', Polygons.isConvex(poly)); // Expected: true

// 5. Circles
const circleCenter = { x: 5, y: 5 };
const radius = 5;
console.log('\n--- Circles ---');
console.log('Point (8,8) in Circle(5,5, r=5)?:', Circles.isPointInCircle({ x: 8, y: 8 }, circleCenter, radius)); // Expected: true (d=4.24)

// 6. Transformations
const p = { x: 1, y: 0 };
console.log('\n--- Transformations ---');
console.log('Rotate (1,0) by 90 degrees:', Transformations.rotatePoint(p, Math.PI / 2)); // Expected: {x: 0, y: 1}
console.log('Translate (1,0) by (5,5):', Transformations.translatePoint(p, 5, 5)); // Expected: {x: 6, y: 5}
