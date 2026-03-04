// Breadth-First Search (BFS) Algorithm
// Time Complexity: O(V + E)
// Space Complexity: O(V)

function bfs(graph, start) {
    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);

        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return result;
}

// BFS to find shortest path in unweighted graph
function bfsShortestPath(graph, start, end) {
    const visited = new Set([start]);
    const queue = [[start]];

    while (queue.length > 0) {
        const path = queue.shift();
        const vertex = path[path.length - 1];

        if (vertex === end) {
            return path;
        }

        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([...path, neighbor]);
            }
        }
    }

    return null; // No path found
}

// Example usage
const graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5],
    3: [1],
    4: [1],
    5: [2]
};

console.log('BFS Traversal starting from node 0:', bfs(graph, 0));
console.log('BFS Shortest Path from 0 to 5:', bfsShortestPath(graph, 0, 5));
