function checkAABB(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.w > b.x &&
        a.y < b.y + b.h &&
        a.y + a.h > b.y
    );
}

const player = { x: 10, y: 10, w: 32, h: 32 };
const wall = { x: 40, y: 20, w: 10, h: 50 };

console.log("AABB Trk:", checkAABB(player, wall) ? "DA" : "NE");


class Quadtree {
    constructor(boundary, capacity) {
        this.boundary = boundary; // {x, y, w, h}
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        let { x, y, w, h } = this.boundary;
        this.nw = new Quadtree({ x: x, y: y, w: w/2, h: h/2 }, this.capacity);
        this.ne = new Quadtree({ x: x + w/2, y: y, w: w/2, h: h/2 }, this.capacity);
        this.sw = new Quadtree({ x: x, y: y + h/2, w: w/2, h: h/2 }, this.capacity);
        this.se = new Quadtree({ x: x + w/2, y: y + h/2, w: w/2, h: h/2 }, this.capacity);
        this.divided = true;
    }

    insert(point) {
        if (!this.contains(point)) return false;
        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }
        if (!this.divided) this.subdivide();
        return (this.nw.insert(point) || this.ne.insert(point) || 
                this.sw.insert(point) || this.se.insert(point));
    }

    contains(p) {
        return (p.x >= this.boundary.x && p.x <= this.boundary.x + this.boundary.w &&
                p.y >= this.boundary.y && p.y <= this.boundary.y + this.boundary.h);
    }
}

const qt = new Quadtree({ x: 0, y: 0, w: 400, h: 400 }, 4);
qt.insert({ x: 10, y: 20 });
console.log("Quadtree inicializiran in točka vstavljena.");


function rayIntersectsSegment(rayOrigin, rayDir, segmentA, segmentB) {
    // Vektorska matematika za presečišče dveh premic
    const x1 = segmentA.x, y1 = segmentA.y;
    const x2 = segmentB.x, y2 = segmentB.y;
    const x3 = rayOrigin.x, y3 = rayOrigin.y;
    const x4 = rayOrigin.x + rayDir.x, y4 = rayOrigin.y + rayDir.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den === 0) return null; // Vzporedni premici

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    if (t > 0 && t < 1 && u > 0) {
        return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
    }
    return null;
}

console.log("Raycast zadetek:", rayIntersectsSegment({x:0,y:0}, {x:1,y:1}, {x:10,y:0}, {x:0,y:10}));


class Point {
    constructor(x, y) {
        this.x = x; this.y = y;
        this.oldX = x; this.oldY = y;
    }

    update(gravity) {
        let vx = this.x - this.oldX;
        let vy = this.y - this.oldY;
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += vx;
        this.y += vy + gravity;
    }
}

const particle = new Point(100, 100);
particle.x += 5; // Damo začetni potisk
for(let i=0; i<5; i++) {
    particle.update(0.5); // Simuliramo 5 frejmov s gravitacijo
    console.log(`Pozicija delca [${i}]: x=${particle.x.toFixed(2)}, y=${particle.y.toFixed(2)}`);
}


