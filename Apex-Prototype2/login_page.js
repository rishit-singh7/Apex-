const form = document.querySelector("#account-form");
const signupTab = document.querySelector("#signup-tab");
const loginTab = document.querySelector("#login-tab");
const headerModeButton = document.querySelector("#header-mode-button");
const formTitle = document.querySelector("#form-title");
const formSubtitle = document.querySelector("#form-subtitle");
const formEyebrow = document.querySelector("#form-eyebrow");
const nameField = document.querySelector("#name-field");
const signupFields = document.querySelector("#signup-fields");
const ageInput = document.querySelector("#age");
const examSelect = document.querySelector("#exam");
const underageNote = document.querySelector("#underage-note");
const passwordInput = document.querySelector("#password");
const passwordToggle = document.querySelector("#password-toggle");
const passwordHint = document.querySelector("#password-hint");
const formOptions = document.querySelector("#form-options");
const submitButton = document.querySelector("#submit-button");
const formMessage = document.querySelector("#form-message");
const headerPromptText = document.querySelector("#header-prompt-text");
let isLoginMode = false;

function clearMessage() {
  formMessage.hidden = true;
  formMessage.classList.remove("is-error");
  formMessage.textContent = "";
}

function setMode(loginMode) {
  isLoginMode = loginMode;
  clearMessage();
  form.reset();
  form.action = loginMode ? "/api/auth/login" : "/api/auth/register";
  underageNote.hidden = true;

  signupTab.setAttribute("aria-pressed", String(!loginMode));
  loginTab.setAttribute("aria-pressed", String(loginMode));
  nameField.hidden = loginMode;
  signupFields.hidden = loginMode;
  formOptions.hidden = !loginMode;

  document.querySelector("#full-name").required = !loginMode;
  ageInput.required = !loginMode;
  examSelect.required = !loginMode;
  passwordInput.autocomplete = loginMode ? "current-password" : "new-password";
  passwordInput.type = "password";
  passwordToggle.textContent = "Show";
  passwordToggle.setAttribute("aria-label", "Show password");
  passwordHint.hidden = loginMode;

  formEyebrow.textContent = loginMode ? "WELCOME BACK" : "A FRESH START";
  formTitle.textContent = loginMode ? "Welcome back" : "Create your account";
  formSubtitle.textContent = loginMode
    ? "Pick up right where your learning journey left off."
    : "Your learning journey begins with one small step.";
  submitButton.innerHTML = loginMode
    ? 'Log in to Apex <span aria-hidden="true">→</span>'
    : 'Create my account <span aria-hidden="true">→</span>';
  headerPromptText.textContent = loginMode
    ? "New to Apex?"
    : "Already have an account?";
  headerModeButton.textContent = loginMode ? "Create an account" : "Log in";
}

function showMessage(message, isError) {
  formMessage.textContent = message;
  formMessage.classList.toggle("is-error", isError);
  formMessage.hidden = false;
}

function validateFields() {
  const fields = Array.from(form.querySelectorAll("input, select"))
    .filter((field) => field.type !== "checkbox" && !field.disabled);
  let firstInvalidField = null;

  fields.forEach((field) => {
    field.setAttribute("aria-invalid", String(!field.checkValidity()));
    if (!field.checkValidity() && firstInvalidField === null) {
      firstInvalidField = field;
    }
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    return false;
  }
  return true;
}

signupTab.addEventListener("click", () => setMode(false));
loginTab.addEventListener("click", () => setMode(true));
headerModeButton.addEventListener("click", () => setMode(!isLoginMode));

passwordToggle.addEventListener("click", () => {
  const showPassword = passwordInput.type === "password";
  passwordInput.type = showPassword ? "text" : "password";
  passwordToggle.textContent = showPassword ? "Hide" : "Show";
  passwordToggle.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
});

ageInput.addEventListener("input", () => {
  const age = Number(ageInput.value);
  underageNote.hidden = !ageInput.value || !Number.isFinite(age) || age >= 13;
  ageInput.setAttribute("aria-describedby", underageNote.hidden ? "" : "underage-note");
});

form.addEventListener("input", (event) => {
  if (event.target.matches("input, select")) {
    event.target.removeAttribute("aria-invalid");
    clearMessage();
  }
});

document.querySelector("#forgot-password").addEventListener("click", () => {
  showMessage("Password recovery is not available in this local learning version.", false);
});

function getErrorMessage(data) {
  if (typeof data.detail === "string") {
    return data.detail;
  }
  if (Array.isArray(data.detail)) {
    return data.detail.map((issue) => issue.msg).join(" ");
  }
  return "Apex couldn't complete that request. Please try again.";
}

function showSignedIn(account) {
  const isOlympiadLearner = ["Math Olympiad", "Science Olympiad"].includes(account.exam);
  const needsOlympiadSetup = isOlympiadLearner && (
    !account.exam_focus ||
    !account.preparation_level ||
    !account.school_class
  );

  if (needsOlympiadSetup) {
    window.location.assign("/onboarding");
    return;
  }
  window.location.assign("/profile");
}

async function checkExistingSession() {
  try {
    const response = await fetch("/api/auth/me");
    if (response.status === 401) {
      return;
    }
    if (!response.ok) {
      showMessage("Apex couldn't check your saved session. Please refresh and try again.", true);
      return;
    }
    const account = await response.json();
    showSignedIn(account);
  } catch (error) {
    console.error("Could not connect to the Apex backend.", error);
    showMessage("Start Apex with start_apex.bat, then open http://127.0.0.1:8000 to use accounts.", true);
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  clearMessage();

  if (!validateFields()) {
    showMessage("Please check the highlighted fields and try again.", true);
    return;
  }

  const formData = new FormData(form);
  const payload = isLoginMode
    ? {
        email: formData.get("email"),
        password: formData.get("password"),
        remember: document.querySelector("#remember-me").checked
      }
    : {
        name: formData.get("name"),
        email: formData.get("email"),
        age: Number(formData.get("age")),
        exam: formData.get("exam"),
        password: formData.get("password")
      };
  const endpoint = isLoginMode ? "/api/auth/login" : "/api/auth/register";
  submitButton.disabled = true;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      showMessage(getErrorMessage(result), true);
      return;
    }

    showSignedIn(result);
  } catch (error) {
    console.error("Could not connect to the Apex backend.", error);
    showMessage("Apex couldn't reach its backend. Start it with start_apex.bat and open http://127.0.0.1:8000.", true);
  } finally {
    submitButton.disabled = false;
  }
});

checkExistingSession();
