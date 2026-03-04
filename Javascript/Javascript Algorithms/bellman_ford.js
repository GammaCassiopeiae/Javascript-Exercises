// Bellman-Ford Algorithm
// Time Complexity: O(V * E)
// Space Complexity: O(V)
// Finds shortest path from source to all other vertices
// Can handle negative edge weights and detect negative cycles

function bellmanFord(vertices, edges, start) {
    // Initialize distances
    const distances = {};
    const previous = {};

    for (const vertex of vertices) {
        distances[vertex] = vertex === start ? 0 : Infinity;
        previous[vertex] = null;
    }

    // Relax all edges V-1 times
    for (let i = 0; i < vertices.length - 1; i++) {
        for (const [from, to, weight] of edges) {
            if (distances[from] !== Infinity) {
                const newDistance = distances[from] + weight;
                if (newDistance < distances[to]) {
                    distances[to] = newDistance;
                    previous[to] = from;
                }
            }
        }
    }

    // Check for negative weight cycles
    for (const [from, to, weight] of edges) {
        if (distances[from] !== Infinity) {
            const newDistance = distances[from] + weight;
            if (newDistance < distances[to]) {
                return { 
                    hasNegativeCycle: true, 
                    message: 'Graph contains negative weight cycle' 
                };
            }
        }
    }

    return { distances, previous, hasNegativeCycle: false };
}

// Find shortest path to a specific target
function bellmanFordPath(vertices, edges, start, end) {
    const result = bellmanFord(vertices, edges, start);

    if (result.hasNegativeCycle) {
        return result;
    }

    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        current = result.previous[current];
    }

    return path.length > 1 ? { path, distance: result.distances[end] } : null;
}

// Example usage
const vertices = ['A', 'B', 'C', 'D', 'E'];
const edges = [
    ['A', 'B', 6],
    ['A', 'D', 7],
    ['B', 'C', 5],
    ['B', 'D', 8],
    ['B', 'E', -4],
    ['C', 'B', -2],
    ['D', 'C', -3],
    ['D', 'E', 9],
    ['E', 'A', 2],
    ['E', 'C', 7]
];

console.log('Bellman-Ford from A:', bellmanFord(vertices, edges, 'A'));
console.log('Shortest path from A to C:', bellmanFordPath(vertices, edges, 'A', 'C'));

// Example with negative cycle
const negativeCycleEdges = [
    ['A', 'B', 1],
    ['B', 'C', -1],
    ['C', 'A', -1]
];

console.log('Bellman-Ford with negative cycle:', bellmanFord(['A', 'B', 'C'], negativeCycleEdges, 'A'));
