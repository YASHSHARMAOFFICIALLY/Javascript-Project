let board = ['','','','','','','','',''];
let currentPlayer = "X";
let gameActive = true;
const winningConditions = [
    [0, 1, 2],[3, 4, 5],[6, 7, 8],
    [0, 3, 6],[1, 4, 7],[2, 5, 8],
    [0, 4, 8],[2, 4, 6],
];
const cells = document.querySelectorAll('.board-cell');
const gameStatus = document.getElementById('game-status');
const resetBtn = document.getElementById('reset-btn');
const newGameBtn = document.getElementById('new-game-btn');
const modal = document.getElementById('game-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

function initGame(){
  cells.forEach((cell) => {
    cell.addEventListener('click', function(){
      const index = parseInt(this.getAttribute('data-index'));
      handleCellClick(index);
    });
  });
  resetBtn.addEventListener('click', resetGame);
  newGameBtn.addEventListener('click', resetGame);
  modalCloseBtn.addEventListener('click', closeModal);
}

function handleCellClick(index){
  if (board[index] !== '' || !gameActive || currentPlayer !== 'X') return;
  board[index] = 'X';
  cells[index].textContent = 'X';
  cells[index].classList.add('taken', 'player-x');
  if(checkWin('X')){
    endGame('🎉 Congratulations!', 'You Win!');
    return;
  }
  if (checkDraw()){
    endGame('😐 Draw!', "It's a tie game!");
    return;
  }
  currentPlayer = 'O';
  gameStatus.textContent = "Computer Turn (O)";
  setTimeout(computerMove, 500);
}
function computerMove(){
  if(!gameActive) return;
  const emptyCells = [];
  for(let i = 0; i < board.length; i++){
    if(board[i] === '') emptyCells.push(i);
  }
  if(emptyCells.length === 0) return;
  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';
  cells[randomIndex].classList.add('taken', 'player-o');
  if(checkWin('O')){
    endGame('😞 Game Over', 'Computer Wins!');
    return;
  }
  if(checkDraw()){
    endGame('😐 Draw!', "It's a tie game!");
    return;
  }
  currentPlayer = 'X';
  gameStatus.textContent = 'Your Turn (X)';
}
function checkWin(player){
  return winningConditions.some(combo => combo.every(i => board[i] === player));
}
function checkDraw(){
  return board.every(cell => cell !== '');
}
function endGame(title, message){
  gameActive = false;
  gameStatus.textContent = 'Game Over';
  setTimeout(() => showModal(title, message), 300);
}
function showModal(title, message){
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modal.style.display = 'flex';
}
function closeModal(){
  modal.style.display = 'none';
  resetGame();
}
function resetGame(){
  board = ['','','','','','','','',''];
  currentPlayer = 'X';
  gameActive = true;
  gameStatus.textContent = 'Your Turn (X)';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'player-x', 'player-o');
  });
  modal.style.display = 'none';
}
initGame();