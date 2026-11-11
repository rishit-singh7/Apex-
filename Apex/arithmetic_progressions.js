const topicList = document.querySelector("#ap-topic-list");
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

function validateTopics(topics) {
  if (!Array.isArray(topics) || topics.length !== 8) {
    throw new Error("The Arithmetic Progressions lessons could not be loaded. Please refresh the page.");
  }

  topics.forEach((topic) => {
    if (
      !topic.id ||
      !topic.title ||
      !Array.isArray(topic.level) ||
      !Array.isArray(topic.questions) ||
      topic.questions.length < 5 ||
      !topic.fact?.question ||
      !topic.fact?.answer
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
        question.steps.length < 3 ||
        !question.level
      ) {
        throw new Error(`Practice question ${index + 1} in "${topic.title}" is incomplete.`);
      }
    });
  });
}

function createBadge(label) {
  const badge = createElement("span", "badge", label);
  if (label.includes("Olympiad") || label.includes("Extension") || label.includes("enrichment")) {
    badge.classList.add("extension");
  } else if (label.includes("Revision") || label.includes("Quick reference")) {
    badge.classList.add("revision");
  }
  return badge;
}

function renderTopicList() {
  topicList.replaceChildren();
  window.apexArithmeticProgressionTopics.forEach((topic, index) => {
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

function renderNumberLine() {
  const figure = createElement("figure", "visual-card");
  figure.append(createElement("h3", "", "Four terms, equal jumps"));
  const svg = createSvgElement("svg", {
    viewBox: "0 0 640 190",
    class: "visual-svg",
    role: "img",
    "aria-label": "A number line shows the arithmetic progression 2, 5, 8, 11 at equally spaced positions, with each step equal to plus 3."
  });
  svg.append(
    createSvgElement("title", {}, "Number line for the AP 2, 5, 8, 11"),
    createSvgElement("desc", {}, "Four equally spaced points are labelled a1 equals 2, a2 equals 5, a3 equals 8, and a4 equals 11. Each step is plus 3.")
  );
  svg.append(createSvgElement("line", {
    x1: 68, y1: 108, x2: 572, y2: 108, class: "numberline"
  }));
  const points = [2, 5, 8, 11];
  points.forEach((value, index) => {
    const x = 82 + index * 158;
    svg.append(
      createSvgElement("line", {
        x1: x, y1: 96, x2: x, y2: 120, class: "numberline-tick"
      }),
      createSvgElement("circle", {
        cx: x, cy: 108, r: 7, class: "numberline-point"
      }),
      createSvgElement("text", {
        x, y: 145, class: "svg-label", "text-anchor": "middle"
      }, String(value)),
      createSvgElement("text", {
        x, y: 76, class: "svg-label", "text-anchor": "middle"
      }, `a${index + 1}`)
    );
    if (index < points.length - 1) {
      const middle = x + 79;
      svg.append(createSvgElement("text", {
        x: middle, y: 101, class: "tick-label", "text-anchor": "middle"
      }, "+3"));
    }
  });
  figure.append(svg, createElement("figcaption", "visual-caption", "Every neighbouring pair is 3 apart, so the common difference is d = 3."));
  return figure;
}

function renderSumPairing() {
  const figure = createElement("figure", "visual-card");
  figure.append(createElement("h3", "", "Pair the same AP from opposite ends"));
  const forward = createElement("div", "pair-row");
  forward.append(createElement("span", "pair-label", "Forwards"));
  [2, 5, 8, 11, 14, 17].forEach((value) => {
    forward.append(createElement("span", "pair-number", String(value)));
  });
  const reverse = createElement("div", "pair-row reverse");
  reverse.append(createElement("span", "pair-label", "Backwards"));
  [17, 14, 11, 8, 5, 2].forEach((value) => {
    reverse.append(createElement("span", "pair-number", String(value)));
  });
  figure.append(
    forward,
    reverse,
    createElement("figcaption", "pair-total", "Each column sums to 19. Six terms give 2S₆ = 6 × 19, so S₆ = 57.")
  );
  figure.setAttribute("aria-label", "Pairing the AP 2, 5, 8, 11, 14, 17 with its reverse. Every pair sums to 19, giving total 57.");
  return figure;
}

function graphPointY(first, difference, n) {
  return first + (n - 1) * difference;
}

function renderApGraph(graph) {
  const width = 640;
  const height = 370;
  const left = 66;
  const right = 612;
  const top = 35;
  const bottom = 310;
  const xMin = 0;
  const xMax = 7;
  const yMin = -4;
  const yMax = 20;
  const mapX = (n) => left + (n - xMin) / (xMax - xMin) * (right - left);
  const mapY = (value) => bottom - (value - yMin) / (yMax - yMin) * (bottom - top);
  const figure = createElement("figure", "visual-card");
  figure.append(createElement("h3", "", graph.title));
  const svg = createSvgElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    class: "visual-svg",
    role: "img",
    "aria-label": graph.description
  });
  svg.append(
    createSvgElement("title", {}, graph.title),
    createSvgElement("desc", {}, graph.description)
  );

  for (let value = yMin; value <= yMax; value += 4) {
    const y = mapY(value);
    svg.append(createSvgElement("line", {
      x1: left, y1: y, x2: right, y2: y, class: "grid-line"
    }));
    svg.append(createSvgElement("text", {
      x: left - 10, y: y + 4, class: "tick-label", "text-anchor": "end"
    }, String(value)));
  }
  for (let n = xMin; n <= xMax; n += 1) {
    const x = mapX(n);
    svg.append(createSvgElement("line", {
      x1: x, y1: top, x2: x, y2: bottom, class: "grid-line"
    }));
    svg.append(createSvgElement("text", {
      x, y: bottom + 21, class: "tick-label", "text-anchor": "middle"
    }, String(n)));
  }

  svg.append(
    createSvgElement("line", {
      x1: left, y1: mapY(0), x2: right, y2: mapY(0), class: "axis-line"
    }),
    createSvgElement("line", {
      x1: mapX(0), y1: top, x2: mapX(0), y2: bottom, class: "axis-line"
    }),
    createSvgElement("text", {
      x: right - 4, y: bottom + 47, class: "svg-label", "text-anchor": "end"
    }, "Term number n"),
    createSvgElement("text", {
      x: 16, y: (top + bottom) / 2, class: "svg-label",
      "text-anchor": "middle", transform: `rotate(-90 16 ${(top + bottom) / 2})`
    }, "Term value aₙ")
  );

  const intercept = graph.first - graph.difference;
  const lineStart = mapY(intercept);
  const lineEnd = mapY(graph.first + (xMax - 1) * graph.difference);
  svg.append(createSvgElement("path", {
    d: `M${mapX(0)},${lineStart} L${mapX(xMax)},${lineEnd}`,
    class: "ap-line"
  }));
  for (let n = 1; n <= 6; n += 1) {
    const value = graphPointY(graph.first, graph.difference, n);
    const x = mapX(n);
    const y = mapY(value);
    svg.append(
      createSvgElement("circle", { cx: x, cy: y, r: 5, class: "ap-point" }),
      createSvgElement("text", {
        x, y: y + (value >= 14 ? 17 : -9), class: "ap-point-label", "text-anchor": "middle"
      }, `(${n}, ${value})`)
    );
  }
  svg.append(createSvgElement("text", {
    x: right - 8, y: top + 16, class: "svg-label", "text-anchor": "end"
  }, `d = slope = ${graph.difference}`));
  svg.append(createSvgElement("text", {
    x: mapX(0) + 8, y: mapY(intercept) - 7, class: "tick-label"
  }, `line intercept (${0}, ${intercept})`));
  figure.append(svg, createElement("figcaption", "visual-caption", `${graph.rule}. AP terms are the plotted points at whole-number n = 1, 2, 3, …; the straight line is an extension between them.`));
  return figure;
}

function renderVisual(kind) {
  if (kind === "number-line") {
    return renderNumberLine();
  }
  if (kind === "sum-pairing") {
    return renderSumPairing();
  }
  if (kind === "ap-graphs") {
    const section = createElement("section", "lesson-section visual-section");
    section.append(
      createElement("h2", "", "Two APs, two straight-line patterns"),
      createElement("p", "", "The axes use term position n and term value aₙ. The common difference is the slope; labels show exact plotted points and the extended line’s intercept.")
    );
    const graphs = [
      {
        title: "Increasing AP: 2, 5, 8, 11, …",
        first: 2,
        difference: 3,
        rule: "aₙ = 3n − 1; line intercept at n = 0 is −1.",
        description: "Graph of the increasing AP with exact points (1, 2), (2, 5), (3, 8), (4, 11), (5, 14), and (6, 17). Its slope is 3 and the extended line crosses the value axis at negative 1."
      },
      {
        title: "Decreasing AP: 14, 11, 8, 5, …",
        first: 14,
        difference: -3,
        rule: "aₙ = 17 − 3n; line intercept at n = 0 is 17.",
        description: "Graph of the decreasing AP with exact points (1, 14), (2, 11), (3, 8), (4, 5), (5, 2), and (6, negative 1). Its slope is negative 3 and the extended line crosses the value axis at 17."
      }
    ];
    graphs.forEach((graph) => section.append(renderApGraph(graph)));
    return section;
  }
  return null;
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
    createElement("h3", "", "Did You Know? · Pause and think"),
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

function renderQuestion(question, index) {
  const card = createElement("article", "question-card");
  card.append(
    createElement("p", "question-number", `Practice ${index + 1} · ${question.level}`),
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
  const topics = window.apexArithmeticProgressionTopics;
  const topic = topics[index];
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

  const visual = renderVisual(topic.visual);
  if (visual) {
    lessonContent.append(visual);
  }
  topic.sections.forEach((section) => lessonContent.append(renderSection(section)));

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
    createElement("p", "", "Try each question on paper first. Reveal the worked answer when you are ready; nothing is timed or scored.")
  );
  const questions = createElement("div", "question-list");
  topic.questions.forEach((question, questionIndex) => {
    questions.append(renderQuestion(question, questionIndex));
  });
  practice.append(questions);
  lessonContent.append(practice);

  const previous = document.querySelector("#previous-topic");
  const next = document.querySelector("#next-topic");
  previous.disabled = index === 0;
  next.disabled = index === topics.length - 1;
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
  return window.apexArithmeticProgressionTopics.findIndex((topic) => topic.id === id);
}

function navigateToTopic(index) {
  const topic = window.apexArithmeticProgressionTopics[index];
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
        "Arithmetic Progressions lessons are currently available for Class 10 SOF IMO learners. Check your Olympiad and class in your Profile.";
      const profileLink = createElement("a", "back-link", "Open Profile");
      profileLink.href = "/profile?tab=profile";
      accessMessage.append(" ", profileLink);
      return;
    }

    validateTopics(window.apexArithmeticProgressionTopics);
    renderTopicList();
    const requestedIndex = topicIndexFromHash();
    if (requestedIndex >= 0) {
      renderTopic(requestedIndex);
    }
  } catch (error) {
    console.error("Could not load the Arithmetic Progressions learning module.", error);
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
  const index = window.apexArithmeticProgressionTopics.findIndex(
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
