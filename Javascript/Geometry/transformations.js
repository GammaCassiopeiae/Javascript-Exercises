/**
 * Transformations Algorithms (2D)
 */

/**
 * Homogeneous Coordinate Translation Matrix
 */
function translationMatrix(tx, ty) {
    return [
        [1, 0, tx],
        [0, 1, ty],
        [0, 0, 1]
    ];
}

/**
 * Homogeneous Coordinate Rotation Matrix (Theta in radians)
 */
function rotationMatrix(theta) {
    let cos = Math.cos(theta);
    let sin = Math.sin(theta);
    return [
        [cos, -sin, 0],
        [sin, cos, 0],
        [0, 0, 1]
    ];
}

/**
 * Homogeneous Coordinate Scaling Matrix
 */
function scalingMatrix(sx, sy) {
    return [
        [sx, 0, 0],
        [0, sy, 0],
        [0, 0, 1]
    ];
}

/**
 * Homogeneous Coordinate Shearing Matrix
 */
function shearingMatrix(kx, ky) {
    return [
        [1, kx, 0],
        [ky, 1, 0],
        [0, 0, 1]
    ];
}

/**
 * Multiply 3x3 matrix by 3x1 vector [x, y, 1]
 */
function multiplyMatrixVector(m, v) {
    let x = v[0], y = v[1], w = v[2] || 1;
    return [
        m[0][0] * x + m[0][1] * y + m[0][2] * w,
        m[1][0] * x + m[1][1] * y + m[1][2] * w,
        m[2][0] * x + m[2][1] * y + m[2][2] * w
    ];
}

/**
 * Apply affine transformation matrix to point {x, y}
 */
function applyTransform(p, matrix) {
    let res = multiplyMatrixVector(matrix, [p.x, p.y, 1]);
    return { x: res[0], y: res[1] };
}

/**
 * Translate point
 */
function translatePoint(p, tx, ty) {
    return applyTransform(p, translationMatrix(tx, ty));
}

/**
 * Rotate point (around origin)
 */
function rotatePoint(p, theta) {
    return applyTransform(p, rotationMatrix(theta));
}

/**
 * Scale point (around origin)
 */
function scalePoint(p, sx, sy) {
    return applyTransform(p, scalingMatrix(sx, sy));
}

/**
 * Reflect point over line y = mx + c (Simplified)
 */
function reflectPointAffine(p, L) {
    // Reusing logic from lines.js is more robust,
    // but here is the logic for a general reflection matrix if L is through origin
    // For general line, use the implementation in lines.js
    const { reflectPoint } = require('./lines');
    return reflectPoint(L, p);
}

module.exports = {
    translationMatrix,
    rotationMatrix,
    scalingMatrix,
    shearingMatrix,
    applyTransform,
    translatePoint,
    rotatePoint,
    scalePoint,
    reflectPointAffine
};
