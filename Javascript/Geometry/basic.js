/**
 * Basic Geometry Algorithms
 */

/**
 * Euclidean distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 */
function euclideanDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

/**
 * Midpoint of a segment
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 */
function midpoint(p1, p2) {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    };
}

/**
 * Slope of a line passing through p1 and p2
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 */
function slope(p1, p2) {
    if (p1.x === p2.x) return Infinity;
    return (p2.y - p1.y) / (p2.x - p1.x);
}

/**
 * Manhattan distance (L1 norm)
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 */
function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

/**
 * Chebyshev distance (L-infinity norm)
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 */
function chebyshevDistance(p1, p2) {
    return Math.max(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
}

module.exports = {
    euclideanDistance,
    midpoint,
    slope,
    manhattanDistance,
    chebyshevDistance
};
