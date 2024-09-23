'use strict';

//Selecting buttons
let rollDice = document.querySelector('.btn--roll');
let hold = document.querySelector('.btn--hold');
let newGame = document.querySelector('.btn--new');
let showdice = document.querySelector('.dice');

//Selecting scores elements
let player1score = document.querySelector('#score--0');
let player2score = document.getElementById('score--1');

//Selecting current score elements
let player1currentscore = document.querySelector('#current--0');
let player2currentscore = document.getElementById('current--1');

//Selecting player to add active element
let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

//current player = 1
let currentPlayer = 1;

//switch players
function switchPlayer() {
  if (currentPlayer === 1) {
    currentPlayer = 2;
    console.log('switching to player 2...');
    player2.classList.add('player--active');
    player1.classList.remove('player--active');
  } else {
    currentPlayer = 1;
    console.log('switching to player 1...');
    player1.classList.add('player--active');
    player2.classList.remove('player--active');
  }
}

// handle roll dice for player 1 on  start
function handleRollDice() {
  showdice.classList.remove('hidden');
  let generateRandomNumber = Math.trunc(Math.random() * (6 - 2 + 1) + 2);
  showdice.src = `dice-${generateRandomNumber}.png`;

  //if any number asides 1 is rolled continue with player 1
  if (generateRandomNumber !== 1) {
    //check if current player is 1
    if (currentPlayer === 1) {
      console.log(`PLAYER 1: I rolled a ${generateRandomNumber}, roll again`);
      //keep adding value to player1currentscore
      player1currentscore.textContent =
        Number(player1currentscore.textContent) + generateRandomNumber;
    } else {
      console.log(`PLAYER 2: I rolled a ${generateRandomNumber}, roll again`);
      //keep adding value to player2currentscore
      player2currentscore.textContent =
        Number(player2currentscore.textContent) + generateRandomNumber;
    }
  }
  //if 1 number is rolled switch to player 2
  else if (generateRandomNumber === 1) {
    //check if current player is 1
    if (currentPlayer === 1) {
      console.log(`PLAYER 1: Oops!. I rolled a 1`);
      //reset player1currentscore to 0
      player1currentscore.textContent = 0;
      switchPlayer();
    } else {
      console.log(`PLAYER 2: Oops!. I rolled a 1`);
      //reset player2currentscore to 0
      player2currentscore.textContent = 0;
      switchPlayer();
    }
  }
}

//handle hold dice button
function handleHoldDice() {
  if (currentPlayer === 1) {
    let player1ScoreNumber =
      Number(player1score.textContent) +
      Number(player1currentscore.textContent);
    player1currentscore.textContent = 0;
    if (player1ScoreNumber >= 100) {
      player1.classList.add('player--winner');
      showdice.classList.add('hidden');
      console.log('Player 1 wins!');
      rollDice.disabled = true;
      hold.disabled = true;
    } else {
      switchPlayer();
    }
  } else {
    let player2ScoreNumber =
      Number(player2score.textContent) +
      Number(player2currentscore.textContent);
    player2currentscore.textContent = 0;
    if (player2ScoreNumber >= 100) {
      player2.classList.add('player--winner');
      showdice.classList.add('hidden');
      console.log('Player 2 wins!');
      rollDice.disabled = true;
      hold.disabled = true;
    } else {
      switchPlayer();
    }
  }
}

rollDice.addEventListener('click', handleRollDice);
hold.addEventListener('click', handleHoldDice);
newGame.addEventListener('click', function () {
  currentPlayer = 1;
  player1.classList.add('player--active');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--active', 'player--winner');
  newgame();
});

// start game
function newgame() {
  // Setting initial scores to 0
  player1score.textContent = 0;
  player2score.textContent = 0;
  player1currentscore.textContent = 0;
  player2currentscore.textContent = 0;

  // Hide dice
  showdice.classList.add('hidden');

  //enable rolldice and hold buttons
  rollDice.disabled = false;
  hold.disabled = false;

  //removeEventListener on newgame
  // rollDice.removeEventListener('click', handleRollDice);
  // hold.removeEventListener('click', handleHoldDice);
}

newgame();
