const CARD_PAIRS = 6;

const CARD_TYPES = [
  'frog',
  'cat',
  'dog',
  'mouse',
  'hippo',
  'lion',
];

const confetti = new JSConfetti();

const template = document.getElementById('template');
const container = document.getElementById('cards');

const state = [];
let selected = null;

const flip = (...elements) => {
  elements.forEach(e => {
    e.classList.toggle('flipped');
  });
};

const checkMatch = (element) => {
  if (selected == null) {
    selected = element;

    return;
  }

  const _selected = selected;
  selected = null;

  const typeA = element
    .classList
    .item(1);

  const typeB = _selected
    .classList
    .item(1);

  if (typeA !== typeB) {
    setTimeout(() => {
      new Audio('./sounds/error.mp3').play();

      flip(element, _selected);
    }, 800);

    return;
  }

  new Audio('./sounds/success.mp3').play();
};

const reset = async () => {
  flip(...cards());

  setTimeout(shuffle, 1000);
};

const checkWin = () => {
  if (cards('flipped').length == CARD_PAIRS * 2) {
    new Audio('./sounds/yay.mp3').play();

    confetti.addConfetti();

    setTimeout(reset, 2000);
  }
};

const handleClick = (event) => {
  if (event.currentTarget.classList.contains('flipped')) {
    return;
  }

  flip(event.currentTarget);
  checkMatch(event.currentTarget);
  checkWin();
};

const cards = (type) => {
  return container.getElementsByClassName(
    ['card', type].filter(Boolean).join(' ')
  );
};

const shuffle = () => {
  for (let i = 0; i < CARD_PAIRS * 2; i++) {
    state[i] = CARD_TYPES[i % CARD_TYPES.length];
  }

  for (let i = state.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [state[i], state[j]] = [state[j], state[i]];
  }

  const _cards = cards();

  for (let i = 0; i < _cards.length; i++) {
    const element = _cards.item(i);

    if (element.classList.length > 1) {
      element.classList.remove(
        element.classList.item(1)
      );
    }

    element.classList.add(state[i]);
  }
};

const renderCards = () => {
  for (let i = 0; i < CARD_PAIRS * 2; i++) {
    const card = template.content.cloneNode(true);

    container.appendChild(card);
  }
};

const attachClickHandlers = () => {
  for (const card of cards()) {
    card.addEventListener('click', handleClick);
  }
};

const initialize = () => {
  renderCards();
  shuffle();
  attachClickHandlers();
};

initialize();
