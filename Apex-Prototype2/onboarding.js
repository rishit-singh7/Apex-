const focusForm = document.querySelector("#focus-form");
const focusSelect = document.querySelector("#exam-focus");
const preparationSelect = document.querySelector("#preparation-level");
const classSelect = document.querySelector("#school-class");
const learningStep = document.querySelector("#learning-step");
const classStep = document.querySelector("#class-step");
const welcomeMessage = document.querySelector("#welcome-message");
const formMessage = document.querySelector("#form-message");
const nextStepButton = document.querySelector("#next-step-button");
const backStepButton = document.querySelector("#back-step-button");
const saveButton = document.querySelector("#save-button");
const logoutButton = document.querySelector("#logout-button");

const olympiadsByExam = {
  "Math Olympiad": [
    ["SOF IMO", "SOF IMO — Science Olympiad Foundation"],
    ["IOQM", "IOQM — Indian Olympiad Qualifier in Mathematics"]
  ],
  "Science Olympiad": [
    ["SOF NSO", "SOF NSO — Science Olympiad Foundation"]
  ]
};

function showMessage(message, isError = false) {
  formMessage.textContent = message;
  formMessage.classList.toggle("is-error", isError);
  formMessage.hidden = false;
}

function getErrorMessage(data) {
  if (typeof data.detail === "string") {
    return data.detail;
  }
  if (Array.isArray(data.detail)) {
    return data.detail.map((issue) => issue.msg).join(" ");
  }
  return "Apex couldn't save your learning path. Please try again.";
}

function showClassStep() {
  learningStep.hidden = true;
  classStep.hidden = false;
  classSelect.disabled = false;
  classSelect.focus();
}

function showLearningStep() {
  classStep.hidden = true;
  learningStep.hidden = false;
  classSelect.disabled = true;
  focusSelect.focus();
}

async function loadAccount() {
  try {
    const response = await fetch("/api/auth/me");
    if (response.status === 401) {
      window.location.assign("/");
      return;
    }
    if (!response.ok) {
      throw new Error("Apex couldn't load your account. Please refresh and try again.");
    }

    const account = await response.json();
    const options = olympiadsByExam[account.exam];
    if (!options) {
      welcomeMessage.textContent = "Your account does not have an Olympiad goal selected.";
      showMessage("Return to your account page and choose Math Olympiad or Science Olympiad.", true);
      return;
    }

    welcomeMessage.textContent = `Hi ${account.name} — you chose ${account.exam}.`;
    options.forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      focusSelect.append(option);
    });
    if (account.exam_focus) {
      focusSelect.value = account.exam_focus;
    }
    if (account.preparation_level) {
      preparationSelect.value = account.preparation_level;
    }
    if (account.school_class) {
      classSelect.value = String(account.school_class);
    }
    focusSelect.disabled = false;
    preparationSelect.disabled = false;
    nextStepButton.disabled = false;
    saveButton.disabled = false;

    if (account.exam_focus && account.preparation_level && !account.school_class) {
      showClassStep();
    }
  } catch (error) {
    console.error("Could not load the Apex account.", error);
    welcomeMessage.textContent = "We couldn't load your account.";
    showMessage(error.message || "Apex couldn't reach its backend. Please try again.", true);
  }
}

focusSelect.addEventListener("change", () => {
  formMessage.hidden = true;
  formMessage.textContent = "";
});
preparationSelect.addEventListener("change", () => {
  formMessage.hidden = true;
  formMessage.textContent = "";
});

classSelect.addEventListener("change", () => {
  formMessage.hidden = true;
  formMessage.textContent = "";
});

nextStepButton.addEventListener("click", () => {
  if (!focusSelect.value || !preparationSelect.value) {
    const firstMissingField = !focusSelect.value ? focusSelect : preparationSelect;
    firstMissingField.focus();
    showMessage("Choose your Olympiad and preparation level to continue.", true);
    return;
  }
  showClassStep();
});

backStepButton.addEventListener("click", showLearningStep);

focusForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!focusSelect.value || !preparationSelect.value || !classSelect.value) {
    const firstMissingField = !focusSelect.value
      ? focusSelect
      : !preparationSelect.value
        ? preparationSelect
        : classSelect;
    firstMissingField.focus();
    showMessage("Please choose your Olympiad, preparation level, and class.", true);
    return;
  }

  saveButton.disabled = true;
  try {
    const response = await fetch("/api/profile/focus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exam_focus: focusSelect.value,
        preparation_level: preparationSelect.value,
        school_class: Number(classSelect.value)
      })
    });
    const result = await response.json();
    if (!response.ok) {
      showMessage(getErrorMessage(result), true);
      return;
    }
    window.location.assign("/profile");
  } catch (error) {
    console.error("Could not save the learning path.", error);
    showMessage("Apex couldn't reach its backend. Your profile has not been saved.", true);
  } finally {
    saveButton.disabled = false;
  }
});

logoutButton.addEventListener("click", async () => {
  logoutButton.disabled = true;
  try {
    const response = await fetch("/api/auth/logout", { method: "POST" });
    if (!response.ok) {
      showMessage("Apex couldn't log you out. Please try again.", true);
      return;
    }
    window.location.assign("/");
  } catch (error) {
    console.error("Could not log out of Apex.", error);
    showMessage("Apex couldn't reach its backend. Your session has not been confirmed as logged out.", true);
  } finally {
    logoutButton.disabled = false;
  }
});

loadAccount();
