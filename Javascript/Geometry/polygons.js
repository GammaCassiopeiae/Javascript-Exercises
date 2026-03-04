/**
 * Polygon Algorithms
 */

/**
 * Area of a polygon using Shoelace formula
 * @param {Array} points Array of {x, y}
 */
function polygonArea(points) {
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;
        area += points[i].x * points[j].y;
        area -= points[j].x * points[i].y;
    }
    return Math.abs(area) / 2;
}

/**
 * Perimeter of a polygon
 */
function polygonPerimeter(points) {
    let p = 0;
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;
        p += Math.sqrt(Math.pow(points[i].x - points[j].x, 2) + Math.pow(points[i].y - points[j].y, 2));
    }
    return p;
}

/**
 * Centroid of a polygon
 */
function polygonCentroid(points) {
    let cx = 0, cy = 0;
    let area = 0;
    for (let i = 0; i < points.length; i++) {
        let j = (i + 1) % points.length;
        let factor = (points[i].x * points[j].y - points[j].x * points[i].y);
        cx += (points[i].x + points[j].x) * factor;
        cy += (points[i].y + points[j].y) * factor;
        area += factor;
    }
    area /= 2;
    cx /= (6 * area);
    cy /= (6 * area);
    return { x: cx, y: cy };
}

/**
 * Check if polygon is convex
 */
function isConvex(points) {
    if (points.length < 3) return false;
    let sign = 0;
    for (let i = 0; i < points.length; i++) {
        let p1 = points[i];
        let p2 = points[(i + 1) % points.length];
        let p3 = points[(i + 2) % points.length];
        let cp = (p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x);
        if (cp !== 0) {
            if (sign === 0) sign = cp > 0 ? 1 : -1;
            else if (sign !== (cp > 0 ? 1 : -1)) return false;
        }
    }
    return true;
}

/**
 * Point inside polygon (Ray casting)
 */
function isPointInPolygon(p, points) {
    let inside = false;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        if (((points[i].y > p.y) !== (points[j].y > p.y)) &&
            (p.x < (points[j].x - points[i].x) * (p.y - points[i].y) / (points[j].y - points[i].y) + points[i].x)) {
            inside = !inside;
        }
    }
    return inside;
}

/**
 * Convex Hull (Andrew's monotone chain)
 */
function convexHull(points) {
    points.sort((a, b) => a.x !== b.x ? a.x - b.x : a.y - b.y);
    if (points.length <= 1) return points;

    const crossProduct = (a, b, c) => (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);

    let upper = [];
    for (let p of points) {
        while (upper.length >= 2 && crossProduct(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
            upper.pop();
        }
        upper.push(p);
    }

    let lower = [];
    for (let i = points.length - 1; i >= 0; i--) {
        let p = points[i];
        while (lower.length >= 2 && crossProduct(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
            lower.pop();
        }
        lower.push(p);
    }

    upper.pop();
    lower.pop();
    return upper.concat(lower);
}

module.exports = {
    polygonArea,
    polygonPerimeter,
    polygonCentroid,
    isConvex,
    isPointInPolygon,
    convexHull
};
