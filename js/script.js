let gameBoard = [];
let currentPlayer = 'X';
let isPlayingAgainstComputer = false;

for (let i = 0; i < 9; i++) {
    gameBoard.push('');
}

document.querySelectorAll('.square').forEach((square, index) => {
    square.addEventListener('click', () => {
        if (gameBoard[index] === '') {
            gameBoard[index] = currentPlayer;
            square.textContent = currentPlayer;
            if (checkForWin()) return; 
            if (isPlayingAgainstComputer) {
                computerMove();
            } else {
                switchPlayer();
            }
        }
    });
});

function checkForWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c] && gameBoard[a] !== '') {
            alert(`Player ${gameBoard[a]} wins!`);
            resetGame();
            return true;
        }
    }

    if (!gameBoard.includes('')) {
        alert('It\'s a draw!');
        resetGame();
    }
    return false;
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function computerMove() {
    const availableSquares = gameBoard.map((square, index) => [square, index]).filter(([square]) => square === '');
    if (availableSquares.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSquares.length);
        const index = availableSquares[randomIndex][1];
        gameBoard[index] = 'O';
        document.getElementById(`square-${index}`).textContent = 'O';
        if (checkForWin()) return; 
        switchPlayer();
    }
}

function resetGame() {
    gameBoard = Array(9).fill('');
    document.querySelectorAll('.square').forEach(square => {
        square.textContent = '';
    });
    currentPlayer = 'X';

}