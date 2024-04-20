document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const playerXScoreDisplay = document.getElementById('playerXScore');
    const playerOScoreDisplay = document.getElementById('playerOScore');
    const restartButton = document.getElementById('restartButton');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let playerXScore = 0;
    let playerOScore = 0;
    let gameEnded = false;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    const checkWinner = () => {
        for (let combo of winningCombinations) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }
        return null;
    };

    const handleCellClick = (index) => {
        if (!gameBoard[index] && !gameEnded) {
            gameBoard[index] = currentPlayer;
            cells[index].textContent = currentPlayer;

            const winner = checkWinner();
            if (winner) {
                if (winner === 'X') {
                    playerXScore++;
                    playerXScoreDisplay.textContent = playerXScore;
                } else {
                    playerOScore++;
                    playerOScoreDisplay.textContent = playerOScore;
                }
                gameEnded = true;
                alert(`Player ${winner} wins!`);
            } else if (!gameBoard.includes('')) {
                gameEnded = true;
                alert("It's a draw!");
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                document.querySelector('p').textContent = `Player ${currentPlayer}'s turn`;
            }
        }
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            handleCellClick(index);
        });
    });

    restartButton.addEventListener('click', () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.textContent = '';
        });
        currentPlayer = 'X';
        gameEnded = false;
        document.querySelector('p').textContent = `Player X's turn`;
    });
});
