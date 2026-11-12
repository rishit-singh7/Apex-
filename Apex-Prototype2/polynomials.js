const topicList = document.querySelector("#polynomial-topic-list");
const landingView = document.querySelector("#landing-view");
const lessonView = document.querySelector("#lesson-view");
const lessonContent = document.querySelector("#lesson-content");
const lessonBadges = document.querySelector("#lesson-badges");
const accessMessage = document.querySelector("#access-message");

const svgNamespace = "http://www.w3.org/2000/svg";

function createElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  if (text !== undefined) {
    element.textContent = text;
  }
  return element;
}

function validateTopicContent(topics) {
  if (!Array.isArray(topics) || topics.length !== 8) {
    throw new Error("The Polynomials lessons could not be loaded. Please refresh the page.");
  }

  topics.forEach((topic) => {
    if (!topic.id || !topic.title || !Array.isArray(topic.questions) || topic.questions.length < 5) {
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
        question.steps.length === 0
      ) {
        throw new Error(`Practice question ${index + 1} in "${topic.title}" is incomplete.`);
      }
    });
  });
}

function createBadge(label) {
  const badge = createElement("span", "badge", label);
  if (label.includes("Extension") || label.includes("Enrichment")) {
    badge.classList.add("extension");
  } else if (label.includes("Revision")) {
    badge.classList.add("revision");
  }
  return badge;
}

function renderTopicList() {
  topicList.replaceChildren();
  window.apexPolynomialTopics.forEach((topic, index) => {
    const button = createElement("button", "topic-card");
    button.type = "button";
    button.dataset.topicId = topic.id;

    const textGroup = createElement("span");
    const title = createElement("h2", "", `${index + 1}. ${topic.title}`);
    const summary = createElement("p", "", topic.summary);
    const badges = createElement("span", "topic-badges");
    topic.level.forEach((label) => badges.append(createBadge(label)));
    textGroup.append(title, summary, badges);

    const arrow = createElement("span", "card-arrow", "›");
    arrow.setAttribute("aria-hidden", "true");
    button.append(textGroup, arrow);
    topicList.append(button);
  });
}

function appendParagraphs(container, paragraphs) {
  paragraphs.forEach((text) => {
    const paragraph = createElement("p", "", text);
    if (/^(α|S =|P =|x²|x³|\d)/u.test(text)) {
      paragraph.classList.add("math");
    }
    container.append(paragraph);
  });
}

function renderWorkedExample(example) {
  const card = createElement("article", "worked-example");
  card.append(createElement("h3", "", example.title));

  const steps = document.createElement("ol");
  example.steps.forEach((step) => {
    steps.append(createElement("li", "", step));
  });
  card.append(steps);
  return card;
}

function createSvgElement(tagName, attributes = {}, text = "") {
  const element = document.createElementNS(svgNamespace, tagName);
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, String(value));
  });
  if (text) {
    element.textContent = text;
  }
  return element;
}

function renderGraph(graph) {
  const figure = createElement("figure", "graph-card");
  figure.append(createElement("h3", "", graph.title));
  figure.append(createElement("p", "math", graph.equation));

  const svg = createSvgElement("svg", {
    viewBox: "0 0 540 270",
    class: "graph-svg",
    role: "img",
    "aria-label": `${graph.equation}; ${graph.kind === "none" ? "no x-axis intersections" : `${graph.roots.length} distinct x-axis ${graph.roots.length === 1 ? "intersection" : "intersections"}`}`
  });
  svg.append(createSvgElement("title", {}, `${graph.title}: ${graph.equation}`));
  svg.append(createSvgElement("desc", {}, "A coordinate graph with labelled axes, grid lines, and the polynomial curve."));

  const originX = 270;
  const axisY = 170;
  const xScale = 58;
  const yScale = 13;
  const xPosition = (x) => originX + x * xScale;
  const yPosition = (y) => axisY - y * yScale;

  [-3, -2, -1, 0, 1, 2, 3].forEach((value) => {
    const x = xPosition(value);
    svg.append(createSvgElement("line", {
      x1: x, y1: 50, x2: x, y2: 235, class: "graph-gridline"
    }));
    if (value !== 0) {
      svg.append(createSvgElement("text", {
        x, y: axisY + 17, class: "graph-text", "text-anchor": "middle"
      }, String(value)));
    }
  });

  [-4, -2, 2, 4, 6, 8].forEach((value) => {
    const y = yPosition(value);
    svg.append(createSvgElement("line", {
      x1: 50, y1: y, x2: 490, y2: y, class: "graph-gridline"
    }));
    svg.append(createSvgElement("text", {
      x: originX - 10, y: y + 3, class: "graph-text", "text-anchor": "end"
    }, String(value)));
  });

  svg.append(createSvgElement("line", {
    x1: 50, y1: axisY, x2: 490, y2: axisY, class: "graph-axis"
  }));
  svg.append(createSvgElement("line", {
    x1: originX, y1: 50, x2: originX, y2: 235, class: "graph-axis"
  }));
  svg.append(createSvgElement("text", {
    x: 493, y: axisY + 4, class: "graph-label"
  }, "x"));
  svg.append(createSvgElement("text", {
    x: originX + 7, y: 48, class: "graph-label"
  }, "y"));

  const constant = graph.kind === "crosses" ? -4 : graph.kind === "none" ? 4 : 0;
  const coordinates = [];
  for (let x = -2.7; x <= 2.701; x += 0.1) {
    const y = x * x + constant;
    coordinates.push(`${coordinates.length === 0 ? "M" : "L"}${xPosition(x).toFixed(1)},${yPosition(y).toFixed(1)}`);
  }
  svg.append(createSvgElement("path", {
    d: coordinates.join(" "),
    class: "graph-curve"
  }));

  graph.roots.forEach((root) => {
    const x = xPosition(root);
    svg.append(createSvgElement("circle", {
      cx: x, cy: axisY, r: 5, class: "graph-zero"
    }));
    svg.append(createSvgElement("text", {
      x, y: axisY + 34, class: "graph-label", "text-anchor": "middle"
    }, `x = ${root}`));
  });

  figure.append(svg);
  return figure;
}

function renderSection(section) {
  const article = createElement("section", "lesson-section");
  article.append(createElement("h2", "", section.title));
  appendParagraphs(article, section.paragraphs);

  if (section.examples?.length) {
    section.examples.forEach((example) => article.append(renderWorkedExample(example)));
  }

  if (section.title === "Read zeroes from a graph") {
    const graphGrid = createElement("div", "graph-grid");
    window.apexPolynomialTopics
      .find((topic) => topic.id === "graphs")
      .graphs.forEach((graph) => graphGrid.append(renderGraph(graph)));
    article.append(graphGrid);
  }

  return article;
}

function renderFact(topic) {
  const card = createElement("aside", "fact-card");
  card.append(createElement("h3", "", "💡 Did you know?"));
  card.append(createElement("p", "", topic.fact.question));

  const button = createElement("button", "reveal-button", "Reveal answer");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");

  const answer = createElement("p", "answer-panel", topic.fact.answer);
  answer.id = `fact-answer-${topic.id}`;
  answer.hidden = true;
  button.setAttribute("aria-controls", answer.id);
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "Reveal answer" : "Hide answer";
    answer.hidden = expanded;
  });
  card.append(button, answer);
  return card;
}

function renderQuestion(question, index) {
  const card = createElement("article", "question-card");
  card.append(createElement("p", "question-number", `Practice ${index + 1}`));
  card.append(createElement("p", "question-prompt", question.prompt));

  const options = createElement("ol", "option-list");
  options.type = "A";
  question.options.forEach((option) => options.append(createElement("li", "", option)));
  card.append(options);

  const details = document.createElement("details");
  const summary = createElement("summary", "", "Show answer & explanation");
  const solution = createElement("div", "solution");
  solution.append(createElement(
    "p",
    "",
    `Correct answer: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`
  ));
  const steps = document.createElement("ol");
  question.steps.forEach((step) => steps.append(createElement("li", "", step)));
  solution.append(steps);
  details.append(summary, solution);
  card.append(details);
  return card;
}

function renderTopic(topicIndex) {
  const topic = window.apexPolynomialTopics[topicIndex];
  if (!topic) {
    showLanding();
    return;
  }

  landingView.hidden = true;
  lessonView.hidden = false;
  lessonBadges.replaceChildren(...topic.level.map(createBadge));
  lessonContent.replaceChildren();

  lessonContent.append(createElement("p", "eyebrow", `TOPIC ${topicIndex + 1} · ${topic.level[0]}`));
  lessonContent.append(createElement("h1", "", topic.title));
  lessonContent.append(createElement("p", "lesson-intro", topic.intro));
  topic.sections.forEach((section) => lessonContent.append(renderSection(section)));

  const workedExamples = createElement("section", "lesson-section");
  workedExamples.append(createElement("h2", "", "Worked examples"));
  topic.examples.forEach((example) => workedExamples.append(renderWorkedExample(example)));
  lessonContent.append(workedExamples);

  const olympiad = createElement("aside", "callout extension");
  olympiad.append(createElement("h3", "", "Think Like an Olympiad Student"));
  olympiad.append(createElement("p", "", topic.olympiad));
  lessonContent.append(olympiad);

  const commonMistake = createElement("aside", "callout warning");
  commonMistake.append(createElement("h3", "", "Common Mistake · Remember This"));
  commonMistake.append(createElement("p", "", topic.mistake));
  lessonContent.append(commonMistake, renderFact(topic));

  const practice = createElement("section", "lesson-section");
  practice.append(createElement("h2", "", "Practice · Learn at your own pace"));
  practice.append(createElement(
    "p",
    "",
    "Try each question on paper if you like. Open “Show answer & explanation” whenever you are ready; there is no timer or score."
  ));
  const questionList = createElement("div", "question-list");
  topic.questions.forEach((question, index) => {
    questionList.append(renderQuestion(question, index));
  });
  practice.append(questionList);
  lessonContent.append(practice);

  const previous = document.querySelector("#previous-topic");
  const next = document.querySelector("#next-topic");
  previous.disabled = topicIndex === 0;
  next.disabled = topicIndex === window.apexPolynomialTopics.length - 1;
  previous.onclick = () => navigateToTopic(topicIndex - 1);
  next.onclick = () => navigateToTopic(topicIndex + 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showLanding() {
  lessonView.hidden = true;
  landingView.hidden = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function topicIndexFromHash() {
  const id = window.location.hash.slice(1);
  return window.apexPolynomialTopics.findIndex((topic) => topic.id === id);
}

function navigateToTopic(index) {
  const topic = window.apexPolynomialTopics[index];
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
      throw new Error("Apex couldn't check your learning path. Please return to the dashboard and try again.");
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
        "Polynomials lessons are currently available for Class 10 SOF IMO learners. Check your Olympiad and class in your Profile.";
      const profileLink = createElement("a", "back-link", "Open Profile");
      profileLink.href = "/profile?tab=profile";
      accessMessage.append(" ", profileLink);
      return;
    }

    validateTopicContent(window.apexPolynomialTopics);
    renderTopicList();

    const requestedIndex = topicIndexFromHash();
    if (requestedIndex >= 0) {
      renderTopic(requestedIndex);
    }
  } catch (error) {
    console.error("Could not load the Polynomials learning module.", error);
    landingView.hidden = true;
    accessMessage.hidden = false;
    accessMessage.textContent =
      error.message || "Apex couldn't reach its backend. Please try again.";
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
  const topicIndex = window.apexPolynomialTopics.findIndex(
    (topic) => topic.id === button.dataset.topicId
  );
  navigateToTopic(topicIndex);
});

document.querySelector("#back-to-topics").addEventListener("click", () => {
  window.history.pushState({}, "", window.location.pathname);
  showLanding();
});

window.addEventListener("popstate", () => {
  const topicIndex = topicIndexFromHash();
  if (topicIndex >= 0) {
    renderTopic(topicIndex);
  } else {
    showLanding();
  }
});

checkAccount();
