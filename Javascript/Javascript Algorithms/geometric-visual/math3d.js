// Vector 3D operations
class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x; this.y = y; this.z = z;
    }
    add(v) { return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z); }
    sub(v) { return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z); }
    mul(s) { return new Vec3(this.x * s, this.y * s, this.z * s); }
    dot(v) { return this.x * v.x + this.y * v.y + this.z * v.z; }
    cross(v) {
        return new Vec3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }
    mag() { return Math.sqrt(this.dot(this)); }
    normalize() {
        const m = this.mag();
        return m > 0 ? this.mul(1 / m) : new Vec3();
    }
}

// Matrix 4x4 for transformations
class Mat4 {
    constructor() {
        this.m = new Float32Array(16);
        this.identity();
    }
    identity() {
        this.m.fill(0);
        this.m[0] = this.m[5] = this.m[10] = this.m[15] = 1;
        return this;
    }
    static rotationX(angle) {
        const m = new Mat4();
        const c = Math.cos(angle), s = Math.sin(angle);
        m.m[5] = c; m.m[6] = s; m.m[9] = -s; m.m[10] = c;
        return m;
    }
    static rotationY(angle) {
        const m = new Mat4();
        const c = Math.cos(angle), s = Math.sin(angle);
        m.m[0] = c; m.m[2] = -s; m.m[8] = s; m.m[10] = c;
        return m;
    }
    static perspective(fov, aspect, near, far) {
        const m = new Mat4();
        const f = 1.0 / Math.tan(fov / 2);
        m.m[0] = f / aspect;
        m.m[5] = f;
        m.m[10] = (far + near) / (near - far);
        m.m[11] = -1;
        m.m[14] = (2 * far * near) / (near - far);
        m.m[15] = 0;
        return m;
    }
    multiply(b) {
        const out = new Mat4();
        const a = this.m, bm = b.m;
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                out.m[i * 4 + j] = a[i * 4 + 0] * bm[0 * 4 + j] +
                                   a[i * 4 + 1] * bm[1 * 4 + j] +
                                   a[i * 4 + 2] * bm[2 * 4 + j] +
                                   a[i * 4 + 3] * bm[3 * 4 + j];
            }
        }
        return out;
    }
    transform(v) {
        const x = v.x, y = v.y, z = v.z;
        const w = this.m[3] * x + this.m[7] * y + this.m[11] * z + this.m[15];
        return new Vec3(
            (this.m[0] * x + this.m[4] * y + this.m[8] * z + this.m[12]) / w,
            (this.m[1] * x + this.m[5] * y + this.m[9] * z + this.m[13]) / w,
            (this.m[2] * x + this.m[6] * y + this.m[10] * z + this.m[14]) / w
        );
    }
}

// Simple projection logic
function project(v, width, height) {
    return {
        x: (v.x + 1) * width * 0.5,
        y: (1 - v.y) * height * 0.5
    };
}
