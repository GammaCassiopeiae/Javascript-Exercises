function floodFill(grid, r, c, targetColor, replacementColor) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) return;
    if (grid[r][c] !== targetColor || grid[r][c] === replacementColor) return;

    grid[r][c] = replacementColor; // "Pobarvaj" trenutno polje

    // Rekurzivno obišči sosede (gor, dol, levo, desno)
    floodFill(grid, r + 1, c, targetColor, replacementColor);
    floodFill(grid, r - 1, c, targetColor, replacementColor);
    floodFill(grid, r, c + 1, targetColor, replacementColor);
    floodFill(grid, r, c - 1, targetColor, replacementColor);
}

const map = [
    [1, 1, 1, 0, 0],
    [1, 1, 0, 0, 1],
    [1, 0, 0, 1, 1]
];
floodFill(map, 0, 0, 1, 9); // Zamenjaj vse povezane '1' z '9'
console.log("Flood Fill rezultat:", map[0]);

function solveSudoku(board) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (board[r][c] === 0) { // Najdi prazno polje
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, r, c, num)) {
                        board[r][c] = num;
                        if (solveSudoku(board)) return true;
                        board[r][c] = 0; // Backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(board, r, c, num) {
    for (let i = 0; i < 9; i++) {
        // Preveri vrstico, stolpec in 3x3 kvadrat
        if (board[r][i] === num || board[i][c] === num) return false;
        let boxR = 3 * Math.floor(r / 3) + Math.floor(i / 3);
        let boxC = 3 * Math.floor(c / 3) + i % 3;
        if (board[boxR][boxC] === num) return false;
    }
    return true;
}
console.log("Backtracking Sudoku pripravljen.");


function topologicalSort(quests) {
    let visited = new Set();
    let stack = [];

    function visit(quest) {
        if (visited.has(quest)) return;
        visited.add(quest);
        (quests[quest] || []).forEach(dep => visit(dep));
        stack.push(quest);
    }

    Object.keys(quests).forEach(q => visit(q));
    return stack; // Vrstni red od začetka do konca
}

const questChain = {
    "Ubij zmaja": ["Pridobi meč", "Najdi jamo"],
    "Pridobi meč": ["Zberi železo"],
    "Najdi jamo": ["Kupi mapo"]
};
console.log("Vrstni red misij:", topologicalSort(questChain));


function knapsack(values, weights, capacity) {
    let n = values.length;
    let dp = Array(capacity + 1).fill(0);

    for (let i = 0; i < n; i++) {
        for (let w = capacity; w >= weights[i]; w--) {
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}

const lootValues = [60, 100, 120];
const lootWeights = [10, 20, 30];
console.log("Max vrednost v nahrbtniku:", knapsack(lootValues, lootWeights, 50));


function colorGraph(nodes, edges, colorsCount) {
    let result = {};
    for (let node of nodes) {
        let neighborColors = new Set(edges[node]?.map(n => result[n]));
        for (let c = 1; c <= colorsCount; c++) {
            if (!neighborColors.has(c)) {
                result[node] = c;
                break;
            }
        }
    }
    return result;
}

const regions = ['A', 'B', 'C'];
const borders = { 'A': ['B'], 'B': ['A', 'C'], 'C': ['B'] };
console.log("Dodeljene barve regijam:", colorGraph(regions, borders, 3));


