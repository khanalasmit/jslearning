let questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 1
  },
  {
    question: "Who is the write of Famous book harry potter?",
    options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jk Rolling"],
    answer: 4
  }
];

let current = 0;
let score = 0;

function showQuestion() {
  if (current >= questions.length) {
    document.getElementById('quiz-container').innerHTML = "Quiz Over! Your score: " + score + " / " + questions.length;
    return;
  }
  let q = questions[current];
  document.getElementById('question').innerText = q.question;
  let optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = "";
  q.options.forEach((opt, i) => {
    let btn = document.createElement('button');
    btn.innerText = opt;
    btn.className = "option";
    btn.onclick = function() { selectAnswer(i); };
    optionsDiv.appendChild(btn);
  });
  document.getElementById('nextBtn').style.display = "none";
}

function selectAnswer(i) {
  let q = questions[current];
  if (i === q.answer) {
    score++;
    document.getElementById('score').innerText = "Correct!";
  } else {
    document.getElementById('score').innerText = "Wrong!";
  }
  Array.from(document.getElementsByClassName('option')).forEach(btn => btn.disabled = true);
  document.getElementById('nextBtn').style.display = "inline-block";
}

function nextQuestion() {
  current++;
  document.getElementById('score').innerText = "";
  showQuestion();
}

showQuestion();
