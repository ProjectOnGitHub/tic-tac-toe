const gameField = document.querySelector('.game__field');

const addCross = (e) => {
  if (e.target.classList.contains('game__field-cell')) {
    e.target.classList.add('cross');
    console.log('тык');
  }
};

gameField.addEventListener('click', addCross);
