const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const WORDS = [
  ['dog', '../images/dog.png'],
  ['cat', '../images/cat.png'],
  ['frog', '../images/frog.png'],
  ['hippo', '../images/hippo.png'],
  ['lion', '../images/lion.png'],
  ['mouse', '../images/mouse.png'],
];

const confetti = new JSConfetti();

let won = false;
let word = null;

const template = document.getElementById('template');
const imageContainer = document.getElementById('image');
const wordContainer = document.getElementById('word-tiles');
const letterContainer = document.getElementById('letter-tiles');

const selectWord = () => {
  const newWord = WORDS[Math.floor(Math.random() * WORDS.length)];

  if (newWord == word) {
    return selectWord();
  }

  word = newWord;
};

const renderImage = () => {
  const image = new Image(116);

  image.src = word[1];

  imageContainer.replaceChildren(image);
};

const renderWordTiles = () => {
  wordContainer.replaceChildren();

  for (let i = 0; i < word[0].length; i++) {
    const tile = template.content.cloneNode(true);

    tile.querySelector('.content .back').innerHTML = word[0][i].toUpperCase();

    wordContainer.appendChild(tile);
  }
};

const renderLetterTiles = () => {
  for (let i = 0; i < ALPHABET.length; i++) {
    const tile = template.content.cloneNode(true);

    tile.querySelector('.tile').classList.add('flipped');
    tile.querySelector('.content .back').innerHTML = ALPHABET[i].toUpperCase();

    letterContainer.appendChild(tile);
  }
};

const flip = (letter) => {
  for (const tile of wordTiles(letter)) {
    tile.classList.add('flipped');
  }

  letterTile(letter).classList.remove('flipped');
};

const reset = () => {
  const wordTiles = wordContainer.querySelectorAll('.tile');
  const letterTiles = letterContainer.querySelectorAll('.tile');

  for (const tile of wordTiles) {
    tile.classList.remove('flipped');
  }

  for (const tile of letterTiles) {
    tile.classList.add('flipped');
  }

  won = false;

  setTimeout(() => {
    selectWord();
    renderWordTiles();
    renderImage();
  }, 600);
};

const checkWin = (letter) => {
  const tiles = wordContainer.querySelectorAll('.flipped');

  if (tiles.length === word[0].length && !won) {
    won = true;

    new Audio('../sounds/yay.mp3').play();

    confetti.addConfetti();

    setTimeout(reset, 2000);
  }
};

const handleClick = (event) => {
  const letter = event
    .currentTarget
    .querySelector('.back')
    .innerHTML;

  flip(letter);
  checkWin(letter);
};

const letterTile = (letter) => {
  const tiles = [...letterTiles()];

  return tiles.find(t => t.querySelector('.back').innerHTML === letter);
};

const wordTiles = (letter) => {
  const tiles = [...wordContainer.querySelectorAll('.tile')];

  return tiles.filter(t => t.querySelector('.back').innerHTML === letter);
};

const letterTiles = () => {
  return letterContainer.querySelectorAll('.tile');
};

const attachClickHandlers = () => {
  for (const tile of letterTiles()) {
    tile.addEventListener('click', handleClick);
  }
};

const initialize = () => {
  selectWord();
  renderImage();
  renderWordTiles();
  renderLetterTiles();
  attachClickHandlers();
};

initialize();
