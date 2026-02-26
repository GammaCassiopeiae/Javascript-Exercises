class UnionFind {
  constructor(elements) {
    this.parent = {};
    elements.forEach(el => {
      this.parent[el] = el;
    });
  }

  find(i) {
    if (this.parent[i] === i) return i;
    return this.find(this.parent[i]);
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
      return true;
    }
    return false;
  }
}

function kruskal(nodes, edges) {
  const mst = [];
  // 1. Korak: Razvrsti povezave po uteži (naraščajoče)
  const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
  
  // 2. Korak: Inicializiraj Union-Find strukturo
  const uf = new UnionFind(nodes);

  for (const edge of sortedEdges) {
    // 3. Korak: Če povezava ne tvori cikla, jo dodaj v MST
    if (uf.union(edge.source, edge.target)) {
      mst.push(edge);
    }
  }

  return mst;
}

// Primer uporabe:
const nodes = ["A", "B", "C", "D"];
const edges = [
  { source: "A", target: "B", weight: 1 },
  { source: "B", target: "C", weight: 3 },
  { source: "A", target: "C", weight: 4 },
  { source: "C", target: "D", weight: 2 },
  { source: "B", target: "D", weight: 5 }
];

const result = kruskal(nodes, edges);
console.log(result);
