const board = document.getElementById('game-board');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations: rows, columns, and diagonals
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    gameState.forEach((_, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(cell, index));
        board.appendChild(cell);
    });
}

function handleCellClick(cell, index) {
    if (gameState[index] !== "" || checkWinner()) return;

    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWinner()) {
        setTimeout(() => alert(`Player ${currentPlayer} Wins!`), 10);
    } else if (!gameState.includes("")) {
        setTimeout(() => alert("It's a Draw!"), 10);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

createBoard();
