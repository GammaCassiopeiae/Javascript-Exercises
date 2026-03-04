// Kruskal's Algorithm
// Time Complexity: O(E log E) or O(E log V)
// Space Complexity: O(V)
// Finds Minimum Spanning Tree (MST) of a weighted undirected graph
// Uses Union-Find (Disjoint Set Union) data structure

class UnionFind {
    constructor(vertices) {
        this.parent = {};
        this.rank = {};

        for (const vertex of vertices) {
            this.parent[vertex] = vertex;
            this.rank[vertex] = 0;
        }
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false; // Already in same set

        // Union by rank
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX]++;
        }

        return true;
    }
}

function kruskal(vertices, edges) {
    const mst = [];
    let totalWeight = 0;

    // Sort edges by weight
    const sortedEdges = [...edges].sort((a, b) => a[2] - b[2]);

    // Create Union-Find structure
    const uf = new UnionFind(vertices);

    // Process edges in order of weight
    for (const [from, to, weight] of sortedEdges) {
        if (uf.union(from, to)) {
            mst.push({ from, to, weight });
            totalWeight += weight;

            // MST has V-1 edges
            if (mst.length === vertices.length - 1) {
                break;
            }
        }
    }

    return { mst, totalWeight, edgesCount: mst.length };
}

// Example usage
const vertices = ['A', 'B', 'C', 'D', 'E', 'F'];
const edges = [
    ['A', 'B', 4],
    ['A', 'C', 2],
    ['B', 'C', 1],
    ['B', 'D', 5],
    ['C', 'D', 8],
    ['C', 'E', 10],
    ['D', 'E', 2],
    ['D', 'F', 6],
    ['E', 'F', 3]
];

const result = kruskal(vertices, edges);
console.log("Kruskal's Algorithm MST:");
console.log('Edges:', result.mst);
console.log('Total Weight:', result.totalWeight);
console.log('Number of Edges in MST:', result.edgesCount);
