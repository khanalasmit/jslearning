const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        answer: 2 // Index of correct option (Paris)
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        answer: 1
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: 2
    },
    {
        question: "Who wrote 'Harry potter'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "JK Rolling"],
        answer: 4
    },
    {
        question: "Which language is used for web styling?",
        options: ["Python", "HTML", "CSS", "Java"],
        answer: 2
    }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progressText = document.getElementById('progress-text');
const resultOverlay = document.getElementById('result-overlay');
const finalScoreSpan = document.getElementById('final-score');

// Init
window.onload = loadQuestion;

function loadQuestion() {
    const q = questions[currentQuestion];
    questionText.innerText = q.question;
    progressText.innerText = `Question ${currentQuestion + 1} / ${questions.length}`;

    // Clear old options
    optionsContainer.innerHTML = '';
    selectedOption = null;
    nextBtn.disabled = true; // Disable Next until an option is picked

    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        btn.innerText = opt;
        btn.onclick = () => selectOption(index, btn);
        optionsContainer.appendChild(btn);
    });
}

function selectOption(index, btnElement) {
    // Deselect all
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b => b.classList.remove('selected'));

    // Select clicked
    btnElement.classList.add('selected');
    selectedOption = index;

    // Enable Next
    nextBtn.disabled = false;
}

function nextQuestion() {
    if (selectedOption === null) return;

    // Check Answer
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    finalScoreSpan.innerText = `${score} / ${questions.length}`;
    resultOverlay.classList.add('show');
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    resultOverlay.classList.remove('show');
    loadQuestion();
}
