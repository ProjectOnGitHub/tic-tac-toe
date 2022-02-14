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

let step = 0;

const crossResults = [];
const zeroResults = [];

const countStep = () => ++step;

const addResult = (arr, cell) => {
  const cells = document.querySelectorAll('.game__field-cell');
  const index = Array.from(cells).indexOf(cell);
  arr.push(index);
};

const choiceCell = () => {
  const emptyCells = document.querySelectorAll('.empty');
  const randomCell = Math.floor(Math.random() * emptyCells.length);
  emptyCells[randomCell].classList.add('zero');
  emptyCells[randomCell].classList.remove('empty');
  addResult(zeroResults, emptyCells[randomCell]);
  countStep();
};

const addCross = (e) => {
  if ((e.target.classList.contains('game__field-cell')) && (step % 2 === 0)) {
    e.target.classList.add('cross');
    e.target.classList.remove('empty');
    addResult(crossResults, e.target);
    countStep();
    choiceCell();
  }
};

gameField.addEventListener('click', addCross);
