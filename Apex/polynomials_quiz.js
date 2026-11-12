"use strict";

const loadingView = document.querySelector("#loading-view");
const introView = document.querySelector("#intro-view");
const quizView = document.querySelector("#quiz-view");
const resultsView = document.querySelector("#results-view");
const attemptStorageKey = "apex.polynomialsQuiz.activeAttempt.v1";
let attemptId = Number(localStorage.getItem(attemptStorageKey)) || null;
let currentState = null;
let timerInterval = null;
let timerSyncPoint = 0;
let busy = false;

const byId = (id) => document.getElementById(id);

async function api(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data?.detail || "Apex could not complete that request. Please try again.");
    error.status = response.status;
    throw error;
  }
  return data;
}

function setVisible(view) {
  [loadingView, introView, quizView, resultsView].forEach((element) => {
    element.hidden = element !== view;
  });
}

function showError(id, message) {
  const element = byId(id);
  element.textContent = message;
  element.hidden = false;
}

function clearError(id) {
  const element = byId(id);
  element.textContent = "";
  element.hidden = true;
}

function formatClock(seconds) {
  const safe = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(safe / 60);
  const remainder = safe % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function saveAttemptId(id) {
  attemptId = id;
  localStorage.setItem(attemptStorageKey, String(id));
}

function stopTimers() {
  if (timerInterval !== null) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }
}

function applyResponse(data) {
  if (data?.status === "submitted") {
    stopTimers();
    renderResults(data);
    return;
  }
  currentState = data;
  timerSyncPoint = performance.now();
  saveAttemptId(data.attemptId);
  renderQuiz(data);
}

function renderQuiz(state) {
  stopTimers();
  clearError("quiz-error");
  setVisible(quizView);
  const question = state.question;
  const index = state.currentQuestionIndex;
  const category = byId("question-category");
  category.textContent = question.category === "olympiad" ? "Olympiad reasoning" : "Course concepts";
  category.classList.toggle("olympiad", question.category === "olympiad");
  byId("question-count").textContent = `Question ${index + 1} of ${state.questionCount}`;
  byId("question-prompt").textContent = question.prompt;
  const progress = document.querySelector(".progress-track");
  progress.setAttribute("aria-valuenow", String(index + 1));
  progress.setAttribute("aria-valuemax", String(state.questionCount));
  byId("progress-fill").style.width = `${((index + 1) / state.questionCount) * 100}%`;
  byId("previous-button").disabled = busy || index === 0;
  byId("next-button").disabled = busy || index === state.questionCount - 1;

  const optionList = byId("answer-options");
  optionList.replaceChildren();
  const locked = state.questions[index]?.locked === true;
  Object.entries(question.options).forEach(([key, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `answer-option${state.selectedOption === key ? " selected" : ""}`;
    button.setAttribute("aria-pressed", String(state.selectedOption === key));
    button.disabled = locked || busy;
    const letter = document.createElement("span");
    letter.className = "option-key";
    letter.textContent = key;
    const text = document.createElement("span");
    text.textContent = label;
    button.append(letter, text);
    button.addEventListener("click", () => selectAnswer(index, key));
    optionList.append(button);
  });

  const status = byId("question-status");
  status.classList.toggle("locked", locked);
  status.textContent = locked
    ? (state.selectedOption ? "Time is up. Your selected answer is saved." : "Time is up. This question is locked and will count as unanswered.")
    : "Select one answer. Your choice is saved automatically.";
  byId("next-button").textContent = index === state.questionCount - 1 ? "Last question" : "Next question →";
  renderNavigator(state);
  startLocalTimerDisplay(state);
}

function renderNavigator(state) {
  const navigator = byId("question-navigator");
  navigator.replaceChildren();
  let answered = 0;
  state.questions.forEach((question) => {
    if (question.answered) answered += 1;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "nav-question";
    if (question.answered) button.classList.add("answered");
    if (question.index === state.currentQuestionIndex) button.classList.add("current");
    if (question.locked) button.classList.add("locked");
    button.textContent = String(question.index + 1);
    button.setAttribute("aria-label", `Question ${question.index + 1}${question.answered ? ", answered" : ", unanswered"}${question.locked ? ", locked" : ""}`);
    button.setAttribute("aria-current", question.index === state.currentQuestionIndex ? "step" : "false");
    button.disabled = busy;
    button.addEventListener("click", () => navigateToQuestion(question.index));
    navigator.append(button);
  });
  byId("answered-count").textContent = `${answered} / ${state.questionCount}`;
}

function startLocalTimerDisplay(state) {
  const overallBox = document.querySelector(".overall-timer");
  const questionBox = document.querySelector(".question-timer-row");
  const update = () => {
    const elapsed = (performance.now() - timerSyncPoint) / 1000;
    const overallRemaining = Math.max(0, state.overallRemainingSeconds - elapsed);
    const questionRemaining = Math.max(0, state.questionRemainingSeconds - elapsed);
    byId("overall-timer").textContent = formatClock(overallRemaining);
    byId("question-timer").textContent = formatClock(questionRemaining);
    overallBox.classList.toggle("warning", overallRemaining <= 300 && overallRemaining > 0);
    overallBox.classList.toggle("expired", overallRemaining <= 0);
    questionBox.classList.toggle("warning", questionRemaining <= 20 && questionRemaining > 0);
    questionBox.classList.toggle("expired", questionRemaining <= 0);
    if (overallRemaining <= 0) {
      stopTimers();
      submitAttempt(false);
    } else if (questionRemaining <= 0) {
      if (!state.questions[state.currentQuestionIndex]?.locked) {
        stopTimers();
        refreshState();
      }
    }
  };
  update();
  timerInterval = window.setInterval(update, 250);
}

async function refreshState() {
  if (!attemptId || busy) return;
  busy = true;
  try {
    const data = await api(`/api/quiz/polynomials/attempts/${attemptId}`);
    busy = false;
    applyResponse(data);
  } catch (error) {
    busy = false;
    showError("quiz-error", error.message);
  }
}

async function selectAnswer(questionIndex, option) {
  if (busy || !attemptId) return;
  busy = true;
  stopTimers();
  try {
    const data = await api(`/api/quiz/polynomials/attempts/${attemptId}/answer`, {
      method: "POST",
      body: JSON.stringify({ question_index: questionIndex, option }),
    });
    busy = false;
    applyResponse(data);
  } catch (error) {
    busy = false;
    if (error.status === 409) await refreshState();
    else {
      showError("quiz-error", error.message);
      if (currentState) renderQuiz(currentState);
    }
  }
}

async function navigateToQuestion(questionIndex) {
  if (busy || !attemptId || questionIndex === currentState?.currentQuestionIndex) return;
  busy = true;
  stopTimers();
  try {
    const data = await api(`/api/quiz/polynomials/attempts/${attemptId}/navigate`, {
      method: "POST",
      body: JSON.stringify({ question_index: questionIndex }),
    });
    busy = false;
    applyResponse(data);
  } catch (error) {
    busy = false;
    showError("quiz-error", error.message);
    if (currentState) renderQuiz(currentState);
  }
}

function formatDuration(seconds) {
  if (seconds === null || seconds === undefined) return "—";
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return minutes ? `${minutes}m ${remainder}s` : `${remainder}s`;
}

function renderResults(result) {
  currentState = null;
  clearError("results-error");
  setVisible(resultsView);
  byId("score-value").textContent = `${result.score}/${result.totalQuestions}`;
  byId("accuracy-value").textContent = `${Number(result.accuracy).toFixed(0)}% accuracy`;
  byId("correct-value").textContent = String(result.correct);
  byId("incorrect-value").textContent = String(result.incorrect);
  byId("unanswered-value").textContent = String(result.unanswered);
  byId("time-value").textContent = formatDuration(result.timeTakenSeconds);
  renderResultsChart(result);
  byId("results-subtitle").textContent = result.unanswered
    ? `You completed the Polynomials quiz with ${result.unanswered} unanswered ${result.unanswered === 1 ? "question" : "questions"}. Review every solution below.`
    : "Here’s how you did on Polynomials. Review every solution below.";

  const review = byId("answer-review");
  review.replaceChildren();
  result.questions.forEach((question) => {
    const answeredCorrectly = question.outcome === "correct";
    const answered = question.selectedOption !== null;
    const article = document.createElement("details");
    article.className = `review-item ${question.outcome}`;
    const summary = document.createElement("summary");
    const number = document.createElement("span");
    number.className = "review-number";
    number.textContent = String(question.index + 1);
    const prompt = document.createElement("span");
    prompt.className = "review-prompt";
    prompt.textContent = question.prompt;
    const resultLabel = document.createElement("span");
    resultLabel.className = "review-status";
    resultLabel.textContent = !answered ? "Unanswered" : answeredCorrectly ? "Correct" : "Incorrect";
    const chevron = document.createElement("span");
    chevron.className = "review-chevron";
    chevron.setAttribute("aria-hidden", "true");
    chevron.textContent = "⌄";
    summary.append(number, prompt, resultLabel, chevron);

    const body = document.createElement("div");
    body.className = "review-body";
    const options = document.createElement("ol");
    options.className = "review-options";
    Object.entries(question.options).forEach(([key, label]) => {
      const option = document.createElement("li");
      option.className = "review-option";
      if (question.selectedOption === key) option.classList.add("selected-option");
      if (question.correctOption === key) option.classList.add("correct-option");
      const optionKey = document.createElement("span");
      optionKey.className = "review-option-key";
      optionKey.textContent = key;
      const optionText = document.createElement("span");
      optionText.className = "review-option-text";
      optionText.textContent = label;
      option.append(optionKey, optionText);
      if (question.selectedOption === key || question.correctOption === key) {
        const marker = document.createElement("span");
        marker.className = "review-option-marker";
        marker.textContent = question.selectedOption === key && question.correctOption === key
          ? "Your answer · Correct"
          : question.selectedOption === key
            ? "Your answer"
            : "Correct answer";
        option.append(marker);
      }
      options.append(option);
    });
    const selected = document.createElement("p");
    const selectedLabel = document.createElement("span");
    selectedLabel.className = "review-label";
    selectedLabel.textContent = "Your answer: ";
    selected.append(selectedLabel, document.createTextNode(answered ? `${question.selectedOption}. ${question.selectedLabel}` : "No answer selected."));
    const correct = document.createElement("p");
    const correctLabel = document.createElement("span");
    correctLabel.className = "review-label review-correct-answer";
    correctLabel.textContent = "Correct answer: ";
    correct.append(correctLabel, document.createTextNode(`${question.correctOption}. ${question.correctLabel}`));
    const explanation = document.createElement("p");
    const explanationLabel = document.createElement("span");
    explanationLabel.className = "review-label";
    explanationLabel.textContent = "Explanation: ";
    explanation.append(explanationLabel, document.createTextNode(question.explanation));
    body.append(options, selected, correct, explanation);
    article.append(summary, body);
    review.append(article);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderResultsChart(result) {
  const chart = byId("results-chart");
  chart.replaceChildren();
  const rows = [
    { label: "Correct", value: result.correct, max: result.totalQuestions, display: `${result.correct} of ${result.totalQuestions}`, color: "correct" },
    { label: "Incorrect", value: result.incorrect, max: result.totalQuestions, display: `${result.incorrect} of ${result.totalQuestions}`, color: "incorrect" },
    { label: "Unanswered", value: result.unanswered, max: result.totalQuestions, display: `${result.unanswered} of ${result.totalQuestions}`, color: "unanswered" },
    { label: "Time taken", value: result.timeTakenSeconds, max: result.overallTimeLimitSeconds, display: `${formatDuration(result.timeTakenSeconds)} of ${formatDuration(result.overallTimeLimitSeconds)}`, color: "time" },
  ];
  rows.forEach((item) => {
    const row = document.createElement("div");
    row.className = "chart-row";
    row.setAttribute("role", "listitem");
    const label = document.createElement("span");
    label.className = "chart-label";
    label.textContent = item.label;
    const track = document.createElement("div");
    track.className = "chart-track";
    track.setAttribute("aria-hidden", "true");
    const fill = document.createElement("span");
    fill.className = `chart-bar ${item.color}`;
    fill.style.width = `${item.max > 0 ? Math.min(100, item.value / item.max * 100) : 0}%`;
    track.append(fill);
    const value = document.createElement("strong");
    value.className = "chart-value";
    value.textContent = item.display;
    row.setAttribute("aria-label", `${item.label}: ${item.display}`);
    row.append(label, track, value);
    chart.append(row);
  });
  const note = document.querySelector(".chart-note");
  note.textContent = `Question results are scaled to ${result.totalQuestions}; time is scaled to the ${formatDuration(result.overallTimeLimitSeconds)} limit.`;
}

async function submitAttempt(showErrorOnFailure = true) {
  if (!attemptId || busy) return;
  busy = true;
  stopTimers();
  byId("confirm-submit").disabled = true;
  try {
    const result = await api(`/api/quiz/polynomials/attempts/${attemptId}/submit`, { method: "POST" });
    byId("submit-dialog").close();
    busy = false;
    renderResults(result);
  } catch (error) {
    busy = false;
    byId("confirm-submit").disabled = false;
    if (showErrorOnFailure) showError("quiz-error", error.message);
    else showError("quiz-error", "Apex could not confirm the automatic submission. Reconnecting…");
    await refreshState();
  }
}

async function beginQuiz() {
  if (busy) return;
  busy = true;
  clearError("intro-error");
  byId("start-button").disabled = true;
  try {
    const state = await api("/api/quiz/polynomials/attempts", { method: "POST" });
    saveAttemptId(state.attemptId);
    busy = false;
    applyResponse(state);
  } catch (error) {
    busy = false;
    byId("start-button").disabled = false;
    setVisible(introView);
    showError("intro-error", error.message);
  }
}

async function loadAttemptHistory() {
  const list = byId("attempt-history-list");
  const empty = byId("history-empty");
  list.replaceChildren();
  try {
    const data = await api("/api/quiz/polynomials/history");
    empty.hidden = data.attempts.length > 0;
    data.attempts.forEach((attempt, index) => {
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      const label = document.createElement("span");
      label.textContent = `Attempt ${data.attempts.length - index} · ${attempt.correct}/10 · ${Number(attempt.accuracy).toFixed(0)}%`;
      const date = document.createElement("span");
      date.textContent = new Date(attempt.submitted_at * 1000).toLocaleString();
      button.append(label, date);
      button.addEventListener("click", async () => {
        button.disabled = true;
        try {
          const result = await api(`/api/quiz/polynomials/attempts/${attempt.id}/results`);
          renderResults(result);
        } catch (error) {
          button.disabled = false;
          showError("intro-error", error.message);
        }
      });
      item.append(button);
      list.append(item);
    });
  } catch (error) {
    empty.textContent = error.message;
    empty.hidden = false;
  }
}

async function initialise() {
  try {
    const session = await api("/api/auth/me");
    if (!session) throw new Error("Please log in to continue.");
    if (attemptId) {
      const state = await api(`/api/quiz/polynomials/attempts/${attemptId}`);
      applyResponse(state);
      return;
    }
  } catch (error) {
    if (error.status === 401) {
      window.location.assign("/");
      return;
    }
    if (error.status !== 404) {
      setVisible(introView);
      showError("intro-error", error.message);
      return;
    }
    localStorage.removeItem(attemptStorageKey);
    attemptId = null;
  }
  setVisible(introView);
  await loadAttemptHistory();
}

byId("start-button").addEventListener("click", beginQuiz);
byId("previous-button").addEventListener("click", () => {
  if (currentState && currentState.currentQuestionIndex > 0) navigateToQuestion(currentState.currentQuestionIndex - 1);
});
byId("next-button").addEventListener("click", () => {
  if (currentState && currentState.currentQuestionIndex < currentState.questionCount - 1) navigateToQuestion(currentState.currentQuestionIndex + 1);
});
byId("submit-open-button").addEventListener("click", () => {
  const unanswered = currentState?.questions.filter((question) => !question.answered).length || 0;
  const totalQuestions = currentState?.questionCount || 10;
  byId("confirm-copy").textContent = unanswered
    ? `You have ${unanswered} unanswered ${unanswered === 1 ? "question" : "questions"}. After submission, you’ll see your score and explanations for all ${totalQuestions} questions. You can’t change answers afterward.`
    : `After submission, you’ll see your score and explanations for all ${totalQuestions} questions. You can’t change your answers afterward.`;
  byId("confirm-submit").disabled = false;
  byId("submit-dialog").showModal();
});
byId("cancel-submit").addEventListener("click", () => byId("submit-dialog").close());
byId("confirm-submit").addEventListener("click", () => submitAttempt());
byId("retry-button").addEventListener("click", async () => {
  setVisible(loadingView);
  await beginQuiz();
});
byId("history-button").addEventListener("click", async () => {
  stopTimers();
  attemptId = null;
  localStorage.removeItem(attemptStorageKey);
  setVisible(introView);
  await loadAttemptHistory();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

initialise();
