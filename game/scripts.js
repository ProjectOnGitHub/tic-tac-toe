const gameField = document.querySelector('.game__field');

let step = 0;

const addCross = (e) => {
  if (e.target.classList.contains('game__field-cell')) {
    step += 1;
    e.target.classList.add('cross');
  }
};

const addZero = (e) => {
  if (e.target.classList.contains('game__field-cell')) {
    e.target.classList.add('zero');
    step += 1;
  }
};

gameField.addEventListener('click', (e) => (step % 2 === 0 ? addCross(e) : addZero(e)));
