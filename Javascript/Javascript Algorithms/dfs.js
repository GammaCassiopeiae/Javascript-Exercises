// Depth-First Search (DFS) Algorithm
// Time Complexity: O(V + E)
// Space Complexity: O(V)

// Recursive DFS
function dfsRecursive(graph, start, visited = new Set(), result = []) {
    visited.add(start);
    result.push(start);

    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            dfsRecursive(graph, neighbor, visited, result);
        }
    }

    return result;
}

// Iterative DFS using stack
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];

    while (stack.length > 0) {
        const vertex = stack.pop();

        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);

            // Add neighbors in reverse order to maintain order
            const neighbors = graph[vertex] || [];
            for (let i = neighbors.length - 1; i >= 0; i--) {
                if (!visited.has(neighbors[i])) {
                    stack.push(neighbors[i]);
                }
            }
        }
    }

    return result;
}

// DFS to find path between two nodes
function dfsFindPath(graph, start, end, visited = new Set()) {
    if (start === end) {
        return [start];
    }

    visited.add(start);

    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            const path = dfsFindPath(graph, neighbor, end, visited);
            if (path) {
                return [start, ...path];
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

console.log('DFS Recursive Traversal starting from node 0:', dfsRecursive(graph, 0));
console.log('DFS Iterative Traversal starting from node 0:', dfsIterative(graph, 0));
console.log('DFS Path from 0 to 5:', dfsFindPath(graph, 0, 5));
