// Prim's Algorithm
// Time Complexity: O((V + E) log V) with priority queue
// Space Complexity: O(V)
// Finds Minimum Spanning Tree (MST) of a weighted undirected graph

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

function prim(graph, start) {
    const mst = [];
    const visited = new Set();
    const pq = new PriorityQueue();
    let totalWeight = 0;

    // Start from the given vertex
    visited.add(start);

    // Add all edges from start vertex to priority queue
    for (const [neighbor, weight] of graph[start] || []) {
        pq.enqueue({ from: start, to: neighbor, weight }, weight);
    }

    while (!pq.isEmpty()) {
        const { from, to, weight } = pq.dequeue();

        if (visited.has(to)) continue;

        // Add edge to MST
        mst.push({ from, to, weight });
        totalWeight += weight;
        visited.add(to);

        // Add all edges from the new vertex to unvisited vertices
        for (const [neighbor, newWeight] of graph[to] || []) {
            if (!visited.has(neighbor)) {
                pq.enqueue({ from: to, to: neighbor, weight: newWeight }, newWeight);
            }
        }
    }

    return { mst, totalWeight, vertices: visited.size };
}

// Example usage
const graph = {
    'A': [['B', 4], ['C', 2]],
    'B': [['A', 4], ['C', 1], ['D', 5]],
    'C': [['A', 2], ['B', 1], ['D', 8], ['E', 10]],
    'D': [['B', 5], ['C', 8], ['E', 2], ['F', 6]],
    'E': [['C', 10], ['D', 2], ['F', 3]],
    'F': [['D', 6], ['E', 3]]
};

const result = prim(graph, 'A');
console.log("Prim's Algorithm MST:");
console.log('Edges:', result.mst);
console.log('Total Weight:', result.totalWeight);
console.log('Vertices in MST:', result.vertices);
