// Function to create an adjacency list graph from HTML elements
function createGraphFromDOM() {
    const edges = document.querySelectorAll('edge');
    let graph = {};

    // Create the graph by parsing edge tags in the DOM
    edges.forEach(edge => {
        const [source, target] = edge.getAttribute('from').split('-') 
            .concat(edge.getAttribute('to').split('-'));
        
        if (!graph[source]) graph[source] = {};
        if (!graph[target]) graph[target] = {};

        // Add an edge from source to target with its weight
        graph[source][target] = parseInt(edge.getAttribute('weight'), 10);
    });

    return graph;
}

// Function to sort edges by their weights in ascending order
function sortByWeight(edges) {
    return edges.sort((a, b) => a.weight - b.weight);
}

// Union-Find data structure for detecting cycles and connecting components
class UnionFind {
    constructor() {
        this.parent = new Map();
        this.rank = new Map();
    }

    find(x) {
        if (!this.parent.has(x)) this.parent.set(x, x);
        if (x !== this.parent.get(x)) this.parent.set(x, this.find(this.parent.get(x)));
        return this.parent.get(x);
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return;

        if (!this.rank.has(rootX)) this.rank.set(rootX, 0);
        if (!this.rank.has(rootY)) this.rank.set(rootY, 0);

        if (this.rank.get(rootX) < this.rank.get(rootY)) {
            this.parent.set(rootX, rootY);
        } else if (this.rank.get(rootX) > this.rank.get(rootY)) {
            this.parent.set(rootY, rootX);
        } else {
            this.parent.set(rootY, rootX);
            this.rank.set(rootX, this.rank.get(rootX) + 1);
        }
    }

    connected(x, y) {
        return this.find(x) === this.find(y);
    }
}

// Kruskal's algorithm function
function kruskalAlgorithm(graph) {
    const edges = Object.keys(graph).flatMap(source => 
        Object.entries(graph[source]).map(([target, weight]) => ({
            from: source,
            to: target,
            weight
        }))
    );

    // Sort the edges by their weights in ascending order
    const sortedEdges = sortByWeight(edges);

    const unionFind = new UnionFind();
    let mst = [];

    for (const edge of sortedEdges) {
        if (!unionFind.connected(edge.from, edge.to)) {
            unionFind.union(edge.from, edge.to);
            mst.push(edge);
        }
    }

    return mst;
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const graph = createGraphFromDOM();
    const mst = kruskalAlgorithm(graph);

    // Display the MST in a table or any other DOM structure if needed
    const resultDiv = document.createElement('div');
    resultDiv.id = 'mst';
    document.body.appendChild(resultDiv);

    mst.forEach(edge => {
        const row = document.createElement('tr');
        const cell1 = document.createElement('td');
        const cell2 = document.createElement('td');

        cell1.textContent = edge.from;
        cell2.textContent = edge.to;

        row.appendChild(cell1);
        row.appendChild(cell2);
        resultDiv.appendChild(row);
    });
});
