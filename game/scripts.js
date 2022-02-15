const buttonReset = document.querySelector('.game__button-reset');
const gameField = document.querySelector('.game__field');
const buttonStart = document.querySelector('.game__button-start');
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let steps = 0;
let endGame = false;

const countsteps = () => ++steps;

const startGame = () => {
  buttonStart.remove();
  document.querySelector('.game').classList.add('visible');
};

const printResult = (selector) => {
  const emptyCells = document.querySelectorAll('.empty');
  emptyCells.forEach((item) => item.classList.remove('empty'));
  const winner = (selector === 'cross') ? 'Крестик выиграл' : 'Нолик выиграл';
  document.querySelector('.game__title').textContent = winner;
  document.querySelector('.game__text').textContent = `Всего ходов: ${steps}`;
  buttonReset.classList.add('visible');
};

const checkWinner = (selector) => {
  if (steps > 4) {
    const cells = document.querySelectorAll('.game__field-cell');
    win.map((item) => {
      if (cells[item[0]].classList.contains(selector)
        && cells[item[1]].classList.contains(selector)
        && cells[item[2]].classList.contains(selector)) {
        cells[item[0]].classList.add('win');
        cells[item[1]].classList.add('win');
        cells[item[2]].classList.add('win');
        gameField.removeEventListener('click', addCross);
        endGame = true;
        printResult(selector);
      }
    });
  }
  if ((steps === 9) && (!endGame)) {
    document.querySelector('.game__title').textContent = 'Ничья';
    document.querySelector('.game__text').textContent = `Всего ходов: ${steps}`;
    buttonReset.classList.add('visible');
  }
};

const choiceCell = () => {
  const emptyCells = document.querySelectorAll('.empty');
  if ((!endGame) && (emptyCells.length !== 0)) {
    const randomCell = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomCell].classList.add('zero');
    emptyCells[randomCell].classList.remove('empty');
    countsteps();
    checkWinner('zero');
  }
};
const addCross = (e) => {
  if ((e.target.classList.contains('game__field-cell')) && (steps % 2 === 0)) {
    e.target.classList.add('cross');
    e.target.classList.remove('empty');
    countsteps();
    checkWinner('cross');
    choiceCell();
  }
};

const resetGame = () => {
  document.querySelectorAll('.game__field-cell').forEach((item) => {
    item.classList.remove('cross');
    item.classList.remove('zero');
    item.classList.remove('win');
    item.classList.add('empty');
    buttonReset.classList.remove('visible');
    document.querySelector('.game__title').textContent = '';
    document.querySelector('.game__text').textContent = '';
    steps = 0;
    endGame = false;
    gameField.addEventListener('click', addCross);
  });
};

buttonReset.addEventListener('click', resetGame);
buttonStart.addEventListener('click', startGame);
gameField.addEventListener('click', addCross);
