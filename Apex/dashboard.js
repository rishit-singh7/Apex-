const views = {
  home: document.querySelector("#home-view"),
  progress: document.querySelector("#progress-view"),
  updates: document.querySelector("#updates-view"),
  profile: document.querySelector("#profile-view")
};
const navigationButtons = document.querySelectorAll(".nav-button");
const headerGreeting = document.querySelector("#header-greeting");
const logoutButton = document.querySelector("#logout-button");
const profileMessage = document.querySelector("#profile-message");
const editLearningPath = document.querySelector("#edit-learning-path");

const mathematicalTopics = [
  "Real Numbers",
  "Polynomials",
  "Pair of Linear Equations in Two Variables",
  "Quadratic Equations",
  "Arithmetic Progressions",
  "Triangles",
  "Coordinate Geometry",
  "Introduction to Trigonometry",
  "Some Applications of Trigonometry",
  "Circles",
  "Areas Related to Circles",
  "Surface Areas and Volumes",
  "Statistics",
  "Probability"
];

const nsoTopics = {
  "nso-logical-reasoning-topics": ["Logical Reasoning"],
  "chemistry-topics": [
    "Chemical Reactions and Equations",
    "Acids, Bases and Salts",
    "Metals and Non-metals",
    "Carbon and its Compounds"
  ],
  "physics-topics": [
    "Light – Reflection and Refraction",
    "The Human Eye and the Colourful World",
    "Electricity",
    "Magnetic Effects of Electric Current"
  ],
  "biology-topics": [
    "Life Processes",
    "Control and Coordination",
    "Reproduction in Organisms",
    "Heredity"
  ],
  "environmental-science-topics": ["Our Environment"],
  "nso-achievers-topics": [
    "Higher-Order Thinking Questions (HOTs)"
  ]
};

const preparationLevels = {
  beginner: "Just getting started",
  "some-preparation": "Some initial preparation completed",
  "well-prepared": "Well prepared; strengthening skills",
  "focused-revision": "Focused revision"
};

function showView(viewName) {
  Object.entries(views).forEach(([name, view]) => {
    view.hidden = name !== viewName;
  });

  navigationButtons.forEach((button) => {
    if (button.dataset.view === viewName) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function createTopicButton(topicName) {
  const isPolynomialsLink = topicName === "Polynomials";
  const isLinearEquationsLink =
    topicName === "Pair of Linear Equations in Two Variables";
  const isQuadraticEquationsLink = topicName === "Quadratic Equations";
  const isArithmeticProgressionsLink = topicName === "Arithmetic Progressions";
  const button = document.createElement(
    isPolynomialsLink ||
      isLinearEquationsLink ||
      isQuadraticEquationsLink ||
      isArithmeticProgressionsLink
      ? "a"
      : "button"
  );
  if (isPolynomialsLink) {
    button.href = "/polynomials";
  } else if (isLinearEquationsLink) {
    button.href = "/linear-equations";
  } else if (isQuadraticEquationsLink) {
    button.href = "/quadratic-equations";
  } else if (isArithmeticProgressionsLink) {
    button.href = "/arithmetic-progressions";
  } else {
    button.type = "button";
  }
  button.className = "topic-button";
  button.dataset.topic = topicName;

  const label = document.createElement("span");
  label.textContent = topicName;
  const arrow = document.createElement("span");
  arrow.className = "topic-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = "›";

  button.append(label, arrow);
  return button;
}

function renderMathematicalTopics() {
  const topicGrid = document.querySelector("#mathematical-topics");
  mathematicalTopics.forEach((topic) => {
    topicGrid.append(createTopicButton(topic));
  });
}

function renderNsoTopics() {
  Object.entries(nsoTopics).forEach(([containerId, topics]) => {
    const topicGrid = document.querySelector(`#${containerId}`);
    topics.forEach((topic) => {
      topicGrid.append(createTopicButton(topic));
    });
  });
}

function showTopicSelection(topicName, selectedButton) {
  document.querySelectorAll(".topic-button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button === selectedButton));
  });

  document.querySelector("#selected-topic-title").textContent = topicName;
  document.querySelector("#selected-topic-description").textContent =
    "You selected this topic. Interactive lessons and practice questions for this topic are the next learning features to add.";
  document.querySelector("#selected-topic").hidden = false;
  document.querySelector("#selected-topic").scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}

function showProfileError(message) {
  profileMessage.textContent = message;
  profileMessage.classList.add("is-error");
}

function showAccountDetails(account) {
  document.querySelector("#profile-name").textContent = account.name;
  document.querySelector("#profile-email").textContent = account.email;
  document.querySelector("#profile-age").textContent = String(account.age);
  document.querySelector("#profile-exam").textContent = account.exam;
  document.querySelector("#profile-focus").textContent = account.exam_focus || "Not selected";
  document.querySelector("#profile-class").textContent = account.school_class
    ? `Class ${account.school_class}`
    : "Not selected";
  document.querySelector("#profile-preparation").textContent =
    preparationLevels[account.preparation_level] || "Not selected";

  document.querySelector("#profile-welcome").textContent =
    `Welcome to your profile, ${account.name}. Your details are saved on this computer.`;
  headerGreeting.textContent = `Welcome, ${account.name}`;
  document.querySelector("#learning-summary-title").textContent = account.exam_focus
    ? `${account.exam_focus} learning path`
    : `${account.exam} learning path`;
  document.querySelector("#learning-summary-details").textContent = account.school_class
    ? `Class ${account.school_class} · ${preparationLevels[account.preparation_level] || "Preparation saved"}`
    : "Your learning choices are saved";
  document.querySelector("#progress-summary").textContent = account.exam_focus
    ? `Your ${account.exam_focus} learning path for Class ${account.school_class || "—"} is ready.`
    : `Your ${account.exam} learning path is ready.`;

  const isOlympiadLearner = ["Math Olympiad", "Science Olympiad"].includes(account.exam);
  editLearningPath.hidden = !isOlympiadLearner;

  const isSofImoLearner =
    account.exam === "Math Olympiad" &&
    account.exam_focus === "SOF IMO";
  const isSofNsoClass10Learner =
    account.exam === "Science Olympiad" &&
    account.exam_focus === "SOF NSO" &&
    account.school_class === 10;

  document.querySelector("#sof-imo-content").hidden = !isSofImoLearner;
  document.querySelector("#sof-nso-class-10-content").hidden = !isSofNsoClass10Learner;
  document.querySelector("#other-learning-path").hidden =
    isSofImoLearner || isSofNsoClass10Learner;
}

async function loadProfile() {
  try {
    const response = await fetch("/api/auth/me");
    if (response.status === 401) {
      window.location.assign("/");
      return;
    }
    if (!response.ok) {
      throw new Error("Apex couldn't load your profile. Please refresh and try again.");
    }

    const account = await response.json();
    const isOlympiadLearner = ["Math Olympiad", "Science Olympiad"].includes(account.exam);
    const needsLearningPath = isOlympiadLearner && (
      !account.exam_focus ||
      !account.preparation_level ||
      !account.school_class
    );

    if (needsLearningPath) {
      window.location.assign("/onboarding");
      return;
    }

    showAccountDetails(account);
  } catch (error) {
    console.error("Could not load the Apex profile.", error);
    document.querySelector("#profile-welcome").textContent = "We couldn't load your profile.";
    showProfileError(error.message || "Apex couldn't reach its backend. Please try again.");
  }
}

navigationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showView(button.dataset.view);
    const url = new URL(window.location.href);
    if (button.dataset.view === "home") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", button.dataset.view);
    }
    window.history.replaceState({}, "", url);
  });
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  const topicButton = event.target.closest(".topic-button");
  if (topicButton instanceof HTMLButtonElement) {
    if (topicButton.dataset.topic === "Real Numbers") {
      window.location.assign("/real-numbers");
      return;
    }
    showTopicSelection(topicButton.dataset.topic, topicButton);
  }
});

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      throw new Error("Apex couldn't log you out. Please try again.");
    }
    window.location.assign("/");
  } catch (error) {
    console.error("Could not log out of Apex.", error);
    showProfileError(error.message || "Apex couldn't reach its backend. Please try again.");
  } finally {
    logoutButton.disabled = false;
  }
});

renderMathematicalTopics();
renderNsoTopics();
const requestedView = new URLSearchParams(window.location.search).get("tab");
if (requestedView && Object.hasOwn(views, requestedView)) {
  showView(requestedView);
}
loadProfile();
