// Topological Sort Algorithm
// Time Complexity: O(V + E)
// Space Complexity: O(V)
// Linear ordering of vertices in a DAG such that for every edge (u, v), u comes before v

// DFS-based Topological Sort
function topologicalSortDFS(graph) {
    const visited = new Set();
    const stack = [];
    const vertices = Object.keys(graph);

    function dfs(vertex) {
        visited.add(vertex);

        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                dfs(neighbor);
            }
        }

        stack.push(vertex);
    }

    for (const vertex of vertices) {
        if (!visited.has(vertex)) {
            dfs(vertex);
        }
    }

    return stack.reverse();
}

// Kahn's Algorithm (BFS-based) - also detects cycles
function topologicalSortKahn(graph) {
    const vertices = Object.keys(graph);
    const inDegree = {};
    const result = [];

    // Initialize in-degree
    for (const vertex of vertices) {
        inDegree[vertex] = 0;
    }

    // Calculate in-degree for each vertex
    for (const vertex of vertices) {
        for (const neighbor of graph[vertex] || []) {
            inDegree[neighbor]++;
        }
    }

    // Queue for vertices with no incoming edges
    const queue = [];
    for (const vertex of vertices) {
        if (inDegree[vertex] === 0) {
            queue.push(vertex);
        }
    }

    // Process vertices
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);

        for (const neighbor of graph[vertex] || []) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Check for cycle
    if (result.length !== vertices.length) {
        return { error: 'Graph contains a cycle, topological sort not possible' };
    }

    return result;
}

// Example usage - Course scheduling problem
const graph = {
    'C1': ['C3', 'C4'],  // Course 1 is prerequisite for 3 and 4
    'C2': ['C3'],        // Course 2 is prerequisite for 3
    'C3': ['C5'],        // Course 3 is prerequisite for 5
    'C4': ['C5'],        // Course 4 is prerequisite for 5
    'C5': []
};

console.log('Topological Sort (DFS):', topologicalSortDFS(graph));
console.log('Topological Sort (Kahn):', topologicalSortKahn(graph));

// Example with cycle
const cyclicGraph = {
    'A': ['B'],
    'B': ['C'],
    'C': ['A']
};

console.log('Cyclic Graph:', topologicalSortKahn(cyclicGraph));
