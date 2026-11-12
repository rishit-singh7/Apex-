const topicList = document.querySelector("#linear-equation-topic-list");
const landingView = document.querySelector("#landing-view");
const lessonView = document.querySelector("#lesson-view");
const lessonContent = document.querySelector("#lesson-content");
const lessonBadges = document.querySelector("#lesson-badges");
const accessMessage = document.querySelector("#access-message");
const svgNamespace = "http://www.w3.org/2000/svg";

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

function validateTopicContent(topics) {
  if (!Array.isArray(topics) || topics.length !== 8) {
    throw new Error("The Linear Equations lessons could not be loaded. Please refresh the page.");
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
        question.steps.length < 3
      ) {
        throw new Error(`Practice question ${index + 1} in "${topic.title}" is incomplete.`);
      }
    });
  });
}

function createBadge(label) {
  const badge = createElement("span", "badge", label);
  if (label.includes("Olympiad") || label.includes("Extension")) {
    badge.classList.add("extension");
  } else if (label.includes("Revision")) {
    badge.classList.add("revision");
  }
  return badge;
}

function renderTopicList() {
  topicList.replaceChildren();
  window.apexLinearEquationTopics.forEach((topic, index) => {
    const button = createElement("button", "topic-card");
    button.type = "button";
    button.dataset.topicId = topic.id;

    const content = createElement("span");
    content.append(
      createElement("h2", "", `${index + 1}. ${topic.title}`),
      createElement("p", "", topic.summary)
    );
    const badges = createElement("span", "topic-badges");
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
  const details = createElement("details", "worked-example");
  details.append(
    createElement("summary", "", example.title),
    renderSteps(example.steps)
  );
  return details;
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

  const svg = createSvgElement("svg", {
    viewBox: "0 0 540 330",
    class: "graph-svg",
    role: "img",
    "aria-label": `${graph.title}. ${graph.lines.map((line) => line.label).join(" and ")}`
  });
  svg.append(createSvgElement("title", {}, graph.title));
  svg.append(createSvgElement(
    "desc",
    {},
    "A coordinate grid with labelled x and y axes, both equation lines, and their shared point where applicable."
  ));

  const originX = 270;
  const axisY = 165;
  const scale = 40;
  const xPosition = (value) => originX + value * scale;
  const yPosition = (value) => axisY - value * scale;

  for (let value = -5; value <= 5; value += 1) {
    const x = xPosition(value);
    svg.append(createSvgElement("line", {
      x1: x, y1: 35, x2: x, y2: 295, class: "graph-gridline"
    }));
    if (value !== 0) {
      svg.append(createSvgElement("text", {
        x, y: axisY + 17, class: "graph-text", "text-anchor": "middle"
      }, String(value)));
    }

    const y = yPosition(value);
    svg.append(createSvgElement("line", {
      x1: 55, y1: y, x2: 500, y2: y, class: "graph-gridline"
    }));
    if (value !== 0) {
      svg.append(createSvgElement("text", {
        x: originX - 9, y: y + 3, class: "graph-text", "text-anchor": "end"
      }, String(value)));
    }
  }

  svg.append(createSvgElement("line", {
    x1: 55, y1: axisY, x2: 505, y2: axisY, class: "graph-axis"
  }));
  svg.append(createSvgElement("line", {
    x1: originX, y1: 35, x2: originX, y2: 295, class: "graph-axis"
  }));
  svg.append(createSvgElement("text", { x: 508, y: axisY + 4, class: "graph-label" }, "x"));
  svg.append(createSvgElement("text", { x: originX + 7, y: 30, class: "graph-label" }, "y"));

  graph.lines.forEach((line) => {
    const first = line.b === 0
      ? { x: line.c / line.a, y: -10 }
      : { x: -10, y: (line.c - line.a * -10) / line.b };
    const second = line.b === 0
      ? { x: line.c / line.a, y: 10 }
      : { x: 10, y: (line.c - line.a * 10) / line.b };
    svg.append(createSvgElement("line", {
      x1: xPosition(first.x),
      y1: yPosition(first.y),
      x2: xPosition(second.x),
      y2: yPosition(second.y),
      class: `graph-line ${line.color}`
    }));
  });

  if (graph.intersection) {
    const point = graph.intersection;
    svg.append(createSvgElement("circle", {
      cx: xPosition(point.x),
      cy: yPosition(point.y),
      r: 5,
      class: "graph-intersection"
    }));
    svg.append(createSvgElement("text", {
      x: xPosition(point.x) + 8,
      y: yPosition(point.y) - 8,
      class: "graph-label"
    }, `(${point.x}, ${point.y})`));
  }

  const legend = createElement("figcaption", "graph-legend");
  graph.lines.forEach((line) => {
    const item = createElement("span", "legend-item");
    item.append(createElement("span", `legend-swatch ${line.color}`), document.createTextNode(line.label));
    legend.append(item);
  });
  figure.append(svg, legend);
  return figure;
}

function renderSection(section) {
  const container = createElement("section", "lesson-section");
  container.append(createElement("h2", "", section.title));

  (section.paragraphs || []).forEach((paragraph) => {
    container.append(createElement("p", "math-copy", paragraph));
  });

  if (section.bullets) {
    const list = createElement("ul", "bullet-list");
    section.bullets.forEach((bullet) => list.append(createElement("li", "", bullet)));
    container.append(list);
  }

  (section.examples || []).forEach((example) => container.append(renderExample(example)));
  return container;
}

function renderFact(topic) {
  const card = createElement("aside", "fact-card");
  card.append(
    createElement("h3", "", "💡 Did you know?"),
    createElement("p", "", topic.fact.question)
  );

  const button = createElement("button", "reveal-button", "Reveal answer");
  button.type = "button";
  button.setAttribute("aria-expanded", "false");
  const answer = createElement("p", "answer-panel", topic.fact.answer);
  answer.hidden = true;
  answer.id = `fact-answer-${topic.id}`;
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

function renderQuestion(question, index, topic) {
  const card = createElement("article", "question-card");
  const label = question.level || (topic.level[0].startsWith("Olympiad") ? "Olympiad" : "Core");
  card.append(
    createElement("p", "question-number", `Practice ${index + 1} · ${label}`),
    createElement("p", "question-prompt", question.prompt)
  );

  const options = createElement("ol", "option-list");
  options.type = "A";
  question.options.forEach((option) => options.append(createElement("li", "", option)));

  const details = document.createElement("details");
  const summary = createElement("summary", "", "Show answer & explanation");
  const solution = createElement("div", "solution");
  solution.append(createElement(
    "p",
    "",
    `Correct answer: ${String.fromCharCode(65 + question.answer)}. ${question.options[question.answer]}`
  ));
  solution.append(renderSteps(question.steps));
  details.append(summary, solution);
  card.append(options, details);
  return card;
}

function renderTopic(index) {
  const topic = window.apexLinearEquationTopics[index];
  if (!topic) {
    showLanding();
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

  topic.sections.forEach((section) => lessonContent.append(renderSection(section)));
  if (topic.graph) {
    const graphSection = createElement("section", "lesson-section");
    graphSection.append(createElement("h2", "", "See the lines"));
    graphSection.append(renderGraph(topic.graph));
    lessonContent.append(graphSection);
  }
  if (topic.graphs) {
    const graphSection = createElement("section", "lesson-section");
    graphSection.append(createElement("h2", "", "Three pictures, three outcomes"));
    const grid = createElement("div", "graph-grid");
    topic.graphs.forEach((graph) => grid.append(renderGraph(graph)));
    graphSection.append(grid);
    lessonContent.append(graphSection);
  }

  const examples = createElement("section", "lesson-section");
  examples.append(createElement("h2", "", "More worked examples"));
  topic.examples.forEach((example) => examples.append(renderExample(example)));
  lessonContent.append(examples);

  const tip = createElement("aside", "callout extension");
  tip.append(
    createElement("h3", "", "Think Like an Olympiad Student"),
    createElement("p", "", topic.olympiad)
  );
  const warning = createElement("aside", "callout warning");
  warning.append(
    createElement("h3", "", "Common Mistake · Remember This"),
    createElement("p", "", topic.mistake)
  );
  lessonContent.append(tip, warning, renderFact(topic));

  const practice = createElement("section", "lesson-section");
  practice.append(
    createElement("h2", "", "Practice questions"),
    createElement("p", "", "Try each question at your own pace. Reveal a worked explanation when you are ready; nothing is timed or scored.")
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
  next.disabled = index === window.apexLinearEquationTopics.length - 1;
  previous.onclick = () => navigateToTopic(index - 1);
  next.onclick = () => navigateToTopic(index + 1);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showLanding() {
  lessonView.hidden = true;
  landingView.hidden = false;
  document.querySelector("#breadcrumb-topic").textContent = "";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function topicIndexFromHash() {
  const id = window.location.hash.slice(1);
  return window.apexLinearEquationTopics.findIndex((topic) => topic.id === id);
}

function navigateToTopic(index) {
  const topic = window.apexLinearEquationTopics[index];
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
        "Linear Equations lessons are currently available for Class 10 SOF IMO learners. Check your Olympiad and class in your Profile.";
      const profileLink = createElement("a", "back-link", "Open Profile");
      profileLink.href = "/profile?tab=profile";
      accessMessage.append(" ", profileLink);
      return;
    }

    validateTopicContent(window.apexLinearEquationTopics);
    renderTopicList();
    const requestedIndex = topicIndexFromHash();
    if (requestedIndex >= 0) {
      renderTopic(requestedIndex);
    }
  } catch (error) {
    console.error("Could not load the Linear Equations learning module.", error);
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
  const index = window.apexLinearEquationTopics.findIndex(
    (topic) => topic.id === button.dataset.topicId
  );
  navigateToTopic(index);
});

document.querySelector("#back-to-topics").addEventListener("click", () => {
  window.history.pushState({}, "", window.location.pathname);
  showLanding();
});

window.addEventListener("popstate", () => {
  const index = topicIndexFromHash();
  if (index >= 0) {
    renderTopic(index);
  } else {
    showLanding();
  }
});

checkAccount();
