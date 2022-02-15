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

const crossResult = [];
const zeroResult = [];

const countsteps = () => ++steps;

const addResult = (arr, cell) => {
  const cells = document.querySelectorAll('.game__field-cell');
  const index = Array.from(cells).indexOf(cell);
  arr.push(index);
};

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
        printResult(selector);
      }
    });
  }
};

const choiceCell = () => {
  const emptyCells = document.querySelectorAll('.empty');
  if (emptyCells.length !== 0) {
    const randomCell = Math.floor(Math.random() * emptyCells.length);
    emptyCells[randomCell].classList.add('zero');
    emptyCells[randomCell].classList.remove('empty');
    addResult(zeroResult, emptyCells[randomCell]);
    countsteps();
    checkWinner('zero');
  }
};
const addCross = (e) => {
  if ((e.target.classList.contains('game__field-cell')) && (steps % 2 === 0)) {
    e.target.classList.add('cross');
    e.target.classList.remove('empty');
    addResult(crossResult, e.target);
    countsteps();
    choiceCell();
    checkWinner('cross');
  }
};

console.log(checkWinner());

gameField.addEventListener('click', addCross);
