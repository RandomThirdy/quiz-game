// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "Who was the first President of the Philippines?",
    answers: [
      { text: "Emilio Aguinaldo", correct: true },
      { text: "Andres Bonifacio", correct: false },
      { text: "Manuel L. Quezon", correct: false },
      { text: "Jose Rizal", correct: false },
    ],
  },
  {
    question: "What event marked the start of the Philippine Revolution in 1896?",
    answers: [
      { text: "Cry of Balintawak", correct: true },
      { text: "Declaration of Independence", correct: false },
      { text: "Battle of Mactan", correct: false },
      { text: "Execution of Gomburza", correct: false },
    ],
  },
  {
    question: "Which hero is known for his peaceful reform advocacy through writing?",
    answers: [
      { text: "Andres Bonifacio", correct: false },
      { text: "Emilio Aguinaldo", correct: false },
      { text: "Jose Rizal", correct: true },
      { text: "Antonio Luna", correct: false },
    ],
  },
  {
    question: "What treaty ended the Spanish-American War and ceded the Philippines to the U.S.?",
    answers: [
      { text: "Treaty of Paris (1898)", correct: true },
      { text: "Treaty of Tordesillas", correct: false },
      { text: "Treaty of Versailles", correct: false },
      { text: "Pact of Biak-na-Bato", correct: false },
    ],
  },
  {
    question: "Where was the Philippine independence from Spain proclaimed?",
    answers: [
      { text: "Kawit, Cavite", correct: true },
      { text: "Manila", correct: false },
      { text: "Malolos, Bulacan", correct: false },
      { text: "Dapitan", correct: false },
    ],
  },
];


let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  answersDisabled = false;

  const currentQuestion = quizQuestions[currentQuestionIndex];

  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";

  questionText.textContent = currentQuestion.question;

  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct = answer.correct;

    button.addEventListener("click", selectAnswer);

    answersContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;

  answersDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";


  Array.from(answersContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1000);
}

function showResults() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultMessage.textContent = "Taina galing!";
  } else if (percentage >= 80) {
    resultMessage.textContent = "Decent";
  } else if (percentage >= 60) {
    resultMessage.textContent = "Mid";
  } else if (percentage >= 40) {
    resultMessage.textContent = "Pwede na";
  } else {
    resultMessage.textContent = "Walang kwenta";
  }
}

function restartQuiz() {
  resultScreen.classList.remove("active");

  startQuiz();
}