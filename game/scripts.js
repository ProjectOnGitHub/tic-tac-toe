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

const countStep = () => ++step;

const choiceCell = () => {
  const emptyCells = document.querySelectorAll('.empty');
  const randomCell = Math.floor(Math.random() * emptyCells.length);
  emptyCells[randomCell].classList.add('zero');
  emptyCells[randomCell].classList.remove('empty');
  countStep();
};

const addCross = (e) => {
  if (e.target.classList.contains('game__field-cell')) {
    e.target.classList.add('cross');
    e.target.classList.remove('empty');
  }
  countStep();
  choiceCell();
};

// const addZero = (e) => {
//   if (e.target.classList.contains('game__field-cell')) {
//     e.target.classList.add('zero');
//     e.target.classList.add('disabled');
//
//   }
// countStep();
// };

gameField.addEventListener('click', addCross);
