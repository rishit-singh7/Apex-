const questions = [
  {
    prompt: "What number comes next in this pattern? 2, 4, 8, 16, ...",
    answers: ["18", "24", "32", "30"],
    correctIndex: 2,
    explanation: "Each number doubles: 2 × 2 = 4, 4 × 2 = 8, and 8 × 2 = 16. So the next number is 16 × 2 = 32."
  },
  {
    prompt: "A pattern starts at 5 and adds 3 each time. What is the 5th number? 5, 8, 11, ...",
    answers: ["12", "14", "15", "17"],
    correctIndex: 3,
    explanation: "Add 3 each time: 5, 8, 11, 14, 17. The 5th number is 17."
  },
  {
    prompt: "Which number is missing? 1, 4, 9, 16, __",
    answers: ["20", "24", "25", "36"],
    correctIndex: 2,
    explanation: "These are square numbers: 1² = 1, 2² = 4, 3² = 9, 4² = 16. The next is 5² = 25."
  }
];

const STORAGE_KEY = "apex-learning-progress";

const defaultProgress = {
  streak: 0,
  points: 0,
  completedSessions: 0,
  lastPracticeDate: "",
  exam: "Math Olympiad",
  currentQuestionIndex: 0,
  score: 0,
  mistakes: 0,
  selectedAnswerIndex: null,
  sessionInProgress: false
};

function createDefaultProgress() {
  return {
    ...defaultProgress
  };
}

function loadProgress() {
  const savedProgress = localStorage.getItem(STORAGE_KEY);

  if (!savedProgress) {
    return createDefaultProgress();
  }

  try {
    const parsedProgress = JSON.parse(savedProgress);

    return {
      streak: Number.isInteger(parsedProgress.streak) ? parsedProgress.streak : 0,
      points: Number.isInteger(parsedProgress.points) ? parsedProgress.points : 0,
      completedSessions: Number.isInteger(parsedProgress.completedSessions) ? parsedProgress.completedSessions : 0,
      lastPracticeDate: typeof parsedProgress.lastPracticeDate === "string" ? parsedProgress.lastPracticeDate : "",
      exam: typeof parsedProgress.exam === "string" ? parsedProgress.exam : "Math Olympiad",
      currentQuestionIndex: Number.isInteger(parsedProgress.currentQuestionIndex) && parsedProgress.currentQuestionIndex >= 0 && parsedProgress.currentQuestionIndex < questions.length
        ? parsedProgress.currentQuestionIndex
        : 0,
      score: Number.isInteger(parsedProgress.score) && parsedProgress.score >= 0 ? parsedProgress.score : 0,
      mistakes: Number.isInteger(parsedProgress.mistakes) && parsedProgress.mistakes >= 0 ? parsedProgress.mistakes : 0,
      selectedAnswerIndex: Number.isInteger(parsedProgress.selectedAnswerIndex) ? parsedProgress.selectedAnswerIndex : null,
      sessionInProgress: parsedProgress.sessionInProgress === true
    };
  } catch (error) {
    console.error("Could not read saved progress.", error);
    return createDefaultProgress();
  }
}

let progress = loadProgress();

const homeScreen = document.querySelector("#home-screen");
const quizScreen = document.querySelector("#quiz-screen");
const completeScreen = document.querySelector("#complete-screen");
const examSelect = document.querySelector("#exam-select");
const startButton = document.querySelector("#start-button");
const answerList = document.querySelector("#answer-list");
const feedbackBox = document.querySelector("#answer-feedback");
const nextButton = document.querySelector("#next-button");
const progressBar = document.querySelector(".quiz-progress");

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error("Could not save progress.", error);
    window.alert("Your progress could not be saved on this device. You can keep practicing, but it may not be available later.");
  }
}

function updateDashboard() {
  document.querySelector("#streak-count").textContent = progress.streak;
  document.querySelector("#points-count").textContent = progress.points;
  examSelect.value = progress.exam;

  const savedProgressCard = document.querySelector("#saved-progress");

  if (progress.sessionInProgress) {
    savedProgressCard.hidden = false;
    document.querySelector("#saved-progress-text").textContent = `Question ${progress.currentQuestionIndex + 1} of ${questions.length}`;
    document.querySelector("#saved-progress-fill").style.width = `${(progress.currentQuestionIndex / questions.length) * 100}%`;
    document.querySelector("#lesson-status").textContent = "IN PROGRESS";
    startButton.innerHTML = 'Resume practice <span aria-hidden="true">→</span>';
  } else {
    savedProgressCard.hidden = true;
    document.querySelector("#lesson-status").textContent = progress.completedSessions > 0 ? "READY AGAIN" : "READY";
    startButton.innerHTML = 'Start today\'s practice <span aria-hidden="true">→</span>';
  }
}

function showScreen(screen) {
  homeScreen.hidden = screen !== homeScreen;
  quizScreen.hidden = screen !== quizScreen;
  completeScreen.hidden = screen !== completeScreen;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function calculateProgressWidth() {
  const widthPercent = (progress.currentQuestionIndex / questions.length) * 100;
  return `${widthPercent}%`;
}

function renderQuestion() {
  const currentQuestion = questions[progress.currentQuestionIndex];

  document.querySelector("#quiz-exam").textContent = progress.exam.toUpperCase();
  document.querySelector("#question-counter").textContent = `${progress.currentQuestionIndex + 1} / ${questions.length}`;
  document.querySelector("#question-label").textContent = `QUESTION ${progress.currentQuestionIndex + 1}`;
  document.querySelector("#question-text").textContent = currentQuestion.prompt;

  progressBar.setAttribute("aria-valuenow", progress.currentQuestionIndex);
  document.querySelector("#quiz-progress-fill").style.width = calculateProgressWidth();
  answerList.replaceChildren();

  currentQuestion.answers.forEach((answerText, answerIndex) => {
    const answerButton = document.createElement("button");
    answerButton.type = "button";
    answerButton.className = "answer-option";
    answerButton.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + answerIndex)}</span><span></span>`;
    answerButton.querySelector("span:last-child").textContent = answerText;
    answerButton.addEventListener("click", () => selectAnswer(answerIndex));
    answerList.appendChild(answerButton);
  });

  feedbackBox.hidden = true;
  feedbackBox.classList.remove("is-wrong");
  nextButton.hidden = true;

  if (progress.selectedAnswerIndex !== null) {
    revealAnswer(progress.selectedAnswerIndex);
  }
}

function selectAnswer(answerIndex) {
  if (progress.selectedAnswerIndex !== null) {
    return;
  }

  progress.selectedAnswerIndex = answerIndex;
  const currentQuestion = questions[progress.currentQuestionIndex];

  if (answerIndex === currentQuestion.correctIndex) {
    progress.score += 1;
  } else {
    progress.mistakes += 1;
  }

  saveProgress();
  revealAnswer(answerIndex);
}

function revealAnswer(answerIndex) {
  const currentQuestion = questions[progress.currentQuestionIndex];
  const isCorrect = answerIndex === currentQuestion.correctIndex;
  const answerButtons = answerList.querySelectorAll(".answer-option");

  answerButtons.forEach((button, index) => {
    button.disabled = true;

    if (index === currentQuestion.correctIndex) {
      button.classList.add("is-correct");
    } else if (index === answerIndex) {
      button.classList.add("is-wrong");
    }
  });

  feedbackBox.hidden = false;
  feedbackBox.classList.toggle("is-wrong", !isCorrect);
  document.querySelector("#feedback-title").textContent = isCorrect ? "That’s right! Nice work." : "Not quite—and that’s okay.";
  document.querySelector("#feedback-explanation").textContent = currentQuestion.explanation;

  nextButton.hidden = false;
  nextButton.innerHTML = progress.currentQuestionIndex === questions.length - 1
    ? 'See my results <span aria-hidden="true">→</span>'
    : 'Next question <span aria-hidden="true">→</span>';
}

function getTodayDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getPreviousDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  const previousDate = new Date(year, month - 1, day - 1);

  const previousYear = previousDate.getFullYear();
  const previousMonth = String(previousDate.getMonth() + 1).padStart(2, "0");
  const previousDay = String(previousDate.getDate()).padStart(2, "0");

  return `${previousYear}-${previousMonth}-${previousDay}`;
}

function finishPractice() {
  const today = getTodayDate();

  if (progress.lastPracticeDate !== today) {
    const wasYesterday = progress.lastPracticeDate === getPreviousDate(today);
    progress.streak = wasYesterday ? progress.streak + 1 : 1;
    progress.lastPracticeDate = today;
  }

  const earnedPoints = progress.score * 10;
  progress.points += earnedPoints;
  progress.completedSessions += 1;

  document.querySelector("#result-score").textContent = `${progress.score}/${questions.length}`;
  document.querySelector("#result-points").textContent = `+${earnedPoints}`;
  document.querySelector("#completion-copy").textContent = `You practiced ${progress.exam} today and worked through ${progress.mistakes} ${progress.mistakes === 1 ? "mistake" : "mistakes"}. Every attempt helps you learn.`;

  progress.currentQuestionIndex = 0;
  progress.score = 0;
  progress.mistakes = 0;
  progress.selectedAnswerIndex = null;
  progress.sessionInProgress = false;

  saveProgress();
  updateDashboard();
  showScreen(completeScreen);
}

startButton.addEventListener("click", () => {
  progress.exam = examSelect.value;

  if (!progress.sessionInProgress) {
    progress.currentQuestionIndex = 0;
    progress.score = 0;
    progress.mistakes = 0;
    progress.selectedAnswerIndex = null;
    progress.sessionInProgress = true;
  }

  saveProgress();
  renderQuestion();
  showScreen(quizScreen);
});

examSelect.addEventListener("change", () => {
  progress.exam = examSelect.value;
  saveProgress();
});

document.querySelector("#back-button").addEventListener("click", () => {
  updateDashboard();
  showScreen(homeScreen);
});

nextButton.addEventListener("click", () => {
  if (progress.currentQuestionIndex === questions.length - 1) {
    finishPractice();
    return;
  }

  progress.currentQuestionIndex += 1;
  progress.selectedAnswerIndex = null;
  saveProgress();
  renderQuestion();
});

document.querySelector("#finish-button").addEventListener("click", () => {
  updateDashboard();
  showScreen(homeScreen);
});

updateDashboard();
