let randomNumber = Math.floor(Math.random() * 100) + 1;
let score = 10;
let gameOver = false;

document.getElementById('score').innerText = "Score: " + score;

function checkGuess() {
  if (gameOver) return;
  let guess = Number(document.getElementById('guess').value);
  let feedback = document.getElementById('feedback');

  if (guess < 1 || guess > 100) {
    feedback.innerText = "Please enter a number between 1 and 100.";
    return;
  }

  if (guess === randomNumber) {
    feedback.innerText = "Correct! You guessed the number!";
    gameOver = true;
  } else if (guess < randomNumber) {
    feedback.innerText = "Too Low!";
    score--;
  } else {
    feedback.innerText = "Too High!";
    score--;
  }

  document.getElementById('score').innerText = "Score: " + score;

  if (score <= 0 && !gameOver) {
    feedback.innerText = "Game Over! The number was " + randomNumber;
    gameOver = true;
  }
}

function resetGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  score = 10;
  gameOver = false;
  document.getElementById('feedback').innerText = "";
  document.getElementById('score').innerText = "Score: " + score;
  document.getElementById('guess').value = "";
}
