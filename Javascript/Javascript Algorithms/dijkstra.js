// Dijkstra's Algorithm
// Time Complexity: O((V + E) log V) with priority queue
// Space Complexity: O(V)
// Finds shortest path from source to all other vertices in weighted graph with non-negative edges

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

function dijkstra(graph, start) {
    const nodes = Object.keys(graph);
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue();

    // Initialize distances
    for (const node of nodes) {
        distances[node] = node === start ? 0 : Infinity;
        previous[node] = null;
    }

    pq.enqueue(start, 0);

    while (!pq.isEmpty()) {
        const { val: smallest } = pq.dequeue();

        if (distances[smallest] === Infinity) continue;

        for (const [neighbor, weight] of graph[smallest]) {
            const distance = distances[smallest] + weight;

            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previous[neighbor] = smallest;
                pq.enqueue(neighbor, distance);
            }
        }
    }

    return { distances, previous };
}

// Find shortest path to a specific target
function dijkstraPath(graph, start, end) {
    const { distances, previous } = dijkstra(graph, start);
    const path = [];
    let current = end;

    while (current !== null) {
        path.unshift(current);
        current = previous[current];
    }

    return path.length > 1 ? { path, distance: distances[end] } : null;
}

// Example usage
const graph = {
    'A': [['B', 4], ['C', 2]],
    'B': [['A', 4], ['D', 3], ['E', 1]],
    'C': [['A', 2], ['D', 1], ['E', 5]],
    'D': [['B', 3], ['C', 1], ['E', 2]],
    'E': [['B', 1], ['C', 5], ['D', 2]]
};

console.log('Dijkstra from A:', dijkstra(graph, 'A'));
console.log('Shortest path from A to E:', dijkstraPath(graph, 'A', 'E'));
