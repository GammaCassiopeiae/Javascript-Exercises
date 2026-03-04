// Floyd-Warshall Algorithm
// Time Complexity: O(V^3)
// Space Complexity: O(V^2)
// Finds shortest paths between all pairs of vertices
// Can handle negative edges and detect negative cycles

function floydWarshall(vertices, edges) {
    const n = vertices.length;
    const vertexIndex = {};
    
    // Create vertex to index mapping
    vertices.forEach((v, i) => {
        vertexIndex[v] = i;
    });

    // Initialize distance matrix
    const dist = [];
    const next = []; // For path reconstruction

    for (let i = 0; i < n; i++) {
        dist[i] = [];
        next[i] = [];
        for (let j = 0; j < n; j++) {
            dist[i][j] = i === j ? 0 : Infinity;
            next[i][j] = null;
        }
    }

    // Initialize with edge weights
    for (const [from, to, weight] of edges) {
        const i = vertexIndex[from];
        const j = vertexIndex[to];
        dist[i][j] = weight;
        next[i][j] = to;
    }

    // Floyd-Warshall main algorithm
    for (let k = 0; k < n; k++) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (dist[i][k] !== Infinity && dist[k][j] !== Infinity) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) {
                        dist[i][j] = dist[i][k] + dist[k][j];
                        next[i][j] = next[i][k];
                    }
                }
            }
        }
    }

    // Check for negative cycles
    for (let i = 0; i < n; i++) {
        if (dist[i][i] < 0) {
            return { hasNegativeCycle: true, message: 'Graph contains negative weight cycle' };
        }
    }

    // Convert distance matrix back to vertex names
    const result = {};
    for (let i = 0; i < n; i++) {
        result[vertices[i]] = {};
        for (let j = 0; j < n; j++) {
            result[vertices[i]][vertices[j]] = dist[i][j];
        }
    }

    return { distances: result, next, vertices, vertexIndex };
}

// Reconstruct path between two vertices
function reconstructPath(fwResult, start, end) {
    if (fwResult.hasNegativeCycle) return fwResult;

    const { next, vertexIndex, vertices } = fwResult;
    const i = vertexIndex[start];
    const j = vertexIndex[end];

    if (next[i][j] === null) {
        return null; // No path exists
    }

    const path = [start];
    let current = i;

    while (current !== j) {
        const nextVertex = next[current][j];
        if (nextVertex === null) {
            return null;
        }
        path.push(nextVertex);
        current = vertexIndex[nextVertex];
    }

    return path;
}

// Example usage
const vertices = ['A', 'B', 'C', 'D'];
const edges = [
    ['A', 'B', 3],
    ['A', 'C', 7],
    ['B', 'C', 1],
    ['B', 'D', 5],
    ['C', 'D', 2],
    ['D', 'A', 1]
];

const result = floydWarshall(vertices, edges);
console.log('Floyd-Warshall All-Pairs Shortest Distances:');
if (!result.hasNegativeCycle) {
    for (const from in result.distances) {
        console.log(`From ${from}:`, result.distances[from]);
    }
    console.log('Path from A to D:', reconstructPath(result, 'A', 'D'));
}
