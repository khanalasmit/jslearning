let to_guess = Math.floor(Math.random() * 5) + 1;
let side = 0;
let winner_side = "";
let scoreA = 0;
let scoreB = 0;

window.onload = function () {
    updateSide();
    updateScoreDisplay();
};

function updateSide() {
    const sid = document.getElementById('side');
    if (side === 0) {
        sid.innerText = 'Side A';
        winner_side = "Side B is Winner";
    } else {
        sid.innerText = 'Side B';
        winner_side = "Side A is Winner";
    }
}

function updateScoreDisplay() {
    document.getElementById('scoreA').innerText = scoreA;
    document.getElementById('scoreB').innerText = scoreB;
}

function checkGuess() {
    // Flip side logic
    if (side === 0) side = 1;
    else side = 0;
    updateSide();

    let currentPlayer = (side === 1) ? 'A' : 'B';

    const input = document.getElementById('guess');
    const num = Number(input.value);
    const message = document.getElementById('message');
    const winner_message = document.getElementById('winner');

    if (input.value === "" || isNaN(num)) {
        message.innerText = "Please enter a valid number";
        message.style.color = "red";
        return;
    }
    let diff = Math.abs(to_guess - num);
    let per = (diff / to_guess) * 100;

    let correct = false;

    if (num === to_guess) {
        correct = true;
        message.innerText = `Correct! The number was ${to_guess}. Game resetting...`;
        message.style.color = "green";

        // Show Popup
        winner_message.innerText = winner_side;
        winner_message.classList.add('show');

        document.getElementById('check-btn').disabled = true;
        setTimeout(resetGame, 3000);
    } else if (per <= 10) {
        message.innerText = "Near (within 10%)";
        message.style.color = "blue";
    } else if (num > to_guess) {
        message.innerText = "Too High!";
        message.style.color = "orange";
    } else {
        message.innerText = "Too Low!";
        message.style.color = "orange";
    }

    // Score Logic
    if (correct) {
        if (currentPlayer === 'A') scoreA += 10;
        else scoreB += 10;
    } else {
        if (currentPlayer === 'A') scoreA = Math.max(0, scoreA - 1);
        else scoreB = Math.max(0, scoreB - 1);
    }
    updateScoreDisplay();

    // Reset input box
    input.value = "";
    input.focus();
}

function resetGame() {
    // Generate new number
    to_guess = Math.floor(Math.random() * 5) + 1;

    // Clear messages
    document.getElementById('message').innerText = "Game Restarted! Guess again.";
    document.getElementById('message').style.color = "black";

    // Hide Popup
    document.getElementById('winner').classList.remove('show');
    document.getElementById('winner').innerText = "";

    // Re-enable button
    document.getElementById('check-btn').disabled = false;
}