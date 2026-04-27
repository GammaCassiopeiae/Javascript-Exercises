/**
 * ⚡ NEON-ENGINE v1.0
 * Core Visualization Framework for Algorithms
 */

class AlgorithmVisualizer {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.data = [];
        this.speed = options.speed || 50;
        this.isRunning = false;
        this.isPaused = false;
        this.abortController = new AbortController();
        
        this.init();
    }

    init() {
        console.log('[NEON-ENGINE] Initialized');
    }

    // --- Core Animation Utils ---

    async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms || this.speed));
    }

    async checkState() {
        while (this.isPaused) {
            await new Promise(r => setTimeout(r, 100));
        }
        if (!this.isRunning) throw new Error('ABORT_EXECUTION');
    }

    // --- State Management ---

    setData(newData) {
        this.data = [...newData];
        this.render();
    }

    // --- UI Logic ---

    render() {
        // Abstract method - to be implemented by child classes
    }

    setSpeed(value) {
        this.speed = 101 - value; // Map 1-100 to delay
    }

    stop() {
        this.isRunning = false;
        this.isPaused = false;
    }
}

/**
 * Sorting Engine - Specializes in Bar-based visualizations
 */
class SortingVisualizer extends AlgorithmVisualizer {
    constructor(containerId, options = {}) {
        super(containerId, options);
        this.size = options.size || 30;
        this.generateRandomData();
    }

    generateRandomData() {
        this.data = Array.from({ length: this.size }, () => Math.floor(Math.random() * 90) + 10);
        this.render();
    }

    render(activeIndices = [], sortedIndices = []) {
        this.container.innerHTML = '';
        this.data.forEach((val, idx) => {
            const bar = document.createElement('div');
            bar.className = 'c-bar';
            bar.style.height = `${val}%`;
            
            if (activeIndices.includes(idx)) bar.classList.add('is-active');
            if (sortedIndices.includes(idx)) bar.classList.add('is-sorted');
            
            this.container.appendChild(bar);
        });
    }

    async swap(i, j) {
        await this.checkState();
        [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
        this.render([i, j]);
        await this.sleep();
    }

    async highlight(indices, type = 'active') {
        await this.checkState();
        this.render(type === 'active' ? indices : [], type === 'sorted' ? indices : []);
        await this.sleep();
    }
}

/**
 * Search Engine - Specializes in element highlighting
 */
class SearchVisualizer extends SortingVisualizer {
    constructor(containerId, options = {}) {
        super(containerId, options);
        this.target = null;
        this.data.sort((a, b) => a - b); // Searching usually on sorted data
        this.render();
    }

    setTarget(val) {
        this.target = val;
    }
}

/**
 * Tree Engine - Hierarchical Node Rendering
 */
class TreeVisualizer extends AlgorithmVisualizer {
    constructor(containerId, options = {}) {
        super(containerId, options);
        this.nodes = [];
        this.generateDefaultTree();
    }

    generateDefaultTree() {
        // Simple 7-node complete binary tree
        this.root = {
            val: 1,
            left: { val: 2, left: { val: 4 }, right: { val: 5 } },
            right: { val: 3, left: { val: 6 }, right: { val: 7 } }
        };
        this.render();
    }

    render(activeNodeVal = null, visited = []) {
        this.container.innerHTML = '';
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.overflow = "visible";
        this.container.appendChild(svg);
        
        this.renderNode(this.root, svg, 400, 50, 200, activeNodeVal, visited);
    }

    renderNode(node, svg, x, y, offset, activeNodeVal, visited) {
        if (!node) return;

        // Draw Lines to children
        if (node.left) this.drawLine(svg, x, y, x - offset, y + 80);
        if (node.right) this.drawLine(svg, x, y, x + offset, y + 80);

        // Draw Node
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 20);
        circle.setAttribute("fill", "rgba(0, 0, 0, 0.8)");
        circle.setAttribute("stroke", "var(--neon-primary)");
        circle.setAttribute("stroke-width", "2");
        
        if (node.val === activeNodeVal) {
            circle.setAttribute("stroke", "var(--neon-secondary)");
            circle.setAttribute("filter", "drop-shadow(0 0 5px var(--neon-secondary))");
        } else if (visited.includes(node.val)) {
            circle.setAttribute("stroke", "var(--neon-success)");
        }

        svg.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y + 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-family", "var(--font-mono)");
        text.setAttribute("font-size", "12");
        text.textContent = node.val;
        svg.appendChild(text);

        this.renderNode(node.left, svg, x - offset, y + 80, offset / 2, activeNodeVal, visited);
        this.renderNode(node.right, svg, x + offset, y + 80, offset / 2, activeNodeVal, visited);
    }

    drawLine(svg, x1, y1, x2, y2) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", "rgba(0, 243, 255, 0.2)");
        line.setAttribute("stroke-width", "1");
        svg.appendChild(line);
    }
}

/**
 * Graph Engine - Network Node Rendering
 */
class GraphVisualizer extends AlgorithmVisualizer {
    constructor(containerId, options = {}) {
        super(containerId, options);
        this.adj = {
            1: [2, 3],
            2: [1, 4, 5],
            3: [1, 6],
            4: [2],
            5: [2, 6],
            6: [3, 5]
        };
        this.positions = {
            1: {x: 400, y: 50},
            2: {x: 200, y: 150},
            3: {x: 600, y: 150},
            4: {x: 100, y: 300},
            5: {x: 300, y: 300},
            6: {x: 600, y: 300}
        };
        this.render();
    }

    render(activeNodeId = null, visited = [], queue = [], distances = {}, parent = {}) {
        this.container.innerHTML = '';
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.overflow = "visible";
        this.container.appendChild(svg);

        // Draw Edges
        const drawnEdges = new Set();
        for (let u in this.adj) {
            for (let edge of this.adj[u]) {
                const v = typeof edge === 'object' ? edge.to : edge;
                const weight = typeof edge === 'object' ? edge.weight : null;
                const edgeId = [u, v].sort().join('-');
                if (!drawnEdges.has(edgeId)) {
                    const isPath = parent[v] == u || parent[u] == v;
                    this.drawEdge(svg, this.positions[u], this.positions[v], weight, isPath);
                    drawnEdges.add(edgeId);
                }
            }
        }

        // Draw Nodes
        for (let id in this.positions) {
            const pos = this.positions[id];
            const dist = distances[id] !== undefined ? distances[id] : '∞';
            this.drawNode(svg, id, pos, activeNodeId == id, visited.includes(parseInt(id)), queue.includes(parseInt(id)), dist);
        }
    }

    drawNode(svg, id, pos, isActive, isVisited, isInQueue, dist) {
        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", pos.x);
        circle.setAttribute("cy", pos.y);
        circle.setAttribute("r", 20);
        circle.setAttribute("fill", "rgba(0, 0, 0, 0.9)");
        circle.setAttribute("stroke", "var(--neon-primary)");
        circle.setAttribute("stroke-width", "2");

        if (isActive) {
            circle.setAttribute("stroke", "var(--neon-secondary)");
            circle.setAttribute("filter", "drop-shadow(0 0 8px var(--neon-secondary))");
        } else if (isVisited) {
            circle.setAttribute("stroke", "var(--neon-success)");
        }

        g.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", pos.x);
        text.setAttribute("y", pos.y + 5);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("fill", "white");
        text.setAttribute("font-family", "var(--font-mono)");
        text.setAttribute("font-size", "12");
        text.textContent = id;
        g.appendChild(text);

        const distText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        distText.setAttribute("x", pos.x);
        distText.setAttribute("y", pos.y - 25);
        distText.setAttribute("text-anchor", "middle");
        distText.setAttribute("fill", "var(--neon-secondary)");
        distText.setAttribute("font-family", "var(--font-mono)");
        distText.setAttribute("font-size", "10");
        distText.textContent = dist;
        g.appendChild(distText);

        svg.appendChild(g);
    }

    drawEdge(svg, p1, p2, weight, isPath) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", p1.x);
        line.setAttribute("y1", p1.y);
        line.setAttribute("x2", p2.x);
        line.setAttribute("y2", p2.y);
        line.setAttribute("stroke", isPath ? "var(--neon-success)" : "rgba(0, 243, 255, 0.1)");
        line.setAttribute("stroke-width", isPath ? "3" : "1");
        svg.appendChild(line);

        if (weight !== null) {
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;
            const wText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            wText.setAttribute("x", midX);
            wText.setAttribute("y", midY - 5);
            wText.setAttribute("fill", "var(--neon-primary)");
            wText.setAttribute("font-family", "var(--font-mono)");
            wText.setAttribute("font-size", "10");
            wText.textContent = weight;
            svg.appendChild(wText);
        }
    }
}

// Global Export
window.NeonEngine = {
    SortingVisualizer,
    SearchVisualizer,
    TreeVisualizer,
    GraphVisualizer
};
