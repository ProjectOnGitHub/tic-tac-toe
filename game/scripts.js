const gameField = document.querySelector('.game__field');
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

const printResult = (selector) => {
  const winner = (selector === 'cross') ? 'Крестик выиграл' : 'Нолик выиграл';
  document.querySelector('.game__title').textContent = winner;
  document.querySelector('.game__text').textContent = `Всего ходов: ${steps}`;
  gameField.removeEventListener('click', addCross);
};

const checkWinner = (selector) => {
  const cells = document.querySelectorAll('.game__field-cell');
  if (steps > 0) {
    win.map((item) => {
      if (cells[item[0]].classList.contains(selector)
        && cells[item[1]].classList.contains(selector)
        && cells[item[2]].classList.contains(selector)) {
        endGame = true;
        printResult(selector);
      }
    });
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

gameField.addEventListener('click', addCross);
