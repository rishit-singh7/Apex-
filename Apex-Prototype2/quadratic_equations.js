const topicList = document.querySelector("#quadratic-topic-list");
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

function validateTopics(topics) {
  if (!Array.isArray(topics) || topics.length !== 9) {
    throw new Error("The Quadratic Equations lessons could not be loaded. Please refresh the page.");
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
  if (label.includes("Olympiad") || label.includes("Extension")) {
    badge.classList.add("extension");
  } else if (label.includes("Revision") || label.includes("Prerequisite")) {
    badge.classList.add("revision");
  }
  return badge;
}

function renderTopicList() {
  topicList.replaceChildren();
  window.apexQuadraticTopics.forEach((topic, index) => {
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

function renderParabola(graph) {
  const figure = createElement("figure", "graph-card parabola-card");
  const discriminant = graph.b * graph.b - 4 * graph.a * graph.c;
  const rootDescription = discriminant < 0
    ? "No real x-intercepts."
    : discriminant === 0
      ? `One repeated real root at x = ${-graph.b / (2 * graph.a)}.`
      : `Two real roots at x = ${graph.rootLabels.join(" and ")}.`;
  figure.append(createElement("h3", "", graph.title));

  const svg = createSvgElement("svg", {
    viewBox: "0 0 520 340",
    class: "graph-svg",
    role: "img",
    "aria-label": `Graph of y = ${graph.a}x squared + (${graph.b})x + (${graph.c}). ${rootDescription}`
  });
  svg.append(createSvgElement("title", {}, graph.title));
  svg.append(createSvgElement(
    "desc",
    {},
    `The plotted parabola has vertex at (${formatNumber(-graph.b / (2 * graph.a))}, ${formatNumber(graph.a * (-graph.b / (2 * graph.a)) ** 2 + graph.b * (-graph.b / (2 * graph.a)) + graph.c)}). ${rootDescription}`
  ));

  const left = 48;
  const right = 495;
  const top = 36;
  const bottom = 294;
  const mapX = (x) => left + (x - graph.xMin) / (graph.xMax - graph.xMin) * (right - left);
  const mapY = (y) => bottom - (y - graph.yMin) / (graph.yMax - graph.yMin) * (bottom - top);

  for (let x = Math.ceil(graph.xMin); x <= graph.xMax; x += 1) {
    const px = mapX(x);
    svg.append(createSvgElement("line", {
      x1: px, y1: top, x2: px, y2: bottom, class: "graph-gridline"
    }));
    if (x !== 0) {
      svg.append(createSvgElement("text", {
        x: px, y: Math.min(bottom + 18, 322), class: "graph-text", "text-anchor": "middle"
      }, String(x)));
    }
  }
  for (let y = Math.ceil(graph.yMin); y <= graph.yMax; y += 1) {
    const py = mapY(y);
    svg.append(createSvgElement("line", {
      x1: left, y1: py, x2: right, y2: py, class: "graph-gridline"
    }));
    if (y !== 0) {
      svg.append(createSvgElement("text", {
        x: left - 8, y: py + 3, class: "graph-text", "text-anchor": "end"
      }, String(y)));
    }
  }

  if (graph.xMin <= 0 && graph.xMax >= 0) {
    svg.append(createSvgElement("line", {
      x1: mapX(0), y1: top, x2: mapX(0), y2: bottom, class: "graph-axis"
    }));
    svg.append(createSvgElement("text", {
      x: mapX(0) + 6, y: top + 8, class: "graph-label"
    }, "y"));
  }
  if (graph.yMin <= 0 && graph.yMax >= 0) {
    svg.append(createSvgElement("line", {
      x1: left, y1: mapY(0), x2: right, y2: mapY(0), class: "graph-axis"
    }));
    svg.append(createSvgElement("text", {
      x: right - 4, y: mapY(0) - 7, class: "graph-label", "text-anchor": "end"
    }, "x"));
  }

  let pathData = "";
  const sampleCount = 180;
  for (let index = 0; index <= sampleCount; index += 1) {
    const x = graph.xMin + (graph.xMax - graph.xMin) * index / sampleCount;
    const y = graph.a * x * x + graph.b * x + graph.c;
    pathData += `${index === 0 ? "M" : "L"}${mapX(x).toFixed(2)},${mapY(y).toFixed(2)} `;
  }
  svg.append(createSvgElement("path", { d: pathData.trim(), class: "parabola" }));

  if (discriminant >= 0) {
    const squareRoot = Math.sqrt(discriminant);
    const roots = discriminant === 0
      ? [-graph.b / (2 * graph.a)]
      : [(-graph.b - squareRoot) / (2 * graph.a), (-graph.b + squareRoot) / (2 * graph.a)];
    roots.forEach((root, index) => {
      if (root < graph.xMin || root > graph.xMax) {
        return;
      }
      const px = mapX(root);
      const py = mapY(0);
      svg.append(createSvgElement("circle", {
        cx: px, cy: py, r: 5, class: "root-point"
      }));
      const exactLabel = graph.rootLabels[index] || formatNumber(root);
      svg.append(createSvgElement("text", {
        x: px, y: py + 19, class: "root-label", "text-anchor": "middle"
      }, `x = ${exactLabel}`));
    });
  }

  const vertexX = -graph.b / (2 * graph.a);
  const vertexY = graph.a * vertexX * vertexX + graph.b * vertexX + graph.c;
  if (
    discriminant !== 0 &&
    vertexX >= graph.xMin && vertexX <= graph.xMax &&
    vertexY >= graph.yMin && vertexY <= graph.yMax
  ) {
    svg.append(createSvgElement("circle", {
      cx: mapX(vertexX), cy: mapY(vertexY), r: 4, class: "vertex-point"
    }));
    svg.append(createSvgElement("text", {
      x: mapX(vertexX) + 7, y: mapY(vertexY) - 8, class: "vertex-label"
    }, `vertex (${formatNumber(vertexX)}, ${formatNumber(vertexY)})`));
  }

  const caption = createElement("figcaption", "graph-caption");
  caption.append(
    createElement("span", "graph-equation", `y = ${graph.a}x² ${graph.b < 0 ? "−" : "+"} ${Math.abs(graph.b)}x ${graph.c < 0 ? "−" : "+"} ${Math.abs(graph.c)}`),
    createElement("span", "graph-discriminant", `D = ${discriminant} · ${rootDescription}`)
  );
  figure.append(svg, caption);
  return figure;
}

function formatNumber(value) {
  return Number.isInteger(value) ? String(value) : Number(value.toFixed(2)).toString();
}

function renderAnatomy() {
  const visual = createElement("figure", "visual-card equation-anatomy");
  visual.setAttribute("aria-label", "The standard quadratic form with the coefficients a, b and c identified.");
  visual.append(createElement("h3", "", "Meet the parts of ax² + bx + c = 0"));
  const terms = createElement("div", "equation-terms");
  [
    ["ax²", "a · quadratic coefficient"],
    ["bx", "b · linear coefficient"],
    ["c", "c · constant term"],
    ["= 0", "standard-form target"]
  ].forEach(([term, label]) => {
    const item = createElement("div", "equation-term");
    item.append(createElement("strong", "", term), createElement("span", "", label));
    terms.append(item);
  });
  visual.append(terms);
  return visual;
}

function renderFactorBranches() {
  const figure = createElement("figure", "visual-card branch-card");
  figure.append(createElement("h3", "", "One product, two root branches"));
  const svg = createSvgElement("svg", {
    viewBox: "0 0 680 210",
    class: "branch-svg",
    role: "img",
    "aria-label": "The factorised equation (x minus 2)(x minus 3) equals zero branches to x equals 2 or x equals 3."
  });
  svg.append(createSvgElement("title", {}, "Zero-product branching diagram"));
  svg.append(createSvgElement("desc", {}, "Starting from (x − 2)(x − 3) = 0, either x − 2 = 0 giving x = 2, or x − 3 = 0 giving x = 3."));
  const boxes = [
    [170, 15, 340, 42, "Equation: (x − 2)(x − 3) = 0", "branch-root"],
    [22, 89, 270, 42, "Branch 1: x − 2 = 0", "branch-step"],
    [388, 89, 270, 42, "Branch 2: x − 3 = 0", "branch-step"],
    [82, 153, 150, 40, "Root: x = 2", "branch-answer"],
    [448, 153, 150, 40, "Root: x = 3", "branch-answer"]
  ];
  svg.append(createSvgElement("path", { d: "M340 57 L157 89 M340 57 L523 89 M157 131 L157 153 M523 131 L523 153", class: "branch-connector" }));
  boxes.forEach(([x, y, width, height, text, className]) => {
    svg.append(createSvgElement("rect", { x, y, width, height, rx: 9, class: className }));
    svg.append(createSvgElement("text", {
      x: Number(x) + Number(width) / 2,
      y: Number(y) + Number(height) / 2 + 4,
      class: "branch-text",
      "text-anchor": "middle"
    }, text));
  });
  figure.append(svg, createElement("figcaption", "visual-caption", "A product is zero when at least one factor is zero."));
  return figure;
}

function renderSquareArea() {
  const figure = createElement("figure", "visual-card area-card");
  figure.append(createElement("h3", "", "Complete the square by adding the missing corner"));
  const svg = createSvgElement("svg", {
    viewBox: "0 0 440 330",
    class: "area-svg",
    role: "img",
    "aria-label": "A square of side x plus 3 partitioned into x squared, two rectangles of area 3x, and a 3 by 3 square of area 9."
  });
  svg.append(createSvgElement("title", {}, "Area model for (x + 3) squared"));
  svg.append(createSvgElement("desc", {}, "The total area is x squared plus 3x plus 3x plus 9, equal to (x + 3) squared."));
  svg.append(createSvgElement("rect", { x: 90, y: 42, width: 240, height: 240, class: "area-outline" }));
  svg.append(createSvgElement("rect", { x: 90, y: 42, width: 180, height: 180, class: "area-x2" }));
  svg.append(createSvgElement("rect", { x: 270, y: 42, width: 60, height: 180, class: "area-strip" }));
  svg.append(createSvgElement("rect", { x: 90, y: 222, width: 180, height: 60, class: "area-strip" }));
  svg.append(createSvgElement("rect", { x: 270, y: 222, width: 60, height: 60, class: "area-corner" }));
  [
    [180, 130, "x²"], [300, 130, "3x"], [180, 258, "3x"], [300, 258, "9"],
    [210, 25, "x + 3"], [350, 163, "x + 3"]
  ].forEach(([x, y, text]) => {
    svg.append(createSvgElement("text", { x, y, class: "area-label", "text-anchor": "middle" }, text));
  });
  svg.append(createSvgElement("text", { x: 210, y: 310, class: "area-equation", "text-anchor": "middle" }, "x² + 6x + 9 = (x + 3)²"));
  figure.append(svg, createElement("figcaption", "visual-caption", "Each rectangle’s area is its width × height; together the pieces fill the (x + 3) by (x + 3) square."));
  return figure;
}

function renderFormulaFlow() {
  const section = createElement("section", "formula-flow visual-card");
  section.append(createElement("h3", "", "From a quadratic to its roots"));
  [
    ["1", "ax² + bx + c = 0", "Start with a ≠ 0."],
    ["2", "x² + (b/a)x = −c/a", "Divide every term by a."],
    ["3", "(x + b/2a)² = (b² − 4ac)/(4a²)", "Add the square of half the x coefficient."],
    ["4", "(2ax + b)² = b² − 4ac", "Multiply by 4a²."],
    ["5", "x = (−b ± √(b² − 4ac))/(2a)", "Take both square-root branches; then isolate x."]
  ].forEach(([number, formula, explanation]) => {
    const step = createElement("div", "formula-step");
    step.append(
      createElement("span", "formula-step-number", number),
      createElement("strong", "formula-step-equation", formula),
      createElement("span", "formula-step-note", explanation)
    );
    section.append(step);
  });
  return section;
}

function renderVisual(kind) {
  if (kind === "anatomy") {
    return renderAnatomy();
  }
  if (kind === "factor-branches") {
    return renderFactorBranches();
  }
  if (kind === "square-area") {
    return renderSquareArea();
  }
  if (kind === "formula-flow") {
    return renderFormulaFlow();
  }
  if (kind === "discriminant-graphs") {
    const section = createElement("section", "lesson-section visual-section");
    section.append(
      createElement("h2", "", "The discriminant as a picture"),
      createElement("p", "", "These exact parabolas show how the sign of D matches their real x-intercepts. The vertex and roots are calculated from each equation.")
    );
    const grid = createElement("div", "graph-grid");
    window.apexQuadraticTopics
      .find((topic) => topic.id === "discriminant")
      .graphs.forEach((graph) => grid.append(renderParabola(graph)));
    section.append(grid);
    return section;
  }
  if (kind === "rectangle") {
    const visual = createElement("figure", "visual-card rectangle-card");
    visual.append(createElement("h3", "", "Turn the area picture into an equation"));
    const svg = createSvgElement("svg", {
      viewBox: "0 0 500 190",
      class: "rectangle-svg",
      role: "img",
      "aria-label": "A rectangle labelled width w and length w plus 4. Its area is w times (w plus 4), equal to 96 square centimetres."
    });
    svg.append(createSvgElement("title", {}, "Rectangle area model"));
    svg.append(createSvgElement("desc", {}, "A rectangle with sides w and w + 4, area 96 square centimetres, leading to w(w + 4) = 96."));
    svg.append(createSvgElement("rect", { x: 105, y: 35, width: 270, height: 115, rx: 3, class: "rectangle-shape" }));
    svg.append(createSvgElement("text", { x: 240, y: 25, class: "rectangle-label", "text-anchor": "middle" }, "length = w + 4 cm"));
    svg.append(createSvgElement("text", { x: 390, y: 98, class: "rectangle-label" }, "width = w cm"));
    svg.append(createSvgElement("text", { x: 240, y: 100, class: "rectangle-area", "text-anchor": "middle" }, "area = 96 cm²"));
    svg.append(createSvgElement("text", { x: 240, y: 180, class: "rectangle-equation", "text-anchor": "middle" }, "w(w + 4) = 96"));
    visual.append(svg);
    return visual;
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
    createElement("h3", "", "💡 Pause and think"),
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
  const topic = window.apexQuadraticTopics[index];
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

  if (topic.graphs) {
    const graphSection = createElement("section", "lesson-section visual-section");
    graphSection.append(
      createElement("h2", "", "The discriminant as a picture"),
      createElement("p", "", "Compare D with the number of times each parabola meets the x-axis. The graphs use the exact equation shown.")
    );
    const graphGrid = createElement("div", "graph-grid");
    topic.graphs.forEach((graph) => graphGrid.append(renderParabola(graph)));
    graphSection.append(graphGrid);
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
  next.disabled = index === window.apexQuadraticTopics.length - 1;
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
  return window.apexQuadraticTopics.findIndex((topic) => topic.id === id);
}

function navigateToTopic(index) {
  const topic = window.apexQuadraticTopics[index];
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
        "Quadratic Equations lessons are currently available for Class 10 SOF IMO learners. Check your Olympiad and class in your Profile.";
      const profileLink = createElement("a", "back-link", "Open Profile");
      profileLink.href = "/profile?tab=profile";
      accessMessage.append(" ", profileLink);
      return;
    }

    validateTopics(window.apexQuadraticTopics);
    renderTopicList();
    const requestedIndex = topicIndexFromHash();
    if (requestedIndex >= 0) {
      renderTopic(requestedIndex);
    }
  } catch (error) {
    console.error("Could not load the Quadratic Equations learning module.", error);
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
  const index = window.apexQuadraticTopics.findIndex(
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
