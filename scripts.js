const buttonReset = document.querySelector('.game__button-reset');
const gameField = document.querySelector('.game__field');
const buttonStart = document.querySelector('.game__button-start');
const popup = document.querySelector('.popup');
const tableBody = document.querySelector('.table__body');

const popupButtonOpen = document.querySelector('.popup__button-open');
const popupButtonClose = document.querySelector('.popup__button-close');
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

const setLocalStorage = (...obj) => {
  let savedResults = JSON.parse(localStorage.getItem('allResults'));
  if (savedResults === null) savedResults = [];

  if (savedResults.length === 10) {
    savedResults.unshift({
      winner: obj[0],
      steps: obj[1],
    });
    savedResults.pop();
  } else {
    savedResults.unshift({
      winner: obj[0],
      steps: obj[1],
    });
  }
  localStorage.setItem('allResults', JSON.stringify(savedResults));
};

const createRow = (renderElement, i) => {
  const tableTemplate = document.querySelector('.table__template').content;
  const row = tableTemplate.cloneNode(true);
  row.querySelector('.table__data:nth-child(1)').textContent = ++i;
  row.querySelector('.table__data:nth-child(2)').textContent = renderElement.winner;
  row.querySelector('.table__data:nth-child(3)').textContent = renderElement.steps;
  return row;
};

const renderRow = (renderElement, i) => {
  const row = createRow(renderElement, i);
  tableBody.appendChild(row);
};

const render = () => {
  const arr = JSON.parse(localStorage.getItem('allResults'));
  if (arr !== null) arr.forEach(renderRow);
};

render();

const replaceResults = () => {
  const tableRowData = document.querySelectorAll('.table__row_data');
  tableRowData.forEach((item) => item.remove());
  render();
};

const printResult = (selector) => {
  const emptyCells = document.querySelectorAll('.empty');
  emptyCells.forEach((item) => item.classList.remove('empty'));
  const winner = (selector === 'cross') ? 'Крестик' : 'Нолик';
  document.querySelector('.game__title').textContent = `${winner} выиграл`;
  document.querySelector('.game__text').textContent = `Всего ходов: ${steps}`;
  buttonReset.classList.add('visible');
  setLocalStorage(winner, steps);
  replaceResults();
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
    setLocalStorage('Ничья', steps);
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
  });
  document.querySelector('.game__title').textContent = '';
  document.querySelector('.game__text').textContent = '';
  steps = 0;
  endGame = false;
  gameField.addEventListener('click', addCross);
};

const openPopup = () => {
  popup.classList.add('popup_open');
};

const closePopup = () => {
  popup.classList.remove('popup_open');
};

buttonReset.addEventListener('click', resetGame);
buttonStart.addEventListener('click', startGame);
gameField.addEventListener('click', addCross);
popupButtonOpen.addEventListener('click', openPopup);
popupButtonClose.addEventListener('click', closePopup);
