function generateCaves(width, height, fillChance = 0.45, iterations = 5) {
    let map = Array.from({ length: height }, () => 
        Array.from({ length: width }, () => Math.random() < fillChance ? 1 : 0)
    );

    for (let i = 0; i < iterations; i++) {
        let newMap = map.map(arr => [...arr]);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let neighbors = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) continue;
                        if (map[y + i]?.[x + j] === 1) neighbors++;
                    }
                }
                newMap[y][x] = neighbors > 4 ? 1 : 0;
            }
        }
        map = newMap;
    }
    return map.map(row => row.map(v => v ? '█' : ' ').join('')).join('\n');
}

console.log("Generirana jama:\n" + generateCaves(40, 10));


class Rect {
    constructor(x, y, w, h) { Object.assign(this, {x, y, w, h}); }
}

function splitBSP(rect, minSize) {
    if (rect.w <= minSize * 2 && rect.h <= minSize * 2) return [rect];

    let splitH = Math.random() > 0.5;
    if (rect.w > rect.h && rect.w / rect.h >= 1.25) splitH = false;
    else if (rect.h > rect.w && rect.h / rect.w >= 1.25) splitH = true;

    let max = (splitH ? rect.h : rect.w) - minSize;
    if (max <= minSize) return [rect];

    let split = Math.floor(Math.random() * (max - minSize) + minSize);
    let r1 = splitH ? new Rect(rect.x, rect.y, rect.w, split) : new Rect(rect.x, rect.y, split, rect.h);
    let r2 = splitH ? new Rect(rect.x, rect.y + split, rect.w, rect.h - split) : new Rect(rect.x + split, rect.y, rect.w - split, rect.h);

    return [...splitBSP(r1, minSize), ...splitBSP(r2, minSize)];
}

console.log("BSP Sobe:", splitBSP(new Rect(0, 0, 100, 100), 20));


const RULES = {
    'Trava': ['Trava', 'Pesek'],
    'Pesek': ['Trava', 'Voda'],
    'Voda': ['Pesek', 'Voda']
};

function wfc1D(size) {
    let result = [];
    let possible = Object.keys(RULES);
    
    result[0] = possible[Math.floor(Math.random() * possible.length)];
    
    for (let i = 1; i < size; i++) {
        let last = result[i - 1];
        let options = RULES[last];
        result[i] = options[Math.floor(Math.random() * options.length)];
    }
    return result.join(' -> ');
}

console.log("WFC 1D Vrsta:", wfc1D(10));


function poissonDisk(width, height, r, k = 30) {
    let points = [];
    let active = [ {x: Math.random() * width, y: Math.random() * height} ];
    
    while (active.length > 0) {
        let randIdx = Math.floor(Math.random() * active.length);
        let p = active[randIdx];
        let found = false;

        for (let i = 0; i < k; i++) {
            let angle = Math.random() * Math.PI * 2;
            let dist = Math.random() * r + r;
            let candidate = { x: p.x + Math.cos(angle) * dist, y: p.y + Math.sin(angle) * dist };

            if (candidate.x >= 0 && candidate.x < width && candidate.y >= 0 && candidate.y < height &&
                points.every(op => Math.hypot(op.x - candidate.x, op.y - candidate.y) >= r)) {
                points.push(candidate);
                active.push(candidate);
                found = true;
                break;
            }
        }
        if (!found) active.splice(randIdx, 1);
    }
    return points.length;
}

console.log(`Število naravno razporejenih objektov: ${poissonDisk(100, 100, 10)}`);


function diamondSquare(size, roughness) {
    let grid = Array.from({ length: size }, () => Array(size).fill(0));
    grid[0][0] = grid[0][size-1] = grid[size-1][0] = grid[size-1][size-1] = 50;

    // Poenostavljena vizualizacija logike:
    // 1. Diamond: Sredinska točka kvadrata je povprečje vogalov + naključje
    // 2. Square: Sredinske točke stranic so povprečje sosedov + naključje
    return "Diamond-Square mreža inicializirana na velikost " + size;
}
console.log(diamondSquare(17, 0.5));
