// Game state variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const cells = document.querySelectorAll('.boardcell');
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-game-btn');
const modal = document.getElementById('game-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

// Initialize game
function initGame() {
    cells.forEach((cell) => {
        cell.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            handleCellClick(index);
        });
    });

    resetBtn.addEventListener('click', resetGame);
    newGameBtn.addEventListener('click', resetGame);
    modalCloseBtn.addEventListener('click', closeModal);
}

// Handle human player click
function handleCellClick(index) {
    // Check if cell is empty and game is active and it's player's turn
    if (board[index] !== '' || !gameActive || currentPlayer !== 'X') {
        return;
    }

    // Update board and display
    board[index] = 'X';
    cells[index].textContent = 'X';
    cells[index].classList.add('taken', 'player-x');

    // Check for result
    if (checkWin('X')) {
        endGame('🎉 Congratulations!', 'You Win!');
        return;
    }

    if (checkDraw()) {
        endGame('😐 Draw!', "It's a tie game!");
        return;
    }

    // Switch to computer
    currentPlayer = 'O';
    gameStatus.textContent = 'Computer Turn (O)';
    
    // Computer move after delay
    setTimeout(computerMove, 500);
}

// Computer move
function computerMove() {
    if (!gameActive) return;

    // Find empty cells
    const emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }

    // Random move
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

    // Update board and display
    board[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    cells[randomIndex].classList.add('taken', 'player-o');

    // Check for result
    if (checkWin('O')) {
        endGame('😞 Game Over', 'Computer Wins!');
        return;
    }

    if (checkDraw()) {
        endGame('😐 Draw!', "It's a tie game!");
        return;
    }

    // Switch back to player
    currentPlayer = 'X';
    gameStatus.textContent = 'Your Turn (X)';
}

// Check for win
function checkWin(player) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === player && board[b] === player && board[c] === player) {
            return true;
        }
    }
    return false;
}

// Check for draw
function checkDraw() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            return false;
        }
    }
    return true;
}

// End game
function endGame(title, message) {
    gameActive = false;
    gameStatus.textContent = 'Game Over';
    
    setTimeout(() => {
        showModal(title, message);
    }, 300);
}

// Show modal
function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    resetGame();
}

// Reset game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    gameStatus.textContent = 'Your Turn (X)';
    
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'player-x', 'player-o');
    });

    modal.style.display = 'none';
}

// Start the game
initGame();