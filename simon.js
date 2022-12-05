let order = [];
let personOrder = [];
//arrays were created to keep track of the random order and
//the players order 
let level = 0;
//  variable created to keep track of rounds that will be played
 

const startButton = document.querySelector('.js-start');
// start button was created 
const info = document.querySelector('.js-info');
const heading = document.querySelector('.js-heading');
const sqaureContainer = document.querySelector('.js-container');

function resetGame(text) {
  alert(text);
  order = [];
  personOrder = [];
  level = 0;
  startButton.classList.remove('hidden');
  // once the start button is pressed it will be hidden
  heading.textContent = 'Simon Game';
  info.classList.add('hidden');
  sqaureContainer.classList.add('unclickable');
}

function personGoes(level) {
  sqaureContainer.classList.remove('unclickable');
  // while simon is going player is unable to click a box
  info.textContent = `Your up: ${level} Tap${level > 1 ? 's' : ''}`;
  // function indicates its players turn to go after "simons" order
}

function activateSquare(color) {
  const sqaure = document.querySelector(`[data-sqaure='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);
  // used to select the color and audio that matches the sqaures in my html file


  sqaure.classList.add('activated');
  sound.play();

  setTimeout(() => {
    sqaure.classList.remove('activated');
  }, 300);
  // allows linked audio file to be played after 300 milliseconds
}

function playRound(nextOrder) {
  nextOrder.forEach((color, index) => {
    setTimeout(() => {
      activateSquare(color);
    }, (index + 1) * 600);
    // creates a delay between button press 
  });
}

function nextStep() {
  const sqaure = ['maroon', 'grey', 'purple', 'olive'];
  const random = sqaure[Math.floor(Math.random() * sqaure.length)];
  //adds a random button press to the order 

  return random;
}

function nextRound() {
  level += 1;
  // function was made in order to start the next order of clicks

  sqaureContainer.classList.add('unclickable');
  info.textContent = 'Wait for simon';
  heading.textContent = `Level ${level} of 20`;


  const nextOrder = [...order];
  //this allows all elements in the 'order' array to be copied into "nextOrder"
  nextOrder.push(nextStep());
  playRound(nextOrder);

  order = [...nextOrder];
  setTimeout(() => {
    personGoes(level);
  }, level * 600 + 1000);
}

function handleClick(sqaure) {
  const index = personOrder.push(sqaure) - 1;
  const sound = document.querySelector(`[data-sound='${sqaure}']`);
  sound.play();

  const remainingTaps = order.length - personOrder.length;

  if (personOrder[index] !== order[index]) {
    resetGame('Dang big homie you pressed the Wrong one');
    return;
  }

  if (personOrder.length === order.length) {
    if (personOrder.length === 20) {
      resetGame('Congrats big homie you moving up');
      return
    }

    personOrder = [];
    info.textContent = 'Yeeerr lets get this bread!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }

  info.textContent = `You up big homie: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
}

function startGame() {
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  info.textContent = 'Wait for simon';
  nextRound();
}

startButton.addEventListener('click', startGame);
sqaureContainer.addEventListener('click', event => {
  const { sqaure } = event.target.dataset;

  if (sqaure) handleClick(sqaure);
});