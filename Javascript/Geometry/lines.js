/**
 * Lines & Segments Algorithms
 */

/**
 * Line defined by ax + by + c = 0
 */
function lineFromPoints(p1, p2) {
    let a = p1.y - p2.y;
    let b = p2.x - p1.x;
    let c = -a * p1.x - b * p1.y;
    return { a, b, c };
}

/**
 * Line intersection of two lines (L1 and L2)
 * Each line is ax + by + c = 0
 */
function lineIntersection(L1, L2) {
    let det = L1.a * L2.b - L2.a * L1.b;
    if (det === 0) return null; // Parallel

    let x = (L1.b * L2.c - L2.b * L1.c) / det;
    let y = (L2.a * L1.c - L1.a * L2.c) / det;
    return { x, y };
}

/**
 * Check if point P is on segment AB
 */
function onSegment(p, a, b) {
    return p.x <= Math.max(a.x, b.x) && p.x >= Math.min(a.x, b.x) &&
           p.y <= Math.max(a.y, b.y) && p.y >= Math.min(a.y, b.y);
}

/**
 * Orientation of three points (ordered)
 * 0: collinear, 1: clockwise, 2: counterclockwise
 */
function orientation(p, q, r) {
    let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0;
    return (val > 0) ? 1 : 2;
}

/**
 * Check if segment AB intersects segment CD
 */
function segmentsIntersect(a, b, c, d) {
    let o1 = orientation(a, b, c);
    let o2 = orientation(a, b, d);
    let o3 = orientation(c, d, a);
    let o4 = orientation(c, d, b);

    if (o1 !== o2 && o3 !== o4) return true;

    if (o1 === 0 && onSegment(c, a, b)) return true;
    if (o2 === 0 && onSegment(d, a, b)) return true;
    if (o3 === 0 && onSegment(a, c, d)) return true;
    if (o4 === 0 && onSegment(b, c, d)) return true;

    return false;
}

/**
 * Perpendicular bisector of segment AB
 */
function perpendicularBisector(a, b) {
    let mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    // Normal vector is (-dy, dx)
    // Line: -dy*x + dx*y + c = 0
    let c = dy * mid.x - dx * mid.y;
    return { a: -dy, b: dx, c: c };
}

/**
 * Closest point on line (ax + by + c = 0) to point P
 */
function closestPointOnLine(L, p) {
    let x = (L.b * (L.b * p.x - L.a * p.y) - L.a * L.c) / (L.a * L.a + L.b * L.b);
    let y = (L.a * (L.a * p.y - L.b * p.x) - L.b * L.c) / (L.a * L.a + L.b * L.b);
    return { x, y };
}

/**
 * Reflect point P over line (ax + by + c = 0)
 */
function reflectPoint(L, p) {
    let closest = closestPointOnLine(L, p);
    return {
        x: 2 * closest.x - p.x,
        y: 2 * closest.y - p.y
    };
}

module.exports = {
    lineFromPoints,
    lineIntersection,
    onSegment,
    segmentsIntersect,
    perpendicularBisector,
    closestPointOnLine,
    reflectPoint
};
