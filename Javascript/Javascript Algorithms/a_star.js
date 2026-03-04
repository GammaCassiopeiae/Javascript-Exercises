// A* (A-Star) Search Algorithm
// Time Complexity: O((V + E) log V) with good heuristic
// Space Complexity: O(V)
// Finds shortest path using heuristic to guide search

class PriorityQueue {
    constructor() {
        this.values = [];
    }

    enqueue(val, priority) {
        this.values.push({ val, priority });
        this.sort();
    }

    dequeue() {
        return this.values.shift();
    }

    sort() {
        this.values.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.values.length === 0;
    }
}

// Manhattan distance heuristic (for grid-based problems)
function manhattanDistance(a, b) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

// Euclidean distance heuristic
function euclideanDistance(a, b) {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

function aStar(graph, start, end, heuristic = manhattanDistance) {
    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const cameFrom = {};
    const gScore = {}; // Cost from start to node
    const fScore = {}; // gScore + heuristic

    // Initialize
    for (const node in graph) {
        gScore[node] = Infinity;
        fScore[node] = Infinity;
    }

    gScore[start] = 0;
    fScore[start] = heuristic(graph[start], graph[end]);
    openSet.enqueue(start, fScore[start]);

    while (!openSet.isEmpty()) {
        const current = openSet.dequeue().val;

        // Reached the goal
        if (current === end) {
            return reconstructPath(cameFrom, current);
        }

        closedSet.add(current);

        for (const [neighbor, weight] of graph[current].neighbors || []) {
            if (closedSet.has(neighbor)) continue;

            const tentativeGScore = gScore[current] + weight;

            if (tentativeGScore < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + heuristic(graph[neighbor], graph[end]);

                if (!openSet.values.some(v => v.val === neighbor)) {
                    openSet.enqueue(neighbor, fScore[neighbor]);
                }
            }
        }
    }

    return null; // No path found
}

function reconstructPath(cameFrom, current) {
    const path = [current];
    while (current in cameFrom) {
        current = cameFrom[current];
        path.unshift(current);
    }
    return path;
}

// Grid-based A* example
function aStarGrid(grid, start, end) {
    const rows = grid.length;
    const cols = grid[0].length;
    const openSet = new PriorityQueue();
    const cameFrom = {};
    const gScore = {};
    const fScore = {};

    const startKey = `${start[0]},${start[1]}`;
    const endKey = `${end[0]},${end[1]}`;

    gScore[startKey] = 0;
    fScore[startKey] = Math.abs(end[0] - start[0]) + Math.abs(end[1] - start[1]);
    openSet.enqueue(start, fScore[startKey]);

    const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]]; // 4-directional

    while (!openSet.isEmpty()) {
        const [row, col] = openSet.dequeue().val;
        const currentKey = `${row},${col}`;

        if (row === end[0] && col === end[1]) {
            return reconstructGridPath(cameFrom, currentKey);
        }

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;
            const neighborKey = `${newRow},${newCol}`;

            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] !== 1 && // 1 represents obstacle
                !openSet.values.some(v => v.val[0] === newRow && v.val[1] === newCol) &&
                cameFrom[neighborKey] === undefined || 
                gScore[currentKey] + 1 < gScore[neighborKey]) {

                const tentativeGScore = gScore[currentKey] + 1;
                
                if (tentativeGScore < (gScore[neighborKey] ?? Infinity)) {
                    cameFrom[neighborKey] = [row, col];
                    gScore[neighborKey] = tentativeGScore;
                    fScore[neighborKey] = tentativeGScore + Math.abs(end[0] - newRow) + Math.abs(end[1] - newCol);
                    openSet.enqueue([newRow, newCol], fScore[neighborKey]);
                }
            }
        }
    }

    return null;
}

function reconstructGridPath(cameFrom, currentKey) {
    const path = [];
    let key = currentKey;
    while (key) {
        const [row, col] = key.split(',').map(Number);
        path.unshift([row, col]);
        const prev = cameFrom[key];
        key = prev ? `${prev[0]},${prev[1]}` : null;
    }
    return path;
}

// Example usage - Grid
const grid = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0]
];

console.log("A* Grid Path from [0,0] to [4,4]:", aStarGrid(grid, [0, 0], [4, 4]));
