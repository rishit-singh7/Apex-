const topicList = document.querySelector("#real-number-topic-list");
const landingView = document.querySelector("#landing-view");
const lessonView = document.querySelector("#lesson-view");
const lessonContent = document.querySelector("#lesson-content");
const lessonBadges = document.querySelector("#lesson-badges");
const accessMessage = document.querySelector("#access-message");

function createElement(tagName, className = "", text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function validateTopics(topics) {
  if (!Array.isArray(topics) || topics.length !== 11) {
    throw new Error("The Real Numbers lessons could not be loaded. Please refresh the page.");
  }

  topics.forEach((topic) => {
    if (
      !topic.id ||
      !topic.title ||
      !Array.isArray(topic.questions) ||
      topic.questions.length < 5
    ) {
      throw new Error(`The lesson "${topic.title || "unknown"}" is incomplete.`);
    }

    topic.questions.forEach((question, index) => {
      if (
        !question.prompt ||
        !Array.isArray(question.options) ||
        question.options.length !== 4 ||
        new Set(question.options).size !== 4 ||
        !Number.isInteger(question.answer) ||
        question.answer < 0 ||
        question.answer > 3 ||
        !Array.isArray(question.steps) ||
        question.steps.length < 3
      ) {
        throw new Error(`Practice question ${index + 1} in "${topic.title}" is incomplete.`);
      }
    });
  });
}

function createBadge(label) {
  const badge = createElement("span", "badge", label);
  if (label.includes("Olympiad")) {
    badge.classList.add("extension");
  } else if (label.includes("Revision") || label.includes("Class 9")) {
    badge.classList.add("revision");
  }
  return badge;
}

function renderTopicList() {
  topicList.replaceChildren();
  window.apexRealNumberTopics.forEach((topic, index) => {
    const button = createElement("button", "topic-card");
    button.type = "button";
    button.dataset.topicId = topic.id;

    const content = createElement("span");
    content.append(
      createElement("h2", "", `${index + 1}. ${topic.title}`),
      createElement("p", "", topic.summary)
    );
    const badges = createElement("span", "badges");
    topic.level.forEach((label) => badges.append(createBadge(label)));
    content.append(badges);

    const arrow = createElement("span", "card-arrow", "›");
    arrow.setAttribute("aria-hidden", "true");
    button.append(content, arrow);
    topicList.append(button);
  });
}

function renderSteps(steps) {
  const list = document.createElement("ol");
  steps.forEach((step) => list.append(createElement("li", "", step)));
  return list;
}

function renderExample(example) {
  const details = createElement("details", "example");
  details.append(
    createElement("summary", "", example.title),
    renderSteps(example.steps)
  );
  return details;
}

function renderNumberLine() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "diagram");
  svg.setAttribute("viewBox", "0 0 760 145");
  svg.setAttribute("role", "img");
  svg.setAttribute(
    "aria-label",
    "Number line with −1, 0, one half, 1, square root of 2 approximately 1.414, and pi approximately 3.142."
  );

  const title = document.createElementNS(svg.namespaceURI, "title");
  title.textContent = "Rational and irrational values on a number line";
  svg.append(title);

  const addLine = (x1, y1, x2, y2, className) => {
    const line = document.createElementNS(svg.namespaceURI, "line");
    line.setAttribute("x1", String(x1));
    line.setAttribute("y1", String(y1));
    line.setAttribute("x2", String(x2));
    line.setAttribute("y2", String(y2));
    line.setAttribute("class", className);
    svg.append(line);
  };
  const addText = (x, y, text, anchor = "middle") => {
    const label = document.createElementNS(svg.namespaceURI, "text");
    label.setAttribute("x", String(x));
    label.setAttribute("y", String(y));
    label.setAttribute("text-anchor", anchor);
    label.textContent = text;
    svg.append(label);
  };
  const addPoint = (x, label, approximate = false) => {
    const point = document.createElementNS(svg.namespaceURI, "circle");
    point.setAttribute("cx", String(x));
    point.setAttribute("cy", "75");
    point.setAttribute("r", "5");
    point.setAttribute("class", approximate ? "irrational-point" : "point");
    svg.append(point);
    addText(x, 45, label);
  };

  addLine(35, 75, 730, 75, "axis");
  addText(736, 80, "x", "start");
  const marks = [
    { x: 70, value: "−1" },
    { x: 220, value: "0" },
    { x: 295, value: "½" },
    { x: 370, value: "1" },
    { x: 432, value: "√2 ≈ 1.414", approximate: true },
    { x: 691, value: "π ≈ 3.142", approximate: true }
  ];

  marks.forEach(({ x, value, approximate }) => {
    addLine(x, 67, x, 83, "tick");
    addPoint(x, value, approximate);
  });

  return svg;
}

function renderClassificationTable() {
  const table = createElement("table", "classification-table");
  table.setAttribute("aria-label", "Number sets and examples");
  const head = document.createElement("thead");
  const headerRow = document.createElement("tr");
  ["Set", "What it contains", "Example"].forEach((heading) => {
    headerRow.append(createElement("th", "", heading));
  });
  head.append(headerRow);
  const body = document.createElement("tbody");
  [
    ["Natural N", "Counting numbers from 1", "1, 2, 3, …"],
    ["Whole W", "Natural numbers and zero", "0, 1, 2, …"],
    ["Integers Z", "Negative and positive whole numbers, including zero", "…, −2, −1, 0, 1, …"],
    ["Rational Q", "Numbers p/q, with integers p,q and q ≠ 0", "−3, 2/5, 0.666… (6 repeats)"],
    ["Irrational I", "Real numbers that are not rational", "√2, π"],
    ["Real R", "All rational and irrational numbers", "Every point on the real line"]
  ].forEach((row) => {
    const tableRow = document.createElement("tr");
    row.forEach((cell) => tableRow.append(createElement("td", "", cell)));
    body.append(tableRow);
  });
  table.append(head, body);
  return table;
}

function renderSection(section, topic) {
  const container = createElement("section", "lesson-section");
  container.append(createElement("h2", "", section.title));
  (section.paragraphs || []).forEach((paragraph) => {
    container.append(createElement("p", "", paragraph));
  });

  if (section.bullets) {
    const list = createElement("ul", "bullet-list");
    section.bullets.forEach((bullet) => list.append(createElement("li", "", bullet)));
    container.append(list);
  }

  if (section.title === "Two large families") {
    container.append(renderClassificationTable());
  }
  if (section.title === "Read the number line") {
    container.append(renderNumberLine());
  }

  (section.examples || []).forEach((example) => {
    container.append(renderExample(example));
  });

  return container;
}

function renderFact(topic) {
  const aside = createElement("aside", "fact");
  aside.append(
    createElement("h3", "", "💡 Did you know?"),
    createElement("p", "", topic.fact.question)
  );

  const button = createElement("button", "reveal-button", "Reveal explanation");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  const answer = createElement("p", "answer", topic.fact.answer);
  answer.hidden = true;
  answer.id = `fact-answer-${topic.id}`;
  button.setAttribute("aria-controls", answer.id);
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    button.textContent = isOpen ? "Reveal explanation" : "Hide explanation";
    answer.hidden = isOpen;
  });
  aside.append(button, answer);
  return aside;
}

function renderQuestion(question, index, topic) {
  const article = createElement("article", "question");
  const defaultLevel = topic.level[0].startsWith("Core")
    ? "Core"
    : topic.level[0].startsWith("Olympiad")
      ? "Olympiad"
      : "Revision";
  article.append(
    createElement("p", "question-label", `Practice ${index + 1} · ${question.level || defaultLevel}`),
    createElement("p", "question-prompt", question.prompt)
  );

  const options = createElement("ol", "options");
  options.type = "A";
  question.options.forEach((option) => options.append(createElement("li", "", option)));

  const solution = document.createElement("details");
  solution.className = "solution-toggle";
  const summary = createElement("summary", "", "Show answer & explanation");
  const panel = createElement("div", "solution");
  panel.append(createElement(
    "p",
    "",
    `Correct answer: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`
  ));
  panel.append(renderSteps(question.steps));
  solution.append(summary, panel);
  article.append(options, solution);
  return article;
}

function renderTopic(index) {
  const topic = window.apexRealNumberTopics[index];
  if (!topic) {
    showTopicList();
    return;
  }

  landingView.hidden = true;
  lessonView.hidden = false;
  document.querySelector("#breadcrumb-topic").textContent = ` › ${topic.title}`;
  lessonBadges.replaceChildren(...topic.level.map(createBadge));
  lessonContent.replaceChildren(
    createElement("p", "eyebrow", `TOPIC ${index + 1} · ${topic.level[0]}`),
    createElement("h1", "", topic.title),
    createElement("p", "lesson-intro", topic.intro)
  );

  topic.sections.forEach((section) => lessonContent.append(renderSection(section, topic)));

  const examples = createElement("section", "lesson-section");
  examples.append(createElement("h2", "", "A few more worked examples"));
  topic.examples.forEach((example) => examples.append(renderExample(example)));
  lessonContent.append(examples);

  const olympiad = createElement("aside", "callout tip");
  olympiad.append(
    createElement("h3", "", "Think Like an Olympiad Student"),
    createElement("p", "", topic.olympiad)
  );
  const mistake = createElement("aside", "callout warning");
  mistake.append(
    createElement("h3", "", "Common mistake · Remember this"),
    createElement("p", "", topic.mistake)
  );
  lessonContent.append(olympiad, mistake, renderFact(topic));

  const practice = createElement("section", "lesson-section");
  practice.append(
    createElement("h2", "", "Practice questions"),
    createElement("p", "", "Try each question at your own pace. Reveal a worked explanation whenever you are ready; nothing is timed or scored.")
  );
  const questions = createElement("div", "question-list");
  topic.questions.forEach((question, questionIndex) => {
    questions.append(renderQuestion(question, questionIndex, topic));
  });
  practice.append(questions);
  lessonContent.append(practice);

  const previous = document.querySelector("#previous-topic");
  const next = document.querySelector("#next-topic");
  previous.disabled = index === 0;
  next.disabled = index === window.apexRealNumberTopics.length - 1;
  previous.onclick = () => navigateToTopic(index - 1);
  next.onclick = () => navigateToTopic(index + 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showTopicList() {
  lessonView.hidden = true;
  landingView.hidden = false;
  document.querySelector("#breadcrumb-topic").textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function topicIndexFromHash() {
  const id = window.location.hash.slice(1);
  return window.apexRealNumberTopics.findIndex((topic) => topic.id === id);
}

function navigateToTopic(index) {
  const topic = window.apexRealNumberTopics[index];
  if (!topic) {
    return;
  }
  window.history.pushState({}, "", `#${topic.id}`);
  renderTopic(index);
}

async function checkAccount() {
  try {
    const response = await fetch("/api/auth/me");
    if (response.status === 401) {
      window.location.assign("/");
      return;
    }
    if (!response.ok) {
      throw new Error("Apex could not check your learning path. Please return to the dashboard and try again.");
    }

    const account = await response.json();
    if (
      account.exam !== "Math Olympiad" ||
      account.exam_focus !== "SOF IMO" ||
      account.school_class !== 10
    ) {
      landingView.hidden = true;
      accessMessage.hidden = false;
      accessMessage.textContent =
        "Real Numbers lessons are currently available for Class 10 SOF IMO learners. Check your Olympiad and class in your Profile.";
      const profileLink = createElement("a", "back-link", "Open Profile");
      profileLink.href = "/profile?tab=profile";
      accessMessage.append(" ", profileLink);
      return;
    }

    validateTopics(window.apexRealNumberTopics);
    renderTopicList();
    const requestedIndex = topicIndexFromHash();
    if (requestedIndex >= 0) {
      renderTopic(requestedIndex);
    }
  } catch (error) {
    console.error("Could not load the Real Numbers learning module.", error);
    landingView.hidden = true;
    accessMessage.hidden = false;
    accessMessage.textContent =
      error.message || "Apex could not reach its backend. Please try again.";
  }
}

topicList.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const button = event.target.closest("[data-topic-id]");
  if (!(button instanceof HTMLButtonElement)) {
    return;
  }
  const index = window.apexRealNumberTopics.findIndex(
    (topic) => topic.id === button.dataset.topicId
  );
  navigateToTopic(index);
});

document.querySelector("#back-to-topics").addEventListener("click", () => {
  window.history.pushState({}, "", window.location.pathname);
  showTopicList();
});

window.addEventListener("popstate", () => {
  const index = topicIndexFromHash();
  if (index >= 0) {
    renderTopic(index);
  } else {
    showTopicList();
  }
});

checkAccount();
