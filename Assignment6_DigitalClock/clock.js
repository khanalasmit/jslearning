function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // Format time as HH:MM:SS
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    const hr=document.getElementById('hour')
    const min=document.getElementById('min')
    const sec=document.getElementById('sec')
    hr.textContent=hours
    min.textContent=minutes
    sec.textContent=seconds
}

setInterval(updateClock, 1000);

updateClock();


// Timer functionality
let timerInterval = null;
let timerTime = 0; // in seconds
let timerRunning = false;

function updateTimerDisplay() {
    const hours = String(Math.floor(timerTime / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timerTime % 3600) / 60)).padStart(2, '0');
    const seconds = String(timerTime % 60).padStart(2, '0');
    const display = document.getElementById('stopwatch');
    if (display) display.textContent = `${hours}:${minutes}:${seconds}`;
}

function startTimer() {
    if (!timerRunning && timerTime > 0) {
        timerRunning = true;
        timerInterval = setInterval(() => {
            if (timerTime > 0) {
                timerTime--;
                updateTimerDisplay();
                if (timerTime === 0) {
                    clearInterval(timerInterval);
                    timerRunning = false;
                    alert('Time is up!');
                }
            }
        }, 1000);
    }
}

function pauseTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
}

function resetTimer() {
    timerRunning = false;
    clearInterval(timerInterval);
    timerTime = 0;
    updateTimerDisplay();
}

function setTimer(e) {
    e.preventDefault();
    const h = parseInt(document.getElementById('inputHours').value) || 0;
    const m = parseInt(document.getElementById('inputMinutes').value) || 0;
    const s = parseInt(document.getElementById('inputSeconds').value) || 0;
    timerTime = h * 3600 + m * 60 + s;
    updateTimerDisplay();
}

// Attach event listeners after DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    updateTimerDisplay();
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const timerForm = document.getElementById('timerForm');
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
    if (resetBtn) resetBtn.addEventListener('click', resetTimer);
    if (timerForm) timerForm.addEventListener('submit', setTimer);
});