// 11. Random Number Guessing Game

const numberInput = document.getElementById('number-input');
const result = document.getElementById('result');
const computerPick = Math.floor(Math.random() * 100) + 1; // Get a random number from 1-100
const guessBtn = document.getElementById('guess-btn');
const triesDisplay = document.getElementById('tries-display');
let triesLeft = 10; // Number of tries

// Function on top of Guess button
guessBtn.onclick = function () {
  const playerGuess = Number(numberInput.value);

  // Checks if the user entered a number
  if (numberInput.value === '' || isNaN(playerGuess)) {
    alert('Enter a valid number!');
    return;
  }

  // If the user wins
  if (computerPick === playerGuess) {
    confetti(); // Confetti animation
    result.innerText = `You win! Computer chose ${computerPick}.`;
    guessBtn.disabled = true; // Disable Guess button
    numberInput.disabled = true; // Disable input
    return;
  }

  // Tries number decrement + tries display in the DOM
  triesLeft--;
  triesDisplay.innerText = `Tries: ${triesLeft}`;

  // Disable buttons and input when the user runs out of tries
  if (triesLeft === 1) {
    alert('Last try left. Think wisely!');
  } else if (triesLeft === 0) {
    result.innerText = `Game over! The number was ${computerPick}.`;
    guessBtn.disabled = true; // Disable Guess button
    numberInput.disabled = true; // Disable input
    return;
  }

  // Lower or higher hint display
  if (computerPick < playerGuess) {
    result.innerText = `Computer's number is lower than ${playerGuess}.`;
  } else if (computerPick > playerGuess) {
    result.innerText = `Computer's number is higher than ${playerGuess}.`;
  }
};

// Guess button also works by pressing 'Enter'
numberInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') guessBtn.click();
});

// Restart button
document.getElementById('restart-btn').onclick = function () {
  location.reload(); // Reload page
};