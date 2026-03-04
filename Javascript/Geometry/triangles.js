/**
 * Triangles Algorithms
 */

/**
 * Area of a triangle using cross product
 */
function areaCrossProduct(a, b, c) {
    return Math.abs((a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y)) / 2);
}

/**
 * Area of a triangle using Heron's formula
 */
function areaHeron(a, b, c) {
    let sideA = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
    let sideB = Math.sqrt(Math.pow(a.x - c.x, 2) + Math.pow(a.y - c.y, 2));
    let sideC = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    let s = (sideA + sideB + sideC) / 2;
    return Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));
}

/**
 * Centroid
 */
function centroid(a, b, c) {
    return {
        x: (a.x + b.x + c.x) / 3,
        y: (a.y + b.y + c.y) / 3
    };
}

/**
 * Circumcenter
 */
function circumcenter(a, b, c) {
    let d = 2 * (a.x * (b.y - c.y) + b.x * (c.y - a.y) + c.x * (a.y - b.y));
    let ux = ((a.x * a.x + a.y * a.y) * (b.y - c.y) + (b.x * b.x + b.y * b.y) * (c.y - a.y) + (c.x * c.x + c.y * c.y) * (a.y - b.y)) / d;
    let uy = ((a.x * a.x + a.y * a.y) * (c.x - b.x) + (b.x * b.x + b.y * b.y) * (a.x - c.x) + (c.x * c.x + c.y * c.y) * (b.x - a.x)) / d;
    return { x: ux, y: uy };
}

/**
 * Incenter
 */
function incenter(a, b, c) {
    let sideA = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
    let sideB = Math.sqrt(Math.pow(a.x - c.x, 2) + Math.pow(a.y - c.y, 2));
    let sideC = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    let perimeter = sideA + sideB + sideC;
    return {
        x: (sideA * a.x + sideB * b.x + sideC * c.x) / perimeter,
        y: (sideA * a.y + sideB * b.y + sideC * c.y) / perimeter
    };
}

/**
 * Orthocenter
 */
function orthocenter(a, b, c) {
    let cen = centroid(a, b, c);
    let circum = circumcenter(a, b, c);
    // Using Euler line property: H, G, O are collinear and HG:GO = 2:1
    // H = 3G - 2O
    return {
        x: 3 * cen.x - 2 * circum.x,
        y: 3 * cen.y - 2 * circum.y
    };
}

/**
 * Check if point P is inside triangle ABC using barycentric coordinates
 */
function isPointInTriangle(p, a, b, c) {
    let area = areaCrossProduct(a, b, c);
    let s = (a.y * c.x - a.x * c.y + (c.y - a.y) * p.x + (a.x - c.x) * p.y) / (2 * area);
    let t = (a.x * b.y - a.y * b.x + (a.y - b.y) * p.x + (b.x - a.x) * p.y) / (2 * area);
    if (s < 0 || t < 0 || 1 - s - t < 0) return false;
    return true;
}

/**
 * Detect triangle type
 */
function triangleType(a, b, c) {
    let s1 = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
    let s2 = Math.sqrt(Math.pow(c.x - b.x, 2) + Math.pow(c.y - b.y, 2));
    let s3 = Math.sqrt(Math.pow(a.x - c.x, 2) + Math.pow(a.y - c.y, 2));
    
    let sides = [s1, s2, s3].sort((a,b) => a-b);
    let eps = 1e-9;

    if (Math.abs(sides[0] - sides[2]) < eps) return "equilateral";
    if (Math.abs(sides[0] - sides[1]) < eps || Math.abs(sides[1] - sides[2]) < eps) return "isosceles";
    return "scalene";
}

module.exports = {
    areaCrossProduct,
    areaHeron,
    centroid,
    circumcenter,
    incenter,
    orthocenter,
    isPointInTriangle,
    triangleType
};
