/**
 * Circle Algorithms
 */

/**
 * Check if point P is inside circle (center, r)
 */
function isPointInCircle(p, center, r) {
    let d = Math.sqrt(Math.pow(p.x - center.x, 2) + Math.pow(p.y - center.y, 2));
    return d <= r;
}

/**
 * Circle-line intersection
 * Circle: (center.x, center.y), r
 * Line: ax + by + c = 0
 */
function circleLineIntersection(center, r, L) {
    let { a, b, c } = L;
    let dist = Math.abs(a * center.x + b * center.y + c) / Math.sqrt(a * a + b * b);

    if (dist > r) return []; // No intersection

    let x0 = -a * c / (a * a + b * b);
    let y0 = -b * c / (a * a + b * b);

    if (dist === r) return [{ x: x0 + center.x, y: y0 + center.y }]; // Tangent

    let d = r * r - c * c / (a * a + b * b);
    let mult = Math.sqrt(d / (a * a + b * b));
    return [
        { x: x0 + b * mult + center.x, y: y0 - a * mult + center.y },
        { x: x0 - b * mult + center.x, y: y0 + a * mult + center.y }
    ];
}

/**
 * Circle-circle intersection
 */
function circleCircleIntersection(c1, r1, c2, r2) {
    let d = Math.sqrt(Math.pow(c2.x - c1.x, 2) + Math.pow(c2.y - c1.y, 2));
    if (d > r1 + r2 || d < Math.abs(r1 - r2) || d === 0) return [];

    let a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
    let h = Math.sqrt(r1 * r1 - a * a);
    let p2 = {
        x: c1.x + a * (c2.x - c1.x) / d,
        y: c1.y + a * (c2.y - c1.y) / d
    };

    return [
        {
            x: p2.x + h * (c2.y - c1.y) / d,
            y: p2.y - h * (c2.x - c1.x) / d
        },
        {
            x: p2.x - h * (c2.y - c1.y) / d,
            y: p2.y + h * (c2.x - c1.x) / d
        }
    ];
}

/**
 * Arc length
 */
function arcLength(r, angleInDegrees) {
    return (angleInDegrees / 360) * (2 * Math.PI * r);
}

/**
 * Sector area
 */
function sectorArea(r, angleInDegrees) {
    return (angleInDegrees / 360) * (Math.PI * r * r);
}

/**
 * Welzl's algorithm for Smallest Enclosing Circle (Basic idea)
 */
function getSmallestEnclosingCircle(points) {
    // Shuffling points improves performance
    let p = [...points].sort(() => Math.random() - 0.5);
    let circle = { x: 0, y: 0, r: -1 };

    for (let i = 0; i < p.length; i++) {
        if (circle.r < 0 || !isPointInCircle(p[i], circle, circle.r)) {
            circle = { x: p[i].x, y: p[i].y, r: 0 };
            for (let j = 0; j < i; j++) {
                if (!isPointInCircle(p[j], circle, circle.r)) {
                    circle.x = (p[i].x + p[j].x) / 2;
                    circle.y = (p[i].y + p[j].y) / 2;
                    circle.r = Math.sqrt(Math.pow(p[i].x - p[j].x, 2) + Math.pow(p[i].y - p[j].y, 2)) / 2;
                    for (let k = 0; k < j; k++) {
                        if (!isPointInCircle(p[k], circle, circle.r)) {
                            // Circle through 3 points p[i], p[j], p[k]
                            // Simplified here: reuse circumcenter
                            let { circumcenter } = require('./triangles');
                            let center = circumcenter(p[i], p[j], p[k]);
                            let r = Math.sqrt(Math.pow(p[i].x - center.x, 2) + Math.pow(p[i].y - center.y, 2));
                            circle = { ...center, r };
                        }
                    }
                }
            }
        }
    }
    return circle;
}

module.exports = {
    isPointInCircle,
    circleLineIntersection,
    circleCircleIntersection,
    arcLength,
    sectorArea,
    getSmallestEnclosingCircle
};
