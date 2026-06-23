import { questions } from "./data";

import {
  questionElement,
  optionsElement,
  scoreElement,
  nextBtn,
  progressElement,
  timerElement,
  restartBtn,
  progressBar,
  logoutBtn,
} from "./dom";

let currentQuestion = 0;
let score = 0;
let answered = false;

let timeLeft = 10;

let timerId: number;

export function loadQuestion(): void {
  answered = false;

  progressElement.textContent = `Question ${currentQuestion + 1}/${questions.length}`;

  const progressWidth = ((currentQuestion + 1) / questions.length) * 100;

  progressBar.style.width = `${progressWidth}%`;

  startTimer();
  const question = questions[currentQuestion];

  questionElement.textContent = question.question;

  optionsElement.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");

    button.textContent = option;

    button.classList.add("option-btn");

    button.addEventListener("click", () => checkAnswer(option, button));

    optionsElement.appendChild(button);
  });
}

export function stopTimer(): void {
  clearInterval(timerId);
}

function startTimer(): void {
  clearInterval(timerId);

  timeLeft = 10;

  timerElement.textContent = timeLeft.toString();

  timerId = setInterval(() => {
    timeLeft--;

    timerElement.textContent = timeLeft.toString();

    if (timeLeft <= 0) {
      clearInterval(timerId);

      nextBtn.click();
    }
  }, 1000);
}

export function resumeTimer(): void {
  clearInterval(timerId);

  timerId = setInterval(() => {
    timeLeft--;

    timerElement.textContent = timeLeft.toString();

    if (timeLeft <= 0) {
      clearInterval(timerId);

      nextBtn.click();
    }
  }, 1000);
}

function checkAnswer(selectedAnswer: string, button: HTMLButtonElement): void {
  if (answered) return;

  answered = true;

  const buttons = document.querySelectorAll(".option-btn");

  buttons.forEach((btn) => {
    const currentButton = btn as HTMLButtonElement;

    currentButton.disabled = true;

    if (currentButton.textContent === questions[currentQuestion].answer) {
      currentButton.classList.add("correct");
    }
  });

  if (selectedAnswer === questions[currentQuestion].answer) {
    score++;

    scoreElement.textContent = score.toString();
  } else {
    button.classList.add("wrong");
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    clearInterval(timerId);

    questionElement.textContent = `Quiz Finished! Final Score: ${score}`;

    optionsElement.innerHTML = "";

    nextBtn.style.display = "none";

    restartBtn.style.display = "block";

    logoutBtn.style.display = "block";
  }
});

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;

  score = 0;

  scoreElement.textContent = "0";

  nextBtn.style.display = "block";

  restartBtn.style.display = "none";

  logoutBtn.style.display = "none";

  loadQuestion();
});
