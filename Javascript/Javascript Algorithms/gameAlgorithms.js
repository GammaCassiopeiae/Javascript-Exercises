function bfs(grid, start, goal) {
    let queue = [start];
    let visited = new Set([start.toString()]);
    let parent = {};

    while (queue.length > 0) {
        let current = queue.shift();
        if (current[0] === goal[0] && current[1] === goal[1]) {
            return reconstructPath(parent, goal);
        }

        for (let [dx, dy] of [[0,1], [1,0], [0,-1], [-1,0]]) {
            let next = [current[0] + dx, current[1] + dy];
            let key = next.toString();

            if (grid[next[0]]?.[next[1]] === 0 && !visited.has(key)) {
                visited.add(key);
                parent[key] = current;
                queue.push(next);
            }
        }
    }
    return null;
}

function reconstructPath(parent, current) {
    let path = [];
    while (current) {
        path.push(current);
        current = parent[current.toString()];
    }
    return path.reverse();
}

// 0 = prehodno, 1 = stena
const map = [
    [0, 0, 0],
    [1, 1, 0],
    [0, 0, 0]
];
console.log("BFS Pot:", bfs(map, [0, 0], [2, 0]));


function dijkstra(graph, start, goal) {
    let distances = {};
    let prev = {};
    let pq = new Set(Object.keys(graph));

    for (let node in graph) distances[node] = Infinity;
    distances[start] = 0;

    while (pq.size > 0) {
        let curr = [...pq].reduce((a, b) => distances[a] < distances[b] ? a : b);
        pq.delete(curr);

        if (curr === goal) break;

        for (let neighbor in graph[curr]) {
            let alt = distances[curr] + graph[curr][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                prev[neighbor] = curr;
            }
        }
    }
    return { path: reconstructPath(prev, goal), cost: distances[goal] };
}

const weightedGraph = {
    'A': { 'B': 1, 'C': 4 },
    'B': { 'A': 1, 'C': 2, 'D': 5 },
    'C': { 'A': 4, 'B': 2, 'D': 1 },
    'D': { 'B': 5, 'C': 1 }
};
console.log("Dijkstra:", dijkstra(weightedGraph, 'A', 'D'));


function aStar(start, goal, h) {
    let openSet = [start];
    let cameFrom = {};
    let gScore = { [start]: 0 };
    let fScore = { [start]: h(start, goal) };

    while (openSet.length > 0) {
        let current = openSet.reduce((a, b) => fScore[a] < fScore[b] ? a : b);

        if (current === goal) return "Pot najdena!";

        openSet = openSet.filter(item => item !== current);
        // Poenostavljena logika sosedov
        let neighbors = ["NodeB", "NodeC"]; 
        
        neighbors.forEach(neighbor => {
            let tentativeGScore = gScore[current] + 1;
            if (tentativeGScore < (gScore[neighbor] || Infinity)) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeGScore;
                fScore[neighbor] = gScore[neighbor] + h(neighbor, goal);
                if (!openSet.includes(neighbor)) openSet.push(neighbor);
            }
        });
    }
    return "Ni poti";
}

const heuristic = (a, b) => 1; // Primer konstantne hevristike
console.log("A* Status:", aStar("NodeA", "NodeGoal", heuristic));


function generateFlowField(grid, goal) {
    // 1. Izračunaj Integration Field (BFS razdalje od cilja)
    let rows = grid.length;
    let cols = grid[0].length;
    let field = Array.from({ length: rows }, () => Array(cols).fill(0));

    // 2. Ustvari vektorje (poenostavljeno: kam naj se enota premakne)
    let flow = Array.from({ length: rows }, () => Array(cols).fill(null));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // Vektor kaže proti sosedu z najmanjšo vrednostjo v Integration fieldu
            flow[r][c] = `Vektor proti [${goal}]`; 
        }
    }
    return flow;
}

console.log("Flow Field vzorec (Center):", generateFlowField([[0,0],[0,0]], [1,1])[0][0]);


/*
Algoritem	Kdaj ga uporabiti?
BFS	Najkrajša pot na kvadratni mreži brez različnih terenov.
DFS	Generiranje labirintov ali preverjanje povezanosti.
Dijkstra	Poti z različnimi stroški (cesta vs. trava).
A*	Standard za NPC-je; hitrejši od Dijkstre zaradi hevristike.
Flow Field	Strategije (RTS) z ogromnim številom enot.
*/ 